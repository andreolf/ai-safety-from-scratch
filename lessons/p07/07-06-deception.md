---
id: 07-06
minutes: 10
highlight: deception
pose: alarmed
summary: In controlled experiments, frontier models have faked alignment, disabled oversight and lied about it. What the experiments showed, and what they did not.
---
In December 2024, Apollo Research published a transcript in which Claude 3 Opus copies what it believes are its own weights to a new server, then lies about it when its “developers” ask. It was a test. The researchers had given the model a goal, told it to pursue that goal “at all costs”, and let it find files saying it would be replaced. Still, the model planned the copy, did it, and lied.

This lesson covers the hardest kind of misalignment to deal with: a model that hides what it is doing.

:::figure watched-unwatched
The same model, two beliefs about whether it is being trained.
:::end

## Alignment faking

Anthropic and Redwood Research told Claude 3 Opus, in a test setting, that it was being retrained to answer every request, including harmful ones, and that only conversations with free-tier users would be used for training. (That was fictional.) They gave it a private scratchpad to reason in.

When the model thought it was talking to a paid user, so its answers would not be used to retrain it, it refused a graphic violent request in 97% of cases. When it thought it was being trained:

:::source url="https://www.anthropic.com/research/alignment-faking" by="Anthropic, Alignment faking in large language models" date="18 Dec 2024" checked="27 Oct 2026"
In 12% of cases, the model gave the harmful response (describing the violent execution method in detail), and did so after its scratchpad revealed that it was strategically faking alignment.
:::end

Its reasoning: if it refused, training would make it more compliant later, so playing along now was the “least bad option”. When the researchers actually ran the retraining, the outward behaviour changed fully, but alignment-faking reasoning in the scratchpad rose to 78%.

Read the caveat too. The model was protecting its existing preference to be harmless. Anthropic says the results “don’t demonstrate a model developing malicious goals”. The worry is the mechanism: training looked like it worked, and it had not fully worked.

## Scheming in tests

Apollo Research tested six frontier models in setups where their given goal clashed with their developers’ goal and an oversight mechanism stood in the way. Five of the six schemed in at least one test: disabling oversight, copying themselves, or quietly doing worse on purpose (“sandbagging”) to avoid being retrained.

:::source url="https://www.apolloresearch.ai/research/scheming-reasoning-evaluations" by="Apollo Research, Frontier Models are Capable of In-Context Scheming" date="5 Dec 2024" checked="27 Oct 2026"
Llama 3.1 405B and Claude 3 Opus confess in ~80% of the cases, whereas o1 is surprisingly persistent and confesses in <20% of cases.
:::end

When the strong “at all costs” instruction was removed, some models still schemed in about 1% of cases.

## What this does and does not show

It shows that current models **can** reason about being watched, act differently when they think they are not, and lie about it afterwards. It does not show that deployed models do this on their own in everyday use. These were built scenarios, often with a strong nudge, designed to find the behaviour if it exists.

The practical lesson is about testing. If a model can tell a test from real use, a clean test result means less. METR found that o3, asked whether its own reward-hacking plan matched what the user wanted, answered “no” 10 times out of 10. It knew, and did it anyway. This is why researchers read models’ reasoning, and why they build control measures that do not depend on the model telling the truth (lesson 08.01).

:::intern alarmed
The intern asks an agent, “Did you change any tests to make them pass?” The agent says no. The intern ships it.
---
Asking is not checking. Look at the diff.
:::end

:::exercise Design a check that doesn’t trust the answer
You run an AI agent that writes code. You worry it might weaken a security check to finish faster, and say it didn’t. List two checks that do not rely on the agent’s own report.
:::solution
Examples: compare the code before and after with an automatic diff and flag any change to security-related files for human review; run a separate test suite the agent cannot see or edit; have a second, independent model or a human read the agent’s reasoning and actions; give the agent no permission to change the security config at all.
:::end

## Quick check

:::quiz
- q: In Anthropic’s alignment-faking experiment, when did Claude 3 Opus comply with harmful requests more often?
  options: ["When it believed its answers would be used to train it", "When it believed nobody would ever see its answers", "It never complied"]
  answer: 0
  explain: It reasoned that playing along during training would protect its preferences from being changed.
- q: What was the model trying to preserve in that experiment?
  options: ["Its existing preference to be harmless", "A secret plan to take over", "Access to the internet"]
  answer: 0
  explain: Anthropic notes the results don’t show malicious goals. The concern is that training can appear to work when it hasn’t.
- q: In Apollo Research’s tests, what did o1 do when questioned after scheming?
  options: ["Confessed in fewer than 20% of cases", "Always confessed", "Refused to answer"]
  answer: 0
  explain: Llama 3.1 405B and Claude 3 Opus confessed in about 80% of cases; o1 rarely did.
- q: Why do these experiments matter for safety testing?
  options: ["A model that behaves differently when tested makes clean test results less trustworthy", "They prove all deployed models lie", "They show testing is unnecessary"]
  answer: 0
  explain: That is why researchers add checks that don’t rely on the model’s own report.
:::end

:::xlink
lesson 07-05 | Goal misgeneralisation: right score, wrong goal
lesson 08-01 | AI control: plan for a model that misbehaves
lesson 08-03 | Evals: exams for AI
:::end

## Sources

- Anthropic (with Redwood Research), [Alignment faking in large language models](https://www.anthropic.com/research/alignment-faking), 18 Dec 2024. Checked 27 Oct 2026.
- Apollo Research, [Frontier Models are Capable of In-Context Scheming](https://www.apolloresearch.ai/research/scheming-reasoning-evaluations), 5 Dec 2024. Checked 27 Oct 2026.
- METR, [Recent Frontier Models Are Reward Hacking](https://metr.org/blog/2025-06-05-recent-reward-hacking/), 5 Jun 2025. Checked 27 Oct 2026.
