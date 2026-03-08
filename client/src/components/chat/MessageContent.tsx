import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Copy } from "lucide-react";

interface MessageContentProps {
  content: string;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-border/40 bg-[#0d1117]">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-border/30">
        <Badge variant="outline" className="text-[10px] h-5 bg-transparent border-border/40 text-muted-foreground font-mono">
          {language || "code"}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={handleCopy}
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
        </Button>
      </div>
      <pre className="p-3 overflow-x-auto scrollbar-none">
        <code className="text-[12px] leading-relaxed font-mono text-slate-300">
          {highlightSyntax(code, language)}
        </code>
      </pre>
    </div>
  );
}

function highlightSyntax(code: string, _language: string) {
  const keywords = /\b(import|export|from|const|let|var|function|return|if|else|async|await|new|class|extends|interface|type|enum|try|catch|throw|default|switch|case|break|for|while|of|in|null|undefined|true|false|this)\b/g;
  const strings = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
  const jsxTags = /(<\/?[A-Z][a-zA-Z0-9.]*|<\/?[a-z][a-zA-Z0-9-]*)/g;
  const decorators = /(@\w+)/g;
  const numbers = /\b(\d+\.?\d*)\b/g;

  const tokens: { start: number; end: number; className: string }[] = [];

  const addMatches = (regex: RegExp, className: string) => {
    let match;
    const r = new RegExp(regex.source, regex.flags);
    while ((match = r.exec(code)) !== null) {
      tokens.push({ start: match.index, end: match.index + match[0].length, className });
    }
  };

  addMatches(comments, "text-emerald-600");
  addMatches(strings, "text-sky-300");
  addMatches(keywords, "text-purple-400");
  addMatches(jsxTags, "text-red-400");
  addMatches(decorators, "text-yellow-400");
  addMatches(numbers, "text-amber-300");

  tokens.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

  const filtered: typeof tokens = [];
  let lastEnd = 0;
  for (const token of tokens) {
    if (token.start >= lastEnd) {
      filtered.push(token);
      lastEnd = token.end;
    }
  }

  const elements: React.ReactNode[] = [];
  let pos = 0;
  for (const token of filtered) {
    if (token.start > pos) {
      elements.push(code.slice(pos, token.start));
    }
    elements.push(
      <span key={token.start} className={token.className}>
        {code.slice(token.start, token.end)}
      </span>
    );
    pos = token.end;
  }
  if (pos < code.length) {
    elements.push(code.slice(pos));
  }

  return <>{elements}</>;
}

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded bg-[#1e1e2e] text-sky-300 text-[12px] font-mono border border-border/30">
          {match[1].slice(1, -1)}
        </code>
      );
    } else if (match[2]) {
      parts.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {match[2].slice(2, -2)}
        </strong>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function MessageContent({ content }: MessageContentProps) {
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  const segments: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textBefore = content.slice(lastIndex, match.index);
      segments.push(<TextBlock key={`t-${lastIndex}`} text={textBefore} />);
    }
    segments.push(
      <CodeBlock key={`c-${match.index}`} language={match[1]} code={match[2].trimEnd()} />
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    segments.push(<TextBlock key={`t-${lastIndex}`} text={content.slice(lastIndex)} />);
  }

  return <div className="text-[13px] leading-relaxed">{segments}</div>;
}

function TextBlock({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, i) => {
        const trimmed = line.trim();

        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={i} className="flex items-start gap-2 pl-2 py-0.5">
              <span className="text-muted-foreground mt-1.5 text-[8px]">●</span>
              <span>{parseInline(trimmed.slice(2))}</span>
            </div>
          );
        }

        const numberedMatch = trimmed.match(/^(\d+)\.\s(.+)/);
        if (numberedMatch) {
          return (
            <div key={i} className="flex items-start gap-2 pl-2 py-0.5">
              <span className="text-muted-foreground text-[12px] font-mono min-w-[1.2em] text-right">{numberedMatch[1]}.</span>
              <span>{parseInline(numberedMatch[2])}</span>
            </div>
          );
        }

        if (trimmed === "") {
          return <div key={i} className="h-2" />;
        }

        return (
          <div key={i} className="whitespace-pre-wrap">
            {parseInline(line)}
          </div>
        );
      })}
    </>
  );
}
