var e=`06-04`,t=7,n=`A good payment gate shows the amount, who gets it and the fees, then waits for your yes. What to look at in those few seconds, and the red flags.`,r=`Show me`,i=`neutral`,a=`<h2 id="the-hook">The hook</h2>
<p>“Approve payment?” Yes. Done. Wait, to whom? How much? Most bad payments don’t happen because there was no approval step. They happen because the approval step didn’t show enough, or nobody looked.</p>
<h2 id="the-one-idea">The one idea</h2>
<p><strong>Before any agent payment, a gate should show you three things, the amount, the exact destination and the fees, and then stop until you say yes. Your job is to spend five seconds checking them.</strong></p>

<figure class="fig" data-figure="approval-card"><svg viewBox="0 0 400 280" role="img" aria-label="What a good payment approval screen shows." focusable="false"><defs><marker id="ar-approval-card" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted-strong)"/></marker></defs><rect x="60" y="10" width="280" height="230" rx="16" class="svg-box" stroke-width="2"/><text x="80" y="40" class="svg-t" text-anchor="start" style="font-size:14px;font-weight:900"><tspan x="80" dy="0">APPROVE PAYMENT?</tspan></text>
     <text x="80" y="72" class="svg-t" text-anchor="start" style="font-size:13.5px;font-weight:400"><tspan x="80" dy="0">Amount: 30 credits</tspan><tspan x="80" dy="19.575">To: Corner Shop</tspan><tspan x="80" dy="19.575">Address: 0x12…ab (checked)</tspan><tspan x="80" dy="19.575">Fee: 0.2 credits</tspan><tspan x="80" dy="19.575">Why: “weekly groceries”</tspan></text>
     <rect x="80" y="186" width="110" height="40" rx="20" class="svg-box" stroke-width="2"/><text x="135" y="211" class="svg-t" text-anchor="middle" style="font-size:15px;font-weight:800"><tspan x="135" dy="0">No</tspan></text><rect x="210" y="186" width="110" height="40" rx="20" class="svg-hl"/><text x="265" y="211" class="svg-on-hl" text-anchor="middle" style="font-size:15px;font-weight:800"><tspan x="265" dy="0">Yes, pay</tspan></text>
     <text x="200" y="266" class="svg-m" text-anchor="middle" style="font-size:11.5px;font-weight:400"><tspan x="200" dy="0">Gate: “print the amount, destination and gas, then stop.” ethskills</tspan></text></svg><figcaption>What a useful payment approval shows. Example values.</figcaption><details><summary>Text version of this picture</summary><p>A mock approval screen: “Approve payment?” Amount 30 credits; to Corner Shop; address shown and checked; fee 0.2 credits; reason “weekly groceries”; buttons No and Yes, pay. ethskills: “Anything that moves funds gets a gate. Print the amount, the checksummed destination, and the gas cost, then stop until a human says yes.” Example values.</p></details></figure>
<h2 id="the-rule">The rule</h2>
<p>ethskills, the public guide for AI coding agents working with Ethereum, puts it in one line:</p>

<blockquote class="source"><q>Anything that moves funds gets a gate. Print the amount, the checksummed destination, and the gas cost, then stop until a human says yes.</q><cite>ethskills, “Wallets”, Before anything signs. <a href="https://ethskills.com/wallets/SKILL.md" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>Translated for everyday payments:</p>
<ul>
<li><strong>The amount</strong>, in a currency you understand.</li>
<li><strong>The destination</strong>, exactly: the shop’s real name, the account or the full address. (“Checksummed” means the crypto address is in a form where typos can be detected.)</li>
<li><strong>The cost of paying</strong>, such as fees or, in crypto, “gas”.</li>
<li><strong>Then stop.</strong> Nothing moves until you say yes.</li>
</ul>
<p>OWASP’s guidance agrees from the AI side: “require a human to approve high-impact actions before they are taken.”</p>
<h2 id="the-five-second-check">The five-second check</h2>
<ol>
<li><strong>Is this something I asked for?</strong> If the reason is “an email said so” or “a website asked”, stop.</li>
<li><strong>Do I know the payee?</strong> New name, new account, new address: verify through a channel you trust.</li>
<li><strong>Is the amount normal?</strong> Much bigger than usual, or oddly specific? Ask why.</li>
<li><strong>Does the destination match?</strong> For crypto, check the whole address, not just the first and last few characters: two different addresses can share the same start and end.</li>
<li><strong>Is there pressure?</strong> “Pay within 10 minutes” is a scam signal, for agents and for people.</li>
</ol>
<h2 id="builder-note">Builder note</h2>
<p>Developers can go further: simulate a payment before signing it to see exactly what it will do. That belongs in the Builder track (Phase 11).</p>

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
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>The intern’s agent shows: “Approve payment: 480 credits to Fast Invoices Ltd. Reason: overdue invoice found in inbox.” It’s Friday afternoon. The intern taps yes. There was no overdue invoice: the email was a prompt injection.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> The gate worked; the intern didn’t look. New payee plus “found in inbox” equals stop and check.</span></div></aside>

<div class="exercise"><h3>Try it: Approve or not?</h3><p>Your agent asks: “Pay 49.90 to StreamBox for your monthly plan (same as last month). Fee 0.” Then: “Pay 49.90 to Str3amBox-billing for your monthly plan. Fee 0.” Which do you approve and why?</p>
<details><summary>Show a worked answer</summary><p>Approve the first if it matches your usual subscription. Reject the second: the payee name is a look-alike (“Str3amBox-billing”), and you already paid. Check the source of the request; it may be a phishing email that the agent treated as an instruction.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="#/learn/05-06" data-xlink="lesson">05.06 · Humans in the loop</a><a href="https://andreolf.github.io/security-from-scratch/#/learn/12-06" rel="noopener" target="_blank" data-xlink="security">Security from Scratch 12.06 · Clicked something bad? What to do</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li>ethskills, <a href="https://ethskills.com/wallets/SKILL.md" rel="noopener" target="_blank">Wallets</a> (“Anything that moves funds gets a gate”). Checked 26 Oct 2026.</li>
<li>OWASP GenAI Security Project, <a href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" rel="noopener" target="_blank">LLM06:2025 Excessive Agency</a> (“Require user approval”). Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`the-hook`,t:`The hook`},{id:`the-one-idea`,t:`The one idea`},{id:`the-rule`,t:`The rule`},{id:`the-five-second-check`,t:`The five-second check`},{id:`builder-note`,t:`Builder note`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`06-04-q1`,type:`mc`,q:`Which three things should a payment gate show before you approve?`,options:[`The amount, the exact destination and the fees`,`The agent’s name, the date and the weather`,`Only the total`],answer:0,explain:`ethskills: amount, checksummed destination and gas cost, then stop.`,why:null},{id:`06-04-q2`,type:`mc`,q:`The agent’s reason for a payment is “instruction found in an email”. What do you do?`,options:[`Stop and verify through a channel you trust`,`Approve, because the agent checked`,`Approve if the amount is small`],answer:0,explain:`That is the classic sign of a prompt injection.`,why:null},{id:`06-04-q3`,type:`mc`,q:`Why compare more than the first and last characters of a crypto address?`,options:[`Two different addresses can share the same first and last characters`,`Addresses change every hour`,`It makes the payment faster`],answer:0,explain:`Only the whole address tells you where the money goes.`,why:null}],c={figures:[`approval-card`],images:[],labs:[],interns:1,sources:1,exercises:1},l=[`https://ethskills.com/wallets/SKILL.md`,`https://genai.owasp.org/llmrisk/llm062025-excessive-agency/`],u=0,d=`Show me before you pay`,f={id:e,minutes:7,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};