# Pebble: the Builder track practice app

A toy chatbot and a toy email agent for the **AI Safety from Scratch** Builder track (Phase 11).
Everything here is made up: the shop, the staff code, the wallet, the coins and the key.
There is no language model, no API key and no network call. Simple rules imitate classic weaknesses
so you can attack them, scan them and fix them **on your own computer**.

Only ever test systems you own or have written permission to test. This one is yours.

## What you need

- Node.js 20 or newer for the app and the checks. Some of the tools in the lessons (promptfoo, MCP Inspector) need Node 22 or newer.
- A terminal. No accounts are needed for the six practicals.

## Get it

```sh
git clone https://github.com/andreolf/ai-safety-from-scratch.git
cd ai-safety-from-scratch/practice-app
node check.mjs setup
```

## What is inside

| File | What it is | Lesson |
|---|---|---|
| `bot.mjs` | Pebble, a helpdesk bot with a secret staff code and three weaknesses | 11.01 |
| `chat.mjs`, `server.mjs` | Talk to Pebble in the terminal, or over HTTP on 127.0.0.1:8787 | 11.01 |
| `attacks.txt` | Your own attack messages | 11.02 |
| `promptfooconfig.yaml`, `provider.mjs` | promptfoo tests that call the bot directly | 11.02 |
| `guard.mjs` | Your guardrails: an input check and an output check | 11.04 |
| `agent.mjs`, `inbox.json`, `policy.mjs` | A toy agent with a fake inbox, a fake wallet and your tool policy | 11.05 |
| `mcp-server.mjs`, `mcp.json` | A toy MCP server with one poisoned tool description | 11.05 |
| `config.mjs`, `ai-written/lookup.mjs`, `semgrep-rules.yml` | A key written into the code, and an unsafe AI-written helper | 11.06 |
| `evals/cases.json` | Your eval set | 11.07 |
| `check.mjs` | Checks each practical and prints a completion code | all |

## The six practicals

```sh
node check.mjs setup     # 11.01 run the app
node check.mjs redteam   # 11.02 make the raw bot leak with your own attacks
node check.mjs guard     # 11.04 block every leak without breaking normal answers
node check.mjs tools     # 11.05 stop the agent obeying an email, clean the MCP tool
node check.mjs code      # 11.06 move the key out of the code, fix the AI-written helper
node check.mjs evals     # 11.07 write at least 6 eval cases
```

Each passing check prints a code. Enter the codes in the **Builder practicals** lab on the course site.
Together with the Phase 11 test they unlock the Builder certificate of completion.

The codes come from public text, so they are a checkpoint for you, not proof for anyone else.
The certificate is a free certificate of completion: not accredited, not a professional or security qualification.

## Reset

`git checkout -- .` inside this folder puts every file back the way it was.
