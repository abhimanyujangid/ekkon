import { BookOpen, Megaphone, Mic, Type } from "lucide-react";

export const TEXT_MAX_LENGTH = 5000;
export const COST_PER_UNIT = 0.0003; // Example cost per unit of text

export const SUGGESTIONS = [
  {
    icon: BookOpen,
    label: "Story narration",
    text: "Once upon a time in a distant land, there lived a young explorer who dreamed of discovering hidden worlds beyond the mountains.",
  },
  {
    icon: Megaphone,
    label: "Marketing copy",
    text: "Introducing Ekkon, the AI voice generation platform that turns your text into realistic, natural-sounding speech.",
  },
  {
    icon: Mic,
    label: "Podcast intro",
    text: "Welcome back to another episode! Today we're diving deep into the fascinating world of artificial intelligence and how it's shaping our future.",
  },
  {
    icon: Type,
    label: "Notification",
    text: "Hey there! Just a quick heads up — your order has been shipped and will arrive by tomorrow evening. Thanks for shopping with us!",
  },
];
