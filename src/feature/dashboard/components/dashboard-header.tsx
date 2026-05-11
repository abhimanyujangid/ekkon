"use client";
import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/src/components/ui/button";

export function DashboardHeader() {
  const { isLoaded, user } = useUser();

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm">Nice to see you</p>
        <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
          {isLoaded ? (user?.fullName ?? user?.firstName ?? "there") : "..."}
        </h1>
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <Button variant="outline" size="sm" asChild>
          <Link href="mailto:feedback@ekkon.ai">
            <ThumbsUp className="size-4" />
            <span className="hidden lg:block">Feedback</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/support">
            <Headphones className="size-4" />
            <span className="hidden lg:block">Support</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
