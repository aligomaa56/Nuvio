import { NotebookView } from '@/components/features/dashboard';

export default async function NotebookPage({
  params,
}: {
  params: Promise<{ notebookId: string }>;
}) {
  const { notebookId } = await params;
  return <NotebookView notebookId={notebookId} />;
}
