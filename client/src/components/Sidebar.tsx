import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare, Settings, User, LogOut, PanelLeftClose } from "lucide-react";

export function Sidebar() {
  const recentProjects = [
    { id: 1, name: "E-commerce Dashboard", time: "2 hours ago" },
    { id: 2, name: "SaaS Landing Page", time: "Yesterday" },
    { id: 3, name: "Weather Widget App", time: "3 days ago" },
  ];

  return (
    <div className="w-[260px] h-full flex flex-col bg-card border-r border-border/50">
      <div className="p-4 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinelinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span>LovableClone</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <PanelLeftClose size={18} />
        </Button>
      </div>

      <div className="p-4">
        <Button className="w-full justify-start gap-2 shadow-sm" variant="default">
          <Plus size={16} />
          New Project
        </Button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Recent Projects
        </div>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1">
            {recentProjects.map((project) => (
              <button
                key={project.id}
                className="w-full flex flex-col items-start px-3 py-2.5 rounded-md hover:bg-muted/50 transition-colors text-left group"
              >
                <div className="flex items-center gap-2 w-full text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  <MessageSquare
                    size={14}
                    className="text-muted-foreground group-hover:text-primary"
                  />
                  <span className="truncate">{project.name}</span>
                </div>
                <span className="text-xs text-muted-foreground pl-6">{project.time}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="p-4 border-t border-border/50 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground h-9 px-2"
        >
          <Settings size={16} />
          Settings
        </Button>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/20 px-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs font-medium">
              JD
            </div>
            <span className="text-sm font-medium">John Doe</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
