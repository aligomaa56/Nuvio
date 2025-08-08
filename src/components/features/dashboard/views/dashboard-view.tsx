import StackedCards from '@/components/shared/StackedCards';
import { getNotebooks } from '@/server/notebook';
import { EmptyState } from '@/components/empty-state';
import { CreateNotebookButton } from '../components/create-notebook-button';

export default async function DashboardView() {
  const { notebooks } = await getNotebooks();

  if (!notebooks || notebooks.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 120px)' }}>
        <EmptyState
          title="You don't have any notebooks yet"
          description="Create your first notebook to get started"
          cta={<CreateNotebookButton buttonClassName="rounded-full" />}
        />
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
