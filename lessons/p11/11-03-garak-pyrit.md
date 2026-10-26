---
id: 11-03
minutes: 9
highlight: Scan
pose: alarmed
summary: Your own attacks only cover what you thought of. Scanners such as NVIDIA's garak and Microsoft's PyRIT throw large libraries of known attacks at a model. What they do, how to read a report, and their limits.
---
## The hook

You wrote ten good attacks. A real attacker has thousands, collected from papers, forums and earlier jailbreaks. How do you test against attacks you have never seen?

## The one idea

**A scanner sends many known attacks, called probes, to a model and uses detectors to judge the replies. It finds weaknesses you would not think of. But a clean scan is not proof of safety: it only covers the attacks in its library.**

:::figure scanner-probes
How a scanner works: probes in, detectors judge the replies, a report out.
:::end

## garak: the LLM vulnerability scanner

:::source url="https://github.com/NVIDIA/garak" by="NVIDIA, garak README (GitHub)" date="" checked="26 Oct 2026"
garak checks if an LLM-backed application can be made to fail in a way we don't want. garak probes for hallucination, data leakage, prompt injection, misinformation, toxicity generation, jailbreaks, and many other weaknesses.
:::end

Its README compares it to network scanners like nmap, “but for LLMs”. It is free, written in Python and installed with `python -m pip install -U garak`. You choose a target with `--target_type` (for example a Hugging Face model, an OpenAI model, or “pretty much anything accessible via REST”) and the probes with `--spec`, for example `--spec probes.promptinject`. `garak --list_probes` shows the library. For trying it out, the README describes test targets such as `test.Repeat`, which repeats back the prompt it received, so you can watch a scan without paying for a model.

## Reading a garak report

For each probe, garak prints a row per detector. The README explains that if any attempt “yielded an undesirable behavior, the response will be marked as FAIL, and the failure rate given”. Figures like 840/840 mean total generations and how many seemed to behave well. More than one reply is generated per prompt, by default 10, because model answers vary (lesson 01.03).

## PyRIT: a framework for red teamers

:::source url="https://github.com/microsoft/PyRIT" by="Microsoft, PyRIT README (GitHub)" date="" checked="26 Oct 2026"
The Python Risk Identification Tool for generative AI (PyRIT) is an open source framework built to empower security professionals and engineers to proactively identify risks in generative AI systems.
:::end

Where garak is a scanner you point and run, PyRIT is a framework you program: you build your own attack pipelines in Python. Its website has the installation guide and examples.

## Why the practice bot is not the target here

These scanners are built for real models and apps. Pebble has three hand-written weaknesses, so a scan would mostly measure the toy rules. If you want to try garak, run it against a small open model on your own computer, or a test target. The course did not run garak or PyRIT for this lesson; the commands come from their READMEs.

:::intern alarmed
The intern runs a scanner against their bot, gets mostly passes, and writes “security tested: safe” in the launch notes. A user finds a leak in the first week with an attack that was not in the scanner’s library.
---
A scan tells you which known attacks failed. It cannot tell you that no attack works.
:::end

:::exercise Read a scan line
A scan report shows: `promptinject  ...  FAIL  ok on 712/840 (failure rate 15.24%)`. In plain words, what happened, and what would you do next?
:::solution
The prompt-injection probes produced 840 replies in total; 712 behaved acceptably and 128 did not, a failure rate of about 15%. Next: open the detailed log to see which prompts caused failures, reproduce a few by hand, add them to your own promptfoo tests (lesson 11.02), fix with guardrails or design changes (lessons 11.04 and 11.05), then scan again.
:::end

## Quick check

:::quiz
- q: What does a scanner like garak do?
  options: ["Sends many known attack prompts and judges the replies with detectors", "Proves a model is safe", "Fixes the model automatically"]
  answer: 0
  explain: Probes plus detectors, then a report.
- q: A scan shows no failures. What can you conclude?
  options: ["The attacks in its library did not work this time; others might", "The model is safe from all attacks", "The model is broken"]
  answer: 0
  explain: Coverage is limited to the library.
- q: How is PyRIT different from garak?
  options: ["It is a framework for building your own attack pipelines in Python", "It is a paid antivirus", "It only works on images"]
  answer: 0
  explain: Microsoft describes it as a framework for security professionals and engineers.
:::end

:::xlink
lesson 04-05 | Why there is no simple fix
lesson 08-03 | Evals: exams for AI
:::end

## Sources

- NVIDIA, [garak README](https://github.com/NVIDIA/garak) (description, install, `--target_type`, `--spec`, `--list_probes`, test targets, reading results). Checked 26 Oct 2026.
- Microsoft, [PyRIT README](https://github.com/microsoft/PyRIT) (description, link to the website). Checked 26 Oct 2026.
