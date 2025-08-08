'use client';

import Link from 'next/link';
import { useSession } from '@/hooks/use-session';
import { AvatarDropdown } from './avatar-dropdown';

export function AuthSection() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />;
  }

  if (session) {
    return <AvatarDropdown />;
  }

  return (
    <Link
      href="/login"
      className="hover:bg-foreground dark:hover:border-t-border bg-background group flex w-fit items-center justify-center gap-5 rounded-full border px-3 py-1 shadow-lg shadow-zinc-950/10 transition-all duration-300 dark:border-zinc-400 dark:shadow-zinc-950 hover:scale-105"
    >
      <span className="text-foreground text-base font-medium group-hover:text-black">Login</span>
    </Link>
  );
}