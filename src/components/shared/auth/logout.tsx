'use client';

import { authClient } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

export function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/');
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Logout
    </DropdownMenuItem>
  );
}
