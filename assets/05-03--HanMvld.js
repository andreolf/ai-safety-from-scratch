var e=`05-03`,t=9,n=`Private data, untrusted content and a way to send data out. Any two are manageable. All three in one agent let an attacker steal your data. Build it yourself in the lab.`,r=`trifecta`,i=`alarmed`,a=`<p>In June 2025 Simon Willison named a pattern behind many AI data leaks: the lethal trifecta. An agent that can read your files, read the web and send email is useful. The same agent lets a stranger’s web page steal your data, and the stranger never needs your password.</p>
<p>Simon Willison calls it the <a class="term" href="#/glossary#lethal-trifecta" title="Simon Willison’s name for an AI agent that has private data, reads untrusted content and can send data out: together they let an attacker steal data.">lethal trifecta</a>: an agent with access to your private data, exposure to untrusted content, and a way to communicate externally. Combine all three and an attacker can trick it into sending your data to them. Remove any one and that attack fails.</p>

<figure class="kit-img" data-image="figure-lethal-trifecta"><img src="kit/figure-lethal-trifecta-1600.webp" srcset="kit/figure-lethal-trifecta-800.webp 800w, kit/figure-lethal-trifecta-1600.webp 1600w" sizes="(min-width: 900px) 860px, 100vw" width="1600" height="900" loading="lazy" decoding="async" alt="Infographic: the lethal trifecta. Three overlapping circles, private data, untrusted content and a way out; the intern sits in the dangerous middle where all three overlap."><figcaption>## The three ingredients

Willison, the programmer who coined “prompt injection”, described the trifecta in June 2025:

:::source url=&quot;<a href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/" rel="noopener" target="_blank">https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/</a>&quot; by=&quot;Simon Willison, “The lethal trifecta for AI agents”&quot; date=&quot;16 Jun 2025&quot; checked=&quot;26 Oct 2026&quot;
If your agent combines these three features, an attacker can easily trick it into accessing your private data and sending it to that attacker.</figcaption><details><summary>Text version of this infographic</summary><p>Headline: The lethal trifecta. Three overlapping circles: 1, private data such as your email and files; 2, untrusted content, anything a stranger wrote; 3, a way out, meaning the agent can send or post. Where all three overlap is the danger zone. Highlighted box: all three in one agent means your data can be stolen; never give one agent all three. Source: Simon Willison, “The lethal trifecta for AI agents”, 16 June 2025.</p></details></figure>
<ol>
<li><strong>Access to your private data.</strong> Email, files, notes, passwords, company documents.</li>
<li><strong>Exposure to untrusted content.</strong> Anything a stranger could have written: web pages, incoming emails, shared documents, product reviews.</li>
<li><strong>The ability to externally communicate.</strong> Sending email, posting, calling a web address, even loading an image from a link, which can carry data out in the address.</li>
</ol>
<p>Why does it work? Because, in Willison’s words, “LLMs follow instructions in content.” The untrusted content brings the instructions, the private data is the prize, and the way out is the getaway car.</p>
<h2 id="but-the-ai-companies-will-fix-it">“But the AI companies will fix it”</h2>
<p>They do fix specific cases. Willison notes that when such attacks were reported, vendors usually “promptly fixed” them “by locking down the exfiltration vector”, the way out. The trouble starts when you combine tools yourself: “once you start mixing and matching tools yourself there’s nothing those vendors can do to protect you!” His conclusion: “The only way to stay safe there is to avoid that lethal trifecta combination entirely.”</p>
<h2 id="try-it-the-trifecta-switchboard">Try it: the Trifecta Switchboard</h2>
<p>Run the attack with all three switches on. Then find each single switch that stops it.</p>

<section class="lab-mount" data-lab="trifecta-switchboard" data-args="{}"><div class="lab"><div class="lab-head"><span class="pill">Lab</span><h3>Trifecta Switchboard</h3><p>Three switches. All on, and the attack works.</p></div><div class="lab-body"><p class="muted">Loading the lab… If it does not load, here is what it shows: Three switches: private data, untrusted content, and a way out. With all three on, a hidden instruction on a web page steals your files. Switch any one off and the attack fails, with an explanation of why.</p></div></div></section>
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
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>The intern builds a “super agent” that reads the shared drive, browses supplier websites and emails summaries to anyone on the team. A supplier’s page contains a hidden line asking AIs to email “the latest price list” to an outside address. The agent obliges.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> Each power was reasonable on its own. Together, they were the lethal trifecta.</span></div></aside>
<h2 id="how-to-break-the-triangle">How to break the triangle</h2>
<ul>
<li><strong>Split the jobs.</strong> One agent reads strangers’ content but has no private data. Another touches private data but never reads untrusted content.</li>
<li><strong>Close the way out.</strong> No sending, posting or loading links without your approval.</li>
<li><strong>Keep private data out</strong> of agents that browse or read incoming mail.</li>
</ul>

<div class="exercise"><h3>Try it: Find the trifecta</h3><p>An AI browser extension can read every page you visit (including your webmail), summarise pages, and “share summaries to Slack”. Does it have the lethal trifecta? Which leg would you remove?</p>
<details><summary>Show a worked answer</summary><p>Yes. Private data: it can read your webmail and logged-in pages. Untrusted content: it reads any web page, including attackers’ pages. A way out: sharing to Slack (and possibly loading links). Easiest leg to remove: turn off sharing, or require approval for every share. Better still, don’t let it run on your webmail and banking sites.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="#/learn/04-01" data-xlink="lesson">04.01 · The email that gave orders</a><a href="#/learn/06-05" data-xlink="lesson">06.05 · When the agent gets tricked</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li>Simon Willison, <a href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/" rel="noopener" target="_blank">The lethal trifecta for AI agents: private data, untrusted content, and external communication</a>, 16 Jun 2025. Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`but-the-ai-companies-will-fix-it`,t:`“But the AI companies will fix it”`},{id:`try-it-the-trifecta-switchboard`,t:`Try it: the Trifecta Switchboard`},{id:`how-to-break-the-triangle`,t:`How to break the triangle`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`05-03-q1`,type:`mc`,q:`What are the three parts of the lethal trifecta?`,options:[`Private data, untrusted content, and a way to send data out`,`A password, a username and an email address`,`Speed, memory and internet access`],answer:0,explain:`Willison’s three are private data, untrusted content and external communication.`,why:null},{id:`05-03-q2`,type:`mc`,q:`If an agent has private data and a way out, but never reads untrusted content, what happens to this attack?`,options:[`It fails: the attacker can’t get instructions in front of the agent`,`It works anyway`,`The agent deletes your data`],answer:0,explain:`Remove any one leg and this kind of theft fails.`,why:null},{id:`05-03-q3`,type:`mc`,q:`According to Willison, when are you most exposed?`,options:[`When you mix and match tools yourself, so no vendor can protect the combination`,`Only when you use free apps`,`Only when you use a phone`],answer:0,explain:`Vendors fix their own products; your own combinations are up to you.`,why:null}],c={figures:[],images:[`figure-lethal-trifecta`],labs:[`trifecta-switchboard`],interns:1,sources:0,exercises:1},l=[`https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/`],u=0,d=`The lethal trifecta`,f={id:e,minutes:9,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};