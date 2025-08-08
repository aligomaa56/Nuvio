import StackedCards from '@/components/shared/StackedCards';
import { getNotebooks } from '@/server/notebook';
import EmptyState from '@/components/shared/states/empty-state';
import { CreateNotebookButton } from '../components/create-notebook-button';

export default async function DashboardView() {
  const result = await getNotebooks();

  if (!result.success) {
    return (
      <div className="p-4">
        <EmptyState title="Failed to load notebooks" description={result.message ?? 'Please try again later.'} />
      </div>
    );
  }

  const { notebooks } = result;

  if (!notebooks || notebooks.length === 0) {
    return (
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <CreateNotebookButton />
        </div>
        <EmptyState title="No notebooks found" description="Create your first notebook to get started" cta="Create your first notebook and start writing your thoughts" />
      </div>
    );
  }

  const cards = notebooks.map((nb) => ({
    id: nb.id,
    name: nb.name,
    notesCount: nb.notes?.length ?? 0,
    createdAt: nb.createdAt,
  }));

  return (
    <div className="relative">
      <StackedCards cards={cards} maxVisibleInStack={5} />
    </div>
  );
}