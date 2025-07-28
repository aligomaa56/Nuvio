import { DynamicBreadcrumb } from "./dynamic-breadcrumb"
import { Logout } from "@/components/shared/auth/logout"
import { ModeToggle } from "@/components/shared/theme/mode-toggle"

export function DashboardHeader() {
  return (
    <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <DynamicBreadcrumb />
      <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        <Logout />
      </div>
    </header>
  )
} 