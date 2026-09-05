export interface PakistaniQuestion {
  id: number;
  stream: 'Pre-Medical' | 'Pre-Engineering' | 'ICS' | 'ICOM' | 'FA';
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const PAKISTANI_QUESTION_BANK: PakistaniQuestion[] = [
  // ================= PRE-MEDICAL (BIOLOGY, CHEMISTRY, PHYSICS) =================
  {
    id: 1,
    stream: 'Pre-Medical',
    subject: 'Biology',
    question: 'In human cellular respiration, which step produces the maximum number of ATP molecules per glucose molecule?',
    options: ['Glycolysis', 'Krebs Cycle (Citric Acid Cycle)', 'Oxidative Phosphorylation (Electron Transport Chain)', 'Fermentation'],
    correctAnswer: 2,
    explanation: 'Oxidative phosphorylation generates approximately 28 to 32 ATPs via ATP synthase in the mitochondrial inner membrane.',
    difficulty: 'Medium'
  },
  {
    id: 2,
    stream: 'Pre-Medical',
    subject: 'Biology',
    question: 'Which hormone is secreted by the beta cells of the Islets of Langerhans in the pancreas to lower blood glucose levels?',
    options: ['Glucagon', 'Insulin', 'Somatostatin', 'Epinephrine'],
    correctAnswer: 1,
    explanation: 'Insulin promotes cellular uptake of glucose and glycogen synthesis in liver and skeletal muscles.',
    difficulty: 'Easy'
  },
  {
    id: 3,
    stream: 'Pre-Medical',
    subject: 'Biology',
    question: 'The structural and functional unit of the human kidney is called:',
    options: ['Neuron', 'Nephron', 'Glomerulus', 'Alveolus'],
    correctAnswer: 1,
    explanation: 'A nephron is the microscopic structural unit responsible for ultrafiltration, selective reabsorption, and urine formation.',
    difficulty: 'Easy'
  },
  {
    id: 4,
    stream: 'Pre-Medical',
    subject: 'Biology',
    question: 'In Mendel’s law of independent assortment, what is the expected phenotypic ratio in the F2 generation of a dihybrid cross?',
    options: ['3:1', '9:3:3:1', '1:2:1', '1:1:1:1'],
    correctAnswer: 1,
    explanation: 'A standard dihybrid cross between heterozygous parents yields a 9:3:3:1 ratio of phenotypes.',
    difficulty: 'Medium'
  },
  {
    id: 5,
    stream: 'Pre-Medical',
    subject: 'Biology',
    question: 'Which enzyme is responsible for synthesizing mRNA from a DNA template during transcription?',
    options: ['DNA Polymerase III', 'RNA Polymerase II', 'DNA Ligase', 'Topoisomerase'],
    correctAnswer: 1,
    explanation: 'RNA Polymerase II catalyzes transcription of protein-coding genes into messenger RNA in eukaryotes.',
    difficulty: 'Hard'
  },
  {
    id: 6,
    stream: 'Pre-Medical',
    subject: 'Chemistry',
    question: 'According to Le Chatelier’s principle, what happens to the exothermic Haber Process (N₂ + 3H₂ ⇌ 2NH₃ + Heat) when temperature increases?',
    options: ['Yield of NH₃ increases', 'Equilibrium shifts toward reactants (left)', 'Rate of forward reaction increases infinitely', 'Pressure drops to zero'],
    correctAnswer: 1,
    explanation: 'For an exothermic reaction, adding heat shifts the equilibrium in the endothermic reverse direction.',
    difficulty: 'Medium'
  },
  {
    id: 7,
    stream: 'Pre-Medical',
    subject: 'Chemistry',
    question: 'What is the hybridisation of carbon in ethyne (acetylene, C₂H₂)?',
    options: ['sp³', 'sp²', 'sp', 'dsp²'],
    correctAnswer: 2,
    explanation: 'Each carbon atom in ethyne forms one sigma bond and two pi bonds, corresponding to linear sp hybridisation (180°).',
    difficulty: 'Easy'
  },
  {
    id: 8,
    stream: 'Pre-Medical',
    subject: 'Chemistry',
    question: 'Which functional group test produces a silver mirror when reacted with aldehydes?',
    options: ['Fehling’s solution', 'Tollens’ reagent', 'Lucas reagent', 'Baeyer’s reagent'],
    correctAnswer: 1,
    explanation: 'Tollens’ reagent (ammoniacal silver nitrate) oxidizes aldehydes to carboxylates while reducing Ag⁺ ions to metallic silver.',
    difficulty: 'Medium'
  },
  {
    id: 9,
    stream: 'Pre-Medical',
    subject: 'Physics',
    question: 'A body is thrown vertically upward with initial velocity 20 m/s. Taking g = 10 m/s², what is the maximum height attained?',
    options: ['10 m', '20 m', '40 m', '15 m'],
    correctAnswer: 1,
    explanation: 'Using h = v² / (2g) = 400 / 20 = 20 meters.',
    difficulty: 'Easy'
  },
  {
    id: 10,
    stream: 'Pre-Medical',
    subject: 'Physics',
    question: 'The phenomenon of splitting white light into its constituent seven colours when passing through a prism is known as:',
    options: ['Interference', 'Diffraction', 'Dispersion', 'Polarization'],
    correctAnswer: 2,
    explanation: 'Dispersion occurs because refractive index varies with the wavelength of light.',
    difficulty: 'Easy'
  },
  {
    id: 11,
    stream: 'Pre-Medical',
    subject: 'Biology',
    question: 'Which immunoglobulin antibody is primarily found in human colostrum and breast milk, conferring passive immunity to infants?',
    options: ['IgG', 'IgA', 'IgM', 'IgE'],
    correctAnswer: 1,
    explanation: 'Secretory IgA is abundant in mucosal secretions and maternal breast milk.',
    difficulty: 'Hard'
  },
  {
    id: 12,
    stream: 'Pre-Medical',
    subject: 'Biology',
    question: 'The blood vessels that carry oxygenated blood from the lungs back to the left atrium of the human heart are the:',
    options: ['Pulmonary arteries', 'Pulmonary veins', 'Vena cava', 'Aorta'],
    correctAnswer: 1,
    explanation: 'Pulmonary veins are the only veins in human body that carry oxygen-rich blood from lungs to left atrium.',
    difficulty: 'Easy'
  },
  {
    id: 13,
    stream: 'Pre-Medical',
    subject: 'Chemistry',
    question: 'What is the pH of a 0.01 M aqueous solution of strong monobasic acid HCl?',
    options: ['1', '2', '7', '12'],
    correctAnswer: 1,
    explanation: 'pH = -log[H⁺] = -log(10⁻²) = 2.',
    difficulty: 'Easy'
  },
  {
    id: 14,
    stream: 'Pre-Medical',
    subject: 'Physics',
    question: 'What is the dimensional formula for Work and Kinetic Energy in SI units?',
    options: ['[MLT⁻¹]', '[ML²T⁻²]', '[ML⁻¹T⁻²]', '[M²L²T⁻¹]'],
    correctAnswer: 1,
    explanation: 'Work = Force × Displacement = [MLT⁻²] × [L] = [ML²T⁻²].',
    difficulty: 'Medium'
  },

  // ================= PRE-ENGINEERING (MATHEMATICS, PHYSICS, CHEMISTRY) =================
  {
    id: 15,
    stream: 'Pre-Engineering',
    subject: 'Mathematics',
    question: 'What is the derivative of f(x) = sin(3x² + 5) with respect to x?',
    options: ['6x cos(3x² + 5)', 'cos(3x² + 5)', '6x sin(3x² + 5)', '-6x cos(3x² + 5)'],
    correctAnswer: 0,
    explanation: 'Using chain rule: d/dx[sin(u)] = cos(u) * du/dx = cos(3x² + 5) * (6x) = 6x cos(3x² + 5).',
    difficulty: 'Medium'
  },
  {
    id: 16,
    stream: 'Pre-Engineering',
    subject: 'Mathematics',
    question: 'What is the value of the definite integral ∫ from 0 to π/2 of cos(x) dx?',
    options: ['0', '1', 'π', '-1'],
    correctAnswer: 1,
    explanation: '∫ cos(x) dx = [sin(x)] from 0 to π/2 = sin(π/2) - sin(0) = 1 - 0 = 1.',
    difficulty: 'Easy'
  },
  {
    id: 17,
    stream: 'Pre-Engineering',
    subject: 'Mathematics',
    question: 'The eccentricity (e) of a parabola in conic sections is always equal to:',
    options: ['0', '1', '< 1', '> 1'],
    correctAnswer: 1,
    explanation: 'For a circle e = 0, ellipse e < 1, parabola e = 1, and hyperbola e > 1.',
    difficulty: 'Easy'
  },
  {
    id: 18,
    stream: 'Pre-Engineering',
    subject: 'Mathematics',
    question: 'If a matrix A is symmetric, then its transpose Aᵀ must satisfy:',
    options: ['Aᵀ = -A', 'Aᵀ = A', 'Aᵀ = A⁻¹', 'Aᵀ = 0'],
    correctAnswer: 1,
    explanation: 'By definition of a symmetric matrix, transpose of matrix A equals A itself (Aᵀ = A).',
    difficulty: 'Easy'
  },
  {
    id: 19,
    stream: 'Pre-Engineering',
    subject: 'Physics',
    question: 'According to Bernoulli’s Principle for fluid flow, where the velocity of fluid increases, the fluid pressure:',
    options: ['Increases', 'Decreases', 'Remains constant', 'Becomes infinite'],
    correctAnswer: 1,
    explanation: 'Bernoulli’s equation shows that sum of pressure energy and kinetic energy per unit volume is constant; thus higher speed implies lower pressure.',
    difficulty: 'Medium'
  },
  {
    id: 20,
    stream: 'Pre-Engineering',
    subject: 'Physics',
    question: 'A capacitor of capacitance 10 μF is connected to a 200 V DC source. The energy stored in the electric field is:',
    options: ['0.2 Joules', '2.0 Joules', '0.02 Joules', '20 Joules'],
    correctAnswer: 0,
    explanation: 'Stored Energy U = 1/2 C V² = 0.5 × (10 × 10⁻⁶) × (200)² = 0.5 × 10⁻⁵ × 40,000 = 0.2 Joules.',
    difficulty: 'Medium'
  },
  {
    id: 21,
    stream: 'Pre-Engineering',
    subject: 'Physics',
    question: 'Faraday’s Law of Electromagnetic Induction states that the magnitude of induced electromotive force (EMF) is proportional to:',
    options: ['Electric field magnitude', 'Rate of change of magnetic flux', 'Resistance of the circuit', 'Temperature of the coil'],
    correctAnswer: 1,
    explanation: 'Induced EMF = - N (dΦ/dt), directly proportional to the time rate of change of magnetic flux.',
    difficulty: 'Easy'
  },
  {
    id: 22,
    stream: 'Pre-Engineering',
    subject: 'Chemistry',
    question: 'In the electrochemical series, standard hydrogen electrode (SHE) is assigned an arbitrary electrode potential of:',
    options: ['+1.00 V', '0.00 V', '-1.00 V', '+0.50 V'],
    correctAnswer: 1,
    explanation: 'The Standard Hydrogen Electrode serves as reference standard and is assigned exactly 0.00 Volts.',
    difficulty: 'Easy'
  },
  {
    id: 23,
    stream: 'Pre-Engineering',
    subject: 'Mathematics',
    question: 'What is the sum of the infinite geometric series: 1 + 1/2 + 1/4 + 1/8 + ... ?',
    options: ['1.5', '2', '4', 'Infinity'],
    correctAnswer: 1,
    explanation: 'Sum = a / (1 - r) = 1 / (1 - 0.5) = 1 / 0.5 = 2.',
    difficulty: 'Easy'
  },
  {
    id: 24,
    stream: 'Pre-Engineering',
    subject: 'Physics',
    question: 'The de Broglie wavelength λ associated with a particle having momentum p is given by:',
    options: ['λ = h / p', 'λ = p / h', 'λ = h * p', 'λ = h / c'],
    correctAnswer: 0,
    explanation: 'Louis de Broglie wave equation states λ = h / p, where h is Planck’s constant.',
    difficulty: 'Medium'
  },

  // ================= ICS (COMPUTER SCIENCE, MATH, STATS/PHYSICS) =================
  {
    id: 25,
    stream: 'ICS',
    subject: 'Computer Science',
    question: 'In C/C++ programming language, which operator is used to access the value at the address stored in a pointer variable (dereferencing)?',
    options: ['& (Ampersand)', '* (Asterisk)', '-> (Arrow)', '. (Dot)'],
    correctAnswer: 1,
    explanation: 'The asterisk * is used as the dereference operator to get or set data pointed to by memory address.',
    difficulty: 'Easy'
  },
  {
    id: 26,
    stream: 'ICS',
    subject: 'Computer Science',
    question: 'Which of the following sorting algorithms has an average and worst-case time complexity of O(n log n)?',
    options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'],
    correctAnswer: 2,
    explanation: 'Merge Sort uses a divide-and-conquer strategy that consistently achieves O(n log n) in best, average, and worst scenarios.',
    difficulty: 'Medium'
  },
  {
    id: 27,
    stream: 'ICS',
    subject: 'Computer Science',
    question: 'In relational database management systems (RDBMS), what ensures entity integrity in a table?',
    options: ['Foreign Key', 'Primary Key cannot be NULL or duplicate', 'Index', 'CHECK constraint'],
    correctAnswer: 1,
    explanation: 'Entity integrity requires each row to have a unique and non-null Primary Key.',
    difficulty: 'Easy'
  },
  {
    id: 28,
    stream: 'ICS',
    subject: 'Computer Science',
    question: 'Which layer of the standard OSI network reference model is responsible for routing packets across IP subnets?',
    options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer'],
    correctAnswer: 1,
    explanation: 'The Network Layer (Layer 3) handles IP addressing, routing algorithms, and packet forwarding.',
    difficulty: 'Easy'
  },
  {
    id: 29,
    stream: 'ICS',
    subject: 'Computer Science',
    question: 'What is the boolean outcome of the expression: NOT (A AND B) according to De Morgan’s Laws?',
    options: ['(NOT A) AND (NOT B)', '(NOT A) OR (NOT B)', 'A OR B', 'A XOR B'],
    correctAnswer: 1,
    explanation: 'De Morgan’s first theorem states: ~(A . B) = ~A + ~B (NOT A OR NOT B).',
    difficulty: 'Medium'
  },
  {
    id: 30,
    stream: 'ICS',
    subject: 'Mathematics',
    question: 'What is the limit as x approaches 0 of sin(x) / x ?',
    options: ['0', '1', 'Undefined', 'Infinity'],
    correctAnswer: 1,
    explanation: 'The standard fundamental calculus trigonometric limit lim(x->0) [sin(x)/x] = 1 (using radians).',
    difficulty: 'Easy'
  },
  {
    id: 31,
    stream: 'ICS',
    subject: 'Computer Science',
    question: 'In Object-Oriented Programming (OOP), bundling data and the functions that manipulate that data into a single unit (class) is known as:',
    options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction'],
    correctAnswer: 1,
    explanation: 'Encapsulation shields the internal state of an object and enforces controlled access through methods.',
    difficulty: 'Easy'
  },
  {
    id: 32,
    stream: 'ICS',
    subject: 'Computer Science',
    question: 'Which register in a computer CPU holds the address of the next instruction to be fetched from memory?',
    options: ['Instruction Register (IR)', 'Program Counter (PC)', 'Accumulator (AC)', 'Memory Buffer Register (MBR)'],
    correctAnswer: 1,
    explanation: 'The Program Counter (PC) stores memory address of subsequent instruction to execute.',
    difficulty: 'Medium'
  },
  {
    id: 33,
    stream: 'ICS',
    subject: 'Mathematics',
    question: 'What is the gradient (slope) of the line represented by the equation 4x - 2y + 8 = 0 ?',
    options: ['-2', '2', '4', '-4'],
    correctAnswer: 1,
    explanation: 'Convert to y = mx + c: 2y = 4x + 8 => y = 2x + 4. The slope m = 2.',
    difficulty: 'Easy'
  },
  {
    id: 34,
    stream: 'ICS',
    subject: 'Computer Science',
    question: 'Which protocol is used in the Web for secure encrypted data transmission via SSL/TLS?',
    options: ['HTTP', 'HTTPS (Port 443)', 'FTP', 'SMTP'],
    correctAnswer: 1,
    explanation: 'HTTPS encrypts transport traffic using Transport Layer Security (TLS/SSL).',
    difficulty: 'Easy'
  },

  // ================= ICOM (COMMERCE, ACCOUNTING, ECONOMICS, BUSINESS MATH) =================
  {
    id: 35,
    stream: 'ICOM',
    subject: 'Accounting',
    question: 'Under the double-entry bookkeeping system, when a business purchases office machinery on cash, the entry is:',
    options: ['Debit Machinery, Credit Cash', 'Debit Cash, Credit Machinery', 'Debit Expense, Credit Capital', 'Debit Creditors, Credit Sales'],
    correctAnswer: 0,
    explanation: 'Machinery (an asset) increases (Debit), and Cash (an asset) decreases (Credit).',
    difficulty: 'Easy'
  },
  {
    id: 36,
    stream: 'ICOM',
    subject: 'Accounting',
    question: 'Depreciation of a fixed tangible asset like building or vehicle represents:',
    options: ['Cash expenditure', 'Gradual decrease in value due to wear, tear and passage of time', 'Appreciation of market value', 'Bad debts written off'],
    correctAnswer: 1,
    explanation: 'Depreciation allocates the cost of a long-term asset across its useful working lifespan.',
    difficulty: 'Easy'
  },
  {
    id: 37,
    stream: 'ICOM',
    subject: 'Economics',
    question: 'The Law of Demand states that, ceteris paribus (other things being equal), as price of a good increases:',
    options: ['Quantity demanded increases', 'Quantity demanded decreases', 'Supply decreases', 'Consumer income increases'],
    correctAnswer: 1,
    explanation: 'There exists an inverse relationship between price and quantity demanded.',
    difficulty: 'Easy'
  },
  {
    id: 38,
    stream: 'ICOM',
    subject: 'Economics',
    question: 'Which market structure features a single seller with no close substitutes for the product?',
    options: ['Monopoly', 'Perfect Competition', 'Oligopoly', 'Monopolistic Competition'],
    correctAnswer: 0,
    explanation: 'A monopoly has total market control with prohibitive barriers to entry and a sole producer.',
    difficulty: 'Easy'
  },
  {
    id: 39,
    stream: 'ICOM',
    subject: 'Business Math',
    question: 'Calculate simple interest on a principal loan of PKR 50,000 at 10% annual rate for 3 years:',
    options: ['PKR 5,000', 'PKR 15,000', 'PKR 16,550', 'PKR 20,000'],
    correctAnswer: 1,
    explanation: 'Interest = (P × R × T) / 100 = (50,000 × 10 × 3) / 100 = PKR 15,000.',
    difficulty: 'Easy'
  },
  {
    id: 40,
    stream: 'ICOM',
    subject: 'Banking & Commerce',
    question: 'The central bank of Pakistan that regulates currency emission, monetary policy, and commercial banks is:',
    options: ['National Bank of Pakistan (NBP)', 'State Bank of Pakistan (SBP)', 'Habib Bank Limited (HBL)', 'Securities and Exchange Commission (SECP)'],
    correctAnswer: 1,
    explanation: 'The State Bank of Pakistan (SBP) is the central monetary authority and regulator established in 1948.',
    difficulty: 'Easy'
  },
  {
    id: 41,
    stream: 'ICOM',
    subject: 'Accounting',
    question: 'What is the gross profit formula in the trading and profit & loss account?',
    options: ['Net Sales - Cost of Goods Sold (COGS)', 'Revenue - Operating Expenses', 'Total Assets - Liabilities', 'Opening Stock + Purchases'],
    correctAnswer: 0,
    explanation: 'Gross Profit = Net Sales Revenue minus Direct Cost of Goods Sold.',
    difficulty: 'Easy'
  },
  {
    id: 42,
    stream: 'ICOM',
    subject: 'Commerce',
    question: 'In a partnership firm in Pakistan under the Partnership Act 1932, the liability of general partners is:',
    options: ['Limited to capital contributed', 'Unlimited (joint and several)', 'Guaranteed by government', 'Zero'],
    correctAnswer: 1,
    explanation: 'In general partnerships, partners carry joint and personal unlimited liability for business debts.',
    difficulty: 'Medium'
  },

  // ================= FA (HUMANITIES, CIVICS, PAK STUDIES, ENGLISH, SOCIOLOGY) =================
  {
    id: 43,
    stream: 'FA',
    subject: 'Pakistan Studies',
    question: 'The historic Lahore Resolution demanding separate autonomous Muslim states was passed on:',
    options: ['14 August 1947', '23 March 1940', '25 December 1876', '11 September 1948'],
    correctAnswer: 1,
    explanation: 'The Lahore Resolution (later Pakistan Resolution) was presented at Minto Park (Iqbal Park) on March 23, 1940.',
    difficulty: 'Easy'
  },
  {
    id: 44,
    stream: 'FA',
    subject: 'Pakistan Studies',
    question: 'Which constitutional amendment in 1973 restored the parliamentary democracy and provincial autonomy in Pakistan in 2010?',
    options: ['8th Amendment', '18th Amendment', '21st Amendment', '14th Amendment'],
    correctAnswer: 1,
    explanation: 'The 18th Constitutional Amendment passed in April 2010 decentralized powers to provinces.',
    difficulty: 'Medium'
  },
  {
    id: 45,
    stream: 'FA',
    subject: 'Civics & Political Science',
    question: 'According to Aristotle, man is by nature a:',
    options: ['Solitary creature', 'Zoon Politikon (Social and Political animal)', 'Economic competitor', 'Technological innovator'],
    correctAnswer: 1,
    explanation: 'Aristotle in "Politics" famously stated that human beings thrive through community and political organization.',
    difficulty: 'Easy'
  },
  {
    id: 46,
    stream: 'FA',
    subject: 'English',
    question: 'Identify the figure of speech in: "The city traffic roared like an angry lion."',
    options: ['Metaphor', 'Simile', 'Personification', 'Hyperbole'],
    correctAnswer: 1,
    explanation: 'A simile directly compares two different concepts using explicit connecting words "like" or "as".',
    difficulty: 'Easy'
  },
  {
    id: 47,
    stream: 'FA',
    subject: 'Sociology',
    question: 'The primary agent of childhood socialization in sociology is recognized as:',
    options: ['Mass Media', 'The Family', 'Peer Groups', 'Labor Market'],
    correctAnswer: 1,
    explanation: 'Family is the earliest and most fundamental primary socializer transmitting language, values, and norms.',
    difficulty: 'Easy'
  },
  {
    id: 48,
    stream: 'FA',
    subject: 'Pakistan Studies',
    question: 'Which mountain peak is the highest in Pakistan and second highest in the world?',
    options: ['Nanga Parbat', 'K2 (Godwin-Austen - 8,611 m)', 'Broad Peak', 'Rakaposhi'],
    correctAnswer: 1,
    explanation: 'K2 in the Karakoram range stands at 8,611 meters above sea level.',
    difficulty: 'Easy'
  },
  {
    id: 49,
    stream: 'FA',
    subject: 'English',
    question: 'Choose the sentence with correct subject-verb agreement:',
    options: [
      'Neither the teacher nor the students was present.',
      'Neither the teacher nor the students were present.',
      'Each of the candidate have submitted their forms.',
      'A herd of cattle are grazing peacefully.'
    ],
    correctAnswer: 1,
    explanation: 'In "neither... nor", the verb agrees with the closer subject ("students" -> plural -> "were").',
    difficulty: 'Medium'
  },
  {
    id: 50,
    stream: 'FA',
    subject: 'Civics',
    question: 'The fundamental law of the land from which all administrative and judicial authority flows is:',
    options: ['Statutory ordinance', 'The Constitution', 'Executive order', 'Police regulations'],
    correctAnswer: 1,
    explanation: 'The supreme Constitution defines state institutions, limits executive power, and guarantees citizen rights.',
    difficulty: 'Easy'
  }
];

// Helper generator to provide random 10 questions per stream
export function getRandomQuestionsByStream(stream: string, count: number = 10): PakistaniQuestion[] {
  const normalized = stream || 'Pre-Medical';
  let filtered = PAKISTANI_QUESTION_BANK.filter(q => q.stream.toLowerCase() === normalized.toLowerCase());
  
  if (filtered.length === 0) {
    filtered = PAKISTANI_QUESTION_BANK;
  }
  
  // Shuffle array using Fisher-Yates
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  
  // If pool is smaller than count, cycle with unique IDs
  const result: PakistaniQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const base = shuffled[i % shuffled.length];
    result.push({
      ...base,
      id: i + 1
    });
  }
  return result;
}
