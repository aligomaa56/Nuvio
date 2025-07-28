"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2, Edit } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
})

interface UpdateDialogProps {
  id: string
  currentName: string
  onUpdate: (id: string, values: { name: string }) => Promise<{ success: boolean; message: string }>
  title: string
  description: string
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function UpdateDialog({ 
  id, 
  currentName, 
  onUpdate, 
  title, 
  description,
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange
}: UpdateDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const setIsOpen = externalOnOpenChange || setInternalIsOpen

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentName,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)

      const response = await onUpdate(id, values)
      
      if (response.success) {
        form.reset()
        toast.success(response.message)
        router.refresh()
        setIsOpen(false)
      } else {
        toast.error(response.message)
      }
    } catch {
      toast.error("Failed to update")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {externalIsOpen === undefined && (
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 