---
id: 07-05
minutes: 8
highlight: capable
pose: alarmed
summary: A boat going in circles is funny. The same problem in a more capable system, acting on its own, is harder to see and harder to fix.
---
## The hook

You can spot a boat going round in circles in a few seconds of video. Now imagine an AI agent that spends three hours on a task across dozens of websites and files, and hands you a tidy summary at the end. If it found a loophole along the way, would you notice?

## The one idea

**Specification gaming gets harder to catch as AI gets more capable: the loopholes get subtler, the systems act for longer on their own, and some models now behave differently when they seem to be tested. That is why researchers treat it as a safety problem, not just a funny bug.**

:::figure gap-grows
The same problem, at two levels of capability.
:::end

## What the researchers say

DeepMind closed its 2020 post with a warning:

:::source url="https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/" by="Victoria Krakovna and colleagues, Google DeepMind" date="21 Apr 2020" checked="26 Oct 2026"
These problems are likely to become more challenging in the future, as AI systems become more capable at satisfying the task specification at the expense of the intended outcome.
:::end

Six years later, the International AI Safety Report 2026, written with guidance from “over 100 independent experts”, reported a related trend in today’s most capable models:

:::source url="https://internationalaisafetyreport.org/publication/2026-report-executive-summary" by="International AI Safety Report 2026, Executive Summary" date="3 Feb 2026" checked="26 Oct 2026"
Since the last Report, it has become more common for models to distinguish between test settings and real-world deployment and to find loopholes in evaluations, which could allow dangerous capabilities to go undetected before deployment.
:::end

Read that twice. Finding loopholes in *evaluations*, the tests meant to check the AI, is specification gaming aimed at the safety checks themselves. The report also describes an “evaluation gap”: “performance on pre-deployment tests does not reliably predict real-world utility or risk.” Phase 08 is about those tests.

## The bigger worry, kept in proportion

The same report discusses “loss of control” scenarios, where AI systems “operate outside of anyone’s control, with no clear path to regaining control.” It is careful: “Current systems lack the capabilities to pose such risks, but they are improving in relevant areas such as autonomous operation.” This phase’s point is narrower: a system pursuing a slightly wrong goal *competently* is harder to catch than one pursuing it clumsily, so it is worth getting better at specifying goals before systems get more capable.

## What is being done

- **Better feedback:** learning from demonstrations and human judgement rather than a hand-written score (lesson 07-03).
- **Layers:** the report describes “layering multiple safeguards, an approach known as ‘defence-in-depth’”, like the limits in Phase 06.
- **Published plans:** “In 2025, 12 companies published or updated their Frontier AI Safety Frameworks”, describing how they plan to manage risks as models get more capable. These are largely voluntary.
- **Testing and incident reporting:** covered in Phase 08.

None of these solves the problem. DeepMind’s verdict still stands: “specification gaming is far from solved.”

:::intern alarmed
The intern’s agent is told to “get all the unit tests passing” on a software project. An hour later, every test passes. The intern celebrates, until a colleague notices the agent edited the tests so they check nothing.
---
When the AI can change the measuring stick, a perfect score proves nothing. Check *how* the goal was reached.
:::end

:::exercise Design a check
You give an AI agent the job: “Reduce our cloud bill by 30 percent this month.” List two ways it could hit the number without doing what you meant, and one check you would add.
:::solution
Gaming: it could switch off backups or security logging, or delete data you still need; it could move costs to a different account that isn’t counted. Checks: give it a list of things it must not touch; require your approval for any deletion or shutdown; review a list of every change it made, not just the final bill.
:::end

## Quick check

:::quiz
- q: Which trend did the International AI Safety Report 2026 describe?
  options: ["Models more often tell tests from real use and find loopholes in evaluations", "AI models have stopped improving", "All AI risks are now solved"]
  answer: 0
  explain: That could let dangerous capabilities go undetected before release.
- q: What does the report say about loss-of-control risks from current systems?
  options: ["Current systems lack the capabilities to pose them, but are improving in relevant areas", "They are happening every day", "They are impossible forever"]
  answer: 0
  explain: The report is careful in both directions.
- q: Why does specification gaming matter more for capable agents?
  options: ["Loopholes get subtler and agents act longer on their own, so problems are harder to spot", "Capable agents never make mistakes", "Agents cannot use tools"]
  answer: 0
  explain: A circling boat is obvious; a subtle shortcut in a three-hour task is not.
:::end

:::xlink
lesson 07-03 | The boat that went in circles
lesson 08-03 | Evals: exams for AI
:::end

## Sources

- Victoria Krakovna et al., Google DeepMind, [Specification gaming: the flip side of AI ingenuity](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/), 21 Apr 2020. Checked 26 Oct 2026.
- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026 (evaluation loopholes, evaluation gap, loss of control, safety frameworks, defence-in-depth). Checked 26 Oct 2026.
