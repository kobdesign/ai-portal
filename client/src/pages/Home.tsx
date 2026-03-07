import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ActivityBar } from "@/components/ActivityBar";
import { ChatPanel } from "@/components/ChatPanel";
import { IntegrationsPanel } from "@/components/IntegrationsPanel";
import { FilesPanel } from "@/components/FilesPanel";
import { PreviewPanel } from "@/components/PreviewPanel";
import { ShieldCheck, DatabaseZap } from "lucide-react";

export type SidebarTab = "agent" | "files" | "integrations" | "data" | "security" | "settings";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [activeSidebar, setActiveSidebar] = useState<SidebarTab>("agent");

  return (
    <div className="h-screen w-full bg-background flex overflow-hidden text-foreground">
      <ActivityBar active={activeSidebar} onChange={setActiveSidebar} />
      
      <main className="flex-1 flex w-full h-full border-l border-border/40">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={30} minSize={20} maxSize={45} className="bg-[#111113]">
            {activeSidebar === "agent" && <ChatPanel />}
            {activeSidebar === "files" && <FilesPanel />}
            {activeSidebar === "integrations" && <IntegrationsPanel />}
            {activeSidebar === "data" && (
              <div className="h-full flex flex-col p-6 text-center items-center justify-center bg-background/50">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
                  <DatabaseZap size={32} className="text-indigo-400" />
                </div>
                <h2 className="text-lg font-semibold mb-2">Enterprise Data Hub</h2>
                <p className="text-sm text-muted-foreground max-w-[250px] mb-6">
                  เชื่อมต่อฐานข้อมูล On-Premise ขององค์กรอย่างปลอดภัยผ่าน Secure Tunnel (Oracle, MS SQL, DB2)
                </p>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Setup Secure Connection
                </button>
              </div>
            )}
            {activeSidebar === "security" && (
              <div className="h-full flex flex-col p-6 text-center items-center justify-center bg-background/50">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <ShieldCheck size={32} className="text-emerald-400" />
                </div>
                <h2 className="text-lg font-semibold mb-2">Security & PDPA Compliance</h2>
                <p className="text-sm text-muted-foreground max-w-[250px] mb-6">
                  ตรวจสอบโค้ดและการจัดการข้อมูลให้สอดคล้องกับ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) อัตโนมัติ
                </p>
                <button className="px-4 py-2 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 rounded-lg text-sm font-medium transition-colors">
                  Run Full Audit Scan
                </button>
              </div>
            )}
            {activeSidebar === "settings" && (
              <div className="p-6 text-muted-foreground flex flex-col items-center justify-center h-full text-sm">
                Workspace Settings
              </div>
            )}
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-border/40 hover:bg-indigo-500/50 transition-colors w-[2px]" />
          
          <ResizablePanel defaultSize={70}>
            <PreviewPanel activeTab={activeTab} onTabChange={setActiveTab} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}