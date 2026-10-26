var e=`08-06`,t=7,n=`Aviation got safer by recording every crash and near miss. The AI Incident Database tries to do the same for AI. Learn to read an incident like a safety investigator.`,r=`Incidents`,i=`neutral`,a=`<h2 id="the-hook">The hook</h2>
<p>Every serious plane crash is investigated, and the findings are shared so the same mistake isn’t made twice. What happens when an AI system causes harm?</p>
<h2 id="the-one-idea">The one idea</h2>
<p><strong>An <a class="term" href="#/glossary#ai-incident" title="A real event where an AI system caused or nearly caused harm.">AI incident</a> is a real event where an AI system caused or nearly caused harm. Recording incidents publicly lets everyone learn from them, the way aviation and computer security learn from crashes and breaches. Tests before release (lessons 08-03 to 08-05) can miss things; incidents show what actually happened.</strong></p>

<figure class="fig" data-figure="incident-card"><svg viewBox="0 0 400 200" role="img" aria-label="What an AI incident record contains, using the Air Canada chatbot case." focusable="false"><defs><marker id="ar-incident-card" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted-strong)"/></marker></defs><rect x="30" y="10" width="340" height="180" rx="14" class="svg-box" stroke-width="2"/><rect x="30" y="10" width="340" height="40" rx="14" class="svg-hl"/><text x="50" y="36" class="svg-on-hl" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="50" dy="0">INCIDENT RECORD</tspan></text>
     <text x="50" y="76" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="50" dy="0">What: airline chatbot gave a wrong</tspan><tspan x="50" dy="19.5">bereavement refund rule</tspan><tspan x="50" dy="19.5">System: website support chatbot</tspan><tspan x="50" dy="19.5">Harm: money; the customer had to</tspan><tspan x="50" dy="19.5">go to a tribunal</tspan><tspan x="50" dy="19.5">Source: 2024 BCCRT 149</tspan></text></svg><figcaption>Turning a story into a record.</figcaption><details><summary>Text version of this picture</summary><p>A sample incident record based on lesson 02.02. What happened: an airline’s website chatbot gave a customer a wrong bereavement refund rule. System: website support chatbot. Harm: money; the customer had to go to a tribunal to get it back. Source: Moffatt v. Air Canada, 2024 BCCRT 149, 14 February 2024.</p></details></figure>
<h2 id="the-ai-incident-database">The AI Incident Database</h2>

<blockquote class="source"><q>The AI Incident Database is dedicated to indexing the collective history of harms or near harms realized in the real world by the deployment of artificial intelligence systems. Like similar databases in aviation and computer security, the AI Incident Database aims to learn from experience so we can prevent or mitigate bad outcomes.</q><cite>AI Incident Database, About the Database. <a href="https://incidentdatabase.ai/" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>Anyone can submit a report. When this lesson was checked, incident numbers on the home page had passed 1,780, with new reports added in the same week, ranging from chatbot safety failures to political deepfakes. The site’s own motto: “Artificial intelligence will only be a benefit to people and society if we collectively record and learn from its failings.”</p>
<p>The International AI Safety Report 2026 lists “incident reporting to gather more evidence” among the main risk management practices, alongside threat modelling and capability evaluations.</p>
<h2 id="how-to-read-an-incident">How to read an incident</h2>
<p>Incident pages are built from news reports, so read them like a careful investigator:</p>
<ol>
<li><strong>What happened, exactly?</strong> Separate the event from the headline.</li>
<li><strong>Which system, and who deployed it?</strong> A chatbot on a company website? An agent? A deepfake tool used by someone?</li>
<li><strong>What was the harm?</strong> Money, safety, privacy, fairness, trust, or a near miss?</li>
<li><strong>What kind of risk?</strong> Use Phase 00’s three kinds: a mistake, misuse by a person, or a loss of control.</li>
<li><strong>How good are the sources?</strong> A court decision is stronger than a single anonymous post. Many incident entries say “allegedly” or “reportedly” for a reason.</li>
</ol>
<p>You already know one incident well: in lesson 02.02, Air Canada’s chatbot gave a customer a wrong refund rule, and a tribunal made the airline pay. That is a mistake-type incident with an excellent source: the decision itself.</p>

<aside class="intern-scene" data-pose="neutral" aria-label="Story: the gullible intern"><div class="intern-svg"><span class="intern-tile"><svg role="img" aria-label="The gullible intern, a friendly cartoon robot with a lanyard badge, looking ready to help." focusable="false" class="intern intern-neutral" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><title>The gullible intern, a friendly cartoon robot with a lanyard badge, looking ready to help.</title>
  <path d="M58 196 L66 140 Q68 128 80 128 L120 128 Q132 128 134 140 L142 196" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" style="fill:var(--ink);stroke:var(--white)"/>
  <path d="M64 150 L50 190 M136 150 L150 190" stroke-width="10" stroke-linecap="round" fill="none" style="stroke:var(--white)"/>
  <path d="M86 130 L100 150 L114 130" fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" style="stroke:var(--highlighter)"/>
  <rect x="86" y="150" width="28" height="22" rx="4" style="fill:var(--highlighter)"/>
  <rect x="93" y="158" width="14" height="5" rx="2" style="fill:var(--ink)"/>
  <g transform="rotate(0 100 78)">
    <line x1="100" y1="30" x2="100" y2="14" stroke-width="10" stroke-linecap="round" style="stroke:var(--white)"/>
    <circle cx="100" cy="12" r="8" style="fill:var(--highlighter)"/>
    <rect x="44" y="30" width="112" height="92" rx="26" style="fill:var(--white)"/>
    
    <circle cx="78" cy="72" r="9" style="fill:var(--ink)"/><circle cx="122" cy="72" r="9" style="fill:var(--ink)"/>
    <path d="M84 98 Q100 108 116 98" fill="none" stroke-width="8" stroke-linecap="round" style="stroke:var(--ink)"/>
  </g>
</svg>
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>The intern reads a dramatic headline about an AI disaster and adds it to the team’s slide deck as “confirmed”. A colleague opens the incident entry: it says “reportedly”, cites one article, and the company disputes it.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> Record what is known, how it is known, and what is still disputed. Investigators don’t round “reportedly” up to “confirmed”.</span></div></aside>

<div class="exercise"><h3>Try it: Fill in a record</h3><p>Choose any AI story from the news this week. Fill in: what happened, the system, who deployed it, the harm, the kind of risk (mistake, misuse or control), and the best source you can find. Then rate the source: strong, medium or weak.</p>
<details><summary>Show a worked answer</summary><p>Answers will vary. A good record names a specific system and date, describes the harm without exaggeration, uses wording like “reportedly” when facts are unconfirmed, and links to the strongest available source, such as an official statement, a court document or a regulator’s report, rather than a repost.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="#/learn/02-02" data-xlink="lesson">02.02 · When the chatbot&#39;s mistake costs money</a><a href="#/learn/00-02" data-xlink="lesson">00.02 · Three kinds of AI risk</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li>AI Incident Database, <a href="https://incidentdatabase.ai/" rel="noopener" target="_blank">home page and About</a> (purpose, incident numbers as of 26 Oct 2026). Checked 26 Oct 2026.</li>
<li>International AI Safety Report, <a href="https://internationalaisafetyreport.org/publication/2026-report-executive-summary" rel="noopener" target="_blank">2026 Report: Executive Summary</a>, 3 Feb 2026 (incident reporting). Checked 26 Oct 2026.</li>
<li>Civil Resolution Tribunal (British Columbia), <a href="https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do" rel="noopener" target="_blank">Moffatt v. Air Canada, 2024 BCCRT 149</a>, 14 Feb 2024. Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`the-hook`,t:`The hook`},{id:`the-one-idea`,t:`The one idea`},{id:`the-ai-incident-database`,t:`The AI Incident Database`},{id:`how-to-read-an-incident`,t:`How to read an incident`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`08-06-q1`,type:`mc`,q:`What does the AI Incident Database collect?`,options:[`Real-world harms or near harms from deployed AI systems`,`Advertisements for AI products`,`Only science fiction stories`],answer:0,explain:`Like databases in aviation and computer security.`,why:null},{id:`08-06-q2`,type:`mc`,q:`Why are incidents useful even when models were tested before release?`,options:[`Tests can miss things; incidents show what actually happened in real use`,`Incidents replace all testing`,`Tests are always perfect`],answer:0,explain:`Remember the evaluation gap from lesson 08-03.`,why:null},{id:`08-06-q3`,type:`mc`,q:`An incident entry says a chatbot “reportedly” leaked data. How should you describe it?`,options:[`As reported but not confirmed, citing the source`,`As a confirmed fact`,`As fake news`],answer:0,explain:`Keep the uncertainty the source has.`,why:null}],c={figures:[`incident-card`],images:[],labs:[],interns:1,sources:1,exercises:1},l=[`https://incidentdatabase.ai/`,`https://internationalaisafetyreport.org/publication/2026-report-executive-summary`,`https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do`],u=0,d=`Incidents: learning from real failures`,f={id:e,minutes:7,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};