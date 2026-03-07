import { createContext, useContext, useState, type ReactNode } from "react";

interface ChatContextType {
  activeSpec: { id: string; name: string; description: string } | null;
  lifecyclePhase: string | null;
  featureName: string | null;
  setActiveSpec: (spec: ChatContextType["activeSpec"]) => void;
  setLifecyclePhase: (phase: string | null) => void;
  setFeatureName: (name: string | null) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatContextProvider({ children }: { children: ReactNode }) {
  const [activeSpec, setActiveSpec] = useState<ChatContextType["activeSpec"]>(null);
  const [lifecyclePhase, setLifecyclePhase] = useState<string | null>(null);
  const [featureName, setFeatureName] = useState<string | null>(null);

  return (
    <ChatContext.Provider
      value={{
        activeSpec,
        lifecyclePhase,
        featureName,
        setActiveSpec,
        setLifecyclePhase,
        setFeatureName,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
}
