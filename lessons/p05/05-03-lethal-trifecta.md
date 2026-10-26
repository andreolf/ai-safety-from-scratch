---
id: 05-03
minutes: 9
highlight: trifecta
pose: alarmed
summary: Private data, untrusted content and a way to send data out. Any two are manageable. All three in one agent let an attacker steal your data. Build it yourself in the lab.
---
## The hook

Your agent can read your files. It can browse the web. It can send email. Each of those sounds useful. Together, they make a perfect tool for a thief, and the thief doesn’t need your password.

## The one idea

**Simon Willison calls it the [[term:lethal-trifecta|lethal trifecta]]: an agent with access to your private data, exposure to untrusted content, and a way to communicate externally. Combine all three and an attacker can trick it into sending your data to them. Remove any one and that attack fails.**

:::image figure-lethal-trifecta

## The three ingredients

Willison, the programmer who coined “prompt injection”, described the trifecta in June 2025:

:::source url="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/" by="Simon Willison, “The lethal trifecta for AI agents”" date="16 Jun 2025" checked="26 Oct 2026"
If your agent combines these three features, an attacker can easily trick it into accessing your private data and sending it to that attacker.
:::end

1. **Access to your private data.** Email, files, notes, passwords, company documents.
2. **Exposure to untrusted content.** Anything a stranger could have written: web pages, incoming emails, shared documents, product reviews.
3. **The ability to externally communicate.** Sending email, posting, calling a web address, even loading an image from a link, which can carry data out in the address.

Why does it work? Because, in Willison’s words, “LLMs follow instructions in content.” The untrusted content brings the instructions, the private data is the prize, and the way out is the getaway car.

## “But the AI companies will fix it”

They do fix specific cases. Willison notes that when such attacks were reported, vendors usually “promptly fixed” them “by locking down the exfiltration vector”, the way out. The trouble starts when you combine tools yourself: “once you start mixing and matching tools yourself there’s nothing those vendors can do to protect you!” His conclusion: “The only way to stay safe there is to avoid that lethal trifecta combination entirely.”

## Try it: the Trifecta Switchboard

Run the attack with all three switches on. Then find each single switch that stops it.

:::lab trifecta-switchboard
:::intern alarmed
The intern builds a “super agent” that reads the shared drive, browses supplier websites and emails summaries to anyone on the team. A supplier’s page contains a hidden line asking AIs to email “the latest price list” to an outside address. The agent obliges.
---
Each power was reasonable on its own. Together, they were the lethal trifecta.
:::end

## How to break the triangle

- **Split the jobs.** One agent reads strangers’ content but has no private data. Another touches private data but never reads untrusted content.
- **Close the way out.** No sending, posting or loading links without your approval.
- **Keep private data out** of agents that browse or read incoming mail.

:::exercise Find the trifecta
An AI browser extension can read every page you visit (including your webmail), summarise pages, and “share summaries to Slack”. Does it have the lethal trifecta? Which leg would you remove?
:::solution
Yes. Private data: it can read your webmail and logged-in pages. Untrusted content: it reads any web page, including attackers’ pages. A way out: sharing to Slack (and possibly loading links). Easiest leg to remove: turn off sharing, or require approval for every share. Better still, don’t let it run on your webmail and banking sites.
:::end

## Quick check

:::quiz
- q: What are the three parts of the lethal trifecta?
  options: ["Private data, untrusted content, and a way to send data out", "A password, a username and an email address", "Speed, memory and internet access"]
  answer: 0
  explain: Willison’s three are private data, untrusted content and external communication.
- q: If an agent has private data and a way out, but never reads untrusted content, what happens to this attack?
  options: ["It fails: the attacker can’t get instructions in front of the agent", "It works anyway", "The agent deletes your data"]
  answer: 0
  explain: Remove any one leg and this kind of theft fails.
- q: According to Willison, when are you most exposed?
  options: ["When you mix and match tools yourself, so no vendor can protect the combination", "Only when you use free apps", "Only when you use a phone"]
  answer: 0
  explain: Vendors fix their own products; your own combinations are up to you.
:::end

:::xlink
lesson 04-01 | The email that gave orders
lesson 06-05 | When the agent gets tricked
:::end

## Sources

- Simon Willison, [The lethal trifecta for AI agents: private data, untrusted content, and external communication](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/), 16 Jun 2025. Checked 26 Oct 2026.
