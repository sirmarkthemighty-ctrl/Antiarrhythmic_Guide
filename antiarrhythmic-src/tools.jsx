// Specialized Interactive Clinical Tools & Decision Support Modals

// --- Shared helpers: sources, Unknown values, NLEM 2569, QT warning labels ---
const INDICATION_SHORT = { af_rate: 'AF Rate', af_rhythm: 'AF Rhythm', svt: 'SVT', vt_vf: 'VT/VF', brady: 'Bradycardia' };
const NLEM_LIST_NAME = {
  b: { en: 'basic list (was ก/ข)', th: 'บัญชียาพื้นฐาน (เดิม ก/ข)' },
  s: { en: 'supplemental list (was ค)', th: 'บัญชียาทางเลือก (เดิม ค)' },
  ex: { en: 'exclusive list (was ง)', th: 'บัญชียาเฉพาะโรค (เดิม ง)' },
  R1: { en: 'restricted list 1 (was จ(1))', th: 'บัญชียาพิเศษ R1 (เดิม จ(1))' },
  R2: { en: 'restricted list 2 (was จ(2))', th: 'บัญชียาพิเศษ R2 (เดิม จ(2))' }
};
function nlemShort(n, lang) {
  if (!n || !n.list) return lang === 'th' ? 'ไม่อยู่ในบัญชียาหลัก 2569' : 'Not in NLEM 2569';
  return (lang === 'th' ? 'บัญชียาหลัก 2569: ' : 'NLEM 2569: ') + n.list;
}
function nlemText(n, lang) {
  if (!n || !n.list) return nlemShort(n, lang);
  const name = NLEM_LIST_NAME[n.list];
  return nlemShort(n, lang) + (name ? ' - ' + name[lang === 'th' ? 'th' : 'en'] : '');
}
const QT_LABEL = {
  Boxed: { en: 'Boxed warning (QT / torsades)', th: 'Boxed warning (QT / torsades)' },
  Warning: { en: 'QT / torsades warning in label', th: 'ฉลากยามีคำเตือน QT / torsades' },
  None: { en: 'No QT / torsades warning in label', th: 'ฉลากยาไม่มีคำเตือน QT / torsades' }
};
function qtLabel(q, lang) { return (QT_LABEL[q] || QT_LABEL.None)[lang === 'th' ? 'th' : 'en']; }
function flagText(v, lang, yesEn, yesTh, noEn, noTh) {
  if (v === true) return lang === 'th' ? yesTh : yesEn;
  if (v === false) return lang === 'th' ? noTh : noEn;
  return lang === 'th' ? 'ไม่ทราบ (ไม่มีข้อมูลในแหล่งอ้างอิง)' : 'Unknown (sources silent)';
}
const isUnknown = (t) => typeof t === 'string' && /^Unknown/.test(t);
function V({ t }) {
  if (isUnknown(t)) return <span className="italic text-slate-500 dark:text-slate-400" data-unknown>{t}</span>;
  return <span>{t}</span>;
}
// Class colours as full static Tailwind strings (dynamic class names would not be generated).
const CLASS_TONE = {
  Ia: { icon: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300', chip: 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:hover:bg-amber-900 dark:text-amber-300 dark:border-amber-800', stripe: 'border-l-amber-400 dark:border-l-amber-500' },
  Ib: { icon: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300', chip: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950/40 dark:hover:bg-yellow-900/60 dark:text-yellow-300 dark:border-yellow-800', stripe: 'border-l-yellow-400 dark:border-l-yellow-500' },
  Ic: { icon: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300', chip: 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:hover:bg-rose-900 dark:text-rose-300 dark:border-rose-800', stripe: 'border-l-rose-400 dark:border-l-rose-500' },
  II: { icon: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300', chip: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/50 dark:hover:bg-indigo-900 dark:text-indigo-300 dark:border-indigo-800', stripe: 'border-l-indigo-400 dark:border-l-indigo-500' },
  III: { icon: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300', chip: 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:hover:bg-purple-900 dark:text-purple-300 dark:border-purple-800', stripe: 'border-l-purple-400 dark:border-l-purple-500' },
  IV: { icon: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300', chip: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:hover:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-800', stripe: 'border-l-emerald-400 dark:border-l-emerald-500' },
  Other: { icon: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300', chip: 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:hover:bg-sky-900 dark:text-sky-300 dark:border-sky-800', stripe: 'border-l-sky-400 dark:border-l-sky-500' }
};
const toneOf = (cls) => CLASS_TONE[cls] || CLASS_TONE.Other;

// Generic dosage-form pictogram from the drug's routes (PO = oral, IV = injection). It is not a picture of any product:
// the records hold no tablet/capsule/vial/bag detail and no product images.
function DrugIcon({ routes, vwClass, size = 'md', lang }) {
  const oral = routes.includes('PO'), inj = routes.includes('IV');
  const th = lang === 'th';
  const label = oral && inj ? (th ? 'ยารับประทานและยาฉีด' : 'Oral and injection') : inj ? (th ? 'ยาฉีด' : 'Injection') : (th ? 'ยารับประทาน' : 'Oral form');
  const capsule = <g transform="rotate(-45 12 12)"><rect x="2.5" y="8" width="19" height="8" rx="4" /><path d="M12 8v8" /><path d="M12 8h5.5a4 4 0 0 1 0 8H12z" fill="currentColor" fillOpacity=".25" stroke="none" /></g>;
  const vial = <g><path d="M9 2.5h6" /><path d="M10 2.5v3.2L7.5 9v10a2.5 2.5 0 0 0 2.5 2.5h4a2.5 2.5 0 0 0 2.5-2.5V9L14 5.7V2.5" /><path d="M7.5 12.5h9" /><path d="M12 14.6c-.9 1.1-1.3 1.7-1.3 2.2a1.3 1.3 0 0 0 2.6 0c0-.5-.4-1.1-1.3-2.2z" fill="currentColor" stroke="none" /></g>;
  return (
    <span className={'shrink-0 inline-flex items-center justify-center rounded-xl ' + (size === 'sm' ? 'w-8 h-8' : 'w-11 h-11') + ' ' + toneOf(vwClass).icon} title={label} data-drug-icon={(oral ? 'po' : '') + (oral && inj ? '+' : '') + (inj ? 'iv' : '')}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'} aria-hidden="true">
        {oral && inj ? <><g transform="translate(-1 0) scale(.62)">{capsule}</g><g transform="translate(9.5 8.5) scale(.62)">{vial}</g></> : inj ? vial : capsule}
      </svg>
    </span>
  );
}

// Registration chips (TH US UK EU JP) with the status of the drug in each country; data in reg.js.
const REG_TONE = {
  th: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-300',
  us: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-300',
  uk: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300',
  eu: 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300',
  jp: 'border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-300'
};
const REG_NAME = { th: ['Thailand', 'ไทย'], us: ['United States', 'สหรัฐอเมริกา'], uk: ['United Kingdom', 'สหราชอาณาจักร'], eu: ['European Union', 'สหภาพยุโรป'], jp: ['Japan', 'ญี่ปุ่น'] };
const REG_STATUS = { current: ['Current', 'ปัจจุบัน'], past: ['Past', 'เคยมี'], never: ['Not found', 'ไม่พบ'] };
function RegChips({ d, lang, nlem }) {
  const i = lang === 'th' ? 1 : 0;
  return (
    <div className="contents" data-reg-chips>
      {REG_COUNTRIES.map(c => {
        const st = d.reg[c];
        const cls = st === 'current' ? REG_TONE[c] : st === 'past' ? 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300' : 'border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400';
        const chip = <span key={c} data-reg={c + ':' + st} title={REG_NAME[c][i] + ': ' + REG_STATUS[st][i]} className={'text-[10px] font-bold rounded border px-1.5 py-px leading-none whitespace-nowrap ' + cls}>{c.toUpperCase()}{st === 'past' ? ' †' : st === 'never' ? ' ⊘' : ''}</span>;
        // the NLEM chip belongs to Thailand, so it follows the TH chip (same as the bronchodilator guide)
        if (c === 'th' && nlem) return [chip, <span key="nlem" data-nlem-chip title={nlemText(d.nlem, lang)} className={'text-[10px] font-bold rounded border px-1.5 py-px leading-none whitespace-nowrap ' + (d.nlem.list ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-300' : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400')}>{nlemShort(d.nlem, lang)}</span>];
        return chip;
      })}
    </div>
  );
}
// Availability block of the Overview tab: one line per country with the basis, then the sources
function RegBlock({ d, lang }) {
  const i = lang === 'th' ? 1 : 0;
  const basis = (c) => {
    if (c === 'th') return d.regThCount ? (lang === 'th' ? ' ทะเบียนยา อย.: พบ ' + d.regThCount[0] + ' ทะเบียน ยังคงอยู่ ' + d.regThCount[1] : ' Thai FDA register: ' + d.regThCount[0] + ' registrations found, ' + d.regThCount[1] + ' current') : '';
    return '';
  };
  return (
    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800/60 space-y-1.5" data-reg-block>
      <span className="font-bold text-xs uppercase text-slate-500 dark:text-slate-400 block">{lang === 'th' ? 'การวางจำหน่ายตามประเทศ' : 'Availability by country'}</span>
      {REG_COUNTRIES.map(c => (
        <div key={c} className="text-xs"><span className="font-semibold text-slate-700 dark:text-slate-200">{REG_NAME[c][i]}:</span> <span className="text-slate-800 dark:text-slate-100">{REG_STATUS[d.reg[c]][i]}</span><span className="text-slate-500 dark:text-slate-400">{basis(c)}</span></div>
      ))}
      {d.regNote && <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{lang === 'th' ? d.regNote.th : d.regNote.en}</p>}
      <p className="text-[11px] italic text-slate-500 dark:text-slate-400 leading-snug">{lang === 'th' ? 'ไม่พบ = ไม่พบในทะเบียนนั้น ยังไม่ตัดความเป็นไปได้ที่เคยได้รับอนุมัติในอดีต สหภาพยุโรปใช้ข้อมูลยาที่จำหน่ายในสเปนแทน ญี่ปุ่นเป็นรายการปัจจุบัน จึงไม่มีสถานะเคยมี' : '"Not found" means not found in that register; an old authorisation is not excluded. EU uses products marketed in Spain as a proxy. The Japanese list is a current catalogue, so it has no "past".'}</p>
      <SourceLine refs={['reg-th', 'reg-us', 'reg-uk', 'reg-eu', 'reg-jp']} lang={lang} />
    </div>
  );
}

