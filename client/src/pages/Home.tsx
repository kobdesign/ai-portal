import { useState } from "react";
import { useLocation } from "wouter";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ActivityBar } from "@/components/ActivityBar";
import { ChatPanel } from "@/components/ChatPanel";
import { IntegrationsPanel } from "@/components/IntegrationsPanel";
import { FilesPanel } from "@/components/FilesPanel";
import { KnowledgePanel } from "@/components/KnowledgePanel";
import { GovernancePanel } from "@/components/GovernancePanel";
import { SpecPanel } from "@/components/SpecPanel";
import { LifecyclePanel } from "@/components/LifecyclePanel";
import { PreviewPanel } from "@/components/PreviewPanel";
import { DeploymentPanel } from "@/components/DeploymentPanel";
import { TopologyPanel } from "@/components/TopologyPanel";
import { ShieldCheck, DatabaseZap, GitMerge, FileArchive, Link, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type SidebarTab = "agent" | "lifecycle" | "spec" | "files" | "repo" | "knowledge" | "integrations" | "data" | "governance" | "security" | "settings" | "deploy" | "topology";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [activeSidebar, setActiveSidebar] = useState<SidebarTab>("agent");
  const [, setLocation] = useLocation();

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden text-foreground">
      {/* Top Navigation Bar like Replit Workspace */}
      <div className="h-10 bg-[#18181b] border-b border-border/40 flex items-center px-4 justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLocation("/")}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </button>
          <div className="h-4 w-px bg-border/60"></div>
          <div className="text-xs font-medium text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Current Project Workspace
          </div>
        </div>
        <div className="text-[10px] text-slate-500 bg-black/20 px-2 py-0.5 rounded border border-white/5">
          Auto-saving...
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <ActivityBar active={activeSidebar} onChange={setActiveSidebar} />
        
        <main className="flex-1 flex w-full h-full border-l border-border/40">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={35} minSize={25} maxSize={50} className="bg-[#111113]">
              {activeSidebar === "agent" && <ChatPanel />}
              {activeSidebar === "lifecycle" && <LifecyclePanel />}
              {activeSidebar === "spec" && <SpecPanel />}
              {activeSidebar === "files" && <FilesPanel />}
              {activeSidebar === "integrations" && <IntegrationsPanel />}
              {activeSidebar === "knowledge" && <KnowledgePanel />}
              {activeSidebar === "governance" && <GovernancePanel />}
              {activeSidebar === "deploy" && <DeploymentPanel />}
              {activeSidebar === "topology" && <TopologyPanel />}
              
              {activeSidebar === "repo" && (
                <div className="h-full flex flex-col bg-background/50">
                  <div className="p-4 border-b border-border/40 bg-card">
                    <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                      Code & Legacy Sync
                      <span className="px-1.5 py-0.5 text-[10px] bg-amber-500/20 text-amber-400 rounded uppercase font-bold tracking-wider">Enterprise</span>
                    </h2>
                    <p className="text-sm text-muted-foreground">เชื่อมต่อ Repository ภายในองค์กรหรืออัปโหลดโค้ดระบบเก่าให้ AI วิเคราะห์</p>
                  </div>
                  
                  <div className="p-4 space-y-6 flex-1 overflow-y-auto">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <GitMerge size={16} className="text-orange-500" />
                        Internal Git / GitLab On-Premise
                      </h3>
                      <div className="flex flex-col gap-2">
                        <Input placeholder="https://gitlab.internal.company.com/project.git" className="bg-[#18181b] border-border/60 text-sm" />
                        <Input placeholder="Personal Access Token" type="password" className="bg-[#18181b] border-border/60 text-sm" />
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm h-9">
                          <Link size={14} className="mr-2" /> Connect Repository
                        </Button>
                      </div>
                    </div>

                    <div className="h-px w-full bg-border/40" />

                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <FileArchive size={16} className="text-amber-500" />
                        Legacy Codebase Upload (Zip/Tar)
                      </h3>
                      <p className="text-xs text-muted-foreground">อัปโหลด Source code จากระบบเก่า (เช่น SVN, AS/400, PHP เก่า) ให้ AI เรียนรู้และ Refactor เป็น Modern Stack</p>
                      <div className="border-2 border-dashed border-border/60 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-[#18181b] hover:bg-muted/30 transition-colors cursor-pointer group">
                        <FileArchive size={28} className="text-muted-foreground group-hover:text-amber-400 mb-2 transition-colors" />
                        <span className="text-sm font-medium text-foreground">Drag & Drop codebase zip here</span>
                        <span className="text-xs text-muted-foreground mt-1">Max size: 500MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
            
            <ResizableHandle withHandle className="bg-border/40 hover:bg-sky-500/50 transition-colors w-[2px]" />
            
            <ResizablePanel defaultSize={65}>
              <PreviewPanel activeTab={activeTab} onTabChange={setActiveTab} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </div>
  );
}