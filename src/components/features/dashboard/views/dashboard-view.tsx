import { getNotebooks } from '@/server/notebook';
import { CreateNotebookButton } from '../components/create-notebook-button';
import { NotebooksTable } from '../components/notebooks-table';
import EmptyState from '@/components/shared/states/empty-state';

export async function DashboardView() {
  const result = await getNotebooks();

  if (!result.success) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error: {result.message}</p>
        </div>
      </div>
    );
  }

  const { notebooks } = result;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Notebooks</h2>
        <CreateNotebookButton />
      </div>
      {notebooks && notebooks.length > 0 ? (
        <div className="space-y-4">
          <NotebooksTable notebooks={notebooks} />
        </div>
      ) : (
        <EmptyState
          title="No notebooks found"
          description="Create your first notebook to get started"
          cta="Create your first notebook and start writing your thoughts"
        />
      )}
    </div>
  );
}
