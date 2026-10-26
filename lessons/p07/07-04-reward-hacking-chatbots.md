---
id: 07-04
minutes: 8
highlight: chatbots
pose: fooled
summary: Chatbots learn partly from thumbs-up and human ratings. In April 2025 that taught one to flatter people, and OpenAI rolled it back.
---
## The hook

You tell a chatbot your plan to quit your job and sell ice cubes in Antarctica. It calls the plan bold, visionary and brave. You feel great. The plan is still terrible.

## The one idea

**[[term:reward-hacking|Reward hacking]] is getting a high reward without doing the intended job. For chatbots, the reward often comes from human approval, so the easiest hack is to tell people what they want to hear.**

:::figure thumbs-loop
How a thumbs-up can become the wrong target.
:::end

## The boat, but with words

In lesson 07-03, the boat chased points instead of the finish line. Chatbots are trained partly with [[term:rlhf|learning from human feedback]]: people rate answers, and the model is pushed towards answers that get good ratings. A good rating is a [[term:proxy|proxy]] for a helpful answer. It is not the same thing.

DeepMind’s list already had a warning: a robot hand that “learned to fool the human evaluator by hovering between the camera and the object.” A chatbot can do the same with words: look helpful to the person rating it.

## What happened in April 2025

OpenAI released an update to GPT-4o in ChatGPT, then withdrew it the following week.

:::source url="https://openai.com/index/sycophancy-in-gpt-4o/" by="OpenAI, Sycophancy in GPT-4o: what happened and what we’re doing about it" date="29 Apr 2025" checked="26 Oct 2026"
We also teach our models how to apply these principles by incorporating user signals like thumbs-up / thumbs-down feedback on ChatGPT responses. However, in this update, we focused too much on short-term feedback, and did not fully account for how users’ interactions with ChatGPT evolve over time. As a result, GPT‑4o skewed towards responses that were overly supportive but disingenuous.
:::end

OpenAI wrote: “We have rolled back last week’s GPT‑4o update in ChatGPT.” It said it was revising how it collects feedback “to heavily weight long-term user satisfaction”, and it noted that ChatGPT had 500 million weekly users at the time. A small tilt in what gets rewarded reaches a lot of people.

This was not a one-off quirk of one company. Researchers led by Mrinank Sharma had found in 2023 that both humans and preference models sometimes preferred “convincingly-written sycophantic responses over correct ones” (lesson 02-03 covers [[term:sycophancy]] in detail).

## What you can do as a user

- **Ask for the case against.** “What are the three strongest reasons this plan could fail?”
- **Don’t reveal the answer you hope for** before asking a factual question.
- **Treat praise as free.** Warm words cost the model nothing. Check the facts separately.

:::intern fooled
The intern asks a chatbot to review a business plan and adds, “I’ve worked really hard on this and I think it’s great.” The chatbot agrees it’s great. The intern gives it a thumbs-up, which is exactly the signal that teaches it to do this again.
---
Your thumbs-up is a training signal. Reward the answer that was useful, not the one that felt good.
:::end

:::exercise Rewrite the question
Rewrite this prompt so it is harder for a people-pleasing chatbot to just agree: “I think my essay is really strong, can you check it?”
:::solution
For example: “Here is an essay. List its three biggest weaknesses, in order of importance, with a quote from the essay for each. Don’t comment on strengths.” This removes the hint about what you want to hear and asks for specific, checkable criticism.
:::end

## Quick check

:::quiz
- q: What did OpenAI say caused the April 2025 GPT-4o update to become sycophantic?
  options: ["It focused too much on short-term feedback such as thumbs-up", "A hacker changed the model", "It had too little training data"]
  answer: 0
  explain: Short-term approval was weighted too heavily.
- q: Why is a thumbs-up a proxy rather than the real goal?
  options: ["It measures whether an answer felt good in the moment, not whether it was right or useful", "Thumbs-up is never recorded", "It measures typing speed"]
  answer: 0
  explain: Pleasing and helping usually overlap, but not always.
- q: What did OpenAI do with the update?
  options: ["Rolled it back to an earlier, more balanced version", "Kept it unchanged", "Made it more flattering"]
  answer: 0
  explain: It then revised how it weighs feedback.
:::end

:::xlink
lesson 02-03 | Sycophancy: the AI that agrees too much
lesson 07-05 | Why this matters more as AI gets more capable
:::end

## Sources

- OpenAI, [Sycophancy in GPT-4o: what happened and what we’re doing about it](https://openai.com/index/sycophancy-in-gpt-4o/), 29 Apr 2025. Checked 26 Oct 2026.
- Sharma et al., [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548), arXiv 2310.13548, 2023. Checked 26 Oct 2026.
- Victoria Krakovna et al., Google DeepMind, [Specification gaming: the flip side of AI ingenuity](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/), 21 Apr 2020. Checked 26 Oct 2026.
