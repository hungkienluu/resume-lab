import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const dataPath = path.join(root, 'data', 'resume.json');
const distDir = path.join(root, 'dist');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

fs.mkdirSync(distDir, { recursive: true });

const esc = (s) => String(s)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const list = (items) => `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;

const renderTopBar = () => `
<header class="topbar">
  <div class="name-block">
    <p class="eyebrow">${esc(data.profile.title)}</p>
    <h1>${esc(data.profile.name)}</h1>
  </div>
  <div class="contact">
    <p>${esc(data.profile.location)}</p>
    <p>${esc(data.profile.email)}</p>
    <p><a href="${esc(data.profile.linkedin)}">linkedin.com/in/hungkienluu</a></p>
  </div>
</header>`;

const globalStyles = `
:root {
  --bg: #f4efe6;
  --paper: #fffdf9;
  --ink: #171312;
  --muted: #6f645f;
  --accent: #145a4a;
  --accent-2: #bb4d00;
  --line: #e3d5c7;
  --shadow: 0 18px 60px rgba(18, 14, 10, 0.12);
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  color: var(--ink);
  background: radial-gradient(circle at 10% 10%, #fffaf1 0%, var(--bg) 38%, #efe5d8 100%);
  font-family: "Manrope", "Avenir Next", "Segoe UI", sans-serif;
  line-height: 1.5;
}
a { color: inherit; }
.page {
  max-width: 1100px;
  margin: 32px auto;
  background: var(--paper);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  border-radius: 20px;
  overflow: hidden;
}
.topbar {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 34px;
  border-bottom: 1px solid var(--line);
  background: linear-gradient(120deg, #fffdf9 0%, #f8f1e6 100%);
}
.eyebrow {
  margin: 0;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
}
h1, h2, h3 {
  font-family: "Fraunces", "Iowan Old Style", Georgia, serif;
  margin: 0;
  line-height: 1.15;
}
h1 { font-size: clamp(36px, 4.8vw, 56px); letter-spacing: 0.01em; }
h2 { font-size: clamp(25px, 2.6vw, 34px); }
h3 { font-size: 20px; }
.contact {
  text-align: right;
  font-size: 14px;
  color: var(--muted);
}
.contact p { margin: 0 0 4px; }
.section { padding: 28px 34px; border-bottom: 1px solid var(--line); }
.section:last-child { border-bottom: none; }
.kicker {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-2);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.summary {
  max-width: 820px;
  margin: 12px 0 0;
  font-size: 19px;
}
.metric-grid {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}
.metric {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 14px;
  background: #fff;
  font-weight: 700;
}
.experience-entry {
  margin-bottom: 20px;
  padding-bottom: 18px;
  border-bottom: 1px dashed var(--line);
}
.experience-entry:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
.meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--muted);
  font-size: 14px;
}
.role {
  margin-top: 5px;
  font-weight: 800;
  font-size: 18px;
}
.subrole {
  margin-top: 10px;
  font-weight: 700;
  color: var(--accent);
}
ul { margin: 9px 0 0 20px; padding: 0; }
li { margin-bottom: 7px; }
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.skill-card {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px;
  background: #fff;
}
.skill-card h3 { font-size: 16px; margin-bottom: 7px; }
.footer {
  padding: 22px 34px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  color: var(--muted);
}
@media (max-width: 720px) {
  .topbar { flex-direction: column; }
  .contact { text-align: left; }
}
`;

const renderSite = () => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(data.profile.name)} | AI-Native Product Leader</title>
  <meta name="description" content="${esc(data.profile.summary)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>${globalStyles}</style>
</head>
<body>
  <main class="page">
    ${renderTopBar()}

    <section class="section">
      <p class="kicker">Positioning</p>
      <h2>${esc(data.profile.positioning)}</h2>
      <p class="summary">${esc(data.profile.summary)}</p>
      <div class="metric-grid">${data.heroMetrics.map((m) => `<div class="metric">${esc(m)}</div>`).join('')}</div>
    </section>

    <section class="section">
      <p class="kicker">Experience</p>
      ${data.experience.map((exp) => {
        const base = `
          <article class="experience-entry">
            <h3>${esc(exp.company)}</h3>
            <div class="meta"><span>${esc(exp.dates)}</span><span>${esc(exp.location)}</span></div>
            <p class="role">${esc(exp.role)}</p>
        `;

        if (exp.subroles) {
          return `${base}${exp.subroles.map((s) => `
            <p class="subrole">${esc(s.name)} (${esc(s.dates)})</p>
            ${s.description ? `<p>${esc(s.description)}</p>` : ''}
            ${s.bullets ? list(s.bullets) : ''}
          `).join('')}</article>`;
        }

        if (exp.bullets) {
          return `${base}${list(exp.bullets)}</article>`;
        }

        return `${base}<p>${esc(exp.summary || '')}</p></article>`;
      }).join('')}
    </section>

    <section class="section">
      <p class="kicker">Case Studies</p>
      <div class="skill-grid">${data.caseStudies.map((c) => `
        <article class="skill-card">
          <h3>${esc(c.title)}</h3>
          <p><strong>Problem:</strong> ${esc(c.problem)}</p>
          <p><strong>Approach:</strong> ${esc(c.approach)}</p>
          <p><strong>Outcome:</strong> ${esc(c.outcome)}</p>
        </article>
      `).join('')}</div>
    </section>

    <section class="section">
      <p class="kicker">Skills</p>
      <div class="skill-grid">${Object.entries(data.skills).map(([group, skills]) => `
        <article class="skill-card">
          <h3>${esc(group)}</h3>
          <p>${esc(skills.join(' · '))}</p>
        </article>
      `).join('')}</div>
    </section>

    <section class="section">
      <p class="kicker">Education</p>
      <p><strong>${esc(data.education.school)}</strong> · ${esc(data.education.degree)} · Minor: ${esc(data.education.minor)} · ${esc(data.education.year)}</p>
    </section>

    <footer class="footer">
      <span>Resume Lab v1: single source, multi-format output</span>
      <span><a href="resume-ats.html">ATS Resume</a> · <a href="resume-modern.html">Modern Resume</a> · <a href="resume-slides.html">Slides</a></span>
    </footer>
  </main>
</body>
</html>`;

