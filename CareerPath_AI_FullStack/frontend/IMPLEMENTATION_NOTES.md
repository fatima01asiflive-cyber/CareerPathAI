# CareerPath AI v3.2.0 Implementation Notes

## Roadmap
- Compact Candy Crush / Duolingo-inspired winding map.
- Level click opens a weekly schedule.
- Weekly flow: cover concepts -> go to Resources -> watch lectures/practice -> take assessment.
- Roadmap resource handoff uses `careerpath_resource_focus` in localStorage.

## Resources
- Computer Science is the only domain.
- Categories: Software Development, AI/ML, Data Science, Cloud Computing, Cyber Security, Web Development, Mobile Development, DevOps.
- All categories are expanded by default.
- Global level filter: All / Beginner / Intermediate / Pro.
- Each category also has its own level dropdown.
- Resource videos are filtered by category + level + roadmap/search context.

## Aptitude Test
- Requires Intermediate (FSc), Computer Science, real marks, real subjects and at least one CS interest.
- Every test contains randomized logical reasoning and mathematics questions plus randomized category questions.
- Reloading the assessment generates a new shuffled question set.

## Chatbot
- Frontend calls `/api/aiguider/chat`.
- Gemini is used server-side through `@google/genai` when `GEMINI_API_KEY` is configured.
- The system prompt requires direct answers to the user's actual question.
- A deterministic fallback specifically handles common academic questions such as CGPA improvement.

## Projects
- Beginner project is available as the first milestone; Intermediate unlocks at 33% roadmap progress; Pro/Final Project unlocks at 100%.
- GitHub repository and live deployment URL are required for submission.
- AI review includes score, market-readiness score, market review, strengths, weaknesses, mistakes and next steps.

### v3.2.1 Settings update
The Settings > System Lifecycle section now separates cache clearing from future app updates. Clear Cache removes browser Cache Storage plus transient session/chat cache only; persistent student profile, roadmap progress, XP, streak, and activity history are preserved. The Update App control is intentionally disabled and labeled Coming Soon.


## v3.2.4 — Roadmap Project + Resource Playback
- Completed roadmap levels now expose a Take a Project action.
- Project assignments are category-specific across the Computer Science domain.
- Resource videos play inside the app in an embedded player.
- Added an Open Source action that opens the source/video page in a new tab.
