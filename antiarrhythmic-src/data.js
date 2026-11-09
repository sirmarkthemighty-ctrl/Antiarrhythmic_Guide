// Clinical Pharmacological and Electrophysiological Dataset
// UI strings. Drug records: drugs-1.js to drugs-4.js; sources: sources.js

const translations = {
  en: {
    title: "Antiarrhythmic Drug Guide",
    subtitle: "Antiarrhythmic and related drugs with dosing, safety, kidney/liver adjustment and Thai NLEM 2569 status, from FDA/EU labels and guidelines.",
    credit: "Clinical Cardiology Electrophysiology Reference",
    disclaimer: "For healthcare professionals only. Check every dose against the current label and the patient before use.",
    discLink: "Decision support only: read the disclaimer",
    disclaimerHeading: "Clinical Disclaimer & Sources",
    disclaimerText: "A teaching and reference aid, not a substitute for clinical judgment or the full prescribing information. Every section of a drug record names its sources: the current US FDA label (DailyMed) or the EU SmPC for vernakalant, the 2025 AHA Adult Advanced Life Support guideline and algorithms, the 2023 ACC/AHA/ACCP/HRS atrial fibrillation guideline, the 2017 AHA/ACC/HRS ventricular arrhythmia guideline, and the Thai National List of Essential Medicines 2569 (บัญชียาหลักแห่งชาติ พ.ศ. 2569). Facts that no source supports are shown as Unknown. Labels approve some of these drugs for other uses only; that is stated in the record. Sources checked 28 October 2026.",
    
    // Guide buttons
    apGuide: "Action Potential",
    guidelineNav: "Arrhythmia Pathways",
    tisdaleCalc: "QTc & Tisdale Risk",
    infusionCalc: "IV Infusion Protocols",
    organGuide: "Renal & Hepatic Dosing",
    interactionsMatrix: "Drug Interactions",
    guideShort: {
      ap: "Action Pot.",
      guideline: "Pathways",
      tisdale: "QTc / Risk",
      infusion: "IV Protocols",
      organ: "Kidney / Liver",
      interactions: "Interact."
    },

    // Search and Sort
    searchPlaceholder: "Search by generic name, brand (Cordarone, Rythmol...), class, indication, or target...",
    searchPlaceholderShort: "Search drug, brand, class...",
    searchOpen: "Open search",
    searchClose: "Clear and close search",
    sortLabel: "Sort antiarrhythmics by",
    sortClassAsc: "Class (Ia -> IV/Other)",
    sortNameAsc: "Generic Name (A - Z)",
    sortNameDesc: "Generic Name (Z - A)",
    sortRoute: "Route (IV first)",
    sortQtRisk: "QT / torsades warning in label",
    
    // View modes
    gridView: "Grid View",
    listView: "List View",
    filtersBtn: "Filters",
    resetFilters: "Reset Filters",
    groupByClass: "Group by class",
    regCountries: "Countries",
    regTH: "TH",
    regOthers: "Others",
    regCountriesTitle: "TH = Thailand. Others = the US, UK, EU or Japan (any one of them).",
    regFda: "FDA",
    regFdaTitle: "Registration status in the selected countries (Thai FDA register, US FDA labels, UK emc, Spain AEMPS as the EU proxy, Japan JAPIC list)",
    regCurrent: "Currently",
    regPast: "Past",
    regNever: "Not found",
    regNlemOnly: "NLEM only",
    regNlemTitle: "Only drugs on the Thai National List of Essential Medicines 2569",
    regAvailability: "Availability by country",
    collapseAll: "Collapse all",
    expandAll: "Expand all",
    showingCount: "Showing",
    ofDrugs: "of",
    drugsLabel: "antiarrhythmics",
    noMatch: "No antiarrhythmic drugs match your selected criteria.",

    // Filters
    classLabel: "Class",
    classAll: "All",
    filterClass: "Vaughan Williams Class",
    filterIndication: "Clinical Setting / Arrhythmia",
    filterRoute: "Route of Administration",
    filterSafety: "Safety & Organ Suitability",
    filterNlem: "Thailand NLEM Status",
    
    allClasses: "All Classes",
    classIa: "Class Ia (Procainamide, Quinidine, Disopyramide)",
    classIb: "Class Ib (Lidocaine, Mexiletine, Phenytoin)",
    classIc: "Class Ic (Flecainide, Propafenone)",
    classII: "Class II (Beta-Blockers)",
    classIII: "Class III (K+ Channel Blockers)",
    classIV: "Class IV (Non-DHP CCB)",
    classOther: "Other / Unclassified (Adenosine, Digoxin, Mg...)",

    indAll: "All Indications",
    indAfRate: "AF / AFlutter Rate Control",
    indAfRhythm: "AF / AFlutter Rhythm Control (Cardioversion/Maintenance)",
    indSvt: "SVT / PSVT (AVNRT / AVRT)",
    indVtVf: "Ventricular Tachycardia (VT / VF)",
    indWpw: "Bradycardia",

    routeAll: "All Routes",
    routeIV: "Intravenous (IV)",
    routePO: "Oral (PO)",

    safeHfref: "No HFrEF caution in the sources",
    safeCad: "No CAD / post-MI caution in the sources",
    lowQtRisk: "No QT / torsades warning in label",
    renalAdjust: "Renal Adjustment Required",

    nlemAll: "All NLEM Statuses",
    nlemED: "In Thai NLEM 2569",
    nlemNonED: "Not in Thai NLEM 2569",

    // Drug Card & Table Labels
    brandLabel: "Brands (from the cited labels)",
    targetLabel: "Primary Target / Channel",
    actionPotLabel: "Action Potential Effect",
    ecgLabel: "ECG Manifestations",
    acuteDoseLabel: "Acute / Emergency Dose",
    maintDoseLabel: "Maintenance Dose",
    halfLifeLabel: "Half-Life (t1/2)",
    eliminationLabel: "Elimination",
    detailsBtn: "Monograph",
    compareBtn: "Compare",
    compared: "Compared",
    addToCompare: "Add to Compare",
    highAlertWarning: "Boxed / key warning",

    // Modals
    closeModal: "Close",
    printSheet: "Print Ward Sheet",
    compareTitle: "Antiarrhythmic Drug Comparison Matrix",
    compareSubtitle: "Side-by-side comparative electrophysiology and clinical pharmacology",
    clearCompare: "Clear All",

    // Monograph Tabs
    tabOverview: "Overview & Mechanism",
    tabDosing: "Dosing & Resuscitation",
    tabOrgan: "Renal & Hepatic Adjustments",
    tabWarnings: "Black Box & Contraindications",
    tabInteractions: "Interactions & Monitoring",
    tabNlem: "Thai NLEM 2569",

    // Themes
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    changelogTitle: "Update Changelog",
    changelogSub: "Version history and features",
    versionLabel: "Version",
    latest: "Latest",
    newFeatures: "New features",
    bugFixes: "Fixes",
    close: "Close"
  },
  th: {
    title: "คู่มือยาต้านหัวใจเต้นผิดจังหวะ",
    subtitle: "ยาต้านหัวใจเต้นผิดจังหวะและยาที่เกี่ยวข้อง พร้อมขนาดยา ความปลอดภัย การปรับยาตามไต/ตับ และสถานะบัญชียาหลักแห่งชาติ 2569 จากฉลากยา FDA/EU และแนวทางปฏิบัติ",
    credit: "Clinical Cardiology Electrophysiology Reference",
    disclaimer: "สำหรับบุคลากรทางการแพทย์เท่านั้น ตรวจสอบขนาดยาทุกครั้งกับฉลากยาฉบับปัจจุบันและผู้ป่วยก่อนใช้",
    discLink: "ใช้ประกอบการตัดสินใจเท่านั้น: อ่านข้อจำกัดความรับผิดชอบ",
    disclaimerHeading: "ข้อจำกัดความรับผิดชอบและแหล่งอ้างอิง",
    disclaimerText: "เครื่องมือช่วยสอนและอ้างอิง ไม่ใช่สิ่งทดแทนดุลยพินิจทางคลินิกหรือเอกสารกำกับยาฉบับเต็ม ทุกหัวข้อของข้อมูลยาระบุแหล่งอ้างอิง ได้แก่ ฉลากยา US FDA ฉบับปัจจุบัน (DailyMed) หรือ EU SmPC สำหรับ vernakalant, แนวทาง AHA 2025 Adult Advanced Life Support และ algorithm, แนวทาง ACC/AHA/ACCP/HRS 2023 เรื่อง atrial fibrillation, แนวทาง AHA/ACC/HRS 2017 เรื่อง ventricular arrhythmia และบัญชียาหลักแห่งชาติ พ.ศ. 2569 ข้อมูลที่ไม่มีแหล่งอ้างอิงแสดงเป็น ไม่ทราบ (Unknown) ยาบางตัวได้รับอนุมัติตามฉลากสำหรับข้อบ่งใช้อื่นเท่านั้น ซึ่งระบุไว้ในข้อมูลยา ตรวจสอบแหล่งอ้างอิงเมื่อ 28 ตุลาคม 2569",

    // Guide buttons
    apGuide: "ศักย์ไฟฟ้าและกลไก",
    guidelineNav: "แนวทางการรักษา",
    tisdaleCalc: "คำนวณ QTc & Tisdale",
    infusionCalc: "สูตรผสมยาฉีดเข้าหลอดเลือด",
    organGuide: "ปรับยาตามไตและตับ",
    interactionsMatrix: "ปฏิกิริยาระหว่างยา",
    guideShort: {
      ap: "ศักย์ไฟฟ้า",
      guideline: "แนวทางรักษา",
      tisdale: "QTc / เสี่ยง",
      infusion: "สูตรยาฉีด",
      organ: "ไตและตับ",
      interactions: "ยาตีกัน"
    },

    // Search and Sort
    searchPlaceholder: "ค้นหาชื่อสามัญ, ชื่อการค้า (Cordarone, Rythmol...), กลุ่มยา, ข้อบ่งใช้, หรือเป้าหมาย...",
    searchPlaceholderShort: "ค้นหายา ชื่อการค้า กลุ่มยา...",
    searchOpen: "เปิดช่องค้นหา",
    searchClose: "ล้างและปิดช่องค้นหา",
    sortLabel: "เรียงลำดับยาตาม",
    sortClassAsc: "กลุ่มยา (Ia -> IV/อื่นๆ)",
    sortNameAsc: "ชื่อสามัญ (A - Z)",
    sortNameDesc: "ชื่อสามัญ (Z - A)",
    sortRoute: "วิธีบริหารยา (IV ก่อน)",
    sortQtRisk: "คำเตือน QT / torsades ในฉลากยา",

    // View modes
    gridView: "มุมมองการ์ด",
    listView: "มุมมองตาราง",
    filtersBtn: "ตัวกรอง",
    resetFilters: "ล้างตัวกรอง",
    groupByClass: "จัดกลุ่มตามกลุ่มยา",
    regCountries: "ประเทศ",
    regTH: "TH",
    regOthers: "อื่น ๆ",
    regCountriesTitle: "TH = ไทย อื่น ๆ = สหรัฐฯ สหราชอาณาจักร สหภาพยุโรป หรือญี่ปุ่น (ประเทศใดประเทศหนึ่ง)",
    regFda: "อย.",
    regFdaTitle: "สถานะการขึ้นทะเบียนในประเทศที่เลือก (ทะเบียนยา อย. ไทย ฉลาก FDA สหรัฐฯ emc สหราชอาณาจักร AEMPS สเปนแทนสหภาพยุโรป รายการ JAPIC ญี่ปุ่น)",
    regCurrent: "ปัจจุบัน",
    regPast: "เคยมี",
    regNever: "ไม่พบ",
    regNlemOnly: "เฉพาะบัญชียาหลัก",
    regNlemTitle: "เฉพาะยาที่อยู่ในบัญชียาหลักแห่งชาติ 2569",
    regAvailability: "การวางจำหน่ายตามประเทศ",
    collapseAll: "ยุบทั้งหมด",
    expandAll: "ขยายทั้งหมด",
    showingCount: "แสดง",
    ofDrugs: "จากทั้งหมด",
    drugsLabel: "รายการยา",
    noMatch: "ไม่พบยาต้านหัวใจเต้นผิดจังหวะที่ตรงตามเงื่อนไขที่เลือก",

    // Filters
    classLabel: "กลุ่มยา (Class)",
    classAll: "ทั้งหมด",
    filterClass: "กลุ่มยาตาม Vaughan Williams",
    filterIndication: "ภาวะหัวใจเต้นผิดจังหวะ / ข้อบ่งใช้",
    filterRoute: "ช่องทางการบริหารยา",
    filterSafety: "ความปลอดภัยและอวัยวะ",
    filterNlem: "สถานะบัญชียาหลักแห่งชาติ",

    allClasses: "ทุกกลุ่มยา (All Classes)",
    classIa: "Class Ia (Procainamide, Quinidine, Disopyramide)",
    classIb: "Class Ib (Lidocaine, Mexiletine, Phenytoin)",
    classIc: "Class Ic (Flecainide, Propafenone)",
    classII: "Class II (Beta-Blockers)",
    classIII: "Class III (K+ Channel Blockers)",
    classIV: "Class IV (Non-DHP CCB)",
    classOther: "กลุ่มอื่นๆ (Adenosine, Digoxin, Mg...)",

    indAll: "ทุกข้อบ่งใช้",
    indAfRate: "ควบคุมอัตราการเต้นใน AF / Flutter (Rate Control)",
    indAfRhythm: "แปลงและคุมจังหวะใน AF / Flutter (Rhythm Control)",
    indSvt: "SVT / PSVT (AVNRT / AVRT)",
    indVtVf: "หัวใจห้องล่างเต้นเร็วผิดปกติ (VT / VF)",
    indWpw: "หัวใจเต้นช้า (Bradycardia)",

    routeAll: "ทุกช่องทาง",
    routeIV: "ยาฉีดเข้าหลอดเลือดดำ (IV)",
    routePO: "ยารับประทาน (Oral)",

    safeHfref: "ไม่มีข้อควรระวังใน HFrEF ตามแหล่งอ้างอิง",
    safeCad: "ไม่มีข้อควรระวังใน CAD / หลัง MI ตามแหล่งอ้างอิง",
    lowQtRisk: "ไม่มีคำเตือน QT / torsades ในฉลากยา",
    renalAdjust: "ต้องปรับขนาดยาตามการทำงานของไต",

    nlemAll: "ทุกสถานะบัญชียา",
    nlemED: "อยู่ในบัญชียาหลักแห่งชาติ 2569",
    nlemNonED: "ไม่อยู่ในบัญชียาหลักแห่งชาติ 2569",

    // Drug Card & Table Labels
    brandLabel: "ชื่อการค้า (จากฉลากที่อ้างอิง)",
    targetLabel: "ไอออนชาแนล / ตัวรับเป้าหมาย",
    actionPotLabel: "ผลต่อ Action Potential",
    ecgLabel: "การเปลี่ยนแปลงบน ECG",
    acuteDoseLabel: "ขนาดยาในภาวะเฉียบพลัน/ฉุกเฉิน",
    maintDoseLabel: "ขนาดยาต่อเนื่อง",
    halfLifeLabel: "ค่าครึ่งชีวิต (t1/2)",
    eliminationLabel: "การกำจัดยา",
    detailsBtn: "ข้อมูลยาฉบับเต็ม",
    compareBtn: "เปรียบเทียบ",
    compared: "เลือกแล้ว",
    addToCompare: "เลือกเปรียบเทียบ",
    highAlertWarning: "คำเตือนสำคัญ / Boxed warning",

    // Modals
    closeModal: "ปิดหน้าต่าง",
    printSheet: "พิมพ์แผ่นสรุปสำหรับวอร์ด",
    compareTitle: "ตารางเปรียบเทียบยาต้านหัวใจเต้นผิดจังหวะ",
    compareSubtitle: "เปรียบเทียบสรีรวิทยาไฟฟ้า เภสัชวิทยาคลินิก และความปลอดภัยแบบเคียงข้างกัน",
    clearCompare: "ล้างรายการทั้งหมด",

    // Monograph Tabs
    tabOverview: "ภาพรวมและกลไก",
    tabDosing: "ขนาดยาและการกู้ชีพ",
    tabOrgan: "การปรับยาตามไตและตับ",
    tabWarnings: "ข้อห้ามใช้และคำเตือนรุนแรง",
    tabInteractions: "ปฏิกิริยาระหว่างยาและการติดตาม",
    tabNlem: "บัญชียาหลักแห่งชาติ 2569",

    // Themes
    themeToDark: "เปลี่ยนเป็นธีมมืด",
    themeToLight: "เปลี่ยนเป็นธีมสว่าง",
    changelogTitle: "ประวัติการอัปเดต",
    changelogSub: "ประวัติเวอร์ชันและฟีเจอร์",
    versionLabel: "เวอร์ชัน",
    latest: "ล่าสุด",
    newFeatures: "ฟีเจอร์ใหม่",
    bugFixes: "แก้ไข",
    close: "ปิด"
  }
};

// Drug records live in drugs-1.js to drugs-4.js; sources in sources.js.
