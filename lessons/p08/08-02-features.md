---
id: 08-02
minutes: 8
highlight: features
pose: alarmed
summary: In 2024 Anthropic found millions of “features” inside a model, including one for the Golden Gate Bridge. Turning it up made the model talk about nothing else.
---
The AI researcher Andrej Karpathy puts the starting problem plainly. Training adjusts billions of numbers, called [[term:parameters|parameters]], to predict the next word better:

:::source url="https://www.youtube.com/watch?v=zjkBMFhNj_g&t=710s" by="Andrej Karpathy, Intro to Large Language Models (talk)" date="2023" checked="26 Oct 2026"
So we know how to optimize these parameters, we know how to adjust them over time to get a better next word prediction. But we don't actually really know what these 100 billion parameters are doing. We can measure that it's getting better at next word prediction. But we don't know how these parameters collaborate to actually perform that.
:::end

:::figure black-box
What we can see, and what we can’t.
:::end

He calls language models “mostly inscrutable artifacts”. That matters for control. If a model is faking alignment (lesson 07.06), its answers will look fine. Reading its reasoning helps while the reasoning is honest. Looking at the numbers themselves, **[[term:interpretability|interpretability]]**, is the attempt to see what it is doing whatever it says.

## A bridge inside Claude

For 24 hours in May 2024, anyone could chat with a version of Claude that was obsessed with the Golden Gate Bridge. Asked how to spend $10, it suggested driving across the bridge and paying the toll. Nobody had told it to. Researchers had turned up one [[term:feature|feature]]: a pattern inside the model that activates for one concept.

:::figure feature-steer
Find it, turn it up, see what changes.
:::end

## What Anthropic found

Anthropic’s interpretability team studied its model Claude 3 Sonnet. In the paper *Scaling Monosemanticity* (May 2024), they trained tools that extracted features from the model, in one run about 34 million of them. One responded to the Golden Gate Bridge: its strongest activations “are essentially all references to the bridge”, and weaker ones include “related tourist attractions, similar bridges, and other monuments.” It even fired on pictures of the bridge.

:::source url="https://www.anthropic.com/news/golden-gate-claude" by="Anthropic, Golden Gate Claude" date="23 May 2024" checked="26 Oct 2026"
Not only can we identify these features, we can tune the strength of their activation up or down, and identify corresponding changes in Claude’s behavior. And as we explain in our research paper, when we turn up the strength of the “Golden Gate Bridge” feature, Claude’s responses begin to focus on the Golden Gate Bridge.
:::end

## Why this is different from a prompt

Anthropic stressed that this was not play-acting: “This isn’t a matter of asking the model verbally to do some play-acting, or of adding a new ‘system prompt’… Nor is it traditional ‘fine-tuning’.” It was “a precise, surgical change to some of the most basic aspects of the model’s internal activations.”

Why does a bridge matter for safety? Because the same method finds other features. Anthropic wrote that it can “change the strength of safety-related features—like those related to dangerous computer code, criminal activity, or deception.” If researchers can reliably see a “deception” feature light up, that is a window into the black box that does not depend on what the model says about itself.

## Keep it in proportion

The paper is open about the limits: “we have millions of features”, and “Scaling feature exploration is an important open problem… which we do not solve in this paper.” Finding some features is not the same as understanding the whole model. Interpretability is promising, and it is still early.

## Try it: the Feature Dial

A toy model, with made-up replies inspired by the demo. Turn the dial and watch the answers drift.

:::lab feature-dial
:::intern alarmed
The intern hears about features and gets an idea: “Let’s just find the ‘honesty’ feature, turn it to maximum, and we’re done with AI safety!” The team gently explains that nobody has shown that a single dial like that exists, or that turning one up would fix everything.
---
Features are a research tool, not a magic switch. One working example does not mean every problem has a dial.
:::end

:::exercise Prompt or feature?
Two ways to make a chatbot mention bridges a lot: (a) add “Always talk about bridges” to its instructions; (b) turn up a bridge feature inside it. Give one practical difference between them.
:::solution
(a) changes the input text: anyone who can read the instructions can see it, and the model can be talked out of it. (b) changes the model’s internal activity directly: it doesn’t appear in the prompt at all, and Anthropic found the model kept drifting to the bridge even when it wasn’t relevant. This is why Anthropic called it a change to the model’s internals rather than play-acting.
:::end

## Quick check

:::quiz
- q: What is a “feature” in interpretability research?
  options: ["A pattern inside the model that activates for a particular concept", "A new button in the chatbot app", "A paid add-on"]
  answer: 0
  explain: For example, one that activates for the Golden Gate Bridge, in text or images.
- q: How long was Golden Gate Claude available to the public?
  options: ["24 hours, as a research demo", "Five years", "It was never public"]
  answer: 0
  explain: Anthropic’s update says it was online for a 24-hour period.
- q: Why does this research matter for safety?
  options: ["The same method can find and adjust features linked to things like deception or dangerous code", "It makes models faster", "It replaces all testing"]
  answer: 0
  explain: It offers a possible window into the black box, though it is early research.
:::end

:::xlink
lesson 08-01 | AI control: plan for a model that misbehaves
lesson 08-03 | Evals: exams for AI
:::end

## Sources

- Andrej Karpathy, [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g&t=710s) (talk; parameters from about 11:50, “mostly inscrutable artifacts” at about 13:20). Checked 26 Oct 2026.
- Anthropic, [Golden Gate Claude](https://www.anthropic.com/news/golden-gate-claude), 23 May 2024 (24-hour demo, $10 toll, love story, not play-acting or fine-tuning, safety-related features). Checked 26 Oct 2026.
- Templeton et al., Anthropic, [Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet](https://transformer-circuits.pub/2024/scaling-monosemanticity/), 21 May 2024 (about 34 million features, Golden Gate Bridge feature, open problems). Checked 26 Oct 2026.
