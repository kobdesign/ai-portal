import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatTimeAgo, getUserDisplayName } from "./dashboard-utils";

describe("formatTimeAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'just now' for dates less than 1 minute ago", () => {
    const date = new Date("2024-06-15T11:59:30Z");
    expect(formatTimeAgo(date)).toBe("just now");
  });

  it("returns minutes ago for dates less than 1 hour ago", () => {
    const date = new Date("2024-06-15T11:55:00Z");
    expect(formatTimeAgo(date)).toBe("5 min ago");
  });

  it("returns hours ago for dates less than 24 hours ago", () => {
    const date = new Date("2024-06-15T09:00:00Z");
    expect(formatTimeAgo(date)).toBe("3 hr ago");
  });

  it("returns days ago for dates less than 7 days ago", () => {
    const date = new Date("2024-06-13T12:00:00Z");
    expect(formatTimeAgo(date)).toBe("2 days ago");
  });

  it("returns formatted date for dates 7+ days ago", () => {
    const date = new Date("2024-06-01T12:00:00Z");
    const result = formatTimeAgo(date);
    // Should return a locale-formatted date string (th-TH)
    expect(typeof result).toBe("string");
    expect(result).not.toContain("ago");
  });

  it("accepts string date input", () => {
    expect(formatTimeAgo("2024-06-15T11:59:30Z")).toBe("just now");
  });
});

describe("getUserDisplayName", () => {
  it("returns full name when both first and last name exist", () => {
    expect(getUserDisplayName({ firstName: "John", lastName: "Doe" })).toBe("John Doe");
  });

  it("returns first name when only firstName exists", () => {
    expect(getUserDisplayName({ firstName: "John" })).toBe("John");
  });

  it("returns email when only email exists", () => {
    expect(getUserDisplayName({ email: "john@example.com" })).toBe("john@example.com");
  });

  it("returns 'Developer' for null user", () => {
    expect(getUserDisplayName(null)).toBe("Developer");
  });

  it("returns 'Developer' for undefined user", () => {
    expect(getUserDisplayName(undefined)).toBe("Developer");
  });

  it("returns 'Developer' for empty object", () => {
    expect(getUserDisplayName({})).toBe("Developer");
  });
});
