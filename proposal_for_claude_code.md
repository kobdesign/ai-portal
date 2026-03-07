# Project Proposal & Implementation Spec: Enterprise AI-Powered Development Platform

**Document Version:** 1.0
**Target Audience:** Development Team (Implementation via Claude Code)
**Project Goal:** สร้างแพลตฟอร์ม AI-Assisted IDE ที่ออกแบบมาสำหรับองค์กรขนาดใหญ่ (Enterprise) ในประเทศไทยโดยเฉพาะ เพื่อพลิกโฉมการพัฒนาซอฟต์แวร์จากระบบเดิมๆ ให้มีความเร็วแบบ AI-Driven แต่ยังคงความปลอดภัยแบบ Enterprise-Grade

---

## 1. Executive Summary & Value Proposition

ระบบนี้คือ "AI Software Engineer แพลตฟอร์มสำหรับ Enterprise" ที่ไม่ใช่แค่แชทบอทเขียนโค้ด แต่เป็นสภาพแวดล้อมการทำงานแบบครบวงจร (Integrated Workspace) ที่ผสานเอา AI เข้ากับกระบวนการ Project Management, ความปลอดภัยข้อมูล (PDPA) และ Legacy System ขององค์กรขนาดใหญ่

**จุดเด่นที่แตกต่างจากเครื่องมือทั่วไป:**

- **Context-Aware AI:** AI ไม่ได้เขียนโค้ดลอยๆ แต่ดึงบริบทจาก Enterprise Knowledge, Legacy Code และ Database Schema ขององค์กรมาประกอบ
- **Spec-Driven & Lifecycle Management:** บังคับให้การทำงานผ่านกระบวนการมีแบบแผน (Epic -> User Story -> Implement -> Audit) ไม่เกิดปัญหาโค้ดสปาเก็ตตี้
- **Governance First:** มีระบบสแกนข้อมูลส่วนบุคคล (PDPA) และ Maker-Checker Workflow ก่อนขึ้นระบบจริง
- **Thai-Optimized:** รองรับการสั่งงานด้วยภาษาไทยได้ดีเยี่ยม (ผ่าน Claude 3.5 Thai / Typhoon 1.5)

---

## 2. System Architecture & UI Layout

**Tech Stack (Frontend):** React, Tailwind CSS, Lucide Icons, Vite, Wouter (Routing), Shadcn/UI (Components)
**Theme:** Dark Theme Professional (`#111113` background, `#18181b` surface) เน้นความน่าเชื่อถือ

**หน้าจอหลักเป็นแบบ Split-Pane (คล้าย VS Code + Lovable):**

1. **Activity Bar (Left):** แถบเมนูไอคอนด้านซ้ายสุดสำหรับสลับหน้าจอ (Agent, Lifecycle, Specs, Knowledge, Integrations, Governance)
2. **Left Panel (Workspace):** พื้นที่ทำงานหลักที่เปลี่ยนไปตามเมนูที่เลือกใน Activity Bar
3. **Right Panel (Preview/Editor):** แผงด้านขวาสำหรับแสดงผลลัพธ์ (Live Browser Preview, Code Editor, Terminal)
4. **Top Bar:** มีปุ่ม One-Click Deploy (Docker, K8s, On-Prem) พร้อมแสดงสถานะการทำงาน

---

## 3. Core Modules & Features (สำหรับการ Implement)

### Module 1: AI Agent Panel (`ChatPanel.tsx`)

- **หน้าที่:** หน้าต่างแชทสำหรับสั่งงาน AI
- **Features:**
  - **Model Selector:** Dropdown เลือก AI Model (Claude 3.5 Thai, Typhoon SCB 10X, GPT-4o Enterprise)
  - **Active Context Dashboard:** แสดงแถบสถานะด้านบนว่าตอนนี้ AI กำลังโฟกัสทำฟีเจอร์อะไรอยู่ (เชื่อมโยงกับ Lifecycle และ Spec)
  - **Context-Aware Quick Actions:** ปุ่มลัดที่เปลี่ยนไปตามสถานะงาน (เช่น ถ้าอยู่ขั้น Implement จะมีปุ่ม "เริ่มเขียนโค้ด", ถ้าอยู่ขั้น Test จะมีปุ่ม "รัน Automate Test")
  - **Generation State:** มี UI แสดงสถานะ `isGenerating` พร้อมปุ่ม Stop

