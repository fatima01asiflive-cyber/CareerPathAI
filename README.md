# CareerPath AI — Updated

CareerPath AI is a React/Vite + TypeScript career guidance app with a Node/Express + Gemini backend.

## What was updated from the supplied projects

### Pathfinder features ported into CareerPath AI
- Stream-aware learning resources from the Pathfinder Learning Hub.
- Focus Timer and resource watch-time tracking.
- In-app study notes for resources.
- Pathfinder-style bilingual/expandable AI coaching experience.
- Context-aware floating chatbot available across authenticated pages.
- Merit/Aggregate calculator with entry-test selection and attempted/not-attempted flow.
- Activity-time tracking for Resources, AI Chatbot, Merit Calculator and Study Timer.

### Issues fixed from the handwritten review
- Dashboard stays clean until enough student information exists.
- No fake aggregate, university cutoff, or student statistics on a blank profile.
- Merit calculator asks whether the student attempted an entry test and lets them choose MDCAT, ECAT, NET or FAST.
- Resource recommendations are filtered by the student's academic field/stream, preventing unrelated MDCAT/ECAT material.
- Global header search bar removed.
- Dashboard no longer shows the unnecessary scholar level label.
- AI chatbot includes a clear roadmap/resource/assessment action path.
- Profile icon is at the bottom of the sidebar.
- Profile menu contains Profile, Settings, Notifications and Logout.
- Sidebar order is Home → Dashboard → Academic Journey → Career Interests → Career Roadmap → Resources → Assessment.
- Sidebar remains collapsible on desktop and becomes a mobile drawer.
- Mock Interview, Universities and Certificates are not primary navigation features.

## Run in VS Code

Requirements:
- Node.js 20+
- npm or Bun

Install:

```bash
npm install
```

Run:

```bash
npm run dev
```

The project uses the existing `server.ts` development entry and Vite integration.

## Gemini

Copy `.env.example` to `.env` and set:

```env
GEMINI_API_KEY=your_key_here
```

The Gemini key is used server-side only.

## Google AI Studio

This is a standard Vite + React + TypeScript project with a Node/Express server. Open the project folder in an AI Studio-compatible coding workspace and use the existing `package.json`, `vite.config.ts`, `src/` and `server.ts` structure. Do not put the Gemini API key into client-side React files.

## Source provenance

The Pathfinder-derived resources are kept in:

`src/data/pathfinderLearningResources.ts`

The Pathfinder-derived UI integration is implemented in:

`src/components/careerpath/PathfinderResourceHub.tsx`

The original CareerPath AI project remains the base application; the Pathfinder functionality was adapted rather than replacing the whole application.


## CareerPath AI – Computer Science Focus Update (2026-08-26)

This revision keeps the existing CareerPath AI idea and UI direction while tightening the product around one domain: **Computer Science**.

### Updated behavior
- CS specializations: Software Development, AI/ML, Data Science, Cloud Computing, Cyber Security, Web Development, Mobile Development and DevOps.
- Resources are filtered by category, roadmap level and Beginner / Intermediate / Pro difficulty.
- AI/ML and Data Science resources include dataset references.
- Aptitude questions are CS-specific and shuffled on every test load.
- Scores below 80% follow a foundation-first recommendation instead of jumping to advanced/high-demand skills.
- Academic Journey records the last education as Intermediate (FSc) and captures current CS interests.
- Global app activity is tracked and shown in Settings > Activity History by date.
- 30 minutes of active app use automatically credits the daily streak and +50 XP.
- A 7-day activity streak unlocks a small +10 XP learning gift.
- Focus Timer starts with a beep and rings at completion.
- AI chatbot is globally available and is instructed to answer both CareerPath questions and normal/random questions. Roman Urdu and Urdu UI support are marked Coming Soon.
- Project progression: Beginner project after the first two months, Intermediate project after the applied phase, and Pro-level **Final Project** at the end. GitHub and deployment links are submitted for AI review with strengths and weaknesses.
- Sidebar remains collapsible with: Home, Dashboard, Academic Journey, Career Interests, Career Roadmap, Resources, Assessment. Profile remains at the bottom.

## Latest update: 3.1.0

This build keeps the CareerPath AI concept and adds three important UX/data fixes:

1. **Candy-style Career Roadmap:** a winding adventure-map layout inspired by the supplied visual reference, with sequential nodes, completed/active/locked states, XP, progress and level cards.
2. **User-owned academic data:** Academic Journey no longer fills marks, subjects or interests with sample values. The student must provide them before the aptitude test can start.
3. **More reliable AI Coach:** the backend uses Gemini 2.5 Flash and explicitly answers general/random questions directly while still using the student's CareerPath context when relevant.

Set `GEMINI_API_KEY` in `.env` for live AI responses.

## v3.2 learning flow
- Roadmap levels open into a week-by-week Learn -> Resources -> Practice -> Assessment schedule.
- Resources are grouped by all Computer Science categories and support Beginner / Intermediate / Pro filtering.
- Aptitude tests combine logic, mathematics and selected CS-interest questions and reshuffle on each reload.
- Chatbot answers the user's actual question and uses Gemini through `/api/aiguider/chat` when configured.
- Project submissions require GitHub + live deployment evidence and return market-readiness feedback.


## CareerPath AI Logo

This release includes the production app icon, favicon variants, and brand-sheet asset in `src/assets/images/` and `assets/`.
