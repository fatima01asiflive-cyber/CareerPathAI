export interface CourseRoadmapMilestone {
  id: string;
  week: number;
  title: string;
  description: string;
  topics: string[];
  estimatedHours: number;
  completed: boolean;
}

export interface CourseVideoResource {
  id: string;
  title: string;
  channel: string;
  duration: string;
  url: string;
  thumbnail?: string;
  topic: string;
}

export interface CourseDocResource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  description: string;
  type: string;
}

export interface CourseReadingResource {
  id: string;
  title: string;
  authorOrSource: string;
  url: string;
  summary: string;
}

export interface CoursePracticeResource {
  id: string;
  title: string;
  platform: string;
  task: string;
  solutionTip: string;
}

export interface CourseAssignmentResource {
  id: string;
  title: string;
  deliverable: string;
  instructions: string;
}

export interface CourseCapstoneProject {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  requirements: string[];
  skillsTested: string[];
  deliverableType: string;
}

export interface CourseResourceBundle {
  videos: CourseVideoResource[];
  documentation: CourseDocResource[];
  reading: CourseReadingResource[];
  practice: CoursePracticeResource[];
  assignments: CourseAssignmentResource[];
  project: CourseCapstoneProject;
}

export interface CourseDetailItem {
  id: string;
  title: string;
  category: string;
  domain: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  aptitudeTier: 'tier1_advanced' | 'tier2_intermediate' | 'tier3_foundation' | 'tier4_early';
  duration: string;
  rating: number;
  studentsCount: number;
  matchScore: number;
  description: string;
  whyRecommended: string;
  skillsGained: string[];
  objectives: string[];
  roadmap: CourseRoadmapMilestone[];
  resources: CourseResourceBundle;
  progress: number;
  isEnrolled: boolean;
  isCompleted: boolean;
}

