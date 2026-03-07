import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Database, Globe, Building2, Server, KeySquare, Layers, CheckCircle2 } from "lucide-react";

export function IntegrationsPanel() {
  const integrations = [
    {
      id: "oracle",
      name: "Oracle Database",
      category: "On-Premise Data",
      description: "Securely connect to internal Oracle databases via encrypted tunnel",
      icon: <Database className="text-red-500" size={24} />,
      status: "available",
      isEnterprise: true
    },
    {
      id: "sap",
      name: "SAP ERP",
      category: "Enterprise System",
      description: "Integrate with SAP Modules (FI, CO, MM) via OData/RFC",
      icon: <Building2 className="text-blue-500" size={24} />,
      status: "available",
      isEnterprise: true
    },
    {
      id: "ad",
      name: "Active Directory",
      category: "Authentication",
      description: "Single Sign-On (SSO) with Microsoft Azure AD / On-Premise",
      icon: <KeySquare className="text-cyan-500" size={24} />,
      status: "connected",
      isEnterprise: true
    },
    {
      id: "mssql",
      name: "MS SQL Server",
      category: "On-Premise Data",
      description: "Direct connection to Microsoft SQL Server instances",
      icon: <Server className="text-slate-300" size={24} />,
      status: "available",
      isEnterprise: true
    },
    {
      id: "aws",
      name: "AWS / Azure / GCP",
      category: "Cloud Infrastructure",
      description: "Deploy directly to corporate cloud environments",
      icon: <Layers className="text-orange-400" size={24} />,
      status: "available",
      isEnterprise: false
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="p-4 border-b border-border/40 bg-card">
        <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
          Enterprise Integrations
          <span className="px-1.5 py-0.5 text-[10px] bg-indigo-500/20 text-indigo-400 rounded uppercase font-bold tracking-wider">Pro</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-4">Connect legacy systems and corporate infrastructure.</p>
        
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search enterprise systems..." 
            className="pl-9 bg-[#18181b] border-border/40 focus-visible:ring-indigo-500/50"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {integrations.map((integration) => (
            <div 
              key={integration.id} 
              className="flex flex-col p-4 rounded-xl border border-border/40 bg-[#18181b] hover:border-indigo-500/30 transition-colors group cursor-pointer relative overflow-hidden"
            >
              {integration.isEnterprise && (
                 <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-500/10 to-transparent opacity-50" />
              )}
              
              <div className="flex items-start justify-between mb-2 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#111113] flex items-center justify-center border border-border/60 shadow-sm group-hover:scale-105 transition-transform">
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-foreground flex items-center gap-2">
                      {integration.name}
                      {integration.status === "connected" && (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      )}
                    </h3>
                    <span className="text-[11px] font-medium text-indigo-400/80 uppercase tracking-wider">
                      {integration.category}
                    </span>
                  </div>
                </div>
                
                {integration.status === "connected" ? (
                  <Button variant="outline" size="sm" className="h-7 text-xs border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10">
                    Configured
                  </Button>
                ) : (
                  <Button variant="secondary" size="sm" className="h-7 text-xs bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20">
                    Connect
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed relative z-10">
                {integration.description}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}