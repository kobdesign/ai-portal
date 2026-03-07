import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Network, 
  Activity, 
  Cpu, 
  Database, 
  Globe, 
  Zap, 
  AlertTriangle, 
  RefreshCw,
  Search,
  ArrowRight,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function TopologyPanel() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes = [
    { id: "sso", name: "Corporate SSO", type: "service", status: "healthy", connections: ["db1", "api1"] },
    { id: "api1", name: "Core Banking Gateway", type: "api", status: "warning", connections: ["db2"] },
    { id: "db1", name: "User Auth DB", type: "database", status: "healthy", connections: [] },
    { id: "db2", name: "Legacy Mainframe", type: "database", status: "healthy", connections: [] },
    { id: "mobile", name: "Sales Force App", type: "frontend", status: "healthy", connections: ["api1"] },
  ];

  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="p-4 border-b border-border/40 bg-card">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Enterprise Nervous System
            <span className="px-1.5 py-0.5 text-[10px] bg-sky-500/20 text-sky-400 rounded uppercase font-bold tracking-wider">Topology Map</span>
          </h2>
          <Button size="sm" variant="outline" className="h-7 text-xs border-border/60">
            <RefreshCw size={12} className="mr-1" /> Sync Map
          </Button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          แผนผังแสดงความเชื่อมโยงของระบบทั้งหมด (Architecture Dependency) และวิเคราะห์ผลกระทบก่อนแก้ไขโค้ด
        </p>
      </div>

      <div className="p-3 border-b border-border/40 flex gap-2 bg-[#18181b]">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <Input 
            placeholder="Search microservices, APIs, databases..." 
            className="h-8 pl-8 bg-black/40 border-border/60 text-xs"
          />
        </div>
        <Button variant="outline" size="sm" className="h-8 px-2 border-border/60">
          <Filter size={14} />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          
          {/* Status Overview */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#18181b] border border-border/40 rounded-xl p-3 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-slate-200">142</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Active Services</span>
            </div>
            <div className="bg-[#18181b] border border-border/40 rounded-xl p-3 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-amber-500">3</span>
              <span className="text-[10px] text-amber-500/80 uppercase tracking-wider mt-1 flex items-center gap-1">
                <AlertTriangle size={10} /> Bottlenecks
              </span>
            </div>
            <div className="bg-[#18181b] border border-border/40 rounded-xl p-3 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-sky-400">98%</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Reusability Score</span>
            </div>
          </div>

          <div className="h-px w-full bg-border/40" />

          {/* Impact Analysis Warning */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <h3 className="text-xs font-bold text-amber-500 flex items-center gap-1.5 mb-2">
              <Activity size={14} /> Blast Radius Analysis (FEAT-1)
            </h3>
            <p className="text-xs text-amber-400/80 leading-relaxed mb-3">
              การให้ AI แก้ไขโครงสร้าง Database <code>User Auth DB</code> ในโปรเจกต์นี้ จะส่งผลกระทบต่อ 2 ระบบอื่นที่กำลังเชื่อมต่ออยู่
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-black/20 p-2 rounded border border-amber-500/20 text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Network size={12} className="text-amber-500" /> HR Leave System
                </span>
                <Badge variant="outline" className="text-[9px] h-4 border-amber-500/30 text-amber-500">High Impact</Badge>
              </div>
              <div className="flex items-center justify-between bg-black/20 p-2 rounded border border-amber-500/20 text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Network size={12} className="text-amber-500" /> Internal Portal
                </span>
                <Badge variant="outline" className="text-[9px] h-4 border-amber-500/30 text-amber-500">High Impact</Badge>
              </div>
            </div>
            <Button size="sm" className="w-full mt-3 h-7 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs">
              ให้ AI วิเคราะห์หาวิธีแก้ไขที่ปลอดภัยกว่า
            </Button>
          </div>

          {/* Dependency Graph (Mockup) */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Network size={14} /> Current Architecture Dependency
            </h3>
            
            <div className="bg-[#18181b] border border-border/40 rounded-xl p-4 relative min-h-[300px] flex flex-col items-center justify-center overflow-hidden">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
              
              {/* Fake Network Graph Visualization */}
              <div className="relative z-10 w-full max-w-[280px]">
                
                {/* Top Layer: Frontend */}
                <div className="flex justify-center mb-8">
                  <div 
                    onClick={() => setSelectedNode('mobile')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${selectedNode === 'mobile' ? 'bg-sky-500/20 border-sky-500 text-sky-400' : 'bg-[#111113] border-border/60 text-slate-300'}`}
                  >
                    <Globe size={14} /> Sales Force App
                  </div>
                </div>

                {/* Connecting Lines */}
                <div className="absolute top-[32px] left-1/2 w-px h-8 bg-sky-500/50"></div>
                <div className="absolute top-[32px] left-1/2 -ml-[60px] w-[120px] h-px bg-sky-500/50"></div>

                {/* Middle Layer: API/Services */}
                <div className="flex justify-between mb-8">
                  <div 
                    onClick={() => setSelectedNode('api1')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${selectedNode === 'api1' ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-[#111113] border-border/60 text-slate-300'}`}
                  >
                    <Cpu size={14} className={selectedNode === 'api1' ? '' : 'text-amber-500'} /> Core Banking API
                  </div>
                  <div 
                    onClick={() => setSelectedNode('sso')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${selectedNode === 'sso' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-[#111113] border-border/60 text-slate-300'}`}
                  >
                    <Zap size={14} className="text-indigo-400" /> SSO Service
                  </div>
                </div>

                {/* Connecting Lines to DB */}
                <div className="absolute top-[108px] left-[60px] w-px h-8 bg-amber-500/50"></div>
                <div className="absolute top-[108px] right-[60px] w-px h-8 bg-indigo-500/50"></div>

                {/* Bottom Layer: Databases */}
                <div className="flex justify-between">
                  <div 
                    onClick={() => setSelectedNode('db2')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${selectedNode === 'db2' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-[#111113] border-border/60 text-slate-300'}`}
                  >
                    <Database size={14} className="text-emerald-400" /> Legacy DB2
                  </div>
                  <div 
                    onClick={() => setSelectedNode('db1')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${selectedNode === 'db1' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-[#111113] border-border/60 text-slate-300'}`}
                  >
                    <Database size={14} className="text-emerald-400" /> Auth DB
                  </div>
                </div>

              </div>
              
              <div className="absolute bottom-3 right-3 flex items-center gap-2 text-[9px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Healthy</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Warning</span>
              </div>
            </div>
          </div>

        </div>
      </ScrollArea>
    </div>
  );
}