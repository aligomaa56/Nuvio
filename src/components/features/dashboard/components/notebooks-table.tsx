import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Notebook } from "@/db/schema"
import { NotebookTableRow } from "./notebook-table-row"

interface NotebooksTableProps {
  notebooks: Notebook[]
}

export function NotebooksTable({ notebooks }: NotebooksTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Notes Count</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notebooks.map((notebook) => (
            <NotebookTableRow key={notebook.id} notebook={notebook} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 