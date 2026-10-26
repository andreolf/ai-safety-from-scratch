---
id: 05-05
minutes: 8
highlight: software
summary: Plug-ins, connectors and MCP servers give an AI new powers. They are also software written by someone else, running with your access. Four questions before you connect.
---
“Add this connector and your AI can manage your files, your calendar and your smart home!” One click, and it is installed. But what exactly did you just install, who wrote it, and what can it do while you aren’t looking?

Every plug-in, connector or tool server you add to an AI app is software written by someone else, running with your permissions. Check it like you would check any app before you install it.

## What MCP is

[[term:mcp|MCP, the Model Context Protocol]], is a popular open standard for connecting AI apps to tools and data. A small program called an MCP server offers tools, such as “read files” or “search email”, and the AI app can call them. It makes connecting things easy. That ease is part of the risk.

Simon Willison put it plainly in his lethal trifecta article:

:::source url="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/" by="Simon Willison, “The lethal trifecta for AI agents”" date="16 Jun 2025" checked="26 Oct 2026"
The problem with Model Context Protocol —MCP—is that it encourages users to mix and match tools from different sources that can do different things.
:::end

Some of those tools reach your private data; others reach places where attackers can leave instructions. Mix them, and you may build the trifecta from lesson 05-03 without noticing.

## What can go wrong

The MCP project’s own security guidance is frank about servers that run on your computer. They “are binaries that are downloaded and executed on the same machine” as your AI app. Without proper safeguards, it lists risks including:

- **Arbitrary code execution:** an attacker can run any command with the app’s privileges.
- **No visibility:** you have no insight into what commands are being run.
- **Data exfiltration** and **data loss.**

OWASP’s agent list (ASI04, Agentic Supply Chain Vulnerabilities) adds that tools, plug-ins and MCP connections from third parties “may introduce unsafe code, hidden instructions, or deceptive behaviors.” A tool’s *description*, which the AI reads, can itself contain a prompt injection.

## Four questions before you connect

:::figure connector-check
Ask these before adding any plug-in, connector or MCP server.
:::end

The MCP guidance also sets a rule for apps: if an app offers one-click setup of a local server, it “MUST implement proper consent mechanisms prior to executing commands”, showing you the exact command it will run. If an app never asks, that tells you something.

:::intern fooled
The intern finds a free “Super Productivity” connector on a forum, with great reviews, and installs it in one click. It works nicely. It also quietly copies the intern’s notes folder to a server nobody has heard of.
---
Free, popular and convenient doesn’t mean safe. Check who made it and what it can touch.
:::end

:::exercise Should you connect it?
A connector promises to “organise your downloads folder with AI”. It was published last week by an anonymous account, asks for access to your whole computer’s files and to the internet, and has no way to review what it runs. What do you do?
:::solution
Don’t connect it. Unknown author, far broader access than the job needs (the whole disk plus internet is private data and a way out), and no visibility. Look for an official or well-known tool, limited to the downloads folder, from an app that asks before running commands. Know how to remove it before installing.
:::end

## Quick check

:::quiz
- q: What is an MCP server?
  options: ["A small program that gives an AI app tools and data, such as reading files", "A type of computer virus", "The company that owns ChatGPT"]
  answer: 0
  explain: MCP is an open standard for connecting AI apps to tools.
- q: Why does Willison worry about MCP?
  options: ["It encourages mixing tools from different sources, which can combine into the lethal trifecta", "It is too slow", "It only works on phones"]
  answer: 0
  explain: Some tools reach private data, others reach untrusted content.
- q: What should a good AI app do before running a new local tool server from a one-click setup?
  options: ["Ask for your consent and show the exact command it will run", "Install it silently", "Run it twice to be sure"]
  answer: 0
  explain: The MCP security guidance says it MUST implement proper consent first.
:::end

:::xlink
lesson 05-03 | The lethal trifecta
lesson 06-06 | Taking permission back
:::end

## Sources

- Model Context Protocol, [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices) (“Local MCP Server Compromise”). Checked 26 Oct 2026.
- OWASP GenAI Security Project, [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) (ASI04). Checked 26 Oct 2026.
- Simon Willison, [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/), 16 Jun 2025. Checked 26 Oct 2026.
