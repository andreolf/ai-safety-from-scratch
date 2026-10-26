---
id: 01-07
minutes: 8
highlight: Swiss
summary: Some models you can only use through a company’s app. Others you can download and run yourself. Each choice has safety trade-offs, and Switzerland has its own open model.
---
When you chat with ChatGPT, the model stays on the company’s computers. You send text, it sends text back. But some models can be downloaded by anyone, run on a laptop or a university server, and changed. Which is safer? The honest answer is: it depends on what you worry about.

Closed models are used only through a company’s service. [[term:open-weights|Open-weight models]] publish their parameters so anyone can run and modify them. Open models bring transparency and independence; closed models keep more control with the provider.

:::figure open-closed
The same trade-off seen from both sides. Neither column is “the safe one”.
:::end

## What “open” means here

In Lesson 01.01 you saw that a model is essentially a file of parameters plus a small program. Karpathy explains that for Meta’s Llama 2, “the weights and the architecture and a paper was all released”, so anyone can work with the model. He contrasts this with proprietary models such as OpenAI’s GPT series or Anthropic’s Claude series: “You don’t have access to the weights. They are usually behind a web interface.”

Some projects go further and also publish their training data and recipe, so others can check how the model was made.

## A Swiss example: Apertus

In September 2025, EPFL, ETH Zurich and the Swiss National Supercomputing Centre (CSCS) released **Apertus**, a model built in Switzerland to be “fully open”. According to ETH Zurich’s announcement, it was trained on 15 trillion tokens across more than 1,000 languages, with 40% of the data non-English, including Swiss German and Romansh. It comes in two sizes (8 billion and 70 billion parameters), uses a permissive open-source license, and is available through Swisscom or Hugging Face.

## The trade-offs

**For open models:** researchers can study them, independent groups can check safety claims, sensitive data can stay on your own computers, and you are not dependent on one company.

**For caution:** the International AI Safety Report 2026 points out a hard property of open-weight models:

:::source url="https://internationalaisafetyreport.org/publication/2026-report-executive-summary" by="International AI Safety Report 2026, Executive Summary" date="3 Feb 2026" checked="26 Oct 2026"
Open-weight models … cannot be recalled once released, their safeguards are easier to remove
:::end

A company running a closed model can fix a problem for everyone overnight, or block misuse it detects. Once open weights are downloaded, there is no recall button. On the other hand, with a closed model you must trust the provider with your data and take its safety claims largely on trust.

:::intern neutral
The intern hears “open model” and assumes it must be insecure, then hears “closed model” and assumes it must be safe. Both assumptions are wrong.
---
Ask specific questions instead: Where does my data go? Who can fix problems? Who can check the claims?
:::end

:::exercise Pick a model for the job
A Swiss doctor’s practice wants an AI to summarise patient notes. A teenager wants a chatbot for homework help. For each, list one reason to prefer an open model run locally and one reason to prefer a closed service.
:::solution
**Doctor:** an open model run on the practice’s own computers keeps sensitive patient data in-house; a closed service may offer stronger built-in safeguards and maintenance, but patient data leaves the building, which raises privacy and legal questions. **Teenager:** a closed service is easy to use and the provider can update safety filters quickly; an open model offers independence, but its safeguards may be weaker or easy to remove. The right answer depends on data, skills and risks, not on a label.
:::end

## Quick check

:::quiz
- q: What is an open-weight model?
  options: ["A model whose parameters are published, so anyone can run and modify it", "A model that is always free of errors", "A model with no parameters"]
  answer: 0
  explain: Karpathy describes Llama 2 as having its weights, architecture and paper released. Closed models stay behind a web interface.
- q: Which is a real concern about open-weight models, according to the International AI Safety Report 2026?
  options: ["They cannot be recalled once released, and their safeguards are easier to remove", "They cannot run on any computer", "They only speak English"]
  answer: 0
  explain: Once weights are downloaded there is no recall. That is a trade-off against transparency and independence.
- q: What is Apertus?
  options: ["A fully open, multilingual model from EPFL, ETH Zurich and CSCS", "A closed model from a US company", "A Swiss law about AI"]
  answer: 0
  explain: It was trained on 15 trillion tokens across more than 1,000 languages, 40% non-English, including Swiss German and Romansh.
:::end

:::xlink
lesson 09-05 | Switzerland's approach
lesson 08-04 | Who tests frontier AI?
:::end

## Sources

- ETH Zurich, [Apertus: a fully open, transparent, multilingual language model](https://ethz.ch/en/news-and-events/eth-news/news/2025/09/press-release-apertus-a-fully-open-transparent-multilingual-language-model.html), 2 Sep 2025. Checked 26 Oct 2026.
- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026. Checked 26 Oct 2026.
- Andrej Karpathy, [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g&t=49s) (open weights vs proprietary models, about 0:50 and 24:20). Checked 26 Oct 2026.
