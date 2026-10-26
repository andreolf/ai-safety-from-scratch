---
id: 01-01
minutes: 7
highlight: AI
summary: From spam filters to chatbots. A large language model is one kind of AI, and knowing which kind you are using changes what you should expect from it.
---
Your email’s spam filter is AI. So is the face unlock on a phone, the route suggestion in a map app, and the chatbot that writes a birthday poem for you. They all get called “AI”, but they are very different machines. Treating them as one thing is the first source of confusion.

“AI” is a big family. Chatbots belong to one branch of it: large language models. Most of this course is about that branch, because it is the one people now talk to every day.

:::figure ai-family
Each box sits inside the one around it. Large language models are a small, very visible part of AI.
:::end

## The family, from the outside in

- **[[term:ai|Artificial intelligence]]** is the broad label for computer systems doing tasks we usually call “smart”. It says nothing about *how* they do it.
- **[[term:machine-learning|Machine learning]]** is one way to build AI: instead of writing every rule by hand, you show the computer many examples and it learns patterns. A spam filter learns from millions of emails that people marked as spam.
- **Deep learning** uses large “neural networks”, layers of simple maths units with millions or billions of adjustable numbers. 3Blue1Brown’s video series (linked below) shows how these networks learn, with pictures instead of equations.
- **[[term:llm|Large language models]] (LLMs)** are deep-learning models trained on enormous amounts of text to continue text. ChatGPT, Claude and Gemini are chat apps built on top of LLMs.

## What an LLM physically is

Andrej Karpathy, a well-known AI researcher, opens his introductory talk with a surprising picture: a large language model is “just two files”. One file holds the [[term:parameters]], the learned numbers. For the open model he uses as an example (Meta’s Llama 2 70B), that file is 140 gigabytes. The other file is a small program that runs those numbers, which he says could be about 500 lines of code.

So there is no little person inside, no database of facts you can search, and no understanding in the human sense. There is a very large file of numbers that has become extremely good at one thing: predicting what text comes next. Lesson 01.03 shows how that one skill produces whole answers.

## “General-purpose” AI

A spam filter does one job. Modern LLMs are called **general-purpose** because the same model can translate, summarise, write code, or plan a trip. The International AI Safety Report defines “general-purpose AI” as AI models and systems “that can perform a wide variety of tasks”. That flexibility is what makes them useful, and also what makes them harder to test: you cannot check every possible task in advance.

:::intern fooled
The intern asks the office chatbot what the weather will be tomorrow, gets a confident answer, and leaves the umbrella at home. The chatbot had no weather tool switched on; it simply wrote a plausible forecast.
---
Know what the AI in front of you can actually do. A text predictor without a weather tool cannot know tomorrow’s weather.
:::end

:::exercise Name the AI
For each, say whether it is “AI but not an LLM” or “an LLM”: a spam filter; a chatbot that drafts emails; a phone’s face unlock; an app that answers questions about a PDF you upload.
:::solution
**AI but not an LLM:** the spam filter (a classifier) and face unlock (image recognition). **LLM:** the email-drafting chatbot and the PDF question-answering app, which reads your document into the model’s context (Lesson 01.06). Some apps mix several kinds of AI behind one screen.
:::end

## Quick check

:::quiz
- q: Which statement is true?
  options: ["Large language models are one kind of AI, among many", "All AI is a chatbot", "A spam filter is a large language model"]
  answer: 0
  explain: AI is a big family. LLMs are one branch of it: deep-learning models trained on text.
- q: According to Karpathy’s talk, what is a large language model physically?
  options: ["A file of learned numbers (parameters) plus a small program that runs them", "A database of facts you can search", "A small robot inside a server"]
  answer: 0
  explain: For Llama 2 70B, the parameters file is 140 GB and the code to run it can be about 500 lines.
- q: What does “general-purpose” AI mean?
  options: ["One model can perform a wide variety of tasks", "It is free to use", "It is always correct"]
  answer: 0
  explain: The International AI Safety Report defines general-purpose AI as models and systems that can perform a wide variety of tasks.
:::end

:::xlink
lesson 01-02 | Tokens: how AI reads
lesson 01-03 | Next-word prediction
:::end

## Sources

- Andrej Karpathy, [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g) (talk; “two files”, 140 GB, about 500 lines, from about 0:20 to 2:30). Checked 26 Oct 2026.
- 3Blue1Brown, [Neural networks](https://www.3blue1brown.com/topics/neural-networks) (visual video series). Checked 26 Oct 2026.
- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary) (definition of general-purpose AI). Checked 26 Oct 2026.
