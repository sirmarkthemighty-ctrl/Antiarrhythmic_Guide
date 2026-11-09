// What the 2019 ESC supraventricular tachycardia guideline (Brugada et al., Eur Heart J 2020;41:655-720, doi 10.1093/eurheartj/ehz467)
// says about each drug: its recommendation tables for acute and chronic therapy, plus the few doses in the text.
// Read from the PDF the author supplied on 9 Nov 2026; paraphrased, numbers as the guideline gives them. The dose table is in the
// guideline's online supplement, which was not supplied, so only doses given in the main text appear.
// Drugs the guideline does not name have no entry and show N/A. The ESC reserves rights on its guideline content: keep it short.
const ESC_SVT = (() => {
  const r = (lEn, lTh, en, th) => ({ lEn, lTh, en, th });
  const ivCaution = r('Cautions', 'ข้อควรระวัง', 'IV verapamil and diltiazem are contraindicated with hypotension or HFrEF. Not recommended, and potentially harmful, in pre-excited AF (III, B).', 'IV verapamil และ diltiazem ห้ามใช้เมื่อความดันต่ำหรือ HFrEF ไม่แนะนำและอาจเป็นอันตรายใน pre-excited AF (III, B)');
  const ccbUse = (drugEn, drugTh) => r('Use', 'การใช้', drugEn + ' IV should be considered if vagal manoeuvres and adenosine fail, in narrow-QRS tachycardia, AVNRT and orthodromic AVRT (IIa, B), and in focal atrial tachycardia if adenosine fails (IIa, C). Chronic: with no HFrEF, should be considered if ablation is not desirable or feasible, in AVNRT (IIa, B), orthodromic AVRT without pre-excitation (IIa, B) and focal AT (IIa, C).', drugTh + ' IV ควรพิจารณาเมื่อ vagal manoeuvres และ adenosine ไม่ได้ผล ใน narrow-QRS tachycardia, AVNRT และ orthodromic AVRT (IIa, B) และใน focal atrial tachycardia เมื่อ adenosine ไม่ได้ผล (IIa, C) ระยะยาว: ถ้าไม่มี HFrEF ควรพิจารณาเมื่อการทำ ablation ไม่เหมาะหรือทำไม่ได้ ใน AVNRT (IIa, B), orthodromic AVRT ที่ไม่มี pre-excitation (IIa, B) และ focal AT (IIa, C)');
  const bbUse = (nameEn, nameTh) => r('Use', 'การใช้', nameEn + ' IV should be considered, if there is no decompensated HF, when vagal manoeuvres and adenosine fail, in narrow-QRS tachycardia, AVNRT and orthodromic AVRT (IIa, C), and in focal AT if adenosine fails (IIa, C). Chronic: beta-blockers should be considered if ablation is not desirable or feasible, in AVNRT (IIa, B), orthodromic AVRT without pre-excitation (IIa, B) and focal AT (IIa, C).', nameTh + ' IV ควรพิจารณา ถ้าไม่มี decompensated HF เมื่อ vagal manoeuvres และ adenosine ไม่ได้ผล ใน narrow-QRS tachycardia, AVNRT และ orthodromic AVRT (IIa, C) และใน focal AT เมื่อ adenosine ไม่ได้ผล (IIa, C) ระยะยาว: ควรพิจารณา beta-blocker เมื่อการทำ ablation ไม่เหมาะหรือทำไม่ได้ ใน AVNRT (IIa, B), orthodromic AVRT ที่ไม่มี pre-excitation (IIa, B) และ focal AT (IIa, C)');
  const bbCaution = r('Cautions', 'ข้อควรระวัง', 'IV beta-blockers are contraindicated in decompensated heart failure. Not recommended, and potentially harmful, in pre-excited AF (III, B).', 'IV beta-blocker ห้ามใช้ในหัวใจล้มเหลวที่ไม่คงที่ ไม่แนะนำและอาจเป็นอันตรายใน pre-excited AF (III, B)');
  const classIc = (nameEn, nameTh, oralEn, oralTh) => [
    r('Use', 'การใช้', 'IV ' + nameEn + ' may be used in focal atrial tachycardia if the first measures fail (IIb, C), and should be considered in antidromic AVRT (IIa, B). Chronic: ' + nameEn + ' with no ischaemic or structural heart disease should be considered in focal AT if ablation is not desirable (IIa, C), and may be considered in AVRT (IIb, B).' + oralEn, 'IV ' + nameTh + ' ใช้ได้ใน focal atrial tachycardia เมื่อมาตรการแรกไม่ได้ผล (IIb, C) และควรพิจารณาใน antidromic AVRT (IIa, B) ระยะยาว: ' + nameTh + ' เมื่อไม่มีโรคหลอดเลือดหัวใจหรือโครงสร้างหัวใจ ควรพิจารณาใน focal AT ถ้าไม่เหมาะกับ ablation (IIa, C) และพิจารณาได้ใน AVRT (IIb, B)' + oralTh),
    r('Cautions', 'ข้อควรระวัง', 'IV flecainide and propafenone are contraindicated in ischaemic or structural heart disease. They prolong the QTc, but much less than class III drugs.', 'IV flecainide และ propafenone ห้ามใช้ในโรคหลอดเลือดหัวใจหรือโครงสร้างหัวใจ ทำให้ QTc ยาวขึ้น แต่น้อยกว่ายา class III มาก')
  ];
  return {
    adenosine: { rows: [
      r('Dose and use', 'ขนาดยาและการใช้', '6-18 mg IV bolus. Recommended if vagal manoeuvres fail in regular narrow-QRS tachycardia, AVNRT and orthodromic AVRT (I, B); should be considered in focal atrial tachycardia (IIa, B).', '6-18 มก. IV bolus แนะนำเมื่อ vagal manoeuvres ไม่ได้ผลใน narrow-QRS tachycardia ที่สม่ำเสมอ, AVNRT และ orthodromic AVRT (I, B) ควรพิจารณาใน focal atrial tachycardia (IIa, B)'),
      r('Wide-QRS tachycardia', 'wide-QRS tachycardia', 'Should be considered if vagal manoeuvres fail and the resting ECG shows no pre-excitation (IIa, C). Avoid it if the resting ECG suggests pre-excitation: in antidromic re-entry it can precipitate cardiac arrest if it induces AF.', 'ควรพิจารณาเมื่อ vagal manoeuvres ไม่ได้ผลและ ECG ขณะพักไม่มี pre-excitation (IIa, C) หลีกเลี่ยงถ้า ECG ขณะพักบ่งชี้ pre-excitation เพราะใน antidromic re-entry อาจทำให้หัวใจหยุดเต้นหากกระตุ้นให้เกิด AF')
    ] },
    verapamil: { rows: [
      ccbUse('Verapamil', 'Verapamil'),
      r('Cautions', 'ข้อควรระวัง', 'IV verapamil is contraindicated with hypotension or HFrEF. Not recommended in wide-QRS tachycardia of unknown cause (III, B), because it can cause severe haemodynamic deterioration in VT. Not recommended, and potentially harmful, in pre-excited AF (III, B).', 'IV verapamil ห้ามใช้เมื่อความดันต่ำหรือ HFrEF ไม่แนะนำใน wide-QRS tachycardia ที่ไม่ทราบสาเหตุ (III, B) เพราะอาจทำให้ hemodynamics แย่ลงมากใน VT ไม่แนะนำและอาจเป็นอันตรายใน pre-excited AF (III, B)')
    ] },
    diltiazem: { rows: [
      ccbUse('Diltiazem', 'Diltiazem'),
      r('Oral single dose', 'ขนาดรับประทานครั้งเดียว', 'A single oral dose of diltiazem 120 mg plus propranolol 80 mg may convert up to about 94% of AVNRT episodes out of hospital, with a risk of hypotension, transient AV block or syncope; caution in the elderly and with sinus or AV node disease.', 'diltiazem รับประทาน 120 มก. ครั้งเดียวร่วมกับ propranolol 80 มก. อาจแปลง AVNRT ได้สูงสุดประมาณ 94% นอกโรงพยาบาล เสี่ยงความดันต่ำ AV block ชั่วคราว หรือเป็นลม ระวังในผู้สูงอายุและผู้ที่มีโรคของ sinus หรือ AV node'),
      ivCaution
    ] },
    esmolol: { rows: [bbUse('Esmolol', 'Esmolol'), bbCaution] },
    metoprolol: { rows: [bbUse('Metoprolol', 'Metoprolol'), bbCaution] },
    propranolol: { rows: [
      r('Use', 'การใช้', 'Oral propranolol 80 mg with diltiazem 120 mg can convert AVNRT (see diltiazem). IV propranolol, with or without procainamide, may be used for acute junctional ectopic tachycardia, but data are scarce; oral propranolol may be tried for chronic therapy. In inappropriate sinus tachycardia, beta-blockers should be considered in symptomatic patients (IIa, C).', 'propranolol รับประทาน 80 มก. ร่วมกับ diltiazem 120 มก. แปลง AVNRT ได้ (ดู diltiazem) IV propranolol จะใช้ร่วมกับ procainamide หรือไม่ก็ได้ สำหรับ junctional ectopic tachycardia เฉียบพลัน แต่ข้อมูลน้อย ระยะยาวลองใช้ propranolol รับประทานได้ ใน inappropriate sinus tachycardia ควรพิจารณา beta-blocker ในผู้ป่วยที่มีอาการ (IIa, C)'),
      bbCaution
    ] },
    ibutilide: { rows: [
      r('Use', 'การใช้', 'IV ibutilide may be used in focal atrial tachycardia if the first measures fail (IIb, C), and should be considered in antidromic AVRT with IV procainamide, flecainide or propafenone, or cardioversion (IIa, B).', 'IV ibutilide ใช้ได้ใน focal atrial tachycardia เมื่อมาตรการแรกไม่ได้ผล (IIb, C) และควรพิจารณาใน antidromic AVRT ร่วมกับ IV procainamide, flecainide หรือ propafenone หรือการช็อกไฟฟ้า (IIa, B)'),
      r('Cautions', 'ข้อควรระวัง', 'Contraindicated in patients with a prolonged QTc.', 'ห้ามใช้ในผู้ป่วยที่ QTc ยาว')
    ] },
    procainamide: { rows: [
      r('Use', 'การใช้', 'Wide-QRS tachycardia of unknown cause: IV procainamide should be considered if vagal manoeuvres and adenosine fail (IIa, B). Antidromic AVRT: should be considered (IIa, B). Also used, with scarce data, for acute junctional ectopic tachycardia.', 'wide-QRS tachycardia ที่ไม่ทราบสาเหตุ: ควรพิจารณา IV procainamide เมื่อ vagal manoeuvres และ adenosine ไม่ได้ผล (IIa, B) antidromic AVRT: ควรพิจารณา (IIa, B) ใช้ใน junctional ectopic tachycardia เฉียบพลันด้วย แต่ข้อมูลน้อย'),
      r('Cautions', 'ข้อควรระวัง', 'Prolongs the QTc, but much less than class III drugs.', 'ทำให้ QTc ยาวขึ้น แต่น้อยกว่ายา class III มาก')
    ] },
    flecainide: { rows: classIc('flecainide', 'flecainide', ' A single oral dose of 3 mg/kg may also convert AVNRT, at a lower rate than diltiazem plus a beta-blocker.', ' flecainide รับประทาน 3 มก./กก. ครั้งเดียวอาจแปลง AVNRT ได้เช่นกัน แต่อัตราต่ำกว่า diltiazem ร่วมกับ beta-blocker') },
    propafenone: { rows: classIc('propafenone', 'propafenone', '', '') },
    amiodarone: { rows: [
      r('Use', 'การใช้', 'IV amiodarone may be used in focal AT if the first measures fail (IIb, C), may be considered in wide-QRS tachycardia of unknown cause (IIb, B) and in refractory antidromic AVRT (IIb, B). Oral amiodarone may be considered chronically in focal AT if other measures fail (IIb, C). IV amiodarone is the drug of choice for post-operative junctional ectopic tachycardia.', 'IV amiodarone ใช้ได้ใน focal AT เมื่อมาตรการแรกไม่ได้ผล (IIb, C) พิจารณาได้ใน wide-QRS tachycardia ที่ไม่ทราบสาเหตุ (IIb, B) และ antidromic AVRT ที่ดื้อ (IIb, B) amiodarone รับประทานพิจารณาได้ระยะยาวใน focal AT เมื่อมาตรการอื่นไม่ได้ผล (IIb, C) IV amiodarone เป็นยาที่เลือกใช้สำหรับ junctional ectopic tachycardia หลังผ่าตัด'),
      r('Cautions', 'ข้อควรระวัง', 'Prolongs the QTc, but torsades de pointes is rare. Not recommended, and potentially harmful, in pre-excited AF (III, B).', 'ทำให้ QTc ยาวขึ้น แต่พบ torsades de pointes ได้น้อย ไม่แนะนำและอาจเป็นอันตรายใน pre-excited AF (III, B)')
    ] },
    ivabradine: { rows: [
      r('Use', 'การใช้', 'Inappropriate sinus tachycardia: ivabradine alone or with a beta-blocker should be considered in symptomatic patients (IIa, B). Focal atrial tachycardia: with a beta-blocker, may be considered if the other measures fail (IIb, C). Postural orthostatic tachycardia syndrome: may be considered (IIb, C).', 'inappropriate sinus tachycardia: ควรพิจารณา ivabradine เดี่ยวหรือร่วมกับ beta-blocker ในผู้ป่วยที่มีอาการ (IIa, B) focal atrial tachycardia: ร่วมกับ beta-blocker พิจารณาได้เมื่อมาตรการอื่นไม่ได้ผล (IIb, C) postural orthostatic tachycardia syndrome: พิจารณาได้ (IIb, C)')
    ] },
    digoxin: { rows: [
      r('Cautions', 'ข้อควรระวัง', 'Digoxin, together with beta-blockers, diltiazem, verapamil and amiodarone, is not recommended and is potentially harmful in pre-excited AF (III, B).', 'digoxin พร้อมกับ beta-blocker, diltiazem, verapamil และ amiodarone ไม่แนะนำและอาจเป็นอันตรายใน pre-excited AF (III, B)')
    ] }
  };
})();
DRUGS_DATA.forEach((d) => {
  d.escSvt = ESC_SVT[d.id] || null;
});
SOURCES['esc19-svt'] = {
  short: 'ESC 2019 SVT guideline',
  title: 'Brugada J, et al. 2019 ESC Guidelines for the management of patients with supraventricular tachycardia. Eur Heart J 2020;41:655-720',
  url: 'https://doi.org/10.1093/eurheartj/ehz467'
};