### Module 2: Project Management & Lifecycle

ต้องทำสองหน้าจอที่ทำงานประสานกันอย่างแนบเนียน:

- **Spec Panel (`SpecPanel.tsx`):**
  - จัดการ Requirement แบบ Agile (Epics & User Stories)
  - ต้องมี Tag บอกได้ว่าแต่ละ User Story กำลังถูกเอาไปพัฒนาอยู่ใน Phase ไหนของ Lifecycle
- **Lifecycle Panel (`LifecyclePanel.tsx`):**
  - แสดงวงจรชีวิตของการพัฒนาฟีเจอร์ (Explore ➔ Proposal ➔ Plan ➔ Design ➔ Implement ➔ Test ➔ Complete)
  - มี Stepper UI แสดงสถานะปัจจุบัน
  - มีระบบ Archive (เก็บงานเก่า) และ Iterate Next (ต่อยอดฟีเจอร์ใหม่)

### Module 3: Enterprise Integrations (`IntegrationsPanel.tsx`)

- **หน้าที่:** ศูนย์กลางเชื่อมต่อระบบเก่าของบริษัท
- **Features:**
  - เชื่อมต่อ Database ยอดฮิตใน Enterprise: Oracle DB, Microsoft SQL Server, PostgreSQL
  - เชื่อมต่อระบบ ERP / Core Systems: SAP (RFC/OData), AS/400 (SOAP/DB2)
  - ระบบยืนยันตัวตน (Identity): Microsoft Entra ID (Azure AD), Active Directory, OAuth 2.0
  - มีระบบตั้งค่า Connection String แบบ Masking (ซ่อนรหัสผ่าน)

### Module 4: Legacy System & Codebase Sync (`LegacySyncPanel.tsx`)

- **หน้าที่:** นำโค้ดเก่าเข้ามาเป็นบริบท (Context) ให้ AI เรียนรู้
- **Features:**
  - ช่องใส่ URL ของ Internal GitLab / Bitbucket พร้อม Access Token
  - รองรับการอัปโหลดไฟล์ Source Code แบบ `.zip`, `.tar.gz`
  - มีหน้าจอแสดงโครงสร้างไฟล์ (File Tree) และบอกสถานะว่า AI สร้าง Index สำเร็จกี่เปอร์เซ็นต์แล้ว

### Module 5: Security, PDPA & Governance (`GovernancePanel.tsx`, `SecurityPanel.tsx`)

- **หน้าที่:** ควบคุมความปลอดภัยและการอนุมัติ
- **Features:**
  - **Real-time PDPA Scanner:** มี Dashboard แสดงว่าโค้ดที่ AI เพิ่งเขียนขึ้นมา มีการละเมิดข้อมูล PII (Personal Identifiable Information) เช่น บัตรประชาชน, เบอร์โทร หรือไม่
  - **Data Masking Rules:** ตั้งค่าให้ระบบบังคับทำ Masking ข้อมูลสำคัญอัตโนมัติ
  - **Maker-Checker Workflow:** โค้ดที่สร้างเสร็จจะต้องมีปุ่ม "Submit for Approval" ให้บุคคลที่มีสิทธิ์ (Checker) กดอนุมัติก่อนถึงจะ Deploy ได้
  - **Audit Logs:** บันทึกทุก Action ว่าใครสั่ง AI ให้แก้โค้ดไฟล์ไหน เมื่อไหร่ (Immutable Log)

### Module 6: Enterprise Knowledge Base (`KnowledgePanel.tsx`)

- **หน้าที่:** ระบบ RAG (Retrieval-Augmented Generation) ภายในองค์กร
- **Features:**
  - ให้อัปโหลดไฟล์ PDF, Word, หรือวางลิงก์ Confluence ภายในบริษัท (เช่น Design System ของธนาคาร, กฎหมายบริษัท)
  - AI จะใช้ข้อมูลนี้เป็น "คู่มือ" ในการคิดและเขียนโค้ด เพื่อไม่ให้หลุดกรอบองค์กร

---

## 4. Advanced Workflows & Business Use Cases

### 4.1 Client / Partner Onboarding (Multi-Tenancy)

