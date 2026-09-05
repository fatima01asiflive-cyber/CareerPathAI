export interface FieldDocument {
  id: string;
  title: string;
  field: string;
  type: 'Official Documentation' | 'Cheatsheet & Reference' | 'Architecture Whitepaper' | 'Handbook & Book';
  description: string;
  publisher: string;
  readingTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  url: string;
  icon: string;
  badge: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  field: string;
  channelName: string;
  level: 'Basic' | 'Intermediate' | 'Pro / Advanced' | 'Full Course (Basic to Pro)' | 'Basic to Pro' | 'Intermediate to Pro';
  videosCount: string;
  duration: string;
  description: string;
  playlistUrl: string;
  thumbnail: string;
  highlights: string[];
}

export const OFFICIAL_DOCUMENTS_DATA: FieldDocument[] = [
  {
    id: 'doc-mdn',
    title: 'MDN Web Docs - HTML, CSS & JavaScript Standard',
    field: 'Computer Science & Software Engineering',
    type: 'Official Documentation',
    publisher: 'Mozilla Developer Network',
    description: 'The world standard web development reference and interactive guides covering modern ES6+, DOM manipulation, Web APIs, and accessibility.',
    readingTime: 'Self-Paced Core Ref',
    level: 'All Levels',
    url: 'https://developer.mozilla.org/',
    icon: 'code',
    badge: 'MUST-READ WEB REF',
  },
  {
    id: 'doc-react',
    title: 'React.dev - Modern React & Server Components Handbook',
    field: 'Computer Science & Software Engineering',
    type: 'Official Documentation',
    publisher: 'Meta / React Team',
    description: 'Interactive modern documentation explaining state hooks, component lifecycles, performance optimizations, and React Server Components.',
    readingTime: '20 min read / section',
    level: 'Intermediate',
    url: 'https://react.dev/learn',
    icon: 'terminal',
    badge: 'OFFICIAL REACT DOCS',
  },
  {
    id: 'doc-python',
    title: 'Python 3 Official Language Reference & PEP 8 Style Guide',
    field: 'Computer Science & Software Engineering',
    type: 'Official Documentation',
    publisher: 'Python Software Foundation',
    description: 'Comprehensive language syntax specs, built-in standard library functions, concurrency modules, and clean code formatting standards.',
    readingTime: 'Comprehensive',
    level: 'All Levels',
    url: 'https://docs.python.org/3/',
    icon: 'description',
    badge: 'CORE PYTHON SPEC',
  },
  {
    id: 'doc-dsa',
    title: 'Refactoring.Guru - Design Patterns & Object-Oriented Architecture',
    field: 'Computer Science & Software Engineering',
    type: 'Handbook & Book',
    publisher: 'Refactoring.Guru',
    description: 'Visual breakdowns of Creational, Structural, and Behavioral software design patterns with real code examples and SOLID principles.',
    readingTime: '45 min read',
    level: 'Intermediate',
    url: 'https://refactoring.guru/design-patterns',
    icon: 'account_tree',
    badge: 'SOFTWARE PATTERNS',
  },
  {
    id: 'doc-google-ml',
    title: 'Google AI & Machine Learning Foundations Glossary',
    field: 'Data Science & AI',
    type: 'Official Documentation',
    publisher: 'Google AI Research',
    description: 'In-depth mathematical definitions, algorithms, gradient descent, neural net architectures, and practical machine learning engineering guides.',
    readingTime: '30 min read',
    level: 'Beginner',
    url: 'https://developers.google.com/machine-learning/glossary',
    icon: 'psychology',
    badge: 'GOOGLE AI OFFICIAL',
  },
  {
    id: 'doc-pytorch',
    title: 'PyTorch Official Deep Learning Tutorials & Model Training',
    field: 'Data Science & AI',
    type: 'Official Documentation',
    publisher: 'Linux Foundation / Meta AI',
    description: 'Step-by-step guides on building neural networks, CUDA GPU acceleration, computer vision models, and transformer LLM pipelines.',
    readingTime: '1 hr tutorial',
    level: 'Advanced',
    url: 'https://pytorch.org/tutorials/',
    icon: 'insights',
    badge: 'DEEP LEARNING SPEC',
  },
  {
    id: 'doc-aws-arch',
    title: 'AWS Well-Architected Framework & Cloud Architecture Whitepapers',
    field: 'Cloud Architecture & DevOps',
    type: 'Architecture Whitepaper',
    publisher: 'Amazon Web Services',
    description: 'Industry standard pillars for security, reliability, performance efficiency, cost optimization, and operational excellence in cloud systems.',
    readingTime: '2 hr whitepaper',
    level: 'Advanced',
    url: 'https://aws.amazon.com/architecture/whitepapers/',
    icon: 'cloud_done',
    badge: 'AWS CLOUD STANDARDS',
  },
  {
    id: 'doc-k8s',
    title: 'Kubernetes Official Cluster Administration & kubectl Cheat Sheet',
    field: 'Cloud Architecture & DevOps',
    type: 'Cheatsheet & Reference',
    publisher: 'Cloud Native Computing Foundation (CNCF)',
    description: 'Essential commands for managing pods, deployments, ingress controllers, persistent volumes, and microservice orchestration.',
    readingTime: 'Quick Reference',
    level: 'Intermediate',
    url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/',
    icon: 'developer_board',
    badge: 'CNCF DEVOPS REF',
  },
  {
    id: 'doc-owasp',
    title: 'OWASP Top 10 Web Application Security Risks Handbook',
    field: 'Cyber Security',
    type: 'Cheatsheet & Reference',
    publisher: 'OWASP Foundation',
    description: 'The critical awareness document for developers and security analysts covering injection vulnerabilities, broken access control, and cryptographic failures.',
    readingTime: '40 min read',
    level: 'Intermediate',
    url: 'https://owasp.org/www-project-top-ten/',
    icon: 'shield',
    badge: 'SECURITY GOLD STANDARD',
  },
  {
    id: 'doc-flutter',
    title: 'Flutter & Dart Official Developer Documentation & Codelabs',
    field: 'Mobile App Development',
    type: 'Official Documentation',
    publisher: 'Google Flutter Team',
    description: 'Complete cross-platform mobile development reference for building native iOS and Android apps with declarative widget architecture.',
    readingTime: 'Self-Paced Guide',
    level: 'All Levels',
    url: 'https://docs.flutter.dev/',
    icon: 'phone_iphone',
    badge: 'MOBILE DEV REF',
  }
];

