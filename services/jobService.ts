import api from './api';
import { Job } from '../types';

export const getJobs = async (filters?: any): Promise<Job[]> => {
    const { data } = await api.get('/jobs', { params: filters });
    return data;
};

export const getJobById = async (jobId: string): Promise<Job> => {
    const { data } = await api.get(`/jobs/${jobId}`);
    return data;
};

export const createJob = async (jobData: Partial<Job>): Promise<Job> => {
    const { data } = await api.post('/jobs', jobData);
    return data;
};

export const updateJob = async (jobId: string, jobData: Partial<Job>): Promise<Job> => {
    const { data } = await api.put(`/jobs/${jobId}`, jobData);
    return data;
};

export const deleteJob = async (jobId: string): Promise<void> => {
    await api.delete(`/jobs/${jobId}`);
};
