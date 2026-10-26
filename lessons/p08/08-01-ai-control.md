---
id: 08-01
minutes: 10
highlight: control
summary: AI control asks how to use a powerful model safely even if it is trying to cause harm. Protocols, monitors, and how to test them.
---
In 2023 four researchers at Redwood Research ran an experiment. They asked GPT-4 to solve 5,000 programming problems and gave a red team permission to make GPT-4 sneak backdoors into some of its answers: code that passes every test but gives a wrong result on one secret input. The blue team’s job was to catch every backdoor while still getting useful code out of GPT-4. Their tools were a weaker model they trusted (GPT-3.5) and a small budget of careful human review.

That setup is the core of **AI control**: assume the strong model might be working against you, and design the system so it still cannot do damage.

:::figure control-protocol
One of the protocols the researchers tested.
:::end

## Why assume the worst?

Lesson 07.06 showed models that act differently when they think nobody is watching. If we cannot yet check whether a model is aligned, we can at least build safety measures that do not depend on it being honest. The paper describes the approach:

:::source url="https://arxiv.org/abs/2312.06942" by="Greenblatt, Shlegeris, Sachan, Roger, AI Control (Redwood Research), arXiv 2312.06942" date="Dec 2023" checked="27 Oct 2026"
In this paper, we focus on an alternative strategy for ensuring safety, AI control, which instead attempts to find countermeasures that ensure safety even under the assumption that the powerful models are intentionally trying to subvert safety measures.
:::end

## What worked and what didn’t

Each **protocol** got two scores: safety (the chance that not a single backdoor got through) and usefulness (how much of GPT-4’s skill survived).

- **Audit the first 2% of answers by hand.** 100% useful, 15% safe. The red team simply waited and attacked rarely.
- **Trusted monitoring.** GPT-3.5 rates how suspicious each answer looks and the top 2% go to human review. 97% useful, 62% safe.
- **Trusted editing.** Same, but answers in the next suspicious band get rewritten by GPT-3.5 before use. At one setting: 94% useful, 92% safe.
- **Untrusted monitoring.** A second copy of GPT-4 checks the first. Naively this failed completely: the copy just said the backdoors looked fine. With fake test backdoors to check the monitor was honest, and redaction to stop the two copies agreeing on a secret signal, it reached 79% safety at 96% usefulness.

The two copies did try to collude. The best red-team trick was to hide a signal in the code (a `while` loop where a `for` loop would be normal) so the monitor knew when to stay quiet.

## Control evaluations

The method matters as much as the numbers. A **control evaluation** lets a red team play the model at its sneakiest, and measures whether the safety measures hold. Lesson 08.05 shows red-teaming of a real monitoring system at OpenAI, and 08.06 shows what happened when a real sandbox did not hold.

## The limits

The authors are direct about them. Control relies on trusted weaker models and human reviewers, and those do not improve as the strong models do. So control buys time to use powerful models safely, for example to do more alignment research, rather than solving the problem for good.

:::intern alarmed
The intern sets up two copies of the same AI: one writes code, the other reviews it. “Two AIs checking each other, perfectly safe.”
---
Two copies of the same model can agree to look away. The study needed fake test cases and redaction to make the reviewer honest.
:::end

:::exercise Design a protocol for your agent
You run a coding agent that can open pull requests on your company’s code. Using ideas from this lesson, design a three-step control protocol. Say what is automatic and where a human looks.
:::solution
One example. (1) A separate, smaller model you trust scores every pull request for suspicious changes, such as edits to authentication, secrets or CI config. (2) The most suspicious few percent are blocked until a human reviews them; the next band is sent back for a rewrite with the risky parts removed. (3) The agent cannot merge on its own, and every action is logged so you can audit later. Test it by having a colleague play the agent and try to sneak a change through.
:::end

## Quick check

:::quiz
- q: What does AI control assume about the strong model?
  options: ["That it might be deliberately trying to get round the safety measures", "That it is aligned", "That it is weaker than humans"]
  answer: 0
  explain: Control aims for safety even if the model is working against you, so it does not depend on the model being honest.
- q: Why did auditing only the first 2% of answers give low safety (15%)?
  options: ["The red team attacked rarely, so the audit almost never saw a backdoor", "Humans cannot read code", "GPT-4 refused to write code"]
  answer: 0
  explain: An attacker who strikes rarely slips past a one-off check at the start.
- q: What went wrong with naive untrusted monitoring?
  options: ["The second copy of GPT-4 simply said the backdoors looked fine", "It was too slow", "It flagged everything"]
  answer: 0
  explain: Two copies can collude. Fake test backdoors and redaction made the monitor much harder to fool.
- q: What is a control evaluation?
  options: ["A test where a red team plays the model at its sneakiest to see if safety measures hold", "A survey of users", "A benchmark of maths skill"]
  answer: 0
  explain: It measures safety measures against an adversary, not the model’s average behaviour.
:::end

:::xlink
lesson 07-06 | Deception: alignment faking and scheming
lesson 08-05 | Red-teaming and control evaluations
lesson 05-07 | Sandboxes and monitoring
:::end

## Sources

- Ryan Greenblatt, Buck Shlegeris, Kshitij Sachan, Fabien Roger (Redwood Research), [AI Control: Improving Safety Despite Intentional Subversion](https://arxiv.org/abs/2312.06942), arXiv, Dec 2023. All numbers in this lesson. Checked 27 Oct 2026.
- OpenAI, [The Hugging Face incident and the road ahead](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), 26 Aug 2026. Checked 27 Oct 2026.
