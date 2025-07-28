import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Note } from "@/db/schema"
import { NoteTableRow } from "./note-table-row"

interface NotesTableProps {
  notes: Note[]
  notebookId: string
}

export function NotesTable({ notes, notebookId }: NotesTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note) => (
            <NoteTableRow 
              key={note.id} 
              note={note} 
              notebookId={notebookId} 
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 