// Per-drug action potential mechanism for Class III and "Other" drugs, by phase. What each drug does comes from its source
// (ACC/AHA 2023 AF guideline Table 23, the FDA label, AHA/ACC/HRS 2017); putting a channel in a phase is standard electrophysiology.
// Only what the source states is listed; phases not listed show as not stated. Vernakalant: mechanism not in the sources read.
const AP_DRUG = (() => {
  const p = (ph, phTh, en, th) => ({ ph, phTh, en, th });
  const amioLike = [
    p('Phase 0', 'Phase 0', 'Inhibits INa (sodium channel), so the upstroke is slower.', 'ยับยั้ง INa (ช่องโซเดียม) ทำให้ upstroke ช้าลง'),
    p('Phase 1', 'Phase 1', 'Inhibits Ito (early repolarisation current).', 'ยับยั้ง Ito (กระแสการคืนขั้วระยะแรก)'),
    p('Phase 2', 'Phase 2', 'Inhibits ICa-L (L-type calcium channel).', 'ยับยั้ง ICa-L (ช่องแคลเซียมชนิด L)'),
    p('Phase 3', 'Phase 3', 'Inhibits IKr, IKs and IKur (potassium channels), so repolarisation is prolonged.', 'ยับยั้ง IKr, IKs และ IKur (ช่องโพแทสเซียม) ทำให้การคืนขั้วยาวนานขึ้น'),
    p('Phase 4 / nodal', 'Phase 4 / nodal', 'Noncompetitive beta-blockade and IK-ACh inhibition act on pacemaker and nodal tissue.', 'การบล็อก beta แบบ noncompetitive และการยับยั้ง IK-ACh ออกฤทธิ์ที่เนื้อเยื่อ pacemaker และ node')
  ];
  return {
    amiodarone: { refs: ['acc23-af#Table 23'], rows: amioLike },
    dronedarone: { refs: ['acc23-af#Table 23', 'lbl:dronedarone-multaq#Clinical Pharmacology'], rows: [
      ...amioLike,
      p('Label', 'ฉลากยา', 'The label says the mechanism is unknown and that the contribution of each of its actions (all four Vaughan Williams classes) to the clinical effect is unknown.', 'ฉลากระบุว่ากลไกยังไม่ทราบ และไม่ทราบว่าฤทธิ์แต่ละอย่าง (ครบทั้งสี่ class ของ Vaughan Williams) มีส่วนต่อผลทางคลินิกเท่าใด')
    ] },
    sotalol: { refs: ['acc23-af#Table 23'], rows: [
      p('Phase 2', 'Phase 2', 'd-Sotalol augments late INa (an inward current in the plateau).', 'd-Sotalol เพิ่ม late INa (กระแสขาเข้าในช่วง plateau)'),
      p('Phase 3', 'Phase 3', 'Inhibits IKr, so repolarisation is prolonged.', 'ยับยั้ง IKr ทำให้การคืนขั้วยาวนานขึ้น'),
      p('Phase 4 / nodal', 'Phase 4 / nodal', 'Beta-receptor blockade slows pacemaker and nodal activity.', 'การบล็อก beta receptor ทำให้ pacemaker และ node ช้าลง')
    ] },
    dofetilide: { refs: ['acc23-af#Table 23'], rows: [
      p('Phase 2', 'Phase 2', 'Augments late INa (an inward current in the plateau).', 'เพิ่ม late INa (กระแสขาเข้าในช่วง plateau)'),
      p('Phase 3', 'Phase 3', 'Inhibits IKr, so repolarisation is prolonged.', 'ยับยั้ง IKr ทำให้การคืนขั้วยาวนานขึ้น')
    ] },
    ibutilide: { refs: ['lbl:ibutilide-corvert#Clinical Pharmacology', 'acc23-af#Table 23'], rows: [
      p('Phase 0', 'Phase 0', 'No clinically significant effect on QRS duration at IV doses up to 0.03 mg/kg (label).', 'ไม่มีผลต่อ QRS duration อย่างมีนัยสำคัญที่ขนาด IV ถึง 0.03 มก./กก. (ฉลากยา)'),
      p('Phase 2-3', 'Phase 2-3', 'Delays repolarisation by activating a slow inward current, mainly sodium, rather than blocking outward potassium currents (label). ACC/AHA 2023 lists IKr inhibition and late INa augmentation.', 'ทำให้การคืนขั้วช้าลงโดยกระตุ้นกระแสขาเข้าช้า ส่วนใหญ่เป็นโซเดียม แทนที่จะบล็อกกระแสโพแทสเซียมขาออก (ฉลากยา) ACC/AHA 2023 ระบุการยับยั้ง IKr และการเพิ่ม late INa'),
      p('Phase 3', 'Phase 3', 'Prolongs action potential duration and raises atrial and ventricular refractoriness.', 'ยืด action potential duration และเพิ่มระยะดื้อของห้องบนและห้องล่าง'),
      p('Phase 4 / nodal', 'Phase 4 / nodal', 'Mild slowing of the sinus rate and AV conduction.', 'ชะลออัตรา sinus และการนำไฟฟ้า AV เล็กน้อย')
    ] },
    adenosine: { refs: ['lbl:adenosine-generic#Clinical Pharmacology: Mechanism of Action'], rows: [
      p('Nodal conduction', 'การนำไฟฟ้าที่ node', 'Slows conduction time through the AV node and can interrupt AV-node reentry (label). The label does not name the channel or the phase.', 'ทำให้เวลานำไฟฟ้าผ่าน AV node ช้าลงและตัดวงจร reentry ที่ AV node ได้ (ฉลากยา) ฉลากไม่ระบุชื่อช่องหรือ phase')
    ] },
    digoxin: { refs: ['lbl:digoxin-tab#12.1 Mechanism of Action'], rows: [
      p('Phase 2', 'Phase 2', 'Inhibits Na-K ATPase, so intracellular calcium rises in the myocardium and conduction system.', 'ยับยั้ง Na-K ATPase ทำให้แคลเซียมในเซลล์กล้ามเนื้อหัวใจและระบบนำไฟฟ้าสูงขึ้น'),
      p('Phase 4', 'Phase 4', 'Increases automaticity.', 'เพิ่ม automaticity'),
      p('Nodal conduction', 'การนำไฟฟ้าที่ node', 'Reduces conduction velocity, and acts on the SA and AV nodes through parasympathetic stimulation.', 'ลดความเร็วการนำไฟฟ้า และออกฤทธิ์ที่ SA และ AV node ผ่านการกระตุ้นพาราซิมพาเทติก')
    ] },
    magnesium: { refs: ['aha17-va#Section 6 (supportive text)'], rows: [
      p('Phase 2', 'Phase 2', 'May reduce calcium influx.', 'อาจลดการไหลเข้าของแคลเซียม'),
      p('Phase 3', 'Phase 3', 'May suppress early afterdepolarisations.', 'อาจกด early afterdepolarization'),
      p('Phase 4', 'Phase 4', 'May suppress automaticity and delayed afterdepolarisations.', 'อาจกด automaticity และ delayed afterdepolarization')
    ] },
    ivabradine: { refs: ['lbl:ivabradine-corlanor#Clinical Pharmacology: Mechanism of Action'], rows: [
      p('Phase 4', 'Phase 4', 'Blocks the HCN channel that carries the pacemaker If current; the effect is greatest at the SA node.', 'บล็อกช่อง HCN ที่นำกระแส If ของ pacemaker ผลมากที่สุดที่ SA node')
    ] },
    atropine: { refs: ['lbl:atropine-inj#Clinical Pharmacology'], rows: [
      p('Nodal conduction', 'การนำไฟฟ้าที่ node', 'Blocks muscarinic receptors, removing vagal slowing. Small doses may first slow the rate before tachycardia develops from paralysis of vagal control.', 'บล็อก muscarinic receptor ทำให้การชะลอจากเส้นประสาทเวกัสหายไป ขนาดน้อยอาจทำให้อัตราช้าลงก่อน แล้วจึงเต้นเร็วจากการหยุดทำงานของ vagal control')
    ] },
    ranolazine: { refs: ['lbl:ranolazine-er#Clinical Pharmacology'], rows: [
      p('Phase 2', 'Phase 2', 'Inhibits the cardiac late sodium current at therapeutic levels (the link to its antianginal effect is uncertain).', 'ยับยั้งกระแสโซเดียมช่วงท้าย (late sodium current) ของหัวใจที่ระดับยาในการรักษา (ความสัมพันธ์กับฤทธิ์ลดอาการเจ็บหน้าอกยังไม่แน่นอน)'),
      p('Phase 3', 'Phase 3', 'The QT prolongation comes from IKr inhibition, which lengthens the ventricular action potential.', 'QT ยาวขึ้นจากการยับยั้ง IKr ซึ่งทำให้ action potential ของห้องล่างยาวขึ้น')
    ] }
  };
})();
DRUGS_DATA.forEach((d) => {
  d.apDrug = AP_DRUG[d.id] || null;
});
