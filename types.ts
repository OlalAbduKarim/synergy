// Fix: Replaced utility functions with the application's core type definitions.
// This resolves all "Module has no exported member" errors across the project.

// Enums
export enum UserRole {
  CANDIDATE = 'CANDIDATE',
  EMPLOYER = 'EMPLOYER',
}

export enum ApplicationStatus {
  SUBMITTED = 'Submitted',
  REVIEWING = 'Reviewing',
  INTERVIEWING = 'Interviewing',
  OFFERED = 'Offered',
  REJECTED = 'Rejected',
  WITHDRAWN = 'Withdrawn',
}

export enum WorkType {
  REMOTE = 'Remote',
  ON_SITE = 'On-site',
  HYBRID = 'Hybrid',
}

export enum EmploymentType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
}

export enum SkillCategory {
  LANGUAGE = 'Language',
  FRAMEWORK = 'Framework',
  TOOL = 'Tool',
  DATABASE = 'Database',
  PLATFORM = 'Platform',
  OTHER = 'Other',
}

export enum Availability {
  IMMEDIATELY = 'Immediately',
  TWO_WEEKS = '2 Weeks Notice',
  ONE_MONTH = '1 Month Notice',
  NEGOTIABLE = 'Negotiable',
}

export enum NotificationType {
    NEW_MATCH = 'new_match',
    NEW_MESSAGE = 'new_message',
    APPLICATION_UPDATE = 'application_update',
}

// Base Interfaces
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  location?: string;
  companyName?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
}

export interface Experience {
  id: string;
  jobTitle: string;
  companyName: string;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string | null;
  endDate: string | null;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

// Profile Interfaces
interface BaseProfile {
  id: string;
  email: string;
  fullName: string;
  location: string;
  userType: UserRole;
}

export interface CandidateProfile extends BaseProfile {
  about?: string;
  workPreference?: WorkType;
  availability?: Availability;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  socialLinks?: SocialLinks;
}

export interface EmployerProfile extends BaseProfile {
  companyName: string;
  companyWebsite?: string;
  companySize?: string;
  foundedYear?: number;
  companyCulture?: string;
  benefits?: string[];
}

export type UserProfile = CandidateProfile | EmployerProfile;


export interface MatchDetails {
    strengths: string[];
    weaknesses: string[];
    skillMatchScore: number;
    experienceMatchScore: number;
}

export interface Interview {
    id: string;
    scheduledAt: string; // ISO 8601
    location: string; // or URL for remote
    notes?: string;
}


// Job & Application Interfaces
export interface Job {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
  };
  location: string;
  workType: WorkType;
  employmentType: EmploymentType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: Skill[];
  synergyScore?: number;
}

export interface Application {
  id: string;
  job: {
    id: string;
    title: string;
    company: {
      name: string;
    };
    location: string;
  };
  candidate?: CandidateProfile;
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdated: string;
  synergyScore?: number;
  matchDetails?: MatchDetails;
  interviews?: Interview[];
}

// Messaging Interfaces
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  applicationId?: string;
}

export interface Conversation {
  user: {
    id: string;
    fullName: string;
    role: UserRole;
    companyName?: string;
  };
  lastMessage: Message;
  unreadCount: number;
}

// Notification Interface
export interface Notification {
    id: string;
    type: NotificationType;
    isRead: boolean;
    createdAt: string;
    payload: {
        jobTitle?: string;
        fromUser?: string;
        status?: ApplicationStatus;
        relatedId?: string; // e.g., jobId or userId for navigation
    };
}