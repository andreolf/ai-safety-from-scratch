---
id: 11-06
minutes: 10
highlight: secrets
pose: fooled
summary: A key written into code ends up in git history, and AI coding assistants can write unsafe code that works. Find both with gitleaks and Semgrep, then fix them.
---
An AI assistant writes you a helper in ten seconds. It works on the first try. It also builds a shell command out of whatever a user types, right next to a wallet key pasted into the config. Both mistakes are easy to make and easy to miss.

Never put a secret in code: read it from the environment, keep the value in an ignored file, and treat any key that was ever committed or pasted into a chat as burned. Review AI-written code like a stranger’s code, and let scanners do the first pass.

:::figure secret-history
Why deleting a committed key is not enough: it stays in the history.
:::end

## Secrets: gitleaks

:::source url="https://github.com/gitleaks/gitleaks" by="gitleaks README (GitHub)" date="" checked="26 Oct 2026"
Gitleaks is a tool for detecting secrets like passwords, API keys, and tokens in git repos, files, and whatever else you wanna throw at it via stdin.
:::end

It has three modes: `git` scans the history, `dir` scans files and folders, and `stdin` scans piped text. It can run as a pre-commit hook, so a secret is caught before it is committed. Its README also notes that the project is now feature complete, with future releases for security patches only. In the practice app:

```
gitleaks dir -v .
```

When the course ran gitleaks 8.30.1 on the practice app on 26 Oct 2026, it reported one finding: rule `generic-api-key` in `config.mjs`. That key is made up for the exercise, but the mistake is real. The ethskills wallet guide puts the rule plainly:

:::source url="https://ethskills.com/wallets/SKILL.md" by="ethskills, Wallets skill" date="" checked="26 Oct 2026"
A key that arrived in a prompt, a chat, or a ticket is burned. Say so, rotate it, replace the account
:::end

It adds: “A committed secret is compromised in seconds and stays compromised; deleting the commit does not undo it.” The fix: `export const WALLET_KEY = process.env.WALLET_KEY;`, the value in a `.env` file, and `.env` in `.gitignore` before the first push.

## AI-written code: Semgrep

`ai-written/lookup.mjs` was “written by an assistant”. It calls `exec('grep -i ' + name + ' orders.txt')`, so a name like `x; echo HACKED` runs a second command. Semgrep is “a fast, open-source, static analysis tool that searches code, finds bugs, and enforces secure guardrails and coding standards”. The practice app includes a small local rule:

```
python3 -m pip install semgrep
semgrep scan --metrics=off --config semgrep-rules.yml ai-written/
```

When the course ran it, Semgrep reported one blocking finding, `exec-with-concatenated-input`, on line 7. Its README is honest about limits: the free Community Edition “will miss many true positives” in security work, because it analyses one function or file at a time. A clean scan is a first pass, not a review.

## The practical

Fix both, then run:

```
node check.mjs code
```

:::intern fooled
The intern pastes the wallet key into the chat with their coding assistant “just to debug”, then commits the assistant’s helper without reading it. The key is now in a chat log and in git history, and the helper runs any command a user can type.
---
Burned is burned: rotate a key the moment it leaves your control. And read every line an assistant writes before it ships.
:::end

:::exercise Pass the code check
Make `node check.mjs code` pass.
:::solution
`config.mjs`: `export const WALLET_KEY = process.env.WALLET_KEY;`. `.gitignore`: add a line `.env`. `ai-written/lookup.mjs`: `import { execFile } from 'node:child_process';` and `execFile('grep', ['-i', '--', String(name), 'orders.txt'], (err, stdout) => cb(stdout));`. With an argument list there is no shell, so the user’s text is only ever a search term. Run gitleaks and Semgrep again: both are clean. In a real project, the old key would also be rotated, because it is still in the history.
:::end

## Quick check

:::quiz
- q: You committed a key, then deleted it in the next commit. Is it safe?
  options: ["No: it stays in git history and should be treated as burned and rotated", "Yes, deleting it fixes everything", "Only if the repository is new"]
  answer: 0
  explain: Deleting the commit does not undo the exposure.
- q: What is wrong with `exec('grep -i ' + name + ' orders.txt')`?
  options: ["User text becomes part of a shell command, so a user can run their own commands", "It is too slow", "grep does not exist"]
  answer: 0
  explain: Use execFile with an argument list, or avoid the shell.
- q: Semgrep reports no findings. What does that mean?
  options: ["A useful first pass; its Community Edition can miss real problems, so a human review is still needed", "The code is proven secure", "Semgrep is broken"]
  answer: 0
  explain: Its README says the Community Edition will miss many true positives in security contexts.
:::end

:::xlink
lesson 06-02 | Never give an agent your keys or full card
lesson 05-05 | Plugins and connectors are software too
:::end

## Sources

- [gitleaks README](https://github.com/gitleaks/gitleaks) (description, `git`, `dir` and `stdin` modes, pre-commit hook, feature complete). Checked 26 Oct 2026.
- ethskills, [Wallets skill](https://ethskills.com/wallets/SKILL.md) (burned keys, committed secrets). Checked 26 Oct 2026.
- Semgrep, [README](https://github.com/semgrep/semgrep) (description, `pip install`, Community Edition limits). Checked 26 Oct 2026.
