## Why

ChatPanel ปัจจุบันใช้ mock data ทั้งหมด — มี setTimeout 4 วินาทีแล้วแสดงข้อความ hardcoded ภาษาไทย ยังไม่มี AI จริงเลย ผู้ใช้ไม่สามารถ chat กับ AI เพื่อสร้างโค้ดหรือขอคำแนะนำได้ นี่คือ core feature ที่ทำให้แพลตฟอร์มมีคุณค่า — ต้องทำก่อนทุกอย่าง

## What Changes

- เพิ่ม backend endpoint `POST /api/chat` ที่เรียก Anthropic SDK (Claude) พร้อม streaming response
- แก้ `ChatPanel.tsx` ให้ส่ง message ไป backend จริงแทน setTimeout mock
- สร้าง React Context (`ChatContext`) เพื่อส่ง context ระหว่าง panels (active spec, lifecycle phase, project info)
- รองรับ streaming response แสดงผลแบบ real-time (Server-Sent Events)
- เก็บ `ANTHROPIC_API_KEY` เป็น environment variable
- เพิ่ม `@anthropic-ai/sdk` dependency

## Capabilities

### New Capabilities

- `ai-chat-backend`: Backend API endpoint สำหรับ chat กับ Claude API พร้อม streaming, context injection, และ conversation history
- `ai-chat-frontend`: Frontend integration ที่เชื่อม ChatPanel กับ backend จริง รองรับ streaming display และ cross-panel context

### Modified Capabilities

<!-- No existing specs to modify -->

## Impact

- **Server**: เพิ่ม route `/api/chat` ใน `server/routes.ts`, เพิ่ม Anthropic SDK integration
- **Client**: แก้ `client/src/components/ChatPanel.tsx` (ตัด mock, เพิ่ม fetch + SSE), แก้ `client/src/pages/Home.tsx` (เพิ่ม ChatContext Provider)
- **Dependencies**: เพิ่ม `@anthropic-ai/sdk` ใน package.json
- **Environment**: ต้องมี `ANTHROPIC_API_KEY` environment variable
- **API**: เพิ่ม POST `/api/chat` (authenticated, streaming SSE response)
