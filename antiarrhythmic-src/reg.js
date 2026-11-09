// Where each drug is registered, checked on 2026-11-09 (all by active ingredient, all dosage forms):
//  TH  Thai FDA drug register (pertento.fda.moph.go.th): any current registration = current; only cancelled, expired or removed = past; none = not found.
//  US  DailyMed (FDA label listing): a current label = current; none = not found.
//  UK  emc (electronic medicines compendium): a current SPC = current; none = not found.
//  EU  Spanish AEMPS CIMA, products marketed in Spain, as a proxy for "marketed in at least one member state"; vernakalant is centrally authorised (EMA SmPC).
//  JP  KEGG MEDICUS list of Japanese prescription products (JAPIC): a catalogue with no history, so it cannot show "past".
// current = c, past = p, never = n ("Not found": not found in that register; an old authorisation is not excluded).
const REG_ROWS = {
  //              th  us  uk  eu  jp
  procainamide: 'p c n c c', quinidine: 'p c n c c', disopyramide: 'p c c c c', lidocaine: 'c c c c c', mexiletine: 'p c c c c', phenytoin: 'c c c c c',
  flecainide: 'c c c c c', propafenone: 'c c c c c', esmolol: 'c c c c c', metoprolol: 'c c c c c', carvedilol: 'c c c c c', propranolol: 'c c c c c', bisoprolol: 'c c c c c',
  amiodarone: 'c c c c c', sotalol: 'n c c c c', dronedarone: 'c c c c n', ibutilide: 'n c n n n', dofetilide: 'n c n n n',
  diltiazem: 'c c c c c', verapamil: 'c c c c c', adenosine: 'c c c c c', digoxin: 'c c c c c', magnesium: 'c c c c c', vernakalant: 'n n n c n',
  ivabradine: 'c c c c c', atropine: 'c c c c c', ranolazine: 'c c c c n'
};
const REG_WORD = { c: 'current', p: 'past', n: 'never' };
// Thai FDA register counts [registrations found, current]; magnesium: only the single-ingredient injections are counted (see REG_TH_NOTE)
const REG_TH_COUNT = {
  procainamide: [5, 0], quinidine: [6, 0], disopyramide: [9, 0], lidocaine: [439, 74], mexiletine: [6, 0], phenytoin: [50, 15], flecainide: [6, 1], propafenone: [7, 1],
  esmolol: [4, 1], metoprolol: [61, 9], carvedilol: [32, 14], propranolol: [183, 21], bisoprolol: [54, 27], amiodarone: [38, 13], sotalol: [0, 0], dronedarone: [2, 1],
  ibutilide: [0, 0], dofetilide: [0, 0], diltiazem: [96, 13], verapamil: [61, 4], adenosine: [17, 7], digoxin: [29, 7], magnesium: null, vernakalant: [0, 0],
  ivabradine: [15, 4], atropine: [105, 14], ranolazine: [6, 3]
};
const REG_NOTE = {
  magnesium: { en: 'Thai FDA register: magnesium sulfate injection 10% and 50% (Atlantic), Magfifty and Magten are current; many vitamin, mineral and nutrition products also contain it.', th: 'ทะเบียนยา อย.: magnesium sulfate injection 10% และ 50% (Atlantic), Magfifty และ Magten ยังคงอยู่ และมีผลิตภัณฑ์วิตามิน แร่ธาตุ และสารอาหารอีกมากที่มีส่วนผสมนี้' },
  lidocaine: { en: 'Counts include topical, dental and combination products; the register is searched by active ingredient only.', th: 'จำนวนรวมยาทาภายนอก ยาทางทันตกรรม และยาผสม เพราะค้นหาจากตัวยาสำคัญเท่านั้น' },
  vernakalant: { en: 'EU: Brinavess is centrally authorised (EMA SmPC) and marketed in Spain. US: not approved by the FDA. UK: no emc entry. JP: no product in the JAPIC list.', th: 'EU: Brinavess ได้รับอนุมัติจาก EMA (SmPC) และมีจำหน่ายในสเปน US: ไม่ได้รับอนุมัติจาก FDA UK: ไม่พบใน emc JP: ไม่พบสินค้าในรายการ JAPIC' },
  ibutilide: { en: 'US: Corvert label listed. Not found in Spain (AEMPS CIMA), on emc, in the Thai FDA register or in the JAPIC list.', th: 'US: มีฉลาก Corvert ไม่พบในสเปน (AEMPS CIMA) emc ทะเบียนยา อย. และรายการ JAPIC' },
  dofetilide: { en: 'US: Tikosyn and generic labels listed. Not found in Spain (AEMPS CIMA), on emc, in the Thai FDA register or in the JAPIC list.', th: 'US: มีฉลาก Tikosyn และยาสามัญ ไม่พบในสเปน (AEMPS CIMA) emc ทะเบียนยา อย. และรายการ JAPIC' },
  dronedarone: { en: 'JP: no product in the JAPIC list (checked 2026-11-09).', th: 'JP: ไม่พบสินค้าในรายการ JAPIC (ตรวจ 9 พ.ย. 2569)' },
  ranolazine: { en: 'JP: no product in the JAPIC list (checked 2026-11-09). Thai FDA register: 3 registrations are marked removed (SMP).', th: 'JP: ไม่พบสินค้าในรายการ JAPIC (ตรวจ 9 พ.ย. 2569) ทะเบียนยา อย.: 3 ทะเบียนมีสถานะปลด SMP' }
};
const REG_COUNTRIES = ['th', 'us', 'uk', 'eu', 'jp'];
DRUGS_DATA.forEach((d) => {
  const v = REG_ROWS[d.id].split(' ');
  d.reg = Object.fromEntries(REG_COUNTRIES.map((c, i) => [c, REG_WORD[v[i]]]));
  d.regThCount = REG_TH_COUNT[d.id];
  d.regNote = REG_NOTE[d.id] || null;
});
SOURCES['reg-th'] = { short: 'Thai FDA drug register', title: 'Thai FDA drug register (pertento.fda.moph.go.th), searched by active ingredient on 2026-11-09, cancelled entries included', url: 'https://pertento.fda.moph.go.th/FDA_SEARCH_DRUG/SEARCH_DRUG/frm_search_drug.aspx' };
SOURCES['reg-us'] = { short: 'DailyMed (US FDA labels)', title: 'DailyMed, US FDA label listing, searched by drug name on 2026-11-09', url: 'https://dailymed.nlm.nih.gov/dailymed/' };
SOURCES['reg-uk'] = { short: 'emc (UK)', title: 'electronic medicines compendium (emc), UK summaries of product characteristics, searched on 2026-11-09', url: 'https://www.medicines.org.uk/emc' };
SOURCES['reg-eu'] = { short: 'AEMPS CIMA (Spain, as EU proxy)', title: 'Spanish Agency of Medicines (AEMPS) CIMA, products marketed in Spain, searched by active ingredient on 2026-11-09', url: 'https://cima.aemps.es/cima/publico/home.html' };
SOURCES['reg-jp'] = { short: 'KEGG MEDICUS (Japan, JAPIC)', title: 'KEGG MEDICUS, Japanese prescription drug products (JAPIC), searched by generic name on 2026-11-09', url: 'https://www.kegg.jp/medicus-bin/search_drug' };
