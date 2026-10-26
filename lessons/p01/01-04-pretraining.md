---
id: 01-04
minutes: 8
highlight: internet
summary: Pretraining squeezes a huge pile of text into a file of numbers, like a lossy zip file. It keeps the gist, not a copy, and that has consequences.
---
## The hook

Where does a chatbot’s knowledge come from? Nobody typed in facts one by one. Instead, the model read an enormous amount of text and was squeezed until patterns from that text were stored in its numbers.

## The one idea

**[[term:pretraining|Pretraining]] compresses a large chunk of the internet into the model’s [[term:parameters]]. Karpathy calls the result a lossy zip file: it keeps the gist of what it read, not an exact copy.**

:::figure lossy-zip
The numbers are those Karpathy gives for Meta’s Llama 2 70B. He calls them “rookie numbers” compared with today’s state of the art.
:::end

## How big is big?

In his talk, Karpathy walks through the open model Llama 2 70B, using figures Meta published:

- Take “a chunk of the internet” of “roughly … 10 terabytes of text”.
- Run about 6,000 GPUs (specialised chips) for about 12 days.
- This “would cost you about $2 million”.
- Out comes a 140 gigabyte file of parameters, a compression ratio of roughly 100 times.

He then adds that these numbers are, “by today’s standards … rookie numbers”: leading models use far more.

## Lossy, not lossless

A normal zip file is **lossless**: unzip it and you get back exactly what you put in. Karpathy stresses that pretraining is different: “a lossy compression.” The model gets “a kind of a gestalt of the text” but does not hold “an identical copy”.

That one fact explains a lot:

- The model is great at the *style* and *common patterns* of text: how a recipe, a letter or a legal clause usually goes.
- It is weaker on **rare facts**, like a small town’s population or an obscure person’s birthday, which may have been squeezed out. OpenAI’s hallucination research makes the same point: “arbitrary low-frequency facts” cannot be predicted from patterns alone (Lesson 02.01).
- The knowledge has a **cut-off date**. Anything after the training data was collected is unknown unless the app adds a search tool (Lesson 01.06).

## What comes out: a document dreamer

After pretraining, the model is not yet a helpful assistant. Karpathy calls it an “internet document generator”: give it the start of a web page and it continues the web page. Turning it into an assistant that answers questions is the job of the next stage (Lesson 01.05).

:::intern fooled
The intern asks the model for the exact opening hours of a tiny café in their village. It answers instantly, with hours that sound perfectly normal. The café closed two years ago.
---
Rare and recent facts are where a lossy zip is weakest. Check them at the source.
:::end

:::exercise Lossy or not?
Which of these is the model likely to know well, and which might it get wrong? (a) How a formal complaint letter is usually structured. (b) The phone number of a small local plumber. (c) Yesterday’s football results. (d) What a “bereavement fare” is.
:::solution
(a) and (d) are common patterns that appear many times in text, so the model will usually do well. (b) is a rare fact that was probably squeezed out or never there, so it may invent one. (c) is after its training data unless the app adds live search. Rare and recent facts: always check.
:::end

## Quick check

:::quiz
- q: Karpathy compares pretraining to what?
  options: ["A lossy zip file of the internet", "A perfect backup of the internet", "A search engine"]
  answer: 0
  explain: The parameters keep the gist of the training text, not an identical copy.
- q: According to Karpathy’s talk, roughly how big is the Llama 2 70B parameters file?
  options: ["140 gigabytes", "10 terabytes", "5 megabytes"]
  answer: 0
  explain: About 10 TB of text is compressed into a 140 GB file, roughly 100 times smaller.
- q: Which kind of fact is a pretrained model most likely to get wrong?
  options: ["A rare, specific fact such as an obscure person’s birthday", "How a typical letter is structured", "Common grammar"]
  answer: 0
  explain: Lossy compression keeps common patterns and loses many rare details. OpenAI’s research makes the same point about low-frequency facts.
:::end

:::xlink
lesson 01-05 | Training, part 2: learning to be an assistant
lesson 02-01 | Hallucinations: confident and wrong
:::end

## Sources

- Andrej Karpathy, [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g&t=283s) (10 TB, 6,000 GPUs, 12 days, about $2 million, 140 GB, lossy compression: from about 4:43; “internet document generators”: about 14:17). Checked 26 Oct 2026.
- OpenAI, [Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/), 5 Sep 2025 (low-frequency facts). Checked 26 Oct 2026.
