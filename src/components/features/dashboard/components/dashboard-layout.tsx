import { DashboardHeader } from './dashboard-header';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
    </div>
  );
}
