// What the 2022 ESC ventricular arrhythmia / sudden cardiac death guideline (Zeppenfeld et al., Eur Heart J 2022;43:3997-4126,
// doi 10.1093/eurheartj/ehac262) says about each drug: Table 8 (anti-arrhythmic drugs), Recommendation Table 9 (acute VT, electrical
// storm) and the pregnancy recommendation. Read from the PDF the author supplied on 9 Nov 2026; paraphrased, numbers as the guideline gives them.
// Drugs the guideline does not list have no entry and show N/A. The ESC reserves rights on its guideline content: keep it short.
const ESC_VA = (() => {
  const r = (lEn, lTh, en, th) => ({ lEn, lTh, en, th });
  const bb = (extra) => [
    r('Beta-blocker class entry', 'ข้อมูลระดับกลุ่ม beta-blocker', 'Used for PVC and VT (LQTS, CPVT). The guideline gives no dose for this drug ("various"). Slows the sinus node, prolongs PR, shortens QT.', 'ใช้ใน PVC และ VT (LQTS, CPVT) แนวทางไม่ระบุขนาดของยาตัวนี้ ("various") ทำให้ sinus node ช้าลง PR ยาวขึ้น QT สั้นลง'),
    r('Contraindications', 'ข้อห้ามใช้', 'Severe sinus node dysfunction, severe AV conduction disturbance, decompensated heart failure, coronary vasospasm, severe asthma, Brugada syndrome. Can cause bradycardia, AV block, hypotension.', 'sinus node dysfunction รุนแรง ความผิดปกติของการนำไฟฟ้า AV รุนแรง หัวใจล้มเหลวที่ไม่คงที่ coronary vasospasm หอบหืดรุนแรง Brugada syndrome อาจทำให้หัวใจเต้นช้า AV block ความดันต่ำ'),
    ...extra
  ];
  return {
    amiodarone: { rows: [
      r('Dose', 'ขนาดยา', 'Oral 200-400 mg/day after loading 600-1,200 mg/day for 8-10 days. IV 5 mg/kg over 20 min to 2 h, 2-3 times in 24 h, then 600-1,200 mg/24 h. For PVC, VT and VF; can be used in heart failure.', 'รับประทาน 200-400 มก./วัน หลังให้ loading 600-1,200 มก./วัน นาน 8-10 วัน IV 5 มก./กก. ใน 20 นาที ถึง 2 ชม. วันละ 2-3 ครั้ง แล้ว 600-1,200 มก./24 ชม. ใช้ใน PVC, VT และ VF ใช้ในผู้ป่วยหัวใจล้มเหลวได้'),
      r('Recommendations', 'คำแนะนำ', 'Electrical storm with structural heart disease: a beta-blocker (non-selective preferred) plus IV amiodarone (I, B). Tolerated sustained monomorphic VT with no established diagnosis: IV amiodarone may be considered (IIb, B).', 'Electrical storm ที่มีโรคโครงสร้างหัวใจ: beta-blocker (แนะนำชนิดไม่จำเพาะ) ร่วมกับ IV amiodarone (I, B) sustained monomorphic VT ที่ทนได้และยังไม่ทราบการวินิจฉัย: พิจารณา IV amiodarone ได้ (IIb, B)'),
      r('Cautions', 'ข้อควรระวัง', 'Sinus node dysfunction, severe AV conduction disturbance, hyperthyroidism. Raises myopathy risk with statins. Bradycardia, rarely TdP; photosensitivity, corneal deposits, thyroid, lung and liver toxicity, neuropathy, skin discolouration.', 'sinus node dysfunction ความผิดปกติของการนำไฟฟ้า AV รุนแรง ไทรอยด์เป็นพิษ เพิ่มความเสี่ยงกล้ามเนื้ออักเสบเมื่อใช้ร่วมกับ statin หัวใจเต้นช้า พบ TdP ได้น้อย แพ้แสง corneal deposits พิษต่อไทรอยด์ ปอด ตับ เส้นประสาท ผิวสีเปลี่ยน')
    ] },
    adenosine: { rows: [
      r('Dose and use', 'ขนาดยาและการใช้', 'IV 6-18 mg bolus (no oral use). Regular wide-complex tachycardia of unknown origin (outflow tract VT). When the tachycardia may be supraventricular, adenosine or vagal manoeuvres should be considered (IIa, C).', 'IV 6-18 มก. bolus (ไม่มีรูปแบบรับประทาน) ใช้ใน wide-complex tachycardia ที่สม่ำเสมอและไม่ทราบต้นเหตุ (outflow tract VT) เมื่อสงสัยว่าเป็น SVT ควรพิจารณา adenosine หรือ vagal manoeuvres (IIa, C)'),
      r('Cautions', 'ข้อควรระวัง', 'Not in severe asthma or pre-excited AF. Chest pain, flushing, bronchoconstriction. Theophylline is the antagonist.', 'ห้ามใช้ในโรคหืดรุนแรงหรือ pre-excited AF เจ็บหน้าอก หน้าแดง หลอดลมหดเกร็ง ยาต้านฤทธิ์คือ theophylline')
    ] },
    disopyramide: { rows: [
      r('Dose', 'ขนาดยา', 'Oral 250-750 mg/day, for PVC and VT. Also reduces LV outflow obstruction and symptoms in HCM.', 'รับประทาน 250-750 มก./วัน ใช้ใน PVC และ VT ลด LV outflow obstruction และอาการใน HCM ได้'),
      r('Contraindications', 'ข้อห้ามใช้', 'Severe sinus node dysfunction, severe AV or intraventricular conduction disturbance, prior MI, significant structural heart disease, hypotension. Negative inotropy, AV block, proarrhythmia (occasionally TdP), anticholinergic effects.', 'sinus node dysfunction รุนแรง ความผิดปกติของการนำไฟฟ้า AV หรือในห้องล่างรุนแรง เคยเป็น MI โรคโครงสร้างหัวใจที่สำคัญ ความดันต่ำ กดการบีบตัว AV block proarrhythmia (บางครั้ง TdP) ผลต้านโคลิเนอร์จิก')
    ] },
    flecainide: { rows: [
      r('Dose', 'ขนาดยา', 'Oral 200-400 mg/day; IV 1-2 mg/kg over 10 min. For PVC and VT; unmasks the Brugada ECG. For a tolerated sustained monomorphic VT without significant structural heart disease, flecainide, ajmaline or sotalol may be considered (IIb, C).', 'รับประทาน 200-400 มก./วัน IV 1-2 มก./กก. ใน 10 นาที ใช้ใน PVC และ VT และใช้เปิดเผย Brugada ECG สำหรับ sustained monomorphic VT ที่ทนได้และไม่มีโรคโครงสร้างหัวใจสำคัญ พิจารณา flecainide, ajmaline หรือ sotalol ได้ (IIb, C)'),
      r('Contraindications', 'ข้อห้ามใช้', 'Prior MI, significant structural heart disease, Brugada syndrome, severe sinus node dysfunction, severe AV or intraventricular conduction disturbance, inherited LQTS other than LQT3, CrCl below 35 mL/min/1.73 m2. Stop if QRS widens over 25% or bundle branch block appears.', 'เคยเป็น MI โรคโครงสร้างหัวใจที่สำคัญ Brugada syndrome sinus node dysfunction รุนแรง ความผิดปกติของการนำไฟฟ้า AV หรือในห้องล่างรุนแรง inherited LQTS ที่ไม่ใช่ LQT3 CrCl ต่ำกว่า 35 มล./นาที/1.73 ตร.ม. หยุดยาเมื่อ QRS กว้างขึ้นเกิน 25% หรือเกิด bundle branch block')
    ] },
    lidocaine: { rows: [
      r('Dose', 'ขนาดยา', 'IV 50-200 mg bolus, then 2-4 mg/min (no oral use). For VT/VF associated with acute coronary syndrome. More effective with high potassium; few haemodynamic effects.', 'IV 50-200 มก. bolus แล้ว 2-4 มก./นาที (ไม่มีรูปแบบรับประทาน) ใช้ใน VT/VF ที่สัมพันธ์กับ ACS ได้ผลดีขึ้นเมื่อโพแทสเซียมสูง ผลต่อ hemodynamics น้อย'),
      r('Cautions', 'ข้อควรระวัง', 'Reduce the dose when liver blood flow is low (shock, beta-blockade, severe heart failure). Sinoatrial arrest; drowsiness and dizziness.', 'ลดขนาดเมื่อเลือดไปตับน้อย (shock, ใช้ beta-blocker, หัวใจล้มเหลวรุนแรง) sinoatrial arrest ง่วงซึม เวียนศีรษะ')
    ] },
    mexiletine: { rows: [
      r('Dose', 'ขนาดยา', 'Oral 600-1,200 mg/day; loading 400 mg first, then 600 mg in the first 24 h. For PVC and VT (LQT3).', 'รับประทาน 600-1,200 มก./วัน loading 400 มก. ก่อน แล้ว 600 มก. ใน 24 ชม.แรก ใช้ใน PVC และ VT (LQT3)'),
      r('Contraindications', 'ข้อห้ามใช้', 'Sinus node dysfunction, severe AV conduction disturbance, severe heart failure. Tremor, dysarthria, dizziness, GI complaints; sinus bradycardia and hypotension.', 'sinus node dysfunction ความผิดปกติของการนำไฟฟ้า AV รุนแรง หัวใจล้มเหลวรุนแรง มือสั่น พูดไม่ชัด เวียนศีรษะ อาการทางเดินอาหาร หัวใจเต้นช้าและความดันต่ำ')
    ] },
    procainamide: { rows: [
      r('Dose', 'ขนาดยา', 'IV 100 mg bolus, repeat after 5 min if no effect, up to 500-750 mg (max 50 mg/min), then 2-6 mg/min. For VT. For a tolerated sustained monomorphic VT with known or suspected structural heart disease, IV procainamide should be considered (IIa, B).', 'IV 100 มก. bolus ให้ซ้ำหลัง 5 นาทีถ้าไม่ได้ผล รวมไม่เกิน 500-750 มก. (ไม่เกิน 50 มก./นาที) แล้ว 2-6 มก./นาที ใช้ใน VT สำหรับ sustained monomorphic VT ที่ทนได้และมีหรือสงสัยโรคโครงสร้างหัวใจ ควรพิจารณา IV procainamide (IIa, B)'),
      r('Contraindications', 'ข้อห้ามใช้', 'Severe sinus node dysfunction, severe AV or intraventricular conduction disturbance, severe LV dysfunction, hypotension, Brugada syndrome. Bradycardia, hypotension, TdP; rash, myalgia, vasculitis, lupus, agranulocytosis.', 'sinus node dysfunction รุนแรง ความผิดปกติของการนำไฟฟ้า AV หรือในห้องล่างรุนแรง LV dysfunction รุนแรง ความดันต่ำ Brugada syndrome หัวใจเต้นช้า ความดันต่ำ TdP ผื่น ปวดกล้ามเนื้อ vasculitis lupus agranulocytosis')
    ] },
    propafenone: { rows: [
      r('Dose', 'ขนาดยา', 'Oral 450-900 mg/day, for PVC and VT.', 'รับประทาน 450-900 มก./วัน ใช้ใน PVC และ VT'),
      r('Contraindications', 'ข้อห้ามใช้', 'Prior MI, significant structural heart disease, Brugada syndrome, severe sinus node dysfunction, severe AV or intraventricular conduction disturbance, LQTS, significant renal or liver disease. Stop if QRS widens over 25% or bundle branch block appears.', 'เคยเป็น MI โรคโครงสร้างหัวใจที่สำคัญ Brugada syndrome sinus node dysfunction รุนแรง ความผิดปกติของการนำไฟฟ้า AV หรือในห้องล่างรุนแรง LQTS โรคไตหรือตับที่สำคัญ หยุดยาเมื่อ QRS กว้างขึ้นเกิน 25% หรือเกิด bundle branch block')
    ] },
    quinidine: { rows: [
      r('Dose', 'ขนาดยา', 'Oral 600-1,600 mg/day; loading 200 mg every 3 h until effect, max 3 g in the first 24 h. For VF, Brugada syndrome and short QT syndrome. May be considered in coronary artery disease with electrical storm from recurrent polymorphic VT when other drugs fail (IIb, C).', 'รับประทาน 600-1,600 มก./วัน loading 200 มก. ทุก 3 ชม. จนได้ผล สูงสุด 3 ก. ใน 24 ชม.แรก ใช้ใน VF, Brugada syndrome และ short QT syndrome พิจารณาได้ในโรคหลอดเลือดหัวใจที่เกิด electrical storm จาก polymorphic VT ซ้ำเมื่อยาอื่นไม่ได้ผล (IIb, C)'),
      r('Contraindications', 'ข้อห้ามใช้', 'Severe sinus node dysfunction, severe AV or intraventricular conduction disturbance, previous MI, significant structural heart disease, hypotension, LQTS. Hypotension and TdP; GI, hearing and vision disturbances, confusion, blood count effects, anaphylaxis.', 'sinus node dysfunction รุนแรง ความผิดปกติของการนำไฟฟ้า AV หรือในห้องล่างรุนแรง เคยเป็น MI โรคโครงสร้างหัวใจที่สำคัญ ความดันต่ำ LQTS ความดันต่ำและ TdP ผลต่อทางเดินอาหาร การได้ยิน การมองเห็น สับสน เม็ดเลือดผิดปกติ anaphylaxis')
    ] },
    ranolazine: { rows: [
      r('Dose', 'ขนาดยา', 'Oral 750-2,000 mg/day, for VT (LQT3).', 'รับประทาน 750-2,000 มก./วัน ใช้ใน VT (LQT3)'),
      r('Contraindications', 'ข้อห้ามใช้', 'Severe sinus node dysfunction, severe heart failure, LQTS other than LQT3. Caution with other QT-prolonging treatment. Sinus bradycardia, hypotension, dizziness, nausea, constipation.', 'sinus node dysfunction รุนแรง หัวใจล้มเหลวรุนแรง LQTS ที่ไม่ใช่ LQT3 ระวังเมื่อใช้ร่วมกับการรักษาที่ทำให้ QT ยาว หัวใจเต้นช้า ความดันต่ำ เวียนศีรษะ คลื่นไส้ ท้องผูก')
    ] },
    sotalol: { rows: [
      r('Dose', 'ขนาดยา', 'Oral 160-640 mg/day; IV 0.5-1.5 mg/kg over 10 min, can be repeated after 6 h. For VT. The potassium-channel effect needs higher doses than the beta-blocker effect.', 'รับประทาน 160-640 มก./วัน IV 0.5-1.5 มก./กก. ใน 10 นาที ให้ซ้ำได้หลัง 6 ชม. ใช้ใน VT ผลบล็อกช่องโพแทสเซียมต้องใช้ขนาดสูงกว่าผล beta-blocker'),
      r('Contraindications', 'ข้อห้ามใช้', 'Severe sinus node dysfunction, severe AV conduction disturbance, severe heart failure with reduced LVEF, significant LVH, CrCl below 30 mL/min, coronary vasospasm, LQTS. TdP in over 2% of patients: monitor QT and CrCl closely; caution with hypokalaemia and other QT-prolonging drugs.', 'sinus node dysfunction รุนแรง ความผิดปกติของการนำไฟฟ้า AV รุนแรง หัวใจล้มเหลวรุนแรงที่ LVEF ต่ำ LVH ที่สำคัญ CrCl ต่ำกว่า 30 มล./นาที coronary vasospasm LQTS พบ TdP ในผู้ป่วยมากกว่า 2% ต้องติดตาม QT และ CrCl อย่างใกล้ชิด ระวังเมื่อโพแทสเซียมต่ำและใช้ยาอื่นที่ทำให้ QT ยาว')
    ] },
    verapamil: { rows: [
      r('Dose and use', 'ขนาดยาและการใช้', 'Oral 120-480 mg/day; IV 5-10 mg slow bolus, can be repeated after 30 min. Tolerated idiopathic VT: IV verapamil for fascicular VT (I, C). IV verapamil is not recommended in broad-QRS tachycardia of unknown mechanism (III, B).', 'รับประทาน 120-480 มก./วัน IV 5-10 มก. ฉีดช้า ให้ซ้ำได้หลัง 30 นาที idiopathic VT ที่ทนได้: ใช้ IV verapamil สำหรับ fascicular VT (I, C) ไม่แนะนำ IV verapamil ใน broad-QRS tachycardia ที่ไม่ทราบกลไก (III, B)'),
      r('Contraindications', 'ข้อห้ามใช้', 'Heart failure with reduced LVEF, severe sinus node dysfunction, severe AV conduction disturbance, VT of unknown origin, ACS, WPW syndrome. Raises myopathy risk with statins.', 'หัวใจล้มเหลวที่ LVEF ต่ำ sinus node dysfunction รุนแรง ความผิดปกติของการนำไฟฟ้า AV รุนแรง VT ที่ไม่ทราบต้นเหตุ ACS WPW syndrome เพิ่มความเสี่ยงกล้ามเนื้ออักเสบเมื่อใช้ร่วมกับ statin')
    ] },
    propranolol: { rows: [
      r('Dose', 'ขนาดยา', 'Oral 80-320 mg/day (IV 160 mg/24 h). Non-selective; for PVC and VT (electrical storm, LQTS, CPVT). In electrical storm with structural heart disease, a non-selective beta-blocker plus IV amiodarone is recommended (I, B). Oral metoprolol, propranolol or verapamil should be considered for long-term idiopathic sustained VT in pregnancy (IIa, C).', 'รับประทาน 80-320 มก./วัน (IV 160 มก./24 ชม.) beta-blocker ชนิดไม่จำเพาะ ใช้ใน PVC และ VT (electrical storm, LQTS, CPVT) ใน electrical storm ที่มีโรคโครงสร้างหัวใจ แนะนำ beta-blocker ชนิดไม่จำเพาะร่วมกับ IV amiodarone (I, B) ในการตั้งครรภ์ควรพิจารณา metoprolol, propranolol หรือ verapamil แบบรับประทานสำหรับ idiopathic sustained VT ระยะยาว (IIa, C)'),
      r('Contraindications', 'ข้อห้ามใช้', 'Severe sinus node dysfunction, severe AV conduction disturbance, decompensated heart failure, coronary vasospasm, severe asthma, Brugada syndrome.', 'sinus node dysfunction รุนแรง ความผิดปกติของการนำไฟฟ้า AV รุนแรง หัวใจล้มเหลวที่ไม่คงที่ coronary vasospasm หอบหืดรุนแรง Brugada syndrome')
    ] },
    metoprolol: { rows: bb([r('Pregnancy', 'การตั้งครรภ์', 'Oral metoprolol, propranolol or verapamil should be considered for long-term management of idiopathic sustained VT during pregnancy (IIa, C).', 'ควรพิจารณา metoprolol, propranolol หรือ verapamil แบบรับประทานสำหรับ idiopathic sustained VT ระยะยาวในการตั้งครรภ์ (IIa, C)')]) },
    esmolol: { rows: bb([]) },
    carvedilol: { rows: bb([]) },
    bisoprolol: { rows: bb([]) },
    magnesium: { rows: [
      r('Recommendation', 'คำแนะนำ', 'IV magnesium with potassium supplementation is recommended in torsades de pointes (I, C). No dose is given in the guideline.', 'แนะนำ IV magnesium ร่วมกับการเสริมโพแทสเซียมในผู้ป่วย torsades de pointes (I, C) แนวทางไม่ระบุขนาดยา')
    ] }
  };
})();
DRUGS_DATA.forEach((d) => {
  d.escVa = ESC_VA[d.id] || null;
});
SOURCES['esc22-va'] = {
  short: 'ESC 2022 ventricular arrhythmia guideline (Table 8)',
  title: 'Zeppenfeld K, et al. 2022 ESC Guidelines for the management of patients with ventricular arrhythmias and the prevention of sudden cardiac death. Eur Heart J 2022;43:3997-4126',
  url: 'https://doi.org/10.1093/eurheartj/ehac262'
};
