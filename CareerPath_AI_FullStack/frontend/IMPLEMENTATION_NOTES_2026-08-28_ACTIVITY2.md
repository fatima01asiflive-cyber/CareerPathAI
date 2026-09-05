# CareerPath AI - Activity 2 Update

Implemented requested roadmap, theme, chatbot, project and streak updates.

## Roadmap
- Added independent 6-level roadmaps for all 8 Computer Science categories.
- Level 01 starts from fundamentals, followed by skill-building, applied work, and an industry-ready capstone.
- Clicking a level opens a centered modal with the 4-week learning schedule.
- Current user's selected category is highlighted and its level completion can sync to the existing course milestone system.

## Themes
- Preserved and surfaced the existing Theme Studio in the header and Settings.
- Existing dark, light, high-contrast and alternate palette themes remain available through the ThemeSelector.
- Theme state remains account-scoped.

## Chatbot
- Extended conversation context to the last 20 messages.
- Added stronger general-purpose tutor behavior so direct questions are answered directly instead of forcing generic career responses.
- Added same-language behavior for English, Urdu and Roman Urdu.
- Added more explicit handling for coding, mathematics/logic, conceptual questions and follow-ups.
- Kept the existing Gemini-backed `/api/aiguider/chat` architecture.

## Projects
- Kept all 8 Computer Science categories and 3 project stages, giving 24 category/stage project blocks.
- Project cards are now visibly unlocked and can be opened directly.
- Opening a project automatically creates its assignment timestamp and deadline when one is not already present.
- Existing GitHub/live submission and AI review flows remain intact.

## Streak
- Added a visible Learning Streak panel to the Dashboard and a compact streak badge in the dashboard header.
- Streak/activity storage is now user-scoped, preventing one account's streak or activity history from leaking into another account.

## Verification
- TypeScript transpile/syntax checks passed for all modified TypeScript/TSX files.
- Full dependency install/build could not be completed in the execution environment because package installation timed out and the repository has no package-lock.json.
