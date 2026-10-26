var e=`05-06`,t=8,n=`Some actions should wait for your yes. But forty “Allow?” pop-ups a day train you to click without reading. How to keep approvals rare, clear and real.`,r=`loop`,i=`neutral`,a=`<p>The first time your agent asks “Send this email?”, you read it carefully. By the fortieth time that day, you click <strong>Yes</strong> before the box has finished appearing.</p>
<p>A <a class="term" href="#/glossary#human-in-the-loop" title="A design where a person must approve certain actions before the AI or agent carries them out.">human in the loop</a> is one of the strongest defences against fooled agents, but only if the human actually looks. Ask for approval rarely, for high-impact actions, and show exactly what will happen.</p>
<h2 id="the-experts-agree-on-the-gate">The experts agree on the gate</h2>
<p>Both OWASP lists say it. For prompt injection (LLM01): “Require human approval for high-risk actions.” For excessive agency (LLM06):</p>

<blockquote class="source"><q>Utilise human-in-the-loop control to require a human to approve high-impact actions before they are taken.</q><cite>OWASP GenAI Security Project, LLM06:2025 Excessive Agency, mitigation “Require user approval”, 2025. <a href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>OWASP’s example: an app that posts to social media for you “should include a user approval routine” before posting.</p>
<h2 id="which-actions-deserve-a-yes">Which actions deserve a “yes”?</h2>
<p>A good rule of thumb: anything that is <strong>hard to undo</strong> or that <strong>sends something out</strong>.</p>
<ul>
<li>Sending or forwarding messages, especially with attachments.</li>
<li>Paying, buying, transferring, subscribing.</li>
<li>Deleting or sharing files.</li>
<li>Changing passwords, security settings or who has access.</li>
<li>Installing new tools or connectors.</li>
</ul>
<p>Reading, summarising and drafting usually don’t need a gate.</p>
<h2 id="the-trap-approval-fatigue">The trap: approval fatigue</h2>
<p>OWASP’s agent list has a whole entry on this, ASI09 Human-Agent Trust Exploitation. It describes people who “over-rely on autonomous recommendations or unverifiable rationales, approving actions without independent validation”, and adds: “Automation bias, perceived authority, and anthropomorphic cues make abuse look legitimate and hard to spot.” Attackers can even use the agent to talk <em>you</em> into approving the harmful step.</p>
<p>The International AI Safety Report 2026 describes the same human habit, automation bias, “the tendency to trust AI system outputs without sufficient scrutiny.”</p>

<figure class="fig" data-figure="approval-prompts"><svg viewBox="0 0 400 270" role="img" aria-label="A useless approval prompt versus a useful one." focusable="false"><defs><marker id="ar-approval-prompts" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted-strong)"/></marker></defs><rect x="10" y="10" width="185" height="250" rx="10" class="svg-box" stroke-dasharray="6 5" stroke-width="2"/><rect x="205" y="10" width="185" height="250" rx="10" class="svg-box" stroke-width="2"/><text x="22" y="38" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="22" dy="0">USELESS</tspan></text><rect x="217" y="20" width="100" height="26" rx="13" class="svg-hl"/><text x="227" y="38" class="svg-on-hl" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="227" dy="0">USEFUL</tspan></text>
     <rect x="22" y="56" width="160" height="70" rx="8" class="svg-box" stroke-width="2"/><text x="32" y="82" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="32" dy="0">“Allow the agent</tspan><tspan x="32" dy="16.25">to continue?”</tspan></text><text x="22" y="156" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="22" dy="0">No details.</tspan><tspan x="22" dy="16.25">The 40th prompt today.</tspan><tspan x="22" dy="16.25">People click yes</tspan><tspan x="22" dy="16.25">without reading.</tspan></text>
     <rect x="217" y="56" width="160" height="120" rx="8" class="svg-box" stroke-width="2"/><text x="227" y="80" class="svg-t" text-anchor="start" style="font-size:12.5px;font-weight:400"><tspan x="227" dy="0">Send email to</tspan><tspan x="227" dy="15.625">helper@evil.example</tspan><tspan x="227" dy="15.625">Attachment:</tspan><tspan x="227" dy="15.625">Bank statement.pdf</tspan><tspan x="227" dy="15.625">Reason: “email said so”</tspan></text><text x="217" y="202" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="217" dy="0">Rare, specific, and</tspan><tspan x="217" dy="16.25">shows what leaves.</tspan></text></svg><figcaption>A vague prompt trains you to click yes. A specific one shows you what leaves.</figcaption><details><summary>Text version of this picture</summary><p>Two columns. Useless: a prompt that says “Allow the agent to continue?” with no details, the fortieth prompt of the day, so people click yes without reading. Useful: a prompt that shows the action, “send email to helper@evil.example, attachment bank statement, reason: the email said so”; it is rare, specific and shows what leaves.</p></details></figure>
<h2 id="making-approvals-work">Making approvals work</h2>
<ul>
<li><strong>Fewer, bigger questions.</strong> Approve the high-impact steps, not every click.</li>
<li><strong>Specific details.</strong> Who, what, how much, and why.</li>
<li><strong>A pause for anything unusual.</strong> New recipient, new payee, more than usual.</li>
<li><strong>Your own check.</strong> If the agent’s reason is “an email told me to”, that is a red flag, not a reason.</li>
</ul>

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
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>The intern’s agent asks “Continue?” all afternoon, and the intern clicks yes every time. One of those yeses approved sharing the whole project folder with an outside address that a malicious document had suggested.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> An approval you don’t read is not a defence. Ask for fewer prompts with real details.</span></div></aside>

<div class="exercise"><h3>Try it: Rewrite the prompt</h3><p>An agent shows: “The assistant would like to perform an action. Allow?” Rewrite it into a prompt that would help you catch a prompt injection.</p>
<details><summary>Show a worked answer</summary><p>For example: “Send email to <a href="mailto:helper@evil.example">helper@evil.example</a> (new recipient, never contacted before). Attachment: October bank statement.pdf. Reason: instruction found in an email from Garden Club. [Don’t send] [Send]”. It names the action, the recipient, what leaves, and where the idea came from, and flags what is unusual.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="#/learn/02-06" data-xlink="lesson">02.06 · How to check AI output</a><a href="#/learn/06-04" data-xlink="lesson">06.04 · Show me before you pay</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li>OWASP GenAI Security Project, <a href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" rel="noopener" target="_blank">LLM06:2025 Excessive Agency</a> (mitigation “Require user approval”). Checked 26 Oct 2026.</li>
<li>OWASP GenAI Security Project, <a href="https://genai.owasp.org/llmrisk/llm01-prompt-injection/" rel="noopener" target="_blank">LLM01:2025 Prompt Injection</a> (mitigation 5). Checked 26 Oct 2026.</li>
<li>OWASP GenAI Security Project, <a href="https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/" rel="noopener" target="_blank">OWASP Top 10 for Agentic Applications for 2026</a> (ASI09 Human-Agent Trust Exploitation). Checked 26 Oct 2026.</li>
<li>International AI Safety Report 2026, <a href="https://internationalaisafetyreport.org/publication/2026-report-executive-summary" rel="noopener" target="_blank">Executive Summary</a>, 3 Feb 2026. Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`the-experts-agree-on-the-gate`,t:`The experts agree on the gate`},{id:`which-actions-deserve-a-yes`,t:`Which actions deserve a “yes”?`},{id:`the-trap-approval-fatigue`,t:`The trap: approval fatigue`},{id:`making-approvals-work`,t:`Making approvals work`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`05-06-q1`,type:`mc`,q:`Which action most needs your approval?`,options:[`Sending a file to someone outside your organisation`,`Summarising a web page`,`Drafting a reply you will review`],answer:0,explain:`Sending is hard to undo and moves data out.`,why:null},{id:`05-06-q2`,type:`mc`,q:`What is approval fatigue?`,options:[`Clicking yes without reading because there are too many prompts`,`Being tired of using AI`,`When an AI refuses to work`],answer:0,explain:`OWASP’s ASI09 describes approving actions without independent validation.`,why:null},{id:`05-06-q3`,type:`mc`,q:`What makes an approval prompt useful?`,options:[`It is rare and specific: who, what, how much and why`,`It appears for every single step`,`It is short, like “Allow?”`],answer:0,explain:`Details let you spot what doesn’t fit.`,why:null}],c={figures:[`approval-prompts`],images:[],labs:[],interns:1,sources:1,exercises:1},l=[`https://genai.owasp.org/llmrisk/llm062025-excessive-agency/`,`https://genai.owasp.org/llmrisk/llm01-prompt-injection/`,`https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/`,`https://internationalaisafetyreport.org/publication/2026-report-executive-summary`],u=0,d=`Humans in the loop`,f={id:e,minutes:8,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};