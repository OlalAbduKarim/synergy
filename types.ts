
export type Role = 'JOB_SEEKER' | 'EMPLOYER';

export type JobSeekerView = 'dashboard' | 'profile' | 'matches' | 'saved';
export type EmployerView = 'dashboard' | 'postJob' | 'candidates' | 'analytics';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface MarketabilityInfo {
  score: number;
  topSkills: string[];
  suggestedSkills: string[];
}

export interface Availability {
  timezone: string;
  schedule: Record<string, {
    isAvailable: boolean;
    startTime: string;
    endTime: string;
  }>;
}

// Data extracted from the resume by the AI
export interface ExtractedProfileData {
  professionalSkills: string[];
  informalSkills: string[];
  workSummary: string;
  marketability: MarketabilityInfo;
}

// The complete user profile, including manually entered data
export interface UserProfile extends ExtractedProfileData {
  availability: Availability;
  name: string;
  email: string;
}

export interface JobAnalytics {
  views: number;
  applications: number;
  avgMatchScore: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  analytics: JobAnalytics;
}

export interface JobMatch extends Job {
  matchScore: number;
  explanation: string;
}

export interface CandidateMatch {
    profile: UserProfile;
    matchScore: number;
    explanation: string;
}
