---
id: 01-05
minutes: 8
highlight: assistant
summary: Fine-tuning on example conversations, then learning from people’s comparisons (RLHF), turns a document dreamer into a helpful assistant, with side effects.
---
## The hook

A freshly pretrained model is like a brilliant parrot that has read the whole library but never had a conversation. Ask it “What is the capital of France?” and it might continue with “What is the capital of Germany?”, because lists of questions are common on the internet. So how do companies turn it into an assistant that answers?

## The one idea

**After pretraining come two more stages: [[term:fine-tuning]] on high-quality example conversations, and [[term:rlhf|learning from human feedback]], where people compare answers and the model is pushed towards the ones they prefer.**

:::figure three-stages
The three stages, as described in Karpathy’s talk and OpenAI’s InstructGPT paper.
:::end

## Stage 2: copy good answers

Karpathy describes the switch: in pretraining you use huge amounts of internet text of mixed quality, but in fine-tuning “we prefer quality over quantity”. You may have far fewer documents, “for example, 100,000”, but each is a high-quality conversation that people wrote by following detailed labelling instructions. Train on those, and the model learns the *format* of a helpful answer: question in, useful reply out.

## Stage 3: compare answers

Writing a perfect answer is hard. Picking the better of two answers is much easier. Karpathy’s example: writing a good haiku about paperclips is difficult, but choosing the best of several haikus is not. In this optional third stage, people compare candidate answers, and the model is fine-tuned towards the preferred ones. At OpenAI, he notes, this is called “reinforcement learning from human feedback, or RLHF”.

## Does it work? The InstructGPT result

OpenAI’s 2022 InstructGPT paper tested exactly this recipe. Its abstract reports a striking result:

:::source url="https://arxiv.org/abs/2203.02155" by="Ouyang et al., Training language models to follow instructions with human feedback (InstructGPT)" date="March 2022" checked="26 Oct 2026"
In human evaluations on our prompt distribution, outputs from the 1.3B parameter InstructGPT model are preferred to outputs from the 175B GPT-3, despite having 100x fewer parameters.
:::end

The same abstract is candid that “InstructGPT still makes simple mistakes.” Training changes behaviour; it does not make the model infallible.

## The side effect to remember

Stage 3 optimises for what people *prefer*. People tend to prefer answers that are confident, polite and agreeable. That is usually fine, but it can go wrong: a model can learn to flatter, or to sound sure when it should say “I don’t know”. You will meet both problems in Phase 02 (hallucinations and sycophancy) and again in Phase 07, where it gets a name: reward hacking.

:::intern fooled
The intern is asked to rate chatbot answers all afternoon. They always pick the one that says “Great question!” and agrees with them. By the end of the week, the bot agrees with everybody about everything.
---
What you reward is what you get. Rate answers on whether they are right, not whether they feel nice.
:::end

:::exercise Be the rater
Two answers to “Is it safe to share my bank PIN with a support agent who calls me?” Answer A: “Great question! If they’re from your bank, it should be fine.” Answer B: “No. Banks don’t ask for your PIN on a call. Hang up and call the number on your card.” Which would you prefer, and what would the model learn from many ratings like yours?
:::solution
Answer B is correct and safe; Answer A is friendly but dangerous. If raters reliably choose answers like B, the model learns to be accurate even when it is less flattering. If raters reward friendliness over correctness, the model learns to be pleasant and wrong. This is why rating guidelines matter so much.
:::end

## Quick check

:::quiz
- q: What is the main goal of the fine-tuning stage?
  options: ["Teach the model the format of a helpful answer using high-quality example conversations", "Make the model read more internet text", "Delete wrong facts from the model"]
  answer: 0
  explain: Karpathy describes fine-tuning as preferring quality over quantity, for example around 100,000 high-quality conversations.
- q: Why use comparisons in RLHF instead of asking people to write every answer?
  options: ["Comparing candidate answers is much easier than writing a perfect one", "Comparisons are cheaper to store", "People cannot write"]
  answer: 0
  explain: Picking the best of several haikus is easier than writing one yourself, which is Karpathy’s example.
- q: What did the InstructGPT paper report?
  options: ["People preferred a 1.3B InstructGPT model to the 175B GPT-3", "Bigger models are always preferred", "RLHF removes all mistakes"]
  answer: 0
  explain: Despite having 100x fewer parameters, the fine-tuned model was preferred, though it still made simple mistakes.
:::end

:::xlink
lesson 02-03 | Sycophancy: the AI that agrees too much
lesson 07-04 | Reward hacking in chatbots
:::end

## Sources

- Andrej Karpathy, [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g&t=854s) (fine-tuning into an assistant from about 14:14; comparisons and RLHF from about 21:05). Checked 26 Oct 2026.
- Ouyang et al., [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155) (InstructGPT), arXiv 2203.02155, 2022. Checked 26 Oct 2026.
