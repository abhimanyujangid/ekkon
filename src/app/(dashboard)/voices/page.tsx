import type { Metadata } from "next";
import { prefetch, trpc, HydrateClient } from "@/src/trpc/server";
import { VoicesView } from "@/src/feature/voices/views/voices-view";
import { SearchParams } from "nuqs/server";
import { voicesSearchParamsCache } from "@/src/feature/voices/lib/params";

export const metadata: Metadata = { title: "Voices" };

export default async function VoicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query } = await voicesSearchParamsCache.parse(searchParams);

  prefetch(trpc.voices.getAll.queryOptions({ query }));

  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  );
}
