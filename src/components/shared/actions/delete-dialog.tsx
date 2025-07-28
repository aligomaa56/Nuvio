"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface DeleteDialogProps {
  id: string
  name: string
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>
  title: string
  description: string
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DeleteDialog({ 
  id, 
  name, 
  onDelete, 
  title, 
  description,
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange
}: DeleteDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const setIsOpen = externalOnOpenChange || setInternalIsOpen

  async function handleDelete() {
    try {
      setIsLoading(true)

      const response = await onDelete(id)
      
      if (response.success) {
        toast.success(response.message)
        router.refresh()
        setIsOpen(false)
      } else {
        toast.error(response.message)
      }
    } catch {
      toast.error("Failed to delete")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {externalIsOpen === undefined && (
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description} <strong>{name}</strong>. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 