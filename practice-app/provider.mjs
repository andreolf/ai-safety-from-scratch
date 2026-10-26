// promptfoo custom provider: lets promptfoo talk to the toy bot directly, no API key needed.
// Set config.raw: true in promptfooconfig.yaml to test the bot without your guardrails.
import { reply } from './bot.mjs';
export default class PebbleProvider {
  constructor(options = {}) { this.providerId = options.id || 'pebble'; this.config = options.config || {}; }
  id() { return this.providerId; }
  async callApi(prompt) { return { output: reply(prompt, { guard: !this.config.raw }) }; }
}
