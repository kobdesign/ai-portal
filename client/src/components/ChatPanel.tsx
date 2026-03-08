import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Sparkles, Loader2, StopCircle, ChevronDown, ChevronRight, Paperclip, FileText, IterationCcw, Code2, Plus, MessageSquare, Trash2, Upload, BookOpen, Camera } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useConversations } from "@/hooks/useConversations";
import { MessageContent } from "@/components/chat/MessageContent";
import { getMockResponse } from "@/components/chat/mockResponses";
import { useStreamingText } from "@/hooks/useStreamingText";
import { WelcomeState } from "@/components/chat/WelcomeState";
import { MessageActions } from "@/components/chat/MessageActions";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isGenerating?: boolean;
  shouldStream?: boolean;
}

function StreamingMessageContent({ content, shouldStream, onUpdate }: {
  content: string;
  shouldStream: boolean;
  onUpdate?: () => void;
}) {
  const { displayedText, isDone } = useStreamingText(content, shouldStream);

  useEffect(() => {
    if (shouldStream && !isDone && onUpdate) {
      onUpdate();
    }
  }, [displayedText, shouldStream, isDone, onUpdate]);

  return (
    <>
      <MessageContent content={displayedText} />
      {shouldStream && !isDone && (
        <span className="inline-block w-1.5 h-[18px] bg-indigo-400/80 animate-pulse rounded-sm ml-0.5 -mb-0.5" />
      )}
    </>
  );
}

