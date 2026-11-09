const { useState, useEffect, useMemo, useRef } = React;

// --- Native SVG Icons ---
const Search = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const LayoutGrid = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>);
const ListIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>);
const SortIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="15" y1="18" x2="15" y2="6"></line><polyline points="11 10 15 6 19 10"></polyline><line x1="9" y1="6" x2="9" y2="18"></line><polyline points="5 14 9 18 13 14"></polyline></svg>);
const Activity = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>);
const Heart = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>);
const Zap = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);
const AlertTriangle = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);
const ShieldAlert = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>);
const Check = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>);
const X = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const Info = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>);
const SunIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>);
const MoonIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>);
const ArrowRightLeft = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 3 4 4-4 4"></path><path d="M20 7H4"></path><path d="m8 21-4-4 4-4"></path><path d="M4 17h16"></path></svg>);
const Stethoscope = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path><circle cx="20" cy="10" r="2"></circle></svg>);
const BookOpen = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>);
const Calculator = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2"></rect><line x1="8" x2="16" y1="6" y2="6"></line><line x1="16" x2="16" y1="14" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>);
const Pill = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path></svg>);
const Printer = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect width="12" height="8" x="6" y="14"></rect></svg>);
const Sliders = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="4" y1="21" y2="14"></line><line x1="4" x2="4" y1="10" y2="3"></line><line x1="12" x2="12" y1="21" y2="12"></line><line x1="12" x2="12" y1="8" y2="3"></line><line x1="20" x2="20" y1="21" y2="16"></line><line x1="20" x2="20" y1="12" y2="3"></line><line x1="1" x2="7" y1="14" y2="14"></line><line x1="9" x2="15" y1="8" y2="8"></line><line x1="17" x2="23" y1="16" y2="16"></line></svg>);

// --- Dark Theme Layer Engine ---
(() => {
  const tints = {
    amber: ['252,211,77', '251,191,36', '245,158,11'], blue: ['147,197,253', '96,165,250', '59,130,246'],
    cyan: ['103,232,249', '34,211,238', '6,182,212'], emerald: ['110,231,183', '52,211,153', '16,185,129'],
    indigo: ['165,180,252', '129,140,248', '99,102,241'], purple: ['216,180,254', '192,132,252', '168,85,247'],
    rose: ['253,164,175', '251,113,133', '244,63,94'], sky: ['125,211,252', '56,189,248', '14,165,233'],
    teal: ['94,234,212', '45,212,191', '20,184,166'], yellow: ['253,224,71', '250,204,21', '234,179,8']
  };
  const neutrals = {
    'bg-white': 'background-color:#151f32', 'bg-slate-50': 'background-color:#101a2b',
    'bg-slate-50/50': 'background-color:rgba(16,26,43,.5)', 'bg-slate-100': 'background-color:#0b1220',
    'bg-slate-100/95': 'background-color:rgba(11,18,32,.95)', 'bg-slate-200': 'background-color:#24324a',
    'text-slate-900': 'color:#f1f5f9', 'text-slate-800': 'color:#e2e8f0', 'text-slate-700': 'color:#cbd5e1',
    'text-slate-600': 'color:#a8b4c6', 'text-slate-500': 'color:#94a3b8', 'text-slate-500 dark:text-slate-400': 'color:#7d8ba1',
    'text-slate-300': 'color:#4a5a73', 'text-slate-200': 'color:#33425a',
    'border-slate-100': 'border-color:#1d2940', 'border-slate-200': 'border-color:#263449',
    'border-slate-200/50': 'border-color:rgba(38,52,73,.5)', 'border-slate-300': 'border-color:#33435c',
  };
  const esc = (c) => c.replace(/[:/]/g, (m) => '\\' + m);
  const rules = [];
  const add = (cls, decl) => rules.push(`html.dark .${esc(cls)}:not(.light-lock *){${decl}}`);
  Object.entries(neutrals).forEach(([c, d]) => add(c, d));
  Object.entries(tints).forEach(([f, [c300, c400, c500]]) => {
    add(`bg-${f}-50`, `background-color:rgba(${c500},0.12)`);
    add(`bg-${f}-100`, `background-color:rgba(${c500},0.2)`);
    add(`text-${f}-600`, `color:rgb(${c400})`);
    add(`text-${f}-700`, `color:rgb(${c300})`);
    add(`text-${f}-800`, `color:rgb(${c300})`);
    add(`border-${f}-200`, `border-color:rgba(${c500},0.35)`);
    add(`border-${f}-300`, `border-color:rgba(${c500},0.45)`);
  });
  const style = document.createElement('style');
  style.id = 'dark-theme-layer';
  style.textContent = rules.join('\n');
  document.head.appendChild(style);
})();

const Sparkles = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4M3 5h4M19 3v4M17 5h4"/></svg>);
const HistoryIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg>);

