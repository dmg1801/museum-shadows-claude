# Museum of Shadows
Pixel-art horror platformer (Phaser 3, no build step). All sprites and audio are generated procedurally in `js/main.js` — replace them with real assets whenever you like.

**Controls** — Desktop: A/D or arrows move, Shift run, Space/W jump, E interact, F flashlight. Mobile (landscape): joystick left (push far = run), JUMP / ACT / LIGHT right.

**Play** — Collect 3 relic fragments per hall by touching them; the door opens once you have all three. Candles are checkpoints and restore sanity; darkness, whispers and ghosts drain it. Flashlight stuns ghosts.

## Deploy on GitHub Pages
1. Create a repo and upload everything in this folder (index.html at the repo root).
2. Settings → Pages → Source: *Deploy from a branch*, Branch: `main`, folder `/ (root)` → Save.
3. Open `https://dmg1801.github.io/museum-shadows-claude/` after about a minute. Phaser loads from the jsDelivr CDN.
