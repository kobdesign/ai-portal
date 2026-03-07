# User Journey & Workflow หลักของแพลตฟอร์ม (Enterprise AI IDE)

แพลตฟอร์มนี้ออกแบบมาเพื่อเปลี่ยนวิธีที่องค์กรขนาดใหญ่ (Enterprise) พัฒนาซอฟต์แวร์ โดยรวมเอา AI เข้ามาช่วยในทุกขั้นตอน ตั้งแต่คิด Requirement ไปจนถึง Deploy เพื่อให้เข้าใจง่ายขึ้น เรามาดู **User Journey ตั้งแต่วันแรกที่เริ่มโปรเจกต์ (Day 0) ไปจนถึงการลงมือทำจริง (Day 1+)** กันครับ

---

## 🎯 Day 0: การตั้งไข่โปรเจกต์ (Project Setup & Context Building)
*เป้าหมาย: ให้ AI รู้จัก "บริบทขององค์กร" ก่อนเริ่มเขียนโค้ด*

เมื่อผู้ใช้ (เช่น Product Owner, Tech Lead, หรือ Developer) เข้ามาสร้างโปรเจกต์ใหม่ สิ่งแรกที่ต้องทำคือการ "ให้ข้อมูล" กับแพลตฟอร์ม

1. **เชื่อมต่อระบบที่มีอยู่ (Integrations & Legacy Sync)**
   - ไปที่เมนู `Integrations` 
   - ตั้งค่าการเชื่อมต่อฐานข้อมูล (Oracle, SAP), ระบบ Login (Azure AD), หรือ API เก่า (AS/400)
   - ไปที่ `Legacy & GitLab Sync` เพื่อให้ AI ไปอ่าน Source Code เก่าขององค์กร (ดึงโครงสร้าง, ดู Pattern การเขียนโค้ดเดิม)

2. **ใส่คู่มือองค์กร (Enterprise Knowledge)**
   - ไปที่เมนู `Knowledge Base` 
   - อัปโหลดเอกสาร Design System, Coding Standard, หรือคู่มือ Business Logic ของบริษัท
   - *ผลลัพธ์: AI จะไม่มั่วโค้ดเอง แต่จะเขียนโค้ดอิงตามมาตรฐานขององค์กร*

3. **ตั้งค่าความปลอดภัย (Governance & Security)**
   - ไปที่เมนู `Security & PDPA` เพื่อตั้งกฎว่า ข้อมูลไหนห้ามหลุด, ข้อมูลไหนต้อง Mask (เช่น บัตรประชาชน)
   - กำหนดสิทธิ์ `Maker/Checker` ในเมนู `Governance` (ใครเขียนโค้ด ใครอนุมัติก่อน Deploy)

---

## 🚀 Day 1: เริ่มต้นพัฒนาฟีเจอร์ (Spec-Driven & Lifecycle Loop)
*เป้าหมาย: เปลี่ยน Requirement เป็นโค้ดอย่างเป็นระบบ ไม่สะเปะสะปะ*

เมื่อพร้อมแล้ว การพัฒนาจะขับเคลื่อนผ่าน 3 เมนูหลักที่ทำงานสอดประสานกัน: **Specs ↔ Lifecycle ↔ Agent (Chat)**

### Step 1: สร้าง Requirement (ที่เมนู Specs)
- Product Owner (PO) หรือ Business Analyst (BA) เข้าไปที่หน้า **Project Specs**
- สร้าง **Epic** (ชิ้นงานใหญ่) และ **User Story** (Requirement ย่อย)
- *เช่น EPIC-01: ระบบ Authentication -> US-101: Login ด้วย Azure AD*
- แพลตฟอร์มนี้ใช้แนวคิด **Spec-Driven Development** (AI จะอ่าน Spec ก่อนเขียนโค้ดเสมอ)

### Step 2: นำเข้าสู่วงจรการพัฒนา (ที่เมนู Lifecycle)
- เมื่อมี Spec แล้ว จะถูกแปลงเป็น **Feature** ในหน้า **Project Lifecycle**
- Lifecycle จะแบ่งเป็น Phase ชัดเจน: 
  `Explore -> Proposal -> Plan -> Design -> Implement -> Test -> Complete`
- *ตัวอย่าง: ฟีเจอร์ "ระบบ Login" ตอนนี้อยู่สถานะ "Implement" (กำลังเขียนโค้ด)*

### Step 3: สั่ง AI ให้ทำงาน (ที่เมนู Agent/Chat)
- Developer เปิดหน้า **Agent (Chat)** ขึ้นมา
- หน้าต่างแชทจะแสดง **"Active Context"** ให้เห็นเลยว่า ตอนนี้ AI กำลังโฟกัสที่ *ฟีเจอร์ระบบ Login (Lifecycle)* โดยอิงตาม *US-101 (Spec)*
- ผู้ใช้แค่กดปุ่ม Quick Action (เช่น "Implement US-101") หรือพิมพ์สั่ง AI ในแชท
- AI จะเริ่ม Generate โค้ดที่หน้าต่าง **Preview (Code Editor)** ด้านขวา
- เมื่อโค้ดรันได้ ผู้ใช้ตรวจสอบผลลัพธ์ในแท็บ Preview (Browser)

---

## 🔄 Day 2+: การปรับปรุงและการนำขึ้นระบบ (Iterate & Deploy)
*เป้าหมาย: ตรวจสอบความถูกต้องและขึ้น Production อย่างปลอดภัย*

1. **ตรวจสอบโค้ด (Audit & Security)**
   - โค้ดที่ AI สร้าง จะถูกสแกน PDPA แบบ Real-time
   - ระบบ Governance จะบังคับให้มีคน Approve (Checker) หากฟีเจอร์นั้นถูกตั้งค่าไว้ว่ามีความเสี่ยงสูง

2. **จบงานและวนลูปใหม่ (Complete & Iterate Next)**
   - เมื่อฟีเจอร์เสร็จสมบูรณ์ ผู้ใช้กดจบงานในหน้า Lifecycle
   - หากมีการแก้บั๊กหรือเพิ่มฟีเจอร์ใหม่ ก็กดปุ่ม `Iterate Next` เพื่อสร้าง Version ใหม่ และเริ่มลูปตั้งแต่ Step 1 อีกครั้ง

3. **Deploy (One-Click)**
   - เมื่อผ่านการ Approve ระบบจะมีปุ่ม **Deploy** ด้านขวาบน 
   - สามารถเลือกได้ว่าจะ Deploy ขึ้น Docker, On-Premise, หรือ Kubernetes ขององค์กร

---

## 💡 สรุปแก่นสำคัญ (The Core Principle)
แทนที่จะให้ผู้ใช้ "แชทสั่งโค้ดลอยๆ" แบบ ChatGPT ทั่วไป ซึ่งมักจะคุม Scope ยากเมื่อโปรเจกต์ใหญ่ขึ้น แพลตฟอร์มนี้บังคับให้เกิดโครงสร้าง:

**Context (บริบทองค์กร) → Spec (ความต้องการ) → Lifecycle (สถานะงาน) → Agent (ลงมือทำ)**

โครงสร้างนี้ทำให้คนที่มาสานต่อ (หรือแม้แต่ AI ตัวมันเอง) ไม่หลงทาง รู้ว่ากำลังทำอะไร ถึงไหน และอิงจากเอกสารใดครับ