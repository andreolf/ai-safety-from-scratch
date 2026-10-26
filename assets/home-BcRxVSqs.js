import{_ as e,g as t,i as n,r,t as i}from"./intern-DlDdeKPL.js";import{m as a}from"./index-BQSPLBVw.js";import{n as o,t as s}from"./map-CzGMBCdm.js";function c(c){let l=a.get().last,u=n[0].id;return c.innerHTML=`<div class="wrap">
  <section class="hero" aria-labelledby="hero-title">
    <div>
      <p class="pill">Free course · no maths · no code</p>
      <h1 id="hero-title" class="display" style="margin-top:14px">AI Safety <br>from <span class="hl">Scratch</span></h1>
      <p class="lede">How AI works, how it fails, and how to stay in control. Short lessons, playful labs, real sources.</p>
      <div class="actions"><a class="btn btn-primary" href="#/learn/${l||u}" data-testid="start">${l?`Continue where you left off`:`Start lesson 1`}</a><a class="btn btn-quiet" href="#/labs">Try the labs</a></div>
      <ul class="stats" id="stats"><li><b>${n.length}</b><span>lessons</span></li><li><b>${t.length}</b><span>phases</span></li><li><b>${Object.keys(r).length}</b><span>labs</span></li><li><b data-testid="written-count">${e()}</b><span>written so far</span></li></ul>
    </div>
    <div class="hero-intern">${i(`fooled`)}<p class="muted" style="text-align:center;font-size:.92rem">Meet the gullible intern. They fall for every trick in this course, so you don’t have to.</p></div>
  </section>
  <section class="section" aria-labelledby="why"><h2 id="why">What “AI safety” means here</h2>
    <div class="three">
      <div class="card"><span class="pill">Mistakes</span><h3>When AI is wrong</h3><p class="muted">Confident made-up answers, flattery, bias. Learn why it happens and how to check.</p></div>
      <div class="card"><span class="chip">Misuse</span><h3>When people use AI to harm</h3><p class="muted">Voice clones, deepfake calls, AI-written phishing. Learn the habits that beat them.</p></div>
      <div class="card"><span class="chip">Control</span><h3>When AI does what we said, not what we meant</h3><p class="muted">Agents, prompt injection, reward hacking and the open questions researchers work on.</p></div>
    </div>
  </section>
  <section class="section" aria-labelledby="map-h"><h2 id="map-h">Your phase map</h2>${o()}<div style="margin-top:16px">${s()}</div></section>

  </div>`,``}export{c as renderHome};