import api from './api';
import { Job } from '../types';

export const getRecommendedJobs = async (): Promise<Job[]> => {
    const { data } = await api.get('/matching/jobs');
    return data;
};

export const getRecommendedCandidates = async (jobId: string): Promise<any[]> => {
    const { data } = await api.get(`/matching/jobs/${jobId}/candidates`);
    return data;
};
