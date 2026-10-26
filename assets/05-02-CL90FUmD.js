var e=`05-02`,t=8,n=`Least privilege in plain words. Give an agent only the access it needs, for only as long as it needs it, and check what a connection really allows.`,r=`touch`,i=`neutral`,a=`<p>OWASP names three root causes of “excessive agency” in AI apps: too many tools, too much access and too much freedom. Each one is a setting somebody chose, usually for convenience.</p>
<p><a class="term" href="#/glossary#least-privilege" title="Giving a person or program only the access it needs, for only as long as it needs it.">Least privilege</a>: give an agent only the access it needs for the job, for only as long as it needs it. If it is fooled or makes a mistake, the damage stays small.</p>

<figure class="fig" data-figure="least-privilege"><svg viewBox="0 0 400 250" role="img" aria-label="Least privilege: a master key versus one key for one job." focusable="false"><defs><marker id="ar-least-privilege" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted-strong)"/></marker></defs><rect x="10" y="10" width="185" height="230" rx="10" class="svg-box" stroke-dasharray="6 5" stroke-width="2"/><rect x="205" y="10" width="185" height="230" rx="10" class="svg-box" stroke-width="2"/><text x="22" y="40" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="22" dy="0">MASTER KEY</tspan></text><rect x="217" y="20" width="150" height="28" rx="14" class="svg-hl"/><text x="227" y="40" class="svg-on-hl" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="227" dy="0">ONE-JOB KEY</tspan></text>
     <text x="22" y="76" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="22" dy="0">Read, send, delete</tspan><tspan x="22" dy="16.25">all email</tspan><tspan x="22" dy="16.25">All files</tspan><tspan x="22" dy="16.25">Payments</tspan><tspan x="22" dy="16.25">Forever</tspan><tspan x="22" dy="16.25"></tspan><tspan x="22" dy="16.25">If tricked, it can</tspan><tspan x="22" dy="16.25">do all of this.</tspan></text>
     <text x="217" y="76" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="217" dy="0">Read calendar only</tspan><tspan x="217" dy="16.25">This week only</tspan><tspan x="217" dy="16.25">No sending</tspan><tspan x="217" dy="16.25">No payments</tspan><tspan x="217" dy="16.25">Ends Friday</tspan><tspan x="217" dy="16.25"></tspan><tspan x="217" dy="16.25">If tricked, the</tspan><tspan x="217" dy="16.25">damage is small.</tspan></text></svg><figcaption>A master key versus a key for one job.</figcaption><details><summary>Text version of this picture</summary><p>Two columns. Master key: read, send and delete all email, all files, payments, forever; if tricked, the agent can do all of this. One-job key: read the calendar only, this week only, no sending, no payments, ends Friday; if tricked, the damage is small. Based on OWASP LLM06:2025 Excessive Agency and the MCP security guidance on scope minimisation.</p></details></figure>
<h2 id="three-ways-to-give-too-much">Three ways to give too much</h2>
<p>OWASP’s entry on Excessive Agency names the root causes:</p>

<blockquote class="source"><q>The root cause of Excessive Agency is typically one or more of: excessive functionality; excessive permissions; excessive autonomy.</q><cite>OWASP GenAI Security Project, LLM06:2025 Excessive Agency, 2025. <a href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>In everyday words:</p>
<ul>
<li><strong>Too many tools (functionality).</strong> OWASP’s example: an agent only needs to <em>read</em> documents, but the add-on it uses can also <em>modify and delete</em> them.</li>
<li><strong>Too much access (permissions).</strong> The tool reaches more than the job needs: all your files instead of one folder, all your email instead of one label.</li>
<li><strong>Too much freedom (autonomy).</strong> It takes high-impact actions without checking. OWASP’s example: an add-on that “performs deletions without any confirmation from the user.”</li>
</ul>
<p>OWASP’s first fix is simple: “Limit the extensions that LLM agents are allowed to call to only the minimum necessary.” If the agent doesn’t need to open web links, don’t give it a tool that can.</p>
<h2 id="broad-keys-make-big-blast-radiuses">Broad keys make big blast radiuses</h2>
<p>The security guidance for MCP, a popular standard for connecting AI apps to tools (lesson 05-05), warns about connections that ask for every permission up front. If such a broad access token is stolen, the result is an “expanded blast radius”: the attacker can reach unrelated tools and data. Narrow permissions, asked for only when needed, limit that.</p>
<h2 id="what-to-look-for-when-you-connect-an-app">What to look for when you connect an app</h2>
<p>When an AI app asks to connect to your Google, Microsoft or other account, read the permission screen:</p>
<ul>
<li><strong>Read only, or read and write?</strong> Summaries need read only.</li>
<li><strong>Which parts?</strong> Calendar only, or mail, contacts and files too?</li>
<li><strong>For how long?</strong> Can you set an end date, or remove it easily later?</li>
<li><strong>Can it act without asking?</strong> Look for settings like “ask before sending”.</li>
</ul>

<aside class="intern-scene" data-pose="proud" aria-label="Story: the gullible intern"><div class="intern-svg"><span class="intern-tile"><svg role="img" aria-label="The gullible intern, proud: smiling with a check mark, having verified first." focusable="false" class="intern intern-proud" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><title>The gullible intern, proud: smiling with a check mark, having verified first.</title>
  <path d="M58 196 L66 140 Q68 128 80 128 L120 128 Q132 128 134 140 L142 196" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" style="fill:var(--ink);stroke:var(--white)"/>
  <path d="M64 150 L50 190 M136 150 L162 118" stroke-width="10" stroke-linecap="round" fill="none" style="stroke:var(--white)"/>
  <circle cx="170" cy="100" r="22" style="fill:var(--highlighter)"/><path d="M159 100 L167 108 L182 92" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" style="stroke:var(--ink)"/>
  <path d="M86 130 L100 150 L114 130" fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" style="stroke:var(--highlighter)"/>
  <rect x="86" y="150" width="28" height="22" rx="4" style="fill:var(--highlighter)"/>
  <rect x="93" y="158" width="14" height="5" rx="2" style="fill:var(--ink)"/>
  <g transform="rotate(0 100 78)">
    <line x1="100" y1="30" x2="100" y2="14" stroke-width="10" stroke-linecap="round" style="stroke:var(--white)"/>
    <circle cx="100" cy="12" r="8" style="fill:var(--highlighter)"/>
    <rect x="44" y="30" width="112" height="92" rx="26" style="fill:var(--white)"/>
    
    <path d="M66 74 Q78 62 90 74 M110 74 Q122 62 134 74" fill="none" stroke-width="8" stroke-linecap="round" style="stroke:var(--ink)"/>
    <path d="M80 94 Q100 112 120 94" fill="none" stroke-width="8" stroke-linecap="round" style="stroke:var(--ink)"/>
  </g>
</svg>
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>This time the intern wants an agent to prepare a weekly meeting summary. Instead of “full access to Google account”, the intern connects calendar read-only and one shared notes folder, and sets a reminder to review the connection in a month.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> If the agent is tricked tomorrow, the worst it can do is read a calendar.</span></div></aside>

<div class="exercise"><h3>Try it: Trim the permissions</h3><p>An AI expense helper asks for: read and send email, read all files, access to your bank account, and permission to make payments. Its job is to collect receipts from email and fill a monthly spreadsheet. Which permissions does it actually need?</p>
<details><summary>Show a worked answer</summary><p>Read access to email (ideally only receipts or a dedicated label) and write access to one spreadsheet. It doesn’t need to send email, read all files, see your bank account or make payments. If it offers no narrower option, use a separate email address for receipts, or don’t connect it.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="#/learn/04-07" data-xlink="lesson">04.07 · Defences that help</a><a href="https://andreolf.github.io/security-from-scratch/#/learn/05-04" rel="noopener" target="_blank" data-xlink="security">Security from Scratch 05.04 · Never let a stranger control your screen</a><a href="https://andreolf.github.io/security-from-scratch/#/learn/05-05" rel="noopener" target="_blank" data-xlink="security">Security from Scratch 05.05 · Apps only from the official store</a><a href="https://andreolf.github.io/security-from-scratch/#/learn/05-03" rel="noopener" target="_blank" data-xlink="security">Security from Scratch 05.03 · Fake &quot;virus&quot; warnings and tech-support calls</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li>OWASP GenAI Security Project, <a href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" rel="noopener" target="_blank">LLM06:2025 Excessive Agency</a> (root causes, examples, mitigation 1 “Minimize extensions”). Checked 26 Oct 2026.</li>
<li>Model Context Protocol, <a href="https://modelcontextprotocol.io/specification/draft/basic/security_best_practices" rel="noopener" target="_blank">Security Best Practices</a> (“Scope Minimization”). Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`three-ways-to-give-too-much`,t:`Three ways to give too much`},{id:`broad-keys-make-big-blast-radiuses`,t:`Broad keys make big blast radiuses`},{id:`what-to-look-for-when-you-connect-an-app`,t:`What to look for when you connect an app`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`05-02-q1`,type:`mc`,q:`What does least privilege mean?`,options:[`Only the access needed, for only as long as needed`,`The cheapest version of an app`,`Letting the agent choose its own permissions`],answer:0,explain:`Less access means a fooled agent can do less damage.`,why:null},{id:`05-02-q2`,type:`mc`,q:`Which is an example of “excessive functionality”?`,options:[`A tool meant to read documents that can also delete them`,`An agent that is slow`,`An agent that asks before sending`],answer:0,explain:`That is OWASP’s own example.`,why:null},{id:`05-02-q3`,type:`mc`,q:`Why is a broad access token risky?`,options:[`If stolen, it opens unrelated tools and data: an expanded blast radius`,`It costs more money`,`It makes the AI less accurate`],answer:0,explain:`The MCP security guidance warns about broad scopes for exactly this reason.`,why:null}],c={figures:[`least-privilege`],images:[],labs:[],interns:1,sources:1,exercises:1},l=[`https://genai.owasp.org/llmrisk/llm062025-excessive-agency/`,`https://modelcontextprotocol.io/specification/draft/basic/security_best_practices`],u=0,d=`Permissions: what can it touch?`,f={id:e,minutes:8,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};