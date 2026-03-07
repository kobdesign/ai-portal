import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, KeyRound, Lock, ShieldCheck, Mail, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, user } = useAuth();
  const { toast } = useToast();

  if (user) {
    setLocation("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isRegister) {
        await register(username, password);
      } else {
        await login(username, password);
      }
      setLocation("/");
    } catch (error: any) {
      toast({
        title: isRegister ? "Registration failed" : "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-slate-300 text-xs uppercase tracking-wider font-semibold">Username</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <Input 
                    id="username" 
                    data-testid="input-username"
                    placeholder="Enter your username" 
                    className="bg-black/40 border-[#27272a] pl-10 text-white focus-visible:ring-indigo-500 h-11"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-slate-300 text-xs uppercase tracking-wider font-semibold">Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <Input 
                    id="password" 
                    data-testid="input-password"
                    type="password" 
                    placeholder="••••••••" 
                    className="bg-black/40 border-[#27272a] pl-10 text-white focus-visible:ring-indigo-500 h-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              data-testid="button-submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  {isRegister ? "Creating account..." : "Authenticating..."}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isRegister ? <UserPlus size={16} /> : <Lock size={16} />}
                  {isRegister ? "Create Account" : "Sign In to Workspace"}
                </div>
              )}
            </Button>
            
            <div className="text-center">
              <button 
                type="button"
                data-testid="button-toggle-mode"
                className="text-indigo-400 hover:text-indigo-300 text-sm"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
              </button>
            </div>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#27272a]"></div>
              </div>
              <div className="relative bg-[#18181b] px-4 text-xs text-slate-500 uppercase tracking-wider">
                Or continue with
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full bg-transparent border-[#27272a] hover:bg-white/5 text-slate-300 h-11">
              <ShieldCheck size={16} className="mr-2 text-sky-400" />
              Azure Active Directory (SSO)
            </Button>
          </form>
        </Card>
        
        <p className="text-center text-xs text-slate-500 mt-8">
          By signing in, you agree to our Enterprise Security Policies & PDPA Guidelines.
        </p>
      </div>
    </div>
  );
}
