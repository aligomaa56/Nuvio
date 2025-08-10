"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Notebook,
  SquareDashed,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const sidebarItems = {
  navMain: [
    {
      title: "Notebooks",
      url: "/dashboard/notebooks",
      icon: Notebook,
    },
    {
      title: "Whiteboard (Soon)",
      url: "#",
      icon: SquareDashed,
      disabled: true,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-background text-sidebar-accent-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src="/logo.svg" alt="Nuvio logo" width={16} height={16} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Nuvio</span>
                  <span className="truncate text-xs text-sidebar-accent-foreground/50">v1.0 (beta)</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
