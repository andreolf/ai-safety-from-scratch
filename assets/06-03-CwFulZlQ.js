var e=`06-03`,t=9,n=`Four limits turn a risky paying agent into a safe one. A total budget, a per-payment cap, a list of who it may pay, and an end date. Set them yourself in the simulator.`,r=`Budgets`,i=`proud`,a=`<p>A draft Ethereum standard, ERC-7715, describes how an app can ask a wallet for a limited permission, with an expiry, instead of full control. Card issuers and banks offer similar controls. Four kinds of limit do most of the work.</p>
<p>Give a paying agent four limits it cannot change: a total budget, a <a class="term" href="#/glossary#spending-cap" title="A hard limit on how much can be spent, per payment or per day, that the agent cannot raise itself.">per-payment cap</a>, an <a class="term" href="#/glossary#allowlist" title="A list of the only people, shops or addresses something is allowed to deal with. Everything else is blocked.">allowlist</a> of who it may pay, and an expiry date. Add your approval for anything unusual. Then even a fooled agent can’t do much damage.</p>

<figure class="kit-img" data-image="figure-spending-limits"><img src="kit/figure-spending-limits-1600.webp" srcset="kit/figure-spending-limits-800.webp 800w, kit/figure-spending-limits-1600.webp 1600w" sizes="(min-width: 900px) 860px, 100vw" width="1600" height="900" loading="lazy" decoding="async" alt="Infographic: give your agent a budget, not your wallet. A payment of 30 credits to Corner Shop passes four checks, allowlist, per-payment cap, daily cap and human approval, before you tap yes."><figcaption>## The four limits

1. <strong>Total budget.</strong> The most it can spend in a period, such as 100 per week.
2. <strong>Per-payment cap.</strong> The most for any single payment, such as 50.
3. <strong>Allowlist.</strong> The only shops, people or addresses it may pay. Everyone else is blocked.
4. <strong>Expiry.</strong> When the permission ends, such as Friday evening. After that, it can’t pay at all.

And on top: <strong>ask me first</strong> above a certain amount, or for any new payee (lesson 06-04).

The key word is <em>rules the agent can’t talk its way past</em>. They must be enforced outside the AI, by the card, the bank, the wallet or the payment service, not by a sentence in the agent’s instructions. A sentence can be overridden by a prompt injection. A card limit can’t.

## The same idea in wallet standards

Wallet developers are writing standards for exactly these limits. One example is ERC-7715, a draft proposal for websites and apps to request limited permissions from a crypto wallet “in order to execute transactions on the user’s behalf.” It includes an expiry rule that makes a permission invalid after a set time. Its security notes say:

:::source url=&quot;<a href="https://eips.ethereum.org/EIPS/eip-7715" rel="noopener" target="_blank">https://eips.ethereum.org/EIPS/eip-7715</a>&quot; by=&quot;ERC-7715: Request Permissions from Wallets (Draft), Security Considerations&quot; date=&quot;created 24 May 2024&quot; checked=&quot;26 Oct 2026&quot;
DApps should only request the permissions they need, with a reasonable expiration time. Wallets MUST correctly enforce permissions.</figcaption><details><summary>Text version of this infographic</summary><p>Headline: Give your agent a budget, not your wallet. Your agent wants to pay 30 credits to Corner Shop. Check 1, allowlist: is the shop on your list? If no, blocked. Check 2, per-payment cap: is it 50 credits or less? If no, blocked. Check 3, daily cap: still under 100 today? If no, blocked. Check 4, human approval: over 20 credits? If yes, it asks you. You tap yes: paid, and logged for you to check. Example limits in credits; set your own. Highlighted box: rules the agent can’t talk its way past; never hand over your keys or full card. Sources: ethskills.com/wallets and OWASP LLM01:2025.</p></details></figure>
<p>It also warns that malicious apps “could pose as legitimate applications and trick users into granting broad permissions.” So read every permission request: amount, who, and until when.</p>
<h2 id="try-it-the-agent-permission-simulator">Try it: the Agent Permission Simulator</h2>
<p>Run a week of eight payment requests. Some are your errands, one is an upsell, and two come from a poisoned “invoice” email. Find limits that get your errands done while losing nothing.</p>

<section class="lab-mount" data-lab="agent-permissions" data-args="{}"><div class="lab"><div class="lab-head"><span class="pill">Lab</span><h3>Agent Permission Simulator</h3><p>Give a paying agent limits and run the week.</p></div><div class="lab-body"><p class="muted">Loading the lab… If it does not load, here is what it shows: Set a weekly budget, a per-payment cap, an allowlist, an approval threshold and an expiry day. Run a week of eight payment requests, including a poisoned invoice from an email. A table shows what was paid, blocked or asked, how many of your errands got done and how many credits were lost.</p></div></div></section>
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
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>The intern sets the office agent up properly this time: a 100-credit weekly budget, a 50 cap per payment, only the three usual suppliers, a permission that ends at the end of the month, and a ping for anything over 30. The agent gets tricked by a fake invoice on Wednesday. The payment simply fails.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> The intern can’t stop the agent from being fooled. The intern can stop being fooled from costing money.</span></div></aside>

<div class="exercise"><h3>Try it: Set the four limits</h3><p>Your agent should buy your weekly groceries (usually 80 to 120 francs, always from the same two shops) for the next month. Write down the four limits plus an approval rule.</p>
<details><summary>Show a worked answer</summary><p>For example: budget 130 per week; per-payment cap 130 (one shop order); allowlist: the two grocery shops only; expiry: one month from today; ask me first for anything over 120 or any new shop. An attacker’s invoice fails the allowlist; a runaway order fails the cap and budget; a forgotten setup stops by itself at expiry.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>
<h2 id="sources">Sources</h2>
<ul>
<li>ethskills, <a href="https://ethskills.com/wallets/SKILL.md" rel="noopener" target="_blank">Wallets</a> (bounded float; human gate; quoted in the infographic). Checked 26 Oct 2026.</li>
<li>OWASP GenAI Security Project, <a href="https://genai.owasp.org/llmrisk/llm01-prompt-injection/" rel="noopener" target="_blank">LLM01:2025 Prompt Injection</a> (quoted in the infographic). Checked 26 Oct 2026.</li>
<li><a href="https://eips.ethereum.org/EIPS/eip-7715" rel="noopener" target="_blank">ERC-7715: Request Permissions from Wallets</a>, Draft, created 24 May 2024 (abstract, expiry rule, Security Considerations). Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`try-it-the-agent-permission-simulator`,t:`Try it: the Agent Permission Simulator`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`06-03-q1`,type:`mc`,q:`Which is NOT one of the four limits?`,options:[`The agent’s favourite shop`,`A per-payment cap`,`An expiry date`],answer:0,explain:`The four are total budget, per-payment cap, allowlist and expiry.`,why:null},{id:`06-03-q2`,type:`mc`,q:`Why must limits be enforced outside the AI?`,options:[`Instructions inside the AI can be overridden by prompt injection; a card or wallet limit cannot`,`AI can’t count money`,`It is cheaper`],answer:0,explain:`Rules the agent can’t talk its way past.`,why:null},{id:`06-03-q3`,type:`mc`,q:`What does ERC-7715 say about the permissions apps should request?`,options:[`Only the permissions they need, with a reasonable expiration time`,`As many as possible, forever`,`Only permissions for large payments`],answer:0,explain:`That is from its Security Considerations section.`,why:null}],c={figures:[],images:[`figure-spending-limits`],labs:[`agent-permissions`],interns:1,sources:0,exercises:1},l=[`https://eips.ethereum.org/EIPS/eip-7715`,`https://ethskills.com/wallets/SKILL.md`,`https://genai.owasp.org/llmrisk/llm01-prompt-injection/`],u=0,d=`Budgets, caps, allowlists and expiry`,f={id:e,minutes:9,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};