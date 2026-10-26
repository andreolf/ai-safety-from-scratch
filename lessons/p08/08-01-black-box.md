---
id: 08-01
minutes: 7
highlight: black
pose: alarmed
summary: The people who build large language models can measure what they do, but not fully explain how. Andrej Karpathy calls them mostly inscrutable.
---
## The hook

Imagine buying a car where the engineers say: “We know how to make it go faster. We can measure that it goes faster. We don’t really know which parts do what.” You would want a lot of test drives.

## The one idea

**A large language model is a “black box”: we can see what goes in and what comes out, and we know how to train it, but we do not understand how its billions of numbers work together to produce an answer. That is why researchers try both to look inside (interpretability) and to test from outside (evals).**

:::figure black-box
What we can see, and what we can’t.
:::end

## In the words of someone who built them

Andrej Karpathy, an AI researcher, explained this in his one-hour introduction to large language models. Training adjusts the model’s [[term:parameters|parameters]], billions of numbers, to get better at predicting the next word:

:::source url="https://www.youtube.com/watch?v=zjkBMFhNj_g&t=710s" by="Andrej Karpathy, Intro to Large Language Models (talk)" date="2023" checked="26 Oct 2026"
So we know how to optimize these parameters, we know how to adjust them over time to get a better next word prediction. But we don't actually really know what these 100 billion parameters are doing. We can measure that it's getting better at next word prediction. But we don't know how these parameters collaborate to actually perform that.
:::end

His summary: “think of LLMs as kind of like mostly inscrutable artifacts. They're not similar to anything else you might build in an engineering discipline. Like they're not like a car, where we sort of understand all the parts.”

## A strange example: the reversal curse

Karpathy gives an example of how odd a model’s knowledge can be. Asked “who is Tom Cruise’s mother?”, GPT-4 answered correctly: Mary Lee Pfeiffer. Asked “who is Mary Lee Pfeiffer’s son?”, it said it didn’t know. In his words, the knowledge is “kind of one dimensional”: “you have to sort of like ask it from a certain direction almost.”

No engineer wrote a rule saying “only answer in one direction”. The behaviour came out of training, and nobody could point to the part of the model responsible.

## Two ways to deal with a black box

Karpathy says we “kind of treat them mostly as empirical artifacts. We can give them some inputs, and we can measure the outputs.” That leads to two approaches, the rest of this phase:

1. **Look inside:** [[term:interpretability|interpretability]] research tries to find meaningful patterns in the numbers (lesson 08-02).
2. **Test from outside:** [[term:eval|evals]], red-teaming and incident reports measure what the model actually does (lessons 08-03 to 08-06).

The International AI Safety Report 2026 adds a warning that applies to both: “the inner workings of models remain poorly understood.”

:::intern alarmed
The intern asks a chatbot why it gave a particular answer. It replies with a neat, confident explanation. The intern pastes it into the project report as “how the AI decided”.
---
A model’s explanation of itself is more generated text. It is not a view inside the black box.
:::end

:::exercise Two directions
Using the reversal curse idea, write two questions about the same fact, one in each direction, that you could use to test a chatbot. Why might it answer one and not the other?
:::solution
For example: “Who wrote the novel *Heidi*?” (Johanna Spyri) and “Which famous children’s novel did Johanna Spyri write?” The model may have seen the fact far more often in one direction during training. Its knowledge is learned from patterns in text, not stored like a database you can search from either end.
:::end

## Quick check

:::quiz
- q: What does Karpathy say we know, and don’t know, about large language models?
  options: ["We know how to adjust the parameters to improve them, but not how the parameters work together", "We understand every part, like a car", "We know nothing about how to train them"]
  answer: 0
  explain: Training works; understanding lags behind.
- q: What is the reversal curse?
  options: ["A model can answer a fact asked one way but not the same fact asked the other way", "A model that reverses every word", "A virus in the model"]
  answer: 0
  explain: Tom Cruise’s mother, yes; Mary Lee Pfeiffer’s son, no.
- q: Why is a chatbot’s explanation of its own answer not proof of how it decided?
  options: ["The explanation is itself generated text, not a view of the model’s internals", "Chatbots cannot write explanations", "Explanations are always false"]
  answer: 0
  explain: Interpretability research looks at the internals directly instead.
:::end

:::xlink
lesson 01-04 | Training, part 1: reading the internet
lesson 08-02 | Interpretability: finding "features"
:::end

## Sources

- Andrej Karpathy, [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g&t=710s) (talk; parameters and the reversal curse from about 11:50, “mostly inscrutable artifacts” at about 13:20). Checked 26 Oct 2026.
- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026. Checked 26 Oct 2026.
