import { describe, it, expect } from "vitest";
import { getMockResponse } from "./mockResponses";

describe("getMockResponse", () => {
  it("returns UI/login response for 'ui' keyword", () => {
    const response = getMockResponse("Can you implement the ui component?");
    expect(response).toContain("LoginPage");
  });

  it("returns API integration response for 'api' keyword", () => {
    const response = getMockResponse("Set up the API integration");
    expect(response).toContain("Azure AD Integration");
  });

  it("returns test suite response for 'test' keyword", () => {
    const response = getMockResponse("Write some tests for this");
    expect(response).toContain("Test Suite");
  });

  it("returns security audit response for 'security' keyword", () => {
    const response = getMockResponse("Run a security scan");
    expect(response).toContain("Security & PDPA Audit");
  });

  it("returns architecture response for 'explain' keyword", () => {
    const response = getMockResponse("Can you explain the architecture?");
    expect(response).toContain("Architecture Overview");
  });

  it("returns fallback response for no matching keywords", () => {
    const response = getMockResponse("random unrelated input 12345");
    expect(response).toContain("FEAT-1");
    expect(response).toContain("US-101");
  });

  it("matches keywords case-insensitively", () => {
    const response = getMockResponse("SECURITY audit please");
    expect(response).toContain("Security & PDPA Audit");
  });

  it("returns first matching keyword's response when multiple match", () => {
    // "ui" appears before "test" in the responses array
    const response = getMockResponse("test the ui component");
    // "ui" is in keywords of the first response, so it should match first
    expect(response).toContain("LoginPage");
  });
});
