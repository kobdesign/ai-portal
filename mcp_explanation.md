# MCP (Model Context Protocol) ในแพลตฟอร์มของเรา

MCP (Model Context Protocol) เป็นมาตรฐานเปิดที่พัฒนาโดย Anthropic (ผู้สร้าง Claude) เพื่อให้ AI Agent สามารถ **"เชื่อมต่อและอ่านข้อมูลจากแหล่งภายนอกได้อย่างเป็นมาตรฐานเดียวกัน"** 

ในแพลตฟอร์ม Enterprise AI IDE ของเรา เราได้ดึงศักยภาพของ MCP มาใช้เป็นฟีเจอร์หลัก (Core Features) ในการดึง Context จากระบบขององค์กรมาให้ AI วิเคราะห์ ซึ่งแสดงออกมาในหน้าจอและฟีเจอร์ต่างๆ ดังนี้ครับ:

---

## 1. ฟีเจอร์ MCP ในหน้า "Integrations Panel" (Enterprise Data)
นี่คือจุดที่ใช้ MCP อย่างชัดเจนที่สุด ในการเชื่อมต่อ AI เข้ากับฐานข้อมูลขององค์กร

- **Database Context (Oracle, PostgreSQL, SAP):** แทนที่เราจะดึงข้อมูลลูกค้าออกมาตรงๆ เราใช้ MCP Server ทำหน้าที่เป็นตัวกลางอ่าน Schema (โครงสร้างตาราง) และ Metadata ส่งให้ AI ทำให้ AI รู้ว่า "ตารางลูกค้าชื่ออะไร มีฟิลด์อะไรบ้าง" แล้วจึงเขียน SQL Query ได้แม่นยำ โดยไม่ต้องเห็นข้อมูลจริงของลูกค้า (ลดความเสี่ยงเรื่อง PDPA)
- **API Documentation (Swagger/OpenAPI):** AI สามารถอ่านเอกสาร API ของระบบเก่าผ่าน MCP เพื่อให้รู้วิธีส่ง Request ไปยัง AS/400 หรือ Core Banking ขององค์กรได้ถูกต้อง

## 2. ฟีเจอร์ MCP ในหน้า "Legacy & GitLab Sync" (Codebase Context)
- **Git Repository Access:** เราสามารถใช้ MCP Server (เช่น `mcp-server-git` หรือ `mcp-server-gitlab`) ต่อตรงเข้ากับ Internal GitLab ของบริษัท เพื่อให้ AI สามารถทะลวงเข้าไปอ่าน Source Code เก่า ทำความเข้าใจ Architecture เดิม หรือหาบรรทัดโค้ดที่ต้องการ Refactor ได้ทันที
- **File System Exploration:** การอัปโหลดไฟล์ Zip/Tar ของ Legacy Code เข้ามา AI จะใช้โปรโตคอลนี้ในการ Search และอ่านไฟล์ข้ามโฟลเดอร์ เหมือนมี Developer คนนึงกำลังใช้คำสั่ง `grep` ใน Terminal

## 3. ฟีเจอร์ MCP ในหน้า "Knowledge Base Panel" (Corporate RAG)
- **Document & Confluence Sync:** เมื่อเราใส่ลิงก์ Confluence หรืออัปโหลดไฟล์คู่มือ Design System (เช่น PDF) แพลตฟอร์มจะใช้ MCP ดึงเนื้อหาเหล่านี้มาทำเป็น "Context" ให้ AI 
- *ตัวอย่าง:* เมื่อผู้ใช้สั่งว่า "สร้างปุ่มกด" AI จะดึงความรู้ผ่าน MCP มาเช็คว่า "บริษัทนี้กำหนดสีปุ่มกดไว้รหัสสีอะไร" ทำให้โค้ดที่ Generate ออกมาตรงตาม Corporate Identity ทันที

## 4. MCP ในระบบการออกแบบ (Figma Integration - แผนในอนาคต/มีในระบบแล้วบางส่วน)
- **Design-to-Code:** ผ่าน `mcp-figma` AI สามารถดึงข้อมูลจากหน้าจอ Figma ที่ Designer ออกแบบไว้ (เช่น สี, ระยะห่าง, ขนาด Font) แล้วแปลงมาเป็น React/Tailwind Code ฝั่ง Frontend ได้โดยตรง

---

## ทำไมถึงต้องใช้ MCP แทนการยิง API ธรรมดา?
สำหรับ Enterprise แล้ว MCP มีประโยชน์มหาศาลครับ:
1. **Security & Control (ความปลอดภัย):** ฝั่งผู้ดูแลระบบ (IT Admin) สามารถควบคุมได้ว่า MCP Server จะยอมให้ AI "อ่าน" หรือ "เขียน" ข้อมูลส่วนไหนได้บ้าง (เช่น ให้สิทธิ์อ่านโครงสร้างตารางได้ แต่ห้ามดึงข้อมูล PII)
2. **Standardization:** ไม่ว่าองค์กรจะใช้ Tools กี่ตัว (Jira, GitLab, Oracle, Confluence) ก็สามารถเขียน MCP Server เป็นตัวกลางเพื่อคุยกับ AI ได้ด้วยภาษาเดียวกัน ไม่ต้องปวดหัวเขียน Custom Integration ยิบย่อย

*สรุปคือ: ในแพลตฟอร์มของเรา หน้าต่าง **Integrations**, **Legacy Sync**, และ **Knowledge Base** ล้วนแล้วแต่ทำงานอยู่บนแนวคิดของการใช้ MCP เพื่อป้อน Context ให้กับ AI ครับ*