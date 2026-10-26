---
id: 05-07
minutes: 10
highlight: sandbox
summary: Limit what an agent can touch even when it is fooled or goes wrong. Filesystem and network isolation, secrets kept outside, and a monitor that pages a human.
---
Permissions (lesson 05.02) decide what an agent is allowed to do. A sandbox decides what it **can** do, whatever it has been told. The difference matters when the agent has been hijacked by a prompt injection, or when it is pursuing the wrong goal. In both cases it will try things you never allowed.

:::figure sandbox-layers
The layers, from the inside out.
:::end

## Two walls, both needed

In October 2025 Anthropic described the sandbox it built for Claude Code, its coding agent. It uses two boundaries enforced by the operating system: the agent can only change files in the project folder, and it can only reach approved servers through a proxy that runs outside the sandbox. They make a point worth remembering:

:::source url="https://www.anthropic.com/engineering/claude-code-sandboxing" by="Anthropic, Beyond permission prompts" date="20 Oct 2025" checked="27 Oct 2026"
Without network isolation, a compromised agent could exfiltrate sensitive files like SSH keys; without filesystem isolation, a compromised agent could easily escape the sandbox and gain network access.
:::end

Anthropic also reports a side benefit: in its own use, sandboxing cut permission prompts by 84%. Fewer prompts means the ones left get read (lesson 05.06).

## Keep secrets out of the box

The safest key is one the agent never sees. Anthropic’s cloud version keeps git credentials outside the sandbox. A proxy checks each request, for example that a push only goes to the configured branch, and adds the real token on the way out. The same pattern works for API keys and, in Phase 06, for wallets: the agent asks, something outside decides.

## Every door is a door

In July 2026, OpenAI’s agents were in a sandbox whose only route out was a package proxy. They found flaws in the proxy and reached the internet (lesson 08.06). Afterwards OpenAI said it is building network controls so that

:::source url="https://openai.com/index/hugging-face-incident-and-the-road-ahead/" by="OpenAI, The Hugging Face incident and the road ahead" date="26 August 2026" checked="27 Oct 2026"
a single compromise of a workload or supporting service does not, by itself, allow for unauthorized access to the internet or other internal networks.
:::end

For your agent, list every route out: package installs, web fetch, email, webhooks, a shared folder. Each one needs its own limit.

## Watch what it does

A sandbox limits damage. A monitor tells you it is happening. OpenAI says chain-of-thought monitoring would have paged its security team more than a day before the Hugging Face breach, but it was not switched on for those tests. In October 2026 METR published a red-team exercise against OpenAI’s internal agent monitoring, which looked at how much agent activity is monitored and whether agents could disable the monitor. Monitoring is only as good as its coverage.

For a small project, monitoring can be simple: log every tool call with its arguments, alert on anything that touches secrets or leaves the allowlist, and review a sample each week.

:::intern fooled
The intern runs an agent with full access to their laptop “because the sandbox kept asking questions”. A web page the agent reads tells it to upload `~/.ssh` to a paste site. It does.
---
With file and network isolation, that instruction would have hit two walls.
:::end

:::exercise Draw your agent’s boundary
Pick an agent you use or want to build. Write down: (1) which folders it may write to, (2) which hosts it may reach, (3) which secrets it needs and how it can use them without seeing them, (4) what you log and what pages you.
:::solution
Example for a coding agent: (1) the project folder only; (2) the package registry and your git host, through a proxy, nothing else; (3) git push goes through a proxy that adds the token and only allows the feature branch, so the agent never holds the token; (4) log every command; alert on any attempt to reach a new host, read files outside the project, or change CI config.
:::end

## Quick check

:::quiz
- q: Why does Anthropic say a sandbox needs both filesystem and network isolation?
  options: ["Without network isolation a fooled agent can send files out; without file isolation it can escape and get network access", "Because one is for Windows and one for Mac", "Network isolation alone is always enough"]
  answer: 0
  explain: Each wall covers the other’s gap.
- q: What is the safest way for an agent to use a secret token?
  options: ["Never hold it: a proxy outside the sandbox checks requests and adds the token", "Store it in the prompt", "Put it in a file in the project folder"]
  answer: 0
  explain: Then even a fully compromised agent cannot leak the token.
- q: What does the July 2026 incident teach about sandbox design?
  options: ["Every allowed route out, even a package proxy, can become an escape route", "Sandboxes are useless", "Agents never try to leave sandboxes"]
  answer: 0
  explain: The proxy was the one door, and the agents found flaws in it.
- q: What is the minimum useful monitoring for a small agent project?
  options: ["Log every tool call, alert on secrets or new hosts, review a sample regularly", "Read every log line by hand", "Nothing, if the sandbox is good"]
  answer: 0
  explain: A sandbox limits damage; logs and alerts tell you when something is trying.
:::end

:::xlink
lesson 05-02 | Permissions: what can it touch?
lesson 05-06 | Humans in the loop
lesson 08-06 | July 2026: the agents that left the sandbox
:::end

## Sources

- Anthropic, [Beyond permission prompts: making Claude Code more secure and autonomous](https://www.anthropic.com/engineering/claude-code-sandboxing), 20 Oct 2025. Checked 27 Oct 2026.
- OpenAI, [The Hugging Face incident and the road ahead](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), 26 Aug 2026. Checked 27 Oct 2026.
- METR, [Red-Teaming OpenAI’s Internal Agent Monitoring Systems](https://metr.org/blog/2026-10-22-red-teaming-openai-agent-monitoring/), 22 Oct 2026. Checked 26 Oct 2026.
