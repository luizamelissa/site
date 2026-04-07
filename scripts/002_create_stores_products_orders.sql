-- =====================================================
-- Script 002: Criar tabelas stores, products, orders, order_items
-- =====================================================

-- =====================================================
-- TABELA: stores (Lojas)
-- =====================================================
create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'Minha Loja',
  description text,
  logo_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  
  -- Cada usuário só pode ter uma loja
  unique(user_id)
);

-- Habilitar RLS para stores
alter table public.stores enable row level security;

-- Políticas RLS para stores
create policy "stores_select_own" on public.stores 
  for select using (auth.uid() = user_id);

create policy "stores_insert_own" on public.stores 
  for insert with check (auth.uid() = user_id);

create policy "stores_update_own" on public.stores 
  for update using (auth.uid() = user_id);

create policy "stores_delete_own" on public.stores 
  for delete using (auth.uid() = user_id);

-- =====================================================
-- TABELA: products (Produtos)
-- =====================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null,
  description text,
  price decimal(10, 2) not null default 0.00,
  stock integer not null default 0,
  image_url text,
  category text,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Habilitar RLS para products
alter table public.products enable row level security;

-- Políticas RLS para products (usuário pode gerenciar produtos da sua loja)
create policy "products_select_own" on public.products 
  for select using (
    store_id in (select id from public.stores where user_id = auth.uid())
  );

create policy "products_insert_own" on public.products 
  for insert with check (
    store_id in (select id from public.stores where user_id = auth.uid())
  );

create policy "products_update_own" on public.products 
  for update using (
    store_id in (select id from public.stores where user_id = auth.uid())
  );

create policy "products_delete_own" on public.products 
  for delete using (
    store_id in (select id from public.stores where user_id = auth.uid())
  );

-- =====================================================
-- TABELA: orders (Pedidos)
-- =====================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  store_id uuid not null references public.stores(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total decimal(10, 2) not null default 0.00,
  shipping_address text,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Habilitar RLS para orders
alter table public.orders enable row level security;

-- Políticas RLS para orders (usuário pode ver seus próprios pedidos)
create policy "orders_select_own" on public.orders 
  for select using (auth.uid() = user_id);

create policy "orders_insert_own" on public.orders 
  for insert with check (auth.uid() = user_id);

create policy "orders_update_own" on public.orders 
  for update using (auth.uid() = user_id);

-- Política para donos de loja verem pedidos da sua loja
create policy "orders_select_store_owner" on public.orders 
  for select using (
    store_id in (select id from public.stores where user_id = auth.uid())
  );

-- =====================================================
-- TABELA: order_items (Itens do Pedido)
-- =====================================================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1,
  unit_price decimal(10, 2) not null,
  total_price decimal(10, 2) not null,
  created_at timestamp with time zone default now()
);

-- Habilitar RLS para order_items
alter table public.order_items enable row level security;

-- Políticas RLS para order_items
create policy "order_items_select_own" on public.order_items 
  for select using (
    order_id in (select id from public.orders where user_id = auth.uid())
  );

create policy "order_items_insert_own" on public.order_items 
  for insert with check (
    order_id in (select id from public.orders where user_id = auth.uid())
  );

-- Política para donos de loja verem itens dos pedidos da sua loja
create policy "order_items_select_store_owner" on public.order_items 
  for select using (
    order_id in (
      select o.id from public.orders o 
      join public.stores s on o.store_id = s.id 
      where s.user_id = auth.uid()
    )
  );

-- =====================================================
-- TRIGGER: Criar loja automaticamente ao criar usuário
-- =====================================================
create or replace function public.handle_new_user_store()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Criar uma loja automaticamente para o novo usuário
  insert into public.stores (user_id, name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', 'Minha Loja') || '''s Store'
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

-- Remover trigger se existir
drop trigger if exists on_auth_user_created_store on auth.users;

-- Criar trigger para auto-criar loja
create trigger on_auth_user_created_store
  after insert on auth.users
  for each row
  execute function public.handle_new_user_store();

-- =====================================================
-- ÍNDICES para melhor performance
-- =====================================================
create index if not exists idx_stores_user_id on public.stores(user_id);
create index if not exists idx_products_store_id on public.products(store_id);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_store_id on public.orders(store_id);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_order_items_product_id on public.order_items(product_id);
