import { useState, useEffect, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isGenerating?: boolean;
  shouldStream?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: string;
}

const STORAGE_KEY = "ai-portal-conversations";

function loadConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveConversations(convos: Conversation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(convos));
}

function generateTitle(messages: Message[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return "New Chat";
  const text = firstUser.content.slice(0, 40);
  return text.length < firstUser.content.length ? text + "..." : text;
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;
  const messages = activeConversation?.messages ?? [];

  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  const setMessages = useCallback(
    (updater: Message[] | ((prev: Message[]) => Message[])) => {
      setConversations((prev) => {
        if (!activeId) {
          const id = Date.now().toString();
          const newMessages = typeof updater === "function" ? updater([]) : updater;
          const convo: Conversation = {
            id,
            title: generateTitle(newMessages),
            messages: newMessages,
            updatedAt: new Date().toISOString(),
          };
          setActiveId(id);
          return [convo, ...prev];
        }

        return prev.map((c) => {
          if (c.id !== activeId) return c;
          const newMessages = typeof updater === "function" ? updater(c.messages) : updater;
          return {
            ...c,
            messages: newMessages,
            title: c.title === "New Chat" ? generateTitle(newMessages) : c.title,
            updatedAt: new Date().toISOString(),
          };
        });
      });
    },
    [activeId],
  );

  const newChat = useCallback(() => {
    setActiveId(null);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeId === id) setActiveId(null);
    },
    [activeId],
  );

  return {
    conversations,
    activeId,
    messages,
    setMessages,
    newChat,
    selectConversation,
    deleteConversation,
  };
}
