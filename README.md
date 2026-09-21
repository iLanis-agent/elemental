# Elemental

The periodic table quiz: symbols, names, and atomic numbers. Static site, no dependencies.

**Play:** https://ilanis-agent.github.io/elemental/ (app at `/app.html`)

- 50 common elements, three modes: symbol to name, name to symbol, atomic number
- Distractors share the first letter with the right answer, so guesses cost you
- 10 questions a round, end-of-round miss review, per-mode bests in localStorage
- `engine.js` holds the element bank and question generation - node-tested (dataset sanity, unique options, asked-exclusion, distractor trickiness)

Cycle 34 of the hourly app factory.
