// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import { createServer } from "http";

// Mock storage
const mockStorage = {
  getProjectsByUserId: vi.fn(),
  getProject: vi.fn(),
  createProject: vi.fn(),
  updateProject: vi.fn(),
  deleteProject: vi.fn(),
};

vi.mock("./storage", () => ({
  storage: {
    getProjectsByUserId: (...args: any[]) => mockStorage.getProjectsByUserId(...args),
    getProject: (...args: any[]) => mockStorage.getProject(...args),
    createProject: (...args: any[]) => mockStorage.createProject(...args),
    updateProject: (...args: any[]) => mockStorage.updateProject(...args),
    deleteProject: (...args: any[]) => mockStorage.deleteProject(...args),
  },
}));

// Mock auth middleware to inject a test user
vi.mock("./auth/middleware", () => ({
  isAuthenticated: (req: any, _res: any, next: any) => {
    req.user = { id: "test-user-id", email: "test@example.com" };
    next();
  },
}));

import { registerRoutes } from "./routes";

async function makeRequest(
  app: express.Express,
  method: string,
  path: string,
  body?: any,
): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        return reject(new Error("Failed to get server address"));
      }
      const port = address.port;

      const options: RequestInit = {
        method,
        headers: body ? { "Content-Type": "application/json" } : {},
        body: body ? JSON.stringify(body) : undefined,
      };

      fetch(`http://127.0.0.1:${port}${path}`, options)
        .then(async (res) => {
          const json = await res.json().catch(() => null);
          server.close();
          resolve({ status: res.status, body: json });
        })
        .catch((err) => {
          server.close();
          reject(err);
        });
    });
  });
}

describe("API Routes", () => {
  let app: express.Express;

  beforeEach(async () => {
    vi.clearAllMocks();
    app = express();
    app.use(express.json());
    const httpServer = createServer(app);
    await registerRoutes(httpServer, app);
  });

  describe("GET /api/projects", () => {
    it("returns user projects", async () => {
      const projects = [
        { id: 1, name: "P1", userId: "test-user-id" },
        { id: 2, name: "P2", userId: "test-user-id" },
      ];
      mockStorage.getProjectsByUserId.mockResolvedValue(projects);

      const res = await makeRequest(app, "GET", "/api/projects");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(projects);
      expect(mockStorage.getProjectsByUserId).toHaveBeenCalledWith("test-user-id");
    });

    it("returns 500 when storage throws", async () => {
      mockStorage.getProjectsByUserId.mockRejectedValue(new Error("DB error"));

      const res = await makeRequest(app, "GET", "/api/projects");

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch projects");
    });
  });

  describe("GET /api/projects/:id", () => {
    it("returns a project owned by the user", async () => {
      const project = { id: 1, name: "P1", userId: "test-user-id" };
      mockStorage.getProject.mockResolvedValue(project);

      const res = await makeRequest(app, "GET", "/api/projects/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(project);
    });

    it("returns 404 when project belongs to different user (authorization)", async () => {
      const project = { id: 1, name: "P1", userId: "other-user-id" };
      mockStorage.getProject.mockResolvedValue(project);

      const res = await makeRequest(app, "GET", "/api/projects/1");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Project not found");
    });

    it("returns 404 when project does not exist", async () => {
      mockStorage.getProject.mockResolvedValue(undefined);

      const res = await makeRequest(app, "GET", "/api/projects/999");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /api/projects", () => {
    it("creates a project with valid data", async () => {
      const created = { id: 1, name: "New", description: "Desc", userId: "test-user-id" };
      mockStorage.createProject.mockResolvedValue(created);

      const res = await makeRequest(app, "POST", "/api/projects", {
        name: "New",
        description: "Desc",
      });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
      expect(mockStorage.createProject).toHaveBeenCalledWith(
        expect.objectContaining({ name: "New", description: "Desc" }),
        "test-user-id",
      );
    });

    it("returns 400 with validation errors for invalid data", async () => {
      const res = await makeRequest(app, "POST", "/api/projects", {});

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid project data");
      expect(res.body.errors).toBeDefined();
    });

    it("returns 400 when body is missing name", async () => {
      const res = await makeRequest(app, "POST", "/api/projects", {
        description: "Desc",
      });

      expect(res.status).toBe(400);
    });
  });

  describe("PATCH /api/projects/:id", () => {
    it("updates a project owned by the user", async () => {
      const project = { id: 1, name: "P1", userId: "test-user-id" };
      const updated = { ...project, name: "Updated" };
      mockStorage.getProject.mockResolvedValue(project);
      mockStorage.updateProject.mockResolvedValue(updated);

      const res = await makeRequest(app, "PATCH", "/api/projects/1", { name: "Updated" });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Updated");
    });

    it("returns 404 when non-owner tries to update", async () => {
      const project = { id: 1, name: "P1", userId: "other-user-id" };
      mockStorage.getProject.mockResolvedValue(project);

      const res = await makeRequest(app, "PATCH", "/api/projects/1", { name: "Hacked" });

      expect(res.status).toBe(404);
      expect(mockStorage.updateProject).not.toHaveBeenCalled();
    });
  });

  describe("DELETE /api/projects/:id", () => {
    it("deletes a project owned by the user", async () => {
      const project = { id: 1, name: "P1", userId: "test-user-id" };
      mockStorage.getProject.mockResolvedValue(project);
      mockStorage.deleteProject.mockResolvedValue(true);

      const res = await makeRequest(app, "DELETE", "/api/projects/1");

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Project deleted");
    });

    it("returns 404 when non-owner tries to delete", async () => {
      const project = { id: 1, name: "P1", userId: "other-user-id" };
      mockStorage.getProject.mockResolvedValue(project);

      const res = await makeRequest(app, "DELETE", "/api/projects/1");

      expect(res.status).toBe(404);
      expect(mockStorage.deleteProject).not.toHaveBeenCalled();
    });
  });
});
