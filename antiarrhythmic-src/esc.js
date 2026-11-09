// What the 2024 ESC atrial fibrillation guideline (Van Gelder et al., Eur Heart J 2024;45:3314-3414, doi 10.1093/eurheartj/ehae176)
// says about each drug: Table 12 (rate control), Table 13 (rhythm control) and Recommendation Tables 14 and 18.
// Read from the PDF the author supplied on 9 Nov 2026; paraphrased, numbers as the guideline gives them.
// Drugs the guideline does not list have no entry and show N/A. The ESC reserves rights on its guideline content: keep this to short paraphrase.
const ESC_AF = (() => {
  const r = (lEn, lTh, en, th) => ({ lEn, lTh, en, th });
  const flecProp = (oral, orallTh, iv, ivTh) => [
    r('Oral (cardioversion)', 'รับประทาน (แปลงจังหวะ)', oral, orallTh),
    r('IV (cardioversion)', 'ฉีด IV (แปลงจังหวะ)', iv, ivTh),
    r('Long-term rhythm control', 'ควบคุมจังหวะระยะยาว', 'Class I, level A, but not with impaired LV systolic function, severe LVH or coronary artery disease. Adding a beta-blocker, diltiazem or verapamil should be considered (IIa, C) so atrial flutter cannot conduct 1:1.', 'Class I ระดับหลักฐาน A แต่ไม่ใช้ถ้า LV systolic function บกพร่อง LVH รุนแรง หรือโรคหลอดเลือดหัวใจ ควรพิจารณาให้ beta-blocker, diltiazem หรือ verapamil ร่วมด้วย (IIa, C) เพื่อกันการนำ 1:1 เมื่อเปลี่ยนเป็น atrial flutter')
  ];
  return {
    flecainide: { rows: [
      ...flecProp('200-300 mg; long-term 50-150 mg twice daily. Converts about 50-60% by 3 h and 75-85% by 6-8 h.', '200-300 มก. ระยะยาว 50-150 มก. วันละ 2 ครั้ง แปลงจังหวะได้ประมาณ 50-60% ใน 3 ชม. และ 75-85% ใน 6-8 ชม.', '1-2 mg/kg over 10 min; converts 52-95% (within about 6 h).', '1-2 มก./กก. ใน 10 นาที แปลงจังหวะได้ 52-95% (ภายในประมาณ 6 ชม.)'),
      r('Cautions', 'ข้อควรระวัง', 'Not for severe structural or coronary artery disease, Brugada syndrome, or CrCl below 35 mL/min/1.73 m2. Give an AV-node blocker in case it turns into flutter. Stop the infusion if QRS widens over 25% or bundle branch block appears. Not for converting atrial flutter. Pill-in-the-pocket only after supervised inpatient testing.', 'ไม่ใช้ในโรคโครงสร้างหัวใจหรือหลอดเลือดหัวใจรุนแรง Brugada syndrome หรือ CrCl ต่ำกว่า 35 มล./นาที/1.73 ตร.ม. ให้ยาที่กด AV node ไว้ เผื่อเปลี่ยนเป็น flutter หยุดยาเมื่อ QRS กว้างขึ้นเกิน 25% หรือเกิด bundle branch block ไม่ใช้แปลง atrial flutter และใช้ pill-in-the-pocket ได้เมื่อเคยทดสอบความปลอดภัยในโรงพยาบาลแล้วเท่านั้น')
    ] },
    propafenone: { rows: flecProp('450-600 mg; long-term 150-300 mg three times daily. Converts about 45-55% by 3 h and 69-78% by 8 h.', '450-600 มก. ระยะยาว 150-300 มก. วันละ 3 ครั้ง แปลงจังหวะได้ประมาณ 45-55% ใน 3 ชม. และ 69-78% ใน 8 ชม.', '1.5-2 mg/kg over 10 min; converts 43-89% (within about 6 h).', '1.5-2 มก./กก. ใน 10 นาที แปลงจังหวะได้ 43-89% (ภายในประมาณ 6 ชม.)') },
    amiodarone: { rows: [
      r('Rhythm control, IV / oral', 'ควบคุมจังหวะ IV / รับประทาน', '300 mg IV over 30-60 min, then 900-1,200 mg IV over 24 h (or 200 mg orally three times daily for 4 weeks). Long-term 200 mg daily. Converts about 44% (8-12 h to several days).', '300 มก. IV ใน 30-60 นาที แล้ว 900-1,200 มก. IV ใน 24 ชม. (หรือรับประทาน 200 มก. วันละ 3 ครั้ง 4 สัปดาห์) ระยะยาว 200 มก. วันละครั้ง แปลงจังหวะได้ประมาณ 44% (8-12 ชม. ถึงหลายวัน)'),
      r('Recommendation', 'คำแนะนำ', 'Class I, level A for long-term rhythm control in AF with HFrEF, with monitoring for extracardiac toxicity. For rate control it is a last option; IV amiodarone may be considered when haemodynamics are unstable or LVEF is severely low (IIb, B).', 'Class I ระดับ A สำหรับควบคุมจังหวะระยะยาวใน AF ที่มี HFrEF โดยติดตามพิษนอกหัวใจ ใช้ควบคุมอัตราเป็นทางเลือกสุดท้าย IV amiodarone พิจารณาได้เมื่อ hemodynamics ไม่คงที่หรือ LVEF ต่ำมาก (IIb, B)'),
      r('Cautions', 'ข้อควรระวัง', 'Phlebitis (large peripheral vein, avoid IV over 24 h, volumetric pump). Hypotension, bradycardia or AV block, QT prolongation. Only if nothing else works in hyperthyroidism. Contraindicated in iodine sensitivity. Many drug interactions; serious lung, eye, liver and thyroid effects.', 'หลอดเลือดดำอักเสบ (ใช้หลอดเลือดดำส่วนปลายขนาดใหญ่ ไม่ให้ IV เกิน 24 ชม. ใช้ volumetric pump) ความดันต่ำ หัวใจเต้นช้าหรือ AV block QT ยาว ในภาวะไทรอยด์เป็นพิษใช้เมื่อไม่มีทางเลือกอื่นเท่านั้น ห้ามใช้ถ้าแพ้ไอโอดีน ปฏิกิริยาระหว่างยามาก และมีผลข้างเคียงรุนแรงต่อปอด ตา ตับ และไทรอยด์')
    ] },
    ibutilide: { rows: [
      r('IV (cardioversion)', 'ฉีด IV (แปลงจังหวะ)', '1 mg over 10 min (0.01 mg/kg if under 60 kg); repeat 1 mg 10-20 min later. Converts 31-51% of AF (30-90 min) and 60-75% of flutter (60 min).', '1 มก. ใน 10 นาที (0.01 มก./กก. ถ้าน้ำหนักต่ำกว่า 60 กก.) ให้ซ้ำ 1 มก. หลัง 10-20 นาที แปลง AF ได้ 31-51% (30-90 นาที) และ flutter ได้ 60-75% (60 นาที)'),
      r('Cautions', 'ข้อควรระวัง', 'Give in a cardiac care unit (QT prolongation, torsades de pointes). ECG monitoring for at least 4 h afterwards. Not with prolonged QT, severe LVH or low LVEF.', 'ให้ในหอผู้ป่วยโรคหัวใจ (QT ยาว torsades de pointes) ติดตาม ECG อย่างน้อย 4 ชม. หลังให้ยา ไม่ใช้เมื่อ QT ยาว LVH รุนแรง หรือ LVEF ต่ำ')
    ] },
    vernakalant: { rows: [
      r('IV (cardioversion)', 'ฉีด IV (แปลงจังหวะ)', '3 mg/kg over 10 min (max 339 mg); if needed 2 mg/kg over 10 min after 10-15 min (max 226 mg). About 50% convert within 10 min.', '3 มก./กก. ใน 10 นาที (สูงสุด 339 มก.) ถ้าจำเป็นให้ 2 มก./กก. ใน 10 นาที หลัง 10-15 นาที (สูงสุด 226 มก.) ประมาณ 50% แปลงจังหวะภายใน 10 นาที'),
      r('Cautions', 'ข้อควรระวัง', 'Not with systolic BP under 100 mmHg, ACS within 1 month, NYHA III-IV HF, QT prolongation or severe aortic stenosis. May cause hypotension, QT prolongation, QRS widening or non-sustained VT.', 'ไม่ใช้เมื่อ SBP ต่ำกว่า 100 มม.ปรอท ACS ภายใน 1 เดือน HF NYHA III-IV QT ยาว หรือ aortic stenosis รุนแรง อาจทำให้ความดันต่ำ QT ยาว QRS กว้าง หรือ non-sustained VT')
    ] },
    dronedarone: { rows: [
      r('Long-term rhythm control', 'ควบคุมจังหวะระยะยาว', '400 mg twice daily. Class I, level A for AF needing long-term rhythm control, including HFmrEF, HFpEF, ischaemic heart disease and valve disease.', '400 มก. วันละ 2 ครั้ง Class I ระดับ A สำหรับ AF ที่ต้องควบคุมจังหวะระยะยาว รวมถึง HFmrEF, HFpEF, โรคหัวใจขาดเลือด และโรคลิ้นหัวใจ'),
      r('Rate control', 'ควบคุมอัตราการเต้น', 'Do not start it for rate control: it raised heart failure, stroke and cardiovascular death in permanent AF.', 'ไม่เริ่มใช้เพื่อควบคุมอัตราการเต้น เพราะเพิ่ม heart failure, stroke และการเสียชีวิตจากโรคหัวใจใน AF แบบถาวร')
    ] },
    sotalol: { rows: [
      r('Long-term rhythm control', 'ควบคุมจังหวะระยะยาว', '80-160 mg twice daily. Class IIb, level A, for normal LVEF or coronary artery disease, with close monitoring of QT, potassium, renal function and other proarrhythmia risks. The guideline notes a mortality signal.', '80-160 มก. วันละ 2 ครั้ง Class IIb ระดับ A ในผู้ที่ LVEF ปกติหรือมีโรคหลอดเลือดหัวใจ โดยติดตาม QT โพแทสเซียม การทำงานของไต และปัจจัยเสี่ยง proarrhythmia อย่างใกล้ชิด แนวทางระบุสัญญาณการเสียชีวิตที่เพิ่มขึ้น')
    ] },
    metoprolol: { rows: [
      r('Rate control', 'ควบคุมอัตราการเต้น', 'Tartrate: 2.5-5 mg IV over 2 min, up to 15 mg total; orally 25-100 mg twice daily. XL (succinate): 50-200 mg once daily. Beta-blockers are first choice at any LVEF (I, B); with LVEF 40% or less, beta-blocker and/or digoxin.', 'Tartrate: 2.5-5 มก. IV ใน 2 นาที รวมไม่เกิน 15 มก. รับประทาน 25-100 มก. วันละ 2 ครั้ง XL (succinate): 50-200 มก. วันละครั้ง Beta-blocker เป็นยาแรกที่เลือกได้ทุกระดับ LVEF (I, B) ถ้า LVEF 40% หรือต่ำกว่าใช้ beta-blocker และ/หรือ digoxin'),
      r('Contraindications', 'ข้อห้ามใช้', 'Acute heart failure and a history of severe bronchospasm. Avoid non-selective beta-blockers in asthma.', 'ภาวะหัวใจล้มเหลวเฉียบพลันและประวัติหลอดลมหดเกร็งรุนแรง หลีกเลี่ยง beta-blocker แบบไม่จำเพาะในโรคหืด')
    ] },
    esmolol: { rows: [
      r('Rate control, IV', 'ควบคุมอัตราการเต้น IV', '500 microgram/kg bolus over 1 min, then 50-300 microgram/kg/min.', 'bolus 500 ไมโครกรัม/กก. ใน 1 นาที แล้วหยด 50-300 ไมโครกรัม/กก./นาที')
    ] },
    bisoprolol: { rows: [
      r('Rate control', 'ควบคุมอัตราการเต้น', '1.25-20 mg once daily (usual oral range).', '1.25-20 มก. วันละครั้ง (ช่วงขนาดรับประทานทั่วไป)')
    ] },
    carvedilol: { rows: [
      r('Rate control', 'ควบคุมอัตราการเต้น', '3.125-50 mg twice daily (usual oral range).', '3.125-50 มก. วันละ 2 ครั้ง (ช่วงขนาดรับประทานทั่วไป)')
    ] },
    verapamil: { rows: [
      r('Rate control', 'ควบคุมอัตราการเต้น', 'IV 2.5-10 mg bolus over 5 min; orally 40 mg twice daily up to 480 mg once daily (extended release). First choice with LVEF above 40% (I, B).', 'IV 2.5-10 มก. bolus ใน 5 นาที รับประทาน 40 มก. วันละ 2 ครั้ง ถึง 480 มก. วันละครั้ง (ชนิดออกฤทธิ์นาน) เป็นยาแรกที่เลือกได้เมื่อ LVEF มากกว่า 40% (I, B)'),
      r('Contraindications', 'ข้อห้ามใช้', 'Contraindicated if LVEF is 40% or less. Adapt the dose in hepatic and renal impairment. Avoid combining with a beta-blocker except under close monitoring.', 'ห้ามใช้ถ้า LVEF 40% หรือต่ำกว่า ปรับขนาดในผู้ป่วยตับและไตบกพร่อง หลีกเลี่ยงการใช้ร่วมกับ beta-blocker ยกเว้นติดตามอย่างใกล้ชิด')
    ] },
    diltiazem: { rows: [
      r('Rate control', 'ควบคุมอัตราการเต้น', 'IV 0.25 mg/kg bolus over 5 min, then 5-15 mg/h; orally 60 mg three times daily up to 360 mg once daily (extended release). First choice with LVEF above 40% (I, B).', 'IV 0.25 มก./กก. bolus ใน 5 นาที แล้วหยด 5-15 มก./ชม. รับประทาน 60 มก. วันละ 3 ครั้ง ถึง 360 มก. วันละครั้ง (ชนิดออกฤทธิ์นาน) เป็นยาแรกที่เลือกได้เมื่อ LVEF มากกว่า 40% (I, B)'),
      r('Contraindications', 'ข้อห้ามใช้', 'Contraindicated if LVEF is 40% or less. Adapt the dose in hepatic and renal impairment. Avoid combining with a beta-blocker except under close monitoring.', 'ห้ามใช้ถ้า LVEF 40% หรือต่ำกว่า ปรับขนาดในผู้ป่วยตับและไตบกพร่อง หลีกเลี่ยงการใช้ร่วมกับ beta-blocker ยกเว้นติดตามอย่างใกล้ชิด')
    ] },
    digoxin: { rows: [
      r('Rate control', 'ควบคุมอัตราการเต้น', 'IV 0.5 mg bolus (0.75-1.5 mg over 24 h in divided doses); orally 0.0625-0.25 mg once daily. First choice with LVEF above 40% (I, B); with LVEF 40% or less, beta-blocker and/or digoxin (I, B). IV digoxin may be considered in unstable haemodynamics (IIb, B).', 'IV 0.5 มก. bolus (0.75-1.5 มก. ใน 24 ชม. แบ่งให้) รับประทาน 0.0625-0.25 มก. วันละครั้ง เป็นยาแรกที่เลือกได้เมื่อ LVEF มากกว่า 40% (I, B) ถ้า LVEF 40% หรือต่ำกว่าใช้ beta-blocker และ/หรือ digoxin (I, B) IV digoxin พิจารณาได้เมื่อ hemodynamics ไม่คงที่ (IIb, B)'),
      r('Cautions', 'ข้อควรระวัง', 'High plasma levels are linked to adverse events. Check renal function before starting and adapt the dose in CKD.', 'ระดับยาในเลือดสูงสัมพันธ์กับอาการไม่พึงประสงค์ ตรวจการทำงานของไตก่อนเริ่มและปรับขนาดใน CKD')
    ] }
  };
})();
DRUGS_DATA.forEach((d) => {
  d.esc = ESC_AF[d.id] || null;
});
SOURCES['esc24-af'] = {
  short: 'ESC 2024 AF guideline (Table 12, Table 13)',
  title: 'Van Gelder IC, et al. 2024 ESC Guidelines for the management of atrial fibrillation developed in collaboration with EACTS. Eur Heart J 2024;45:3314-3414',
  url: 'https://doi.org/10.1093/eurheartj/ehae176'
};
