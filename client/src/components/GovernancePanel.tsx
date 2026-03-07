import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCheck, Activity, ShieldAlert, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function GovernancePanel() {
  const auditLogs = [
    {
      id: 1,
      action: "Generated Database Migration",
      user: "Somchai (AI Assistant)",
      time: "10 mins ago",
      status: "pending_review",
      approver: "Tech Lead",
    },
    {
      id: 2,
      action: "Added OAuth2 Authentication",
      user: "Nadech (AI Assistant)",
      time: "2 hours ago",
      status: "approved",
      approver: "Security Team",
    },
    {
      id: 3,
      action: "Modified Core Banking API Wrapper",
      user: "Yaya (AI Assistant)",
      time: "1 day ago",
      status: "rejected",
      approver: "Architecture Board",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="p-4 border-b border-border/40 bg-card">
        <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">Governance & Audit</h2>
        <p className="text-sm text-muted-foreground">
          ตรวจสอบและอนุมัติโค้ดที่ AI สร้างขึ้น (Maker/Checker)
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#18181b] p-3 rounded-xl border border-border/40">
              <h4 className="text-xs text-muted-foreground mb-1">Pending Approvals</h4>
              <div className="text-2xl font-bold text-amber-400">12</div>
            </div>
            <div className="bg-[#18181b] p-3 rounded-xl border border-border/40">
              <h4 className="text-xs text-muted-foreground mb-1">Compliance Score</h4>
              <div className="text-2xl font-bold text-emerald-400">98%</div>
            </div>
          </div>

          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Recent AI Activities
          </h3>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl border border-border/40 bg-[#18181b] flex flex-col gap-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-indigo-400" />
                    <span className="text-sm font-medium">{log.action}</span>
                  </div>
                  {log.status === "pending_review" && (
                    <Badge
                      variant="outline"
                      className="text-amber-400 border-amber-400/30 bg-amber-400/10 text-[10px]"
                    >
                      Pending
                    </Badge>
                  )}
                  {log.status === "approved" && (
                    <Badge
                      variant="outline"
                      className="text-emerald-400 border-emerald-400/30 bg-emerald-400/10 text-[10px]"
                    >
                      Approved
                    </Badge>
                  )}
                  {log.status === "rejected" && (
                    <Badge
                      variant="outline"
                      className="text-rose-400 border-rose-400/30 bg-rose-400/10 text-[10px]"
                    >
                      Rejected
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} /> {log.time}
                  </div>
                  <span>By: {log.user}</span>
                </div>

                {log.status === "pending_review" && (
                  <div className="flex gap-2 mt-2 pt-2 border-t border-border/40">
                    <Button
                      size="sm"
                      className="w-full h-7 text-xs bg-emerald-600 hover:bg-emerald-700"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full h-7 text-xs border-border/60 hover:bg-muted"
                    >
                      Review Code
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-4 text-xs border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
          >
            Export Audit Report (PDF)
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