const renderOnePage = ({ modern }) => {
  const css = modern ? `
  @page { size: letter; margin: 0.5in; }
  body { font-family: "Manrope", "Segoe UI", sans-serif; color: #111; font-size: 8.7pt; line-height: 1.28; }
  h1, h2 { font-family: "Fraunces", Georgia, serif; margin: 0; }
  h1 { font-size: 24pt; }
  h2 { font-size: 9.8pt; letter-spacing: 0.09em; text-transform: uppercase; margin-top: 8pt; border-bottom: 0.8pt solid #d8c2ad; padding-bottom: 2pt; color: #6f3600; }
  .header { text-align: center; margin-bottom: 6pt; }
  .contact { font-size: 8.2pt; color: #444; }
  .summary { margin: 6pt 0; font-size: 8.8pt; }
  .job { margin-bottom: 4pt; }
  .line { display: flex; justify-content: space-between; gap: 8pt; }
  .title { font-weight: 800; }
  .meta { color: #555; font-size: 8pt; }
  ul { margin: 1.5pt 0 0 10pt; }
  li { margin-bottom: 1pt; }
  .skills { display: grid; grid-template-columns: 76pt 1fr; row-gap: 2pt; }
  .skills b { color: #5c2a00; }
  ` : `
  @page { size: letter; margin: 0.45in 0.5in; }
  body { font-family: "Helvetica Neue", Arial, sans-serif; color: #111; font-size: 8.8pt; line-height: 1.3; }
  h1, h2 { margin: 0; }
  h1 { font-size: 21pt; letter-spacing: 0.06em; }
  h2 { font-size: 9.2pt; text-transform: uppercase; letter-spacing: 0.12em; margin-top: 8pt; border-bottom: 0.8pt solid #bbb; padding-bottom: 2pt; }
  .header { text-align: center; margin-bottom: 6pt; }
  .contact { font-size: 8.2pt; color: #333; }
  .summary { margin: 6pt 0; font-size: 8.7pt; }
  .job { margin-bottom: 4pt; }
  .line { display: flex; justify-content: space-between; gap: 8pt; }
  .title { font-weight: 700; }
  .meta { color: #555; font-size: 8pt; }
  ul { margin: 1.5pt 0 0 10pt; }
  li { margin-bottom: 1pt; }
  .skills { display: grid; grid-template-columns: 74pt 1fr; row-gap: 2pt; }
  .skills b { color: #111; }
  `;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(data.profile.name)} Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>${css}</style>
</head>
<body>
  <div class="header">
    <h1>${esc(data.profile.name)}</h1>
    <div class="contact">${esc(data.profile.location)} · ${esc(data.profile.phone)} · ${esc(data.profile.email)} · ${esc(data.profile.linkedin)}</div>
  </div>

  <div class="summary">${esc(data.profile.summary)}</div>

  <h2>Experience</h2>
  ${data.experience.map((exp) => `
    <div class="job">
      <div class="line"><span class="title">${esc(exp.role)} - ${esc(exp.company)}</span><span class="meta">${esc(exp.dates)}</span></div>
      <div class="meta">${esc(exp.location)}</div>
      ${exp.subroles ? exp.subroles.map((s) => `
        <div><strong>${esc(s.name)} (${esc(s.dates)})</strong></div>
        ${s.description ? `<div>${esc(s.description)}</div>` : ''}
        ${s.bullets ? list(s.bullets) : ''}
      `).join('') : exp.bullets ? list(exp.bullets) : `<div>${esc(exp.summary || '')}</div>`}
    </div>
  `).join('')}

  <h2>Education</h2>
  <div><strong>${esc(data.education.school)}</strong> - ${esc(data.education.degree)}; ${esc(data.education.minor)} Minor - ${esc(data.education.year)}</div>

  <h2>Skills</h2>
  <div class="skills">${Object.entries(data.skills).map(([group, skills]) => `<b>${esc(group)}</b><span>${esc(skills.join(', '))}</span>`).join('')}</div>
