// --- Drug records, part 4: Class IV and other agents --- (see drugs-1.js for the conventions)
const DRUGS_PART_4 = [
  {
    id: "diltiazem",
    genericName: "Diltiazem",
    brandNames: ["Cardizem"],
    vwClass: "IV",
    classFullName: "Class IV - Non-Dihydropyridine Calcium Channel Blocker",
    color: "emerald",
    primaryTarget: "Calcium channel blocker; slows AV nodal conduction without prolonging accessory-pathway refractoriness",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "First-degree AV block possible", qrs: "Unknown", qtc: "Unknown", hr: "Ventricular rate in AF/flutter reduced by 20% or more in 95% after a bolus" },
    indications: ["af_rate", "svt"],
    routes: ["IV", "PO"],
    acuteDose: {
      en: "AF/flutter rate control or PSVT conversion (label): 0.25 mg/kg actual body weight IV over 2 min (about 20 mg); if inadequate after 15 min, 0.35 mg/kg over 2 min (about 25 mg). Try vagal maneuvers first for PSVT. Continuous ECG and frequent BP; defibrillator available.\nInfusion for AF/flutter: start 10 mg/h (some respond to 5 mg/h), increase by 5 mg/h to a maximum of 15 mg/h, for up to 24 h. AHA 2025: 5-10 mg/h; ACC/AHA 2023: 5-15 mg/h; avoid in HFrEF, hypotension, cardiomyopathy and ACS (AHA 2025).",
      th: "ควบคุมอัตราเต้นใน AF/flutter หรือแปลง PSVT (ฉลากยา): 0.25 มก./กก. ตามน้ำหนักจริง IV ใน 2 นาที (ประมาณ 20 มก.) ถ้าไม่พอหลัง 15 นาที ให้ 0.35 มก./กก. ใน 2 นาที (ประมาณ 25 มก.) สำหรับ PSVT ให้ลอง vagal maneuver ก่อน ติดตาม ECG ต่อเนื่องและวัดความดันบ่อย มีเครื่องช็อกไฟฟ้าพร้อม\nหยดต่อเนื่องใน AF/flutter: เริ่ม 10 มก./ชม. (บางรายใช้ 5 มก./ชม. ได้) เพิ่มครั้งละ 5 มก./ชม. สูงสุด 15 มก./ชม. นานไม่เกิน 24 ชม. AHA 2025: 5-10 มก./ชม.; ACC/AHA 2023: 5-15 มก./ชม. หลีกเลี่ยงใน HFrEF ความดันต่ำ cardiomyopathy และ ACS (AHA 2025)"
    },
    maintenanceDose: {
      en: "Oral AF rate control (ACC/AHA 2023): 120-360 mg daily as extended-release. Cardizem CD label: switch at the nearest equivalent total daily dose; limited experience above 360 mg.",
      th: "ยารับประทานควบคุมอัตราเต้นใน AF (ACC/AHA 2023): 120-360 มก./วัน ชนิดออกฤทธิ์นาน. ฉลาก Cardizem CD: เปลี่ยนเป็นขนาดรวมต่อวันที่ใกล้เคียงที่สุด ประสบการณ์เกิน 360 มก. มีจำกัด"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "ACC/AHA 2023: IV 3-5 h; oral immediate-release 3-4.5 h; ER 4-9.5 h. Non-linear kinetics (infusions over 15 mg/h or 24 h not studied)",
      metabolism: "Extensive hepatic metabolism (CYP3A4); inhibits CYP3A4",
      excretion: "Kidneys and bile (as metabolites)"
    },
    renalAdjustment: {
      crcl50: "Unknown (no dose rule in label)",
      crcl30_50: "Unknown (no dose rule in label)",
      crcl10_30: "Unknown (no dose rule in label)",
      crclLess10: "Unknown (no dose rule in label)",
      hd: "Unknown"
    },
    renalAdjust: null,
    hepaticAdjustment: "Unknown (no dose rule; extensively metabolized by the liver; acute hepatic injury reported rarely with oral use).",
    cautionsAndWarnings: [
      "AF/flutter with an accessory pathway (WPW, short PR): contraindicated; may cause a life-threatening rise in heart rate.",
      "Wide-complex tachycardia: confirm supraventricular origin first; calcium channel blockers in VT caused deterioration and VF.",
      "Hypotension is the most common adverse event (may last 1-3 h).",
      "Worsening heart failure reported in pre-existing impaired ventricular function.",
      "Do not give IV beta-blockers together or within a few hours."
    ],
    contraindications: [
      "Sick sinus syndrome or second- or third-degree AV block without a functioning ventricular pacemaker",
      "Severe hypotension or cardiogenic shock",
      "IV beta-blockers given together or within a few hours",
      "AF or flutter with an accessory bypass tract (WPW, short PR syndrome)",
      "Ventricular tachycardia",
      "Hypersensitivity"
    ],
    adverseEffects: ["Hypotension (most common; symptomatic about 3%)", "Bradycardia, AV block, asystole, sinus pause (under 1%)", "Worsening heart failure (rare)"],
    monitoring: ["Continuous ECG and frequent blood pressure, especially during infusion", "Heart rate response"],
    interactions: ["IV beta-blockers: do not combine within a few hours", "CYP3A4 substrates: midazolam and triazolam AUC 3-4 fold; cyclosporine dose reductions of 15-48% needed", "CYP3A4 inducers (rifampin): avoid", "Drugs lowering BP, contractility or conduction: additive"],
    safeInHfref: false,
    safeCad: null,
    qtRisk: "None",
    nlem: { list: "b", old: "new 2569", items: [{ form: "Diltiazem HCl sterile pwdr (injection)", cond: "ใช้สำหรับ supraventricular tachyarrhythmia ซึ่งรวมทั้งการควบคุมอัตราการเต้นของหัวใจในภาวะ atrial fibrillation ที่ต้องการฤทธิ์ของยานาน 4-6 ชั่วโมง และไม่มีข้อห้ามใช้ calcium channel blockers" }, { form: "Diltiazem HCl SR cap / SR tab 120 mg; IR tab", cond: "ใช้สำหรับ ischemic heart disease (IHD) (IR: ไม่แนะนำให้ใช้ในการรักษา essential hypertension)" }] },
    refs: {
      mech: ["lbl:diltiazem-inj#Indications, Contraindications"],
      dose: ["lbl:diltiazem-inj#Dosage and Administration, Indications", "aha25-als#Table (AF/AFL rate control)", "acc23-af#Table 21", "lbl:diltiazem-cardizem#Dosage and Administration"],
      pk: ["acc23-af#Table 21", "lbl:diltiazem-inj#Clinical Pharmacology, Dosage and Administration"],
      renal: ["lbl:diltiazem-inj#Precautions"],
      hepatic: ["lbl:diltiazem-inj#Precautions"],
      warn: ["lbl:diltiazem-inj#Contraindications, Warnings"],
      contra: ["lbl:diltiazem-inj#Contraindications"],
      adverse: ["lbl:diltiazem-inj#Adverse Reactions"],
      monitor: ["lbl:diltiazem-inj#Indications"],
      interact: ["lbl:diltiazem-inj#Precautions: Drug Interactions"],
      flags: ["acc23-af#Table 21 (avoid in HFrEF)", "aha25-als#Table (avoid in heart failure, cardiomyopathy, ACS)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "verapamil",
    genericName: "Verapamil",
    brandNames: ["Calan", "Isoptin"],
    vwClass: "IV",
    classFullName: "Class IV - Non-Dihydropyridine Calcium Channel Blocker",
    color: "emerald",
    primaryTarget: "Calcium channel blocker (slow channel); depresses AV conduction and myocardial contractility",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Unknown", qrs: "Unknown", qtc: "Unknown", hr: "Ventricular rate in AF/flutter down 20% or more in about 70%; lasts 30-60 min after a dose" },
    indications: ["svt", "af_rate"],
    routes: ["IV", "PO"],
    acuteDose: {
      en: "Label (IV, slow over at least 2 min, 3 min in older patients, with continuous ECG and BP): 5-10 mg (0.075-0.15 mg/kg); repeat 10 mg (0.15 mg/kg) after 30 min if response inadequate. PSVT: about 60% convert within 10 min. Try vagal maneuvers first.\nAHA 2025 (AF/flutter rate control): 0.075-0.15 mg/kg over 2 min, may repeat after 30 min; infusion 0.005 mg/kg/min. ACC/AHA 2023: 5-10 mg over at least 2 min (may repeat twice), then 5 mg/h (max 20 mg/h). Avoid in HFrEF, hypotension, cardiomyopathy and ACS.",
      th: "ฉลากยา (IV ฉีดช้าอย่างน้อย 2 นาที ผู้สูงอายุ 3 นาที ติดตาม ECG และความดันต่อเนื่อง): 5-10 มก. (0.075-0.15 มก./กก.) ให้ซ้ำ 10 มก. (0.15 มก./กก.) หลัง 30 นาที ถ้ายังไม่พอ PSVT กลับจังหวะประมาณ 60% ใน 10 นาที ลอง vagal maneuver ก่อน\nAHA 2025 (ควบคุมอัตราเต้นใน AF/flutter): 0.075-0.15 มก./กก. ใน 2 นาที ซ้ำได้หลัง 30 นาที หยดต่อเนื่อง 0.005 มก./กก./นาที. ACC/AHA 2023: 5-10 มก. อย่างน้อย 2 นาที (ซ้ำได้ 2 ครั้ง) แล้ว 5 มก./ชม. (สูงสุด 20 มก./ชม.) หลีกเลี่ยงใน HFrEF ความดันต่ำ cardiomyopathy และ ACS"
    },
    maintenanceDose: {
      en: "Tablet label: chronic AF with digitalis 240-320 mg/day in 3-4 divided doses; PSVT prophylaxis 240-480 mg/day in 3-4 doses; max 480 mg/day. ACC/AHA 2023: 180-480 mg daily as extended-release.",
      th: "ฉลากยาเม็ด: AF เรื้อรังร่วมกับ digitalis 240-320 มก./วัน แบ่ง 3-4 ครั้ง; ป้องกัน PSVT 240-480 มก./วัน แบ่ง 3-4 ครั้ง; สูงสุด 480 มก./วัน. ACC/AHA 2023: 180-480 มก./วัน ชนิดออกฤทธิ์นาน"
    },
    pharmacokinetics: {
      onset: "PSVT conversion within 10 min in about 60% (IV)",
      peak: "Unknown",
      halfLife: "IV: distribution about 4 min, terminal 2-5 h (longer in the elderly and with chronic dosing); 14-16 h in severe liver dysfunction",
      metabolism: "Extensive hepatic metabolism",
      excretion: "About 70% as metabolites in urine, 3-4% unchanged, 16% or more in feces. Not removed by hemodialysis."
    },
    renalAdjustment: {
      crcl50: "Unknown (no dose rule)",
      crcl30_50: "No dose rule; use cautiously in impaired renal function",
      crcl10_30: "No dose rule; use cautiously in impaired renal function",
      crclLess10: "No dose rule; renal failure may prolong the effect of an IV dose",
      hd: "Not removed by hemodialysis"
    },
    renalAdjust: false,
    hepaticAdjustment: "Severe liver dysfunction (oral): give about 30% of the usual dose. IV: hepatic failure may prolong the effect of a single dose.",
    cautionsAndWarnings: [
      "AF or flutter with an accessory pathway (WPW, LGL): contraindicated (risk of VF).",
      "Wide-complex VT (QRS 0.12 s or more): marked deterioration and VF; confirm the diagnosis first.",
      "Do not combine with IV beta-blockers or give within a few hours of each other.",
      "Hypotension (usually transient); heart failure in severe cardiomyopathy.",
      "Disopyramide: not within 48 h before or 24 h after verapamil."
    ],
    contraindications: [
      "Severe hypotension or cardiogenic shock",
      "Second- or third-degree AV block or sick sinus syndrome without a ventricular pacemaker",
      "Severe heart failure (unless caused by an SVT that verapamil can treat)",
      "Patients receiving IV beta-blockers",
      "AF or flutter with an accessory bypass tract",
      "Ventricular tachycardia (wide QRS)",
      "Hypersensitivity"
    ],
    adverseEffects: ["Hypotension (usually transient, may cause dizziness)", "Bradycardia, AV block", "Constipation (oral)"],
    monitoring: ["Continuous ECG and blood pressure during IV dosing", "Digoxin levels if co-prescribed"],
    interactions: ["Digoxin: levels up 50-75% in the first week (oral verapamil); digitalis toxicity risk", "IV beta-blockers: contraindicated together", "Disopyramide: separate by 48 h before / 24 h after", "Dantrolene (IV): cardiovascular collapse in animals", "Dofetilide: contraindicated (dofetilide label)"],
    safeInHfref: false,
    safeCad: null,
    qtRisk: "None",
    nlem: { list: "b", old: "ก", items: [{ form: "Verapamil HCl tab; SR tab 240 mg (no injection listed)", cond: "1. ischemic heart disease (IHD) 2. essential hypertension" }] },
    refs: {
      mech: ["lbl:verapamil-inj#Indications, Warnings"],
      dose: ["lbl:verapamil-inj#Dosage and Administration, Indications", "aha25-als#Table (AF/AFL rate control)", "acc23-af#Table 21", "lbl:verapamil-tab#Dosage and Administration"],
      pk: ["lbl:verapamil-inj#Clinical Pharmacology", "lbl:verapamil-tab#Clinical Pharmacology, Precautions"],
      renal: ["lbl:verapamil-tab#Precautions", "lbl:verapamil-inj#Warnings, Overdosage"],
      hepatic: ["lbl:verapamil-tab#Precautions", "lbl:verapamil-inj#Warnings"],
      warn: ["lbl:verapamil-inj#Contraindications, Warnings, Precautions"],
      contra: ["lbl:verapamil-inj#Contraindications"],
      adverse: ["lbl:verapamil-inj#Warnings, Adverse Reactions"],
      monitor: ["lbl:verapamil-inj#Dosage and Administration"],
      interact: ["lbl:verapamil-inj#Precautions: Drug Interactions", "lbl:verapamil-tab#Precautions", "lbl:dofetilide-tikosyn#Contraindications"],
      flags: ["acc23-af#Table 21 (avoid in HFrEF)", "aha25-als#Table (avoid in heart failure, cardiomyopathy, ACS)"],
      nlem: ["nlem2569"]
    }
  },

  // --- OTHER AGENTS ---
  {
    id: "adenosine",
    genericName: "Adenosine",
    brandNames: ["Adenocard"],
    vwClass: "Other",
    classFullName: "Other - Adenosine Receptor Agonist (AV-node blocker)",
    color: "sky",
    primaryTarget: "Slows conduction through the AV node and can interrupt AV-nodal reentry",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "AV conduction slowed (transient AV block)", qrs: "Unknown", qtc: "Unknown", hr: "PSVT terminates; transient slowing of the ventricular response in AF/flutter" },
    indications: ["svt"],
    routes: ["IV"],
    acuteDose: {
      en: "PSVT (label and AHA 2025): 6 mg rapid IV bolus over 1-2 s, straight into a vein or as close to the patient as possible, followed by a rapid saline flush. If no termination within 1-2 min: 12 mg rapid bolus; the 12 mg dose may be repeated once (label). Try vagal maneuvers first. AHA 2025: in wide-QRS tachycardia, only if regular and monomorphic.",
      th: "PSVT (ฉลากยาและ AHA 2025): 6 มก. ฉีด IV เร็วใน 1-2 วินาที เข้าหลอดเลือดดำโดยตรงหรือใกล้ตัวผู้ป่วยที่สุด ตามด้วย NSS flush ทันที ถ้าไม่หยุดใน 1-2 นาที: 12 มก. ฉีดเร็ว ให้ 12 มก. ซ้ำได้อีก 1 ครั้ง (ฉลากยา) ลอง vagal maneuver ก่อน AHA 2025: ใน wide-QRS tachycardia ใช้เฉพาะเมื่อจังหวะสม่ำเสมอและ QRS รูปเดียว"
    },
    maintenanceDose: {
      en: "None (acute use only).",
      th: "ไม่มี (ใช้เฉียบพลันเท่านั้น)"
    },
    pharmacokinetics: {
      onset: "Unknown (PSVT should end within 1-2 min of a dose)",
      peak: "Unknown",
      halfLife: "Under 10 seconds",
      metabolism: "Cellular uptake; excess deaminated by adenosine deaminase",
      excretion: "Needs no hepatic or renal function"
    },
    renalAdjustment: {
      crcl50: "No adjustment (no renal function needed)",
      crcl30_50: "No adjustment (no renal function needed)",
      crcl10_30: "No adjustment (no renal function needed)",
      crclLess10: "No adjustment (no renal function needed)",
      hd: "No adjustment (no renal function needed)"
    },
    renalAdjust: false,
    hepaticAdjustment: "No adjustment (no hepatic function needed).",
    cautionsAndWarnings: [
      "Does not convert atrial flutter, atrial fibrillation or VT to sinus rhythm.",
      "Asthma: mild-moderate worsening reported; use with caution in obstructive lung disease.",
      "Reported after use: prolonged asystole, VT, VF, atrial fibrillation, torsades, bronchospasm, seizures.",
      "Central venous administration has not been studied.",
      "Methylxanthines (caffeine, theophylline) antagonize it; dipyridamole potentiates it."
    ],
    contraindications: [
      "Second- or third-degree AV block without a pacemaker",
      "Sinus node disease (sick sinus syndrome, symptomatic bradycardia) without a pacemaker",
      "Known hypersensitivity"
    ],
    adverseEffects: ["Facial flushing (18%)", "Shortness of breath/dyspnea (12%)", "Chest pressure (7%)", "Nausea (3%)", "Lightheadedness, headache (2%)"],
    monitoring: ["Continuous ECG during and after the bolus", "Resuscitation equipment at hand (asystole, VF reported)"],
    interactions: ["Caffeine, theophylline: larger doses may be needed or adenosine may not work", "Dipyridamole: effect potentiated", "Carbamazepine: higher degrees of heart block"],
    safeInHfref: true,
    safeCad: null,
    qtRisk: "None",
    nlem: { list: "b", old: "ก", items: [{ form: "Adenosine sterile sol", cond: "1. ใช้สำหรับรักษา supraventricular tachycardia 2. ฉีดเข้าหลอดเลือดหัวใจเพื่อรักษาภาวะ no reflow ใน PCI เมื่อมีข้อห้ามใช้หรือไม่มี verapamil 3. ใช้สำหรับการตรวจพิเศษทางหัวใจ" }] },
    refs: {
      mech: ["lbl:adenosine-generic#Clinical Pharmacology: Mechanism of Action"],
      dose: ["lbl:adenosine-generic#Dosage and Administration, Indications", "aha25-tachy"],
      pk: ["lbl:adenosine-generic#Clinical Pharmacology, Overdosage"],
      renal: ["lbl:adenosine-generic#Clinical Pharmacology"],
      hepatic: ["lbl:adenosine-generic#Clinical Pharmacology"],
      warn: ["lbl:adenosine-generic#Indications, Warnings, Precautions, Adverse Reactions"],
      contra: ["lbl:adenosine-generic#Contraindications"],
      adverse: ["lbl:adenosine-generic#Adverse Reactions"],
      monitor: ["lbl:adenosine-generic#Warnings"],
      interact: ["lbl:adenosine-generic#Precautions: Drug Interactions"],
      flags: [],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "digoxin",
    genericName: "Digoxin",
    brandNames: ["Lanoxin"],
    vwClass: "Other",
    classFullName: "Other - Cardiac Glycoside",
    color: "sky",
    primaryTarget: "Cardiac glycoside: increases contractility and slows AV-node conduction",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "AV block possible (advanced block if pre-existing incomplete block)", qrs: "Unknown", qtc: "Unknown", hr: "Resting ventricular rate in AF reduced; severe sinus bradycardia possible" },
    indications: ["af_rate"],
    routes: ["IV", "PO"],
    acuteDose: {
      en: "Label IV loading (adults): total 8-12 mcg/kg; give half first, then one quarter every 6-8 h twice. Give each dose over 5 min or longer (no bolus). Parenteral use only when rapid digitalization is urgent or oral is not possible.\nAF/flutter rate control: AHA 2025 0.25 mg IV repeated to a maximum of 1.5 mg in 24 h (adjunct to another agent; caution in renal impairment). ACC/AHA 2023: 0.25-0.5 mg over several minutes, then 0.25 mg every 6 h, max 1.5 mg/24 h.",
      th: "ฉลากยา ขนาดนำทาง IV (ผู้ใหญ่): รวม 8-12 มคก./กก. ให้ครึ่งหนึ่งก่อน แล้วให้หนึ่งในสี่ทุก 6-8 ชม. อีก 2 ครั้ง ฉีดแต่ละครั้งนาน 5 นาทีขึ้นไป (ห้ามฉีดเร็ว) ใช้ยาฉีดเฉพาะเมื่อต้องการ digitalization ด่วนหรือรับประทานไม่ได้\nควบคุมอัตราเต้นใน AF/flutter: AHA 2025 0.25 มก. IV ซ้ำได้จนรวมไม่เกิน 1.5 มก. ใน 24 ชม. (ใช้เสริมยาอื่น ระวังในไตเสื่อม) ACC/AHA 2023: 0.25-0.5 มก. ใน 2-3 นาที แล้ว 0.25 มก. ทุก 6 ชม. สูงสุด 1.5 มก./24 ชม."
    },
    maintenanceDose: {
      en: "Label: oral maintenance 3.4-5.1 mcg/kg/day once daily (normal renal function), or by lean body weight and CrCl from the label table; increase every 2 weeks by response, levels and toxicity. ACC/AHA 2023: 0.0625-0.25 mg daily.",
      th: "ฉลากยา: ขนาดต่อเนื่องทางปาก 3.4-5.1 มคก./กก./วัน วันละครั้ง (ไตปกติ) หรือตามน้ำหนักตัวไม่รวมไขมันและ CrCl จากตารางในฉลาก เพิ่มทุก 2 สัปดาห์ตามการตอบสนอง ระดับยา และพิษ. ACC/AHA 2023: 0.0625-0.25 มก./วัน"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "1.5-2 days with normal renal function; longer in renal impairment",
      metabolism: "Mostly not metabolized",
      excretion: "50-70% unchanged in urine. Not effectively removed by dialysis."
    },
    renalAdjustment: {
      crcl50: "Dose by lean body weight and CrCl (label table)",
      crcl30_50: "Lower dose by lean body weight and CrCl (label table); steady state takes longer",
      crcl10_30: "Lower dose by lean body weight and CrCl (label table); steady state takes longer",
      crclLess10: "Lower dose by lean body weight and CrCl (label table); monitor levels",
      hd: "Not effectively removed by dialysis"
    },
    renalAdjust: true,
    hepaticAdjustment: "No adjustment; use serum levels to guide dosing.",
    cautionsAndWarnings: [
      "WPW with atrial fibrillation: digoxin raises the risk of rapid ventricular response and VF.",
      "Severe sinus bradycardia or SA block with sinus node disease; advanced heart block with pre-existing incomplete AV block (consider a pacemaker first).",
      "Toxicity more likely with low body weight, older age, renal impairment, low K, low Mg or high Ca; correct K and Mg.",
      "Electrical cardioversion: consider holding or reducing digoxin first; delay elective cardioversion if toxicity is suspected.",
      "Amyloid heart disease: toxicity at therapeutic levels.",
      "ACC/AHA 2023: increased mortality at plasma levels above 1.2 ng/mL."
    ],
    contraindications: [
      "Ventricular fibrillation",
      "Known hypersensitivity to digoxin or other digitalis preparations"
    ],
    adverseEffects: ["Toxicity: nausea, vomiting, anorexia, fatigue (30-70% of overdosed adults)", "Arrhythmias, heart block", "Visual and neurological symptoms", "Toxicity usually with levels over 2 ng/mL, but may occur lower"],
    monitoring: ["Serum digoxin just before the next dose or at least 6 h after the last dose; interpret in clinical context", "Potassium, magnesium, calcium, renal function", "Measure digoxin before starting interacting drugs"],
    interactions: ["Digoxin levels up more than 50% (reduce digoxin 30-50% or space doses, keep monitoring): amiodarone 70%, dronedarone AUC 150%, propafenone AUC 60-270%, quinidine 100%, verapamil 50-75%, clarithromycin, erythromycin, itraconazole, ranolazine", "Smaller rises: carvedilol 16%, diltiazem 20%", "Beta-blockers and non-dihydropyridine CCBs: additive AV-node slowing"],
    safeInHfref: true,
    safeCad: null,
    qtRisk: "None",
    nlem: { list: "b", old: "ก", items: [{ form: "Digoxin tab, elixir, sterile sol", cond: "-" }] },
    refs: {
      mech: ["lbl:digoxin-tab#Indications, Warnings and Precautions"],
      dose: ["lbl:digoxin-inj#Dosage and Administration", "aha25-als#Table (AF/AFL rate control)", "acc23-af#Table 21", "lbl:digoxin-tab#Dosage and Administration"],
      pk: ["lbl:digoxin-tab#Clinical Pharmacology, Overdosage"],
      renal: ["lbl:digoxin-tab#Dosage and Administration (Table 3), Clinical Pharmacology"],
      hepatic: ["lbl:digoxin-tab#Use in Specific Populations"],
      warn: ["lbl:digoxin-tab#Warnings and Precautions", "acc23-af#Table 21"],
      contra: ["lbl:digoxin-tab#Contraindications"],
      adverse: ["lbl:digoxin-tab#Adverse Reactions, Overdosage"],
      monitor: ["lbl:digoxin-tab#Dosage and Administration, Warnings and Precautions"],
      interact: ["lbl:digoxin-tab#Drug Interactions"],
      flags: ["lbl:digoxin-tab#Indications (heart failure)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "magnesium",
    genericName: "Magnesium Sulfate",
    brandNames: [],
    vwClass: "Other",
    classFullName: "Other - Electrolyte (torsades de pointes)",
    color: "sky",
    primaryTarget: "May suppress automaticity, early and late afterdepolarizations, and calcium influx (AHA/ACC/HRS 2017)",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Unknown", qrs: "Unknown", qtc: "Unknown", hr: "Bradycardia reported" },
    indications: ["vt_vf"],
    routes: ["IV"],
    acuteDose: {
      en: "Torsades de pointes: IV magnesium is first-line (AHA/ACC/HRS 2017) and suppresses and prevents recurrences (AHA 2025). Dose (Tzivoni 1988, case series of 12; guidelines give no dose): 2 g IV bolus stopped TdP within 1-5 min in 9 of 12; a second 2 g bolus 5-15 min later stopped it in the other 3. Not useful for cardiac arrest in general, monomorphic VT, or polymorphic VT without long QT (AHA 2025). Correct hypokalemia.",
      th: "Torsades de pointes: magnesium ทาง IV เป็นการรักษาแรก (AHA/ACC/HRS 2017) ช่วยหยุดและป้องกันการกลับเป็นซ้ำ (AHA 2025) ขนาดยา (Tzivoni 1988 รายงาน 12 ราย แนวทางไม่ระบุขนาด): 2 ก. IV ครั้งเดียวหยุด TdP ใน 1-5 นาที ใน 9 จาก 12 ราย; ให้ 2 ก. ซ้ำหลัง 5-15 นาที หยุดได้ในอีก 3 ราย ไม่มีประโยชน์ในหัวใจหยุดเต้นทั่วไป monomorphic VT หรือ polymorphic VT ที่ QT ไม่ยาว (AHA 2025) แก้โพแทสเซียมต่ำด้วย"
    },
    maintenanceDose: {
      en: "After the bolus (Tzivoni 1988): 3-20 mg/min for 7-48 h until QT was under 0.50 s (given in 9 of 12). The US injection label covers pre-eclampsia and eclampsia only.",
      th: "หลังฉีด (Tzivoni 1988): หยด 3-20 มก./นาที นาน 7-48 ชม. จน QT ต่ำกว่า 0.50 วินาที (ใช้ใน 9 จาก 12 ราย) ฉลากยาฉีดของสหรัฐฯ ครอบคลุมเฉพาะครรภ์เป็นพิษและชักจากครรภ์เป็นพิษ"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "Unknown",
      metabolism: "Not metabolized",
      excretion: "Solely by the kidney, in proportion to serum level and GFR"
    },
    renalAdjustment: {
      crcl50: "Usual dose (label, obstetric use)",
      crcl30_50: "Unknown for arrhythmia",
      crcl10_30: "Severe renal impairment: reduce the dose; lower maximum (label, obstetric use)",
      crclLess10: "Severe renal impairment: reduce the dose; lower maximum (label, obstetric use)",
      hd: "Unknown"
    },
    renalAdjust: true,
    hepaticAdjustment: "Unknown (no hepatic dose rule; renal excretion only).",
    cautionsAndWarnings: [
      "Toxicity: tendon reflexes disappear and respiratory paralysis may occur as serum Mg approaches 10 mEq/L; safe dosing shows a patellar reflex and respiratory rate about 16/min or more.",
      "Hypotension, circulatory collapse, bradycardia, cardiac depression.",
      "Myasthenia gravis: may precipitate myasthenic crisis (stop immediately).",
      "Renal impairment: accumulation; reduce dose."
    ],
    contraindications: [
      "Heart block or myocardial damage (US label, obstetric product)",
      "Diabetic coma",
      "Myasthenia gravis"
    ],
    adverseEffects: ["Flushing, sweating, hypotension, bradycardia", "CNS depression, respiratory depression", "Loss of deep tendon reflexes"],
    monitoring: ["Patellar reflex and respiratory rate", "Serum magnesium during infusions", "Renal function"],
    interactions: ["Unknown in the arrhythmia setting (see full label)"],
    safeInHfref: null,
    safeCad: null,
    qtRisk: "None",
    nlem: { list: "b", old: "ก", items: [{ form: "Magnesium sulfate sterile sol (listed under 2.3 Anti-arrhythmic drugs)", cond: "-" }] },
    refs: {
      mech: ["aha17-va#Section 6 (supportive text)"],
      dose: ["tzivoni1988#Abstract", "aha17-va#Section 5.1.5.1 (electrolytes)", "aha25-als#Polymorphic VT and cardiac arrest text", "lbl:magnesium-inj#Indications"],
      pk: ["lbl:magnesium-inj#Clinical Pharmacology"],
      renal: ["lbl:magnesium-inj#Dosage and Administration, Use in Specific Populations"],
      hepatic: [],
      warn: ["lbl:magnesium-inj#Warnings and Precautions, Overdosage"],
      contra: ["lbl:magnesium-inj#Contraindications"],
      adverse: ["lbl:magnesium-inj#Adverse Reactions"],
      monitor: ["lbl:magnesium-inj#Warnings and Precautions"],
      interact: [],
      flags: [],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "vernakalant",
    genericName: "Vernakalant",
    brandNames: ["Brinavess"],
    vwClass: "Other",
    classFullName: "Other - IV Agent for Recent-Onset AF Conversion (EU)",
    color: "sky",
    primaryTarget: "Unknown (mechanism section not in the SmPC pages read)",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Unknown", qrs: "Unknown", qtc: "Contraindicated if uncorrected QT over 440 ms at baseline", hr: "Bradycardia common" },
    indications: ["af_rhythm"],
    routes: ["IV"],
    acuteDose: {
      en: "Recent-onset AF (7 days or less; 3 days or less after cardiac surgery), in a monitored setting: 3 mg/kg over 10 min (max 339 mg). If not converted within 15 min after the end, 2 mg/kg over 10 min (max 226 mg). No more than 5 mg/kg in 24 h. Over 113 kg: fixed 339 mg then 226 mg. Stop if BP or heart rate drops suddenly. Not effective for typical atrial flutter.",
      th: "AF ที่เพิ่งเกิด (ไม่เกิน 7 วัน; ไม่เกิน 3 วันหลังผ่าตัดหัวใจ) ในที่ที่ติดตามได้: 3 มก./กก. ใน 10 นาที (สูงสุด 339 มก.) ถ้าไม่กลับจังหวะใน 15 นาทีหลังจบ ให้ 2 มก./กก. ใน 10 นาที (สูงสุด 226 มก.) ไม่เกิน 5 มก./กก. ใน 24 ชม. น้ำหนักเกิน 113 กก.: ขนาดคงที่ 339 มก. แล้ว 226 มก. หยุดถ้าความดันหรือชีพจรลดลงทันที ไม่ได้ผลกับ atrial flutter ชนิด typical"
    },
    maintenanceDose: {
      en: "None (acute conversion only).",
      th: "ไม่มี (ใช้แปลงจังหวะเฉียบพลันเท่านั้น)"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "Short (exact value not in the SmPC pages read)",
      metabolism: "CYP2D6 substrate",
      excretion: "Unknown"
    },
    renalAdjustment: {
      crcl50: "No adjustment",
      crcl30_50: "No adjustment",
      crcl10_30: "No adjustment",
      crclLess10: "No adjustment",
      hd: "Unknown"
    },
    renalAdjust: false,
    hepaticAdjustment: "No dose adjustment; not recommended in advanced hepatic impairment (limited experience).",
    cautionsAndWarnings: [
      "Serious hypotension during and right after the infusion; observe vital signs and rhythm for the whole infusion and at least 15 min after.",
      "Heart failure: more hypotension and ventricular arrhythmia; caution in stable NYHA I-II; not recommended if LVEF 35% or less.",
      "Atrial flutter may appear; rare 1:1 AV conduction.",
      "Valvular heart disease: more ventricular arrhythmia events."
    ],
    contraindications: [
      "Hypersensitivity",
      "Severe aortic stenosis; systolic BP under 100 mmHg; NYHA III-IV heart failure",
      "Uncorrected QT over 440 ms, severe bradycardia, sinus node dysfunction, or second- or third-degree heart block without a pacemaker",
      "IV Class I or III antiarrhythmics within 4 h before or 4 h after",
      "Acute coronary syndrome (including MI) within 30 days"
    ],
    adverseEffects: ["Dysgeusia (17.9%)", "Sneezing (12.5%)", "Paresthesia (6.9%)", "Hypotension (5.7% vs 5.5% placebo in the first 2 h)", "Bradycardia, atrial flutter"],
    monitoring: ["Continuous rhythm and vital signs during the infusion and at least 15 min after"],
    interactions: ["IV Class I or III antiarrhythmics: contraindicated within 4 h before or after"],
    safeInHfref: false,
    safeCad: false,
    qtRisk: "None",
    nlem: { list: null },
    refs: {
      mech: ["ema-brinavess#4.5"],
      dose: ["ema-brinavess#4.1, 4.2"],
      pk: ["ema-brinavess#4.5"],
      renal: ["ema-brinavess#4.2"],
      hepatic: ["ema-brinavess#4.2, 4.4"],
      warn: ["ema-brinavess#4.4"],
      contra: ["ema-brinavess#4.3"],
      adverse: ["ema-brinavess#4.4, 4.8"],
      monitor: ["ema-brinavess#4.4"],
      interact: ["ema-brinavess#4.3"],
      flags: ["ema-brinavess#4.3 (NYHA III-IV, ACS within 30 days), 4.4 (LVEF 35% or less)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "ivabradine",
    genericName: "Ivabradine",
    brandNames: ["Corlanor", "Procoralan"],
    vwClass: "Other",
    classFullName: "Other - HCN (If current) Channel Blocker",
    color: "sky",
    primaryTarget: "Blocks the HCN channel carrying the cardiac pacemaker If current; effect greatest at the SA node",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "PR and AH prolongation have occurred", qrs: "Unknown", qtc: "Unknown", hr: "Decreased (sinus rate)" },
    indications: [],
    routes: ["PO"],
    acuteDose: {
      en: "No acute role. Not an antiarrhythmic in the US label (heart failure only). Use for inappropriate sinus tachycardia: Unknown (not covered by the sources checked).",
      th: "ไม่มีบทบาทในภาวะเฉียบพลัน ฉลากสหรัฐฯ ไม่ใช่ยาต้านหัวใจเต้นผิดจังหวะ (เฉพาะหัวใจล้มเหลว) การใช้ใน inappropriate sinus tachycardia: ไม่ทราบ (ไม่มีในแหล่งที่ตรวจ)"
    },
    maintenanceDose: {
      en: "Label (HFrEF, LVEF 35% or less, sinus rhythm, resting HR 70 or more on maximal beta-blocker or beta-blocker contraindicated): 5 mg twice daily with food (2.5 mg if conduction defects or bradycardia risk); after 2 weeks adjust to a resting HR of 50-60; max 7.5 mg twice daily.",
      th: "ฉลากยา (HFrEF, LVEF ไม่เกิน 35%, จังหวะไซนัส, ชีพจรขณะพัก 70 ขึ้นไป แม้ได้ beta-blocker สูงสุดหรือใช้ beta-blocker ไม่ได้): 5 มก. วันละ 2 ครั้ง พร้อมอาหาร (2.5 มก. ถ้ามีการนำไฟฟ้าผิดปกติหรือเสี่ยงหัวใจเต้นช้า) หลัง 2 สัปดาห์ปรับให้ชีพจรขณะพัก 50-60 สูงสุด 7.5 มก. วันละ 2 ครั้ง"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "Effective about 6 h (distribution 2 h)",
      metabolism: "CYP3A4",
      excretion: "Unknown"
    },
    renalAdjustment: {
      crcl50: "No adjustment",
      crcl30_50: "No adjustment (CrCl 15-60)",
      crcl10_30: "No adjustment (CrCl 15-60); no data below 15",
      crclLess10: "Unknown (no data below CrCl 15)",
      hd: "Unknown"
    },
    renalAdjust: false,
    hepaticAdjustment: "No change in mild-moderate impairment; contraindicated in severe (Child-Pugh C).",
    cautionsAndWarnings: [
      "Fetal toxicity: effective contraception in females.",
      "Atrial fibrillation more frequent (8.3% vs 6.6%).",
      "Bradycardia, sinus arrest, heart block.",
      "Phosphenes (transient visual brightness), usually mild.",
      "Avoid moderate CYP3A4 inhibitors (diltiazem, verapamil, grapefruit) and CYP3A4 inducers."
    ],
    contraindications: [
      "Acute decompensated heart failure",
      "Clinically significant hypotension or bradycardia",
      "Sick sinus syndrome, SA block or third-degree AV block without a demand pacemaker",
      "Severe hepatic impairment",
      "Pacemaker dependence",
      "Strong CYP3A4 inhibitors"
    ],
    adverseEffects: ["SHIFT trial (ivabradine vs placebo): bradycardia 10% vs 2.2%, hypertension 8.9% vs 7.8%, atrial fibrillation 8.3% vs 6.6%, phosphenes 2.8% vs 0.5%"],
    monitoring: ["Resting heart rate (target 50-60)", "Rhythm (atrial fibrillation)", "Pregnancy status"],
    interactions: ["Strong CYP3A4 inhibitors: contraindicated", "Moderate CYP3A4 inhibitors (diltiazem, verapamil, grapefruit): avoid", "CYP3A4 inducers (e.g. St John's wort): avoid"],
    safeInHfref: true,
    safeCad: null,
    qtRisk: "None",
    nlem: { list: null },
    refs: {
      mech: ["lbl:ivabradine-corlanor#Clinical Pharmacology: Mechanism of Action"],
      dose: ["lbl:ivabradine-corlanor#Indications, Dosage and Administration"],
      pk: ["lbl:ivabradine-corlanor#Clinical Pharmacology"],
      renal: ["lbl:ivabradine-corlanor#Use in Specific Populations"],
      hepatic: ["lbl:ivabradine-corlanor#Contraindications, Use in Specific Populations"],
      warn: ["lbl:ivabradine-corlanor#Warnings and Precautions"],
      contra: ["lbl:ivabradine-corlanor#Contraindications"],
      adverse: ["lbl:ivabradine-corlanor#Adverse Reactions"],
      monitor: ["lbl:ivabradine-corlanor#Dosage and Administration, Warnings and Precautions"],
      interact: ["lbl:ivabradine-corlanor#Drug Interactions"],
      flags: ["lbl:ivabradine-corlanor#Indications (HFrEF)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "atropine",
    genericName: "Atropine Sulfate",
    brandNames: [],
    vwClass: "Other",
    classFullName: "Other - Muscarinic Antagonist (symptomatic bradycardia)",
    color: "sky",
    primaryTarget: "Muscarinic antagonist (antivagal); small doses may first slow the heart before tachycardia develops",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Titrate to PR interval (label)", qrs: "Unknown", qtc: "Unknown", hr: "Increased (small doses may first slow it)" },
    indications: ["brady"],
    routes: ["IV"],
    acuteDose: {
      en: "Symptomatic bradycardia (AHA 2025): 1 mg IV bolus, repeat every 3-5 min, maximum 3 mg. If ineffective: transcutaneous pacing and/or dopamine 5-20 mcg/kg/min or epinephrine 2-10 mcg/min.\nLabel: antivagal 0.5-1 mg initial dose; titrate to heart rate, PR, BP and symptoms. Coronary artery disease: limit the total to 0.03-0.04 mg/kg (2-3 mg) because tachycardia raises oxygen demand.",
      th: "หัวใจเต้นช้ามีอาการ (AHA 2025): 1 มก. IV ซ้ำทุก 3-5 นาที สูงสุด 3 มก. ถ้าไม่ได้ผล: transcutaneous pacing และ/หรือ dopamine 5-20 มคก./กก./นาที หรือ epinephrine 2-10 มคก./นาที\nฉลากยา: ต้านวากัส เริ่ม 0.5-1 มก. ปรับตามชีพจร PR ความดัน และอาการ โรคหลอดเลือดหัวใจ: จำกัดขนาดรวม 0.03-0.04 มก./กก. (2-3 มก.) เพราะหัวใจเต้นเร็วเพิ่มความต้องการออกซิเจน"
    },
    maintenanceDose: {
      en: "None (acute use only).",
      th: "ไม่มี (ใช้เฉียบพลันเท่านั้น)"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "Unknown for adults (more than doubled in the elderly over 65 and children under 2)",
      metabolism: "Much destroyed by enzymatic hydrolysis, mainly in the liver",
      excretion: "13-50% unchanged in urine"
    },
    renalAdjustment: {
      crcl50: "Unknown (no dose rule)",
      crcl30_50: "Unknown (no dose rule)",
      crcl10_30: "Unknown (no dose rule)",
      crclLess10: "Unknown (no dose rule)",
      hd: "Unknown"
    },
    renalAdjust: null,
    hepaticAdjustment: "Unknown (no dose rule).",
    cautionsAndWarnings: [
      "Tachycardia raises myocardial oxygen demand: limit total dose in coronary artery disease.",
      "May precipitate acute glaucoma.",
      "May turn partial pyloric stenosis into complete obstruction.",
      "May worsen urinary retention."
    ],
    contraindications: [
      "None (label)"
    ],
    adverseEffects: ["Dry mouth, blurred vision, photophobia, tachycardia"],
    monitoring: ["Heart rate, PR interval, blood pressure and symptoms"],
    interactions: ["Unknown in the arrhythmia setting (see full label)"],
    safeInHfref: null,
    safeCad: null,
    qtRisk: "None",
    nlem: { list: "b", old: "ก", items: [{ form: "Atropine sulfate sterile sol", cond: "ใช้สำหรับ symptomatic bradycardia และการตรวจพิเศษทางหัวใจ" }] },
    refs: {
      mech: ["lbl:atropine-inj#Clinical Pharmacology"],
      dose: ["aha25-brady", "lbl:atropine-inj#Dosage and Administration"],
      pk: ["lbl:atropine-inj#Clinical Pharmacology, Use in Specific Populations"],
      renal: [],
      hepatic: [],
      warn: ["lbl:atropine-inj#Warnings and Precautions"],
      contra: ["lbl:atropine-inj#Contraindications"],
      adverse: ["lbl:atropine-inj#Adverse Reactions"],
      monitor: ["lbl:atropine-inj#Dosage and Administration"],
      interact: [],
      flags: ["lbl:atropine-inj#Dosage and Administration (coronary artery disease)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "ranolazine",
    genericName: "Ranolazine",
    brandNames: ["Ranexa"],
    vwClass: "Other",
    classFullName: "Other - Late Sodium Current Inhibitor (antianginal; no arrhythmia indication in the label)",
    color: "sky",
    primaryTarget: "Inhibits the cardiac late sodium current at therapeutic levels",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Unknown", qrs: "Unknown", qtc: "Dose-related prolongation: about 6 ms at 1000 mg twice daily (15 ms or more in the top 5% of levels)", hr: "Unknown" },
    indications: [],
    routes: ["PO"],
    acuteDose: {
      en: "No acute role. The label indication is chronic angina; antiarrhythmic use: Unknown (not covered by the sources checked).",
      th: "ไม่มีบทบาทในภาวะเฉียบพลัน ข้อบ่งใช้ตามฉลากคือ angina เรื้อรัง การใช้เป็นยาต้านหัวใจเต้นผิดจังหวะ: ไม่ทราบ (ไม่มีในแหล่งที่ตรวจ)"
    },
    maintenanceDose: {
      en: "Chronic angina (label): 500 mg twice daily, increase to 1000 mg twice daily as needed (maximum). Swallow whole. Max 500 mg twice daily with moderate CYP3A inhibitors (diltiazem, verapamil, erythromycin).",
      th: "angina เรื้อรัง (ฉลากยา): 500 มก. วันละ 2 ครั้ง เพิ่มเป็น 1000 มก. วันละ 2 ครั้ง ตามต้องการ (สูงสุด) กลืนทั้งเม็ด สูงสุด 500 มก. วันละ 2 ครั้ง เมื่อใช้ร่วมกับยายับยั้ง CYP3A ระดับปานกลาง (diltiazem, verapamil, erythromycin)"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "Apparent terminal half-life about 7 h",
      metabolism: "CYP3A (less CYP2D6); weak CYP3A inhibitor, moderate CYP2D6 and P-gp inhibitor",
      excretion: "Unknown"
    },
    renalAdjustment: {
      crcl50: "No dose rule; CrCl under 60: monitor renal function after starting and periodically",
      crcl30_50: "No dose rule; monitor renal function (Cmax 40-50% higher in renal impairment)",
      crcl10_30: "Acute renal failure reported when CrCl under 30; monitor; stop if acute renal failure",
      crclLess10: "Acute renal failure reported in severe impairment; stop if it develops",
      hd: "Unknown"
    },
    renalAdjust: true,
    hepaticAdjustment: "Contraindicated in liver cirrhosis.",
    cautionsAndWarnings: [
      "QTc prolongation, dose-related.",
      "Acute renal failure in severe renal impairment (CrCl under 30): monitor; stop if it develops."
    ],
    contraindications: [
      "Strong CYP3A inhibitors (e.g. ketoconazole, clarithromycin, nelfinavir)",
      "CYP3A inducers (e.g. rifampin, phenobarbital, St John's wort)",
      "Liver cirrhosis"
    ],
    adverseEffects: ["Dizziness, headache, constipation, nausea (over 4% and more than placebo)"],
    monitoring: ["Renal function after starting and periodically if CrCl under 60", "ECG (QTc)"],
    interactions: ["Moderate CYP3A inhibitors: max ranolazine 500 mg twice daily", "Simvastatin: limit to 20 mg daily", "Metformin: max 1700 mg/day with ranolazine 1000 mg twice daily", "Digoxin: higher digoxin exposure (P-gp)", "Rifampin: ranolazine levels down about 95%"],
    safeInHfref: null,
    safeCad: null,
    qtRisk: "Warning",
    nlem: { list: null },
    refs: {
      mech: ["lbl:ranolazine-er#Clinical Pharmacology"],
      dose: ["lbl:ranolazine-er#Indications, Dosage and Administration"],
      pk: ["lbl:ranolazine-er#Clinical Pharmacology"],
      renal: ["lbl:ranolazine-er#Warnings and Precautions, Clinical Pharmacology"],
      hepatic: ["lbl:ranolazine-er#Contraindications"],
      warn: ["lbl:ranolazine-er#Warnings and Precautions"],
      contra: ["lbl:ranolazine-er#Contraindications"],
      adverse: ["lbl:ranolazine-er#Adverse Reactions"],
      monitor: ["lbl:ranolazine-er#Warnings and Precautions"],
      interact: ["lbl:ranolazine-er#Drug Interactions"],
      flags: [],
      nlem: ["nlem2569"]
    }
  }
];

// Display order: Class Ia, Ib, Ic, II, III, IV, then other agents.
const DRUGS_DATA = [...DRUGS_PART_1, ...DRUGS_PART_2, ...DRUGS_PART_3, ...DRUGS_PART_4];
