import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Network, Search, Filter, AlertTriangle, Globe, Cpu, Zap, Database, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GlobalTopology() {
  const [, setLocation] = useLocation();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <div className="h-screen w-full bg-[#111113] flex flex-col text-foreground overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="h-14 bg-[#18181b] border-b border-border/40 flex items-center px-6 justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLocation("/executive")}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Executive Dashboard
          </button>
          <div className="h-6 w-px bg-border/60"></div>
          <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Network size={18} className="text-purple-400" />
            Global Enterprise Topology
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <Input 
              placeholder="Search across all systems..." 
              className="h-9 w-64 pl-9 bg-black/40 border-border/60 text-sm focus-visible:ring-purple-500 rounded-full"
            />
          </div>
          <Button variant="outline" className="h-9 border-border/60 bg-[#18181b] text-slate-300">
            <Filter size={14} className="mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Summary */}
        <div className="w-[300px] border-r border-[#27272a] bg-[#18181b]/50 p-6 flex flex-col overflow-y-auto">
          <h2 className="text-lg font-bold text-white mb-6">System Overview</h2>
          
          <div className="space-y-4 mb-8">
            <div className="bg-[#111113] border border-border/40 rounded-xl p-4 flex flex-col justify-center">
              <span className="text-3xl font-bold text-slate-200">142</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Total Active Services</span>
            </div>
            <div className="bg-[#111113] border border-border/40 rounded-xl p-4 flex flex-col justify-center">
              <span className="text-3xl font-bold text-amber-500">3</span>
              <span className="text-xs text-amber-500/80 uppercase tracking-wider mt-1 flex items-center gap-1">
                <AlertTriangle size={12} /> Bottleneck Warnings
              </span>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Critical Clusters</h3>
          <div className="space-y-2">
            <button 
              className="w-full text-left p-3 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
              onClick={() => setSelectedNode('sso')}
            >
              <div className="font-medium text-sm flex items-center gap-2"><Zap size={14}/> Identity & Access (SSO)</div>
              <div className="text-xs text-purple-400/70 mt-1">Connected to 48 services</div>
            </button>
            <button 
              className="w-full text-left p-3 rounded-lg border border-border/40 bg-[#111113] text-slate-300 hover:border-slate-500 transition-colors"
              onClick={() => setSelectedNode('api1')}
            >
              <div className="font-medium text-sm flex items-center gap-2"><Cpu size={14}/> Core Banking API</div>
              <div className="text-xs text-slate-500 mt-1">Connected to 12 services</div>
            </button>
            <button 
              className="w-full text-left p-3 rounded-lg border border-border/40 bg-[#111113] text-slate-300 hover:border-slate-500 transition-colors"
              onClick={() => setSelectedNode('db2')}
            >
              <div className="font-medium text-sm flex items-center gap-2"><Database size={14}/> Legacy Mainframe</div>
              <div className="text-xs text-slate-500 mt-1">Connected to 4 services</div>
            </button>
          </div>
        </div>

        {/* Right Area - Canvas */}
        <div className="flex-1 relative bg-[#111113] overflow-hidden flex flex-col items-center justify-center">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="absolute top-6 left-6 z-20">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Network className="text-purple-400" /> Organization Graph
            </h3>
            <p className="text-sm text-slate-500 mt-1">Interactive view of all microservices and legacy systems</p>
          </div>

          {/* Fake Network Graph Visualization - Scaled up for full screen */}
          <div className="relative z-10 w-full max-w-[800px] h-[600px] flex flex-col items-center justify-center scale-125">
            
            {/* Top Layer: Frontend / Touchpoints */}
            <div className="flex justify-center gap-16 mb-20">
              <div 
                onClick={() => setSelectedNode('mobile')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium cursor-pointer transition-all shadow-lg ${selectedNode === 'mobile' ? 'bg-sky-500/20 border-sky-500 text-sky-400 scale-110 z-20' : 'bg-[#18181b] border-[#3f3f46] text-slate-300 hover:border-slate-500'}`}
              >
                <Globe size={18} /> Sales Force App
              </div>
              <div 
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 bg-[#18181b] border-[#3f3f46] text-slate-300 text-sm font-medium shadow-lg"
              >
                <Globe size={18} /> Customer Portal
              </div>
              <div 
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 bg-[#18181b] border-[#3f3f46] text-slate-300 text-sm font-medium shadow-lg"
              >
                <Globe size={18} /> Internal Dashboard
              </div>
            </div>

            {/* Connecting Lines (Front to Middle) */}
            <svg className="absolute top-[160px] left-0 w-full h-[100px] pointer-events-none z-0">
              <path d="M 250,0 Q 250,50 350,100" fill="none" stroke="#3f3f46" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 400,0 Q 400,50 350,100" fill="none" stroke="#3f3f46" strokeWidth="2" />
              <path d="M 400,0 Q 400,50 480,100" fill="none" stroke="#6366f1" strokeWidth="2" />
              <path d="M 550,0 Q 550,50 480,100" fill="none" stroke="#6366f1" strokeWidth="2" />
            </svg>

            {/* Middle Layer: API/Services */}
            <div className="flex justify-center gap-24 mb-20 w-full">
              <div 
                onClick={() => setSelectedNode('api1')}
                className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 font-medium cursor-pointer transition-all shadow-xl relative ${selectedNode === 'api1' ? 'bg-amber-500/20 border-amber-500 text-amber-400 scale-110 z-20' : 'bg-[#18181b] border-[#3f3f46] text-slate-200 hover:border-slate-500'}`}
              >
                {selectedNode !== 'api1' && <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 rounded-full animate-pulse border-2 border-[#111113]"></div>}
                <Cpu size={24} className={selectedNode === 'api1' ? '' : 'text-amber-500'} /> 
                <span>Core Banking API</span>
                <Badge variant="outline" className="text-[10px] h-5 bg-black/40 border-amber-500/30 text-amber-500">High Load</Badge>
              </div>
              
              <div 
                onClick={() => setSelectedNode('sso')}
                className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 font-medium cursor-pointer transition-all shadow-xl ${selectedNode === 'sso' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400 scale-110 z-20' : 'bg-[#18181b] border-[#3f3f46] text-slate-200 hover:border-slate-500'}`}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-1">
                  <Zap size={24} className="text-indigo-400" /> 
                </div>
                <span>SSO / Identity Hub</span>
                <Badge variant="outline" className="text-[10px] h-5 bg-black/40 border-indigo-500/30 text-indigo-400">Hub Node</Badge>
              </div>
            </div>

            {/* Connecting Lines (Middle to Bottom) */}
            <svg className="absolute top-[370px] left-0 w-full h-[100px] pointer-events-none z-0">
              <path d="M 350,0 Q 350,50 300,100" fill="none" stroke="#f59e0b" strokeWidth="2" />
              <path d="M 480,0 Q 480,50 500,100" fill="none" stroke="#6366f1" strokeWidth="2" />
              <path d="M 480,0 Q 480,50 650,100" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            {/* Bottom Layer: Databases */}
            <div className="flex justify-center gap-20 w-full">
              <div 
                onClick={() => setSelectedNode('db2')}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 text-sm font-medium cursor-pointer transition-all shadow-lg ${selectedNode === 'db2' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-110 z-20' : 'bg-[#18181b] border-[#3f3f46] text-slate-300 hover:border-slate-500'}`}
              >
                <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center">
                  <Database size={20} className="text-emerald-500" /> 
                </div>
                <div>
                  <div className="text-slate-200">Legacy Mainframe</div>
                  <div className="text-[10px] text-slate-500 font-mono">DB2 / AS400</div>
                </div>
              </div>

              <div 
                onClick={() => setSelectedNode('db1')}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 text-sm font-medium cursor-pointer transition-all shadow-lg ${selectedNode === 'db1' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-110 z-20' : 'bg-[#18181b] border-[#3f3f46] text-slate-300 hover:border-slate-500'}`}
              >
                 <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center">
                  <Database size={20} className="text-emerald-500" /> 
                </div>
                <div>
                  <div className="text-slate-200">Auth DB</div>
                  <div className="text-[10px] text-slate-500 font-mono">PostgreSQL</div>
                </div>
              </div>
              
              <div 
                className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 bg-[#18181b] border-[#3f3f46] text-slate-300 text-sm font-medium shadow-lg opacity-60"
              >
                 <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center">
                  <Database size={20} className="text-slate-500" /> 
                </div>
                <div>
                  <div className="text-slate-200">HR Data</div>
                  <div className="text-[10px] text-slate-500 font-mono">Oracle</div>
                </div>
              </div>
            </div>

          </div>
          
          <div className="absolute bottom-6 right-6 flex items-center gap-4 bg-[#18181b] p-3 rounded-xl border border-[#27272a] shadow-2xl">
            <span className="text-xs font-medium text-slate-300">Legend:</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Healthy DB</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Core Hub</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Warning</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400 ml-2">
               <svg width="24" height="6"><path d="M 0,3 L 24,3" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" /></svg> Asynchronous
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}