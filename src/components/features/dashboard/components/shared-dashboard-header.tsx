'use client';

import { useState, useEffect } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { House, LucideIcon, Notebook, ScrollText, SquareDashed, SquarePen} from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
  isLoading?: boolean
  icon?: LucideIcon
}

export function SharedDashboardHeader() {
  const pathname = usePathname()
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([])

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    
    // Always start with Dashboard
    const items: BreadcrumbItem[] = [
      { label: 'Dashboard', href: '/dashboard', icon: House }
    ]

    // Handle different route patterns
    if (pathname === '/dashboard') {
      // On main dashboard, don't show "Dashboard" as link
      setBreadcrumbItems([{ label: 'Dashboard', icon: House }])
      return
    }

    // Dashboard > Notebooks
    if (pathname === '/dashboard/notebooks') {
      items.push({ label: 'Notebooks', icon: Notebook })
    }
    
    // Dashboard > Notebooks > Notes (when viewing individual notebook)
    else if (pathname.match(/^\/dashboard\/notebooks\/[^\/]+$/)) {
      items.push({ label: 'Notebooks', href: '/dashboard/notebooks', icon: Notebook })
      items.push({ label: 'Notes', icon: ScrollText })
    }
    
    // Dashboard > Notebooks > Notes > {ScrollText icon} (when editing a note)
    else if (pathname.match(/^\/dashboard\/notebooks\/[^\/]+\/note\/[^\/]+$/)) {
      const notebookId = pathSegments[2]
      items.push({ label: 'Notebooks', href: '/dashboard/notebooks', icon: Notebook })
      items.push({ label: 'Notes', href: `/dashboard/notebooks/${notebookId}`, icon: ScrollText })
      items.push({ label: 'Editor', icon: SquarePen }) // Just icon for the current note
    }
    
    // Dashboard > Whiteboard
    else if (pathname === '/dashboard/whiteboard') {
      items.push({ label: 'Whiteboard', icon: SquareDashed })
    }
    
    // Dashboard > Future Products...
    else if (pathname.startsWith('/dashboard/')) {
      const productName = pathSegments[1]
      items.push({ 
        label: productName.charAt(0).toUpperCase() + productName.slice(1) 
      })
    }

    setBreadcrumbItems(items)
  }, [pathname])
  
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <div key={`${item.label}-${index}`} className="flex items-center">
                {index > 0 && (
                  <BreadcrumbSeparator className="mr-2" />
                )}
                <BreadcrumbItem>
                  {item.href && !item.isLoading ? (
                    <BreadcrumbLink href={item.href} className="flex items-center gap-2">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className={`flex items-center gap-2 ${item.isLoading ? "text-muted-foreground animate-pulse" : ""}`}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
