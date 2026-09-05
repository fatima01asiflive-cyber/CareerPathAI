# v3.2.4 — Roadmap Schedule, Projects Navigation & Chat Context

- Compact Candy Crush-style roadmap spacing while preserving the winding SVG path.
- Level modal now contains a four-week learning schedule with direct Resources and Assessment actions.
- Roadmap completion now exposes a prominent GO TO PROJECTS action at the end of the map.
- Added Projects to the primary sidebar navigation.
- Assessment page now surfaces the roadmap-driven project assignment and links to Projects.
- Chatbot now calls the dedicated `/api/aiguider/chat` endpoint and sends the student/page context so questions such as CGPA improvement receive direct, contextual answers.
- Improved deterministic CGPA fallback response.

# CareerPath AI – Revision Summary

## Scope
The original CareerPath AI idea and visual direction are preserved. This revision focuses the student journey on Computer Science and implements the requested behavior changes.

## Implemented
- Computer Science as the only academic/career domain.
- CS categories: Software Development, AI/ML, Data Science, Cloud Computing, Cyber Security, Web Development, Mobile Development, DevOps.
- Beginner / Intermediate / Pro resource levels.
- Roadmap-linked video resources for each category.
- AI/ML and Data Science dataset references.
- Intermediate (FSc) as the last education level in Academic Journey.
- Current CS interest selection drives aptitude/resource/roadmap behavior.
- CS-only randomized aptitude questions; question order changes on each reload.
- 80% aptitude threshold with foundation-first recommendations below the threshold.
- Global AI chatbot available across authenticated pages; general/random questions are allowed.
- Roman Urdu and Urdu are explicitly marked Coming Soon.
- Global app activity tracking.
- Resource, chatbot and focus-timer time tracking.
- Date-wise activity history in Settings.
- Automatic 30-minute streak credit and XP.
- Weekly learning gift (+10 XP) after seven active days.
- Focus timer start and completion beep.
- Cleaner dashboard without manual streak check-in.
- Candy Crush / Duolingo-inspired winding SVG roadmap with completed, active and locked levels.
- Beginner project after the first two months, Intermediate project after the applied phase, Pro-level Final Project at course completion.
- GitHub + deployment link submission and AI review with strengths, weaknesses and improvement feedback.
- Notifications persisted locally and synchronized with activity-generated events.
- Sidebar order preserved as: Home → Dashboard → Academic Journey → Career Interests → Career Roadmap → Resources → Assessment.
- Profile menu remains at the bottom of the collapsible sidebar.
- Dashboard header stays clean without separate search/notification/settings controls.

## Validation
A TypeScript pass was attempted. The project does not include installed `node_modules`, so dependency-resolution errors remain until `npm install` is run in VS Code/Qoder. The modified source itself produced no additional non-dependency TypeScript diagnostics.

## 3.1.0 — Candy-Map + Data Integrity + AI Chat Fixes

- Rebuilt the Career Roadmap as a game-style adventure map based on the supplied Candy Crush/Gardens visual reference: winding S-curve path, large milestone nodes, active/locked/completed states, map scenery, labels and rewards.
- Kept the implementation original; the reference image is used only for layout inspiration.
- Added an Account selector to Login.
- Removed default/fake academic values from Academic Journey and Profile Setup. User-entered subjects, marks and current CS interests are now required before aptitude testing.
- Aptitude assessment is gated by the Intermediate (FSc) + Computer Science academic profile and current CS interest.
- Aptitude question generation remains randomized on every assessment load and now prioritizes the selected CS category, using core CS questions only to fill missing slots.
- Updated chatbot backend to Gemini 2.5 Flash and strengthened instructions so general/random questions receive a direct answer instead of a generic career response.
- Bumped app version to 3.1.0 so stale sessions are refreshed.

## v3.2.0 - Roadmap Flow & Learning UX Update
- Tightened the Candy Crush-style roadmap spacing and kept the winding S-path.
- Clicking a roadmap level now opens a four-week schedule with explicit Learn -> Resources -> Practice -> Assessment flow.
- Added direct resource navigation from each roadmap week with a category/topic filter handoff.
- Resources are grouped by every Computer Science category by default, with per-category level dropdowns and a global Beginner/Intermediate/Pro filter.
- Beginner/Intermediate/Pro filtering now applies across all CS categories at once.
- Aptitude assessment now always mixes logical reasoning + mathematics with selected CS-interest questions for Intermediate/FSc students.
- Chatbot frontend now calls the live Gemini-backed `/api/aiguider/chat` endpoint directly; fallback answers include a concrete CGPA-improvement response.
- Project submissions no longer contain fake GitHub/deployment defaults; both evidence links are required before AI review.
- Project AI review now reports a market-readiness score and explicit strengths, weaknesses and market feedback.

## v3.2.1 - Cache & Update UX
- Added a real Clear Cache action in Settings that clears browser Cache Storage and transient session/chat cache while preserving profile, roadmap progress, XP, streak, and activity history.
- Added confirmation flow for Clear Cache.
- Changed Update App action to a disabled "Coming Soon" state; it no longer triggers logout/reload.
- Updated Settings release messaging to "Update Coming Soon".


## v3.2.4 — Roadmap Project + Resource Playback
- Completed roadmap levels now expose a Take a Project action.
- Project assignments are category-specific across the Computer Science domain.
- Resource videos play inside the app in an embedded player.
- Added an Open Source action that opens the source/video page in a new tab.
