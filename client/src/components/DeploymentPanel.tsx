import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Rocket, Server, Cloud, Box, ShieldCheck, CheckCircle2, AlertTriangle, Clock, RefreshCw, GitCommit, ArrowRight, Play, TerminalSquare } from "lucide-react";

export function DeploymentPanel() {
  const [deployStatus, setDeployStatus] = useState<"idle" | "building" | "scanning" | "deploying" | "success">("idle");
  const [targetEnv, setTargetEnv] = useState<"dev" | "sit" | "uat" | "prod">("dev");

  const handleDeploy = () => {
    setDeployStatus("building");
    setTimeout(() => setDeployStatus("scanning"), 2000);
    setTimeout(() => setDeployStatus("deploying"), 4000);
    setTimeout(() => setDeployStatus("success"), 6000);
  };

  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="p-4 border-b border-border/40 bg-card">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-1">
          Enterprise Deployment
          <span className="px-1.5 py-0.5 text-[10px] bg-indigo-500/20 text-indigo-400 rounded uppercase font-bold tracking-wider">CI/CD</span>
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          จัดการการนำแอปพลิเคชันขึ้นเซิร์ฟเวอร์แบบหลายสภาพแวดล้อม (Multi-Environment) พร้อมระบบ Security Gate
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          
          {/* Environment Selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Target Environment</h3>
            <div className="grid grid-cols-4 gap-2">
              <button 
                onClick={() => setTargetEnv("dev")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${targetEnv === 'dev' ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.1)] text-indigo-400' : 'bg-[#18181b] border-border/40 text-slate-400 hover:border-border/80'}`}
              >
                <TerminalSquare size={18} className="mb-1.5" />
                <span className="text-[11px] font-bold">DEV</span>
              </button>
              <button 
                onClick={() => setTargetEnv("sit")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${targetEnv === 'sit' ? 'bg-sky-600/20 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.1)] text-sky-400' : 'bg-[#18181b] border-border/40 text-slate-400 hover:border-border/80'}`}
              >
                <Server size={18} className="mb-1.5" />
                <span className="text-[11px] font-bold">SIT</span>
              </button>
              <button 
                onClick={() => setTargetEnv("uat")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${targetEnv === 'uat' ? 'bg-amber-600/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)] text-amber-400' : 'bg-[#18181b] border-border/40 text-slate-400 hover:border-border/80'}`}
              >
                <ShieldCheck size={18} className="mb-1.5" />
                <span className="text-[11px] font-bold">UAT</span>
              </button>
              <button 
                disabled
                className="flex flex-col items-center justify-center p-3 rounded-xl border bg-black/40 border-border/20 text-slate-600 cursor-not-allowed opacity-50 relative overflow-hidden"
              >
                <Lock size={18} className="mb-1.5" />
                <span className="text-[11px] font-bold">PROD</span>
                <div className="absolute top-1 right-1">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </div>
              </button>
            </div>
            {targetEnv === 'uat' && (
              <div className="text-[10px] text-amber-400/80 bg-amber-500/10 p-2 rounded border border-amber-500/20 flex items-start gap-1.5 mt-2">
                <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                <span>การ Deploy ขึ้น UAT ต้องผ่านการ Approve จาก QA Lead ก่อน (Pending Approval)</span>
              </div>
            )}
          </div>

          <div className="h-px w-full bg-border/40" />

          {/* Deployment Configuration */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
              Configuration
              <Badge variant="outline" className="text-[9px] h-4 border-border/60">v1.2.4-beta</Badge>
            </h3>
            
            <div className="bg-[#18181b] border border-border/40 rounded-xl p-1">
              <div className="p-3 border-b border-border/40 hover:bg-white/5 transition-colors cursor-pointer flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  <Box className="text-sky-400" size={16} />
                  <div>
                    <div className="text-sm font-medium text-slate-200">Docker Image Build</div>
                    <div className="text-xs text-slate-500">registry.internal.corp/app:latest</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] opacity-0 group-hover:opacity-100">Edit</Button>
              </div>
              <div className="p-3 hover:bg-white/5 transition-colors cursor-pointer flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  <Cloud className="text-purple-400" size={16} />
                  <div>
                    <div className="text-sm font-medium text-slate-200">Kubernetes Cluster (K8s)</div>
                    <div className="text-xs text-slate-500">Namespace: frontend-dev-01</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] opacity-0 group-hover:opacity-100">Edit</Button>
              </div>
            </div>
          </div>

          {/* Deploy Action */}
          <div className="pt-4">
            {deployStatus === "idle" ? (
              <Button 
                onClick={handleDeploy}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-[0_0_20px_rgba(79,70,229,0.2)]"
              >
                <Rocket size={16} className="mr-2" />
                Deploy to {targetEnv.toUpperCase()}
              </Button>
            ) : deployStatus === "success" ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-400">Deployment Successful</h4>
                  <p className="text-xs text-emerald-500/80 mt-1">App is now live on {targetEnv.toUpperCase()} environment</p>
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                    <Play size={12} className="mr-1" /> Open App
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-border/60" onClick={() => setDeployStatus("idle")}>
                    Dismiss
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-[#18181b] border border-indigo-500/30 rounded-xl p-4 space-y-4">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-indigo-400 flex items-center gap-2">
                    <RefreshCw size={12} className="animate-spin" /> 
                    {deployStatus === 'building' ? 'Building Docker Image...' : 
                     deployStatus === 'scanning' ? 'Running Security & PDPA Scan...' : 
                     'Pushing to Kubernetes...'}
                  </span>
                  <span className="text-slate-500">
                    {deployStatus === 'building' ? '33%' : 
                     deployStatus === 'scanning' ? '66%' : 
                     '89%'}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-500 ease-in-out"
                    style={{ 
                      width: deployStatus === 'building' ? '33%' : 
                             deployStatus === 'scanning' ? '66%' : 
                             '89%' 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="h-px w-full bg-border/40" />

          {/* Deployment History */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Clock size={14} /> Recent Deployments
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 bg-[#18181b] rounded-lg border border-border/40 opacity-70">
                <div className="mt-0.5"><CheckCircle2 size={14} className="text-emerald-500" /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h5 className="text-xs font-medium text-slate-200">v1.2.3 (FEAT-1)</h5>
                    <span className="text-[9px] text-slate-500">2 hrs ago</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <GitCommit size={10} /> a1b2c3d • Deployed to DEV by System
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-[#18181b] rounded-lg border border-border/40 opacity-50">
                <div className="mt-0.5"><AlertTriangle size={14} className="text-amber-500" /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h5 className="text-xs font-medium text-slate-200">v1.2.2 (FEAT-1)</h5>
                    <span className="text-[9px] text-slate-500">Yesterday</span>
                  </div>
                  <p className="text-[10px] text-amber-500/80 mt-1">
                    Failed Security Gate (PDPA Violation Detected)
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </ScrollArea>
    </div>
  );
}

// Simple Lock icon mock since it might not be imported correctly in some versions
function Lock({ size, className }: { size: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}