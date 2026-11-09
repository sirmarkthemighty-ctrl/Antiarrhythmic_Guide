// --- Drug records, part 3: Class III --- (see drugs-1.js for the conventions)
const DRUGS_PART_3 = [
  {
    id: "amiodarone",
    genericName: "Amiodarone",
    brandNames: ["Nexterone", "Cordarone"],
    vwClass: "III",
    classFullName: "Class III - Multichannel Blocker",
    color: "purple",
    primaryTarget: "ACC/AHA 2023: inhibits IKr, IKs, INa, IKur, Ito, ICa-L, IKAch; noncompetitive beta-blocker",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "AV block possible", qrs: "Unknown", qtc: "Prolonged (ACC/AHA 2023)", hr: "Bradycardia" },
    indications: ["vt_vf", "af_rhythm", "af_rate"],
    routes: ["IV", "PO"],
    acuteDose: {
      en: "Cardiac arrest, shock-refractory VF/pVT (AHA 2025): 300 mg IV/IO bolus, second dose 150 mg.\nStable wide-QRS tachycardia (AHA 2025): 150 mg IV over 10 min, repeat as needed if VT recurs, then 1 mg/min for the first 6 h.\nNexterone label (VF / unstable VT): 150 mg over 10 min (15 mg/min), then 360 mg over 6 h (1 mg/min), then 540 mg over 18 h (0.5 mg/min); after 24 h continue 0.5 mg/min (720 mg/24 h). Breakthrough: extra 150 mg over 10 min. Mean daily doses above 2100 mg raised hypotension risk.\nAF rate control (AHA 2025): 300 mg IV over 1 h, then 10-50 mg/h over 24 h (ACC/AHA 2023: 150-300 mg over 1 h).\nAF conversion (ACC/AHA 2023): 5-7 mg/kg or 300 mg IV, then 1200-3000 mg over 24 h; conversion in 8-12 h.",
      th: "หัวใจหยุดเต้น VF/pVT ที่ช็อกไม่ได้ผล (AHA 2025): 300 มก. IV/IO ครั้งที่สอง 150 มก.\nWide-QRS tachycardia ที่คงที่ (AHA 2025): 150 มก. IV ใน 10 นาที ซ้ำได้ถ้า VT กลับมา แล้ว 1 มก./นาที ใน 6 ชม. แรก\nฉลาก Nexterone (VF / VT ที่ไม่คงที่): 150 มก. ใน 10 นาที (15 มก./นาที) แล้ว 360 มก. ใน 6 ชม. (1 มก./นาที) แล้ว 540 มก. ใน 18 ชม. (0.5 มก./นาที) หลัง 24 ชม. ให้ 0.5 มก./นาที ต่อ (720 มก./24 ชม.) กำเริบระหว่างให้ยา: ให้เพิ่ม 150 มก. ใน 10 นาที ขนาดเฉลี่ยเกิน 2100 มก./วัน เพิ่มความเสี่ยงความดันต่ำ\nควบคุมอัตราเต้นใน AF (AHA 2025): 300 มก. IV ใน 1 ชม. แล้ว 10-50 มก./ชม. ใน 24 ชม. (ACC/AHA 2023: 150-300 มก. ใน 1 ชม.)\nแปลง AF (ACC/AHA 2023): 5-7 มก./กก. หรือ 300 มก. IV แล้ว 1200-3000 มก. ใน 24 ชม. กลับจังหวะใน 8-12 ชม."
    },
    maintenanceDose: {
      en: "Tablet label (life-threatening VF/VT): load 800-1600 mg/day until response (usually 1-3 weeks), then 600-800 mg/day for 1 month, then usually 400 mg/day; lowest effective dose; divide with meals if 1000 mg/day or more. AF (ACC/AHA 2023): load 400-800 mg/day in 2-4 doses for 1-4 weeks (total 6-10 g), then 200 mg once daily (rate control 100-200 mg daily).",
      th: "ฉลากยาเม็ด (VF/VT ที่อันตรายถึงชีวิต): ขนาดนำ 800-1600 มก./วัน จนได้ผล (มัก 1-3 สัปดาห์) แล้ว 600-800 มก./วัน 1 เดือน แล้วโดยทั่วไป 400 มก./วัน ใช้ขนาดต่ำสุดที่ได้ผล แบ่งให้พร้อมอาหารถ้า 1000 มก./วันขึ้นไป. AF (ACC/AHA 2023): ขนาดนำ 400-800 มก./วัน แบ่ง 2-4 ครั้ง นาน 1-4 สัปดาห์ (รวม 6-10 ก.) แล้ว 200 มก. วันละครั้ง (ควบคุมอัตราเต้น 100-200 มก./วัน)"
    },
    pharmacokinetics: {
      onset: "AF conversion in 8-12 h with IV loading (ACC/AHA 2023)",
      peak: "Unknown",
      halfLife: "IV label: 9-36 days (desethylamiodarone 9-30 days). Tablet label: terminal 26-107 days, mean about 53 days",
      metabolism: "CYP3A and CYP2C8 to desethylamiodarone (DEA); inhibits CYP2C9, CYP2D6, CYP3A and P-gp",
      excretion: "Liver metabolism, biliary excretion. Neither amiodarone nor DEA is dialyzable."
    },
    renalAdjustment: {
      crcl50: "No adjustment (renal impairment does not change kinetics)",
      crcl30_50: "No adjustment (renal impairment does not change kinetics)",
      crcl10_30: "No adjustment (renal impairment does not change kinetics)",
      crclLess10: "No adjustment (renal impairment does not change kinetics)",
      hd: "Not dialyzable"
    },
    renalAdjust: false,
    hepaticAdjustment: "No dose rule given. Tablets: reduce dose or stop if transaminases exceed 3 times normal (or double an elevated baseline); stop if clinical liver injury. IV: acute hepatocellular necrosis reported.",
    cautionsAndWarnings: [
      "BOXED WARNING (tablets): pulmonary toxicity in up to 17% in some series, fatal in about 10% of cases; baseline chest X-ray and lung function including DLCO; repeat history, exam and chest X-ray every 3-6 months.",
      "BOXED WARNING (tablets): hepatotoxicity, can be fatal; baseline and periodic transaminases.",
      "BOXED WARNING (tablets): can worsen arrhythmias; start where continuous ECG and resuscitation are available. Use only for the indicated life-threatening arrhythmias.",
      "IV: hypotension (16% of 1836 patients; most common in the first hours); slow the infusion. Bradycardia and AV block.",
      "Thyroid: hypothyroidism up to 10%, hyperthyroidism about 2% (may cause breakthrough arrhythmia).",
      "Optic neuropathy or neuritis; corneal microdeposits in most adults (reversible).",
      "Photosensitivity; long half-life means adverse effects persist after stopping.",
      "Correct low K, Mg and Ca before starting."
    ],
    contraindications: [
      "Cardiogenic shock",
      "Marked sinus bradycardia; sick sinus syndrome, second- or third-degree AV block or bradycardia causing syncope without a functioning pacemaker",
      "Hypersensitivity, including to iodine"
    ],
    adverseEffects: ["IV: hypotension (16%), bradycardia, AV block, phlebitis", "Oral: pulmonary toxicity, hepatotoxicity, hypo- or hyperthyroidism, corneal microdeposits, photosensitivity, skin pigmentation (ACC/AHA 2023: blue-gray), peripheral neuropathy"],
    monitoring: ["Baseline chest X-ray, lung function, thyroid tests, transaminases (label)", "ACC/AHA 2023: TSH and AST/ALT at baseline, 3-6 months, then every 6 months; ECG at baseline and yearly; chest X-ray if cough or dyspnea; yearly exam for skin and nerves", "ECG and BP during IV loading"],
    interactions: ["Warfarin: reduce dose by one-third to one-half; monitor PT/INR", "Digoxin: reduce by half or stop", "Simvastatin: limit to 20 mg (lovastatin, atorvastatin levels also rise)", "Sofosbuvir: symptomatic bradycardia needing pacemakers", "Dabigatran: higher levels", "Cimetidine: higher amiodarone levels"],
    safeInHfref: true,
    safeCad: true,
    qtRisk: "Warning",
    nlem: { list: "ex", old: "ค", items: [{ form: "Amiodarone HCl tab", cond: "ใช้สำหรับ supraventricular และ ventricular arrhythmias" }, { form: "Amiodarone HCl sterile sol", cond: "ใช้สำหรับ supraventricular และ ventricular arrhythmias" }] },
    refs: {
      mech: ["acc23-af#Table 23"],
      dose: ["aha25-ca", "aha25-tachy", "lbl:amiodarone-nexterone#Dosage and Administration", "aha25-als#Table (AF/AFL rate control)", "acc23-af#Tables 21, 22, 23", "lbl:amiodarone-tab#Dosage and Administration"],
      pk: ["lbl:amiodarone-nexterone#Warnings 5.1, Clinical Pharmacology", "lbl:amiodarone-tab#Clinical Pharmacology", "acc23-af#Table 22"],
      renal: ["lbl:amiodarone-tab#Clinical Pharmacology, Overdosage"],
      hepatic: ["lbl:amiodarone-tab#Boxed Warning", "lbl:amiodarone-nexterone#Warnings 5.4"],
      warn: ["lbl:amiodarone-tab#Boxed Warning, Warnings and Precautions", "lbl:amiodarone-nexterone#Warnings and Precautions"],
      contra: ["lbl:amiodarone-tab#Contraindications", "lbl:amiodarone-nexterone#Contraindications"],
      adverse: ["lbl:amiodarone-nexterone#Warnings 5.2, Adverse Reactions", "acc23-af#Table 23"],
      monitor: ["lbl:amiodarone-tab#Dosage and Administration, Boxed Warning", "acc23-af#Table 24"],
      interact: ["lbl:amiodarone-tab#Drug Interactions", "lbl:amiodarone-nexterone#Drug Interactions"],
      flags: ["acc23-af#text (AF-CHF: amiodarone in heart failure)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "sotalol",
    genericName: "Sotalol",
    brandNames: ["Betapace", "Betapace AF"],
    vwClass: "III",
    classFullName: "Class III - Potassium Channel Blocker with Beta-Blockade",
    color: "purple",
    primaryTarget: "ACC/AHA 2023: inhibits IKr and blocks beta-receptors; d-sotalol augments late INa",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Unknown", qrs: "Unknown", qtc: "Prolonged, dose-related (reduce or stop at 500 ms or more)", hr: "Decreased (bradycardia)" },
    indications: ["vt_vf", "af_rhythm"],
    routes: ["PO", "IV"],
    acuteDose: {
      en: "Not a single-dose conversion drug in the sources checked. Start (or restart) only in hospital for at least 3 days or until steady state, with continuous ECG and resuscitation available; baseline QT, potassium and magnesium normalized, CrCl calculated. IV sotalol (label) can replace oral dosing or load faster; dose depends on target oral dose and CrCl (see label).",
      th: "ไม่ใช่ยาแปลงจังหวะแบบให้ครั้งเดียวในแหล่งที่ตรวจ เริ่ม (หรือเริ่มใหม่) ในโรงพยาบาลอย่างน้อย 3 วัน หรือจนถึงระดับคงที่ มีการติดตาม ECG ต่อเนื่องและพร้อมกู้ชีพ ตรวจ QT และแก้โพแทสเซียม แมกนีเซียมให้ปกติ คำนวณ CrCl ก่อน. Sotalol ฉีด (ตามฉลาก) ใช้แทนยารับประทานหรือให้ถึงระดับเร็วขึ้น ขนาดขึ้นกับขนาดยารับประทานเป้าหมายและ CrCl (ดูฉลาก)"
    },
    maintenanceDose: {
      en: "Label: start 80 mg twice daily; increase by 80 mg/day every 3 days if QTc under 500 ms (max 320 mg/day for AF/flutter; VT usually 160-320 mg/day in 2-3 doses, up to 480-640 mg/day in refractory cases). AF/flutter: most respond to 120 mg twice daily. Check QTc 2-4 h after each increase. ACC/AHA 2023 (AF): CrCl over 60: 80-160 mg twice daily; CrCl 40-60: 80-160 mg once daily; CrCl under 40: contraindicated.",
      th: "ฉลากยา: เริ่ม 80 มก. วันละ 2 ครั้ง เพิ่มครั้งละ 80 มก./วัน ทุก 3 วัน ถ้า QTc ต่ำกว่า 500 ms (สูงสุด 320 มก./วัน สำหรับ AF/flutter; VT ส่วนใหญ่ 160-320 มก./วัน แบ่ง 2-3 ครั้ง ถึง 480-640 มก./วัน ในรายดื้อยา) AF/flutter ส่วนใหญ่ได้ผลที่ 120 มก. วันละ 2 ครั้ง ตรวจ QTc 2-4 ชม. หลังเพิ่มขนาดทุกครั้ง. ACC/AHA 2023 (AF): CrCl เกิน 60: 80-160 มก. วันละ 2 ครั้ง; CrCl 40-60: 80-160 มก. วันละครั้ง; CrCl ต่ำกว่า 40: ห้ามใช้"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "2-3 h",
      halfLife: "Mean 12 h; up to 69 h in anuric patients",
      metabolism: "Not metabolized; no CYP450 inhibition or induction",
      excretion: "Mainly unchanged by the kidney. Partly removed by hemodialysis."
    },
    renalAdjustment: {
      crcl50: "CrCl over 60: every 12 h. CrCl 30-59: every 24 h (label)",
      crcl30_50: "CrCl 30-59: every 24 h (label). ACC/AHA 2023 for AF: CrCl 40-60 once daily, under 40 contraindicated",
      crcl10_30: "CrCl 10-29: every 36-48 h (label). AF: contraindicated if CrCl under 40 (ACC/AHA 2023)",
      crclLess10: "CrCl under 10: individualize (label)",
      hd: "Partly removed by dialysis; no specific dosing advice in label"
    },
    renalAdjust: true,
    hepaticAdjustment: "No change in clearance in hepatic impairment.",
    cautionsAndWarnings: [
      "BOXED WARNING: life-threatening VT with QT prolongation. Start or restart where resuscitation and continuous ECG are available. If QT reaches 500 ms or more, reduce the dose, lengthen the interval or stop. Adjust the interval to CrCl.",
      "Withdraw other antiarrhythmics first (monitor 2-3 half-lives).",
      "Avoid in minimally symptomatic or easily reversible AF/flutter.",
      "Hemodialysis lowers levels in overdose (no protein binding)."
    ],
    contraindications: [
      "Sinus bradycardia, sick sinus syndrome, second- or third-degree AV block without a pacemaker",
      "Congenital or acquired long QT syndromes",
      "Cardiogenic shock or decompensated heart failure",
      "Serum potassium under 4 mEq/L",
      "Bronchial asthma or related bronchospastic conditions",
      "For AF/flutter: baseline QT over 450 ms",
      "Hypersensitivity"
    ],
    adverseEffects: ["ACC/AHA 2023 list: AV block, bradycardia, bronchospasm, diarrhea, worse heart failure, fatigue, nausea and vomiting, QT prolongation, torsades de pointes"],
    monitoring: ["Continuous ECG for at least 3 days at start; QTc 2-4 h after each dose increase", "Potassium, magnesium and CrCl before starting", "ACC/AHA 2023: ECG, K, Mg, creatinine at 3-6 months, then every 3-6 months"],
    interactions: ["Digoxin, calcium channel blockers: more bradycardia, hypotension, heart failure", "Antacids within 2 h before a dose: absorption down about 20-26%", "Other QT-prolonging antiarrhythmics: withdraw before starting"],
    safeInHfref: false,
    safeCad: null,
    qtRisk: "Boxed",
    nlem: { list: null },
    refs: {
      mech: ["acc23-af#Table 23"],
      dose: ["lbl:sotalol-betapace#Dosage and Administration", "lbl:sotalol-iv#Dosage and Administration", "acc23-af#Table 23"],
      pk: ["lbl:sotalol-betapace#Clinical Pharmacology"],
      renal: ["lbl:sotalol-betapace#Dosage and Administration 2.5", "acc23-af#Table 23"],
      hepatic: ["lbl:sotalol-betapace#Clinical Pharmacology"],
      warn: ["lbl:sotalol-betapace#Boxed Warning, Indications, Dosage and Administration, Overdosage"],
      contra: ["lbl:sotalol-betapace#Contraindications"],
      adverse: ["acc23-af#Table 23"],
      monitor: ["lbl:sotalol-betapace#Dosage and Administration", "acc23-af#Table 25"],
      interact: ["lbl:sotalol-betapace#Drug Interactions, Clinical Pharmacology"],
      flags: ["lbl:sotalol-betapace#Contraindications (decompensated heart failure), Boxed Warning"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "dronedarone",
    genericName: "Dronedarone",
    brandNames: ["Multaq"],
    vwClass: "III",
    classFullName: "Class III - Multichannel Blocker (non-iodinated)",
    color: "purple",
    primaryTarget: "ACC/AHA 2023: inhibits IKr, IKs, INa, IKur, Ito, ICa-L, IKAch; noncompetitive beta-blocker",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Increased about 12 ms (400 mg twice daily)", qrs: "Unknown", qtc: "QTcF increased about 15 ms; stop if over 500 ms", hr: "Bradycardia" },
    indications: ["af_rhythm"],
    routes: ["PO"],
    acuteDose: {
      en: "Not for acute conversion (maintenance drug only).",
      th: "ไม่ใช้แปลงจังหวะเฉียบพลัน (ใช้คงจังหวะระยะยาวเท่านั้น)"
    },
    maintenanceDose: {
      en: "400 mg twice daily with the morning and evening meals. Stop Class I or III antiarrhythmics and strong CYP3A inhibitors before starting. Indication: reduce AF hospitalization in patients in sinus rhythm with a history of paroxysmal or persistent AF.",
      th: "400 มก. วันละ 2 ครั้ง พร้อมอาหารเช้าและเย็น หยุดยาต้านหัวใจเต้นผิดจังหวะ Class I หรือ III และยายับยั้ง CYP3A แรงก่อนเริ่ม ข้อบ่งใช้: ลดการนอนโรงพยาบาลจาก AF ในผู้ป่วยที่อยู่ในจังหวะไซนัสและเคยเป็น AF ชนิด paroxysmal หรือ persistent"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "13-19 h",
      metabolism: "CYP3A substrate; moderate CYP3A and CYP2D6 inhibitor; P-gp substrate and inhibitor",
      excretion: "Low renal excretion; inhibits tubular creatinine secretion (OCT2), so serum creatinine may rise without a GFR change"
    },
    renalAdjustment: {
      crcl50: "No adjustment (no PK difference in renal impairment)",
      crcl30_50: "No adjustment (no PK difference in renal impairment)",
      crcl10_30: "No adjustment (no PK difference in mild to severe renal impairment)",
      crclLess10: "Unknown",
      hd: "Unknown"
    },
    renalAdjust: false,
    hepaticAdjustment: "Contraindicated in severe hepatic impairment. Liver injury reported: consider periodic liver enzymes, especially in the first 6 months; do not restart after unexplained liver injury.",
    cautionsAndWarnings: [
      "BOXED WARNING: doubles the risk of death in symptomatic heart failure with recent decompensation needing hospitalization, or NYHA class IV.",
      "BOXED WARNING: in permanent AF, doubles the risk of death, stroke and heart-failure hospitalization; contraindicated if sinus rhythm will not or cannot be restored.",
      "New or worsening heart failure; liver injury; pulmonary toxicity (stop if confirmed).",
      "Low K or Mg with potassium-depleting diuretics.",
      "QT prolongation: stop if QTc over 500 ms.",
      "INR rises (to 5 or more) in warfarin users, usually within 1 week: monitor INR."
    ],
    contraindications: [
      "Permanent AF",
      "Symptomatic heart failure with recent decompensation needing hospitalization, or NYHA class IV",
      "Second- or third-degree AV block or sick sinus syndrome without a pacemaker",
      "Bradycardia under 50 bpm",
      "Strong CYP3A inhibitors (e.g. ketoconazole, itraconazole, voriconazole, cyclosporine, clarithromycin, ritonavir) or erythromycin",
      "QT-prolonging drugs (e.g. phenothiazines, tricyclics, some oral macrolides, Class I and III antiarrhythmics)",
      "Liver or lung toxicity from prior amiodarone",
      "QTc over 500 ms or PR over 280 ms",
      "Severe hepatic impairment",
      "Hypersensitivity"
    ],
    adverseEffects: ["Most common (2% or more): diarrhea, nausea, abdominal pain, vomiting, dyspepsia, bradycardia, skin reactions, asthenia"],
    monitoring: ["12-lead ECG (QTc, PR, rhythm: stop if AF becomes permanent)", "Liver enzymes, especially in the first 6 months (ACC/AHA 2023: baseline and within 6 months)", "INR if on warfarin", "K and Mg with diuretics"],
    interactions: ["Digoxin: consider stopping; if continued, halve the dose and monitor levels", "Dabigatran: higher levels; reduce dabigatran to 75 mg twice daily if CrCl 30-50, avoid if CrCl 15-30", "Simvastatin: avoid more than 10 mg daily", "Warfarin: INR rises; monitor", "Grapefruit juice: avoid", "CYP3A inducers (rifampin, St John's wort, phenytoin): lower dronedarone (ACC/AHA 2023)"],
    safeInHfref: false,
    safeCad: true,
    qtRisk: "Warning",
    nlem: { list: null },
    refs: {
      mech: ["acc23-af#Table 23", "lbl:dronedarone-multaq#Clinical Pharmacology"],
      dose: ["lbl:dronedarone-multaq#Indications, Dosage and Administration"],
      pk: ["lbl:dronedarone-multaq#Clinical Pharmacology", "acc23-af#Table 23"],
      renal: ["lbl:dronedarone-multaq#Use in Specific Populations, Clinical Pharmacology"],
      hepatic: ["lbl:dronedarone-multaq#Contraindications, Warnings and Precautions"],
      warn: ["lbl:dronedarone-multaq#Boxed Warning, Warnings and Precautions"],
      contra: ["lbl:dronedarone-multaq#Contraindications"],
      adverse: ["lbl:dronedarone-multaq#Adverse Reactions"],
      monitor: ["lbl:dronedarone-multaq#Warnings and Precautions", "acc23-af#Table 25"],
      interact: ["lbl:dronedarone-multaq#Drug Interactions", "acc23-af#Table 23"],
      flags: ["lbl:dronedarone-multaq#Boxed Warning (decompensated / NYHA IV heart failure)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "ibutilide",
    genericName: "Ibutilide",
    brandNames: ["Corvert"],
    vwClass: "III",
    classFullName: "Class III - IV Agent for AF/Flutter Conversion",
    color: "purple",
    primaryTarget: "Delays repolarization by activating a slow inward (mainly sodium) current rather than blocking outward potassium currents (ACC/AHA 2023: inhibits IKr and augments late INa)",
    actionPotential: { phase0: "Unknown", apd: "Prolonged", erp: "Atrial and ventricular refractoriness increased" },
    ecgEffects: { pr: "Unknown", qrs: "Unknown", qtc: "Prolonged (stop infusion if marked)", hr: "Unknown" },
    indications: ["af_rhythm"],
    routes: ["IV"],
    acuteDose: {
      en: "Recent-onset AF or atrial flutter: 60 kg or more, 1 mg over 10 min; under 60 kg, 0.01 mg/kg over 10 min. If not converted within 10 min after the end of the first infusion, a second equal 10-min infusion may be given. Stop as soon as the arrhythmia ends, or for any VT or marked QT/QTc prolongation. Correct low K and Mg first. AF longer than 2-3 days needs adequate anticoagulation (generally at least 2 weeks) before use.",
      th: "AF หรือ atrial flutter ที่เพิ่งเกิด: น้ำหนัก 60 กก. ขึ้นไป 1 มก. ใน 10 นาที; น้อยกว่า 60 กก. 0.01 มก./กก. ใน 10 นาที ถ้าไม่กลับจังหวะภายใน 10 นาทีหลังจบครั้งแรก ให้ครั้งที่สองขนาดเท่าเดิมใน 10 นาทีได้ หยุดทันทีเมื่อหัวใจเต้นผิดจังหวะสิ้นสุด หรือเกิด VT หรือ QT/QTc ยาวมาก แก้โพแทสเซียมและแมกนีเซียมต่ำก่อน AF ที่เป็นนานกว่า 2-3 วันต้องได้ยาต้านการแข็งตัวของเลือดเพียงพอ (โดยทั่วไปอย่างน้อย 2 สัปดาห์) ก่อนใช้"
    },
    maintenanceDose: {
      en: "None (acute conversion only).",
      th: "ไม่มี (ใช้แปลงจังหวะเฉียบพลันเท่านั้น)"
    },
    pharmacokinetics: {
      onset: "Conversion in 30-90 min (ACC/AHA 2023)",
      peak: "Unknown",
      halfLife: "About 6 h (2-12 h)",
      metabolism: "Omega-oxidation then beta-oxidation; one active metabolite (under 10% of parent levels)",
      excretion: "About 82% in urine (7% unchanged), 19% in feces"
    },
    renalAdjustment: {
      crcl50: "No adjustment (clearance independent of CrCl 21-140 mL/min)",
      crcl30_50: "No adjustment (clearance independent of CrCl 21-140 mL/min)",
      crcl10_30: "Dose adjustment unlikely to be needed (label)",
      crclLess10: "Unknown",
      hd: "Unknown"
    },
    renalAdjust: false,
    hepaticAdjustment: "Dose adjustment unlikely to be needed for the short infusion (label), but monitor.",
    cautionsAndWarnings: [
      "BOXED WARNING: potentially fatal arrhythmias, mainly sustained polymorphic VT (torsades), in 1.7% needing cardioversion. Give only with continuous ECG monitoring and staff trained to treat it; defibrillator at hand.",
      "Higher polymorphic VT risk with heart failure or low ejection fraction.",
      "Nonsustained polymorphic VT in 2.7%.",
      "Torsades risk rises with QT prolongation, bradycardia, varying heart rate and hypokalemia.",
      "Trials withheld Class I and other Class III drugs for 5 half-lives before and 4 h after the infusion."
    ],
    contraindications: [
      "Hypersensitivity to ibutilide (the only labeled contraindication)",
      "Trials excluded QTc over 440 ms and potassium under 4.0 mEq/L"
    ],
    adverseEffects: ["Sustained polymorphic VT 1.7%", "Nonsustained polymorphic VT 2.7%", "Nonsustained monomorphic VT", "Hypotension"],
    monitoring: ["Continuous ECG for at least 4 h after infusion or until QTc returns to baseline (longer if arrhythmia)", "K and Mg before infusion (ACC/AHA 2023)", "Defibrillator and resuscitation ready"],
    interactions: ["Class Ia and other Class III antiarrhythmics: withheld 5 half-lives before and 4 h after in trials", "Other QT-prolonging drugs: torsades risk"],
    safeInHfref: false,
    safeCad: null,
    qtRisk: "Boxed",
    nlem: { list: null },
    refs: {
      mech: ["lbl:ibutilide-corvert#Clinical Pharmacology", "acc23-af#Table 23"],
      dose: ["lbl:ibutilide-corvert#Dosage and Administration, Boxed Warning, Precautions", "acc23-af#Table 22"],
      pk: ["lbl:ibutilide-corvert#Clinical Pharmacology", "acc23-af#Table 22"],
      renal: ["lbl:ibutilide-corvert#Clinical Pharmacology"],
      hepatic: ["lbl:ibutilide-corvert#Clinical Pharmacology"],
      warn: ["lbl:ibutilide-corvert#Boxed Warning, Warnings"],
      contra: ["lbl:ibutilide-corvert#Contraindications, Warnings"],
      adverse: ["lbl:ibutilide-corvert#Adverse Reactions"],
      monitor: ["lbl:ibutilide-corvert#Dosage and Administration", "acc23-af#Table 25"],
      interact: ["lbl:ibutilide-corvert#Precautions"],
      flags: ["lbl:ibutilide-corvert#Warnings (heart failure or low EF: more polymorphic VT)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "dofetilide",
    genericName: "Dofetilide",
    brandNames: ["Tikosyn"],
    vwClass: "III",
    classFullName: "Class III - IKr Blocker",
    color: "purple",
    primaryTarget: "ACC/AHA 2023: inhibits IKr and augments late INa",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Unknown", qrs: "Unknown", qtc: "Prolonged, dose-related (adjust if over 15% rise or over 500 ms)", hr: "No data below 50 bpm" },
    indications: ["af_rhythm"],
    routes: ["PO"],
    acuteDose: {
      en: "Start (or restart) only in hospital with continuous ECG for at least 3 days, CrCl calculated and resuscitation available; not discharged within 12 h of conversion. Step 1: QTc (or QT if HR under 60) must be 440 ms or less (500 ms with ventricular conduction abnormalities). Step 2: dose by CrCl (see maintenance). 2-3 h after the first dose: if QTc rose more than 15% or exceeds 500 ms (550 ms), reduce (500 to 250 mcg twice daily, 250 to 125 twice daily, 125 twice daily to 125 once daily). If QTc exceeds 500 ms (550 ms) after the second dose, stop.",
      th: "เริ่ม (หรือเริ่มใหม่) ในโรงพยาบาลเท่านั้น ติดตาม ECG ต่อเนื่องอย่างน้อย 3 วัน คำนวณ CrCl และพร้อมกู้ชีพ ไม่ให้กลับบ้านภายใน 12 ชม. หลังกลับจังหวะ. ขั้น 1: QTc (หรือ QT ถ้าชีพจรต่ำกว่า 60) ต้องไม่เกิน 440 ms (500 ms ถ้ามีการนำไฟฟ้าในหัวใจห้องล่างผิดปกติ). ขั้น 2: ขนาดตาม CrCl (ดูขนาดต่อเนื่อง). 2-3 ชม. หลังครั้งแรก: ถ้า QTc เพิ่มเกิน 15% หรือเกิน 500 ms (550 ms) ให้ลดขนาด (500 เป็น 250 มคก. วันละ 2 ครั้ง; 250 เป็น 125 วันละ 2 ครั้ง; 125 วันละ 2 ครั้ง เป็น 125 วันละครั้ง) ถ้า QTc เกิน 500 ms (550 ms) หลังครั้งที่สอง ให้หยุดยา"
    },
    maintenanceDose: {
      en: "Usual 500 mcg twice daily, by CrCl: over 60 mL/min 500 mcg twice daily; 40-60 250 mcg twice daily; 20-40 125 mcg twice daily; under 20 contraindicated. Keep potassium in the normal range.",
      th: "ปกติ 500 มคก. วันละ 2 ครั้ง ตาม CrCl: เกิน 60 มล./นาที 500 มคก. วันละ 2 ครั้ง; 40-60 250 มคก. วันละ 2 ครั้ง; 20-40 125 มคก. วันละ 2 ครั้ง; ต่ำกว่า 20 ห้ามใช้ รักษาระดับโพแทสเซียมให้ปกติ"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "About 10 h (longer with lower CrCl); steady state in 2-3 days",
      metabolism: "Small extent by CYP3A4; not a CYP inhibitor",
      excretion: "About 80% in urine (80% of that unchanged) by glomerular filtration and cationic renal secretion"
    },
    renalAdjustment: {
      crcl50: "CrCl over 60: 500 mcg twice daily. CrCl 40-60: 250 mcg twice daily",
      crcl30_50: "CrCl 40-60: 250 mcg twice daily. CrCl 20-40: 125 mcg twice daily",
      crcl10_30: "CrCl 20-40: 125 mcg twice daily. CrCl under 20: contraindicated",
      crclLess10: "Contraindicated (CrCl under 20)",
      hd: "Contraindicated (CrCl under 20)"
    },
    renalAdjust: true,
    hepaticAdjustment: "No extra adjustment in mild or moderate hepatic impairment (Child-Pugh A, B) after CrCl dosing; severe impairment not studied.",
    cautionsAndWarnings: [
      "BOXED WARNING: start or restart for at least 3 days in a facility that can calculate CrCl, monitor ECG continuously and resuscitate.",
      "Torsades de pointes 0.8% in the supraventricular arrhythmia population; higher with verapamil.",
      "Keep potassium normal; hypokalemia and potassium-depleting diuretics raise risk.",
      "DIAMOND CHF/MI trials (significant heart disease): no more deaths than placebo."
    ],
    contraindications: [
      "Congenital or acquired long QT syndromes",
      "Baseline QT or QTc over 440 ms (500 ms with ventricular conduction abnormalities)",
      "CrCl under 20 mL/min",
      "Verapamil, cimetidine, trimethoprim (alone or with sulfamethoxazole), ketoconazole, hydrochlorothiazide (alone or with triamterene)",
      "Should not be used with prochlorperazine, dolutegravir, megestrol",
      "Hypersensitivity"
    ],
    adverseEffects: ["Torsades de pointes 0.8% (supraventricular arrhythmia population)", "ACC/AHA 2023: QT prolongation, TdP"],
    monitoring: ["Continuous ECG for at least 3 days; QTc 2-3 h after each in-hospital dose", "CrCl and potassium before starting and during therapy", "ACC/AHA 2023: ECG, K, Mg, creatinine at 3-6 months, then every 3-6 months"],
    interactions: ["Contraindicated: verapamil, cimetidine, trimethoprim, ketoconazole, hydrochlorothiazide", "Avoid: prochlorperazine, dolutegravir, megestrol (renal cation transport inhibitors)", "CYP3A4 inhibitors: may raise exposure"],
    safeInHfref: true,
    safeCad: true,
    qtRisk: "Boxed",
    nlem: { list: null },
    refs: {
      mech: ["acc23-af#Table 23"],
      dose: ["lbl:dofetilide-tikosyn#Dosage and Administration", "acc23-af#Table 23"],
      pk: ["lbl:dofetilide-tikosyn#Clinical Pharmacology"],
      renal: ["lbl:dofetilide-tikosyn#Dosage and Administration, Contraindications", "acc23-af#Table 23"],
      hepatic: ["lbl:dofetilide-tikosyn#Dosage and Administration, Clinical Pharmacology"],
      warn: ["lbl:dofetilide-tikosyn#Boxed Warning, Warnings, Adverse Reactions"],
      contra: ["lbl:dofetilide-tikosyn#Contraindications"],
      adverse: ["lbl:dofetilide-tikosyn#Adverse Reactions", "acc23-af#Table 23"],
      monitor: ["lbl:dofetilide-tikosyn#Dosage and Administration", "acc23-af#Table 25"],
      interact: ["lbl:dofetilide-tikosyn#Contraindications, Precautions"],
      flags: ["lbl:dofetilide-tikosyn#Warnings (DIAMOND CHF/MI mortality neutral)"],
      nlem: ["nlem2569"]
    }
  }
];
