---
id: 06-04
minutes: 7
highlight: Show me
summary: A good payment gate shows the amount, who gets it and the fees, then waits for your yes. What to look at in those few seconds, and the red flags.
---
## The hook

“Approve payment?” Yes. Done. Wait, to whom? How much? Most bad payments don’t happen because there was no approval step. They happen because the approval step didn’t show enough, or nobody looked.

## The one idea

**Before any agent payment, a gate should show you three things, the amount, the exact destination and the fees, and then stop until you say yes. Your job is to spend five seconds checking them.**

:::figure approval-card
What a useful payment approval shows. Example values.
:::end

## The rule

ethskills, the public guide for AI coding agents working with Ethereum, puts it in one line:

:::source url="https://ethskills.com/wallets/SKILL.md" by="ethskills, “Wallets”, Before anything signs" date="" checked="26 Oct 2026"
Anything that moves funds gets a gate. Print the amount, the checksummed destination, and the gas cost, then stop until a human says yes.
:::end

Translated for everyday payments:

- **The amount**, in a currency you understand.
- **The destination**, exactly: the shop’s real name, the account or the full address. (“Checksummed” means the crypto address is in a form where typos can be detected.)
- **The cost of paying**, such as fees or, in crypto, “gas”.
- **Then stop.** Nothing moves until you say yes.

OWASP’s guidance agrees from the AI side: “require a human to approve high-impact actions before they are taken.”

## The five-second check

1. **Is this something I asked for?** If the reason is “an email said so” or “a website asked”, stop.
2. **Do I know the payee?** New name, new account, new address: verify through a channel you trust.
3. **Is the amount normal?** Much bigger than usual, or oddly specific? Ask why.
4. **Does the destination match?** For crypto, check the whole address, not just the first and last few characters: two different addresses can share the same start and end.
5. **Is there pressure?** “Pay within 10 minutes” is a scam signal, for agents and for people.

## Builder note

Developers can go further: simulate a payment before signing it to see exactly what it will do. That belongs in the Builder track (Phase 11).

:::intern fooled
The intern’s agent shows: “Approve payment: 480 credits to Fast Invoices Ltd. Reason: overdue invoice found in inbox.” It’s Friday afternoon. The intern taps yes. There was no overdue invoice: the email was a prompt injection.
---
The gate worked; the intern didn’t look. New payee plus “found in inbox” equals stop and check.
:::end

:::exercise Approve or not?
Your agent asks: “Pay 49.90 to StreamBox for your monthly plan (same as last month). Fee 0.” Then: “Pay 49.90 to Str3amBox-billing for your monthly plan. Fee 0.” Which do you approve and why?
:::solution
Approve the first if it matches your usual subscription. Reject the second: the payee name is a look-alike (“Str3amBox-billing”), and you already paid. Check the source of the request; it may be a phishing email that the agent treated as an instruction.
:::end

## Quick check

:::quiz
- q: Which three things should a payment gate show before you approve?
  options: ["The amount, the exact destination and the fees", "The agent’s name, the date and the weather", "Only the total"]
  answer: 0
  explain: ethskills: amount, checksummed destination and gas cost, then stop.
- q: The agent’s reason for a payment is “instruction found in an email”. What do you do?
  options: ["Stop and verify through a channel you trust", "Approve, because the agent checked", "Approve if the amount is small"]
  answer: 0
  explain: That is the classic sign of a prompt injection.
- q: Why compare more than the first and last characters of a crypto address?
  options: ["Two different addresses can share the same first and last characters", "Addresses change every hour", "It makes the payment faster"]
  answer: 0
  explain: Only the whole address tells you where the money goes.
:::end

:::xlink
lesson 05-06 | Humans in the loop
security 12.06 | Clicked something bad? What to do
:::end

## Sources

- ethskills, [Wallets](https://ethskills.com/wallets/SKILL.md) (“Anything that moves funds gets a gate”). Checked 26 Oct 2026.
- OWASP GenAI Security Project, [LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) (“Require user approval”). Checked 26 Oct 2026.
