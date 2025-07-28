import { NoteView } from '@/components/features/dashboard/views/note-view';

export default async function NotePage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const { noteId } = await params;
  return <NoteView noteId={noteId} />;
}
