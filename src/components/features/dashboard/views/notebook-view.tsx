import { getNotebookById } from "@/server/notebook"
import { NotesTable } from "../components/notes-table"
import { CreateNoteButton } from "../components/create-note-button"
import { EmptyState } from "@/components/empty-state"

interface NotebookViewProps {
  notebookId: string
}

export async function NotebookView({ notebookId }: NotebookViewProps) {
  const result = await getNotebookById(notebookId)

  if (!result.success || !result.notebook) {
    return (
      <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 120px)' }}>
        <EmptyState
          title="Notebook not found"
          description="The notebook you are looking for does not exist"
          cta={<CreateNoteButton buttonClassName="rounded-full" notebookId={notebookId} />}
        />
      </div>
    )
  }

  const { notebook } = result

  return (
    <div className="space-y-6">
      {notebook.notes && notebook.notes.length > 0 ? (
        <div className="space-y-4">
          <NotesTable notes={notebook.notes} notebookId={notebookId} />
        </div>
      ) : (
        <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 120px)' }}>
        <EmptyState
          title="No notes in this notebook"
          description="Create your first note to get started"
          cta={<CreateNoteButton buttonClassName="rounded-full" notebookId={notebookId} />}
        />
      </div>
      )}
    </div>
  )
} 