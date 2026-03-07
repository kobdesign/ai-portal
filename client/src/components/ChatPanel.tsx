import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Sparkles, Code2, Loader2, StopCircle } from "lucide-react";

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
      content: "Hi! I'm your AI developer. What would you like to build today? You can describe an app, a component, or just ask me to generate something creative.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsGenerating(true);

    // Mock generation process
    setTimeout(() => {
      const generatingId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: generatingId,
        role: "assistant",
        content: "I'm setting up the project structure and generating the components...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGenerating: true
      }]);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === generatingId 
            ? { ...msg, isGenerating: false, content: "I've created a modern dashboard interface for you. It includes a sidebar, a stats overview, and a main chart area. How does this look? Would you like me to adjust any colors or add more components?" }
            : msg
        ));
        setIsGenerating(false);
      }, 3000);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background relative">
      <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between bg-background/95 backdrop-blur z-10">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />
          AI Assistant
        </h2>
        <div className="text-xs text-muted-foreground flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md">
          <Code2 size={12} />
          <span>v1.0.4-beta</span>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-6 pb-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div 
                className={`p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                    : 'bg-card border border-border/50 rounded-tl-sm shadow-sm'
                }`}
              >
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>
                {msg.isGenerating && (
                  <div className="flex items-center gap-2 mt-3 text-muted-foreground">
                    <Loader2 size={14} className="animate-spin text-primary" />
                    <span className="text-xs font-medium">Generating code...</span>
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

      <div className="p-4 border-t border-border/50 bg-background">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
          <div className="relative w-full flex items-end shadow-sm border border-border/50 rounded-xl overflow-hidden bg-card focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me to build something..."
              className="min-h-[60px] max-h-[200px] w-full resize-none border-0 focus-visible:ring-0 rounded-xl py-3 px-4 bg-transparent shadow-none pr-12 scrollbar-none"
              rows={1}
            />
            <div className="absolute right-2 bottom-2">
              {isGenerating ? (
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive"
                >
                  <StopCircle size={18} />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!input.trim()}
                  className={`h-8 w-8 rounded-full transition-all ${input.trim() ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-muted-foreground'}`}
                >
                  <ArrowUp size={18} />
                </Button>
              )}
            </div>
          </div>
        </form>
        <div className="mt-2 text-center">
          <span className="text-[10px] text-muted-foreground">
            AI can make mistakes. Verify code before deploying.
          </span>
        </div>
      </div>
    </div>
  );
}