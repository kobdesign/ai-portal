import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema } from "@shared/schema";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import Anthropic from "@anthropic-ai/sdk";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  await setupAuth(app);
  registerAuthRoutes(app);

  app.get("/api/projects", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userProjects = await storage.getProjectsByUserId(userId);
      res.json(userProjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const project = await storage.getProject(parseInt(req.params.id));
      if (!project || project.userId !== userId) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", isAuthenticated, async (req: any, res) => {
    try {
      const parsed = insertProjectSchema.safeParse(req.body);
      if (!parsed.success) {
        return res
          .status(400)
          .json({ message: "Invalid project data", errors: parsed.error.issues });
      }
      const userId = req.user.claims.sub;
      const project = await storage.createProject(parsed.data, userId);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.patch("/api/projects/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const project = await storage.getProject(parseInt(req.params.id));
      if (!project || project.userId !== userId) {
        return res.status(404).json({ message: "Project not found" });
      }
      const updated = await storage.updateProject(parseInt(req.params.id), req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const project = await storage.getProject(parseInt(req.params.id));
      if (!project || project.userId !== userId) {
        return res.status(404).json({ message: "Project not found" });
      }
      await storage.deleteProject(parseInt(req.params.id));
      res.json({ message: "Project deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Chat API endpoint — streams Claude responses via SSE
  app.post("/api/chat", isAuthenticated, async (req: any, res) => {
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(503).json({ message: "AI service not configured" });
    }

    const { messages, context } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "messages array is required" });
    }

    // Build context-aware system prompt
    let systemPrompt =
      "You are an Enterprise AI Development Assistant for an AI-powered software development platform. " +
      "You help developers write code, analyze requirements, and guide them through the software development lifecycle. " +
      "Respond in the same language the user writes in (Thai or English).";

    if (context) {
      const parts: string[] = [];
      if (context.projectName) parts.push(`Current project: ${context.projectName}`);
      if (context.activeSpec) parts.push(`Active spec reference: ${context.activeSpec}`);
      if (context.lifecyclePhase) parts.push(`Current lifecycle phase: ${context.lifecyclePhase}`);
      if (context.featureName) parts.push(`Working on feature: ${context.featureName}`);
      if (parts.length > 0) {
        systemPrompt += "\n\nCurrent context:\n" + parts.join("\n");
      }
    }

    // Set SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    try {
      const client = new Anthropic();
      const apiMessages: Anthropic.MessageParam[] = messages.map(
        (msg: { role: string; content: string }) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        }),
      );

      const stream = client.messages.stream({
        model: "claude-sonnet-4-5",
        max_tokens: 4096,
        system: systemPrompt,
        messages: apiMessages,
      });

      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          res.write(`data: ${JSON.stringify({ content: event.delta.text })}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
      res.end();
    }
  });

  return httpServer;
}
