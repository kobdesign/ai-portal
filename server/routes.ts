import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema } from "@shared/schema";
import { isAuthenticated, type AuthenticatedRequest } from "./auth/middleware";

function paramId(params: Record<string, string | string[]>): number {
  const v = params.id;
  return parseInt(Array.isArray(v) ? v[0] : v);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.get("/api/projects", isAuthenticated, async (req, res) => {
    try {
      const userId = (req as AuthenticatedRequest).user.id;
      const userProjects = await storage.getProjectsByUserId(userId);
      res.json(userProjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", isAuthenticated, async (req, res) => {
    try {
      const userId = (req as AuthenticatedRequest).user.id;
      const project = await storage.getProject(paramId(req.params));
      if (!project || project.userId !== userId) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertProjectSchema.safeParse(req.body);
      if (!parsed.success) {
        return res
          .status(400)
          .json({ message: "Invalid project data", errors: parsed.error.issues });
      }
      const userId = (req as AuthenticatedRequest).user.id;
      const project = await storage.createProject(parsed.data, userId);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.patch("/api/projects/:id", isAuthenticated, async (req, res) => {
    try {
      const userId = (req as AuthenticatedRequest).user.id;
      const project = await storage.getProject(paramId(req.params));
      if (!project || project.userId !== userId) {
        return res.status(404).json({ message: "Project not found" });
      }
      const updated = await storage.updateProject(paramId(req.params), req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", isAuthenticated, async (req, res) => {
    try {
      const userId = (req as AuthenticatedRequest).user.id;
      const project = await storage.getProject(paramId(req.params));
      if (!project || project.userId !== userId) {
        return res.status(404).json({ message: "Project not found" });
      }
      await storage.deleteProject(paramId(req.params));
      res.json({ message: "Project deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  return httpServer;
}
