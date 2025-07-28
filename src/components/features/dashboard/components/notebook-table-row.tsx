"use client"

import { useRouter } from "next/navigation"
import { TableCell, TableRow } from "@/components/ui/table"
import { Notebook } from "@/db/schema"
import { ActionsDropdown } from "@/components/shared/actions"
import { updateNotebook, deleteNotebook } from "@/server/notebook"

interface NotebookTableRowProps {
  notebook: Notebook
}

export function NotebookTableRow({ notebook }: NotebookTableRowProps) {
  const router = useRouter()

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    router.push(`/dashboard/notebook/${notebook.id}`)
  }

  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50" 
      onClick={handleRowClick}
    >
      <TableCell className="font-medium">{notebook.name}</TableCell>
      <TableCell>{notebook.notes?.length || 0}</TableCell>
      <TableCell>
        {new Date(notebook.createdAt!).toLocaleDateString()}
      </TableCell>
      <TableCell>
        {new Date(notebook.updatedAt!).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <div onClick={(e) => e.stopPropagation()}>
          <ActionsDropdown
            id={notebook.id}
            name={notebook.name}
            onUpdate={updateNotebook}
            onDelete={deleteNotebook}
            updateTitle="Update Notebook"
            updateDescription="Change the name of this notebook."
            deleteTitle="Delete Notebook"
            deleteDescription="Are you sure you want to delete"
          />
        </div>
      </TableCell>
    </TableRow>
  )
} 