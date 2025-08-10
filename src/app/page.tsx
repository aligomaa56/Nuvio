import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { LandingView } from '@/components/features/landing';
import { auth } from '@/lib/auth';
import { siteMetadata } from '@/app/data/metadata';

export const metadata = siteMetadata;

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main>
      <LandingView />
    </main>
  );
}
