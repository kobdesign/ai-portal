import { FolderTree, FileJson, FileCode2, FileImage, Search, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export function FilesPanel() {
  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="p-4 border-b border-border/40 bg-card flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Explorer</h2>
          <div className="flex gap-1">
            <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors">
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search files..." 
            className="h-8 pl-8 text-xs bg-[#18181b] border-border/40 focus-visible:ring-primary/50"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 py-2">
        <div className="px-2 font-mono text-[13px]">
          {/* Mock File Tree */}
          <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-muted/50 rounded cursor-pointer text-foreground/80">
            <FolderTree size={14} className="text-blue-400" />
            <span>src</span>
          </div>
          <div className="pl-4">
            <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-muted/50 rounded cursor-pointer text-foreground/80">
              <FolderTree size={14} className="text-blue-400" />
              <span>components</span>
            </div>
            <div className="pl-4">
              <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-muted/50 rounded cursor-pointer text-foreground">
                <FileCode2 size={14} className="text-cyan-400" />
                <span>Dashboard.tsx</span>
              </div>
              <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-muted/50 rounded cursor-pointer text-foreground/80">
                <FileCode2 size={14} className="text-cyan-400" />
                <span>Sidebar.tsx</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-muted/50 rounded cursor-pointer text-foreground/80">
              <FileCode2 size={14} className="text-cyan-400" />
              <span>App.tsx</span>
            </div>
            <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-muted/50 rounded cursor-pointer text-foreground/80">
              <FileCode2 size={14} className="text-blue-500" />
              <span>index.css</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 py-1 px-2 mt-1 hover:bg-muted/50 rounded cursor-pointer text-foreground/80">
            <FolderTree size={14} className="text-blue-400" />
            <span>public</span>
          </div>
          <div className="flex items-center gap-1.5 py-1 px-2 mt-1 hover:bg-muted/50 rounded cursor-pointer text-foreground/80">
            <FileJson size={14} className="text-yellow-400" />
            <span>package.json</span>
          </div>
          <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-muted/50 rounded cursor-pointer text-foreground/80">
            <FileCode2 size={14} className="text-blue-500" />
            <span>vite.config.ts</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}