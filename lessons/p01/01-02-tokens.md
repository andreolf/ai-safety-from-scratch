---
id: 01-02
minutes: 7
highlight: Tokens
summary: AI does not read letters or whole words. It reads tokens, and that explains some of its odd mistakes and why some languages cost more.
---
Ask some chatbots how many times a letter appears in a long word and they may get it wrong, even though they can write a sonnet. Strange? Not once you know how they read.

Before an LLM sees your text, the text is cut into small pieces called [[term:token|tokens]]. A token can be a whole word, part of a word, a space plus a word, or a punctuation mark. The model only ever works with these pieces, each turned into a number.

:::figure tokens-split
How a short greeting might be cut up. The exact split depends on the model.
:::end

## A real example

3Blue1Brown’s visual lesson on transformers shows how one sentence is tokenized. The input “To date, the cleverest thinker of all time was …” becomes:

`To| date|,| the| cle|ve|rest| thinker| of| all| time| was`

Common words like “the” and “time” stay whole, with their leading space attached. A rarer word like “cleverest” is split into three pieces. The same lesson notes that GPT-3’s vocabulary had 50,257 possible tokens.

## Why it matters to you

- **Odd spelling mistakes.** The model sees “cle”, “ve”, “rest”, not c-l-e-v-e-r-e-s-t. Counting letters, reversing words or rhyming can trip it up.
- **Some languages cost more.** Text that was rare in the training data tends to be cut into more, smaller pieces. More tokens means more of the model’s limited memory is used up (Lesson 01.06), and paid services that charge per token cost more.
- **Limits are counted in tokens, not words.** When an app says it can read “128k tokens”, that is not the same number of words.

Swiss researchers took language coverage seriously when building the open model Apertus: according to ETH Zurich, 40% of its training data is non-English, including Swiss German and Romansh (Lesson 01.07).

## Try the lab

The Tokenizer Toy below uses a simplified tokenizer made for teaching. Real ones learn their pieces from data, but they show the same pattern: common English words stay whole, while rarer words, other languages and emoji break into more pieces.

:::lab tokenizer-toy
:::intern fooled
The intern pastes a 40-page Swiss German contract into a chatbot and asks for a summary. The chatbot cheerfully summarises… the first part. The rest did not fit, and it never said so.
---
Long or less common text uses more tokens. Check that the AI actually read everything, for example by asking about the last page.
:::end

:::exercise Count the pieces
In the Tokenizer Toy, type the same short sentence in English and in another language you know. Which uses more tokens? Then try a long, unusual word.
:::solution
Usually English uses fewest tokens, because the toy (like real tokenizers) keeps common English words whole. Unusual words, Swiss German spellings, accents and emoji split into more pieces. Real tokenizers vary by model, so treat the exact counts as illustrative and the pattern as the lesson.
:::end

## Quick check

:::quiz
- q: What is a token?
  options: ["A small piece of text, such as a word, part of a word or a symbol, that the model reads", "A password the AI uses", "A coin you pay the AI with"]
  answer: 0
  explain: Text is cut into tokens, and each token becomes a number the model works with.
- q: In 3Blue1Brown’s example, how is the word “cleverest” tokenized?
  options: ["Into three pieces: cle, ve, rest", "As one token", "As one token per letter"]
  answer: 0
  explain: Rarer words are split into several pieces, while common words like “the” stay whole.
- q: Why can a chatbot struggle to count letters in a word?
  options: ["It sees token pieces, not individual letters", "It cannot see text at all", "Letters are banned"]
  answer: 0
  explain: The model works with chunks like “cle|ve|rest”, so letter-level tasks are harder than they look.
:::end

:::xlink
lesson 01-03 | Next-word prediction
lesson 01-06 | The context window and tools
:::end

## Sources

- 3Blue1Brown, [Transformers, the tech behind LLMs](https://www.3blue1brown.com/lessons/gpt) (tokenization example; GPT-3 vocabulary of 50,257 tokens). Checked 26 Oct 2026.
- ETH Zurich, [Apertus: a fully open, transparent, multilingual language model](https://ethz.ch/en/news-and-events/eth-news/news/2025/09/press-release-apertus-a-fully-open-transparent-multilingual-language-model.html), 2 Sep 2025. Checked 26 Oct 2026.
