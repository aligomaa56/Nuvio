import { getNotebooks } from "@/server/notebook"
import { NotebooksTable } from "../components/notebooks-table"

export async function NotebooksView() {
  const result = await getNotebooks()

  if (!result.success) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Notebooks</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error: {result.message}</p>
        </div>
      </div>
    )
  }

  const { notebooks } = result

  return (
    <div className="space-y-6">
      {notebooks && notebooks.length > 0 ? (
        <NotebooksTable notebooks={notebooks} />
      ) : (
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <p className="text-muted-foreground">No notebooks found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Create your first notebook to get started
          </p>
        </div>
      )}
    </div>
  )
} 