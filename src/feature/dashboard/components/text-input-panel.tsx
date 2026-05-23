"use client";

import { useState, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";

import { SUGGESTIONS, TEXT_MAX_LENGTH } from "@/src/feature/text-to-speech/data/constant";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";

export function TextInputPanel() {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const charCount = text.length;
  const charPercent = (charCount / TEXT_MAX_LENGTH) * 100;
  const isEmpty = text.trim().length === 0;

  const handleGenerate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    router.push(`/text-to-speech?text=${encodeURIComponent(trimmed)}`);
  };

  const applySuggestion = (suggestion: string) => {
    setText(suggestion);
    textareaRef.current?.focus();
  };

  return (
    <div className="space-y-3">
      {/* Main input card with gradient border */}
      <div
        className={cn(
          "rounded-[20px] p-0.5 shadow-[0_0_0_4px_white] transition-all duration-500",
          isFocused
            ? "bg-linear-185 from-[#8b5cf6] from-15% via-[#06b6d4] via-50% to-[#10b981] to-85%"
            : "bg-linear-185 from-[#ff8ee3] from-15% via-[#57d7e0] via-39% to-[#dbf1f2] to-85%",
        )}
      >
        {/* Using px values for border-radius to ensure proper gradient border math (outer - padding = inner). */}
        {/* Standard classes like rounded-4xl use CSS calc() which doesn't align cleanly at corners. */}

        <div className="rounded-[18px] bg-[#F9F9F9] p-1">
          <div className="rounded-[16px] bg-white drop-shadow-xs">
            {/* Textarea area */}
            <div className="p-1 pb-2">
              <Textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Start typing or paste your text here..."
                maxLength={TEXT_MAX_LENGTH}
                className="placeholder:text-muted-foreground/50 min-h-28 resize-none border-0 bg-transparent p-2 text-[15px] leading-relaxed shadow-none focus:ring-0 focus-visible:ring-0"
              />
            </div>

            {/* Bottom toolbar */}
            <div className="border-border/40 flex items-center justify-between border-t px-4 py-2.5">
              {/* Left side — character count */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="relative size-4">
                    <svg className="size-4 -rotate-90" viewBox="0 0 16 16">
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-muted/60"
                      />
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${(charPercent / 100) * 37.7} 37.7`}
                        className={cn(
                          "transition-all duration-300",
                          charPercent > 90
                            ? "text-red-500"
                            : charPercent > 70
                              ? "text-amber-500"
                              : "text-primary",
                        )}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span
                    className={cn(
                      "text-xs tabular-nums transition-colors",
                      charPercent > 90 ? "font-medium text-red-500" : "text-muted-foreground",
                    )}
                  >
                    {charCount.toLocaleString()}/{TEXT_MAX_LENGTH.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Right side — generate button */}
              <Button
                size="sm"
                onClick={handleGenerate}
                disabled={isEmpty}
                className={cn(
                  "gap-1.5 rounded-lg px-4 transition-all duration-300",
                  !isEmpty &&
                    "from-primary shadow-primary/25 hover:shadow-primary/30 bg-gradient-to-r to-violet-600 shadow-md hover:shadow-lg",
                )}
              >
                <Sparkles className="size-3.5" />
                Generate
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap items-center gap-2 px-1">
        <span className="text-muted-foreground/70 text-xs font-medium">Try:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => applySuggestion(s.text)}
            className="group border-border/60 text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary inline-flex items-center gap-1.5 rounded-full border bg-white/80 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm transition-all hover:shadow-md active:scale-[0.97]"
          >
            <s.icon className="text-muted-foreground/60 group-hover:text-primary size-3 transition-colors" />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
