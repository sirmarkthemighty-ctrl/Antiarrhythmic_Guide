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
// <donate>
// Bedside UI donation button + PromptPay QR pop-up (source: shared/donate/Donate.jsx; installed by shared/donate/install.js).
// Self-contained: own open state, own Escape handling (it closes only itself), pop-up rendered in a portal so no parent
// stacking context can hide it. Needs React hooks (useState, useEffect) and ReactDOM in scope. Usage: <DonateButton isTh={lang === 'th'} />
const DONATE = {
  qr: 'data:image/jpeg;base64,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n/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8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',
  en: {
    btn: 'Donate', title: 'Support this guide', close: 'Close', alt: 'PromptPay QR code for donations',
    intro: 'This guide is free to use. If it helps your practice, you can support its development by scanning this PromptPay QR code with your banking app.',
    scan: 'Scan with a Thai banking app (PromptPay / Thai QR Payment).',
    note: 'Donations are voluntary and do not change the content of the guide.',
  },
  th: {
    btn: 'สนับสนุน', title: 'สนับสนุนคู่มือนี้', close: 'ปิด', alt: 'QR พร้อมเพย์สำหรับสนับสนุนผู้พัฒนา',
    intro: 'คู่มือนี้ใช้ได้ฟรี หากเป็นประโยชน์ต่อการทำงาน สามารถสนับสนุนการพัฒนาได้โดยสแกน QR พร้อมเพย์นี้ด้วยแอปธนาคาร',
    scan: 'สแกนด้วยแอปธนาคารของไทย (พร้อมเพย์ / Thai QR Payment)',
    note: 'การสนับสนุนเป็นความสมัครใจ และไม่มีผลต่อเนื้อหาของคู่มือ',
  },
};
const DonateButton = ({ isTh = false, className = '' }) => {
  const [open, setOpen] = useState(false);
  const d = DONATE[isTh ? 'th' : 'en'];
  useEffect(() => {
    if (!open) return;
    // capture phase: the page's own Escape handler never sees this key press, so only this pop-up closes
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); } };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} title={d.title} aria-label={d.title} aria-haspopup="dialog" data-donate-btn
        className={`text-[10px] font-bold text-slate-500 bg-white shadow-sm px-2.5 py-1.5 rounded-full border border-slate-200 flex items-center gap-1.5 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all cursor-pointer ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-rose-500" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
        <span className="hidden sm:inline">{d.btn}</span>
      </button>
      {open && ReactDOM.createPortal(
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 print:hidden" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }} data-donate-modal>
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl flex flex-col max-h-[95vh] animate-in fade-in zoom-in-95 duration-200" role="dialog" aria-modal="true" aria-label={d.title}>
            <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-100 bg-slate-50 rounded-t-2xl shrink-0">
              <h2 className="text-base font-extrabold text-slate-800 leading-tight flex items-center gap-2 min-w-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-rose-500 shrink-0" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
                <span className="break-words min-w-0">{d.title}</span>
              </h2>
              <button type="button" onClick={() => setOpen(false)} className="p-2 -m-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded-full transition-colors shrink-0" aria-label={d.close}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-4 flex-grow overflow-y-auto flex flex-col items-center gap-3 bg-white">
              <p className="text-xs text-slate-600 leading-relaxed text-center">{d.intro}</p>
              {/* the QR keeps a white card in dark mode so it scans reliably */}
              <div className="light-lock rounded-xl border border-slate-200 bg-white p-1.5 max-w-full">
                <img src={DONATE.qr} alt={d.alt} className="block mx-auto w-auto max-w-full rounded-lg" style={{ maxHeight: '52vh' }} data-donate-qr />
              </div>
              <p className="text-[11px] font-semibold text-slate-600 text-center">{d.scan}</p>
              <p className="text-[11px] text-slate-500 leading-snug text-center">{d.note}</p>
            </div>
            <div className="flex items-center justify-end p-3 border-t border-slate-100 shrink-0">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 transition-colors">{d.close}</button>
            </div>
          </div>
        </div>, document.body)}
    </>
  );
};
// </donate>

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
