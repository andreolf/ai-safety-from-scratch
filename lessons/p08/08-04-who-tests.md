---
id: 08-04
minutes: 8
highlight: tests
pose: neutral
summary: Frontier AI is tested by the companies that build it, by government institutes such as the UK AI Security Institute, and by independent groups such as METR.
---
## The hook

Would you trust a new medicine that had only been tested by the company selling it? For frontier AI, independent testing is newer than it is for medicine, but it is growing.

## The one idea

**Three kinds of organisation test the most capable AI models: the developers themselves, government institutes, and independent nonprofits. Each sees different things, and outside testers usually depend on the developers giving them access.**

:::figure who-tests
Three kinds of testers.
:::end

## 1. The developers

Companies test their own models before release. The International AI Safety Report 2026 notes that “in 2025, 12 companies published or updated their Frontier AI Safety Frameworks – documents that describe how they plan to manage risks as they build more capable models.” It also notes that such initiatives “remain largely voluntary”. The developer has the most access, and also the strongest incentive to ship.

## 2. Government institutes

The UK set up an institute specifically for this:

:::source url="https://www.aisi.gov.uk/" by="UK AI Security Institute, home page" date="" checked="26 Oct 2026"
The AI Security Institute is the first state-backed organisation dedicated to advancing this goal. We are conducting research and building infrastructure to understand the capabilities and impacts of advanced AI and to develop and test risk mitigations.
:::end

Its stated mission is “to equip governments with a scientific understanding of the risks posed by advanced AI.” Its work includes “evaluating the risks AI poses to national security and public safety”. For example, it compared the cyber capabilities of open and closed models and reported that recent open models performed similarly to frontier closed models released 4 to 7 months before them.

The institute also released a tool anyone can use. Inspect “is a framework for frontier AI evaluations developed by the UK AI Security Institute and Meridian Labs”, open-source and free.

## 3. Independent nonprofits

METR (pronounced “meter”) “is a research nonprofit that scientifically measures whether and when AI systems might threaten catastrophic harm to society.” Its risk work includes a Frontier Risk Report, “independent reviews of AI developers' risk assessments, and capability evaluations of frontier models”, and it says it “does not accept compensation for this work.”

Notice the catch in its own disclosure: “Companies such as Anthropic, OpenAI, and xAI have provided access and tokens for our evaluations.” Outside testers can only test what they are allowed to see.

## Why more than one tester?

- **Different incentives:** an outsider has no product to launch.
- **Different access:** the developer sees everything; outsiders often see less.
- **Shared tools:** open tools like Inspect let more people run the same tests and compare results.

:::intern neutral
The intern reads a company’s announcement: “Our new model passed all our safety tests!” and forwards it to the team as proof the model is safe.
---
Ask who ran the tests, what they tested, and whether anyone outside the company could check. “Passed our own tests” is a start, not the end.
:::end

:::exercise Read the claim
A news headline says: “New AI model is safe, say testers.” Write three questions you would ask before believing it.
:::solution
For example: (1) Who were the testers: the company, a government institute, or an independent group? (2) What exactly did they test, for example dangerous knowledge, cyber skills or behaviour as an agent? (3) Did they have full access to the model, and is there a public report? You could also ask when it was tested, since models change after updates.
:::end

## Quick check

:::quiz
- q: Which UK organisation describes itself as the first state-backed organisation dedicated to advanced AI safety and security?
  options: ["The UK AI Security Institute", "The BBC", "The Bank of England"]
  answer: 0
  explain: It also developed the open-source Inspect evaluation tool with Meridian Labs.
- q: What is METR?
  options: ["A research nonprofit that measures whether and when AI systems might threaten catastrophic harm", "An AI company selling chatbots", "A government ministry"]
  answer: 0
  explain: It reviews developers’ risk assessments and evaluates frontier models.
- q: What limits independent testers, according to METR’s own disclosure?
  options: ["They depend on companies providing access to the models", "They are not allowed to publish anything", "They only test phones"]
  answer: 0
  explain: Outside testers can only test what they can access.
:::end

:::xlink
lesson 08-03 | Evals: exams for AI
lesson 08-05 | Red-teaming and control evaluations
:::end

## Sources

- UK AI Security Institute, [home page](https://www.aisi.gov.uk/) (mission, first state-backed organisation, cyber comparison of open and closed models). Checked 26 Oct 2026.
- UK AI Security Institute and Meridian Labs, [Inspect](https://inspect.aisi.org.uk/). Checked 26 Oct 2026.
- METR, [home page](https://metr.org/) (mission, risk assessment work, access disclosure). Checked 26 Oct 2026.
- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026 (12 companies, voluntary frameworks). Checked 26 Oct 2026.
