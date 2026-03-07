import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, MonitorPlay, RefreshCw, Maximize2, TerminalSquare, ExternalLink, Rocket, Info, X, Sparkles, ChevronDown, Server, Box, Cloud, ShieldCheck, Smartphone } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface PreviewPanelProps {
  activeTab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
}

export function PreviewPanel({ activeTab, onTabChange }: PreviewPanelProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [previewMode, setPreviewMode] = useState<"web" | "mobile">("web");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const mockCode = `import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// 🔒 Security Scan: PDPA Compliant
// 🏛️ Corporate Knowledge: Applied 'Bank-Design-System v2.4'
export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-prompt">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Customer Overview</h1>
        <Button className="bg-scb-purple hover:bg-scb-purple-dark text-white">
          Export Report
        </Button>
      </div>
      
      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-slate-100/50 rounded flex items-center justify-center text-slate-400">
            Secure Chart Rendered Here
          </div>
        </CardContent>
      </Card>
    </div>
  );
}`;

  return (
    <div className="h-full flex flex-col bg-[#111113] text-slate-300">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#18181b] border-b border-[#27272a] shadow-sm z-10">
        
        {/* View Toggles */}
        <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/5">
          <button
            onClick={() => onTabChange("preview")}
            className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-md transition-all ${
              activeTab === "preview" 
                ? "bg-[#27272a] text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <MonitorPlay size={14} />
            Preview
          </button>
          <button
            onClick={() => onTabChange("code")}
            className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-md transition-all ${
              activeTab === "code" 
                ? "bg-[#27272a] text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code size={14} />
            Code
          </button>
        </div>

        {/* Browser URL bar & Actions */}
        <div className="flex items-center gap-3">
          {activeTab === "preview" && (
            <>
              {/* Mobile/Web Toggle */}
              <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-white/5 mr-2">
                <button
                  onClick={() => setPreviewMode("web")}
                  className={`p-1.5 rounded transition-colors ${previewMode === "web" ? "bg-[#27272a] text-white" : "text-slate-400 hover:text-slate-200"}`}
                  title="Web Preview"
                >
                  <MonitorPlay size={14} />
                </button>
                <button
                  onClick={() => setPreviewMode("mobile")}
                  className={`p-1.5 rounded transition-colors ${previewMode === "mobile" ? "bg-[#27272a] text-white" : "text-slate-400 hover:text-slate-200"}`}
                  title="Mobile App Preview (Flutter)"
                >
                  <Smartphone size={14} />
                </button>
              </div>

              <div className="flex items-center w-80 max-w-md bg-black/40 rounded-lg border border-white/5 overflow-hidden">
                <div className="px-3 py-1.5 bg-black/20 text-slate-500 border-r border-white/5 flex items-center justify-center">
                  <RefreshCw size={12} className={`cursor-pointer hover:text-slate-300 ${isRefreshing ? 'animate-spin' : ''}`} onClick={handleRefresh} />
                </div>
                <div className="px-3 py-1 text-xs text-slate-400 font-mono flex-1">
                  localhost:5000
                </div>
                <a href="#" className="px-3 py-1.5 text-slate-500 hover:text-slate-300 hover:bg-white/5">
                  <ExternalLink size={12} />
                </a>
              </div>
            </>
          )}
          
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-4 pr-3 gap-1.5">
                  <Rocket size={14} />
                  Deploy
                  <ChevronDown size={14} className="opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#18181b] border-[#27272a] text-slate-200">
                <DropdownMenuLabel className="text-xs text-slate-500">Enterprise Deployment</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#27272a]" />
                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-[#27272a] focus:bg-[#27272a]">
                  <Server size={14} className="text-blue-400" />
                  <span>On-Premise Server</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-[#27272a] focus:bg-[#27272a]">
                  <Box size={14} className="text-sky-400" />
                  <span>Export as Docker Image</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-[#27272a] focus:bg-[#27272a]">
                  <Cloud size={14} className="text-purple-400" />
                  <span>Private Cloud (K8s)</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {activeTab === "preview" ? (
          <div className="flex-1 bg-[#f8fafc] relative flex items-center justify-center overflow-auto">
            {previewMode === "web" ? (
              /* Web Preview */
              <div className="w-full h-full flex items-center justify-center">
                 <div className="text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 ring-8 ring-indigo-50">
                      <MonitorPlay size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise Web App Preview</h3>
                    <p className="text-sm text-slate-500 mb-6">Secured view simulating internal corporate network.</p>
                 </div>
              </div>
            ) : (
              /* Mobile Preview (Flutter) */
              <div className="w-full h-full flex items-center justify-center bg-[#e2e8f0] p-4">
                <div className="relative w-[320px] h-[650px] bg-black rounded-[40px] shadow-2xl border-[8px] border-slate-800 overflow-hidden flex flex-col">
                  {/* Notch / Status Bar */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 flex justify-center">
                    <div className="w-24 h-4 bg-black rounded-b-xl"></div>
                  </div>
                  
                  {/* Flutter App Mockup */}
                  <div className="flex-1 bg-white pt-8 flex flex-col relative z-10">
                    <div className="bg-indigo-600 text-white px-4 py-3 flex items-center shadow-md">
                      <div className="font-semibold text-lg">Corporate App</div>
                    </div>
                    <div className="flex-1 p-4 bg-slate-50 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-500">
                        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                      </div>
                      <h4 className="font-bold text-slate-800 mb-1">Flutter Mobile Build</h4>
                      <p className="text-xs text-slate-500 mb-4 px-4">Live reloading Dart code directly to device emulator.</p>
                      
                      <div className="w-full space-y-2 mt-4">
                        <div className="h-10 bg-white border border-slate-200 rounded-lg flex items-center px-3 shadow-sm">
                          <div className="w-4 h-4 rounded-full bg-indigo-100 mr-3"></div>
                          <div className="h-2 w-24 bg-slate-200 rounded"></div>
                        </div>
                        <div className="h-10 bg-white border border-slate-200 rounded-lg flex items-center px-3 shadow-sm">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 mr-3"></div>
                          <div className="h-2 w-32 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                    {/* Native Nav Bar Mockup */}
                    <div className="h-12 bg-white border-t border-slate-200 flex justify-around items-center px-4 pb-1">
                      <div className="w-6 h-6 rounded bg-indigo-600"></div>
                      <div className="w-6 h-6 rounded bg-slate-200"></div>
                      <div className="w-6 h-6 rounded bg-slate-200"></div>
                    </div>
                  </div>
                </div>
                
                {/* Flutter Controls Overlay */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                  <div className="bg-white/90 backdrop-blur text-slate-800 text-[10px] font-medium px-3 py-1.5 rounded-full shadow-lg border border-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Hot Reload Active
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-[#111113]">
            {/* Editor Tabs */}
            <div className="flex border-b border-[#27272a] bg-[#18181b]">
              <div className="px-4 py-2 border-t-2 border-indigo-500 bg-[#111113] text-indigo-400 text-sm font-mono flex items-center gap-2">
                <span className="text-blue-400">ts</span> CustomerDashboard.tsx
                <X size={12} className="ml-2 text-slate-500 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            {/* Editor Content */}
            <ScrollArea className="flex-1">
              <pre className="p-4 text-[13px] font-mono leading-relaxed text-[#abb2bf] whitespace-pre">
                <code>
                  {mockCode.split('\n').map((line, i) => (
                    <div key={i} className="flex hover:bg-white/5 px-2 rounded -mx-2">
                      <span className="w-8 text-right pr-4 text-[#4b5263] select-none">{i + 1}</span>
                      <span dangerouslySetInnerHTML={{
                        __html: line
                          .replace(/import|from|export|default|const|let|return/g, '<span class="text-[#c678dd]">$&</span>')
                          .replace(/useState|Card|CardContent|CardHeader|CardTitle|LineChart|Line|XAxis|YAxis|CartesianGrid|Tooltip|ResponsiveContainer/g, '<span class="text-[#e5c07b]">$&</span>')
                          .replace(/className|data|name|value|activeTab|stroke|strokeWidth/g, '<span class="text-[#d19a66]">$&</span>')
                          .replace(/'[^']*'/g, '<span class="text-[#98c379]">$&</span>')
                          .replace(/"[^"]*"/g, '<span class="text-[#98c379]">$&</span>')
                          .replace(/<([A-Z][a-zA-Z0-9]*)/g, '<<span class="text-[#e06c75]">$1</span>')
                          .replace(/<\/([A-Z][a-zA-Z0-9]*)/g, '</<span class="text-[#e06c75]">$1</span>')
                          .replace(/<([a-z][a-zA-Z0-9]*)/g, '<<span class="text-[#e06c75]">$1</span>')
                          .replace(/<\/([a-z][a-zA-Z0-9]*)/g, '</<span class="text-[#e06c75]">$1</span>')
                          .replace(/\{([^}]+)\}/g, '<span class="text-[#56b6c2]">{</span>$1<span class="text-[#56b6c2]">}</span>')
                          .replace(/\/\/.*$/g, '<span class="text-[#5c6370] italic">$&</span>')
                      }} />
                    </div>
                  ))}
                </code>
              </pre>
            </ScrollArea>
            
            {/* Ask AI Floating Button inside code editor */}
            <button className="absolute bottom-6 right-6 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all text-sm font-medium border border-white/10">
              <Sparkles size={16} />
              Ask AI to Edit
            </button>
          </div>
        )}

        {/* Developer Console / Terminal (Toggleable) */}
        {showTerminal && (
          <div className="h-48 border-t border-[#27272a] bg-[#18181b] flex flex-col shrink-0">
            <div className="flex items-center justify-between px-4 py-1.5 border-b border-[#27272a]">
              <div className="flex gap-4 text-xs font-medium">
                <button className="text-white border-b border-white pb-1 -mb-[7px]">Terminal</button>
                <button className="text-slate-500 hover:text-slate-300">Test Output (QA)</button>
                <button className="text-slate-500 hover:text-slate-300">Security Audit</button>
              </div>
              <button onClick={() => setShowTerminal(false)} className="text-slate-500 hover:text-white">
                <X size={14} />
              </button>
            </div>
            <ScrollArea className="flex-1 p-2 font-mono text-[12px] text-slate-300">
              <div className="text-emerald-400">✓ Compiled successfully in 124ms</div>
              <div className="text-indigo-400 mt-1">✓ AI generated 4 Cypress e2e tests automatically.</div>
              <div className="mt-2 text-slate-400">
                <span className="text-emerald-400">➜</span>  Local:   <a href="#" className="text-cyan-400 hover:underline">http://localhost:5000/</a>
              </div>
              <div className="mt-2 text-emerald-400 flex items-start gap-2">
                <ShieldCheck size={14} className="shrink-0 mt-0.5" />
                [Security] Static analysis passed. No hardcoded secrets found. PDPA rules checked.
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* VS Code Style Status Bar */}
      <div className="h-6 bg-indigo-600 flex items-center justify-between px-3 text-white text-[11px] font-medium z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-black/20 px-1.5 py-0.5 rounded">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M9.5 7.5L5.7 3.7 4.3 5.1 6.6 7.5 4.3 9.9 5.7 11.3 9.5 7.5Z"/></svg>
            main*
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-black/20 px-1.5 py-0.5 rounded">
            <RefreshCw size={10} />
            Pending Approval (1)
          </div>
          <button 
            className="flex items-center gap-1.5 cursor-pointer hover:bg-black/20 px-1.5 py-0.5 rounded transition-colors"
            onClick={() => setShowTerminal(!showTerminal)}
          >
            <TerminalSquare size={12} />
            Terminal
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-black/20 px-1.5 py-0.5 rounded">
            Corporate Knowledge Synced
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-black/20 px-1.5 py-0.5 rounded">
            TypeScript React
          </div>
        </div>
      </div>
    </div>
  );
}