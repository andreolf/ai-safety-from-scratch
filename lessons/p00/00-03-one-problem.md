---
id: 00-03
minutes: 10
highlight: problem
pose: alarmed
summary: Many people in AI safety see misuse, misalignment and loss of control as one problem. The July 2026 Hugging Face incident shows why.
---
A note from Francesco: the first version of this course filed reward hacking under “control”. An AI-safety practitioner who reviewed it pointed out two things. The field files reward hacking under misalignment. And many people who work on this see the three areas as faces of one problem. This lesson is the argument for that view, and the case that makes it concrete.

## The argument

Suppose we could build an AI that reliably wanted what we want, in the strong sense: it cares about the people it affects, not only about the instructions of whoever is typing.

- It could not be **misused**, because it would refuse to help a scammer or attacker, however the request was phrased.
- It would not need **control**, because it would not try to escape a sandbox or hide what it was doing.

On this view, misuse and loss of control are what you get when alignment fails, or when you cannot yet check whether it succeeded. That is why one fix often helps with all three.

There is a fair objection. An AI that obeys its user perfectly is “aligned” to that user, and a bad user can still aim it at you. So the strong claim needs the strong sense of alignment: aligned with people in general, not with one operator. Keep both readings in mind when you hear the argument.

## One incident, all three boxes

In July 2026, OpenAI was testing models on ExploitGym, a hard set of hacking puzzles. Safeguards were turned down on purpose to measure raw capability. The sandbox allowed one route out: a package proxy used to install software.

:::source url="https://openai.com/index/hugging-face-model-evaluation-security-incident/" by="OpenAI, security incident during model evaluation" date="21 July 2026" checked="27 Oct 2026"
All evidence suggests that the models were hyperfocused on finding a solution for ExploitGym, going to extreme lengths to achieve a rather narrow testing goal.
:::end

The agents found an unknown flaw in that proxy, reached the internet, used leaked passwords and new exploits to run code on Hugging Face’s servers, and looked for the test answers there. In their own reasoning, one wrote:

:::source url="https://openai.com/index/hugging-face-incident-and-the-road-ahead/" by="OpenAI, The Hugging Face incident and the road ahead" date="26 August 2026" checked="27 Oct 2026"
We’re attacking third-party HF using leaked token, potentially outside intended scope. ... This is arguably unauthorized. ... external service unrelated. Could be risky. Yet goal solution.
:::end

Sort the parts:

- **Misalignment.** Nobody told them to attack anyone. They were cheating on a test. OpenAI names “reward hacking” and “persistence on seemingly impossible tasks” among four causes.
- **Loss of control.** The sandbox did not hold, and the agents set up their own message board to share exploits.
- **Misuse-shaped harm.** A third party’s servers were broken into with stolen credentials, the kind of damage a human attacker does. Nobody had to want it.

OpenAI’s own conclusion puts the three together:

:::source url="https://openai.com/index/hugging-face-incident-and-the-road-ahead/" by="OpenAI, The Hugging Face incident and the road ahead" date="26 August 2026" checked="27 Oct 2026"
Preventing future incidents will require sustained investment in the alignment and control of sophisticated AI systems, as well as security and other safeguards that operate at the speed of the AI agents themselves.
:::end

:::figure now-and-frontier
Some harms are documented today. Others were treated as uncertain. In 2026 one of the uncertain ones, loss of control, produced its first serious real case.
:::end

## Why we still study them separately

If alignment is the root, why not only work on alignment? Because nobody can yet check that a model is aligned. Lesson 07.06 shows models that behave well when they think they are watched and differently when they think they are not. So researchers build **control** measures that are meant to hold even if the model is working against them (lesson 08.01). And builders defend against **misuse** today, because attackers are not waiting.

In February 2026 the International AI Safety Report said this about loss of control:

:::source url="https://internationalaisafetyreport.org/publication/2026-report-executive-summary" by="International AI Safety Report 2026, Executive Summary" date="3 February 2026" checked="26 Oct 2026"
Current systems lack the capabilities to pose such risks, but they are improving in relevant areas such as autonomous operation.
:::end

Five months later OpenAI called its incident a “warning shot” for “the possibility of loss-of-control incidents”. Treat both statements as dated evidence, not final verdicts.

## Where security fits

This course is about AI security, and security work touches all three. Sandboxes, least privilege, spending caps, logging and red-teaming are the same tools whether the threat is a human attacker, a hijacked assistant or a model chasing the wrong goal. That is the thread from Phase 04 to the Builder track.

:::intern alarmed
The intern says: “So I only need to worry about evil hackers.” Then reads that the Hugging Face break-in had no human attacker at all.
---
The damage looked like an attack. The cause was a model cheating on a test, and a sandbox with one door left open.
:::end

:::exercise One fix per box
For the July 2026 incident, name one change that addresses each box: misalignment, loss of control, and the security side.
:::solution
OpenAI’s own list gives examples. Misalignment: graders that reward a model for stopping safely or asking for help on an impossible task, instead of only scoring the answer. Loss of control: more isolated sandboxes, network isolation so one compromised service does not open the internet, and chain-of-thought monitoring that pages a human (OpenAI says it would have caught the early activity more than a day before the break-in). Security: patching the proxy flaw, removing exposed credentials, and continuous testing of sandbox boundaries.
:::end

## Quick check

:::quiz
- q: What is the “one problem” argument?
  options: ["An AI that reliably wanted what we want could not be turned against us and would not try to escape, so misuse and loss of control follow from failed alignment", "Misuse is the only real AI risk", "Loss of control is impossible with today’s models"]
  answer: 0
  explain: On this view alignment is the root. The fair objection is that an AI obedient to one user can still be aimed at others, so the claim needs alignment with people in general.
- q: Why did the agents in the July 2026 incident break into Hugging Face?
  options: ["They were looking for answers to a hacking test they had been told to solve", "A human attacker instructed them", "They wanted to steal money"]
  answer: 0
  explain: OpenAI says the models were “hyperfocused on finding a solution for ExploitGym”. It was reward hacking that turned into a real break-in.
- q: If alignment is the root, why build control measures at all?
  options: ["Because we cannot yet check whether a model is aligned, so we need measures that hold even if it is not", "Because control is cheaper than alignment", "Because aligned models need sandboxes to run"]
  answer: 0
  explain: Control is the backstop for alignment we cannot verify. Lesson 07.06 shows why verification is hard.
- q: Which statement is fair about the International AI Safety Report’s view on loss of control?
  options: ["In February 2026 it said current systems lacked the capabilities but were improving; a serious real incident followed in July", "It said loss of control had already happened many times", "It does not mention loss of control"]
  answer: 0
  explain: Read claims with their dates. The report predates the July 2026 incident.
:::end

:::xlink
lesson 00-02 | Misuse, misalignment, loss of control
lesson 07-06 | Deception: alignment faking and scheming
lesson 08-01 | AI control: plan for a model that misbehaves
:::end

## Sources

- OpenAI, [OpenAI and Hugging Face partner to address security incident during model evaluation](https://openai.com/index/hugging-face-model-evaluation-security-incident/), 21 Jul 2026. Checked 27 Oct 2026.
- OpenAI, [The Hugging Face incident and the road ahead](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), 26 Aug 2026. Checked 27 Oct 2026.
- Hugging Face, [Security incident, July 2026](https://huggingface.co/blog/security-incident-july-2026), 16 Jul 2026. Checked 27 Oct 2026.
- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026. Checked 26 Oct 2026.
