---
id: 06-06
minutes: 8
highlight: back
summary: Permissions you gave an app or agent often keep working until you remove them. How to find them, revoke them, and check they really stopped.
---
On Ethereum, an EIP-7702 delegation stays in effect until it is replaced or cleared, even after the transaction that set it is long forgotten. Many permissions work like that. They outlast the moment you granted them.

Permissions don’t expire just because you stopped using something. Many keep working until you [[term:revoke|revoke]] them. Know where your permissions live, take them back when you are done, and check they really stopped.

:::figure revoke-flow
List, revoke, check.
:::end

## Some permissions persist by design

A crypto example shows how surprising this can be. Ethereum’s EIP-7702 lets an ordinary account hand control to smart-contract code. ethskills explains:

:::source url="https://ethskills.com/wallets/SKILL.md" by="ethskills, “Wallets”" date="" checked="26 Oct 2026"
That delegation persists. It stays in effect until it is replaced or explicitly cleared
:::end

It adds: “Removing it takes a new signed authorization; decommissioning the delegate contract does nothing.” In other words, even if the code you delegated to is “shut down”, the permission stays until *you* remove it.

The same pattern appears everywhere: connected apps on your Google or Microsoft account, card details saved in a shop, bank connections, browser extensions, and spending approvals given to crypto apps. ethskills also asks every setup to say plainly “how a human revokes or evicts that signer without its cooperation”: you should be able to cut an agent off even if it is misbehaving.

## Where to look

- **Your accounts:** the “connected apps” or “third-party access” page of your email and cloud accounts.
- **Your cards:** your bank app’s list of saved merchants or card tokens; cancel virtual cards you no longer need.
- **Your bank:** connected apps and payment permissions.
- **Crypto wallets:** connected sites, token approvals and any delegations.
- **AI apps:** connectors, plug-ins and MCP servers (lesson 05-05).

After revoking, **check again**: reload the list and confirm the entry is gone. And if a secret ever appeared in a chat, replace it (lesson 06-02).

## Builder corner (optional)

Permission standards are being written for agents. ERC-7715 (a draft) defines how an app can request execution permissions from a wallet, with rules such as expiry, and a method called `wallet_revokeExecutionPermission` to take one back. Drafts can change, so check the current text before building on it.

:::intern alarmed
The intern finds an old “AI deal finder” in the browser that still has permission to read every page and use the saved card. It hasn’t been used in six months. The intern removes it, deletes the saved card from the shop, and replaces the card number for good measure.
---
An agent you forgot about still has every permission you gave it. Clean up on a schedule.
:::end

:::exercise Your permission clean-up
Set a 15-minute timer. List every AI app, plug-in or connector you have given access to your email, files, card, bank or wallet. For each, decide: keep, limit, or revoke.
:::solution
A good result has three columns. Keep: tools you use weekly, with the narrowest access. Limit: tools you use but that have more access than needed (switch to read-only, a smaller folder, a virtual card). Revoke: anything unused for a month. Then reload each settings page to check the revocation worked, and put a reminder in your calendar to repeat this every three months.
:::end

## Quick check

:::quiz
- q: What happens to most app and agent permissions when you stop using the app?
  options: ["They keep working until you revoke them", "They expire automatically after a day", "They are deleted when you close the app"]
  answer: 0
  explain: Many permissions persist until removed.
- q: According to ethskills, how long does an EIP-7702 delegation stay in effect?
  options: ["Until it is replaced or explicitly cleared", "Exactly one transaction", "24 hours"]
  answer: 0
  explain: “That delegation persists.”
- q: After revoking a permission, what should you do?
  options: ["Check again that it is really gone", "Nothing, it always works", "Install the app again to make sure"]
  answer: 0
  explain: Reload the list and confirm.
:::end

:::xlink
lesson 05-05 | Plugins and connectors are software too
security 12.06 | Clicked something bad? What to do
:::end

## Sources

- ethskills, [Wallets](https://ethskills.com/wallets/SKILL.md) (“An EOA does not have to migrate to batch”: EIP-7702 delegation persists; revoking a signer without its cooperation). Checked 26 Oct 2026.
- [ERC-7715: Request Permissions from Wallets](https://eips.ethereum.org/EIPS/eip-7715), Draft, created 24 May 2024 (`wallet_revokeExecutionPermission`, expiry rule). Checked 26 Oct 2026.
