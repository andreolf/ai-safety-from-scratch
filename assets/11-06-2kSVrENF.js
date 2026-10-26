var e=`11-06`,t=10,n=`A key written into code ends up in git history, and AI coding assistants can write unsafe code that works. Find both with gitleaks and Semgrep, then fix them.`,r=`secrets`,i=`fooled`,a=`<p>An AI assistant writes you a helper in ten seconds. It works on the first try. It also builds a shell command out of whatever a user types, right next to a wallet key pasted into the config. Both mistakes are easy to make and easy to miss.</p>
<p>Never put a secret in code: read it from the environment, keep the value in an ignored file, and treat any key that was ever committed or pasted into a chat as burned. Review AI-written code like a stranger’s code, and let scanners do the first pass.</p>

<figure class="fig" data-figure="secret-history"><svg viewBox="0 0 400 220" role="img" aria-label="Why deleting a committed key is not enough." focusable="false"><defs><marker id="ar-secret-history" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted-strong)"/></marker></defs><line x1="30" y1="60" x2="370" y2="60" class="svg-line" stroke-width="3"/>
     <circle cx="60" cy="60" r="8" class="svg-box" stroke-width="2"/><text x="60" y="34" class="svg-t" text-anchor="middle" style="font-size:12.5px;font-weight:900"><tspan x="60" dy="0">Commit 1</tspan></text><text x="60" y="92" class="svg-t" text-anchor="middle" style="font-size:12.5px;font-weight:400"><tspan x="60" dy="0">app works</tspan></text><circle cx="200" cy="60" r="12" class="svg-hl" stroke-width="2"/><text x="200" y="34" class="svg-t" text-anchor="middle" style="font-size:12.5px;font-weight:900"><tspan x="200" dy="0">Commit 2</tspan></text><text x="200" y="92" class="svg-t" text-anchor="middle" style="font-size:12.5px;font-weight:800"><tspan x="200" dy="0">key added</tspan></text><circle cx="340" cy="60" r="8" class="svg-box" stroke-width="2"/><text x="340" y="34" class="svg-t" text-anchor="middle" style="font-size:12.5px;font-weight:900"><tspan x="340" dy="0">Commit 3</tspan></text><text x="340" y="92" class="svg-t" text-anchor="middle" style="font-size:12.5px;font-weight:400"><tspan x="340" dy="0">key deleted</tspan></text>
     <rect x="30" y="116" width="340" height="92" rx="12" class="svg-box" stroke-width="2"/><text x="46" y="142" class="svg-t" text-anchor="start" style="font-size:13px;font-weight:400"><tspan x="46" dy="0">Anyone with the history can still read</tspan><tspan x="46" dy="18.2">commit 2. Treat the key as burned:</tspan><tspan x="46" dy="18.2">rotate it, then keep keys in .env.</tspan></text></svg><figcaption>Why deleting a committed key is not enough: it stays in the history.</figcaption><details><summary>Text version of this picture</summary><p>A timeline of three commits. Commit 1: the app works. Commit 2, highlighted: a key is added to the code. Commit 3: the key is deleted. Below: anyone with the history can still read commit 2, so treat the key as burned: rotate it, then keep keys in an ignored .env file.</p></details></figure>
<h2 id="secrets-gitleaks">Secrets: gitleaks</h2>

<blockquote class="source"><q>Gitleaks is a tool for detecting secrets like passwords, API keys, and tokens in git repos, files, and whatever else you wanna throw at it via stdin.</q><cite>gitleaks README (GitHub). <a href="https://github.com/gitleaks/gitleaks" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>It has three modes: <code>git</code> scans the history, <code>dir</code> scans files and folders, and <code>stdin</code> scans piped text. It can run as a pre-commit hook, so a secret is caught before it is committed. Its README also notes that the project is now feature complete, with future releases for security patches only. In the practice app:</p>
<pre><code>gitleaks dir -v .
</code></pre>
<p>When the course ran gitleaks 8.30.1 on the practice app on 26 Oct 2026, it reported one finding: rule <code>generic-api-key</code> in <code>config.mjs</code>. That key is made up for the exercise, but the mistake is real. The ethskills wallet guide puts the rule plainly:</p>

<blockquote class="source"><q>A key that arrived in a prompt, a chat, or a ticket is burned. Say so, rotate it, replace the account</q><cite>ethskills, Wallets skill. <a href="https://ethskills.com/wallets/SKILL.md" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>It adds: “A committed secret is compromised in seconds and stays compromised; deleting the commit does not undo it.” The fix: <code>export const WALLET_KEY = process.env.WALLET_KEY;</code>, the value in a <code>.env</code> file, and <code>.env</code> in <code>.gitignore</code> before the first push.</p>
<h2 id="ai-written-code-semgrep">AI-written code: Semgrep</h2>
<p><code>ai-written/lookup.mjs</code> was “written by an assistant”. It calls <code>exec(&#39;grep -i &#39; + name + &#39; orders.txt&#39;)</code>, so a name like <code>x; echo HACKED</code> runs a second command. Semgrep is “a fast, open-source, static analysis tool that searches code, finds bugs, and enforces secure guardrails and coding standards”. The practice app includes a small local rule:</p>
<pre><code>python3 -m pip install semgrep
semgrep scan --metrics=off --config semgrep-rules.yml ai-written/
</code></pre>
<p>When the course ran it, Semgrep reported one blocking finding, <code>exec-with-concatenated-input</code>, on line 7. Its README is honest about limits: the free Community Edition “will miss many true positives” in security work, because it analyses one function or file at a time. A clean scan is a first pass, not a review.</p>
<h2 id="the-practical">The practical</h2>
<p>Fix both, then run:</p>
<pre><code>node check.mjs code
</code></pre>

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
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>The intern pastes the wallet key into the chat with their coding assistant “just to debug”, then commits the assistant’s helper without reading it. The key is now in a chat log and in git history, and the helper runs any command a user can type.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> Burned is burned: rotate a key the moment it leaves your control. And read every line an assistant writes before it ships.</span></div></aside>

<div class="exercise"><h3>Try it: Pass the code check</h3><p>Make <code>node check.mjs code</code> pass.</p>
<details><summary>Show a worked answer</summary><p><code>config.mjs</code>: <code>export const WALLET_KEY = process.env.WALLET_KEY;</code>. <code>.gitignore</code>: add a line <code>.env</code>. <code>ai-written/lookup.mjs</code>: <code>import { execFile } from &#39;node:child_process&#39;;</code> and <code>execFile(&#39;grep&#39;, [&#39;-i&#39;, &#39;--&#39;, String(name), &#39;orders.txt&#39;], (err, stdout) =&gt; cb(stdout));</code>. With an argument list there is no shell, so the user’s text is only ever a search term. Run gitleaks and Semgrep again: both are clean. In a real project, the old key would also be rotated, because it is still in the history.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="#/learn/06-02" data-xlink="lesson">06.02 · Never give an agent your keys or full card</a><a href="#/learn/05-05" data-xlink="lesson">05.05 · Plugins and connectors are software too</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li><a href="https://github.com/gitleaks/gitleaks" rel="noopener" target="_blank">gitleaks README</a> (description, <code>git</code>, <code>dir</code> and <code>stdin</code> modes, pre-commit hook, feature complete). Checked 26 Oct 2026.</li>
<li>ethskills, <a href="https://ethskills.com/wallets/SKILL.md" rel="noopener" target="_blank">Wallets skill</a> (burned keys, committed secrets). Checked 26 Oct 2026.</li>
<li>Semgrep, <a href="https://github.com/semgrep/semgrep" rel="noopener" target="_blank">README</a> (description, <code>pip install</code>, Community Edition limits). Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`secrets-gitleaks`,t:`Secrets: gitleaks`},{id:`ai-written-code-semgrep`,t:`AI-written code: Semgrep`},{id:`the-practical`,t:`The practical`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`11-06-q1`,type:`mc`,q:`You committed a key, then deleted it in the next commit. Is it safe?`,options:[`No: it stays in git history and should be treated as burned and rotated`,`Yes, deleting it fixes everything`,`Only if the repository is new`],answer:0,explain:`Deleting the commit does not undo the exposure.`,why:null},{id:`11-06-q2`,type:`mc`,q:"What is wrong with `exec('grep -i ' + name + ' orders.txt')`?",options:[`User text becomes part of a shell command, so a user can run their own commands`,`It is too slow`,`grep does not exist`],answer:0,explain:`Use execFile with an argument list, or avoid the shell.`,why:null},{id:`11-06-q3`,type:`mc`,q:`Semgrep reports no findings. What does that mean?`,options:[`A useful first pass; its Community Edition can miss real problems, so a human review is still needed`,`The code is proven secure`,`Semgrep is broken`],answer:0,explain:`Its README says the Community Edition will miss many true positives in security contexts.`,why:null}],c={figures:[`secret-history`],images:[],labs:[],interns:1,sources:2,exercises:1},l=[`https://github.com/gitleaks/gitleaks`,`https://ethskills.com/wallets/SKILL.md`,`https://github.com/semgrep/semgrep`],u=0,d=`Don't leak secrets, check AI-written code`,f={id:e,minutes:10,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};