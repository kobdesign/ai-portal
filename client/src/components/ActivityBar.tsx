import { MessageSquare, FolderCode, Blocks, Settings, UserCircle, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarTab } from "@/pages/Home";

interface ActivityBarProps {
  active: SidebarTab;
  onChange: (tab: SidebarTab) => void;
}

export function ActivityBar({ active, onChange }: ActivityBarProps) {
  const topItems = [
    { id: "agent", icon: MessageSquare, label: "AI Agent" },
    { id: "files", icon: FolderCode, label: "Explorer" },
    { id: "integrations", icon: Blocks, label: "Services & Integrations" },
  ] as const;

  const bottomItems = [
    { id: "settings", icon: Settings, label: "Settings" },
  ] as const;

  return (
    <div className="w-14 h-full flex flex-col items-center py-4 bg-[#18181b] border-r border-border/40 justify-between">
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center mb-4">
          <Zap size={18} className="fill-primary/50" />
        </div>

        {topItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <Tooltip key={item.id} placement="right">
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChange(item.id)}
                  className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <Tooltip key={item.id} placement="right">
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChange(item.id)}
                  className={`p-2.5 rounded-xl transition-all ${
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={22} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
        <button className="p-1 mt-2">
          <UserCircle size={28} className="text-muted-foreground hover:text-foreground transition-colors" />
        </button>
      </div>
    </div>
  );
}