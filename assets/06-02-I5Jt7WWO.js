var e=`06-02`,t=8,n=`Never give an agent your card number, bank login, recovery phrase or private key. Give it a small, limited float you could afford to lose, and keep the main funds behind your own approval.`,r=`keys`,i=`alarmed`,a=`<h2 id="the-hook">The hook</h2>
<p>Would you give a new babysitter your bank card and PIN “in case they need to buy milk”? Or would you leave twenty francs on the kitchen table?</p>
<h2 id="the-one-idea">The one idea</h2>
<p><strong>Never give an agent the keys to everything: your full card, bank login, crypto recovery phrase or private key. Give it a small, limited float, an amount you would accept losing, and keep your main money where only you can move it.</strong></p>

<figure class="fig" data-figure="bounded-float"><svg viewBox="0 0 400 260" role="img" aria-label="Give an agent a small float, never your main keys or full card." focusable="false"><defs><marker id="ar-bounded-float" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted-strong)"/></marker></defs><rect x="10" y="10" width="230" height="200" rx="10" class="svg-box" stroke-width="2"/><text x="24" y="38" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="24" dy="0">YOUR MAIN MONEY</tspan></text><text x="24" y="64" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="24" dy="0">Savings, main card,</tspan><tspan x="24" dy="16.25">recovery phrase, keys</tspan><tspan x="24" dy="16.25"></tspan><tspan x="24" dy="16.25">Needs you (or more than</tspan><tspan x="24" dy="16.25">one person) to move.</tspan><tspan x="24" dy="16.25">The agent never sees it.</tspan></text>
     <rect x="260" y="60" width="130" height="100" rx="12" class="svg-hl"/><text x="325" y="92" class="svg-on-hl" text-anchor="middle" style="font-size:14px;font-weight:900"><tspan x="325" dy="0">AGENT’S</tspan><tspan x="325" dy="17.5">FLOAT</tspan></text><text x="325" y="136" class="svg-on-hl" text-anchor="middle" style="font-size:11px;font-weight:400"><tspan x="325" dy="0">what you’d accept losing</tspan></text>
     <path d="M240 110 L260 110" class="svg-acc" stroke-width="2.4" fill="none" marker-end="url(#ar-bounded-float)"/><text x="200" y="244" class="svg-t" text-anchor="middle" style="font-size:12.5px;font-weight:700"><tspan x="200" dy="0">“A key that arrived in a prompt… is burned.” ethskills</tspan></text></svg><figcaption>Main money stays with you. The agent gets a small float.</figcaption><details><summary>Text version of this picture</summary><p>Left: your main money, meaning savings, your main card, recovery phrase and keys; moving it needs you, or more than one person, and the agent never sees it. Right: a small float for the agent, an amount you would accept losing, topped up by you. ethskills: “Whatever signs unattended… should be able to move only what you would accept losing”, and “A key that arrived in a prompt, a chat, or a ticket is burned.”</p></details></figure>
<h2 id="the-rule-from-wallet-security">The rule from wallet security</h2>
<p>ethskills, a public guide that teaches AI coding agents how to work with Ethereum safely, states the rule clearly. It is written about crypto, but it applies to every kind of money:</p>

<blockquote class="source"><q>Whatever signs unattended — an agent, a bot, a deploy script — should be able to move only what you would accept losing: a bounded float, an onchain allowance, or a scoped module, with the principal behind a threshold that key alone cannot meet.</q><cite>ethskills, “Wallets”. <a href="https://ethskills.com/wallets/SKILL.md" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>In plain words: anything that can pay without you watching should only be able to reach a small amount. The main money (“the principal”) should need more than that one key to move, for example your own approval, or two keys on two devices.</p>
<p>The same guide says to state plainly which actions always need a human: “moving principal, raising the agent’s own limit, changing who may sign”. Notice the middle one: <strong>the agent must never be able to raise its own limit.</strong></p>
<h2 id="a-key-in-a-chat-is-a-burned-key">A key in a chat is a burned key</h2>
<p>ethskills is blunt about secrets that end up in AI conversations:</p>
<blockquote>
<p>“A key that arrived in a prompt, a chat, or a ticket is burned.”</p>
</blockquote>
<p>Its advice: say so, replace it, and don’t put money behind it. The same goes for a card number pasted into a chatbot, or a recovery phrase typed into any AI. Assume it has been copied: chat logs are stored, shared, and can be leaked or read by prompt injections.</p>
<h2 id="the-safe-versions-by-payment-type">The safe versions, by payment type</h2>
<ul>
<li><strong>Cards:</strong> a separate virtual or prepaid card with a low limit, not your main card.</li>
<li><strong>Bank:</strong> read-only connections where possible; payments only with your confirmation in the bank’s app.</li>
<li><strong>Crypto:</strong> a separate small wallet, or a limited permission on yours (lesson 06-03), never your recovery phrase.</li>
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
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>To “save time”, the intern pastes the team wallet’s recovery phrase into an AI chat and asks it to “handle the payments this month.” A colleague sees it and moves all the funds to a new wallet that afternoon.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> Once a secret has been in a chat, treat it as gone. Replace it, and give the agent a small float instead.</span></div></aside>

<div class="exercise"><h3>Try it: Design the float</h3><p>Your agent orders office snacks and pays small software bills, about 150 francs a month. Design a safe payment setup.</p>
<details><summary>Show a worked answer</summary><p>For example: a separate virtual card with a 200-franc monthly limit (or a small separate wallet with that amount), payments only to an approved list of shops, and your approval for anything over 50 francs. Your main card and bank login never go to the agent. If the card details ever appear in a chat log, cancel and replace the card.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="https://andreolf.github.io/security-from-scratch/#/learn/12-02" rel="noopener" target="_blank" data-xlink="security">Security from Scratch 12.02 · The secret phrase: 12 or 24 words that are the whole safe</a><a href="https://andreolf.github.io/security-from-scratch/#/learn/12-03" rel="noopener" target="_blank" data-xlink="security">Security from Scratch 12.03 · Nobody real will ever ask for your phrase</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li>ethskills, <a href="https://ethskills.com/wallets/SKILL.md" rel="noopener" target="_blank">Wallets</a> (“Authority first, storage second”; “Before anything signs”). Checked 26 Oct 2026.</li>
<li>ethskills, <a href="https://ethskills.com/SKILL.md" rel="noopener" target="_blank">index</a> (“Unattended signers get a bounded float; principal sits behind a multisig threshold”). Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`the-hook`,t:`The hook`},{id:`the-one-idea`,t:`The one idea`},{id:`the-rule-from-wallet-security`,t:`The rule from wallet security`},{id:`a-key-in-a-chat-is-a-burned-key`,t:`A key in a chat is a burned key`},{id:`the-safe-versions-by-payment-type`,t:`The safe versions, by payment type`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`06-02-q1`,type:`mc`,q:`How much should an agent that pays unattended be able to move?`,options:[`Only what you would accept losing: a bounded float`,`Everything, so it never gets stuck`,`Whatever it decides is necessary`],answer:0,explain:`That is the ethskills rule for anything that signs unattended.`,why:null},{id:`06-02-q2`,type:`mc`,q:`What should you do if a private key or card number was pasted into an AI chat?`,options:[`Treat it as burned: replace it and don’t keep money behind it`,`Delete the chat and keep using it`,`Ask the AI to forget it`],answer:0,explain:`“A key that arrived in a prompt, a chat, or a ticket is burned.”`,why:null},{id:`06-02-q3`,type:`mc`,q:`Which action should an agent never be able to do by itself?`,options:[`Raise its own spending limit`,`Read a receipt`,`Draft a shopping list`],answer:0,explain:`ethskills lists “raising the agent’s own limit” among actions that need a human.`,why:null}],c={figures:[`bounded-float`],images:[],labs:[],interns:1,sources:1,exercises:1},l=[`https://ethskills.com/wallets/SKILL.md`,`https://ethskills.com/SKILL.md`],u=0,d=`Never give an agent your keys or full card`,f={id:e,minutes:8,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};