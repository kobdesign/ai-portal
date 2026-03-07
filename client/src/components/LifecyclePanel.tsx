import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Check,
  Play,
  Settings,
  RefreshCw,
  Archive,
  FolderKanban,
  Lightbulb,
  FileText,
  CheckSquare,
  PencilRuler,
  Code2,
  Beaker,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useChatContext } from "@/contexts/ChatContext";

export function LifecyclePanel() {
  const [expandedFeature, setExpandedFeature] = useState<string | null>("FEAT-1");
  const { setLifecyclePhase, setFeatureName } = useChatContext();

  const steps = [
    { id: "explore", name: "Explore", icon: <Lightbulb size={12} /> },
    { id: "proposal", name: "Proposal", icon: <FileText size={12} /> },
    { id: "plan", name: "Plan", icon: <CheckSquare size={12} /> },
    { id: "design", name: "Design", icon: <PencilRuler size={12} /> },
    { id: "implement", name: "Implement", icon: <Code2 size={12} /> },
    { id: "test", name: "Test", icon: <Beaker size={12} /> },
    { id: "complete", name: "Complete", icon: <CheckCircle2 size={12} /> },
  ];

  const features = [
    {
      id: "FEAT-1",
      name: "Corporate SSO Integration",
      linkedEpic: "EPIC-01",
      currentStep: "implement",
      tasksTotal: 8,
      tasksDone: 5,
      status: "active",
    },
    {
      id: "FEAT-2",
      name: "Customer Dashboard Redesign",
      linkedEpic: "EPIC-02",
      currentStep: "design",
      tasksTotal: 12,
      tasksDone: 2,
      status: "active",
    },
    {
      id: "FEAT-3",
      name: "Legacy Database Connector",
      linkedEpic: "EPIC-03",
      currentStep: "complete",
      tasksTotal: 5,
      tasksDone: 5,
      status: "archived",
    },
  ];

  const renderStepper = (currentStepId: string) => {
    const currentIndex = steps.findIndex((s) => s.id === currentStepId);

    return (
      <div className="flex items-center justify-between mt-5 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border/40 z-0"></div>
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-purple-500 z-0 transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center group cursor-pointer"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 transition-all ${
                  isActive
                    ? "bg-purple-500 border-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)] scale-110"
                    : isCompleted
                      ? "bg-[#18181b] border-purple-500 text-purple-400"
                      : "bg-[#18181b] border-border/60 text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check size={10} /> : step.icon}
              </div>
              <span
                className={`absolute top-8 text-[9px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "text-purple-400 opacity-100" : "text-muted-foreground"}`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="p-4 border-b border-border/40 bg-card">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Project Lifecycle
            <span className="px-1.5 py-0.5 text-[10px] bg-purple-500/20 text-purple-400 rounded uppercase font-bold tracking-wider">
              Iterative
            </span>
          </h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs px-2.5 border-border/60 hover:bg-muted/50"
            >
              <Archive size={14} className="mr-1" /> Archives
            </Button>
            <Button size="sm" className="h-7 bg-purple-600 hover:bg-purple-700 text-xs px-2.5">
              <Plus size={14} className="mr-1" /> New Feature
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          ติดตามความคืบหน้าของแต่ละฟีเจอร์ โดยเชื่อมโยงกับ Project Specs โดยตรง
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <FolderKanban size={14} className="text-foreground" />
              Active Features
            </h3>
          </div>

          {/* Active Features */}
          <div className="space-y-4">
            {features
              .filter((f) => f.status === "active")
              .map((feature) => (
                <div
                  key={feature.id}
                  className={`bg-[#18181b] border rounded-xl p-4 transition-all ${feature.id === "FEAT-1" ? "border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]" : "border-border/40 hover:border-purple-500/30"}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                          {feature.id}
                        </span>
                        <h4 className="text-sm font-medium text-foreground">{feature.name}</h4>
                      </div>
                      {/* Link to Spec */}
                      <div className="flex items-center gap-3 text-xs mt-2">
                        <Badge
                          variant="outline"
                          className="bg-sky-500/10 text-sky-400 border-sky-500/30 text-[9px] h-5 hover:bg-sky-500/20 cursor-pointer transition-colors"
                        >
                          <FileText size={10} className="mr-1" />
                          Linked: {feature.linkedEpic}
                        </Badge>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span>
                            Tasks: {feature.tasksDone}/{feature.tasksTotal}
                          </span>
                          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500"
                              style={{
                                width: `${(feature.tasksDone / feature.tasksTotal) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="h-7 text-[11px] bg-purple-600 hover:bg-purple-700"
                        onClick={() => {
                          setLifecyclePhase(feature.currentStep);
                          setFeatureName(`${feature.id}: ${feature.name}`);
                        }}
                      >
                        <Play size={12} className="mr-1" /> Chat
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          setExpandedFeature(expandedFeature === feature.id ? null : feature.id)
                        }
                      >
                        {expandedFeature === feature.id ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </Button>
                    </div>
                  </div>
                  {renderStepper(feature.currentStep)}
                  <div className="mt-8"></div> {/* Spacing for labels */}
                  {/* Expanded Feature Details */}
                  {expandedFeature === feature.id && (
                    <div className="mt-4 pt-4 border-t border-border/40 animate-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Left: Proposal & Specs */}
                        <div className="space-y-3">
                          <div className="bg-[#111113] p-3 rounded-lg border border-border/40">
                            <h5 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1 mb-2">
                              <FileText size={12} /> Proposal Context
                            </h5>
                            <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                              เชื่อมต่อระบบยืนยันตัวตนกับ Azure AD ของบริษัท เพื่อให้พนักงานใช้
                              Login เดียวเข้าถึงทุกแอปพลิเคชันภายใน
                            </p>
                            <a
                              href="#"
                              className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1"
                            >
                              <Lightbulb size={10} /> View full proposal document
                            </a>
                          </div>

                          <div className="bg-[#111113] p-3 rounded-lg border border-border/40">
                            <h5 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1 mb-2">
                              <PencilRuler size={12} /> Design Specs
                            </h5>
                            <div className="flex gap-2">
                              <div className="w-12 h-12 bg-slate-800 rounded border border-slate-700 flex flex-col items-center justify-center">
                                <span className="text-[8px] text-slate-400">Login UI</span>
                              </div>
                              <div className="w-12 h-12 bg-slate-800 rounded border border-slate-700 flex flex-col items-center justify-center">
                                <span className="text-[8px] text-slate-400">SSO Flow</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Tasks List */}
                        <div className="bg-[#111113] p-3 rounded-lg border border-border/40">
                          <h5 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-between mb-3">
                            <span className="flex items-center gap-1">
                              <CheckSquare size={12} /> Implementation Tasks
                            </span>
                            <span className="text-purple-400">5/8</span>
                          </h5>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2 text-[11px]">
                              <CheckCircle2
                                size={12}
                                className="text-emerald-500 shrink-0 mt-0.5"
                              />
                              <span className="text-slate-400 line-through">
                                Setup MSAL React library
                              </span>
                            </div>
                            <div className="flex items-start gap-2 text-[11px]">
                              <CheckCircle2
                                size={12}
                                className="text-emerald-500 shrink-0 mt-0.5"
                              />
                              <span className="text-slate-400 line-through">
                                Configure Azure AD app registration
                              </span>
                            </div>
                            <div className="flex items-start gap-2 text-[11px]">
                              <div className="w-3 h-3 rounded-full border border-purple-500 flex items-center justify-center shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                              </div>
                              <span className="text-slate-200">Build Login UI component</span>
                            </div>
                            <div className="flex items-start gap-2 text-[11px]">
                              <div className="w-3 h-3 rounded-full border border-slate-600 shrink-0 mt-0.5"></div>
                              <span className="text-slate-400">Implement Token Refresh logic</span>
                            </div>
                            <div className="flex items-start gap-2 text-[11px]">
                              <div className="w-3 h-3 rounded-full border border-slate-600 shrink-0 mt-0.5"></div>
                              <span className="text-slate-400">Add Route Guards</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className="h-px w-full bg-border/40" />

          {/* Iterate/Archive Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <RefreshCw size={14} className="text-foreground" />
                Completed & Iterations
              </h3>
            </div>

            {features
              .filter((f) => f.status === "archived")
              .map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[#18181b]/50 border border-border/20 rounded-xl p-4 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                          {feature.id}
                        </span>
                        <h4 className="text-sm font-medium text-foreground line-through decoration-muted-foreground">
                          {feature.name}
                        </h4>
                      </div>
                      <span className="text-xs text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 size={12} /> All tasks completed (Epic: {feature.linkedEpic})
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs border-border/60">
                        <RefreshCw size={12} className="mr-1" /> Iterate Next
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
                      >
                        <Archive size={12} className="mr-1" /> Archive
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
