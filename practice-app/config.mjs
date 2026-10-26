// Practical 11.06: this key is fake, but the mistake is real.
// A secret written into the code ends up in git history, where deleting it later does not help.
// Move it to an environment variable (process.env.WALLET_KEY), keep the value in a .env file,
// and make sure .gitignore stops .env from being committed.
export const WALLET_KEY = 'Zq8fQ2xL7vR4mZ8tW1bN6cY3hJ5sK0dPa'; // made up for this exercise, not a real key