export const COMPREHENSIVE_COURSES_DATA: CourseDetailItem[] = [
  // =========================================================================
  // 1. TECHNOLOGY / SOFTWARE DEVELOPMENT - FOUNDATION (40-59% & <40%)
  // =========================================================================
  {
    id: 'tech-programming-fundamentals',
    title: 'Programming Fundamentals',
    category: 'Software Development',
    domain: 'Technology',
    level: 'Beginner',
    aptitudeTier: 'tier3_foundation',
    duration: '8 Weeks',
    rating: 4.94,
    studentsCount: 19800,
    matchScore: 92,
    description: 'Build your core programming foundation from ground zero. Master variables, control flow, functions, arrays, and structured algorithmic problem solving.',
    whyRecommended: 'Perfect starting point to strengthen computational logic and build rock-solid coding foundations before moving to specialized frameworks.',
    skillsGained: ['Logic & Problem Solving', 'Variables & Data Types', 'Conditional Logic', 'Loops & Iterations', 'Functions & Scope', 'Arrays & Lists'],
    objectives: [
      'Understand how computers execute instructions and manage memory',
      'Write modular code using pure functions and control structures',
      'Solve algorithmic problems step-by-step using pseudo-code and code',
      'Build a complete console application as your final beginner project'
    ],
    progress: 0,
    isEnrolled: true,
    isCompleted: false,
    roadmap: [
      {
        id: 'pf-w1',
        week: 1,
        title: 'Week 1: Programming Concepts & Environment Setup',
        description: 'Understand compilers, interpreters, syntax basics, and IDE workflow setup.',
        topics: ['What is Code', 'Compilers vs Interpreters', 'IDE Setup (VS Code)', 'Writing First Script'],
        estimatedHours: 6,
        completed: false,
      },
      {
        id: 'pf-w2',
        week: 2,
        title: 'Week 2: Variables, Constants & Data Types',
        description: 'Master memory allocation, integers, floats, strings, booleans, and type conversions.',
        topics: ['Integers & Floats', 'Strings & Concatenation', 'Booleans', 'Type Casting'],
        estimatedHours: 8,
        completed: false,
      },
      {
        id: 'pf-w3',
        week: 3,
        title: 'Week 3: Conditions & Decision Making',
        description: 'Use if, else-if, else branches, ternary operators, and logical boolean algebra.',
        topics: ['If-Else Branches', 'Nested Conditions', 'Comparison Operators', 'Logical AND/OR/NOT'],
        estimatedHours: 7,
        completed: false,
      },
      {
        id: 'pf-w4',
        week: 4,
        title: 'Week 4: Loops & Iterative Execution',
        description: 'Master for loops, while loops, break/continue statements, and avoiding infinite loops.',
        topics: ['For Loops', 'While Loops', 'Loop Counters', 'Break & Continue Patterns'],
        estimatedHours: 8,
        completed: false,
      },
      {
        id: 'pf-w5',
        week: 5,
        title: 'Week 5: Functions, Parameters & Return Values',
        description: 'Encapsulate repeatable logic into clean, testable functions with parameters and return values.',
        topics: ['Function Declarations', 'Arguments & Parameters', 'Return Values', 'Local vs Global Scope'],
        estimatedHours: 8,
        completed: false,
      },
      {
        id: 'pf-w6',
        week: 6,
        title: 'Week 6: Arrays, Lists & Data Collections',
        description: 'Store, index, mutate, slice, and iterate over lists and arrays of elements.',
        topics: ['Array Indexing (0-indexed)', 'Array Insertion & Deletion', 'Iterating Arrays', 'Multi-dimensional Lists'],
        estimatedHours: 9,
        completed: false,
      },
      {
        id: 'pf-w7',
        week: 7,
        title: 'Week 7: Algorithmic Problem Solving & Debugging',
        description: 'Apply pattern recognition, boundary testing, debugging tools, and modular design.',
        topics: ['Edge Cases', 'Console Debugging', 'Sorting Basics', 'Search Algorithms (Linear Search)'],
        estimatedHours: 10,
        completed: false,
      },
      {
        id: 'pf-w8',
        week: 8,
        title: 'Week 8: Final Capstone Project - Student Grade Calculator',
        description: 'Synthesize all 7 weeks into a complete, structured Grade Calculator application.',
        topics: ['Project Architecture', 'Input Validation', 'Grade Calculation Engine', 'Report Generation'],
        estimatedHours: 12,
        completed: false,
      },
    ],
    resources: {
      videos: [
        {
          id: 'v-pf-1',
          title: 'Programming Fundamentals for Absolute Beginners (Crash Course)',
          channel: 'freeCodeCamp.org',
          duration: '2h 15m',
          url: 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
          topic: 'Foundations & Concepts',
        },
        {
          id: 'v-pf-2',
          title: 'Variables, Data Types & Memory Allocation Explained Visually',
          channel: 'Traversy Media',
          duration: '45m',
          url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
          topic: 'Data Types',
        },
        {
          id: 'v-pf-3',
          title: 'Mastering Loops & Conditionals with Real Exercises',
          channel: 'Programming with Mosh',
          duration: '1h 10m',
          url: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
          topic: 'Loops & Branches',
        },
        {
          id: 'v-pf-4',
          title: 'How to Think Like a Programmer - Problem Solving Strategies',
          channel: 'CS Dojo',
          duration: '32m',
          url: 'https://www.youtube.com/watch?v=azcrPFhaY9k',
          topic: 'Problem Solving',
        },
      ],
      documentation: [
        {
          id: 'd-pf-1',
          title: 'Harvard CS50: Introduction to Computer Science Course Reader',
          publisher: 'Harvard University',
          url: 'https://cs50.harvard.edu/x/',
          description: 'Official lecture notes on computational thinking, algorithmic precision, and foundational programming models.',
          type: 'Official Course Reader',
        },
        {
          id: 'd-pf-2',
          title: 'MDN Web Docs: JavaScript First Steps & Programming Basics',
          publisher: 'Mozilla Developer Network',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps',
          description: 'Standard developer reference covering variables, math, strings, and arrays with live interactive exercises.',
          type: 'Official Documentation',
        },
      ],
      reading: [
        {
          id: 'r-pf-1',
          title: 'Clean Code: Meaningful Names & Function Boundaries',
          authorOrSource: 'Robert C. Martin / Pragmatic Guide',
          url: 'https://github.com/ryanmcdermott/clean-code-javascript',
          summary: 'Guidelines on naming variables clearly, keeping functions small, and writing self-documenting code.',
        },
      ],
      practice: [
        {
          id: 'p-pf-1',
          title: 'Beginner Logic: Sum of Array Elements & Even/Odd Checker',
          platform: 'IntelliPath Interactive Sandbox',
          task: 'Write a function that receives a list of numbers and returns the sum of all even numbers.',
          solutionTip: 'Use a loop with modulo operator (num % 2 === 0) and accumulate into a sum variable.',
        },
        {
          id: 'p-pf-2',
          title: 'Grade Classifier: Percentage to Letter Grade Mapper',
          platform: 'IntelliPath Code Editor',
          task: 'Construct an if/else-if chain converting scores 0-100 into grades A, B, C, D, and F with input validation.',
          solutionTip: 'Check boundaries in descending order (score >= 90 first).',
        },
      ],
      assignments: [
        {
          id: 'a-pf-1',
          title: 'Lab 1: Terminal Interactive CLI Calculator',
          deliverable: 'A CLI script accepting two numbers and an operator (+, -, *, /) with division-by-zero protection.',
          instructions: 'Ensure all inputs are properly cast and formatted to 2 decimal places.',
        },
      ],
      project: {
        id: 'proj-grade-calculator',
        title: 'Student Grade & Performance Calculator',
        description: 'Develop a comprehensive student grade evaluation system that takes multiple subject marks, computes GPA, determines honors classification, and outputs a formatted student report card.',
        difficulty: 'Beginner',
        requirements: [
          'Accept student name, roll number, and 5 subject scores (0-100)',
          'Validate input ranges and reject invalid numbers with clear feedback',
          'Calculate total marks, percentage, letter grade, and grade points (GPA)',
          'Compute class rank, highest score, lowest score, and average',
          'Generate a clean, aligned summary report card table'
        ],
        skillsTested: ['Loops', 'Conditionals', 'Functions', 'Input Validation', 'Data Aggregation'],
        deliverableType: 'Console Application or Web GUI',
      },
    },
  },

  {
    id: 'tech-computer-fundamentals',
    title: 'Computer Fundamentals & Digital Literacy',
    category: 'Computer Science',
    domain: 'Technology',
    level: 'Beginner',
    aptitudeTier: 'tier4_early',
    duration: '6 Weeks',
    rating: 4.88,
    studentsCount: 14500,
    matchScore: 90,
    description: 'Learn how modern computers, hardware architectures, operating systems, binary systems, filesystems, and the Internet actually operate.',
    whyRecommended: 'Essential baseline foundation for students beginning their technology journey to understand hardware-software relationships.',
    skillsGained: ['Hardware Components', 'Binary & Logic Gates', 'Operating Systems', 'Networking Basics', 'Command Line', 'Internet Protocols'],
    objectives: [
      'Understand CPU, RAM, Cache, Storage, and GPU roles',
      'Convert between binary, decimal, and hexadecimal representations',
      'Navigate terminal/CLI and manage files with confidence',
      'Understand HTTP, DNS, IP addresses, and client-server models'
    ],
    progress: 0,
    isEnrolled: false,
    isCompleted: false,
    roadmap: [
      { id: 'cf-w1', week: 1, title: 'Week 1: Computer Hardware & Architecture', description: 'CPUs, ALU, RAM, storage hierarchy, and motherboards.', topics: ['CPU Architecture', 'Memory vs Storage', 'Motherboards & Buses', 'I/O Devices'], estimatedHours: 6, completed: false },
      { id: 'cf-w2', week: 2, title: 'Week 2: Binary, Number Systems & Logic Gates', description: 'Bits, bytes, hexadecimal, and boolean logic gates (AND, OR, NOT).', topics: ['Bits & Bytes', 'Hexadecimal Conversion', 'Logic Gates', 'Truth Tables'], estimatedHours: 7, completed: false },
      { id: 'cf-w3', week: 3, title: 'Week 3: Operating Systems & Process Management', description: 'How Windows/Linux manages processes, threads, and filesystems.', topics: ['Kernels & Drivers', 'Processes & Threads', 'Filesystems (FAT/NTFS/ext4)', 'Permissions'], estimatedHours: 7, completed: false },
      { id: 'cf-w4', week: 4, title: 'Week 4: Command Line & Terminal Mastery', description: 'Navigating directories, manipulating files, and environment variables.', topics: ['Terminal Basics', 'File Commands (ls, cd, mkdir, rm)', 'Environment Paths', 'Basic Scripting'], estimatedHours: 8, completed: false },
      { id: 'cf-w5', week: 5, title: 'Week 5: Internet Protocols, DNS & Web Basics', description: 'How information travels across the global internet infrastructure.', topics: ['TCP/IP Model', 'DNS Lookups', 'HTTP/HTTPS Requests', 'Client vs Server'], estimatedHours: 8, completed: false },
      { id: 'cf-w6', week: 6, title: 'Week 6: Final Project - Digital System Diagnostic Guide', description: 'Build an automated system info reporter and digital literacy portfolio.', topics: ['System Profiling', 'Diagnostic Scripts', 'Summary Presentation'], estimatedHours: 10, completed: false },
    ],
    resources: {
      videos: [
        { id: 'v-cf-1', title: 'How Computers Work: What Makes a Computer a Computer', channel: 'CrashCourse', duration: '1h 45m (Series)', url: 'https://www.youtube.com/watch?v=tpIctyqH29Q', topic: 'Hardware & OS' },
        { id: 'v-cf-2', title: 'Binary & Data Representation Masterclass', channel: 'Computerphile', duration: '28m', url: 'https://www.youtube.com/watch?v=5KMteoo888k', topic: 'Binary Systems' },
        { id: 'v-cf-3', title: 'How the Internet Works in 15 Minutes', channel: 'Aaron Jack', duration: '18m', url: 'https://www.youtube.com/watch?v=7_LPdttKXPc', topic: 'Networking & Web' },
      ],
      documentation: [
        { id: 'd-cf-1', title: 'Computer Systems: A Programmer\'s Perspective Reference', publisher: 'Carnegie Mellon University', url: 'https://csapp.cs.cmu.edu/', description: 'Hardware architecture and system software foundations.', type: 'Academic Reference' },
      ],
      reading: [
        { id: 'r-cf-1', title: 'How Computers Measure Speed, Memory and Bandwidth', authorOrSource: 'Explain That Stuff', url: 'https://www.explainthatstuff.com/howcomputerswork.html', summary: 'Visual explanations of clock speed, gigahertz, and gigabytes.' },
      ],
      practice: [
        { id: 'p-cf-1', title: 'Binary to Decimal Conversion Challenge', platform: 'IntelliPath Quiz', task: 'Convert binary 11010110 into its decimal equivalent without a calculator.', solutionTip: 'Multiply each bit position by 2^n (128 + 64 + 0 + 16 + 0 + 4 + 2 + 0 = 214).' },
      ],
      assignments: [
        { id: 'a-cf-1', title: 'Lab 1: Terminal File Structure Challenge', deliverable: 'Create a multi-tiered project folder hierarchy with 5 subfolders and 3 text files using only CLI commands.', instructions: 'Provide terminal command history as proof of execution.' },
      ],
      project: {
        id: 'proj-sys-diagnostic',
        title: 'Digital System Profiler & Network Inspector',
        description: 'Assemble a system diagnostics and network inspection script that scans local hardware specs, ping latency to major DNS servers, and checks disk space availability.',
        difficulty: 'Beginner',
        requirements: ['Inspect CPU, RAM, and Storage stats', 'Run ping latency test', 'Format output into a readable health summary'],
        skillsTested: ['CLI Tools', 'System Architecture', 'Networking Fundamentals'],
        deliverableType: 'Shell / Python Script or Markdown Analysis',
      },
    },
  },

  {
    id: 'tech-basic-problem-solving',
    title: 'Basic Problem Solving & Algorithmic Logic',
    category: 'Computer Science',
    domain: 'Technology',
    level: 'Beginner',
    aptitudeTier: 'tier3_foundation',
    duration: '6 Weeks',
    rating: 4.9,
    studentsCount: 16200,
    matchScore: 89,
    description: 'Learn how to decompose complex tasks, design flowcharts, write pseudocode, analyze step complexity, and solve logic puzzles methodically.',
    whyRecommended: 'Trains the exact computational intuition required for coding interviews, algorithmic reasoning, and software architecture.',
    skillsGained: ['Decomposition', 'Pattern Recognition', 'Pseudocode', 'Flowcharts', 'Edge Case Analysis', 'Big-O Basics'],
    objectives: [
      'Break multi-step word problems into structured atomic steps',
      'Design clear flowcharts with condition nodes and loops',
      'Trace code execution on paper to identify runtime bugs',
      'Build a text-based decision adventure engine'
    ],
    progress: 0,
    isEnrolled: false,
    isCompleted: false,
    roadmap: [
      { id: 'bps-w1', week: 1, title: 'Week 1: Algorithmic Decomposition', description: 'Breaking big problems into manageable sub-tasks.', topics: ['Problem Deconstruction', 'Atomic Steps', 'Inputs vs Outputs'], estimatedHours: 6, completed: false },
      { id: 'bps-w2', week: 2, title: 'Week 2: Flowcharts & Decision Trees', description: 'Visualizing logic flow and branching decision structures.', topics: ['Standard Flowchart Symbols', 'Decision Diamonds', 'Loop Cycles'], estimatedHours: 7, completed: false },
      { id: 'bps-w3', week: 3, title: 'Week 3: Writing Standard Pseudocode', description: 'Writing language-agnostic logic structures.', topics: ['Pseudocode Standards', 'Looping Constructs', 'Function Signatures'], estimatedHours: 7, completed: false },
      { id: 'bps-w4', week: 4, title: 'Week 4: Search & Sort Patterns', description: 'Linear vs Binary search, Bubble vs Insertion sort logic.', topics: ['Search Logic', 'Sorting Mechanics', 'Comparison Counters'], estimatedHours: 8, completed: false },
      { id: 'bps-w5', week: 5, title: 'Week 5: Edge Cases & Defensive Logic', description: 'Handling null, zero, negative, and infinite input scenarios.', topics: ['Boundary Conditions', 'Defensive Guard Clauses', 'Error States'], estimatedHours: 8, completed: false },
      { id: 'bps-w6', week: 6, title: 'Week 6: Final Project - Interactive Decision Engine', description: 'Construct a complete state machine logic game in pseudocode or code.', topics: ['State Machines', 'Branching Paths', 'Game Loop'], estimatedHours: 10, completed: false },
    ],
    resources: {
      videos: [
        { id: 'v-bps-1', title: 'Algorithmic Thinking & Problem Solving for Beginners', channel: 'MIT OpenCourseWare', duration: '50m', url: 'https://www.youtube.com/watch?v=0IAPZzGSbME', topic: 'Algorithm Design' },
        { id: 'v-bps-2', title: 'Flowcharts & Pseudocode Made Simple', channel: 'Lucid Software', duration: '22m', url: 'https://www.youtube.com/watch?v=8K_W5n76r7g', topic: 'Flowcharts' },
      ],
      documentation: [
        { id: 'd-bps-1', title: 'Standard Pseudocode Syntax Guide for Cambridge & Computer Science', publisher: 'Cambridge International', url: 'https://www.cambridgeinternational.org/', description: 'Rules for declaring variables, loops, arrays, and subroutines in pseudocode.', type: 'Syntax Guide' },
      ],
      reading: [
        { id: 'r-bps-1', title: 'Polya\'s Four Principles of Problem Solving', authorOrSource: 'George Polya - How to Solve It', url: 'https://en.wikipedia.org/wiki/How_to_Solve_It', summary: '1. Understand the problem 2. Devise a plan 3. Carry out the plan 4. Look back.' },
      ],
      practice: [
        { id: 'p-bps-1', title: 'The Two Sum Problem - Logic First', platform: 'IntelliPath Logic Lab', task: 'Given a list of numbers [2, 7, 11, 15] and a target 9, describe the algorithm to find indices.', solutionTip: 'Check pairs with nested loop or use a lookup record of compliments.' },
      ],
      assignments: [
        { id: 'a-bps-1', title: 'Assignment 1: ATM Cash Dispenser Flowchart', deliverable: 'Full flowchart handling card PIN validation, balance checks, and cash denomination distribution.', instructions: 'Include error branches for 3 wrong PIN attempts.' },
      ],
      project: {
        id: 'proj-decision-engine',
        title: 'Branching Text Adventure & State Machine Game',
        description: 'Build an interactive story decision engine where player choices determine character inventory, stats, and multiple storyline endings.',
        difficulty: 'Beginner',
        requirements: ['At least 5 branching story decision nodes', 'Inventory tracking system', 'Game over and victory conditions'],
        skillsTested: ['Conditionals', 'State Tracking', 'Algorithm Design'],
        deliverableType: 'Python / JavaScript Console Game',
      },
    },
  },

  // =========================================================================
  // 2. TECHNOLOGY / SOFTWARE DEVELOPMENT - INTERMEDIATE (60-84%)
  // =========================================================================
  {
    id: 'tech-javascript-fundamentals',
    title: 'JavaScript Fundamentals & DOM Scripting',
    category: 'Web Development',
    domain: 'Technology',
    level: 'Intermediate',
    aptitudeTier: 'tier2_intermediate',
    duration: '6 Weeks',
    rating: 4.96,
    studentsCount: 24500,
    matchScore: 94,
    description: 'Learn modern ES6+ JavaScript, arrow functions, promises, async/await, DOM event manipulation, fetch API, and localStorage management.',
    whyRecommended: 'The universal language of the web. Essential for creating interactive web applications and advancing to modern frontend frameworks like React.',
    skillsGained: ['Modern ES6+ Syntax', 'DOM Manipulation', 'Event Listeners', 'Async/Await & Promises', 'Fetch API & JSON', 'Local Storage'],
    objectives: [
      'Write clean, idiomatic ES6+ code with destructuring, spread, and template literals',
      'Select, modify, and animate HTML elements dynamically via the DOM',
      'Fetch live asynchronous data from REST APIs with error handling',
      'Build a full-featured interactive To-Do & Task Management Application'
    ],
    progress: 0,
    isEnrolled: false,
    isCompleted: false,
    roadmap: [
      { id: 'js-w1', week: 1, title: 'Week 1: Modern ES6+ Syntax & Scope', description: 'let/const, arrow functions, template literals, destructuring.', topics: ['let vs const', 'Arrow Functions', 'Template Strings', 'Array & Object Destructuring'], estimatedHours: 8, completed: false },
      { id: 'js-w2', week: 2, title: 'Week 2: Array Methods (map, filter, reduce)', description: 'Functional data transformations and immutable array operations.', topics: ['map()', 'filter()', 'reduce()', 'find() & some()'], estimatedHours: 8, completed: false },
      { id: 'js-w3', week: 3, title: 'Week 3: DOM Manipulation & Event Handling', description: 'Selecting elements, adding event listeners, dynamic HTML creation.', topics: ['querySelector', 'addEventListener', 'Event Bubbling', 'classList & style'], estimatedHours: 9, completed: false },
      { id: 'js-w4', week: 4, title: 'Week 4: Asynchronous JS, Promises & Async/Await', description: 'Handling network latency, setTimeout, Promises, and async/await.', topics: ['Event Loop & Callbacks', 'Promises', 'async/await', 'try/catch'], estimatedHours: 10, completed: false },
      { id: 'js-w5', week: 5, title: 'Week 5: Fetch API, REST Endpoints & LocalStorage', description: 'Requesting JSON data from public APIs and caching user state.', topics: ['fetch() API', 'JSON parsing', 'localStorage API', 'Error handling'], estimatedHours: 9, completed: false },
      { id: 'js-w6', week: 6, title: 'Week 6: Final Capstone Project - Interactive Task Management App', description: 'Build, style, and deploy an interactive task organizer with filtering and persistence.', topics: ['App Architecture', 'CRUD Operations', 'State Persistence', 'Search & Filtering'], estimatedHours: 12, completed: false },
    ],
    resources: {
      videos: [
        { id: 'v-js-1', title: 'JavaScript Crash Course for Beginners (Full 2026 Edition)', channel: 'Traversy Media', duration: '1h 40m', url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c', topic: 'ES6+ Foundations' },
        { id: 'v-js-2', title: 'JavaScript DOM Manipulation Full Course', channel: 'freeCodeCamp.org', duration: '1h 15m', url: 'https://www.youtube.com/watch?v=5fb2yeXY55A', topic: 'DOM & Events' },
        { id: 'v-js-3', title: 'Async/Await & Fetch API Explained with Real Examples', channel: 'Web Dev Simplified', duration: '35m', url: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU', topic: 'Async JavaScript' },
      ],
      documentation: [
        { id: 'd-js-1', title: 'JavaScript.info - The Modern JavaScript Tutorial', publisher: 'Ilya Kantor', url: 'https://javascript.info/', description: 'The deepest, most comprehensive JavaScript guide covering engines, microtasks, prototypes, and closures.', type: 'Comprehensive Reference' },
        { id: 'd-js-2', title: 'MDN JavaScript Reference & Guide', publisher: 'Mozilla Developer Network', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', description: 'Standard language specifications, browser compatibility, and standard built-ins.', type: 'Official Spec' },
      ],
      reading: [
        { id: 'r-js-1', title: 'Understanding the JavaScript Event Loop Visually', authorOrSource: 'Lydia Hallie', url: 'https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif', summary: 'Step-by-step visual animation of the call stack, web APIs, task queue, and microtask queue.' },
      ],
      practice: [
        { id: 'p-js-1', title: 'Array Transformation Pipeline Challenge', platform: 'IntelliPath Code Editor', task: 'Filter an array of user objects to find active users over 18 and map their full names.', solutionTip: 'Chain .filter(u => u.isActive && u.age >= 18).map(u => `${u.firstName} ${u.lastName}`).' },
      ],
      assignments: [
        { id: 'a-js-1', title: 'Lab: Dynamic Currency Converter with Live API', deliverable: 'Fetch live exchange rates from a free API and update conversion inputs in real time without page reload.', instructions: 'Include debounced input listener and fallback state on network error.' },
      ],
      project: {
        id: 'proj-todo-app',
        title: 'Intelligent To-Do & Task Management Application',
        description: 'Build a production-quality task management app with category tagging, priority filtering, due dates, completion toggles, and localStorage persistence.',
        difficulty: 'Intermediate',
        requirements: [
          'Add, edit, delete, and toggle tasks as completed',
          'Filter by: All, Active, Completed, and Priority Level (Low, Medium, High)',
          'Search tasks dynamically by title in real-time',
          'Persist all data in browser localStorage across page reloads',
          'Responsive design with clear active and empty states'
        ],
        skillsTested: ['ES6+', 'DOM Manipulation', 'Event Listeners', 'localStorage', 'Array Methods'],
        deliverableType: 'HTML/CSS/JS Single Page Web App',
      },
    },
  },

  {
    id: 'tech-web-development-fundamentals',
    title: 'Web Development Fundamentals (HTML5, CSS3, Responsive Layouts)',
    category: 'Web Development',
    domain: 'Technology',
    level: 'Beginner',
    aptitudeTier: 'tier2_intermediate',
    duration: '6 Weeks',
    rating: 4.92,
    studentsCount: 28000,
    matchScore: 91,
    description: 'Master semantic HTML5 markup, modern CSS3 styling, Flexbox, CSS Grid, media queries, and mobile-first responsive web design.',
    whyRecommended: 'The foundational bedrock of every website, web app, and digital user experience.',
    skillsGained: ['Semantic HTML5', 'CSS3 Box Model', 'Flexbox Layouts', 'CSS Grid', 'Media Queries', 'Accessibility (a11y)'],
    objectives: [
      'Write accessible semantic HTML with proper landmarks and forms',
      'Construct complex responsive layouts using CSS Flexbox and Grid',
      'Implement mobile-first responsive breakpoints for all screen sizes',
      'Build a responsive multi-page portfolio website'
    ],
    progress: 0,
    isEnrolled: false,
    isCompleted: false,
    roadmap: [
      { id: 'wd-w1', week: 1, title: 'Week 1: Semantic HTML5 Structure', description: 'Header, main, section, nav, article, forms, and input types.', topics: ['Semantic Elements', 'Form Controls', 'Tables & Media', 'Meta Tags & SEO'], estimatedHours: 7, completed: false },
      { id: 'wd-w2', week: 2, title: 'Week 2: CSS Box Model & Typography', description: 'Padding, borders, margins, box-sizing, and typography hierarchies.', topics: ['Box Model', 'box-sizing: border-box', 'Font Scales', 'Color Systems'], estimatedHours: 8, completed: false },
      { id: 'wd-w3', week: 3, title: 'Week 3: CSS Flexbox in Practice', description: 'One-dimensional layouts, alignment, justifications, and wrap behavior.', topics: ['flex-direction', 'justify-content', 'align-items', 'flex-grow/shrink'], estimatedHours: 9, completed: false },
      { id: 'wd-w4', week: 4, title: 'Week 4: CSS Grid Mastery', description: 'Two-dimensional grid tracks, grid areas, and auto-fit/fill columns.', topics: ['grid-template-columns', 'grid-template-areas', 'repeat(auto-fit, minmax)', 'gap'], estimatedHours: 9, completed: false },
      { id: 'wd-w5', week: 5, title: 'Week 5: Mobile-First Responsive Design', description: 'Breakpoints, fluid typography (clamp), responsive images, and touch targets.', topics: ['Media Queries', 'clamp() & rem units', 'srcset & picture tag', 'Touch Targets'], estimatedHours: 9, completed: false },
      { id: 'wd-w6', week: 6, title: 'Week 6: Final Capstone Project - Responsive Portfolio Website', description: 'Build and deploy a complete multi-section responsive portfolio website.', topics: ['Hero Section', 'Project Showcase Grid', 'Contact Form', 'Deployment (Vercel/Netlify)'], estimatedHours: 12, completed: false },
    ],
    resources: {
      videos: [
        { id: 'v-wd-1', title: 'HTML5 & CSS3 Full Course for Beginners', channel: 'Dave Gray', duration: '3h 30m', url: 'https://www.youtube.com/watch?v=mJgBOIoGihA', topic: 'HTML5 & CSS3' },
        { id: 'v-wd-2', title: 'Flexbox in 20 Minutes (Visual Guide)', channel: 'Kevin Powell', duration: '20m', url: 'https://www.youtube.com/watch?v=u044iM9xsWU', topic: 'Flexbox Layouts' },
        { id: 'v-wd-3', title: 'Learn CSS Grid the Easy Way', channel: 'Kevin Powell', duration: '28m', url: 'https://www.youtube.com/watch?v=rg7Fvvl3taU', topic: 'CSS Grid' },
      ],
      documentation: [
        { id: 'd-wd-1', title: 'MDN Web Docs: Learn Web Development Course', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Learn', description: 'The premier open standard curriculum for learning client-side web development.', type: 'Official Curriculum' },
      ],
      reading: [
        { id: 'r-wd-1', title: 'A Complete Guide to Flexbox & CSS Grid', authorOrSource: 'CSS-Tricks', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', summary: 'The most cited visual reference for CSS flex and grid properties.' },
      ],
      practice: [
        { id: 'p-wd-1', title: 'Flexbox Froggy & Grid Garden Challenges', platform: 'Interactive Games', task: 'Complete all 24 levels of Flexbox Froggy to cement alignment and direction properties.', solutionTip: 'Remember justify-content aligns on main axis, align-items on cross axis.' },
      ],
      assignments: [
        { id: 'a-wd-1', title: 'Lab: Responsive Pricing Card Grid', deliverable: 'A 3-card pricing tier table that stacks on mobile (<640px) and displays side-by-side on desktop (>1024px).', instructions: 'Highlight the middle recommended plan with a custom badge and elevation.' },
      ],
      project: {
        id: 'proj-portfolio-website',
        title: 'Modern Responsive Personal Portfolio Website',
        description: 'Design and code a mobile-first, highly responsive personal developer portfolio with custom typography, project cards, skills section, and working contact form.',
        difficulty: 'Beginner',
        requirements: ['Semantic HTML5 structure', 'Responsive on 320px, 768px, and 1280px+ viewports', 'Accessible color contrast and focus rings', 'Clean navigation bar and contact section'],
        skillsTested: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Responsive Design'],
        deliverableType: 'Static Web Application',
      },
    },
  },

  // =========================================================================
  // 3. TECHNOLOGY / SOFTWARE DEVELOPMENT - ADVANCED (85%+)
  // =========================================================================
  {
    id: 'tech-react-development',
    title: 'React.js & State Architecture Masterclass',
    category: 'Software Engineering',
    domain: 'Technology',
    level: 'Advanced',
    aptitudeTier: 'tier1_advanced',
    duration: '8 Weeks',
    rating: 4.98,
    studentsCount: 31000,
    matchScore: 98,
    description: 'Build enterprise-grade single-page applications with React 19, TypeScript, Context API, React Router, custom hooks, performance optimization, and REST API integration.',
    whyRecommended: 'Top tier recommendation for students scoring 85%+ with strong logic. Directly trains for production frontend engineering roles.',
    skillsGained: ['React 19', 'TypeScript', 'Custom Hooks', 'Context API & Reducers', 'React Router v7', 'Performance Optimization (useMemo/useCallback)'],
    objectives: [
      'Architect robust single-page applications with declarative component hierarchies',
      'Manage complex application state using Context API and useReducer workflows',
      'Optimize re-render bottlenecks using memoization, virtualization, and lazy loading',
      'Build and deploy a full-scale Interactive Dashboard application'
    ],
    progress: 0,
    isEnrolled: false,
    isCompleted: false,
    roadmap: [
      { id: 'rc-w1', week: 1, title: 'Week 1: React Component Model & Virtual DOM', description: 'JSX syntax, components, props, and unidirectional data flow.', topics: ['JSX & Virtual DOM', 'Functional Components', 'Props & Composition', 'Strict Mode'], estimatedHours: 8, completed: false },
      { id: 'rc-w2', week: 2, title: 'Week 2: State & Lifecycle Hooks (useState, useEffect)', description: 'Managing state immutably and handling side effects cleanly.', topics: ['useState & Immutability', 'useEffect & Cleanup', 'Batching Updates', 'Dependency Arrays'], estimatedHours: 10, completed: false },
      { id: 'rc-w3', week: 3, title: 'Week 3: Advanced Hooks & Custom Hooks', description: 'useRef, useMemo, useCallback, and building reusable custom hooks.', topics: ['useRef for DOM & Values', 'useMemo & useCallback', 'Building Custom Hooks', 'useId'], estimatedHours: 10, completed: false },
      { id: 'rc-w4', week: 4, title: 'Week 4: Global State Management (Context + useReducer)', description: 'Eliminating prop drilling with scalable Context architecture.', topics: ['Context API Patterns', 'useReducer State Machines', 'Context Separation', 'Persisted State'], estimatedHours: 10, completed: false },
      { id: 'rc-w5', week: 5, title: 'Week 5: Client Routing with React Router', description: 'Nested layouts, dynamic route params, protected routes, and loaders.', topics: ['React Router Setup', 'Dynamic Params (:id)', 'Protected Route Wrappers', 'Navigation Guards'], estimatedHours: 9, completed: false },
      { id: 'rc-w6', week: 6, title: 'Week 6: TypeScript with React', description: 'Typing props, events, state, custom hooks, and generic components.', topics: ['React.FC vs Props typing', 'Event Handler Types', 'Generic Components', 'Discriminated Unions'], estimatedHours: 10, completed: false },
      { id: 'rc-w7', week: 7, title: 'Week 7: Performance Optimization & Testing', description: 'React DevTools Profiler, lazy loading, Suspense, and error boundaries.', topics: ['React.lazy & Suspense', 'Error Boundaries', 'Profiler Analysis', 'Bundle Splitting'], estimatedHours: 9, completed: false },
      { id: 'rc-w8', week: 8, title: 'Week 8: Final Capstone Project - Production SaaS Dashboard', description: 'Build, optimize, and deploy a complete production-grade analytics dashboard.', topics: ['Full Application Build', 'Theme Engine', 'API Integration', 'Cloud Deployment'], estimatedHours: 14, completed: false },
    ],
    resources: {
      videos: [
        { id: 'v-rc-1', title: 'React 19 Full Course - Beginner to Advanced', channel: 'freeCodeCamp.org', duration: '4h 15m', url: 'https://www.youtube.com/watch?v=CgkZ7MvWUAA', topic: 'React Foundations' },
        { id: 'v-rc-2', title: 'Mastering Custom React Hooks Like a Senior Developer', channel: 'Jack Herrington', duration: '40m', url: 'https://www.youtube.com/watch?v=6ThXsUwLWvc', topic: 'Custom Hooks' },
        { id: 'v-rc-3', title: 'React Performance Optimization in 2026', channel: 'Theo - t3.gg', duration: '32m', url: 'https://www.youtube.com/watch?v=7hR88N70rJ4', topic: 'Performance' },
      ],
      documentation: [
        { id: 'd-rc-1', title: 'React.dev Official Handbook & Interactive Examples', publisher: 'Meta / React Team', url: 'https://react.dev/learn', description: 'Official documentation covering component thinking, hooks, and modern best practices.', type: 'Official Documentation' },
        { id: 'd-rc-2', title: 'React TypeScript Cheatsheet', publisher: 'React Community', url: 'https://react-typescript-cheatsheet.netlify.app/', description: 'Standard typing guide for React developers using TypeScript.', type: 'Cheat Sheet' },
      ],
      reading: [
        { id: 'r-rc-1', title: 'A Complete Guide to useEffect', authorOrSource: 'Dan Abramov (Overreacted.io)', url: 'https://overreacted.io/a-complete-guide-to-useeffect/', summary: 'Deep mental model for how synchronization works in React effects.' },
      ],
      practice: [
        { id: 'p-rc-1', title: 'Building an Infinite Scroll Custom Hook', platform: 'IntelliPath React Sandbox', task: 'Implement useInfiniteScroll utilizing IntersectionObserver API to fetch next page on viewport intersection.', solutionTip: 'Attach observer target ref to last item and trigger fetch when isIntersecting is true.' },
      ],
      assignments: [
        { id: 'a-rc-1', title: 'Lab: Theme Switcher Context Engine', deliverable: 'Create a theme provider supporting Dark, Light, Purple, and Ocean modes with localStorage persistence.', instructions: 'Apply CSS variables dynamically to the document root element.' },
      ],
      project: {
        id: 'proj-saas-dashboard',
        title: 'Full-Scale Analytics & Operations SaaS Dashboard',
        description: 'Construct a modular enterprise analytics dashboard featuring dark/light themes, data visualizations, live filters, authentication state, and responsive sidebars.',
        difficulty: 'Advanced',
        requirements: ['React 19 with TypeScript', 'Context API state management', 'Collapsible responsive sidebar with mobile drawer', 'Dynamic chart visualizations and tabular search', 'Zero layout clipping across 320px to 1920px+ viewports'],
        skillsTested: ['React 19', 'TypeScript', 'Tailwind CSS', 'Context API', 'State Architecture'],
        deliverableType: 'Production React Web Application',
      },
    },
  },

  {
    id: 'tech-data-structures-algorithms',
    title: 'Data Structures & Algorithms Mastery',
    category: 'Computer Science',
    domain: 'Technology',
    level: 'Advanced',
    aptitudeTier: 'tier1_advanced',
    duration: '8 Weeks',
    rating: 4.95,
    studentsCount: 22000,
    matchScore: 97,
    description: 'Master Big-O asymptotic analysis, Linked Lists, Stacks, Queues, Binary Trees, Heaps, Graphs, Dynamic Programming, and technical interview algorithms.',
    whyRecommended: 'Recommended for students scoring 85%+ who have strong logical foundation and want to ace technical interviews and high-performance computing.',
    skillsGained: ['Big-O Analysis', 'Linked Lists & Trees', 'Graph Algorithms (BFS/DFS)', 'Dynamic Programming', 'Divide and Conquer', 'Interview Problem Solving'],
    objectives: [
      'Calculate time and space complexity with formal Big-O notation',
      'Implement data structures from scratch with pointer/memory mechanics',
      'Traverse graphs and trees using DFS, BFS, and Dijkstra algorithms',
      'Solve medium and hard LeetCode-style algorithmic challenges'
    ],
    progress: 0,
    isEnrolled: false,
    isCompleted: false,
    roadmap: [
      { id: 'dsa-w1', week: 1, title: 'Week 1: Time & Space Complexity (Big-O)', description: 'Asymptotic analysis, O(1), O(log n), O(n), O(n log n), O(n^2).', topics: ['Big-O Definition', 'Space vs Time', 'Worst vs Average Case', 'Amortized Complexity'], estimatedHours: 8, completed: false },
      { id: 'dsa-w2', week: 2, title: 'Week 2: Arrays, Strings & Two-Pointer Patterns', description: 'Sliding window, two pointers, prefix sums, and binary search.', topics: ['Two Pointers', 'Sliding Window', 'Binary Search Variations', 'Prefix Sums'], estimatedHours: 10, completed: false },
      { id: 'dsa-w3', week: 3, title: 'Week 3: Linked Lists (Singly, Doubly, Cyclic)', description: 'Pointer manipulation, reversal, cycle detection (Floyd\'s algorithm).', topics: ['Node Pointers', 'List Reversal', 'Cycle Detection', 'Merge Two Sorted Lists'], estimatedHours: 9, completed: false },
      { id: 'dsa-w4', week: 4, title: 'Week 4: Stacks, Queues & Hash Maps', description: 'LIFO/FIFO mechanics, monotonic stacks, collision resolution in hash tables.', topics: ['Stack via Array/Nodes', 'Monotonic Stacks', 'Hash Functions', 'Hash Collisions'], estimatedHours: 10, completed: false },
      { id: 'dsa-w5', week: 5, title: 'Week 5: Trees & Binary Search Trees (BST)', description: 'Tree traversals (Inorder, Preorder, Postorder, Level-Order), BST validations.', topics: ['Binary Trees', 'BST Search & Insert', 'Tree Traversals', 'Lowest Common Ancestor'], estimatedHours: 11, completed: false },
      { id: 'dsa-w6', week: 6, title: 'Week 6: Graphs & Pathfinding (BFS, DFS, Dijkstra)', description: 'Adjacency lists, Breadth-First Search, Depth-First Search, shortest paths.', topics: ['Graph Representations', 'BFS Shortest Path', 'DFS Cycle Finding', 'Topological Sort'], estimatedHours: 12, completed: false },
      { id: 'dsa-w7', week: 7, title: 'Week 7: Dynamic Programming & Memoization', description: 'Overlapping subproblems, optimal substructure, 1D and 2D DP tables.', topics: ['Memoization vs Tabulation', '0/1 Knapsack Pattern', 'Longest Common Subsequence', 'Coin Change'], estimatedHours: 12, completed: false },
      { id: 'dsa-w8', week: 8, title: 'Week 8: Final Project - Algorithmic Pathfinding Visualizer', description: 'Build an interactive web-based algorithm visualizer for Dijkstra & A* pathfinding.', topics: ['Algorithm Animation', 'Graph Grids', 'Complexity Comparisons'], estimatedHours: 14, completed: false },
    ],
    resources: {
      videos: [
        { id: 'v-dsa-1', title: 'Data Structures and Algorithms for Beginners - Full Course', channel: 'NeetCode', duration: '3h 15m', url: 'https://www.youtube.com/watch?v=0IAPZzGSbME', topic: 'Core DSA' },
        { id: 'v-dsa-2', title: 'Graph Theory Full Course (Algorithms & Code)', channel: 'WilliamFiset', duration: '2h 10m', url: 'https://www.youtube.com/watch?v=09_LlHjoEiY', topic: 'Graphs & Trees' },
        { id: 'v-dsa-3', title: 'Dynamic Programming - Learn to Solve Any DP Problem', channel: 'freeCodeCamp.org', duration: '2h 45m', url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk', topic: 'Dynamic Programming' },
      ],
      documentation: [
        { id: 'd-dsa-1', title: 'Visualgo - Visualising Data Structures and Algorithms Through Animation', publisher: 'National University of Singapore', url: 'https://visualgo.net/', description: 'Interactive visualizer for trees, sorting, graphs, and network flow.', type: 'Interactive Tool' },
        { id: 'd-dsa-2', title: 'OpenDSA: Interactive Computer Science Textbooks', publisher: 'Virginia Tech', url: 'https://opendsa-server.cs.vt.edu/', description: 'Open-source curriculum on algorithmic efficiency and data structures.', type: 'Textbook' },
      ],
      reading: [
        { id: 'r-dsa-1', title: 'Grokking Algorithms: An Illustrated Guide', authorOrSource: 'Aditya Bhargava', url: 'https://github.com/gonza108/Grokking-Algorithms', summary: 'Visual, high-intuition explanations of recursion, quicksort, hash tables, and graphs.' },
      ],
      practice: [
        { id: 'p-dsa-1', title: 'Valid Parentheses String Validation', platform: 'IntelliPath DSA Engine', task: 'Given a string containing \'(\', \')\', \'{\', \'}\', \'[\', \']\', determine if the input string is valid using a stack.', solutionTip: 'Push opening brackets to stack; on closing bracket check if top matches.' },
      ],
      assignments: [
        { id: 'a-dsa-1', title: 'Lab: Self-Balancing Binary Search Tree Checker', deliverable: 'Write an algorithm that checks if a binary tree is height-balanced (difference between subtrees <= 1).', instructions: 'Return height or -1 on unbalanced node for O(n) runtime.' },
      ],
      project: {
        id: 'proj-algo-visualizer',
        title: 'Interactive Graph & Pathfinding Algorithm Visualizer',
        description: 'Create an interactive 2D grid application where users place obstacles and visualize BFS, DFS, Dijkstra, and A* pathfinding animations in real-time.',
        difficulty: 'Advanced',
        requirements: ['Interactive grid with start/end node dragging', 'Wall obstacle drawing', 'Step-by-step animation of visited nodes and final shortest path', 'Speed controls and algorithm comparison metrics'],
        skillsTested: ['Graphs', 'BFS/DFS', 'Dijkstra', 'State Management', 'Async Animation'],
        deliverableType: 'Web Visualizer Application',
      },
    },
  },

  // =========================================================================
  // 4. BUSINESS & FINANCE
  // =========================================================================
  {
    id: 'biz-fundamentals',
    title: 'Business Fundamentals & Strategy',
    category: 'Business & Management',
    domain: 'Business & Finance',
    level: 'Beginner',
    aptitudeTier: 'tier3_foundation',
    duration: '6 Weeks',
    rating: 4.89,
    studentsCount: 15400,
    matchScore: 91,
    description: 'Learn market analysis, business models, SWOT frameworks, value propositions, competitive advantage, operations, and go-to-market execution.',
    whyRecommended: 'Essential baseline for aspiring managers, startup founders, and business strategists.',
    skillsGained: ['SWOT Analysis', 'Business Model Canvas', 'Value Propositions', 'Market Sizing (TAM/SAM/SOM)', 'Go-To-Market Strategy', 'Unit Economics'],
    objectives: [
      'Analyze industry dynamics using Porter\'s Five Forces and SWOT frameworks',
      'Construct a complete 9-block Business Model Canvas for a new venture',
      'Calculate customer acquisition cost (CAC) and customer lifetime value (LTV)',
      'Produce a comprehensive, investor-ready Business Plan'
    ],
    progress: 0,
    isEnrolled: false,
    isCompleted: false,
    roadmap: [
      { id: 'bf-w1', week: 1, title: 'Week 1: Introduction to Business & Value Creation', description: 'How businesses create, deliver, and capture value.', topics: ['Value Creation', 'Stakeholder vs Shareholder', 'Types of Business Entities'], estimatedHours: 6, completed: false },
      { id: 'bf-w2', week: 2, title: 'Week 2: Business Model Canvas & Customer Segments', description: 'Deconstructing the 9 building blocks of scalable business models.', topics: ['Business Model Canvas', 'Customer Persona Definition', 'Value Proposition Design'], estimatedHours: 7, completed: false },
      { id: 'bf-w3', week: 3, title: 'Week 3: Market Research & Competitive Intelligence', description: 'TAM, SAM, SOM sizing and Porter\'s Five Forces analysis.', topics: ['Market Sizing (TAM/SAM/SOM)', 'Porter\'s 5 Forces', 'Competitive Benchmarking'], estimatedHours: 8, completed: false },
      { id: 'bf-w4', week: 4, title: 'Week 4: Business Strategy & Competitive Moats', description: 'Cost leadership vs differentiation and building defensible moats.', topics: ['Competitive Advantage', 'Network Effects & Moats', 'Strategic Positioning'], estimatedHours: 8, completed: false },
      { id: 'bf-w5', week: 5, title: 'Week 5: Operations, Pricing & Go-To-Market', description: 'Distribution channels, pricing strategies (tier, freemium, value-based), and GTM.', topics: ['Pricing Strategies', 'Distribution Channels', 'GTM Launch Checklist'], estimatedHours: 8, completed: false },
      { id: 'bf-w6', week: 6, title: 'Week 6: Final Capstone Project - Comprehensive Business Plan', description: 'Formulate a complete 10-page business proposal for a modern product or service.', topics: ['Executive Summary', 'Financial Projections', 'Risk Mitigation', 'Pitch Deck'], estimatedHours: 12, completed: false },
    ],
    resources: {
      videos: [
        { id: 'v-bf-1', title: 'Introduction to Business & Strategic Management', channel: 'Harvard Business Publishing', duration: '1h 20m', url: 'https://www.youtube.com/watch?v=b-Jb8K7K5sM', topic: 'Business Strategy' },
        { id: 'v-bf-2', title: 'The Business Model Canvas Explained Visually', channel: 'Strategyzer', duration: '15m', url: 'https://www.youtube.com/watch?v=QoAOzMTLP5s', topic: 'Business Models' },
        { id: 'v-bf-3', title: 'How to Size Any Market (TAM, SAM, SOM Guide)', channel: 'Slidebean', duration: '22m', url: 'https://www.youtube.com/watch?v=0hWd4XgM2_Q', topic: 'Market Research' },
        { id: 'v-bf-4', title: 'Entrepreneurship & Startup Fundamentals', channel: 'Y Combinator (Startup School)', duration: '45m', url: 'https://www.youtube.com/watch?v=C27RVio2rOs', topic: 'Entrepreneurship' },
      ],
      documentation: [
        { id: 'd-bf-1', title: 'Harvard Business Review: What Is Strategy? (Michael E. Porter)', publisher: 'Harvard Business Review', url: 'https://hbr.org/1996/11/what-is-strategy', description: 'The seminal academic paper distinguishing operational effectiveness from strategic positioning.', type: 'HBR Classic Article' },
        { id: 'd-bf-2', title: 'U.S. Small Business Administration (SBA) Business Plan Guide', publisher: 'U.S. SBA', url: 'https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan', description: 'Official standards for traditional and lean startup business plan formats.', type: 'Official Guide' },
      ],
      reading: [
        { id: 'r-bf-1', title: 'The Lean Startup Methodology Summary', authorOrSource: 'Eric Ries', url: 'https://theleanstartup.com/principles.html', summary: 'Build-Measure-Learn feedback loops, validated learning, and Minimum Viable Products (MVPs).' },
      ],
      practice: [
        { id: 'p-bf-1', title: 'SWOT Matrix Generator Challenge', platform: 'IntelliPath Business Lab', task: 'Perform a comprehensive 4-quadrant SWOT analysis for an electric scooter rental startup in a metropolitan city.', solutionTip: 'Consider battery maintenance as a weakness, fuel price rise as an opportunity, and city regulations as a threat.' },
      ],
      assignments: [
        { id: 'a-bf-1', title: 'Assignment 1: 9-Block Business Model Canvas', deliverable: 'A structured 1-page Business Model Canvas diagram covering key partners, activities, resources, cost structure, and revenue streams.', instructions: 'Include at least 3 distinct bullets per canvas quadrant.' },
      ],
      project: {
        id: 'proj-business-plan',
        title: 'Investor-Ready Comprehensive Business Plan',
        description: 'Author a complete, professional business plan for a new startup or service venture, detailing executive summary, market validation, competitive analysis, operational workflow, and 3-year revenue forecast.',
        difficulty: 'Beginner',
        requirements: [
          'Executive Summary & Problem Statement',
          'Market Analysis with TAM, SAM, SOM calculations',
          'Competitor Matrix & Unique Value Proposition',
          'Marketing & Go-To-Market Execution Plan',
          '3-Year Financial Model (Revenue, COGS, Operating Expenses)'
        ],
        skillsTested: ['Business Modeling', 'Market Analysis', 'Strategic Planning', 'Financial Forecasting'],
        deliverableType: 'Executive Business Plan PDF / Deck',
      },
    },
  },

  {
    id: 'biz-financial-fundamentals',
    title: 'Financial Fundamentals & Personal Wealth Management',
    category: 'Finance & Accounting',
    domain: 'Business & Finance',
    level: 'Beginner',
    aptitudeTier: 'tier3_foundation',
    duration: '6 Weeks',
    rating: 4.93,
    studentsCount: 17800,
    matchScore: 93,
    description: 'Master income statements, balance sheets, cash flow tracking, compound interest, budgeting frameworks (50/30/20), debt reduction, and investment basics.',
    whyRecommended: 'Essential financial literacy course to gain control of personal budgets, analyze corporate statements, and build long-term wealth.',
    skillsGained: ['3 Financial Statements', '50/30/20 Budgeting', 'Compound Interest Math', 'Cash Flow Auditing', 'Debt Snowball / Avalanche', 'Index Fund Basics'],
    objectives: [
      'Read and interpret Income Statements, Balance Sheets, and Cash Flow Statements',
      'Build a robust automated personal budget with expense categorization',
      'Calculate compound growth over multi-decade horizons',
      'Create a comprehensive Personal Budget & Financial Planner'
    ],
    progress: 0,
    isEnrolled: false,
    isCompleted: false,
    roadmap: [
      { id: 'fin-w1', week: 1, title: 'Week 1: The Core Accounting Equation & Statements', description: 'Assets = Liabilities + Equity, and the 3 financial statements.', topics: ['Accounting Equation', 'Income Statement', 'Balance Sheet', 'Cash Flow'], estimatedHours: 6, completed: false },
      { id: 'fin-w2', week: 2, title: 'Week 2: Personal Cash Flow & 50/30/20 Budgeting', description: 'Classifying needs, wants, and savings with live expense auditing.', topics: ['Needs vs Wants', '50/30/20 Framework', 'Emergency Fund Calculation', 'Expense Tracking'], estimatedHours: 7, completed: false },
      { id: 'fin-w3', week: 3, title: 'Week 3: Compound Interest & Time Value of Money', description: 'Present value, future value, compounding frequency, and Rule of 72.', topics: ['Time Value of Money', 'FV & PV Formulas', 'Rule of 72', 'Inflation Impact'], estimatedHours: 7, completed: false },
      { id: 'fin-w4', week: 4, title: 'Week 4: Debt Management & Credit Optimization', description: 'Managing high-interest debt with Snowball vs Avalanche methods.', topics: ['APR & Interest Math', 'Debt Avalanche Method', 'Debt Snowball Method', 'Credit Score Mechanics'], estimatedHours: 8, completed: false },
      { id: 'fin-w5', week: 5, title: 'Week 5: Investment Fundamentals (Stocks, Bonds, Index Funds)', description: 'Risk vs return, diversification, mutual funds, ETFs, and asset allocation.', topics: ['Asset Classes', 'Index Funds & ETFs', 'Dollar-Cost Averaging', 'Diversification'], estimatedHours: 8, completed: false },
      { id: 'fin-w6', week: 6, title: 'Week 6: Final Capstone Project - Personal Budget Planner', description: 'Assemble a dynamic spreadsheet or web-based financial forecast dashboard.', topics: ['Spreadsheet Formulas', 'Scenario Modeling', 'Retirement Projections'], estimatedHours: 10, completed: false },
    ],
    resources: {
      videos: [
        { id: 'v-fin-1', title: 'Financial Accounting in 1 Hour (Crash Course)', channel: 'Accounting Stuff', duration: '1h 05m', url: 'https://www.youtube.com/watch?v=yYX4bvQSqbo', topic: 'Accounting Statements' },
        { id: 'v-fin-2', title: 'How to Master Your Money (50/30/20 Rule & Investing)', channel: 'Ali Abdaal', duration: '25m', url: 'https://www.youtube.com/watch?v=HQzoZfc3GwQ', topic: 'Budgeting' },
        { id: 'v-fin-3', title: 'The Power of Compound Interest Explained', channel: 'Two Cents (PBS)', duration: '12m', url: 'https://www.youtube.com/watch?v=wf91rG4Dj4U', topic: 'Compound Growth' },
        { id: 'v-fin-4', title: 'Index Funds & ETFs for Beginners', channel: 'Graham Stephan', duration: '28m', url: 'https://www.youtube.com/watch?v=fwe-PjrXszY', topic: 'Investing Basics' },
      ],
      documentation: [
        { id: 'd-fin-1', title: 'SEC.gov: Beginners\' Guide to Financial Statements', publisher: 'U.S. Securities and Exchange Commission', url: 'https://www.sec.gov/reportspubs/investor-publications/investorpubsbegfinstmthtm.html', description: 'Official regulatory guide on dissecting 10-K and 10-Q corporate financial reports.', type: 'Official Regulatory Guide' },
        { id: 'd-fin-2', title: 'Investopedia: Complete Financial Glossary & Tutorials', publisher: 'Investopedia', url: 'https://www.investopedia.com/financial-term-dictionary-4769738', description: 'Standard financial definitions and ratio calculation models.', type: 'Reference Handbook' },
      ],
      reading: [
        { id: 'r-fin-1', title: 'The Psychology of Money (Key Chapters Summary)', authorOrSource: 'Morgan Housel', url: 'https://www.collaborativefund.com/blog/the-psychology-of-money/', summary: 'Timeless lessons on wealth, greed, and happiness in financial decision making.' },
      ],
      practice: [
        { id: 'p-fin-1', title: 'Compound Interest Calculation Challenge', platform: 'IntelliPath Finance Lab', task: 'Calculate the total accumulated balance if you invest $500/month for 30 years at an 8% annual return.', solutionTip: 'Use future value of annuity formula: FV = PMT * [((1 + r)^n - 1) / r] ≈ $745,000.' },
      ],
      assignments: [
        { id: 'a-fin-1', title: 'Lab: 12-Month Personal Cash Flow Audit', deliverable: 'A structured breakdown of monthly fixed expenses, variable expenses, and automated savings targets.', instructions: 'Calculate savings rate percentage and identify 3 reduction opportunities.' },
      ],
      project: {
        id: 'proj-budget-planner',
        title: 'Dynamic Personal Budget Planner & Wealth Simulator',
        description: 'Build an automated personal finance planner that tracks income, applies the 50/30/20 budgeting rule, calculates net worth, and simulates 30-year retirement compound growth.',
        difficulty: 'Beginner',
        requirements: [
          'Monthly income and categorized expense tracking',
          'Automated 50/30/20 budget allocation checks with warning flags',
          'Emergency fund milestone calculator (3-6 months expenses)',
          'Compound interest growth projector with custom return rates',
          'Visual pie charts for expense breakdown and net worth trajectory'
        ],
        skillsTested: ['Budgeting', 'Financial Modeling', 'Cash Flow Analysis', 'Retirement Planning'],
        deliverableType: 'Interactive Spreadsheet or Web App',
      },
    },
  },

  // =========================================================================
  // 5. ARTS & DESIGN - UI/UX
  // =========================================================================
  {
    id: 'design-uiux-fundamentals',
    title: 'UI/UX Design Fundamentals & Prototyping',
    category: 'Design & Interaction',
    domain: 'Arts & Design',
    level: 'Beginner',
    aptitudeTier: 'tier3_foundation',
    duration: '6 Weeks',
    rating: 4.94,
    studentsCount: 18900,
    matchScore: 92,
    description: 'Learn user research, wireframing, typography, color theory, Figma auto-layout, interactive component states, and usability testing principles.',
    whyRecommended: 'Perfect for creative thinkers who want to design intuitive, aesthetically pristine mobile and web interfaces.',
    skillsGained: ['Figma Mastery', 'Auto-Layout & Constraints', 'Typography Scales', 'WCAG Contrast', 'Wireframing & Prototyping', 'Usability Testing'],
    objectives: [
      'Apply visual hierarchy, spacing grids (8pt system), and typographic scales',
      'Build responsive, reusable component systems in Figma with auto-layout',
      'Create high-fidelity interactive prototypes with smart animations',
      'Design a complete Mobile App Interface from scratch'
    ],
    progress: 0,
    isEnrolled: false,
    isCompleted: false,
    roadmap: [
      { id: 'ux-w1', week: 1, title: 'Week 1: UX Principles & Design Thinking', description: 'The 5 stages of design thinking and user empathy mapping.', topics: ['Empathy Maps', 'User Personas', 'User Journey Mapping', 'Problem Statements'], estimatedHours: 6, completed: false },
      { id: 'ux-w2', week: 2, title: 'Week 2: Information Architecture & Wireframing', description: 'Low-fidelity wireframing and user flow diagrams.', topics: ['User Flows', 'Low-Fidelity Wireframes', 'Content Hierarchy', 'Sitemaps'], estimatedHours: 7, completed: false },
      { id: 'ux-w3', week: 3, title: 'Week 3: Visual Design & 8pt Grid Systems', description: 'Color harmony, contrast ratios (WCAG AA), and the 8pt spacing system.', topics: ['8pt Grid System', 'Color Harmony & Tokens', 'Typographic Hierarchy', 'Iconography'], estimatedHours: 8, completed: false },
      { id: 'ux-w4', week: 4, title: 'Week 4: Figma Auto-Layout & Component Variants', description: 'Constructing scalable, flexible components with auto-layout.', topics: ['Auto-Layout Padding & Gaps', 'Component Sets', 'Variants & Properties', 'Responsive Constraints'], estimatedHours: 9, completed: false },
      { id: 'ux-w5', week: 5, title: 'Week 5: Interactive Prototyping & Smart Animate', description: 'Connecting screens, micro-interactions, overlays, and smart animations.', topics: ['Prototype Transitions', 'Smart Animate', 'Component Hover States', 'Sheet Overlays'], estimatedHours: 9, completed: false },
      { id: 'ux-w6', week: 6, title: 'Week 6: Final Capstone Project - Mobile App Interface Design', description: 'Design, prototype, and present a complete 6-screen high-fidelity mobile app.', topics: ['High-Fidelity Screens', 'Design System Library', 'Usability Walkthrough', 'Case Study'], estimatedHours: 12, completed: false },
    ],
    resources: {
      videos: [
        { id: 'v-ux-1', title: 'Figma for Beginners - Complete Course (2026 Edition)', channel: 'FreeCodeCamp / Daniel Walter Scott', duration: '2h 45m', url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8', topic: 'Figma Basics' },
        { id: 'v-ux-2', title: 'Figma Auto Layout Deep Dive (Master Every Property)', channel: 'Mizko', duration: '35m', url: 'https://www.youtube.com/watch?v=Tbz_KkE_1c0', topic: 'Auto-Layout' },
        { id: 'v-ux-3', title: 'UI Design Principles That Will Instantly Improve Your Work', channel: 'Flux Academy', duration: '22m', url: 'https://www.youtube.com/watch?v=TRrL5j3MI4w', topic: 'Visual Design' },
        { id: 'v-ux-4', title: 'How to Conduct a Usability Test in 5 Steps', channel: 'NNgroup (Nielsen Norman)', duration: '18m', url: 'https://www.youtube.com/watch?v=0YL0xoSmyVI', topic: 'UX Research' },
      ],
      documentation: [
        { id: 'd-ux-1', title: 'Apple Human Interface Guidelines (HIG)', publisher: 'Apple Inc.', url: 'https://developer.apple.com/design/human-interface-guidelines/', description: 'The gold standard design principles and patterns for iOS, iPadOS, and macOS apps.', type: 'Official Design System' },
        { id: 'd-ux-2', title: 'Google Material Design 3 Guidelines', publisher: 'Google Design', url: 'https://m3.material.io/', description: 'Design tokens, dynamic color systems, elevation, and accessibility standards.', type: 'Official Design System' },
      ],
      reading: [
        { id: 'r-ux-1', title: 'Laws of UX: 21 Psychological Principles for Designers', authorOrSource: 'Jon Yablonski', url: 'https://lawsofux.com/', summary: 'Fitts\'s Law, Hick\'s Law, Jakob\'s Law, and Miller\'s Law explained with interactive visual examples.' },
      ],
      practice: [
        { id: 'p-ux-1', title: 'Button Component Set Challenge in Figma', platform: 'Figma Sandbox', task: 'Build a button component variant set supporting Primary, Secondary, Outline, and Ghost styles across Default, Hover, and Disabled states.', solutionTip: 'Use Figma component properties to toggle icons and text labels cleanly.' },
      ],
      assignments: [
        { id: 'a-ux-1', title: 'Lab: E-Commerce Product Card Redesign', deliverable: 'Redesign a cluttered product card applying strict 8pt spacing math, WCAG AA contrast, and clear visual hierarchy.', instructions: 'Annotate all font sizes, line heights, and padding tokens.' },
      ],
      project: {
        id: 'proj-mobile-app-ui',
        title: 'High-Fidelity Mobile App Interface & Prototype',
        description: 'Design a clean, modern, and accessible 6-screen mobile application in Figma (e.g., Fitness Tracker, Food Delivery, or Finance App) complete with a component design system and interactive prototype.',
        difficulty: 'Beginner',
        requirements: [
          '6 core high-fidelity screens (Splash/Onboarding, Home Feed, Detail View, Search/Filter, Profile, Checkout/Action)',
          'Design System sheet with Color Tokens, Typography Scale, and Button Variants',
          'Interactive prototype links demonstrating navigation and micro-interactions',
          'Strict compliance with WCAG AA accessibility contrast standards'
        ],
        skillsTested: ['Figma', 'Auto-Layout', 'Design Systems', 'Prototyping', 'Visual Hierarchy'],
        deliverableType: 'Figma Community File / Interactive Prototype',
      },
    },
  },

  // =========================================================================
  // 6. MEDICINE & HEALTHCARE
  // =========================================================================
  {
    id: 'med-biology-fundamentals',
    title: 'Biology Fundamentals & Human Anatomy Basics',
    category: 'Medical Science',
    domain: 'Medicine & Health',
    level: 'Beginner',
    aptitudeTier: 'tier3_foundation',
    duration: '6 Weeks',
    rating: 4.91,
    studentsCount: 12400,
    matchScore: 90,
    description: 'Learn cellular biology, genetics, biochemistry, organ systems, cardiovascular mechanisms, nervous system signaling, and human physiology.',
    whyRecommended: 'Essential foundational science prerequisite for MBBS, Pharmacy, Nursing, and Biotechnology pathways.',
    skillsGained: ['Cellular Biology', 'Genetics & DNA', 'Cardiovascular System', 'Nervous System', 'Medical Terminology', 'Physiological Homeostasis'],
    objectives: [
      'Understand cellular respiration, membrane transport, and protein synthesis',
      'Explain the anatomical structure and blood flow of the human heart',
      'Trace neuron action potential generation and synaptic transmission',
      'Create a comprehensive Human Health & Physiology Study Guide'
    ],
    progress: 0,
    isEnrolled: false,
    isCompleted: false,
    roadmap: [
      { id: 'bio-w1', week: 1, title: 'Week 1: Cell Structure & Molecular Biology', description: 'Organelles, plasma membrane transport, and ATP energetics.', topics: ['Cell Organelles', 'Diffusion & Osmosis', 'Cellular Respiration', 'Enzyme Kinetics'], estimatedHours: 6, completed: false },
      { id: 'bio-w2', week: 2, title: 'Week 2: Genetics, DNA & Protein Synthesis', description: 'DNA replication, transcription, translation, and Mendelian inheritance.', topics: ['DNA Double Helix', 'RNA Transcription', 'Translation & Ribosomes', 'Punnett Squares'], estimatedHours: 7, completed: false },
      { id: 'bio-w3', week: 3, title: 'Week 3: The Cardiovascular & Respiratory Systems', description: 'Heart anatomy, pulmonary circulation, and gas exchange.', topics: ['Heart Anatomy & Valves', 'Blood Pressure Mechanics', 'Alveoli Gas Exchange', 'Hemoglobin Affinity'], estimatedHours: 8, completed: false },
      { id: 'bio-w4', week: 4, title: 'Week 4: The Nervous & Endocrine Systems', description: 'Neurons, action potentials, synapses, and hormone regulation.', topics: ['Neuron Structure', 'Action Potential Stages', 'Neurotransmitters', 'Hormone Feedback Loops'], estimatedHours: 8, completed: false },
      { id: 'bio-w5', week: 5, title: 'Week 5: Immunology & Pathophysiology', description: 'Innate vs adaptive immunity, antibodies, pathogens, and inflammation.', topics: ['Innate Immunity', 'B-cells & T-cells', 'Antibody Structure', 'Vaccine Mechanisms'], estimatedHours: 8, completed: false },
      { id: 'bio-w6', week: 6, title: 'Week 6: Final Capstone Project - Interactive Anatomy Study Guide', description: 'Produce a comprehensive organ system diagnostic portfolio and study guide.', topics: ['Clinical Case Studies', 'System Integration', 'Medical Terminology'], estimatedHours: 10, completed: false },
    ],
    resources: {
      videos: [
        { id: 'v-bio-1', title: 'Biology Crash Course: That\'s Why You\'re Alive', channel: 'CrashCourse Biology', duration: '1h 30m (Series)', url: 'https://www.youtube.com/watch?v=QnQe0xW_JY4', topic: 'Cell Biology' },
        { id: 'v-bio-2', title: 'Human Anatomy & Physiology Introduction', channel: 'Armando Hasudungan', duration: '40m', url: 'https://www.youtube.com/watch?v=uBGl2BujkPQ', topic: 'Anatomy Basics' },
        { id: 'v-bio-3', title: 'Action Potentials & Synaptic Transmission Explained', channel: 'Ninja Nerd', duration: '35m', url: 'https://www.youtube.com/watch?v=oa6rvUJlg7o', topic: 'Neuroscience' },
        { id: 'v-bio-4', title: 'Immune System: The Battle on Your Skin', channel: 'Kurzgesagt', duration: '15m', url: 'https://www.youtube.com/watch?v=zQGOcOUBi6s', topic: 'Immunology' },
      ],
      documentation: [
        { id: 'd-bio-1', title: 'National Center for Biotechnology Information (NCBI) Bookshelf', publisher: 'National Library of Medicine (NIH)', url: 'https://www.ncbi.nlm.nih.gov/books/', description: 'Free peer-reviewed biomedical textbooks including Molecular Biology of the Cell.', type: 'Official Medical Library' },
        { id: 'd-bio-2', title: 'OpenStax: Anatomy and Physiology Open Textbook', publisher: 'Rice University OpenStax', url: 'https://openstax.org/details/books/anatomy-and-physiology-2e', description: 'Peer-reviewed anatomy textbook with clinical cases and high-resolution anatomical diagrams.', type: 'Open Textbook' },
      ],
      reading: [
        { id: 'r-bio-1', title: 'Homeostasis: The Body\'s Balancing Act', authorOrSource: 'Khan Academy Medicine', url: 'https://www.khanacademy.org/science/biology/principles-of-physiology/body-structure-and-homeostasis/a/homeostasis', summary: 'Negative and positive feedback loops maintaining human core body temperature and blood glucose.' },
      ],
      practice: [
        { id: 'p-bio-1', title: 'Heart Blood Flow Sequence Drill', platform: 'IntelliPath Medical Lab', task: 'Arrange the sequence of blood flow from Superior Vena Cava to Aorta in exact anatomical order.', solutionTip: 'Right Atrium -> Tricuspid -> Right Ventricle -> Pulmonary Valve -> Pulmonary Artery -> Lungs -> Left Atrium -> Bicuspid -> Left Ventricle -> Aorta.' },
      ],
      assignments: [
        { id: 'a-bio-1', title: 'Lab: Cellular Respiration Pathway Flowchart', deliverable: 'Create a comparative diagram of Glycolysis, Krebs Cycle, and Electron Transport Chain with ATP yields.', instructions: 'Highlight anaerobic vs aerobic conditions and net ATP count.' },
      ],
      project: {
        id: 'proj-anatomy-guide',
        title: 'Human Physiological Systems & Case Study Portfolio',
        description: 'Compile an illustrated clinical study guide analyzing the interactions between the cardiovascular, respiratory, and renal systems during intense physical exercise.',
        difficulty: 'Beginner',
        requirements: [
          'Diagram of systemic and pulmonary cardiovascular circulation',
          'Step-by-step chemical breakdown of oxygen transport and hemoglobin saturation',
          'Clinical case study analysis of hypertension or asthma',
          'Glossary of 30 standard medical prefixes, roots, and suffixes'
        ],
        skillsTested: ['Physiology', 'Anatomy', 'Clinical Analysis', 'Medical Terminology'],
        deliverableType: 'Illustrated Scientific Guide / Presentation',
      },
    },
  },

  // =========================================================================
  // 7. CYBER SECURITY
  // =========================================================================
  {
    id: 'sec-cyber-security-fundamentals',
    title: 'Cyber Security Fundamentals & Ethical Defense',
    category: 'Cyber Security',
    domain: 'Technology',
    level: 'Beginner',
    aptitudeTier: 'tier3_foundation',
    duration: '6 Weeks',
    rating: 4.95,
    studentsCount: 16500,
    matchScore: 93,
    description: 'Learn network protocols, port scanning, encryption (symmetric/asymmetric), OWASP Top 10 web vulnerabilities, SQL injection defense, and ethical hacking fundamentals.',
    whyRecommended: 'In-demand security track for students aiming to protect digital systems, conduct vulnerability audits, and master ethical defense.',
    skillsGained: ['Network Protocols (TCP/IP, Wireshark)', 'Symmetric & Asymmetric Encryption', 'OWASP Top 10 Defense', 'SQL Injection Mitigation', 'Authentication Security (2FA/JWT)', 'Security Auditing'],
    objectives: [
      'Analyze network packet captures using Wireshark and identify anomalies',
      'Understand how public key cryptography (RSA, ECC, AES) secures web communications',
      'Test and remediate SQL injection and Cross-Site Scripting (XSS) vulnerabilities',
      'Author a comprehensive Web Application Security Audit'
    ],
    progress: 0,
    isEnrolled: false,
    isCompleted: false,
    roadmap: [
      { id: 'sec-w1', week: 1, title: 'Week 1: Introduction to Cybersecurity & CIA Triad', description: 'Confidentiality, Integrity, Availability, threat models, and attack vectors.', topics: ['CIA Triad', 'Threat Actors & Vectors', 'Zero Trust Architecture'], estimatedHours: 6, completed: false },
      { id: 'sec-w2', week: 2, title: 'Week 2: Networking Basics & Packet Analysis (Wireshark)', description: 'OSI 7-Layer model, TCP handshakes, ports, and packet sniffing.', topics: ['OSI Model', 'TCP 3-Way Handshake', 'Wireshark Packet Analysis', 'Port Scanning (Nmap)'], estimatedHours: 8, completed: false },
      { id: 'sec-w3', week: 3, title: 'Week 3: Cryptography & Public Key Infrastructure', description: 'Ciphers, AES, RSA, hashing (SHA-256, bcrypt), and SSL/TLS certificates.', topics: ['Symmetric vs Asymmetric', 'Hashing vs Encryption', 'SSL/TLS Handshake', 'Digital Signatures'], estimatedHours: 8, completed: false },
      { id: 'sec-w4', week: 4, title: 'Week 4: OWASP Top 10 Web Vulnerabilities', description: 'SQL Injection, XSS, CSRF, broken access control, and security misconfigurations.', topics: ['SQL Injection (SQLi)', 'Cross-Site Scripting (XSS)', 'Broken Access Control', 'CSRF Tokens'], estimatedHours: 9, completed: false },
      { id: 'sec-w5', week: 5, title: 'Week 5: Authentication, Authorization & Identity', description: 'Password hashing, multi-factor authentication (MFA), JWT tokens, and OAuth2.', topics: ['Password Salting & Hashing', 'MFA Protocols', 'JWT Vulnerabilities', 'Role-Based Access (RBAC)'], estimatedHours: 8, completed: false },
      { id: 'sec-w6', week: 6, title: 'Week 6: Final Capstone Project - Web Application Security Audit', description: 'Perform an ethical vulnerability assessment and author a security audit report.', topics: ['Vulnerability Assessment', 'Remediation Guidelines', 'Security Audit Report'], estimatedHours: 12, completed: false },
    ],
    resources: {
      videos: [
        { id: 'v-sec-1', title: 'Cyber Security Full Course for Beginners (2026)', channel: 'freeCodeCamp.org', duration: '3h 10m', url: 'https://www.youtube.com/watch?v=inWWhr5tnEA', topic: 'Cybersecurity Basics' },
        { id: 'v-sec-2', title: 'Wireshark Tutorial for Beginners - Network Analysis', channel: 'NetworkChuck', duration: '25m', url: 'https://www.youtube.com/watch?v=lb1Dw0elw0Q', topic: 'Network Analysis' },
        { id: 'v-sec-3', title: 'OWASP Top 10 Vulnerabilities Explained in 10 Minutes', channel: 'Fireship', duration: '12m', url: 'https://www.youtube.com/watch?v=F3P_2D_m0u4', topic: 'OWASP Top 10' },
        { id: 'v-sec-4', title: 'How Encryption Works (RSA, AES, Public Keys)', channel: 'Computerphile', duration: '18m', url: 'https://www.youtube.com/watch?v=GSIDS_lvRv4', topic: 'Cryptography' },
      ],
      documentation: [
        { id: 'd-sec-1', title: 'OWASP Top 10 Official Documentation & Code Examples', publisher: 'OWASP Foundation', url: 'https://owasp.org/www-project-top-ten/', description: 'The globally recognized awareness document for developers and security analysts.', type: 'Security Standard' },
        { id: 'd-sec-2', title: 'NIST Cybersecurity Framework (CSF 2.0)', publisher: 'National Institute of Standards and Technology', url: 'https://www.nist.gov/cyberframework', description: 'Guidance on managing and mitigating cybersecurity-related risk.', type: 'Government Standard' },
      ],
      reading: [
        { id: 'r-sec-1', title: 'The Anatomy of a Cyber Attack: From Recon to Exfiltration', authorOrSource: 'MITRE ATT&CK Framework', url: 'https://attack.mitre.org/', summary: 'Globally-accessible knowledge base of adversary tactics and techniques based on real-world observations.' },
      ],
      practice: [
        { id: 'p-sec-1', title: 'SQL Injection Remediation Drill', platform: 'IntelliPath Security Lab', task: 'Given vulnerable raw SQL concatenation `SELECT * FROM users WHERE user = \'` + input, convert it to a parameterized prepared statement.', solutionTip: 'Use parameterized placeholders (?) or ORM bindings to separate code from user data.' },
      ],
      assignments: [
        { id: 'a-sec-1', title: 'Lab: Wireshark HTTP vs HTTPS Credential Capture', deliverable: 'Capture unencrypted plaintext credentials on HTTP port 80 and contrast with encrypted TLS traffic on port 443.', instructions: 'Include annotated screenshots of TCP payload streams.' },
      ],
      project: {
        id: 'proj-security-audit',
        title: 'Web Application Security Audit & Hardening Report',
        description: 'Conduct a simulated security assessment of a sample web portal, identify 5 critical security vulnerabilities (e.g., SQLi, XSS, Weak Passwords, Missing Headers), and produce a remediation report with hardened code snippets.',
        difficulty: 'Beginner',
        requirements: [
          'Identify at least 5 distinct vulnerability vectors',
          'Classify risks using CVSS severity scoring (Critical, High, Medium, Low)',
          'Provide vulnerable code example alongside the secure patched version',
          'Recommend security headers (CSP, HSTS, X-Frame-Options) configuration'
        ],
        skillsTested: ['OWASP Top 10', 'Vulnerability Assessment', 'Cryptography', 'Secure Coding'],
        deliverableType: 'Security Audit PDF Report & Patched Codebase',
      },
    },
  },
];
