import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useConversations } from "./useConversations";

const STORAGE_KEY = "ai-portal-conversations";

describe("useConversations", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("starts with empty conversations and null activeId", () => {
    const { result } = renderHook(() => useConversations());

    expect(result.current.conversations).toEqual([]);
    expect(result.current.activeId).toBeNull();
    expect(result.current.messages).toEqual([]);
  });

  it("loads conversations from localStorage on init", () => {
    const saved = [
      {
        id: "1",
        title: "Test Chat",
        messages: [{ id: "m1", role: "user", content: "Hello", timestamp: "2024-01-01" }],
        updatedAt: "2024-01-01",
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

    const { result } = renderHook(() => useConversations());

    expect(result.current.conversations).toHaveLength(1);
    expect(result.current.conversations[0].title).toBe("Test Chat");
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem(STORAGE_KEY, "not valid json!!!");

    const { result } = renderHook(() => useConversations());

    expect(result.current.conversations).toEqual([]);
  });

  it("creates a new conversation when setMessages is called with no active conversation", () => {
    const { result } = renderHook(() => useConversations());

    act(() => {
      result.current.setMessages([
        { id: "m1", role: "user" as const, content: "Hello world", timestamp: "2024-01-01" },
      ]);
    });

    expect(result.current.conversations).toHaveLength(1);
    expect(result.current.activeId).not.toBeNull();
    expect(result.current.messages).toHaveLength(1);
  });

  it("generates title from first user message, truncated to 40 chars", () => {
    const { result } = renderHook(() => useConversations());

    const longMessage = "This is a very long message that should be truncated at 40 characters";
    act(() => {
      result.current.setMessages([
        { id: "m1", role: "user" as const, content: longMessage, timestamp: "2024-01-01" },
      ]);
    });

    expect(result.current.conversations[0].title).toBe(
      longMessage.slice(0, 40) + "...",
    );
  });

  it("generates 'New Chat' title when no user messages", () => {
    const { result } = renderHook(() => useConversations());

    act(() => {
      result.current.setMessages([
        { id: "m1", role: "assistant" as const, content: "Hello!", timestamp: "2024-01-01" },
      ]);
    });

    expect(result.current.conversations[0].title).toBe("New Chat");
  });

  it("updates messages on existing active conversation", () => {
    const { result } = renderHook(() => useConversations());

    // Create a conversation first
    act(() => {
      result.current.setMessages([
        { id: "m1", role: "user" as const, content: "Hello", timestamp: "2024-01-01" },
      ]);
    });

    // Update it
    act(() => {
      result.current.setMessages((prev) => [
        ...prev,
        { id: "m2", role: "assistant" as const, content: "Hi back!", timestamp: "2024-01-01" },
      ]);
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.conversations).toHaveLength(1);
  });

  it("newChat resets activeId to null", () => {
    const { result } = renderHook(() => useConversations());

    // Create a conversation
    act(() => {
      result.current.setMessages([
        { id: "m1", role: "user" as const, content: "Hello", timestamp: "2024-01-01" },
      ]);
    });
    expect(result.current.activeId).not.toBeNull();

    act(() => {
      result.current.newChat();
    });

    expect(result.current.activeId).toBeNull();
    expect(result.current.messages).toEqual([]);
  });

  it("selectConversation sets activeId", () => {
    const { result } = renderHook(() => useConversations());

    // Create a conversation
    act(() => {
      result.current.setMessages([
        { id: "m1", role: "user" as const, content: "Hello", timestamp: "2024-01-01" },
      ]);
    });
    const conversationId = result.current.activeId!;

    // Start new chat, then re-select
    act(() => {
      result.current.newChat();
    });
    expect(result.current.activeId).toBeNull();

    act(() => {
      result.current.selectConversation(conversationId);
    });
    expect(result.current.activeId).toBe(conversationId);
  });

  it("deleteConversation removes conversation and resets activeId if active", () => {
    const { result } = renderHook(() => useConversations());

    // Create a conversation
    act(() => {
      result.current.setMessages([
        { id: "m1", role: "user" as const, content: "Hello", timestamp: "2024-01-01" },
      ]);
    });
    const conversationId = result.current.activeId!;

    act(() => {
      result.current.deleteConversation(conversationId);
    });

    expect(result.current.conversations).toHaveLength(0);
    expect(result.current.activeId).toBeNull();
  });

  it("deleteConversation on non-active conversation preserves conversations list", () => {
    // Pre-populate localStorage with two conversations
    const convos = [
      {
        id: "conv-1",
        title: "First",
        messages: [{ id: "m1", role: "user", content: "First", timestamp: "2024-01-01" }],
        updatedAt: "2024-01-01",
      },
      {
        id: "conv-2",
        title: "Second",
        messages: [{ id: "m2", role: "user", content: "Second", timestamp: "2024-01-01" }],
        updatedAt: "2024-01-01",
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(convos));

    const { result } = renderHook(() => useConversations());

    // Select conv-2 as active
    act(() => {
      result.current.selectConversation("conv-2");
    });
    expect(result.current.activeId).toBe("conv-2");

    // Delete conv-1 (non-active)
    act(() => {
      result.current.deleteConversation("conv-1");
    });

    expect(result.current.activeId).toBe("conv-2");
    expect(result.current.conversations).toHaveLength(1);
    expect(result.current.conversations[0].id).toBe("conv-2");
  });

  it("persists conversations to localStorage on change", () => {
    const { result } = renderHook(() => useConversations());

    act(() => {
      result.current.setMessages([
        { id: "m1", role: "user" as const, content: "Hello", timestamp: "2024-01-01" },
      ]);
    });

    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].messages[0].content).toBe("Hello");
  });
});
