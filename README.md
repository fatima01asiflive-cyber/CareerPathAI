# CareerPath AI

> **An AI-powered career guidance platform that helps students discover suitable career paths, assess their skills, build personalized learning roadmaps, and prepare for their future through intelligent recommendations.**

**Bano Qabil AI Hackathon Submission | 2026**

CareerPath AI is a full-stack AI-powered career guidance platform designed to help students make informed career decisions based on their **academic background, interests, skills, assessment performance, and learning goals**.

Instead of providing generic career advice, CareerPath AI creates a **personalized career journey** for every student.

---

## The Problem

Students often struggle with questions such as:

* Which career path is right for me?
* Which skills should I learn?
* What should I study after FSC?
* Am I suitable for a particular technology career?
* What should I learn first?
* Which resources should I use?
* How can I track my progress?
* How can I stay consistent with my learning goals?

Traditional career guidance is often:

* Generic
* Difficult to personalize
* Dependent on manual counseling
* Not connected with students' actual learning progress
* Missing continuous AI-based guidance

Students need a system that understands **where they are now** and helps them determine **where they should go next**.

---

## Our Solution

**CareerPath AI** combines:

**Student Profile + Interests + Skills + Assessments + AI Analysis + Personalized Roadmap + Learning Resources + AI Career Coach**

to create an individualized career development experience.

The platform guides a student through:

```text
Register
   ↓
Onboarding
   ↓
Academic Profile
   ↓
Career Interests
   ↓
Diagnostic Assessment
   ↓
AI Career Analysis
   ↓
Personalized Career Roadmap
   ↓
Learning Tasks
   ↓
Assessments
   ↓
Projects
   ↓
AI Career Coach
   ↓
Career Readiness
```

---

## Core Features

### 1. Student Onboarding

Students create their profile and provide information such as:

* Academic stream
* Educational background
* Skills
* Interests
* Career preferences
* Learning goals

Supported academic pathways include:

* ICS
* Pre-Engineering
* Pre-Medical
* Arts
* Commerce

The collected information is used to personalize the student's career journey.

---

### 2. AI Career Analysis

CareerPath AI analyzes the student's:

* Academic background
* Interests
* Skills
* Assessment performance
* Career preferences
* Learning progress

The AI then provides personalized career recommendations.

Instead of simply saying:

> "You should become a software engineer."

the platform focuses on explaining:

* Why a career may be suitable
* Which skills are required
* Current skill gaps
* What the student should learn
* Recommended learning sequence
* Suggested projects
* Next steps

---

### 3. Personalized Gamified Career Roadmap

One of the core features of CareerPath AI is its **gamified learning roadmap**.

The roadmap is inspired by familiar progression systems such as **Duolingo-style learning paths and Candy Crush-style levels**.

Instead of presenting students with a static list of courses, the system converts their career journey into progressive levels.

### Roadmap progression

```text
        Level 1
        Completed
             │
             ╰───────╮
                     │
                Level 2
                  Active
                     │
             ╭───────╯
             │
        Level 3
          Locked
```

The roadmap uses a **winding S-shaped path** rather than a simple straight vertical line.

### Roadmap states

| State       | Meaning              |
| ----------- | -------------------- |
| Green       | Completed            |
| Gold/Yellow | Current active level |
| Gray        | Locked               |
| XP          | Experience earned    |
| Streak      | Learning consistency |

---

### 4. Progress Tracking

Students can monitor their development through:

* Overall progress
* XP
* Learning streak
* Completed levels
* Assessment scores
* Completed tasks
* Project progress
* Career readiness

Example:

```text
5 Days Streak

350 XP

Overall Progress
████████░░░░░░░░ 33%
```

Progress values are dynamically connected to the student's activity.

---

### 5. Diagnostic Assessments

CareerPath AI includes assessments designed to understand the student's strengths and weaknesses.

The assessment system can evaluate areas such as:

* Programming
* Data Structures & Algorithms
* Databases
* Web Development
* Computer Networks
* Operating Systems
* Software Engineering
* Cyber Security
* Problem Solving
* AI / ML
* Data Analytics

