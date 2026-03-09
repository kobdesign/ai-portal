// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";

vi.mock("../supabase", () => ({
  supabaseAdmin: {
    auth: {
      getUser: vi.fn(),
    },
  },
}));

import { isAuthenticated, type AuthenticatedRequest } from "./middleware";
import { supabaseAdmin } from "../supabase";

function createMockReqRes(authHeader?: string) {
  const req = {
    headers: authHeader ? { authorization: authHeader } : {},
  } as Request;

  const jsonFn = vi.fn();
  const res = {
    status: vi.fn().mockReturnThis(),
    json: jsonFn,
  } as unknown as Response;

  const next = vi.fn() as NextFunction;

  return { req, res, next, jsonFn };
}

describe("isAuthenticated middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when no Authorization header is present", async () => {
    const { req, res, next } = createMockReqRes();

    await isAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when Authorization header uses wrong scheme", async () => {
    const { req, res, next } = createMockReqRes("Basic abc123");

    await isAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when supabase returns an error", async () => {
    vi.mocked(supabaseAdmin.auth.getUser).mockResolvedValue({
      data: { user: null },
      error: { message: "Invalid token" } as any,
    });

    const { req, res, next } = createMockReqRes("Bearer invalid-token");

    await isAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when supabase returns null user", async () => {
    vi.mocked(supabaseAdmin.auth.getUser).mockResolvedValue({
      data: { user: null },
      error: null,
    } as any);

    const { req, res, next } = createMockReqRes("Bearer some-token");

    await isAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next() and sets req.user on valid token", async () => {
    vi.mocked(supabaseAdmin.auth.getUser).mockResolvedValue({
      data: {
        user: { id: "user-123", email: "test@example.com" },
      },
      error: null,
    } as any);

    const { req, res, next } = createMockReqRes("Bearer valid-token");

    await isAuthenticated(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();

    const authReq = req as AuthenticatedRequest;
    expect(authReq.user.id).toBe("user-123");
    expect(authReq.user.email).toBe("test@example.com");
  });

  it("extracts the token correctly by stripping 'Bearer ' prefix", async () => {
    vi.mocked(supabaseAdmin.auth.getUser).mockResolvedValue({
      data: { user: { id: "u1", email: "a@b.c" } },
      error: null,
    } as any);

    const { req, res, next } = createMockReqRes("Bearer my-secret-token");

    await isAuthenticated(req, res, next);

    expect(supabaseAdmin.auth.getUser).toHaveBeenCalledWith("my-secret-token");
  });
});
