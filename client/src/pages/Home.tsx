import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ActivityBar } from "@/components/ActivityBar";
import { ChatPanel } from "@/components/ChatPanel";
import { IntegrationsPanel } from "@/components/IntegrationsPanel";
import { FilesPanel } from "@/components/FilesPanel";
import { PreviewPanel } from "@/components/PreviewPanel";

export type SidebarTab = "agent" | "files" | "integrations" | "settings";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [activeSidebar, setActiveSidebar] = useState<SidebarTab>("agent");

  return (
    <div className="h-screen w-full bg-background flex overflow-hidden text-foreground">
      <ActivityBar active={activeSidebar} onChange={setActiveSidebar} />
      
      <main className="flex-1 flex w-full h-full border-l border-border/40">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={30} minSize={20} maxSize={45} className="bg-card">
            {activeSidebar === "agent" && <ChatPanel />}
            {activeSidebar === "files" && <FilesPanel />}
            {activeSidebar === "integrations" && <IntegrationsPanel />}
            {activeSidebar === "settings" && (
              <div className="p-6 text-muted-foreground flex flex-col items-center justify-center h-full text-sm">
                Settings Workspace (Coming Soon)
              </div>
            )}
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-border/40 hover:bg-primary/50 transition-colors w-[2px]" />
          
          <ResizablePanel defaultSize={70}>
            <PreviewPanel activeTab={activeTab} onTabChange={setActiveTab} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}