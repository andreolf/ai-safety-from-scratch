---
id: 08-06
minutes: 7
highlight: Incidents
pose: neutral
summary: Aviation got safer by recording every crash and near miss. The AI Incident Database tries to do the same for AI. Learn to read an incident like a safety investigator.
---
## The hook

Every serious plane crash is investigated, and the findings are shared so the same mistake isn’t made twice. What happens when an AI system causes harm?

## The one idea

**An [[term:ai-incident|AI incident]] is a real event where an AI system caused or nearly caused harm. Recording incidents publicly lets everyone learn from them, the way aviation and computer security learn from crashes and breaches. Tests before release (lessons 08-03 to 08-05) can miss things; incidents show what actually happened.**

:::figure incident-card
Turning a story into a record.
:::end

## The AI Incident Database

:::source url="https://incidentdatabase.ai/" by="AI Incident Database, About the Database" date="" checked="26 Oct 2026"
The AI Incident Database is dedicated to indexing the collective history of harms or near harms realized in the real world by the deployment of artificial intelligence systems. Like similar databases in aviation and computer security, the AI Incident Database aims to learn from experience so we can prevent or mitigate bad outcomes.
:::end

Anyone can submit a report. When this lesson was checked, incident numbers on the home page had passed 1,780, with new reports added in the same week, ranging from chatbot safety failures to political deepfakes. The site’s own motto: “Artificial intelligence will only be a benefit to people and society if we collectively record and learn from its failings.”

The International AI Safety Report 2026 lists “incident reporting to gather more evidence” among the main risk management practices, alongside threat modelling and capability evaluations.

## How to read an incident

Incident pages are built from news reports, so read them like a careful investigator:

1. **What happened, exactly?** Separate the event from the headline.
2. **Which system, and who deployed it?** A chatbot on a company website? An agent? A deepfake tool used by someone?
3. **What was the harm?** Money, safety, privacy, fairness, trust, or a near miss?
4. **What kind of risk?** Use Phase 00’s three kinds: a mistake, misuse by a person, or a loss of control.
5. **How good are the sources?** A court decision is stronger than a single anonymous post. Many incident entries say “allegedly” or “reportedly” for a reason.

You already know one incident well: in lesson 02.02, Air Canada’s chatbot gave a customer a wrong refund rule, and a tribunal made the airline pay. That is a mistake-type incident with an excellent source: the decision itself.

:::intern neutral
The intern reads a dramatic headline about an AI disaster and adds it to the team’s slide deck as “confirmed”. A colleague opens the incident entry: it says “reportedly”, cites one article, and the company disputes it.
---
Record what is known, how it is known, and what is still disputed. Investigators don’t round “reportedly” up to “confirmed”.
:::end

:::exercise Fill in a record
Choose any AI story from the news this week. Fill in: what happened, the system, who deployed it, the harm, the kind of risk (mistake, misuse or control), and the best source you can find. Then rate the source: strong, medium or weak.
:::solution
Answers will vary. A good record names a specific system and date, describes the harm without exaggeration, uses wording like “reportedly” when facts are unconfirmed, and links to the strongest available source, such as an official statement, a court document or a regulator’s report, rather than a repost.
:::end

## Quick check

:::quiz
- q: What does the AI Incident Database collect?
  options: ["Real-world harms or near harms from deployed AI systems", "Advertisements for AI products", "Only science fiction stories"]
  answer: 0
  explain: Like databases in aviation and computer security.
- q: Why are incidents useful even when models were tested before release?
  options: ["Tests can miss things; incidents show what actually happened in real use", "Incidents replace all testing", "Tests are always perfect"]
  answer: 0
  explain: Remember the evaluation gap from lesson 08-03.
- q: An incident entry says a chatbot “reportedly” leaked data. How should you describe it?
  options: ["As reported but not confirmed, citing the source", "As a confirmed fact", "As fake news"]
  answer: 0
  explain: Keep the uncertainty the source has.
:::end

:::xlink
lesson 02-02 | When the chatbot's mistake costs money
lesson 00-02 | Misuse, misalignment, loss of control
:::end

## Sources

- AI Incident Database, [home page and About](https://incidentdatabase.ai/) (purpose, incident numbers as of 26 Oct 2026). Checked 26 Oct 2026.
- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026 (incident reporting). Checked 26 Oct 2026.
- Civil Resolution Tribunal (British Columbia), [Moffatt v. Air Canada, 2024 BCCRT 149](https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do), 14 Feb 2024. Checked 26 Oct 2026.
