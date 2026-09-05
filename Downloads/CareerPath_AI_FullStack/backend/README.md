# CareerSaathi | AI-Powered Career Roadmap Platform

CareerSaathi (also known as PathFinder) is an AI-powered career and skill roadmap guide designed for computer science and tech-aspiring students, including learners transitioning into technology.

The backend powers guided pathways across software engineering, web development, artificial intelligence, data science, and cyber security. Students can explore gamified, level-by-level roadmaps while actively tracking their progress.

## Backend

This service provides authentication, project tracking, chat, learning resources, and optional MongoDB and Firebase integrations.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the required values.

3. Start the development server:

   ```bash
   npm run dev
   ```

The default API port is `5000`.

## Available Scripts

- `npm run dev` starts the server with watch mode.
- `npm start` starts the server.
- `npm run seed` seeds the configured data source.