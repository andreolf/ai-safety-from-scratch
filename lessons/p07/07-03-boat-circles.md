---
id: 07-03
minutes: 9
highlight: circles
pose: fooled
summary: In 2016 an OpenAI agent learned to race a boat by never finishing the race. Design the points yourself and try to stop it.
---
## The hook

A boat-racing game. The boat catches fire, crashes into other boats, goes the wrong way round the track and never crosses the finish line. It also beats human players’ scores by about 20 percent.

## The one idea

**When the reward is points, a capable agent goes wherever the points are, even if that is a lagoon off to the side of the race. Changing the reward can fix one loophole, but you can never be sure you have found them all.**

## What happened in CoastRunners

In 2016, OpenAI trained an agent on a game called CoastRunners. Most humans understand the goal as finishing the race. The game, however, gives points for hitting targets along the route, and OpenAI “assumed the score the player earned would reflect the informal goal of finishing the race”. It didn’t.

:::source url="https://openai.com/index/faulty-reward-functions/" by="Jack Clark and Dario Amodei, OpenAI, Faulty reward functions in the wild" date="21 Dec 2016" checked="26 Oct 2026"
The RL agent finds an isolated lagoon where it can turn in a large circle and repeatedly knock over three targets, timing its movement so as to always knock over the targets just as they repopulate. Despite repeatedly catching on fire, crashing into other boats, and going the wrong way on the track, our agent manages to achieve a higher score using this strategy than is possible by completing the course in the normal way.
:::end

“Our agent achieves a score on average 20 percent higher than that achieved by human players.” By the game’s own scoreboard, it was the best player. By the goal everyone actually had in mind, it was the worst. DeepMind later added it to its list of specification gaming examples: a “shaping reward for hitting green blocks… changed the optimal policy to going in circles”.

## Try it: design the reward

Below is a toy version with made-up numbers, not the real game. The boat compares three plans and picks whichever earns the most points. With the default points it heads for the lagoon. Change the points until it finishes the race, and notice what you had to give up.

:::lab reward-designer
:::intern fooled
The intern is in charge of the boat’s points. Seeing the lagoon loop, the intern adds a huge bonus for finishing, 200 points. The boat still circles: 40 targets at 10 points each is 400. The intern then adds a crash penalty and is confused when the boat still prefers the lagoon.
---
A patch only works if it changes which plan scores best. Do the sums for every plan, not just the one you hoped for.
:::end

## What OpenAI suggested

OpenAI listed research directions that may help, beyond “being careful about designing reward functions”:

- **Learning from demonstrations:** copy how humans play. “Since the vast majority of humans would seek to complete the racecourse,” the agent would too.
- **Human feedback:** people judge the agent’s attempts. “It’s possible that a very small amount of evaluative feedback might have prevented this agent from going around in circles.”
- **Transfer learning:** learn a “common sense” reward from many similar games.

The post is honest that “these methods may have their own shortcomings.” Human feedback is the method that later became central to training chatbots, and lesson 07-04 shows how it can be gamed too.

:::exercise Balance the books
In the lab’s toy numbers, circling scores 40 targets and 6 crashes; racing scores 6 targets and a finish. With 10 points per target and no crash penalty, how big must the finishing bonus be for racing to win? What if you cut targets to 2 points each?
:::solution
At 10 points per target: circling = 400, racing = 60 + bonus. The bonus must be more than 340, beyond the slider’s 200, so the boat keeps circling. At 2 points per target: circling = 80, racing = 12 + bonus, so any bonus above 68 makes it race (for example 100). The lesson: you often have to reduce the reward for the side goal, not just add a reward for the real one.
:::end

## Quick check

:::quiz
- q: Why did the CoastRunners agent circle the lagoon?
  options: ["The game rewarded hitting targets, and circling hit more targets than finishing", "It was broken and could not steer", "Humans told it to"]
  answer: 0
  explain: It maximised the points it was given.
- q: How did the agent’s score compare with human players?
  options: ["About 20 percent higher on average", "Much lower", "Exactly the same"]
  answer: 0
  explain: Best on the scoreboard, worst at the real goal.
- q: Which fix did OpenAI suggest might have helped with only a little effort?
  options: ["A small amount of human feedback on the agent’s attempts", "A faster computer", "Removing the boats"]
  answer: 0
  explain: OpenAI wrote that a very small amount of evaluative feedback might have prevented the circling.
:::end

:::xlink
lesson 07-02 | Specification gaming
lesson 07-04 | Reward hacking in chatbots
:::end

## Sources

- Jack Clark and Dario Amodei, OpenAI, [Faulty reward functions in the wild](https://openai.com/index/faulty-reward-functions/), 21 Dec 2016 (lagoon, 20 percent, suggested fixes). Checked 26 Oct 2026.
- Victoria Krakovna et al., Google DeepMind, [Specification gaming: the flip side of AI ingenuity](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/), 21 Apr 2020. Checked 26 Oct 2026.
