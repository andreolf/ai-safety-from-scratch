---
id: 02-05
minutes: 7
highlight: reversal
summary: A model can know that A is B and still fail to say that B is A. The reversal curse shows that AI “knowledge” is stored very differently from ours.
---
## The hook

If you know that Tom Cruise’s mother is Mary Lee Pfeiffer, you also know that Mary Lee Pfeiffer’s son is Tom Cruise. It is the same fact, read backwards. For a person, that is trivial. For a language model, it can be surprisingly hard.

## The one idea

**The reversal curse: a model trained on “A is B” does not automatically learn “B is A”. Its knowledge is lopsided, which is one more reason not to treat it like a database or an encyclopedia.**

:::figure reversal
Same fact, two directions, two very different results.
:::end

## Karpathy’s example

In his introductory talk, Andrej Karpathy calls this knowledge “very strange and imperfect and weird”. He describes asking GPT-4 “who is Tom Cruise’s mother?”: it answers Mary Lee Pfeiffer, which is correct. But ask “who is Mary Lee Pfeiffer’s son?” and “it will tell you it doesn’t know.”

## The research behind it

The example comes from a 2023 paper titled *The Reversal Curse: LLMs trained on “A is B” fail to learn “B is A”*, by Lukas Berglund, Owain Evans and colleagues. They tested it two ways:

- **Made-up facts.** They fine-tuned models on fictitious statements such as “Uriah Hawthorne is the composer of Abyssal Melodies”, then asked “Who composed Abyssal Melodies?”. The models failed. In the paper’s words, the likelihood of the correct name was not higher than for a random name.
- **Real celebrities.** They asked GPT-4 about 1,000 popular celebrities and their parents. The paper reports that GPT-4 answered questions like “Who is Tom Cruise’s mother?” correctly 79% of the time, compared with 33% for the reverse question.

There is one useful twist. The authors note that if “A is B” appears *in the context window* (Lesson 01.06), models can work out the reverse. The weakness is in what training stored, not in reasoning about text in front of it.

## Why it matters to you

- A model may “know” something in one phrasing and seem ignorant in another. **Rephrasing a question can change the answer.**
- Getting “I don’t know” once does not mean the information isn’t there, and getting an answer once does not mean the model knows it reliably.
- **Giving the model the facts** (pasting the document) usually works better than hoping it remembers them.

:::intern neutral
The intern asks a chatbot who wrote a famous Swiss novel and gets the right author. Then the intern asks which novels that author wrote, and the chatbot lists books by someone else.
---
AI knowledge can work in one direction and fail in the other. Check both ways, or give the AI the source text.
:::end

:::exercise Ask it both ways
Pick a fact you know well, such as a local landmark and the town it is in. Write the question in both directions. Why might a chatbot answer one direction better than the other?
:::solution
Example: “Which town is the Chapel Bridge in?” (Lucerne) and “What is a famous wooden bridge in Lucerne?” The first phrasing may be more common in text, so the model may have learned it better. The paper explains the reversal curse in terms of training order: models learn facts in the direction they usually appear. Checking both directions, or giving the model the source, is safer.
:::end

## Quick check

:::quiz
- q: What is the reversal curse?
  options: ["A model trained on “A is B” does not automatically learn “B is A”", "A model that writes text backwards", "A bug that reverses your chat history"]
  answer: 0
  explain: That is the definition in the paper by Berglund and colleagues, illustrated by the Tom Cruise example.
- q: In the paper’s celebrity test, how often did GPT-4 answer the parent and child questions correctly?
  options: ["79% for the parent question, 33% for the reverse", "100% both ways", "33% for the parent question, 79% for the reverse"]
  answer: 0
  explain: Same facts, very different success depending on the direction of the question.
- q: What usually helps with this weakness?
  options: ["Putting the relevant facts in the context window, for example by pasting the source", "Asking in capital letters", "Using a higher temperature"]
  answer: 0
  explain: The authors note that when “A is B” is in context, models can work out the reverse.
:::end

:::xlink
lesson 01-04 | Training, part 1: reading the internet
lesson 01-06 | The context window and tools
:::end

## Sources

- Andrej Karpathy, [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g&t=756s) (reversal curse example, about 12:36 to 13:05). Checked 26 Oct 2026.
- Berglund et al., [The Reversal Curse: LLMs trained on “A is B” fail to learn “B is A”](https://arxiv.org/abs/2309.12288), arXiv 2309.12288, 2023. Checked 26 Oct 2026.
