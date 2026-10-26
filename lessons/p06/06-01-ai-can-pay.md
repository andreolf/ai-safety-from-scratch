---
id: 06-01
minutes: 7
highlight: pay
summary: Agents can already buy things with cards, bank connections and crypto, and open standards like x402 let software pay websites directly. What that means for you, explained neutrally.
---
> **Disclosure.** AI Safety from Scratch is a personal, free project by Francesco Andreoli. Francesco works at MetaMask (Consensys) as Head of Developer Relations and works on agent wallets. **This site is not an official MetaMask or Consensys product** and is not endorsed by them, or by ETH Zurich, OWASP, any AI company or any government body. The agents-and-payments lessons (Phase 06) are written to be wallet-neutral. Where MetaMask is mentioned, it is one example among others, and the page says so.

x402 revives an old web code, HTTP 402 “Payment Required”, so that a website can ask an AI agent for a small payment and the agent can pay and retry with no human involved. Agents can already spend through saved cards, bank connections and crypto wallets. This phase is about the limits that keep that safe.

AI agents can already spend money: through saved cards, bank connections and crypto wallets, and through new open standards built for software to pay software. When an agent can pay, every mistake or trick from Phases 04 and 05 can cost real money, so the rules you set matter more than the agent’s intelligence.

## Three ways an agent can pay

- **Cards.** An agent uses a saved card, or a card number you give it, on a shop’s checkout page.
- **Bank connections.** Apps connected to your bank can start transfers or payments.
- **Crypto wallets.** An agent can be given a wallet, or a limited permission on yours, and send digital payments directly.

Each can be set up safely or dangerously. The rest of this phase is about the safe way, and it is the same for all three.

## Software paying software: x402

One example of the new standards is x402. Its website describes it like this:

:::source url="https://x402.org" by="x402.org" date="" checked="26 Oct 2026"
If a request arrives without payment, the server responds with HTTP 402, prompting the client to pay and retry.
:::end

HTTP 402 is a long-reserved web code meaning “payment required”. With x402, a website can ask for a small payment, and an agent can pay it automatically and try again. The site calls x402 “an open, neutral standard for internet-native payments” and says it is “not tied to any specific network”. It aims to support “agentic payments at scale”. We mention it because it shows where things are going, not to recommend it.

:::figure pay-402
How a payment-required request works. Simplified.
:::end

## Why this changes the safety picture

A human paying online usually pauses: types a card, sees a total, taps confirm. A machine-to-machine payment may happen in a second, many times a day, with no pause unless someone designs one in. That means:

- A **hallucinating** agent can pay for the wrong thing.
- A **prompt-injected** agent can pay an attacker (lesson 06-05).
- A **looping** agent can pay the same thing a thousand times.

The fix isn’t a smarter agent. It is limits: budgets, caps, allowlists, expiry and a human gate. Lessons 06-02 to 06-04 cover them.

:::intern fooled
The intern connects the company card to a research agent “to buy a couple of reports”. By evening, the agent has bought 37 reports from 12 sites, several of them the same report under different names.
---
An agent with a payment method and no limits will happily spend. Decide the limits before you hand over the card.
:::end

:::exercise Spot the payment power
Which of these setups lets an AI agent spend money? (1) A chatbot that recommends laptops. (2) A browser agent with your saved card details. (3) An assistant with a connection to your bank that can “pay bills”. (4) An agent with a crypto wallet holding a small balance.
:::solution
(2), (3) and (4) can spend. (1) only gives words. For each of the three, ask: how much can it spend, to whom, until when, and does it ask me first?
:::end

## Quick check

:::quiz
- q: What does HTTP 402 mean in x402?
  options: ["Payment required: the server asks the client to pay and retry", "Page not found", "The website is down"]
  answer: 0
  explain: x402.org says the server “responds with HTTP 402, prompting the client to pay and retry.”
- q: Why does agent payment change the safety picture?
  options: ["Payments can happen quickly with no human pause unless one is designed in", "Agents always pay more than humans", "Payments by agents are illegal"]
  answer: 0
  explain: Without a pause, mistakes and tricks become instant costs.
- q: What protects you best when an agent can pay?
  options: ["Limits you set: budgets, caps, allowlists, expiry and approvals", "Choosing the smartest AI model", "Asking the agent to be careful with money"]
  answer: 0
  explain: Rules work even when the agent is fooled.
:::end

:::xlink
security 07.02 | Paying by card online, safely
lesson 04-01 | The email that gave orders
security 07.03 | TWINT, the safe way
security 12.03 | Nobody real will ever ask for your phrase
security 12.04 | Crypto ATMs and "move your money into crypto to protect it"
:::end

## Sources

- [x402.org](https://x402.org), home page (“an open, neutral standard for internet-native payments”; HTTP 402 flow). Checked 26 Oct 2026. Usage figures on the site are not cited here.
