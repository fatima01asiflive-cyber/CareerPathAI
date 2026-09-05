export interface VideoLecture {
  id: string;
  title: string;
  subject: string;
  stream: 'Pre-Medical' | 'Pre-Engineering' | 'ICS' | 'ICOM' | 'FA' | 'All';
  durationSeconds: number;
  durationFormatted: string;
  instructor: string;
  institute: string;
  thumbnail: string;
  videoUrl: string; // YouTube embed or high quality direct educational video
  description: string;
  keyTakeaways: string[];
  formulaSheetPdfName: string;
}

export const PAKISTANI_LECTURE_LIBRARY: VideoLecture[] = [
  {
    id: 'lec-1',
    title: 'MDCAT Biology: Cellular Energetics & Krebs Cycle Masterclass',
    subject: 'Biology',
    stream: 'Pre-Medical',
    durationSeconds: 780, // 13 mins
    durationFormatted: '13:00',
    instructor: 'Dr. Hamza Siddiqui (KEMU Gold Medalist)',
    institute: 'Punjab MDCAT Prep Academy',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/00jbG_cfGuQ',
    description: 'Deep-dive into high-yield PMC/UHS MDCAT questions on ATP yield, glycolysis regulation, and mitochondrial inner membrane complexes.',
    keyTakeaways: ['Total ATP count per glucose = 30-32', 'NADH produces 2.5 ATP, FADH2 produces 1.5 ATP', 'Pyruvate dehydrogenase complex regulation'],
    formulaSheetPdfName: 'Krebs_Cycle_MDCAT_Quick_Formulas.pdf'
  },
  {
    id: 'lec-2',
    title: 'ECAT / NUST NET Mathematics: Conic Sections & Parabola Shortcuts',
    subject: 'Mathematics',
    stream: 'Pre-Engineering',
    durationSeconds: 960, // 16 mins
    durationFormatted: '16:00',
    instructor: 'Prof. Tariq Mahmood (Ex-UET Faculty)',
    institute: 'Pak Engineering Entry Test Hub',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/2_X37F9zR2A',
    description: 'Master 15-second shortcut tricks for finding directrix, vertex, focus, and tangent equations in NUST NET & ECAT.',
    keyTakeaways: ['Standard parabola y² = 4ax coordinates', 'Tangent condition y = mx + a/m', 'Eccentricity shortcuts for shifted conics'],
    formulaSheetPdfName: 'Conics_ECAT_Cheat_Sheet.pdf'
  },
  {
    id: 'lec-3',
    title: 'ICS Computer Science: C++ Pointers & Memory Management for FAST Entry Test',
    subject: 'Computer Science',
    stream: 'ICS',
    durationSeconds: 840, // 14 mins
    durationFormatted: '14:00',
    instructor: 'Engr. Ali Raza (FAST-NUCES Alumni)',
    institute: 'PakTech Academy',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/zuegQmMdy8M',
    description: 'Clear fundamental concepts of pointer arithmetic, dynamic memory allocation with new/delete, and common memory leak pitfalls.',
    keyTakeaways: ['Pointer dereferencing & address operators', 'Dynamic 2D arrays in heap', 'Stack vs Heap memory lifecycle'],
    formulaSheetPdfName: 'Pointers_OOP_Quick_Revision.pdf'
  },
  {
    id: 'lec-4',
    title: 'ICOM Accounting: Final Accounts with Adjustments & Balance Sheet',
    subject: 'Accounting',
    stream: 'ICOM',
    durationSeconds: 720, // 12 mins
    durationFormatted: '12:00',
    instructor: 'Sir Kamran Qureshi (FCA)',
    institute: 'Lahore Commerce Institute',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/5F2o3Q6Kq10',
    description: 'Step-by-step solving of 20-mark board exam questions covering prepaid expenses, accrued revenue, and bad debt reserves.',
    keyTakeaways: ['Dual impact of adjusting entries', 'Depreciation calculation methods', 'Classified Balance Sheet layout'],
    formulaSheetPdfName: 'Adjusting_Entries_Summary.pdf'
  },
  {
    id: 'lec-5',
    title: 'FA / Entry Tests English: Sentence Correction & Critical Vocabulary',
    subject: 'English & Reasoning',
    stream: 'All',
    durationSeconds: 660, // 11 mins
    durationFormatted: '11:00',
    instructor: 'Ma’am Zainab Tariq (LUMS M.Phil)',
    institute: 'National Testing Services Academy',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/l592QoQeB1w',
    description: 'Crucial rules of Subject-Verb agreement, dangling modifiers, and high-frequency roots tested in NUST, IBA, and LAT.',
    keyTakeaways: ['Proximity rule in compound subjects', 'Parallel structure in correlative conjunctions', '50 root words for rapid vocab decoding'],
    formulaSheetPdfName: 'English_Grammar_Master_Rules.pdf'
  },
  {
    id: 'lec-6',
    title: 'Intermediate Physics: Rotational Dynamics & Moment of Inertia in 15 Minutes',
    subject: 'Physics',
    stream: 'Pre-Engineering',
    durationSeconds: 900, // 15 mins
    durationFormatted: '15:00',
    instructor: 'Dr. Shahbaz Akhtar',
    institute: 'Federal Board Physics Dept',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/aD33_1p_X5I',
    description: 'Visual intuition behind torque, angular momentum conservation, and parallel-axis theorem with animated models.',
    keyTakeaways: ['Torque τ = I α and L = I ω', 'Parallel axis theorem: I = I_cm + Md²', 'Conservation of angular momentum in gyroscopes'],
    formulaSheetPdfName: 'Rotational_Motion_Formula_Card.pdf'
  }
];
