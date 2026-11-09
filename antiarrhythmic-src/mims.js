// Recommended adult doses as listed by MIMS Thailand (generic medicine info, "not country-specific"), read 2026-11-03
// while signed in. Paraphrased; numbers as MIMS gives them. Each drug is a few rows: r(label EN, label TH, text EN, text TH).
// na: true = MIMS lists no arrhythmia dose for this drug. Source links are registered at the bottom (key "mims:<id>").
const MIMS_SLUG = { magnesium: 'magnesium-sulfate' };
const r = (lEn, lTh, en, th) => ({ lEn, lTh, en, th });
const MIMS_DOSE = {
  procainamide: { rows: [
    r('IV bolus', 'ฉีด IV', '100 mg every 5 min at no more than 50 mg/min, until controlled or 500 mg given; wait about 10 min before more. Max 1,000 mg.', '100 มก. ทุก 5 นาที ไม่เร็วกว่า 50 มก./นาที จนควบคุมได้หรือครบ 500 มก. แล้วรอประมาณ 10 นาทีก่อนให้เพิ่ม สูงสุด 1,000 มก.'),
    r('IV loading infusion', 'หยดนำ IV', '20 mg/mL at 1 mL/min over 25-30 min (500-600 mg). Max 1,000 mg.', '20 มก./มล. อัตรา 1 มล./นาที นาน 25-30 นาที (500-600 มก.) สูงสุด 1,000 มก.'),
    r('IV maintenance', 'หยดต่อเนื่อง IV', '2 mg/mL at 1-3 mL/min, or 4 mg/mL at 0.5-1.5 mL/min; adjust to response, weight and age.', '2 มก./มล. 1-3 มล./นาที หรือ 4 มก./มล. 0.5-1.5 มล./นาที ปรับตามการตอบสนอง น้ำหนัก และอายุ'),
    r('Special groups', 'กลุ่มพิเศษ', 'Elderly: start low. Renal impairment: adjustment may be needed. No oral dose listed.', 'ผู้สูงอายุ: เริ่มขนาดต่ำ ไตบกพร่อง: อาจต้องปรับขนาด ไม่มีขนาดยารับประทานใน MIMS')
  ] },
  quinidine: { rows: [
    r('Oral · AF conversion', 'รับประทาน · แปลง AF', 'Quinidine sulfate 400 mg every 6 h, raised gradually if no conversion after 4-5 doses.', 'quinidine sulfate 400 มก. ทุก 6 ชม. เพิ่มทีละน้อยถ้าไม่กลับจังหวะหลังครบ 4-5 ครั้ง'),
    r('Oral · AF conversion (gluconate)', 'รับประทาน · แปลง AF (gluconate)', '324 mg every 8 h for 2 days, then 648 mg every 12 h for 2 days, then 648 mg every 8 h for up to 4 days (a lower dose for 4 days if higher doses are not tolerated).', '324 มก. ทุก 8 ชม. 2 วัน แล้ว 648 มก. ทุก 12 ชม. 2 วัน แล้ว 648 มก. ทุก 8 ชม. ไม่เกิน 4 วัน (ถ้าทนขนาดสูงไม่ได้ ใช้ขนาดต่ำกว่าได้ 4 วัน)'),
    r('Oral · AF relapse and ventricular arrhythmias', 'รับประทาน · ป้องกัน AF กลับเป็นซ้ำและ ventricular arrhythmia', 'Sulfate 200 mg every 6 h, or gluconate 324 mg every 8-12 h, raised gradually. Usual 1,000-1,500 mg/day in 2-3 doses.', 'sulfate 200 มก. ทุก 6 ชม. หรือ gluconate 324 มก. ทุก 8-12 ชม. เพิ่มทีละน้อย ขนาดปกติ 1,000-1,500 มก./วัน แบ่ง 2-3 ครั้ง')
  ] },
  disopyramide: { rows: [
    r('Oral · life-threatening ventricular or supraventricular arrhythmias', 'รับประทาน · ventricular หรือ supraventricular arrhythmia ที่อันตรายถึงชีวิต', 'Capsules 300-800 mg/day in divided doses. Modified-release tablets 250-375 mg every 12 h.', 'แคปซูล 300-800 มก./วัน แบ่งให้ ยาเม็ดออกฤทธิ์นาน 250-375 มก. ทุก 12 ชม.'),
    r('Special groups', 'กลุ่มพิเศษ', 'Renal or hepatic impairment: reduce the dose (no figures given). Doses differ between products and countries.', 'ไตหรือตับบกพร่อง: ลดขนาด (MIMS ไม่ระบุตัวเลข) ขนาดยาต่างกันตามผลิตภัณฑ์และประเทศ')
  ] },
  lidocaine: { rows: [
    r('IV bolus · ventricular arrhythmias after MI or cardiac surgery', 'ฉีด IV · ventricular arrhythmia หลัง MI หรือผ่าตัดหัวใจ', '50-100 mg (1-1.5 mg/kg) at about 25-50 mg/min. A second dose may follow after 5 min. Max 200-300 mg in 1 h.', '50-100 มก. (1-1.5 มก./กก.) อัตราประมาณ 25-50 มก./นาที ให้ครั้งที่สองได้หลัง 5 นาที สูงสุด 200-300 มก. ใน 1 ชม.'),
    r('IV infusion · prevent recurrence when oral is not possible', 'หยด IV · ป้องกันกลับเป็นซ้ำเมื่อให้ยากินไม่ได้', '1-4 mg/min (20-50 mcg/kg/min) after the bolus. Stop at a stable rhythm or the first sign of toxicity.', '1-4 มก./นาที (20-50 มคก./กก./นาที) ต่อจากขนาดนำ หยุดเมื่อจังหวะคงที่หรือเริ่มมีอาการพิษ'),
    r('Special groups', 'กลุ่มพิเศษ', 'Heart failure and elderly: reduce the dose.', 'หัวใจล้มเหลวและผู้สูงอายุ: ลดขนาด')
  ] },
  mexiletine: { rows: [
    r('Oral · rapid control (ventricular arrhythmias)', 'รับประทาน · ต้องการควบคุมเร็ว (ventricular arrhythmia)', '400 mg load, then 150-300 mg every 8-12 h. Doses as hydrochloride.', 'ขนาดนำ 400 มก. แล้ว 150-300 มก. ทุก 8-12 ชม. ขนาดเป็น hydrochloride'),
    r('Oral · when rapid control is not needed', 'รับประทาน · ไม่ต้องควบคุมเร็ว', 'Start 200 mg every 8 h; adjust by 50-100 mg at least 2-3 days apart. Usual 200-300 mg every 8 h; max 400 mg every 8 h.', 'เริ่ม 200 มก. ทุก 8 ชม. ปรับครั้งละ 50-100 มก. ห่างกันอย่างน้อย 2-3 วัน ปกติ 200-300 มก. ทุก 8 ชม. สูงสุด 400 มก. ทุก 8 ชม.'),
    r('Twice-daily option', 'ทางเลือกวันละ 2 ครั้ง', 'If controlled on 300 mg or less every 8 h, may switch to every 12 h (max 450 mg every 12 h).', 'ถ้าคุมได้ที่ 300 มก. หรือน้อยกว่าทุก 8 ชม. เปลี่ยนเป็นทุก 12 ชม. ได้ (สูงสุด 450 มก. ทุก 12 ชม.)'),
    r('Special groups', 'กลุ่มพิเศษ', 'Mild to moderate hepatic impairment: raise the dose only after at least 2 weeks. (MIMS also lists myotonia: 167-500 mg/day as base.)', 'ตับบกพร่องเล็กน้อยถึงปานกลาง: เพิ่มขนาดหลังให้ยาอย่างน้อย 2 สัปดาห์ (MIMS ระบุข้อบ่งใช้ myotonia ด้วย: 167-500 มก./วัน เป็น base)')
  ] },
  phenytoin: { na: true, rows: [
    r('No arrhythmia dose', 'ไม่มีขนาดสำหรับหัวใจเต้นผิดจังหวะ', 'MIMS lists phenytoin for seizures only (for example status epilepticus: IV loading 10-15 mg/kg at no more than 50 mg/min).', 'MIMS ระบุเฉพาะข้อบ่งใช้ชัก (เช่น status epilepticus ให้ IV 10-15 มก./กก. ไม่เร็วกว่า 50 มก./นาที)')
  ] },
  flecainide: { rows: [
    r('Oral · SVT and paroxysmal AF/flutter (no structural heart disease)', 'รับประทาน · SVT และ paroxysmal AF/flutter (ไม่มีโรคหัวใจเชิงโครงสร้าง)', 'Tablets 50 mg every 12 h, raised by 50 mg twice daily at 4-day intervals; max 300 mg/day. Controlled-release capsule 100 mg once daily, raised by 100 mg at least 7 days apart; max 300 mg/day.', 'ยาเม็ด 50 มก. ทุก 12 ชม. เพิ่มครั้งละ 50 มก. วันละ 2 ครั้ง ห่างกัน 4 วัน สูงสุด 300 มก./วัน แคปซูลออกฤทธิ์นาน 100 มก. วันละครั้ง เพิ่มครั้งละ 100 มก. ห่างกันอย่างน้อย 7 วัน สูงสุด 300 มก./วัน'),
    r('Oral · sustained VT (no structural heart disease)', 'รับประทาน · sustained VT (ไม่มีโรคหัวใจเชิงโครงสร้าง)', 'Tablets 50-100 mg every 12 h, raised by 50 mg twice daily every 4 days; max 400 mg/day.', 'ยาเม็ด 50-100 มก. ทุก 12 ชม. เพิ่มครั้งละ 50 มก. วันละ 2 ครั้ง ทุก 4 วัน สูงสุด 400 มก./วัน'),
    r('IV (as listed by MIMS)', 'ฉีด IV (ตามที่ MIMS ระบุ)', '2 mg/kg over at least 10 min (max 150 mg). For prolonged therapy then 1.5 mg/kg/h for 1 h, then 0.1-0.25 mg/kg/h; max 600 mg in 24 h; continuous ECG.', '2 มก./กก. ใน 10 นาทีขึ้นไป (สูงสุด 150 มก.) ถ้าต้องให้ต่อ หยด 1.5 มก./กก./ชม. 1 ชม. แล้ว 0.1-0.25 มก./กก./ชม. สูงสุด 600 มก. ใน 24 ชม. ติดตาม ECG ต่อเนื่อง')
  ] },
  propafenone: { rows: [
    r('Oral · ventricular arrhythmias and paroxysmal AF/flutter/SVT', 'รับประทาน · ventricular arrhythmia และ paroxysmal AF/flutter/SVT', 'Tablets 150 mg three times daily; may raise at least 3 days apart to 300 mg twice daily (or 225 mg every 8 h for the atrial arrhythmias). Max 300 mg three times daily. Under 70 kg: may need a lower dose.', 'ยาเม็ด 150 มก. วันละ 3 ครั้ง เพิ่มได้ห่างกันอย่างน้อย 3 วันเป็น 300 มก. วันละ 2 ครั้ง (หรือ 225 มก. ทุก 8 ชม. สำหรับ atrial arrhythmia) สูงสุด 300 มก. วันละ 3 ครั้ง น้ำหนักน้อยกว่า 70 กก. อาจต้องลดขนาด'),
    r('Oral · AF recurrence (no structural heart disease)', 'รับประทาน · ป้องกัน AF กลับเป็นซ้ำ (ไม่มีโรคหัวใจเชิงโครงสร้าง)', 'Extended-release capsule 225 mg every 12 h, raised at least 5 days apart to 325 mg, then 425 mg every 12 h.', 'แคปซูลออกฤทธิ์นาน 225 มก. ทุก 12 ชม. เพิ่มห่างกันอย่างน้อย 5 วันเป็น 325 มก. แล้ว 425 มก. ทุก 12 ชม.')
  ] },
  esmolol: { rows: [
    r('IV · rate control in supraventricular arrhythmias and sinus tachycardia', 'ฉีด IV · ควบคุมอัตราเต้นใน supraventricular arrhythmia และ sinus tachycardia', '500 mcg/kg over 1 min, then 50 mcg/kg/min for 4 min.', '500 มคก./กก. ใน 1 นาที แล้ว 50 มคก./กก./นาที นาน 4 นาที'),
    r('IV · if the response is inadequate', 'ฉีด IV · ถ้าตอบสนองไม่พอ', 'Within 5 min, raise in 50 mcg/kg/min steps (4 min each) to a max of 200 mcg/kg/min; the 500 mcg/kg load may be repeated before each step. May continue up to 48 h.', 'ภายใน 5 นาที เพิ่มครั้งละ 50 มคก./กก./นาที (ขั้นละ 4 นาที) สูงสุด 200 มคก./กก./นาที ให้ขนาดนำ 500 มคก./กก. ซ้ำก่อนเพิ่มแต่ละขั้นได้ ต่อได้นานถึง 48 ชม.'),
    r('IV · perioperative tachycardia or hypertension', 'ฉีด IV · หัวใจเต้นเร็วหรือความดันสูงระหว่างผ่าตัด', '1,000 mcg/kg bolus, then 150 mcg/kg/min, up to 300 mcg/kg/min.', '1,000 มคก./กก. แล้ว 150 มคก./กก./นาที สูงสุด 300 มคก./กก./นาที')
  ] },
  metoprolol: { rows: [
    r('IV · arrhythmias (especially supraventricular)', 'ฉีด IV · arrhythmia (โดยเฉพาะ supraventricular)', 'Up to 5 mg at 1-2 mg/min, repeated every 5 min to a total of 10-15 mg.', 'ไม่เกิน 5 มก. อัตรา 1-2 มก./นาที ซ้ำทุก 5 นาที รวม 10-15 มก.'),
    r('IV · during anaesthesia', 'ฉีด IV · ระหว่างดมยาสลบ', '2-4 mg slow IV, plus 2 mg as needed; max 10 mg.', '2-4 มก. ฉีดช้า เพิ่มครั้งละ 2 มก. ตามต้องการ สูงสุด 10 มก.'),
    r('Oral · arrhythmias', 'รับประทาน · arrhythmia', 'Tartrate 50 mg two or three times daily, up to 300 mg/day in divided doses; max 400 mg/day.', 'tartrate 50 มก. วันละ 2-3 ครั้ง เพิ่มได้ถึง 300 มก./วัน แบ่งให้ สูงสุด 400 มก./วัน'),
    r('Oral · heart failure (succinate)', 'รับประทาน · หัวใจล้มเหลว (succinate)', '12.5-25 mg once daily, raised every 2 weeks; max 200 mg/day.', '12.5-25 มก. วันละครั้ง เพิ่มทุก 2 สัปดาห์ สูงสุด 200 มก./วัน')
  ] },
  carvedilol: { na: true, rows: [
    r('No arrhythmia dose', 'ไม่มีขนาดสำหรับหัวใจเต้นผิดจังหวะ', 'MIMS lists carvedilol for heart failure, post-MI LV dysfunction, angina and hypertension only.', 'MIMS ระบุเฉพาะหัวใจล้มเหลว LV dysfunction หลัง MI angina และความดันสูง'),
    r('Chronic heart failure (immediate-release)', 'หัวใจล้มเหลวเรื้อรัง (ชนิดออกฤทธิ์ทันที)', '3.125 mg twice daily for 2 weeks, doubled at least 2 weeks apart to 25 mg twice daily (50 mg twice daily if over 85 kg).', '3.125 มก. วันละ 2 ครั้ง 2 สัปดาห์ เพิ่มเป็น 2 เท่าห่างกันอย่างน้อย 2 สัปดาห์ จนถึง 25 มก. วันละ 2 ครั้ง (น้ำหนักเกิน 85 กก. 50 มก. วันละ 2 ครั้ง)'),
    r('Post-MI LV dysfunction', 'LV dysfunction หลัง MI', '6.25 mg twice daily, target 25 mg twice daily.', '6.25 มก. วันละ 2 ครั้ง เป้าหมาย 25 มก. วันละ 2 ครั้ง')
  ] },
  propranolol: { rows: [
    r('IV · emergency treatment of arrhythmias', 'ฉีด IV · รักษา arrhythmia ฉุกเฉิน', '1 mg over 1 min, may repeat every 2 min until a response. Max 10 mg in conscious patients, 5 mg under anaesthesia.', '1 มก. ใน 1 นาที ซ้ำได้ทุก 2 นาทีจนตอบสนอง สูงสุด 10 มก. ในผู้ป่วยที่รู้ตัว หรือ 5 มก. ขณะดมยาสลบ'),
    r('Oral · arrhythmias', 'รับประทาน · arrhythmia', '10-40 mg three or four times daily.', '10-40 มก. วันละ 3-4 ครั้ง')
  ] },
  bisoprolol: { na: true, rows: [
    r('No arrhythmia dose', 'ไม่มีขนาดสำหรับหัวใจเต้นผิดจังหวะ', 'MIMS lists bisoprolol for heart failure, angina and hypertension only.', 'MIMS ระบุเฉพาะหัวใจล้มเหลว angina และความดันสูง'),
    r('Chronic heart failure', 'หัวใจล้มเหลวเรื้อรัง', '1.25 mg once daily for 1 week, stepped up weekly to 10 mg once daily (max 10 mg).', '1.25 มก. วันละครั้ง 1 สัปดาห์ เพิ่มทุกสัปดาห์จนถึง 10 มก. วันละครั้ง (สูงสุด 10 มก.)'),
    r('Angina or hypertension', 'angina หรือความดันสูง', '5 mg once daily, usual 10 mg; max 20 mg/day.', '5 มก. วันละครั้ง ปกติ 10 มก. สูงสุด 20 มก./วัน')
  ] },
  amiodarone: { rows: [
    r('IV · severe arrhythmias unresponsive to other therapy', 'ฉีด IV · arrhythmia รุนแรงที่ไม่ตอบสนองการรักษาอื่น', '5 mg/kg in 250 mL D5W over 20-120 min; may repeat to a total of 1,200 mg in 24 h.', '5 มก./กก. ใน D5W 250 มล. นาน 20-120 นาที ซ้ำได้จนรวม 1,200 มก. ใน 24 ชม.'),
    r('IV · emergency', 'ฉีด IV · ฉุกเฉิน', '150-300 mg slow IV over at least 3 min; may repeat after at least 15 min.', '150-300 มก. ฉีดช้านานอย่างน้อย 3 นาที ซ้ำได้หลังอย่างน้อย 15 นาที'),
    r('IV · recurrent VF or unstable VT', 'ฉีด IV · VF ซ้ำหรือ VT ที่ไม่คงที่', '150 mg over 10 min, then 900 mg at 1 mg/min for 6 h and 0.5 mg/min for 18 h; then 0.5 mg/min. Breakthrough: 150 mg over 10 min.', '150 มก. ใน 10 นาที แล้ว 900 มก. อัตรา 1 มก./นาที 6 ชม. และ 0.5 มก./นาที 18 ชม. จากนั้น 0.5 มก./นาที กำเริบระหว่างให้ยา: 150 มก. ใน 10 นาที'),
    r('IV · cardiac arrest (refractory VF / pulseless VT)', 'ฉีด IV · หัวใจหยุดเต้น (VF / pulseless VT ดื้อต่อช็อก)', '300 mg (or 5 mg/kg) rapid IV, then 150 mg (2.5 mg/kg) if it persists.', '300 มก. (หรือ 5 มก./กก.) ฉีดเร็ว แล้ว 150 มก. (2.5 มก./กก.) ถ้ายังไม่หาย'),
    r('Oral · severe arrhythmias', 'รับประทาน · arrhythmia รุนแรง', '200 mg three times daily for 1 week, 200 mg twice daily for 1 week, then 200 mg or less daily.', '200 มก. วันละ 3 ครั้ง 1 สัปดาห์ แล้ว 200 มก. วันละ 2 ครั้ง 1 สัปดาห์ แล้ว 200 มก. หรือน้อยกว่าต่อวัน'),
    r('Oral · recurrent VF / unstable VT', 'รับประทาน · VF ซ้ำ / VT ที่ไม่คงที่', '800-1,600 mg/day for 1-3 weeks, then 600-800 mg/day for 1 month, then usually 400 mg/day (lowest effective dose, e.g. 200 mg).', '800-1,600 มก./วัน 1-3 สัปดาห์ แล้ว 600-800 มก./วัน 1 เดือน แล้วโดยทั่วไป 400 มก./วัน (ขนาดต่ำสุดที่ได้ผล เช่น 200 มก.)'),
    r('Special groups', 'กลุ่มพิเศษ', 'Elderly: lowest effective dose.', 'ผู้สูงอายุ: ใช้ขนาดต่ำสุดที่ได้ผล')
  ] },
  sotalol: { rows: [
    r('Oral · life-threatening ventricular arrhythmias', 'รับประทาน · ventricular arrhythmia ที่อันตรายถึงชีวิต', '80 mg daily (one or two doses), raised every 2-3 days; or 80 mg twice daily, raised every 3 days. Usual 160-320 mg/day in 2 doses; 480-640 mg/day in some refractory cases.', '80 มก./วัน (ครั้งเดียวหรือแบ่ง 2 ครั้ง) เพิ่มทุก 2-3 วัน หรือ 80 มก. วันละ 2 ครั้ง เพิ่มทุก 3 วัน ปกติ 160-320 มก./วัน แบ่ง 2 ครั้ง บางรายที่ดื้อต้องใช้ 480-640 มก./วัน'),
    r('Oral · keep sinus rhythm after AF/flutter conversion', 'รับประทาน · รักษาจังหวะไซนัสหลังแปลง AF/flutter', 'Start 80 mg/day, raise to 160-320 mg/day in 2 doses. Alternative: 80 mg twice daily, up to 120 mg twice daily if QT is under 500 ms.', 'เริ่ม 80 มก./วัน เพิ่มเป็น 160-320 มก./วัน แบ่ง 2 ครั้ง ทางเลือก: 80 มก. วันละ 2 ครั้ง เพิ่มได้ถึง 120 มก. วันละ 2 ครั้งถ้า QT ต่ำกว่า 500 ms'),
    r('Renal impairment (oral)', 'ไตบกพร่อง (รับประทาน)', 'CrCl 30-60: half the dose. 10 to under 30: a quarter. Under 10: contraindicated.', 'CrCl 30-60: ครึ่งหนึ่ง 10 ถึงต่ำกว่า 30: หนึ่งในสี่ ต่ำกว่า 10: ห้ามใช้'),
    r('IV · when oral is not feasible', 'ฉีด IV · เมื่อรับประทานไม่ได้', '75 mg twice daily over 5 h (equals 80 mg oral); raise at 3-day steps to 112.5, then 150 mg twice daily if QT allows.', '75 มก. วันละ 2 ครั้ง ใน 5 ชม. (เทียบเท่ายากิน 80 มก.) เพิ่มทุก 3 วันเป็น 112.5 แล้ว 150 มก. วันละ 2 ครั้ง ถ้า QT ไม่ยาวเกิน')
  ] },
  dronedarone: { rows: [
    r('Oral · keep sinus rhythm after cardioversion', 'รับประทาน · รักษาจังหวะไซนัสหลังแปลงจังหวะ', '400 mg twice daily, in clinically stable paroxysmal or persistent AF when other options are unsuitable.', '400 มก. วันละ 2 ครั้ง ใน AF ชนิด paroxysmal หรือ persistent ที่อาการคงที่ เมื่อทางเลือกอื่นไม่เหมาะสม')
  ] },
  ibutilide: { rows: [
    r('IV · rapid conversion of recent-onset AF or flutter', 'ฉีด IV · แปลง AF หรือ flutter ที่เพิ่งเกิด', 'Under 60 kg: 0.01 mg/kg. 60 kg or more: 1 mg. Over 10 min.', 'น้อยกว่า 60 กก.: 0.01 มก./กก. 60 กก. ขึ้นไป: 1 มก. ใน 10 นาที'),
    r('Second dose', 'ครั้งที่สอง', 'If it persists 10 min after the end of the infusion, a second equal 10-min infusion may be given.', 'ถ้ายังไม่หายภายใน 10 นาทีหลังจบการหยด ให้ครั้งที่สองขนาดเท่าเดิมใน 10 นาทีได้')
  ] },
  dofetilide: { rows: [
    r('Oral · keep sinus rhythm (AF/flutter over 1 week, converted)', 'รับประทาน · รักษาจังหวะไซนัส (AF/flutter นานกว่า 1 สัปดาห์ ที่แปลงแล้ว)', '500 mcg twice daily. Check QTc 2-3 h after the first dose.', '500 มคก. วันละ 2 ครั้ง ตรวจ QTc 2-3 ชม. หลังขนาดแรก'),
    r('QTc rules', 'เกณฑ์ QTc', 'If QTc rose over 15% or is over 500 ms (550 ms with ventricular conduction abnormality): reduce to 250 mcg twice daily. Stop if over 500 ms (550 ms) after the second dose.', 'ถ้า QTc เพิ่มเกิน 15% หรือเกิน 500 ms (550 ms ถ้ามีการนำไฟฟ้าห้องล่างผิดปกติ): ลดเป็น 250 มคก. วันละ 2 ครั้ง หยุดยาถ้าเกิน 500 ms (550 ms) หลังขนาดที่สอง'),
    r('Renal impairment', 'ไตบกพร่อง', 'CrCl 40-60: start 250 mcg twice daily (125 mcg twice daily if QTc rises). 20-39: start 125 mcg twice daily (125 mcg once daily if QTc rises). Under 20: contraindicated.', 'CrCl 40-60: เริ่ม 250 มคก. วันละ 2 ครั้ง (ลดเป็น 125 มคก. วันละ 2 ครั้งถ้า QTc เพิ่ม) 20-39: เริ่ม 125 มคก. วันละ 2 ครั้ง (ลดเป็น 125 มคก. วันละครั้ง) ต่ำกว่า 20: ห้ามใช้')
  ] },
  diltiazem: { rows: [
    r('IV bolus · AF/flutter rate control and PSVT conversion', 'ฉีด IV · ควบคุมอัตราเต้นใน AF/flutter และแปลง PSVT', '0.25 mg/kg (about 20 mg) over 2 min; if inadequate after 15 min, 0.35 mg/kg (about 25 mg).', '0.25 มก./กก. (ประมาณ 20 มก.) ใน 2 นาที ถ้าไม่พอหลัง 15 นาที ให้ 0.35 มก./กก. (ประมาณ 25 มก.)'),
    r('IV infusion · continued rate control', 'หยด IV · ควบคุมอัตราเต้นต่อเนื่อง', 'After 1-2 boluses: 5-10 mg/h, raised by 5 mg/h to a max of 15 mg/h, for up to 24 h.', 'หลังฉีดนำ 1-2 ครั้ง: 5-10 มก./ชม. เพิ่มครั้งละ 5 มก./ชม. สูงสุด 15 มก./ชม. นานถึง 24 ชม.'),
    r('Oral', 'รับประทาน', 'MIMS gives angina and hypertension doses only (angina: conventional tablets 30 mg four times daily, usual 180-360 mg/day); no oral arrhythmia dose.', 'MIMS ระบุเฉพาะขนาดสำหรับ angina และความดันสูง (angina: ยาเม็ดธรรมดา 30 มก. วันละ 4 ครั้ง ปกติ 180-360 มก./วัน) ไม่มีขนาดยากินสำหรับ arrhythmia')
  ] },
  verapamil: { rows: [
    r('IV · supraventricular arrhythmias', 'ฉีด IV · supraventricular arrhythmia', '5-10 mg by slow injection over 2-3 min, then 5 mg after 5-10 min if needed.', '5-10 มก. ฉีดช้าใน 2-3 นาที แล้ว 5 มก. หลัง 5-10 นาทีถ้าจำเป็น'),
    r('Oral · supraventricular arrhythmias', 'รับประทาน · supraventricular arrhythmia', '120-480 mg/day in 3-4 divided doses, depending on response and severity.', '120-480 มก./วัน แบ่ง 3-4 ครั้ง ตามการตอบสนองและความรุนแรง')
  ] },
  adenosine: { rows: [
    r('IV · PSVT conversion', 'ฉีด IV · แปลง PSVT', '3 mg rapid bolus over 2 s; if ineffective within 1-2 min, 6 mg, then 12 mg after another 1-2 min.', '3 มก. ฉีดเร็วใน 2 วินาที ถ้าไม่ได้ผลใน 1-2 นาที ให้ 6 มก. แล้ว 12 มก. หลังอีก 1-2 นาที'),
    r('IV · alternative', 'ฉีด IV · ทางเลือก', '6 mg over 1-2 s, then two further 12 mg doses at 1-2 min intervals.', '6 มก. ใน 1-2 วินาที แล้ว 12 มก. อีก 2 ครั้ง ห่างกัน 1-2 นาที'),
    r('How to give', 'วิธีให้', 'Inject into an IV line as close to the patient as possible, then a rapid saline flush (large-bore cannula if peripheral). The same schedule is used as an aid to diagnosing broad- or narrow-complex SVT.', 'ฉีดเข้าสายน้ำเกลือใกล้ตัวผู้ป่วยที่สุด ตามด้วย NSS flush เร็ว (ใช้เข็มขนาดใหญ่ถ้าฉีดทางหลอดเลือดส่วนปลาย) ใช้ขนาดเดียวกันเพื่อช่วยวินิจฉัย SVT ชนิด QRS กว้างหรือแคบ')
  ] },
  digoxin: { rows: [
    r('IV · AF/flutter and heart failure (no glycoside in the last 2 weeks)', 'ฉีด IV · AF/flutter และหัวใจล้มเหลว (ไม่ได้ glycoside ใน 2 สัปดาห์)', 'Load 0.5-1 mg in divided doses over 10-20 min: about half first, the rest every 4-8 h.', 'ขนาดนำ 0.5-1 มก. แบ่งให้ ใน 10-20 นาที ให้ประมาณครึ่งหนึ่งก่อน ที่เหลือทุก 4-8 ชม.'),
    r('Oral · rapid digitalisation', 'รับประทาน · digitalisation เร็ว', '0.75-1.5 mg as a single dose, or divided 6 h apart. Mild heart failure: 0.25-0.75 mg daily for 1 week.', '0.75-1.5 มก. ครั้งเดียว หรือแบ่งห่างกัน 6 ชม. หัวใจล้มเหลวเล็กน้อย: 0.25-0.75 มก./วัน 1 สัปดาห์'),
    r('Maintenance', 'ขนาดต่อเนื่อง', 'By lean body weight and renal function. Most heart failure patients 0.125-0.25 mg daily (0.0625 mg or less if sensitive). Elderly: a lower dose may be needed.', 'ตามน้ำหนักตัวไม่รวมไขมันและการทำงานของไต ผู้ป่วยหัวใจล้มเหลวส่วนใหญ่ 0.125-0.25 มก./วัน (0.0625 มก. หรือน้อยกว่าถ้าไวต่อยา) ผู้สูงอายุ: อาจต้องลดขนาด')
  ] },
  magnesium: { na: true, rows: [
    r('No antiarrhythmic dose', 'ไม่มีขนาดต้านหัวใจเต้นผิดจังหวะ', 'The torsades dose in this guide comes from the Tzivoni 1988 case series, not MIMS.', 'ขนาดสำหรับ torsades ในคู่มือนี้มาจากรายงาน Tzivoni 1988 ไม่ใช่ MIMS'),
    r('Low magnesium · IV', 'Mg ต่ำ · ฉีด IV', 'No symptoms: 1-2 g over 1-2 h (mild) up to 4-8 g over 4-24 h (severe). Symptomatic: 1-2 g bolus over 2-15 min, repeated as needed.', 'ไม่มีอาการ: 1-2 ก. ใน 1-2 ชม. (เล็กน้อย) ถึง 4-8 ก. ใน 4-24 ชม. (รุนแรง) มีอาการ: 1-2 ก. ฉีดใน 2-15 นาที ซ้ำได้ตามต้องการ'),
    r('Eclampsia · IV', 'ครรภ์เป็นพิษ · ฉีด IV', '4-6 g over 15-30 min, then 1-2 g/h.', '4-6 ก. ใน 15-30 นาที แล้ว 1-2 ก./ชม.')
  ] },
  vernakalant: { na: true, rows: [
    r('Not in MIMS Thailand', 'ไม่มีใน MIMS Thailand', 'No dosage section. The EU label dose is in the acute dosing box below.', 'ไม่มีหัวข้อขนาดยา ขนาดยาตามฉลากยุโรปอยู่ในกล่องขนาดยาเฉียบพลันด้านล่าง')
  ] },
  ivabradine: { na: true, rows: [
    r('No arrhythmia dose', 'ไม่มีขนาดสำหรับหัวใจเต้นผิดจังหวะ', 'MIMS lists ivabradine for angina and heart failure only.', 'MIMS ระบุเฉพาะ angina และหัวใจล้มเหลว'),
    r('Heart failure (LVEF 35% or less, sinus rhythm, HR 70 or more)', 'หัวใจล้มเหลว (LVEF ไม่เกิน 35% จังหวะไซนัส ชีพจร 70 ขึ้นไป)', '5 mg twice daily; adjust after 2 weeks to a resting HR of 50-60. Max 7.5 mg twice daily. Aged 75 or older: start 2.5 mg twice daily.', '5 มก. วันละ 2 ครั้ง ปรับหลัง 2 สัปดาห์ให้ชีพจรขณะพัก 50-60 สูงสุด 7.5 มก. วันละ 2 ครั้ง อายุ 75 ปีขึ้นไป: เริ่ม 2.5 มก. วันละ 2 ครั้ง')
  ] },
  atropine: { rows: [
    r('IV · bradycardia and AV block from excess vagal tone', 'ฉีด IV · หัวใจเต้นช้าและ AV block จากแรงเวกัสมาก', '0.5-1 mg every 3-5 min; max 3 mg total. Also used in CPR for acute MI with symptomatic sinus bradycardia.', '0.5-1 มก. ทุก 3-5 นาที สูงสุดรวม 3 มก. ใช้ในการกู้ชีพกรณี MI ที่หัวใจเต้นช้ามีอาการด้วย')
  ] },
  ranolazine: { na: true, rows: [
    r('No arrhythmia dose', 'ไม่มีขนาดสำหรับหัวใจเต้นผิดจังหวะ', 'MIMS lists ranolazine for angina only.', 'MIMS ระบุเฉพาะ angina'),
    r('Angina', 'angina', '500 mg twice daily, raised to 1,000 mg twice daily (max). Another MIMS entry starts 375 mg twice daily, up to 750 mg twice daily.', '500 มก. วันละ 2 ครั้ง เพิ่มเป็น 1,000 มก. วันละ 2 ครั้ง (สูงสุด) อีกข้อมูลของ MIMS เริ่ม 375 มก. วันละ 2 ครั้ง สูงสุด 750 มก. วันละ 2 ครั้ง')
  ] }
};
// Thai brands as listed by MIMS Thailand ("brands available" + "Other Known Brands"), read 9 Nov 2026 while signed in.
// Topical forms of lidocaine (jelly, viscous, patch, topical) are left out. [] = MIMS lists none; vernakalant is not in MIMS.
const THAI_BRANDS = {
  procainamide: [], quinidine: [], disopyramide: [], mexiletine: [], sotalol: [], ibutilide: [], dofetilide: [], vernakalant: [],
  lidocaine: ['Oxacain', 'Chalocard 2% Non-Preservative', 'Docaine', 'Lidocaine GPO', 'Lidocaine HCl 1% L.B.S.', 'Lidocaine HCl Injection Vesco', 'Lidocaine Preservative Free GPO', 'Lidocaine Union Drug', 'Udocaine 2%', 'Xylocaine/Xylocaine w/ Adrenaline'],
  phenytoin: ['Ditoin', 'Utoin-250', 'Dantoin', 'Dilantin', 'Fenitoina Rubio', 'Pepsytoin-100'],
  flecainide: ['Tambocor'],
  propafenone: ['Rytmonorm'],
  esmolol: ['Brevibloc', 'Esbloc'],
  metoprolol: ['Metoprolol 100 Stada', 'Sefloc', 'Betaloc Zok', 'Cardeloc', 'Cardoxone R', 'Meloc', 'Melol', 'Metoblock', 'Metprolol'],
  carvedilol: ['Caraten', 'Carvolol', 'Dilatrend', 'Tocarlol'],
  propranolol: ['Alperol', 'Betalol', 'Betapress', 'C.V.S.', 'Cardenol', 'Chinnolol', 'Emforal', 'Idelol 10', 'Inderal', 'Normpress', 'Perlol', 'P-Parol', 'Pralol', 'Pronalol', 'Propanol', 'Proral', 'Syntonol 10/Syntonol 40'],
  bisoprolol: ['Bisocare 5', 'Hypercor/Hypercor 2.5', 'NIKP-Bisoprolol', 'Betacor', 'Concor 2.5/Concor 5', 'Novacor', 'Sopalol 2.5/Sopalol 5'],
  amiodarone: ['Amiocor', 'Aldarone', 'Amidarone 200', 'Cardilor'],
  dronedarone: ['Multaq'],
  diltiazem: ['Cardil CR', 'Ditizem', 'Cascor XL 120 Capsules', 'Denazox', 'Dilcardia', 'Dilem SR', 'Dilizem', 'Diltec', 'Dilzem', 'Herbesser 30/Herbesser 60', 'Herbesser 90 SR', 'Herbesser Injection', 'Herbesser R100/Herbesser R200'],
  verapamil: ['Isoptin SR', 'Caveril', 'Isoptin', 'Sopmil', 'Vermine'],
  adenosine: ['Adenozin', 'Sanacore'],
  digoxin: ['Cardial', 'Grexin', 'Lanoxin/Lanoxin PG', 'Toloxin'],
  magnesium: ['Magnesium Sulphate Atlantic', 'Magfifty', 'Maglax'],
  ivabradine: ['Bralon', 'Coralan'],
  atropine: ['Atropine Sulphate Atlantic', 'Atropine Sulfate A.N.H.', 'Atropine Sulfate GPO', 'Atropine Sulfate T P', 'Atropine Sulphate ANB', 'Atropine-P', 'Atroren-P'], // MIMS list is longer ("See More"), not opened
  ranolazine: ['Ranexa']
};
const THAI_BRANDS_PARTIAL = ['atropine'];
DRUGS_DATA.forEach((d) => {
  d.thaiBrands = THAI_BRANDS[d.id] || [];
  d.thaiBrandsPartial = THAI_BRANDS_PARTIAL.includes(d.id);
  d.mims = MIMS_DOSE[d.id] || null;
  const slug = MIMS_SLUG[d.id] || d.id;
  SOURCES['mims:' + d.id] = {
    short: 'MIMS Thailand: ' + d.genericName,
    title: 'MIMS Thailand, generic medicine info for ' + d.genericName + ' (not country-specific); doses read 3 Nov 2026, Thai brands read 9 Nov 2026, signed in',
    url: 'https://www.mims.com/thailand/drug/info/' + slug + '?mtype=generic'
  };
});
