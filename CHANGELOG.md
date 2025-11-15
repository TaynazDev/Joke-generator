# Changelog

All notable changes to the A-Team Joke Generator will be documented in this file.

## [1.0.0] - 2025-11-15

### Added
- A-Team themed joke generator with 20 original jokes
- Reveal answer button with setup/punchline structure
- Favorite system with localStorage persistence
- Dislike functionality with localStorage persistence
- History tracking (last 100 jokes)
- Share functionality (Web Share API with clipboard fallback)
- Copy to clipboard feature
- Animated background gradients (black to gunmetal grey)
- Rotating border animations on joke card
- Confetti particle system (150 particles) on favorites
- Custom sound effects:
  - Pistol shot sound for New Joke button
  - A-Team theme song for Answer Reveal
  - "I love it when a plan comes together" for Favorite button
  - "I pity the fool" for Dislike button
- A-Team logo centered above joke card
- Complete A-Team color scheme (gunmetal grey #2c3e50, black #0a0a0a, white #f5f5f5, red #dc2626)
- Responsive design with 2-3x larger UI elements
- Dialog modals for History and Favorites
- Smooth animations and transitions throughout

### Technical Details
- Pure vanilla JavaScript (no frameworks)
- localStorage for client-side persistence
- Web Audio API for sound effects
- HTML5 Audio for custom MP3/WAV playback
- Canvas API for confetti animations
- Fully static - no server required

### Assets
- a-team.png - Logo image
- pistol-shot.mp3 - New joke sound effect
- the-a-team-2010-theme-from-the-a-team1.wav - Reveal answer theme
- plan.mp3 - Favorite sound effect
- pitythefool.mp3 - Dislike sound effect
- a-team-jokes.md - Source jokes document