- ระบบรองรับการเปิดให้ Vendor หรือ Partner ภายนอกเข้ามารับงานได้
- **Workspace Isolation:** ข้อมูลโค้ด, Database, และ Knowledge แยกขาดจากกันราย Tenant
- **Role-based Access:** Vendor มีสิทธิ์ใช้ AI เขียนโค้ดได้ (Maker) แต่ไม่มีสิทธิ์กดปุ่ม Deploy ขึ้นเซิร์ฟเวอร์หลัก (Checker)
- **BYOK (Bring Your Own Key):** Partner สามารถนำ API Key ของ LLM ตัวเองมาใส่ได้ เพื่อแยกบิลค่าใช้จ่าย

### 4.2 API Provisioning for Partners

- แพลตฟอร์มรองรับ **API Design First** (เขียน Spec -> ให้ AI ดราฟต์ OpenAPI/Swagger)
- ให้ AI เขียน Logic ดึงข้อมูลจากฐานข้อมูลเก่าอย่างปลอดภัย (ผ่าน Security Rules ที่ตั้งไว้)
- สร้างระบบ **API Gateway Control** (จำลอง): แจก API Key, ตั้ง Rate Limit, และออกเอกสาร API Doc (Developer Portal) ให้อัตโนมัติ

### 4.3 Multi-Platform & Mobile App Development (Flutter Native)

- แพลตฟอร์มนี้ไม่ได้จำกัดแค่การสร้าง Web Application แต่รองรับการพัฒนา Mobile App ด้วย **Flutter**
- **Mobile Emulator Preview:** ในหน้าจอ PreviewPanel (ฝั่งขวา) จะมีโหมด "Device Preview" จำลองหน้าจอ iOS และ Android เพื่อดูผลลัพธ์ของ Flutter Code (Dart) แบบ Live Reload (อิงจาก Flutter Web / Zapp.run)
- **Native Integration Specs:**
  - AI จะถูกเทรนให้เขียนโค้ดเชื่อมต่อ Native Device Features เช่น กล้อง, GPS, Push Notifications (Firebase), หรือ Biometric Login ให้สอดคล้องกับมาตรฐาน Enterprise Security
- **Cross-Platform Deployment:** ปุ่ม One-Click Deploy จะรองรับการสั่งรัน CI/CD Pipeline ไปยัง App Store Connect และ Google Play Console (หรือกระจายแอปใน Internal MDM ขององค์กร)

---

## 5. Development Guidelines (สำหรับผู้ใช้ Claude Code)

1. **Frontend-Only Approach (Mockup Phase):**
   - โปรเจกต์นี้เริ่มต้นด้วยการเป็น Frontend-Only Prototype เพื่อ Validate ไอเดีย
   - การทำงานกับข้อมูลทั้งหมด ให้ใช้ State ของ React (เช่น `useState`, `useReducer`) เก็บข้อมูลจำลอง (Mock Data) ไว้ในหน่วยความจำชั่วคราว
   - ยังไม่มีการต่อ API จริงไปหา Backend

2. **Component Architecture:**
   - ใช้ `lucide-react` สำหรับไอคอนทั้งหมด (ระวังเรื่องการ Import icon ที่ไม่ได้ใช้ จะทำให้แอพพัง)
   - ใช้ `Shadcn/UI` ควบคู่กับ Tailwind CSS เพื่อสร้าง Component ที่ดูมีความเป็น Professional (เน้นปุ่มสี Indigo, Purple, Sky)
   - หน้าจอแยกเป็นโมดูลชัดเจน (Panel Components) เช่น `ChatPanel.tsx`, `SpecPanel.tsx` เพื่อให้ดูแลรักษาง่าย

3. **Routing:**
   - ใช้ `wouter` สำหรับ Routing ในฝั่ง Frontend (อยู่ในไฟล์ `App.tsx` หรือ `Home.tsx`)

4. **Iterative Implementation:**
   - แนะนำให้ทีมทำความเข้าใจ Flow: **Spec ➔ Lifecycle ➔ Chat** ให้ลึกซึ้ง เพราะเป็นหัวใจหลักของแพลตฟอร์มนี้
   - เริ่มสร้าง UI ที่แสดงการเชื่อมโยงข้อมูลข้าม Panel ก่อน เช่น เปลี่ยนสถานะใน Spec แล้วหน้า Lifecycle/Chat อัปเดตตามทันที

---

_เอกสารฉบับนี้เตรียมไว้สำหรับทีมพัฒนาเพื่อนำไปใช้ควบคู่กับ Claude Code CLI ในการเดินหน้าต่อยอดโปรเจกต์นี้ได้อย่างไร้รอยต่อ_