// --- Changelog (newest first; one entry per day; bump the version on every update) ---
const changelogData = [
  {
    version: "v1.2.8",
    date: "November 9, 2026",
    dateTh: "9 พฤศจิกายน 2569",
    features: [
      "Cards now have Select (top right) with Details under it, like the bronchodilator guide: icon-only on phones. The Compare button on the card is gone; the bar at the bottom shows Compare only once two or more drugs are selected. The NLEM chip moved up under the name; the country chips stay in the last row.",
      "Active filters are shown as removable chips under the controls with a Clear button, and a Key button beside the count explains the colours, icons and chips. The six clinical tools sit in a collapsible tile (closed by default on phones, remembered). On the tile card the class and route chips share a line, the warning comes before the dose, and the country chips sit in the last row beside NLEM; the compare bar no longer covers the last card.",
      "The Countries group has TH, US, UK, EU and JP buttons, so availability can be filtered country by country (every selected button must hold).",
      "Country availability like the bronchodilator guide: each card shows TH, US, UK, EU and JP chips (current, past †, not found ⊘). The Filters box has a Countries group with TH, US, UK, EU and JP buttons, an FDA status group (Currently, Past, Not found) beside it, and NLEM only next to that; the old three-way NLEM menu is replaced. The Overview tab lists the status per country with its basis. Sources: Thai FDA register, DailyMed, emc, AEMPS CIMA (Spain as the EU proxy) and KEGG MEDICUS (JAPIC), checked 9 Nov 2026.",
      "Every drug now has a dosage-form icon (oral, injection, or both) tinted by its class; tile cards have a class colour edge, a bigger name, one merged brand line, and show the first MIMS dose line with the rest on tap. On phones the list view is a compact row list with no sideways scroll.",
      "Tile cards now show the adult dose from MIMS Thailand, one line for each indication or route, in full (the same rows as the Dosing tab).",
      "The sort order, grid or list view and folded class groups are now remembered in this browser, like Group by class.",
      "Third guideline block in the Dosing tab: the 2019 ESC supraventricular tachycardia guideline for the 13 drugs it names (recommendation class and level, the doses it gives); the other 14 show N/A. Added to the references.",
      "Print Ward Sheet now shows the first Thai brands and a Doses by source column (the first MIMS and ESC entry of each drug).",
      "Action potential: the 5 Class III drugs and 6 of the 7 Other drugs now show their own mechanism by phase, from the ACC/AHA 2023 table, the FDA label or AHA/ACC/HRS 2017, in the pop-up and on the cards. Vernakalant has no mechanism in the sources read, so it shows N/A.",
      "Second guideline block in the Dosing tab: what the 2022 ESC ventricular arrhythmia guideline says about 18 drugs (doses, contraindications, recommendations); the other 9 show N/A. Added to the references.",
      "New block in the Dosing tab with what the 2024 ESC atrial fibrillation guideline says about each drug it covers (rhythm control and rate control doses, cautions, recommendation class); other drugs show N/A. ESC added to the references.",
      "Thai brand names from MIMS Thailand are on the cards and searchable (full list in the Dosing tab); drugs MIMS lists no Thai brand for show none.",
      "References are grouped under headings: guidelines, drug labels, MIMS Thailand, Thai NLEM and journal articles.",
      "The class buttons moved into the Filters box, with Group by class (and Collapse all) beside them.",
      "Controls row now matches the bronchodilator guide: on phones the search is an icon that opens the search box, the sort menu (with its icon) stays in the row, the view buttons show the active mode name, and the Filters button has a funnel icon with the filter count.",
      "Class chips are multi-select: tap several classes to show them together; All clears the selection.",
      "Action Potential pop-up and drug cards now show the mechanism in each phase (0, 2, 3, 4) taken from the drug's class, marked as class-level; anything the drug's own label states is shown separately with its source. The class curve is drawn right in the drug card (the View Curve button is gone). The curve has a light background in light mode. The group Other has no shared mechanism, so it shows N/A.",
    ],
    featuresTh: [
      "การ์ดมีปุ่มเลือก (มุมขวาบน) และปุ่มรายละเอียดอยู่ด้านล่าง เหมือนแอป bronchodilator บนมือถือแสดงเป็นไอคอน ปุ่มเปรียบเทียบบนการ์ดถูกเอาออก แถบด้านล่างจะแสดงปุ่มเปรียบเทียบเมื่อเลือกยาตั้งแต่สองตัวขึ้นไป ป้าย NLEM ย้ายขึ้นมาใต้ชื่อยา ส่วนป้ายประเทศยังอยู่แถวล่าง",
      "ตัวกรองที่ใช้อยู่แสดงเป็นชิปกดเอาออกได้ใต้แถบควบคุม พร้อมปุ่มล้างทั้งหมด และปุ่มสัญลักษณ์ข้างจำนวนยาอธิบายสี ไอคอน และป้ายต่าง ๆ เครื่องมือทางคลินิกทั้งหกอยู่ในแผ่นที่พับได้ (ปิดไว้ก่อนบนมือถือ และจำค่าไว้) บนการ์ด ชิปกลุ่มยาและทางให้ยาอยู่บรรทัดเดียวกัน คำเตือนมาก่อนขนาดยา ป้ายประเทศอยู่แถวล่างข้าง NLEM และแถบเปรียบเทียบไม่บังการ์ดสุดท้ายอีกต่อไป",
      "กลุ่มประเทศมีปุ่ม TH, US, UK, EU และ JP กรองการวางจำหน่ายรายประเทศได้ (ต้องเป็นจริงทุกปุ่มที่เลือก)",
      "แสดงการวางจำหน่ายตามประเทศเหมือนแอป bronchodilator: การ์ดยามีป้าย TH, US, UK, EU และ JP (ปัจจุบัน เคยมี † ไม่พบ ⊘) กล่องตัวกรองมีกลุ่มประเทศ TH US UK EU และ JP กลุ่มสถานะ อย. (ปัจจุบัน เคยมี ไม่พบ) ถัดไป และ เฉพาะบัญชียาหลัก ต่อจากนั้น แทนเมนู NLEM สามตัวเลือกเดิม แท็บภาพรวมแสดงสถานะรายประเทศพร้อมที่มา แหล่งข้อมูล: ทะเบียนยา อย. DailyMed emc AEMPS CIMA (ใช้สเปนแทนสหภาพยุโรป) และ KEGG MEDICUS (JAPIC) ตรวจเมื่อ 9 พ.ย. 2569",
      "ยาทุกตัวมีไอคอนรูปแบบยา (รับประทาน ฉีด หรือทั้งสอง) ใช้สีตามกลุ่มยา การ์ด tile มีแถบสีกลุ่มยาด้านซ้าย ชื่อยาใหญ่ขึ้น บรรทัดชื่อการค้ารวมกัน และแสดงขนาดยาบรรทัดแรกของ MIMS ส่วนที่เหลือแตะเพื่อดู บนมือถือมุมมองรายการเป็นแถวกะทัดรัดไม่ต้องเลื่อนซ้ายขวา",
      "การ์ดแบบ tile แสดงขนาดยาผู้ใหญ่จาก MIMS Thailand แยกบรรทัดตามข้อบ่งใช้หรือทางให้ยา ครบทั้งข้อความ (เป็นแถวเดียวกับแท็บขนาดยา)",
      "จดจำการเรียงลำดับ มุมมองกริดหรือรายการ และกลุ่มยาที่พับไว้ในเบราว์เซอร์นี้ เช่นเดียวกับปุ่มจัดกลุ่มตามกลุ่มยา",
      "เพิ่มส่วนที่สามในแท็บขนาดยา สรุปแนวทาง ESC 2019 สำหรับ supraventricular tachycardia ของยา 13 ตัวที่แนวทางระบุ (ระดับคำแนะนำ และขนาดยาที่แนวทางให้ไว้) ยาอีก 14 ตัวแสดง N/A และเพิ่มในเอกสารอ้างอิง",
      "ใบสรุปสำหรับพิมพ์ (Print Ward Sheet) แสดงชื่อการค้าในไทยบางส่วนและคอลัมน์ขนาดยาตามแหล่งอ้างอิง (รายการแรกของ MIMS และ ESC ของยาแต่ละตัว)",
      "Action potential: ยา Class III ทั้ง 5 ตัวและยากลุ่ม Other 6 จาก 7 ตัวแสดงกลไกเฉพาะตัวยาแยกตาม phase จากตาราง ACC/AHA 2023 ฉลาก FDA หรือ AHA/ACC/HRS 2017 ทั้งในหน้าต่างรูปคลื่นและการ์ดยา Vernakalant ไม่มีกลไกในแหล่งอ้างอิงที่อ่าน จึงแสดง N/A",
      "เพิ่มส่วนที่สองในแท็บขนาดยา สรุปแนวทาง ESC 2022 สำหรับ ventricular arrhythmia ของยา 18 ตัว (ขนาดยา ข้อห้ามใช้ คำแนะนำ) ยาอีก 9 ตัวแสดง N/A และเพิ่มในเอกสารอ้างอิง",
      "เพิ่มส่วนในแท็บขนาดยาที่สรุปแนวทาง ESC 2024 สำหรับ AF ของยาแต่ละตัวที่แนวทางครอบคลุม (ขนาดยาควบคุมจังหวะและอัตรา ข้อควรระวัง ระดับคำแนะนำ) ยาอื่นแสดง N/A และเพิ่ม ESC ในเอกสารอ้างอิง",
      "เพิ่มชื่อการค้าในไทยจาก MIMS Thailand บนการ์ดยาและค้นหาได้ (รายชื่อเต็มอยู่ในแท็บขนาดยา) ยาที่ MIMS ไม่มีชื่อการค้าในไทยจะไม่แสดง",
      "เอกสารอ้างอิงแบ่งเป็นหมวด: แนวทางเวชปฏิบัติ ฉลากยา MIMS Thailand บัญชียาหลักแห่งชาติ และบทความวารสาร",
      "ย้ายปุ่มกลุ่มยาเข้าไปในกล่องตัวกรอง โดยมีปุ่มจัดกลุ่มตามกลุ่มยา (และยุบทั้งหมด) อยู่ข้างกัน",
      "แถวควบคุมเหมือนแอป bronchodilator: บนมือถือการค้นหาเป็นไอคอนที่กดเพื่อเปิดช่องค้นหา เมนูเรียงลำดับ (พร้อมไอคอน) อยู่ในแถวเดียวกัน ปุ่มมุมมองแสดงชื่อโหมดที่ใช้ และปุ่มตัวกรองมีไอคอนกรวยพร้อมจำนวนตัวกรอง",
      "ปุ่มกลุ่มยาเลือกได้หลายกลุ่ม: แตะหลายกลุ่มเพื่อแสดงพร้อมกัน ปุ่ม All ล้างการเลือก",
      "หน้าต่าง Action Potential และการ์ดยาแสดงกลไกในแต่ละ phase (0, 2, 3, 4) จากกลุ่มยา โดยระบุว่าเป็นข้อมูลระดับกลุ่ม ส่วนที่ฉลากของยานั้นระบุไว้แสดงแยกพร้อมแหล่งอ้างอิง รูปคลื่นของกลุ่มยาแสดงในการ์ดยาโดยตรง (เอาปุ่มดูรูปคลื่นออก) พื้นหลังรูปคลื่นสว่างในโหมดสว่าง กลุ่ม Other ไม่มีกลไกร่วมกัน จึงแสดง N/A",
    ],
    bugs: [],
    bugsTh: [],
  },
  {
    version: "v1.2.7",
    date: "November 3, 2026",
    dateTh: "3 พฤศจิกายน 2569",
    features: [
      "New References section at the bottom of the page, like the bronchodilator guide: closed by default, opens to a numbered list of every source with its link and what it was used for.",
      "Class groups fold: tap a class heading to hide or show its drugs (arrow shows the state), and a Collapse all / Expand all button appears next to Group by class.",
      "Dosing tab now opens with the adult dose recommended by MIMS Thailand for every drug (generic medicine info, \"not country-specific\"), paraphrased with MIMS as the linked source, laid out as short rows (route and indication in bold, then the dose) instead of one long paragraph. Drugs where MIMS lists no arrhythmia dose (phenytoin, carvedilol, bisoprolol, magnesium, ivabradine, ranolazine) say so and show the dose MIMS does give; vernakalant is not in MIMS Thailand.",
      "New \"Group by class\" toggle next to the result count: the grid and list put the drugs under class headings (Ia, Ib, Ic, II, III, IV, Other) with a count each, keeping the chosen sort inside each class. The choice is remembered.",
      "The class filter now lives only in the chip row under the search bar (tap to filter, long-press for the action potential); the duplicate class buttons inside the Filters box are removed.",
      "Layout now matches the bronchodilator guide: page title with the version, language and theme pills at the top right, a \"Made by\" line and a disclaimer link, tinted tool tiles pinned with the search row (one row of six short-name tiles on phones), and the same page width. The language pill shows the other language (ไทย / EN).",
      "Class buttons: a tap now only selects the class filter; the action potential pop-up opens on a long press (about half a second). The \"AP\" tag on the buttons is removed.",
      "Magnesium for torsades de pointes now shows a dose, from the Tzivoni 1988 case series (12 patients): 2 g IV bolus, a second 2 g after 5-15 min if needed, then 3-20 mg/min for 7-48 h. The guidelines give no dose, so this is labelled as case-series evidence in the drug record, the IV protocols and the torsades pathway.",
    ],
    featuresTh: [
      "เพิ่มส่วนเอกสารอ้างอิงท้ายหน้า เหมือนแอป bronchodilator: ปิดไว้ก่อน เปิดแล้วเห็นรายการแหล่งอ้างอิงทั้งหมดพร้อมลิงก์และสิ่งที่ใช้อ้างอิง",
      "กลุ่มยาพับได้: แตะหัวข้อกลุ่มเพื่อซ่อนหรือแสดงยาในกลุ่ม (ลูกศรบอกสถานะ) และมีปุ่ม ยุบทั้งหมด / ขยายทั้งหมด ข้างปุ่มจัดกลุ่มตามกลุ่มยา",
      "แท็บขนาดยาเริ่มด้วยขนาดยาผู้ใหญ่ที่ MIMS Thailand แนะนำสำหรับยาทุกตัว (ข้อมูลยากลาง \"ไม่เฉพาะประเทศ\") สรุปด้วยถ้อยคำของเราและมีลิงก์ MIMS เป็นแหล่งอ้างอิง แบ่งเป็นแถวสั้นๆ (เส้นทางให้ยา/ข้อบ่งใช้เป็นตัวหนา แล้วตามด้วยขนาดยา) แทนย่อหน้ายาว ยาที่ MIMS ไม่มีขนาดสำหรับหัวใจเต้นผิดจังหวะ (phenytoin, carvedilol, bisoprolol, magnesium, ivabradine, ranolazine) ระบุไว้ชัดเจนพร้อมขนาดที่ MIMS ให้ไว้ ส่วน vernakalant ไม่มีใน MIMS Thailand",
      "เพิ่มปุ่ม \"จัดกลุ่มตามกลุ่มยา\" ข้างจำนวนผลลัพธ์: การ์ดและรายการจัดยาไว้ใต้หัวข้อกลุ่ม (Ia, Ib, Ic, II, III, IV, อื่นๆ) พร้อมจำนวน และคงการเรียงที่เลือกไว้ในแต่ละกลุ่ม ระบบจำค่าที่เลือก",
      "ตัวกรองกลุ่มยาเหลือเฉพาะแถวปุ่มใต้ช่องค้นหา (แตะเพื่อกรอง กดค้างเพื่อดูกราฟศักย์ไฟฟ้า) เอาปุ่มกลุ่มยาซ้ำในกล่องตัวกรองออกแล้ว",
      "หน้าตาเหมือนคู่มือยาพ่นขยายหลอดลม: ชื่อหน้า พร้อมปุ่มเวอร์ชัน ภาษา และธีมที่มุมขวาบน บรรทัด \"Made by\" และลิงก์ข้อจำกัดความรับผิดชอบ ปุ่มเครื่องมือสีอ่อนตรึงไว้กับแถวค้นหา (บนโทรศัพท์เป็นหนึ่งแถว 6 ปุ่มชื่อสั้น) และความกว้างหน้าเท่ากัน ปุ่มภาษาแสดงภาษาอีกฝั่ง (ไทย / EN)",
      "ปุ่มกลุ่มยา: แตะเพื่อเลือกตัวกรองเท่านั้น กดค้าง (ประมาณครึ่งวินาที) เพื่อเปิดกราฟศักย์ไฟฟ้า และเอาป้าย \"AP\" บนปุ่มออกแล้ว",
      "Magnesium สำหรับ torsades de pointes แสดงขนาดยาแล้ว จากรายงาน Tzivoni 1988 (12 ราย): 2 ก. IV ครั้งเดียว ให้ 2 ก. ซ้ำหลัง 5-15 นาทีถ้าจำเป็น แล้วหยด 3-20 มก./นาที นาน 7-48 ชม. แนวทางปฏิบัติไม่ระบุขนาด จึงระบุว่าเป็นหลักฐานจากรายงานผู้ป่วยในข้อมูลยา สูตรยาหยด IV และแนวทางการรักษา torsades",
    ],
    bugs: [],
    bugsTh: [],
  },
  {
    version: "v1.2.0",
    date: "October 28, 2026",
    dateTh: "28 ตุลาคม 2569",
    features: [
      "Content audit: every drug record was rewritten from its current US FDA label (EU label for vernakalant), the 2025 AHA advanced life support guideline and algorithms, the 2023 ACC/AHA/ACCP/HRS atrial fibrillation guideline and the 2017 AHA/ACC/HRS ventricular arrhythmia guideline. Each section of the detail view now shows its sources with links. Anything no source supports is shown as Unknown.",
      "Thai NLEM updated to บัญชียาหลักแห่งชาติ พ.ศ. 2569 with its new sub-lists (b, s, ex) and the official condition text. Twelve drugs are not in the list (procainamide, quinidine, disopyramide, mexiletine, sotalol, dronedarone, ibutilide, vernakalant, ivabradine, dofetilide, bisoprolol, ranolazine); IV diltiazem is new to the list; only verapamil tablets (no injection) are listed.",
      "Arrhythmia pathways, IV infusion protocols and drug interactions rewritten from the same sources, each step with its source; shock energy now follows AHA 2025 (device setting or maximum; 200 J or more first shock for AF and flutter).",
      "QT filter and sort now use what the label says (boxed warning, warning, or none) instead of an unsourced risk grade. HFrEF and CAD filters keep only drugs the sources do not caution against; unknown is shown as unknown.",
      "Atropine is listed under a new Bradycardia filter. Phenytoin, ivabradine and ranolazine are marked as having no arrhythmia indication in their labels.",
      "Version button in the header opens this changelog.",
      "Light/dark is now one round sun/moon button, as in the other guides.",
      "Phone layout: nothing scrolls sideways any more. The class chips use short labels (Ia, II, Other) so the pinned search bar stays two rows, the tabs of the drug detail view wrap onto extra rows, the header title wraps instead of being cut off, tool button names wrap, and the search hint is shorter.",
    ],
    featuresTh: [
      "ตรวจสอบเนื้อหา: เขียนข้อมูลยาทุกตัวใหม่จากฉลากยา US FDA ฉบับปัจจุบัน (ฉลาก EU สำหรับ vernakalant) แนวทาง AHA 2025 advanced life support และ algorithm แนวทาง ACC/AHA/ACCP/HRS 2023 เรื่อง atrial fibrillation และแนวทาง AHA/ACC/HRS 2017 เรื่อง ventricular arrhythmia ทุกหัวข้อในหน้ารายละเอียดแสดงแหล่งอ้างอิงพร้อมลิงก์ ข้อมูลที่ไม่มีแหล่งอ้างอิงแสดงเป็น ไม่ทราบ (Unknown)",
      "ปรับบัญชียาหลักเป็นบัญชียาหลักแห่งชาติ พ.ศ. 2569 พร้อมบัญชีย่อยใหม่ (b, s, ex) และเงื่อนไขตามประกาศ ยา 12 ตัวไม่อยู่ในบัญชี (procainamide, quinidine, disopyramide, mexiletine, sotalol, dronedarone, ibutilide, vernakalant, ivabradine, dofetilide, bisoprolol, ranolazine) diltiazem ฉีดเพิ่มเข้าบัญชีใหม่ verapamil มีเฉพาะยาเม็ด (ไม่มียาฉีด)",
      "แนวทางการรักษา สูตรยาหยด IV และปฏิกิริยาระหว่างยา เขียนใหม่จากแหล่งเดียวกัน ทุกขั้นระบุแหล่งอ้างอิง พลังงานช็อกตาม AHA 2025 (ตามเครื่องหรือสูงสุด; ช็อกแรก 200 J ขึ้นไปสำหรับ AF และ flutter)",
      "ตัวกรองและการเรียงตาม QT ใช้ข้อความในฉลากยา (boxed warning, คำเตือน หรือไม่มี) แทนระดับความเสี่ยงที่ไม่มีแหล่งอ้างอิง ตัวกรอง HFrEF และ CAD แสดงเฉพาะยาที่แหล่งอ้างอิงไม่ได้เตือน ที่ไม่ทราบแสดงว่าไม่ทราบ",
      "Atropine อยู่ในตัวกรองใหม่ Bradycardia ระบุว่า phenytoin, ivabradine และ ranolazine ไม่มีข้อบ่งใช้ด้านหัวใจเต้นผิดจังหวะในฉลากยา",
      "ปุ่มเวอร์ชันที่หัวหน้าจอเปิดประวัติการอัปเดตนี้",
      "ปุ่มสลับโหมดสว่าง/มืดเป็นปุ่มกลมรูปดวงอาทิตย์/ดวงจันทร์ เหมือนคู่มืออื่น",
      "หน้าจอโทรศัพท์: ไม่ต้องเลื่อนด้านข้างอีก ปุ่มกรอง Class ใช้ชื่อย่อ (Ia, II, Other) ให้แถบค้นหาที่ตรึงไว้สูงเพียงสองแถว แท็บในหน้ารายละเอียดยาขึ้นบรรทัดใหม่ ชื่อแอปที่หัวหน้าจอขึ้นบรรทัดใหม่แทนการถูกตัด ชื่อปุ่มเครื่องมือขึ้นบรรทัดใหม่ และข้อความในช่องค้นหาสั้นลง",
    ],
    bugs: [
      "Corrected many unsourced or wrong values, for example: esmolol maximum 200 mcg/kg/min for arrhythmias (was 200-300); sotalol kidney intervals now follow the label (CrCl 30-59 every 24 h, 10-29 every 36-48 h); ranolazine contraindication is liver cirrhosis (severe kidney disease was listed); propafenone IV and adenosine 3 mg reduced doses removed (no source); NLEM categories corrected.",
      "Tisdale QT risk score: added the missing item (one QT-prolonging drug, 3 points) so the maximum is 21 as published; the percentages are now labelled as rates of QTc prolongation, not torsades.",
      "Tool windows and the drug detail view now start fresh each time they open; before, they broke React's rule on state order, which could crash the page.",
    ],
    bugsTh: [
      "แก้ค่าที่ผิดหรือไม่มีแหล่งอ้างอิงหลายจุด เช่น esmolol สูงสุด 200 มคก./กก./นาที สำหรับหัวใจเต้นผิดจังหวะ (เดิม 200-300) ระยะห่างของ sotalol ตามไตเป็นไปตามฉลาก (CrCl 30-59 ทุก 24 ชม., 10-29 ทุก 36-48 ชม.) ข้อห้ามของ ranolazine คือตับแข็ง (เดิมระบุไตวายรุนแรง) ลบ propafenone ฉีดและ adenosine ขนาดลด 3 มก. (ไม่มีแหล่งอ้างอิง) แก้บัญชียาหลักให้ถูกต้อง",
      "คะแนน Tisdale: เพิ่มข้อที่ขาด (ยาที่ทำให้ QT ยาว 1 ชนิด 3 คะแนน) ให้คะแนนเต็ม 21 ตามที่ตีพิมพ์ ร้อยละที่แสดงเป็นอัตรา QTc ยาว ไม่ใช่ torsades",
      "หน้าต่างเครื่องมือและหน้ารายละเอียดยาเริ่มใหม่ทุกครั้งที่เปิด เดิมผิดกฎลำดับ state ของ React ซึ่งอาจทำให้หน้าเว็บค้างได้",
    ],
  },
  {
    version: "v1.0.0",
    date: "October 21, 2026",
    dateTh: "21 ตุลาคม 2569",
    features: [
      "First release: 27 antiarrhythmic drugs (Vaughan Williams Ia to IV and others) with search, filters, sort, grid and list views, compare and a printable ward sheet.",
      "Tools: action potential curves by class, arrhythmia pathways (AF, SVT, VT, WPW), QTc and Tisdale risk, IV infusion protocols, renal and hepatic dosing, drug interactions.",
      "English and Thai.",
    ],
    featuresTh: [
      "เวอร์ชันแรก: ยาต้านหัวใจเต้นผิดจังหวะ 27 ชนิด (Vaughan Williams Ia ถึง IV และอื่น ๆ) พร้อมค้นหา ตัวกรอง การเรียง มุมมองการ์ดและรายการ การเปรียบเทียบ และใบสรุปสำหรับหอผู้ป่วย",
      "เครื่องมือ: กราฟศักย์ไฟฟ้าตาม Class แนวทางการรักษา (AF, SVT, VT, WPW) QTc และ Tisdale risk สูตรยาหยด IV การปรับยาตามไตและตับ ปฏิกิริยาระหว่างยา",
      "ภาษาอังกฤษและภาษาไทย",
    ],
    bugs: [],
    bugsTh: [],
  },
];
const APP_VERSION = changelogData[0].version;

