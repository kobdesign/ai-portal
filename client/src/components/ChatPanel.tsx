import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Sparkles, Loader2, StopCircle, ChevronDown, Paperclip, Database, LayoutTemplate } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isGenerating?: boolean;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Fullstack AI Agent. I can help you build UI components, connect to databases, or set up external APIs. What are we building today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [model, setModel] = useState("Claude 3.5 Sonnet");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isGenerating) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsGenerating(true);

    setTimeout(() => {
      const generatingId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: generatingId,
        role: "assistant",
        content: "Analyzing workspace context and implementing changes...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGenerating: true
      }]);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === generatingId 
            ? { ...msg, isGenerating: false, content: "I've applied the changes to your project! The code has been updated in the editor and the preview should refresh automatically.\n\nYou can view the new components or let me know if you want to connect a real database next." }
            : msg
        ));
        setIsGenerating(false);
      }, 3000);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="h-full flex flex-col bg-background/50 relative">
      <div className="px-4 py-3 border-b border-border/40 flex items-center justify-between bg-card z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 px-2 flex items-center gap-2 hover:bg-muted/50 text-sm font-medium">
              <Sparkles size={16} className="text-primary" />
              {model}
              <ChevronDown size={14} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-[#1e1e24] border-[#27272a]">
            <DropdownMenuItem onClick={() => setModel("Claude 3.5 Sonnet")}>Claude 3.5 Sonnet</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModel("GPT-4o")}>GPT-4o</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModel("Gemini 1.5 Pro")}>Gemini 1.5 Pro</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer">
            <Paperclip size={12} className="mr-1" />
            3 Files attached
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-6 pb-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col max-w-[88%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div 
                className={`p-3.5 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-sm' 
                    : 'bg-[#18181b] border border-border/40 rounded-tl-sm shadow-sm text-foreground'
                }`}
              >
                <div className="text-[14px] leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>
                {msg.isGenerating && (
                  <div className="flex items-center gap-2 mt-3 text-muted-foreground bg-muted/20 p-2 rounded-lg border border-border/20">
                    <Loader2 size={14} className="animate-spin text-primary" />
                    <span className="text-xs font-medium">Writing code...</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground mt-1.5 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 bg-gradient-to-t from-background via-background to-transparent pt-6 border-t border-border/20">
        
        {/* Quick Actions / Suggestions */}
        {!isGenerating && messages.length < 3 && (
          <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-none pb-1">
            <button 
              onClick={() => handleSubmit(undefined, "Set up Supabase authentication")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground hover:text-foreground hover:bg-muted whitespace-nowrap transition-colors"
            >
              <Database size={12} className="text-blue-400" />
              Add Supabase Auth
            </button>
            <button 
              onClick={() => handleSubmit(undefined, "Create a responsive dashboard layout")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground hover:text-foreground hover:bg-muted whitespace-nowrap transition-colors"
            >
              <LayoutTemplate size={12} className="text-emerald-400" />
              Dashboard Layout
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
          <div className="relative w-full flex items-end shadow-sm border border-border/60 rounded-xl bg-[#18181b] focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me to build or modify anything..."
              className="min-h-[60px] max-h-[250px] w-full resize-none border-0 focus-visible:ring-0 rounded-xl py-3 px-4 bg-transparent shadow-none pr-24 scrollbar-none text-[14px]"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
                <Paperclip size={16} />
              </Button>
              {isGenerating ? (
                <Button 
                  type="button" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive transition-colors"
                >
                  <StopCircle size={18} />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!input.trim()}
                  className={`h-8 w-8 rounded-full transition-all ${input.trim() ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md' : 'bg-muted text-muted-foreground'}`}
                >
                  <ArrowUp size={18} />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}