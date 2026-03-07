import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, FileCode, UploadCloud, Library, Braces } from "lucide-react";

export function KnowledgePanel() {
  const knowledgeItems = [
    {
      id: 1,
      title: "Corporate Design System (Figma)",
      type: "UI/UX",
      status: "Synced",
      icon: <Library size={18} className="text-pink-500" />
    },
    {
      id: 2,
      title: "Core Banking API Specs (Swagger)",
      type: "API",
      status: "Synced 2h ago",
      icon: <Braces size={18} className="text-blue-500" />
    },
    {
      id: 3,
      title: "Secure Coding Guidelines 2024",
      type: "Policy",
      status: "Active",
      icon: <FileCode size={18} className="text-amber-500" />
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="p-4 border-b border-border/40 bg-card">
        <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
          Corporate Knowledge
          <span className="px-1.5 py-0.5 text-[10px] bg-indigo-500/20 text-indigo-400 rounded uppercase font-bold tracking-wider">RAG</span>
        </h2>
        <p className="text-sm text-muted-foreground">สอน AI ให้เขียนโค้ดตามมาตรฐานขององค์กร (Context Injection)</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border/60 rounded-xl p-5 flex flex-col items-center justify-center text-center bg-[#18181b] hover:bg-muted/30 transition-colors cursor-pointer">
            <UploadCloud size={24} className="text-muted-foreground mb-2" />
            <span className="text-sm font-medium">Upload Guidelines / API Docs</span>
            <span className="text-xs text-muted-foreground mt-1">PDF, Markdown, Swagger JSON</span>
          </div>

          <div className="space-y-2 mt-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Active Contexts</h3>
            {knowledgeItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-[#18181b]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-background flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <p className="text-[11px] text-muted-foreground">{item.type} • {item.status}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-indigo-400 hover:text-indigo-300">Update</Button>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}