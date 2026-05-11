"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/src/components/ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { OrganizationSwitcher, UserButton, useClerk } from "@clerk/nextjs";
import { Home, LayoutGrid, AudioLines, Volume2, Settings, Headphones } from "lucide-react";
import Link from "next/link";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface NavSelectionProps {
  label?: string;
  pathName: string;
  items: MenuItem[];
}

function NavSelection({ label, pathName, items }: NavSelectionProps) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-muted-foreground text-[13px] uppercase">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild={!!item.url}
                isActive={
                  item.url
                    ? item.url === "/"
                      ? pathName === "/"
                      : pathName.startsWith(item.url)
                    : false
                }
                onClick={item.onClick}
                tooltip={item.title}
                className="data- [active=true]:border-border data-[active=true] :shadow-[0px_1px_1px_0px_rgba(44,54,53,0.03), inset_0px_0px_0px_2px_white] h-9 border border-transparent px-3 py-2 text-[13px] font-medium tracking-tight"
              >
                {item.url ? (
                  <Link href={item.url} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const clerk = useClerk();

  const mainMenuItems: MenuItem[] = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Explore Voice", url: "/voices", icon: LayoutGrid },
    { title: "Text to speech", url: "/text-to-speech", icon: AudioLines },
    { title: "Voice cloning ", icon: Volume2 },
  ];

  const othersMenuItems: MenuItem[] = [
    { title: "Settings", icon: Settings, onClick: () => clerk.openOrganizationProfile() },
    { title: "Help and support", url: "mailto:support@ekkon.ai", icon: Headphones },
  ];

  return (
    <Sidebar collapsible="icon" className="group">
      <SidebarHeader className="flex flex-col gap-4 pt-4">
        <div className="flex items-center gap-2 pl-1 group-data-[collapsed=icon]:justify-center group-data-[collapsed=icon]:pl-2">
          <Image src="/logo.svg" alt="Ekkon Logo" width={24} height={24} />
          <span className="text-foreground text-lg font-semibold tracking-tighter group-data-[collapsible=icon]:hidden">
            Ekkon
          </span>
          <SidebarTrigger className="ml-auto lg:hidden" />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <OrganizationSwitcher
              hidePersonal
              fallback={
                <Skeleton className="border-border h-9 w-full rounded-md border group-data-[collapsible=icon]:size-9" />
              }
              appearance={{
                elements: {
                  rootBox:
                    "w-full group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center",

                  organizationSwitcherTrigger:
                    "w-full flex items-center justify-between bg-background border border-border rounded-md px-2 py-1.5 gap-2 transition-colors hover:bg-muted group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:p-1.5 :shadow-[0px_1px_1px_0px_rgba(44,54,53,0.03)",

                  organizationPreview:
                    "flex items-center gap-2 group-data-[collapsible=icon]:gap-0",

                  organizationPreviewAvatarBox: "size-6 rounded-md shrink-0",

                  organizationPreviewTextContainer:
                    "text-xs font-medium tracking-tight text-foreground group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden",

                  organizationPreviewMainIdentifier:
                    "text-[13px] group-data-[collapsible=icon]:hidden",

                  organizationPreviewSecondaryIdentifier: "group-data-[collapsible=icon]:hidden",

                  organizationSwitcherTriggerIcon:
                    "size-4 text-sidebar-foreground group-data-[collapsible=icon]:hidden",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="border-border border-b border-dashed" />
      <SidebarContent>
        <NavSelection label="Main" pathName={pathname} items={mainMenuItems} />
        <SidebarSeparator className="my-2" />
        <NavSelection label="Others" pathName={pathname} items={othersMenuItems} />
      </SidebarContent>
      <div className="border-border border-b border-dashed" />
      <SidebarFooter className="gap-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName={true}
              fallback={
                <Skeleton className="border-border h-8.5 w-full rounded-md border bg-white group-data-[collapsible=icon]:size-8" />
              }
              appearance={{
                elements: {
                  rootBox:
                    "w-full group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center",
                  userButtonTrigger:
                    "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
                  userButtonBox: "flex-row-reverse! gap-2!",
                  userButtonOuterIdentifier:
                    "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                  userButtonAvatarBox: "size-6!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
