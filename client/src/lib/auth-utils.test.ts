import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isUnauthorizedError, redirectToLogin } from "./auth-utils";

describe("isUnauthorizedError", () => {
  it("returns true for '401: Unauthorized' message", () => {
    expect(isUnauthorizedError(new Error("401: Unauthorized"))).toBe(true);
  });

  it("returns true for '401: Unauthorized - session expired' message", () => {
    expect(isUnauthorizedError(new Error("401: Unauthorized - session expired"))).toBe(true);
  });

  it("returns false for '403: Forbidden' message", () => {
    expect(isUnauthorizedError(new Error("403: Forbidden"))).toBe(false);
  });

  it("returns false for generic error message", () => {
    expect(isUnauthorizedError(new Error("Something went wrong"))).toBe(false);
  });

  it("returns false for '401: ' without 'Unauthorized'", () => {
    expect(isUnauthorizedError(new Error("401: Bad token"))).toBe(false);
  });
});

describe("redirectToLogin", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls toast with destructive variant when toast is provided", () => {
    const mockToast = vi.fn();
    redirectToLogin(mockToast);

    expect(mockToast).toHaveBeenCalledWith({
      title: "Unauthorized",
      description: "You are logged out. Logging in again...",
      variant: "destructive",
    });
  });

  it("does not throw when toast is not provided", () => {
    expect(() => redirectToLogin()).not.toThrow();
  });

  it("redirects to /login after 500ms", () => {
    const originalHref = window.location.href;
    const mockLocation = { href: originalHref };
    Object.defineProperty(window, "location", {
      value: mockLocation,
      writable: true,
      configurable: true,
    });

    redirectToLogin();
    expect(mockLocation.href).toBe(originalHref);

    vi.advanceTimersByTime(500);
    expect(mockLocation.href).toBe("/login");
  });
});
