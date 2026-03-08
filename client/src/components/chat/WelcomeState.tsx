import { Code2, CheckSquare, Shield, Lightbulb } from "lucide-react";

interface WelcomeStateProps {
  onSuggestionClick: (text: string) => void;
}

const suggestions = [
  {
    icon: Code2,
    iconColor: "text-sky-400",
    borderColor: "border-sky-500/30",
    hoverBg: "hover:bg-sky-500/10",
    title: "Implement US-101 UI",
    description: "สร้าง Login Component ตาม Spec",
    prompt: "สร้าง UI สำหรับหน้า Login ตาม US-101",
  },
  {
    icon: CheckSquare,
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    hoverBg: "hover:bg-emerald-500/10",
    title: "Write API Logic",
    description: "เขียน Integration กับ Azure AD",
    prompt: "เขียน Logic เชื่อมต่อ Azure AD API",
  },
  {
    icon: Shield,
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    hoverBg: "hover:bg-amber-500/10",
    title: "Security Audit",
    description: "ตรวจสอบ PDPA & OWASP",
    prompt: "สแกน Security และ PDPA Audit ให้หน่อย",
  },
  {
    icon: Lightbulb,
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    hoverBg: "hover:bg-purple-500/10",
    title: "Explain Architecture",
    description: "อธิบายโครงสร้างระบบ SSO",
    prompt: "อธิบาย Architecture ของ FEAT-1 ให้หน่อย",
  },
];

export function WelcomeState({ onSuggestionClick }: WelcomeStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
          <Code2 size={24} className="text-indigo-400" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          พร้อมช่วยคุณเขียนโค้ดครับ
        </h2>
        <p className="text-sm text-muted-foreground max-w-[300px]">
          สั่งงาน AI ตาม Spec ที่กำหนด หรือเลือกจาก Quick Actions ด้านล่าง
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-[400px]">
        {suggestions.map((s) => (
          <button
            key={s.title}
            onClick={() => onSuggestionClick(s.prompt)}
            className={`flex flex-col gap-1.5 p-3 rounded-xl bg-muted/30 border ${s.borderColor} ${s.hoverBg} text-left transition-all hover:shadow-sm group`}
          >
            <div className="flex items-center gap-2">
              <s.icon size={14} className={s.iconColor} />
              <span className="text-xs font-medium text-foreground group-hover:text-foreground">
                {s.title}
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground leading-tight">
              {s.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
