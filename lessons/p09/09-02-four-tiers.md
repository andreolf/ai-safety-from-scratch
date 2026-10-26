---
id: 09-02
minutes: 10
highlight: tiers
pose: fooled
summary: The EU AI Act sorts AI uses into four tiers, from banned to no new rules. Learn the tiers, with real articles, then sort a dozen uses yourself.
---
## The hook

Same technology, different rules. An AI that recognises faces to unlock your phone, one that scrapes millions of faces from the internet, and one that reads your boss’s mood from a webcam: under EU law these are treated very differently.

## The one idea

**The [[term:ai-act|EU AI Act]] (Regulation (EU) 2024/1689) has four levels of risk. Some uses are banned. [[term:high-risk-ai|High-risk]] uses must meet strict requirements. Some uses only have to be transparent. Everything else, which the Commission says is “the vast majority”, gets no new rules.**

:::figure risk-pyramid
Four levels, from the European Commission’s summary.
:::end

## 1. Unacceptable risk: banned

Article 5 lists prohibited practices. Among them: manipulative techniques that cause significant harm, exploiting people’s age, disability or social situation, social scoring, predicting crimes solely from profiling, untargeted scraping of facial images from the internet or CCTV, emotion recognition in workplaces and schools (except for medical or safety reasons), certain biometric categorisation, and real-time remote biometric identification in public spaces for law enforcement, with narrow exceptions.

In 2026 the list grew. The Digital Omnibus on AI added a ban on AI systems that generate realistic intimate or sexual images of an identifiable person without consent, and on AI-generated child sexual abuse material. The Commission’s example: “AI ‘nudification’ apps”. These bans apply from 2 December 2026.

## 2. High risk: strict rules

Annex III lists eight areas where AI can seriously affect people: biometrics, critical infrastructure, education, employment, essential services such as credit and public benefits, law enforcement, migration, and justice and democratic processes. Examples straight from the text:

:::source url="https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3" by="AI Act, Annex III (consolidated text as at 27 July 2026), AI Act Service Desk" date="" checked="26 Oct 2026"
AI systems intended to be used for the recruitment or selection of natural persons, in particular to place targeted job advertisements, to analyse and filter job applications, and to evaluate candidates
:::end

Credit scoring is there too (point 5(b), with an exception for fraud detection), and so is deciding access and admission to education (point 3(a)). Before such systems can be sold, the Commission lists duties including risk assessment, high-quality data “to minimise risks of discriminatory outcomes”, logging, documentation and “appropriate human oversight measures”.

There is a nuance. Under Article 6(3), an Annex III system is not high-risk if it does not pose a significant risk, for example if it only performs a narrow procedural task. But it is “always” high-risk if it profiles people.

## 3. Transparency risk: say it’s AI

Article 50 sets disclosure duties. People must be told when they are interacting with an AI system, unless it is obvious. AI-generated audio, images, video and text must be “marked in a machine-readable format and detectable as artificially generated or manipulated”. Deepfakes must be disclosed. These rules have applied since 2 August 2026, with extra time, until 2 December 2026, for the machine-readable marking duty for some generative AI systems already on the market before that date.

## 4. Minimal or no risk

“The AI Act does not introduce rules for AI that is deemed minimal or no risk.” The Commission’s examples: “AI-enabled video games or spam filters”.

Separately, the Act has rules for [[term:gpai|general-purpose AI models]], the models behind chatbots, which have applied since August 2025.

## Try it: AI Act Risk Sorter

:::lab ai-act-sorter
:::intern fooled
The intern is asked whether the company’s new CV-screening tool is covered by the AI Act. “It’s just a chatbot with a spreadsheet, so it’s minimal risk,” says the intern, and moves on. Filtering job applications is listed in Annex III.
---
The tier depends on what the system is used for, not what it looks like. Check the use against Annex III.
:::end

:::exercise Classify three products
Classify each and name the article or annex point: (a) an AI that ranks loan applicants by credit score; (b) a shop’s chatbot that answers questions about opening hours; (c) an app that reads students’ emotions during exams.
:::solution
(a) High-risk: Annex III, point 5(b), creditworthiness and credit scoring. (b) Transparency: Article 50(1), customers must be told they are talking to an AI unless it is obvious. (c) Prohibited: Article 5(1)(f) bans emotion recognition in education institutions, except for medical or safety reasons.
:::end

## Quick check

:::quiz
- q: Which of these is a prohibited practice under Article 5 of the AI Act?
  options: ["Social scoring", "A spam filter", "A chatbot that says it is an AI"]
  answer: 0
  explain: Social scoring is banned; spam filters are minimal risk.
- q: AI that filters job applications falls into which tier?
  options: ["High-risk (Annex III, employment)", "Minimal risk", "Banned"]
  answer: 0
  explain: Annex III point 4(a) covers recruitment and filtering applications.
- q: What does Article 50 require for a customer-service chatbot?
  options: ["People must be told they are interacting with an AI, unless it is obvious", "It must be banned", "Nothing at all"]
  answer: 0
  explain: That is a transparency duty.
:::end

:::xlink
lesson 09-01 | Why governments regulate AI
lesson 09-03 | The EU AI Act timeline, as amended
:::end

## Sources

- European Commission, [AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) (four levels of risk, examples, high-risk duties, nudification apps). Checked 26 Oct 2026.
- AI Act Service Desk, [Article 5: Prohibited AI practices](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-5). Checked 26 Oct 2026.
- AI Act Service Desk, [Annex III: High-risk AI systems](https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3). Checked 26 Oct 2026.
- AI Act Service Desk, [Article 6: Classification rules for high-risk AI systems](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-6) (6(3) exceptions, profiling). Checked 26 Oct 2026.
- AI Act Service Desk, [Article 50: Transparency obligations](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50). Checked 26 Oct 2026.
- AI Act Service Desk, [AI Act Explorer](https://ai-act-service-desk.ec.europa.eu/en/ai-act-explorer) (consolidated text as at 27 July 2026). Checked 26 Oct 2026.
