import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Sidebar } from "@/components/Sidebar";
import { ChatPanel } from "@/components/ChatPanel";
import { PreviewPanel } from "@/components/PreviewPanel";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="h-screen w-full bg-background flex overflow-hidden text-foreground">
      <Sidebar />
      
      <main className="flex-1 flex w-full h-full border-l border-border/50">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
            <ChatPanel />
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-border/50 hover:bg-primary/50 transition-colors" />
          
          <ResizablePanel defaultSize={65}>
            <PreviewPanel activeTab={activeTab} onTabChange={setActiveTab} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}