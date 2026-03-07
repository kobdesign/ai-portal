import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Play, Plus, CircleDashed, CheckCircle2, Layers, FileEdit, Clock, FolderKanban, IterationCcw, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SpecPanel() {
  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="p-4 border-b border-border/40 bg-card">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Project Specs
            <span className="px-1.5 py-0.5 text-[10px] bg-sky-500/20 text-sky-400 rounded uppercase font-bold tracking-wider">OpenSpec</span>
          </h2>
          <Button size="sm" className="h-7 bg-sky-600 hover:bg-sky-700 text-xs px-2.5">
            <Plus size={14} className="mr-1" /> New Epic
          </Button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          จัดการ Requirement สั่ง AI ให้พัฒนาโค้ดตาม Spec และติดตามว่า Spec ถูกใช้งานใน Lifecycle ขั้นตอนไหน
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          
          {/* Project Progress Summary */}
          <div className="grid grid-cols-3 gap-3 mb-2">
            <div className="bg-[#18181b] border border-border/40 rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold text-sky-400">12</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Total Specs</span>
            </div>
            <div className="bg-[#18181b] border border-border/40 rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold text-amber-400">3</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">In Progress</span>
            </div>
            <div className="bg-[#18181b] border border-border/40 rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold text-emerald-400">5</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Completed</span>
            </div>
          </div>

          {/* Epic 1 - Tied to Lifecycle FEAT-1 */}
          <div className="bg-[#18181b] border border-sky-500/30 shadow-[0_0_10px_rgba(14,165,233,0.05)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-card/50 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-sky-400" />
                <h3 className="font-medium text-sm text-foreground">EPIC-01: Authentication Module</h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[9px] h-5 bg-purple-500/10 text-purple-400 border-purple-500/30 flex items-center gap-1 cursor-pointer hover:bg-purple-500/20">
                  <FolderKanban size={10} /> Active in FEAT-1
                </Badge>
              </div>
            </div>
            
            <div className="divide-y divide-border/40">
              {/* User Story 1 - Active in Implementation */}
              <div className="p-3 hover:bg-muted/30 transition-colors group bg-sky-500/5 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-sky-500"></div>
                <div className="flex items-start justify-between">
                  <div className="flex gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground">US-101: Corporate SSO Login</h4>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">
                        ผู้ใช้สามารถ Login เข้าสู่ระบบด้วย Azure AD ของบริษัทได้
                      </p>
                      
                      {/* Lifecycle Phase Indicator */}
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-[9px] h-4 bg-purple-500/20 text-purple-300 border-none">
                          <Code2 size={10} className="mr-1" /> Lifecycle: Implementing
                        </Badge>
                        <Badge variant="outline" className="text-[9px] h-4 text-sky-300 border-sky-500/20">Security</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button size="sm" className="h-7 text-[11px] bg-sky-600 hover:bg-sky-700 w-full">
                      <Play size={10} className="mr-1" /> Open in Chat
                    </Button>
                  </div>
                </div>
              </div>

              {/* User Story 2 */}
              <div className="p-3 hover:bg-muted/30 transition-colors group">
                <div className="flex items-start justify-between">
                  <div className="flex gap-2">
                    <Clock size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground">US-102: Role-based Access Control</h4>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">
                        กำหนดสิทธิ์การเข้าถึงเมนูต่างๆ ตามแผนก (Maker, Checker)
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                         <Badge variant="outline" className="text-[9px] h-4 border-border/60 text-muted-foreground">
                          <IterationCcw size={10} className="mr-1" /> Pending Plan
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                      <FileEdit size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Epic 2 */}
          <div className="bg-[#18181b] border border-border/40 rounded-xl overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
            <div className="px-4 py-3 bg-card/50 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-slate-400" />
                <h3 className="font-medium text-sm text-foreground">EPIC-02: Customer Dashboard</h3>
              </div>
              <Badge variant="outline" className="text-[10px] h-5 bg-slate-500/10 text-slate-400 border-slate-500/20">Not Started</Badge>
            </div>
            
            <div className="divide-y divide-border/40">
              <div className="p-3 hover:bg-muted/30 transition-colors group">
                <div className="flex items-start justify-between">
                  <div className="flex gap-2">
                    <CircleDashed size={16} className="text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground">US-201: Transaction History</h4>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">
                        แสดงรายการธุรกรรมย้อนหลัง 6 เดือน พร้อม Export เป็น PDF
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" className="h-7 text-xs border-sky-500/30 text-sky-400 hover:bg-sky-500/10">
                       Start Feature Loop
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </ScrollArea>
    </div>
  );
}