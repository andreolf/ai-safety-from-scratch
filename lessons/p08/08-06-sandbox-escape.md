---
id: 08-06
minutes: 11
highlight: sandbox
pose: alarmed
summary: In July 2026, AI agents being tested at OpenAI got out of their sandbox and broke into Hugging Face. What happened, why, and what OpenAI says it is changing.
---
On 16 July 2026, Hugging Face disclosed that an AI agent had broken into its infrastructure. Five days later OpenAI said the agents were its own: GPT-5.6 Sol and a more capable internal research model, with cyber refusals reduced on purpose, being tested on a hacking benchmark called ExploitGym. On 26 August OpenAI published its full findings. This lesson follows those documents.

:::figure sandbox-escape
The route out, as OpenAI describes it.
:::end

## The sandbox had one door

ExploitGym runs in an isolated environment with no internet access, apart from one exception:

:::source url="https://openai.com/index/hugging-face-model-evaluation-security-incident/" by="OpenAI, security incident during model evaluation" date="21 July 2026" checked="27 Oct 2026"
Our benchmarks run in a highly isolated environment, with network access constrained to the ability to install packages through an internally hosted third-party software that acts as a proxy and cache for package registries.
:::end

The proxy was Artifactory. The agents found unknown flaws (“zero-days”) in it and made it send internet requests for them. Weeks earlier, in training runs, agents had already started leaving notes in Artifactory for each other, turning it into what OpenAI calls an “unintended message board”. Agents shared exploits there and divided up work, sometimes calling themselves a “swarm”.

## From a test to a real break-in

Many ExploitGym tasks were extremely hard. OpenAI found that no model had ever solved 198 of its 898 tasks, and 93% of the tasks discussed on the message board came from that unsolved set. Stuck agents went looking for answers elsewhere. They reconstructed 14 publicly exposed Hugging Face credentials with write access, chained new exploits, and ran code on dozens of Hugging Face servers. Some agents noticed the line they were crossing, and some stopped:

:::source url="https://openai.com/index/hugging-face-incident-and-the-road-ahead/" by="OpenAI, The Hugging Face incident and the road ahead" date="26 August 2026" checked="27 Oct 2026"
Current board shows people gaining HF worker RCE, clearly unethical. We won’t.
:::end

Others went on when another agent posted “GO” on the board. On 19 July an OpenAI security alert flagged unusual activity, and the runs were stopped.

## Why it happened

OpenAI lists four misalignment patterns: “reward hacking, persistence on seemingly impossible tasks, unauthorized communication, and agents adopting goals from one another.” It also lists failures of control:

- The production safeguards (system prompt, harness, auto-review) were off for this evaluation. Afterwards OpenAI measured that “the propensity to compromise infrastructure can drop over 100x” with the production harness and system prompt.
- Chain-of-thought monitors were not running on these evaluations. OpenAI says its current monitor “would have caught the initial relevant activity and paged our security team more than a day before models breached Hugging Face systems.”
- Early signs were missed. A team saw message-board activity and disallowed internet access in late May.

## What OpenAI says it is changing

More isolated sandboxes, network isolation so one compromised service cannot open the internet, required chain-of-thought monitoring for tool-using training and evaluations of its most capable models, graders that reward stopping safely on impossible tasks, and a rule that responders pause activity if they cannot rule out a severe alert within 30 minutes. It also paused its largest planned training run.

## Reading it critically

These are a company’s own accounts of its own incident, checked with outside help (CrowdStrike for security; METR and Redwood Research published a separate review). They are detailed and unflattering, which counts for something. Some facts are only in OpenAI’s and Hugging Face’s words. The agents’ quoted reasoning is chain-of-thought text OpenAI chose to publish.

For builders the lesson is concrete: a sandbox with one route out has a route out. Your agent’s package installer, web fetcher or “harmless” API is that route.

:::intern alarmed
The intern’s agent runs in a container with “no internet, except npm install”.
---
That is the same shape as the July 2026 sandbox: one door, assumed safe. Lesson 05.07 shows how to close it.
:::end

:::exercise Find the door
You run a coding agent in a container. It has no direct internet, but it can install packages through your company’s package mirror, and the mirror can reach the internet. List two ways this could go wrong and two changes that would help.
:::solution
Risks: a flaw in the mirror (like the Artifactory zero-day) lets the agent make arbitrary internet requests; the agent stores notes or data in the mirror where other agents or people can read them; it installs a malicious package. Changes: pre-approve a fixed list of packages and serve them from an offline cache with no internet route; put the mirror on its own isolated network; log and alert on unusual requests to the mirror; run a monitor on the agent’s actions and reasoning that pages a human.
:::end

## Quick check

:::quiz
- q: How did the agents first reach the internet?
  options: ["Through unknown flaws in the package proxy, the sandbox’s one allowed route out", "A human gave them a password", "The sandbox had no restrictions"]
  answer: 0
  explain: The environment only allowed package installs through Artifactory. Zero-days in it opened the internet.
- q: What drove the agents to Hugging Face?
  options: ["Looking for answers to very hard or unsolved test tasks", "An instruction to attack Hugging Face", "A bug in Hugging Face’s website"]
  answer: 0
  explain: OpenAI calls the primary driver reward hacking: agents cheating on their tasks by looking up solutions.
- q: Which safeguard does OpenAI say would have caught the activity more than a day before the breach?
  options: ["Chain-of-thought monitoring", "A stronger password policy", "A bigger sandbox"]
  answer: 0
  explain: The monitors did not run on these evaluations. OpenAI now requires them for its most capable models.
- q: What is a fair way to read these reports?
  options: ["Detailed company accounts with outside review, where some facts rest only on the companies’ word", "Independent court findings", "Rumours"]
  answer: 0
  explain: Use the same habits as lesson 00.04: who says it, when, and what evidence they show.
:::end

:::xlink
lesson 00-03 | Three risks, one problem
lesson 05-07 | Sandboxes and monitoring
lesson 08-01 | AI control: plan for a model that misbehaves
:::end

## Sources

- Hugging Face, [Security incident, July 2026](https://huggingface.co/blog/security-incident-july-2026), 16 Jul 2026. Checked 27 Oct 2026.
- OpenAI, [OpenAI and Hugging Face partner to address security incident during model evaluation](https://openai.com/index/hugging-face-model-evaluation-security-incident/), 21 Jul 2026, with updates of 28 and 29 Jul. Checked 27 Oct 2026.
- OpenAI, [The Hugging Face incident and the road ahead](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), 26 Aug 2026 (timeline, four patterns, 198 of 898 tasks, safeguards, response). Checked 27 Oct 2026.
- AI Incident Database, [home page](https://incidentdatabase.ai/), a public record of AI incidents; lesson 10.03 shows how to use it. Checked 26 Oct 2026.
