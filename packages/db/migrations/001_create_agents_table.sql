-- Migration: Create agents table
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/oxxfmimytrmvbkvhttvl/sql

create table if not exists public.agents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  role text not null,
  model text default 'claude-sonnet-4-6',
  focus text,
  status text default 'active' check (status in ('active', 'paused', 'archived')),
  budget_limit numeric,
  budget_used numeric default 0,
  tasks_completed integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: users can only see/edit their own agents
alter table public.agents enable row level security;

create policy "Users can view own agents"
  on public.agents for select
  using (auth.uid() = user_id);

create policy "Users can create own agents"
  on public.agents for insert
  with check (auth.uid() = user_id);

create policy "Users can update own agents"
  on public.agents for update
  using (auth.uid() = user_id);

create policy "Users can delete own agents"
  on public.agents for delete
  using (auth.uid() = user_id);

-- Index for fast user lookups
create index if not exists idx_agents_user_id on public.agents(user_id);
