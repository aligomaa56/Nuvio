import { getNotebookById } from "@/server/notebook"
import { NotesTable } from "../components/notes-table"
import { CreateNoteButton } from "../components/create-note-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import EmptyState from "@/components/shared/states/empty-state"

interface NotebookViewProps {
  notebookId: string
}

export async function NotebookView({ notebookId }: NotebookViewProps) {
  const result = await getNotebookById(notebookId)

  if (!result.success || !result.notebook) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Notebook Not Found</h1>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error: {result.message || "Notebook not found"}</p>
        </div>
      </div>
    )
  }

  const { notebook } = result

  return (
    <div className="space-y-6">
      {notebook.notes && notebook.notes.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Notes</h2>
            <CreateNoteButton notebookId={notebookId} />
          </div>
          <NotesTable notes={notebook.notes} notebookId={notebookId} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Notes</h2>
            <CreateNoteButton notebookId={notebookId} />
          </div>
          <EmptyState
            title="No notes in this notebook"
            description="Create your first note to get started"
            cta="Create your note and start writing your thoughts"
          />
        </div>
      )}
    </div>
  )
} 