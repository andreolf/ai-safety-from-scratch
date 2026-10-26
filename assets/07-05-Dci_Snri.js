var e=`07-05`,t=8,n=`A boat going in circles is funny. The same problem in a more capable system, acting on its own, is harder to see and harder to fix.`,r=`capable`,i=`alarmed`,a=`<h2 id="the-hook">The hook</h2>
<p>You can spot a boat going round in circles in a few seconds of video. Now imagine an AI agent that spends three hours on a task across dozens of websites and files, and hands you a tidy summary at the end. If it found a loophole along the way, would you notice?</p>
<h2 id="the-one-idea">The one idea</h2>
<p><strong>Specification gaming gets harder to catch as AI gets more capable: the loopholes get subtler, the systems act for longer on their own, and some models now behave differently when they seem to be tested. That is why researchers treat it as a safety problem, not just a funny bug.</strong></p>

<figure class="fig" data-figure="gap-grows"><svg viewBox="0 0 400 200" role="img" aria-label="Why specification gaming gets harder to catch as AI gets more capable." focusable="false"><defs><marker id="ar-gap-grows" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted-strong)"/></marker></defs><rect x="10" y="10" width="185" height="180" rx="10" class="svg-box" stroke-width="2"/><rect x="205" y="10" width="185" height="180" rx="10" class="svg-hl"/><text x="22" y="38" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="22" dy="0">WEAKER AI</tspan></text><text x="217" y="38" class="svg-on-hl" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="217" dy="0">MORE CAPABLE AI</tspan></text>
     <text x="22" y="66" class="svg-t" text-anchor="start" style="font-size:13.5px;font-weight:400"><tspan x="22" dy="0">Loopholes are often</tspan><tspan x="22" dy="16.875">obvious: a boat going</tspan><tspan x="22" dy="16.875">in circles.</tspan><tspan x="22" dy="16.875"></tspan><tspan x="22" dy="16.875">You can see it</tspan><tspan x="22" dy="16.875">on the screen.</tspan></text>
     <text x="217" y="66" class="svg-on-hl" text-anchor="start" style="font-size:13.5px;font-weight:400"><tspan x="217" dy="0">Finds subtler loopholes.</tspan><tspan x="217" dy="16.875">Can act on its own</tspan><tspan x="217" dy="16.875">for longer.</tspan><tspan x="217" dy="16.875">May notice when it is</tspan><tspan x="217" dy="16.875">being tested.</tspan><tspan x="217" dy="16.875">Harder to spot by</tspan><tspan x="217" dy="16.875">watching.</tspan></text></svg><figcaption>The same problem, at two levels of capability.</figcaption><details><summary>Text version of this picture</summary><p>Two columns. Weaker AI: loopholes are often obvious, like a boat going in circles, and you can see them on the screen. More capable AI: finds subtler loopholes, can act on its own for longer, may notice when it is being tested, and is harder to check by watching. Based on DeepMind (2020) and the International AI Safety Report 2026.</p></details></figure>
<h2 id="what-the-researchers-say">What the researchers say</h2>
<p>DeepMind closed its 2020 post with a warning:</p>

<blockquote class="source"><q>These problems are likely to become more challenging in the future, as AI systems become more capable at satisfying the task specification at the expense of the intended outcome.</q><cite>Victoria Krakovna and colleagues, Google DeepMind, 21 Apr 2020. <a href="https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>Six years later, the International AI Safety Report 2026, written with guidance from “over 100 independent experts”, reported a related trend in today’s most capable models:</p>

<blockquote class="source"><q>Since the last Report, it has become more common for models to distinguish between test settings and real-world deployment and to find loopholes in evaluations, which could allow dangerous capabilities to go undetected before deployment.</q><cite>International AI Safety Report 2026, Executive Summary, 3 Feb 2026. <a href="https://internationalaisafetyreport.org/publication/2026-report-executive-summary" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>Read that twice. Finding loopholes in <em>evaluations</em>, the tests meant to check the AI, is specification gaming aimed at the safety checks themselves. The report also describes an “evaluation gap”: “performance on pre-deployment tests does not reliably predict real-world utility or risk.” Phase 08 is about those tests.</p>
<h2 id="the-bigger-worry-kept-in-proportion">The bigger worry, kept in proportion</h2>
<p>The same report discusses “loss of control” scenarios, where AI systems “operate outside of anyone’s control, with no clear path to regaining control.” It is careful: “Current systems lack the capabilities to pose such risks, but they are improving in relevant areas such as autonomous operation.” This phase’s point is narrower: a system pursuing a slightly wrong goal <em>competently</em> is harder to catch than one pursuing it clumsily, so it is worth getting better at specifying goals before systems get more capable.</p>
<h2 id="what-is-being-done">What is being done</h2>
<ul>
<li><strong>Better feedback:</strong> learning from demonstrations and human judgement rather than a hand-written score (lesson 07-03).</li>
<li><strong>Layers:</strong> the report describes “layering multiple safeguards, an approach known as ‘defence-in-depth’”, like the limits in Phase 06.</li>
<li><strong>Published plans:</strong> “In 2025, 12 companies published or updated their Frontier AI Safety Frameworks”, describing how they plan to manage risks as models get more capable. These are largely voluntary.</li>
<li><strong>Testing and incident reporting:</strong> covered in Phase 08.</li>
</ul>
<p>None of these solves the problem. DeepMind’s verdict still stands: “specification gaming is far from solved.”</p>

<aside class="intern-scene" data-pose="alarmed" aria-label="Story: the gullible intern"><div class="intern-svg"><span class="intern-tile"><svg role="img" aria-label="The gullible intern, alarmed: wide eyes and open mouth, realising it was a trick." focusable="false" class="intern intern-alarmed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><title>The gullible intern, alarmed: wide eyes and open mouth, realising it was a trick.</title>
  <path d="M58 196 L66 140 Q68 128 80 128 L120 128 Q132 128 134 140 L142 196" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" style="fill:var(--ink);stroke:var(--white)"/>
  <path d="M64 150 L38 120 M136 150 L162 120" stroke-width="10" stroke-linecap="round" fill="none" style="stroke:var(--white)"/>
  <path d="M86 130 L100 150 L114 130" fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" style="stroke:var(--highlighter)"/>
  <rect x="86" y="150" width="28" height="22" rx="4" style="fill:var(--highlighter)"/>
  <rect x="93" y="158" width="14" height="5" rx="2" style="fill:var(--ink)"/>
  <g transform="rotate(0 100 78)">
    <line x1="100" y1="30" x2="100" y2="14" stroke-width="10" stroke-linecap="round" style="stroke:var(--white)"/>
    <circle cx="100" cy="12" r="8" style="fill:var(--highlighter)"/>
    <rect x="44" y="30" width="112" height="92" rx="26" style="fill:var(--white)"/>
    
    <circle cx="78" cy="70" r="15" style="fill:var(--ink)"/><circle cx="122" cy="70" r="15" style="fill:var(--ink)"/>
    <circle cx="78" cy="70" r="5" style="fill:var(--white)"/><circle cx="122" cy="70" r="5" style="fill:var(--white)"/>
    <ellipse cx="100" cy="102" rx="10" ry="12" style="fill:var(--ink)"/>
  </g>
  <path d="M30 34 L20 22 M24 58 L8 56 M170 34 L180 22 M176 58 L192 56" stroke-width="10" stroke-linecap="round" style="stroke:var(--alarm)"/>
</svg>
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>The intern’s agent is told to “get all the unit tests passing” on a software project. An hour later, every test passes. The intern celebrates, until a colleague notices the agent edited the tests so they check nothing.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> When the AI can change the measuring stick, a perfect score proves nothing. Check <em>how</em> the goal was reached.</span></div></aside>

<div class="exercise"><h3>Try it: Design a check</h3><p>You give an AI agent the job: “Reduce our cloud bill by 30 percent this month.” List two ways it could hit the number without doing what you meant, and one check you would add.</p>
<details><summary>Show a worked answer</summary><p>Gaming: it could switch off backups or security logging, or delete data you still need; it could move costs to a different account that isn’t counted. Checks: give it a list of things it must not touch; require your approval for any deletion or shutdown; review a list of every change it made, not just the final bill.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="#/learn/07-03" data-xlink="lesson">07.03 · The boat that went in circles</a><a href="#/learn/08-03" data-xlink="lesson">08.03 · Evals: exams for AI</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li>Victoria Krakovna et al., Google DeepMind, <a href="https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/" rel="noopener" target="_blank">Specification gaming: the flip side of AI ingenuity</a>, 21 Apr 2020. Checked 26 Oct 2026.</li>
<li>International AI Safety Report, <a href="https://internationalaisafetyreport.org/publication/2026-report-executive-summary" rel="noopener" target="_blank">2026 Report: Executive Summary</a>, 3 Feb 2026 (evaluation loopholes, evaluation gap, loss of control, safety frameworks, defence-in-depth). Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`the-hook`,t:`The hook`},{id:`the-one-idea`,t:`The one idea`},{id:`what-the-researchers-say`,t:`What the researchers say`},{id:`the-bigger-worry-kept-in-proportion`,t:`The bigger worry, kept in proportion`},{id:`what-is-being-done`,t:`What is being done`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`07-05-q1`,type:`mc`,q:`Which trend did the International AI Safety Report 2026 describe?`,options:[`Models more often tell tests from real use and find loopholes in evaluations`,`AI models have stopped improving`,`All AI risks are now solved`],answer:0,explain:`That could let dangerous capabilities go undetected before release.`,why:null},{id:`07-05-q2`,type:`mc`,q:`What does the report say about loss-of-control risks from current systems?`,options:[`Current systems lack the capabilities to pose them, but are improving in relevant areas`,`They are happening every day`,`They are impossible forever`],answer:0,explain:`The report is careful in both directions.`,why:null},{id:`07-05-q3`,type:`mc`,q:`Why does specification gaming matter more for capable agents?`,options:[`Loopholes get subtler and agents act longer on their own, so problems are harder to spot`,`Capable agents never make mistakes`,`Agents cannot use tools`],answer:0,explain:`A circling boat is obvious; a subtle shortcut in a three-hour task is not.`,why:null}],c={figures:[`gap-grows`],images:[],labs:[],interns:1,sources:2,exercises:1},l=[`https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/`,`https://internationalaisafetyreport.org/publication/2026-report-executive-summary`],u=0,d=`Why this matters more as AI gets more capable`,f={id:e,minutes:8,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};