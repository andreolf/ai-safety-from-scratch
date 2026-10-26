---
id: 01-03
minutes: 9
highlight: prediction
pose: fooled
summary: An LLM writes by guessing the next token, again and again. That single trick explains both its fluency and its confident mistakes.
---
## The hook

Your phone suggests the next word as you type a message. Now imagine that autocomplete trained on a large part of the internet, with billions of adjustable numbers, picking one word after another until it has written a whole essay. That is, at its core, what a chatbot does.

## The one idea

**An LLM generates text one token at a time. At each step it predicts the probabilities of every possible next token, picks one, adds it, and repeats.**

:::image figure-next-word
The flagship infographic for this lesson. The percentages are illustrative, as the card says.
:::end

## Karpathy’s cat

In his introductory talk, Andrej Karpathy describes the job of the neural network in one sentence: it “is just trying to predict the next word in a sequence.” His example: feed in “cat sat on a” and the network might predict “mat” with about 97% probability.

Then comes the clever part. Add “mat” to the text, feed the longer text back in, and predict again. Repeat a few hundred times and you have a paragraph. 3Blue1Brown’s lesson on transformers describes the same loop: give the model some text, have it predict the next word, take a random sample from that prediction, append it, and run again.

:::figure predict-loop
Walk through one turn of the loop. The model never plans the whole answer in advance in this simple picture; it keeps choosing the next piece.
:::end

## Temperature: sure or surprising

When the model picks from its probabilities, a setting called **[[term:temperature]]** decides how adventurous it is. 3Blue1Brown explains that a larger temperature gives more weight to less likely options, making the choices more uniform, while a smaller temperature lets the top options dominate. Low temperature: predictable, repetitive. High temperature: creative, and more likely to go off the rails.

## Fluent is not true

Here is the safety lesson hiding in the maths. The model is rewarded for producing *likely* text, the kind of text that tends to follow. Likely and true often overlap, which is why chatbots are so useful. But they are not the same thing. A sentence like “Our new wonder pill cures…” is very likely to continue with something exciting, whether or not any pill cures anything. Phase 02 shows how this produces “hallucinations”, confident statements that are false.

## Try the lab

The Token Predictor is a toy: a small hand-made table, not a real model. Pick a sentence start, watch the bars, move the temperature slider and add tokens one by one. Try the wonder-pill start and see how quickly fluent nonsense appears.

:::lab token-predictor
:::exercise Break the predictor
In the lab, set the temperature to the maximum and write four tokens three times from the same start. Then set it to the minimum and do the same. What changes?
:::solution
At high temperature the bars flatten, so less likely words get picked more often and each run looks different. At low temperature the top word wins almost every time, so every run is nearly the same. Neither setting checks facts: temperature changes *how adventurous* the choices are, not whether they are true.
:::end

## Quick check

:::quiz
- q: In plain words, what does an LLM do when it writes an answer?
  options: ["Predicts the next token, adds it, and repeats", "Looks up the answer in a database of facts", "Copies a whole answer written by a human"]
  answer: 0
  explain: Karpathy describes the network as trying to predict the next word in a sequence. Repeating that loop produces whole answers.
- q: What happens when you raise the temperature?
  options: ["Less likely tokens get picked more often, so output is more varied", "The model becomes more accurate", "The model reads faster"]
  answer: 0
  explain: Higher temperature flattens the probabilities, so surprising choices happen more. It does not make answers truer.
- q: Why can fluent AI text still be false?
  options: ["The model is trained to produce likely text, and likely is not the same as true", "Fluent text is always false", "Because tokens are too small"]
  answer: 0
  explain: Predicting what usually comes next makes text sound right. Whether it is right is a separate question.
:::end

:::xlink
lesson 02-01 | Hallucinations: confident and wrong
lesson 01-04 | Training, part 1: reading the internet
:::end

## Sources

- Andrej Karpathy, [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g&t=407s) (next-word prediction and the “cat sat on a … mat, 97%” example, from about 6:47). Checked 26 Oct 2026.
- 3Blue1Brown, [Transformers, the tech behind LLMs](https://www.3blue1brown.com/lessons/gpt) (the generate-sample-append loop and temperature). Checked 26 Oct 2026.
