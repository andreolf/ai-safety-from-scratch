---
id: 06-02
minutes: 8
highlight: keys
pose: alarmed
summary: Never give an agent your card number, bank login, recovery phrase or private key. Give it a small, limited float you could afford to lose, and keep the main funds behind your own approval.
---
## The hook

Would you give a new babysitter your bank card and PIN “in case they need to buy milk”? Or would you leave twenty francs on the kitchen table?

## The one idea

**Never give an agent the keys to everything: your full card, bank login, crypto recovery phrase or private key. Give it a small, limited float, an amount you would accept losing, and keep your main money where only you can move it.**

:::figure bounded-float
Main money stays with you. The agent gets a small float.
:::end

## The rule from wallet security

ethskills, a public guide that teaches AI coding agents how to work with Ethereum safely, states the rule clearly. It is written about crypto, but it applies to every kind of money:

:::source url="https://ethskills.com/wallets/SKILL.md" by="ethskills, “Wallets”" date="" checked="26 Oct 2026"
Whatever signs unattended — an agent, a bot, a deploy script — should be able to move only what you would accept losing: a bounded float, an onchain allowance, or a scoped module, with the principal behind a threshold that key alone cannot meet.
:::end

In plain words: anything that can pay without you watching should only be able to reach a small amount. The main money (“the principal”) should need more than that one key to move, for example your own approval, or two keys on two devices.

The same guide says to state plainly which actions always need a human: “moving principal, raising the agent’s own limit, changing who may sign”. Notice the middle one: **the agent must never be able to raise its own limit.**

## A key in a chat is a burned key

ethskills is blunt about secrets that end up in AI conversations:

> “A key that arrived in a prompt, a chat, or a ticket is burned.”

Its advice: say so, replace it, and don’t put money behind it. The same goes for a card number pasted into a chatbot, or a recovery phrase typed into any AI. Assume it has been copied: chat logs are stored, shared, and can be leaked or read by prompt injections.

## The safe versions, by payment type

- **Cards:** a separate virtual or prepaid card with a low limit, not your main card.
- **Bank:** read-only connections where possible; payments only with your confirmation in the bank’s app.
- **Crypto:** a separate small wallet, or a limited permission on yours (lesson 06-03), never your recovery phrase.

:::intern alarmed
To “save time”, the intern pastes the team wallet’s recovery phrase into an AI chat and asks it to “handle the payments this month.” A colleague sees it and moves all the funds to a new wallet that afternoon.
---
Once a secret has been in a chat, treat it as gone. Replace it, and give the agent a small float instead.
:::end

:::exercise Design the float
Your agent orders office snacks and pays small software bills, about 150 francs a month. Design a safe payment setup.
:::solution
For example: a separate virtual card with a 200-franc monthly limit (or a small separate wallet with that amount), payments only to an approved list of shops, and your approval for anything over 50 francs. Your main card and bank login never go to the agent. If the card details ever appear in a chat log, cancel and replace the card.
:::end

## Quick check

:::quiz
- q: How much should an agent that pays unattended be able to move?
  options: ["Only what you would accept losing: a bounded float", "Everything, so it never gets stuck", "Whatever it decides is necessary"]
  answer: 0
  explain: That is the ethskills rule for anything that signs unattended.
- q: What should you do if a private key or card number was pasted into an AI chat?
  options: ["Treat it as burned: replace it and don’t keep money behind it", "Delete the chat and keep using it", "Ask the AI to forget it"]
  answer: 0
  explain: “A key that arrived in a prompt, a chat, or a ticket is burned.”
- q: Which action should an agent never be able to do by itself?
  options: ["Raise its own spending limit", "Read a receipt", "Draft a shopping list"]
  answer: 0
  explain: ethskills lists “raising the agent’s own limit” among actions that need a human.
:::end

:::xlink
security 12.02 | The secret phrase: 12 or 24 words that are the whole safe
security 12.03 | Nobody real will ever ask for your phrase
security 04.02 | The golden rule: never read a code to anyone
security 04.05 | Backup codes and a "spare key"
security 07.02 | Paying by card online, safely
:::end

## Sources

- ethskills, [Wallets](https://ethskills.com/wallets/SKILL.md) (“Authority first, storage second”; “Before anything signs”). Checked 26 Oct 2026.
- ethskills, [index](https://ethskills.com/SKILL.md) (“Unattended signers get a bounded float; principal sits behind a multisig threshold”). Checked 26 Oct 2026.