export const YOUTUBE_PLAYLISTS_DATA: YouTubePlaylist[] = [
  {
    id: 'yt-cs50',
    title: 'CS50: Introduction to Computer Science (Harvard University)',
    field: 'Computer Science & Software Engineering',
    channelName: 'Harvard University / David J. Malan',
    level: 'Full Course (Basic to Pro)',
    videosCount: '25 Videos',
    duration: '40+ Hours Total',
    description: 'Harvard premier entry-level computer science course teaching algorithmic thinking, C programming, memory allocation, Python, SQL, and web stacks.',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLhQjrBD2T382_R136jDqjmgB7i62V6BCp',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    highlights: ['Algorithms & Big-O', 'C & Memory Pointers', 'Data Structures', 'Python & Flask', 'SQL Databases'],
  },
  {
    id: 'yt-dsa-abdulbari',
    title: 'Data Structures & Algorithms Masterclass (Basic to Pro)',
    field: 'Computer Science & Software Engineering',
    channelName: 'Abdul Bari',
    level: 'Pro / Advanced',
    videosCount: '84 Videos',
    duration: '35 Hours Total',
    description: 'The legend of algorithms explaining recursion, dynamic programming, graph algorithms (Dijkstra, Prim), tree traversals, and divide-and-conquer.',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLDN4rrl4ldRvp23sYfIIn133iLq2B4B27',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    highlights: ['Dynamic Programming', 'Graph Theory', 'Greedy Method', 'Tree Data Structures', 'Sorting Algorithms'],
  },
  {
    id: 'yt-webdev-full',
    title: 'Full Stack Web Development 2026 Bootcamp (Basic to Pro)',
    field: 'Computer Science & Software Engineering',
    channelName: 'FreeCodeCamp & Traversy Media',
    level: 'Full Course (Basic to Pro)',
    videosCount: '48 Videos',
    duration: '60+ Hours Total',
    description: 'Comprehensive web track from HTML5/CSS3 basics to advanced JavaScript ES6+, React.js, Node.js, Express, Next.js 14, and MongoDB databases.',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLILLU7-bn60bhOAG4Jv2Lid1O1AakxM7j',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    highlights: ['HTML/CSS Grid & Flex', 'Modern JS ES6+', 'React.js & Redux', 'Node.js REST APIs', 'Full-Stack Deployment'],
  },
  {
    id: 'yt-ai-statquest',
    title: 'Machine Learning & Neural Networks Visualized (Basic to Pro)',
    field: 'Data Science & AI',
    channelName: 'StatQuest with Josh Starmer',
    level: 'Basic to Pro',
    videosCount: '95 Videos',
    duration: '25 Hours Total',
    description: 'Crystal-clear visual explanations of Linear Regression, Decision Trees, Support Vector Machines, Neural Networks, PyTorch, and Transformers.',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GWCJF',
    thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80',
    highlights: ['Mathematical intuition', 'Neural Networks', 'Gradient Descent', 'Transformer Models', 'PyTorch Basics'],
  },
  {
    id: 'yt-devops-nana',
    title: 'DevOps & Cloud Engineering Bootcamp (Docker, K8s, AWS)',
    field: 'Cloud Architecture & DevOps',
    channelName: 'TechWorld with Nana',
    level: 'Intermediate to Pro',
    videosCount: '32 Videos',
    duration: '28 Hours Total',
    description: 'Hands-on DevOps mastery covering Linux administration, Docker containerization, Kubernetes orchestration, Terraform Infrastructure as Code, and CI/CD pipelines.',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLy7NrLohpwe9A73QAnX-5-0kC_6RzMbgx',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    highlights: ['Docker Containers', 'Kubernetes Pods', 'Jenkins & GitHub Actions', 'Terraform IaC', 'AWS Deployment'],
  },
  {
    id: 'yt-sec-chuck',
    title: 'Ethical Hacking & Network Security Mastery (Basic to Pro)',
    field: 'Cyber Security',
    channelName: 'NetworkChuck & The Cyber Mentor',
    level: 'Full Course (Basic to Pro)',
    videosCount: '55 Videos',
    duration: '32 Hours Total',
    description: 'Practical penetration testing, Linux command line, Wireshark packet analysis, Nmap scanning, Metasploit exploits, and Python for hackers.',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLG49S3ust9Z89e7kQflkY06nC3m2vC5yN',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    highlights: ['Networking Protocols', 'Linux Command Line', 'Metasploit & Nmap', 'Web Vulnerabilities', 'Python Automation'],
  },
  {
    id: 'yt-flutter-hitesh',
    title: 'Flutter & Dart Mobile App Development (Basic to Pro)',
    field: 'Mobile App Development',
    channelName: 'Hitesh Choudhary & Mitch Koko',
    level: 'Full Course (Basic to Pro)',
    videosCount: '62 Videos',
    duration: '30 Hours Total',
    description: 'Build production-ready cross-platform mobile apps for iOS and Android with Dart, Flutter UI widgets, State Management (Riverpod/Bloc), and Firebase backend.',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0fZXY2yB',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Dart Language', 'Flutter Widgets', 'State Management', 'Firebase Integration', 'App Store Publishing'],
  },
  {
    id: 'yt-ux-designcourse',
    title: 'Figma UI/UX & Product Design Complete Series',
    field: 'UX & Product Design',
    channelName: 'DesignCourse (Gary Simon)',
    level: 'Basic to Pro',
    videosCount: '40 Videos',
    duration: '22 Hours Total',
    description: 'Master visual hierarchy, typography, color theory, Auto Layout in Figma, interactive micro-animations, design systems, and responsive design.',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLW-zSkCnZ-gB_6-EWW7fC-9n8O37p9I-m',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Figma Auto Layout', 'Design Systems', 'Micro-Interactions', 'User Personas', 'Mobile Responsiveness'],
  }
];