</body>
</html>`;
};

const renderSlides = () => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(data.profile.name)} - Resume Deck</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Manrope:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    :root { --bg:#141a23; --card:#1f2734; --ink:#ecf0f6; --muted:#b8c1d4; --accent:#52c7a9; --line:#334257; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: "Manrope", sans-serif; background: radial-gradient(circle at 18% 10%, #243248 0%, var(--bg) 55%); color: var(--ink); }
    .deck { max-width: 1100px; margin: 26px auto; padding: 0 16px 26px; display: grid; gap: 16px; }
    .slide { min-height: 76vh; border: 1px solid var(--line); border-radius: 18px; background: linear-gradient(145deg, #1e2735 0%, #1a2230 100%); padding: 34px; display: grid; align-content: start; gap: 14px; }
    h1, h2 { font-family: "Fraunces", Georgia, serif; margin: 0; }
    h1 { font-size: clamp(44px, 8vw, 76px); }
    h2 { font-size: clamp(28px, 4vw, 40px); }
    .meta { color: var(--muted); font-size: 14px; }
    ul { margin: 0 0 0 22px; }
    li { margin: 6px 0; }
    .metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 8px; }
    .metric { border: 1px solid var(--line); border-radius: 12px; padding: 10px; font-weight: 700; }
    .tag { color: var(--accent); text-transform: uppercase; letter-spacing: 0.09em; font-size: 11px; font-weight: 800; }
    @media (max-width: 760px) { .metrics { grid-template-columns: 1fr; } .slide { min-height: auto; } }
  </style>
</head>
<body>
  <main class="deck">
    <section class="slide">
      <p class="tag">Slide 1</p>
      <h1>${esc(data.profile.name)}</h1>
      <h2>${esc(data.profile.positioning)}</h2>
      <p class="meta">${esc(data.profile.location)} · ${esc(data.profile.email)} · ${esc(data.profile.linkedin)}</p>
      <div class="metrics">${data.heroMetrics.map((m) => `<div class="metric">${esc(m)}</div>`).join('')}</div>
    </section>

    <section class="slide">
      <p class="tag">Slide 2</p>
      <h2>Core Story</h2>
      <p>${esc(data.profile.summary)}</p>
      ${list(data.themes)}
    </section>

    <section class="slide">
      <p class="tag">Slide 3</p>
      <h2>Experience Highlights</h2>
      ${data.experience.slice(0, 3).map((exp) => `
        <article>
          <h3>${esc(exp.role)} - ${esc(exp.company)}</h3>
          <p class="meta">${esc(exp.dates)} · ${esc(exp.location)}</p>
          ${exp.subroles?.[0]?.bullets ? list(exp.subroles[0].bullets.slice(0, 3)) : exp.bullets ? list(exp.bullets.slice(0, 3)) : `<p>${esc(exp.summary || '')}</p>`}
        </article>
      `).join('')}
    </section>

    <section class="slide">
      <p class="tag">Slide 4</p>
      <h2>Case Studies</h2>
      ${data.caseStudies.map((c) => `
        <article>
          <h3>${esc(c.title)}</h3>
          <p><strong>Problem:</strong> ${esc(c.problem)}</p>
          <p><strong>Approach:</strong> ${esc(c.approach)}</p>
          <p><strong>Outcome:</strong> ${esc(c.outcome)}</p>
        </article>
      `).join('')}
    </section>

    <section class="slide">
      <p class="tag">Slide 5</p>
      <h2>Skills + Contact</h2>
      ${Object.entries(data.skills).map(([group, skills]) => `
        <article>
          <h3>${esc(group)}</h3>
          <p>${esc(skills.join(' · '))}</p>
        </article>
      `).join('')}
      <p class="meta">Open to conversations with native-AI startups and frontier labs.</p>
    </section>
  </main>
</body>
</html>`;

const files = {
  'index.html': renderSite(),
  'resume-ats.html': renderOnePage({ modern: false }),
  'resume-modern.html': renderOnePage({ modern: true }),
  'resume-slides.html': renderSlides()
};

for (const [name, html] of Object.entries(files)) {
  fs.writeFileSync(path.join(distDir, name), html);
}

console.log(`Built ${Object.keys(files).length} pages into ${distDir}`);
