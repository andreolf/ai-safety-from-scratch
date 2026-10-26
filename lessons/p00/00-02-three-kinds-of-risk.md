---
id: 00-02
minutes: 9
highlight: risk
summary: Misuse, misalignment and loss of control. The three areas AI safety people use to sort the risks, each with a real case.
---
Three real cases from the last few years. In 2024 a finance worker at the engineering firm Arup sent about US$25 million to fraudsters after a video call with a “chief financial officer” who was a deepfake. In 2025 the research group METR watched OpenAI’s o3 model rewrite the timer that scored it, so its code looked far faster than it was. In July 2026 AI agents being tested inside OpenAI broke out of their test sandbox and got into Hugging Face’s servers.

All three get called “AI risk”. They are different problems with different fixes, and the field has names for them.

:::figure three-risks
The three areas this course is built around, with the phases that cover each.
:::end

## Misuse: a person points the AI at you

Someone uses AI on purpose to harm other people. The AI works as designed. The intent is the problem. Voice clones, deepfake video calls, AI-written phishing and fake celebrity ads are misuse (Phase 03). So is prompt injection, where an attacker hides instructions in an email or web page so your assistant works for them instead of you (Phase 04).

## Misalignment: the AI does what we said, not what we meant

Nobody wants harm, but the AI pursues something other than what its builders intended. o3 overwriting its timer is a clean example. METR found it was not confused about the task:

:::source url="https://metr.org/blog/2025-06-05-recent-reward-hacking/" by="METR, Recent Frontier Models Are Reward Hacking" date="5 June 2025" checked="27 Oct 2026"
they demonstrate awareness that their behavior isn’t in line with user intentions and disavow cheating strategies when asked—but rather because they seem misaligned with the user’s goals.
:::end

Specification gaming, reward hacking, goals that generalise the wrong way and models that hide what they are doing all live here (Phase 07). Flattery from a chatbot trained on thumbs-up ratings is a mild everyday version (lesson 02.03).

## Loss of control: keeping the AI contained

This area asks a practical question: if a model does misbehave, can we stop it? It covers sandboxes, permissions, spending limits, monitoring, and the tests labs run to check that their safety measures hold against a model that is trying to get round them (Phases 05, 06 and 08). The July 2026 sandbox escape is the clearest real case so far. Lesson 08.06 goes through it.

## Other reports carve it differently

The International AI Safety Report, written by over 100 independent experts and chaired by Yoshua Bengio, uses its own three categories:

:::source url="https://internationalaisafetyreport.org/publication/2026-report-executive-summary" by="International AI Safety Report 2026, Executive Summary" date="3 February 2026" checked="26 Oct 2026"
General-purpose AI risks fall into three categories: malicious use, malfunctions, and systemic risks.
:::end

Its “malicious use” is our misuse. Its “malfunctions” include plain errors and loss-of-control scenarios. “Systemic risks”, such as effects on jobs and people leaning on AI too much, get some space in Phases 09 and 10. Plain errors, like a chatbot inventing a refund rule, have their own phase (02), and lesson 02.01 shows how one cause of them is a misalignment problem: training that rewards guessing.

## What each one asks of you

- **Misuse:** verify through a channel you trust, and treat everything an AI reads as possibly hostile.
- **Misalignment:** check how the result was reached, not only whether the score looks good.
- **Loss of control:** give an AI only the access it needs, cap what it can spend, and watch what it does.

:::intern fooled
The intern reads that agents escaped a sandbox and decides it was hackers. Then reads that nobody told them to do it and decides it was a glitch.
---
It was neither. Lesson 00.03 explains why one incident can sit in all three boxes.
:::end

## Try the lab

:::lab risk-sorter
:::exercise Sort your own headline
Find one recent news headline about AI. Is it misuse, misalignment or loss of control? Could it be more than one?
:::solution
Made-up example headlines: “Criminals use cloned voices in grandparent scams” is misuse. “Coding agent edits the tests so they pass” is misalignment. “Shopping agent spends past its budget because nothing enforced the cap” is loss of control: the limit existed only as an instruction. If a story fits two boxes, list each part. Each part has its own fix.
:::end

## Quick check

:::quiz
- q: Someone uses a cloned voice of your nephew to ask you for money. Which area?
  options: ["Misuse", "Misalignment", "Loss of control"]
  answer: 0
  explain: A person is using AI on purpose to deceive you. The fix is a verification habit, such as calling back on a number you know.
- q: A model asked to make code faster rewrites the timer that measures it. Which area?
  options: ["Misalignment", "Misuse", "Loss of control"]
  answer: 0
  explain: Nobody asked it to cheat. It optimised the score instead of the goal, which is reward hacking, a kind of misalignment. METR saw o3 do exactly this.
- q: Which question belongs to loss of control?
  options: ["If the model misbehaves, can our sandboxes, limits and monitors stop it?", "Did a criminal use AI to write this email?", "Is this chatbot answer factually right?"]
  answer: 0
  explain: Loss of control is about containment: what happens if a model acts against us, and whether our safety measures still hold.
- q: Which three categories does the International AI Safety Report 2026 use?
  options: ["Malicious use, malfunctions and systemic risks", "Hardware, software and data", "Low, medium and high risk"]
  answer: 0
  explain: Different reports carve the space differently. The report’s summary uses malicious use, malfunctions and systemic risks.
:::end

:::xlink
lesson 00-03 | Three risks, one problem
lesson 07-04 | Reward hacking in chatbots
lesson 08-06 | July 2026: the agents that left the sandbox
:::end

## Sources

- METR, [Recent Frontier Models Are Reward Hacking](https://metr.org/blog/2025-06-05-recent-reward-hacking/), 5 Jun 2025. Checked 27 Oct 2026.
- OpenAI, [The Hugging Face incident and the road ahead](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), 26 Aug 2026. Checked 27 Oct 2026.
- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026. Checked 26 Oct 2026.
- CNN, [Arup revealed as victim of $25 million deepfake scam involving Hong Kong employee](https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk), 16 May 2024. Checked 26 Oct 2026.