Assessment results contribute to the personalization of the student's career roadmap.

---

### 6. Courses & Learning Resources

CareerPath AI provides learning resources based on the student's selected career path and current roadmap level.

Resources can include:

* Documentation
* Books
* Cheat Sheets
* Courses
* Learning Resources

The resource system is designed to show **relevant resources instead of overwhelming students with unrelated content**.

Additional learning categories such as:

* Mobile Development
* Web Development
* DevOps

can be introduced progressively.

---

### 7. IntelliPath AI Coach

CareerPath AI includes an intelligent conversational assistant called:

## IntelliPath AI Coach

The AI Coach acts as a personal career and learning assistant.

Students can ask questions such as:

```text
What should I learn after JavaScript?

How can I become a MERN Stack Developer?

Why should I learn data structures?

What projects should I build?

How can I improve my programming skills?

What should I focus on this week?
```

The chatbot provides **general career and learning guidance** while considering the student's journey where appropriate.

### AI Coach principles

* English-only responses
* Conversational interaction
* Career guidance
* Learning guidance
* Skill recommendations
* Roadmap assistance
* Project suggestions
* Study guidance

---

### 8. Authentication & User Management

CareerPath AI uses **Firebase Authentication** for secure user authentication.

The system supports authenticated access to personalized functionality while MongoDB is used for application data and user activity.

Authentication and application data are handled separately.

---

### 9. MongoDB Data Storage

CareerPath AI uses **MongoDB with Mongoose** as its primary application database.

MongoDB stores application data such as:

* User profiles
* Academic information
* Career interests
* Assessment data
* Roadmap progress
* Learning activities
* Projects
* Notifications
* Resource information
* User activity

The database structure allows the platform to maintain an evolving picture of each student's career journey.

---

### 10. Smart Notifications

CareerPath AI provides notifications for:

* Learning reminders
* Assessment reminders
* Deadline alerts
* AI recommendations
* Project milestones

The notification system helps students remain consistent with their learning journey.

---

## Gamification

CareerPath AI uses gamification to make career development more engaging.

### Gamification elements

* XP
* Learning streaks
* Completed levels
* Locked levels
* Learning goals
* Progress tracking
* Career milestones

The objective is to transform career preparation from a passive activity into an **interactive progression system**.

---

## System Architecture

```text
┌───────────────────────────────────────────────────────────────┐
│                        CareerPath AI                          │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                    React Frontend                             │
│                                                               │
│  Dashboard │ Roadmap │ Assessments │ Resources │ Settings    │
│  Academic Journey │ Career Interests │ Notifications          │
└───────────────────────────────────────────────────────────────┘
                              │
                              │ REST API
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                  Node.js + Express Backend                    │
│                                                               │
│  Authentication │ Users │ Roadmap │ Assessments              │
│  Resources │ Projects │ Notifications │ AI Integration       │
└───────────────────────────────────────────────────────────────┘
                    │                    │
                    │                    │
                    ▼                    ▼
        ┌───────────────────┐   ┌────────────────────────┐
        │     MongoDB       │   │      AI Service        │
        │                   │   │                        │
        │ User Data         │   │ Alibaba Cloud Qwen     │
        │ Activities        │   │ AI-powered Guidance    │
        │ Roadmaps          │   │ Career Analysis        │
        │ Assessments       │   │ AI Coach               │
        └───────────────────┘   └────────────────────────┘
                    │
                    ▼
        ┌───────────────────┐
        │ Firebase Auth     │
        │                   │
        │ User              │
        │ Authentication    │
        └───────────────────┘
```

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Lucide React
* Framer Motion
* SVG-based roadmap components

### Backend

* Node.js
* Express.js
* TypeScript
* REST APIs

### Database

* MongoDB
* Mongoose

### Authentication

* Firebase Authentication

### AI

* Alibaba Cloud Model Studio
* Qwen
* AI-powered career recommendations
* AI Career Coach
* Personalized guidance

### Development Tools

* VS Code
* Qoder IDE
* Git
* GitHub

