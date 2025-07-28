'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

export function SocialButtons() {
  const [isLoading, setIsLoading] = useState<'google' | 'github' | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading('google');
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsLoading('github');
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dashboard',
      });
    } catch (error) {
      console.error('GitHub sign in error:', error);
      toast.error('Failed to sign in with GitHub. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isLoading !== null}
      >
        {isLoading === 'google' ? (
          <Loader2 className="animate-spin size-4 mr-2" />
        ) : (
          <FaGoogle className="mr-2 h-4 w-4" />
        )}
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleGithubSignIn}
        disabled={isLoading !== null}
      >
        {isLoading === 'github' ? (
          <Loader2 className="animate-spin size-4 mr-2" />
        ) : (
          <FaGithub className="mr-2 h-4 w-4" />
        )}
        Continue with GitHub
      </Button>
    </div>
  );
} 