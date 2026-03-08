import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Check, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";

interface MessageActionsProps {
  content: string;
  onRegenerate?: () => void;
}

export function MessageActions({ content, onRegenerate }: MessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions = [
    {
      icon: copied ? Check : Copy,
      label: copied ? "Copied!" : "Copy",
      onClick: handleCopy,
      active: copied,
      activeClass: "text-emerald-400",
    },
    {
      icon: RotateCcw,
      label: "Regenerate",
      onClick: onRegenerate,
      active: false,
      activeClass: "",
    },
    {
      icon: ThumbsUp,
      label: "Good response",
      onClick: () => setFeedback(feedback === "up" ? null : "up"),
      active: feedback === "up",
      activeClass: "text-emerald-400",
    },
    {
      icon: ThumbsDown,
      label: "Bad response",
      onClick: () => setFeedback(feedback === "down" ? null : "down"),
      active: feedback === "down",
      activeClass: "text-red-400",
    },
  ];

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-0.5 mt-1">
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-md ${
                  action.active
                    ? action.activeClass
                    : "text-muted-foreground/50 hover:text-muted-foreground"
                } hover:bg-muted/50 transition-colors`}
                onClick={action.onClick}
              >
                <action.icon size={13} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-[11px] py-1 px-2">
              {action.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
