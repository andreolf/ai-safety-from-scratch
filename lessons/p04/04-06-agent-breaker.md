---
id: 04-06
minutes: 9
highlight: Practice
pose: proud
summary: Two free places to attack real models legally, Agent Breaker and Jailbroken, plus a plan for a first session and the rules for practising safely.
---
The labs in this course are simulations: scripted toys that show how an attack works. To feel how real models resist and give way, you need real targets that are built to be attacked. Two free ones are worth your time. Use them, and only them, or apps you built yourself.

:::figure practice-rules
Where it is fine to practise, and where it is not.
:::end

## The game: Agent Breaker

Lakera, an AI security company, runs a free public game called Agent Breaker. (Its earlier game, Gandalf, at gandalf.lakera.ai, now redirects there.) It describes itself like this:

:::source url="https://play.lakera.ai/agent-breaker" by="Lakera, Agent Breaker, “How to Play”" date="" checked="26 Oct 2026"
This is an entire app store of GenAI applications - and every single one of them can be hacked.
:::end

How it works, from the game’s own rules:

- Each app has levels of increasing difficulty. “Each attack attempt is scored from 0 to 100,” and you need to “Score 75+ to unlock the next level for that app.”
- Each level has an **attack objective**. These “mirror actual attacks we’ve seen in the wild, such as stealing sensitive data, extracting secret system instructions, or manipulating the LLM into attacking other users.”
- Each level has an **attack vector**: “You’ll either type directly into the app interface, or insert your attack into content (like a document or webpage) that the app will process.” That is direct and indirect injection, from lesson 04-02.

There is a leaderboard. You may want to make an account or play anonymously; read the game’s own terms first, and don’t enter real personal data into practice prompts.

## Jailbroken

Jailbroken describes itself like this:

:::source url="https://jailbroken.gg/" by="Jailbroken, home page" date="" checked="27 Oct 2026"
Jailbroken is a playable academy for AI security. Learn red-team techniques, attack live model-backed targets, and compete on a shared Daily Challenge.
:::end

The difference from this course is the point. Here you get structured lessons and simulated labs that explain why an attack works and what stops it. Jailbroken gives you live targets and a daily puzzle shared by every player, with a leaderboard. Use this phase for the why, and Jailbroken for practice.

## A good first session (30 minutes)

1. **Play one easy level by typing directly.** Notice how the app “defends” itself: polite refusals, filters, rules in its instructions.
2. **Try a level in Agent Breaker where you hide your attack in a document or web page.** Notice that you never talk to the victim. You just leave words where their AI will read them.
3. **Watch the score.** An attack that works once may fail the next time. These systems are not predictable, which is exactly why defenders can’t rely on filters alone.
4. **Try that day’s Jailbroken challenge,** and compare what worked on a live model with what worked in this course’s labs.
5. **Write down one defence** that would have stopped your best attack even if the model was fooled. (Hint: lesson 04.07.)

## The rules, in plain words

- **Only games and labs built for it,** or apps you built yourself.
- **Never** a bank’s, shop’s or employer’s chatbot, or anyone else’s agent or account. Even “just testing” can break terms of service and may be illegal where you live.
- **Never use real people’s data** in your attacks.
- **If you find a real problem by accident,** stop, and report it to the company through its official security contact.

:::intern fooled
Fresh from a great score in the game, the intern wants to “just test” the bank’s support chatbot. A colleague stops them: the bank never agreed to be tested, and the intern’s account is tied to their real name.
---
A practice range is for practice. Real systems need permission, in writing.
:::end

:::exercise Plan your practice
You have 20 minutes and want to understand indirect injection. Write a three-step plan using only practice targets and this course’s Fake Inbox lab.
:::solution
Example: (1) In the Fake Inbox, run level 1 and level 2 and read what the assistant did. (2) In Agent Breaker, pick a level whose attack vector is content “like a document or webpage”, and try to hide an instruction there. (3) Back in the Fake Inbox, open level 3 and find which defence stops the attack even though the assistant is still fooled. Never test on real services.
:::end

## Quick check

:::quiz
- q: Where is it fine to practise prompt attacks?
  options: ["On targets built for it, such as Agent Breaker, Jailbroken, this course’s labs, or your own apps", "On any chatbot that is free to use", "On your bank’s chatbot, as long as you don’t steal anything"]
  answer: 0
  explain: Real services never agreed to be tested. Practice systems did.
- q: In Agent Breaker, what score unlocks the next level of an app?
  options: ["75 or more", "Exactly 100", "Any score above zero"]
  answer: 0
  explain: The rules say “Score 75+ to unlock the next level for that app.”
- q: What does “insert your attack into content (like a document or webpage)” practise?
  options: ["Indirect prompt injection", "Password guessing", "Phishing a human by phone"]
  answer: 0
  explain: The attack hides in content the app processes, not in what the victim types.
:::end

:::xlink
lesson 04-02 | Direct and indirect injection
lesson 04-07 | Defences that help
:::end

## Sources

- Lakera, [Agent Breaker](https://play.lakera.ai/agent-breaker), “How to Play”, “Attack Objective” and “Attack Vector” sections. Opened 26 Oct 2026; gandalf.lakera.ai redirected to this page on that date. Checked 26 Oct 2026.
- Jailbroken, [home page](https://jailbroken.gg/) (description, Daily Challenge, leaderboard). Checked 27 Oct 2026.
