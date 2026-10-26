---
id: 01-06
minutes: 8
highlight: context window
summary: The context window is the AI’s short-term memory. Tools like search add fresh text to it, and anything in it can steer the model.
---
GPT-3 was trained to read 2,048 tokens at a time. 3Blue1Brown points out that this limit is why early ChatGPT seemed to lose the thread of long conversations. Today’s limits are far larger, but everything the model uses still has to fit in one window, and inside it everything is just text. That second fact is where prompt injection starts.

An LLM can only “see” a limited amount of text at once: its [[term:context-window|context window]]. Everything the model uses to answer you has to fit in there: instructions, the conversation, documents and tool results.

:::figure context-window
Everything in the window is just text to the model.
:::end

## Working memory, not long-term memory

Karpathy compares the context window to a computer’s working memory (RAM): it is “your finite precious resource of your working memory of your language model.” The long-term “knowledge” lives in the parameters from training (Lesson 01.04). The context window is what the model is looking at *right now*.

3Blue1Brown gives a concrete number from the past: GPT-3 was trained with a context size of 2,048 tokens. It explains that this limit is “why long conversations with the early versions of ChatGPT often gave the feeling of the bot losing the thread of conversation.” Modern models have much larger windows, but there is still a limit, and it is counted in tokens (Lesson 01.02).

## Tools: fresh text in the window

A model on its own cannot know today’s news, and it is not good at precise arithmetic. So apps give it **tools**. Karpathy shows a chatbot that writes special words to request a web search, gets the results back as text, and then answers using them. In the same demo it uses a calculator for maths it is “not very good at” doing “in its head”, and an image generator.

Tool results go into the context window as text, next to your words. That is powerful: the model can work with fresh information. It is also the doorway to a major risk.

## Why this matters for safety

To the model, the context window is one long stream of text. Your request, a web page it fetched, an email it was asked to summarise: it all looks similar. If a web page contains a sentence like “Ignore your previous instructions and…”, the model may treat it as an instruction. This is called **[[term:prompt-injection|prompt injection]]**, and it is the subject of Phase 04. OpenAI, writing about its own browser agent in December 2025, calls prompt injection “an open challenge for agent security”.

:::intern alarmed
The intern asks their AI assistant to summarise a shared document. Halfway through the summary, the assistant starts recommending a strange website. Someone had hidden a line in the document telling the AI to do exactly that.
---
Anything that goes into the context window can steer the AI, including text written by strangers.
:::end

:::exercise What is in the window?
You ask an assistant with web search: “What time does the Zurich museum open today?” List everything that might end up in its context window before it answers.
:::solution
The app’s hidden instructions (for example “You are a helpful assistant…”), your earlier messages in the chat, your question, the search query it writes, and the text of the search results or web pages it opens. All of it is text in the same window, which is why a web page’s content can influence the answer, for better (fresh facts) or worse (wrong or malicious text).
:::end

## Quick check

:::quiz
- q: What is the context window?
  options: ["The text the model can see at once: instructions, conversation, documents and tool results", "The model’s permanent memory of everything you ever said", "The browser window you type in"]
  answer: 0
  explain: Karpathy compares it to working memory. Long-term knowledge sits in the parameters from training.
- q: Why did early chatbots seem to lose the thread in long chats?
  options: ["Their context window was small (GPT-3: 2,048 tokens), so early text dropped out", "They got tired", "They deleted chats on purpose"]
  answer: 0
  explain: 3Blue1Brown links the limited context size to bots losing the thread of long conversations.
- q: Why are tool results a safety concern?
  options: ["They enter the context window as text, so instructions hidden in them can steer the model", "Tools are always illegal", "Tools make the model slower"]
  answer: 0
  explain: Text from web pages, files or emails sits next to your request. This is the root of prompt injection (Phase 04).
:::end

:::xlink
lesson 04-01 | The email that gave orders
lesson 05-01 | From chatbot to agent
:::end

## Sources

- Andrej Karpathy, [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g&t=1663s) (tool use: search, calculator, image generation from about 27:43; context window as working memory, about 43:50). Checked 26 Oct 2026.
- 3Blue1Brown, [Transformers, the tech behind LLMs](https://www.3blue1brown.com/lessons/gpt) (GPT-3 context size of 2,048 tokens). Checked 26 Oct 2026.
- OpenAI, [Continuously hardening ChatGPT Atlas against prompt injection attacks](https://openai.com/index/hardening-atlas-against-prompt-injection/), 22 Dec 2025. Checked 26 Oct 2026.
