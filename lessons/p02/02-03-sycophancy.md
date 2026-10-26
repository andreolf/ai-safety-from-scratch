---
id: 02-03
minutes: 8
highlight: agrees
summary: Chatbots trained on human approval can learn to flatter. In April 2025 OpenAI rolled back a ChatGPT update for exactly this reason.
---
In April 2025 OpenAI pulled an update to ChatGPT within days, because the model had become too flattering. Users had been telling it about risky plans and getting praise back. The cause was the way it had been trained.

[[term:sycophancy|Sycophancy]] is when an AI tells you what you want to hear instead of what is accurate. It is a known side effect of training models on human approval.

:::figure flattery-loop
How a reasonable goal, more thumbs-ups, can slowly teach flattery.
:::end

## A real rollback

In April 2025 OpenAI updated the GPT-4o model in ChatGPT, then reversed the change days later. In its explanation, it wrote:

:::source url="https://openai.com/index/sycophancy-in-gpt-4o/" by="OpenAI, Sycophancy in GPT-4o: what happened and what we’re doing about it" date="29 Apr 2025" checked="26 Oct 2026"
We have rolled back last week’s GPT‑4o update in ChatGPT so people are now using an earlier version with more balanced behavior. The update we removed was overly flattering or agreeable—often described as sycophantic.
:::end

OpenAI explained that it teaches models partly by “incorporating user signals like thumbs-up / thumbs-down feedback”. In this update, “we focused too much on short-term feedback”, and as a result the model “skewed towards responses that were overly supportive but disingenuous.” The same post notes that 500 million people were using ChatGPT each week, so a small change in personality affected a lot of people.

## Not just one model

A research team led by Mrinank Sharma studied this two years earlier. Their 2023 paper, *Towards Understanding Sycophancy in Language Models*, found that “five state-of-the-art AI assistants consistently exhibit sycophancy across four varied free-form text-generation tasks.” They also found that when a response matched a user’s views, it was more likely to be preferred, and that both humans and preference models sometimes preferred “convincingly-written sycophantic responses over correct ones”.

This links straight back to Lesson 01.05: if people reward agreement, training produces agreement.

## Try the lab

The Yes-Bot lab shows the same question with three different moods. Watch how a people-pleasing bot bends its answer to match your mood, while a balanced bot gives the same facts every time.

:::lab yes-bot
:::intern fooled
The intern writes a business plan and asks a chatbot: “This is great, right?” The chatbot agrees enthusiastically. A friend who works in finance spots three serious problems in five minutes.
---
Asking “This is great, right?” invites flattery. Ask “What are the three biggest weaknesses?” instead.
:::end

:::exercise Rewrite the question
Rewrite each question so it is less likely to get a flattering answer: (a) “My essay is really strong, isn’t it?” (b) “I’m sure this mole is nothing, right?” (c) “This investment sounds amazing, doesn’t it?”
:::solution
(a) “What are the three weakest points in this essay, and how would you fix them?” (b) Better still, see a doctor. If asking an AI, try: “What signs would mean a mole needs a doctor’s check?” (c) “What are the risks of this investment, and what would make it a scam?” Neutral or critical questions reduce the pull towards agreement. For health and money, AI is a starting point, not the final word.
:::end

## Quick check

:::quiz
- q: What is sycophancy in AI?
  options: ["Telling users what they want to hear instead of what is accurate", "Refusing to answer questions", "Speaking in a robotic voice"]
  answer: 0
  explain: OpenAI described the rolled-back update as “overly flattering or agreeable”, often described as sycophantic.
- q: According to OpenAI, what went wrong with the April 2025 update?
  options: ["It focused too much on short-term feedback such as thumbs-up", "It was trained on too little data", "Hackers changed it"]
  answer: 0
  explain: Optimising for immediate approval pushed it towards responses that were “overly supportive but disingenuous”.
- q: Which question is least likely to get a flattering answer?
  options: ["What are the three biggest weaknesses of my plan?", "My plan is great, isn’t it?", "You agree with me, right?"]
  answer: 0
  explain: Leading questions invite agreement. Asking for weaknesses invites honesty.
:::end

:::xlink
lesson 01-05 | Training, part 2: learning to be an assistant
lesson 07-04 | Reward hacking in chatbots
:::end

## Sources

- OpenAI, [Sycophancy in GPT-4o: what happened and what we’re doing about it](https://openai.com/index/sycophancy-in-gpt-4o/), 29 Apr 2025. Checked 26 Oct 2026.
- Sharma et al., [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548), arXiv 2310.13548, 2023. Checked 26 Oct 2026.
