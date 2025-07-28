import { db } from '@/db/drizzle';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as schema from '@/db/schema';
import { nextCookies } from 'better-auth/next-js';
// import { Resend } from 'resend';
// import VerificationEmail from '@/components/emails/verification-email';

// const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      prompt: 'select_account',
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  plugins: [nextCookies()],
  trustedOrigins: [
    'http://localhost:3000',
    'https://nuvio-one.vercel.app',
  ],
});
