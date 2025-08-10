"use client"

import { useState, useEffect } from "react"
import { type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    disabled?: boolean
  }[]
}) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const pathname = usePathname()

  // Update active item based on current URL
  useEffect(() => {
    const currentItem = items.find(item => 
      pathname === item.url || 
      (pathname.startsWith(item.url + '/') && pathname !== '/dashboard')
    )
    
    if (currentItem) {
      setActiveItem(currentItem.title)
    } else if (pathname === '/dashboard') {
      // Reset active state when on main dashboard
      setActiveItem(null)
    }
  }, [pathname, items])

  const handleItemClick = (title: string) => {
    setActiveItem(title)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-accent-foreground">Nuvio Products</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = activeItem === item.title
          
          if (item.disabled) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  tooltip={item.title} 
                  disabled
                  className="text-muted-foreground cursor-not-allowed opacity-60"
                >
                  <item.icon className="text-muted-foreground" />
                  <span className="text-muted-foreground">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }
          
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.title} 
                isActive={isActive}
                onClick={() => handleItemClick(item.title)}
                className={isActive ? "" : "text-muted-foreground"}
              >
                <Link href={item.url}>
                  <item.icon className={isActive ? "" : "text-muted-foreground"} />
                  <span className={isActive ? "" : "text-muted-foreground"}>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