---

## AI Integration

AI is not treated as an isolated chatbot feature.

CareerPath AI integrates AI into the student's overall journey.

```text
Student Data
     │
     ├── Academic Profile
     ├── Interests
     ├── Skills
     ├── Assessment Results
     └── Learning Progress
             │
             ▼
       AI Analysis
             │
             ▼
   ┌──────────────────────┐
   │ Career Recommendation │
   ├──────────────────────┤
   │ Skill Gap Analysis    │
   ├──────────────────────┤
   │ Learning Roadmap      │
   ├──────────────────────┤
   │ Project Suggestions   │
   └──────────────────────┘
             │
             ▼
       Student Action
             │
             ▼
       Progress Update
             │
             └──────────► AI continuously guides the journey
```

---

## Alibaba Cloud / Qwen

For the hackathon AI deployment, CareerPath AI integrates **Alibaba Cloud Model Studio / Qwen**.

Qwen is used as the primary AI layer for capabilities such as:

* Career guidance
* Personalized recommendations
* Career analysis
* Learning assistance
* AI Coach conversations
* Roadmap-related guidance

API credentials are kept outside the source code using environment variables.

Example:

```env
DASHSCOPE_API_KEY=your_api_key
QWEN_REGION=singapore
```

> **Important:** Never commit real API keys or credentials to GitHub.

---

## Main Application Modules

```text
CareerPath AI
│
├── Authentication
├── Onboarding
├── Academic Profile
├── Career Interests
├── Diagnostic Assessment
├── AI Career Analysis
├── Career Roadmap
├── Learning Tasks
├── Assessments
├── Projects
├── Courses & Resources
├── Notifications
├── IntelliPath AI Coach
└── Settings
```

---

## User Journey

```text
                    ┌──────────────┐
                    │    Sign Up   │
                    └──────┬───────┘
                           ▼
                    ┌──────────────┐
                    │  Onboarding  │
                    └──────┬───────┘
                           ▼
                 ┌───────────────────┐
                 │ Academic Profile  │
                 └─────────┬─────────┘
                           ▼
                 ┌───────────────────┐
                 │ Career Interests  │
                 └─────────┬─────────┘
                           ▼
                 ┌───────────────────┐
                 │    Assessment    │
                 └─────────┬─────────┘
                           ▼
                 ┌───────────────────┐
                 │  AI Career        │
                 │  Analysis         │
                 └─────────┬─────────┘
                           ▼
                 ┌───────────────────┐
                 │ Personalized      │
                 │ Career Roadmap    │
                 └─────────┬─────────┘
                           ▼
                 ┌───────────────────┐
                 │ Learn → Practice  │
                 │ → Assess → Build  │
                 └─────────┬─────────┘
                           ▼
                 ┌───────────────────┐
                 │ Career Readiness  │
                 └───────────────────┘
```

---

## Project Structure

```text
CareerPath_AI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.tsx
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── server.ts
│   │
│   ├── package.json
│   └── .env
│
├── datasets/
├── docs/
├── README.md
└── .gitignore
```

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB
* Git
* Firebase project
* Alibaba Cloud Model Studio / Qwen API access

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd CareerPath_AI
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

DASHSCOPE_API_KEY=your_dashscope_api_key

QWEN_REGION=singapore
```

Never upload `.env` to GitHub.

### 5. Start Backend

```bash
cd backend
npm run dev
```

### 6. Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will normally run through Vite on:

```text
http://localhost:5173
```

---

## Expected Impact

CareerPath AI aims to reduce the uncertainty students face when choosing and preparing for careers.

### Traditional Approach

```text
Student
   ↓
Searches random websites
   ↓
Finds generic career information
   ↓
Chooses random courses
   ↓
Doesn't know what to learn next
   ↓
Loses motivation
```

### CareerPath AI Approach

```text
Student
   ↓
Personal Profile
   ↓
Assessment
   ↓
AI Analysis
   ↓
Career Recommendation
   ↓
Personalized Roadmap
   ↓
Learning Tasks
   ↓
Projects
   ↓
