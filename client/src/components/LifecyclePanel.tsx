import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Check, Play, Settings, RefreshCw, Archive, FolderKanban, Lightbulb, FileText, CheckSquare, PencilRuler, Code2, Beaker, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function LifecyclePanel() {
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
      currentStep: "implement",
      tasksTotal: 8,
      tasksDone: 5,
      status: "active"
    },
    {
      id: "FEAT-2",
      name: "Customer Dashboard Redesign",
      currentStep: "design",
      tasksTotal: 12,
      tasksDone: 2,
      status: "active"
    },
    {
      id: "FEAT-3",
      name: "Legacy Database Connector",
      currentStep: "complete",
      tasksTotal: 5,
      tasksDone: 5,
      status: "archived"
    }
  ];

  const renderStepper = (currentStepId: string) => {
    const currentIndex = steps.findIndex(s => s.id === currentStepId);
    
    return (
      <div className="flex items-center justify-between mt-4 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border/40 z-0"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-sky-500 z-0 transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 transition-all ${
                  isActive 
                    ? "bg-sky-500 border-sky-500 text-white shadow-[0_0_10px_rgba(14,165,233,0.5)] scale-110" 
                    : isCompleted 
                      ? "bg-[#18181b] border-sky-500 text-sky-400" 
                      : "bg-[#18181b] border-border/60 text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check size={10} /> : step.icon}
              </div>
              <span className={`absolute top-8 text-[9px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-sky-400 opacity-100' : 'text-muted-foreground'}`}>
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
            <span className="px-1.5 py-0.5 text-[10px] bg-purple-500/20 text-purple-400 rounded uppercase font-bold tracking-wider">Iterative</span>
          </h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 border-border/60">
              <Archive size={14} className="mr-1" /> Archives
            </Button>
            <Button size="sm" className="h-7 bg-purple-600 hover:bg-purple-700 text-xs px-2.5">
              <Plus size={14} className="mr-1" /> New Feature
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          วงจรการพัฒนาแบบครบวงจร: Explore &rarr; Ideate &rarr; Proposal &rarr; Plan &rarr; Design &rarr; Implement &rarr; Test &rarr; Complete
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
            {features.filter(f => f.status === 'active').map(feature => (
              <div key={feature.id} className="bg-[#18181b] border border-border/40 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">{feature.id}</span>
                      <h4 className="text-sm font-medium text-foreground">{feature.name}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>Tasks: {feature.tasksDone}/{feature.tasksTotal}</span>
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${(feature.tasksDone/feature.tasksTotal)*100}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="h-7 text-xs bg-purple-600 hover:bg-purple-700">
                    <Play size={12} className="mr-1" /> Start AI Task
                  </Button>
                </div>

                {renderStepper(feature.currentStep)}
                <div className="mt-8"></div> {/* Spacing for labels */}
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
            
            {features.filter(f => f.status === 'archived').map(feature => (
              <div key={feature.id} className="bg-[#18181b]/50 border border-border/20 rounded-xl p-4 opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">{feature.id}</span>
                      <h4 className="text-sm font-medium text-foreground line-through decoration-muted-foreground">{feature.name}</h4>
                    </div>
                    <span className="text-xs text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 size={12} /> All tasks completed
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs border-border/60">
                      <RefreshCw size={12} className="mr-1" /> Iterate Next
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-amber-500/30 text-amber-500 hover:bg-amber-500/10">
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