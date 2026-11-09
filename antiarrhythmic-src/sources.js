// Source registry for the drug records (refs) and tools. Checked 2026-10-28.
// FDA labels: newest current label from openFDA, linked to DailyMed by set id.
const SOURCES = {
  "lbl:procainamide-inj": {
    "short": "FDA label: Procainamide Hydrochloride",
    "title": "US FDA label (DailyMed): Procainamide Hydrochloride, Hospira, Inc., intramuscular, intravenous, revised 2026-07-08",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=17e47845-daad-434c-a784-6d3875b0d704"
  },
  "lbl:quinidine-sulfate": {
    "short": "FDA label: QUINIDINE SULFATE (quinidine sulfate tablet)",
    "title": "US FDA label (DailyMed): QUINIDINE SULFATE (quinidine sulfate tablet), EPIC PHARMA, LLC, oral, revised 2023-11-08",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b0d6341b-d880-4f0b-8844-bc788c03004a"
  },
  "lbl:quinidine-gluconate": {
    "short": "FDA label: Quinidine Gluconate",
    "title": "US FDA label (DailyMed): Quinidine Gluconate, Sun Pharmaceutical Industries, Inc., oral, revised 2018-02-01",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5023f053-fcc4-4c2c-aa59-9ec198ad185e"
  },
  "lbl:disopyramide-norpace": {
    "short": "FDA label: Norpace (disopyramide phosphate)",
    "title": "US FDA label (DailyMed): Norpace (disopyramide phosphate), Pfizer Laboratories Div Pfizer Inc, oral, revised 2026-08-24",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e2aa1642-d262-4520-bc6a-9fd3ad795677"
  },
  "lbl:lidocaine-premix": {
    "short": "FDA label: Lidocaine Hydrochloride And Dextrose",
    "title": "US FDA label (DailyMed): Lidocaine Hydrochloride And Dextrose, HF Acquisition Co LLC, DBA HealthFirst, intravenous, revised 2026-01-20",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1bf999b5-e290-dcbd-e063-6294a90a2bab"
  },
  "lbl:mexiletine-cap": {
    "short": "FDA label: Mexiletine Hydrochloride",
    "title": "US FDA label (DailyMed): Mexiletine Hydrochloride, Amerisyn LLC, oral, revised 2026-08-10",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=58b7a7f5-5ae0-2f60-e063-6394a90a37dd"
  },
  "lbl:phenytoin-inj": {
    "short": "FDA label: Phenytoin Sodium",
    "title": "US FDA label (DailyMed): Phenytoin Sodium, Acella Pharmaceuticals, LLC, intramuscular, intravenous, revised 2024-09-16",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6922f32f-8bed-4c09-8103-27987bcbd104"
  },
  "lbl:flecainide-tab": {
    "short": "FDA label: Flecainide Acetate",
    "title": "US FDA label (DailyMed): Flecainide Acetate, Amneal Pharmaceuticals of New York LLC, oral, revised 2026-06-11",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ee9595d5-08a1-4529-9215-ddc3c7f929c4"
  },
  "lbl:propafenone-ir": {
    "short": "FDA label: Propafenone Hydrochloride",
    "title": "US FDA label (DailyMed): Propafenone Hydrochloride, ANI Pharmaceuticals, Inc., oral, revised 2025-09-12",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8d1be333-be2b-4064-86a4-c2ad9ad07b83"
  },
  "lbl:esmolol-brevibloc": {
    "short": "FDA label: BREVIBLOC (esmolol hydrochloride)",
    "title": "US FDA label (DailyMed): BREVIBLOC (esmolol hydrochloride), Baxter Healthcare Company, intravenous, revised 2025-03-14",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=220a07b8-5c68-41a3-8705-fd91f14c50b4"
  },
  "lbl:metoprolol-lopressor": {
    "short": "FDA label: LOPRESSOR (metoprolol tartrate)",
    "title": "US FDA label (DailyMed): LOPRESSOR (metoprolol tartrate), VALIDUS PHARMACEUTICALS LLC, oral, revised 2026-01-26",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5f4fed2-369c-4808-a682-8a5b8cfdbb4f"
  },
  "lbl:metoprolol-toprol": {
    "short": "FDA label: TOPROL XL (metoprolol succinate)",
    "title": "US FDA label (DailyMed): TOPROL XL (metoprolol succinate), Melinta Therapeutics, LLC, oral, revised 2026-03-03",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=496ddfaa-7c9c-4888-b747-a210249b367a"
  },
  "lbl:carvedilol-coreg": {
    "short": "FDA label: Coreg (carvedilol)",
    "title": "US FDA label (DailyMed): Coreg (carvedilol), Waylis Therapeutics LLC, oral, revised 2026-07-31",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=07c619c6-4a0c-445e-94fa-664a54f68a39"
  },
  "lbl:propranolol-inj": {
    "short": "FDA label: Propranolol Hydrochloride",
    "title": "US FDA label (DailyMed): Propranolol Hydrochloride, Hikma Pharmaceuticals USA Inc., intravenous, revised 2026-01-12",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=91f2ff1d-68d8-4e83-a2db-618f0410ead7"
  },
  "lbl:propranolol-tab": {
    "short": "FDA label: Propranolol Hydrochloride",
    "title": "US FDA label (DailyMed): Propranolol Hydrochloride, Par Health USA, LLC, oral, revised 2026-08-26",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0d74bb04-8227-4afa-b523-ce1556150e07"
  },
  "lbl:amiodarone-nexterone": {
    "short": "FDA label: Nexterone (amiodarone hydrochloride)",
    "title": "US FDA label (DailyMed): Nexterone (amiodarone hydrochloride), Baxter Healthcare Corporation, intravenous, revised 2024-04-16",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e9108958-b8d7-4fba-87c3-9a32990de551"
  },
  "lbl:amiodarone-tab": {
    "short": "FDA label: Amiodarone Hydrochloride",
    "title": "US FDA label (DailyMed): Amiodarone Hydrochloride, Redpharm Drug, oral, revised 2026-08-01",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57f7f2ea-4ca9-4ada-e063-6294a90a492b"
  },
  "lbl:sotalol-betapace": {
    "short": "FDA label: BETAPACE, BETAPACE AF (sotalol hydrochloride)",
    "title": "US FDA label (DailyMed): BETAPACE, BETAPACE AF (sotalol hydrochloride), Legacy Pharma USA, Inc., oral, revised 2024-12-16",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a6a7702f-36c9-45db-b640-453dc324baee"
  },
  "lbl:sotalol-iv": {
    "short": "FDA label: Sotalol Hydrochloride",
    "title": "US FDA label (DailyMed): Sotalol Hydrochloride, ALTATHERA Pharmaceuticals, LLC, intravenous, revised 2025-07-31",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ff3061ab-d930-4318-a5be-684e38be229e"
  },
  "lbl:dronedarone-multaq": {
    "short": "FDA label: Multaq (dronedarone)",
    "title": "US FDA label (DailyMed): Multaq (dronedarone), Sanofi-Aventis U.S. LLC, oral, revised 2025-05-29",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7fa41601-7fb5-4155-8e50-2ae903f0d2d6"
  },
  "lbl:ibutilide-corvert": {
    "short": "FDA label: Corvert (ibutilide fumarate)",
    "title": "US FDA label (DailyMed): Corvert (ibutilide fumarate), Pharmacia & Upjohn Company LLC, intravenous, revised 2024-01-25",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2428969a-7431-4e94-9503-ad5c680e2ea4"
  },
  "lbl:diltiazem-inj": {
    "short": "FDA label: Diltiazem Hydrochloride",
    "title": "US FDA label (DailyMed): Diltiazem Hydrochloride, Sagent Pharmaceuticals, intravenous, revised 2026-08-06",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9d51c0f6-26b7-4220-83fb-4e736b289e64"
  },
  "lbl:diltiazem-cardizem": {
    "short": "FDA label: Cardizem CD (diltiazem hydrochloride)",
    "title": "US FDA label (DailyMed): Cardizem CD (diltiazem hydrochloride), Bausch Health US LLC, oral, revised 2025-12-10",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1042fa13-e6af-46b9-8008-6c941f0978b1"
  },
  "lbl:verapamil-inj": {
    "short": "FDA label: Verapamil Hydrochloride",
    "title": "US FDA label (DailyMed): Verapamil Hydrochloride, Micro Labs Limited, intravenous, revised 2026-08-18",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9c89764e-ff07-4077-a40f-91eb1c179af2"
  },
  "lbl:verapamil-tab": {
    "short": "FDA label: Verapamil Hydrochloride",
    "title": "US FDA label (DailyMed): Verapamil Hydrochloride, Chartwell RX, LLC, oral, revised 2025-12-10",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ebc9a09a-7b5f-4df6-ace7-31185d469b28"
  },
  "lbl:adenosine-generic": {
    "short": "FDA label: Adenosine",
    "title": "US FDA label (DailyMed): Adenosine, Sagent Pharmaceuticals, intravenous, revised 2026-07-27",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=546642f2-662f-46cf-9d82-5bb3bdcc7677"
  },
  "lbl:digoxin-tab": {
    "short": "FDA label: LANOXIN (digoxin)",
    "title": "US FDA label (DailyMed): LANOXIN (digoxin), Advanz Pharma (US) Corp., oral, revised 2024-12-05",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d91e3646-4c63-4512-ab22-db39c085c4dc"
  },
  "lbl:digoxin-inj": {
    "short": "FDA label: LANOXIN (digoxin)",
    "title": "US FDA label (DailyMed): LANOXIN (digoxin), Covis Pharma US, Inc, intramuscular, intravenous, revised 2025-10-17",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9ec84cac-6ecc-43dc-8006-6ccc029e2707"
  },
  "lbl:magnesium-inj": {
    "short": "FDA label: Magnesium Sulfate In Dextrose",
    "title": "US FDA label (DailyMed): Magnesium Sulfate In Dextrose, Hospira, Inc., intravenous, revised 2026-08-24",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=03ebeabb-8386-4af4-3086-bdf3c3fc4a5a"
  },
  "lbl:ivabradine-corlanor": {
    "short": "FDA label: Corlanor (ivabradine)",
    "title": "US FDA label (DailyMed): Corlanor (ivabradine), Amgen Inc, oral, revised 2025-11-10",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=92018a65-38f6-45f7-91d4-a34921b81d0d"
  },
  "lbl:atropine-inj": {
    "short": "FDA label: Atropine Sulfate",
    "title": "US FDA label (DailyMed): Atropine Sulfate, Hospira, Inc., intravenous, revised 2026-05-18",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ad8916e7-206e-409e-2582-30d072845dd4"
  },
  "lbl:dofetilide-tikosyn": {
    "short": "FDA label: Tikosyn (dofetilide)",
    "title": "US FDA label (DailyMed): Tikosyn (dofetilide), Pfizer Laboratories Div Pfizer Inc, oral, revised 2026-04-21",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=02438044-d6a3-49e9-a1ac-3aad21ef2c8c"
  },
  "lbl:bisoprolol-tab": {
    "short": "FDA label: Bisoprolol (bisoprolol fumarate)",
    "title": "US FDA label (DailyMed): Bisoprolol (bisoprolol fumarate), Micro Labs Limited, oral, revised 2026-03-11",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c3ee566c-74c4-45f4-a947-526a7313e326"
  },
  "lbl:ranolazine-er": {
    "short": "FDA label: Ranolazine",
    "title": "US FDA label (DailyMed): Ranolazine, Lifestar Pharma LLC, oral, revised 2026-05-06",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=195c4b51-fec2-410d-8d90-487c536a8728"
  },
  "lbl:propafenone-er": {
    "short": "FDA label: Propafenone Hydrochloride",
    "title": "US FDA label (DailyMed): Propafenone Hydrochloride, Northstar Rx LLC, oral, revised 2026-06-04",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2ecd6452-ccc3-493f-9a4a-69f0fbf67a42"
  },
  "aha25-als": {
    "short": "AHA 2025 Adult ALS",
    "title": "Part 9: Adult Advanced Life Support. 2025 AHA Guidelines for CPR and ECC. Circulation 2025;152(16 suppl 2):S538-S577",
    "url": "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001376"
  },
  "aha25-ca": {
    "short": "AHA 2025 Cardiac Arrest Algorithm",
    "title": "AHA 2025 Adult Cardiac Arrest Algorithm (accessible text version, 25 July 2025)",
    "url": "https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Accessible/Algorithm-ACLS-CA-LngDscrp-250725-Ed.pdf"
  },
  "aha25-tachy": {
    "short": "AHA 2025 Tachyarrhythmia Algorithm",
    "title": "AHA 2025 Adult Tachyarrhythmia With a Pulse Algorithm (accessible text version, 26 July 2025)",
    "url": "https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Accessible/Algorithm-ACLS-Tachyarrhythmia-LngDscrp-250726-Ed.pdf"
  },
  "aha25-brady": {
    "short": "AHA 2025 Bradycardia Algorithm",
    "title": "AHA 2025 Adult Bradycardia With a Pulse Algorithm (accessible text version, 25 July 2025)",
    "url": "https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Accessible/Algorithm-ACLS-Bradycardia-LngDscrp-250725-Ed.pdf"
  },
  "acc23-af": {
    "short": "ACC/AHA/ACCP/HRS 2023 AF",
    "title": "2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. Circulation 2024;149:e1-e156",
    "url": "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001193"
  },
  "aha17-va": {
    "short": "AHA/ACC/HRS 2017 VA/SCD",
    "title": "2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias and the Prevention of Sudden Cardiac Death. Circulation 2018;138:e272-e391",
    "url": "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000549"
  },
  "ema-brinavess": {
    "short": "EU SmPC: Brinavess",
    "title": "Brinavess (vernakalant) EPAR product information, Summary of Product Characteristics, European Medicines Agency",
    "url": "https://www.ema.europa.eu/en/documents/product-information/brinavess-epar-product-information_en.pdf"
  },
  "nlem2569": {
    "short": "บัญชียาหลักแห่งชาติ พ.ศ. 2569",
    "title": "ประกาศคณะกรรมการพัฒนาระบบยาแห่งชาติ เรื่อง บัญชียาหลักแห่งชาติ พ.ศ. 2569 (ลงวันที่ 12 ก.พ. 2569; ราชกิจจานุเบกษา เล่ม 143 ตอนพิเศษ 85 ง, 30 มี.ค. 2569), รายการยาฉบับ Excel",
    "url": "https://ndp.fda.moph.go.th/nlem/69-1"
  },
  "tisdale2013": {
    "short": "Tisdale 2013 QT risk score",
    "title": "Tisdale JE et al. Development and validation of a risk score to predict QT interval prolongation in hospitalized patients. Circ Cardiovasc Qual Outcomes 2013;6:479-487 (PMC3788679)",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3788679/"
  },
  "tzivoni1988": {
    "short": "Tzivoni 1988 (magnesium in TdP)",
    "title": "Tzivoni D et al. Treatment of torsade de pointes with magnesium sulfate. Circulation 1988;77:392-397 (case series, 12 patients; PubMed 3338130)",
    "url": "https://doi.org/10.1161/01.cir.77.2.392"
  }
};
