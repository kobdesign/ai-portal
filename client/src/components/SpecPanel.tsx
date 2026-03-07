import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileJson2, FileCode, Play, UploadCloud, Link2, CheckCircle2, ChevronRight, Layers, LayoutTemplate } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SpecPanel() {
  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="p-4 border-b border-border/40 bg-card">
        <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
          Spec-Driven Dev
          <span className="px-1.5 py-0.5 text-[10px] bg-sky-500/20 text-sky-400 rounded uppercase font-bold tracking-wider">OpenSpec</span>
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          เขียนและอัปโหลด OpenAPI / Swagger Spec เพื่อให้ AI สร้าง UI, Forms, และ API Client ให้แบบอัตโนมัติ
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-5">
          {/* Upload Spec Area */}
          <div className="border-2 border-dashed border-sky-500/30 rounded-xl p-5 flex flex-col items-center justify-center text-center bg-sky-500/5 hover:bg-sky-500/10 transition-colors cursor-pointer group">
            <UploadCloud size={28} className="text-sky-400 mb-2 group-hover:-translate-y-1 transition-transform" />
            <span className="text-sm font-medium text-foreground">Upload OpenAPI / AsyncAPI Spec</span>
            <span className="text-xs text-muted-foreground mt-1">.json, .yaml หรือกรอก URL ของ Swagger</span>
          </div>

          <div className="h-px w-full bg-border/40" />

          {/* Active Specification */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <FileJson2 size={14} className="text-foreground" />
              Active Specification
            </h3>
            
            <div className="p-4 rounded-xl border border-border/40 bg-[#18181b] space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                    Core Banking API v2.4
                    <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20 h-5">Valid</Badge>
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">Found 45 endpoints, 24 schemas</p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-sky-400">
                  <Link2 size={14} />
                </Button>
              </div>

              {/* AI Generators based on Spec */}
              <div className="space-y-2 pt-2 border-t border-border/40">
                <p className="text-xs text-muted-foreground mb-2">AI Auto-Generation Capabilities:</p>
                
                <button className="w-full flex items-center justify-between p-2.5 rounded-lg bg-background border border-border/40 hover:border-sky-500/50 hover:bg-sky-500/5 transition-colors group text-left">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                      <LayoutTemplate size={12} />
                    </div>
                    <div>
                      <span className="text-sm font-medium block">Scaffold CRUD UI (React)</span>
                      <span className="text-[10px] text-muted-foreground">สร้างหน้า List, Create, Edit พร้อม Form Validation อัตโนมัติ</span>
                    </div>
                  </div>
                  <Play size={14} className="text-muted-foreground group-hover:text-sky-400" />
                </button>

                <button className="w-full flex items-center justify-between p-2.5 rounded-lg bg-background border border-border/40 hover:border-sky-500/50 hover:bg-sky-500/5 transition-colors group text-left">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <FileCode size={12} />
                    </div>
                    <div>
                      <span className="text-sm font-medium block">Generate TS Interfaces & React Query</span>
                      <span className="text-[10px] text-muted-foreground">สร้าง Type แบบ Strict ตรวจสอบด้วย Zod</span>
                    </div>
                  </div>
                  <Play size={14} className="text-muted-foreground group-hover:text-indigo-400" />
                </button>

                <button className="w-full flex items-center justify-between p-2.5 rounded-lg bg-background border border-border/40 hover:border-sky-500/50 hover:bg-sky-500/5 transition-colors group text-left">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Layers size={12} />
                    </div>
                    <div>
                      <span className="text-sm font-medium block">Create Mock Server (MSW)</span>
                      <span className="text-[10px] text-muted-foreground">จำลองข้อมูลเสมือนจริงให้ฝั่ง Frontend ทำงานได้ทันที</span>
                    </div>
                  </div>
                  <Play size={14} className="text-muted-foreground group-hover:text-emerald-400" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}