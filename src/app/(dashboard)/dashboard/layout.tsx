import { AppSidebar } from '@/components/app-sidebar';
import { SharedDashboardHeader } from '@/components/features/dashboard/components/shared-dashboard-header';
import { auth } from '@/lib/auth';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { dashboardMetadata } from '@/app/data/metadata';

export const metadata = dashboardMetadata;

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SharedDashboardHeader />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
