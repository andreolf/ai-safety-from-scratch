---
id: 06-03
minutes: 9
highlight: Budgets
pose: proud
summary: Four limits turn a risky paying agent into a safe one. A total budget, a per-payment cap, a list of who it may pay, and an end date. Set them yourself in the simulator.
---
A draft Ethereum standard, ERC-7715, describes how an app can ask a wallet for a limited permission, with an expiry, instead of full control. Card issuers and banks offer similar controls. Four kinds of limit do most of the work.

Give a paying agent four limits it cannot change: a total budget, a [[term:spending-cap|per-payment cap]], an [[term:allowlist|allowlist]] of who it may pay, and an expiry date. Add your approval for anything unusual. Then even a fooled agent can’t do much damage.

:::image figure-spending-limits

## The four limits

1. **Total budget.** The most it can spend in a period, such as 100 per week.
2. **Per-payment cap.** The most for any single payment, such as 50.
3. **Allowlist.** The only shops, people or addresses it may pay. Everyone else is blocked.
4. **Expiry.** When the permission ends, such as Friday evening. After that, it can’t pay at all.

And on top: **ask me first** above a certain amount, or for any new payee (lesson 06-04).

The key word is *rules the agent can’t talk its way past*. They must be enforced outside the AI, by the card, the bank, the wallet or the payment service, not by a sentence in the agent’s instructions. A sentence can be overridden by a prompt injection. A card limit can’t.

## The same idea in wallet standards

Wallet developers are writing standards for exactly these limits. One example is ERC-7715, a draft proposal for websites and apps to request limited permissions from a crypto wallet “in order to execute transactions on the user’s behalf.” It includes an expiry rule that makes a permission invalid after a set time. Its security notes say:

:::source url="https://eips.ethereum.org/EIPS/eip-7715" by="ERC-7715: Request Permissions from Wallets (Draft), Security Considerations" date="created 24 May 2024" checked="26 Oct 2026"
DApps should only request the permissions they need, with a reasonable expiration time. Wallets MUST correctly enforce permissions.
:::end

It also warns that malicious apps “could pose as legitimate applications and trick users into granting broad permissions.” So read every permission request: amount, who, and until when.

## Try it: the Agent Permission Simulator

Run a week of eight payment requests. Some are your errands, one is an upsell, and two come from a poisoned “invoice” email. Find limits that get your errands done while losing nothing.

:::lab agent-permissions
:::intern proud
The intern sets the office agent up properly this time: a 100-credit weekly budget, a 50 cap per payment, only the three usual suppliers, a permission that ends at the end of the month, and a ping for anything over 30. The agent gets tricked by a fake invoice on Wednesday. The payment simply fails.
---
The intern can’t stop the agent from being fooled. The intern can stop being fooled from costing money.
:::end

:::exercise Set the four limits
Your agent should buy your weekly groceries (usually 80 to 120 francs, always from the same two shops) for the next month. Write down the four limits plus an approval rule.
:::solution
For example: budget 130 per week; per-payment cap 130 (one shop order); allowlist: the two grocery shops only; expiry: one month from today; ask me first for anything over 120 or any new shop. An attacker’s invoice fails the allowlist; a runaway order fails the cap and budget; a forgotten setup stops by itself at expiry.
:::end

## Quick check

:::quiz
- q: Which is NOT one of the four limits?
  options: ["The agent’s favourite shop", "A per-payment cap", "An expiry date"]
  answer: 0
  explain: The four are total budget, per-payment cap, allowlist and expiry.
- q: Why must limits be enforced outside the AI?
  options: ["Instructions inside the AI can be overridden by prompt injection; a card or wallet limit cannot", "AI can’t count money", "It is cheaper"]
  answer: 0
  explain: Rules the agent can’t talk its way past.
- q: What does ERC-7715 say about the permissions apps should request?
  options: ["Only the permissions they need, with a reasonable expiration time", "As many as possible, forever", "Only permissions for large payments"]
  answer: 0
  explain: That is from its Security Considerations section.
:::end

## Sources

- ethskills, [Wallets](https://ethskills.com/wallets/SKILL.md) (bounded float; human gate; quoted in the infographic). Checked 26 Oct 2026.
- OWASP GenAI Security Project, [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) (quoted in the infographic). Checked 26 Oct 2026.
- [ERC-7715: Request Permissions from Wallets](https://eips.ethereum.org/EIPS/eip-7715), Draft, created 24 May 2024 (abstract, expiry rule, Security Considerations). Checked 26 Oct 2026.
