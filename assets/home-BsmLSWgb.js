import{_ as e,g as t,i as n,r,t as i}from"./intern-C96m5EzT.js";import{m as a}from"./index-BF-miMx_.js";import{n as o,t as s}from"./map-BZOajdgR.js";function c(c){let l=a.get().last,u=n[0].id;return c.innerHTML=`<div class="wrap">
  <section class="hero" aria-labelledby="hero-title">
    <div>
      <p class="pill">Free · hands-on AI security</p>
      <h1 id="hero-title" class="display" style="margin-top:14px">AI Safety <br>from <span class="hl">Scratch</span></h1>
      <p class="lede">How AI systems get attacked and how they go wrong. Hide an instruction in an email and watch an assistant obey it, talk a chatbot out of its rules, give an agent a spending limit, then test your own app.</p>
      <p class="muted" style="max-width:60ch">For people who build with AI and for anyone curious how the attacks work. The labs run in your browser and need no code. The Builder track does.</p>
      <div class="actions"><a class="btn btn-primary" href="#/learn/${l||u}" data-testid="start">${l?`Continue where you left off`:`Start lesson 1`}</a><a class="btn btn-quiet" href="#/labs">Try the labs</a></div>
      <ul class="stats" id="stats"><li><b>${n.length}</b><span>lessons</span></li><li><b>${t.length}</b><span>phases</span></li><li><b>${Object.keys(r).length}</b><span>labs</span></li><li><b data-testid="written-count">${e()}</b><span>written so far</span></li></ul>
    </div>
    <div class="hero-intern">${i(`fooled`)}<p class="muted" style="text-align:center;font-size:.92rem">Meet the gullible intern. They fall for the attacks in this course so you can see how each one works.</p></div>
  </section>
  <section class="section" aria-labelledby="why"><h2 id="why">Three risks, one problem</h2>
    <div class="three">
      <div class="card"><span class="pill">Misuse</span><h3>People use AI to do harm</h3><p class="muted">Cloned voices, deepfake video calls, and attackers who hijack assistants with prompt injection. Phases 03 and 04.</p></div>
      <div class="card"><span class="chip">Misalignment</span><h3>AI does what we said, not what we meant</h3><p class="muted">Reward hacking, specification gaming, goals that generalise wrongly, and models that hide what they are doing. Phase 07.</p></div>
      <div class="card"><span class="chip">Loss of control</span><h3>Keeping AI contained and watched</h3><p class="muted">Permissions, sandboxes, spending limits and monitoring, and what happened when agents got out of a test sandbox in July 2026. Phases 05, 06 and 08.</p></div>
    </div>
    <p class="muted" style="margin-top:14px;max-width:70ch">Many researchers treat these as one problem: an AI that reliably wanted what we want could not be turned against us and would not try to get out. <a href="#/learn/00-03">Lesson 00.03</a> makes the case.</p>
  </section>
  <section class="section" aria-labelledby="map-h"><h2 id="map-h">Your phase map</h2>${o()}<div style="margin-top:16px">${s()}</div></section>

  </div>`,``}export{c as renderHome};