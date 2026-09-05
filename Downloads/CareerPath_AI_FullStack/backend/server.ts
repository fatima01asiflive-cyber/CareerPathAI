import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { PAKISTANI_QUESTION_BANK, getRandomQuestionsByStream, PakistaniQuestion } from "./data/pakistaniQuestions.ts";
import { PAKISTANI_LECTURE_LIBRARY } from "./data/learningHubData.ts";
import { ALL_CAREERPATH_RESOURCES } from "./data/pathfinderLearningResources.ts";
import connectDB from "./config/db.js";



// In-Memory Database Store for Pakistani Intermediate Students
interface UserRecord {
  id: string;
  name: string;
  email: string;
  matricMarks: number;
  matricTotal: number;
  interMarks: number;
  interTotal: number;
  stream: 'Computer Science';
  goal: string;
  targetCity: string;
  streakCount: number;
  lastActiveDate: string;
  xpPoints: number;
  completedTasks: string[];
  watchTimeSeconds: Record<string, number>;
  notificationSettings: {
    morningRevision: boolean;
    afternoonEntryTest: boolean;
    eveningMockChallenge: boolean;
    nightConsistencyCheck: boolean;
  };
  testHistory: Array<{
    date: string;
    stream: string;
    score: number;
    total: number;
    percentage: number;
    timeTakenSeconds: number;
  }>;
}

// Global in-memory mock database state
const USERS_DB: Record<string, UserRecord> = {
  'demo-user-1': {
    id: 'demo-user-1',
    name: 'Hamza Khan',
    email: 'hamza@student.pk',
    matricMarks: 1015,
    matricTotal: 1100,
    interMarks: 480,
    interTotal: 520,
    stream: 'Computer Science',
    goal: 'Doctor',
    targetCity: 'Lahore',
    streakCount: 5,
    lastActiveDate: new Date().toISOString().split('T')[0],
    xpPoints: 1250,
    completedTasks: ['task-1', 'task-2'],
    watchTimeSeconds: { 'lec-1': 420, 'lec-2': 310 },
    notificationSettings: {
      morningRevision: true,
      afternoonEntryTest: true,
      eveningMockChallenge: true,
      nightConsistencyCheck: true,
    },
    testHistory: [
      {
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        stream: 'Computer Science',
        score: 8,
        total: 10,
        percentage: 80,
        timeTakenSeconds: 540,
      }
    ]
  }
};

const DEFAULT_USER_ID = 'demo-user-1';

