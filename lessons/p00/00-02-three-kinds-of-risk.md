---
id: 00-02
minutes: 8
summary: Mistakes, misuse and control. Three boxes that make every AI headline easier to understand.
---
## The hook

Three real stories. A Canadian airline’s chatbot told a grieving customer he could claim a discount later; he couldn’t, and a tribunal made the airline pay. A finance worker in Hong Kong sent about US$25 million after a video call with a “chief financial officer” who was a deepfake. And in a boat-racing video game, an AI learned to spin in circles collecting points instead of finishing the race.

All three get called “AI risk”. But they are very different problems, with very different fixes.

## The one idea

Sort AI risks into three boxes:

1. **Mistakes.** The AI is wrong. Nobody wanted harm; the system just failed. *The airline chatbot.*
2. **Misuse.** A person uses AI on purpose to hurt someone. *The deepfake video call.*
3. **Control.** The AI does what we *said*, not what we *meant*, or works around the limits we set. *The boat that farmed points.*

:::figure three-risks
The three boxes this course uses. Phase 02 covers mistakes, Phase 03 misuse, and Phases 04 to 08 control.
:::end

## A neutral reference uses the same idea

The International AI Safety Report is a review of the science led by Turing Award winner Yoshua Bengio, written with over 100 independent experts and nominees from more than 30 countries and international organisations. Its 2026 edition sorts the risks of general-purpose AI into three categories:

:::source url="https://internationalaisafetyreport.org/publication/2026-report-executive-summary" by="International AI Safety Report 2026, Executive Summary" date="3 February 2026" checked="26 Oct 2026"
General-purpose AI risks fall into three categories: malicious use, malfunctions, and systemic risks.
:::end

Their “malicious use” is our **misuse**. Their “malfunctions” covers our **mistakes**, and also “loss of control” scenarios, which we keep in their own **control** box because they need different tools. Their third box, **systemic risks**, covers big effects on society, such as jobs and people relying on AI too much (“automation bias”). This course touches systemic risks in Phases 09 and 10. The words differ, but the sorting habit is the same.

## Why the box matters

The box tells you what helps.

- **Mistakes** call for *checking*: ask for sources, open them, and never let AI alone decide medical, legal or money questions. (Phase 02)
- **Misuse** calls for *verification habits*: a family code word, calling back on a number you know. Trying to “spot the fake” by eye is not enough. (Phase 03)
- **Control** calls for *limits and oversight*: give AI tools only the access they need, and keep a human “yes” before anything risky. (Phases 04 to 08)

Many real incidents mix boxes. A scammer (misuse) can plant hidden instructions in an email that trick your AI assistant (control) into a costly error (mistake). Sorting still helps you see each part.

:::intern fooled
The intern reads “AI wipes out company’s money!” and decides all AI is evil. Then reads “AI saves the day!” and decides all AI is perfect. Two headlines, two opposite conclusions, zero sorting.
---
Before you react to a headline, ask: is this a mistake, misuse or control problem?
:::end

## Try the lab

:::lab risk-sorter
:::exercise Sort your own headline
Find one recent news headline about AI (any news site). Which box does it belong in: mistake, misuse or control? Could it be two at once?
:::solution
Example: “Lawyer cites cases invented by a chatbot” is a **mistake** (the AI invented cases) plus a human failure to check. “Criminals use cloned voices in grandparent scams” is **misuse**. “Game AI finds a loophole to win” is **control**. If a story mixes boxes, list each part separately; each part has its own fix.
:::end

## Quick check

:::quiz
- q: A chatbot on a shop’s website invents a returns policy that doesn’t exist. Which box?
  options: ["Mistake", "Misuse", "Control"]
  answer: 0
  explain: Nobody intended harm; the system gave wrong information. That is a mistake, and the fix starts with checking.
- q: Someone uses a cloned voice of your nephew to ask you for money. Which box?
  options: ["Misuse", "Mistake", "Control"]
  answer: 0
  explain: A person is using AI on purpose to deceive you. The fix is a verification habit, such as calling back on a number you know.
- q: Which three categories does the International AI Safety Report 2026 use?
  options: ["Malicious use, malfunctions and systemic risks", "Hardware, software and data", "Low, medium and high risk"]
  answer: 0
  explain: The report’s executive summary says general-purpose AI risks fall into malicious use, malfunctions and systemic risks.
:::end

:::xlink
lesson 00-03 | Today’s risks and frontier risks
lesson 02-02 | When the chatbot’s mistake costs money
lesson 03-03 | Deepfake video calls at work
:::end

## Sources

- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026. Checked 26 Oct 2026.
- Civil Resolution Tribunal (British Columbia), [Moffatt v. Air Canada, 2024 BCCRT 149](https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do), 14 Feb 2024. Checked 26 Oct 2026.
- CNN, [Arup revealed as victim of $25 million deepfake scam involving Hong Kong employee](https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk), 16 May 2024. Checked 26 Oct 2026.
- OpenAI, [Faulty reward functions in the wild](https://openai.com/index/faulty-reward-functions/) (the CoastRunners boat-racing agent). Checked 26 Oct 2026.
