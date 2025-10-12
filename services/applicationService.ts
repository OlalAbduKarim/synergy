import api from './api';
import { Application, ApplicationStatus, Interview } from '../types';

const mapApplicationFromApi = (apiApp: any): Application => ({
    id: apiApp.id,
    job: {
        id: apiApp.job.id,
        title: apiApp.job.title,
        company: { name: apiApp.job.company.name },
        location: apiApp.job.location,
    },
    candidate: apiApp.candidate, // Assume candidate profile is already mapped or in correct format
    status: apiApp.status,
    appliedDate: apiApp.applied_date,
    lastUpdated: apiApp.last_updated,
    synergyScore: apiApp.synergy_score,
    matchDetails: apiApp.match_details ? {
        strengths: apiApp.match_details.strengths,
        weaknesses: apiApp.match_details.weaknesses,
        skillMatchScore: apiApp.match_details.skill_match_score,
        experienceMatchScore: apiApp.match_details.experience_match_score,
    } : undefined,
    interviews: (apiApp.interviews || []).map(mapInterviewFromApi),
});

const mapInterviewFromApi = (apiInterview: any): Interview => ({
    id: apiInterview.id,
    scheduledAt: apiInterview.scheduled_at,
    location: apiInterview.location,
    notes: apiInterview.notes,
});

export const submitApplication = async (jobId: string): Promise<Application> => {
    const { data } = await api.post('/applications', { job_id: jobId });
    return mapApplicationFromApi(data);
};

export const getMyApplications = async (): Promise<Application[]> => {
    const { data } = await api.get('/applications/my-applications');
    return data.map(mapApplicationFromApi);
};

export const getApplicationsForJob = async (jobId: string): Promise<Application[]> => {
    const { data } = await api.get(`/applications/job/${jobId}`);
    const applications = data.map(mapApplicationFromApi);
    // Sort by synergy_score descending as required
    return applications.sort((a, b) => (b.synergyScore || 0) - (a.synergyScore || 0));
};

export const updateApplicationStatus = async ({ applicationId, status }: { applicationId: string, status: ApplicationStatus }): Promise<Application> => {
    const { data } = await api.put(`/applications/${applicationId}/status`, { status });
    return mapApplicationFromApi(data);
};

export const withdrawApplication = async (applicationId: string): Promise<Application> => {
    return updateApplicationStatus({ applicationId, status: ApplicationStatus.WITHDRAWN });
};

export const scheduleInterview = async ({ applicationId, interviewData }: { applicationId: string, interviewData: { scheduledAt: string; location: string, notes?: string } }): Promise<Interview> => {
    const apiData = { 
        scheduled_at: new Date(interviewData.scheduledAt).toISOString(), 
        location: interviewData.location,
        notes: interviewData.notes
    };
    const { data } = await api.post(`/applications/${applicationId}/interview`, apiData);
    return mapInterviewFromApi(data);
};

export const getInterviews = async (applicationId: string): Promise<Interview[]> => {
    const { data } = await api.get(`/applications/${applicationId}/interviews`);
    return data.map(mapInterviewFromApi);
};