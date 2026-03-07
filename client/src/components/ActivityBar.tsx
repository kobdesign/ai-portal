import { MessageSquare, FolderCode, Blocks, Settings, Zap, ShieldCheck, DatabaseZap, GitMerge, BookOpen, UserCheck, FileJson2, IterationCcw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarTab } from "@/pages/Home";

interface ActivityBarProps {
  active: SidebarTab;
  onChange: (tab: SidebarTab) => void;
}

export function ActivityBar({ active, onChange }: ActivityBarProps) {
  const topItems = [
    { id: "agent", icon: MessageSquare, label: "Enterprise AI Agent" },
    { id: "lifecycle", icon: IterationCcw, label: "Project Lifecycle (Ideate to Deploy)" },
    { id: "spec", icon: FileJson2, label: "Spec-Driven Development (OpenSpec)" },
    { id: "files", icon: FolderCode, label: "Project Explorer" },
    { id: "repo", icon: GitMerge, label: "Code Repository & Legacy Sync" },
    { id: "knowledge", icon: BookOpen, label: "Corporate Knowledge Base" },
    { id: "integrations", icon: Blocks, label: "Services & API" },
    { id: "data", icon: DatabaseZap, label: "Enterprise Data Hub" },
    { id: "governance", icon: UserCheck, label: "Governance & Audit Logs" },
    { id: "security", icon: ShieldCheck, label: "Security & PDPA" },
  ] as const;

  const bottomItems = [
    { id: "settings", icon: Settings, label: "Workspace Settings" },
  ] as const;

  return (
    <div className="w-14 h-full flex flex-col items-center py-4 bg-[#18181b] border-r border-border/40 justify-between shrink-0 overflow-y-auto overflow-x-hidden scrollbar-none">
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2 border border-indigo-500/30 shrink-0">
          <Zap size={18} className="fill-indigo-500/50" />
        </div>

        {topItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id || (active === "settings" && false); // just for typing
          return (
            <Tooltip key={item.id} placement="right">
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChange(item.id as SidebarTab)}
                  className={`relative p-2.5 rounded-xl transition-all duration-200 shrink-0 ${
                    isActive 
                      ? "text-indigo-400 bg-indigo-500/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10} className="z-50">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4 w-full mt-4 shrink-0">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <Tooltip key={item.id} placement="right">
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChange(item.id as SidebarTab)}
                  className={`p-2.5 rounded-xl transition-all ${
                    isActive ? "text-indigo-400 bg-indigo-500/10" : "text-muted-foreground hover:text-foreground"
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
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
            SCB
          </div>
        </button>
      </div>
    </div>
  );
}