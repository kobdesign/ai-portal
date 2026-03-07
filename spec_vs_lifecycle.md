# การเปรียบเทียบ Project Spec กับ Project Lifecycle

ในแพลตฟอร์ม Enterprise AI IDE ของเรา หน้า **Project Spec** และ **Project Lifecycle** ดูผิวเผินอาจจะมีข้อมูลที่คล้ายกัน (เช่น มีชื่อฟีเจอร์ มีสถานะ) แต่จริงๆ แล้ว **ไม่ซ้ำซ้อนกันครับ** ทั้งสองหน้ามี "จุดประสงค์" (Purpose) และ "กลุ่มเป้าหมายผู้ใช้งาน" (Persona) ที่แตกต่างกันอย่างชัดเจน

---

## 1. Project Spec (มองในมุมของ "Business & Product")

_คำถามหลัก: "ระบบนี้ต้องทำอะไรได้บ้าง?" (What to build)_

หน้า **Project Spec** ทำหน้าที่เปรียบเสมือน **Product Backlog** หรือเอกสาร Requirement ของระบบ:

- **มุมมอง (Perspective):** เน้นที่โครงสร้างของ Requirement (Epic -> User Story -> Acceptance Criteria)
- **กลุ่มผู้ใช้หลัก:** Product Owner (PO), Business Analyst (BA), Project Manager
- **สิ่งที่แสดงผล:**
  - ความต้องการทางธุรกิจ เช่น "ผู้ใช้ต้องสามารถ Login ด้วยบัตรประชาชนได้"
  - ลำดับความสำคัญ (Priority)
  - ขอบเขตของงาน (Scope)
- **เปรียบเทียบกับเครื่องมือในตลาด:** เหมือน **Jira Backlog** หรือ **Confluence Requirement Page**

---

## 2. Project Lifecycle (มองในมุมของ "Development & Execution")

_คำถามหลัก: "ตอนนี้งานชิ้นนั้น กำลังถูกพัฒนาอยู่ในขั้นตอนไหน?" (How it is being built)_

หน้า **Project Lifecycle** ทำหน้าที่เปรียบเสมือน **Kanban Board / CI-CD Pipeline Monitor** ที่แสดงการไหลของงาน (Workflow):

- **มุมมอง (Perspective):** เน้นที่สถานะการผลิตโค้ด (Explore -> Design -> Implement -> Test -> Deploy)
- **กลุ่มผู้ใช้หลัก:** Developer, Tech Lead, QA, AI Agent
- **สิ่งที่แสดงผล:**
  - AI กำลังดราฟต์ Proposal อยู่หรือเปล่า? (Proposal Phase)
  - AI กำลังเขียนโค้ดอยู่ไหม? (Implement Phase)
  - ติดอยู่ที่การทำ Automated Test หรือไม่? (Test Phase)
- **เปรียบเทียบกับเครื่องมือในตลาด:** เหมือน **Jira Active Sprint Board**, **GitLab Pipelines**, หรือ **Linear**

---

## สรุปความสัมพันธ์ (How they work together)

ความสัมพันธ์ของสองหน้านี้คือ **"Many-to-One" / "Linkage"** ครับ:

1. PO เขียนความต้องการไว้ใน **Spec** (เช่น `US-101: ทำระบบ Login`)
2. เมื่อถึงเวลาทำงาน ทีม Dev จะหยิบ `US-101` มาปั้นเป็น **Feature** ใน **Lifecycle** (เช่น `FEAT-1`)
3. ใน 1 Feature ของ Lifecycle อาจจะผูกกับหลาย User Story ในหน้า Spec ก็ได้

**ตัวอย่างเพื่อให้เห็นภาพ:**

- สมมติคุณเปิดหน้า **Spec** คุณจะเห็นว่ามีฟีเจอร์ "ทำระบบ Export PDF" ค้างอยู่ใน Backlog (แสดงว่าธุรกิจอยากได้สิ่งนี้)
- แต่ฟีเจอร์นี้อาจจะ **ยังไม่โผล่** ในหน้า **Lifecycle** เลยก็ได้ เพราะทีม Dev / AI ยังไม่ได้เริ่มลงมือทำ (Explore/Ideate)

ดังนั้น การแยกสองหน้านี้ออกจากกัน จะตอบโจทย์ Enterprise มากกว่า เพราะฝั่ง Business จะได้มีที่สำหรับวางแผน Requirement โดยไม่ต้องสนใจความปวดหัวเรื่องกระบวนการพัฒนา (Lifecycle) ในขณะที่ฝั่ง Tech ก็โฟกัสแค่สเตปการสร้างซอฟต์แวร์ครับ
