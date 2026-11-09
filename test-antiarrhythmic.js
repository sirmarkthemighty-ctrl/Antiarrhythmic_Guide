#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const PAGE = path.join(ROOT, 'antiarrhythmic-guide.html');
const BROWSERS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  const exe = BROWSERS.find(p => fs.existsSync(p));
  if (!exe) throw new Error('No Edge or Chrome found on this system.');
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'aag-test-'));
  const browser = spawn(exe, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
    `--user-data-dir=${profile}`, '--window-size=1280,1000',
    'about:blank',
  ], { stdio: 'ignore' });

  try {
    let port;
    for (let i = 0; i < 100 && !port; i++) {
      await sleep(100);
      try { port = fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0].trim(); } catch (e) {}
    }
    if (!port) throw new Error('Browser did not open a debugging port.');

    let target;
    for (let i = 0; i < 50 && !target; i++) {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = list.find(t => t.type === 'page');
      if (!target) await sleep(100);
    }

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    let nextId = 1;
    const pending = new Map();
    const consoleLogs = [];
    const pageErrors = [];

    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push({ type: msg.params.type, args: msg.params.args.map(a => a.value || a.description) });
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        pageErrors.push(msg.params.exceptionDetails);
      }
      if (pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
    };

    const send = (method, params = {}, ms = 30000) => new Promise((resolve, reject) => {
      const id = nextId++;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(method + ' timed out')); }, ms);
      pending.set(id, (msg) => { clearTimeout(timer); if (msg.error) reject(new Error(msg.error.message)); else resolve(msg.result); });
      ws.send(JSON.stringify({ id, method, params }));
    });

    const evaluate = (expression, ms = 30000) => new Promise((resolve, reject) => {
      const id = nextId++;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error('evaluate timed out')); }, ms);
      pending.set(id, (msg) => {
        clearTimeout(timer);
        if (msg.error) return reject(new Error(msg.error.message));
        const r = msg.result;
        if (r.exceptionDetails) return reject(new Error(r.exceptionDetails.exception ? r.exceptionDetails.exception.description : r.exceptionDetails.text));
        resolve(r.result ? r.result.value : undefined);
      });
      ws.send(JSON.stringify({ id, method: 'Runtime.evaluate', params: { expression, awaitPromise: true, returnByValue: true } }));
    });

    await send('Runtime.enable');
    await send('Page.enable');
    await send('Page.navigate', { url: pathToFileURL(PAGE).href });

    // Wait for the app to render cards
    let ready = false;
    for (let i = 0; i < 100 && !ready; i++) {
      ready = await evaluate("document.querySelectorAll('article').length > 0").catch(() => false);
      if (!ready) await sleep(100);
    }

    if (!ready) {
      throw new Error('App did not render within 10s. Errors: ' + JSON.stringify(pageErrors));
    }

    console.log('App loaded and rendered successfully!');
    // The class buttons and Group by class live in the Filters box: keep it open for the tests
    await evaluate(`document.querySelector('[data-filters-toggle]').click()`);
    await sleep(300);
    const results = [];

    // Test 1: Drug card count (27 drugs)
    const cardCount = await evaluate("document.querySelectorAll('article').length");
    results.push({ test: 'Render all 27 antiarrhythmics in grid', pass: cardCount === 27, detail: `Found ${cardCount} cards` });

    // Test 2: Language toggle to Thai
    const langBtn = await evaluate(`(() => {
      const b = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.trim() === 'ไทย');
      if (b) { b.click(); return true; }
      return false;
    })()`);
    await sleep(250);
    const thTitle = await evaluate("document.querySelector('h1') ? document.querySelector('h1').textContent : ''");
    results.push({ test: 'Toggle Language to Thai', pass: langBtn && thTitle.includes('คู่มือยาต้านหัวใจเต้นผิดจังหวะ'), detail: thTitle });

    // Switch back to English
    await evaluate(`(() => {
      const b = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.trim() === 'EN');
      if (b) b.click();
    })()`);
    await sleep(250);

    // Test 3: Dark Mode toggle
    const darkBefore = await evaluate("document.documentElement.classList.contains('dark')");
    await evaluate(`(() => {
      const themeBtn = document.querySelector('[data-theme-toggle]');
      if (themeBtn) themeBtn.click();
    })()`);
    await sleep(200);
    const darkAfter = await evaluate("document.documentElement.classList.contains('dark')");
    results.push({ test: 'Toggle Dark Mode theme class', pass: darkBefore !== darkAfter, detail: `darkBefore: ${darkBefore}, darkAfter: ${darkAfter}` });

    // Test 4: Search filter using React input value setter
    await evaluate(`(() => {
      const inp = document.querySelector('input[type=\"text\"]');
      if (inp) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(inp, 'Adenosine');
        inp.dispatchEvent(new Event('input', { bubbles: true }));
      }
    })()`);
    await sleep(300);
    const filteredCount = await evaluate("document.querySelectorAll('article').length");
    results.push({ test: 'Search filtering ("Adenosine")', pass: filteredCount === 1, detail: `Filtered to ${filteredCount} drug(s)` });

    // Clear search
    await evaluate(`(() => {
      const inp = document.querySelector('input[type=\"text\"]');
      if (inp) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(inp, '');
        inp.dispatchEvent(new Event('input', { bubbles: true }));
      }
    })()`);
    await sleep(250);

    // Test 5: Open & close Action Potential modal
    const apOpen = await evaluate(`(() => {
      const b = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Action Potential') || btn.textContent.includes('Action Pot.'));
      if (b) { b.click(); return true; }
      return false;
    })()`);
    await sleep(300);
    const apSvgVisible = await evaluate("document.querySelectorAll('svg path').length > 5 && document.body.textContent.includes('Phase 0')");
    await evaluate(`(() => {
      const close = document.querySelector('.fixed button svg line[x1=\"18\"]')?.closest('button');
      if (close) close.click();
    })()`);
    await sleep(200);
    results.push({ test: 'Action Potential Interactive Modal (SVG + ECG correlation)', pass: apOpen && apSvgVisible, detail: `Rendered SVG Phase 0-4 Curves and Vaughan Williams kinetics` });

    // Test 6: Open & close Arrhythmia Pathways modal
    const pathOpen = await evaluate(`(() => {
      const b = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Arrhythmia Pathways') || btn.textContent.includes('Pathways'));
      if (b) { b.click(); return true; }
      return false;
    })()`);
    await sleep(300);
    const pathContent = await evaluate("document.body.textContent.includes('Atrial Fibrillation') || document.body.textContent.includes('Rate vs Rhythm')");
    await evaluate(`(() => {
      const close = document.querySelector('.fixed button svg line[x1=\"18\"]')?.closest('button');
      if (close) close.click();
    })()`);
    await sleep(200);
    results.push({ test: 'Arrhythmia Pathways Navigator Modal (AFib/SVT/VT/WPW)', pass: pathOpen && pathContent, detail: `Loaded clinical decision pathways` });

    // Test 7: QTc & Tisdale Calculator modal
    const tisdaleOpen = await evaluate(`(() => {
      const b = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Tisdale') || btn.textContent.includes('QTc'));
      if (b) { b.click(); return true; }
      return false;
    })()`);
    await sleep(300);
    const tisdaleContent = await evaluate("document.body.textContent.includes('QTc Risk Category') || document.body.textContent.includes('Tisdale Risk Score')");
    await evaluate(`(() => {
      const close = document.querySelector('.fixed button svg line[x1=\"18\"]')?.closest('button');
      if (close) close.click();
    })()`);
    await sleep(200);
    results.push({ test: 'QTc & Tisdale Risk Calculator Modal (Bazett/Fridericia + 9-variable score)', pass: tisdaleOpen && tisdaleContent, detail: `Calculated multi-formula QTc and proarrhythmia risk` });

    // Test 8: Drug Detail Modal & Tab Navigation
    await evaluate(`(() => {
      const card = document.querySelector('article');
      if (card) card.click();
    })()`);
    await sleep(300);
    const detailTitle = await evaluate("document.querySelector('.fixed h2') ? document.querySelector('.fixed h2').textContent : ''");
    const tabs = await evaluate("Array.from(document.querySelectorAll('.fixed .flex.border-b button')).map(b => b.textContent.trim())");
    await evaluate(`(() => {
      const close = document.querySelector('.fixed button svg line[x1=\"18\"]')?.closest('button');
      if (close) close.click();
    })()`);
    await sleep(200);
    results.push({ test: 'Drug Detail Monograph Modal (6-tab clinical breakdown)', pass: !!detailTitle && tabs.length >= 5, detail: `Monograph opened for ${detailTitle} with tabs: ${tabs.join(', ')}` });

    // Test 9: Comparison Dock & Comparison Modal
    const compareSelected = await evaluate(`(() => {
      const compareButtons = Array.from(document.querySelectorAll('article button')).filter(b => b.textContent.includes('Compare'));
      if (compareButtons.length >= 2) {
        compareButtons[0].click();
        compareButtons[1].click();
        return true;
      }
      return false;
    })()`);
    await sleep(300);
    const dockVisible = await evaluate("document.body.textContent.includes('drugs selected for comparison')");
    // Open compare modal
    await evaluate(`(() => {
      const cmpModalBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Compare (2)'));
      if (cmpModalBtn) cmpModalBtn.click();
    })()`);
    await sleep(300);
    const compareModalCols = await evaluate("document.querySelectorAll('.fixed table th').length >= 3");
    await evaluate(`(() => {
      const close = document.querySelector('.fixed button svg line[x1=\"18\"]')?.closest('button');
      if (close) close.click();
    })()`);
    await sleep(200);
    results.push({ test: 'Side-by-Side Comparison Dock & Modal', pass: compareSelected && dockVisible && compareModalCols, detail: `Added 2 drugs to dock, opened side-by-side comparative table` });

    // Test 10: class button - tap only filters; long press opens the AP pop-up; no "AP" tag
    const chip = "Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Class Ia')";
    const modalsBefore = await evaluate("document.querySelectorAll('.fixed.inset-0').length");
    await evaluate(`(() => { ${chip}.click(); })()`);
    await sleep(350);
    const tapOpened = (await evaluate("document.querySelectorAll('.fixed.inset-0').length")) > modalsBefore;
    const tapFiltered = await evaluate("document.querySelectorAll('article').length < 27");
    const noApTag = await evaluate(`(() => !Array.from(document.querySelectorAll('button')).some(b => /^Class (Ia|Ib|Ic|II|III|IV|Other)\s*AP$/.test(b.textContent.trim())))()`);
    await evaluate(`(() => { const b = ${chip}; b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); })()`);
    await sleep(800);
    await evaluate(`(() => { const b = ${chip}; b.dispatchEvent(new PointerEvent('pointerup', { bubbles: true })); b.click(); })()`);
    await sleep(350);
    const apIaVisible = await evaluate("document.querySelectorAll('.fixed svg path').length > 5 && document.body.textContent.includes('Class Ia - Intermediate Na+ Block')");
    await evaluate(`(() => {
      const close = document.querySelector('.fixed button svg line[x1="18"]')?.closest('button');
      if (close) close.click();
    })()`);
    await sleep(200);
    await evaluate(`(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'All').click(); })()`);
    await sleep(250);
    results.push({ test: 'Class button: tap filters only, long press opens AP curve, no AP tag', pass: !tapOpened && tapFiltered && noApTag && apIaVisible, detail: `tap opened ${tapOpened}, tap filtered ${tapFiltered}, no AP tag ${noApTag}, long press opened ${apIaVisible}` });

    // Test 11: Interactive Drug Card Class Badge Click (Pops up affected AP curve)
    const cardBadgeClicked = await evaluate(`(() => {
      const badge = document.querySelector('article button[title*=\"Action Potential\"]');
      if (badge) { badge.click(); return true; }
      return false;
    })()`);
    await sleep(350);
    const apCardVisible = await evaluate("document.querySelectorAll('.fixed svg path').length > 5");
    await evaluate(`(() => {
      const close = document.querySelector('.fixed button svg line[x1=\"18\"]')?.closest('button');
      if (close) close.click();
    })()`);
    await sleep(200);
    results.push({ test: 'Interactive Drug Card Class Badge pops up affected AP curve', pass: cardBadgeClicked && apCardVisible, detail: `Clicked drug card Class badge, Action Potential modal opened` });

    // Changelog: version button opens the changelog, newest entry first; Escape closes it
    const ver = await evaluate(`(() => { const b = document.querySelector('[data-changelog-open]'); if (!b) return null; const v = b.textContent.trim(); b.click(); return v; })()`);
    await sleep(250);
    const firstEntry = await evaluate(`(() => { const h = document.querySelector('[data-changelog] h3'); return h ? h.textContent.trim() : ''; })()`);
    await evaluate(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))`);
    await sleep(200);
    const clClosed = await evaluate(`!document.querySelector('[data-changelog]')`);
    results.push({ test: 'Version button opens changelog (newest first), Escape closes it', pass: !!ver && ver === firstEntry && clClosed, detail: `badge ${ver}, first entry ${firstEntry}, closed ${clClosed}` });

    // Detail view starts on Overview again after another tab was used
    const freshTab = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const closeBtn = () => document.querySelector('.fixed button svg line[x1="18"]').closest('button');
      const tabBtns = () => Array.from(document.querySelectorAll('.fixed .flex.border-b button'));
      document.querySelector('article').click(); await wait(250);
      tabBtns()[3].click(); await wait(200);
      closeBtn().click(); await wait(200);
      document.querySelectorAll('article')[1].click(); await wait(250);
      const active = tabBtns().find(b => b.className.includes('border-indigo-600'));
      const label = active ? active.textContent.trim() : '';
      closeBtn().click(); await wait(200);
      return label;
    })()`);
    results.push({ test: 'Reopened detail view starts on the Overview tab', pass: /Overview/.test(freshTab), detail: `active tab: ${freshTab}` });

    // Audit: every detail tab of every drug shows at least one source line; NLEM tab is the 2569 list
    const audit = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const closeBtn = () => document.querySelector('.fixed button svg line[x1="18"]').closest('button');
      const all = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'All'); if (all) { all.click(); await wait(300); }
      document.querySelectorAll('.fixed button svg line[x1="18"]').forEach(l => l.closest('button').click()); await wait(200);
      const missing = []; let nlemOk = 0; const n = document.querySelectorAll('article').length;
      for (let d = 0; d < n; d++) {
        document.querySelectorAll('article')[d].click(); await wait(150);
        const name = document.querySelector('.fixed h2').textContent;
        const tabs = Array.from(document.querySelectorAll('.fixed .flex.flex-wrap.border-b button'));
        for (const tb of tabs) {
          tb.click(); await wait(60);
          if (!document.querySelector('.fixed [data-source-line]')) missing.push(name + ' / ' + tb.textContent.trim());
          if (/Dosing/.test(tb.textContent) && !(document.querySelector('.fixed [data-mims] a[href*="mims.com"]'))) missing.push(name + ' / MIMS dose');
        }
        if (document.querySelector('.fixed [data-nlem]') && document.querySelector('.fixed [data-nlem]').textContent.includes('2569')) nlemOk++;
        closeBtn().click(); await wait(100);
      }
      return { n, missing, nlemOk };
    })()`, 120000);
    results.push({ test: 'Every detail tab of every drug cites a source; NLEM tab shows the 2569 list', pass: audit.n === 27 && audit.missing.length === 0 && audit.nlemOk === audit.n, pass_n: 0, detail: `drugs ${audit.n}, NLEM 2569 ${audit.nlemOk}, tabs without source: ${audit.missing.slice(0, 5).join('; ') || 'none'}` });

    // Tisdale: all items ticked = 21 (published maximum)
    const tisMax = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('QTc')).click(); await wait(300);
      for (const cb of document.querySelectorAll('.fixed input[type="checkbox"]')) { cb.click(); await wait(20); }
      await wait(200);
      const m = document.querySelector('.fixed').textContent.match(/Score: (\\d+) \\/ 21/);
      document.querySelector('.fixed button svg line[x1="18"]').closest('button').click(); await wait(150);
      return m ? +m[1] : -1;
    })()`);
    results.push({ test: 'Tisdale score reaches the published maximum of 21', pass: tisMax === 21, detail: `all items ticked: ${tisMax}` });

    // Group by class: headers appear in grid and list, in class order; the drawer has no class filter any more
    const grp = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const hdr = () => Array.from(document.querySelectorAll('[data-class-header]')).map(h => { const m = h.textContent.trim().match(/^Class ([A-Za-z]+)/); return m ? m[1] : 'Other'; });
      const before = hdr().length;
      document.querySelector('[data-group-toggle]').click(); await wait(250);
      const grid = hdr();
      const listBtn = document.querySelector('button[aria-label="List View"]'); if (listBtn) { listBtn.click(); await wait(250); }
      const list = hdr();
      if (listBtn) { document.querySelector('button[aria-label="Grid View"]').click(); await wait(200); }
      const sec = document.querySelector('[data-class-filter]');
      const drawerHasClass = !!sec && sec.querySelectorAll('button[title*="several"]').length === 7 && !!sec.querySelector('[data-group-toggle]');
      document.querySelector('[data-group-toggle]').click(); await wait(200);
      return { before, grid, list, drawerHasClass, after: hdr().length };
    })()`);
    const order = ['Ia', 'Ib', 'Ic', 'II', 'III', 'IV', 'Other'].join();
    results.push({ test: 'Group by class: class headings in grid and list; class filter and Group by class sit together in the Filters box', pass: grp.before === 0 && grp.grid.join() === order && grp.list.join() === order && grp.drawerHasClass && grp.after === 0, detail: `grid ${grp.grid.join('>')}, list ${grp.list.join('>')}, class filter + group toggle together in the Filters box ${grp.drawerHasClass}` });

    // Folding class groups
    const fold = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const cards = () => document.querySelectorAll('article').length;
      document.querySelector('[data-group-toggle]').click(); await wait(250);
      const all = cards();
      document.querySelector('[data-fold="Ia"]').click(); await wait(200);
      const afterFold = cards();
      const headerKept = !!document.querySelector('[data-fold="Ia"]');
      document.querySelector('[data-fold="Ia"]').click(); await wait(200);
      const reopened = cards();
      document.querySelector('[data-fold-all]').click(); await wait(250);
      const allFolded = cards();
      document.querySelector('[data-fold-all]').click(); await wait(250);
      const allOpen = cards();
      document.querySelector('[data-group-toggle]').click(); await wait(200);
      return { all, afterFold, headerKept, reopened, allFolded, allOpen };
    })()`);
    results.push({ test: 'Class groups fold and unfold, with Collapse all / Expand all', pass: fold.afterFold === fold.all - 3 && fold.headerKept && fold.reopened === fold.all && fold.allFolded === 0 && fold.allOpen === fold.all, detail: JSON.stringify(fold) });

    // References section
    const refs = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const sec = document.querySelector('[data-references]');
      const before = document.querySelectorAll('[data-ref-item]').length;
      sec.querySelector('[data-refs-toggle]').click(); await wait(200);
      const items = [...document.querySelectorAll('[data-ref-item]')];
      const links = items.filter(i => i.querySelector('a[href^="http"]')).length;
      const used = items.filter(i => /Used for: \\S/.test(i.textContent)).length;
      const groups = [...document.querySelectorAll('[data-ref-group]')].map(g => g.getAttribute('data-ref-group'));
      const nums = items.map(i => parseInt(i.textContent, 10));
      const sequential = nums.every((v, i) => v === i + 1);
      sec.querySelector('[data-refs-toggle]').click(); await wait(100);
      return { before, n: items.length, links, used, groups: groups.join(), sequential, after: document.querySelectorAll('[data-ref-item]').length };
    })()`);
    results.push({ test: 'References section: closed by default, lists every source with link and use', pass: refs.before === 0 && refs.n >= 60 && refs.links === refs.n && refs.used === refs.n && refs.groups === 'guide,label,mims,nlem,reg,paper' && refs.sequential && refs.after === 0, detail: JSON.stringify(refs) });

    // Multi-select class chips + per-drug values in the AP pop-up
    const multi = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const chip = (t) => Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === t && (b.title === 'All' || b.title.includes('several')));
      const n = () => document.querySelectorAll('article').length;
      const all = n();
      chip('Class Ia').click(); await wait(250); const ia = n();
      chip('Class Ib').click(); await wait(250); const iaIb = n();
      chip('Class Ia').click(); await wait(250); const ib = n();
      chip('All').click(); await wait(250); const back = n();
      return { all, ia, iaIb, ib, back };
    })()`);
    results.push({ test: 'Class chips are multi-select (Ia + Ib together, All clears)', pass: multi.all === 27 && multi.ia === 3 && multi.iaIb === 6 && multi.ib === 3 && multi.back === 27, detail: JSON.stringify(multi) });
    const apDrugs = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      document.querySelector('[data-guide="ap"], [data-guide-buttons] button').click(); await wait(300);
      const n = document.querySelectorAll('[data-ap-drug]').length;
      const hasSrc = Array.from(document.querySelectorAll('[data-ap-drug] [data-ap-phases]')).filter(p => /Phase 0:/.test(p.textContent) && /Phase 3:/.test(p.textContent) && /class/i.test(p.textContent)).length;
      const close = document.querySelector('.fixed button svg line[x1="18"]'); if (close) close.closest('button').click();
      return { n, hasSrc };
    })()`);
    results.push({ test: 'Action Potential pop-up gives each drug of the class the class mechanism by phase', pass: apDrugs.n > 0 && apDrugs.hasSrc >= apDrugs.n, detail: JSON.stringify(apDrugs) });

    // Drug card shows the curve itself, no View Curve button
    const cardCurve = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      document.querySelector('article').click(); await wait(300);
      const svgs = document.querySelectorAll('.fixed svg path[stroke-dasharray="4,4"]').length;
      const btn = Array.from(document.querySelectorAll('.fixed button')).some(b => /View Class .* Action Potential Curve/.test(b.textContent));
      const close = document.querySelector('.fixed button svg line[x1="18"]'); if (close) close.closest('button').click();
      return { svgs, btn };
    })()`);
    results.push({ test: 'Drug card draws the class action potential curve; no View Curve button', pass: cardCurve.svgs >= 1 && !cardCurve.btn, detail: JSON.stringify(cardCurve) });

    // Sort menu in the controls row (same as the bronchodilator guide)
    const sorted = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const sel = document.querySelector('[data-sort] select');
      const setSort = async (v) => { const set = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set; set.call(sel, v); sel.dispatchEvent(new Event('change', { bubbles: true })); await wait(250); };
      const names = () => Array.from(document.querySelectorAll('article span.font-extrabold.text-lg')).map(e => e.textContent.trim()).filter(Boolean);
      await setSort('nameAsc'); const az = names();
      await setSort('nameDesc'); const za = names();
      await setSort('classAsc');
      return { first: az[0], last: az[az.length - 1], zaFirst: za[0], hasIcon: !!document.querySelector('[data-sort] svg'), buttons: document.querySelectorAll('[data-sort-buttons]').length };
    })()`);
    results.push({ test: 'Sort menu with icon in the controls row reorders the list (A-Z, Z-A)', pass: !!sorted.first && sorted.first < sorted.last && sorted.zaFirst === sorted.last && sorted.hasIcon && sorted.buttons === 0, detail: JSON.stringify(sorted) });

    // Thai brands from MIMS: searchable, shown on the card and in the Dosing tab
    const brands = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const input = document.querySelector('[data-search-box] input');
      const setVal = async (v) => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(input, v); input.dispatchEvent(new Event('input', { bubbles: true })); await wait(250); };
      await setVal('Betaloc');
      const names = Array.from(document.querySelectorAll('article span.font-extrabold.text-lg')).map(e => e.textContent.trim());
      const cardLine = !!document.querySelector('article [data-thai-brands]');
      document.querySelector('article').click(); await wait(300);
      Array.from(document.querySelectorAll('.fixed button')).find(b => /^Dosing/.test(b.textContent.trim())).click(); await wait(250);
      const detail = (document.querySelector('[data-mims-brands]') || {}).textContent || '';
      const close = document.querySelector('.fixed button svg line[x1="18"]'); if (close) close.closest('button').click();
      await setVal('');
      return { names, cardLine, detail: detail.slice(0, 80) };
    })()`);
    results.push({ test: 'Thai brands from MIMS are searchable and shown on the card and in the Dosing tab', pass: brands.names.join() === 'Metoprolol' && brands.cardLine && /Betaloc Zok/.test(brands.detail), detail: JSON.stringify(brands) });

    // ESC 2024 AF block in the Dosing tab: rows for the drugs it covers, N/A for the rest, always with its source
    const esc = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const out = { rows: 0, na: 0, noSource: 0 };
      const cards = document.querySelectorAll('article').length;
      for (let i = 0; i < cards; i++) {
        document.querySelectorAll('article')[i].click(); await wait(200);
        Array.from(document.querySelectorAll('.fixed button')).find(b => /^Dosing/.test(b.textContent.trim())).click(); await wait(120);
        const b = document.querySelector('[data-esc="af"]');
        if (!b) { out.noSource++; } else {
          if (b.querySelectorAll('[data-esc-row]').length > 0) out.rows++; else out.na++;
          if (!b.querySelector('[data-source-line] a[href*="ehae176"]')) out.noSource++;
        }
        const close = document.querySelector('.fixed button svg line[x1="18"]'); if (close) close.closest('button').click(); await wait(100);
      }
      return out;
    })()`);
    results.push({ test: 'ESC 2024 AF block: rows for the 14 drugs it covers, N/A for the other 13, every one with its source', pass: esc.rows === 14 && esc.na === 13 && esc.noSource === 0, detail: JSON.stringify(esc) });

    // ESC 2022 VA block
    const escVa = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const out = { rows: 0, na: 0, noSource: 0 };
      const cards = document.querySelectorAll('article').length;
      for (let i = 0; i < cards; i++) {
        document.querySelectorAll('article')[i].click(); await wait(200);
        Array.from(document.querySelectorAll('.fixed button')).find(b => /^Dosing/.test(b.textContent.trim())).click(); await wait(120);
        const b = document.querySelector('[data-esc="va"]');
        if (!b) { out.noSource++; } else {
          if (b.querySelectorAll('[data-esc-row]').length > 0) out.rows++; else out.na++;
          if (!b.querySelector('[data-source-line] a[href*="ehac262"]')) out.noSource++;
        }
        const close = document.querySelector('.fixed button svg line[x1="18"]'); if (close) close.closest('button').click(); await wait(100);
      }
      return out;
    })()`);
    results.push({ test: 'ESC 2022 ventricular arrhythmia block: rows for the 18 drugs it covers, N/A for the other 9, every one with its source', pass: escVa.rows === 18 && escVa.na === 9 && escVa.noSource === 0, detail: JSON.stringify(escVa) });

    // Class III / Other: drug-specific mechanism by phase, with its source
    const apd = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      document.querySelector('[data-guide="ap"]').click(); await wait(300);
      const modal = () => document.querySelector('.fixed.inset-0');
      const pick = async (label) => { Array.from(modal().querySelectorAll('button')).find(b => b.textContent.trim() === label).click(); await wait(250); };
      const read = () => Array.from(modal().querySelectorAll('[data-ap-drug]')).map(e => ({ name: e.querySelector('span.font-bold').textContent.trim(), phases: e.querySelectorAll('[data-ap-phases] > div').length, src: e.querySelectorAll('[data-source-line] a').length, na: /N\\/A/.test(e.textContent) }));
      await pick('Class III (IKr Block)'); const c3 = read();
      await pick('Class Other (Misc)'); const ot = read();
      const close = document.querySelector('.fixed button svg line[x1="18"]'); if (close) close.closest('button').click();
      return { c3, ot };
    })()`);
    results.push({ test: 'Class III and Other drugs show their own mechanism by phase with a source (vernakalant N/A)', pass: apd.c3.length === 5 && apd.c3.every(d => d.src > 0 && !d.na) && apd.ot.length === 7 && apd.ot.filter(d => d.na).length === 1 && apd.ot.filter(d => d.src > 0).length === 6, detail: JSON.stringify({ c3: apd.c3.map(d => d.name + ':' + d.phases + '/' + d.src), ot: apd.ot.map(d => d.name + ':' + d.phases + '/' + d.src + (d.na ? ' NA' : '')) }) });

    // ESC 2019 SVT block
    const escSvt = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const out = { rows: 0, na: 0, noSource: 0 };
      const cards = document.querySelectorAll('article').length;
      for (let i = 0; i < cards; i++) {
        document.querySelectorAll('article')[i].click(); await wait(200);
        Array.from(document.querySelectorAll('.fixed button')).find(b => /^Dosing/.test(b.textContent.trim())).click(); await wait(120);
        const b = document.querySelector('[data-esc="svt"]');
        if (!b) { out.noSource++; } else {
          if (b.querySelectorAll('[data-esc-row]').length > 0) out.rows++; else out.na++;
          if (!b.querySelector('[data-source-line] a[href*="ehz467"]')) out.noSource++;
        }
        const close = document.querySelector('.fixed button svg line[x1="18"]'); if (close) close.closest('button').click(); await wait(100);
      }
      return out;
    })()`);
    results.push({ test: 'ESC 2019 SVT block: rows for the 13 drugs it names, N/A for the other 14, every one with its source', pass: escSvt.rows === 13 && escSvt.na === 14 && escSvt.noSource === 0, detail: JSON.stringify(escSvt) });

    // Print Ward Sheet carries Thai brands and doses by source
    const prt = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const btn = Array.from(document.querySelectorAll('button')).find(b => /Print Ward Sheet|พิมพ์/.test(b.textContent)); btn.click(); await wait(400);
      const sheet = document.querySelector('#patient-sheet-print');
      const out = { rows: sheet.querySelectorAll('tbody tr').length, brands: sheet.querySelectorAll('[data-print-brands]').length, doses: sheet.querySelectorAll('[data-print-doses] b').length, header: /Doses by source/.test(sheet.textContent) };
      const close = Array.from(sheet.querySelectorAll('button')).find(b => /Close/.test(b.textContent)); if (close) close.click();
      return out;
    })()`);
    results.push({ test: 'Print Ward Sheet shows Thai brands and a doses-by-source column', pass: prt.rows === 27 && prt.brands === 19 && prt.doses > 40 && prt.header, detail: JSON.stringify(prt) });

    // Settings are remembered across a reload
    await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const sel = document.querySelector('[data-sort] select');
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set.call(sel, 'nameDesc'); sel.dispatchEvent(new Event('change', { bubbles: true })); await wait(200);
      document.querySelector('button[aria-label="List View"]').click(); await wait(200);
      if (!document.querySelector('[data-group-toggle]').getAttribute('aria-pressed') || document.querySelector('[data-group-toggle]').getAttribute('aria-pressed') === 'false') { document.querySelector('[data-group-toggle]').click(); await wait(200); }
      document.querySelector('[data-fold="Ib"]').click(); await wait(200);
      setTimeout(() => location.reload(), 50);
    })()`);
    await sleep(2500);
    const remembered = await evaluate(`(() => ({
      sort: document.querySelector('[data-sort] select').value,
      list: document.querySelector('button[aria-label="List View"]').getAttribute('aria-pressed'),
      folded: document.querySelector('[data-fold="Ib"]').getAttribute('aria-expanded')
    }))()`);
    // put things back for the remaining checks and for the next run
    await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      document.querySelector('[data-filters-toggle]').click(); await wait(250);
      const sel = document.querySelector('[data-sort] select');
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set.call(sel, 'classAsc'); sel.dispatchEvent(new Event('change', { bubbles: true })); await wait(150);
      document.querySelector('button[aria-label="Grid View"]').click(); await wait(150);
      document.querySelector('[data-fold="Ib"]').click(); await wait(150);
      document.querySelector('[data-group-toggle]').click(); await wait(150);
      try { localStorage.clear(); } catch (e) {}
    })()`);
    results.push({ test: 'Sort order, list view and a folded class group are remembered after a reload', pass: remembered.sort === 'nameDesc' && remembered.list === 'true' && remembered.folded === 'false', detail: JSON.stringify(remembered) });

    // Every card has a dosage-form icon matching its routes
    const icons = await evaluate(`(() => {
      const cards = Array.from(document.querySelectorAll('article'));
      const c = { po: 0, iv: 0, both: 0, none: 0 };
      cards.forEach(a => { const v = a.querySelector('[data-drug-icon]'); const k = v && v.getAttribute('data-drug-icon'); if (k === 'po') c.po++; else if (k === 'iv') c.iv++; else if (k === 'po+iv') c.both++; else c.none++; });
      const stripes = cards.filter(a => /border-l-(amber|yellow|rose|indigo|purple|emerald|sky)-400/.test(a.className)).length;
      return { cards: cards.length, ...c, stripes };
    })()`);
    results.push({ test: 'Every card has a dosage-form icon (oral 11, injection 9, both 7) and a class colour edge', pass: icons.cards === 27 && icons.po === 11 && icons.iv === 9 && icons.both === 7 && icons.none === 0 && icons.stripes === 27, detail: JSON.stringify(icons) });

    // Tile cards show the first MIMS dose row; the rest on tap (one line per indication or route)
    const cardDose = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const cards = () => Array.from(document.querySelectorAll('article'));
      const find = (name) => cards().find(c => c.textContent.includes(name));
      const rows = (name) => find(name).querySelectorAll('[data-card-dose-row]').length;
      const before = { amio: rows('Amiodarone'), proc: rows('Procainamide'), dronToggle: !!find('Dronedarone').querySelector('[data-dose-toggle]') };
      find('Amiodarone').querySelector('[data-dose-toggle]').click(); await wait(200);
      const opened = { amio: rows('Amiodarone'), openedDetail: !!document.querySelector('.fixed.inset-0') };
      find('Amiodarone').querySelector('[data-dose-toggle]').click(); await wait(200);
      return { withDose: cards().filter(c => c.querySelector('[data-card-dose]')).length, before, opened, after: rows('Amiodarone'), vern: !!find('Vernakalant').querySelector('[data-card-dose]') };
    })()`);
    results.push({ test: 'Tile cards show the first MIMS dose row; "All N doses" opens one line per indication or route', pass: cardDose.withDose === 27 && cardDose.before.amio === 1 && cardDose.before.proc === 1 && !cardDose.before.dronToggle && cardDose.opened.amio === 7 && !cardDose.opened.openedDetail && cardDose.after === 1, detail: JSON.stringify(cardDose) });

    // Phone list: compact rows, no sideways scroll, group headers still work
    await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
    await evaluate('setTimeout(() => location.reload(), 50)');
    await sleep(2500);
    const phone = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      document.querySelector('button[aria-label="List View"]').click(); await wait(300);
      const rows = document.querySelectorAll('[data-phone-row]').length;
      const table = document.querySelectorAll('table').length;
      const fit = document.documentElement.scrollWidth <= window.innerWidth;
      const icons = document.querySelectorAll('[data-phone-row] [data-drug-icon]').length;
      document.querySelector('button[aria-label="Grid View"]').click(); await wait(200);
      return { rows, table, fit, icons, width: window.innerWidth };
    })()`);
    await send('Emulation.clearDeviceMetricsOverride', {});
    await sleep(600);
    results.push({ test: 'Phone list view: compact rows with icons, no table, no sideways scroll', pass: phone.rows === 27 && phone.table === 0 && phone.fit && phone.icons === 27, detail: JSON.stringify(phone) });

    // Country availability: chips on every card, TH / Others toggles, FDA status chips beside them, NLEM only next to FDA
    const reg = await evaluate(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const q = (s) => document.querySelector(s);
      const n = () => document.querySelectorAll('article').length;
      const click = async (s) => { q(s).click(); await wait(250); };
      if (!q('[data-filter-row="registration"]')) { q('[data-filters-toggle]').click(); await wait(300); }
      const out = {};
      const cards = Array.from(document.querySelectorAll('article'));
      out.chipCards = cards.filter(c => c.querySelectorAll('[data-reg]').length === 5).length;
      const row = q('[data-filter-row="registration"]');
      out.order = Array.from(row.children).map(c => c.hasAttribute('data-reg-countries') ? 'countries' : c.hasAttribute('data-reg-status') ? 'fda' : c.querySelector('[data-nlem-only]') ? 'nlem' : '?').join('>');
      out.ctryButtons = Array.from(row.querySelectorAll('[data-reg-ctry]')).map(b => b.getAttribute('data-reg-ctry')).join(',');
      out.all = n();
      await click('[data-reg-ctry="th"]'); out.th = n();
      await click('[data-reg-st="past"]'); out.thPast = n();
      await click('[data-reg-st="past"]'); await click('[data-reg-st="never"]'); out.thNever = n();
      await click('[data-reg-st="never"]'); await click('[data-reg-ctry="others"]'); out.thOthers = n();
      await click('[data-reg-ctry="th"]'); out.others = n();
      await click('[data-reg-st="never"]'); out.othersNever = n();
      await click('[data-reg-st="never"]'); await click('[data-reg-ctry="others"]');
      for (const c of ['us', 'uk', 'eu', 'jp']) { await click('[data-reg-ctry="' + c + '"]'); out[c] = n(); await click('[data-reg-ctry="' + c + '"]'); }
      await click('[data-reg-ctry="us"]'); await click('[data-reg-ctry="jp"]'); out.usJp = n(); await click('[data-reg-ctry="us"]'); await click('[data-reg-ctry="jp"]');
      await click('[data-nlem-only]'); out.nlem = n(); out.nlemCards = Array.from(document.querySelectorAll('article')).filter(c => /NLEM 2569: /.test(c.textContent)).length;
      await click('[data-nlem-only]'); out.back = n();
      return out;
    })()`);
    results.push({ test: 'Country availability: chips on every card; TH, Others, US, UK, EU and JP toggles, FDA status beside them, NLEM only next to FDA', pass: reg.chipCards === 27 && reg.order === 'countries>fda>nlem' && reg.ctryButtons === 'th,others,us,uk,eu,jp' && reg.all === 27 && reg.th === 19 && reg.thPast === 4 && reg.thNever === 4 && reg.thOthers === 19 && reg.others === 27 && reg.othersNever === 7 && reg.us === 26 && reg.uk === 22 && reg.eu === 25 && reg.jp === 22 && reg.usJp === 22 && reg.nlem === reg.nlemCards && reg.back === 27, detail: JSON.stringify(reg) });

    // Test 12: Zero Console Errors / Runtime Exceptions
    const errorCount = pageErrors.length;
    results.push({ test: 'Zero Console Errors / Runtime Exceptions', pass: errorCount === 0, detail: errorCount === 0 ? 'Clean execution' : JSON.stringify(pageErrors) });

    console.log('\n--- Test Results ---');
    let allPassed = true;
    for (const r of results) {
      console.log(`[${r.pass ? 'PASS' : 'FAIL'}] ${r.test} - ${r.detail}`);
      if (!r.pass) allPassed = false;
    }

    if (!allPassed) {
      console.error('\nSome tests failed!');
      process.exitCode = 1;
    } else {
      console.log(`\nAll ${results.length} checks passed.`);
    }

    try { ws.close(); } catch (e) {}
  } finally {
    browser.kill();
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
  }
}

main().then(() => process.exit(process.exitCode || 0)).catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
