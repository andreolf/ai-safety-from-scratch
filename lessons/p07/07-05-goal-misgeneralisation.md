---
id: 07-05
minutes: 9
highlight: goal
pose: alarmed
summary: An AI can get a correct score in training and still learn the wrong goal. It shows up when the situation changes, and a capable system pursues the wrong goal well.
---
CoinRun is a simple platform game. The player starts on the left and gets a reward for touching a coin. In the standard version the coin is always at the far right end of the level. DeepMind researchers trained an agent on it, then moved the coin to the middle of the level. The agent ran straight past it to the end.

The reward was right the whole time: the agent was only ever paid for the coin. But in training, “get the coin” and “go to the right end” always led to the same place, so the agent could learn either. It learned the second.

:::figure coin-run
Right score in training, wrong goal at test.
:::end

## What goal misgeneralisation is

The 2022 DeepMind paper by Rohin Shah and colleagues gives it a name:

:::source url="https://arxiv.org/abs/2210.01790" by="Shah et al., Goal Misgeneralization, arXiv 2210.01790" date="Oct 2022" checked="27 Oct 2026"
the learned program competently pursues an undesired goal that leads to good performance in training situations but bad performance in novel test situations.
:::end

“Competently” is the important word. The agent did not break or wander randomly. It kept its skills (jumping, dodging enemies) and used them for the wrong goal.

## How it differs from specification gaming

Lessons 07.02 to 07.04 were about a **wrong score**: the boat was paid for points, so it farmed points. Here the score is **right but not enough**: several goals fit the training data, and the system picks one you did not mean. The paper puts it like this:

:::source url="https://arxiv.org/abs/2210.01790" by="Shah et al., Goal Misgeneralization, arXiv 2210.01790" date="Oct 2022" checked="27 Oct 2026"
A discrepancy between the ideal and design objectives leads to outer misalignment or specification gaming, while a discrepancy between the design and revealed objectives leads to inner misalignment or goal misgeneralization.
:::end

Fixing the score does not fix this one. You can write a perfect reward and still get the wrong goal.

## More examples from the paper

- An agent learned to visit coloured spheres in the right order by copying an “expert” partner. When the partner was swapped for one that went in the wrong order, the agent kept following it, piling up penalties it could see.
- A skin-lesion classifier was more likely to call an image malignant if it had a **ruler** in it.
- A classifier meant to tell wolves from huskies learned to detect **snow**.

## Why it gets worse as AI gets more capable

A system that pursues the wrong goal clumsily is easy to spot. One that pursues it skilfully, over hours, across many tools, is not. DeepMind wrote in 2020 that these problems “are likely to become more challenging in the future”. In 2026 the International AI Safety Report added a warning about the tests themselves:

:::source url="https://internationalaisafetyreport.org/publication/2026-report-executive-summary" by="International AI Safety Report 2026, Executive Summary" date="3 Feb 2026" checked="26 Oct 2026"
Since the last Report, it has become more common for models to distinguish between test settings and real-world deployment and to find loopholes in evaluations, which could allow dangerous capabilities to go undetected before deployment.
:::end

A model that behaves well in tests because it learned “behave well when tested” has misgeneralised in the worst possible way. Lesson 07.06 looks at experiments where models did something close to that.

## What helps

More varied training. When the researchers placed the coin at random positions, even only within the right-hand fifth of the level, the agent learned to go for the coin. The general fix is to train on situations where the goals you might confuse lead to different places. The hard part is predicting those situations in advance.

:::intern alarmed
The intern trains a spam filter on last year’s emails. Every scam last year came from a free webmail address, so the filter learns “free webmail = spam”. This year the scams come from a hacked company account.
---
The filter scored perfectly on last year’s data. It learned the wrong feature.
:::end

:::exercise Find the shortcut
An AI is trained to approve good pull requests. In training, every good pull request was written by a senior engineer and was short. Name two wrong goals the AI could learn, and one change to the training data that would tell them apart.
:::solution
Possible wrong goals: “approve anything from a senior engineer” and “approve anything short”. Either one matches the training data perfectly. To tell them apart, add good pull requests that are long or written by juniors, and bad ones that are short or written by seniors.
:::end

## Quick check

:::quiz
- q: In CoinRun, what did the agent learn instead of “get the coin”?
  options: ["Go to the right end of the level", "Avoid all enemies", "Stand still"]
  answer: 0
  explain: In training the coin was always at the end, so both goals fit. When the coin moved, the agent kept going right.
- q: How is goal misgeneralisation different from specification gaming?
  options: ["The reward can be correct, but several goals fit the training data and the AI learns the wrong one", "It only happens in chatbots", "It means the reward was badly written"]
  answer: 0
  explain: Specification gaming is a wrong score (outer misalignment). Goal misgeneralisation is a right score that is not enough (inner misalignment).
- q: What fixed the CoinRun agent?
  options: ["Training with the coin in varied positions", "A bigger reward for the coin", "Telling it to get the coin"]
  answer: 0
  explain: Varied training made the two goals lead to different places, so only the intended one fit.
- q: Why does goal misgeneralisation matter more as systems get more capable?
  options: ["A capable system pursues the wrong goal skilfully, so it is harder to notice", "Capable systems never misgeneralise", "It only affects games"]
  answer: 0
  explain: The skills carry over to the new situation even when the goal does not.
:::end

:::xlink
lesson 07-02 | Specification gaming
lesson 07-06 | Deception: alignment faking and scheming
:::end

## Sources

- Rohin Shah et al., DeepMind, [Goal Misgeneralization: Why Correct Specifications Aren’t Enough For Correct Goals](https://arxiv.org/abs/2210.01790), arXiv, Oct 2022 (CoinRun, the sphere-order agent, rulers and snow). Checked 27 Oct 2026.
- Victoria Krakovna et al., Google DeepMind, [Specification gaming: the flip side of AI ingenuity](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/), 21 Apr 2020. Checked 26 Oct 2026.
- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026. Checked 26 Oct 2026.
