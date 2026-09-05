export interface PakistaniUniversityComparison {
  goal: string;
  stream: string;
  govt: {
    name: string;
    shortName: string;
    city: string;
    meritPercentage: string;
    feePerSemester: string;
    entryTest: string;
    ranking: string;
    hostelAvailable: boolean;
    keyHighlights: string[];
    admissionsUrl: string;
  };
  private: {
    name: string;
    shortName: string;
    city: string;
    meritPercentage: string;
    feePerSemester: string;
    entryTest: string;
    ranking: string;
    hostelAvailable: boolean;
    scholarships: string;
    keyHighlights: string[];
    admissionsUrl: string;
  };
}

export const DUAL_UNIVERSITY_SUGGESTIONS: Record<string, PakistaniUniversityComparison> = {
  Doctor: {
    goal: 'Doctor (MBBS / BDS)',
    stream: 'Pre-Medical',
    govt: {
      name: 'King Edward Medical University (KEMU)',
      shortName: 'KEMU',
      city: 'Lahore, Punjab',
      meritPercentage: '93.65% (UHS Aggregate)',
      feePerSemester: 'PKR 45,000 / year (Highly Subsidized)',
      entryTest: 'MDCAT (Passing 55% min, 50% weightage)',
      ranking: '#1 Govt Medical College in Punjab',
      hostelAvailable: true,
      keyHighlights: ['Mayo Hospital affiliation (3000+ beds)', 'Historic 1860 establishment', 'PM&DC & WHO Recognized'],
      admissionsUrl: 'https://kemu.edu.pk'
    },
    private: {
      name: 'Aga Khan University Medical College (AKU)',
      shortName: 'AKU',
      city: 'Karachi, Sindh',
      meritPercentage: '85.0% + AKU Test & Panel Interview',
      feePerSemester: 'PKR 1,250,000 / semester (Financial Aid Available)',
      entryTest: 'AKU Internal Test + MDCAT',
      ranking: '#1 Private Medical University in South Asia',
      hostelAvailable: true,
      scholarships: 'Up to 100% Need-Based Financial Assistance',
      keyHighlights: ['JCI Accredited Hospital', 'Direct USMLE / PLAB Residency track', 'World-class Research Faculty'],
      admissionsUrl: 'https://www.aku.edu'
    }
  },
  'Software Engineer': {
    goal: 'Software Engineer / BS CS',
    stream: 'ICS / Pre-Engineering',
    govt: {
      name: 'National University of Sciences & Technology (NUST - SEECS)',
      shortName: 'NUST',
      city: 'Islamabad, Federal',
      meritPercentage: '78.50% (NUST NET Aggregate)',
      feePerSemester: 'PKR 185,000 / semester',
      entryTest: 'NET (NUST Entry Test Series 1-4)',
      ranking: '#1 Engineering & Tech University (QS #353)',
      hostelAvailable: true,
      keyHighlights: ['Silicon Valley & FAANG Alumni network', 'State of the art incubation labs', 'HEC Highest Category W'],
      admissionsUrl: 'https://nust.edu.pk'
    },
    private: {
      name: 'FAST-NUCES (National University of Computer & Emerging Sciences)',
      shortName: 'FAST-NUCES',
      city: 'Lahore / Islamabad / Karachi',
      meritPercentage: '73.0% (NU Test / SAT score)',
      feePerSemester: 'PKR 210,000 / semester',
      entryTest: 'FAST NU Test / NTS-NAT',
      ranking: 'Most Preferred for Software Industry Hiring in Pakistan',
      hostelAvailable: true,
      scholarships: 'Kinship & Merit Scholarships (Top 3 positions)',
      keyHighlights: ['98% Employment rate within 3 months', 'Rigorous algorithmic curriculum', 'Top ICPC Programming ranks'],
      admissionsUrl: 'https://nu.edu.pk'
    }
  },
  'Data Scientist / AI Engineer': {
    goal: 'Data Scientist / AI Specialist',
    stream: 'ICS / Pre-Engineering',
    govt: {
      name: 'COMSATS University Islamabad (CUI)',
      shortName: 'COMSATS',
      city: 'Islamabad / Lahore',
      meritPercentage: '82.40% (NTS NAT Aggregate)',
      feePerSemester: 'PKR 125,000 / semester',
      entryTest: 'NTS NAT-ICS / NAT-IE',
      ranking: '#3 In Computer Science & AI Research output',
      hostelAvailable: true,
      keyHighlights: ['Center for Advanced Studies in Telecommunications', 'Affordable HEC-subsidized fee', 'Multiple campus options'],
      admissionsUrl: 'https://comsats.edu.pk'
    },
    private: {
      name: 'Ghulam Ishaq Khan Institute (GIKI)',
      shortName: 'GIKI',
      city: 'Topi, KPK',
      meritPercentage: '74.0% (GIKI Admission Test)',
      feePerSemester: 'PKR 460,000 / semester',
      entryTest: 'GIKI Test (Physics + Mathematics)',
      ranking: 'Top Tier Residential STEM University',
      hostelAvailable: true,
      scholarships: 'Top 15 Merit Full Tuition Waiver + Ihsan Trust Loans',
      keyHighlights: ['100% Residential campus in scenic Topi', 'High-end Robotics & AI research labs', 'Strong Global Alumni base'],
      admissionsUrl: 'https://giki.edu.pk'
    }
  },
  'Mechanical / Electrical Engineer': {
    goal: 'Mechanical / Electrical Engineer',
    stream: 'Pre-Engineering',
    govt: {
      name: 'University of Engineering & Technology (UET Lahore)',
      shortName: 'UET Lahore',
      city: 'Lahore, Punjab',
      meritPercentage: '81.20% (ECAT Aggregate: 33% ECAT + 50% Inter + 17% Matric)',
      feePerSemester: 'PKR 65,000 / semester (Subsidized)',
      entryTest: 'ECAT (UET Combined Entry Test)',
      ranking: 'Oldest & Premier Engineering Institute of Pakistan (1921)',
      hostelAvailable: true,
      keyHighlights: ['Pakistan Engineering Council (PEC) Washington Accord Tier-1', 'Mega industrial linkages across Punjab', 'Extensive heavy machinery workshops'],
      admissionsUrl: 'https://uet.edu.pk'
    },
    private: {
      name: 'GIKI (Ghulam Ishaq Khan Institute of Engineering Sciences & Technology)',
      shortName: 'GIKI',
      city: 'Topi, KPK',
      meritPercentage: '72.50%',
      feePerSemester: 'PKR 475,000 / semester',
      entryTest: 'GIKI Entry Test',
      ranking: '#1 Private Engineering Institution',
      hostelAvailable: true,
      scholarships: 'Need & Merit Scholarships Available',
      keyHighlights: ['Formula Student racing team', 'Advanced aerodynamics and CNC fabrication labs', 'Direct recruitment by multinationals'],
      admissionsUrl: 'https://giki.edu.pk'
    }
  },
  'Chartered Accountant / Business': {
    goal: 'Chartered Accountant (CA/ACCA) / BBA',
    stream: 'ICOM / General Science / FA',
    govt: {
      name: 'Institute of Business Administration (IBA Karachi)',
      shortName: 'IBA Karachi',
      city: 'Karachi, Sindh',
      meritPercentage: '80.0% + IBA Aptitude Test & Interview',
      feePerSemester: 'PKR 290,000 / semester',
      entryTest: 'IBA Entry Test / SAT (1270+)',
      ranking: '#1 Business School in Pakistan',
      hostelAvailable: true,
      keyHighlights: ['AACSB Accredited business curriculum', 'National Talent Hunt Program (100% free for underprivileged)', 'Highest starting salaries in FMCG & Banking'],
      admissionsUrl: 'https://iba.edu.pk'
    },
    private: {
      name: 'Lahore University of Management Sciences (LUMS)',
      shortName: 'LUMS - SDSB',
      city: 'Lahore, Punjab',
      meritPercentage: '85.0% Inter / A-Levels + SAT / LCAT',
      feePerSemester: 'PKR 680,000 / semester',
      entryTest: 'LCAT / SAT-1 (1350+ recommended)',
      ranking: '#1 Overall Private University in Pakistan (QS #540)',
      hostelAvailable: true,
      scholarships: 'NOP (National Outreach Programme) 100% full funding',
      keyHighlights: ['Case study method modeled on Harvard Business School', 'Top tier investment banking placements in Dubai & London', 'Vibrant campus ecosystem'],
      admissionsUrl: 'https://lums.edu.pk'
    }
  },
  'Law / Civil Services (CSS)': {
    goal: 'Law (LLB) / Civil Services (CSS)',
    stream: 'FA / Humanities / Any',
    govt: {
      name: 'Punjab University Law College (PULC)',
      shortName: 'PU Law',
      city: 'Lahore, Punjab',
      meritPercentage: '83.50% (LAT + Inter Marks)',
      feePerSemester: 'PKR 35,000 / semester',
      entryTest: 'HEC Law Admission Test (LAT - 50% min)',
      ranking: 'Most prestigious public law college in Pakistan',
      hostelAvailable: true,
      keyHighlights: ['Produced Chief Justices of Pakistan and renowned jurists', 'Affordable fee with hostel facilities in New Campus', 'HEC Bar Council recognized 5-year LLB'],
      admissionsUrl: 'https://pu.edu.pk'
    },
    private: {
      name: 'LUMS Shaikh Ahmad Hassan School of Law (SAHSOL)',
      shortName: 'LUMS Law',
      city: 'Lahore, Punjab',
      meritPercentage: '80.0% + LCAT / SAT + LAT',
      feePerSemester: 'PKR 650,000 / semester',
      entryTest: 'LAT + LCAT / SAT',
      ranking: 'Top rated commercial & constitutional law academy',
      hostelAvailable: true,
      scholarships: 'Merit and Need-based scholarships up to 100%',
      keyHighlights: ['International Moot Court championships winners', 'Corporate law firm direct recruitment', 'Global Law faculty'],
      admissionsUrl: 'https://lums.edu.pk'
    }
  }
};

export function getUniversitySuggestion(goal: string, stream?: string): PakistaniUniversityComparison {
  const normalizedGoal = goal || 'Software Engineer';
  
  // Find best match by keyword
  for (const [key, value] of Object.entries(DUAL_UNIVERSITY_SUGGESTIONS)) {
    if (
      normalizedGoal.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(normalizedGoal.toLowerCase())
    ) {
      return value;
    }
  }
  
  if (stream?.toLowerCase().includes('med')) {
    return DUAL_UNIVERSITY_SUGGESTIONS.Doctor;
  }
  if (stream?.toLowerCase().includes('com')) {
    return DUAL_UNIVERSITY_SUGGESTIONS['Chartered Accountant / Business'];
  }
  if (stream?.toLowerCase().includes('eng')) {
    return DUAL_UNIVERSITY_SUGGESTIONS['Mechanical / Electrical Engineer'];
  }
  if (stream?.toLowerCase().includes('fa') || stream?.toLowerCase().includes('arts')) {
    return DUAL_UNIVERSITY_SUGGESTIONS['Law / Civil Services (CSS)'];
  }

  return DUAL_UNIVERSITY_SUGGESTIONS['Software Engineer'];
}
