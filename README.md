Family-Friendly Joke Generator
==============================

A simple, safe, offline-friendly joke generator you can open in any browser. Includes favorites, share/copy, history, and a Kid Mode toggle to keep jokes extra gentle.

Quick Start
-----------

- Option 1: Double-click `index.html` to open it in your browser.
- Option 2: Serve the folder over HTTP (recommended for best browser APIs):

```powershell
# from the repo folder
npm install -g serve ; serve -p 5173 .
# then open http://localhost:5173
```

Features Implemented
--------------------

- New joke button with non-repeating selection
- Favorites with localStorage persistence and favorites dialog
- Joke history with clear and view controls
- Share via Web Share API with clipboard fallback
- Copy to clipboard
- Kid Mode toggle to restrict the pool to kid-safe jokes only

Notes on Safety
---------------

- All bundled jokes are flagged `kidSafe`. Kid Mode restricts selection to those only, leaving room to add broader jokes later while keeping families safe by default.
- No tracking, no accounts, all data stays in your browser via localStorage.

Roadmap Hooks
-------------

- URL parameters `?j=<id>&kid=1` allow sharing a specific joke and mode.
- Data model supports tagging and kid-safety flags for future filtering and moderation.

Project Structure
-----------------

- `index.html` — UI shell and dialogs
- `styles.css` — Minimal modern styling
- `app.js` — Logic, dataset, localStorage, share/copy, dialogs

Changelog
---------

### November 15, 2025
- **Visual Enhancements**: Added animated gradient background, rainbow shimmer title, glowing rotating borders on joke card, bounce-in animations for new jokes
- **Interactive Effects**: Confetti celebration when favoriting (150 particles), sound effects using Web Audio API
- **Sound Effects**: Pleasant "boop" for new jokes, loud airhorn blast for favorites, quick "blip" for copying
- **UI Scaling**: Increased all font sizes, padding, and spacing for better visibility (title: 32-48px, joke text: 28-40px, buttons: 18px font with larger padding)
- **Enhanced Animations**: Ripple effects on button clicks, pulsing hint text, smooth slide-down header, enhanced toast notifications with gradient backgrounds
- **Accessibility**: Added emoji icons to dialog headers, ARIA labels throughout

License
-------

For evaluation and internal use.
