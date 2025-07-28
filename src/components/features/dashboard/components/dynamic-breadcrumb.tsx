"use client"

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
  
  const isNotebookPage = pathname.includes('/notebook/')
  const isNotePage = pathname.includes('/note/')

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {isNotebookPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isNotePage ? (
                <BreadcrumbLink href={`/dashboard/notebook/${pathname.split('/')[3]}`}>
                  Notebook
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>
                  Notebook
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
                Note
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
} 