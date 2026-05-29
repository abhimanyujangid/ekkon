import { TRPCError } from "@trpc/server";
import { polar } from "@/src/lib/polar";
import { prisma } from "@/src/lib/db";

export const FREE_VOICE_CREATIONS_LIMIT = 3;
export const FREE_GENERATIONS_LIMIT = 3;

export type EntitlementKind = "voice_creation" | "generation";
export type BillingMode = "free" | "metered";

export type FreeCreditBucket = {
  used: number;
  limit: number;
  remaining: number;
};

export type FreeCredits = {
  voiceCreations: FreeCreditBucket;
  generations: FreeCreditBucket;
};

function toBucket(used: number, limit: number): FreeCreditBucket {
  return {
    used,
    limit,
    remaining: Math.max(0, limit - used),
  };
}

export async function getOrgUsage(orgId: string) {
  return prisma.orgUsage.upsert({
    where: { orgId },
    create: { orgId },
    update: {},
  });
}

export async function getFreeCredits(orgId: string): Promise<FreeCredits> {
  const usage = await getOrgUsage(orgId);

  return {
    voiceCreations: toBucket(usage.freeVoiceCreationsUsed, FREE_VOICE_CREATIONS_LIMIT),
    generations: toBucket(usage.freeGenerationsUsed, FREE_GENERATIONS_LIMIT),
  };
}

export async function hasActiveSubscription(orgId: string): Promise<boolean> {
  try {
    const customerState = await polar.customers.getStateExternal({
      externalId: orgId,
    });
    return (customerState.activeSubscriptions ?? []).length > 0;
  } catch {
    return false;
  }
}

export async function assertCanUse(
  orgId: string,
  kind: EntitlementKind,
): Promise<{ billingMode: BillingMode }> {
  const usage = await getOrgUsage(orgId);

  const hasFreeCredit =
    kind === "voice_creation"
      ? usage.freeVoiceCreationsUsed < FREE_VOICE_CREATIONS_LIMIT
      : usage.freeGenerationsUsed < FREE_GENERATIONS_LIMIT;

  if (hasFreeCredit) {
    return { billingMode: "free" };
  }

  if (await hasActiveSubscription(orgId)) {
    return { billingMode: "metered" };
  }

  throw new TRPCError({
    code: "FORBIDDEN",
    message: "SUBSCRIPTION_REQUIRED",
  });
}

export async function recordFreeUsage(orgId: string, kind: EntitlementKind): Promise<void> {
  if (kind === "voice_creation") {
    await prisma.orgUsage.updateMany({
      where: {
        orgId,
        freeVoiceCreationsUsed: { lt: FREE_VOICE_CREATIONS_LIMIT },
      },
      data: { freeVoiceCreationsUsed: { increment: 1 } },
    });
    return;
  }

  await prisma.orgUsage.updateMany({
    where: {
      orgId,
      freeGenerationsUsed: { lt: FREE_GENERATIONS_LIMIT },
    },
    data: { freeGenerationsUsed: { increment: 1 } },
  });
}
