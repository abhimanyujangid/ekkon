import TextToSpeechView from "@/src/feature/text-to-speech/views/text-to-speech-view";
import { trpc, HydrateClient, prefetch } from "@/src/trpc/server";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Text to AI Voice" };

export default async function TextToSpeechPage({
  searchParams,
}: {
  searchParams: Promise<{ text?: string; voiceId?: string }>;
}) {
  const { text, voiceId } = await searchParams;

  prefetch(trpc.voices.getAll.queryOptions());
  // prefetch(trpc.generations.getAll.queryOptions());

  return (
    <HydrateClient>
      <TextToSpeechView initialValues={{ text, voiceId }} />
    </HydrateClient>
  );
}
