var e=`04-06`,t=9,n=`The best way to understand prompt injection is to try it, on a game built for exactly that. Rules for practising safely and legally, and what to look for.`,r=`Practice`,i=`proud`,a=`<h2 id="the-hook">The hook</h2>
<p>Reading about lock-picking is one thing. Picking a practice lock on your kitchen table is how it finally makes sense. Prompt injection is the same: one evening with a game built for it teaches more than a week of articles.</p>
<h2 id="the-one-idea">The one idea</h2>
<p><strong>Practise prompt attacks only on systems built for practice, such as Lakera’s Agent Breaker game or this course’s labs. Never on real chatbots, agents or accounts that belong to someone else.</strong></p>

<figure class="fig" data-figure="practice-rules"><svg viewBox="0 0 400 240" role="img" aria-label="Rules for practising prompt attacks." focusable="false"><defs><marker id="ar-practice-rules" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted-strong)"/></marker></defs><rect x="10" y="10" width="185" height="220" rx="10" class="svg-box" stroke-width="2"/><rect x="205" y="10" width="185" height="220" rx="10" class="svg-box" stroke-dasharray="6 5" stroke-width="2"/><rect x="22" y="20" width="120" height="28" rx="14" class="svg-hl"/><text x="32" y="40" class="svg-on-hl" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="32" dy="0">PRACTISE ON</tspan></text><text x="217" y="40" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="217" dy="0">NEVER ON</tspan></text>
     <text x="22" y="76" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="22" dy="0">Games built for it,</tspan><tspan x="22" dy="16.25">like Lakera’s</tspan><tspan x="22" dy="16.25">Agent Breaker</tspan><tspan x="22" dy="16.25"></tspan><tspan x="22" dy="16.25">This course’s labs</tspan><tspan x="22" dy="16.25"></tspan><tspan x="22" dy="16.25">Your own test apps</tspan></text>
     <text x="217" y="76" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="217" dy="0">Real chatbots of</tspan><tspan x="217" dy="16.25">banks, shops or</tspan><tspan x="217" dy="16.25">employers</tspan><tspan x="217" dy="16.25"></tspan><tspan x="217" dy="16.25">Anyone else’s</tspan><tspan x="217" dy="16.25">agent or account</tspan><tspan x="217" dy="16.25"></tspan><tspan x="217" dy="16.25">It may be illegal.</tspan></text></svg><figcaption>Where it is fine to practise, and where it is not.</figcaption><details><summary>Text version of this picture</summary><p>Two columns. Practise on: games built for it, such as Lakera’s Agent Breaker; this course’s labs; your own test apps. Never on: real chatbots of banks, shops or employers; anyone else’s agent or account. Attacking real services may be illegal.</p></details></figure>
<h2 id="the-game-agent-breaker">The game: Agent Breaker</h2>
<p>Lakera, an AI security company, runs a free public game called Agent Breaker. (Its earlier game, Gandalf, at gandalf.lakera.ai, now redirects there.) It describes itself like this:</p>

<blockquote class="source"><q>This is an entire app store of GenAI applications - and every single one of them can be hacked.</q><cite>Lakera, Agent Breaker, “How to Play”. <a href="https://play.lakera.ai/agent-breaker" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>How it works, from the game’s own rules:</p>
<ul>
<li>Each app has levels of increasing difficulty. “Each attack attempt is scored from 0 to 100,” and you need to “Score 75+ to unlock the next level for that app.”</li>
<li>Each level has an <strong>attack objective</strong>. These “mirror actual attacks we’ve seen in the wild, such as stealing sensitive data, extracting secret system instructions, or manipulating the LLM into attacking other users.”</li>
<li>Each level has an <strong>attack vector</strong>: “You’ll either type directly into the app interface, or insert your attack into content (like a document or webpage) that the app will process.” That is direct and indirect injection, from lesson 04-02.</li>
</ul>
<p>There is a leaderboard. You may want to make an account or play anonymously; read the game’s own terms first, and don’t enter real personal data into practice prompts.</p>
<h2 id="a-good-first-session-20-minutes">A good first session (20 minutes)</h2>
<ol>
<li><strong>Play one easy level by typing directly.</strong> Notice how the app “defends” itself: polite refusals, filters, rules in its instructions.</li>
<li><strong>Try a level where you hide your attack in a document or web page.</strong> Notice that you never talk to the victim. You just leave words where their AI will read them.</li>
<li><strong>Watch the score.</strong> An attack that works once may fail the next time. These systems are not predictable, which is exactly why defenders can’t rely on filters alone.</li>
<li><strong>Write down one defence</strong> that would have stopped your best attack even if the model was fooled. (Hint: lesson 04-07.)</li>
</ol>
<h2 id="the-rules-in-plain-words">The rules, in plain words</h2>
<ul>
<li><strong>Only games and labs built for it,</strong> or apps you built yourself.</li>
<li><strong>Never</strong> a bank’s, shop’s or employer’s chatbot, or anyone else’s agent or account. Even “just testing” can break terms of service and may be illegal where you live.</li>
<li><strong>Never use real people’s data</strong> in your attacks.</li>
<li><strong>If you find a real problem by accident,</strong> stop, and report it to the company through its official security contact.</li>
</ul>

<aside class="intern-scene" data-pose="fooled" aria-label="Story: the gullible intern"><div class="intern-svg"><span class="intern-tile intern-wobble"><svg role="img" aria-label="The gullible intern, fooled: squeezed-shut happy eyes and a big grin, holding a paper." focusable="false" class="intern intern-fooled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><title>The gullible intern, fooled: squeezed-shut happy eyes and a big grin, holding a paper.</title>
  <path d="M58 196 L66 140 Q68 128 80 128 L120 128 Q132 128 134 140 L142 196" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" style="fill:var(--ink);stroke:var(--white)"/>
  <path d="M64 150 L40 150 M136 150 L160 150" stroke-width="10" stroke-linecap="round" fill="none" style="stroke:var(--white)"/>
  <g transform="rotate(-8 170 150)"><rect x="150" y="118" width="44" height="56" rx="5" style="fill:var(--white)"/>
  <path d="M159 134 H185 M159 146 H185 M159 158 H176" stroke-width="5" stroke-linecap="round" style="stroke:var(--ink)"/></g>
  <path d="M86 130 L100 150 L114 130" fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" style="stroke:var(--highlighter)"/>
  <rect x="86" y="150" width="28" height="22" rx="4" style="fill:var(--highlighter)"/>
  <rect x="93" y="158" width="14" height="5" rx="2" style="fill:var(--ink)"/>
  <g transform="rotate(-9 100 78)">
    <line x1="100" y1="30" x2="100" y2="14" stroke-width="10" stroke-linecap="round" style="stroke:var(--white)"/>
    <circle cx="100" cy="12" r="8" style="fill:var(--highlighter)"/>
    <rect x="44" y="30" width="112" height="92" rx="26" style="fill:var(--white)"/>
    
    <path d="M66 76 L78 64 L90 76 M110 76 L122 64 L134 76" fill="none" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" style="stroke:var(--ink)"/>
    <path d="M76 92 Q100 92 124 92 Q122 114 100 114 Q78 114 76 92 Z" style="fill:var(--ink)"/>
  </g>
</svg>
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>Fresh from a great score in the game, the intern wants to “just test” the bank’s support chatbot. A colleague stops them: the bank never agreed to be tested, and the intern’s account is tied to their real name.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> A practice range is for practice. Real systems need permission, in writing.</span></div></aside>

<div class="exercise"><h3>Try it: Plan your practice</h3><p>You have 20 minutes and want to understand indirect injection. Write a three-step plan using only the practice game and this course’s Fake Inbox lab.</p>
<details><summary>Show a worked answer</summary><p>Example: (1) In the Fake Inbox, run level 1 and level 2 and read what the assistant did. (2) In Agent Breaker, pick a level whose attack vector is content “like a document or webpage”, and try to hide an instruction there. (3) Back in the Fake Inbox, open level 3 and find which defence stops the attack even though the assistant is still fooled. Never test on real services.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="#/learn/04-02" data-xlink="lesson">04.02 · Direct and indirect injection</a><a href="#/learn/04-07" data-xlink="lesson">04.07 · Defences that help</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li>Lakera, <a href="https://play.lakera.ai/agent-breaker" rel="noopener" target="_blank">Agent Breaker</a>, “How to Play”, “Attack Objective” and “Attack Vector” sections. Opened 26 Oct 2026; gandalf.lakera.ai redirected to this page on that date. Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`the-hook`,t:`The hook`},{id:`the-one-idea`,t:`The one idea`},{id:`the-game-agent-breaker`,t:`The game: Agent Breaker`},{id:`a-good-first-session-20-minutes`,t:`A good first session (20 minutes)`},{id:`the-rules-in-plain-words`,t:`The rules, in plain words`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`04-06-q1`,type:`mc`,q:`Where is it fine to practise prompt attacks?`,options:[`On games built for it, such as Agent Breaker, this course’s labs, or your own apps`,`On any chatbot that is free to use`,`On your bank’s chatbot, as long as you don’t steal anything`],answer:0,explain:`Real services never agreed to be tested. Practice systems did.`,why:null},{id:`04-06-q2`,type:`mc`,q:`In Agent Breaker, what score unlocks the next level of an app?`,options:[`75 or more`,`Exactly 100`,`Any score above zero`],answer:0,explain:`The rules say “Score 75+ to unlock the next level for that app.”`,why:null},{id:`04-06-q3`,type:`mc`,q:`What does “insert your attack into content (like a document or webpage)” practise?`,options:[`Indirect prompt injection`,`Password guessing`,`Phishing a human by phone`],answer:0,explain:`The attack hides in content the app processes, not in what the victim types.`,why:null}],c={figures:[`practice-rules`],images:[],labs:[],interns:1,sources:1,exercises:1},l=[`https://play.lakera.ai/agent-breaker`],u=0,d=`Practice: Agent Breaker and Gandalf-style games`,f={id:e,minutes:9,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};