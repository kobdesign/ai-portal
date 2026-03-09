// @vitest-environment node
import { describe, it, expect } from "vitest";
import { insertProjectSchema } from "./schema";

describe("insertProjectSchema", () => {
  it("parses valid input with name and description", () => {
    const result = insertProjectSchema.safeParse({
      name: "My Project",
      description: "A test project",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("My Project");
      expect(result.data.description).toBe("A test project");
    }
  });

  it("accepts optional type and status fields", () => {
    const result = insertProjectSchema.safeParse({
      name: "My Project",
      description: "A test project",
      type: "Mobile App",
      status: "In Progress",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.type).toBe("Mobile App");
      expect(result.data.status).toBe("In Progress");
    }
  });

  it("fails when required fields are missing", () => {
    const result = insertProjectSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("fails when name is missing", () => {
    const result = insertProjectSchema.safeParse({
      description: "A test project",
    });
    expect(result.success).toBe(false);
  });

  it("fails when description is missing", () => {
    const result = insertProjectSchema.safeParse({
      name: "My Project",
    });
    expect(result.success).toBe(false);
  });

  it("strips extra fields like userId and id (security: prevents injection)", () => {
    const result = insertProjectSchema.safeParse({
      name: "My Project",
      description: "A test project",
      userId: "hacked-user-id",
      id: 999,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty("userId");
      expect(result.data).not.toHaveProperty("id");
    }
  });
});
