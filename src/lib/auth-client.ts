import { createAuthClient } from 'better-auth/react';

// Determine base URL based on environment
const getBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // In production, use the Vercel URL
  return process.env.NEXT_PUBLIC_VERCEL_URL 
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BETTER_BASE_URL || '';
};

export const authClient = createAuthClient({
  /** The base URL of the server */
  baseURL: getBaseURL(),
});

export const signIn = async () => {
  await authClient.signIn.social({
    provider: 'google',
    callbackURL: '/dashboard',
  });
};
