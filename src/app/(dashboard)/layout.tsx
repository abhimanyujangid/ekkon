import { cookies } from "next/headers";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { DashboardSidebar } from "@/src/feature/dashboard/components/dashboard-sidebar";
import { HydrateClient, prefetch, trpc } from "@/src/trpc/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  prefetch(trpc.billing.getStatus.queryOptions());

  return (
    <HydrateClient>
      <SidebarProvider defaultOpen={defaultOpen} className="h-svh">
        <DashboardSidebar />
        <SidebarInset className="min-h-0 min-w-0">
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </HydrateClient>
  );
}
