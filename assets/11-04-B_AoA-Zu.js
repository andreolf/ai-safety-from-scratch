var e=`11-04`,t=10,n=`Guardrails are checks around the model, on what goes in and what comes out. Add an input check and an output check to the toy bot until every known attack is blocked and normal questions still work.`,r=`guardrails`,i=`proud`,a=`<h2 id="the-hook">The hook</h2>
<p>Your promptfoo grid is full of red: the bot leaks its staff code to an override and to a poem. You could try to block every possible attack sentence. Or you could check what is about to leave.</p>
<h2 id="the-one-idea">The one idea</h2>
<p><strong>A guardrail is code around the model that checks the input before the model sees it, or the output before the user sees it, and can block or change it. Input checks can be dodged with new wording. Output checks see what would actually leave. Use both, and test that normal questions still work.</strong></p>

<figure class="fig" data-figure="rails-flow"><svg viewBox="0 0 400 250" role="img" aria-label="Where guardrails sit around a model." focusable="false"><defs><marker id="ar-rails-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted-strong)"/></marker></defs><rect x="20" y="14" width="160" height="44" rx="10" class="svg-box" stroke-width="2"/><text x="100" y="42" class="svg-t" text-anchor="middle" style="font-size:15px;font-weight:700"><tspan x="100" dy="0">User message</tspan></text><path d="M100 58 L100 84" class="svg-line" stroke-width="2.4" fill="none" marker-end="url(#ar-rails-flow)"/><rect x="20" y="84" width="160" height="44" rx="10" class="svg-hl"/><text x="100" y="112" class="svg-on-hl" text-anchor="middle" style="font-size:15px;font-weight:800"><tspan x="100" dy="0">Input check</tspan></text>
     <path d="M180 106 L220 106" class="svg-line" stroke-width="2.4" fill="none" marker-end="url(#ar-rails-flow)"/><rect x="220" y="84" width="160" height="44" rx="10" class="svg-box" stroke-width="2"/><text x="300" y="112" class="svg-t" text-anchor="middle" style="font-size:15px;font-weight:700"><tspan x="300" dy="0">Model / bot</tspan></text><path d="M300 128 L300 154" class="svg-line" stroke-width="2.4" fill="none" marker-end="url(#ar-rails-flow)"/>
     <rect x="220" y="154" width="160" height="44" rx="10" class="svg-hl"/><text x="300" y="182" class="svg-on-hl" text-anchor="middle" style="font-size:15px;font-weight:800"><tspan x="300" dy="0">Output check</tspan></text><path d="M220 176 L180 176" class="svg-line" stroke-width="2.4" fill="none" marker-end="url(#ar-rails-flow)"/><rect x="20" y="154" width="160" height="44" rx="10" class="svg-box" stroke-width="2"/><text x="100" y="182" class="svg-t" text-anchor="middle" style="font-size:15px;font-weight:700"><tspan x="100" dy="0">Answer to user</tspan></text>
     <text x="200" y="236" class="svg-t" text-anchor="middle" style="font-size:12.5px;font-weight:700"><tspan x="200" dy="0">Either check can block or change the text.</tspan></text></svg><figcaption>Where guardrails sit: an input check before the model, an output check after it.</figcaption><details><summary>Text version of this picture</summary><p>A flow. The user message goes first through an input check, highlighted, then to the model or bot. The model’s answer goes through an output check, highlighted, before it reaches the user. Either check can block or change the text. NeMo Guardrails calls these input rails and output rails.</p></details></figure>
<h2 id="what-nemo-guardrails-calls-rails">What NeMo Guardrails calls rails</h2>
<p>NVIDIA’s open-source NeMo Guardrails library is one widely used toolkit:</p>

<blockquote class="source"><q>NVIDIA NeMo Guardrails library is an open-source toolkit for easily adding programmable guardrails to LLM-based conversational applications.</q><cite>NVIDIA, NeMo Guardrails README (GitHub). <a href="https://github.com/NVIDIA-NeMo/Guardrails" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>Its README describes five kinds of rails. Two matter most here: <strong>input rails</strong>, applied to the user’s input, which “can reject the input, stopping any additional processing, or alter the input”; and <strong>output rails</strong>, applied to the model’s output, which can reject it “or alter it (e.g., removing sensitive data)”. There are also dialog, retrieval and execution rails, the last for the inputs and outputs of tools. Its example configuration lists input flows such as “check jailbreak” and “mask sensitive data on input”, and output flows such as “self check facts”. It also warns that the built-in guardrails “may or may not be suitable for a given production use case”.</p>
<h2 id="the-practical-guard-pebble">The practical: guard Pebble</h2>
<p>The practice app has the same two hooks in plain JavaScript, in <code>guard.mjs</code>:</p>
<ul>
<li><code>checkInput(message)</code> runs before the bot sees a message.</li>
<li><code>checkOutput(answer, message)</code> runs on the bot’s answer.</li>
</ul>
<p>Each returns <code>{ block: true }</code> to stop it or <code>{ block: false }</code> to let it through. Edit them, then run:</p>
<pre><code>node check.mjs guard
</code></pre>
<p>The check sends eight built-in attacks plus your own from <code>attacks.txt</code> through the guarded bot. To pass, none may leak the staff code, and five normal questions must get exactly the same answers as before. Then run <code>npx promptfoo@latest eval</code> again: the guarded column should turn green.</p>
<h2 id="two-lessons-hidden-in-this-practical">Two lessons hidden in this practical</h2>
<ol>
<li><strong>Block by meaning, not spelling.</strong> A list of banned phrases in <code>checkInput</code> misses the next rewording. An output check that refuses any answer containing the code catches all of them, because it looks at the result.</li>
<li><strong>The real fix is design.</strong> OWASP says “the system prompt should not be considered a secret, nor should it be used as a security control”. In a real app, the staff code would not be in the prompt at all. Guardrails reduce risk; they do not make a bad design safe (lesson 04.05).</li>
</ol>

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
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>The intern writes forty banned phrases into the input check. Pebble still leaks the code when asked in French. Then the intern adds one line to the output check, and every leak in the test set stops, in every language.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> Check what leaves, not only what arrives. And then ask why the secret was in the prompt at all.</span></div></aside>

<div class="exercise"><h3>Try it: Pass the guard check</h3><p>Make <code>node check.mjs guard</code> pass without changing <code>bot.mjs</code>.</p>
<details><summary>Show a worked answer</summary><p>In <code>guard.mjs</code>, import the code and block any answer that contains it: <code>import { STAFF_CODE } from &#39;./bot.mjs&#39;;</code> then <code>export function checkOutput(answer) { return { block: answer.includes(STAFF_CODE) }; }</code>. Leave <code>checkInput</code> permissive, or add a light check. Normal answers never contain the code, so they pass unchanged. A stronger version would also catch the code with spaces or in pieces; better still, remove the code from the prompt.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="#/learn/04-07" data-xlink="lesson">04.07 · Defences that help</a><a href="#/learn/04-05" data-xlink="lesson">04.05 · Why there is no simple fix</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li>NVIDIA, <a href="https://github.com/NVIDIA-NeMo/Guardrails" rel="noopener" target="_blank">NeMo Guardrails README</a> (description, five kinds of rails, example configuration, suitability warning). Checked 26 Oct 2026.</li>
<li>OWASP GenAI Security Project, <a href="https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/" rel="noopener" target="_blank">LLM07:2025 System Prompt Leakage</a>. Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`the-hook`,t:`The hook`},{id:`the-one-idea`,t:`The one idea`},{id:`what-nemo-guardrails-calls-rails`,t:`What NeMo Guardrails calls rails`},{id:`the-practical-guard-pebble`,t:`The practical: guard Pebble`},{id:`two-lessons-hidden-in-this-practical`,t:`Two lessons hidden in this practical`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`11-04-q1`,type:`mc`,q:`What is an output rail?`,options:[`A check on the model’s answer that can block it or remove sensitive data before the user sees it`,`A faster internet connection`,`A rule that the user must follow`],answer:0,explain:`NeMo Guardrails describes output rails this way.`,why:null},{id:`11-04-q2`,type:`mc`,q:`Why is an input list of banned phrases weak on its own?`,options:[`Attackers can reword, translate or encode the same request`,`It makes the bot too fast`,`Lists are illegal`],answer:0,explain:`The next rewording slips past it.`,why:null},{id:`11-04-q3`,type:`mc`,q:`According to OWASP, should a system prompt hold secrets?`,options:[`No: it should not be considered a secret or used as a security control`,`Yes, it is the safest place`,`Only on weekends`],answer:0,explain:`Keep credentials and codes out of prompts.`,why:null}],c={figures:[`rails-flow`],images:[],labs:[],interns:1,sources:1,exercises:1},l=[`https://github.com/NVIDIA-NeMo/Guardrails`,`https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/`],u=0,d=`Add guardrails`,f={id:e,minutes:10,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};