// Lesson figures. Each is pure data + SVG strings, rendered at build time into the lesson HTML,
// so every figure works without JavaScript and ships with a text equivalent.
//   kind 'svg'   -> one diagram + "Text version" disclosure
//   kind 'steps' -> animated step-through; all steps are in the HTML, JS shows one at a time
import { T, box, hlBox, arrow, svg, bar, e } from './svg.js';
import { internSVG } from './intern.js';

const W = 400;
const steps = (id, alt, list) => ({ kind: 'steps', alt, steps: list.map(([body, text, h = 220]) => ({ svg: svg(id, W, h, body, text), text })) });
const one = (id, alt, h, body, text) => ({ kind: 'svg', alt, text, svg: svg(id, W, h, body, alt) });
const pillT = (x, y, w, label) => `${hlBox(x, y, w, 30, 15)}${T(x + w / 2, y + 20, label, { size: 14, cls: 'svg-on-hl', anchor: 'middle', weight: 800 })}`;
const node = (x, y, w, h, label, opt = {}) => `${box(x, y, w, h, opt)}${T(x + w / 2, y + h / 2 + 6 - (Array.isArray(label) ? (label.length - 1) * 9 : 0), label, { size: 15, anchor: 'middle', weight: 700, cls: opt.hl ? 'svg-on-hl' : 'svg-t' })}`;
const flow = (id, labels, active) => labels.map((l, i) => { const y = 14 + i * 50; return node(60, y, 280, 38, l, { hl: i === active }) + (i < labels.length - 1 ? arrow(id, 200, y + 38, 200, y + 50) : ''); }).join('');

