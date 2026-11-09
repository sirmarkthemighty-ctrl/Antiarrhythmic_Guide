// --- Drug records, part 1: Class Ia and Ib ---
// Every section cites its sources in `refs` (keys in sources.js; "#..." = place in that source).
// A value with no source is "Unknown". Audited 2026-10-28 against the labels and guidelines in sources.js.
const DRUGS_PART_1 = [
  // --- CLASS Ia ---
  {
    id: "procainamide",
    genericName: "Procainamide",
    brandNames: [],
    vwClass: "Ia",
    classFullName: "Class Ia - Sodium Channel Blocker",
    color: "amber",
    primaryTarget: "Sodium channel block (Group 1A); active metabolite NAPA has antiarrhythmic activity",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Prolonged (less regularly)", qrs: "Widened", qtc: "Prolonged (less regularly)", hr: "Slight sinus tachycardia (anticholinergic action)" },
    indications: ["vt_vf", "af_rhythm"],
    routes: ["IV"],
    acuteDose: {
      en: "Label (IV, under ECG monitoring): inject slowly, no faster than 50 mg/min; 100 mg every 5 min until the arrhythmia is suppressed or 500 mg given, then wait 10 min or longer before resuming. Or a loading infusion of 20 mg/mL (1 g in 50 mL D5W) at 1 mL/min for 25-30 min (500-600 mg). Maximum advisable loading dose 1 g. Stop if persistent conduction disturbances or hypotension develop.\nAHA 2025 (stable wide-QRS tachycardia): 20-50 mg/min until the arrhythmia is suppressed, hypotension ensues, QRS widens by more than 50%, or 17 mg/kg is given. Avoid if prolonged QT or heart failure.\nACC/AHA 2023 (AF conversion): 1 g IV over 30 min, then 2 mg/min for 1 h.",
      th: "ฉลากยา (IV ภายใต้การติดตาม ECG): ฉีดช้า ไม่เกิน 50 มก./นาที ให้ 100 มก. ทุก 5 นาที จนหยุดหัวใจเต้นผิดจังหวะหรือครบ 500 มก. แล้วรอ 10 นาทีขึ้นไปก่อนให้ต่อ หรือหยดนำ 20 มก./มล. (1 ก. ใน D5W 50 มล.) 1 มล./นาที นาน 25-30 นาที (500-600 มก.) ขนาดนำรวมไม่ควรเกิน 1 ก. หยุดยาถ้าการนำไฟฟ้าผิดปกติต่อเนื่องหรือความดันต่ำ\nAHA 2025 (wide-QRS tachycardia ที่คงที่): 20-50 มก./นาที จนหยุดหัวใจเต้นผิดจังหวะ ความดันต่ำ QRS กว้างขึ้นเกิน 50% หรือครบ 17 มก./กก. หลีกเลี่ยงเมื่อ QT ยาวหรือหัวใจล้มเหลว\nACC/AHA 2023 (แปลง AF): 1 ก. IV ใน 30 นาที แล้ว 2 มก./นาที นาน 1 ชม."
    },
    maintenanceDose: {
      en: "IV maintenance infusion: label 2-6 mg/min (1 g in 500 mL D5W = 2 mg/mL at 1-3 mL/min, or 1 g in 250 mL = 4 mg/mL at 0.5-1.5 mL/min), adjusted to response, weight, age, renal function and acetylator status. AHA 2025: 1-4 mg/min. Oral procainamide: Unknown (not covered by the sources used).",
      th: "หยดต่อเนื่อง IV: ฉลากยา 2-6 มก./นาที (1 ก. ใน D5W 500 มล. = 2 มก./มล. อัตรา 1-3 มล./นาที หรือ 1 ก. ใน 250 มล. = 4 มก./มล. อัตรา 0.5-1.5 มล./นาที) ปรับตามการตอบสนอง น้ำหนัก อายุ การทำงานของไต และการ acetylation. AHA 2025: 1-4 มก./นาที. ยารับประทาน: ไม่ทราบ (ไม่มีในแหล่งอ้างอิงที่ใช้)"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "IM: plasma peak in 15-60 min",
      halfLife: "3-4 h with normal renal function (prolonged by reduced CrCl and age); NAPA about 7 h (ACC/AHA 2023)",
      metabolism: "Hepatic acetylation to NAPA (active): 16-21% of a dose in slow acetylators, 24-33% in fast acetylators",
      excretion: "Urine: 30-60% unchanged, 6-52% as NAPA (glomerular filtration and tubular secretion). Removed by hemodialysis, not by peritoneal dialysis."
    },
    renalAdjustment: {
      crcl50: "Unknown (label gives no CrCl bands)",
      crcl30_50: "Reduce dose or infusion rate (label: less than the usual dose may suffice; no CrCl bands given)",
      crcl10_30: "Reduce dose or infusion rate (label: less than the usual dose may suffice; no CrCl bands given)",
      crclLess10: "Reduce dose or infusion rate (label: less than the usual dose may suffice; no CrCl bands given)",
      hd: "Procainamide and NAPA are removed by hemodialysis (not peritoneal dialysis); supplemental dose: Unknown"
    },
    renalAdjust: true,
    hepaticAdjustment: "Unknown (label gives no hepatic dose rule; hepatic acetylation rate affects NAPA levels)",
    cautionsAndWarnings: [
      "BOXED WARNING: Prolonged use often leads to a positive ANA, with or without a lupus-like syndrome; reassess benefit if ANA turns positive.",
      "BOXED WARNING: Agranulocytosis, bone marrow depression, neutropenia, hypoplastic anemia and thrombocytopenia (about 0.5%; deaths reported). Check CBC with differential and platelets weekly for the first 3 months, then periodically.",
      "BOXED WARNING (CAST): reserve for life-threatening ventricular arrhythmias; no antiarrhythmic drug has shown improved survival in patients without life-threatening arrhythmias.",
      "Heart failure, acute ischemic heart disease or cardiomyopathy: use with caution (myocardial depression).",
      "Renal insufficiency: accumulation to overdose levels unless the dose is adjusted.",
      "Injection contains sodium metabisulfite (sulfite allergy, asthma)."
    ],
    contraindications: [
      "Complete heart block",
      "Second-degree AV block or hemiblock unless the ventricular rate is controlled by a pacemaker (avoid or stop)",
      "Established systemic lupus erythematosus",
      "Torsades de pointes",
      "Allergic reaction to procainamide (cross-sensitivity with procaine and ester local anesthetics is unlikely but possible)"
    ],
    adverseEffects: ["Hypotension and serious rhythm disturbances (more common with IV use)", "Lupus-like syndrome (under 1 in 500 to 30% on long-term oral therapy)", "Agranulocytosis, neutropenia, thrombocytopenia, hemolytic anemia", "Raised liver enzymes; deaths from liver failure reported"],
    monitoring: ["ECG during infusion (rhythm, QRS, PR, QT); concern if QRS widens more than 25%, interrupt if 50%", "Blood pressure during infusion", "CBC with differential and platelets weekly for 3 months, then periodically", "Renal function; procainamide and NAPA levels where available"],
    interactions: ["Other antiarrhythmics: additive cardiac effects; dose reduction may be needed", "Anticholinergic drugs: additive antivagal effect on AV conduction", "Neuromuscular blockers (e.g. succinylcholine): smaller doses may be needed"],
    safeInHfref: false,
    safeCad: false,
    qtRisk: "Warning",
    nlem: { list: null },
    refs: {
      mech: ["lbl:procainamide-inj#Clinical Pharmacology"],
      dose: ["lbl:procainamide-inj#Dosage and Administration", "aha25-tachy", "acc23-af#Table 22"],
      pk: ["lbl:procainamide-inj#Clinical Pharmacology, Overdosage", "acc23-af#Table 22"],
      renal: ["lbl:procainamide-inj#Dosage and Administration, Warnings, Precautions, Overdosage"],
      hepatic: ["lbl:procainamide-inj#Clinical Pharmacology"],
      warn: ["lbl:procainamide-inj#Boxed Warning, Warnings"],
      contra: ["lbl:procainamide-inj#Contraindications"],
      adverse: ["lbl:procainamide-inj#Adverse Reactions"],
      monitor: ["lbl:procainamide-inj#Boxed Warning, Precautions", "acc23-af#Table 25"],
      interact: ["lbl:procainamide-inj#Precautions: Drug Interactions"],
      flags: ["lbl:procainamide-inj#Warnings (heart failure, CAST)", "aha25-tachy"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "quinidine",
    genericName: "Quinidine",
    brandNames: [],
    vwClass: "Ia",
    classFullName: "Class Ia - Sodium Channel Blocker",
    color: "amber",
    primaryTarget: "Class IA antiarrhythmic; also anticholinergic, negative inotropic and peripheral alpha-adrenergic blocking (vasodilator) activity",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Unknown", qrs: "Widened (stop or reduce if QRS reaches 130% of baseline)", qtc: "Prolonged, dose-related", hr: "May rise paradoxically in atrial flutter/fibrillation (faster AV conduction as the atrial rate slows)" },
    indications: ["af_rhythm", "vt_vf"],
    routes: ["PO"],
    acuteDose: {
      en: "AF/flutter conversion (only after rate control has failed; no optimal regimen established; start in a monitored setting if structural heart disease): one reported regimen is quinidine sulfate 400 mg every 6 h, cautiously increased if no conversion after 4-5 doses. Quinidine gluconate ER: 648 mg every 8 h (increase cautiously after 3-4 doses), or 324 mg every 8 h for 2 days, then 648 mg every 12 h for 2 days, then 648 mg every 8 h for up to 4 days. Stop if QRS or QTc reaches 130% of baseline (QTc then over 500 ms), P waves disappear, or significant tachycardia, symptomatic bradycardia or hypotension occurs.",
      th: "แปลง AF/flutter (ใช้เมื่อควบคุมอัตราเต้นไม่ได้ผลแล้วเท่านั้น ยังไม่มีสูตรที่ดีที่สุด เริ่มในที่ที่ติดตามได้หากมีโรคหัวใจเชิงโครงสร้าง): สูตรหนึ่งคือ quinidine sulfate 400 มก. ทุก 6 ชม. เพิ่มอย่างระวังถ้าไม่กลับจังหวะหลัง 4-5 ครั้ง. Quinidine gluconate ER: 648 มก. ทุก 8 ชม. (เพิ่มอย่างระวังหลัง 3-4 ครั้ง) หรือ 324 มก. ทุก 8 ชม. 2 วัน แล้ว 648 มก. ทุก 12 ชม. 2 วัน แล้ว 648 มก. ทุก 8 ชม. ไม่เกิน 4 วัน. หยุดยาถ้า QRS หรือ QTc ยาวถึง 130% ของค่าเดิม (และ QTc เกิน 500 ms) P wave หายไป หรือเกิดหัวใจเต้นเร็วมาก หัวใจเต้นช้ามีอาการ หรือความดันต่ำ"
    },
    maintenanceDose: {
      en: "Relapse prevention of AF/flutter: quinidine sulfate 200 mg every 6 h, or quinidine gluconate ER 324 mg every 8-12 h; raise cautiously if tolerated and the serum level is within range. Monitor for 2-3 days after starting the discharge regimen. Life-threatening ventricular arrhythmias: regimens not adequately studied (similar to the AF regimen).",
      th: "ป้องกันการกลับเป็น AF/flutter: quinidine sulfate 200 มก. ทุก 6 ชม. หรือ quinidine gluconate ER 324 มก. ทุก 8-12 ชม. เพิ่มอย่างระวังถ้าทนได้และระดับยาในเลือดอยู่ในช่วงรักษา ติดตาม 2-3 วันหลังเริ่มสูตรที่จะให้กลับบ้าน. Ventricular arrhythmia ที่อันตรายถึงชีวิต: ยังไม่มีการศึกษาสูตรยาเพียงพอ (ใช้คล้ายสูตร AF)"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "About 2 h (sulfate tablets)",
      halfLife: "6-8 h in adults; 3-hydroxyquinidine about 12 h; longer in cirrhosis",
      metabolism: "Hepatic CYP3A4 to hydroxylated metabolites; 3-hydroxyquinidine has at least half the parent's activity. Inhibits CYP2D6.",
      excretion: "Renal clearance about 1 mL/min/kg (filtration, tubular secretion, pH-dependent reabsorption). Not usually removed by dialysis."
    },
    renalAdjustment: {
      crcl50: "Unknown (label gives no CrCl bands)",
      crcl30_50: "Unknown (label: renal dysfunction slows elimination; no dose rule given)",
      crcl10_30: "Unknown (label: renal dysfunction slows elimination; no dose rule given)",
      crclLess10: "Unknown (label: renal dysfunction slows elimination; no dose rule given)",
      hd: "Not usually removed by dialysis"
    },
    renalAdjust: null,
    hepaticAdjustment: "Unknown (label: hepatic dysfunction slows elimination and cirrhosis lengthens the half-life; no dose rule given)",
    cautionsAndWarnings: [
      "Mortality: in a meta-analysis of AF/flutter relapse-prevention trials, mortality with quinidine was more than 3 times that with placebo; in non-life-threatening ventricular arrhythmias it was higher than with alternative antiarrhythmics.",
      "QT prolongation and torsades de pointes; risk rises with bradycardia, low K, Mg or Ca, and high levels, but may occur without them.",
      "Paradoxical rise in ventricular rate in atrial flutter/fibrillation (may exceed 200 bpm): use only after rate control (e.g. digitalis or beta-blockers).",
      "Vagolysis: vagal maneuvers to stop PSVT may fail.",
      "Immune reactions: thrombocytopenic purpura, hemolytic anemia, agranulocytosis, lupus-like disorder, hepatotoxicity (granulomatous hepatitis)."
    ],
    contraindications: [
      "Allergy to quinidine, or thrombocytopenic purpura during prior quinidine or quinine therapy",
      "Rhythm dependent on a junctional or idioventricular pacemaker, including complete AV block, without a functioning pacemaker",
      "Conditions harmed by anticholinergic action, such as myasthenia gravis"
    ],
    adverseEffects: ["Diarrhea (35% in a 245-patient trial)", "Upper GI distress (22%)", "Lightheadedness (15%)", "Headache, fatigue, palpitations (7% each)", "Cinchonism: tinnitus, hearing loss, vertigo, blurred vision, confusion"],
    monitoring: ["QRS and QTc (reduce or stop at 130% of baseline, QTc over 500 ms)", "Serum quinidine level within the laboratory's range", "Monitor 2-3 days after starting the discharge regimen", "Signs of thrombocytopenia, hepatotoxicity"],
    interactions: ["Digoxin: serum levels may double; digoxin dose usually needs reduction", "Warfarin: anticoagulant effect potentiated", "Amiodarone, cimetidine, ketoconazole, verapamil, diltiazem: raise quinidine levels", "Phenobarbital, phenytoin, rifampin (CYP3A4 inducers): lower quinidine levels", "Urine alkalinizers (acetazolamide, bicarbonate, thiazides): reduce renal elimination", "Inhibits CYP2D6: raises levels of drugs such as mexiletine, some phenothiazines, tricyclics; raises procainamide levels"],
    safeInHfref: false,
    safeCad: false,
    qtRisk: "Warning",
    nlem: { list: null },
    refs: {
      mech: ["lbl:quinidine-sulfate#Clinical Pharmacology, Warnings"],
      dose: ["lbl:quinidine-sulfate#Dosage and Administration", "lbl:quinidine-gluconate#Dosage and Administration"],
      pk: ["lbl:quinidine-sulfate#Clinical Pharmacology, Overdosage"],
      renal: ["lbl:quinidine-sulfate#Warnings, Overdosage"],
      hepatic: ["lbl:quinidine-sulfate#Warnings, Clinical Pharmacology"],
      warn: ["lbl:quinidine-sulfate#Warnings"],
      contra: ["lbl:quinidine-sulfate#Contraindications"],
      adverse: ["lbl:quinidine-sulfate#Adverse Reactions"],
      monitor: ["lbl:quinidine-sulfate#Dosage and Administration"],
      interact: ["lbl:quinidine-sulfate#Precautions: Drug Interactions"],
      flags: ["lbl:quinidine-sulfate#Warnings (mortality, negative inotropy)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "disopyramide",
    genericName: "Disopyramide",
    brandNames: ["Norpace", "Norpace CR"],
    vwClass: "Ia",
    classFullName: "Class Ia - Sodium Channel Blocker with Anticholinergic and Negative Inotropic Effects",
    color: "amber",
    primaryTarget: "Type 1A antiarrhythmic with anticholinergic activity and negative inotropic properties; no effect on alpha- or beta-adrenergic receptors",
    actionPotential: { phase0: "Upstroke velocity decreased (animal studies)", apd: "Increased in normal cells (animal studies)", erp: "Atrial ERP lengthened; minimal effect on AV-node ERP" },
    ecgEffects: { pr: "May prolong (monitor)", qrs: "Little effect usually; stop if widening over 25%", qtc: "May prolong", hr: "Sinus node recovery time shortened" },
    indications: ["vt_vf"],
    routes: ["PO"],
    acuteDose: {
      en: "Rapid control of ventricular arrhythmia: loading dose 300 mg immediate-release (200 mg if under 50 kg), then maintenance; effect in 30 min to 3 h. If no response or toxicity within 6 h, 200 mg every 6 h may be used. No loading dose in cardiomyopathy or possible decompensation (start 100 mg every 6-8 h). Start in hospital.",
      th: "ต้องการควบคุม ventricular arrhythmia อย่างรวดเร็ว: ขนาดนำ 300 มก. ชนิดออกฤทธิ์ทันที (200 มก. ถ้าน้ำหนักน้อยกว่า 50 กก.) แล้วให้ขนาดต่อเนื่อง ออกฤทธิ์ใน 30 นาทีถึง 3 ชม. ถ้าไม่ตอบสนองหรือไม่มีพิษใน 6 ชม. ใช้ 200 มก. ทุก 6 ชม. ได้. ห้ามให้ขนาดนำใน cardiomyopathy หรืออาจมีหัวใจล้มเหลว (เริ่ม 100 มก. ทุก 6-8 ชม.) เริ่มยาในโรงพยาบาล"
    },
    maintenanceDose: {
      en: "Usual 400-800 mg/day in divided doses; most adults 600 mg/day (150 mg every 6 h immediate-release, or 300 mg every 12 h CR). Under 50 kg: 400 mg/day (100 mg every 6 h, or 200 mg every 12 h CR). Up to 1600 mg/day only in hospital for severe refractory VT.",
      th: "ปกติ 400-800 มก./วัน แบ่งให้ ผู้ใหญ่ส่วนใหญ่ 600 มก./วัน (150 มก. ทุก 6 ชม. ชนิดออกฤทธิ์ทันที หรือ 300 มก. ทุก 12 ชม. ชนิด CR) น้ำหนักน้อยกว่า 50 กก.: 400 มก./วัน (100 มก. ทุก 6 ชม. หรือ 200 มก. ทุก 12 ชม. CR) สูงสุด 1600 มก./วัน เฉพาะในโรงพยาบาลสำหรับ VT รุนแรงที่ดื้อยา"
    },
    pharmacokinetics: {
      onset: "30 min to 3 h after a 300 mg loading dose",
      peak: "Usually within 2 h (immediate-release)",
      halfLife: "Mean 6.7 h (4-10 h); 8-18 h if CrCl under 40 mL/min; longer in hepatic impairment",
      metabolism: "Hepatic CYP3A4; about 20% excreted as the mono-N-dealkylated metabolite",
      excretion: "About 50% unchanged in urine. Hemodialysis or charcoal hemoperfusion lowers levels in overdose."
    },
    renalAdjustment: {
      crcl50: "CrCl over 40: 400 mg/day in divided doses (100 mg every 6 h or 200 mg CR every 12 h) for moderate renal insufficiency",
      crcl30_50: "CrCl over 40: 400 mg/day divided. CrCl 30-40: 100 mg immediate-release every 8 h (with or without 150 mg load); CR not recommended",
      crcl10_30: "CrCl 15-30: 100 mg every 12 h; CrCl under 15: 100 mg every 24 h (immediate-release only)",
      crclLess10: "CrCl under 15: 100 mg every 24 h (immediate-release only)",
      hd: "Unknown (supplemental dose not stated; hemodialysis can lower levels in overdose)"
    },
    renalAdjust: true,
    hepaticAdjustment: "Hepatic insufficiency: 400 mg/day in divided doses (100 mg every 6 h, or 200 mg CR every 12 h).",
    cautionsAndWarnings: [
      "BOXED WARNING (CAST): reserve for life-threatening ventricular arrhythmias.",
      "Negative inotropy: may cause or worsen heart failure or severe hypotension; do not use in uncompensated or marginally compensated heart failure or hypotension unless caused by the arrhythmia.",
      "Anticholinergic: avoid in glaucoma, urinary retention, benign prostatic hypertrophy or myasthenia gravis unless overriding measures are taken; measure intraocular pressure if family history of glaucoma.",
      "QRS widening over 25%: stop the drug. QT prolongation and torsades de pointes can occur.",
      "Hypoglycemia (rare); higher risk in heart failure, malnutrition, hepatic or renal disease, or with beta-blockers or alcohol.",
      "Care in sick sinus syndrome, WPW or bundle branch block; stop if second- or third-degree AV block or new fascicular block develops unless paced."
    ],
    contraindications: [
      "Cardiogenic shock",
      "Pre-existing second- or third-degree AV block without a pacemaker",
      "Congenital QT prolongation",
      "Known hypersensitivity"
    ],
    adverseEffects: ["Dry mouth (32%)", "Urinary hesitancy (14%)", "Constipation (11%)", "Blurred vision, urinary retention, nausea, dizziness (3-9%)", "Hypotension and heart failure (most serious)"],
    monitoring: ["ECG: PR, QRS (stop if over 25% wider), QT", "Blood pressure and signs of heart failure", "Plasma levels if anticholinergic effects increase", "Blood glucose in at-risk patients", "Intraocular pressure if family history of glaucoma"],
    interactions: ["CYP3A4 inhibitors (clarithromycin, erythromycin): life-threatening interactions reported", "Phenytoin and other enzyme inducers: lower disopyramide levels", "Other antiarrhythmics (quinidine, procainamide, lidocaine, propranolol): excessive QRS widening or QT prolongation", "Verapamil: do not give within 48 h before or 24 h after", "Does not raise digoxin levels"],
    safeInHfref: false,
    safeCad: false,
    qtRisk: "Warning",
    nlem: { list: null },
    refs: {
      mech: ["lbl:disopyramide-norpace#Clinical Pharmacology"],
      dose: ["lbl:disopyramide-norpace#Dosage and Administration"],
      pk: ["lbl:disopyramide-norpace#Clinical Pharmacology, Overdosage"],
      renal: ["lbl:disopyramide-norpace#Dosage and Administration"],
      hepatic: ["lbl:disopyramide-norpace#Dosage and Administration"],
      warn: ["lbl:disopyramide-norpace#Boxed Warning, Warnings"],
      contra: ["lbl:disopyramide-norpace#Contraindications"],
      adverse: ["lbl:disopyramide-norpace#Adverse Reactions"],
      monitor: ["lbl:disopyramide-norpace#Warnings, Precautions"],
      interact: ["lbl:disopyramide-norpace#Precautions: Drug Interactions"],
      flags: ["lbl:disopyramide-norpace#Boxed Warning, Warnings (negative inotropy)"],
      nlem: ["nlem2569"]
    }
  },

  // --- CLASS Ib ---
  {
    id: "lidocaine",
    genericName: "Lidocaine",
    brandNames: [],
    vwClass: "Ib",
    classFullName: "Class Ib - Sodium Channel Blocker",
    color: "yellow",
    primaryTarget: "Raises the electrical stimulation threshold of the ventricle during diastole; no change in contractility, arterial pressure or absolute refractory period at usual doses",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Absolute refractory period unchanged at usual doses" },
    ecgEffects: { pr: "Prolongation is a sign of excess effect (stop infusion)", qrs: "Widening is a sign of excess effect (stop infusion)", qtc: "Unknown", hr: "Ventricular rate may rise in AF or flutter" },
    indications: ["vt_vf"],
    routes: ["IV"],
    acuteDose: {
      en: "AHA 2025 cardiac arrest (shock-refractory VF/pVT, as an alternative to amiodarone): 1-1.5 mg/kg IV/IO, second dose 0.5-0.75 mg/kg.\nLabel (ventricular arrhythmias): single IV bolus 1-1.5 mg/kg at 25-50 mg/min, under constant ECG monitoring.",
      th: "AHA 2025 หัวใจหยุดเต้น (VF/pVT ที่ช็อกไม่ได้ผล ใช้แทน amiodarone ได้): 1-1.5 มก./กก. IV/IO ครั้งที่สอง 0.5-0.75 มก./กก.\nฉลากยา (ventricular arrhythmia): ฉีด IV ครั้งเดียว 1-1.5 มก./กก. อัตรา 25-50 มก./นาที ภายใต้การติดตาม ECG ตลอด"
    },
    maintenanceDose: {
      en: "IV infusion 1-4 mg/min (0.02-0.05 mg/kg/min in a 70 kg adult): 4 mg/mL at 15-60 mL/h, or 8 mg/mL at 7.5-30 mL/h. Reduce the rate by about half after 24 h of infusion (clearance falls). Rarely needed beyond 24 h; stop at the earliest sign of toxicity or once the rhythm is stable.",
      th: "หยด IV 1-4 มก./นาที (0.02-0.05 มก./กก./นาที ในผู้ใหญ่ 70 กก.): 4 มก./มล. อัตรา 15-60 มล./ชม. หรือ 8 มก./มล. อัตรา 7.5-30 มล./ชม. ลดอัตราลงประมาณครึ่งหนึ่งหลังหยด 24 ชม. (การกำจัดยาลดลง) ไม่ค่อยต้องหยดเกิน 24 ชม. หยุดเมื่อเริ่มมีอาการพิษหรือจังหวะคงที่"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "1.5-2 h after an IV bolus; 2-fold or more in liver dysfunction; clearance falls after 24 h infusion",
      metabolism: "Hepatic CYP1A2 and CYP3A4 (N-dealkylation) to MEGX and GX (active, less potent)",
      excretion: "About 90% as metabolites, under 10% unchanged in urine. Severe renal dysfunction halves clearance and raises GX 1.5-fold."
    },
    renalAdjustment: {
      crcl50: "No change (mild-moderate renal impairment does not affect kinetics)",
      crcl30_50: "No change (mild-moderate renal impairment does not affect kinetics)",
      crcl10_30: "eGFR under 30: lower maintenance infusion rate with close monitoring for toxicity",
      crclLess10: "eGFR under 30: lower maintenance infusion rate with close monitoring for toxicity",
      hd: "Unknown"
    },
    renalAdjust: true,
    hepaticAdjustment: "Lower maintenance infusion rate with close monitoring for toxicity (half-life may double or more).",
    cautionsAndWarnings: [
      "CNS toxicity rises with venous levels above 6 mcg/mL: drowsiness, tinnitus, paresthesia, confusion, tremor, convulsions, respiratory depression.",
      "Stop the infusion if PR prolongs, QRS widens or arrhythmias appear or worsen.",
      "Sinus bradycardia or incomplete heart block: giving lidocaine without first raising the heart rate (isoproterenol or pacing) may cause worse ventricular arrhythmias or complete heart block.",
      "Ventricular rate may accelerate in atrial fibrillation or flutter.",
      "Renal or hepatic insufficiency raises toxicity risk.",
      "Methemoglobinemia has been reported."
    ],
    contraindications: [
      "Hypersensitivity to amide-type local anesthetics",
      "Stokes-Adams syndrome",
      "Wolff-Parkinson-White syndrome",
      "Severe sinoatrial, atrioventricular or intraventricular block"
    ],
    adverseEffects: ["CNS: drowsiness, dizziness, tinnitus, paresthesia, confusion, tremor, convulsions, respiratory depression", "Bradycardia, hypotension, cardiac arrest", "Methemoglobinemia", "Allergic reactions (infrequent)"],
    monitoring: ["Constant ECG monitoring during infusion", "Signs of CNS toxicity", "Infusion rate with a calibrated device; review after 24 h"],
    interactions: ["CYP1A2 and/or CYP3A4 inhibitors (e.g. fluvoxamine, propofol): higher lidocaine levels", "CYP1A2/CYP3A4 inducers (e.g. phenytoin): lower levels", "Beta-blockers (e.g. propranolol): higher levels by lowering hepatic blood flow", "Digitalis toxicity with AV block: monitor for toxicity", "Incompatible in the line with amphotericin, cefazolin, phenytoin"],
    safeInHfref: true,
    safeCad: true,
    qtRisk: "None",
    nlem: { list: "b", old: "ก", items: [{ form: "Lidocaine HCl (preservative free) sterile sol, 1% and 2%", cond: "ใช้สำหรับ ventricular arrhythmias" }] },
    refs: {
      mech: ["lbl:lidocaine-premix#Clinical Pharmacology: Mechanism of Action", "lbl:lidocaine-premix#Warnings"],
      dose: ["aha25-ca", "lbl:lidocaine-premix#Dosage and Administration"],
      pk: ["lbl:lidocaine-premix#Clinical Pharmacology"],
      renal: ["lbl:lidocaine-premix#Dosage and Administration, Clinical Pharmacology"],
      hepatic: ["lbl:lidocaine-premix#Dosage and Administration, Clinical Pharmacology"],
      warn: ["lbl:lidocaine-premix#Warnings, Clinical Pharmacology"],
      contra: ["lbl:lidocaine-premix#Contraindications"],
      adverse: ["lbl:lidocaine-premix#Adverse Reactions"],
      monitor: ["lbl:lidocaine-premix#Dosage and Administration"],
      interact: ["lbl:lidocaine-premix#Precautions: Drug Interactions; Dosage and Administration"],
      flags: ["lbl:lidocaine-premix#Clinical Pharmacology (no change in contractility)", "lbl:lidocaine-premix#Indications (ventricular arrhythmias in acute MI)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "mexiletine",
    genericName: "Mexiletine",
    brandNames: [],
    vwClass: "Ib",
    classFullName: "Class Ib - Oral Sodium Channel Blocker",
    color: "yellow",
    primaryTarget: "Inhibits the inward sodium current (like lidocaine; orally active)",
    actionPotential: { phase0: "Rate of rise reduced", apd: "Unknown", erp: "Decreased in Purkinje fibers" },
    ecgEffects: { pr: "Unknown", qrs: "Not prolonged", qtc: "Not prolonged", hr: "Sinus rate may fall in pre-existing conduction disease" },
    indications: ["vt_vf"],
    routes: ["PO"],
    acuteDose: {
      en: "When rapid control is essential: loading dose 400 mg, then 200 mg 8 h later; effect usually within 30 min to 2 h. Start in hospital.",
      th: "เมื่อต้องการควบคุมอย่างรวดเร็ว: ขนาดนำ 400 มก. แล้ว 200 มก. ในอีก 8 ชม. ออกฤทธิ์ภายใน 30 นาทีถึง 2 ชม. เริ่มยาในโรงพยาบาล"
    },
    maintenanceDose: {
      en: "Start 200 mg every 8 h with food or antacid; adjust by 50-100 mg no sooner than every 2-3 days. Most patients: 200-300 mg every 8 h; 400 mg every 8 h may be tried. Maximum 1200 mg/day. If controlled on 300 mg or less every 8 h, the same daily dose may be split every 12 h (up to 450 mg every 12 h).",
      th: "เริ่ม 200 มก. ทุก 8 ชม. พร้อมอาหารหรือยาลดกรด ปรับครั้งละ 50-100 มก. ห่างกันอย่างน้อย 2-3 วัน ส่วนใหญ่ 200-300 มก. ทุก 8 ชม. ลอง 400 มก. ทุก 8 ชม. ได้ สูงสุด 1200 มก./วัน ถ้าคุมได้ที่ 300 มก. หรือน้อยกว่าทุก 8 ชม. แบ่งให้ทุก 12 ชม. ได้ (สูงสุด 450 มก. ทุก 12 ชม.)"
    },
    pharmacokinetics: {
      onset: "30 min to 2 h after a loading dose",
      peak: "2-3 h",
      halfLife: "About 10-12 h in normal subjects; prolonged in hepatic impairment",
      metabolism: "Hepatic, mainly CYP2D6 (also CYP1A2); about 90% to inactive metabolites; low first-pass",
      excretion: "Limited renal elimination"
    },
    renalAdjustment: {
      crcl50: "Usual dose",
      crcl30_50: "Usual dose (renal failure generally needs the usual dose)",
      crcl10_30: "Usual dose (renal failure generally needs the usual dose)",
      crclLess10: "Usual dose (renal failure generally needs the usual dose)",
      hd: "Unknown"
    },
    renalAdjust: false,
    hepaticAdjustment: "Severe liver disease (or marked right-sided heart failure) may need lower doses with close monitoring.",
    cautionsAndWarnings: [
      "BOXED WARNING (CAST): reserve for life-threatening ventricular arrhythmias.",
      "BOXED WARNING: abnormal liver tests after starting, mostly with heart failure or ischemia; rare severe liver injury including necrosis.",
      "Caution in hypotension and severe heart failure.",
      "Caution in known seizure disorder; convulsions reported (about 2 in 1000).",
      "DRESS reported: stop if suspected.",
      "Blood dyscrasias: marked leukopenia or agranulocytosis in a small number of patients."
    ],
    contraindications: [
      "Cardiogenic shock",
      "Pre-existing second- or third-degree AV block without a pacemaker"
    ],
    adverseEffects: ["Upper GI distress (41%)", "Tremor (12.6%)", "Lightheadedness (10.5%)", "Coordination difficulty (10.2%)", "Reactions led to stopping therapy in 40% in controlled trials"],
    monitoring: ["Clinical and ECG response (Holter if needed) when titrating", "Liver function if abnormal tests or symptoms", "Theophylline levels if co-prescribed", "Plasma levels with enzyme inducers"],
    interactions: ["CYP1A2 inhibitors (fluvoxamine): clearance down 38%", "Propafenone: clearance down about 70% in extensive CYP2D6 metabolizers; titrate slowly", "Phenytoin, rifampin, phenobarbital: lower mexiletine levels", "Theophylline: levels rise; monitor"],
    safeInHfref: false,
    safeCad: false,
    qtRisk: "None",
    nlem: { list: null },
    refs: {
      mech: ["lbl:mexiletine-cap#Clinical Pharmacology"],
      dose: ["lbl:mexiletine-cap#Dosage and Administration"],
      pk: ["lbl:mexiletine-cap#Clinical Pharmacology"],
      renal: ["lbl:mexiletine-cap#Dosage and Administration, Clinical Pharmacology"],
      hepatic: ["lbl:mexiletine-cap#Dosage and Administration, Precautions"],
      warn: ["lbl:mexiletine-cap#Boxed Warning, Precautions"],
      contra: ["lbl:mexiletine-cap#Contraindications"],
      adverse: ["lbl:mexiletine-cap#Adverse Reactions"],
      monitor: ["lbl:mexiletine-cap#Dosage and Administration, Precautions"],
      interact: ["lbl:mexiletine-cap#Precautions: Drug Interactions"],
      flags: ["lbl:mexiletine-cap#Boxed Warning (CAST), Precautions (severe heart failure)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "phenytoin",
    genericName: "Phenytoin",
    brandNames: [],
    vwClass: "Ib",
    classFullName: "Class Ib - Sodium Channel Blocker (antiepileptic; no antiarrhythmic indication in the label)",
    color: "yellow",
    primaryTarget: "Unknown (the injection label covers seizures only)",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Unknown", qrs: "Unknown", qtc: "Unknown", hr: "Bradycardia and heart block reported with IV use" },
    indications: ["vt_vf"],
    routes: ["IV"],
    acuteDose: {
      en: "Antiarrhythmic dose: Unknown (no source checked gives one; the US injection label has no arrhythmia indication). Label limit for any IV use: no faster than 50 mg/min in adults (severe hypotension and arrhythmias with faster infusion).",
      th: "ขนาดยาสำหรับรักษาหัวใจเต้นผิดจังหวะ: ไม่ทราบ (แหล่งอ้างอิงที่ตรวจไม่ระบุ ฉลากยาฉีดของสหรัฐฯ ไม่มีข้อบ่งใช้ด้านหัวใจ) ข้อจำกัดของฉลากสำหรับการให้ IV ทุกกรณี: ไม่เร็วกว่า 50 มก./นาที ในผู้ใหญ่ (ให้เร็วกว่านี้ทำให้ความดันต่ำรุนแรงและหัวใจเต้นผิดจังหวะ)"
    },
    maintenanceDose: {
      en: "Unknown for arrhythmia (label covers seizures only).",
      th: "ไม่ทราบสำหรับหัวใจเต้นผิดจังหวะ (ฉลากยาครอบคลุมเฉพาะอาการชัก)"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "10-15 h after IV dosing",
      metabolism: "Hepatic, mainly CYP2C9, less CYP2C19; CYP2C9*3 carriers clear it more slowly",
      excretion: "Unknown"
    },
    renalAdjustment: {
      crcl50: "Unknown",
      crcl30_50: "Unknown (label: unbound fraction rises in renal disease; monitor unbound levels)",
      crcl10_30: "Unknown (label: unbound fraction rises in renal disease; monitor unbound levels)",
      crclLess10: "Unknown (label: unbound fraction rises in renal disease; monitor unbound levels)",
      hd: "Unknown"
    },
    renalAdjust: null,
    hepaticAdjustment: "Unknown dose rule (label: unbound fraction rises in hepatic disease; monitor unbound levels; contraindicated after prior phenytoin hepatotoxicity).",
    cautionsAndWarnings: [
      "BOXED WARNING: IV rate must not exceed 50 mg/min in adults; faster infusion risks severe hypotension and cardiac arrhythmias. Monitor the heart carefully during and after IV infusion.",
      "Cardiac arrhythmias (bradycardia, heart block, VT, VF, asystole) have occurred, including at recommended doses and rates.",
      "Local toxicity, including purple glove syndrome, after peripheral IV injection.",
      "Serious skin reactions; higher risk with HLA-B*1502 or CYP2C9*3."
    ],
    contraindications: [
      "Hypersensitivity to phenytoin or other hydantoins",
      "Sinus bradycardia, sino-atrial block, second- or third-degree AV block, Adams-Stokes syndrome",
      "Prior acute hepatotoxicity from phenytoin",
      "Coadministration with delavirdine"
    ],
    adverseEffects: ["Hypotension and arrhythmias with IV use", "Purple glove syndrome", "Serious skin reactions"],
    monitoring: ["Cardiac and respiratory monitoring during and after IV infusion", "Serum levels (unbound levels in renal or hepatic disease or low albumin)"],
    interactions: ["Unknown for the antiarrhythmic setting; phenytoin is a CYP2C9/CYP2C19 substrate (see full label)"],
    safeInHfref: null,
    safeCad: null,
    qtRisk: "None",
    nlem: { list: "b", old: "ก", items: [{ form: "Phenytoin sodium sterile sol (listed under 4.8 Antiepileptics)", cond: "-" }] },
    refs: {
      mech: ["lbl:phenytoin-inj#Indications"],
      dose: ["lbl:phenytoin-inj#Boxed Warning, Indications"],
      pk: ["lbl:phenytoin-inj#Clinical Pharmacology"],
      renal: ["lbl:phenytoin-inj#Clinical Pharmacology, Dosage and Administration"],
      hepatic: ["lbl:phenytoin-inj#Contraindications, Clinical Pharmacology"],
      warn: ["lbl:phenytoin-inj#Boxed Warning, Warnings and Precautions"],
      contra: ["lbl:phenytoin-inj#Contraindications"],
      adverse: ["lbl:phenytoin-inj#Warnings and Precautions"],
      monitor: ["lbl:phenytoin-inj#Warnings and Precautions, Dosage and Administration"],
      interact: ["lbl:phenytoin-inj#Clinical Pharmacology: Drug Interaction Studies"],
      flags: [],
      nlem: ["nlem2569"]
    }
  }
];
