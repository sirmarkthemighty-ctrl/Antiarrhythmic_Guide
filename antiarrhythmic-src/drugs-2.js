// --- Drug records, part 2: Class Ic and II --- (see drugs-1.js for the conventions)
const DRUGS_PART_2 = [
  // --- CLASS Ic ---
  {
    id: "flecainide",
    genericName: "Flecainide",
    brandNames: [],
    vwClass: "Ic",
    classFullName: "Class Ic - Sodium Channel Blocker",
    color: "rose",
    primaryTarget: "Class 1C sodium channel block (ACC/AHA 2023: inhibits INa); negative inotropic effect",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Prolonged, about 25% on average (one-third develop first-degree AV block)", qrs: "Widened, about 25% on average (up to 150%)", qtc: "About 8% longer, mostly from QRS widening (JT about 4%)", hr: "Sinus bradycardia, pause or arrest possible in sick sinus syndrome" },
    indications: ["af_rhythm", "svt", "vt_vf"],
    routes: ["PO"],
    acuteDose: {
      en: "ACC/AHA 2023 (single-dose conversion of AF, including pill-in-the-pocket): 200 mg if under 70 kg, 300 mg if over 70 kg; conversion in 3-8 h. A beta-blocker or non-dihydropyridine CCB is generally given at least 30 min before, to prevent 1:1 AV conduction in atrial flutter. Not for patients with structural heart disease (label indication: patients without structural heart disease).",
      th: "ACC/AHA 2023 (ให้ครั้งเดียวเพื่อแปลง AF รวมถึง pill-in-the-pocket): 200 มก. ถ้าน้ำหนักน้อยกว่า 70 กก. หรือ 300 มก. ถ้ามากกว่า 70 กก. กลับจังหวะใน 3-8 ชม. มักให้ beta-blocker หรือ non-DHP CCB อย่างน้อย 30 นาทีก่อน เพื่อป้องกัน 1:1 AV conduction ใน atrial flutter ห้ามใช้ในผู้ป่วยโรคหัวใจเชิงโครงสร้าง (ข้อบ่งใช้ตามฉลาก: ผู้ป่วยที่ไม่มีโรคหัวใจเชิงโครงสร้าง)"
    },
    maintenanceDose: {
      en: "PSVT or paroxysmal AF/flutter: start 50 mg every 12 h; increase by 50 mg twice daily no more often than every 4 days; max 300 mg/day. Sustained VT (start in hospital): 100 mg every 12 h, increase by 50 mg twice daily every 4 days; most need no more than 150 mg every 12 h; max 400 mg/day. No loading dose. Amiodarone co-therapy: halve the flecainide dose.",
      th: "PSVT หรือ paroxysmal AF/flutter: เริ่ม 50 มก. ทุก 12 ชม. เพิ่มครั้งละ 50 มก. วันละ 2 ครั้ง ห่างกันอย่างน้อย 4 วัน สูงสุด 300 มก./วัน. Sustained VT (เริ่มในโรงพยาบาล): 100 มก. ทุก 12 ชม. เพิ่มครั้งละ 50 มก. วันละ 2 ครั้ง ทุก 4 วัน ส่วนใหญ่ไม่เกิน 150 มก. ทุก 12 ชม. สูงสุด 400 มก./วัน ไม่ให้ขนาดนำ. ใช้ร่วมกับ amiodarone: ลดขนาด flecainide ลงครึ่งหนึ่ง"
    },
    pharmacokinetics: {
      onset: "Conversion in 3-8 h after a single oral dose (ACC/AHA 2023)",
      peak: "Unknown",
      halfLife: "12-27 h in patients; steady state after 3-5 days; longer in renal or hepatic impairment",
      metabolism: "Extensive hepatic metabolism; CYP2D6 substrate",
      excretion: "About 30% (10-50%) unchanged in urine. Hemodialysis removes only about 1%."
    },
    renalAdjustment: {
      crcl50: "Less severe renal disease: start 100 mg every 12 h; plasma levels may help",
      crcl30_50: "CrCl over 35: start 100 mg every 12 h. CrCl 35 or less (per 1.73 m2): start 100 mg once daily or 50 mg twice daily with frequent plasma levels",
      crcl10_30: "Start 100 mg once daily or 50 mg twice daily; frequent plasma level monitoring; increase very cautiously after levels plateau (over 4 days)",
      crclLess10: "Start 100 mg once daily or 50 mg twice daily; frequent plasma level monitoring",
      hd: "Hemodialysis is not effective (removes about 1%)"
    },
    renalAdjust: true,
    hepaticAdjustment: "Significant hepatic impairment: do not use unless benefit clearly outweighs risk (elimination markedly slower); monitor plasma levels.",
    cautionsAndWarnings: [
      "BOXED WARNING (CAST): excess mortality after myocardial infarction (5.1% vs 2.3% death or cardiac arrest); do not use after recent MI; Class 1C risks generally unacceptable without life-threatening ventricular arrhythmias.",
      "BOXED WARNING: not recommended in chronic atrial fibrillation; ventricular proarrhythmia (VT, VF, death) reported in AF/flutter.",
      "1:1 AV conduction in atrial flutter as the atrial rate slows; negative chronotropic co-therapy (digoxin, beta-blocker) may lower the risk.",
      "Negative inotropy: may cause or worsen heart failure, especially with cardiomyopathy, NYHA III-IV, or EF under 30%.",
      "Raises endocardial pacing thresholds: check before, after 1 week and regularly.",
      "Extreme caution in sick sinus syndrome.",
      "Proarrhythmia: 80% of events in sustained-VT patients occurred within 14 days."
    ],
    contraindications: [
      "Pre-existing second- or third-degree AV block, or right bundle branch block with left hemiblock, unless paced",
      "Cardiogenic shock",
      "Known hypersensitivity"
    ],
    adverseEffects: ["New or worsened arrhythmias (1% in PSVT, 7% in paroxysmal AF)", "New or worsened heart failure (0.4% in supraventricular arrhythmias; 9.1% in sustained VT)", "ACC/AHA 2023 list: atrial flutter, AV block, dizziness, dyspnea, headache, nausea, visual disturbances, VT"],
    monitoring: ["ECG: PR, QRS, QT", "Plasma trough levels (0.2-1 mcg/mL suggested for maximal effect); strongly advised with amiodarone, and in heart failure or renal disease", "Pacing thresholds in paced patients"],
    interactions: ["Amiodarone: flecainide levels may double; reduce flecainide dose by 50%", "Digoxin: digoxin levels up 13-19%", "Cimetidine: flecainide levels up about 30%", "CYP2D6 inhibitors (e.g. quinidine; ACC/AHA 2023: duloxetine, fluoxetine, paroxetine): may raise levels", "Enzyme inducers (phenytoin, phenobarbital, carbamazepine): elimination up about 30%", "Propranolol: PR effects less than additive"],
    safeInHfref: false,
    safeCad: false,
    qtRisk: "Warning",
    nlem: { list: "ex", old: "ง", items: [{ form: "Flecainide acetate tab", cond: "ใช้กับผู้ป่วยที่ใช้ยาอื่นควบคุมจังหวะการเต้นผิดปกติของหัวใจไม่ได้หรือไม่ได้ผล" }] },
    refs: {
      mech: ["lbl:flecainide-tab#Warnings (conduction, heart failure)", "acc23-af#Table 23"],
      dose: ["acc23-af#Table 22 and text (pill-in-the-pocket)", "lbl:flecainide-tab#Indications, Dosage and Administration"],
      pk: ["lbl:flecainide-tab#Dosage and Administration, Clinical Pharmacology, Overdosage", "acc23-af#Table 22"],
      renal: ["lbl:flecainide-tab#Dosage and Administration, Overdosage"],
      hepatic: ["lbl:flecainide-tab#Precautions"],
      warn: ["lbl:flecainide-tab#Boxed Warnings, Warnings"],
      contra: ["lbl:flecainide-tab#Contraindications"],
      adverse: ["lbl:flecainide-tab#Adverse Reactions", "acc23-af#Table 22"],
      monitor: ["lbl:flecainide-tab#Dosage and Administration: Plasma Level Monitoring, Warnings"],
      interact: ["lbl:flecainide-tab#Precautions: Drug Interactions", "acc23-af#Table 23"],
      flags: ["lbl:flecainide-tab#Boxed Warnings (CAST), Warnings (heart failure)", "acc23-af#text (CAST)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "propafenone",
    genericName: "Propafenone",
    brandNames: [],
    vwClass: "Ic",
    classFullName: "Class Ic - Sodium Channel Blocker with Weak Beta-Blocking Activity",
    color: "rose",
    primaryTarget: "Reduces the fast inward sodium current (Purkinje > myocardial fibers); beta-blocking potency about 1/40 of propranolol",
    actionPotential: { phase0: "Fast sodium current reduced", apd: "Unknown", erp: "Prolonged" },
    ecgEffects: { pr: "Prolonged (dose-related first-degree AV block)", qrs: "Widened (intraventricular conduction delay)", qtc: "May prolong", hr: "Bradycardia possible" },
    indications: ["af_rhythm", "svt", "vt_vf"],
    routes: ["PO"],
    acuteDose: {
      en: "ACC/AHA 2023 (single-dose conversion of AF, including pill-in-the-pocket): 450 mg if under 70 kg, 600 mg if over 70 kg; conversion in 3-8 h. A beta-blocker or non-dihydropyridine CCB is generally given at least 30 min before. Only without structural heart disease. IV propafenone: Unknown (no source checked).",
      th: "ACC/AHA 2023 (ให้ครั้งเดียวเพื่อแปลง AF รวมถึง pill-in-the-pocket): 450 มก. ถ้าน้ำหนักน้อยกว่า 70 กก. หรือ 600 มก. ถ้ามากกว่า 70 กก. กลับจังหวะใน 3-8 ชม. มักให้ beta-blocker หรือ non-DHP CCB อย่างน้อย 30 นาทีก่อน ใช้เฉพาะผู้ที่ไม่มีโรคหัวใจเชิงโครงสร้าง. Propafenone ฉีด: ไม่ทราบ (ไม่มีในแหล่งที่ตรวจ)"
    },
    maintenanceDose: {
      en: "Immediate-release: 150 mg every 8 h; after at least 3-4 days may increase to 225 mg every 8 h, then 300 mg every 8 h (900 mg/day; higher not established). Extended-release: 225 mg every 12 h; after at least 5 days 325 mg, then 425 mg every 12 h. Increase more gradually in the elderly or with marked myocardial damage.",
      th: "ชนิดออกฤทธิ์ทันที: 150 มก. ทุก 8 ชม. หลังอย่างน้อย 3-4 วัน เพิ่มเป็น 225 มก. ทุก 8 ชม. และ 300 มก. ทุก 8 ชม. ได้ (900 มก./วัน ขนาดที่สูงกว่านี้ยังไม่มีข้อมูล). ชนิดออกฤทธิ์นาน: 225 มก. ทุก 12 ชม. หลังอย่างน้อย 5 วัน เพิ่มเป็น 325 มก. และ 425 มก. ทุก 12 ชม. ผู้สูงอายุหรือกล้ามเนื้อหัวใจเสียหายมากให้เพิ่มช้ากว่านี้"
    },
    pharmacokinetics: {
      onset: "Conversion in 3-8 h after a single oral dose (ACC/AHA 2023)",
      peak: "About 3.5 h (immediate-release)",
      halfLife: "2-10 h in extensive metabolizers (over 90% of patients); 10-32 h in poor CYP2D6 metabolizers; about 9 h in moderate-severe liver disease",
      metabolism: "Saturable first-pass metabolism, CYP2D6, CYP3A4, CYP1A2; bioavailability 3-40% normally, about 70% in severe liver dysfunction",
      excretion: "About 50% of metabolites in urine"
    },
    renalAdjustment: {
      crcl50: "Unknown (no CrCl dose rule in label)",
      crcl30_50: "Unknown (label: monitor for signs of overdose in renal impairment)",
      crcl10_30: "Unknown (label: monitor for signs of overdose in renal impairment)",
      crclLess10: "Unknown (label: monitor for signs of overdose in renal impairment)",
      hd: "Unknown"
    },
    renalAdjust: null,
    hepaticAdjustment: "Consider reducing the dose (bioavailability rises to about 70% in severe liver dysfunction; clearance falls).",
    cautionsAndWarnings: [
      "BOXED WARNING (CAST): consider any Class IC drug to carry significant proarrhythmic risk in structural heart disease; avoid in non-life-threatening ventricular arrhythmias.",
      "Proarrhythmia: sudden death, VF, VT, asystole, torsades; may worsen PVCs or SVT and prolong QT. ECG before and during therapy.",
      "May unmask Brugada syndrome: ECG after starting; stop if suggestive.",
      "Atrial flutter: 1:1 conduction reported; give with a drug that lengthens AV-node refractoriness. Do not use for rate control in AF.",
      "May provoke overt heart failure; conduction disturbances (first-degree AV block, intraventricular delay).",
      "Agranulocytosis, usually in the first 2 months.",
      "Avoid with both a CYP2D6 inhibitor and a CYP3A4 inhibitor; avoid other QT-prolonging drugs."
    ],
    contraindications: [
      "Heart failure",
      "Cardiogenic shock",
      "Sinoatrial, AV or intraventricular conduction disorders (e.g. sick sinus syndrome, AV block) without a pacemaker",
      "Known Brugada syndrome",
      "Bradycardia",
      "Marked hypotension",
      "Bronchospastic disorders or severe obstructive pulmonary disease",
      "Marked electrolyte imbalance"
    ],
    adverseEffects: ["Most common (over 5%): unusual taste, nausea/vomiting, dizziness, constipation, headache, fatigue, first-degree AV block, intraventricular conduction delay", "About 20% stopped treatment for adverse reactions"],
    monitoring: ["ECG before and during therapy (QRS, PR, Brugada pattern)", "Digoxin levels if co-prescribed", "INR if on warfarin", "Signs of overdose in renal impairment"],
    interactions: ["CYP2D6 inhibitors (desipramine, paroxetine, sertraline, quinidine) and CYP3A4 inhibitors (ketoconazole, erythromycin, ritonavir, grapefruit): higher levels; avoid both together", "Amiodarone: not recommended together", "Digoxin: digoxin AUC up 60-270%; monitor and adjust", "Warfarin: warfarin levels up 39%; monitor INR", "Cimetidine: propafenone up 20%", "Lidocaine: more CNS side effects", "Orlistat: lower propafenone exposure"],
    safeInHfref: false,
    safeCad: false,
    qtRisk: "Warning",
    nlem: { list: "ex", old: "ง", items: [{ form: "Propafenone HCl tab", cond: "ใช้กับผู้ป่วยที่ใช้ยาอื่นควบคุมจังหวะการเต้นผิดปกติของหัวใจไม่ได้หรือไม่ได้ผล" }] },
    refs: {
      mech: ["lbl:propafenone-ir#Clinical Pharmacology, Warnings and Precautions"],
      dose: ["acc23-af#Table 22 and text (pill-in-the-pocket)", "lbl:propafenone-ir#Dosage and Administration", "lbl:propafenone-er#Dosage and Administration"],
      pk: ["lbl:propafenone-ir#Clinical Pharmacology", "acc23-af#Table 22"],
      renal: ["lbl:propafenone-ir#Use in Specific Populations"],
      hepatic: ["lbl:propafenone-ir#Dosage and Administration, Clinical Pharmacology"],
      warn: ["lbl:propafenone-ir#Boxed Warning, Indications, Warnings and Precautions"],
      contra: ["lbl:propafenone-ir#Contraindications"],
      adverse: ["lbl:propafenone-ir#Adverse Reactions"],
      monitor: ["lbl:propafenone-ir#Warnings and Precautions, Drug Interactions"],
      interact: ["lbl:propafenone-ir#Drug Interactions"],
      flags: ["lbl:propafenone-ir#Boxed Warning, Contraindications (heart failure)"],
      nlem: ["nlem2569"]
    }
  },

  // --- CLASS II ---
  {
    id: "esmolol",
    genericName: "Esmolol",
    brandNames: ["Brevibloc"],
    vwClass: "II",
    classFullName: "Class II - Short-Acting Beta-1 Selective Blocker",
    color: "indigo",
    primaryTarget: "Beta-1 selective adrenergic blocker; rapid onset, very short action; no significant intrinsic sympathomimetic or membrane-stabilizing activity",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "AH interval prolonged", qrs: "Unknown", qtc: "Unknown", hr: "Decreased; sinus node recovery time prolonged" },
    indications: ["af_rate", "svt"],
    routes: ["IV"],
    acuteDose: {
      en: "SVT, AF/flutter rate control, or noncompensatory sinus tachycardia: optional load 500 mcg/kg over 1 min, then 50 mcg/kg/min for 4 min; repeat the load if needed and step up to 100, 150, then 200 mcg/kg/min (each for 4 min). Titrate at intervals of 4 min or more. Doses above 200 mcg/kg/min add little rate lowering and more adverse effects (up to 300 is for hypertension). Without a load, steady state takes about 30 min.",
      th: "SVT ควบคุมอัตราเต้นใน AF/flutter หรือ sinus tachycardia ที่ไม่ใช่การชดเชย: ขนาดนำ (ไม่บังคับ) 500 มคก./กก. ใน 1 นาที แล้ว 50 มคก./กก./นาที นาน 4 นาที ให้ขนาดนำซ้ำได้ และเพิ่มเป็น 100, 150 และ 200 มคก./กก./นาที (ขั้นละ 4 นาที) ปรับทุก 4 นาทีขึ้นไป ขนาดเกิน 200 มคก./กก./นาที ลดอัตราเต้นได้น้อยแต่ผลข้างเคียงมากขึ้น (สูงถึง 300 ใช้สำหรับความดันสูง) ถ้าไม่ให้ขนาดนำ ถึงระดับคงที่ในประมาณ 30 นาที"
    },
    maintenanceDose: {
      en: "Maintenance infusion 50-200 mcg/kg/min (as low as 25 may suffice), for up to 48 h. Short-term use only; switch to an oral agent for longer control.",
      th: "หยดต่อเนื่อง 50-200 มคก./กก./นาที (ต่ำถึง 25 อาจพอ) นานได้ถึง 48 ชม. ใช้ระยะสั้นเท่านั้น หากต้องคุมนานให้เปลี่ยนเป็นยารับประทาน"
    },
    pharmacokinetics: {
      onset: "Rapid",
      peak: "Steady state about 30 min without a loading dose",
      halfLife: "About 9 min; substantial recovery from beta blockade 10-20 min after stopping. Acid metabolite about 3.7 h (about 48 h in ESRD)",
      metabolism: "Red blood cell esterases to an acid metabolite with negligible activity",
      excretion: "Acid metabolite 73-88% of the dose in urine within 24 h"
    },
    renalAdjustment: {
      crcl50: "No adjustment",
      crcl30_50: "No adjustment",
      crcl10_30: "No adjustment (label: for a maintenance infusion of 150 mcg/kg/min for 4 h)",
      crclLess10: "No adjustment for 150 mcg/kg/min over 4 h; acid metabolite half-life about 48 h in ESRD",
      hd: "Unknown (IV beta-blockers may cause life-threatening hyperkalemia in hemodialysis patients)"
    },
    renalAdjust: false,
    hepaticAdjustment: "No special precautions (metabolized by red blood cell esterases).",
    cautionsAndWarnings: [
      "Hypotension is the most important and common adverse effect.",
      "May depress contractility and precipitate heart failure or cardiogenic shock.",
      "Bradycardia, sinus pause, heart block, cardiac arrest.",
      "Bronchospasm: stop the infusion; a beta-2 agonist may be given.",
      "Infusion site reactions including thrombophlebitis, necrosis and blistering, especially with extravasation.",
      "Abrupt stop in coronary disease: angina, MI or ventricular arrhythmias.",
      "Hyperkalemia (renal impairment, hemodialysis); hyperkalemic renal tubular acidosis."
    ],
    contraindications: [
      "Severe sinus bradycardia",
      "Heart block greater than first degree",
      "Sick sinus syndrome",
      "Decompensated heart failure",
      "Cardiogenic shock",
      "IV cardiodepressant calcium-channel blockers (e.g. verapamil) given close in time (fatal cardiac arrests reported)",
      "Pulmonary hypertension",
      "Hypersensitivity to esmolol"
    ],
    adverseEffects: ["Symptomatic and asymptomatic hypotension (over 10%)", "Dizziness, sweating", "Infusion site reactions"],
    monitoring: ["Ventricular rate and blood pressure; titrate at 4-min intervals or longer", "Infusion site", "Potassium in renal impairment"],
    interactions: ["Digoxin: digoxin levels up about 10-20%; additive bradycardia", "IV verapamil or other cardiodepressant CCBs: contraindicated in close proximity", "Clonidine, guanfacine, moxonidine: withdrawal rebound hypertension", "Succinylcholine, mivacurium: prolonged block", "Other drugs that lower BP, contractility or conduction: exaggerated effects"],
    safeInHfref: false,
    safeCad: true,
    qtRisk: "None",
    nlem: { list: "ex", old: "ง", items: [{ form: "Esmolol HCl sterile sol", cond: "1. SVT หรือ non-compensatory sinus tachycardia ในผู้ป่วยที่เสี่ยงภาวะแทรกซ้อนทางหัวใจและหลอดเลือด ระหว่างและหลังผ่าตัด 2. ควบคุมอัตราเต้นหัวใจระหว่างและหลังผ่าตัด ระหว่างระงับความรู้สึก หรือทำหัตถการ เช่น CT heart 3. สั่งใช้โดยแพทย์ผู้เชี่ยวชาญสาขาวิสัญญีวิทยา อายุรศาสตร์ ศัลยศาสตร์ทรวงอก และศัลยศาสตร์หลอดเลือด (ใช้ระยะสั้นไม่เกิน 24 ชั่วโมง)" }] },
    refs: {
      mech: ["lbl:esmolol-brevibloc#Clinical Pharmacology"],
      dose: ["lbl:esmolol-brevibloc#Dosage and Administration", "acc23-af#Table 21", "aha25-als#Table (AF/AFL rate control)"],
      pk: ["lbl:esmolol-brevibloc#Clinical Pharmacology"],
      renal: ["lbl:esmolol-brevibloc#Use in Specific Populations, Clinical Pharmacology, Warnings"],
      hepatic: ["lbl:esmolol-brevibloc#Use in Specific Populations"],
      warn: ["lbl:esmolol-brevibloc#Warnings and Precautions"],
      contra: ["lbl:esmolol-brevibloc#Contraindications"],
      adverse: ["lbl:esmolol-brevibloc#Adverse Reactions"],
      monitor: ["lbl:esmolol-brevibloc#Dosage and Administration, Warnings and Precautions"],
      interact: ["lbl:esmolol-brevibloc#Drug Interactions, Contraindications"],
      flags: ["lbl:esmolol-brevibloc#Contraindications (decompensated heart failure)", "aha25-als#Table (avoid in decompensated HF)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "metoprolol",
    genericName: "Metoprolol",
    brandNames: ["Lopressor", "Toprol-XL"],
    vwClass: "II",
    classFullName: "Class II - Cardioselective Beta-1 Blocker",
    color: "indigo",
    primaryTarget: "Relatively beta-1 selective adrenergic blocker (selectivity falls at higher levels)",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "First-degree AV block more frequent than placebo (5.3% vs 1.9% in acute MI)", qrs: "Unknown", qtc: "Unknown", hr: "Decreased" },
    indications: ["af_rate", "svt"],
    routes: ["IV", "PO"],
    acuteDose: {
      en: "AF/flutter rate control (AHA 2025, ACC/AHA 2023): metoprolol tartrate 2.5-5 mg IV over 2 min, up to 3 doses. Avoid in decompensated heart failure. (No current US IV label was found in this check.)",
      th: "ควบคุมอัตราเต้นใน AF/flutter (AHA 2025, ACC/AHA 2023): metoprolol tartrate 2.5-5 มก. IV ใน 2 นาที ได้ถึง 3 ครั้ง หลีกเลี่ยงในหัวใจล้มเหลวที่ไม่คงที่ (การตรวจนี้ไม่พบฉลากยาฉีดของสหรัฐฯ ที่ใช้อยู่ปัจจุบัน)"
    },
    maintenanceDose: {
      en: "AF rate control (ACC/AHA 2023): tartrate 25-200 mg twice daily; succinate 50-400 mg once daily or divided twice daily. Toprol-XL label: titrate at weekly or longer intervals; heart failure start 12.5-25 mg once daily; same total daily dose when switching from immediate-release. Lopressor label (post-MI): 50 mg every 6 h, max 100 mg twice daily, with or after meals.",
      th: "ควบคุมอัตราเต้นใน AF (ACC/AHA 2023): tartrate 25-200 มก. วันละ 2 ครั้ง; succinate 50-400 มก. วันละครั้งหรือแบ่ง 2 ครั้ง. ฉลาก Toprol-XL: ปรับขนาดทุก 1 สัปดาห์ขึ้นไป หัวใจล้มเหลวเริ่ม 12.5-25 มก. วันละครั้ง เปลี่ยนจากชนิดออกฤทธิ์ทันทีใช้ขนาดรวมต่อวันเท่าเดิม. ฉลาก Lopressor (หลัง MI): 50 มก. ทุก 6 ชม. สูงสุด 100 มก. วันละ 2 ครั้ง พร้อมหรือหลังอาหาร"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "About 3-7 h",
      metabolism: "Hepatic, mainly CYP2D6 (absent in about 8% of Caucasians and 2% of most other populations)",
      excretion: "Under 5% unchanged in urine; inactive metabolites renally"
    },
    renalAdjustment: {
      crcl50: "No reduction needed",
      crcl30_50: "No reduction needed",
      crcl10_30: "No reduction needed",
      crclLess10: "No reduction needed (renal failure)",
      hd: "Unknown"
    },
    renalAdjust: false,
    hepaticAdjustment: "Start at low doses and increase gradually with close monitoring.",
    cautionsAndWarnings: [
      "Abrupt stop may worsen ischemia (angina, MI).",
      "Heart failure may worsen during up-titration.",
      "Bronchospastic disease: generally avoid; if used, keep a beta-2 agonist available.",
      "May mask hypoglycemia; abrupt withdrawal in thyrotoxicosis may precipitate thyroid storm.",
      "Pheochromocytoma: start an alpha-blocker first.",
      "Do not start high-dose metoprolol for non-cardiac surgery; do not routinely stop chronic therapy before surgery."
    ],
    contraindications: [
      "Severe bradycardia",
      "Second- or third-degree heart block",
      "Cardiogenic shock",
      "Decompensated heart failure",
      "Sick sinus syndrome without a permanent pacemaker",
      "Systolic BP under 100 mmHg (Lopressor, post-MI use)",
      "Hypersensitivity"
    ],
    adverseEffects: ["Acute MI trial (metoprolol vs placebo): hypotension 27.4% vs 23.2%, bradycardia under 40/min 15.9% vs 6.7%, first-degree AV block 5.3% vs 1.9%"],
    monitoring: ["Heart rate and blood pressure", "Signs of worsening heart failure during titration"],
    interactions: ["Strong CYP2D6 inhibitors (quinidine, fluoxetine, paroxetine, propafenone): double metoprolol levels", "Digoxin, clonidine, diltiazem, verapamil: more bradycardia", "Clonidine withdrawal: rebound hypertension (stop the beta-blocker first)", "Catecholamine-depleting drugs (reserpine, MAO inhibitors): additive effect", "Epinephrine: reduced response"],
    safeInHfref: true,
    safeCad: true,
    qtRisk: "None",
    nlem: { list: "b", old: "ก", items: [{ form: "Metoprolol tartrate immediate-release tab", cond: "-" }] },
    refs: {
      mech: ["lbl:metoprolol-lopressor#Warnings and Precautions, Drug Interactions"],
      dose: ["aha25-als#Table (AF/AFL rate control)", "acc23-af#Table 21", "lbl:metoprolol-toprol#Dosage and Administration", "lbl:metoprolol-lopressor#Dosage and Administration"],
      pk: ["lbl:metoprolol-toprol#Clinical Pharmacology", "lbl:metoprolol-lopressor#Clinical Pharmacology"],
      renal: ["lbl:metoprolol-toprol#Use in Specific Populations", "lbl:metoprolol-lopressor#Clinical Pharmacology"],
      hepatic: ["lbl:metoprolol-lopressor#Use in Specific Populations"],
      warn: ["lbl:metoprolol-lopressor#Warnings and Precautions"],
      contra: ["lbl:metoprolol-lopressor#Contraindications", "lbl:metoprolol-toprol#Contraindications"],
      adverse: ["lbl:metoprolol-lopressor#Adverse Reactions"],
      monitor: ["lbl:metoprolol-lopressor#Dosage and Administration, Warnings"],
      interact: ["lbl:metoprolol-lopressor#Drug Interactions"],
      flags: ["lbl:metoprolol-toprol#Indications (heart failure)", "aha25-als#Table (avoid in decompensated HF)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "carvedilol",
    genericName: "Carvedilol",
    brandNames: ["Coreg"],
    vwClass: "II",
    classFullName: "Class II - Non-Selective Beta + Alpha-1 Blocker",
    color: "indigo",
    primaryTarget: "Alpha-1 and beta-adrenergic blocker",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "AV block reported", qrs: "Unknown", qtc: "Unknown", hr: "Decreased (bradycardia 9-10% in heart failure trials)" },
    indications: ["af_rate"],
    routes: ["PO"],
    acuteDose: {
      en: "No IV form; not used for acute rate control in the sources checked.",
      th: "ไม่มีรูปแบบฉีด ไม่ใช้ควบคุมอัตราเต้นแบบเฉียบพลันตามแหล่งอ้างอิงที่ตรวจ"
    },
    maintenanceDose: {
      en: "AF rate control (ACC/AHA 2023): 3.125-25 mg twice daily. Label (heart failure): 3.125 mg twice daily for 2 weeks, then 6.25, 12.5 and 25 mg twice daily at intervals of at least 2 weeks; up to 50 mg twice daily has been given to patients over 85 kg with mild-moderate heart failure. Take with food.",
      th: "ควบคุมอัตราเต้นใน AF (ACC/AHA 2023): 3.125-25 มก. วันละ 2 ครั้ง. ฉลากยา (หัวใจล้มเหลว): 3.125 มก. วันละ 2 ครั้ง 2 สัปดาห์ แล้ว 6.25, 12.5 และ 25 มก. วันละ 2 ครั้ง ห่างกันอย่างน้อย 2 สัปดาห์ เคยให้ถึง 50 มก. วันละ 2 ครั้ง ในผู้ป่วยน้ำหนักเกิน 85 กก. ที่หัวใจล้มเหลวเล็กน้อยถึงปานกลาง รับประทานพร้อมอาหาร"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "7-10 h",
      metabolism: "Hepatic, mainly CYP2D6 (some CYP3A4)",
      excretion: "Unknown"
    },
    renalAdjustment: {
      crcl50: "No dose rule in label",
      crcl30_50: "No dose rule (levels 40-50% higher in moderate-severe renal impairment); monitor renal function during titration if at risk",
      crcl10_30: "No dose rule (levels 40-50% higher in moderate-severe renal impairment); monitor renal function during titration if at risk",
      crclLess10: "No dose rule; monitor renal function during titration if at risk",
      hd: "Unknown"
    },
    renalAdjust: false,
    hepaticAdjustment: "Contraindicated in severe hepatic impairment (levels 4- to 7-fold higher in cirrhosis).",
    cautionsAndWarnings: [
      "Postural hypotension and dizziness, mainly at start and dose increases (alpha-1 blockade); take with food.",
      "Do not stop abruptly (worsening angina, MI, ventricular arrhythmias).",
      "Worsening heart failure or fluid retention during up-titration.",
      "Worsening renal function in heart failure patients with low BP, ischemic disease, vascular disease or renal insufficiency.",
      "May mask hypoglycemia."
    ],
    contraindications: [
      "Bronchial asthma or related bronchospastic conditions (deaths from status asthmaticus after single doses)",
      "Second- or third-degree AV block",
      "Sick sinus syndrome",
      "Severe bradycardia without a permanent pacemaker",
      "Cardiogenic shock or decompensated heart failure needing IV inotropes",
      "Severe hepatic impairment",
      "Serious hypersensitivity (e.g. Stevens-Johnson syndrome, anaphylaxis)"
    ],
    adverseEffects: ["Mild-moderate heart failure trials (carvedilol vs placebo): dizziness 32% vs 19%, fatigue 24% vs 22%, hyperglycemia 12% vs 8%, diarrhea 12% vs 6%, bradycardia 9% vs 1%, hypotension 9% vs 3%"],
    monitoring: ["Heart rate and standing/sitting blood pressure during titration", "Weight and fluid status in heart failure", "Renal function during titration in at-risk patients"],
    interactions: ["Digoxin: levels up about 15%; more bradycardia", "CYP2D6 inhibitors: may raise carvedilol levels", "Clonidine: hypotension and bradycardia", "Non-dihydropyridine CCBs: conduction effects"],
    safeInHfref: true,
    safeCad: true,
    qtRisk: "None",
    nlem: { list: "s", old: "ค", items: [{ form: "Carvedilol tab", cond: "ใช้สำหรับ heart failure with reduced ejection fraction" }] },
    refs: {
      mech: ["lbl:carvedilol-coreg#Indications, Clinical Pharmacology"],
      dose: ["acc23-af#Table 21", "lbl:carvedilol-coreg#Dosage and Administration"],
      pk: ["lbl:carvedilol-coreg#Clinical Pharmacology", "acc23-af#Table 21"],
      renal: ["lbl:carvedilol-coreg#Clinical Pharmacology, Warnings and Precautions"],
      hepatic: ["lbl:carvedilol-coreg#Contraindications, Clinical Pharmacology"],
      warn: ["lbl:carvedilol-coreg#Warnings and Precautions"],
      contra: ["lbl:carvedilol-coreg#Contraindications"],
      adverse: ["lbl:carvedilol-coreg#Adverse Reactions"],
      monitor: ["lbl:carvedilol-coreg#Dosage and Administration, Warnings and Precautions"],
      interact: ["lbl:carvedilol-coreg#Drug Interactions"],
      flags: ["lbl:carvedilol-coreg#Indications (heart failure, LV dysfunction after MI)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "propranolol",
    genericName: "Propranolol",
    brandNames: [],
    vwClass: "II",
    classFullName: "Class II - Non-Selective Beta Blocker",
    color: "indigo",
    primaryTarget: "Non-selective beta-adrenergic blocker (beta-1 and beta-2)",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "AV block may intensify", qrs: "Unknown", qtc: "Unknown", hr: "Decreased" },
    indications: ["af_rate", "svt"],
    routes: ["IV", "PO"],
    acuteDose: {
      en: "Label (IV, short-term SVT rate control including thyrotoxicosis): 1-3 mg under careful monitoring (ECG, CVP), no faster than 1 mg/min; a second dose may be given after 2 min, then no more for at least 4 h. Stop once the desired rate or rhythm is reached; move to oral therapy as soon as possible.\nAHA 2025 and ACC/AHA 2023 (AF/flutter rate control): 1 mg IV over 1 min, repeated up to 3 doses (ACC/AHA: every 2 min as needed).",
      th: "ฉลากยา (IV ระยะสั้นเพื่อลดอัตราเต้นใน SVT รวมถึง thyrotoxicosis): 1-3 มก. ภายใต้การติดตามใกล้ชิด (ECG, CVP) ไม่เร็วกว่า 1 มก./นาที ให้ครั้งที่สองได้หลัง 2 นาที จากนั้นไม่ให้เพิ่มภายใน 4 ชม. หยุดเมื่อได้อัตราหรือจังหวะที่ต้องการ เปลี่ยนเป็นยารับประทานโดยเร็ว\nAHA 2025 และ ACC/AHA 2023 (ควบคุมอัตราเต้นใน AF/flutter): 1 มก. IV ใน 1 นาที ซ้ำได้ถึง 3 ครั้ง (ACC/AHA: ทุก 2 นาทีตามต้องการ)"
    },
    maintenanceDose: {
      en: "AF rate control (tablet label): 10-30 mg three or four times daily before meals and at bedtime. ACC/AHA 2023: 10-40 mg three or four times daily.",
      th: "ควบคุมอัตราเต้นใน AF (ฉลากยาเม็ด): 10-30 มก. วันละ 3-4 ครั้ง ก่อนอาหารและก่อนนอน. ACC/AHA 2023: 10-40 มก. วันละ 3-4 ครั้ง"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "2-5.5 h (distribution phase 5-10 min); ACC/AHA 2023: IV 2.4 h, oral 3-6 h, ER 8-20 h",
      metabolism: "Extensive hepatic metabolism by CYP2D6, CYP1A2 and CYP2C19; smoking can double clearance",
      excretion: "Mostly as metabolites in urine"
    },
    renalAdjustment: {
      crcl50: "Unknown (no dose rule in label)",
      crcl30_50: "Unknown (no dose rule in label)",
      crcl10_30: "Unknown (label: chronic renal failure may reduce hepatic metabolism; hypoglycemia reported in renal insufficiency)",
      crclLess10: "Unknown (label: chronic renal failure may reduce hepatic metabolism; hypoglycemia reported in renal insufficiency)",
      hd: "Unknown"
    },
    renalAdjust: null,
    hepaticAdjustment: "Consider a lower IV dose in hepatic insufficiency (lower clearance, variable half-life).",
    cautionsAndWarnings: [
      "Avoid in overt heart failure; the failing heart needs sympathetic drive (give IV doses low and slowly).",
      "Rate over 1 mg/min IV risks hypotension and cardiac standstill.",
      "Abrupt stop: worse angina, MI.",
      "Bronchospastic disease: contraindicated in asthma.",
      "With diltiazem or disopyramide: severe bradycardia, heart block, heart failure reported.",
      "Changes thyroid-function tests (T4 and reverse T3 up, T3 down)."
    ],
    contraindications: [
      "Cardiogenic shock",
      "Sinus bradycardia and heart block greater than first degree",
      "Bronchial asthma",
      "Known hypersensitivity"
    ],
    adverseEffects: ["Bradycardia, hypotension, heart failure, heart block (most common cardiovascular events)", "Raynaud-type arterial insufficiency", "Hypoglycemia (after exertion, renal insufficiency)"],
    monitoring: ["ECG and central venous pressure during IV dosing", "Heart rate and blood pressure"],
    interactions: ["Lidocaine: lidocaine levels up about 25% (toxicity reported)", "Cimetidine: propranolol levels up about 40%", "Diltiazem, disopyramide: severe bradycardia, heart block, heart failure", "Drugs acting on CYP2D6, CYP1A2, CYP2C19: altered levels", "Smoking: clearance up to doubled"],
    safeInHfref: false,
    safeCad: true,
    qtRisk: "None",
    nlem: { list: "b", old: "ก", items: [{ form: "Propranolol HCl tab", cond: "-" }] },
    refs: {
      mech: ["lbl:propranolol-inj#Clinical Pharmacology"],
      dose: ["lbl:propranolol-inj#Indications, Dosage and Administration", "aha25-als#Table (AF/AFL rate control)", "acc23-af#Table 21", "lbl:propranolol-tab#Dosage and Administration"],
      pk: ["lbl:propranolol-inj#Clinical Pharmacology", "acc23-af#Table 21"],
      renal: ["lbl:propranolol-inj#Clinical Pharmacology, Warnings"],
      hepatic: ["lbl:propranolol-inj#Dosage and Administration, Precautions"],
      warn: ["lbl:propranolol-inj#Indications, Warnings, Precautions"],
      contra: ["lbl:propranolol-inj#Contraindications", "lbl:propranolol-tab#Contraindications"],
      adverse: ["lbl:propranolol-inj#Adverse Reactions, Overdosage"],
      monitor: ["lbl:propranolol-inj#Dosage and Administration"],
      interact: ["lbl:propranolol-inj#Precautions: Drug Interactions"],
      flags: ["lbl:propranolol-inj#Warnings (avoid in overt heart failure)"],
      nlem: ["nlem2569"]
    }
  },
  {
    id: "bisoprolol",
    genericName: "Bisoprolol",
    brandNames: [],
    vwClass: "II",
    classFullName: "Class II - Cardioselective Beta-1 Blocker",
    color: "indigo",
    primaryTarget: "Beta-1 selective adrenergic blocker; selectivity not absolute (beta-2 inhibition at 20 mg or more)",
    actionPotential: { phase0: "Unknown", apd: "Unknown", erp: "Unknown" },
    ecgEffects: { pr: "Unknown", qrs: "Unknown", qtc: "Unknown", hr: "Decreased" },
    indications: ["af_rate"],
    routes: ["PO"],
    acuteDose: {
      en: "No IV form; not used for acute rate control in the sources checked.",
      th: "ไม่มีรูปแบบฉีด ไม่ใช้ควบคุมอัตราเต้นแบบเฉียบพลันตามแหล่งอ้างอิงที่ตรวจ"
    },
    maintenanceDose: {
      en: "AF rate control (ACC/AHA 2023): 2.5-10 mg once daily. US label (hypertension only): start 5 mg once daily (2.5 mg may be appropriate, e.g. bronchospastic disease), up to 10 then 20 mg once daily.",
      th: "ควบคุมอัตราเต้นใน AF (ACC/AHA 2023): 2.5-10 มก. วันละครั้ง. ฉลากสหรัฐฯ (เฉพาะความดันสูง): เริ่ม 5 มก. วันละครั้ง (อาจเริ่ม 2.5 มก. เช่น มีโรคหลอดลมหดเกร็ง) เพิ่มได้ถึง 10 และ 20 มก. วันละครั้ง"
    },
    pharmacokinetics: {
      onset: "Unknown",
      peak: "Unknown",
      halfLife: "9-12 h; about 3-fold longer if CrCl under 40 mL/min",
      metabolism: "About half non-renal to inactive metabolites; not metabolized by CYP2D6",
      excretion: "About 50% unchanged in urine. Limited data suggest it is not dialyzable."
    },
    renalAdjustment: {
      crcl50: "Usual dose",
      crcl30_50: "CrCl under 40: start 2.5 mg daily; titrate with caution",
      crcl10_30: "Start 2.5 mg daily; titrate with caution",
      crclLess10: "Start 2.5 mg daily; titrate with caution",
      hd: "Not dialyzable (limited data); no replacement dose needed"
    },
    renalAdjust: true,
    hepaticAdjustment: "Hepatitis or cirrhosis: start 2.5 mg daily; titrate with caution.",
    cautionsAndWarnings: [
      "Bronchospastic disease: in general do not use beta-blockers; if needed, use the lowest dose with a bronchodilator available.",
      "Abrupt stop in coronary disease: worse angina, MI or ventricular arrhythmia.",
      "May mask hypoglycemia (tachycardia).",
      "Abrupt withdrawal may precipitate thyroid storm."
    ],
    contraindications: [
      "Cardiogenic shock",
      "Overt cardiac failure",
      "Second- or third-degree AV block",
      "Marked sinus bradycardia"
    ],
    adverseEffects: ["See label adverse reaction table (hypertension trials)"],
    monitoring: ["Heart rate and blood pressure", "Renal and hepatic function when choosing the dose"],
    interactions: ["Rifampin: faster clearance, shorter half-life", "Other negative chronotropes: additive bradycardia (class effect in label)"],
    safeInHfref: null,
    safeCad: true,
    qtRisk: "None",
    nlem: { list: null },
    refs: {
      mech: ["lbl:bisoprolol-tab#Clinical Pharmacology, Warnings"],
      dose: ["acc23-af#Table 21", "lbl:bisoprolol-tab#Indications, Dosage and Administration"],
      pk: ["lbl:bisoprolol-tab#Clinical Pharmacology, Dosage and Administration"],
      renal: ["lbl:bisoprolol-tab#Dosage and Administration"],
      hepatic: ["lbl:bisoprolol-tab#Dosage and Administration"],
      warn: ["lbl:bisoprolol-tab#Warnings"],
      contra: ["lbl:bisoprolol-tab#Contraindications"],
      adverse: ["lbl:bisoprolol-tab#Adverse Reactions"],
      monitor: ["lbl:bisoprolol-tab#Dosage and Administration"],
      interact: ["lbl:bisoprolol-tab#Precautions: Drug Interactions"],
      flags: ["lbl:bisoprolol-tab#Contraindications (overt cardiac failure)"],
      nlem: ["nlem2569"]
    }
  }
];
