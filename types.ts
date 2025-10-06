
export enum UserRole {
  CANDIDATE = 'CANDIDATE',
  EMPLOYER = 'EMPLOYER'
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  location?: string;
  companyName?: string;
}

export enum EmploymentType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship'
}

export enum WorkType {
  ONSITE = 'On-site',
  HYBRID = 'Hybrid',
  REMOTE = 'Remote'
}

export interface Skill {
  id: string;
  name: string;
  proficiency?: number; // 1-5
}

export interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  location: string;
  workType: WorkType;
  employmentType: EmploymentType;
  salaryMin?: number;
  salaryMax?: number;
  skills: Skill[];
  company: {
    id: string;
    name: string;
    logoUrl?: string;
  };
  synergyScore?: number;
}

export enum ApplicationStatus {
    SUBMITTED = 'Submitted',
    REVIEWING = 'In Review',
    INTERVIEWING = 'Interviewing',
    OFFERED = 'Offered',
    REJECTED = 'Rejected',
    WITHDRAWN = 'Withdrawn'
}

export interface Application {
    id: string;
    job: Job;
    candidate: User;
    status: ApplicationStatus;
    appliedDate: string;
    synergyScore: number;
}