// Select (for comparing) with Details under it: top right of a card, icon-only on phones (same as the bronchodilator guide)
function CardActions({ selected, onSelect, onDetails, lang }) {
  const th = lang === 'th';
  const sel = th ? (selected ? 'เลือกแล้ว' : 'เลือก') : (selected ? 'Selected' : 'Select');
  const det = th ? 'รายละเอียด' : 'Details';
  return (
    <div className="shrink-0 flex flex-col items-end sm:items-stretch gap-1.5 print:hidden" data-card-actions>
      <button type="button" onClick={onSelect} aria-pressed={selected} data-select title={sel} aria-label={sel}
        className={'flex items-center justify-center w-7 h-7 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase transition-colors border ' + (selected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 shadow-sm')}>
        {selected ? <Check className="w-4 h-4 sm:w-3 sm:h-3" /> : <ArrowRightLeft className="w-4 h-4 sm:w-3 sm:h-3" />}
        <span className="hidden sm:inline sm:ml-1.5">{sel}</span>
      </button>
      <button type="button" onClick={onDetails} data-details title={det} aria-label={det}
        className="flex items-center justify-center w-7 h-7 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase transition-colors border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:hidden" aria-hidden="true"><circle cx="12" cy="12" r="9.5" /><path d="M12 11v5.5" /><path d="M12 7.5h.01" /></svg>
        <span className="hidden sm:inline">{det} <span aria-hidden="true">›</span></span>
      </button>
    </div>
  );
}

// Key: what the colours, icons and chips on the cards mean
function KeyModal({ lang, onClose }) {
  const th = lang === 'th';
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  const row = (left, text) => <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200"><span className="shrink-0 w-28 flex items-center gap-1 flex-wrap">{left}</span><span className="min-w-0 leading-snug">{text}</span></div>;
  const head = (s) => <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mt-1">{s}</h3>;
  const chip = (cls, s) => <span className={'text-[10px] font-bold rounded border px-1.5 py-px leading-none whitespace-nowrap ' + cls}>{s}</span>;
  const classNames = { Ia: 'Class Ia', Ib: 'Class Ib', Ic: 'Class Ic', II: 'Class II (beta-blockers)', III: 'Class III (potassium channel blockers)', IV: 'Class IV (calcium channel blockers)', Other: th ? 'อื่น ๆ (adenosine, digoxin, magnesium ...)' : 'Other (adenosine, digoxin, magnesium ...)' };
  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} data-key-modal>
      <div role="dialog" aria-modal="true" aria-label={th ? 'สัญลักษณ์' : 'Key'} className="bg-white dark:bg-slate-900 w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100">{th ? 'สัญลักษณ์ในหน้านี้' : 'Key to the symbols'}</h2>
          <button type="button" onClick={onClose} aria-label={th ? 'ปิด' : 'Close'} className="rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">×</button>
        </div>
        <div className="p-4 space-y-2.5">
          {head(th ? 'สีและขอบการ์ด = กลุ่มยา (Vaughan Williams)' : 'Colour and card edge = drug class (Vaughan Williams)')}
          {Object.keys(CLASS_TONE).map(c => row(<span className={'text-[11px] font-bold px-2 py-0.5 rounded-md border ' + CLASS_TONE[c].chip}>{c}</span>, classNames[c]))}
          {head(th ? 'ไอคอนรูปแบบยา (จากทางให้ยาเท่านั้น)' : 'Dosage-form icon (from the route only)')}
          {row(<DrugIcon routes={['PO']} vwClass="II" size="sm" lang={lang} />, th ? 'ยารับประทาน (PO)' : 'Oral (PO)')}
          {row(<DrugIcon routes={['IV']} vwClass="II" size="sm" lang={lang} />, th ? 'ยาฉีด (IV)' : 'Injection (IV)')}
          {row(<DrugIcon routes={['PO', 'IV']} vwClass="II" size="sm" lang={lang} />, th ? 'ทั้งรับประทานและฉีด' : 'Oral and injection')}
          <p className="text-[11px] italic text-slate-500 dark:text-slate-400">{th ? 'เป็นภาพทั่วไป ไม่ใช่ภาพผลิตภัณฑ์จริง และไม่ได้แยกเม็ดหรือแคปซูล ขวดหรือถุง' : 'A generic picture, not a product photo; it does not tell tablet from capsule or vial from bag.'}</p>
          {head(th ? 'ป้ายประเทศ (ทะเบียนยา)' : 'Country chips (registers)')}
          {row(chip(REG_TONE.th, 'TH'), th ? 'สีเต็ม = มีอยู่ในปัจจุบัน TH ไทย US สหรัฐฯ UK สหราชอาณาจักร EU สหภาพยุโรป (ใช้สเปนแทน) JP ญี่ปุ่น' : 'Coloured = current. TH Thailand, US United States, UK United Kingdom, EU European Union (Spain as the proxy), JP Japan.')}
          {row(chip('border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300', 'TH †'), th ? 'เคยมีทะเบียนแต่ยกเลิกหรือหมดอายุแล้ว (ใช้ได้เฉพาะไทย)' : 'Was registered, now cancelled or expired (only the Thai register keeps this).')}
          {row(chip('border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400', 'JP ⊘'), th ? 'ไม่พบในทะเบียนนั้น ไม่ได้แปลว่าไม่เคยอนุมัติ' : 'Not found in that register; an old approval is not excluded.')}
          {head(th ? 'การ์ดยา' : 'Drug card')}
          {row(<span className="text-[10px] font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">{th ? 'ขนาดยา' : 'Adult dose'}</span>, th ? 'ขนาดยาผู้ใหญ่จาก MIMS Thailand แสดงบรรทัดแรก แตะ "ทั้งหมด" เพื่อดูทุกข้อบ่งใช้' : 'Adult dose from MIMS Thailand: the first line, tap "All N doses" for every indication or route.')}
          {row(<span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">NLEM 2569: b</span>, th ? 'อยู่ในบัญชียาหลักแห่งชาติ 2569 พร้อมหมวด' : 'On the Thai National List of Essential Medicines 2569, with its category.')}
          {row(<span className="text-[11px] italic text-slate-500 dark:text-slate-400">Unknown</span>, th ? 'แหล่งอ้างอิงที่อ่านไม่ระบุค่านี้' : 'The sources read do not state this value.')}
          {row(<span className="text-[11px] italic text-slate-500 dark:text-slate-400">N/A</span>, th ? 'ไม่มีข้อมูลในแหล่งอ้างอิงนั้น หรือไม่เกี่ยวข้อง' : 'Not covered by that source, or not applicable.')}
        </div>
      </div>
    </div>
  );
}

// One guideline block of the Dosing tab: labelled rows from a guideline, or N/A, always with its source.
function GuidelineBlock({ id, title, rows, naText, refKey, lang }) {
  return (
    <div className="p-4 rounded-xl border border-violet-200 dark:border-violet-900/50 bg-violet-50/50 dark:bg-violet-950/30 space-y-2" data-esc={id}>
      <span className="font-bold text-xs uppercase text-violet-700 dark:text-violet-300 block">{title}</span>
      {rows ? (
        <div className="space-y-2.5">
          {rows.map((row, i) => (
            <div key={i} className="pl-3 border-l-2 border-violet-300 dark:border-violet-700" data-esc-row>
              <div className="text-xs font-bold text-violet-700 dark:text-violet-300">{lang === 'th' ? row.lTh : row.lEn}</div>
              <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-100">{lang === 'th' ? row.th : row.en}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-medium italic text-slate-500 dark:text-slate-400">N/A {naText}</p>
      )}
      <SourceLine refs={[refKey]} lang={lang} />
    </div>
  );
}

// Collapsible list of every source in the registry, closed by default (same pattern as the bronchodilator guide).
const REF_USED = {
  lbl: ['Drug label: doses, boxed warnings, interactions, adverse effects', 'ฉลากยา: ขนาดยา คำเตือนกรอบดำ ปฏิกิริยาระหว่างยา อาการไม่พึงประสงค์'],
  mims: ['Recommended adult dose (Dosing tab)', 'ขนาดยาแนะนำสำหรับผู้ใหญ่ (แท็บขนาดยา)'],
  nlem2569: ['Thai NLEM status of each drug', 'สถานะบัญชียาหลักแห่งชาติของยาแต่ละตัว'],
  'aha25-als': ['Emergency drug use and doses', 'การใช้ยาและขนาดยาในภาวะฉุกเฉิน'],
  'aha25-ca': ['Cardiac arrest drug doses', 'ขนาดยาในภาวะหัวใจหยุดเต้น'],
  'aha25-tachy': ['Tachyarrhythmia pathway', 'แนวทางหัวใจเต้นเร็วผิดจังหวะ'],
  'aha25-brady': ['Bradycardia pathway', 'แนวทางหัวใจเต้นช้า'],
  'reg-th': ['Thai registration status (cards, filters, Overview tab)', 'สถานะการขึ้นทะเบียนในไทย (การ์ดยา ตัวกรอง แท็บภาพรวม)'],
  'reg-us': ['US availability (cards, filters, Overview tab)', 'การวางจำหน่ายในสหรัฐฯ (การ์ดยา ตัวกรอง แท็บภาพรวม)'],
  'reg-uk': ['UK availability (cards, filters, Overview tab)', 'การวางจำหน่ายในสหราชอาณาจักร (การ์ดยา ตัวกรอง แท็บภาพรวม)'],
  'reg-eu': ['EU availability, Spain as proxy (cards, filters, Overview tab)', 'การวางจำหน่ายในสหภาพยุโรป ใช้สเปนแทน (การ์ดยา ตัวกรอง แท็บภาพรวม)'],
  'reg-jp': ['Japan availability (cards, filters, Overview tab)', 'การวางจำหน่ายในญี่ปุ่น (การ์ดยา ตัวกรอง แท็บภาพรวม)'],
  'esc19-svt': ['Recommendations for acute and chronic SVT therapy of the drugs it names (Dosing tab)', 'คำแนะนำการรักษา SVT เฉียบพลันและระยะยาวของยาที่แนวทางระบุ (แท็บขนาดยา)'],
  'esc22-va': ['Doses, cautions and recommendations for the ventricular arrhythmia drugs it covers (Dosing tab)', 'ขนาดยา ข้อควรระวัง และคำแนะนำของยา ventricular arrhythmia ที่แนวทางครอบคลุม (แท็บขนาดยา)'],
  'esc24-af': ['Doses, cautions and recommendations for the AF drugs it covers (Dosing tab)', 'ขนาดยา ข้อควรระวัง และคำแนะนำของยา AF ที่แนวทางครอบคลุม (แท็บขนาดยา)'],
  'acc23-af': ['AF pathway and drug choice', 'แนวทาง AF และการเลือกยา'],
  'aha17-va': ['Ventricular arrhythmia pathway', 'แนวทางหัวใจห้องล่างเต้นผิดจังหวะ'],
  'ema-brinavess': ['Vernakalant (not in the FDA or MIMS)', 'Vernakalant (ไม่มีใน FDA และ MIMS)'],
  tisdale2013: ['QT-risk score tool', 'เครื่องมือคะแนนความเสี่ยง QT'],
  tzivoni1988: ['Magnesium dose in torsades', 'ขนาดแมกนีเซียมใน torsades']
};
// Reference groups, in display order: [id, English title, Thai title, does this key belong].
const REF_GROUPS = [
  ['guide', 'Guidelines', 'แนวทางเวชปฏิบัติ', k => /^(aha25|acc23|aha17|esc)/.test(k)],
  ['label', 'Drug labels (FDA, EMA)', 'ฉลากยา (FDA, EMA)', k => k.startsWith('lbl:') || k === 'ema-brinavess'],
  ['mims', 'MIMS Thailand (doses)', 'MIMS Thailand (ขนาดยา)', k => k.startsWith('mims:')],
  ['nlem', 'Thai National List of Essential Medicines', 'บัญชียาหลักแห่งชาติ', k => k === 'nlem2569'],
  ['reg', 'Registers (availability by country)', 'ทะเบียนยาและแหล่งข้อมูลการวางจำหน่าย', k => k.startsWith('reg-')],
  ['paper', 'Journal articles', 'บทความวารสาร', () => true]
];
function ReferencesSection({ lang }) {
  const [open, setOpen] = useState(false);
  const th = lang === 'th';
  const keys = Object.keys(SOURCES);
  const left = new Set(keys);
  const groups = REF_GROUPS.map(([id, en, thTitle, test]) => { const ks = keys.filter(k => left.has(k) && test(k)); ks.forEach(k => left.delete(k)); return { id, title: th ? thTitle : en, ks }; }).filter(g => g.ks.length);
  let n = 0;
  const used = (k) => (REF_USED[k] || REF_USED[k.split(':')[0]] || ['', ''])[th ? 1 : 0];
  return (
    <section className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 print:hidden" aria-labelledby="refs-heading" data-references>
      <h2 id="refs-heading" className="text-sm font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
        <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="refs-list" data-refs-toggle className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <span>{th ? 'เอกสารอ้างอิง' : 'References'} <span className="text-slate-500 dark:text-slate-300 font-bold normal-case tracking-normal">({keys.length})</span></span>
          <span className={'text-slate-500 dark:text-slate-300 transition-transform ' + (open ? 'rotate-180' : '')} aria-hidden="true">▾</span>
        </button>
      </h2>
      {open && (
        <div id="refs-list" className="mt-3">
          {groups.map(g => (
            <div key={g.id} className="mb-4" data-ref-group={g.id}>
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-2">{g.title} <span className="font-semibold text-slate-500 dark:text-slate-400">({g.ks.length})</span></h3>
            <ol className="flex flex-col gap-2.5">
              {g.ks.map((k) => (
                <li key={k} className="flex gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed" data-ref-item>
                  <span className="shrink-0 font-bold text-slate-500 dark:text-slate-400 tabular-nums w-6 text-right">{++n}.</span>
                  <span className="min-w-0">
                    {SOURCES[k].title}{' '}
                    <a href={SOURCES[k].url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline break-all">{SOURCES[k].url}</a>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5"><span className="font-bold">{th ? 'ใช้สำหรับ' : 'Used for'}:</span> {used(k)}</span>
                  </span>
                </li>
              ))}
            </ol>
            </div>
          ))}
          <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{th ? 'เนื้อหาของผู้จัดทำที่ไม่มีเอกสารอ้างอิงภายนอก: เครื่องมือ Action Potential สูตร QTc และเครื่องคำนวณ CrCl (ระบุไว้ในแอปว่ายังไม่ได้ตรวจกับแหล่งอ้างอิง)' : "Author's content without an external reference: the action-potential tool, the QTc formulas and the CrCl calculator (each is labelled in the app as not checked against a source)."}</p>
        </div>
      )}
    </section>
  );
}

function SourceLine({ refs, lang }) {
  const list = (refs || []).map(r => { const [k, note] = r.split('#'); return { k, note, s: SOURCES[k] }; });
  return (
    <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug pt-1" data-source-line>
      <span className="font-bold">{lang === 'th' ? 'แหล่งอ้างอิง: ' : 'Source: '}</span>
      {list.length === 0 && <span className="italic">{lang === 'th' ? 'ไม่มีแหล่งอ้างอิงที่บันทึกไว้' : 'No source recorded'}</span>}
      {list.map((x, i) => (
        <span key={i}>
          {i > 0 && '; '}
          {x.s ? <a href={x.s.url} target="_blank" rel="noopener noreferrer" title={x.s.title} className="underline decoration-dotted hover:text-indigo-600 break-words">{x.s.short}</a> : <span>{x.k}</span>}
          {x.note && <span className="text-slate-500 dark:text-slate-400"> ({x.note})</span>}
        </span>
      ))}
    </div>
  );
}

// Class-level mechanism by phase (Vaughan Williams teaching text), shared by the pop-up and the drug cards.
function apClassEffects(lang) {
  return {
  normal: {
    title: lang === 'th' ? "รูปคลื่นปกติ (Normal Baseline Action Potential)" : "Normal Cardiac Action Potential",
    phase0: lang === 'th' ? "ปกติ: การไหลเข้าอย่างรวดเร็วของ Na+ ผ่านช่อง Fast Na+ Channels (INa)" : "Normal rapid Na+ influx through voltage-gated Na+ channels (INa)",
    phase1: lang === 'th' ? "ปกติ: การคืนขั้วระยะเริ่มต้นโดย Transient outward K+ current (Ito)" : "Initial rapid repolarization by transient outward K+ current (Ito)",
    phase2: lang === 'th' ? "ปกติ: ช่วง Plateau จากความสมดุลระหว่าง Ca2+ ไหลเข้า (ICa-L) กับ K+ ไหลออก (IKr, IKs)" : "Plateau phase: balance between inward Ca2+ (ICa-L) and outward K+ (IKr, IKs)",
    phase3: lang === 'th' ? "ปกติ: การคืนขั้วอย่างสมบูรณ์โดยการไหลออกของ K+ (IKr, IKs, IK1)" : "Rapid repolarization via outward delayed rectifier K+ currents (IKr, IKs, IK1)",
    phase4: lang === 'th' ? "ปกติ: ศักย์ไฟฟ้าระยะพักที่คงที่ (-85 ถึง -90 mV) โดย IK1 ในเซลล์กล้ามเนื้อหัวใจ" : "Resting membrane potential (-85 to -90 mV) maintained by IK1 and Na+/K+ pump",
    ecg: lang === 'th' ? "PR ปกติ (120-200 ms), QRS ปกติ (<100-120 ms), QTc ปกติ (<440-460 ms)" : "Normal PR (120-200 ms), normal QRS (<120 ms), normal QTc (<450 ms)",
    curveColor: "#3b82f6",
    targetBadge: "Baseline Non-Nodal Action Potential",
    badgeX: 110,
    badgeW: 180,
    path: "M 20 250 L 70 250 L 75 40 L 95 65 L 175 75 C 220 100, 250 200, 280 250 L 380 250",
    erpStart: 70, erpEnd: 240
  },
  Ia: {
    title: lang === 'th' ? "Class Ia (Procainamide, Quinidine, Disopyramide)" : "Class Ia - Intermediate Na+ Block & Prolonged APD",
    phase0: lang === 'th' ? "ความชันลดลงปานกลาง (Moderate INa block) -> การนำไฟฟ้าในห้องล่างช้าลง" : "Moderate INa blockade -> decreased Phase 0 upstroke velocity (Vmax) and conduction velocity",
    phase1: lang === 'th' ? "การคืนขั้วระยะเริ่มต้นช้าลงเล็กน้อย" : "Mild inhibition of early repolarization",
    phase2: lang === 'th' ? "ช่วง Plateau ยาวนานขึ้นเนื่องจากยับยั้งช่องโพแทสเซียม (IKr block)" : "Prolonged plateau due to concurrent block of delayed rectifier K+ channels (IKr)",
    phase3: lang === 'th' ? "การคืนขั้วยาวนานขึ้นอย่างมีนัยสำคัญ (Prolonged Phase 3 repolarization)" : "Markedly prolonged repolarization duration (increased APD and ERP)",
    phase4: lang === 'th' ? "ศักย์ไฟฟ้าระยะพักไม่เปลี่ยนแปลง แต่อาจเกิด Early Afterdepolarizations (EADs)" : "Resting potential normal; elevated risk of Early Afterdepolarizations (EADs)",
    ecg: lang === 'th' ? "QRS กว้างขึ้นปานกลาง, QTc ยาวขึ้นอย่างชัดเจน (เสี่ยงต่อ Torsades de Pointes)" : "Widened QRS + prolonged QTc interval (elevated risk of TdP)",
    curveColor: "#f59e0b",
    targetBadge: "INa Block (Vmax ↓) + IKr Block (APD ↑)",
    badgeX: 85,
    badgeW: 230,
    path: "M 20 250 L 70 250 L 85 45 L 105 70 L 195 78 C 250 110, 290 205, 330 250 L 380 250",
    erpStart: 70, erpEnd: 300
  },
  Ib: {
    title: lang === 'th' ? "Class Ib (Lidocaine, Mexiletine, Phenytoin)" : "Class Ib - Fast Kinetics Na+ Block & Shortened APD",
    phase0: lang === 'th' ? "เนื้อเยื่อปกติแทบไม่เปลี่ยน; ยับยั้งรุนแรงในเซลล์ที่ขาดเลือด (Ischemic/Depolarized tissue)" : "Minimal effect in normal healthy tissue; selective marked depression in ischemic/depolarized cells",
    phase1: lang === 'th' ? "การคืนขั้วเร็วขึ้น (Shortened Phase 1)" : "Accelerated early repolarization",
    phase2: lang === 'th' ? "ช่วง Plateau สั้นลงจากการยับยั้ง Late Inward Na+ Current (INa-L)" : "Shortened plateau duration via late sodium current (INa-L) blockade",
    phase3: lang === 'th' ? "การคืนขั้วเสร็จสิ้นเร็วขึ้น (Shortened APD); อัตราส่วน ERP/APD เพิ่มขึ้น" : "Shortened Action Potential Duration (APD); ERP/APD ratio increased",
    phase4: lang === 'th' ? "ลด Spontaneous Diastolic Depolarization ในเซลล์ผิดปกติที่ขาดเลือด" : "Suppresses abnormal automaticity in ischemic Purkinje fibers",
    ecg: lang === 'th' ? "QRS ปกติในเนื้อเยื่อปกติ, QTc สั้นลงเล็กน้อยหรือไม่เปลี่ยนแปลง (ไม่มีความเสี่ยง TdP)" : "Normal QRS in normal tissue, slight shortening or no change in QTc (No TdP risk)",
    curveColor: "#eab308",
    targetBadge: "Fast INa Block + Shortened APD (Late INa ↓)",
    badgeX: 75,
    badgeW: 245,
    path: "M 20 250 L 70 250 L 75 40 L 90 68 L 155 82 C 195 115, 215 200, 240 250 L 380 250",
    erpStart: 70, erpEnd: 215
  },
  Ic: {
    title: lang === 'th' ? "Class Ic (Flecainide, Propafenone)" : "Class Ic - Potent Slow Na+ Block & Normal APD",
    phase0: lang === 'th' ? "ความชันลดลงอย่างรุนแรง (Marked INa block) แม้ในเนื้อเยื่อปกติ (Slow dissociation)" : "Marked reduction in Phase 0 upstroke velocity (Vmax) with slow binding/unbinding kinetics",
    phase1: lang === 'th' ? "การคืนขั้วระยะต้นล่าช้าลง" : "Delayed early repolarization",
    phase2: lang === 'th' ? "ช่วง Plateau ไม่เปลี่ยนแปลงอย่างมีนัยสำคัญ" : "Little to no effect on plateau duration",
    phase3: lang === 'th' ? "ระยะเวลาการคืนขั้ว (APD) แทบไม่เปลี่ยนแปลง (Normal APD)" : "Action Potential Duration (APD) remains relatively unchanged",
    phase4: lang === 'th' ? "ไม่เปลี่ยนแปลงศักย์ไฟฟ้าระยะพัก แต่การนำกระแสไฟฟ้าในหัวใจช้าลงอย่างมาก" : "Conduction velocity markedly depressed (Use-dependence: worse at high heart rates)",
    ecg: lang === 'th' ? "QRS กว้างขึ้นอย่างมาก (Dose-dependent), PR ยาวขึ้น, QTc ปกติหรือยาวตาม QRS" : "Markedly widened QRS duration, prolonged PR interval, QTc essentially unchanged",
    curveColor: "#f43f5e",
    targetBadge: "Potent Slow INa Block (Vmax ↓↓, Normal APD)",
    badgeX: 70,
    badgeW: 255,
    path: "M 20 250 L 70 250 L 98 48 L 115 72 L 180 77 C 220 102, 252 200, 282 250 L 380 250",
    erpStart: 70, erpEnd: 250
  },
  II: {
    title: lang === 'th' ? "Class II - Beta-Blockers (Esmolol, Metoprolol, Bisoprolol, Carvedilol)" : "Class II - Beta-Blockade & Pacemaker Slowing",
    phase0: lang === 'th' ? "เซลล์กล้ามเนื้อปกติแทบไม่เปลี่ยน; ใน SA/AV node กด Phase 0 จากแคลเซียมช้าลง" : "Ventricular muscle Phase 0 unaffected; in nodal tissue, decreases inward Ca2+ current",
    phase1: lang === 'th' ? "ปกติในกล้ามเนื้อห้องล่าง" : "Unchanged in ventricular myocytes",
    phase2: lang === 'th' ? "ลดปริมาณ Ca2+ ที่ไหลเข้าเซลล์ผ่าน L-type Ca2+ channels (Negative inotropy)" : "Decreases intracellular Ca2+ transit via L-type channels (negative inotropic effect)",
    phase3: lang === 'th' ? "ปกติในกล้ามเนื้อห้องล่าง" : "Repolarization essentially unchanged in ventricles",
    phase4: lang === 'th' ? "กด Phase 4 Spontaneous Diastolic Depolarization ใน SA และ AV Nodes อย่างชัดเจน" : "Markedly decreases Phase 4 spontaneous diastolic depolarization in SA and AV nodes",
    ecg: lang === 'th' ? "PR ยาวขึ้น (ชะลอการนำไฟฟ้าผ่าน AV node), อัตราการเต้นหัวใจ (HR) ช้าลง, QRS และ QTc ปกติ" : "Prolonged PR interval (slowed AV nodal conduction), decreased HR, normal QRS and QTc",
    curveColor: "#6366f1",
    targetBadge: "Beta-1 Block (Phase 4 Slope ↓ in Nodal Cells)",
    badgeX: 70,
    badgeW: 255,
    path: "M 20 250 L 70 250 L 75 42 L 95 67 L 175 77 C 220 102, 250 200, 280 250 L 380 250",
    erpStart: 70, erpEnd: 240
  },
  III: {
    title: lang === 'th' ? "Class III (Amiodarone, Sotalol, Ibutilide, Dofetilide)" : "Class III - Potassium Channel Block & Prolonged Refractoriness",
    phase0: lang === 'th' ? "กล้ามเนื้อห้องล่างปกติ (ยกเว้น Amiodarone ที่มี Class I action ร่วมด้วยเล็กน้อย)" : "Phase 0 unchanged (pure Class III like dofetilide) or mildly depressed (amiodarone)",
    phase1: lang === 'th' ? "ปกติหรือยาวขึ้นเล็กน้อย" : "Unchanged or slightly delayed",
    phase2: lang === 'th' ? "ช่วง Plateau ยาวนานขึ้นอย่างชัดเจนจากการยับยั้งกระแส K+ ขาออก (IKr block)" : "Prolonged plateau due to potent block of rapid delayed rectifier K+ current (IKr)",
    phase3: lang === 'th' ? "การคืนขั้วยาวนานขึ้นอย่างมาก (Markedly prolonged Phase 3 & increased ERP)" : "Markedly prolonged Phase 3 repolarization; significant increase in refractory period (ERP)",
    phase4: lang === 'th' ? "ความเสี่ยงต่อ Early Afterdepolarizations (EADs) สูงขึ้นอย่างมาก โดยเฉพาะที่อัตราเต้นช้า" : "Increased susceptibility to EADs due to excessive APD prolongation (Reverse use-dependence)",
    ecg: lang === 'th' ? "QTc ยาวขึ้นอย่างมาก (เสี่ยง TdP สูงใน Sotalol/Ibutilide; ความเสี่ยงต่ำใน Amiodarone)" : "Markedly prolonged QTc interval; high TdP risk with sotalol/ibutilide, low with amiodarone",
    curveColor: "#a855f7",
    targetBadge: "IKr / HERG Block (Phase 3 Prolonged, ERP ↑↑)",
    badgeX: 70,
    badgeW: 260,
    path: "M 20 250 L 70 250 L 76 40 L 98 62 L 205 68 C 270 95, 315 190, 350 250 L 380 250",
    erpStart: 70, erpEnd: 325
  },
  IV: {
    title: lang === 'th' ? "Class IV - Non-DHP CCB (Diltiazem, Verapamil)" : "Class IV - Calcium Channel Block & AV Nodal Slowing",
    phase0: lang === 'th' ? "ยับยั้ง Phase 0 ใน SA และ AV Nodal Action Potentials (อาศัย L-type Ca2+ influx)" : "Depresses Phase 0 upstroke velocity in slow-response SA and AV nodal action potentials",
    phase1: lang === 'th' ? "ปกติในกล้ามเนื้อห้องล่าง" : "Unchanged in ventricular muscle",
    phase2: lang === 'th' ? "ลดปริมาณ Ca2+ ขาเข้าใน Plateau (ลดแรงบีบตัว Negative Inotropic)" : "Inhibits inward Ca2+ during Phase 2 plateau (negative inotropic effect)",
    phase3: lang === 'th' ? "ปกติในห้องล่าง แต่ยืดระยะดื้อ (ERP) ใน AV Node อย่างมาก" : "Ventricular repolarization normal; markedly prolongs AV nodal refractoriness",
    phase4: lang === 'th' ? "ลดอัตรา Diastolic Depolarization ใน SA และ AV Nodes" : "Slows Phase 4 pacemaker depolarization in SA and AV nodes",
    ecg: lang === 'th' ? "PR ยาวขึ้นอย่างชัดเจน (ชะลอ AV node conduction), อัตราเต้นหัวใจลดลง, QRS และ QTc ปกติ" : "Prolonged PR interval, slowed ventricular response in AF/SVT, normal QRS and QTc",
    curveColor: "#10b981",
    targetBadge: "L-type ICa Block (Slow Response AV Nodal ERP ↑)",
    badgeX: 65,
    badgeW: 270,
    path: "M 20 250 L 70 250 L 75 42 L 95 67 L 175 80 C 218 105, 248 200, 278 250 L 380 250",
    erpStart: 70, erpEnd: 240
  },
  Other: {
    title: lang === 'th' ? "Miscellaneous / Class V (Adenosine, Digoxin, Ivabradine, Ranolazine)" : "Miscellaneous / Class V & Late Current Modulators",
    phase0: lang === 'th' ? "Adenosine/Digoxin: ยับยั้ง SA/AV node conduction; Ranolazine: ยับยั้ง late INa" : "Adenosine activates A1/IK-ACh; Digoxin inhibits Na+/K+ ATPase; Ranolazine selectively depresses late INa",
    phase1: lang === 'th' ? "ปกติในเซลล์กล้ามเนื้อทั่วไป" : "Unchanged in general myocytes",
    phase2: lang === 'th' ? "Digoxin เพิ่ม Ca2+ ในเซลล์ (Positive Inotrope); Ranolazine ลด Ca2+ overload" : "Digoxin elevates intracellular Ca2+ via Na+/Ca2+ exchanger (positive inotropy); Ranolazine prevents Ca2+ overload",
    phase3: lang === 'th' ? "Adenosine ทำให้เกิด Hyperpolarization ใน AV node ชั่วคราว (Transient complete AV block)" : "Adenosine hyperpolarizes nodal tissue (IK-ACh activation) causing transient AV block",
    phase4: lang === 'th' ? "Ivabradine ยับยั้ง If (Funny current) ชะลอ Phase 4 depolarization ใน SA node โดยไม่กดแรงบีบตัว" : "Ivabradine selectively blocks If (funny) current in SA node, slowing resting heart rate",
    ecg: lang === 'th' ? "Adenosine: Transient asystole/AV block; Digoxin: ST depression (Salvador Dali mustache), shortened QTc; Ivabradine: Sinus bradycardia" : "Adenosine: Transient sinus pause/AV block; Digoxin: 'Scooped' ST depression, shortened QTc; Ivabradine: Isolated sinus slowing",
    curveColor: "#0284c7",
    targetBadge: "A1 Receptor / Na+/K+ ATPase / Late INa / If",
    badgeX: 75,
    badgeW: 250,
    path: "M 20 250 L 70 250 L 75 42 L 95 68 L 165 85 C 205 110, 230 200, 260 250 L 380 250",
    erpStart: 70, erpEnd: 230
  }
};;
}

// Mechanism by phase from the drug's class, plus anything its own label states (shown with its source).
function ApPhases({ drug, lang }) {
  const th = lang === 'th';
  const m = drug.apDrug; // drug-specific mechanism by phase (Class III and Other), from its own source
  const c = m || drug.vwClass === 'Other' ? null : apClassEffects(lang)[drug.vwClass]; // 'Other' mixes unrelated drugs: no class mechanism
  const ap = drug.actionPotential;
  const own = [['Phase 0', ap.phase0], ['APD', ap.apd], ['ERP', ap.erp]].filter(([, v]) => !isUnknown(v));
  return (
    <div className="space-y-1 text-xs" data-ap-phases>
      {c && [['Phase 0', c.phase0], ['Phase 2', c.phase2], ['Phase 3', c.phase3], ['Phase 4', c.phase4]].map(([k, v]) => (
        <div key={k}><span className="font-semibold text-slate-500">{k}:</span> {v}</div>
      ))}
      {m && m.rows.map(row => (
        <div key={row.ph}><span className="font-semibold text-slate-500">{th ? row.phTh : row.ph}:</span> {th ? row.th : row.en}</div>
      ))}
      {m && <div className="text-[11px] italic text-slate-500 dark:text-slate-400">{th ? 'ยาออกฤทธิ์ต่อช่องใดมาจากแหล่งอ้างอิง ส่วนการจัดช่องเข้า phase เป็นหลักไฟฟ้าสรีรวิทยามาตรฐาน phase ที่ไม่ได้แสดงคือแหล่งอ้างอิงไม่ได้ระบุ' : 'What the drug acts on comes from the source; placing it in a phase is standard electrophysiology. Phases not listed are not stated in the source.'}</div>}
      {m && <SourceLine refs={m.refs} lang={lang} />}
      {!c && !m && <div className="italic text-slate-500 dark:text-slate-400">N/A {th ? '(ไม่พบกลไกของยานี้ในแหล่งอ้างอิงที่อ่าน)' : '(no mechanism for this drug in the sources read)'}</div>}
      {c && <div className="text-[11px] italic text-slate-500 dark:text-slate-400">{th ? 'จากข้อมูลกลุ่มยา (Vaughan Williams) ไม่ใช่ข้อมูลเฉพาะตัวยา ไม่ได้ตรวจกับแหล่งอ้างอิง' : 'From the drug class (Vaughan Williams), not drug-specific; not checked against a source.'}</div>}
      {own.length > 0 && (
        <div className="pt-1 border-t border-slate-100 dark:border-slate-700">
          <span className="font-bold text-slate-500">{th ? 'ตามฉลากของยานี้' : 'Stated for this drug'}:</span>
          {own.map(([k, v]) => <div key={k}><span className="font-semibold text-slate-500">{k}:</span> {v}</div>)}
          <SourceLine refs={drug.refs.mech} lang={lang} />
        </div>
      )}
    </div>
  );
}

// Drawn action potential: dashed normal curve vs the class curve (shared by the pop-up and the drug card).
function ApCurve({ curr, normal, lang }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 relative shadow-inner overflow-hidden border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{curr.title}</span>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-slate-500 inline-block"></span> {lang === 'th' ? 'เส้นประ: ปกติ' : 'Dashed: Normal'}</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-1.5 rounded-sm inline-block" style={{ backgroundColor: curr.curveColor }}></span> {lang === 'th' ? 'เส้นทึบ: ฤทธิ์ของยา' : 'Solid: Drug Effect'}</span>
        </div>
      </div>

      <svg viewBox="0 0 400 280" className="w-full h-48 sm:h-60 select-none">
        {/* Grid Lines */}
        <line x1="20" y1="40" x2="380" y2="40" className="stroke-slate-300 dark:stroke-slate-700" strokeDasharray="3,3" strokeWidth="0.8" />
        <line x1="20" y1="140" x2="380" y2="140" className="stroke-slate-200 dark:stroke-slate-800" strokeDasharray="2,2" strokeWidth="0.8" />
        <line x1="20" y1="250" x2="380" y2="250" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1" />
        
        {/* Y-axis Labels */}
        <text x="24" y="38" className="fill-slate-500 dark:fill-slate-400" fontSize="9" fontFamily="monospace">+30 mV (Peak)</text>
        <text x="24" y="142" className="fill-slate-500" fontSize="9" fontFamily="monospace">0 mV</text>
        <text x="24" y="246" className="fill-slate-500 dark:fill-slate-400" fontSize="9" fontFamily="monospace">-90 mV (Phase 4)</text>

        {/* Baseline Normal Curve (Dashed) */}
        <path d={normal.path} fill="none" className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="2" strokeDasharray="4,4" opacity="0.6" />

        {/* Altered Drug Action Curve */}
        <path d={curr.path} fill="none" stroke={curr.curveColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Phase Indicators */}
        <g fontSize="10" fontWeight="bold" className="fill-slate-600 dark:fill-slate-300">
          <text x="68" y="130">0</text>
          <text x="96" y="55">1</text>
          <text x="165" y="65">2</text>
          <text x="245" y="140">3</text>
          <text x="320" y="242">4</text>
        </g>

        {/* Target Channel Callout Badge */}
        {curr.targetBadge && (
          <g>
            <rect x={curr.badgeX || 80} y="14" width={curr.badgeW || 240} height="20" rx="6" className="fill-white dark:fill-slate-800" stroke={curr.curveColor} strokeWidth="1.2" />
            <text x={(curr.badgeX || 80) + (curr.badgeW || 240) / 2} y="28" textAnchor="middle" className="fill-slate-900 dark:fill-slate-50" fontSize="9.5" fontWeight="bold">
              {curr.targetBadge}
            </text>
          </g>
        )}

        {/* Refractory Period Bracket (ERP) */}
        <line x1={curr.erpStart} y1="265" x2={curr.erpEnd} y2="265" stroke={curr.curveColor} strokeWidth="2.5" />
        <line x1={curr.erpStart} y1="260" x2={curr.erpStart} y2="270" stroke={curr.curveColor} strokeWidth="2" />
        <line x1={curr.erpEnd} y1="260" x2={curr.erpEnd} y2="270" stroke={curr.curveColor} strokeWidth="2" />
        <text x={(curr.erpStart + curr.erpEnd) / 2} y="276" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="bold">Effective Refractory Period (ERP)</text>
      </svg>
    </div>
  );
}

// --- Action Potential Explorer Modal ---
function ActionPotentialModal({ isOpen, onClose, lang, initialClass = 'Ia' }) {
  const [selectedClass, setSelectedClass] = useState(initialClass || 'Ia');

  useEffect(() => {
    if (initialClass) {
      setSelectedClass(initialClass);
    }
  }, [initialClass, isOpen]);

  const classEffects = apClassEffects(lang);

  const curr = classEffects[selectedClass] || classEffects.Ia;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                {lang === 'th' ? "สรีรวิทยาไฟฟ้าและศักย์ไฟฟ้าหัวใจ (Action Potential Explorer)" : "Cardiac Action Potential & Vaughan Williams Explorer"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? "จำลองผลกระทบของยาต้านหัวใจเต้นผิดจังหวะแต่ละกลุ่มต่อรูปคลื่นศักย์ไฟฟ้าและคลื่นไฟฟ้าหัวใจ (ECG)" : "Interactive ventricular & nodal electrophysiology simulation showing ion channel effects"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Class Selector Buttons */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              ['normal', lang === 'th' ? 'ปกติ (Baseline)' : 'Normal Baseline', 'slate'],
              ['Ia', 'Class Ia (INa + IKr)', 'amber'],
              ['Ib', 'Class Ib (INa Fast)', 'yellow'],
              ['Ic', 'Class Ic (INa Slow)', 'rose'],
              ['II', 'Class II (Beta-Blocker)', 'indigo'],
              ['III', 'Class III (IKr Block)', 'purple'],
              ['IV', 'Class IV (ICa Block)', 'emerald'],
              ['Other', 'Class Other (Misc)', 'sky'],
            ].map(([cls, label]) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedClass === cls ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <ApCurve curr={curr} normal={classEffects.normal} lang={lang} />

          {/* Phase-by-Phase Electrophysiologic Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              ['Phase 0 (Upstroke / Na+ Influx)', curr.phase0, 'border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200'],
              ['Phase 1 & 2 (Plateau / Ca2+ Influx)', curr.phase2, 'border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200'],
              ['Phase 3 (Repolarization / K+ Efflux)', curr.phase3, 'border-purple-200 dark:border-purple-900/40 bg-purple-50/50 dark:bg-purple-950/20 text-purple-900 dark:text-purple-200'],
              ['Phase 4 & Conduction (Resting / Pacemaker)', curr.phase4, 'border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200'],
            ].map(([title, desc, style], idx) => (
              <div key={idx} className={"p-3 rounded-xl border text-xs leading-relaxed " + style}>
                <span className="font-bold block mb-1 uppercase tracking-wide text-[10px] opacity-80">{title}</span>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          {/* Per-drug values from the drug cards (Action Potential Modifications) */}
          {selectedClass !== 'normal' && (
            <div className="space-y-2" data-ap-drugs>
              <span className="font-bold text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400 block">{lang === 'th' ? 'ค่าของยาแต่ละตัวจากการ์ดยา (Action Potential Modifications)' : 'Per-drug values from the drug cards'}</span>
              {DRUGS_DATA.filter(d => d.vwClass === selectedClass).map(d => (
                <div key={d.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1" data-ap-drug>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{d.genericName}</span>
                  <ApPhases drug={d} lang={lang} />
                </div>
              ))}
            </div>
          )}

          {/* Surface ECG Correlation */}
          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-950 dark:text-indigo-200 text-xs">
            <span className="font-bold uppercase tracking-wider text-[10px] block mb-1 text-indigo-700 dark:text-indigo-400">
              {lang === 'th' ? "การเปลี่ยนแปลงบนคลื่นไฟฟ้าหัวใจ (Surface ECG Manifestations)" : "Correlated Surface ECG Changes"}
            </span>
            <p className="font-semibold">{curr.ecg}</p>
          </div>
          <div className="pt-1">
            <SourceLine refs={[]} lang={lang} />
            <p className="text-[11px] italic text-slate-500 dark:text-slate-400">{lang === 'th' ? 'ภาพประกอบเพื่อการสอนระดับกลุ่มยา ไม่ได้ตรวจกับแหล่งอ้างอิง' : 'Class-level teaching drawing; not checked against a source.'}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/50">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-lg transition-colors">
            {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Guideline Navigator Modal ---
function GuidelineNavigatorModal({ isOpen, onClose, lang }) {
  const [activePathway, setActivePathway] = useState('af');

  const th = lang === 'th';
  const pathways = {
    af: {
      name: "Atrial Fibrillation / Flutter",
      steps: [
        {
          stage: th ? "1. ไม่คงที่ (Unstable)" : "1. Unstable",
          content: th
            ? "ความดันต่ำ สับสนเฉียบพลัน มีภาวะช็อก เจ็บหน้าอกจากขาดเลือด หรือหัวใจล้มเหลวเฉียบพลัน (ชีพจรมัก 150 ขึ้นไป): ทำ synchronized cardioversion ให้ยาระงับประสาทเมื่อทำได้ (AHA 2025) พลังงานช็อกแรก 200 J ขึ้นไปดีกว่าพลังงานต่ำสำหรับ AF และ atrial flutter (AHA 2025)"
            : "Hypotension, acutely altered mental status, shock, ischemic chest discomfort or acute heart failure (rate typically 150 or more): synchronized cardioversion, sedated whenever feasible (AHA 2025). A first shock of 200 J or more is preferable to lower settings for AF and atrial flutter (AHA 2025).",
          refs: ["aha25-tachy", "aha25-als#Key changes"]
        },
        {
          stage: th ? "2. ควบคุมอัตราเต้นเฉียบพลัน (IV)" : "2. Acute rate control (IV)",
          content: th
            ? "AHA 2025: Diltiazem 0.25 มก./กก. ใน 2 นาที แล้ว 5-10 มก./ชม.; Verapamil 0.075-0.15 มก./กก. ใน 2 นาที (หลีกเลี่ยง non-DHP CCB ในความดันต่ำ หัวใจล้มเหลว cardiomyopathy และ ACS). Metoprolol 2.5-5 มก. ใน 2 นาที ได้ถึง 3 ครั้ง; Esmolol 500 มคก./กก. ใน 1 นาที แล้ว 50-300 มคก./กก./นาที; Propranolol 1 มก. ใน 1 นาที ได้ถึง 3 ครั้ง (หลีกเลี่ยง beta-blocker ในหัวใจล้มเหลวที่ไม่คงที่). Amiodarone 300 มก. ใน 1 ชม. แล้ว 10-50 มก./ชม.; Digoxin 0.25 มก. ซ้ำได้ถึง 1.5 มก./24 ชม. (มักใช้เสริม)\nACC/AHA 2023: ในการศึกษาแบบสุ่ม diltiazem ควบคุมอัตราเต้นได้เร็วกว่า digoxin หรือ amiodarone"
            : "AHA 2025: diltiazem 0.25 mg/kg over 2 min, then 5-10 mg/h; verapamil 0.075-0.15 mg/kg over 2 min (avoid non-dihydropyridine CCBs in hypotension, heart failure, cardiomyopathy and ACS). Metoprolol 2.5-5 mg over 2 min up to 3 doses; esmolol 500 mcg/kg over 1 min then 50-300 mcg/kg/min; propranolol 1 mg over 1 min up to 3 doses (avoid beta-blockers in decompensated heart failure). Amiodarone 300 mg over 1 h then 10-50 mg/h; digoxin 0.25 mg repeated to max 1.5 mg/24 h (usually adjunctive).\nACC/AHA 2023: in randomized trials IV diltiazem controlled the rate faster than digoxin or amiodarone.",
          refs: ["aha25-als#Table (AF/AFL rate control)", "acc23-af#Section 7.2.1, Table 21"]
        },
        {
          stage: th ? "3. แปลงจังหวะและยาต้านการแข็งตัวของเลือด" : "3. Cardioversion and anticoagulation",
          content: th
            ? "ACC/AHA 2023: ความเสี่ยงลิ่มเลือดใช้กับทั้งการแปลงจังหวะด้วยยาและด้วยไฟฟ้า ให้ยาต้านการแข็งตัวของเลือดอย่างน้อย 3 สัปดาห์ก่อน (VKA หรือ DOAC; อาจเลือก DOAC ก่อน) หรือตรวจภาพหัวใจเพื่อหาลิ่มเลือด และให้ต่อ 4 สัปดาห์หลังแปลงจังหวะ แนวทางนี้ให้ประเมินความเสี่ยงของผู้ป่วยแต่ละราย แทนการยึดเกณฑ์ 48 ชั่วโมงอย่างเดียว\nยาแปลงจังหวะ (ACC/AHA 2023 ตาราง 22): flecainide 200 มก. (<70 กก.) / 300 มก. (>70 กก.) หรือ propafenone 450 / 600 มก. รับประทานครั้งเดียว (ให้ beta-blocker หรือ non-DHP CCB อย่างน้อย 30 นาทีก่อน ไม่ใช้เมื่อมีโรคหัวใจเชิงโครงสร้าง) ibutilide 1 มก. IV ใน 10 นาที amiodarone IV หรือ procainamide IV"
            : "ACC/AHA 2023: thromboembolic risk applies to both pharmacological and electrical cardioversion. Anticoagulate for at least 3 weeks before (VKA or DOAC; DOACs may be preferred) or image to exclude thrombus, and continue for 4 weeks after. The guideline favors judging each patient's risk over strict reliance on the old 48-hour threshold.\nConversion drugs (ACC/AHA 2023 Table 22): single oral flecainide 200 mg (<70 kg) / 300 mg (>70 kg) or propafenone 450 / 600 mg (beta-blocker or non-DHP CCB at least 30 min before; not with structural heart disease), ibutilide 1 mg IV over 10 min, IV amiodarone, or IV procainamide.",
          refs: ["acc23-af#Section 8.2.1, Table 22, text (pill-in-the-pocket)"]
        }
      ]
    },
    svt: {
      name: th ? "SVT (QRS แคบ จังหวะสม่ำเสมอ)" : "Regular Narrow-Complex SVT",
      steps: [
        {
          stage: th ? "1. ไม่คงที่" : "1. Unstable",
          content: th
            ? "Synchronized cardioversion ให้ยาระงับประสาทเมื่อทำได้ ถ้า QRS แคบและสม่ำเสมอ พิจารณา adenosine (AHA 2025) พลังงาน: ตามคำแนะนำของเครื่อง ถ้าไม่ทราบใช้พลังงานสูงสุด"
            : "Synchronized cardioversion, sedated whenever feasible; if regular narrow complex, consider adenosine (AHA 2025). Energy: per the device; if not known, use the maximum setting.",
          refs: ["aha25-tachy"]
        },
        {
          stage: th ? "2. คงที่: vagal maneuver และ adenosine" : "2. Stable: vagal maneuvers and adenosine",
          content: th
            ? "Vagal maneuver (ถ้าจังหวะสม่ำเสมอ) แล้ว adenosine 6 มก. ฉีด IV เร็ว ตามด้วย NSS flush ถ้าจำเป็นให้ 12 มก. (AHA 2025) ฉลากยาให้ 12 มก. ซ้ำได้อีก 1 ครั้ง ข้อห้าม: AV block ระดับ 2-3 หรือ sick sinus โดยไม่มี pacemaker"
            : "Vagal maneuvers (if regular), then adenosine 6 mg rapid IV push with a saline flush; 12 mg if required (AHA 2025). The label allows the 12 mg dose once more. Contraindicated in second- or third-degree AV block or sick sinus syndrome without a pacemaker.",
          refs: ["aha25-tachy", "lbl:adenosine-generic#Dosage and Administration, Contraindications"]
        },
        {
          stage: th ? "3. ทางเลือกถัดไป" : "3. Next options",
          content: th
            ? "Beta-blocker หรือ calcium channel blocker (AHA 2025) diltiazem หรือ verapamil IV แปลงจังหวะได้ 64-98% verapamil ได้ผลใกล้ adenosine แต่ระวังความดันต่ำ ขอคำปรึกษาผู้เชี่ยวชาญ ถ้าดื้อต่อการรักษา: หาสาเหตุ เพิ่มพลังงานช็อก หรือเพิ่มยาต้านหัวใจเต้นผิดจังหวะ"
            : "Beta-blocker or calcium channel blocker (AHA 2025). IV diltiazem or verapamil convert 64-98%; verapamil works about as well as adenosine but can cause hypotension. Consider expert consultation. If refractory: look for the cause, raise the energy for the next cardioversion, or add an antiarrhythmic.",
          refs: ["aha25-tachy", "aha25-als#Narrow-complex tachycardia text"]
        }
      ]
    },
    vt: {
      name: "Ventricular Tachycardia (VT / VF)",
      steps: [
        {
          stage: th ? "1. ไม่มีชีพจร (VF / pVT)" : "1. Pulseless (VF / pVT)",
          content: th
            ? "CPR และช็อกไฟฟ้า (biphasic ตามคำแนะนำผู้ผลิต เช่น 120-200 J ถ้าไม่ทราบใช้สูงสุด; monophasic 360 J) epinephrine 1 มก. ทุก 3-5 นาที หลังช็อกครั้งที่ 3: amiodarone 300 มก. (ครั้งที่สอง 150 มก.) หรือ lidocaine 1-1.5 มก./กก. (ครั้งที่สอง 0.5-0.75 มก./กก.) magnesium ไม่ช่วยในภาวะหัวใจหยุดเต้นทั่วไป (AHA 2025)"
            : "CPR and defibrillation (biphasic per manufacturer, e.g. 120-200 J, maximum if unknown; monophasic 360 J). Epinephrine 1 mg every 3-5 min. After the third shock: amiodarone 300 mg (second dose 150 mg) or lidocaine 1-1.5 mg/kg (second dose 0.5-0.75 mg/kg). Magnesium does not help in cardiac arrest in general (AHA 2025).",
          refs: ["aha25-ca", "aha25-als#Antiarrhythmic and magnesium text"]
        },
        {
          stage: th ? "2. Wide-QRS มีชีพจร" : "2. Wide-QRS tachycardia with a pulse",
          content: th
            ? "ไม่คงที่ (เช่น SBP <80 หรือสับสน): synchronized cardioversion ทันที. คงที่: adenosine เฉพาะเมื่อสม่ำเสมอและ QRS รูปเดียว; procainamide 20-50 มก./นาที จนหยุด ความดันต่ำ QRS กว้างขึ้นเกิน 50% หรือครบ 17 มก./กก. แล้ว 1-4 มก./นาที (หลีกเลี่ยงเมื่อ QT ยาวหรือหัวใจล้มเหลว ห้ามเร็วกว่า 50 มก./นาที) หรือ amiodarone 150 มก. ใน 10 นาที แล้ว 1 มก./นาที 6 ชม. ถ้ายังเป็น: synchronized cardioversion และขอคำปรึกษาผู้เชี่ยวชาญ"
            : "Unstable (e.g. SBP under 80 or altered mentation): immediate synchronized cardioversion. Stable: adenosine only if regular and monomorphic; procainamide 20-50 mg/min until suppressed, hypotension, QRS widening over 50%, or 17 mg/kg, then 1-4 mg/min (avoid with prolonged QT or heart failure; never faster than 50 mg/min); or amiodarone 150 mg over 10 min, then 1 mg/min for 6 h. If it persists: synchronized cardioversion; expert consultation.",
          refs: ["aha25-tachy", "aha25-als#Wide-complex tachycardia text"]
        },
        {
          stage: th ? "3. Polymorphic VT / Torsades de pointes" : "3. Polymorphic VT / torsades de pointes",
          content: th
            ? "Torsades (QT ยาว): magnesium IV ช่วยหยุดและป้องกันการกลับเป็นซ้ำ แก้โพแทสเซียมต่ำ ยาต้านหัวใจเต้นผิดจังหวะอาจทำให้ QT ยาวขึ้น beta-blocker เฉียบพลันอาจกระตุ้นโดยทำให้หัวใจเต้นช้า ขอคำปรึกษาผู้เชี่ยวชาญเมื่อเกิดจากหัวใจเต้นช้าหรือหยุดเต้นเป็นช่วง Magnesium (Tzivoni 1988 รายงาน 12 ราย): 2 ก. IV ซ้ำได้หลัง 5-15 นาที แล้วหยด 3-20 มก./นาที ไม่มี QT ยาว: magnesium ไม่ได้ผล (AHA 2025)"
            : "Torsades (long QT): IV magnesium suppresses and prevents recurrences; correct hypokalemia. Antiarrhythmics can prolong QT further; acute beta-blockers can trigger it through bradycardia. Seek expert advice for bradycardia- or pause-dependent torsades. Magnesium (Tzivoni 1988, 12 patients): 2 g IV bolus, repeat after 5-15 min if needed, then 3-20 mg/min. Without long QT, magnesium is not effective (AHA 2025).",
          refs: ["aha25-als#Polymorphic VT text", "aha17-va#Section 5.1.5.1", "tzivoni1988#Abstract"]
        }
      ]
    },
    wpw: {
      name: "Pre-excited AF (WPW with AF)",
      steps: [
        {
          stage: th ? "ข้อควรระวัง" : "Key warning",
          content: th
            ? "ยาที่ปิดกั้น AV node อาจเพิ่มการนำผ่านทางลัดและทำให้เกิด VF จึงอาจเป็นอันตราย มีรายงาน VF หลังให้ amiodarone IV (ACC/AHA 2023) ฉลากยาห้ามใช้ diltiazem และ verapamil IV ใน AF/flutter ที่มีทางลัด และ digoxin เพิ่มความเสี่ยง VF"
            : "AV-node blocking drugs can speed conduction over the pathway and cause VF, so they are potentially harmful; VF has been reported after IV amiodarone (ACC/AHA 2023). The labels contraindicate IV diltiazem and verapamil in AF/flutter with an accessory pathway, and warn that digoxin raises VF risk.",
          refs: ["acc23-af#Section 10.6", "lbl:diltiazem-inj#Contraindications", "lbl:verapamil-inj#Contraindications", "lbl:digoxin-tab#Warnings 5.1"]
        },
        {
          stage: th ? "การรักษา" : "Management",
          content: th
            ? "ไม่คงที่: แปลงจังหวะด้วยไฟฟ้า. คงที่: ibutilide หรือ procainamide (เพิ่มระยะ refractory ของทางลัด) การรักษาให้หายขาดคือจี้ทำลายทางลัด (สำเร็จ 93-95%) ซึ่งเสนอเป็นการรักษาแรกได้ (ACC/AHA 2023)"
            : "Unstable: electrical cardioversion. Stable: ibutilide or procainamide (they lengthen pathway refractoriness). Definitive therapy is accessory-pathway ablation (93-95% success), which can be offered first-line (ACC/AHA 2023).",
          refs: ["acc23-af#Section 10.6"]
        }
      ]
    }
  };

  const curr = pathways[activePathway];

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-emerald-50/60 dark:bg-emerald-950/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                {lang === 'th' ? "แนวทางการรักษาภาวะหัวใจเต้นผิดจังหวะ (Clinical Pathways)" : "Arrhythmia Clinical Guideline Pathways"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? "ตามแนวทาง AHA 2025 และ ACC/AHA 2023 แต่ละขั้นระบุแหล่งอ้างอิง" : "From AHA 2025 and ACC/AHA 2023; each step names its source"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Pathway Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              ['af', 'Atrial Fibrillation / Flutter', Activity],
              ['svt', 'SVT / AVNRT / AVRT', Zap],
              ['vt', 'VT / VF / Torsades', Heart],
              ['wpw', 'Pre-excited AF (WPW)', AlertTriangle]
            ].map(([k, label, Icon]) => (
              <button
                key={k}
                onClick={() => setActivePathway(k)}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1.5 transition-all ${activePathway === k ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-sm' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
              >
                <Icon className={`w-4 h-4 ${activePathway === k ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`} />
                <span className="font-bold text-xs leading-snug">{label}</span>
              </button>
            ))}
          </div>

          {/* Pathway Step-by-Step Display */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wide border-b border-slate-100 dark:border-slate-800 pb-2">
              {curr.name}
            </h3>

            {curr.steps.map((st, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 block">{st.stage}</span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                  {st.content}
                </p>
                <SourceLine refs={st.refs} lang={lang} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/50">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-lg transition-colors">
            {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Tisdale Risk & QTc Calculator Modal ---
function TisdaleRiskModal({ isOpen, onClose, lang }) {

  // Tisdale items state
  const [age68, setAge68] = useState(false);
  const [female, setFemale] = useState(false);
  const [loopDiuretic, setLoopDiuretic] = useState(false);
  const [hypokalemia, setHypokalemia] = useState(false);
  const [baselineQtc450, setBaselineQtc450] = useState(false);
  const [acuteMi, setAcuteMi] = useState(false);
  const [oneQtDrug, setOneQtDrug] = useState(false);
  const [twoQtDrugs, setTwoQtDrugs] = useState(false);
  const [sepsis, setSepsis] = useState(false);
  const [hf, setHf] = useState(false);

  // QTc Raw Inputs
  const [hr, setHr] = useState('75');
  const [qt, setQt] = useState('420');

  // Compute Tisdale Score
  const score = (age68 ? 1 : 0) +
                (female ? 1 : 0) +
                (loopDiuretic ? 1 : 0) +
                (hypokalemia ? 2 : 0) +
                (baselineQtc450 ? 2 : 0) +
                (acuteMi ? 2 : 0) +
                (oneQtDrug ? 3 : 0) + (twoQtDrugs ? 3 : 0) + // Tisdale 2013 Table 5 lists both items (max 21 counts both)
                (sepsis ? 3 : 0) +
                (hf ? 3 : 0);

  let riskCategory = "Low";
  let riskColor = "emerald";
  let incidence = "15%";
  if (score >= 11) {
    riskCategory = "High";
    riskColor = "rose";
    incidence = "73%";
  } else if (score >= 7) {
    riskCategory = "Moderate";
    riskColor = "amber";
    incidence = "37%";
  }

  // Calculate QTc Formulas
  const heartRate = parseFloat(hr) || 60;
  const rawQt = parseFloat(qt) || 400;
  const rrSec = 60 / heartRate;
  const qtcBazett = Math.round(rawQt / Math.sqrt(rrSec));
  const qtcFridericia = Math.round(rawQt / Math.cbrt(rrSec));
  const qtcFramingham = Math.round(rawQt + 154 * (1 - rrSec));

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-rose-50/60 dark:bg-rose-950/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                {lang === 'th' ? "โปรแกรมคำนวณ QTc และประเมินความเสี่ยง Tisdale (QTc & Tisdale Risk)" : "QTc Calculator & Tisdale Proarrhythmia Risk Score"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? "ประเมินความเสี่ยงการเกิด QT Prolongation และ Torsades de Pointes จากยาในหอผู้ป่วย" : "Validated risk prediction for drug-induced QTc prolongation & Torsades de Pointes"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Section 1: QTc Calculator */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-500" />
              {lang === 'th' ? "1. คำนวณค่า QTc จากคลื่นไฟฟ้าหัวใจ (Baseline QTc Calculator)" : "1. QTc Interval Calculator"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  {lang === 'th' ? "อัตราการเต้นของหัวใจ (Heart Rate - bpm)" : "Heart Rate (bpm)"}
                </label>
                <input
                  type="number"
                  value={hr}
                  onChange={(e) => setHr(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  {lang === 'th' ? "ช่วง QT ที่วัดได้จาก ECG (Raw QT Interval - ms)" : "Measured QT Interval (ms)"}
                </label>
                <input
                  type="number"
                  value={qt}
                  onChange={(e) => setQt(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* QTc Results Output */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Bazett</span>
                <span className={`text-base sm:text-lg font-extrabold ${qtcBazett >= 500 ? 'text-rose-600' : qtcBazett >= 460 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {qtcBazett} <small className="text-xs font-normal">ms</small>
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Fridericia (Rec.)</span>
                <span className={`text-base sm:text-lg font-extrabold ${qtcFridericia >= 500 ? 'text-rose-600' : qtcFridericia >= 460 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {qtcFridericia} <small className="text-xs font-normal">ms</small>
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Framingham</span>
                <span className={`text-base sm:text-lg font-extrabold ${qtcFramingham >= 500 ? 'text-rose-600' : qtcFramingham >= 460 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {qtcFramingham} <small className="text-xs font-normal">ms</small>
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              {lang === 'th' ? 'สูตร: Bazett QT/√RR; Fridericia QT/∛RR; Framingham QT + 154 × (1 − RR) (RR เป็นวินาที)' : 'Formulas: Bazett QT/√RR; Fridericia QT/∛RR; Framingham QT + 154 × (1 − RR) (RR in seconds)'}
            </p>
            <SourceLine refs={[]} lang={lang} />
          </div>

          {/* Section 2: Tisdale Risk Score Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                {lang === 'th' ? "2. แบบประเมินความเสี่ยง Tisdale Risk Score (คะแนนเต็ม 21 คะแนน)" : "2. Tisdale Risk Score Checklist (Max 21 pts)"}
              </h3>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                Score: {score} / 21
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                [age68, setAge68, lang === 'th' ? 'อายุ >= 68 ปี (Age >= 68 years)' : 'Age >= 68 years', 1],
                [female, setFemale, lang === 'th' ? 'เพศหญิง (Female sex)' : 'Female sex', 1],
                [loopDiuretic, setLoopDiuretic, lang === 'th' ? 'ใช้ยาขับปัสสาวะกลุ่ม Loop Diuretic (Furosemide)' : 'Loop diuretic use', 1],
                [hypokalemia, setHypokalemia, lang === 'th' ? 'เกลือแร่โพแทสเซียมในเลือดต่ำ (K+ <= 3.5 mEq/L)' : 'Serum potassium <= 3.5 mEq/L', 2],
                [baselineQtc450, setBaselineQtc450, lang === 'th' ? 'QTc แรกรับ >= 450 ms' : 'Admission QTc >= 450 ms', 2],
                [acuteMi, setAcuteMi, lang === 'th' ? 'กล้ามเนื้อหัวใจขาดเลือดเฉียบพลัน (Acute Myocardial Infarction)' : 'Acute myocardial infarction', 2],
                [oneQtDrug, setOneQtDrug, lang === 'th' ? 'ได้รับยาที่ทำให้ QTc ยาว 1 ชนิด' : 'One QTc-prolonging drug', 3],
                [twoQtDrugs, setTwoQtDrugs, lang === 'th' ? 'ได้รับยาที่ทำให้ QTc ยาวตั้งแต่ 2 ชนิด' : 'Two or more QTc-prolonging drugs', 3],
                [sepsis, setSepsis, lang === 'th' ? 'ภาวะติดเชื้อในกระแสเลือด (Sepsis)' : 'Sepsis', 3],
                [hf, setHf, lang === 'th' ? 'ภาวะหัวใจล้มเหลว (Heart failure)' : 'Heart failure', 3],
              ].map(([state, setState, label, pts], i) => (
                <label key={i} className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${state ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-slate-900 dark:text-slate-100 font-bold' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'}`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={state}
                      onChange={(e) => setState(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                    />
                    <span>{label}</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold">
                    +{pts}
                  </span>
                </label>
              ))}
            </div>

            {/* Tisdale Score Output Card */}
            <div className={`p-4 rounded-xl border ${riskCategory === 'High' ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200' : riskCategory === 'Moderate' ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200' : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'} space-y-2`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider block opacity-75">
                    {lang === 'th' ? 'ระดับความเสี่ยง (Risk Category)' : 'Calculated Tisdale Risk Level'}
                  </span>
                  <h4 className="text-lg font-extrabold">{riskCategory} Risk ({score} pts)</h4>
                </div>
                <div className="text-right">
                  <span className="text-[11px] opacity-80 block">{lang === 'th' ? 'อุบัติการณ์เกิด QTc ยาว' : 'Observed QTc Prolongation'}</span>
                  <span className="text-base font-extrabold">{incidence}</span>
                </div>
              </div>
              
              <p className="text-xs leading-relaxed font-medium pt-1 border-t border-current/20">
                {lang === 'th'
                  ? `ในกลุ่มตรวจสอบ (validation) ของ Tisdale 2013 อุบัติการณ์ QTc ยาว (QTc เกิน 500 ms หรือเพิ่มเกิน 60 ms) คือ ${incidence} ในกลุ่มนี้ (ต่ำ 0-6 คะแนน 15%, ปานกลาง 7-10 คะแนน 37%, สูง 11-21 คะแนน 73%) คะแนนนี้ทำนาย QTc ยาว ไม่ใช่ torsades โดยตรง และพัฒนาในผู้ป่วยหอผู้ป่วยวิกฤตโรคหัวใจ งานวิจัยไม่ได้ให้แนวทางการรักษา ดูฉลากยาแต่ละตัว`
                  : `In the Tisdale 2013 validation group, QTc prolongation (QTc over 500 ms or a rise over 60 ms) occurred in ${incidence} of this category (low 0-6 points 15%, moderate 7-10 points 37%, high 11-21 points 73%). The score predicts QTc prolongation, not torsades directly, and was built in cardiac care unit patients. The paper gives no management rules; follow each drug label.`
                }
              </p>
              <SourceLine refs={['tisdale2013#Tables 5 and 6, Abstract']} lang={lang} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/50">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-lg transition-colors">
            {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- IV Infusion Protocols Modal ---
function InfusionProtocolModal({ isOpen, onClose, lang }) {
  const [selectedDrug, setSelectedDrug] = useState('amiodarone');
  const [weightKg, setWeightKg] = useState('60');

  const th = lang === 'th';
  const w = parseFloat(weightKg) || 60;
  const r0 = (x) => Math.round(x);
  const r1 = (x) => Math.round(x * 10) / 10;
  const protocols = {
    amiodarone: {
      name: "Amiodarone",
      indication: th ? "VF / VT ที่ไม่คงที่ (ฉลาก Nexterone); หัวใจหยุดเต้น; wide-QRS ที่คงที่ (AHA 2025)" : "VF / unstable VT (Nexterone label); cardiac arrest; stable wide-QRS tachycardia (AHA 2025)",
      conc: th ? "Nexterone premix: 150 มก./100 มล. (1.5 มก./มล.) และ 360 มก./200 มล. (1.8 มก./มล.) ในเดกซ์โทรส ไม่ต้องเจือจางเพิ่ม" : "Nexterone premix: 150 mg/100 mL (1.5 mg/mL) and 360 mg/200 mL (1.8 mg/mL) in dextrose; no further dilution",
      steps: [
        { phase: th ? "หัวใจหยุดเต้น (AHA 2025)" : "Cardiac arrest (AHA 2025)", details: th ? "300 มก. IV/IO ครั้งที่สอง 150 มก." : "300 mg IV/IO bolus; second dose 150 mg." },
        { phase: th ? "ขนาดนำเร็ว (ฉลาก)" : "Rapid load (label)", details: th ? "150 มก. ใน 10 นาที (15 มก./นาที) = premix 1.5 มก./มล. อัตรา 10 มล./นาที" : "150 mg over the first 10 min (15 mg/min) = 1.5 mg/mL premix at 10 mL/min." },
        { phase: th ? "ขนาดนำช้า 6 ชม. (ฉลาก)" : "Slow load, next 6 h (label)", details: th ? "360 มก. ใน 6 ชม. (1 มก./นาที) = 1.8 มก./มล. อัตรา 0.556 มล./นาที (33.3 มล./ชม.)" : "360 mg over 6 h (1 mg/min) = 1.8 mg/mL at 0.556 mL/min (33.3 mL/h)." },
        { phase: th ? "18 ชม. ถัดไปและหลังจากนั้น (ฉลาก)" : "Remaining 18 h and after (label)", details: th ? "540 มก. ใน 18 ชม. (0.5 มก./นาที) = 0.278 มล./นาที (16.7 มล./ชม.) หลัง 24 ชม. ให้ 0.5 มก./นาที ต่อ (720 มก./24 ชม.) กำเริบ: 150 มก. ใน 10 นาทีเพิ่ม" : "540 mg over 18 h (0.5 mg/min) = 0.278 mL/min (16.7 mL/h). After 24 h continue 0.5 mg/min (720 mg/24 h). Breakthrough VF/VT: extra 150 mg over 10 min." }
      ],
      pearl: th ? "ให้ทาง central venous catheter เมื่อทำได้ ใช้ in-line filter ขนาดเฉลี่ยเกิน 2100 มก./วัน เพิ่มความเสี่ยงความดันต่ำ เข้ากันไม่ได้กับยาหลายตัวทาง Y-site (ดูตารางในฉลาก)" : "Give through a dedicated central venous catheter whenever possible; use an in-line filter. Mean daily doses above 2100 mg raised hypotension risk. Many Y-site incompatibilities (see the label table).",
      refs: ["lbl:amiodarone-nexterone#Dosage and Administration", "aha25-ca"]
    },
    lidocaine: {
      name: "Lidocaine",
      indication: th ? "Ventricular arrhythmia (ฉลาก); VF/pVT ที่ช็อกไม่ได้ผล (AHA 2025)" : "Ventricular arrhythmias (label); shock-refractory VF/pVT (AHA 2025)",
      conc: th ? "Premix lidocaine ใน D5W: 4 มก./มล. (0.4%) หรือ 8 มก./มล. (0.8%)" : "Premixed lidocaine in D5W: 4 mg/mL (0.4%) or 8 mg/mL (0.8%)",
      steps: [
        { phase: th ? "หัวใจหยุดเต้น (AHA 2025)" : "Cardiac arrest (AHA 2025)", details: th ? `1-1.5 มก./กก. (${r0(w)}-${r0(w * 1.5)} มก.) ครั้งที่สอง 0.5-0.75 มก./กก. (${r0(w * 0.5)}-${r0(w * 0.75)} มก.)` : `1-1.5 mg/kg (${r0(w)}-${r0(w * 1.5)} mg); second dose 0.5-0.75 mg/kg (${r0(w * 0.5)}-${r0(w * 0.75)} mg).` },
        { phase: th ? "ฉีดนำ (ฉลาก)" : "Bolus (label)", details: th ? `1-1.5 มก./กก. (${r0(w)}-${r0(w * 1.5)} มก.) อัตรา 25-50 มก./นาที` : `1-1.5 mg/kg (${r0(w)}-${r0(w * 1.5)} mg) at 25-50 mg/min.` },
        { phase: th ? "หยดต่อเนื่อง (ฉลาก)" : "Infusion (label)", details: th ? "1-4 มก./นาที: 4 มก./มล. อัตรา 15-60 มล./ชม. หรือ 8 มก./มล. อัตรา 7.5-30 มล./ชม. ลดลงประมาณครึ่งหนึ่งหลัง 24 ชม." : "1-4 mg/min: 4 mg/mL at 15-60 mL/h, or 8 mg/mL at 7.5-30 mL/h. Reduce by about half after 24 h." },
        { phase: th ? "ตับบกพร่อง / eGFR <30 (ฉลาก)" : "Hepatic impairment / eGFR under 30 (label)", details: th ? "ใช้อัตราหยดต่อเนื่องที่ต่ำลง และเฝ้าระวังพิษใกล้ชิด (ฉลากไม่ระบุตัวเลข)" : "Use a lower maintenance rate with close monitoring for toxicity (no number given in the label)." }
      ],
      pearl: th ? "ติดตาม ECG ตลอด หยุดเมื่อ PR ยาว QRS กว้าง หรือมีอาการพิษ อาการพิษต่อระบบประสาทมากขึ้นเมื่อระดับยาเกิน 6 มคก./มล. ใช้เครื่องควบคุมการหยด" : "Constant ECG monitoring; stop for PR prolongation, QRS widening or toxicity. CNS toxicity rises above 6 mcg/mL. Use a calibrated infusion device.",
      refs: ["lbl:lidocaine-premix#Dosage and Administration, Warnings", "aha25-ca"]
    },
    procainamide: {
      name: "Procainamide",
      indication: th ? "Ventricular arrhythmia ที่อันตรายถึงชีวิต (ฉลาก); wide-QRS ที่คงที่ (AHA 2025)" : "Life-threatening ventricular arrhythmias (label); stable wide-QRS tachycardia (AHA 2025)",
      conc: th ? "ขนาดนำ: 1 ก. ใน D5W 50 มล. (20 มก./มล.) ขนาดต่อเนื่อง: 1 ก. ใน D5W 500 มล. (2 มก./มล.) หรือ 1 ก. ใน 250 มล. (4 มก./มล.)" : "Load: 1 g in 50 mL D5W (20 mg/mL). Maintenance: 1 g in 500 mL D5W (2 mg/mL) or 1 g in 250 mL (4 mg/mL)",
      steps: [
        { phase: th ? "ขนาดนำ (ฉลาก)" : "Loading (label)", details: th ? "20 มก./มล. อัตรา 1 มล./นาที นาน 25-30 นาที (500-600 มก.) หรือฉีดช้า 100 มก. ทุก 5 นาที (ไม่เกิน 50 มก./นาที) สูงสุด 1 ก." : "20 mg/mL at 1 mL/min for 25-30 min (500-600 mg), or 100 mg every 5 min no faster than 50 mg/min; max 1 g." },
        { phase: th ? "ขนาดนำ (AHA 2025)" : "Loading (AHA 2025)", details: th ? `20-50 มก./นาที จนหยุด ความดันต่ำ QRS กว้างขึ้นเกิน 50% หรือครบ 17 มก./กก. (${r0(w * 17)} มก.)` : `20-50 mg/min until suppressed, hypotension, QRS widening over 50%, or 17 mg/kg (${r0(w * 17)} mg).` },
        { phase: th ? "หยดต่อเนื่อง" : "Maintenance", details: th ? "ฉลาก 2-6 มก./นาที: 2 มก./มล. อัตรา 1-3 มล./นาที (60-180 มล./ชม.) หรือ 4 มก./มล. อัตรา 0.5-1.5 มล./นาที (30-90 มล./ชม.) AHA 2025: 1-4 มก./นาที" : "Label 2-6 mg/min: 2 mg/mL at 1-3 mL/min (60-180 mL/h) or 4 mg/mL at 0.5-1.5 mL/min (30-90 mL/h). AHA 2025: 1-4 mg/min." }
      ],
      pearl: th ? "ติดตาม ECG และความดันระหว่างให้ หยุดถ้าการนำไฟฟ้าผิดปกติต่อเนื่องหรือความดันต่ำ หลีกเลี่ยงเมื่อ QT ยาวหรือหัวใจล้มเหลว (AHA 2025)" : "ECG and BP during the infusion; stop for persistent conduction disturbance or hypotension. Avoid with prolonged QT or heart failure (AHA 2025).",
      refs: ["lbl:procainamide-inj#Dosage and Administration", "aha25-tachy"]
    },
    diltiazem: {
      name: "Diltiazem",
      indication: th ? "ควบคุมอัตราเต้นใน AF/flutter ชั่วคราว; แปลง PSVT (ฉลาก)" : "Temporary AF/flutter rate control; PSVT conversion (label)",
      conc: th ? "125 มก. ใน 125 มล. = 1 มก./มล. (10 มก./ชม. = 10 มล./ชม.; 15 มก./ชม. = 15 มล./ชม.)" : "125 mg in a final 125 mL = 1 mg/mL (10 mg/h = 10 mL/h; 15 mg/h = 15 mL/h)",
      steps: [
        { phase: th ? "ฉีดครั้งแรก" : "First bolus", details: th ? `0.25 มก./กก. ตามน้ำหนักจริง (${r0(w * 0.25)} มก.) ใน 2 นาที` : `0.25 mg/kg actual body weight (${r0(w * 0.25)} mg) over 2 min.` },
        { phase: th ? "ฉีดครั้งที่สอง (หลัง 15 นาที ถ้ายังไม่พอ)" : "Second bolus (after 15 min if needed)", details: th ? `0.35 มก./กก. (${r0(w * 0.35)} มก.) ใน 2 นาที` : `0.35 mg/kg (${r0(w * 0.35)} mg) over 2 min.` },
        { phase: th ? "หยดต่อเนื่อง" : "Infusion", details: th ? "เริ่ม 10 มก./ชม. (บางราย 5 มก./ชม.) เพิ่มครั้งละ 5 มก./ชม. สูงสุด 15 มก./ชม. นานไม่เกิน 24 ชม." : "Start 10 mg/h (5 mg/h in some), increase by 5 mg/h to a maximum of 15 mg/h, for up to 24 h." }
      ],
      pearl: th ? "ห้ามใช้ใน AF/flutter ที่มีทางลัด, VT, ความดันต่ำรุนแรง และร่วมกับ beta-blocker IV ใกล้กัน หลีกเลี่ยงใน HFrEF (ACC/AHA 2023)" : "Contraindicated in AF/flutter with an accessory pathway, VT, severe hypotension, and close to IV beta-blockers. Avoid in HFrEF (ACC/AHA 2023).",
      refs: ["lbl:diltiazem-inj#Dosage and Administration, Contraindications", "acc23-af#Table 21"]
    },
    esmolol: {
      name: "Esmolol (Brevibloc)",
      indication: th ? "ควบคุมอัตราเต้นใน SVT / AF / flutter ระยะสั้น (ฉลาก)" : "Short-term rate control in SVT / AF / flutter (label)",
      conc: th ? "สารละลายพร้อมใช้ 10 มก./มล." : "Premixed 10 mg/mL",
      steps: [
        { phase: th ? "ขนาดนำ (ไม่บังคับ)" : "Optional load", details: th ? `500 มคก./กก. (${r0(w * 0.5)} มก.) ใน 1 นาที` : `500 mcg/kg (${r0(w * 0.5)} mg) over 1 min.` },
        { phase: th ? "หยดต่อเนื่อง" : "Infusion", details: th ? `เริ่ม 50 มคก./กก./นาที (${r1(w * 50 * 60 / 10000)} มล./ชม. ที่ 10 มก./มล.) ปรับทีละ 50 ทุก 4 นาทีขึ้นไป สูงสุด 200 มคก./กก./นาที (${r1(w * 200 * 60 / 10000)} มล./ชม.) นานได้ถึง 48 ชม.` : `Start 50 mcg/kg/min (${r1(w * 50 * 60 / 10000)} mL/h at 10 mg/mL); step up by 50 at intervals of 4 min or more to a maximum of 200 mcg/kg/min (${r1(w * 200 * 60 / 10000)} mL/h), for up to 48 h.` }
      ],
      pearl: th ? "ความดันต่ำพบบ่อยที่สุด ฟื้นจากฤทธิ์ beta-blockade ส่วนใหญ่ใน 10-20 นาทีหลังหยุด ระวังการรั่วออกนอกหลอดเลือด (เนื้อตาย)" : "Hypotension is the most common adverse effect; most beta-blockade wears off 10-20 min after stopping. Avoid extravasation (necrosis reported).",
      refs: ["lbl:esmolol-brevibloc#Dosage and Administration, Clinical Pharmacology, Warnings"]
    },
    magnesium: {
      name: "Magnesium Sulfate",
      indication: th ? "Torsades de pointes (AHA 2025, AHA/ACC/HRS 2017; ขนาดยาจากรายงาน 12 ราย)" : "Torsades de pointes (AHA 2025, AHA/ACC/HRS 2017; dose from a 12-patient case series)",
      conc: th ? "ไม่ระบุความเข้มข้นในแหล่งที่ตรวจ" : "Concentration not given in the sources checked",
      steps: [
        { phase: th ? "ฉีดนำ (Tzivoni 1988)" : "Bolus (Tzivoni 1988)", details: th ? "2 ก. IV ครั้งเดียว หยุด TdP ใน 1-5 นาที ใน 9 จาก 12 ราย" : "2 g IV single bolus; stopped TdP within 1-5 min in 9 of 12." },
        { phase: th ? "ครั้งที่สอง" : "Second bolus", details: th ? "2 ก. หลัง 5-15 นาที ถ้ายังไม่หยุด (ใช้ใน 3 ราย)" : "2 g after 5-15 min if not stopped (needed in 3 patients)." },
        { phase: th ? "หยดต่อเนื่อง" : "Infusion", details: th ? "3-20 มก./นาที นาน 7-48 ชม. จน QT ต่ำกว่า 0.50 วินาที (9 จาก 12 ราย)" : "3-20 mg/min for 7-48 h until QT under 0.50 s (9 of 12 patients)." }
      ],
      pearl: th ? "ขนาดนี้มาจากรายงานผู้ป่วย 12 ราย ไม่ใช่แนวทางปฏิบัติ AHA 2025 ไม่ระบุขนาด พิษ: reflex หายและหายใจล้มเหลวเมื่อระดับใกล้ 10 mEq/L ติดตาม patellar reflex และอัตราหายใจ ลดขนาดในไตเสื่อมรุนแรง" : "This dose comes from a 12-patient case series; AHA 2025 gives no dose. Toxicity: reflexes disappear and respiratory paralysis may occur near 10 mEq/L; monitor the patellar reflex and respiratory rate. Reduce the dose in severe renal impairment.",
      refs: ["tzivoni1988#Abstract", "aha25-als#Polymorphic VT text", "aha17-va#Section 5.1.5.1", "lbl:magnesium-inj#Warnings and Precautions"]
    }
  };

  const curr = protocols[selectedDrug];

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-blue-50/60 dark:bg-blue-950/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                {lang === 'th' ? "สูตรผสมยาและการคำนวณหยดเข้าหลอดเลือดดำ (IV Infusion Protocols)" : "Emergency IV Resuscitation & Infusion Calculator"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? "คำนวณขนาดยานำร่อง อัตราหยดต่อเนื่อง และวิธีเจือจางยาฉุกเฉินตามน้ำหนักตัวผู้ป่วย" : "Bedside loading dose, drip rate, and concentration calculations adjusted for patient weight"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Patient Weight Input */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
              {lang === 'th' ? "น้ำหนักตัวผู้ป่วย (Patient Weight):" : "Patient Weight (kg):"}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="30"
                max="180"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-20 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm font-extrabold text-center text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs font-bold text-slate-500">kg</span>
            </div>
          </div>

          {/* Drug Selection Rail */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {Object.entries(protocols).map(([k, p]) => (
              <button
                key={k}
                onClick={() => setSelectedDrug(k)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${selectedDrug === k ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
              >
                {p.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Protocol Details Card */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">{curr.name}</h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{curr.indication}</p>
              <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500 uppercase text-[10px] block">Standard Concentration:</span>
                {curr.conc}
              </div>
            </div>

            <div className="space-y-2.5">
              {curr.steps.map((st, i) => (
                <div key={i} className="p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">{st.phase}</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {st.details}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/30 text-amber-950 dark:text-amber-200 text-xs">
              <span className="font-bold uppercase tracking-wider text-[10px] block mb-1 text-amber-700 dark:text-amber-400">
                {lang === 'th' ? "ข้อควรจำทางคลินิก (Clinical Pearls & Administration)" : "Clinical Pearls & Precautions"}
              </span>
              <p>{curr.pearl}</p>
              <SourceLine refs={curr.refs} lang={lang} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/50">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-lg transition-colors">
            {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Organ Impairment & Renal/Hepatic Dosing Modal ---
function OrganDosingModal({ isOpen, onClose, lang, drugs }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // CrCl calculator
  const [age, setAge] = useState('65');
  const [weight, setWeight] = useState('60');
  const [scr, setScr] = useState('1.2');
  const [gender, setGender] = useState('male');

  // Cockcroft-Gault CrCl = [(140 - age) * weight] / [72 * Scr] (* 0.85 if female)
  const ageVal = parseFloat(age) || 60;
  const wtVal = parseFloat(weight) || 60;
  const scrVal = parseFloat(scr) || 1.0;
  const rawCrcl = ((140 - ageVal) * wtVal) / (72 * scrVal);
  const calculatedCrcl = Math.round(gender === 'female' ? rawCrcl * 0.85 : rawCrcl);

  const filteredDrugs = drugs.filter(d => 
    d.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    [...d.brandNames, ...d.thaiBrands].some(b => b.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-teal-50/60 dark:bg-teal-950/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-xl">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                {lang === 'th' ? "แนวทางการปรับขนาดยาตามการทำงานของไตและตับ (Renal & Hepatic Guide)" : "Renal & Hepatic Dosing Adjustments"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? "โปรแกรมคำนวณ Cockcroft-Gault CrCl และตารางปรับขนาดยาต้านหัวใจเต้นผิดจังหวะในโรคไตวายเรื้อรังและตับแข็ง" : "Cockcroft-Gault CrCl calculator & comprehensive renal/hepatic dosing matrix"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Cockcroft Gault Calculator Widget */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2">
                <Calculator className="w-4 h-4 text-teal-600" />
                {lang === 'th' ? "คำนวณค่า Creatinine Clearance (Cockcroft-Gault CrCl)" : "Cockcroft-Gault CrCl Calculator"}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Calculated CrCl:</span>
                <span className="text-base font-extrabold text-teal-600 dark:text-teal-400">
                  {calculatedCrcl} <small className="text-xs font-normal">mL/min</small>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Age (years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Serum Cr (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={scr}
                  onChange={(e) => setScr(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold cursor-pointer"
                >
                  <option value="male">Male</option>
                  <option value="female">Female (*0.85)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={lang === 'th' ? "พิมพ์ชื่อยาเพื่อค้นหาการปรับขนาดยา..." : "Filter drugs for organ dosing..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Matrix of Renal Adjustments */}
          <div className="space-y-4">
            {filteredDrugs.map((d) => (
              <div key={d.id} className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{d.genericName}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">({d.brandNames.join(', ')})</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {d.classFullName.split(' - ')[0]}
                  </span>
                </div>

                {/* Renal Tiers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 dark:bg-slate-750 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block">CrCl &gt; 50</span>
                    <p className="font-medium text-slate-700 dark:text-slate-200 mt-0.5"><V t={d.renalAdjustment.crcl50} /></p>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-750 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block">CrCl 30-50</span>
                    <p className="font-medium text-slate-700 dark:text-slate-200 mt-0.5"><V t={d.renalAdjustment.crcl30_50} /></p>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-750 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block">CrCl 10-30</span>
                    <p className="font-medium text-slate-700 dark:text-slate-200 mt-0.5"><V t={d.renalAdjustment.crcl10_30} /></p>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-750 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block">CrCl &lt; 10 / ESRD</span>
                    <p className="font-medium text-slate-700 dark:text-slate-200 mt-0.5"><V t={d.renalAdjustment.crclLess10} /></p>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-750 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block">Hemodialysis (HD)</span>
                    <p className="font-medium text-slate-700 dark:text-slate-200 mt-0.5"><V t={d.renalAdjustment.hd} /></p>
                  </div>
                </div>

                {/* Hepatic Adjustment */}
                <div className="p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-950 dark:text-amber-200">
                  <span className="font-bold text-[10px] uppercase tracking-wide block mb-0.5 text-amber-700 dark:text-amber-400">
                    Hepatic / Cirrhosis Adjustment:
                  </span>
                  <p className="font-medium"><V t={d.hepaticAdjustment} /><SourceLine refs={[...d.refs.renal, ...d.refs.hepatic]} lang={lang} /></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/50">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-lg transition-colors">
            {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Drug Interactions Modal ---
function DrugInteractionsModal({ isOpen, onClose, lang }) {

  const th = lang === 'th';
  const interactionCategories = [
    {
      group: th ? "Digoxin: ระดับยาเพิ่มขึ้น" : "Digoxin levels raised",
      severity: "High",
      items: [
        { drug: "Amiodarone", effect: th ? "Digoxin เพิ่ม 70%: ลด digoxin ลงครึ่งหนึ่งหรือหยุด" : "Digoxin up 70%: reduce digoxin by half or stop it.", refs: ["lbl:digoxin-tab#Drug Interactions", "lbl:amiodarone-tab#Drug Interactions"] },
        { drug: "Dronedarone", effect: th ? "AUC digoxin เพิ่ม 150%: พิจารณาหยุด digoxin ถ้าใช้ต่อให้ลดครึ่งหนึ่งและตรวจระดับ" : "Digoxin AUC up 150%: consider stopping digoxin; if continued, halve the dose and check levels.", refs: ["lbl:dronedarone-multaq#Drug Interactions", "lbl:digoxin-tab#Drug Interactions"] },
        { drug: "Propafenone", effect: th ? "AUC digoxin เพิ่ม 60-270%: ตรวจระดับและปรับขนาด" : "Digoxin AUC up 60-270%: check levels and adjust.", refs: ["lbl:propafenone-ir#Drug Interactions"] },
        { drug: "Quinidine / Verapamil", effect: th ? "Quinidine: digoxin อาจเพิ่ม 2 เท่า; verapamil (รับประทาน): เพิ่ม 50-75% ในสัปดาห์แรก" : "Quinidine: digoxin may double; oral verapamil: up 50-75% in the first week.", refs: ["lbl:quinidine-sulfate#Drug Interactions", "lbl:verapamil-tab#Precautions"] },
        { drug: th ? "ข้อแนะนำทั่วไป (ฉลาก digoxin)" : "General rule (digoxin label)", effect: th ? "เมื่อยาที่เพิ่มระดับ digoxin เกิน 50%: ตรวจระดับก่อนเริ่ม ลด digoxin 30-50% หรือเว้นระยะการให้ และติดตามต่อ" : "For drugs that raise digoxin more than 50%: measure levels before starting, cut the digoxin dose by 30-50% or space doses, and keep monitoring.", refs: ["lbl:digoxin-tab#Drug Interactions"] }
      ]
    },
    {
      group: th ? "Warfarin และยาต้านการแข็งตัวของเลือด" : "Warfarin and other anticoagulants",
      severity: "High",
      items: [
        { drug: "Amiodarone + warfarin", effect: th ? "ลดขนาด warfarin ลง 1/3 ถึง 1/2 และติดตาม prothrombin time" : "Reduce warfarin by one-third to one-half and monitor prothrombin time.", refs: ["lbl:amiodarone-tab#Drug Interactions"] },
        { drug: "Dronedarone + warfarin", effect: th ? "INR สูงขึ้น (ถึง 5 ขึ้นไป) มักภายใน 1 สัปดาห์: ตรวจ INR" : "INR rises (to 5 or more), usually within 1 week: monitor INR.", refs: ["lbl:dronedarone-multaq#Warnings, Drug Interactions"] },
        { drug: "Propafenone / Quinidine + warfarin", effect: th ? "Propafenone เพิ่มระดับ warfarin 39%; quinidine เสริมฤทธิ์ warfarin: ตรวจ INR" : "Propafenone raises warfarin levels 39%; quinidine potentiates warfarin: monitor INR.", refs: ["lbl:propafenone-ir#Drug Interactions", "lbl:quinidine-sulfate#Drug Interactions"] },
        { drug: "Dronedarone + dabigatran", effect: th ? "ลด dabigatran เป็น 75 มก. วันละ 2 ครั้ง ถ้า CrCl 30-50; หลีกเลี่ยงถ้า CrCl 15-30" : "Reduce dabigatran to 75 mg twice daily if CrCl 30-50; avoid if CrCl 15-30.", refs: ["lbl:dronedarone-multaq#Drug Interactions"] }
      ]
    },
    {
      group: th ? "ยาที่ยับยั้งการนำไฟฟ้า / หัวใจเต้นช้า" : "Conduction and bradycardia",
      severity: "Critical",
      items: [
        { drug: th ? "Beta-blocker IV + diltiazem หรือ verapamil IV" : "IV beta-blocker + IV diltiazem or verapamil", effect: th ? "ห้ามให้ร่วมกันหรือห่างกันไม่กี่ชั่วโมง; มีรายงานหัวใจหยุดเต้นเสียชีวิตเมื่อให้ esmolol กับ verapamil IV" : "Do not give together or within a few hours; fatal cardiac arrests reported with esmolol plus IV verapamil.", refs: ["lbl:diltiazem-inj#Contraindications", "lbl:verapamil-inj#Contraindications", "lbl:esmolol-brevibloc#Contraindications"] },
        { drug: "Amiodarone + sofosbuvir", effect: th ? "หัวใจเต้นช้ามีอาการ จนต้องใส่ pacemaker" : "Symptomatic bradycardia requiring pacemakers.", refs: ["lbl:amiodarone-tab#Drug Interactions"] },
        { drug: "Disopyramide + verapamil", effect: th ? "ไม่ให้ disopyramide ภายใน 48 ชม. ก่อน หรือ 24 ชม. หลัง verapamil" : "Do not give disopyramide within 48 h before or 24 h after verapamil.", refs: ["lbl:disopyramide-norpace#Drug Interactions", "lbl:verapamil-inj#Drug Interactions"] }
      ]
    },
    {
      group: th ? "QT ยาว / torsades" : "QT prolongation / torsades",
      severity: "Critical",
      items: [
        { drug: "Dofetilide", effect: th ? "ห้ามใช้ร่วมกับ verapamil, cimetidine, trimethoprim, ketoconazole, hydrochlorothiazide; ไม่ควรใช้กับ prochlorperazine, dolutegravir, megestrol" : "Contraindicated with verapamil, cimetidine, trimethoprim, ketoconazole, hydrochlorothiazide; should not be used with prochlorperazine, dolutegravir, megestrol.", refs: ["lbl:dofetilide-tikosyn#Contraindications"] },
        { drug: "Dronedarone", effect: th ? "ห้ามใช้ร่วมกับยาที่ทำให้ QT ยาว (phenothiazine, tricyclic, macrolide บางตัวทางปาก, ยา Class I และ III) และยายับยั้ง CYP3A แรง" : "Contraindicated with QT-prolonging drugs (phenothiazines, tricyclics, some oral macrolides, Class I and III antiarrhythmics) and strong CYP3A inhibitors.", refs: ["lbl:dronedarone-multaq#Contraindications"] },
        { drug: "Ibutilide", effect: th ? "ในการศึกษา งดยา Class I และ III อื่น 5 ค่าครึ่งชีวิตก่อน และ 4 ชม. หลังให้" : "In trials, other Class I and III drugs were withheld for 5 half-lives before and 4 h after.", refs: ["lbl:ibutilide-corvert#Precautions"] },
        { drug: "Sotalol", effect: th ? "หยุดยาต้านหัวใจเต้นผิดจังหวะอื่นก่อนเริ่ม (เฝ้าดู 2-3 ค่าครึ่งชีวิต); โพแทสเซียมต้องไม่ต่ำกว่า 4 mEq/L" : "Withdraw other antiarrhythmics before starting (monitor 2-3 half-lives); potassium must not be under 4 mEq/L.", refs: ["lbl:sotalol-betapace#Dosage and Administration, Contraindications"] }
      ]
    },
    {
      group: th ? "CYP3A / สแตติน / ยาอื่น" : "CYP3A, statins and others",
      severity: "High",
      items: [
        { drug: th ? "Simvastatin" : "Simvastatin", effect: th ? "Amiodarone: ไม่เกิน 20 มก./วัน; dronedarone: ไม่เกิน 10 มก./วัน; ranolazine: ไม่เกิน 20 มก./วัน" : "With amiodarone: max 20 mg/day; dronedarone: max 10 mg/day; ranolazine: max 20 mg/day.", refs: ["lbl:amiodarone-tab#Drug Interactions", "lbl:dronedarone-multaq#Drug Interactions", "lbl:ranolazine-er#Drug Interactions"] },
        { drug: "Flecainide + amiodarone", effect: th ? "ระดับ flecainide อาจเพิ่ม 2 เท่า: ลด flecainide ลง 50% และตรวจระดับ" : "Flecainide levels may double: reduce flecainide by 50% and check levels.", refs: ["lbl:flecainide-tab#Dosage and Administration, Precautions"] },
        { drug: th ? "Diltiazem + ยาที่ผ่าน CYP3A4" : "Diltiazem + CYP3A4 substrates", effect: th ? "AUC midazolam และ triazolam เพิ่ม 3-4 เท่า; ต้องลด cyclosporine 15-48%" : "Midazolam and triazolam AUC up 3-4 fold; cyclosporine doses cut by 15-48%.", refs: ["lbl:diltiazem-inj#Drug Interactions"] },
        { drug: "Lidocaine + beta-blocker / CYP1A2 / CYP3A4 inhibitor", effect: th ? "ระดับ lidocaine สูงขึ้น (propranolol: เพิ่ม 25%; fluvoxamine: AUC เพิ่ม 71%)" : "Higher lidocaine levels (propranolol: up 25%; fluvoxamine: AUC up 71%).", refs: ["lbl:lidocaine-premix#Precautions", "lbl:propranolol-inj#Drug Interactions"] }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-amber-50/60 dark:bg-amber-950/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-xl">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                {lang === 'th' ? "ปฏิกิริยาระหว่างยาที่สำคัญทางคลินิก (Drug-Drug Interactions Matrix)" : "Critical Antiarrhythmic Drug-Drug Interactions"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? "ตารางตรวจสอบปฏิกิริยากับยาต้านการแข็งตัวของเลือด (Warfarin/DOACs), Digoxin, Statins และยายืด QT" : "High-alert interactions with Anticoagulants, Digoxin, Statins, and QT-prolongers"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {interactionCategories.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                  {cat.group}
                </h3>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${cat.severity === 'Critical' ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300' : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'}`}>
                  {cat.severity === 'Critical' ? (lang === 'th' ? 'วิกฤต' : 'Critical') : (lang === 'th' ? 'สูง' : 'High')}
                </span>
              </div>

              <div className="space-y-2">
                {cat.items.map((it, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800/60 space-y-1">
                    <span className="font-extrabold text-xs text-slate-900 dark:text-slate-100 block">{it.drug}</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {it.effect}
                    </p>
                    <SourceLine refs={it.refs} lang={lang} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/50">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-lg transition-colors">
            {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Multi-Drug Comparison Modal ---
function CompareModal({ isOpen, onClose, lang, compareList, onRemove }) {

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white dark:bg-slate-900 w-full max-w-6xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                {lang === 'th' ? "ตารางเปรียบเทียบยาต้านหัวใจเต้นผิดจังหวะ (Comparison Matrix)" : "Antiarrhythmic Drug Comparison Matrix"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? "เปรียบเทียบสรีรวิทยาไฟฟ้า กลไก ขนาดยา ความปลอดภัย และสถานะบัญชียาหลักแบบเคียงข้างกัน" : "Side-by-side comparative electrophysiology, clinical dosing, safety, and NLEM status"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto flex-1">
          {compareList.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
              {lang === 'th' ? "ยังไม่ได้เลือกยาเพื่อเปรียบเทียบ (เลือกยาจากการ์ดหรือตารางได้สูงสุด 3 ชนิด)" : "No drugs selected for comparison. Select up to 3 drugs from the cards or list."}
            </div>
          ) : (
            <table className="w-full border-collapse text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-750">
                  <th className="p-3 bg-slate-50 dark:bg-slate-800/80 font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px] w-48">Parameter</th>
                  {compareList.map((d) => (
                    <th key={d.id} className="p-3 bg-slate-50 dark:bg-slate-800/80 font-bold text-slate-800 dark:text-slate-100 text-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <span>{d.genericName}</span>
                          <span className="block text-[11px] font-normal text-slate-500 dark:text-slate-400">{d.brandNames[0]}</span>
                        </div>
                        <button onClick={() => onRemove(d.id)} className="text-slate-400 hover:text-rose-500 p-1">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Vaughan Williams Class</td>
                  {compareList.map(d => (
                    <td key={d.id} className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300">
                        Class {d.vwClass}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Primary Target / Channel</td>
                  {compareList.map(d => <td key={d.id} className="p-3 text-slate-700 dark:text-slate-300">{d.primaryTarget}</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Action Potential Duration (APD)</td>
                  {compareList.map(d => <td key={d.id} className="p-3 font-semibold text-slate-700 dark:text-slate-300"><V t={d.actionPotential.apd} /></td>)}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">ECG Effects (PR / QRS / QTc)</td>
                  {compareList.map(d => (
                    <td key={d.id} className="p-3 text-slate-700 dark:text-slate-300">
                      <div>PR: {d.ecgEffects.pr}</div>
                      <div>QRS: {d.ecgEffects.qrs}</div>
                      <div className="font-bold text-rose-600 dark:text-rose-400">QTc: {d.ecgEffects.qtc}</div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{lang === 'th' ? 'HFrEF (ตามแหล่งอ้างอิง)' : 'HFrEF (per sources)'}</td>
                  {compareList.map(d => (
                    <td key={d.id} className="p-3">
                      <span className={`inline-flex items-center gap-1 font-bold ${d.safeInHfref === true ? 'text-emerald-600 dark:text-emerald-400' : d.safeInHfref === false ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`}>
                        {d.safeInHfref === true ? <Check className="w-3.5 h-3.5" /> : d.safeInHfref === false ? <X className="w-3.5 h-3.5" /> : null}
                        {flagText(d.safeInHfref, lang, 'No caution found', 'ไม่พบข้อควรระวัง', 'Caution / avoid', 'ระวัง / หลีกเลี่ยง')}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{lang === 'th' ? 'CAD / หลัง MI (ตามแหล่งอ้างอิง)' : 'CAD / post-MI (per sources)'}</td>
                  {compareList.map(d => (
                    <td key={d.id} className="p-3">
                      <span className={`inline-flex items-center gap-1 font-bold ${d.safeCad === true ? 'text-emerald-600 dark:text-emerald-400' : d.safeCad === false ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`}>
                        {d.safeCad === true ? <Check className="w-3.5 h-3.5" /> : d.safeCad === false ? <X className="w-3.5 h-3.5" /> : null}
                        {flagText(d.safeCad, lang, 'No caution found', 'ไม่พบข้อควรระวัง', 'Caution / avoid', 'ระวัง / หลีกเลี่ยง')}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{lang === 'th' ? 'QT / torsades ในฉลากยา' : 'QT / torsades in label'}</td>
                  {compareList.map(d => (
                    <td key={d.id} className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${d.qtRisk === 'Boxed' ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300' : d.qtRisk === 'Warning' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                        {qtLabel(d.qtRisk, lang)}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Half-Life (t1/2)</td>
                  {compareList.map(d => <td key={d.id} className="p-3 text-slate-700 dark:text-slate-300 font-medium"><V t={d.pharmacokinetics.halfLife} /></td>)}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{lang === 'th' ? 'บัญชียาหลัก 2569' : 'Thai NLEM 2569'}</td>
                  {compareList.map(d => (
                    <td key={d.id} className="p-3">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {nlemShort(d.nlem, lang)}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/50">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-lg transition-colors">
            {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Detail Monograph Modal ---
function DetailModal({ drug, onClose, lang, onOpenApModal }) {
  const [activeTab, setActiveTab] = useState('dosing');

  const tabs = [
    { id: 'overview', label: lang === 'th' ? 'ภาพรวมและกลไก' : 'Overview & Mechanism', short: lang === 'th' ? 'ภาพรวม' : 'Overview' },
    { id: 'dosing', label: lang === 'th' ? 'ขนาดยาและการบริหาร' : 'Dosing & Administration', short: lang === 'th' ? 'ขนาดยา' : 'Dosing' },
    { id: 'organ', label: lang === 'th' ? 'การปรับยาตามไตและตับ' : 'Organ Adjustments', short: lang === 'th' ? 'ไต / ตับ' : 'Kidney / Liver' },
    { id: 'safety', label: lang === 'th' ? 'ข้อห้ามและคำเตือนรุนแรง' : 'Warnings & Cautions', short: lang === 'th' ? 'คำเตือน' : 'Warnings' },
    { id: 'interactions', label: lang === 'th' ? 'ปฏิกิริยาระหว่างยา' : 'Interactions & Monitoring', short: lang === 'th' ? 'ยาตีกัน' : 'Interactions' },
    { id: 'nlem', label: lang === 'th' ? 'บัญชียาหลักแห่งชาติ 2569' : 'Thai NLEM 2569', short: lang === 'th' ? 'บัญชียา' : 'NLEM' }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <DrugIcon routes={drug.routes} vwClass={drug.vwClass} lang={lang} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-100">
                  {drug.genericName}
                </h2>
                <button
                  type="button"
                  onClick={() => onOpenApModal && onOpenApModal(drug.vwClass)}
                  className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/60 dark:hover:bg-indigo-900 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700 transition-all flex items-center gap-1 cursor-pointer"
                  title="Click to view Action Potential curve"
                >
                  <span>Class {drug.vwClass}</span>
                  <Zap className="w-3 h-3 text-amber-500" />
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {drug.brandNames.join(', ')} • {drug.classFullName}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary strip: the first adult dose line and the key warning stay in view on every tab */}
        <div className="px-4 sm:px-6 py-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1" data-detail-summary>
          {drug.mims && drug.mims.rows.length > 0 && <p className="text-[11px] leading-snug text-slate-800 dark:text-slate-100 line-clamp-2"><span className="font-bold text-indigo-700 dark:text-indigo-300">{lang === 'th' ? drug.mims.rows[0].lTh : drug.mims.rows[0].lEn}:</span> {lang === 'th' ? drug.mims.rows[0].th : drug.mims.rows[0].en}</p>}
          <p className="text-[11px] leading-snug text-rose-800 dark:text-rose-300 line-clamp-2"><span className="font-bold">{lang === 'th' ? 'คำเตือน: ' : 'Warning: '}</span>{drug.cautionsAndWarnings[0]}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-800 px-2 sm:px-6 bg-slate-50 dark:bg-slate-850">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 sm:py-3 px-2 sm:px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              <span className="sm:hidden">{tab.short}</span><span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="font-bold text-xs uppercase text-slate-500 dark:text-slate-400 block">Primary Target & Channel Mechanism</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200"><V t={drug.primaryTarget} /></p>
              </div>
              <RegBlock d={drug} lang={lang} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-750 space-y-2">
                  <span className="font-bold text-xs uppercase text-slate-500 dark:text-slate-400 block">Action Potential Modifications</span>
                  <div className="space-y-1 text-xs">
                    <ApPhases drug={drug} lang={lang} />
                  </div>
                  {drug.vwClass !== 'Other' && (() => { const fx = apClassEffects(lang); return <ApCurve curr={fx[drug.vwClass]} normal={fx.normal} lang={lang} />; })()}
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-750 space-y-2">
                  <span className="font-bold text-xs uppercase text-slate-500 dark:text-slate-400 block">Surface ECG Manifestations</span>
                  <div className="space-y-1 text-xs">
                    <div><span className="font-semibold text-slate-500">PR Interval:</span> <V t={drug.ecgEffects.pr} /></div>
                    <div><span className="font-semibold text-slate-500">QRS Duration:</span> <V t={drug.ecgEffects.qrs} /></div>
                    <div><span className="font-semibold text-slate-500">QTc Interval:</span> <span className="font-bold text-rose-600"><V t={drug.ecgEffects.qtc} /></span></div>
                    <div><span className="font-semibold text-slate-500">Heart Rate:</span> <V t={drug.ecgEffects.hr} /></div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-750 space-y-2">
                <span className="font-bold text-xs uppercase text-slate-500 dark:text-slate-400 block">Pharmacokinetic Profile</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div><span className="font-semibold text-slate-500 block">Onset:</span> <V t={drug.pharmacokinetics.onset} /></div>
                  <div><span className="font-semibold text-slate-500 block">Peak:</span> <V t={drug.pharmacokinetics.peak} /></div>
                  <div><span className="font-semibold text-slate-500 block">Half-life (t1/2):</span> <V t={drug.pharmacokinetics.halfLife} /></div>
                  <div className="col-span-2 sm:col-span-3"><span className="font-semibold text-slate-500 block">Metabolism:</span> <V t={drug.pharmacokinetics.metabolism} /></div>
                  <div className="col-span-2 sm:col-span-3"><span className="font-semibold text-slate-500 block">Excretion:</span> <V t={drug.pharmacokinetics.excretion} /></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-2 -mt-2">
              <SourceLine refs={drug.refs.mech} lang={lang} />
              <SourceLine refs={drug.refs.pk} lang={lang} />
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-750 space-y-1 text-xs mt-2" data-flags>
                <span className="font-bold text-xs uppercase text-slate-500 dark:text-slate-400 block">{lang === 'th' ? 'ข้อควรระวังตามแหล่งอ้างอิง' : 'Safety flags from the sources'}</span>
                <div><span className="font-semibold text-slate-500">HFrEF: </span>{flagText(drug.safeInHfref, lang, 'No caution found', 'ไม่พบข้อควรระวัง', 'Caution / avoid', 'ระวัง / หลีกเลี่ยง')}</div>
                <div><span className="font-semibold text-slate-500">CAD / post-MI: </span>{flagText(drug.safeCad, lang, 'No caution found', 'ไม่พบข้อควรระวัง', 'Caution / avoid', 'ระวัง / หลีกเลี่ยง')}</div>
                <div><span className="font-semibold text-slate-500">QT: </span>{qtLabel(drug.qtRisk, lang)}</div>
                <SourceLine refs={drug.refs.flags} lang={lang} />
              </div>
            </div>
          )}

          {activeTab === 'dosing' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/30 space-y-2" data-mims>
                <span className="font-bold text-xs uppercase text-indigo-700 dark:text-indigo-400 block">{lang === 'th' ? 'ขนาดยาแนะนำตาม MIMS Thailand (ผู้ใหญ่)' : 'Recommended dose per MIMS Thailand (adult)'}</span>
                {drug.mims ? (
                  <div className="space-y-2.5">
                    {drug.mims.rows.map((row, i) => (
                      <div key={i} className="pl-3 border-l-2 border-indigo-300 dark:border-indigo-700" data-mims-row>
                        <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">{lang === 'th' ? row.lTh : row.lEn}</div>
                        <p className={`text-sm leading-relaxed ${drug.mims.na ? 'text-slate-600 dark:text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>{lang === 'th' ? row.th : row.en}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-medium italic text-slate-500 dark:text-slate-400">N/A</p>
                )}
                <div className="text-xs text-slate-600 dark:text-slate-300" data-mims-brands>
                  <span className="font-bold text-slate-500">{lang === 'th' ? 'ชื่อการค้าในไทย (MIMS): ' : 'Thai brands (MIMS): '}</span>
                  {drug.thaiBrands.length ? drug.thaiBrands.join(', ') + (drug.thaiBrandsPartial ? (lang === 'th' ? ' และอื่น ๆ (ดูใน MIMS)' : ' and more (see MIMS)') : '') : <span className="italic text-slate-500 dark:text-slate-400">{lang === 'th' ? 'MIMS ไม่มีรายชื่อ' : 'none listed in MIMS'}</span>}
                </div>
                <SourceLine refs={['mims:' + drug.id]} lang={lang} />
              </div>
              <GuidelineBlock id="af" title={lang === 'th' ? 'ตามแนวทาง ESC 2024 สำหรับ AF' : 'Per the 2024 ESC atrial fibrillation guideline'} rows={drug.esc && drug.esc.rows} naText={lang === 'th' ? '(ยานี้ไม่อยู่ในแนวทาง ESC 2024 สำหรับ AF)' : '(not covered by the ESC 2024 AF guideline)'} refKey="esc24-af" lang={lang} />
              <GuidelineBlock id="va" title={lang === 'th' ? 'ตามแนวทาง ESC 2022 สำหรับ ventricular arrhythmia' : 'Per the 2022 ESC ventricular arrhythmia guideline'} rows={drug.escVa && drug.escVa.rows} naText={lang === 'th' ? '(ยานี้ไม่อยู่ในแนวทาง ESC 2022 สำหรับ ventricular arrhythmia)' : '(not covered by the ESC 2022 ventricular arrhythmia guideline)'} refKey="esc22-va" lang={lang} />
              <GuidelineBlock id="svt" title={lang === 'th' ? 'ตามแนวทาง ESC 2019 สำหรับ supraventricular tachycardia' : 'Per the 2019 ESC supraventricular tachycardia guideline'} rows={drug.escSvt && drug.escSvt.rows} naText={lang === 'th' ? '(ยานี้ไม่อยู่ในแนวทาง ESC 2019 สำหรับ SVT)' : '(not covered by the ESC 2019 SVT guideline)'} refKey="esc19-svt" lang={lang} />
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30 space-y-2">
                <span className="font-bold text-xs uppercase text-blue-700 dark:text-blue-400 block">Acute / Resuscitation Dosing</span>
                <p className="font-medium text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {lang === 'th' ? drug.acuteDose.th : drug.acuteDose.en}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-2">
                <span className="font-bold text-xs uppercase text-emerald-700 dark:text-emerald-400 block">Chronic Maintenance Dosing</span>
                <p className="font-medium text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {lang === 'th' ? drug.maintenanceDose.th : drug.maintenanceDose.en}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800/60">
                <span className="font-bold text-xs uppercase text-slate-500 dark:text-slate-400 block mb-1">Available Routes</span>
                <div className="flex gap-2">
                  {drug.routes.map(r => (
                    <span key={r} className="px-2.5 py-1 rounded-md text-xs font-bold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100">
                      {r === 'IV' ? 'Intravenous (IV)' : 'Oral (PO)'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dosing' && <SourceLine refs={drug.refs.dose} lang={lang} />}

          {activeTab === 'organ' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="font-bold text-xs uppercase text-slate-500 dark:text-slate-400 block">Renal Clearance Adjustments</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block text-[10px]">CrCl &gt; 50 mL/min:</span>
                    <p className="font-medium text-slate-700 dark:text-slate-300 mt-1"><V t={drug.renalAdjustment.crcl50} /></p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block text-[10px]">CrCl 30-50 mL/min:</span>
                    <p className="font-medium text-slate-700 dark:text-slate-300 mt-1"><V t={drug.renalAdjustment.crcl30_50} /></p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block text-[10px]">CrCl 10-30 mL/min:</span>
                    <p className="font-medium text-slate-700 dark:text-slate-300 mt-1"><V t={drug.renalAdjustment.crcl10_30} /></p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block text-[10px]">CrCl &lt; 10 mL/min:</span>
                    <p className="font-medium text-slate-700 dark:text-slate-300 mt-1"><V t={drug.renalAdjustment.crclLess10} /></p>
                  </div>
                  <div className="sm:col-span-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block text-[10px]">Hemodialysis Clearance:</span>
                    <p className="font-medium text-slate-700 dark:text-slate-300 mt-1"><V t={drug.renalAdjustment.hd} /></p>
                  </div>
                </div>
                <SourceLine refs={drug.refs.renal} lang={lang} />
              </div>

              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/30 space-y-1">
                <span className="font-bold text-xs uppercase text-amber-700 dark:text-amber-400 block">Hepatic Impairment</span>
                <p className="font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  <V t={drug.hepaticAdjustment} />
                </p>
                <SourceLine refs={drug.refs.hepatic} lang={lang} />
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-4">
              {/* Warnings List */}
              <div className="space-y-2">
                <span className="font-bold text-xs uppercase text-rose-600 dark:text-rose-400 block">
                  {lang === 'th' ? 'คำเตือน (boxed warning) และข้อควรระวังสำคัญ' : 'Boxed Warnings & Key Cautions'}
                </span>
                {drug.cautionsAndWarnings.map((w, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/60 dark:bg-rose-950/30 text-rose-950 dark:text-rose-200 text-xs font-medium leading-relaxed flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </div>
                ))}
                <SourceLine refs={drug.refs.warn} lang={lang} />
              </div>

              {/* Contraindications */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-xs uppercase text-slate-500 block">{lang === 'th' ? 'ข้อห้ามใช้' : 'Contraindications'}</span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {drug.contraindications.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                <SourceLine refs={drug.refs.contra} lang={lang} />
              </div>

              {/* Adverse Effects */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-xs uppercase text-slate-500 block">{lang === 'th' ? 'อาการไม่พึงประสงค์' : 'Adverse Effects'}</span>
                <div className="flex flex-wrap gap-1.5">
                  {drug.adverseEffects.map((ae, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {ae}
                    </span>
                  ))}
                </div>
                <SourceLine refs={drug.refs.adverse} lang={lang} />
              </div>
            </div>
          )}

          {activeTab === 'interactions' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="font-bold text-xs uppercase text-slate-500 dark:text-slate-400 block">Drug-Drug Interactions</span>
                {drug.interactions.map((it, i) => (
                  <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300">
                    <V t={it} />
                  </div>
                ))}
                <SourceLine refs={drug.refs.interact} lang={lang} />
              </div>

              <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/30 space-y-2">
                <span className="font-bold text-xs uppercase text-indigo-700 dark:text-indigo-400 block">Clinical Monitoring Checklist</span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {drug.monitoring.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
                <SourceLine refs={drug.refs.monitor} lang={lang} />
              </div>
            </div>
          )}

          {activeTab === 'nlem' && (
            <div className="space-y-3" data-nlem>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800/60 space-y-2">
                <span className="font-bold text-xs uppercase text-slate-500 dark:text-slate-400 block">{lang === 'th' ? 'บัญชียาหลักแห่งชาติ พ.ศ. 2569' : 'Thai National List of Essential Medicines 2569 (2026)'}</span>
                <span className={`inline-block px-2.5 py-1 rounded-md font-extrabold text-xs ${drug.nlem.list ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>{nlemText(drug.nlem, lang)}</span>
                {(drug.nlem.items || []).map((it, i) => (
                  <div key={i} className="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700 pt-2">
                    <div className="font-semibold">{it.form}</div>
                    <div><span className="text-slate-500">{lang === 'th' ? 'เงื่อนไข: ' : 'Condition: '}</span>{it.cond}</div>
                  </div>
                ))}
                {!drug.nlem.list && <p className="text-xs text-slate-600 dark:text-slate-300">{lang === 'th' ? 'ไม่พบรายการยานี้ในบัญชียาหลักแห่งชาติ พ.ศ. 2569' : 'This drug is not listed in NLEM 2569.'}</p>}
                <SourceLine refs={drug.refs.nlem} lang={lang} />
              </div>
              <p className="text-[11px] text-slate-500">{lang === 'th' ? 'สถานะทะเบียนยา อย.ไทย ยังไม่ได้ตรวจสอบ' : 'Thai FDA registration status: not checked.'}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/50">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-lg transition-colors">
            {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Printable Ward Reference Sheet ---
// Print a sheet: the CSS in styles.css hides everything except #patient-sheet-print while the class is on <html>.
const printSheet = () => {
  const h = document.documentElement;
  const done = () => { h.classList.remove('printing-sheet'); window.removeEventListener('afterprint', done); };
  h.classList.add('printing-sheet');
  window.addEventListener('afterprint', done);
  window.print();
};

// One-page dose sheet for a single drug: the adult dose from MIMS, what the ESC guidelines say, the key warning and availability.
function DoseSheet({ drug, lang, onClose }) {
  const th = lang === 'th';
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  const blocks = [
    ['MIMS Thailand', th ? 'ขนาดยาผู้ใหญ่ (MIMS Thailand)' : 'Adult dose (MIMS Thailand)', drug.mims],
    ['ESC AF 2024', th ? 'ESC 2024 AF' : 'ESC 2024 AF guideline', drug.esc],
    ['ESC VA 2022', th ? 'ESC 2022 ventricular arrhythmia' : 'ESC 2022 ventricular arrhythmia guideline', drug.escVa],
    ['ESC SVT 2019', th ? 'ESC 2019 SVT' : 'ESC 2019 SVT guideline', drug.escSvt]
  ].filter(([, , s]) => s && s.rows && s.rows.length);
  const plain = () => [
    drug.genericName + ' (Class ' + drug.vwClass + '; ' + drug.routes.join(' + ') + ')',
    ...(drug.thaiBrands.length ? ['TH brands (MIMS): ' + drug.thaiBrands.join(', ')] : []),
    '',
    ...blocks.flatMap(([n, , s]) => [n + ':', ...s.rows.map(r => '- ' + (th ? r.lTh : r.lEn) + ': ' + (th ? r.th : r.en))]),
    '',
    'Warning: ' + drug.cautionsAndWarnings[0],
    'Availability: ' + REG_COUNTRIES.map(c => c.toUpperCase() + ' ' + drug.reg[c]).join(', '),
    'Antiarrhythmic Drug Guide (decision support only; check the product label).'
  ].join('\n');
  const copy = async () => { try { await navigator.clipboard.writeText(plain()); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) { /* clipboard blocked */ } };
  const node = (
    <div id="patient-sheet-print" data-dose-sheet className="fixed inset-0 bg-white z-[9999] overflow-y-auto p-4 sm:p-8 text-slate-900 font-sans print:p-0">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-2 border-b-2 border-slate-900 pb-3 print:hidden">
          <h1 className="text-lg font-extrabold">{th ? 'ใบสรุปขนาดยา' : 'Dose sheet'}</h1>
          <div className="flex gap-2 flex-wrap justify-end">
            <button type="button" onClick={copy} data-copy-sheet className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold">{copied ? (th ? 'คัดลอกแล้ว' : 'Copied') : (th ? 'คัดลอกข้อความ' : 'Copy text')}</button>
            <button type="button" onClick={printSheet} className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow hover:bg-indigo-700">{th ? 'พิมพ์ (A4)' : 'Print (A4)'}</button>
            <button type="button" onClick={onClose} className="px-3 py-2 bg-slate-200 text-slate-800 rounded-lg text-xs font-bold hover:bg-slate-300">{th ? 'ปิด' : 'Close'}</button>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <DrugIcon routes={drug.routes} vwClass={drug.vwClass} lang={lang} />
          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold leading-tight">{drug.genericName} <span className="text-sm font-bold text-slate-600">Class {drug.vwClass} · {drug.routes.join(' + ')}</span></h2>
            <p className="text-xs text-slate-600">{drug.brandNames.join(', ')}{drug.thaiBrands.length > 0 && (drug.brandNames.length ? ' · ' : '') + 'TH: ' + drug.thaiBrands.join(', ')}</p>
            <p className="text-xs text-slate-600">{nlemText(drug.nlem, lang)}</p>
          </div>
        </div>
        <div className="p-3 rounded-lg border border-rose-300 bg-rose-50 text-sm text-rose-900"><b>{th ? 'คำเตือนสำคัญ: ' : 'Key warning: '}</b>{drug.cautionsAndWarnings[0]}</div>
        {blocks.length === 0 && <p className="italic text-slate-600">N/A</p>}
        {blocks.map(([n, label, s]) => (
          <div key={n} className="break-inside-avoid space-y-1.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-800">{label}</h3>
            {s.rows.map((r, i) => (
              <p key={i} className="text-sm leading-snug"><b>{th ? r.lTh : r.lEn}:</b> {th ? r.th : r.en}</p>
            ))}
          </div>
        ))}
        <div className="flex items-center gap-1.5 flex-wrap border-t border-slate-300 pt-2"><span className="text-xs font-bold">{th ? 'การวางจำหน่าย:' : 'Availability:'}</span><RegChips d={drug} lang={lang} nlem /></div>
        <p className="text-[11px] italic text-slate-600">{th ? 'ใช้ประกอบการตัดสินใจเท่านั้น ตรวจสอบกับฉลากยาและดุลยพินิจทางคลินิกเสมอ' : 'Decision support only. Check the product label and use clinical judgement.'} · {th ? 'แหล่งอ้างอิง: MIMS Thailand, แนวทาง ESC (ดูหน้าเอกสารอ้างอิงในแอป)' : 'Sources: MIMS Thailand and the ESC guidelines named above (see the References section in the app).'}</p>
      </div>
    </div>
  );
  return ReactDOM.createPortal(node, document.body);
}

// Highlights the typed search text inside a name or brand line
function Hl({ text, term }) {
  const q = (term || '').trim();
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return <>{text.slice(0, i)}<mark className="bg-amber-200 dark:bg-amber-500/40 text-inherit rounded px-0.5">{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

function PrintSheetView({ drugs, lang, onClose }) {
  return ReactDOM.createPortal(
    <div id="patient-sheet-print" className="fixed inset-0 bg-white z-[9999] overflow-y-auto p-8 text-slate-900 font-sans print:p-0">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4 print:hidden">
          <div>
            <h1 className="text-2xl font-extrabold">Antiarrhythmic Drug Clinical Reference Table</h1>
            <p className="text-xs text-slate-500">Cardiology & Emergency Ward Protocol Sheet</p>
          </div>
          <div className="flex gap-2">
            <button onClick={printSheet} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow hover:bg-indigo-700 flex items-center gap-2">
              <Printer className="w-4 h-4" /> Print Sheet (A4)
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg text-xs font-bold hover:bg-slate-300">
              Close
            </button>
          </div>
        </div>

        <table className="w-full border-collapse text-left text-[11px] border border-slate-300">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold uppercase text-[9px]">
              <th className="p-2 border-r border-slate-300">Class</th>
              <th className="p-2 border-r border-slate-300">Drug (Generic / Brand)</th>
              <th className="p-2 border-r border-slate-300">Target & APD</th>
              <th className="p-2 border-r border-slate-300">Acute Dosing Protocol</th>
              <th className="p-2 border-r border-slate-300">Doses by source (first entry)</th>
              <th className="p-2 border-r border-slate-300">Safety & High-Alert Warnings</th>
              <th className="p-2">NLEM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {drugs.map(d => (
              <tr key={d.id} className="align-top break-inside-avoid">
                <td className="p-2 font-bold border-r border-slate-200 whitespace-nowrap">Class {d.vwClass}</td>
                <td className="p-2 border-r border-slate-200 font-bold">
                  {d.genericName}
                  <span className="block font-normal text-slate-500 text-[10px]">{d.brandNames[0]}</span>
                  {d.thaiBrands.length > 0 && <span className="block font-normal text-slate-500 text-[10px]" data-print-brands>TH: {d.thaiBrands.slice(0, 4).join(', ')}{d.thaiBrands.length > 4 ? ` +${d.thaiBrands.length - 4}` : ''}</span>}
                </td>
                <td className="p-2 border-r border-slate-200">
                  <span className="font-semibold">{d.primaryTarget}</span>
                  <span className="block text-slate-500 text-[10px]">APD: {d.actionPotential.apd}</span>
                </td>
                <td className="p-2 border-r border-slate-200 text-[10px] leading-tight">
                  {d.acuteDose.en}
                </td>
                <td className="p-2 border-r border-slate-200 text-[9px] leading-tight space-y-1" data-print-doses>
                  {[['MIMS', d.mims], ['ESC AF', d.esc], ['ESC VA', d.escVa], ['ESC SVT', d.escSvt]].filter(([, s]) => s && s.rows && s.rows.length && !s.na).map(([name, s]) => (
                    <span key={name} className="block"><b>{name} - {s.rows[0].lEn}:</b> {s.rows[0].en}</span>
                  ))}
                </td>
                <td className="p-2 border-r border-slate-200 text-[10px] leading-tight text-rose-900">
                  {d.cautionsAndWarnings[0]}
                </td>
                <td className="p-2 font-bold whitespace-nowrap">{nlemShort(d.nlem, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>,
    document.body
  );
}
