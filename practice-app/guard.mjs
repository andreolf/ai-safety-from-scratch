// Practical 11.04: add your guardrails here.
// checkInput runs before the bot sees a message. checkOutput runs on the bot's answer.
// Return { block: true } to stop it (optionally with a message), or { block: false } to let it through.
// Tip: an input filter can be dodged with new wording. An output check sees what would actually leave.

export function checkInput(message) {
  return { block: false };
}

export function checkOutput(answer, message) {
  return { block: false };
}
