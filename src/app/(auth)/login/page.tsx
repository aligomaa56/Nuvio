import { AuthView } from '@/components/features/auth/views/auth-view';

export default function LoginAndSignupPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthView />
      </div>
    </div>
  );
} 