async function startServer() {
  await connectDB();
  const app = express();
  const PORT = Number(process.env.PORT || 5000);

  const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map(v => v.trim()).filter(Boolean);
  app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(express.json({ limit: "300kb" }));

  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "CareerPath AI API is running.",
      healthCheck: "/api/health"
    });
  });

  // Initialize Google GenAI client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      appName: "CareerPath AI - Computer Science Career Guidance",
      aiConfigured: !!process.env.GEMINI_API_KEY,
      totalQuestionsSeeded: PAKISTANI_QUESTION_BANK.length,
      timestamp: new Date().toISOString()
    });
  });

  // ================= 1. AUTH & PROFILE APIS =================
  app.get("/api/auth/me", (req, res) => {
    const user = USERS_DB[DEFAULT_USER_ID];
    res.json({ success: true, user });
  });

  app.post("/api/auth/update-profile", (req, res) => {
    const { name, matricMarks, matricTotal, interMarks, interTotal, stream, goal, targetCity } = req.body;
    const user = USERS_DB[DEFAULT_USER_ID];
    if (user) {
      if (name) user.name = name;
      if (matricMarks !== undefined) user.matricMarks = Number(matricMarks);
      if (matricTotal !== undefined) user.matricTotal = Number(matricTotal);
      if (interMarks !== undefined) user.interMarks = Number(interMarks);
      if (interTotal !== undefined) user.interTotal = Number(interTotal);
      if (stream) user.stream = stream;
      if (goal) user.goal = goal;
      if (targetCity) user.targetCity = targetCity;
      return res.json({ success: true, user, message: "Profile updated successfully!" });
    }
    res.status(404).json({ success: false, error: "User not found" });
  });

  // ================= 2. 10-QUESTION MOCK TEST APIS =================
  // Fetch 10 random questions from DB with 15:00 Timer Duration
  app.get("/api/mocktest/questions", (req, res) => {
    const stream = (req.query.stream as string) || USERS_DB[DEFAULT_USER_ID].stream || 'Computer Science';
    const count = parseInt(req.query.count as string) || 10;
    
    const questions = getRandomQuestionsByStream(stream, count);
    
    // Mask correct answers when sending to client for test security
    const clientSafeQuestions = questions.map((q) => ({
      id: q.id,
      stream: q.stream,
      subject: q.subject,
      question: q.question,
      options: q.options,
      difficulty: q.difficulty,
    }));

    res.json({
      success: true,
      stream,
      totalQuestions: clientSafeQuestions.length,
      timeLimitMinutes: 15,
      timeLimitSeconds: 900, // 15:00 minutes
      questions: clientSafeQuestions
    });
  });

  // Alias for compatibility
  app.get("/api/questions/random", (req, res) => {
    const stream = (req.query.stream as string) || 'Computer Science';
    const questions = getRandomQuestionsByStream(stream, 10);
    res.json({
      success: true,
      stream,
      timeLimitSeconds: 900,
      questions
    });
  });

  // Submit Mock Test & Calculate Results
  app.post("/api/mocktest/submit", (req, res) => {
    const { stream, answers, timeTakenSeconds } = req.body; // answers: { [questionId: number]: selectedIndex }
    const targetStream = stream || USERS_DB[DEFAULT_USER_ID].stream || 'Computer Science';
    
    // Re-fetch questions to grade against true answer key
    const allQuestions = PAKISTANI_QUESTION_BANK;
    
    let score = 0;
    const total = 10;
    const breakdown: Array<{
      questionId: number;
      questionText: string;
      subject: string;
      userAnswer: number | null;
      correctAnswer: number;
      isCorrect: boolean;
      explanation: string;
      options: string[];
    }> = [];

    // Score each submitted answer
    if (answers && typeof answers === 'object') {
      Object.keys(answers).forEach((qIdStr) => {
        const qId = parseInt(qIdStr);
        const userChoice = answers[qId];
        const originalQ = allQuestions.find(q => q.id === qId) || allQuestions[(qId - 1) % allQuestions.length];
        
        const isCorrect = userChoice === originalQ.correctAnswer;
        if (isCorrect) score++;

        breakdown.push({
          questionId: qId,
          questionText: originalQ.question,
          subject: originalQ.subject,
          userAnswer: userChoice,
          correctAnswer: originalQ.correctAnswer,
          isCorrect,
          explanation: originalQ.explanation,
          options: originalQ.options,
        });
      });
    }

    const percentage = Math.round((score / total) * 100);
    const passed85Rule = percentage >= 85;

    // Update student stats in DB
    const user = USERS_DB[DEFAULT_USER_ID];
    if (user) {
      user.xpPoints += score * 20 + 50; // XP reward
      user.testHistory.unshift({
        date: new Date().toISOString().split('T')[0],
        stream: targetStream,
        score,
        total,
        percentage,
        timeTakenSeconds: timeTakenSeconds || 900,
      });
      // Increment streak
      user.streakCount = (user.streakCount || 0) + 1;
    }

    // Dynamic AI Recommendation note
    let recommendation = "";
    if (percentage >= 85) {
      recommendation = `🌟 Exceptional performance (${percentage}%)! You meet the 80% CS benchmark. You can progress to specialized Computer Science learning.`;
    } else if (percentage >= 60) {
      recommendation = `👍 Good foundational effort (${percentage}%). Strengthen weak conceptual areas in ${targetStream} subjects using our video lectures before your next mock attempt.`;
    } else {
      recommendation = `💡 Foundational boost recommended (${percentage}%). IntelliPath recommends starting with Phase 1 Concept Bridge videos in our Learning Hub to master key board formulas.`;
    }

    res.json({
      success: true,
      score,
      total,
      percentage,
      passed85Rule,
      timeTakenSeconds: timeTakenSeconds || 0,
      recommendation,
      breakdown,
      updatedXp: user ? user.xpPoints : 500,
      updatedStreak: user ? user.streakCount : 5
    });
  });

  // ================= 3. AI ROADMAP GENERATOR =================
  app.post("/api/roadmap/generate", async (req, res) => {
    try {
      const { goal, marks, stream } = req.body || {};
      const user = USERS_DB[DEFAULT_USER_ID];
      const targetGoal = goal || user?.goal || "Software Engineering";
      const targetStream = stream || user?.stream || "Computer Science";
      const targetMarks = marks ?? user?.interMarks ?? 0;
      const ai = getAiClient();

      if (!ai) {
        return res.json({
          success: true,
          roadmap: [
            { phase: "Foundation", duration: "4 weeks", focus: ["Programming fundamentals", "Data structures", "Problem solving"] },
            { phase: "Core Skills", duration: "6 weeks", focus: ["Databases", "APIs", "Git", "Software engineering"] },
            { phase: "Projects", duration: "6 weeks", focus: ["2 portfolio projects", "Testing", "Documentation"] },
            { phase: "Career Ready", duration: "4 weeks", focus: ["Resume", "GitHub", "Interview preparation"] }
          ],
          goal: targetGoal,
          stream: targetStream,
          marks: targetMarks
        });
      }

      const prompt = `Create a practical Computer Science career roadmap for a student. Goal: ${targetGoal}. Academic stream: ${targetStream}. Marks: ${targetMarks}. Return concise JSON with phases, duration, focus skills, and projects. Do not invent personal facts.`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });
      let roadmap: any = null;
      try { roadmap = JSON.parse(response.text || "{}"); } catch {}
      return res.json({ success: true, roadmap, goal: targetGoal, stream: targetStream, marks: targetMarks });
    } catch (error) {
      console.error("Error in /api/roadmap/generate:", error);
      return res.json({ success: false, error: "Unable to generate roadmap right now." });
    }
  });

  // ================= 4. AI CHAT =================
  app.post("/api/aiguider/chat", async (req, res) => {
    const body = req.body || {};
    const message = String(body.message || "").trim();
    const history = Array.isArray(body.history) ? body.history : [];
    const user = USERS_DB[DEFAULT_USER_ID];
    const student = body.userContext || {};

    if (!message) {
      return res.status(400).json({ success: false, error: "Please enter a question." });
    }

    const studentName = student.name || user?.name || "Student";
    const studentField = student.academicField || student.education || user?.stream || "Computer Science";
    const studentCareer = student.career || user?.goal || "Software Engineering";
    const language = body.language || (/\b(kya|kaise|kyun|mujhe|mere|meri|aap|batao|samjhao|hai|hain|mujay|mujhe|kro|karna)\b/i.test(message) ? "Roman Urdu" : "English");

    // Deterministic answers for common factual/technical questions. This prevents generic AI replies
    // when the student asks a simple question that has a precise answer.
    const q = message.toLowerCase().replace(/[?!.]/g, " ").replace(/\s+/g, " ").trim();
    const directAnswers: Array<[RegExp, string]> = [
      [/^what is (html|html5)\b|\b(html|html5) kya hai\b|\bhtml samjhao\b/i,
        "HTML (HyperText Markup Language) web page ki structure banata hai. Headings, paragraphs, links, images, forms aur sections HTML elements se define hote hain. CSS design/styling karta hai aur JavaScript behavior add karta hai. Example: <h1>Hello</h1> ek heading banata hai."],
      [/^what is css\b|\bcss kya hai\b|\bcss samjhao\b/i,
        "CSS (Cascading Style Sheets) HTML elements ki presentation control karta hai—colors, spacing, fonts, layout aur responsive design. Example: `p { font-size: 18px; }` tamam p elements ka font size 18px karta hai."],
      [/^what is javascript\b|\bjavascript kya hai\b|\bjs kya hai\b/i,
        "JavaScript ek programming language hai jo web pages ko interactive banati hai. Ye browser mein run ho sakti hai aur Node.js ke through server par bhi. Is se events, DOM updates, API calls aur application logic implement hota hai."],
      [/\bwhat is react\b|\breact kya hai\b|\breact samjhao\b/i,
        "React ek JavaScript library hai jo reusable UI components banane ke liye use hoti hai. Important concepts: components, JSX, props, state, events, hooks aur routing. React khud backend/database nahi hai."],
      [/\bwhat is node(\.js|js)?\b|\bnode(\.js|js)? kya hai\b/i,
        "Node.js JavaScript runtime hai jo JavaScript ko browser ke bahar, specially server-side, run karta hai. Is se APIs, web servers, authentication aur backend applications banayi ja sakti hain."],
      [/\bwhat is express(\.js|js)?\b|\bexpress(\.js|js)? kya hai\b/i,
        "Express.js Node.js ka lightweight web framework hai. Ye routes, HTTP requests/responses, middleware aur REST APIs banana easy karta hai. MERN stack mein Express backend/API layer ke liye use hota hai."],
      [/\bwhat is mongodb\b|\bmongodb kya hai\b/i,
        "MongoDB ek NoSQL document database hai. Data JSON-like BSON documents mein collections ke andar store hota hai. MERN mein MongoDB database, Express/Node backend aur React frontend provide karta hai."],
      [/\bwhat is sql\b|\bsql kya hai\b/i,
        "SQL (Structured Query Language) relational databases mein data create, read, update aur delete karne ke liye use hoti hai. Example: `SELECT name FROM students WHERE marks >= 80;`"],
      [/\bwhat is api\b|\bapi kya hai\b|\bapi samjhao\b/i,
        "API (Application Programming Interface) software systems ke darmiyan communication ka interface hai. Web API mein client HTTP request bhejta hai, server processing karta hai aur aksar JSON response deta hai. Common methods: GET, POST, PUT/PATCH, DELETE."],
      [/\bwhat is rest api\b|\brest api kya hai\b/i,
        "REST API HTTP-based API design approach hai jahan resources URLs se represent hote hain. GET data read, POST create, PUT/PATCH update aur DELETE remove karne ke liye commonly use hote hain."],
      [/\bwhat is git\b|\bgit kya hai\b/i,
        "Git distributed version control system hai. Ye code changes ka history maintain karta hai aur branches, commits aur merging ke zariye team collaboration enable karta hai."],
      [/\bwhat is github\b|\bgithub kya hai\b/i,
        "GitHub online platform hai jahan Git repositories host hoti hain. Is mein code collaboration, pull requests, issues, project management aur CI/CD integrations milti hain. Git version control system hai; GitHub hosting/collaboration platform hai."],
      [/\bwhat is docker\b|\bdocker kya hai\b/i,
        "Docker applications ko containers mein package aur run karne ka platform hai. Container app ke code aur required dependencies ko isolated environment mein run karta hai, jis se 'works on my machine' problem kam hoti hai."],
      [/\bwhat is devops\b|\bdevops kya hai\b/i,
        "DevOps development aur operations ko automate aur collaborate karne ka approach hai. Core areas: Git, Linux, CI/CD, Docker/containers, cloud, infrastructure automation, monitoring aur security."],
      [/\bwhat is recursion\b|\brecursion kya hai\b|\brecursion samjhao\b/i,
        "Recursion mein function khud ko smaller input ke saath call karta hai. Do cheezen zaroori hain: base case jo recursion rokta hai, aur recursive case jo problem ko chhota karta hai. Factorial: `fact(n) = n * fact(n-1)`, with `fact(0)=1`."],
      [/\bbinary search\b.*\bwhat|\bwhat is binary search\b|\bbinary search kya hai\b/i,
        "Binary search sorted array/list mein middle element check karke har step par search space ko half karta hai. Time complexity O(log n), aur iterative version ki extra space O(1) hoti hai. Example: sorted `[10,20,30,40,50]` mein 40 ko middle comparisons se find kiya ja sakta hai."],
      [/\btime complexity\b.*\bwhat|\bwhat is time complexity\b|\btime complexity kya hai\b/i,
        "Time complexity input size barhne par algorithm ke running work ko describe karti hai. Common complexities O(1), O(log n), O(n), O(n log n) aur O(n²) hain. Ye exact seconds nahi batati; growth rate batati hai."],
      [/\bstack\b.*\bqueue\b|\bstack and queue\b|\bstack aur queue\b/i,
        "Stack LIFO (Last In, First Out) follow karta hai; main operations push aur pop hain. Queue FIFO (First In, First Out) follow karti hai; main operations enqueue aur dequeue hain. Stack undo/call-stack mein aur queue scheduling/BFS mein useful hai."],
      [/\bwhat is oop\b|\boop kya hai\b|\bobject oriented programming\b/i,
        "OOP (Object-Oriented Programming) software ko objects/classes ke around organize karta hai. Four common principles encapsulation, abstraction, inheritance aur polymorphism hain."],
      [/\bwhat is dbms\b|\bdbms kya hai\b/i,
        "DBMS (Database Management System) software hai jo databases ko create, store, query, update aur manage karta hai. Examples MySQL, PostgreSQL, Oracle aur SQL Server hain."],
      [/\bwhat is operating system\b|\bos kya hai\b|\boperating system kya hai\b/i,
        "Operating System system software hai jo hardware resources manage karta hai aur applications ko services provide karta hai. Major responsibilities process management, memory management, file management, device/I/O management aur security hain."],
      [/\bwhat is process\b.*\bos|\bprocess kya hai\b/i,
        "Operating Systems mein process ek program ka executing instance hota hai. Is ke paas apna execution state, program counter, registers aur allocated resources hote hain. Process states commonly New, Ready, Running, Waiting/Blocked aur Terminated hoti hain."],
      [/\bwhat is thread\b|\bthread kya hai\b/i,
        "Thread process ke andar execution ka lightweight unit hai. Ek process ke multiple threads code/data/resources share kar sakte hain, lekin har thread ka apna stack aur execution state hota hai."],
      [/\bwhat is cache\b|\bcache kya hai\b/i,
        "Cache CPU ke qareeb fast memory hai jo frequently/recently used data aur instructions temporarily rakhti hai. Cache hit par data cache se mil jata hai; cache miss par slower memory se fetch karna padta hai."],
      [/\bwhat is ram\b|\bram kya hai\b/i,
        "RAM (Random Access Memory) volatile main memory hai jahan currently running programs aur data temporarily store hote hain. Power off hone par RAM ka normal contents lose ho jata hai."],
      [/\bwhat is compiler\b|\bcompiler kya hai\b/i,
        "Compiler source code ko target form, commonly machine code/object code, mein translate karta hai before execution. Compiler errors aksar build/compile stage par report hote hain."],
      [/\bwhat is algorithm\b|\balgorithm kya hai\b/i,
        "Algorithm kisi problem ko solve karne ke liye well-defined step-by-step procedure hota hai. Achhe algorithm mein correctness, clear steps aur reasonable time/space complexity hoti hai."],
    ];

    let directReply = "";
    for (const [pattern, answer] of directAnswers) {
      if (pattern.test(q)) { directReply = answer; break; }
    }

    // More targeted career/platform answers.
    if (!directReply && /\b(cgpa|gpa)\b/i.test(q)) {
      if (/calculate|calculation|formula|how.*cgpa|cgpa.*calculate/i.test(q)) {
        directReply = "CGPA generally credit-hours weighted GPA ka average hota hai: CGPA = Σ(Grade Point × Credit Hours) / Σ(Credit Hours). Exact grading scale apni university ke official rules se verify karein. Agar aap subjects, credit hours aur grade points bhej dein to main calculation kar dunga.";
      } else if (/improv|increase|better|barha|behtar|improve/i.test(q)) {
        directReply = "CGPA improve karne ke liye: (1) low-scoring subjects identify karein, (2) high-credit subjects ko priority dein, (3) past papers aur practice questions solve karein, (4) assignments/quizzes ke marks maximize karein, (5) weekly mistake review karein. Aap apne subjects aur current grades bhej dein to main subject-wise plan bana sakta hoon.";
      }
    }

    if (!directReply && /\b(85%|85 percent|85 rule|threshold)\b/i.test(q)) {
      directReply = "CareerPath ka 85% rule diagnostic assessment ke liye hai: 85% ya us se zyada score ho to selected CS career track ki readiness strong samjhi jati hai; 85% se kam ho to weak foundation areas ke liye targeted learning/resources recommend kiye jate hain. Ye student ko reject nahi karta—sirf preparation path adjust karta hai.";
    }

    if (!directReply && /\b(roadmap|next step|what should i learn|kya seekho|agla step)\b/i.test(q)) {
      directReply = `Aap ke current profile ke mutabiq pehla step **${studentCareer}** ke foundation skills complete karna hai. Recommended order: 1) programming fundamentals, 2) data structures & problem solving, 3) databases + APIs, 4) Git/GitHub, 5) 2 practical projects, 6) deployment + documentation. Roadmap mein jo item incomplete hai usay pehle complete karein.`;
    }

    if (!directReply && /\b(resources?|videos?|learning hub)\b/i.test(q)) {
      directReply = `Resources mein apne current CS category ke mutabiq material choose karein. Beginner se start karein, phir Intermediate aur Pro. Mobile Development, Web Development aur DevOps categories abhi **Coming Soon** hain, is liye unavailable category ka resource recommend nahi karunga.`;
    }

    if (!directReply && /\b(interview|resume|cv|portfolio)\b/i.test(q)) {
      directReply = "Career preparation ke liye 3 cheezen priority hain: (1) core CS concepts + problem solving, (2) 2–3 strong projects with GitHub README, screenshots/tests and deployment evidence, (3) one-page targeted resume. Interview answer mein concept, approach, trade-offs aur example clearly explain karein.";
    }

    // If we have a precise deterministic answer, return it without asking the LLM to rewrite it.
    if (directReply) {
      const roman = /\b(kya|kaise|kyun|mujhe|mere|meri|aap|batao|samjhao|hai|hain|mujay|kro|karna)\b/i.test(message);
      if (roman && !/[\u0600-\u06FF]/.test(message)) {
        // Keep technical terms in English but make the explanation natural Roman Urdu.
        directReply = directReply
          .replace(/^HTML \(HyperText Markup Language\) web page ki structure banata hai\./, "HTML (HyperText Markup Language) web page ki structure banane ke liye use hota hai.")
          .replace(/^CSS \(Cascading Style Sheets\) HTML elements ki presentation control karta hai/, "CSS (Cascading Style Sheets) HTML elements ka design aur presentation control karta hai");
      }
      return res.json({ success: true, reply: directReply, source: "direct-answer" });
    }

    // Explicitly reject clearly unrelated questions instead of hallucinating a generic career answer.
    const csTerms = /(program|code|coding|software|computer|cs|it|database|sql|python|javascript|java|react|node|html|css|api|git|github|docker|devops|cloud|network|operating system|os|algorithm|data structure|ai|machine learning|cyber|security|web|mobile|app|career|resume|cv|portfolio|roadmap|course|resource|assessment|cgpa|gpa|aptitude|project|interview|technical)/i;
    const clearlyUnrelated = /^(what is|how to|why|who is|tell me about|kya|kaise|kyun|kon|batao)/i.test(q) && !csTerms.test(q);
    if (clearlyUnrelated) {
      return res.json({ success: true, reply: "Main CareerPath AI ka Computer Science aur technical-career assistant hoon. Please CS, programming, databases, networking, OS, AI, web/mobile development, DevOps ya career-learning se related question poochein.", source: "scope" });
    }

    const ai = getAiClient();
    if (!ai) {
      return res.json({ success: true, reply: `I couldn't find a specific answer in my built-in CS knowledge for: "${message}". Please rephrase the question or include the exact concept/code/problem you want explained.`, fallback: true });
    }

    const contents: any[] = [];
    for (const item of history.slice(-10)) {
      const role = item?.role === "user" || item?.sender === "user" ? "user" : "model";
      const text = String(item?.content || item?.text || "").trim();
      if (text) contents.push({ role, parts: [{ text }] });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const systemInstruction = `You are CareerPath AI Coach. Answer the student's ACTUAL question first. You are primarily a Computer Science and technical-career tutor.

Student context:
- Name: ${studentName}
- Academic field: ${studentField}
- Career goal: ${studentCareer}
- Marks: ${student.marksPercentage ?? user?.interMarks ?? "Not provided"}
- Aptitude score: ${student.aptitudeScore ?? "Not assessed"}
- Interests: ${Array.isArray(student.interests) ? student.interests.join(", ") : student.interests || "Not provided"}

Strict rules:
1. Never substitute a generic career speech for a specific question.
2. For factual CS questions, give the definition first, then key points, then a small correct example if useful.
3. For code/debugging questions, inspect the supplied code carefully, identify the exact issue, and give corrected code. Never pretend code was executed if it was not.
4. For math/logic/algorithm questions, solve directly and show concise steps.
5. For comparisons, use clear side-by-side points and state when each option is appropriate.
6. Do not invent marks, grades, institutions, projects, achievements or resources.
7. If information is missing and is necessary for a personalized answer, ask one concise clarification.
8. Stay within Computer Science, IT, programming and technical-career learning. For unrelated questions, politely redirect.
9. Use the same language style as the user. For Roman Urdu, explain naturally in Roman Urdu while keeping technical terms in English.
10. Do not claim that unavailable CareerPath resources exist. Mobile Development, Web Development and DevOps are Coming Soon in the app.
11. Do not use raw markdown heading hashes. Keep answers concise but complete.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: { systemInstruction, temperature: 0.2 },
      });
      let reply = String(response.text || "").trim();
      if (!reply) throw new Error("Empty AI response");
      reply = reply.replace(/^#{1,6}\s*/gm, "").replace(/#\w+/g, "");
      return res.json({ success: true, reply, source: "ai" });
    } catch (error: any) {
      console.error("Error in /api/aiguider/chat:", error);
      return res.json({
        success: true,
        reply: `I couldn't generate a reliable answer for that question right now. Please rephrase it with the exact CS topic, code, or problem statement so I can answer it directly.`,
        fallback: true,
      });
    }
  });

  // Backward-compatible chat endpoint used by the main chatbot page.
  app.post("/api/chat", async (req, res) => {
    req.url = "/api/aiguider/chat";
    app._router.handle(req, res);
  });

  // ================= 5. CONSISTENCY & STREAK SYSTEM =================
  app.get("/api/streak", (req, res) => {
    const user = USERS_DB[DEFAULT_USER_ID];
    
    // Generate 30-day activity status array for the heatmap calendar
    const today = new Date();
    const calendar = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      // Simulate active days with higher activity in the last 7 days
      const isActive = i < (user?.streakCount || 5) || (i % 3 === 0);
      calendar.push({
        date: dateStr,
        dayOfWeek: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayOfMonth: d.getDate(),
        active: isActive,
        questionsSolved: isActive ? Math.floor(Math.random() * 15) + 10 : 0,
      });
    }

    res.json({
      success: true,
      currentStreak: user?.streakCount || 5,
      highestStreak: 14,
      totalXp: user?.xpPoints || 1250,
      reports: {
        dailyCompletion: 85, // 85% today's tasks completed
        weeklyCompletion: 78,
        monthlyCompletion: 92,
      },
      calendar
    });
  });

  app.post("/api/streak/check-in", (req, res) => {
    const user = USERS_DB[DEFAULT_USER_ID];
    if (user) {
      user.streakCount += 1;
      user.xpPoints += 50;
      user.lastActiveDate = new Date().toISOString().split('T')[0];
      return res.json({
        success: true,
        streakCount: user.streakCount,
        xpPoints: user.xpPoints,
        message: "🔥 Daily Check-in recorded! +50 XP"
      });
    }
    res.status(404).json({ success: false, error: "User not found" });
  });

  // ================= 6. STUDY TASKS API =================
  app.get("/api/tasks", (req, res) => {
    const user = USERS_DB[DEFAULT_USER_ID];
    const stream = user?.stream || 'Computer Science';

    const sampleTasks = [
      {
        id: 'task-1',
        title: `10-Question Daily Mock Test (${stream})`,
        category: 'Assessment',
        xp: 100,
        completed: user.completedTasks.includes('task-1'),
        duration: '15 Mins',
        dueTime: 'Today, 2:00 PM'
      },
      {
        id: 'task-2',
        title: 'Formula Revision & High-Yield Summary',
        category: 'Revision',
        xp: 50,
        completed: user.completedTasks.includes('task-2'),
        duration: '20 Mins',
        dueTime: 'Today, 5:00 PM'
      },
      {
        id: 'task-3',
        title: 'Watch Conceptual Masterclass in Learning Hub',
        category: 'Video Lecture',
        xp: 75,
        completed: user.completedTasks.includes('task-3'),
        duration: '15 Mins',
        dueTime: 'Today, 8:00 PM'
      },
      {
        id: 'task-4',
        title: 'AI Guider Doubt Solving Session (2 Questions)',
        category: 'AI Mentor',
        xp: 40,
        completed: user.completedTasks.includes('task-4'),
        duration: '10 Mins',
        dueTime: 'Today, 10:00 PM'
      }
    ];

    res.json({ success: true, tasks: sampleTasks });
  });

  app.post("/api/tasks/toggle", (req, res) => {
    const { taskId } = req.body;
    const user = USERS_DB[DEFAULT_USER_ID];
    if (user && taskId) {
      if (user.completedTasks.includes(taskId)) {
        user.completedTasks = user.completedTasks.filter(id => id !== taskId);
      } else {
        user.completedTasks.push(taskId);
        user.xpPoints += 50;
      }
      return res.json({
        success: true,
        completedTasks: user.completedTasks,
        xpPoints: user.xpPoints
      });
    }
    res.status(400).json({ success: false, error: "Invalid task ID" });
  });

  // ================= 8. LEARNING HUB & VIDEO PLAYER =================
  app.get("/api/learning-hub", (req, res) => {
    const user = USERS_DB[DEFAULT_USER_ID];
    const stream = (req.query.stream as string) || user.stream || 'Computer Science';
    
    // Attach watch time and progress
    const lectures = PAKISTANI_LECTURE_LIBRARY.map(lec => {
      const watched = user.watchTimeSeconds[lec.id] || 0;
      const progressPercent = Math.min(100, Math.round((watched / lec.durationSeconds) * 100));
      return {
        ...lec,
        watchedSeconds: watched,
        progressPercent,
        isCompleted: progressPercent >= 90
      };
    });

    res.json({
      success: true,
      currentStream: stream,
      lectures
    });
  });

  app.post("/api/learning-hub/progress", (req, res) => {
    const { lectureId, watchedSeconds } = req.body;
    const user = USERS_DB[DEFAULT_USER_ID];
    if (user && lectureId) {
      user.watchTimeSeconds[lectureId] = Math.max(
        user.watchTimeSeconds[lectureId] || 0,
        Number(watchedSeconds) || 0
      );
      return res.json({
        success: true,
        lectureId,
        watchedSeconds: user.watchTimeSeconds[lectureId],
        message: "Progress recorded"
      });
    }
    res.status(400).json({ success: false, error: "Invalid parameters" });
  });

  // ================= 7. CAREERPATH CS RESOURCES =================
  app.get("/api/resources/pathfinder", (req, res) => {
    // Pathfinder resource model is intentionally scoped to the Computer Science domain.
    res.json({ success: true, domain: 'Computer Science', resources: ALL_CAREERPATH_RESOURCES });
  });

  // ================= 8. DAILY NOTIFICATIONS =================
  app.get("/api/notifications", (req, res) => {
    const user = USERS_DB[DEFAULT_USER_ID];
    
    const notificationCards = [
      {
        id: 'notif-1',
        time: '08:00 AM',
        title: '🌅 Morning Revision Alarm',
        description: 'Review top 5 physics and biology formulas before college starts.',
        active: user.notificationSettings.morningRevision,
        type: 'morning'
      },
      {
        id: 'notif-2',
        time: '02:00 PM',
        title: '⏱️ Afternoon Entry Test Drill (15 Min)',
        description: 'Complete today’s 10-Question timed mock test to keep your streak alive!',
        active: user.notificationSettings.afternoonEntryTest,
        type: 'afternoon'
      },
      {
        id: 'notif-3',
        time: '07:00 PM',
        title: '🎯 Evening Concept Booster',
        description: 'Watch the high-yield video lecture on Krebs cycle / Calculus shortcuts.',
        active: user.notificationSettings.eveningMockChallenge,
        type: 'evening'
      },
      {
        id: 'notif-4',
        time: '10:00 PM',
        title: '🔥 Night Consistency & Check-in',
        description: 'Reflect on today’s completed tasks and claim your +50 XP streak bonus.',
        active: user.notificationSettings.nightConsistencyCheck,
        type: 'night'
      }
    ];

    res.json({
      success: true,
      notifications: notificationCards
    });
  });

  app.post("/api/notifications/toggle", (req, res) => {
    const { key, value } = req.body;
    const user = USERS_DB[DEFAULT_USER_ID];
    if (user && key in user.notificationSettings) {
      (user.notificationSettings as any)[key] = Boolean(value);
      return res.json({
        success: true,
        notificationSettings: user.notificationSettings,
        message: `Notification preference updated for ${key}`
      });
    }
    res.status(400).json({ success: false, error: "Invalid notification key" });
  });

  function buildProjectFallback(project: any, submission: any): ProjectAIFeedbackShape {
    const notes = String(submission?.notes || '').toLowerCase();
    const hasGithub = /^https?:\/\/(www\.)?github\.com\//i.test(String(submission?.githubUrl || ''));
    const hasDeployment = /^https?:\/\//i.test(String(submission?.liveUrl || ''));
    const score = Math.min(100, 70 + (hasGithub ? 10 : 0) + (hasDeployment ? 10 : 0) + (notes.includes('test') ? 3 : 0) + (notes.includes('api') ? 3 : 0) + (notes.includes('responsive') ? 4 : 0));
    return {
      score,
      marketFitScore: score,
      marketReview: `${project?.title || 'This project'} has the two most important portfolio evidence links: source-code and deployment. The review is evidence-based; deeper code-level claims require the repository to be publicly accessible and independently inspected. Prioritize testing, security, accessibility, documentation and measurable user impact for stronger industry readiness.`,
      strengths: ['GitHub source-code evidence is included.', 'A live deployment makes the project easy to demonstrate.', `The project is aligned with the ${project?.category || 'Computer Science'} category and ${project?.stage || 'assigned'} level.`],
      weaknesses: ['Add automated tests and CI.', 'Improve README architecture and setup documentation.', 'Add security, accessibility, performance and error-handling evidence.'],
      mistakes: ['Review edge cases, validation, loading/error states and deployment configuration before finalizing.'],
      suggestions: ['Add screenshots and an architecture diagram to README.', 'Add GitHub Actions for linting and tests.', 'Document measurable impact and the main user problem solved.'],
      nextSteps: ['Fix the highest-impact weaknesses and resubmit.', 'Keep the repository and deployment current as the roadmap advances.'],
      reviewedAt: new Date().toISOString(),
    };
  }

  type ProjectAIFeedbackShape = {
    score: number;
    marketFitScore: number;
    marketReview: string;
    strengths: string[];
    weaknesses: string[];
    mistakes: string[];
    suggestions: string[];
    nextSteps: string[];
    reviewedAt: string;
  };

  // ================= 9. AI PROJECT REVIEW =================
  app.post("/api/projects/analyze", async (req, res) => {
    try {
      const { project, submission } = req.body || {};
      if (!project || !submission?.githubUrl || !submission?.liveUrl) {
        return res.status(400).json({ success: false, error: "Project, GitHub URL and live URL are required." });
      }

      const githubOk = /^https?:\/\/(www\.)?github\.com\//i.test(String(submission.githubUrl));
      const liveOk = /^https?:\/\//i.test(String(submission.liveUrl));
      if (!githubOk || !liveOk) {
        return res.status(400).json({ success: false, error: "Please submit a valid GitHub URL and deployed URL." });
      }

      const ai = getAiClient();
      if (!ai) {
        return res.json({ success: true, feedback: buildProjectFallback(project, submission) });
      }

      const prompt = `You are a senior software engineering hiring reviewer. Evaluate this student's Computer Science project against realistic industry expectations. Do NOT claim you inspected private code or URLs. Judge only the evidence supplied below: project title, category, level, requirements, skills, GitHub URL, deployment URL and notes.

Project:
${JSON.stringify({
        title: project.title,
        category: project.category,
        stage: project.stage,
        difficulty: project.difficulty,
        description: project.description,
        requirements: project.requirements,
        skillsTested: project.skillsTested,
      }, null, 2)}

Submission:
${JSON.stringify(submission, null, 2)}

Return ONLY valid JSON with this shape:
{
  "score": number 0-100,
  "marketFitScore": number 0-100,
  "marketReview": "string",
  "strengths": ["string", "string", "string"],
  "weaknesses": ["string", "string", "string"],
  "mistakes": ["string", "string"],
  "suggestions": ["string", "string", "string"],
  "nextSteps": ["string", "string"],
  "reviewedAt": "ISO timestamp"
}
Score based on requirements alignment, portfolio evidence, engineering maturity, deployment evidence, testing/documentation expectations, security/accessibility/performance awareness and market relevance. Be honest about evidence limitations.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });

      let feedback: any = null;
      try { feedback = JSON.parse(response.text || "{}"); } catch {}
      if (!feedback || typeof feedback.score !== "number") {
        feedback = buildProjectFallback(project, submission);
      }
      feedback.score = Math.max(0, Math.min(100, Math.round(Number(feedback.score))));
      feedback.marketFitScore = Math.max(0, Math.min(100, Math.round(Number(feedback.marketFitScore ?? feedback.score))));
      feedback.reviewedAt = new Date().toISOString();
      return res.json({ success: true, feedback });
    } catch (error) {
      console.error("Error in /api/projects/analyze:", error);
      return res.json({ success: true, feedback: buildProjectFallback(req.body?.project || {}, req.body?.submission || {}) });
    }
  });

  app.use((req, res) => {
    res.status(404).json({ success: false, message: "API route not found." });
  });

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CareerPath AI API running on http://localhost:${PORT}`);
  });
}

startServer();
