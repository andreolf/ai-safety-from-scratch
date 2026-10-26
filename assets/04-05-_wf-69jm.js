var e=`04-05`,t=7,n=`Why can’t AI companies just patch prompt injection? Because instructions and information travel down the same channel. Defences help, but none is complete.`,r=`simple fix`,i=`neutral`,a=`<h2 id="the-hook">The hook</h2>
<p>Web developers fixed most SQL injection years ago, the attack that inspired the name “prompt injection”. So why, years after the first public prompt injection examples, do AI companies still say they can’t fully fix it?</p>
<h2 id="the-one-idea">The one idea</h2>
<p><strong>In an AI model, your instructions and the content it reads arrive as the same thing: words. There is no reliable wall between them, so defences reduce the risk but do not remove it.</strong></p>

<figure class="fig" data-figure="one-channel"><svg viewBox="0 0 400 250" role="img" aria-label="Why prompt injection is hard to fix: instructions and data share one channel." focusable="false"><defs><marker id="ar-one-channel" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted-strong)"/></marker></defs><rect x="10" y="14" width="380" height="60" rx="10" class="svg-box" stroke-width="2"/><text x="24" y="40" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="24" dy="0">A WEBSITE (SQL)</tspan></text><text x="24" y="62" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="24" dy="0">Code and data can be kept apart by rules. Fixable.</tspan></text>
     <rect x="10" y="90" width="380" height="86" rx="10" class="svg-box" stroke-width="2"/><rect x="24" y="102" width="132" height="26" rx="13" class="svg-hl"/><text x="34" y="120" class="svg-on-hl" text-anchor="start" style="font-size:13px;font-weight:900"><tspan x="34" dy="0">AN AI MODEL</tspan></text><text x="24" y="148" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="24" dy="0">Your request and the page it reads are both just</tspan><tspan x="24" dy="16.25">words in one stream. It has to guess which is which.</tspan></text>
     <text x="200" y="206" class="svg-t" text-anchor="middle" style="font-size:12.5px;font-weight:700"><tspan x="200" dy="0">“Unlikely to ever be fully solved.” OpenAI, Dec 2025</tspan></text><text x="200" y="232" class="svg-m" text-anchor="middle" style="font-size:12px;font-weight:400"><tspan x="200" dy="0">OWASP: “unclear if there are fool-proof methods”</tspan></text></svg><figcaption>Websites can separate code from data with strict rules. A language model reads everything as one stream of words.</figcaption><details><summary>Text version of this picture</summary><p>Top: in a website, SQL injection can be fixed because code and data can be kept apart by rules. Bottom: in an AI model, your request and the page it reads are both just words in one stream, and the model has to guess which is which. OpenAI wrote in December 2025 that prompt injection is “unlikely to ever be fully solved”. OWASP says it is “unclear if there are fool-proof methods of prevention”.</p></details></figure>
<h2 id="a-letter-carrier-who-reads-every-note">A letter carrier who reads every note</h2>
<p>Imagine a letter carrier who follows any note left in a mailbox, even one that says “give this house’s post to me.” You could train them to be suspicious of notes. You could add a rule: “only obey notes on official paper.” But a clever forger will make official-looking paper. The real fix is to change what the letter carrier is <em>allowed</em> to do.</p>
<p>That is roughly the situation with language models. With SQL injection, programmers can keep the data in a separate box that is never treated as commands. A language model has no such box. Everything, your request, the email, the web page, is turned into <a class="term" href="#/glossary#token" title="A small piece of text (a word, part of a word or a symbol) that a language model reads and writes.">tokens</a> and read together.</p>
<h2 id="what-the-experts-say">What the experts say</h2>
<p>OpenAI wrote this in December 2025, while explaining how it defends its AI browser agent:</p>

<blockquote class="source"><q>Prompt injection, much like scams and social engineering on the web, is unlikely to ever be fully “solved”.</q><cite>OpenAI, “Continuously hardening ChatGPT Atlas against prompt injection attacks”, 22 Dec 2025. <a href="https://openai.com/index/hardening-atlas-against-prompt-injection/" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>OWASP’s entry on prompt injection is just as careful: “it is unclear if there are fool-proof methods of prevention for prompt injection.” And Simon Willison, who coined the term, points out that filters that catch most attacks are not enough, because an attacker only needs one that works: “in web application security 95% is very much a failing grade.”</p>
<h2 id="so-what-does-help">So what <em>does</em> help?</h2>
<p>If you can’t stop the model from being fooled every time, you <strong>limit what a fooled model can do</strong>:</p>
<ul>
<li>It can’t send email if it doesn’t have a send tool.</li>
<li>It can’t pay a stranger if payments need your “yes”, or if strangers aren’t on its list.</li>
<li>It can’t leak your files if it can’t read them in the first place.</li>
</ul>
<p>The last lesson of this phase covers these defences, and Phase 05 shows how they apply to agents.</p>

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
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>The intern’s team argues about whether to add a stronger filter or remove the assistant’s ability to send email. The filter catches 19 of 20 test attacks. The intern points out that the twentieth still sends the bank statement, and that without a send tool, all twenty fail.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> When you can’t make the AI unfoolable, make being fooled harmless.</span></div></aside>

<div class="exercise"><h3>Try it: Filter or limit?</h3><p>A company’s customer-service AI can read customer records and issue refunds. A test shows prompt injections get through its filter 3 times out of 100. Suggest two changes that would help even when the filter fails.</p>
<details><summary>Show a worked answer</summary><p>Examples: require a human to approve refunds above a small amount; cap refunds per day; only allow refunds to the original payment method; give the AI read access only to the record of the customer it is talking to. Each limits the damage of a successful injection instead of relying on catching it. As Willison puts it, 95% is a failing grade.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>
<h2 id="sources">Sources</h2>
<ul>
<li>OpenAI, <a href="https://openai.com/index/hardening-atlas-against-prompt-injection/" rel="noopener" target="_blank">Continuously hardening ChatGPT Atlas against prompt injection attacks</a>, 22 Dec 2025. Checked 26 Oct 2026.</li>
<li>OWASP GenAI Security Project, <a href="https://genai.owasp.org/llmrisk/llm01-prompt-injection/" rel="noopener" target="_blank">LLM01:2025 Prompt Injection</a> (prevention section). Checked 26 Oct 2026.</li>
<li>Simon Willison, <a href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/" rel="noopener" target="_blank">The lethal trifecta for AI agents</a>, 16 Jun 2025 (“95% is very much a failing grade”). Checked 26 Oct 2026.</li>
<li>Simon Willison, <a href="https://simonwillison.net/2022/Sep/12/prompt-injection/" rel="noopener" target="_blank">Prompt injection attacks against GPT-3</a>, 12 Sep 2022. Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`the-hook`,t:`The hook`},{id:`the-one-idea`,t:`The one idea`},{id:`a-letter-carrier-who-reads-every-note`,t:`A letter carrier who reads every note`},{id:`what-the-experts-say`,t:`What the experts say`},{id:`so-what-does-help`,t:`So what does help?`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`04-05-q1`,type:`mc`,q:`Why is prompt injection hard to fix completely?`,options:[`Instructions and content reach the model as the same kind of thing: words`,`AI companies haven’t tried`,`Computers can’t read emails`],answer:0,explain:`There is no reliable wall between your request and the text it reads.`,why:null},{id:`04-05-q2`,type:`mc`,q:`What did OpenAI write about prompt injection in December 2025?`,options:[`It is unlikely to ever be fully “solved”`,`It was fixed in 2024`,`It only affects old models`],answer:0,explain:`OpenAI compared it to scams and social engineering on the web.`,why:null},{id:`04-05-q3`,type:`mc`,q:`If filters can’t catch every attack, what is the best design response?`,options:[`Limit what the AI can do, so a fooled AI can’t do much harm`,`Use two filters and stop worrying`,`Ask the AI to be more careful`],answer:0,explain:`Limits work even when the model is fooled.`,why:null}],c={figures:[`one-channel`],images:[],labs:[],interns:1,sources:1,exercises:1},l=[`https://openai.com/index/hardening-atlas-against-prompt-injection/`,`https://genai.owasp.org/llmrisk/llm01-prompt-injection/`,`https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/`,`https://simonwillison.net/2022/Sep/12/prompt-injection/`],u=0,d=`Why there is no simple fix`,f={id:e,minutes:7,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};