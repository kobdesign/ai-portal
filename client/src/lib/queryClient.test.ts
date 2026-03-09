import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./supabase", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
    },
  },
}));

import { apiRequest, getQueryFn } from "./queryClient";
import { supabase } from "./supabase";

describe("apiRequest", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("sends Authorization header when session has token", async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { access_token: "test-token" } },
    } as any);
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 }),
    );

    await apiRequest("GET", "/api/projects");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/projects",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      }),
    );
  });

  it("sends no Authorization header when no session", async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
    } as any);
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 }),
    );

    await apiRequest("GET", "/api/projects");

    const fetchCall = vi.mocked(global.fetch).mock.calls[0];
    const headers = (fetchCall[1] as RequestInit).headers as Record<string, string>;
    expect(headers.Authorization).toBeUndefined();
  });

  it("sends Content-Type and stringified body for POST", async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
    } as any);
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 }),
    );

    await apiRequest("POST", "/api/projects", { name: "Test" });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/projects",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "Test" }),
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("throws on non-ok response", async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
    } as any);
    vi.mocked(global.fetch).mockResolvedValue(
      new Response("Bad Request", { status: 400 }),
    );

    await expect(apiRequest("GET", "/api/fail")).rejects.toThrow("400: Bad Request");
  });
});

describe("getQueryFn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
    } as any);
  });

  it("returns null on 401 when on401 is 'returnNull'", async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      new Response("Unauthorized", { status: 401 }),
    );

    const queryFn = getQueryFn<any>({ on401: "returnNull" });
    const result = await queryFn({
      queryKey: ["/api/projects"] as any,
      meta: undefined,
      signal: new AbortController().signal,
    } as any);

    expect(result).toBeNull();
  });

  it("throws on 401 when on401 is 'throw'", async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      new Response("Unauthorized", { status: 401 }),
    );

    const queryFn = getQueryFn<any>({ on401: "throw" });

    await expect(
      queryFn({
        queryKey: ["/api/projects"] as any,
        meta: undefined,
        signal: new AbortController().signal,
      } as any),
    ).rejects.toThrow("401:");
  });

  it("returns parsed JSON on success", async () => {
    const data = [{ id: 1, name: "Project" }];
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(JSON.stringify(data), { status: 200 }),
    );

    const queryFn = getQueryFn<any>({ on401: "throw" });
    const result = await queryFn({
      queryKey: ["/api/projects"] as any,
      meta: undefined,
      signal: new AbortController().signal,
    } as any);

    expect(result).toEqual(data);
  });
});
