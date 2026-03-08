import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  DollarSign, 
  Activity, 
  BrainCircuit, 
  TrendingUp, 
  Cpu, 
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function ExecutiveDashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-full flex flex-col bg-[#111113] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#27272a] bg-[#18181b] shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
          <Building2 className="text-indigo-500" />
          Enterprise Command Portal
          <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/20">C-Level View</Badge>
        </h1>
        <p className="text-slate-400 text-sm">
          ภาพรวมการใช้งาน AI, ต้นทุนแฝง, และผลขีดความสามารถของบุคลากรทั่วทั้งองค์กร
        </p>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8 pb-10">
          
          {/* Financial & Resource Intelligence */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <DollarSign className="text-emerald-500" size={18} />
              </div>
              <h2 className="text-lg font-semibold text-white">Financial & AI Token ROI</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-[#18181b] border-[#27272a]">
                <CardContent className="p-5">
                  <div className="text-sm text-slate-400 mb-1">AI Token Usage Cost</div>
                  <div className="text-2xl font-bold text-white mb-2">$4,250 <span className="text-xs text-slate-500 font-normal">/ month</span></div>
                  <div className="flex items-center gap-1 text-xs text-emerald-400">
                    <TrendingUp size={12} /> Generated $120k in business value
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#18181b] border-[#27272a]">
                <CardContent className="p-5">
                  <div className="text-sm text-slate-400 mb-1">Cloud Infrastructure Prediction</div>
                  <div className="text-2xl font-bold text-white mb-2">-$2,100 <span className="text-xs text-slate-500 font-normal">savings</span></div>
                  <div className="text-xs text-slate-400">
                    AI optimized 3 database queries this week
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#18181b] border-[#27272a] border-l-4 border-l-emerald-500">
                <CardContent className="p-5">
                  <div className="text-sm text-slate-400 mb-1">Time-to-Market ROI</div>
                  <div className="text-2xl font-bold text-white mb-2">3.5x <span className="text-xs text-slate-500 font-normal">faster</span></div>
                  <div className="text-xs text-slate-400">
                    Average feature delivery reduced from 14 to 4 days
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Workforce Dynamics */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                <Users className="text-sky-500" size={18} />
              </div>
              <h2 className="text-lg font-semibold text-white">Workforce Analytics & Upskilling</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Code Ownership */}
              <Card className="bg-[#18181b] border-[#27272a]">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-slate-200 mb-4 flex justify-between">
                    Enterprise Code Ownership
                    <span className="text-xs text-slate-500">Last 30 days</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">AI Generated (Approved)</span>
                        <span className="text-sky-400 font-mono">68%</span>
                      </div>
                      <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 w-[68%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Human Written (Developers)</span>
                        <span className="text-indigo-400 font-mono">32%</span>
                      </div>
                      <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[32%]"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skill Matrix */}
              <Card className="bg-[#18181b] border-[#27272a]">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-slate-200 mb-4">Team AI Fluency (Prompt Engineering)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">FE</div>
                        <div>
                          <div className="text-sm text-slate-200">Frontend Team</div>
                          <div className="text-[10px] text-slate-500">High efficiency (1.2 prompts/feature)</div>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Expert</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">BE</div>
                        <div>
                          <div className="text-sm text-slate-200">Backend Team</div>
                          <div className="text-[10px] text-slate-500">AI Tutor assigned for Security Ops</div>
                        </div>
                      </div>
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Learning</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Architecture Link */}
          <section className="bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl p-6">
             <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <BrainCircuit className="text-purple-400" size={18} />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Architectural Consistency</h2>
                </div>
                <p className="text-sm text-slate-400 max-w-2xl mb-4">
                  ป้องกันปัญหา Microservices Hell ด้วยการมองเห็นความเชื่อมโยงของระบบทั้งหมด (Topology Map)
                  พร้อมระบบแจ้งเตือนผลกระทบ (Blast Radius) ก่อนให้ AI แก้ไขโค้ด
                </p>
                <Button 
                  onClick={() => setLocation("/topology")}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Activity size={16} className="mr-2" />
                  เปิดดู Enterprise Topology Map
                </Button>
              </div>
              <div className="hidden md:flex flex-col gap-2 opacity-50">
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-black/40 px-3 py-1.5 rounded border border-white/5"><Cpu size={12}/> API Gateway</div>
                <div className="flex justify-center"><ArrowRight size={12} className="text-slate-500 rotate-90" /></div>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-black/40 px-3 py-1.5 rounded border border-white/5"><ShieldAlert size={12}/> Auth Service</div>
              </div>
             </div>
          </section>

        </div>
      </ScrollArea>
    </div>
  );
}