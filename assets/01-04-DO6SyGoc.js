var e=`01-04`,t=8,n=`Pretraining squeezes a huge pile of text into a file of numbers, like a lossy zip file. It keeps the gist, not a copy, and that has consequences.`,r=`internet`,i=`neutral`,a=`<p>Where does a chatbot’s knowledge come from? Nobody typed in facts one by one. Instead, the model read an enormous amount of text and was squeezed until patterns from that text were stored in its numbers.</p>
<p><a class="term" href="#/glossary#pretraining" title="The first, most expensive training stage: the model learns to predict the next token on a huge amount of text.">Pretraining</a> compresses a large chunk of the internet into the model’s <a class="term" href="#/glossary#parameters" title="The billions of numbers inside a model that are adjusted during training. Also called weights.">Parameters</a>. Karpathy calls the result a lossy zip file: it keeps the gist of what it read, not an exact copy.</p>

<figure class="fig" data-figure="lossy-zip"><svg viewBox="0 0 400 300" role="img" aria-label="Pretraining squeezes about 10 terabytes of text into a 140 gigabyte file of parameters." focusable="false"><defs><marker id="ar-lossy-zip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted-strong)"/></marker></defs><rect x="20" y="16" width="360" height="52" rx="10" class="svg-box" stroke-width="2"/><text x="200" y="48" class="svg-t" text-anchor="middle" style="font-size:15px;font-weight:700"><tspan x="200" dy="0">About 10 TB of internet text</tspan></text><path d="M200 68 L200 94" class="svg-line" stroke-width="2.4" fill="none" marker-end="url(#ar-lossy-zip)"/>
     <rect x="20" y="96" width="360" height="76" rx="10" class="svg-box" stroke-width="2"/><text x="200" y="124" class="svg-t" text-anchor="middle" style="font-size:15px;font-weight:800"><tspan x="200" dy="0">About 6,000 GPUs for about 12 days</tspan></text><text x="200" y="148" class="svg-m" text-anchor="middle" style="font-size:14px;font-weight:400"><tspan x="200" dy="0">Cost: about $2 million</tspan></text><path d="M200 172 L200 198" class="svg-line" stroke-width="2.4" fill="none" marker-end="url(#ar-lossy-zip)"/>
     <rect x="70" y="200" width="260" height="52" rx="10" class="svg-hl"/><text x="200" y="232" class="svg-on-hl" text-anchor="middle" style="font-size:17px;font-weight:900"><tspan x="200" dy="0">140 GB of parameters</tspan></text>
     <text x="200" y="276" class="svg-m" text-anchor="middle" style="font-size:12px;font-weight:400"><tspan x="200" dy="0">Llama 2 70B figures, as given in Karpathy’s talk</tspan></text><text x="200" y="292" class="svg-m" text-anchor="middle" style="font-size:12px;font-weight:400"><tspan x="200" dy="0">A lossy zip: the gist, not a copy</tspan></text></svg><figcaption>The numbers are those Karpathy gives for Meta’s Llama 2 70B. He calls them “rookie numbers” compared with today’s state of the art.</figcaption><details><summary>Text version of this picture</summary><p>About 10 terabytes of internet text go into training. About 6,000 GPUs run for about 12 days, costing about 2 million dollars. Out comes a 140 gigabyte file of parameters. These are the Llama 2 70B figures from Andrej Karpathy’s talk. It works like a lossy zip file: it keeps the gist of the text, not an exact copy.</p></details></figure>
<h2 id="how-big-is-big">How big is big?</h2>
<p>In his talk, Karpathy walks through the open model Llama 2 70B, using figures Meta published:</p>
<ul>
<li>Take “a chunk of the internet” of “roughly … 10 terabytes of text”.</li>
<li>Run about 6,000 GPUs (specialised chips) for about 12 days.</li>
<li>This “would cost you about $2 million”.</li>
<li>Out comes a 140 gigabyte file of parameters, a compression ratio of roughly 100 times.</li>
</ul>
<p>He then adds that these numbers are, “by today’s standards … rookie numbers”: leading models use far more.</p>
<h2 id="lossy-not-lossless">Lossy, not lossless</h2>
<p>A normal zip file is <strong>lossless</strong>: unzip it and you get back exactly what you put in. Karpathy stresses that pretraining is different: “a lossy compression.” The model gets “a kind of a gestalt of the text” but does not hold “an identical copy”.</p>
<p>That one fact explains a lot:</p>
<ul>
<li>The model is great at the <em>style</em> and <em>common patterns</em> of text: how a recipe, a letter or a legal clause usually goes.</li>
<li>It is weaker on <strong>rare facts</strong>, like a small town’s population or an obscure person’s birthday, which may have been squeezed out. OpenAI’s hallucination research makes the same point: “arbitrary low-frequency facts” cannot be predicted from patterns alone (Lesson 02.01).</li>
<li>The knowledge has a <strong>cut-off date</strong>. Anything after the training data was collected is unknown unless the app adds a search tool (Lesson 01.06).</li>
</ul>
<h2 id="what-comes-out-a-document-dreamer">What comes out: a document dreamer</h2>
<p>After pretraining, the model is not yet a helpful assistant. Karpathy calls it an “internet document generator”: give it the start of a web page and it continues the web page. Turning it into an assistant that answers questions is the job of the next stage (Lesson 01.05).</p>

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
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>The intern asks the model for the exact opening hours of a tiny café in their village. It answers instantly, with hours that sound perfectly normal. The café closed two years ago.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> Rare and recent facts are where a lossy zip is weakest. Check them at the source.</span></div></aside>

<div class="exercise"><h3>Try it: Lossy or not?</h3><p>Which of these is the model likely to know well, and which might it get wrong? (a) How a formal complaint letter is usually structured. (b) The phone number of a small local plumber. (c) Yesterday’s football results. (d) What a “bereavement fare” is.</p>
<details><summary>Show a worked answer</summary><p>(a) and (d) are common patterns that appear many times in text, so the model will usually do well. (b) is a rare fact that was probably squeezed out or never there, so it may invent one. (c) is after its training data unless the app adds live search. Rare and recent facts: always check.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="#/learn/01-05" data-xlink="lesson">01.05 · Training, part 2: learning to be an assistant</a><a href="#/learn/02-01" data-xlink="lesson">02.01 · Hallucinations: confident and wrong</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li>Andrej Karpathy, <a href="https://www.youtube.com/watch?v=zjkBMFhNj_g&amp;t=283s" rel="noopener" target="_blank">Intro to Large Language Models</a> (10 TB, 6,000 GPUs, 12 days, about $2 million, 140 GB, lossy compression: from about 4:43; “internet document generators”: about 14:17). Checked 26 Oct 2026.</li>
<li>OpenAI, <a href="https://openai.com/index/why-language-models-hallucinate/" rel="noopener" target="_blank">Why language models hallucinate</a>, 5 Sep 2025 (low-frequency facts). Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`how-big-is-big`,t:`How big is big?`},{id:`lossy-not-lossless`,t:`Lossy, not lossless`},{id:`what-comes-out-a-document-dreamer`,t:`What comes out: a document dreamer`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`01-04-q1`,type:`mc`,q:`Karpathy compares pretraining to what?`,options:[`A lossy zip file of the internet`,`A perfect backup of the internet`,`A search engine`],answer:0,explain:`The parameters keep the gist of the training text, not an identical copy.`,why:null},{id:`01-04-q2`,type:`mc`,q:`According to Karpathy’s talk, roughly how big is the Llama 2 70B parameters file?`,options:[`140 gigabytes`,`10 terabytes`,`5 megabytes`],answer:0,explain:`About 10 TB of text is compressed into a 140 GB file, roughly 100 times smaller.`,why:null},{id:`01-04-q3`,type:`mc`,q:`Which kind of fact is a pretrained model most likely to get wrong?`,options:[`A rare, specific fact such as an obscure person’s birthday`,`How a typical letter is structured`,`Common grammar`],answer:0,explain:`Lossy compression keeps common patterns and loses many rare details. OpenAI’s research makes the same point about low-frequency facts.`,why:null}],c={figures:[`lossy-zip`],images:[],labs:[],interns:1,sources:0,exercises:1},l=[`https://www.youtube.com/watch?v=zjkBMFhNj_g&t=283s`,`https://openai.com/index/why-language-models-hallucinate/`],u=0,d=`Training, part 1: reading the internet`,f={id:e,minutes:8,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};