---
id: 08-03
minutes: 9
highlight: Evals
pose: fooled
summary: An eval is an exam for an AI. What you put in the exam, and how you mark it, decides which model looks best. Build one and see.
---
## The hook

Two students take the same test. One answers every question, guessing when unsure. The other leaves a few blank. On a test that only counts right answers, the guesser often wins. Would you hire the guesser as a doctor?

## The one idea

**An [[term:eval|eval]] is a test that measures what an AI can do or how it behaves. Every eval makes choices, which questions and how to score them, and those choices decide who “wins”. A model can top a scoreboard and still fail at what you actually care about.**

:::figure eval-recipe
Four steps, and a choice at every one.
:::end

## What evals look like

An eval can be a list of trivia questions, a set of coding tasks, or a long job an AI agent must complete on its own. The UK AI Security Institute’s open-source tool Inspect, for example, is built for evaluations that “measure coding, agentic tasks, reasoning, knowledge, behavior, and multi-modal understanding.” A published, standard eval that many labs use to compare models is called a [[term:benchmark|benchmark]].

## The scoreboard problem

Phase 02 showed OpenAI’s explanation of why chatbots hallucinate: most tests score only accuracy, so guessing beats saying “I don’t know”. Over thousands of questions, the guesser “ends up looking better on scoreboards”. On one test in OpenAI’s post, an older model was right slightly more often than a newer one (24% versus 22%) but wrong far more often (75% versus 26%). An accuracy-only scoreboard ranked the more error-prone model higher.

:::source url="https://openai.com/index/why-language-models-hallucinate/" by="OpenAI, Why language models hallucinate" date="5 Sep 2025" checked="26 Oct 2026"
Penalize confident errors more than you penalize uncertainty, and give partial credit for appropriate expressions of uncertainty.
:::end

That is a change to the *eval*, not the model. Change the test and you change what the models are pushed to do.

## The memorisation problem

There is a second trap. If a model has already seen a test’s questions and answers, it can score well without the ability the test was meant to measure, like a student who memorised last year’s exam. A test made only of questions that are already public can’t tell memorising from understanding. Fresh questions can.

The International AI Safety Report 2026 describes the bigger version of this: an “evaluation gap”, where “performance on pre-deployment tests does not reliably predict real-world utility or risk”, and models that more often “find loopholes in evaluations” (lesson 07-05).

## Try it: Build-an-Eval

Three made-up models answer eight questions. You choose which questions go in the test and what a wrong answer costs. Can you build a test that rewards the model you would actually trust?

:::lab build-an-eval
:::intern fooled
The intern compares three chatbots for the company using last year’s famous benchmark questions, found in a blog post. One chatbot scores 100%. The intern signs a contract. In the first week, it invents a refund policy that doesn’t exist.
---
A perfect score on a test the model may have seen tells you little. Test on your own fresh questions, and count confident errors.
:::end

:::exercise Mark the exam
A model answers 20 questions: 12 right, 6 wrong, 2 “I don’t know”. Another: 11 right, 1 wrong, 8 “I don’t know”. Score both with (a) right +1, everything else 0; (b) right +1, wrong −2, “I don’t know” 0. Which would you deploy for medical questions?
:::solution
(a) First model 12, second 11: the first wins. (b) First: 12 − 12 = 0. Second: 11 − 2 = 9: the second wins clearly. For medical questions, confident errors are dangerous, so rule (b) reflects what you care about, and the second model is the better choice.
:::end

## Quick check

:::quiz
- q: What is an eval?
  options: ["A test that measures what an AI can do or how it behaves", "A type of computer chip", "A user review in an app store"]
  answer: 0
  explain: Like an exam made of many questions or tasks.
- q: Why can an accuracy-only scoreboard mislead?
  options: ["It rewards guessing, so a model that makes many confident errors can rank higher", "It counts every answer twice", "It only works in English"]
  answer: 0
  explain: OpenAI’s example: 24% right but 75% wrong beat 22% right and 26% wrong.
- q: Why add fresh questions to a test?
  options: ["A model may have memorised public questions, so fresh ones check real ability", "Fresh questions are easier", "Public questions are always wrong"]
  answer: 0
  explain: A test of memorised questions can’t tell memory from skill.
:::end

:::xlink
lesson 02-01 | Hallucinations: confident and wrong
lesson 08-04 | Who tests frontier AI?
:::end

## Sources

- OpenAI, [Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/), 5 Sep 2025 (scoreboards, SimpleQA table, suggested fix). Checked 26 Oct 2026.
- UK AI Security Institute and Meridian Labs, [Inspect](https://inspect.aisi.org.uk/) (what evaluations measure). Checked 26 Oct 2026.
- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026 (evaluation gap). Checked 26 Oct 2026.
