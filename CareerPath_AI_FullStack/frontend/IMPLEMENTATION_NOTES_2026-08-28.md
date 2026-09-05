# CareerPath AI — 2026-08-28 Implementation Notes

- Migrated the richer chatbot UI/service from the previous ZIP and kept it on `/api/aiguider/chat`.
- Added account-scoped local persistence for roadmap, courses, projects, notifications, resource completion and themes.
- New account signup starts roadmap at 0% with fresh course/project state; returning accounts restore their own state.
- Added all Computer Science project categories with Beginner/Intermediate/Pro project blueprints.
- Projects are assigned when the matching roadmap threshold is reached; each assignment gets a deadline.
- Added automatic project deadline reminders during the final 72 hours and at the deadline.
- Project submissions require GitHub repository + live deployment URLs and receive AI market-readiness review with strengths, weaknesses and next steps.
- Expanded Resources with explicit Video/Docs filters; videos can play inside the app and open externally, while docs have an in-app resource detail and external documentation action.
- Unified theme handling across all existing theme presets and applied palette variables to the app shell/common surfaces/forms and migrated chatbot fixed-color surfaces.
- Added completion notification for project AI review and synchronized notification state changes.
