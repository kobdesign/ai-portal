import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, MonitorPlay, RefreshCw, Maximize2, Terminal, ExternalLink, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PreviewPanelProps {
  activeTab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
}

export function PreviewPanel({ activeTab, onTabChange }: PreviewPanelProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Mock code content
  const mockCode = `import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$45,231.89</div>
            <p className="text-xs text-emerald-500 mt-1">+20.1% from last month</p>
          </CardContent>
        </Card>
        {/* Additional cards omitted for brevity */}
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}`;

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E]">
      <div className="flex items-center justify-between px-3 py-2 bg-[#252526] border-b border-black/40 shadow-sm z-10">
        <div className="flex items-center bg-[#1E1E1E] rounded-md border border-black/20 p-0.5">
          <button
            onClick={() => onTabChange("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
              activeTab === "preview" 
                ? "bg-[#37373D] text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <MonitorPlay size={14} />
            Preview
          </button>
          <button
            onClick={() => onTabChange("code")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
              activeTab === "code" 
                ? "bg-[#37373D] text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code size={14} />
            Code
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center px-2 py-1 bg-[#1E1E1E] rounded text-xs text-slate-400 border border-black/20 mr-2 font-mono">
            localhost:5000
          </div>
          
          {activeTab === "preview" && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-slate-400 hover:text-white hover:bg-[#37373D]"
                onClick={handleRefresh}
              >
                <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-slate-400 hover:text-white hover:bg-[#37373D]"
              >
                <ExternalLink size={14} />
              </Button>
            </>
          )}
          
          {activeTab === "code" && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-slate-400 hover:text-white hover:bg-[#37373D]"
            >
              <Download size={14} />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-slate-400 hover:text-white hover:bg-[#37373D] ml-1"
          >
            <Maximize2 size={14} />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-[#1E1E1E]">
        {activeTab === "preview" ? (
          <div className="absolute inset-0 bg-white m-4 rounded-lg overflow-hidden border border-black/20 shadow-xl flex items-center justify-center">
            {/* This would be an iframe to the actual dev server in a real app */}
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
                <MonitorPlay size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Live Preview Sandbox</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-6">
                Your generated application will appear here. The code updates in real-time as the AI generates it.
              </p>
              
              {/* Mock Dashboard Preview Content */}
              <div className="mt-8 border rounded-xl overflow-hidden shadow-sm bg-slate-50 opacity-50 scale-90 origin-top transform-gpu pointer-events-none">
                <div className="p-6 text-left">
                  <h1 className="text-2xl font-bold mb-6 text-slate-900">Dashboard Overview</h1>
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="text-sm font-medium text-slate-500 mb-2">Total Revenue</h4>
                      <div className="text-2xl font-bold text-slate-900">$45,231.89</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="text-sm font-medium text-slate-500 mb-2">Active Users</h4>
                      <div className="text-2xl font-bold text-slate-900">+2,350</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="text-sm font-medium text-slate-500 mb-2">Sales</h4>
                      <div className="text-2xl font-bold text-slate-900">+12,234</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border h-[200px] flex items-end gap-4">
                    <div className="w-1/6 bg-indigo-500 h-[40%] rounded-t"></div>
                    <div className="w-1/6 bg-indigo-500 h-[60%] rounded-t"></div>
                    <div className="w-1/6 bg-indigo-500 h-[30%] rounded-t"></div>
                    <div className="w-1/6 bg-indigo-500 h-[80%] rounded-t"></div>
                    <div className="w-1/6 bg-indigo-500 h-[100%] rounded-t"></div>
                    <div className="w-1/6 bg-indigo-500 h-[70%] rounded-t"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col">
            <div className="flex border-b border-[#2D2D2D] bg-[#1E1E1E]">
              <div className="px-4 py-2 border-t-2 border-indigo-500 bg-[#1E1E1E] text-indigo-400 text-sm font-mono flex items-center gap-2">
                <span className="text-[#e06c75]">⚛</span> Dashboard.tsx
              </div>
              <div className="px-4 py-2 text-slate-500 text-sm font-mono flex items-center gap-2 border-r border-[#2D2D2D]">
                <span>{}</span> package.json
              </div>
            </div>
            <ScrollArea className="flex-1">
              <pre className="p-4 text-[13px] font-mono leading-relaxed text-[#abb2bf] whitespace-pre">
                <code>
                  {mockCode.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-10 text-right pr-4 text-[#4b5263] select-none">{i + 1}</span>
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
          </div>
        )}
      </div>

      <div className="h-8 bg-[#007ACC] flex items-center justify-between px-3 text-white text-xs z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-white/20 px-1.5 py-0.5 rounded">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M9.5 7.5L5.7 3.7 4.3 5.1 6.6 7.5 4.3 9.9 5.7 11.3 9.5 7.5Z"/></svg>
            main*
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-white/20 px-1.5 py-0.5 rounded">
            <RefreshCw size={12} />
            0↓ 0↑
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-white/20 px-1.5 py-0.5 rounded">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Server running on port 5000
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1.5 py-0.5 rounded">
            UTF-8
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1.5 py-0.5 rounded">
            TypeScript React
          </div>
        </div>
      </div>
    </div>
  );
}