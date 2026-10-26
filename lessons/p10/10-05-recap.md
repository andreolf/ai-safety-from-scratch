---
id: 10-05
minutes: 9
highlight: recap
pose: proud
summary: The ten ideas from this course worth remembering, each with the lesson it came from, and how the final phase tests and the Foundations certificate work.
---
## The hook

Ten phases, sixty-odd lessons, a dozen labs and one very gullible intern. If you remembered only ten ideas, which should they be? And how do you turn all this into a certificate?

## The one idea

**Most of this course fits in ten ideas. If you can explain each one to a friend in a sentence, you are ready for the phase tests, and passing all of them from 00 to 10 unlocks the free Foundations certificate of completion.**

:::figure ten-ideas
The ten ideas to remember from Phases 00 to 10.
:::end

## The ten ideas

1. **Three kinds of risk.** AI can go wrong by mistake, by misuse, or through loss of control, when a system pursues something nobody wanted (Phase 00).
2. **It predicts the next word.** A chatbot continues text by predicting likely next pieces, which is why it can sound sure and still be wrong (Phase 01).
3. **Confident is not correct.** Hallucinations, sycophancy and bias mean you check important answers in a second source (Phase 02).
4. **Verify, don’t spot.** You cannot reliably tell a cloned voice or a deepfake by ear or eye. Hang up and call back on a number you know, and use a family code word (Phase 03).
5. **Text can give orders.** Prompt injection hides instructions in emails, web pages and files, and there is no simple fix (Phase 04).
6. **Watch the trifecta.** Private data plus untrusted content plus a way out is the dangerous mix for agents. Remove one (Phase 05).
7. **Limits before money.** An agent that can pay needs caps, allowlists, expiry and a preview, and never your keys (Phase 06).
8. **We get what we measure.** Systems find loopholes in the goals we write, like the boat that circled for points (Phase 07).
9. **Test, look inside, learn from incidents.** Evals, interpretability, red-teaming and incident databases are how we find problems before and after release (Phase 08).
10. **Rules are arriving.** The EU AI Act sorts uses by risk, Switzerland is preparing its own approach, and much elsewhere is still voluntary (Phases 09 and 10).

Two of these ideas come straight from sources you met earlier. The International AI Safety Report warns that “performance on pre-deployment tests does not reliably predict real-world utility or risk”. OWASP lists prompt injection as the first risk for apps built on language models.

:::source url="https://internationalaisafetyreport.org/publication/2026-report-executive-summary" by="International AI Safety Report 2026: Executive Summary" date="3 Feb 2026" checked="26 Oct 2026"
It has become more common for models to distinguish between test settings and real-world deployment and to find loopholes in evaluations, which could allow dangerous capabilities to go undetected before deployment.
:::end

## How the phase tests work

- Each phase has a test of ten questions drawn from its lessons. You need 80% to pass.
- Every retake draws a new set of questions, and the explanations link back to the lessons.
- Passing all eleven tests from Phase 00 to Phase 10 unlocks the **Foundations** certificate. Type your name, download it as PNG or PDF, and share the verification code.
- The optional Builder track (Phase 11) has its own test and six practicals for the **Builder** certificate.

Both certificates are free certificates of completion: not accredited, and not a professional or security qualification.

:::intern proud
The intern explains the ten ideas to their grandmother over coffee. She stops them at number four: “So if you call me crying and asking for money, I hang up and call you back?” Exactly. She has already chosen the code word.
---
If you can teach an idea in one sentence, you understand it. Teaching it to someone you care about is the best test.
:::end

:::exercise Teach three ideas
Choose three of the ten ideas and explain each to an imaginary friend in one sentence, without jargon.
:::solution
Examples: “A chatbot guesses the next word, so it can sound sure and still be wrong: check anything important.” “If a call or video asks for money urgently, hang up and call back on a number you already have, even if the voice sounds exactly right.” “Before an AI app can spend money, give it a small limit and an end date, and never give it your passwords or keys.”
:::end

## Quick check

:::quiz
- q: Why can a chatbot sound sure and still be wrong?
  options: ["It predicts likely next words; sounding confident is not the same as checking facts", "It always checks the internet first", "It is never wrong when it sounds sure"]
  answer: 0
  explain: Ideas 2 and 3: prediction, not checking.
- q: What does “verify, don’t spot” mean?
  options: ["Confirm through a channel you trust instead of trying to tell real from fake", "Study faces closely to spot a deepfake", "Trust a voice you recognise"]
  answer: 0
  explain: Deepfakes and cloned voices can be too good to spot.
- q: What unlocks the Foundations certificate?
  options: ["Passing every phase test from 00 to 10", "Reading the home page", "Paying a fee"]
  answer: 0
  explain: It is free; you need 80% on each of the eleven foundation phase tests.
:::end

:::xlink
lesson 00-02 | Misuse, misalignment, loss of control
lesson 05-03 | The lethal trifecta
lesson 07-03 | The boat that went in circles
:::end

## Sources

- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026. Checked 26 Oct 2026.
- OWASP GenAI Security Project, [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/). Checked 26 Oct 2026.
