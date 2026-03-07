import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Database, Globe, CreditCard, Github, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export function IntegrationsPanel() {
  const integrations = [
    {
      id: "supabase",
      name: "Supabase",
      category: "Database & Auth",
      description: "Connect to Postgres database and enable authentication",
      icon: <Database className="text-emerald-500" size={24} />,
      status: "connected"
    },
    {
      id: "vercel",
      name: "Vercel",
      category: "Deployment",
      description: "Auto-deploy your project on every commit",
      icon: <Globe className="text-white" size={24} />,
      status: "available"
    },
    {
      id: "stripe",
      name: "Stripe",
      category: "Payments",
      description: "Accept payments and manage subscriptions",
      icon: <CreditCard className="text-indigo-500" size={24} />,
      status: "available"
    },
    {
      id: "github",
      name: "GitHub",
      category: "Source Control",
      description: "Sync your project with a GitHub repository",
      icon: <Github className="text-white" size={24} />,
      status: "available"
    },
    {
      id: "resend",
      name: "Resend",
      category: "Email",
      description: "Send transactional emails and newsletters",
      icon: <Mail className="text-rose-400" size={24} />,
      status: "available"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="p-4 border-b border-border/40 bg-card">
        <h2 className="text-lg font-semibold mb-1">Services & Integrations</h2>
        <p className="text-sm text-muted-foreground mb-4">Connect external tools to empower your AI Agent.</p>
        
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search integrations..." 
            className="pl-9 bg-[#18181b] border-border/40 focus-visible:ring-primary/50"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {integrations.map((integration) => (
            <div 
              key={integration.id} 
              className="flex flex-col p-4 rounded-xl border border-border/40 bg-[#18181b] hover:border-primary/30 transition-colors group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border/40 shadow-sm group-hover:scale-105 transition-transform">
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-foreground flex items-center gap-2">
                      {integration.name}
                      {integration.status === "connected" && (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      )}
                    </h3>
                    <span className="text-[11px] font-medium text-primary/80 uppercase tracking-wider">
                      {integration.category}
                    </span>
                  </div>
                </div>
                
                {integration.status === "connected" ? (
                  <Button variant="outline" size="sm" className="h-7 text-xs border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10">
                    Manage
                  </Button>
                ) : (
                  <Button variant="secondary" size="sm" className="h-7 text-xs bg-primary/10 text-primary hover:bg-primary/20">
                    Connect
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {integration.description}
              </p>
              
              {integration.status !== "connected" && (
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={12} className="text-primary" />
                  Agent can write integration code for you
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}