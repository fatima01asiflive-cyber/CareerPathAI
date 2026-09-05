import React, { useState } from 'react';
import { UserAccount, TabType } from '../types';

interface UniversityListProps {
  user: UserAccount;
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
}

export interface PakistanUniversity {
  id: string;
  name: string;
  shortName: string;
  city: string;
  province: string;
  hecRanking: string;
  fieldCategory: string;
  matchScore: number;
  acceptanceRate: string;
  tuitionPerSemester: string;
  avgStartingSalaryPKR: string;
  image: string;
  topPrograms: string[];
  admissionTests: string[];
  description: string;
  deadline: string;
  website: string;
  hostelAvailable: boolean;
  scholarshipsAvailable: boolean;
}

export const PAKISTAN_UNIVERSITIES_DATA: PakistanUniversity[] = [
  // --- ISLAMABAD / RAWALPINDI ---
  {
    id: 'nust-isb',
    name: 'National University of Sciences & Technology (NUST)',
    shortName: 'NUST',
    city: 'Islamabad',
    province: 'Federal Capital',
    hecRanking: '#1 Engineering & CS in Pakistan (QS #334)',
    fieldCategory: 'CS & Software Engineering',
    matchScore: 98,
    acceptanceRate: '5.2%',
    tuitionPerSemester: 'Rs. 185,000 / semester',
    avgStartingSalaryPKR: 'Rs. 180,000 - 350,000 / mo',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science (SEECS)', 'BS Software Engineering', 'BS Data Science & AI', 'BE Mechatronics'],
    admissionTests: ['NET (NUST Entry Test)', 'SAT Subject Score'],
    description: 'Pakistan premier multidisciplinary technical institute. Outstanding software research labs, strong international placement, and incubation center (NICC).',
    deadline: 'July 15, 2026',
    website: 'https://nust.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'fast-isb',
    name: 'FAST-NUCES (National University of Computer & Emerging Sciences)',
    shortName: 'FAST Islamabad',
    city: 'Islamabad',
    province: 'Federal Capital',
    hecRanking: '#1 Software Industry Alumni & Placement',
    fieldCategory: 'CS & Software Engineering',
    matchScore: 97,
    acceptanceRate: '7.8%',
    tuitionPerSemester: 'Rs. 195,000 / semester',
    avgStartingSalaryPKR: 'Rs. 190,000 - 400,000 / mo',
    image: 'https://images.unsplash.com/photo-1526657782461-9fe13402a841?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Software Engineering', 'BS Computer Science', 'BS Artificial Intelligence', 'BS Cyber Security'],
    admissionTests: ['FAST NU Admission Test', 'NTS NAT-IE'],
    description: 'Unrivaled coding rigor and algorithmic training. FAST graduates dominate tech leadership in Silicon Valley, Dubai, and top Pakistani software houses.',
    deadline: 'July 10, 2026',
    website: 'https://nu.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'comsats-isb',
    name: 'COMSATS University Islamabad (CUI)',
    shortName: 'COMSATS',
    city: 'Islamabad',
    province: 'Federal Capital',
    hecRanking: '#1 IT & CS Research Citations in Pakistan',
    fieldCategory: 'AI, Data Science & Robotics',
    matchScore: 94,
    acceptanceRate: '12.4%',
    tuitionPerSemester: 'Rs. 145,000 / semester',
    avgStartingSalaryPKR: 'Rs. 140,000 - 260,000 / mo',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Artificial Intelligence', 'BS Cyber Security', 'BS Bioinformatics'],
    admissionTests: ['NTS NAT-I', 'NTS NAT-ICS'],
    description: 'Pioneer in IT expansion across Pakistan. Exceptional faculty publication records, state-of-the-art supercomputing labs, and PEEF scholarships.',
    deadline: 'July 25, 2026',
    website: 'https://comsats.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'qau-isb',
    name: 'Quaid-i-Azam University (QAU)',
    shortName: 'QAU Islamabad',
    city: 'Islamabad',
    province: 'Federal Capital',
    hecRanking: '#1 HEC Overall University Ranking',
    fieldCategory: 'AI, Data Science & Robotics',
    matchScore: 92,
    acceptanceRate: '10.5%',
    tuitionPerSemester: 'Rs. 75,000 / semester',
    avgStartingSalaryPKR: 'Rs. 120,000 - 220,000 / mo',
    image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Mathematics & Data Modeling', 'BS Information Technology'],
    admissionTests: ['QAU Departmental Test', 'HSSC Merit'],
    description: 'Pakistan premier public research university set in the Margalla foothills. Top academic publishing output in AI algorithms and pure sciences.',
    deadline: 'August 5, 2026',
    website: 'https://qau.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'pieas-isb',
    name: 'Pakistan Institute of Engineering & Applied Sciences (PIEAS)',
    shortName: 'PIEAS',
    city: 'Islamabad',
    province: 'Federal Capital',
    hecRanking: '#2 HEC Engineering & CS',
    fieldCategory: 'Electrical & Mechanical Engineering',
    matchScore: 93,
    acceptanceRate: '4.5%',
    tuitionPerSemester: 'Rs. 110,000 / semester',
    avgStartingSalaryPKR: 'Rs. 160,000 - 300,000 / mo',
    image: 'https://images.unsplash.com/photo-1527891751199-7225231a68d7?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Electrical Engineering (Robotics)', 'BS Mechanical Engineering'],
    admissionTests: ['PIEAS Admission Written Test'],
    description: 'Extremely elite engineering and computing institute with high faculty-to-student ratio and government atomic energy research ties.',
    deadline: 'June 30, 2026',
    website: 'https://pieas.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'rmu-rwp',
    name: 'Rawalpindi Medical University (RMU)',
    shortName: 'RMU Rawalpindi',
    city: 'Rawalpindi',
    province: 'Punjab',
    hecRanking: 'Top Public Medical College',
    fieldCategory: 'Medical & BioTech',
    matchScore: 90,
    acceptanceRate: '2.8%',
    tuitionPerSemester: 'Rs. 45,000 / year (Public)',
    avgStartingSalaryPKR: 'Rs. 150,000 - 250,000 / mo',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['MBBS Medical Sciences', 'B.D.S Dental Surgery', 'BS Health Informatics & BioTech'],
    admissionTests: ['MDCAT (Medical College Admission Test)'],
    description: 'Renowned medical center connected with Holy Family Hospital and Benazir Bhutto Hospital for clinical practice and BioTech research.',
    deadline: 'August 10, 2026',
    website: 'https://rmu.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },

  // --- LAHORE ---
  {
    id: 'lums-lhr',
    name: 'Lahore University of Management Sciences (LUMS)',
    shortName: 'LUMS',
    city: 'Lahore',
    province: 'Punjab',
    hecRanking: '#1 Private University in Pakistan (Syed Babar Ali School of Science)',
    fieldCategory: 'CS & Software Engineering',
    matchScore: 99,
    acceptanceRate: '6.5%',
    tuitionPerSemester: 'Rs. 480,000 / semester',
    avgStartingSalaryPKR: 'Rs. 250,000 - 550,000 / mo',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science (SBASSE)', 'BS Electrical Engineering', 'BS Management Science & FinTech'],
    admissionTests: ['LCAT (LUMS Admission Test)', 'SAT Digital'],
    description: 'World-class campus with top international placement into Google, Meta, McKinsey, and global Ivy League PhDs. Generous NOP 100% scholarship program.',
    deadline: 'Feb 1, 2026 (Early) / Jan 30, 2027',
    website: 'https://lums.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'fast-lhr',
    name: 'FAST-NUCES Lahore',
    shortName: 'FAST Lahore',
    city: 'Lahore',
    province: 'Punjab',
    hecRanking: '#1 Software House Hiring Hub in Punjab',
    fieldCategory: 'CS & Software Engineering',
    matchScore: 96,
    acceptanceRate: '8.1%',
    tuitionPerSemester: 'Rs. 195,000 / semester',
    avgStartingSalaryPKR: 'Rs. 185,000 - 380,000 / mo',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Software Engineering', 'BS Data Science'],
    admissionTests: ['FAST NU Test', 'NTS NAT-ICS'],
    description: 'Iconic tech campus in Faisal Town, Lahore. Famous for producing top competitive coders, ACM ICPC finalists, and software entrepreneurs.',
    deadline: 'July 10, 2026',
    website: 'https://lhr.nu.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'uet-lhr',
    name: 'University of Engineering & Technology (UET) Lahore',
    shortName: 'UET Lahore',
    city: 'Lahore',
    province: 'Punjab',
    hecRanking: '#1 Historic Engineering Institution in Pakistan',
    fieldCategory: 'Electrical & Mechanical Engineering',
    matchScore: 93,
    acceptanceRate: '9.2%',
    tuitionPerSemester: 'Rs. 65,000 / semester',
    avgStartingSalaryPKR: 'Rs. 130,000 - 240,000 / mo',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science (KSK)', 'BE Electrical Engineering', 'BE Mechanical Engineering'],
    admissionTests: ['ECAT (Engineering College Admission Test)'],
    description: 'Established 1921. Legendary engineering heritage with expansive alumni networks across public works, telecom, and global engineering firms.',
    deadline: 'June 20, 2026',
    website: 'https://uet.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'itu-lhr',
    name: 'Information Technology University (ITU)',
    shortName: 'ITU Lahore',
    city: 'Lahore',
    province: 'Punjab',
    hecRanking: '#1 Innovation Hub for AI & FinTech in Lahore',
    fieldCategory: 'AI, Data Science & Robotics',
    matchScore: 94,
    acceptanceRate: '11.0%',
    tuitionPerSemester: 'Rs. 135,000 / semester',
    avgStartingSalaryPKR: 'Rs. 160,000 - 320,000 / mo',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Artificial Intelligence', 'BS Management & Technology'],
    admissionTests: ['ITU Admissions Test', 'SAT I'],
    description: 'Founded by Dr. Umar Saif inside Arfa Software Technology Park. Direct incubation ties with Plan9 and cutting-edge NLP/AI research labs.',
    deadline: 'July 15, 2026',
    website: 'https://itu.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'pucit-lhr',
    name: 'Punjab University College of IT (PUCIT / FCIT)',
    shortName: 'PUCIT Lahore',
    city: 'Lahore',
    province: 'Punjab',
    hecRanking: '#1 High-Merit Public IT College',
    fieldCategory: 'CS & Software Engineering',
    matchScore: 91,
    acceptanceRate: '6.0%',
    tuitionPerSemester: 'Rs. 38,000 / semester (Regular)',
    avgStartingSalaryPKR: 'Rs. 120,000 - 220,000 / mo',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Software Engineering', 'BS Information Technology'],
    admissionTests: ['PUCIT Entry Test', 'HSSC Marks Merit'],
    description: 'Located in Old Campus (Anarkali), Lahore. Known for intense merit requirements, affordable tuition, and strong foundational developer skills.',
    deadline: 'August 1, 2026',
    website: 'https://pucit.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },

  // --- KARACHI ---
  {
    id: 'iba-khi',
    name: 'Institute of Business Administration (IBA Karachi)',
    shortName: 'IBA Karachi',
    city: 'Karachi',
    province: 'Sindh',
    hecRanking: '#1 Business, FinTech & Computer Science in Sindh',
    fieldCategory: 'Business, FinTech & Management',
    matchScore: 97,
    acceptanceRate: '7.2%',
    tuitionPerSemester: 'Rs. 320,000 / semester',
    avgStartingSalaryPKR: 'Rs. 220,000 - 450,000 / mo',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Data Science', 'BS Economics & Mathematics', 'BBA FinTech'],
    admissionTests: ['IBA Entry Test', 'SAT Digital'],
    description: 'Premier financial and business tech leadership center in Pakistan. Strong ties to Karachi financial district, banking sector, and VC funds.',
    deadline: 'June 28, 2026',
    website: 'https://iba.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'fast-khi',
    name: 'FAST-NUCES Karachi',
    shortName: 'FAST Karachi',
    city: 'Karachi',
    province: 'Sindh',
    hecRanking: '#1 Tech Hiring Choice in Karachi',
    fieldCategory: 'CS & Software Engineering',
    matchScore: 95,
    acceptanceRate: '9.0%',
    tuitionPerSemester: 'Rs. 195,000 / semester',
    avgStartingSalaryPKR: 'Rs. 180,000 - 360,000 / mo',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Software Engineering', 'BS Cyber Security'],
    admissionTests: ['FAST NU Test', 'NTS NAT'],
    description: 'Located in Main Shahrah-e-Faisal / Malir. Producing top full-stack engineers and cloud architects recruited by global software firms.',
    deadline: 'July 10, 2026',
    website: 'https://khi.nu.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'ned-khi',
    name: 'NED University of Engineering & Technology',
    shortName: 'NED Karachi',
    city: 'Karachi',
    province: 'Sindh',
    hecRanking: '#1 Public Engineering University in Sindh',
    fieldCategory: 'Electrical & Mechanical Engineering',
    matchScore: 92,
    acceptanceRate: '10.2%',
    tuitionPerSemester: 'Rs. 55,000 / semester',
    avgStartingSalaryPKR: 'Rs. 120,000 - 220,000 / mo',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BE Computer Systems Engineering', 'BS Computer Science', 'BE Electrical Engineering'],
    admissionTests: ['NED Entry Test'],
    description: 'Oldest engineering establishment in Sindh (est. 1921). Massive industrial alumni support across K-Electric, Indus Motors, and IT houses.',
    deadline: 'July 5, 2026',
    website: 'https://neduet.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'aku-khi',
    name: 'Aga Khan University (AKU)',
    shortName: 'AKU Karachi',
    city: 'Karachi',
    province: 'Sindh',
    hecRanking: '#1 World Ranked Medical & Healthcare Sciences in Pakistan',
    fieldCategory: 'Medical & BioTech',
    matchScore: 98,
    acceptanceRate: '2.1%',
    tuitionPerSemester: 'Rs. 650,000 / semester (Financial Aid Available)',
    avgStartingSalaryPKR: 'Rs. 250,000 - 600,000 / mo',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['MBBS Medicine & Surgery', 'BS Nursing & Health Analytics', 'BioTech & Health Informatics'],
    admissionTests: ['AKU Admission Test & Panel Interviews'],
    description: 'Internationally accredited JCI medical teaching hospital with cutting-edge biomedical technology and global USMLE residency pathways.',
    deadline: 'May 30, 2026',
    website: 'https://aku.edu',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },

  // --- KPK & PESHAWAR / SWABI ---
  {
    id: 'giki-swabi',
    name: 'Ghulam Ishaq Khan Institute (GIKI)',
    shortName: 'GIKI Swabi',
    city: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    hecRanking: '#1 Residential Private Engineering & CS Campus',
    fieldCategory: 'CS & Software Engineering',
    matchScore: 97,
    acceptanceRate: '6.0%',
    tuitionPerSemester: 'Rs. 390,000 / semester',
    avgStartingSalaryPKR: 'Rs. 200,000 - 420,000 / mo',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Artificial Intelligence', 'BS Mechanical & Robotics Engineering'],
    admissionTests: ['GIKI Admission Entry Test'],
    description: 'High-altitude 400-acre residential campus in Topi, KPK. Renowned for intense project culture, robotics societies, and tech leadership.',
    deadline: 'July 8, 2026',
    website: 'https://giki.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'uet-psh',
    name: 'University of Engineering & Technology (UET) Peshawar',
    shortName: 'UET Peshawar',
    city: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    hecRanking: '#1 Public Engineering University in KPK',
    fieldCategory: 'Electrical & Mechanical Engineering',
    matchScore: 90,
    acceptanceRate: '12.0%',
    tuitionPerSemester: 'Rs. 60,000 / semester',
    avgStartingSalaryPKR: 'Rs. 110,000 - 200,000 / mo',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Systems Engineering', 'BE Electrical Engineering', 'BS Mechatronics Engineering'],
    admissionTests: ['ETEA Engineering Entry Test'],
    description: 'Premier state engineering institute of KPK serving students with technical excellence, earthquake engineering centers, and IT labs.',
    deadline: 'July 20, 2026',
    website: 'https://uetpeshawar.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },

  // --- FAISALABAD ---
  {
    id: 'fast-cfd',
    name: 'FAST-NUCES Chiniot-Faisalabad',
    shortName: 'FAST Faisalabad',
    city: 'Faisalabad',
    province: 'Punjab',
    hecRanking: 'Top Computer Science Institute in Central Punjab',
    fieldCategory: 'CS & Software Engineering',
    matchScore: 93,
    acceptanceRate: '11.5%',
    tuitionPerSemester: 'Rs. 180,000 / semester',
    avgStartingSalaryPKR: 'Rs. 150,000 - 280,000 / mo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Software Engineering', 'BS Business Analytics'],
    admissionTests: ['FAST NU Test', 'NTS NAT-IE'],
    description: 'Modern sprawling campus along Faisalabad-Chiniot highway. Delivering rigorous computer science curriculum and regional IT exports.',
    deadline: 'July 10, 2026',
    website: 'https://cfd.nu.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },
  {
    id: 'uaf-fsd',
    name: 'University of Agriculture Faisalabad (UAF)',
    shortName: 'UAF Faisalabad',
    city: 'Faisalabad',
    province: 'Punjab',
    hecRanking: '#1 Agriculture, BioTech & AgTech in Pakistan',
    fieldCategory: 'Medical & BioTech',
    matchScore: 89,
    acceptanceRate: '15.0%',
    tuitionPerSemester: 'Rs. 42,000 / semester',
    avgStartingSalaryPKR: 'Rs. 100,000 - 180,000 / mo',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Biotechnology', 'BS Computer Science & Precision Ag', 'Doctor of Veterinary Medicine'],
    admissionTests: ['UAF Entrance Test'],
    description: 'Global pioneer in agricultural biotechnology, genomics, and IoT smart farming solutions in South Asia.',
    deadline: 'August 12, 2026',
    website: 'https://uaf.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },

  // --- QUETTA / BALOCHISTAN ---
  {
    id: 'buitems-qta',
    name: 'Balochistan University of IT & Management Sciences (BUITEMS)',
    shortName: 'BUITEMS Quetta',
    city: 'Quetta',
    province: 'Balochistan',
    hecRanking: '#1 IT & Engineering Campus in Balochistan',
    fieldCategory: 'CS & Software Engineering',
    matchScore: 91,
    acceptanceRate: '14.0%',
    tuitionPerSemester: 'Rs. 75,000 / semester',
    avgStartingSalaryPKR: 'Rs. 110,000 - 210,000 / mo',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Software Engineering', 'BS Telecom Engineering'],
    admissionTests: ['BUITEMS Admission Test', 'NTS NAT'],
    description: 'The beacon of technical education in Balochistan with state-of-the-art CPEC research centers and software incubation labs.',
    deadline: 'July 28, 2026',
    website: 'https://buitms.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },

  // --- MULTAN / SOUTH PUNJAB ---
  {
    id: 'bzu-multan',
    name: 'Bahauddin Zakariya University (BZU Multan)',
    shortName: 'BZU Multan',
    city: 'Multan',
    province: 'Punjab',
    hecRanking: '#1 University in South Punjab',
    fieldCategory: 'CS & Software Engineering',
    matchScore: 88,
    acceptanceRate: '13.2%',
    tuitionPerSemester: 'Rs. 45,000 / semester',
    avgStartingSalaryPKR: 'Rs. 100,000 - 190,000 / mo',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Computer Science', 'BS Information Technology', 'BS Telecommunication'],
    admissionTests: ['BZU Entry Test', 'HSSC Marks Merit'],
    description: 'Major public educational pillar of South Punjab, producing thousands of software developers, civil servants, and tech professionals.',
    deadline: 'August 8, 2026',
    website: 'https://bzu.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },

  // --- HYDERABAD / JAMSHORO ---
  {
    id: 'muet-jamshoro',
    name: 'Mehran University of Engineering & Technology (MUET)',
    shortName: 'MUET Jamshoro',
    city: 'Hyderabad / Jamshoro',
    province: 'Sindh',
    hecRanking: '#2 Engineering University in Sindh',
    fieldCategory: 'Electrical & Mechanical Engineering',
    matchScore: 90,
    acceptanceRate: '11.0%',
    tuitionPerSemester: 'Rs. 48,000 / semester',
    avgStartingSalaryPKR: 'Rs. 110,000 - 200,000 / mo',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Software Engineering', 'BE Electrical Engineering', 'BE Mechatronics'],
    admissionTests: ['MUET Pre-Admission Test'],
    description: 'Historic engineering university in Jamshoro/Hyderabad with ISO certification and strong research collaboration with European universities.',
    deadline: 'July 18, 2026',
    website: 'https://muet.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  },

  // --- SIALKOT ---
  {
    id: 'uskt-sialkot',
    name: 'University of Sialkot (USKT)',
    shortName: 'USKT Sialkot',
    city: 'Sialkot',
    province: 'Punjab',
    hecRanking: 'Premier Industrial & IT Hub Campus in Sialkot',
    fieldCategory: 'CS & Software Engineering',
    matchScore: 87,
    acceptanceRate: '16.0%',
    tuitionPerSemester: 'Rs. 110,000 / semester',
    avgStartingSalaryPKR: 'Rs. 100,000 - 180,000 / mo',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    topPrograms: ['BS Software Engineering', 'BS Computer Science', 'BS Artificial Intelligence'],
    admissionTests: ['USKT Entry Test'],
    description: 'Partnering directly with Sialkot Chamber of Commerce to empower export software development, IoT manufacturing, and tech startups.',
    deadline: 'August 15, 2026',
    website: 'https://uskt.edu.pk',
    hostelAvailable: true,
    scholarshipsAvailable: true,
  }
];

export const UniversityList: React.FC<UniversityListProps> = ({
  user,
  onNavigate,
  isDarkMode,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedField, setSelectedField] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarked, setBookmarked] = useState<string[]>(['nust-isb', 'fast-lhr', 'lums-lhr']);
  const [activeModalUni, setActiveModalUni] = useState<PakistanUniversity | null>(null);
  const [savedApplications, setSavedApplications] = useState<string[]>([]);

  const citiesList = [
    'All',
    'Islamabad',
    'Lahore',
    'Karachi',
    'Peshawar',
    'Rawalpindi',
    'Faisalabad',
    'Quetta',
    'Multan',
    'Hyderabad / Jamshoro',
    'Sialkot'
  ];

  const fieldsList = [
    'All',
    'CS & Software Engineering',
    'AI, Data Science & Robotics',
    'Electrical & Mechanical Engineering',
    'Medical & BioTech',
    'Business, FinTech & Management'
  ];

  // Calculate dynamic recommendation fit score for each university based on user profile
  const filteredUnis = PAKISTAN_UNIVERSITIES_DATA.filter((uni) => {
    const matchesCity = selectedCity === 'All' || uni.city === selectedCity;
    const matchesField = selectedField === 'All' || uni.fieldCategory === selectedField;
    const matchesSearch =
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.topPrograms.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      uni.admissionTests.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCity && matchesField && matchesSearch;
  });

  const toggleBookmark = (id: string) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter((b) => b !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const handleApply = (id: string) => {
    if (!savedApplications.includes(id)) {
      setSavedApplications([...savedApplications, id]);
    }
  };

  return (
    <div className={`p-4 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
      {/* Top Pakistan Flag & AI Matching Header Banner */}
      <div className="rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
              <span className="text-sm">🇵🇰</span>
              <span>PAKISTAN OFFICIAL HIGHER EDUCATION NAVIGATOR</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Best Universities Across All Pakistani Cities
            </h1>
            <p className="text-sm text-white/70 max-w-2xl leading-relaxed">
              Curated admissions directory for top universities in Islamabad, Lahore, Karachi, Peshawar, Quetta, Faisalabad & more. Filtered by your interests & merit requirements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('interests')}
              className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">target</span>
              <span>Refine My Interests</span>
            </button>
            <button
              onClick={() => onNavigate('academic')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">calculate</span>
              <span>Calculate My Merit Score</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-5 rounded-3xl border border-white/10 mb-8 space-y-4">
        {/* Search & Statistics */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
              search
            </span>
            <input
              type="text"
              placeholder="Search NUST, FAST, LUMS, ECAT, NET..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 text-sm focus:outline-hidden focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="text-xs font-mono text-emerald-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">verified</span>
            <span>Showing {filteredUnis.length} Top Pakistan Institutes</span>
          </div>
        </div>

        {/* City Pills Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold block">
            Filter by City / Region:
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {citiesList.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCity === c
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {c === 'All' ? '🌆 All Cities' : `📍 ${c}`}
              </button>
            ))}
          </div>
        </div>

        {/* Field Category Pills Filter */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block">
            Filter by Academic Field / Interest:
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {fieldsList.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedField(f)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedField === f
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* University Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnis.map((uni) => {
          const isBookmarked = bookmarked.includes(uni.id);
          const isApplied = savedApplications.includes(uni.id);

          return (
            <div
              key={uni.id}
              className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all group shadow-xl"
            >
              <div>
                {/* Banner Image */}
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Match Score Badge */}
                  <div className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-md text-slate-950 px-3 py-1 rounded-full font-mono font-bold text-xs shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm font-bold">stars</span>
                    <span>{uni.matchScore}% Match Fit</span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(uni.id)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white hover:text-emerald-400 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {isBookmarked ? 'bookmark_added' : 'bookmark_add'}
                    </span>
                  </button>

                  {/* City & Province Badge */}
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-emerald-300 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span>{uni.city}, {uni.province}</span>
                    </span>
                    <span className="text-[10px] bg-black/50 px-2 py-0.5 rounded-md border border-white/15">
                      {uni.shortName}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-extrabold text-base text-white leading-snug group-hover:text-emerald-300 transition-colors">
                      {uni.name}
                    </h3>
                    <p className="text-[11px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">military_tech</span>
                      <span>{uni.hecRanking}</span>
                    </p>
                  </div>

                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                    {uni.description}
                  </p>

                  {/* Key Stats Bar */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-center font-mono text-[11px]">
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase">Tuition Fee</span>
                      <span className="font-bold text-emerald-300 truncate block">{uni.tuitionPerSemester}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase">Est. Starting Salary</span>
                      <span className="font-bold text-amber-300 truncate block">{uni.avgStartingSalaryPKR}</span>
                    </div>
                  </div>

                  {/* Admission Entry Tests Required */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider block font-bold">
                      Required Admission Test:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {uni.admissionTests.map((test, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 text-[10px] font-mono font-medium"
                        >
                          {test}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Offered Programs */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
                      Top Programs Offered:
                    </span>
                    <ul className="space-y-1">
                      {uni.topPrograms.slice(0, 2).map((prog, idx) => (
                        <li key={idx} className="text-xs text-white/80 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="truncate">{prog}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => setActiveModalUni(uni)}
                  className="flex-1 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition-all"
                >
                  Full Prospectus
                </button>

                <button
                  onClick={() => handleApply(uni.id)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 shadow-md ${
                    isApplied
                      ? "bg-emerald-600 text-white shadow-emerald-600/30"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
                  }`}
                >
                  <span>{isApplied ? "Saved Target" : "Save Target"}</span>
                  <span className="material-symbols-outlined text-sm">
                    {isApplied ? 'check_circle' : 'bookmark'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* University Modal Details */}
      {activeModalUni && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-xl w-full rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1">
                <span>🇵🇰</span>
                <span>{activeModalUni.matchScore}% Interest Match Fit</span>
              </span>
              <button
                onClick={() => setActiveModalUni(null)}
                className="p-1 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
              {activeModalUni.name} ({activeModalUni.shortName})
            </h2>
            <p className="text-xs text-emerald-300 flex items-center gap-1 mb-4 font-mono">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span>{activeModalUni.city}, {activeModalUni.province}</span> • <span>{activeModalUni.hecRanking}</span>
            </p>

            <p className="text-sm text-white/80 leading-relaxed mb-6">
              {activeModalUni.description}
            </p>

            {/* Spec Table */}
            <div className="space-y-3 font-mono text-xs mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-white/50">Tuition Fee:</span>
                <span className="font-bold text-emerald-300">{activeModalUni.tuitionPerSemester}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-white/50">Acceptance Rate:</span>
                <span className="font-bold text-emerald-400">{activeModalUni.acceptanceRate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-white/50">Est. Graduate Starting Salary:</span>
                <span className="font-bold text-amber-300">{activeModalUni.avgStartingSalaryPKR}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-white/50">Required Admission Test:</span>
                <span className="font-bold text-indigo-300">{activeModalUni.admissionTests.join(', ')}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/50">Next Application Deadline:</span>
                <span className="font-bold text-rose-300">{activeModalUni.deadline}</span>
              </div>
            </div>

            {/* Amenities & Scholarships */}
            <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">domain</span>
                <span>On-Campus Hostel: {activeModalUni.hostelAvailable ? 'Available' : 'Limited'}</span>
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">savings</span>
                <span>Financial Aid / Scholarships: Available</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                Offered Degree Programs:
              </span>
              {activeModalUni.topPrograms.map((prog, idx) => (
                <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs font-semibold">
                  <span>{prog}</span>
                  <span className="text-emerald-300 font-mono text-[10px]">BS / BE 4-Year Degree</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  handleApply(activeModalUni.id);
                  setActiveModalUni(null);
                }}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-600/30"
              >
                Save to My Target List
              </button>
              <button
                onClick={() => setActiveModalUni(null)}
                className="px-5 py-3 glass-card border border-white/15 rounded-xl text-sm font-medium hover:bg-white/10 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
