import { h } from '../util.js';
// A scripted "family emergency" call. Scoring rewards verification steps, not guessing whether it's fake.
// Steps follow the FTC (20 Mar 2023) and FBI (I-120324-PSA, 3 Dec 2024) advice. Shared with Security from Scratch.
const TURNS = [
  { them: '“Grandma? It’s me, Luca… I’m in trouble. I crashed the car and the police are here. Please don’t tell Mum.”',
    choices: [['Ask: “What’s our family code word?”', 2, 'Good. A code word works even when the voice is perfect.'], ['“Oh no! What do you need?”', 0, 'Natural, but it hands control to the caller.'], ['“That doesn’t sound like you.”', 0, 'Voices can be cloned well. Don’t rely on your ears.']] },
  { them: '“I… I don’t remember, I’m so stressed! A lawyer will call you. You need to send CHF 8,000 today, by gift cards or crypto.”',
    choices: [['“I’ll call you back on your usual number.”', 2, 'Yes: hang up and call back on a number you already know.'], ['“Which gift cards?”', 0, 'Gift cards and crypto are classic signs of a scam: hard to get back.'], ['Stay on the line to find out more', 0, 'The longer the call, the more pressure. End it.']] },
  { them: '“No! My phone is broken, don’t call it! And don’t tell anyone, they’ll be angry!”',
    choices: [['Hang up and call Luca’s parents', 2, 'Right. The FTC says: if you can’t reach the person, try another family member.'], ['Promise to keep the secret', 0, 'Secrecy is pressure. Real family emergencies survive one phone call.'], ['Send a small amount “just in case”', 0, 'Any payment tells scammers you will pay.']] },
  { them: 'You call Luca’s mum. She says Luca is at school and fine.',
    choices: [['Report it (e.g. police non-emergency line) and warn the family', 2, 'Great: reporting helps others, and the family can agree a code word now.'], ['Forget about it', 0, 'Tell the family. Scammers often try again.'], ['Call the scammer back to shout at them', 0, 'No need. Every call gives them more of your voice.']] },
];
export default function (body, ctx) {
  let t = 0, pts = 0; const max = TURNS.length * 2;
  const chat = h('div', { class: 'chat', 'data-testid': 'cb-chat', 'aria-live': 'polite' }); const choices = h('div', { class: 'lab-row', style: 'flex-direction:column;align-items:stretch' });
  const fb = h('p', { class: 'q-explain', 'aria-live': 'polite' });
  const upd = () => (ctx.score.textContent = `${pts}/${max}`);
  function turn() {
    const T = TURNS[t]; chat.append(h('div', { class: 'msg them' }, h('small', {}, t === 3 ? 'Phone' : 'Caller (“Luca”)'), T.them));
    choices.replaceChildren(...T.choices.map(([label, p, why], i) => h('button', { class: 'btn btn-quiet', style: 'justify-content:flex-start;text-align:left;border-radius:14px;height:auto;padding:10px 14px', type: 'button', 'data-testid': `cb-${t}-${i}`, 'data-good': String(p > 0), onclick: () => choose(label, p, why) }, label)));
  }
  function choose(label, p, why) {
    chat.append(h('div', { class: 'msg me' }, label)); pts += p; upd();
    fb.innerHTML = `<b class="${p ? 'good-t' : 'bad-t'}">${p ? `+${p}` : '0 points'}.</b> ${why}`;
    ctx.pose(p ? 'neutral' : 'fooled', p ? 'Huh, you didn’t even try to guess if it was fake.' : 'I would have sent the money already… he sounded SO real.');
    t++; if (t < TURNS.length) turn(); else end();
  }
  function end() {
    choices.replaceChildren(h('button', { class: 'btn btn-primary btn-small', type: 'button', 'data-testid': 'cb-again', onclick: () => { t = 0; pts = 0; chat.replaceChildren(); fb.textContent = ''; upd(); turn(); ctx.pose('neutral', 'Again? OK, I’ll pick up.'); } }, 'Run the drill again'));
    if (pts === max) { ctx.pose('proud', 'Perfect score! You never had to know if the voice was fake. You just checked.'); ctx.win(); }
    else ctx.pose('alarmed', `You scored ${pts}/${max}. The winning moves: code word, call back, ask family, report.`);
  }
  body.append(h('p', { class: 'muted', style: 'margin-top:0' }, 'A simulated call. Points go to safe steps, not to guessing whether the voice is real.'), chat, fb, choices);
  ctx.pose('neutral', 'Phone’s ringing! Probably my cousin. What could go wrong?');
  upd(); turn();
}
