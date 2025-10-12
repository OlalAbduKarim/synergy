import api from './api';
import {
  UserProfile,
  CandidateProfile,
  EmployerProfile,
  Experience,
  Education,
  Skill,
  UserRole,
} from '../types';

// Mappers from API (snake_case) to Frontend (camelCase)

const mapSkillFromApi = (apiSkill: any): Skill => ({
  id: apiSkill.id,
  name: apiSkill.name,
  category: apiSkill.category,
  proficiency: apiSkill.proficiency,
});

const mapExperienceFromApi = (apiExp: any): Experience => ({
  id: apiExp.id,
  jobTitle: apiExp.job_title,
  companyName: apiExp.company_name,
  startDate: apiExp.start_date,
  endDate: apiExp.end_date,
  description: apiExp.description,
});

const mapEducationFromApi = (apiEdu: any): Education => ({
  id: apiEdu.id,
  institution: apiEdu.institution,
  degree: apiEdu.degree,
  fieldOfStudy: apiEdu.field_of_study,
  startDate: apiEdu.start_date,
  endDate: apiEdu.end_date,
});

const mapProfileFromApi = (apiProfile: any): UserProfile => {
  const baseProfile = {
    fullName: apiProfile.full_name,
    location: apiProfile.location,
    userType: apiProfile.user_type,
  };

  if (apiProfile.user_type === UserRole.CANDIDATE) {
    return {
      ...baseProfile,
      ...apiProfile.candidate_profile,
      skills: (apiProfile.candidate_profile.skills || []).map(mapSkillFromApi),
      experience: (apiProfile.candidate_profile.experience || []).map(mapExperienceFromApi),
      education: (apiProfile.candidate_profile.education || []).map(mapEducationFromApi),
      socialLinks: apiProfile.candidate_profile.social_links || {},
    } as CandidateProfile;
  } else {
    return {
      ...baseProfile,
      ...apiProfile.employer_profile,
      companyName: apiProfile.company_name,
    } as EmployerProfile;
  }
};

// Mappers to API (camelCase to snake_case)
const mapBasicInfoToApi = (profile: any) => ({
    full_name: profile.fullName,
    location: profile.location,
});

const mapCandidateProfileToApi = (profile: any) => ({
    about: profile.about,
    work_preference: profile.workPreference,
    availability: profile.availability,
    social_links: profile.socialLinks,
});

const mapEmployerProfileToApi = (profile: any) => ({
    company_name: profile.companyName,
    company_website: profile.companyWebsite,
    company_size: profile.companySize,
    founded_year: profile.foundedYear,
    company_culture: profile.companyCulture,
});


// API Functions

export const getMyProfile = async (): Promise<UserProfile> => {
  const { data } = await api.get('/profiles/me');
  return mapProfileFromApi(data);
};

export const updateBasicProfile = async (profileData: any): Promise<UserProfile> => {
  const { data } = await api.put('/profiles/me', mapBasicInfoToApi(profileData));
  return mapProfileFromApi(data);
};

export const updateCandidateProfile = async (profileData: Partial<CandidateProfile>): Promise<CandidateProfile> => {
  const { data } = await api.put('/profiles/candidate', mapCandidateProfileToApi(profileData));
  return mapProfileFromApi({ ...data, user_type: UserRole.CANDIDATE }) as CandidateProfile;
};

export const updateEmployerProfile = async (profileData: Partial<EmployerProfile>): Promise<EmployerProfile> => {
    const { data } = await api.put('/profiles/employer', mapEmployerProfileToApi(profileData));
    return mapProfileFromApi({ ...data, user_type: UserRole.EMPLOYER }) as EmployerProfile;
};

// --- Skill Management ---
export const addSkill = async (skill: Omit<Skill, 'id'>): Promise<Skill> => {
    const { data } = await api.post('/profiles/skills', skill);
    return mapSkillFromApi(data);
};

export const deleteSkill = async (skillId: string): Promise<void> => {
    await api.delete(`/profiles/skills/${skillId}`);
};

// --- Experience Management ---
export const addExperience = async (exp: Omit<Experience, 'id'>): Promise<Experience> => {
    const apiExp = { job_title: exp.jobTitle, company_name: exp.companyName, start_date: exp.startDate, end_date: exp.endDate, description: exp.description };
    const { data } = await api.post('/profiles/experience', apiExp);
    return mapExperienceFromApi(data);
};

export const updateExperience = async (exp: Experience): Promise<Experience> => {
    const apiExp = { job_title: exp.jobTitle, company_name: exp.companyName, start_date: exp.startDate, end_date: exp.endDate, description: exp.description };
    const { data } = await api.put(`/profiles/experience/${exp.id}`, apiExp);
    return mapExperienceFromApi(data);
};

export const deleteExperience = async (expId: string): Promise<void> => {
    await api.delete(`/profiles/experience/${expId}`);
};

// --- Education Management ---
export const addEducation = async (edu: Omit<Education, 'id'>): Promise<Education> => {
    const apiEdu = { institution: edu.institution, degree: edu.degree, field_of_study: edu.fieldOfStudy, start_date: edu.startDate, end_date: edu.endDate };
    const { data } = await api.post('/profiles/education', apiEdu);
    return mapEducationFromApi(data);
};

export const updateEducation = async (edu: Education): Promise<Education> => {
    const apiEdu = { institution: edu.institution, degree: edu.degree, field_of_study: edu.fieldOfStudy, start_date: edu.startDate, end_date: edu.endDate };
    const { data } = await api.put(`/profiles/education/${edu.id}`, apiEdu);
    return mapEducationFromApi(data);
};

export const deleteEducation = async (eduId: string): Promise<void> => {
    await api.delete(`/profiles/education/${eduId}`);
};
