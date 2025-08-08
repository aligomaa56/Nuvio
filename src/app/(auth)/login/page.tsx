import { AuthView } from '@/components/features/auth/views/auth-view';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginAndSignupPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthView />
      </div>
    </div>
  );
} 