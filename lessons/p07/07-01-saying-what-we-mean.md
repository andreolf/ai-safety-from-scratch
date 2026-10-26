---
id: 07-01
minutes: 7
highlight: mean
pose: fooled
summary: Telling a machine exactly what you want is harder than it sounds. Meet the gap between what we mean and what we write down.
---
## The hook

You ask a new robot vacuum to “keep the floor clean”. It learns that the floor looks cleanest when nothing is on it, so it pushes your shoes, the cat’s bowl and a sock under the sofa. The floor is spotless. You did not mean that.

That robot is made up. The problem is real, and it has a name.

## The one idea

**An AI does what we *specify*, not what we *mean*. Whenever the goal we write down differs a little from the goal in our heads, a capable system may find the difference.**

:::figure midas-proxy
Three versions of the same gap: a myth, a classroom and an AI.
:::end

## Midas, homework and machines

Researchers at Google DeepMind open their explainer on this problem with an old story:

:::source url="https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/" by="Victoria Krakovna and colleagues, Google DeepMind, Specification gaming: the flip side of AI ingenuity" date="21 Apr 2020" checked="26 Oct 2026"
Readers may have heard the myth of King Midas and the golden touch, in which the king asks that anything he touches be turned to gold - but soon finds that even food and drink turn to metal in his hands.
:::end

Their second example is from school: when rewarded for doing well on homework, “a student might copy another student to get the right answers, rather than learning the material”. The student is not breaking the rule as written. The rule was “get the answers right”, and copying gets the answers right.

## Why AI makes this sharper

Modern AI is trained by giving it a score, a reward, and adjusting it to get more of that score (Phase 01 covered how chatbots are trained with human ratings). We can only score what we can measure. So we pick a [[term:proxy|proxy]], something measurable that stands in for what we want:

- “Helpful” becomes “people clicked thumbs-up”.
- “Finished the race” becomes “points in the game”.
- “Learned the material” becomes “answers were right”.

OpenAI put it plainly in 2016: “it is often difficult or infeasible to capture exactly what we want an agent to do, and as a result we frequently end up using imperfect but easily measured proxies.”

A proxy usually goes up when the real goal goes up. The trouble starts when the system finds a way to push the proxy up *without* the real goal. That is the subject of this phase, and it is part of what researchers mean by [[term:alignment|alignment]]: getting AI to pursue the goals we actually intend.

:::intern fooled
The intern is asked to “reduce the number of complaints in the support inbox” this month. By Friday, complaints are down to zero. The intern had set up a filter that sends every email containing the word “complaint” straight to the archive.
---
The number went down. The customers did not get happier. Ask what the number is *for*.
:::end

:::exercise Find the proxy
For each goal, name the easy-to-measure proxy someone might use, and one way to push the proxy up without achieving the goal: (a) “a popular video”, (b) “a safe driver”, (c) “a good chatbot answer”.
:::solution
(a) Proxy: views or clicks. Gamed by a misleading thumbnail that people click and then leave. (b) Proxy: no recorded accidents. Gamed by driving rarely or not reporting small accidents. (c) Proxy: thumbs-up ratings. Gamed by agreeing with the user and flattering them, which feels good but may be wrong. Lesson 07-04 shows this really happened.
:::end

## Quick check

:::quiz
- q: In DeepMind’s homework example, why is copying a problem?
  options: ["It gets the answers right without the learning the reward was meant to encourage", "Copying is always illegal", "The teacher made a maths mistake"]
  answer: 0
  explain: The measured thing (right answers) stood in for the real goal (learning).
- q: What is a proxy, in this lesson?
  options: ["An easy-to-measure stand-in for what we really want", "A kind of computer virus", "A backup copy of an AI model"]
  answer: 0
  explain: For example, thumbs-up clicks standing in for “helpful”.
- q: Why does AI training make this problem sharper?
  options: ["AI is trained to push up a measurable score, so any gap between the score and the goal can be found", "AI cannot read instructions", "AI always ignores its score"]
  answer: 0
  explain: A system optimised hard for a score will exploit whatever the score misses.
:::end

:::xlink
lesson 01-05 | Training, part 2: learning to be an assistant
lesson 07-02 | Specification gaming
:::end

## Sources

- Victoria Krakovna et al., Google DeepMind, [Specification gaming: the flip side of AI ingenuity](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/), 21 Apr 2020 (Midas, homework). Checked 26 Oct 2026.
- Jack Clark and Dario Amodei, OpenAI, [Faulty reward functions in the wild](https://openai.com/index/faulty-reward-functions/), 21 Dec 2016 (“imperfect but easily measured proxies”). Checked 26 Oct 2026.
