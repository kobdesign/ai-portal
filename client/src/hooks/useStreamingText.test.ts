import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useStreamingText } from "./useStreamingText";

describe("useStreamingText", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows full text immediately when isStreaming is false", () => {
    const { result } = renderHook(() =>
      useStreamingText("Hello World", false),
    );

    expect(result.current.displayedText).toBe("Hello World");
    expect(result.current.isDone).toBe(true);
  });

  it("starts with empty text when isStreaming is true", () => {
    const { result } = renderHook(() =>
      useStreamingText("Hello World", true),
    );

    expect(result.current.displayedText).toBe("");
    expect(result.current.isDone).toBe(false);
  });

  it("progressively reveals text in chunks", () => {
    const { result } = renderHook(() =>
      useStreamingText("Hello World!!", true, 4, 20),
    );

    expect(result.current.displayedText).toBe("");

    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(result.current.displayedText).toBe("Hell");

    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(result.current.displayedText).toBe("Hello Wo");

    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(result.current.displayedText).toBe("Hello World!");
  });

  it("sets isDone to true after all text is revealed", () => {
    const { result } = renderHook(() =>
      useStreamingText("Hi", true, 4, 20),
    );

    expect(result.current.isDone).toBe(false);

    act(() => {
      vi.advanceTimersByTime(20);
    });

    expect(result.current.displayedText).toBe("Hi");
    expect(result.current.isDone).toBe(true);
  });
});