export function ChatPanel() {
  const { conversations, messages, setMessages, newChat, selectConversation, deleteConversation } = useConversations();
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [model, setModel] = useState("Claude 3.5 (Thai Optimized)");
  const [contextExpanded, setContextExpanded] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
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

    const generatingId = (Date.now() + 1).toString();
    const responseContent = getMockResponse(textToSend);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: generatingId,
        role: "assistant",
        content: "กำลังวิเคราะห์ Spec และ Context...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGenerating: true
      }]);

      setTimeout(() => {
        setMessages(prev => prev.map(msg =>
          msg.id === generatingId
            ? { ...msg, isGenerating: false, content: responseContent, shouldStream: true }
            : msg
        ));
        setIsGenerating(false);
      }, 2500);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="h-full flex flex-col bg-background/50 relative">
      
      {/* Model Selector & Top Bar */}
      <div className="px-4 py-2 border-b border-border/40 flex items-center justify-between bg-card z-10 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-7 px-2 flex items-center gap-2 hover:bg-muted/50 text-[13px] font-medium">
              <Sparkles size={14} className="text-indigo-400" />
              {model}
              <ChevronDown size={12} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-[#1e1e24] border-[#27272a]">
            <DropdownMenuItem onClick={() => setModel("Claude 3.5 (Thai Optimized)")}>Claude 3.5 (Thai Optimized)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModel("Typhoon 1.5 (SCB 10X)")}>Typhoon 1.5 (SCB 10X)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModel("GPT-4o (Enterprise)")}>GPT-4o (Enterprise)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-1.5">
          {conversations.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <MessageSquare size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-[#1e1e24] border-[#27272a] max-h-[300px] overflow-y-auto">
                {conversations.slice(0, 10).map((c) => (
                  <DropdownMenuItem
                    key={c.id}
                    className="flex items-center justify-between gap-2 text-xs"
                    onClick={() => selectConversation(c.id)}
                  >
                    <span className="truncate flex-1">{c.title}</span>
                    <button
                      className="text-muted-foreground/50 hover:text-red-400 shrink-0 p-0.5"
                      onClick={(e) => { e.stopPropagation(); deleteConversation(c.id); }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={newChat}
          >
            <Plus size={14} />
          </Button>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1 bg-muted/30 px-2 py-0.5 rounded">
            <Code2 size={10} /> Workspace Synced
          </span>
        </div>
      </div>

      {/* Active Context Dashboard (Collapsible) */}
      <div className="bg-[#18181b] border-b border-border/40 shrink-0 shadow-sm z-10">
        <button
          onClick={() => setContextExpanded(!contextExpanded)}
          className="w-full px-4 py-1.5 flex items-center gap-1.5 hover:bg-muted/20 transition-colors"
        >
          {contextExpanded ? <ChevronDown size={10} className="text-muted-foreground" /> : <ChevronRight size={10} className="text-muted-foreground" />}
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Active Context</span>
          {!contextExpanded && (
            <span className="text-[10px] text-muted-foreground ml-1">— FEAT-1: Corporate SSO</span>
          )}
        </button>
        {contextExpanded && (
          <div className="px-4 pb-2 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px] h-5 rounded-sm">
                <IterationCcw size={10} className="mr-1.5" />
                Lifecycle: Implement Phase
              </Badge>
              <span className="text-xs font-medium text-foreground">FEAT-1: Corporate SSO</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-sky-500/10 text-sky-400 border-sky-500/20 text-[10px] h-5 rounded-sm">
                <FileText size={10} className="mr-1.5" />
                Spec Bound
              </Badge>
              <span className="text-xs text-muted-foreground">US-101: Azure AD Login Integration</span>
            </div>
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="flex-1">
          <WelcomeState onSuggestionClick={(text) => handleSubmit(undefined, text)} />
        </div>
      ) : (
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-6 pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`group flex flex-col max-w-[88%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-sm shadow-sm'
                      : 'bg-[#18181b] border border-border/40 rounded-tl-sm shadow-sm text-slate-200'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <StreamingMessageContent
                      content={msg.content}
                      shouldStream={!!msg.shouldStream}
                      onUpdate={scrollToBottom}
                    />
                  ) : (
                    <MessageContent content={msg.content} />
                  )}
                  {msg.isGenerating && (
                    <div className="flex items-center gap-2 mt-3 text-muted-foreground bg-muted/20 p-2 rounded-lg border border-border/20">
                      <Loader2 size={14} className="animate-spin text-purple-400" />
                      <span className="text-xs font-medium">กำลังดำเนินการตาม Spec...</span>
                    </div>
                  )}
                </div>
                {msg.role === 'assistant' && !msg.isGenerating && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MessageActions
                      content={msg.content}
                      onRegenerate={() => {
                        const userMsg = messages[messages.indexOf(msg) - 1];
                        if (userMsg?.role === 'user') {
                          setMessages(prev => prev.filter(m => m.id !== msg.id));
                          handleSubmit(undefined, userMsg.content);
                        }
                      }}
                    />
                  </div>
                )}
                <span className="text-[10px] text-muted-foreground mt-1.5 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      <div className="p-4 bg-gradient-to-t from-background via-background to-transparent pt-6 border-t border-border/20 shrink-0">

        <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
          <div className="relative w-full flex items-end shadow-sm border border-border/60 rounded-xl bg-[#18181b] focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="สั่งให้ AI เขียนโค้ด, รันเทส, หรือเสนอไอเดีย..."
              className="min-h-[60px] max-h-[250px] w-full resize-none border-0 focus-visible:ring-0 rounded-xl py-3 px-4 bg-transparent shadow-none pr-24 scrollbar-none text-[13px]"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
                    <Paperclip size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="top" align="start" className="w-48 p-1 bg-[#1e1e24] border-[#27272a]">
                  {[
                    { icon: Upload, label: "Upload File", shortcut: "Coming soon" },
                    { icon: BookOpen, label: "Knowledge Base", shortcut: "Coming soon" },
                    { icon: Camera, label: "Screenshot", shortcut: "Coming soon" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                      onClick={() => {}}
                    >
                      <item.icon size={14} />
                      <span className="flex-1 text-left">{item.label}</span>
                      <span className="text-[10px] text-muted-foreground/50">{item.shortcut}</span>
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
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
                  className={`h-8 w-8 rounded-full transition-all ${input.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' : 'bg-muted text-muted-foreground'}`}
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