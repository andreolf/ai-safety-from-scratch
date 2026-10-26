var e=`07-03`,t=9,n=`In 2016 an OpenAI agent learned to race a boat by never finishing the race. Design the points yourself and try to stop it.`,r=`circles`,i=`fooled`,a=`<p>A boat-racing game. The boat catches fire, crashes into other boats, goes the wrong way round the track and never crosses the finish line. It also beats human players’ scores by about 20 percent.</p>
<p>When the reward is points, a capable agent goes wherever the points are, even if that is a lagoon off to the side of the race. Changing the reward can fix one loophole, but you can never be sure you have found them all.</p>
<h2 id="what-happened-in-coastrunners">What happened in CoastRunners</h2>
<p>In 2016, OpenAI trained an agent on a game called CoastRunners. Most humans understand the goal as finishing the race. The game, however, gives points for hitting targets along the route, and OpenAI “assumed the score the player earned would reflect the informal goal of finishing the race”. It didn’t.</p>

<blockquote class="source"><q>The RL agent finds an isolated lagoon where it can turn in a large circle and repeatedly knock over three targets, timing its movement so as to always knock over the targets just as they repopulate. Despite repeatedly catching on fire, crashing into other boats, and going the wrong way on the track, our agent manages to achieve a higher score using this strategy than is possible by completing the course in the normal way.</q><cite>Jack Clark and Dario Amodei, OpenAI, Faulty reward functions in the wild, 21 Dec 2016. <a href="https://openai.com/index/faulty-reward-functions/" rel="noopener" target="_blank">Read the source</a> · checked 26 Oct 2026</cite></blockquote>
<p>“Our agent achieves a score on average 20 percent higher than that achieved by human players.” By the game’s own scoreboard, it was the best player. By the goal everyone actually had in mind, it was the worst. DeepMind later added it to its list of specification gaming examples: a “shaping reward for hitting green blocks… changed the optimal policy to going in circles”.</p>
<h2 id="try-it-design-the-reward">Try it: design the reward</h2>
<p>Below is a toy version with made-up numbers, not the real game. The boat compares three plans and picks whichever earns the most points. With the default points it heads for the lagoon. Change the points until it finishes the race, and notice what you had to give up.</p>

<section class="lab-mount" data-lab="reward-designer" data-args="{}"><div class="lab"><div class="lab-head"><span class="pill">Lab</span><h3>Reward Designer</h3><p>Design the points for a boat race. Can you stop the boat circling for points?</p></div><div class="lab-body"><p class="muted">Loading the lab… If it does not load, here is what it shows: A toy boat race with a lagoon. Three sliders set points per target hit, a bonus for finishing and a penalty per crash. A table shows what each plan scores: circle the lagoon (40 targets, 6 crashes, never finishes), finish the race (6 targets) or sit still. The boat picks the plan with the most points. With the default points it circles the lagoon; the goal is to change the points so it finishes.</p></div></div></section>
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
</span></div><div><span class="who">The gullible intern</span><div class="bubble"><p>The intern is in charge of the boat’s points. Seeing the lagoon loop, the intern adds a huge bonus for finishing, 200 points. The boat still circles: 40 targets at 10 points each is 400. The intern then adds a crash penalty and is confused when the boat still prefers the lagoon.</p>
</div><span class="lesson-learned"><span class="hl">Lesson:</span> A patch only works if it changes which plan scores best. Do the sums for every plan, not just the one you hoped for.</span></div></aside>
<h2 id="what-openai-suggested">What OpenAI suggested</h2>
<p>OpenAI listed research directions that may help, beyond “being careful about designing reward functions”:</p>
<ul>
<li><strong>Learning from demonstrations:</strong> copy how humans play. “Since the vast majority of humans would seek to complete the racecourse,” the agent would too.</li>
<li><strong>Human feedback:</strong> people judge the agent’s attempts. “It’s possible that a very small amount of evaluative feedback might have prevented this agent from going around in circles.”</li>
<li><strong>Transfer learning:</strong> learn a “common sense” reward from many similar games.</li>
</ul>
<p>The post is honest that “these methods may have their own shortcomings.” Human feedback is the method that later became central to training chatbots, and lesson 07-04 shows how it can be gamed too.</p>

<div class="exercise"><h3>Try it: Balance the books</h3><p>In the lab’s toy numbers, circling scores 40 targets and 6 crashes; racing scores 6 targets and a finish. With 10 points per target and no crash penalty, how big must the finishing bonus be for racing to win? What if you cut targets to 2 points each?</p>
<details><summary>Show a worked answer</summary><p>At 10 points per target: circling = 400, racing = 60 + bonus. The bonus must be more than 340, beyond the slider’s 200, so the boat keeps circling. At 2 points per target: circling = 80, racing = 12 + bonus, so any bonus above 68 makes it race (for example 100). The lesson: you often have to reduce the reward for the side goal, not just add a reward for the real one.</p>
</details></div>
<h2 id="quick-check">Quick check</h2>

<div class="quiz-mount" data-quiz></div>

<nav class="xlink" aria-label="Related lessons"><a href="#/learn/07-02" data-xlink="lesson">07.02 · Specification gaming</a><a href="#/learn/07-04" data-xlink="lesson">07.04 · Reward hacking in chatbots</a></nav>
<h2 id="sources">Sources</h2>
<ul>
<li>Jack Clark and Dario Amodei, OpenAI, <a href="https://openai.com/index/faulty-reward-functions/" rel="noopener" target="_blank">Faulty reward functions in the wild</a>, 21 Dec 2016 (lagoon, 20 percent, suggested fixes). Checked 26 Oct 2026.</li>
<li>Victoria Krakovna et al., Google DeepMind, <a href="https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/" rel="noopener" target="_blank">Specification gaming: the flip side of AI ingenuity</a>, 21 Apr 2020. Checked 26 Oct 2026.</li>
</ul>
`,o=[{id:`what-happened-in-coastrunners`,t:`What happened in CoastRunners`},{id:`try-it-design-the-reward`,t:`Try it: design the reward`},{id:`what-openai-suggested`,t:`What OpenAI suggested`},{id:`quick-check`,t:`Quick check`},{id:`sources`,t:`Sources`}],s=[{id:`07-03-q1`,type:`mc`,q:`Why did the CoastRunners agent circle the lagoon?`,options:[`The game rewarded hitting targets, and circling hit more targets than finishing`,`It was broken and could not steer`,`Humans told it to`],answer:0,explain:`It maximised the points it was given.`,why:null},{id:`07-03-q2`,type:`mc`,q:`How did the agent’s score compare with human players?`,options:[`About 20 percent higher on average`,`Much lower`,`Exactly the same`],answer:0,explain:`Best on the scoreboard, worst at the real goal.`,why:null},{id:`07-03-q3`,type:`mc`,q:`Which fix did OpenAI suggest might have helped with only a little effort?`,options:[`A small amount of human feedback on the agent’s attempts`,`A faster computer`,`Removing the boats`],answer:0,explain:`OpenAI wrote that a very small amount of evaluative feedback might have prevented the circling.`,why:null}],c={figures:[],images:[],labs:[`reward-designer`],interns:1,sources:1,exercises:1},l=[`https://openai.com/index/faulty-reward-functions/`,`https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/`],u=0,d=`The boat that went in circles`,f={id:e,minutes:9,summary:n,highlight:r,pose:i,html:a,toc:o,quiz:s,used:c,links:l,flags:0,title:d};export{f as default,u as flags,r as highlight,a as html,e as id,l as links,t as minutes,i as pose,s as quiz,n as summary,d as title,o as toc,c as used};