Progress Tracking
   ↓
Career Readiness
```

### Key Benefits

* Personalized career direction
* AI-powered guidance
* Structured learning
* Personalized roadmap
* Gamified progression
* Progress tracking
* AI Career Coach
* Continuous reminders

---

## Testing & Validation

The application is tested across the major user journey:

```text
Authentication
      ↓
Onboarding
      ↓
Profile Creation
      ↓
Career Interests
      ↓
Assessment
      ↓
AI Analysis
      ↓
Roadmap
      ↓
Learning Tasks
      ↓
Projects
      ↓
AI Coach
```

Testing focuses on:

* Authentication flow
* User data persistence
* MongoDB operations
* Assessment functionality
* Roadmap personalization
* Progress updates
* Notification behavior
* AI response handling
* Theme persistence
* New-user roadmap initialization

---

## Security

CareerPath AI follows basic application security practices including:

* Environment variables for API keys
* `.gitignore` protection for secrets
* Backend-only AI API communication
* Firebase Authentication
* Server-side API handling
* MongoDB-based application data management
* Separation of authentication and application data

**No API keys or private credentials should be committed to the repository.**

---

## AI-Assisted Development

CareerPath AI was developed with the assistance of modern AI development tools.

### Qoder IDE

Qoder IDE was used during development for:

* Code generation
* Debugging
* Refactoring
* Feature implementation
* Project assistance
* Error resolution

Approximately **40% of the available Qoder IDE token usage was utilized during development.**

AI assistance was used as a development accelerator while the team remained responsible for:

* Architecture
* Feature decisions
* Integration
* Testing
* Debugging
* UI/UX decisions
* Final implementation

---

## Team

| Member              | Role                 | Responsibilities                                                   |
| ------------------- | -------------------- | ------------------------------------------------------------------ |
| **Fatima Asif**     | Full Stack Developer | Frontend, backend, MongoDB integration, application architecture   |
| **Khudaja Batool**  | Full Stack Developer | Frontend, backend, feature implementation and integration          |
| **Tashfeen Zainab** | JavaScript Developer | JavaScript development, frontend functionality and feature support |

### Team Structure

```text
                 CareerPath AI
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
     Fatima        Khudaja       Tashfeen
   Full Stack     Full Stack    JavaScript
   Developer      Developer     Developer
```

---

## Hackathon Highlights

### AI

Qwen-powered intelligent career assistance.

### Full Stack

React + Node.js + Express + MongoDB.

### Authentication

Firebase Authentication.

### Personalization

Student-specific career recommendations.

### Gamification

XP, streaks, levels, and progress.

### Career Guidance

Structured career journeys and learning guidance.

### Learning

Personalized resources and tasks.

### Conversational AI

IntelliPath AI Coach.

---

## What Makes CareerPath AI Different?

Most career platforms provide information.

**CareerPath AI provides a journey.**

```text
Information
     ↓
Understanding
     ↓
Assessment
     ↓
Recommendation
     ↓
Personalization
     ↓
Learning
     ↓
Practice
     ↓
Progress
     ↓
Career Readiness
```

The goal is not simply to tell students **what career they can choose**.

The goal is to help them understand:

> **What should I do next?**

---

## Future Scope

CareerPath AI can be expanded with:

* More AI-powered career models
* Advanced skill-gap analysis
* More career domains
* Additional learning resources
* Mobile application
* Advanced analytics
* More personalized project recommendations
* Real-time career market insights
* Improved recommendation models
* Multilingual support
* Advanced student performance analytics

---

## Project Status

CareerPath AI currently focuses on providing students with an integrated:

```text
Career Discovery
        ↓
Assessment
        ↓
AI Guidance
        ↓
Personalized Roadmap
        ↓
Learning
        ↓
Progress
        ↓
Career Readiness
```

experience.

---

## Team

* **Fatima Asif** — Full Stack Developer
* **Khudaja Batool** — Full Stack Developer
* **Tashfeen Zainab** — JavaScript Developer

---

## License

This project is developed as a hackathon project.

See the repository for the applicable license and project documentation.
