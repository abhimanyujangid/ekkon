import { useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Spinner } from "@/src/components/ui/spinner";
import { useCheckout } from "@/src/feature/billing/hooks/use-checkout";
import { useTRPC } from "@/src/trpc/client";
import type { FreeCredits } from "@/src/lib/org-entitlements";

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function UsageCardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background border-border rounded-lg border p-3 group-data-[collapsible=icon]:hidden">
      {children}
    </div>
  );
}

function LoadingCard() {
  return (
    <UsageCardShell>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </UsageCardShell>
  );
}

function UpgradeCard({ trialExhausted }: { trialExhausted?: boolean }) {
  const { checkout, isPending: isCheckoutPending } = useCheckout();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-foreground text-sm font-semibold tracking-tight">Pay as you go</p>
        <p className="text-muted-foreground mt-1 text-xs">
          {trialExhausted
            ? "Free trial used — subscribe to continue generating speech and custom voices."
            : "Generate speech starting at $0.30 per 1,000 characters"}
        </p>
      </div>
      <Button
        variant="outline"
        className="w-full text-xs"
        size="sm"
        disabled={isCheckoutPending}
        onClick={checkout}
      >
        {isCheckoutPending ? (
          <>
            <Spinner className="size-3" />
            Redirecting...
          </>
        ) : (
          "Upgrade"
        )}
      </Button>
    </div>
  );
}

function TrialInfoCard({ freeCredits }: { freeCredits: FreeCredits }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-foreground text-sm font-semibold tracking-tight">Free trial</p>
      <ul className="text-muted-foreground space-y-1 text-xs">
        <li>
          {freeCredits.voiceCreations.remaining}/{freeCredits.voiceCreations.limit} custom voice
          uploads remaining
        </li>
        <li>
          {freeCredits.generations.remaining}/{freeCredits.generations.limit} voice generations
          remaining
        </li>
      </ul>
      <p className="text-muted-foreground text-xs">
        Use these to try the product before subscribing.
      </p>
    </div>
  );
}

function UsageCard({ estimatedCostCents }: { estimatedCostCents: number }) {
  const trpc = useTRPC();
  const portalMutation = useMutation(trpc.billing.createPortalSession.mutationOptions({}));

  const openPortal = useCallback(() => {
    portalMutation.mutate(undefined, {
      onSuccess: (data) => {
        window.open(data.portalUrl, "_blank");
      },
    });
  }, [portalMutation]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-foreground text-sm font-semibold tracking-tight">Current usage</p>
        <p className="text-foreground mt-1 text-xl font-bold tracking-tight">
          {formatCurrency(estimatedCostCents)}
        </p>
        <p className="text-muted-foreground mt-0.5 text-xs">Estimated this period</p>
      </div>
      <Button
        variant="outline"
        className="w-full text-xs"
        size="sm"
        disabled={portalMutation.isPending}
        onClick={openPortal}
      >
        {portalMutation.isPending ? (
          <>
            <Spinner className="size-3" />
            Redirecting...
          </>
        ) : (
          "Manage Subscription"
        )}
      </Button>
    </div>
  );
}

export function UsageContainer() {
  const trpc = useTRPC();
  const { data, isPending, isError, refetch } = useQuery(trpc.billing.getStatus.queryOptions());

  if (isPending) {
    return <LoadingCard />;
  }

  if (isError) {
    return (
      <UsageCardShell>
        <div className="flex flex-col gap-2">
          <p className="text-foreground text-sm font-semibold tracking-tight">Free trial</p>
          <p className="text-muted-foreground text-xs">Could not load usage. Please try again.</p>
          <Button variant="outline" className="w-full text-xs" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </UsageCardShell>
    );
  }

  const hasFreeCreditsRemaining =
    data.freeCredits.voiceCreations.remaining > 0 || data.freeCredits.generations.remaining > 0;

  const trialExhausted =
    data.freeCredits.voiceCreations.remaining === 0 && data.freeCredits.generations.remaining === 0;

  return (
    <UsageCardShell>
      {data.hasActiveSubscription ? (
        <UsageCard estimatedCostCents={data.estimatedCostCents} />
      ) : hasFreeCreditsRemaining ? (
        <TrialInfoCard freeCredits={data.freeCredits} />
      ) : (
        <UpgradeCard trialExhausted={trialExhausted} />
      )}
    </UsageCardShell>
  );
}
