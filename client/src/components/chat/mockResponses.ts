interface MockResponse {
  keywords: string[];
  content: string;
}

const responses: MockResponse[] = [
  {
    keywords: ["ui", "login", "หน้า", "us-101", "implement"],
    content: `ได้เลยครับ! ผมสร้าง Login Component ตาม **US-101** ให้แล้ว โดยอิงจาก Design System ขององค์กร:

\`\`\`tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAzureLogin = async () => {
    setIsLoading(true);
    window.location.href = "/api/auth/azure/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px]">
        <CardHeader>
          <h1 className="text-2xl font-bold">Enterprise Login</h1>
          <p className="text-muted-foreground">Sign in with your corporate account</p>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleAzureLogin}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Redirecting..." : "Sign in with Azure AD"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
\`\`\`

**สิ่งที่ทำ:**
- ใช้ shadcn/ui Card component ตาม Design System
- รองรับ Loading state ระหว่าง redirect
- เชื่อมกับ \`/api/auth/azure/login\` endpoint

ต้องการให้เพิ่ม SSO options อื่นๆ (Google, GitHub) ไหมครับ?`
  },
  {
    keywords: ["api", "logic", "azure", "integration", "เชื่อม", "backend"],
    content: `เรียบร้อยครับ! ผมเขียน **Azure AD Integration** ให้แล้ว โดยใช้ \`openid-client\` ที่มีอยู่ในโปรเจกต์:

\`\`\`typescript
import { Issuer, Client } from "openid-client";

const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID;
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID;
const AZURE_CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET;

let azureClient: Client;

export async function getAzureClient(): Promise<Client> {
  if (azureClient) return azureClient;

  const issuer = await Issuer.discover(
    \`https://login.microsoftonline.com/\${AZURE_TENANT_ID}/v2.0\`
  );

  azureClient = new issuer.Client({
    client_id: AZURE_CLIENT_ID!,
    client_secret: AZURE_CLIENT_SECRET!,
    redirect_uris: ["/api/auth/azure/callback"],
    response_types: ["code"],
  });

  return azureClient;
}

export async function handleCallback(code: string) {
  const client = await getAzureClient();
  const tokenSet = await client.callback(
    "/api/auth/azure/callback",
    { code }
  );

  const userInfo = await client.userinfo(tokenSet);
  return {
    email: userInfo.email,
    name: userInfo.name,
    department: userInfo["department"],
  };
}
\`\`\`

**Security ตาม PDPA Policy:**
- ไม่เก็บ \`access_token\` ใน client-side
- ใช้ \`httpOnly\` cookie สำหรับ session
- Mask ข้อมูล sensitive fields ก่อน log

ต้องการให้เพิ่ม Role-Based Access Control ต่อไหมครับ?`
  },
  {
    keywords: ["test", "ทดสอบ", "รัน", "testing"],
    content: `ผมเขียน **Test Suite** สำหรับระบบ Authentication ให้แล้วครับ:

\`\`\`typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
  it("should render login button", () => {
    render(<LoginPage />);
    expect(screen.getByText("Sign in with Azure AD")).toBeInTheDocument();
  });

  it("should show loading state on click", async () => {
    render(<LoginPage />);
    const button = screen.getByText("Sign in with Azure AD");
    fireEvent.click(button);
    expect(screen.getByText("Redirecting...")).toBeInTheDocument();
  });

  it("should redirect to Azure AD endpoint", () => {
    const mockLocation = { href: "" };
    Object.defineProperty(window, "location", { value: mockLocation });
    render(<LoginPage />);
    fireEvent.click(screen.getByText("Sign in with Azure AD"));
    expect(mockLocation.href).toBe("/api/auth/azure/login");
  });
});
\`\`\`

**ผลการทดสอบ:**
- 3/3 tests passed
- Coverage: 92% statements, 88% branches
- ไม่พบ Security vulnerabilities

ต้องการให้เพิ่ม E2E test ด้วย Cypress ไหมครับ?`
  },
  {
    keywords: ["security", "audit", "pdpa", "scan", "ตรวจ"],
    content: `ผมสแกน **Security & PDPA Audit** ให้เรียบร้อยแล้วครับ:

**สรุปผล:**

1. **PDPA Compliance** - PASSED
   - ไม่พบการเก็บข้อมูลบัตรประชาชนใน plaintext
   - Session data ถูก encrypt ด้วย AES-256
   - มี consent form ก่อนเก็บ personal data

2. **OWASP Top 10** - 1 Warning
   - ✅ SQL Injection — Protected (ใช้ Drizzle ORM parameterized queries)
   - ✅ XSS — Protected (React auto-escaping)
   - ⚠️ CSRF — \`Missing CSRF token on /api/projects POST\`
   - ✅ Auth — Session-based with httpOnly cookies

3. **Dependency Audit**
   - 0 Critical vulnerabilities
   - 2 Moderate (non-exploitable in current config)

**แนะนำ:** เพิ่ม CSRF middleware ใน Express routes ครับ ต้องการให้ fix เลยไหม?`
  },
  {
    keywords: ["explain", "อธิบาย", "architecture", "โครงสร้าง", "design"],
    content: `นี่คือ **Architecture Overview** ของ FEAT-1: Corporate SSO ครับ:

**Flow การทำงาน:**

1. User กด "Sign in with Azure AD" → redirect ไป Microsoft
2. Microsoft ส่ง \`authorization_code\` กลับมาที่ callback
3. Server แลก code เป็น \`access_token\` + \`id_token\`
4. ดึง user profile จาก Microsoft Graph API
5. สร้าง session + เก็บใน PostgreSQL ผ่าน \`connect-pg-simple\`

**Tech Stack ที่ใช้:**
- \`openid-client\` — จัดการ OAuth2/OIDC flow
- \`express-session\` — session management
- \`passport\` — authentication middleware
- \`drizzle-orm\` — database queries

**Files ที่เกี่ยวข้อง:**
- \`server/replit_integrations/auth/routes.ts\` — Auth endpoints
- \`server/storage.ts\` — User/session storage layer
- \`shared/schema.ts\` — Database schema

ต้องการ deep dive ส่วนไหนเพิ่มครับ?`
  },
];

const fallbackResponse = `ผมได้รับคำสั่งแล้วครับ กำลังวิเคราะห์ context จาก **FEAT-1: Corporate SSO** และ **US-101**

ผมจะดำเนินการดังนี้:
1. ตรวจสอบ Spec requirement ที่เกี่ยวข้อง
2. อ่าน Knowledge Base ขององค์กร
3. สร้างโค้ดตาม Design System ที่กำหนด

กรุณารอสักครู่ หรือแจ้งรายละเอียดเพิ่มเติมได้ครับ`;

export function getMockResponse(userInput: string): string {
  const lower = userInput.toLowerCase();

  for (const resp of responses) {
    if (resp.keywords.some(kw => lower.includes(kw))) {
      return resp.content;
    }
  }

  return fallbackResponse;
}
