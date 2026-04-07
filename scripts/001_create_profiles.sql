-- Criar tabela de perfis de usuários
-- Esta tabela armazena dados adicionais dos usuários além do que o Supabase Auth guarda

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  user_type text not null check (user_type in ('seller', 'supplier')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Criar índice único para email para evitar duplicação
create unique index if not exists profiles_email_idx on public.profiles(email);

-- Habilitar Row Level Security
alter table public.profiles enable row level security;

-- Políticas de segurança RLS
-- Usuários podem ver apenas seu próprio perfil
create policy "profiles_select_own" on public.profiles 
  for select using (auth.uid() = id);

-- Usuários podem inserir apenas seu próprio perfil
create policy "profiles_insert_own" on public.profiles 
  for insert with check (auth.uid() = id);

-- Usuários podem atualizar apenas seu próprio perfil
create policy "profiles_update_own" on public.profiles 
  for update using (auth.uid() = id);

-- Usuários podem deletar apenas seu próprio perfil
create policy "profiles_delete_own" on public.profiles 
  for delete using (auth.uid() = id);

-- Função para atualizar o timestamp de updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger para atualizar updated_at automaticamente
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- Função para criar perfil automaticamente quando usuário se registra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, phone, user_type)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'phone', null),
    coalesce(new.raw_user_meta_data ->> 'user_type', 'seller')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Trigger para criar perfil automaticamente após signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
