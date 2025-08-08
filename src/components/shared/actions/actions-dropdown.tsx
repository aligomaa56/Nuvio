"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useState } from "react"
import { UpdateDialog } from "./update-dialog"
import { DeleteDialog } from "./delete-dialog"

interface ActionsDropdownProps {
  id: string
  name: string
  onUpdate: (id: string, values: { name: string }) => Promise<{ success: boolean; message: string }>
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>
  updateTitle: string
  updateDescription: string
  deleteTitle: string
  deleteDescription: string
}

export function ActionsDropdown({
  id,
  name,
  onUpdate,
  onDelete,
  updateTitle,
  updateDescription,
  deleteTitle,
  deleteDescription,
}: ActionsDropdownProps) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-[1300]">
          <DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateDialog
        id={id}
        currentName={name}
        onUpdate={onUpdate}
        title={updateTitle}
        description={updateDescription}
        isOpen={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
      />
      
      <DeleteDialog
        id={id}
        name={name}
        onDelete={onDelete}
        title={deleteTitle}
        description={deleteDescription}
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  )
} 