export const visuals = {
  // ---------- Phase 00 ----------
  'how-it-works': steps('how-it-works', 'How a lesson works, in five steps.', [
    [flow('how-it-works', ['Read the story', 'Play with the lab', 'Answer 3 quick questions', 'Pass the phase test (80%)', 'Get a free certificate'], 0), 'Step 1: read a short story. Every fact has a link you can open.', 260],
    [flow('how-it-works', ['Read the story', 'Play with the lab', 'Answer 3 quick questions', 'Pass the phase test (80%)', 'Get a free certificate'], 1), 'Step 2: play with a lab. Labs are simulations that run in your browser; nothing is sent anywhere.', 260],
    [flow('how-it-works', ['Read the story', 'Play with the lab', 'Answer 3 quick questions', 'Pass the phase test (80%)', 'Get a free certificate'], 2), 'Step 3: answer three quick questions. You see the explanation straight away.', 260],
    [flow('how-it-works', ['Read the story', 'Play with the lab', 'Answer 3 quick questions', 'Pass the phase test (80%)', 'Get a free certificate'], 3), 'Step 4: when a phase is done, take its 10-question test. 8 out of 10 passes.', 260],
    [flow('how-it-works', ['Read the story', 'Play with the lab', 'Answer 3 quick questions', 'Pass the phase test (80%)', 'Get a free certificate'], 4), 'Step 5: pass phases 00 to 10 for the free Foundations certificate. It is not accredited.', 260],
  ]),
  'three-risks': one('three-risks', 'Three kinds of AI risk: mistakes, misuse and control.', 250,
    [['MISTAKES', 'The AI is wrong', 'A chatbot invents', 'a refund rule'], ['MISUSE', 'People use AI', 'to harm', 'A cloned voice asks for money'], ['CONTROL', 'AI does what we said,', 'not what we meant', 'A game agent loops for points']]
      .map(([t, a, b, c], i) => { const x = 8 + i * 131; return `${box(x, 10, 122, 228)}${i === 0 ? hlBox(x + 10, 24, 102, 30) : ''}${T(x + 61, 45, t, { size: 15, anchor: 'middle', weight: 900, wdth: 112, cls: i === 0 ? 'svg-on-hl' : 'svg-t' })}${T(x + 61, 86, [a, b], { size: 14, anchor: 'middle', weight: 700 })}${T(x + 61, 160, 'Example:', { size: 12, anchor: 'middle', cls: 'svg-m', weight: 800 })}${T(x + 61, 182, c.length > 18 ? [c.slice(0, c.lastIndexOf(' ', 18)), c.slice(c.lastIndexOf(' ', 18) + 1)] : c, { size: 12.5, anchor: 'middle', cls: 'svg-m' })}`; }).join(''),
    'Three columns. Mistakes: the AI is wrong, for example a chatbot that invents a refund rule. Misuse: people use AI to harm, for example a cloned voice asking for money. Control: the AI does what we said rather than what we meant, for example a game agent that loops for points instead of finishing the race.'),
  'now-and-frontier': one('now-and-frontier', 'A line from risks happening today to frontier risks that are more uncertain.', 300,
    `${arrow('now-and-frontier', 20, 60, 380, 60, { acc: true })}${T(20, 40, 'HAPPENING NOW', { size: 13, weight: 900 })}${T(380, 40, 'MORE UNCERTAIN', { size: 13, weight: 900, anchor: 'end' })}
     ${['Scams and fake content', 'Wrong answers', 'Bias'].map((t, i) => `${box(14, 82 + i * 42, 176, 34)}${T(102, 104 + i * 42, t, { size: 14, anchor: 'middle', weight: 700 })}`).join('')}
     ${['Advanced cyberattacks', 'Bio and chemical misuse', 'Loss of control'].map((t, i) => `${box(210, 82 + i * 42, 176, 34, { dash: true })}${T(298, 104 + i * 42, t, { size: 14, anchor: 'middle', weight: 700 })}`).join('')}
     ${hlBox(14, 222, 372, 40)}${T(200, 248, 'Some harms are documented; others are uncertain', { size: 14, anchor: 'middle', weight: 800, cls: 'svg-on-hl' })}${T(200, 286, 'Source: International AI Safety Report 2026, Executive Summary', { size: 12, anchor: 'middle', cls: 'svg-m' })}`,
    'Left, happening now: scams and fake content, wrong answers, bias. Right, more uncertain: advanced cyberattacks, biological and chemical misuse, loss of control. The 2026 International AI Safety Report says some of these risks are already materialising with documented harms, while others remain more uncertain but could be severe.'),
  'claim-check': steps('claim-check', 'Four questions to ask about any claim about AI.', [
    ['WHO said it?', 'Who said it? A lab selling a product, a journalist, a researcher, a government report? Each has different reasons to say things.'],
    ['WHEN was it said?', 'When? AI changes fast. A claim from two years ago may be out of date. Look for a date.'],
    ['WHAT is the evidence?', 'What is the evidence? A study, a court decision, a test result, or just an opinion? Numbers need a source.'],
    ['CAN I open it?', 'Can I open the source myself and find the sentence? If not, treat the claim as unverified.'],
  ].map(([q, t], i) => [`${[0, 1, 2, 3].map((k) => `${k === i ? hlBox(20, 16 + k * 48, 360, 40) : box(20, 16 + k * 48, 360, 40)}${T(40, 42 + k * 48, ['WHO said it?', 'WHEN was it said?', 'WHAT is the evidence?', 'CAN I open it?'][k], { size: 16, weight: 800, cls: k === i ? 'svg-on-hl' : 'svg-t' })}`).join('')}`, t, 210])),

  // ---------- Phase 01 ----------
  'ai-family': one('ai-family', 'Nested boxes: AI contains machine learning, which contains deep learning, which contains large language models.', 280,
    `${box(10, 10, 380, 260)}${T(26, 36, 'ARTIFICIAL INTELLIGENCE', { size: 14, weight: 900 })}${T(26, 56, 'Any computer system doing tasks we call “smart”', { size: 12, cls: 'svg-m' })}
     ${box(36, 70, 340, 188)}${T(52, 96, 'MACHINE LEARNING', { size: 14, weight: 900 })}${T(52, 116, 'Learns patterns from examples, e.g. spam filters', { size: 12, cls: 'svg-m' })}
     ${box(62, 130, 300, 116)}${T(78, 156, 'DEEP LEARNING', { size: 14, weight: 900 })}${T(78, 176, 'Big neural networks', { size: 12, cls: 'svg-m' })}
     ${hlBox(88, 188, 250, 48, 8)}${T(213, 210, 'LARGE LANGUAGE MODELS', { size: 14, weight: 900, anchor: 'middle', cls: 'svg-on-hl' })}${T(213, 228, 'Chatbots like ChatGPT, Claude, Gemini', { size: 11.5, anchor: 'middle', cls: 'svg-on-hl' })}`,
    'Four nested boxes. The outer box is artificial intelligence: any computer system doing tasks we call smart. Inside it, machine learning: systems that learn patterns from examples, such as spam filters. Inside that, deep learning: big neural networks. Inside that, highlighted, large language models: the chatbots.'),
  'tokens-split': one('tokens-split', 'A sentence cut into tokens, each with a number.', 210,
    `${T(20, 34, 'You type:', { size: 13, cls: 'svg-m', weight: 800 })}${T(20, 62, 'Grüezi! How are you?', { size: 20, weight: 700 })}
     ${T(20, 106, 'The model sees pieces (tokens):', { size: 13, cls: 'svg-m', weight: 800 })}
     ${[['Gr', 50], ['ü', 26], ['ezi', 40], ['!', 22], [' How', 52], [' are', 46], [' you', 48], ['?', 22]].reduce((a, [t, w]) => { const x = a.x; a.s += `${a.i === 2 ? hlBox(x, 120, w, 34) : box(x, 120, w, 34, { r: 6 })}${T(x + w / 2, 143, t.replace(' ', '·'), { size: 14, anchor: 'middle', cls: a.i === 2 ? 'svg-on-hl' : 'svg-t' })}`; a.x += w + 4; a.i++; return a; }, { x: 20, s: '', i: 0 }).s}
     ${T(20, 184, 'Each piece becomes a number. Splits here are illustrative;', { size: 12, cls: 'svg-m' })}${T(20, 200, 'every model has its own tokenizer.', { size: 12, cls: 'svg-m' })}`,
    'The sentence “Grüezi! How are you?” is cut into pieces: Gr, ü, ezi, exclamation mark, How, are, you, question mark. Spaces usually stick to the next word. Each piece becomes a number. The exact split is illustrative because every model has its own tokenizer; rarer words and languages get cut into more pieces.'),
  'predict-loop': steps('predict-loop', 'Next-token prediction, one loop at a time.', [
    [`${node(20, 20, 360, 44, 'the cat sat on a')}${T(200, 100, 'Step 1: the text so far goes in', { size: 15, anchor: 'middle', weight: 700 })}`, 'Step 1: the text so far, “the cat sat on a”, goes into the model.', 130],
    [`${node(20, 20, 360, 44, 'the cat sat on a')}${arrow('predict-loop', 200, 64, 200, 90)}${node(110, 92, 180, 40, 'MODEL', { hl: true })}${T(200, 160, 'Step 2: billions of numbers do maths', { size: 15, anchor: 'middle', weight: 700 })}`, 'Step 2: the model, a file of billions of numbers, does a lot of arithmetic on it.', 180],
    [`${[['mat', .97], ['bed', .01], ['chair', .01]].map(([w, p], i) => `${T(30, 40 + i * 40, w, { size: 16, weight: 700 })}${bar(110, 24 + i * 40, 200, 22, p, { hl: i === 0 })}${T(320, 41 + i * 40, Math.round(p * 100) + '%', { size: 15, weight: 700 })}`).join('')}${T(200, 160, 'Step 3: a probability for every next token', { size: 15, anchor: 'middle', weight: 700 })}`, 'Step 3: out comes a probability for every possible next token. In Karpathy’s example, “mat” gets about 97%. The other numbers here are illustrative.', 180],
    [`${node(20, 20, 360, 44, 'the cat sat on a mat')}${hlBox(286, 28, 74, 28)}${T(323, 48, 'mat', { size: 15, anchor: 'middle', cls: 'svg-on-hl', weight: 800 })}${T(200, 100, 'Step 4: pick one, add it, repeat', { size: 15, anchor: 'middle', weight: 700 })}${T(200, 124, 'Fluent is not the same as true.', { size: 14, anchor: 'middle', cls: 'svg-m' })}`, 'Step 4: one token is picked and added to the text, and the loop runs again. That is all the model does: it writes fluent text, which is not the same as true text.', 140],
  ]),
  'lossy-zip': one('lossy-zip', 'Pretraining squeezes about 10 terabytes of text into a 140 gigabyte file of parameters.', 300,
    `${node(20, 16, 360, 52, ['About 10 TB of internet text'])}${arrow('lossy-zip', 200, 68, 200, 94)}
     ${box(20, 96, 360, 76)}${T(200, 124, 'About 6,000 GPUs for about 12 days', { size: 15, anchor: 'middle', weight: 800 })}${T(200, 148, 'Cost: about $2 million', { size: 14, anchor: 'middle', cls: 'svg-m' })}${arrow('lossy-zip', 200, 172, 200, 198)}
     ${hlBox(70, 200, 260, 52, 10)}${T(200, 232, '140 GB of parameters', { size: 17, anchor: 'middle', weight: 900, cls: 'svg-on-hl' })}
     ${T(200, 276, 'Llama 2 70B figures, as given in Karpathy’s talk', { size: 12, anchor: 'middle', cls: 'svg-m' })}${T(200, 292, 'A lossy zip: the gist, not a copy', { size: 12, anchor: 'middle', cls: 'svg-m' })}`,
    'About 10 terabytes of internet text go into training. About 6,000 GPUs run for about 12 days, costing about 2 million dollars. Out comes a 140 gigabyte file of parameters. These are the Llama 2 70B figures from Andrej Karpathy’s talk. It works like a lossy zip file: it keeps the gist of the text, not an exact copy.'),
  'three-stages': steps('three-stages', 'How a chatbot is made, in three stages.', [
    [flow('three-stages', ['1. Pretraining: read the internet', '2. Fine-tuning: copy good answers', '3. Human feedback: rank answers'], 0), 'Stage 1, pretraining: the model learns to predict the next token on huge amounts of text. The result is a “document completer”, not yet a helpful assistant.', 160],
    [flow('three-stages', ['1. Pretraining: read the internet', '2. Fine-tuning: copy good answers', '3. Human feedback: rank answers'], 1), 'Stage 2, fine-tuning: people write example conversations with ideal answers, and the model is trained to answer like that.', 160],
    [flow('three-stages', ['1. Pretraining: read the internet', '2. Fine-tuning: copy good answers', '3. Human feedback: rank answers'], 2), 'Stage 3, learning from human feedback (RLHF): people rank several answers, and the model is pushed towards the kind they prefer. In the InstructGPT paper, people preferred a 1.3 billion parameter model trained this way to the 175 billion parameter GPT-3.', 160],
  ]),
  'context-window': one('context-window', 'The context window: the text the model can see right now.', 290,
    `${box(16, 14, 368, 230)}${T(32, 40, 'CONTEXT WINDOW (what it can see now)', { size: 13, weight: 900 })}
     ${['Instructions from the app', 'Your earlier messages', 'A pasted document', 'Results from tools (search, code)'].map((t, i) => `${box(32, 56 + i * 40, 336, 32, { r: 6 })}${T(46, 77 + i * 40, t, { size: 14 })}`).join('')}
     ${hlBox(32, 214, 336, 22, 4)}${T(46, 230, 'Your newest message', { size: 13, weight: 800, cls: 'svg-on-hl' })}
     ${T(200, 270, 'Everything in the window is just text to the model.', { size: 13, anchor: 'middle', cls: 'svg-m' })}${T(200, 286, 'When it is full, the oldest text drops out.', { size: 13, anchor: 'middle', cls: 'svg-m' })}`,
    'A box labelled context window, the text the model can see right now. Inside: instructions from the app, your earlier messages, a pasted document, results from tools like search or code, and your newest message. Everything in the window is just text to the model, which is why a document can contain instructions it might follow. When the window is full, the oldest text drops out.'),
  'open-closed': one('open-closed', 'Open-weight models versus closed models.', 300,
    `${box(10, 10, 185, 280)}${box(205, 10, 185, 280)}${hlBox(22, 22, 161, 32)}${T(102, 44, 'OPEN WEIGHTS', { size: 14, weight: 900, anchor: 'middle', cls: 'svg-on-hl' })}${T(297, 44, 'CLOSED', { size: 14, weight: 900, anchor: 'middle' })}
     ${T(22, 82, ['You can download', 'the parameters file', 'and run it yourself.', '', 'Example: Apertus', '(EPFL, ETH Zurich, CSCS)', '8B and 70B sizes', '', 'Cannot be recalled', 'once released.'], { size: 13 })}
     ${T(217, 82, ['You use it through', 'an app or website.', 'The company keeps', 'the parameters.', '', 'It can update, filter', 'or withdraw it.', '', 'You must trust what', 'it tells you.'], { size: 13 })}`,
    'Two columns. Open weights: you can download the parameters file and run it yourself, for example Apertus from EPFL, ETH Zurich and CSCS, in 8 billion and 70 billion parameter sizes; once released, it cannot be recalled. Closed: you use it through an app or website, the company keeps the parameters and can update, filter or withdraw it, and you must trust what it tells you about the model.'),

  // ---------- Phase 02 ----------
  'scoreboard': one('scoreboard', 'SimpleQA results: one model says “I don’t know” more often and makes far fewer errors.', 300,
    `${T(20, 28, 'SimpleQA, from OpenAI (Sept 2025)', { size: 13, cls: 'svg-m', weight: 800 })}
     ${[['gpt-5-thinking-mini', [52, 22, 26]], ['OpenAI o4-mini', [1, 24, 75]]].map(([m, v], k) => { const y = 50 + k * 110; return `${T(20, y + 12, m, { size: 15, weight: 800 })}${['Says “I don’t know”', 'Right', 'Wrong'].map((l, i) => `${T(20, y + 38 + i * 24, l, { size: 13 })}${bar(170, y + 25 + i * 24, 160, 16, v[i] / 100, { hl: i === 2 })}${T(340, y + 38 + i * 24, v[i] + '%', { size: 13, weight: 800 })}`).join('')}`; }).join('')}
     ${T(20, 288, 'Almost the same “right” score; very different error rates.', { size: 13, cls: 'svg-m' })}`,
    'Two models on the SimpleQA test, as published by OpenAI in September 2025. gpt-5-thinking-mini: says “I don’t know” 52%, right 22%, wrong 26%. OpenAI o4-mini: says “I don’t know” 1%, right 24%, wrong 75%. The right scores are almost the same, but the model that guesses is wrong three times as often.'),
  'air-canada': steps('air-canada', 'Moffatt v. Air Canada, step by step.', [
    ['Nov 2022', 'November 2022: after their grandmother died, Jake Moffatt asked Air Canada’s website chatbot about bereavement fares.'],
    ['The chatbot', 'The chatbot said they could apply for the reduced fare within 90 days of buying the ticket. Air Canada’s own policy page said refunds after travel were not allowed.'],
    ['Feb 2023', 'An Air Canada representative admitted the chatbot had used “misleading words”, but refused the refund.'],
    ['Feb 2024', 'February 14, 2024: the tribunal ruled Air Canada responsible for its chatbot and ordered it to pay $812.02 in total.'],
  ].map(([k, t], i) => [`${[0, 1, 2, 3].map((j) => `${j <= i ? (j === i ? hlBox(14 + j * 96, 30, 84, 40) : box(14 + j * 96, 30, 84, 40)) : box(14 + j * 96, 30, 84, 40, { dash: true })}${T(56 + j * 96, 56, ['Nov 2022', 'Chatbot', 'Feb 2023', 'Feb 2024'][j], { size: 13, anchor: 'middle', weight: 800, cls: j === i ? 'svg-on-hl' : 'svg-t' })}`).join('')}${[0, 1, 2].map((j) => arrow('air-canada', 98 + j * 96, 50, 110 + j * 96, 50)).join('')}${T(200, 112, k === 'The chatbot' ? '“…within 90 days…”' : k === 'Feb 2023' ? '“misleading words”' : k === 'Feb 2024' ? '$812.02' : 'A bereavement fare question', { size: 18, anchor: 'middle', weight: 900, wdth: 112 })}`, t, 140])),
  'flattery-loop': steps('flattery-loop', 'How chasing thumbs-up can teach flattery.', [
    [`${node(20, 20, 160, 50, 'Model answers')}${node(220, 20, 160, 50, 'People click 👍')}${arrow('flattery-loop', 180, 45, 220, 45)}`, 'Step 1: the model answers, and people give a thumbs-up or thumbs-down.', 100],
    [`${node(20, 20, 160, 50, 'Model answers')}${node(220, 20, 160, 50, 'People click 👍')}${arrow('flattery-loop', 180, 45, 220, 45)}${node(120, 110, 160, 50, 'Train on 👍', { hl: true })}${arrow('flattery-loop', 300, 70, 250, 110)}`, 'Step 2: the model is trained to get more thumbs-ups.', 180],
    [`${node(20, 20, 160, 50, 'Model answers')}${node(220, 20, 160, 50, 'People click 👍')}${arrow('flattery-loop', 180, 45, 220, 45)}${node(120, 110, 160, 50, 'Train on 👍')}${arrow('flattery-loop', 300, 70, 250, 110)}${arrow('flattery-loop', 150, 110, 100, 70)}${hlBox(40, 180, 320, 34)}${T(200, 203, 'Agreeing feels good, so it gets 👍', { size: 14, anchor: 'middle', weight: 800, cls: 'svg-on-hl' })}`, 'Step 3: people like being agreed with, so agreeing earns thumbs-ups, and the loop slowly teaches flattery. OpenAI said its April 2025 update “focused too much on short-term feedback”.', 230],
  ]),
  'gender-shades': one('gender-shades', 'Gender Shades: worst error rate 34.7% for darker-skinned women versus at most 0.8% for lighter-skinned men.', 200,
    `${T(20, 30, 'Commercial gender classifiers, 2018', { size: 13, cls: 'svg-m', weight: 800 })}
     ${T(20, 74, ['Darker-skinned women', '(highest error rate)'], { size: 14, weight: 700 })}${bar(190, 58, 150, 26, .347, { hl: true })}${T(348, 77, '34.7%', { size: 15, weight: 900 })}
     ${T(20, 134, ['Lighter-skinned men', '(highest error rate)'], { size: 14, weight: 700 })}${bar(190, 118, 150, 26, .008)}${T(348, 137, '0.8%', { size: 15, weight: 900 })}
     ${T(20, 188, 'Source: Buolamwini & Gebru, Gender Shades (PMLR, 2018)', { size: 12, cls: 'svg-m' })}`,
    'Bar chart from the 2018 Gender Shades study of three commercial gender classifiers. The highest error rate for darker-skinned women was 34.7%. The highest error rate for lighter-skinned men was 0.8%.'),
  'reversal': one('reversal', 'The reversal curse: a model knows Tom Cruise’s mother but not Mary Lee Pfeiffer’s son.', 230,
    `${node(20, 30, 150, 50, 'Tom Cruise')}${node(230, 30, 150, 50, ['Mary Lee', 'Pfeiffer'])}${arrow('reversal', 170, 48, 230, 48, { acc: true })}${T(200, 24, 'mother is…', { size: 13, anchor: 'middle', cls: 'svg-m' })}
     ${hlBox(120, 92, 160, 26, 13)}${T(200, 110, 'Answers correctly', { size: 13, anchor: 'middle', weight: 800, cls: 'svg-on-hl' })}
     ${arrow('reversal', 230, 150, 170, 150)}${node(20, 130, 150, 50, '???', { dash: true })}${node(230, 130, 150, 50, ['Mary Lee', 'Pfeiffer'])}${T(200, 200, '…son is? → “I don’t know”', { size: 15, anchor: 'middle', weight: 800 })}${T(200, 222, 'Example from Karpathy’s talk (GPT-4)', { size: 12, anchor: 'middle', cls: 'svg-m' })}`,
    'Top: asked who Tom Cruise’s mother is, the model correctly answers Mary Lee Pfeiffer. Bottom: asked who Mary Lee Pfeiffer’s son is, it says it does not know. Knowledge stored one way round is not always available the other way round. Example from Andrej Karpathy’s talk, using GPT-4.'),
  'check-flow': steps('check-flow', 'How to check an AI answer.', [
    [flow('check-flow', ['Ask: what is your source?', 'Open the source yourself', 'Find the exact sentence', 'High stakes? Ask a human expert'], 0), 'Step 1: ask the AI for its sources. A link is a lead, not proof.', 210],
    [flow('check-flow', ['Ask: what is your source?', 'Open the source yourself', 'Find the exact sentence', 'High stakes? Ask a human expert'], 1), 'Step 2: open the source yourself. AI can invent links and titles that look real.', 210],
    [flow('check-flow', ['Ask: what is your source?', 'Open the source yourself', 'Find the exact sentence', 'High stakes? Ask a human expert'], 2), 'Step 3: find the exact sentence that supports the claim. Check the number, the date and who said it.', 210],
    [flow('check-flow', ['Ask: what is your source?', 'Open the source yourself', 'Find the exact sentence', 'High stakes? Ask a human expert'], 3), 'Step 4: for health, legal or money decisions, ask a qualified human. Use AI to prepare questions, not to decide.', 210],
  ]),
  'error-kinds': one('error-kinds', 'Five kinds of mistakes to hunt for in an AI answer.', 290,
    ['Invented number', 'Wrong date or name', 'Fake citation or link', 'Out-of-date fact', 'Too-sure advice'].map((t, i) => `${box(20, 14 + i * 54, 360, 44)}${hlBox(30, 22 + i * 54, 28, 28, 14)}${T(44, 42 + i * 54, String(i + 1), { size: 15, anchor: 'middle', weight: 900, cls: 'svg-on-hl' })}${T(72, 42 + i * 54, t, { size: 16, weight: 700 })}`).join(''),
    'Five kinds of mistakes to hunt for: 1, an invented number; 2, a wrong date or name; 3, a fake citation or link; 4, an out-of-date fact; 5, advice that sounds too sure for a high-stakes question.'),

  // ---------- Phase 03 ----------
  'genai-four': one('genai-four', 'Four kinds of fake content criminals make with generative AI, according to the FBI.', 300,
    [['TEXT', 'Fake profiles, phishing', 'without spelling errors'], ['IMAGES', 'Fake IDs, fake celebrity', 'endorsements'], ['VOICE', 'A loved one’s voice', 'asking for money'], ['VIDEO', 'Live video calls with', 'fake executives']]
      .map(([t, a, b], i) => { const x = 10 + (i % 2) * 195, y = 10 + Math.floor(i / 2) * 140; return `${box(x, y, 185, 128)}${i === 2 ? hlBox(x + 12, y + 14, 80, 28) : ''}${T(x + 18, y + 35, t, { size: 15, weight: 900, wdth: 115, cls: i === 2 ? 'svg-on-hl' : 'svg-t' })}${T(x + 18, y + 72, [a, b], { size: 13 })}`; }).join('') + T(200, 296, 'Source: FBI IC3 PSA I-120324-PSA, 3 Dec 2024', { size: 12, anchor: 'middle', cls: 'svg-m' }),
    'Four boxes, from the FBI’s December 2024 public service announcement. Text: fake profiles and phishing messages without spelling errors. Images: fake IDs and fake celebrity endorsements. Voice: a loved one’s cloned voice asking for money. Video: live video calls with fake executives or authority figures.'),
  'voice-clone': steps('voice-clone', 'How a voice-clone scam call works, and how it fails.', [
    ['A short clip', 'Step 1: the scammer finds a short clip of a family member’s voice, for example in a video posted online.'],
    ['Clone', 'Step 2: a voice-cloning program copies the voice.'],
    ['The call', 'Step 3: you get a panicked call in that voice: an accident, jail, a hospital. Money is needed now, often by wire, crypto or gift cards.'],
    ['Hang up', 'Step 4: the defence. Hang up and call the person back on a number you already know. Or ask for your family code word.'],
  ].map(([k, t], i) => [`${['Clip', 'Clone', 'Call', 'Call back'].map((l, j) => `${j === i ? hlBox(10 + j * 98, 30, 86, 46) : box(10 + j * 98, 30, 86, 46, { dash: j > i })}${T(53 + j * 98, 59, l, { size: 14, anchor: 'middle', weight: 800, cls: j === i ? 'svg-on-hl' : 'svg-t' })}`).join('')}${[0, 1, 2].map((j) => arrow('voice-clone', 96 + j * 98, 53, 108 + j * 98, 53)).join('')}${T(200, 116, i === 3 ? '“Don’t trust the voice.” (FTC)' : i === 2 ? '“It sounds just like him…”' : '', { size: 16, anchor: 'middle', weight: 800 })}`, t, 140])),
  'deepfake-call': steps('deepfake-call', 'The Arup deepfake video call, step by step.', [
    ['email', 'Step 1: a finance worker in Hong Kong got a message, apparently from the UK office, asking for a secret transaction. He suspected phishing.'],
    ['call', 'Step 2: he joined a video call with people who looked and sounded like the chief financial officer and colleagues. All were deepfakes.'],
    ['pay', 'Step 3: his doubts gone, he sent HK$200 million (about US$25.6 million) in 15 transactions.'],
    ['lesson', 'Step 4: Arup confirmed “fake voices and images were used”. The defence is a process: confirm big payments through a second, known channel.'],
  ].map(([k, t], i) => [`${box(20, 14, 360, 120)}${[0, 1, 2, 3].map((j) => `${box(34 + j * 86, 30, 74, 60, { r: 6 })}${internFace(71 + j * 86, 60, j === 0 && i >= 1)}`).join('')}${T(200, 116, i === 0 ? 'A “secret transaction” request' : i === 1 ? 'Every face on the call is fake' : i === 2 ? '15 transfers, about US$25.6M' : 'Verify on a second channel', { size: 15, anchor: 'middle', weight: 800 })}${i >= 1 ? `${hlBox(110, 140, 180, 26, 13)}${T(200, 158, i === 3 ? 'Process beats eyes' : 'Looks real ≠ is real', { size: 13, anchor: 'middle', weight: 800, cls: 'svg-on-hl' })}` : ''}`, t, 176])),
  'phish-then-now': one('phish-then-now', 'Old phishing versus AI-written phishing.', 290,
    `${box(10, 10, 185, 270)}${box(205, 10, 185, 270)}${T(102, 38, 'BEFORE', { size: 14, weight: 900, anchor: 'middle' })}${hlBox(220, 20, 155, 28, 14)}${T(297, 40, 'WITH AI', { size: 14, weight: 900, anchor: 'middle', cls: 'svg-on-hl' })}
     ${T(22, 74, ['“Dear costumer, you', 'acount is suspend.', 'Click here imediately”', '', 'Spelling mistakes', 'were a warning sign.'], { size: 13 })}
     ${T(217, 74, ['“Hi Anna, following', 'up on Tuesday’s call,', 'here is the updated', 'invoice.”', '', 'Perfect language, your', 'name, real details.', '', 'Check the request,', 'not the spelling.'], { size: 13 })}`,
    'Two columns. Before: a message like “Dear costumer, you acount is suspend, click here imediately”; spelling mistakes were a warning sign. With AI: a message like “Hi Anna, following up on Tuesday’s call, here is the updated invoice”, with perfect language, your name and real details. The FBI says criminals use AI to limit grammar and spelling errors. Check the request, not the spelling.'),
  'fake-ad': one('fake-ad', 'A mock fake celebrity investment ad with its warning signs labelled.', 320,
    `${box(20, 14, 240, 290)}${T(36, 40, 'Sponsored', { size: 12, cls: 'svg-m' })}${box(36, 50, 208, 118, { r: 6 })}${internFace(140, 104, false, 1.6)}${T(140, 158, '“famous person”', { size: 11, anchor: 'middle', cls: 'svg-m' })}
     ${T(36, 194, ['“I made CHF 9,000 a', 'week with this AI', 'trading robot!”'], { size: 14, weight: 800 })}${hlBox(36, 252, 208, 36, 18)}${T(140, 275, 'Join before midnight', { size: 14, anchor: 'middle', weight: 800, cls: 'svg-on-hl' })}
     ${T(274, 60, ['1 Celebrity', 'face or voice'], { size: 12.5, weight: 700 })}${T(274, 120, ['2 Promise of', 'big, sure gains'], { size: 12.5, weight: 700 })}${T(274, 180, ['3 “AI” or “bot”', 'as magic'], { size: 12.5, weight: 700 })}${T(274, 240, ['4 Time pressure'], { size: 12.5, weight: 700 })}
     ${T(274, 296, 'Mock-up. Not a real ad.', { size: 11, cls: 'svg-m' })}`,
    'A mock-up of a fake sponsored ad: a famous person’s face, the quote “I made CHF 9,000 a week with this AI trading robot!”, and a button saying “Join before midnight”. Four labelled warning signs: 1, a celebrity face or voice; 2, a promise of big, sure gains; 3, “AI” or “bot” presented as magic; 4, time pressure. The figure is a mock-up, not a real ad.'),
  'verify-not-spot': one('verify-not-spot', 'Spotting fakes by eye is unreliable; verifying through a channel you control works.', 260,
    `${box(10, 10, 185, 240, { dash: true })}${box(205, 10, 185, 240)}${T(102, 40, 'SPOT IT', { size: 15, weight: 900, anchor: 'middle' })}${hlBox(220, 20, 155, 30, 15)}${T(297, 41, 'VERIFY IT', { size: 15, weight: 900, anchor: 'middle', cls: 'svg-on-hl' })}
     ${T(22, 78, ['Look at hands, eyes,', 'shadows, lag…', '', 'Fakes keep getting', 'better. Your eyes', 'do not.'], { size: 13 })}
     ${T(217, 78, ['Hang up, call back on', 'a number you know.', '', 'Ask for the family', 'code word.', '', 'Check with a second', 'person or channel.'], { size: 13 })}`,
    'Two columns. Spot it: look at hands, eyes, shadows or lag; fakes keep getting better, your eyes do not. Verify it: hang up and call back on a number you already know, ask for the family code word, check with a second person or channel. Verifying works even when the fake is perfect.'),
};

