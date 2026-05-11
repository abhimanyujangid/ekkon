import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import { cn } from "@/src/lib/utils";

export function PageHeader({ title, className }: { title: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between p-4", className)}>
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" asChild>
          <Link href="mailto:feedback@ekkon.ai">
            <ThumbsUp className="size-4" />
            <span className="sr-only">Feedback</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/support">
            <Headphones className="size-4" />
            <span className="sr-only">Support</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
