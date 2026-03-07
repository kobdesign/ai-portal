## Context

AI Portal มี ChatPanel UI ที่ทำงานด้วย mock data (setTimeout 4s → hardcoded Thai response) ต้องเชื่อมกับ Claude API จริงเพื่อให้เป็น AI IDE ที่ใช้งานได้

**Current Architecture:**

- `ChatPanel.tsx` — self-contained component, ไม่มี API calls, mock ทุกอย่าง
- `server/routes.ts` — มีแค่ Project CRUD, ไม่มี chat endpoint
- `Home.tsx` — render panels อิสระ, ไม่มี shared context ระหว่าง panels
- Auth: Replit OAuth ผ่าน `isAuthenticated` middleware (ใช้ซ้ำได้)

## Goals / Non-Goals

**Goals:**

- ผู้ใช้ chat กับ Claude ได้จริงผ่าน ChatPanel
- Response แสดงแบบ streaming (real-time, ไม่ต้องรอ response ทั้งหมด)
- ChatPanel รับ context จาก panels อื่น (active spec, lifecycle phase)
- รองรับ conversation history (multi-turn)

**Non-Goals:**

- ยังไม่ทำ code generation/execution (Sprint ถัดไป)
- ยังไม่เก็บ chat history ลง database (ใช้ in-memory state ก่อน)
- ยังไม่ทำ multi-model switching จริง (เริ่มที่ Claude ก่อน)
- ยังไม่ทำ RAG/Knowledge Base integration

## Decisions

### 1. Streaming: Server-Sent Events (SSE) vs WebSocket

**เลือก: SSE** — เพราะ chat เป็น request-response pattern (client ถาม → server ตอบ), SSE เหมาะกว่า WebSocket ที่เป็น bidirectional. ง่ายกว่า, ไม่ต้อง connection management, ใช้ `res.write()` ได้เลยจาก Express.

**Alternative considered:** WebSocket — มี `ws` package อยู่แล้วใน dependencies แต่ overkill สำหรับ chat pattern. ถ้าต้องการ real-time collaboration ค่อยเพิ่มทีหลัง.

### 2. SDK: Anthropic SDK (@anthropic-ai/sdk)

**เลือก: Anthropic official SDK** — type-safe, รองรับ streaming natively ผ่าน `stream()` method, maintained โดย Anthropic โดยตรง.

### 3. Context Passing: React Context API

**เลือก: React Context** — สร้าง `ChatContext` ใน Home.tsx เพื่อ share state ระหว่าง ChatPanel, SpecPanel, LifecyclePanel. ใช้ React Context เพราะ panels อยู่ใน component tree เดียวกันอยู่แล้ว ไม่ต้องเพิ่ม state management library.

**Alternative considered:** Zustand/Jotai — overkill สำหรับ shared state แค่ 3-4 fields. ถ้า state ซับซ้อนขึ้นค่อย migrate.

### 4. System Prompt: Context-Aware

ส่ง system prompt ที่ประกอบด้วย:

- Role: "Enterprise AI Development Assistant"
- Current project info (name, type)
- Active spec reference (ถ้ามี)
- Current lifecycle phase (ถ้ามี)
- Instructions: ตอบเป็นภาษาไทยเมื่อ user พิมพ์ไทย

## Risks / Trade-offs

- **[API Key exposure]** → Mitigation: เก็บเป็น env var server-side, ไม่ส่งไป client. ใช้ `process.env.ANTHROPIC_API_KEY`
- **[Rate limiting]** → Mitigation: ยังไม่ทำ rate limiting ฝั่ง app (ใช้ Anthropic rate limits เป็น default). ถ้า production ต้องเพิ่ม per-user throttling
- **[Cost control]** → Mitigation: ใช้ Claude Sonnet (ถูกกว่า Opus), set max_tokens = 4096 เป็น default
- **[No persistence]** → Mitigation: Chat history อยู่ใน React state เท่านั้น — refresh แล้วหาย. ยอมรับได้สำหรับ Sprint 1, เพิ่ม DB storage ใน Sprint ถัดไป
