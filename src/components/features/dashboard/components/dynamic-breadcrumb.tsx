"use client"

import { House, Notebook, ScrollText } from 'lucide-react';
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  
  const isNotebookPage = pathname.includes('/notebooks/')
  const isNotePage = pathname.includes('/notes/')

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <House className="size-4" />
              Dashboard
            </div>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {isNotebookPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isNotePage ? (
                <BreadcrumbLink href={`/dashboard/notebook/${pathname.split('/')[3]}`}>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <Notebook className="size-4" />
                    Notes
                  </div>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <Notebook className="size-4" />
                    Notes
                  </div>
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {isNotePage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <ScrollText className="size-4 text-muted-foreground" />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
        
      </BreadcrumbList>
    </Breadcrumb>
  )
} 