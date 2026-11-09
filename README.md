# Antiarrhythmic Drug Guide
### คู่มือยาต้านหัวใจเต้นผิดจังหวะ

A bedside reference for 27 antiarrhythmic and related drugs, by Warodom Phaenthong, M.D. One self-contained HTML page
(`antiarrhythmic-guide.html`, opened by `index.html`), in Thai and English, no installation, no data sent anywhere.
Decision support for healthcare professionals, not a substitute for the product label or clinical judgement.

**Open it:** https://sirmarkthemighty-ctrl.github.io/Antiarrhythmic_Guide/

## What it contains
- 27 drugs by Vaughan Williams class: doses, kidney and liver adjustment, warnings, interactions, QT risk, Thai NLEM 2569 status, Thai brand names; tile and list views, grouping by class, filters, sort and a printable ward sheet.
- Dosing tab: the adult dose per MIMS Thailand, plus what the 2024 ESC AF, 2022 ESC ventricular arrhythmia and 2019 ESC SVT guidelines say about each drug they name (others show N/A).
- Action potential: a class curve with the mechanism by phase; Class III and Other drugs show their own mechanism from their source.
- Tools: action potential explorer, arrhythmia pathways (AHA 2025, ACC/AHA 2023, AHA/ACC/HRS 2017), QTc and Tisdale risk score, IV infusion protocols, kidney and liver dosing, interaction matrix.
- Every section cites its source (FDA and EMA labels, guidelines, MIMS, NLEM); a value with no source shows Unknown or N/A. A References section lists them all.

## Source and build
`antiarrhythmic-guide.html` is generated; edit `antiarrhythmic-src/`, run `node build-antiarrhythmic.js`, then `node test-antiarrhythmic.js` (headless Edge checks of the data, filters, tools and layout) (needs the build tools in
`%LOCALAPPDATA%\med-apps-build`). Licence: CC BY-NC-SA 4.0 for the app's own code and text (see `NOTICE` for third-party material).
