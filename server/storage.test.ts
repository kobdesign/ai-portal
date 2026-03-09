// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockSelect = vi.fn();
const mockFrom = vi.fn();
const mockWhere = vi.fn();
const mockInsert = vi.fn();
const mockValues = vi.fn();
const mockReturning = vi.fn();
const mockUpdate = vi.fn();
const mockSet = vi.fn();
const mockDelete = vi.fn();

vi.mock("./db", () => ({
  db: {
    select: () => ({ from: mockFrom }),
    insert: () => ({ values: mockValues }),
    update: () => ({ set: mockSet }),
    delete: () => ({ where: mockWhere }),
  },
}));

mockFrom.mockReturnValue({ where: mockWhere });
mockValues.mockReturnValue({ returning: mockReturning });
mockSet.mockReturnValue({ where: vi.fn().mockReturnValue({ returning: mockReturning }) });
mockWhere.mockReturnValue({ returning: mockReturning });

import { DatabaseStorage } from "./storage";

describe("DatabaseStorage", () => {
  let storage: DatabaseStorage;

  beforeEach(() => {
    vi.clearAllMocks();
    storage = new DatabaseStorage();

    // Reset chain mocks
    mockFrom.mockReturnValue({ where: mockWhere });
    mockValues.mockReturnValue({ returning: mockReturning });
    mockSet.mockReturnValue({ where: vi.fn().mockReturnValue({ returning: mockReturning }) });
    mockWhere.mockReturnValue({ returning: mockReturning });
  });

  describe("getProjectsByUserId", () => {
    it("returns projects filtered by userId", async () => {
      const mockProjects = [
        { id: 1, name: "Project 1", userId: "user-1" },
        { id: 2, name: "Project 2", userId: "user-1" },
      ];
      mockWhere.mockResolvedValue(mockProjects);

      const result = await storage.getProjectsByUserId("user-1");

      expect(result).toEqual(mockProjects);
      expect(mockFrom).toHaveBeenCalled();
      expect(mockWhere).toHaveBeenCalled();
    });
  });

  describe("getProject", () => {
    it("returns a project when found", async () => {
      const mockProject = { id: 1, name: "Project 1" };
      mockWhere.mockResolvedValue([mockProject]);

      const result = await storage.getProject(1);

      expect(result).toEqual(mockProject);
    });

    it("returns undefined when not found", async () => {
      mockWhere.mockResolvedValue([]);

      const result = await storage.getProject(999);

      expect(result).toBeUndefined();
    });
  });

  describe("createProject", () => {
    it("creates a project with merged userId", async () => {
      const projectData = { name: "New Project", description: "Desc" };
      const createdProject = { id: 1, ...projectData, userId: "user-1" };
      mockReturning.mockResolvedValue([createdProject]);

      const result = await storage.createProject(projectData as any, "user-1");

      expect(result).toEqual(createdProject);
      expect(mockValues).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "New Project",
          description: "Desc",
          userId: "user-1",
        }),
      );
    });
  });

  describe("updateProject", () => {
    it("updates project and sets updatedAt", async () => {
      const updatedProject = { id: 1, name: "Updated" };
      mockReturning.mockResolvedValue([updatedProject]);

      const result = await storage.updateProject(1, { name: "Updated" } as any);

      expect(result).toEqual(updatedProject);
      expect(mockSet).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Updated",
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  describe("deleteProject", () => {
    it("returns true when a project is deleted", async () => {
      mockReturning.mockResolvedValue([{ id: 1 }]);

      const result = await storage.deleteProject(1);

      expect(result).toBe(true);
    });

    it("returns false when no project matched", async () => {
      mockReturning.mockResolvedValue([]);

      const result = await storage.deleteProject(999);

      expect(result).toBe(false);
    });
  });
});
