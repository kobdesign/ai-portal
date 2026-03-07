import { Button } from "@/components/ui/button";
import { Building2, Lock, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#111113] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#18181b] border border-border/40 mb-6 shadow-xl">
            <Building2 size={32} className="text-indigo-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Enterprise AI Studio</h1>
          <p className="text-slate-400 text-sm">Secure Developer Workspace</p>
        </div>

        <Card className="bg-[#18181b]/80 border-[#27272a] backdrop-blur-sm p-8 shadow-2xl">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold text-white">Welcome</h2>
              <p className="text-sm text-slate-400">Sign in with your account to access the workspace</p>
            </div>

            <Button 
              data-testid="button-login"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)]"
              onClick={() => { window.location.href = "/api/login"; }}
            >
              <Lock size={16} className="mr-2" />
              Sign In to Workspace
            </Button>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#27272a]"></div>
              </div>
              <div className="relative bg-[#18181b] px-4 text-xs text-slate-500 uppercase tracking-wider">
                Supports
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <ShieldCheck size={12} className="text-sky-400" /> Google
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <ShieldCheck size={12} className="text-slate-400" /> GitHub
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <ShieldCheck size={12} className="text-slate-400" /> Email
              </span>
            </div>
          </div>
        </Card>
        
        <p className="text-center text-xs text-slate-500 mt-8">
          By signing in, you agree to our Enterprise Security Policies & PDPA Guidelines.
        </p>
      </div>
    </div>
  );
}
