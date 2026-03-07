import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Sparkles, Loader2, StopCircle, ChevronDown, Paperclip, FileText, CheckSquare, ListTodo } from "lucide-react";
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
      content: "สวัสดีครับ! แพลตฟอร์มของเรารองรับ Spec-Driven Development ตามหลักการของ OpenSpec\n\nคุณสามารถระบุ Requirement/User Story เข้ามาในระบบ Project Management ของเรา แล้วให้ผมแปลง Spec เหล่านั้นเป็นโค้ดที่ทำงานได้จริง ทั้งโครงสร้าง UI, Logic, และการเชื่อมต่อ API\n\nต้องการให้ผมเริ่มเขียนโค้ดจาก Spec ไหน หรือให้ช่วยเขียน Spec ใหม่ดีครับ?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [model, setModel] = useState("Claude 3.5 (Thai Optimized)");
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
        content: "กำลังอ่าน Requirement จาก OpenSpec Document และวางโครงสร้าง...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGenerating: true
      }]);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === generatingId 
            ? { ...msg, isGenerating: false, content: "ผมได้พัฒนาฟีเจอร์ตาม Spec อัตโนมัติเรียบร้อยแล้วครับ:\n1. สร้าง UI Component ตาม Design System ขององค์กร\n2. เขียน Logic ควบคุม Role-based Access Control\n3. สร้าง Automated Tests อิงตาม Acceptance Criteria ใน Spec\n\nสถานะใน Project Management ถูกปรับเป็น 'In Review' ให้แล้วครับ" }
            : msg
        ));
        setIsGenerating(false);
      }, 4000);
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
              <Sparkles size={16} className="text-indigo-400" />
              {model}
              <ChevronDown size={14} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-[#1e1e24] border-[#27272a]">
            <DropdownMenuItem onClick={() => setModel("Claude 3.5 (Thai Optimized)")}>Claude 3.5 (Thai Optimized)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModel("Typhoon 1.5 (SCB 10X)")}>Typhoon 1.5 (SCB 10X)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModel("GPT-4o (Enterprise)")}>GPT-4o (Enterprise)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-sky-500/10 text-sky-400 border-sky-500/20 cursor-pointer">
            <ListTodo size={12} className="mr-1" />
            Project Spec Linked
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
                    ? 'bg-indigo-600 text-white rounded-tr-sm shadow-sm' 
                    : 'bg-[#18181b] border border-border/40 rounded-tl-sm shadow-sm text-slate-200'
                }`}
              >
                <div className="text-[14px] leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>
                {msg.isGenerating && (
                  <div className="flex items-center gap-2 mt-3 text-muted-foreground bg-muted/20 p-2 rounded-lg border border-border/20">
                    <Loader2 size={14} className="animate-spin text-sky-400" />
                    <span className="text-xs font-medium">กำลังเปลี่ยน Spec เป็น Code...</span>
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
        
        {/* Spec-Driven Quick Actions */}
        {!isGenerating && messages.length < 3 && (
          <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-none pb-1">
            <button 
              onClick={() => handleSubmit(undefined, "ช่วยเขียนโค้ดสำหรับ US-102: Role-based Access Control (RBAC) ให้หน่อย")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-sky-500/30 text-xs text-sky-400 hover:bg-sky-500/10 whitespace-nowrap transition-colors"
            >
              <FileText size={12} />
              Generate from US-102
            </button>
            <button 
              onClick={() => handleSubmit(undefined, "สร้าง Acceptance Test Scripts ตาม Requirement ในเอกสารนี้")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground hover:text-foreground hover:bg-muted whitespace-nowrap transition-colors"
            >
              <CheckSquare size={12} className="text-emerald-400" />
              Write Acceptance Tests
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
          <div className="relative w-full flex items-end shadow-sm border border-border/60 rounded-xl bg-[#18181b] focus-within:ring-1 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="สั่งให้ AI พัฒนาระบบตาม Spec ที่กำหนดไว้..."
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
                  className="h-8 w-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                >
                  <StopCircle size={18} />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!input.trim()}
                  className={`h-8 w-8 rounded-full transition-all ${input.trim() ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-md' : 'bg-muted text-muted-foreground'}`}
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