function App() {
  const [lang, setLang] = useState('en');

  // Theme management with localStorage persistence
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('aag-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {}
    const stamped = document.documentElement.getAttribute('data-theme');
    if (stamped === 'light' || stamped === 'dark') return stamped;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('aag-theme', next); } catch (e) {}
  };

  const t = translations[lang];

  // Phone width flag (short labels)
  const phoneQuery = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(max-width: 639px)') : null;
  const [isPhone, setIsPhone] = useState(() => !!(phoneQuery && phoneQuery.matches));
  useEffect(() => {
    if (!phoneQuery) return;
    const onChange = () => setIsPhone(phoneQuery.matches);
    phoneQuery.addEventListener ? phoneQuery.addEventListener('change', onChange) : phoneQuery.addListener(onChange);
    return () => { phoneQuery.removeEventListener ? phoneQuery.removeEventListener('change', onChange) : phoneQuery.removeListener(onChange); };
  }, []);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  // Sort order, view mode and folded class groups are remembered in this browser (localStorage, optional).
  const saved = (key, ok, fallback) => { try { const v = localStorage.getItem(key); return ok.includes(v) ? v : fallback; } catch (e) { return fallback; } };
  const [sortOrder, setSortOrder] = useState(() => saved('aag-sort', ['classAsc', 'nameAsc', 'nameDesc', 'routeIV', 'qtRisk'], 'classAsc'));
  const [viewMode, setViewMode] = useState(() => saved('aag-view', ['grid', 'list'], 'grid'));
  useEffect(() => { try { localStorage.setItem('aag-sort', sortOrder); localStorage.setItem('aag-view', viewMode); } catch (e) {} }, [sortOrder, viewMode]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => { if (searchOpen && searchRef.current) searchRef.current.focus(); }, [searchOpen]);
  const pressTimer = useRef(null);
  const pressFired = useRef(false);

  // Filters
  const [selectedClasses, setSelectedClasses] = useState([]);
  const toggleClass = (val) => setSelectedClasses(c => val === 'all' ? [] : c.includes(val) ? c.filter(x => x !== val) : [...c, val]);
  const [groupByClass, setGroupByClass] = useState(() => { try { return localStorage.getItem('aag-group') === '1'; } catch (e) { return false; } });
  const [doseOpen, setDoseOpen] = useState({});
  const toggleDose = (id, e) => { e.stopPropagation(); setDoseOpen(o => ({ ...o, [id]: !o[id] })); };
  const [collapsed, setCollapsed] = useState(() => { try { const o = JSON.parse(localStorage.getItem('aag-fold') || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; } });
  useEffect(() => { try { localStorage.setItem('aag-fold', JSON.stringify(collapsed)); } catch (e) {} }, [collapsed]);
  const toggleFold = (cls) => setCollapsed(c => ({ ...c, [cls]: !c[cls] }));
  const toggleGroup = () => setGroupByClass(v => { const n = !v; try { localStorage.setItem('aag-group', n ? '1' : '0'); } catch (e) {} return n; });
  const [selectedIndication, setSelectedIndication] = useState('all');
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [safeHfrefOnly, setSafeHfrefOnly] = useState(false);
  const [safeCadOnly, setSafeCadOnly] = useState(false);
  const [lowQtOnly, setLowQtOnly] = useState(false);
  const [renalAdjustOnly, setRenalAdjustOnly] = useState(false);
  const [regCtry, setRegCtry] = useState([]); // any of 'th', 'us', 'uk', 'eu', 'jp'; every selected button must hold
  const [regSt, setRegSt] = useState([]); // 'current' | 'past' | 'never'
  const [nlemOnly, setNlemOnly] = useState(false);
  const toggleIn = (setter) => (v) => setter(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  // Modals & Navigation
  const [isApModalOpen, setIsApModalOpen] = useState(false);
  const [apModalClass, setApModalClass] = useState('Ia');
  const [isGuidelineModalOpen, setIsGuidelineModalOpen] = useState(false);
  const [isTisdaleModalOpen, setIsTisdaleModalOpen] = useState(false);
  const [isInfusionModalOpen, setIsInfusionModalOpen] = useState(false);
  const [isOrganModalOpen, setIsOrganModalOpen] = useState(false);
  const [isInteractionsModalOpen, setIsInteractionsModalOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [detailDrug, setDetailDrug] = useState(null);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const [isKeyOpen, setIsKeyOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(() => { try { const v = localStorage.getItem('aag-tools'); if (v === '1' || v === '0') return v === '1'; } catch (e) {} return !(window.matchMedia && window.matchMedia('(max-width: 639px)').matches); });
  useEffect(() => { try { localStorage.setItem('aag-tools', toolsOpen ? '1' : '0'); } catch (e) {} }, [toolsOpen]);

  const openApModal = (cls = 'Ia') => {
    setApModalClass(cls || 'Ia');
    setIsApModalOpen(true);
  };

  // Body scroll lock when any overlay is active
  useEffect(() => {
    const hasModal = isApModalOpen || isGuidelineModalOpen || isTisdaleModalOpen || isInfusionModalOpen || isOrganModalOpen || isInteractionsModalOpen || isCompareOpen || detailDrug !== null || isPrintOpen || isChangelogOpen;
    if (hasModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isApModalOpen, isGuidelineModalOpen, isTisdaleModalOpen, isInfusionModalOpen, isOrganModalOpen, isInteractionsModalOpen, isCompareOpen, detailDrug, isPrintOpen, isChangelogOpen]);

  // Global Escape key listener to close active modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (isChangelogOpen) setIsChangelogOpen(false);
      else if (detailDrug) setDetailDrug(null);
      else if (isCompareOpen) setIsCompareOpen(false);
      else if (isApModalOpen) setIsApModalOpen(false);
      else if (isGuidelineModalOpen) setIsGuidelineModalOpen(false);
      else if (isTisdaleModalOpen) setIsTisdaleModalOpen(false);
      else if (isInfusionModalOpen) setIsInfusionModalOpen(false);
      else if (isOrganModalOpen) setIsOrganModalOpen(false);
      else if (isInteractionsModalOpen) setIsInteractionsModalOpen(false);
      else if (isPrintOpen) setIsPrintOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [detailDrug, isCompareOpen, isApModalOpen, isGuidelineModalOpen, isTisdaleModalOpen, isInfusionModalOpen, isOrganModalOpen, isInteractionsModalOpen, isPrintOpen, isChangelogOpen]);

  // Multi-drug Comparison
  const [compareIds, setCompareIds] = useState([]);

  const toggleCompare = (id, e) => {
    e.stopPropagation();
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) {
        alert(lang === 'th' ? "สามารถเลือกเปรียบเทียบได้สูงสุด 3 ชนิด" : "You can compare up to 3 drugs at once.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeFromCompare = (id) => {
    setCompareIds(prev => prev.filter(x => x !== id));
  };

  // Filter Active Count
  const activeFilterCount = (selectedClasses.length ? 1 : 0) +
                            (selectedIndication !== 'all' ? 1 : 0) +
                            (selectedRoute !== 'all' ? 1 : 0) +
                            (safeHfrefOnly ? 1 : 0) +
                            (safeCadOnly ? 1 : 0) +
                            (lowQtOnly ? 1 : 0) +
                            (renalAdjustOnly ? 1 : 0) +
                            ((regCtry.length || regSt.length) ? 1 : 0) +
                            (nlemOnly ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedClasses([]);
    setSelectedIndication('all');
    setSelectedRoute('all');
    setSafeHfrefOnly(false);
    setSafeCadOnly(false);
    setLowQtOnly(false);
    setRenalAdjustOnly(false);
    setRegCtry([]);
    setRegSt([]);
    setNlemOnly(false);
    setSearchTerm('');
  };

  // Filtering & Sorting Logic
  const filteredDrugs = useMemo(() => {
    return DRUGS_DATA.filter(drug => {
      // Search Term
      if (searchTerm && searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase().trim();
        const matchName = (drug.genericName || '').toLowerCase().includes(query);
        const matchBrand = [...(drug.brandNames || []), ...(drug.thaiBrands || [])].some(b => (b || '').toLowerCase().includes(query));
        const matchClass = (drug.vwClass || '').toLowerCase().includes(query) || (drug.classFullName || '').toLowerCase().includes(query);
        const matchTarget = (drug.primaryTarget || '').toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchClass && !matchTarget) return false;
      }

      // Class
      if (selectedClasses.length && !selectedClasses.includes(drug.vwClass)) return false;

      // Indication
      if (selectedIndication !== 'all' && !drug.indications.includes(selectedIndication)) return false;

      // Route
      if (selectedRoute !== 'all' && !drug.routes.includes(selectedRoute)) return false;

      // Safety
      if (safeHfrefOnly && drug.safeInHfref !== true) return false;
      if (safeCadOnly && drug.safeCad !== true) return false;
      if (lowQtOnly && drug.qtRisk !== 'None') return false;
      if (renalAdjustOnly && drug.renalAdjust !== true) return false;

      // NLEM
      if (nlemOnly && !drug.nlem.list) return false;

      // Registration: TH = the Thai FDA register; Others = any of US, UK, EU, JP. Status chips pick the status (default: current).
      const stOk = (s) => (regSt.length ? regSt.includes(s) : s === 'current');
      const cs = regCtry.length ? regCtry : (regSt.length ? ['th'] : []);
      if (['th', 'us', 'uk', 'eu', 'jp'].some(c => cs.includes(c) && !stOk(drug.reg[c]))) return false;

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'nameAsc') return a.genericName.localeCompare(b.genericName);
      if (sortOrder === 'nameDesc') return b.genericName.localeCompare(a.genericName);
      if (sortOrder === 'routeIV') {
        const aHasIV = a.routes.includes('IV') ? 1 : 0;
        const bHasIV = b.routes.includes('IV') ? 1 : 0;
        return bHasIV - aHasIV;
      }
      if (sortOrder === 'qtRisk') {
        const rank = { 'Boxed': 2, 'Warning': 1, 'None': 0 };
        return (rank[b.qtRisk] || 0) - (rank[a.qtRisk] || 0);
      }
      // default: classAsc
      const classRank = { 'Ia': 1, 'Ib': 2, 'Ic': 3, 'II': 4, 'III': 5, 'IV': 6, 'Other': 7 };
      return (classRank[a.vwClass] || 99) - (classRank[b.vwClass] || 99);
    });
  }, [searchTerm, selectedClasses, selectedIndication, selectedRoute, safeHfrefOnly, safeCadOnly, lowQtOnly, renalAdjustOnly, regCtry, regSt, nlemOnly, sortOrder]);

  const comparedDrugObjects = useMemo(() => {
    return DRUGS_DATA.filter(d => compareIds.includes(d.id));
  }, [compareIds]);

  // Class order for grouping (stable sort keeps the chosen sort inside each class)
  const REG_GB = 'flex bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-0.5 shadow-sm shrink-0 items-center h-[26px] md:h-7 gap-0.5';
  const REG_BTN = 'h-full px-1.5 md:px-2 rounded flex items-center justify-center gap-1 text-[10px] font-bold transition-all whitespace-nowrap ';
  const CLASS_RANK = { Ia: 1, Ib: 2, Ic: 3, II: 4, III: 5, IV: 6, Other: 7 };
  const shownDrugs = groupByClass ? [...filteredDrugs].sort((a, b) => (CLASS_RANK[a.vwClass] || 99) - (CLASS_RANK[b.vwClass] || 99)) : filteredDrugs;
  const groupHeader = (drug, idx, kind) => {
    if (!groupByClass || (idx > 0 && shownDrugs[idx - 1].vwClass === drug.vwClass)) return null;
    const label = t['class' + drug.vwClass] || ('Class ' + drug.vwClass);
    const n = shownDrugs.filter(d => d.vwClass === drug.vwClass).length;
    const cls = 'text-xs font-extrabold uppercase tracking-wide text-indigo-700 dark:text-indigo-300';
    const open = !collapsed[drug.vwClass];
    const btn = (
      <button type="button" onClick={() => toggleFold(drug.vwClass)} aria-expanded={open} data-fold={drug.vwClass} className={'w-full flex items-center gap-2 text-left cursor-pointer ' + cls}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={'w-3.5 h-3.5 shrink-0 transition-transform ' + (open ? '' : '-rotate-90')} aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
        <span>{label} <span className="font-semibold text-slate-500 dark:text-slate-400">({n})</span></span>
      </button>
    );
    return kind === 'tr'
      ? <tr data-class-header><td colSpan={7} className="p-3 bg-slate-50 dark:bg-slate-800">{btn}</td></tr>
      : <div data-class-header className="col-span-full border-b border-slate-200 dark:border-slate-700 pb-1 pt-2">{btn}</div>;
  };

  return (
    <div id="main-app-container" className="min-h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 pb-36 text-sm md:text-base">
      
      <div className="max-w-6xl mx-auto relative px-3 sm:px-6 pt-12 md:pt-4">

        {/* Top-right pill controls, as in the bronchodilator guide */}
        <div className="absolute top-3 md:top-4 right-3 sm:right-6 flex items-center gap-1.5 md:gap-2 z-20 print:hidden" data-top-controls>
          <button onClick={() => setIsChangelogOpen(true)} data-changelog-open title={t.changelogTitle} className="text-[10px] font-bold text-slate-500 dark:text-slate-300 bg-white dark:bg-slate-800 shadow-sm px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition-all cursor-pointer">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {APP_VERSION}
          </button>
          <button onClick={() => setLang(lang === 'en' ? 'th' : 'en')} className="text-[10px] md:text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 shadow-sm px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-all cursor-pointer">
            {lang === 'en' ? 'ไทย' : 'EN'}
          </button>
          <button onClick={toggleTheme} aria-label={theme === 'dark' ? t.themeToLight : t.themeToDark} title={theme === 'dark' ? t.themeToLight : t.themeToDark} data-theme-toggle className="w-7 h-7 shrink-0 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 shadow-sm rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 transition-all cursor-pointer">
            {theme === 'dark' ? <SunIcon className="w-3.5 h-3.5 text-amber-400" /> : <MoonIcon className="w-3.5 h-3.5" />}
          </button>
        </div>

        <header className="mb-3 md:mb-4">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-1 md:mb-2 leading-tight sm:pr-32 md:pr-48">{t.title}</h1>
          <p className="hidden sm:block text-xs md:text-sm text-slate-600 dark:text-slate-400" data-subtitle>{t.subtitle}</p>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 sm:block" data-credit-line>
            <p className="text-[10px] md:text-xs font-semibold text-indigo-600 dark:text-indigo-400 sm:mt-1">Made by Warodom Phaenthong, M.D.</p>
            <a href="#disclaimer-heading" onClick={(e) => { e.preventDefault(); document.getElementById('disclaimer-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="block sm:mt-1 text-[11px] md:text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline print:hidden">{t.discLink}</a>
          </div>
        </header>

      {/* Main Content Area */}
      <main className={'space-y-4 ' + (compareIds.length > 0 ? 'pb-24' : '')}>

        {/* Search, Sort, View Mode & Filters Pinned Toolbar */}
        <section aria-label="Controls" className="sticky top-0 z-30 pt-2 pb-2 md:pt-3 md:pb-2.5 bg-slate-100/95 dark:bg-slate-900/95 backdrop-blur-md space-y-2">
          {/* Tools: one row of six tiles on phones, a normal button row from tablet width up */}
          <button type="button" onClick={() => setToolsOpen(v => !v)} aria-expanded={toolsOpen} data-tools-toggle
            className="w-full flex items-center justify-between gap-2 px-3 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 print:hidden">
            <span className="flex items-center gap-1.5"><Calculator className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />{lang === 'th' ? 'เครื่องมือทางคลินิก' : 'Clinical tools'} <span className="font-semibold text-slate-500 dark:text-slate-400">(6)</span></span>
            <span aria-hidden="true" className={'text-slate-500 dark:text-slate-300 transition-transform ' + (toolsOpen ? 'rotate-180' : '')}>▾</span>
          </button>
          <div aria-label="Clinical Tools" data-guide-buttons className={toolsOpen ? 'grid grid-cols-6 gap-1 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 w-full print:hidden' : 'hidden'}>
            {[
              ['ap', t.apGuide, 'bg-indigo-50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border-indigo-200 text-indigo-700', Zap, () => openApModal('Ia')],
              ['guideline', t.guidelineNav, 'bg-emerald-50 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border-emerald-200 text-emerald-700', Stethoscope, () => setIsGuidelineModalOpen(true)],
              ['tisdale', t.tisdaleCalc, 'bg-rose-50 hover:bg-rose-100 dark:hover:bg-rose-900/40 border-rose-200 text-rose-700', Activity, () => setIsTisdaleModalOpen(true)],
              ['infusion', t.infusionCalc, 'bg-blue-50 hover:bg-blue-100 dark:hover:bg-blue-900/40 border-blue-200 text-blue-700', Pill, () => setIsInfusionModalOpen(true)],
              ['organ', t.organGuide, 'bg-teal-50 hover:bg-teal-100 dark:hover:bg-teal-900/40 border-teal-200 text-teal-700', Calculator, () => setIsOrganModalOpen(true)],
              ['interactions', t.interactionsMatrix, 'bg-amber-50 hover:bg-amber-100 dark:hover:bg-amber-900/40 border-amber-200 text-amber-700', ShieldAlert, () => setIsInteractionsModalOpen(true)],
            ].map(([k, label, tone, Icon, action]) => (
              <button key={k} onClick={action} data-guide={k} aria-label={label} title={label} className={`flex flex-col sm:flex-row min-w-0 sm:flex-grow-0 items-center justify-center gap-0.5 sm:gap-1.5 md:gap-2 ${tone} border px-0.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg font-bold shadow-sm transition-all active:scale-95 cursor-pointer`}>
                <Icon className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shrink-0" />
                <span className="text-[10px] max-[359px]:text-[9px] leading-[1.15] text-center sm:text-xs sm:leading-normal sm:whitespace-nowrap min-w-0 max-w-full break-words">{isPhone ? t.guideShort[k] : label}</span>
              </button>
            ))}
          </div>

          {/* Row: search (an icon on phones) + sort + view mode + Filters, same as the bronchodilator guide */}
          <div className="flex gap-2 md:gap-3 w-full h-9 md:h-10">
            <button onClick={() => setSearchOpen(true)} aria-label={t.searchOpen} title={t.searchOpen} aria-expanded={searchOpen} data-search-open
              className={`${searchOpen ? 'hidden' : 'flex sm:hidden'} shrink-0 h-full w-9 items-center justify-center rounded-lg border shadow-sm transition-colors ${searchTerm !== '' ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}>
              <Search className="w-4 h-4" />
            </button>
            <div className={`${searchOpen ? 'block flex-1' : 'hidden sm:block'} relative min-w-0 sm:flex-none sm:w-[45%] md:w-[35%] lg:w-1/3 h-full`} data-search-box>
              <input ref={searchRef} type="text" placeholder={isPhone ? t.searchPlaceholderShort : t.searchPlaceholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onBlur={() => setSearchOpen(false)} onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                className="w-full h-full pl-3 pr-9 md:pl-4 md:pr-10 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-base sm:text-xs md:text-sm transition-shadow" />
              <Search className="hidden sm:block absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 md:w-4 md:h-4 pointer-events-none" />
              <button onMouseDown={(e) => e.preventDefault()} onClick={() => { setSearchTerm(''); setSearchOpen(false); if (searchRef.current) searchRef.current.blur(); }} aria-label={t.searchClose} title={t.searchClose} data-search-close
                className="flex sm:hidden absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"><X className="w-4 h-4" /></button>
            </div>

            <div className={`${searchOpen ? 'hidden sm:block' : 'block'} relative flex-1 min-w-0 sm:basis-auto h-full`} data-sort>
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-2.5 flex items-center pointer-events-none">
                <SortIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400" />
              </div>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} aria-label={t.sortLabel} className="w-full h-full pl-6 pr-1 sm:pl-8 sm:pr-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] md:text-xs font-bold appearance-none cursor-pointer">
                <option value="classAsc">{t.sortClassAsc}</option>
                <option value="nameAsc">{t.sortNameAsc}</option>
                <option value="nameDesc">{t.sortNameDesc}</option>
                <option value="routeIV">{t.sortRoute}</option>
                <option value="qtRisk">{t.sortQtRisk}</option>
              </select>
            </div>

            <div className={`${searchOpen ? 'hidden sm:flex' : 'flex'} bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 shadow-sm shrink-0 items-center h-full`}>
              {[['grid', t.gridView, LayoutGrid], ['list', t.listView, ListIcon]].map(([mode, label, Icon]) => (
                <button key={mode} onClick={() => setViewMode(mode)} className={`h-full px-2 md:px-2.5 rounded-md transition-colors flex items-center justify-center ${viewMode === mode ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100' : 'text-slate-400 hover:text-slate-600'}`} aria-label={label} title={label} aria-pressed={viewMode === mode}>
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {viewMode === mode && <span className="hidden sm:inline ml-1.5 text-[10px] font-bold whitespace-nowrap" data-view-label>{label}</span>}
                </button>
              ))}
            </div>

            {/* Opens and closes the filter panel. Indigo while any filter is on, so a closed panel still says filters apply. */}
            <button onClick={() => setFiltersOpen(v => !v)} aria-expanded={filtersOpen} aria-label={t.filtersBtn} title={t.filtersBtn} data-filters-toggle
              className={`shrink-0 h-full px-2 md:px-3 rounded-lg border shadow-sm flex items-center gap-1 md:gap-1.5 text-[10px] md:text-xs font-bold whitespace-nowrap transition-colors ${activeFilterCount ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-500' : filtersOpen ? 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-3.5 md:h-3.5" aria-hidden="true"><path d="M3 5h18l-7 8.5V19l-4 2v-7.5z" /></svg>
              <span className="max-[359px]:hidden">{t.filtersBtn}</span>{activeFilterCount > 0 && <span className="tabular-nums" data-filter-count>{activeFilterCount}</span>}
            </button>
          </div>

        </section>

        {/* Class chips and filter drawer scroll with the page */}
        <div className="space-y-2">
          {/* Expandable Filter Drawer */}
          {filtersOpen && (
            <div className="p-4 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-750 shadow-md space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-750 pb-2">
                <span className="font-extrabold text-xs text-slate-500 uppercase tracking-wider">{t.filtersBtn}</span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    {t.resetFilters}
                  </button>
                )}
              </div>

              {/* Registration: countries (TH / Others), FDA status and NLEM, same pattern as the bronchodilator guide */}
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2 w-full min-w-0" data-filter-row="registration">
                <div className={REG_GB} role="group" aria-label={t.regCountries} title={t.regCountriesTitle} data-reg-countries>
                  <span className="pl-1 pr-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">{t.regCountries}:</span>
                  {[['th', t.regTH, 'bg-emerald-700 text-white shadow-sm', 'text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10', t.regNameTH], ['us', 'US', 'bg-blue-700 text-white shadow-sm', 'text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/10', t.regNameUS], ['uk', 'UK', 'bg-rose-700 text-white shadow-sm', 'text-rose-800 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-500/10', t.regNameUK], ['eu', 'EU', 'bg-amber-700 text-white shadow-sm', 'text-amber-900 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-500/10', t.regNameEU], ['jp', 'JP', 'bg-violet-700 text-white shadow-sm', 'text-violet-800 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-500/10', t.regNameJP]].map(([k, label, on, off, tip]) => (
                    <button key={k} type="button" onClick={() => toggleIn(setRegCtry)(k)} aria-pressed={regCtry.includes(k)} data-reg-ctry={k} title={tip} className={REG_BTN + (regCtry.includes(k) ? on : off)}>{label}</button>
                  ))}
                </div>
                <div className={REG_GB} role="group" aria-label={t.regFda} title={t.regFdaTitle} data-reg-status>
                  <span className="pl-1 pr-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap inline-flex items-center gap-0.5">{t.regFda}<Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-700 dark:text-emerald-400" /></span>
                  {[['current', t.regCurrent, '', 'text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10'], ['past', t.regPast, '†', 'text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-500/10'], ['never', t.regNever, '⊘', 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700']].map(([k, label, mark, off]) => (
                    <button key={k} type="button" onClick={() => toggleIn(setRegSt)(k)} aria-pressed={regSt.includes(k)} data-reg-st={k} className={REG_BTN + (regSt.includes(k) ? 'bg-indigo-600 text-white shadow-sm' : off)}>{mark && <span aria-hidden="true">{mark}</span>}{label}</button>
                  ))}
                </div>
                <div className={REG_GB}>
                  <button type="button" onClick={() => setNlemOnly(v => !v)} aria-pressed={nlemOnly} data-nlem-only title={t.regNlemTitle} className={REG_BTN + (nlemOnly ? 'bg-indigo-600 text-white shadow-sm' : 'text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10')}><Check className="w-2.5 h-2.5 md:w-3 md:h-3" /> {t.regNlemOnly}</button>
                </div>
              </div>

              {/* Class filter (several allowed; long-press for the action potential) with Group by class beside it */}
              <div className="space-y-1.5" data-class-filter>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">{t.classLabel}</span>
                <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                {[
                  ['all', t.classAll],
                  ['Ia', 'Class Ia'],
                  ['Ib', 'Class Ib'],
                  ['Ic', 'Class Ic'],
                  ['II', 'Class II'],
                  ['III', 'Class III'],
                  ['IV', 'Class IV'],
                  ['Other', 'Class Other']
                ].map(([val, lbl]) => (
                  <button
                    key={val}
                    type="button"
                    onPointerDown={() => {
                      pressFired.current = false;
                      if (val === 'all') return;
                      clearTimeout(pressTimer.current);
                      pressTimer.current = setTimeout(() => { pressFired.current = true; openApModal(val); }, 500);
                    }}
                    onPointerUp={() => clearTimeout(pressTimer.current)}
                    onPointerLeave={() => clearTimeout(pressTimer.current)}
                    onPointerCancel={() => clearTimeout(pressTimer.current)}
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => {
                      if (pressFired.current) { pressFired.current = false; return; }
                      toggleClass(val);
                    }}
                    className={`group px-2 sm:px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
                      (val === 'all' ? selectedClasses.length === 0 : selectedClasses.includes(val))
                        ? 'bg-indigo-600 text-white shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-750'
                    }`}
                    title={val === 'all' ? lbl : (lang === 'th' ? `${lbl} - แตะเพื่อเลือก (เลือกได้หลายกลุ่ม) กดค้างเพื่อดูกราฟศักย์ไฟฟ้า` : `${lbl} - tap to select (several allowed), long-press for the action potential`)}
                  >
                    <span>{isPhone && val !== 'all' ? val : lbl}</span>
                  </button>
                ))}
    
                  <span className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" aria-hidden="true"></span>
                  {groupByClass && (
                    <button
                      onClick={() => { const classes = [...new Set(filteredDrugs.map(d => d.vwClass))]; const allFolded = classes.every(c => collapsed[c]); setCollapsed(Object.fromEntries(classes.map(c => [c, !allFolded]))); }}
                      data-fold-all
                      className="inline-flex items-center gap-1 h-6 md:h-7 px-2 rounded-md border shadow-sm text-[11px] font-bold whitespace-nowrap transition-colors border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      {[...new Set(filteredDrugs.map(d => d.vwClass))].every(c => collapsed[c]) ? t.expandAll : t.collapseAll}
                    </button>
                  )}
                  <button
                    onClick={toggleGroup}
                    aria-pressed={groupByClass}
                    data-group-toggle
                    className={`inline-flex items-center gap-1 h-6 md:h-7 px-2 rounded-md border shadow-sm text-[11px] font-bold whitespace-nowrap transition-colors ${groupByClass ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                  >
                    <Check className={`w-3 h-3 ${groupByClass ? 'opacity-100' : 'opacity-30'}`} />
                    {t.groupByClass}
                  </button>
      
                </div>
              </div>

              {/* Filter 2: Clinical Indication */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">{t.filterIndication}</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    ['all', t.indAll],
                    ['af_rate', t.indAfRate],
                    ['af_rhythm', t.indAfRhythm],
                    ['svt', t.indSvt],
                    ['vt_vf', t.indVtVf],
                    ['brady', t.indWpw]
                  ].map(([val, lbl]) => (
                    <button
                      key={val}
                      onClick={() => setSelectedIndication(val)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${selectedIndication === val ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'}`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 3: Safety & NLEM Toggles */}
              <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100 dark:border-slate-750">
                <button
                  onClick={() => setSafeHfrefOnly(v => !v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${safeHfrefOnly ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
                >
                  <Check className={`w-3.5 h-3.5 ${safeHfrefOnly ? 'opacity-100' : 'opacity-30'}`} />
                  {t.safeHfref}
                </button>

                <button
                  onClick={() => setSafeCadOnly(v => !v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${safeCadOnly ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
                >
                  <Check className={`w-3.5 h-3.5 ${safeCadOnly ? 'opacity-100' : 'opacity-30'}`} />
                  {t.safeCad}
                </button>

                <button
                  onClick={() => setLowQtOnly(v => !v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${lowQtOnly ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
                >
                  <Check className={`w-3.5 h-3.5 ${lowQtOnly ? 'opacity-100' : 'opacity-30'}`} />
                  {t.lowQtRisk}
                </button>

                <button
                  onClick={() => setRenalAdjustOnly(v => !v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${renalAdjustOnly ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
                >
                  <Check className={`w-3.5 h-3.5 ${renalAdjustOnly ? 'opacity-100' : 'opacity-30'}`} />
                  {t.renalAdjust}
                </button>

              </div>
            </div>
          )}
        </div>

        {/* Active filters as removable chips (same pattern as the bronchodilator guide) */}
        {(() => {
          const indLabel = { af_rate: t.indAfRate, af_rhythm: t.indAfRhythm, svt: t.indSvt, vt_vf: t.indVtVf, brady: t.indWpw };
          const stLabel = { current: t.regCurrent, past: t.regPast, never: t.regNever };
          const regName = { th: t.regNameTH, us: t.regNameUS, uk: t.regNameUK, eu: t.regNameEU, jp: t.regNameJP };
          const chips = [
            ...(searchTerm.trim() ? [{ key: 'q', label: '"' + searchTerm.trim() + '"', off: () => setSearchTerm('') }] : []),
            ...selectedClasses.map(c => ({ key: 'c' + c, label: 'Class ' + c, off: () => toggleClass(c) })),
            ...(selectedIndication !== 'all' ? [{ key: 'ind', label: indLabel[selectedIndication] || selectedIndication, off: () => setSelectedIndication('all') }] : []),
            ...(safeHfrefOnly ? [{ key: 'hf', label: t.safeHfref, off: () => setSafeHfrefOnly(false) }] : []),
            ...(safeCadOnly ? [{ key: 'cad', label: t.safeCad, off: () => setSafeCadOnly(false) }] : []),
            ...(lowQtOnly ? [{ key: 'qt', label: t.lowQtRisk, off: () => setLowQtOnly(false) }] : []),
            ...(renalAdjustOnly ? [{ key: 'renal', label: t.renalAdjust, off: () => setRenalAdjustOnly(false) }] : []),
            ...regCtry.map(c => ({ key: 'rc' + c, label: regName[c], off: () => toggleIn(setRegCtry)(c) })),
            ...regSt.map(s => ({ key: 'rs' + s, label: t.regFda + ': ' + stLabel[s], off: () => toggleIn(setRegSt)(s) })),
            ...(nlemOnly ? [{ key: 'nlem', label: t.regNlemOnly, off: () => setNlemOnly(false) }] : [])
          ];
          return chips.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5 px-0.5" role="group" aria-label={lang === 'th' ? 'ตัวกรองที่ใช้อยู่' : 'Active filters'} data-active-filters>
              <button type="button" onClick={resetAllFilters} data-clear-filters className="shrink-0 min-h-[26px] px-2.5 rounded-full border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300 shadow-sm inline-flex items-center gap-1 text-[11px] font-bold whitespace-nowrap transition-colors"><X className="w-3 h-3" /> {lang === 'th' ? 'ล้างทั้งหมด' : 'Clear'}</button>
              {chips.map(c => (
                <button key={c.key} type="button" onClick={c.off} title={c.label} aria-label={(lang === 'th' ? 'เอาออก: ' : 'Remove: ') + c.label} data-filter-chip
                  className="max-w-full min-h-[26px] inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-indigo-300 text-[11px] font-bold leading-tight text-left transition-colors">
                  <span className="break-words min-w-0">{c.label}</span><X className="w-3 h-3 shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          ) : null;
        })()}

        {/* Counter & Print Link Bar */}
        <div className="flex items-start justify-between gap-2 px-1">
          <div className="text-[11px] md:text-xs text-slate-600 dark:text-slate-400 min-w-0 pt-0.5" aria-live="polite">
            {t.showingCount} <strong className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{filteredDrugs.length}</strong> {t.ofDrugs} <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{DRUGS_DATA.length}</span> {t.drugsLabel}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <button type="button" onClick={() => setIsKeyOpen(true)} data-key-btn aria-haspopup="dialog" title={lang === 'th' ? 'ความหมายของสี ไอคอน และป้ายต่าง ๆ' : 'What the colours, icons and chips mean'}
              className="inline-flex items-center gap-1 h-6 md:h-7 px-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm text-[11px] font-bold whitespace-nowrap transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true"><circle cx="12" cy="12" r="9.5" /><path d="M9.3 9.2a2.8 2.8 0 1 1 4 2.6c-.8.5-1.3 1-1.3 2" /><path d="M12 17.2h.01" /></svg>
              {lang === 'th' ? 'สัญลักษณ์' : 'Key'}
            </button>
            <button
              onClick={() => setIsPrintOpen(true)}
              className="inline-flex items-center gap-1 h-6 md:h-7 px-2 rounded-md border shadow-sm text-[11px] font-bold whitespace-nowrap transition-colors border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printSheet}</span>
            </button>
          </div>
        </div>

        {/* Drugs List / Grid Presentation */}
        {filteredDrugs.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-750 space-y-3">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{t.noMatch}</p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow hover:bg-indigo-700"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {shownDrugs.map((drug, idx) => {
              const isCompared = compareIds.includes(drug.id);
              const hidden = groupByClass && collapsed[drug.vwClass];
              return (
                <React.Fragment key={drug.id}>
                {groupHeader(drug, idx, 'div')}
                {!hidden && <article
                  data-drug-id={drug.id}
                  onClick={() => setDetailDrug(drug)}
                  className={(isCompared ? 'ring-2 ring-indigo-500 ' : '') + 'bg-white dark:bg-slate-850 rounded-2xl border border-l-4 border-slate-200/90 dark:border-slate-750/90 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group ' + toneOf(drug.vwClass).stripe}
                >
                  {/* Card Top */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <DrugIcon routes={drug.routes} vwClass={drug.vwClass} lang={lang} />
                      <div className="min-w-0">
                        <span className="block font-extrabold text-lg leading-tight text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{drug.genericName}</span>
                        <div className="flex items-center gap-1.5 flex-wrap mt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openApModal(drug.vwClass);
                            }}
                            title={`Click to view Class ${drug.vwClass} Action Potential (AP) curve`}
                            className={'text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all flex items-center gap-1 cursor-pointer group/ap ' + toneOf(drug.vwClass).chip}
                          >
                            <span>Class {drug.vwClass}</span>
                            <Zap className="w-2.5 h-2.5 text-amber-500 group-hover/ap:scale-110 transition-transform" />
                          </button>
                            {drug.routes.map(r => (
                              <span key={r} className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${r === 'IV' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'}`}>{r}</span>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2">
                          {drug.brandNames.join(', ')}
                          {drug.brandNames.length > 0 && drug.thaiBrands.length > 0 && ' · '}
                          {drug.thaiBrands.length > 0 && <span data-thai-brands>TH: {drug.thaiBrands.slice(0, 4).join(', ')}{drug.thaiBrands.length > 4 ? ` +${drug.thaiBrands.length - 4}` : ''}</span>}
                        </p>
                        <span data-nlem-chip title={nlemText(drug.nlem, lang)} className={`inline-block mt-1 text-[10px] font-bold rounded border px-1.5 py-px leading-none whitespace-nowrap ${drug.nlem.list ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-300' : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400'}`}>{nlemShort(drug.nlem, lang)}</span>
                      </div>
                      </div>
                      <CardActions selected={isCompared} onSelect={(e) => toggleCompare(drug.id, e)} onDetails={(e) => { e.stopPropagation(); setDetailDrug(drug); }} lang={lang} />
                    </div>

                    {/* Target / Channel */}
                    <div className="text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px] block">{t.targetLabel}:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 leading-snug line-clamp-1">
                        {drug.primaryTarget}
                      </span>
                    </div>

                    {/* Indications Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {drug.indications.map(ind => (
                        <span key={ind} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300">
                          {INDICATION_SHORT[ind] || ind}
                        </span>
                      ))}
                    </div>

                    {/* Critical warning first, then the dose */}
                    <div className="p-2 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-[11px] text-rose-900 dark:text-rose-200 leading-snug flex items-start gap-1.5 line-clamp-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>{drug.cautionsAndWarnings[0]}</span>
                    </div>

                    {/* Adult dose per MIMS Thailand: the first row, the rest on tap (full text, one line per indication or route) */}
                    {drug.mims && (
                      <div className="p-2 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1.5" data-card-dose>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300 block">{lang === 'th' ? 'ขนาดยาผู้ใหญ่ (MIMS)' : 'Adult dose (MIMS)'}</span>
                        {(doseOpen[drug.id] ? drug.mims.rows : drug.mims.rows.slice(0, 1)).map((row, i) => (
                          <div key={i} className="text-[11px] leading-snug" data-card-dose-row>
                            <span className="font-bold text-indigo-700 dark:text-indigo-300">{lang === 'th' ? row.lTh : row.lEn}:</span>{' '}
                            <span className={drug.mims.na ? 'text-slate-600 dark:text-slate-400' : 'text-slate-800 dark:text-slate-100'}>{lang === 'th' ? row.th : row.en}</span>
                          </div>
                        ))}
                        {drug.mims.rows.length > 1 && (
                          <button type="button" onClick={(e) => toggleDose(drug.id, e)} aria-expanded={!!doseOpen[drug.id]} data-dose-toggle className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 hover:underline">
                            {doseOpen[drug.id] ? (lang === 'th' ? 'ซ่อน' : 'Show less') : (lang === 'th' ? `ดูขนาดยาทั้ง ${drug.mims.rows.length} รายการ` : `All ${drug.mims.rows.length} doses`)} {doseOpen[drug.id] ? '▴' : '▾'}
                          </button>
                        )}
                      </div>
                    )}

                  </div>

                  {/* Card bottom: availability by country */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <RegChips d={drug} lang={lang} />
                  </div>
                </article>}
                </React.Fragment>
              );
            })}
          </div>
        ) : isPhone ? (
          /* Phone list: compact rows, no sideways scroll */
          <div className="space-y-2" data-phone-list>
            {shownDrugs.map((drug, idx) => {
              const isCompared = compareIds.includes(drug.id);
              const hidden = groupByClass && collapsed[drug.vwClass];
              return (
                <React.Fragment key={drug.id}>
                {groupHeader(drug, idx, 'div')}
                {!hidden && <div
                  role="button" tabIndex={0} data-phone-row
                  onClick={() => setDetailDrug(drug)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setDetailDrug(drug); }}
                  className={'bg-white dark:bg-slate-850 rounded-xl border border-l-4 border-slate-200 dark:border-slate-750 p-2.5 shadow-sm flex items-start gap-2.5 cursor-pointer ' + toneOf(drug.vwClass).stripe}
                >
                  <DrugIcon routes={drug.routes} vwClass={drug.vwClass} size="sm" lang={lang} />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{drug.genericName}</span>
                      <span className={'text-[10px] font-bold px-1.5 py-0.5 rounded-md border ' + toneOf(drug.vwClass).chip}>Class {drug.vwClass}</span>
                      {drug.routes.map(r => (
                        <span key={r} className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${r === 'IV' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'}`}>{r}</span>
                      ))}
                    </div>
                    {drug.mims && <p className="text-[11px] leading-snug text-slate-700 dark:text-slate-200 line-clamp-2"><span className="font-bold text-indigo-700 dark:text-indigo-300">{lang === 'th' ? drug.mims.rows[0].lTh : drug.mims.rows[0].lEn}:</span> {lang === 'th' ? drug.mims.rows[0].th : drug.mims.rows[0].en}</p>}
                    <span className={`font-bold text-[11px] ${drug.nlem.list ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>{nlemShort(drug.nlem, lang)}</span>
                  </div>
                  <CardActions selected={isCompared} onSelect={(e) => toggleCompare(drug.id, e)} onDetails={(e) => { e.stopPropagation(); setDetailDrug(drug); }} lang={lang} />
                </div>}
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          /* Table View List */
          <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-750 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px]">
                  <th className="p-3 w-16">Class</th>
                  <th className="p-3">Generic & Brand</th>
                  <th className="p-3">Routes</th>
                  <th className="p-3">Target & APD</th>
                  <th className="p-3">Safety / Warnings</th>
                  <th className="p-3">NLEM</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {shownDrugs.map((drug, idx) => {
                  const isCompared = compareIds.includes(drug.id);
                  const hidden = groupByClass && collapsed[drug.vwClass];
                  return (
                    <React.Fragment key={drug.id}>
                    {groupHeader(drug, idx, 'tr')}
                    {!hidden && <tr
                      onClick={() => setDetailDrug(drug)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openApModal(drug.vwClass);
                          }}
                          title={`Click to view Class ${drug.vwClass} Action Potential (AP) curve`}
                          className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Class {drug.vwClass}</span>
                          <Zap className="w-3 h-3 text-amber-500" />
                        </button>
                      </td>
                      <td className="p-3">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100 block">{drug.genericName}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{drug.brandNames.join(', ')}</span>
                        {drug.thaiBrands.length > 0 && <span className="block text-[11px] text-slate-500 dark:text-slate-400" data-thai-brands>TH: {drug.thaiBrands.slice(0, 3).join(', ')}{drug.thaiBrands.length > 3 ? ` +${drug.thaiBrands.length - 3}` : ''}</span>}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          {drug.routes.map(r => (
                            <span key={r} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{r}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold block line-clamp-1">{drug.primaryTarget}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-[10px]">APD: {drug.actionPotential.apd}</span>
                      </td>
                      <td className="p-3 max-w-xs">
                        <span className="text-[11px] text-rose-600 dark:text-rose-400 line-clamp-1 font-medium">{drug.cautionsAndWarnings[0]}</span>
                      </td>
                      <td className="p-3 font-semibold">{nlemShort(drug.nlem, lang)}</td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end"><CardActions selected={isCompared} onSelect={(e) => toggleCompare(drug.id, e)} onDetails={(e) => { e.stopPropagation(); setDetailDrug(drug); }} lang={lang} /></div>
                      </td>
                    </tr>}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Clinical Disclaimer & Citations Footer */}
        <footer id="disclaimer-heading" className="mt-8 p-6 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-750 space-y-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <Info className="w-5 h-5 shrink-0" />
            <h3 className="font-bold text-sm">{t.disclaimerHeading}</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.disclaimerText}
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span>{lang === 'th' ? 'แหล่งอ้างอิง: ฉลากยา FDA/EMA • AHA 2025 • ACC/AHA 2023 AF • AHA/ACC/HRS 2017 VA • บัญชียาหลักแห่งชาติ 2569' : 'Sources: FDA/EMA labels • AHA 2025 • ACC/AHA 2023 AF • AHA/ACC/HRS 2017 VA • Thai NLEM 2569'}</span>
            <button onClick={() => setIsChangelogOpen(true)} className="hover:text-indigo-600 underline-offset-2 hover:underline">{t.versionLabel} {APP_VERSION}</button>
          </div>
        </footer>
        <ReferencesSection lang={lang} />
      </main>
      </div>

      {/* Floating Bottom Comparison Dock */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 text-white backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-150">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold">
              {compareIds.length} {lang === 'th' ? 'รายการยาที่เลือก' : 'drugs selected for comparison'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {compareIds.length >= 2 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow transition-colors"
              >
                {t.compareBtn} ({compareIds.length})
              </button>
            )}
            <button
              onClick={() => setCompareIds([])}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              title={t.clearCompare}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Changelog Modal */}
      {isKeyOpen && <KeyModal lang={lang} onClose={() => setIsKeyOpen(false)} />}

      {isChangelogOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 print:hidden" data-changelog onClick={(e) => { if (e.target === e.currentTarget) setIsChangelogOpen(false); }}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl shrink-0"><HistoryIcon className="w-5 h-5" /></div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">{t.changelogTitle}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.changelogSub}</p>
                </div>
              </div>
              <button onClick={() => setIsChangelogOpen(false)} aria-label={t.close} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full transition-colors shrink-0"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-5 bg-slate-50 dark:bg-slate-900">
              {changelogData.map((log, idx) => {
                const feats = lang === 'th' ? log.featuresTh : log.features;
                const fixes = lang === 'th' ? log.bugsTh : log.bugs;
                return (
                  <div key={log.version} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-5 shadow-sm relative">
                    {idx === 0 && <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-widest">{t.latest}</div>}
                    <div className="flex items-baseline justify-between gap-3 mb-3 border-b border-slate-100 dark:border-slate-700 pb-3 pr-14">
                      <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">{log.version}</h3>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{lang === 'th' ? log.dateTh : log.date}</span>
                    </div>
                    {feats.length > 0 && (
                      <div className="mb-4">
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> {t.newFeatures}</span>
                        <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 pl-5 list-disc">{feats.map((x, i) => <li key={i}>{x}</li>)}</ul>
                      </div>
                    )}
                    {fixes.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><X className="w-3 h-3" /> {t.bugFixes}</span>
                        <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 pl-5 list-disc">{fixes.map((x, i) => <li key={i}>{x}</li>)}</ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {isApModalOpen && <ActionPotentialModal isOpen onClose={() => setIsApModalOpen(false)} lang={lang} initialClass={apModalClass} />}
      {isGuidelineModalOpen && <GuidelineNavigatorModal isOpen onClose={() => setIsGuidelineModalOpen(false)} lang={lang} />}
      {isTisdaleModalOpen && <TisdaleRiskModal isOpen onClose={() => setIsTisdaleModalOpen(false)} lang={lang} />}
      {isInfusionModalOpen && <InfusionProtocolModal isOpen onClose={() => setIsInfusionModalOpen(false)} lang={lang} />}
      {isOrganModalOpen && <OrganDosingModal isOpen onClose={() => setIsOrganModalOpen(false)} lang={lang} drugs={DRUGS_DATA} />}
      {isInteractionsModalOpen && <DrugInteractionsModal isOpen onClose={() => setIsInteractionsModalOpen(false)} lang={lang} />}
      {isCompareOpen && <CompareModal isOpen onClose={() => setIsCompareOpen(false)} lang={lang} compareList={comparedDrugObjects} onRemove={removeFromCompare} />}
      {detailDrug && <DetailModal key={detailDrug.id} drug={detailDrug} onClose={() => setDetailDrug(null)} lang={lang} onOpenApModal={openApModal} />}
      {isPrintOpen && <PrintSheetView drugs={DRUGS_DATA} lang={lang} onClose={() => setIsPrintOpen(false)} />}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
