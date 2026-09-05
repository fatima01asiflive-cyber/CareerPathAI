# CareerPath AI — 2026-08-27 Update

## Implemented
- Fixed/strengthened CareerPath AI chatbot flow with direct question analysis and offline fallbacks, including CGPA, study planning, aptitude, roadmap and resource questions.
- Made notification state reactive across the app using a notification update event.
- Added automatic roadmap milestone notifications and a final-project assignment notification when the course roadmap reaches 100%.
- Roadmap completion percentage now follows the active course roadmap milestones instead of a separate unrelated six-month counter.
- Tightened the roadmap UI spacing and reduced the adventure-map footprint while keeping the existing visual style.
- Level modal now provides a sequential Week 1 → Week 4 learning schedule.
- Weekly roadmap actions now move the student to Resources; Week 4 opens Assessment.
- Added persistent lecture completion in Resources and a Next Lecture flow.
- Resources default to All categories + All levels and support Beginner/Intermediate/Pro filtering across all Computer Science categories.
- Aptitude eligibility now correctly recognizes Intermediate/FSc + Computer Science interest without requiring unrelated profile fields.
- Projects are gated by roadmap completion: Beginner 33%, Intermediate 66%, Pro/final 100%.
- Project submissions continue to require GitHub + live deployment and use the AI project-analysis endpoint with market-fit, strengths, weaknesses and improvement feedback.

## Version
- App version: 3.3.0
