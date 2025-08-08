import { NoteView } from '@/components/features/dashboard/views/note-view';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function NotePage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  const { noteId } = await params;
  return <NoteView noteId={noteId} />;
}