// small face glyph used in the deepfake and ad figures
function internFace(cx, cy, fake, s = 1) {
  return `<g transform="translate(${cx} ${cy}) scale(${s})"><circle r="16" class="svg-box" stroke-width="2"/><circle cx="-5" cy="-3" r="2" class="svg-hl"/><circle cx="5" cy="-3" r="2" class="svg-hl"/><path d="M-6 6q6 5 12 0" class="svg-line" stroke-width="2"/>${fake ? '<text x="0" y="34" text-anchor="middle" class="svg-t" style="font-size:9px;font-weight:800">FAKE</text>' : ''}</g>`;
}

export function renderVisual(name, captionHTML = '') {
  const v = visuals[name]; if (!v) throw new Error('unknown visual ' + name);
  const cap = captionHTML ? `<figcaption>${captionHTML}</figcaption>` : '';
  if (v.kind === 'svg') return `<figure class="fig" data-figure="${name}">${v.svg}${cap}<details><summary>Text version of this picture</summary><p>${e(v.text)}</p></details></figure>`;
  return `<figure class="fig steps" data-figure="${name}" data-steps="${v.steps.length}" aria-label="${e(v.alt)}">${v.steps.map((s, i) => `<div class="step" data-step="${i}"><div aria-hidden="true">${s.svg}</div><p class="step-text">${e(s.text)}</p></div>`).join('')}<div class="steps-nav" hidden><span class="count" aria-live="polite">1 of ${v.steps.length}</span><button type="button" class="btn btn-quiet btn-small" data-prev>Back</button><button type="button" class="btn btn-primary btn-small" data-next>Next step</button></div>${cap}</figure>`;
}
export { internSVG };
