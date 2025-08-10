"use client"

import { useRouter } from "next/navigation"
import { TableCell, TableRow } from "@/components/ui/table"
import { Note } from "@/db/schema"
import { ActionsDropdown } from "@/components/shared/actions"
import { updateNote, deleteNote } from "@/server/notes"

interface NoteTableRowProps {
  note: Note
  notebookId: string
}

export function NoteTableRow({ note, notebookId }: NoteTableRowProps) {
  const router = useRouter()

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    router.push(`/dashboard/notebooks/${notebookId}/note/${note.id}`)
  }

  const handleUpdateNote = async (id: string, values: { name: string }) => {
    return await updateNote(id, { title: values.name })
  }

  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50" 
      onClick={handleRowClick}
    >
      <TableCell className="font-medium">{note.title}</TableCell>
      <TableCell>
        {new Date(note.createdAt!).toLocaleDateString()}
      </TableCell>
      <TableCell>
        {new Date(note.updatedAt!).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <div onClick={(e) => e.stopPropagation()}>
          <ActionsDropdown
            id={note.id}
            name={note.title}
            onUpdate={handleUpdateNote}
            onDelete={deleteNote}
            updateTitle="Update Note"
            updateDescription="Change the title of this note."
            deleteTitle="Delete Note"
            deleteDescription="Are you sure you want to delete"
          />
        </div>
      </TableCell>
    </TableRow>
  )
} 