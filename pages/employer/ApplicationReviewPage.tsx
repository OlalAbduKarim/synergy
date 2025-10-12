import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Mail, Download, CheckCircle, XCircle, Calendar, Briefcase } from 'lucide-react';
import { ApplicationStatus, Application } from '../../types';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import SynergyScore from '../../components/jobs/SynergyScore';
import { getApplicationsForJob, updateApplicationStatus, scheduleInterview } from '../../services/applicationService';
import { formatDate } from '../../lib/utils';

const ApplicationReviewPage: React.FC = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const queryClient = useQueryClient();
    const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
    const [showInterviewFormId, setShowInterviewFormId] = useState<string | null>(null);

    const { data: applications, isLoading } = useQuery({
        queryKey: ['job-applications', jobId],
        queryFn: () => getApplicationsForJob(jobId!),
        enabled: !!jobId,
        onSuccess: (data) => {
            if (!selectedApplicationId && data && data.length > 0) {
                setSelectedApplicationId(data[0].id);
            } else if (data && !data.find(app => app.id === selectedApplicationId)) {
                setSelectedApplicationId(data[0]?.id || null);
            }
        },
    });

    const statusUpdateMutation = useMutation({
        mutationFn: updateApplicationStatus,
        onSuccess: (updatedApplication) => {
            queryClient.setQueryData(['job-applications', jobId], (oldData: Application[] | undefined) =>
                oldData?.map(app => app.id === updatedApplication.id ? updatedApplication : app) || []
            );
        },
    });

    const scheduleInterviewMutation = useMutation({
        mutationFn: scheduleInterview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['job-applications', jobId] });
            setShowInterviewFormId(null);
        },
        onError: (err: any) => alert(`Error: ${err.response?.data?.error || 'Could not schedule interview.'}`)
    });

    const handleStatusChange = (applicationId: string, status: ApplicationStatus) => {
        statusUpdateMutation.mutate({ applicationId, status });
    };
    
    const handleScheduleInterview = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!showInterviewFormId) return;

        const formData = new FormData(e.currentTarget);
        const scheduledAt = formData.get('scheduledAt') as string;
        const location = formData.get('location') as string;
        
        scheduleInterviewMutation.mutate({ applicationId: showInterviewFormId, interviewData: { scheduledAt, location } });
    };

    const selectedApplication = applications?.find(a => a.id === selectedApplicationId);
    const job = applications && applications.length > 0 ? applications[0].job : null;

    if (isLoading) return <div className="flex justify-center p-8"><Spinner size="lg"/></div>
    
    if (!job) {
        return (
            <div>
                 <Link to="/employer/jobs" className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-primary-600 mb-4">
                    <ArrowLeft size={16} className="mr-2" /> Back to Job Management
                </Link>
                <h1 className="text-2xl font-bold mt-4">Job not found or no applicants.</h1>
            </div>
        )
    }

    return (
        <div>
            <Link to="/employer/jobs" className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-primary-600 mb-4">
                <ArrowLeft size={16} className="mr-2" /> Back to Job Management
            </Link>
            <h1 className="text-3xl font-bold">Review Applicants</h1>
            <p className="text-neutral-500">for {job.title}</p>

            <div className="mt-8 flex gap-8 h-[calc(100vh-15rem)]">
                {/* Applicant List */}
                <Card className="w-1/3 flex flex-col">
                    <CardHeader>
                        <h3 className="text-lg font-semibold">{applications?.length || 0} Applicants</h3>
                    </CardHeader>
                    <CardContent className="p-2 flex-grow overflow-y-auto">
                        {applications?.map(app => (
                            <div key={app.id} onClick={() => setSelectedApplicationId(app.id)} className={`p-3 rounded-lg cursor-pointer mb-2 ${selectedApplicationId === app.id ? 'bg-primary-50' : 'hover:bg-neutral-50'}`}>
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{app.candidate?.fullName}</p>
                                    {app.synergyScore && <SynergyScore score={app.synergyScore} size="sm"/>}
                                </div>
                                <Badge status={app.status} className="mt-1">{app.status}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Selected Applicant Details */}
                <Card className="w-2/3 flex flex-col">
                    {selectedApplication && selectedApplication.candidate ? (
                        <>
                            <CardHeader className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedApplication.candidate.fullName}</h2>
                                    <div className="flex items-center gap-4 text-sm text-neutral-500 mt-1">
                                        <a href={`mailto:${selectedApplication.candidate.email}`} className="flex items-center hover:text-primary-600"><Mail size={14} className="mr-1"/> Email</a>
                                    </div>
                                </div>
                                <Button variant="outline"><Download size={16} className="mr-2"/> Resume</Button>
                            </CardHeader>
                            <CardContent className="flex-grow overflow-y-auto space-y-6">
                                <div>
                                    <h4 className="font-semibold text-neutral-700">Synergy Score</h4>
                                    <div className="flex items-center gap-4 mt-2">
                                        {selectedApplication.synergyScore && <SynergyScore score={selectedApplication.synergyScore} size="md"/>}
                                        <p className="text-sm text-neutral-600">High match based on skills, experience, and job requirements.</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-700">About</h4>
                                    <p className="text-sm text-neutral-600 mt-1">{selectedApplication.candidate.about}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-700">Top Skills</h4>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedApplication.candidate.skills?.map(s => <Badge key={s.id} variant="primary">{s.name}</Badge>)}
                                    </div>
                                </div>
                                 {showInterviewFormId === selectedApplication.id && (
                                     <form onSubmit={handleScheduleInterview} className="space-y-2 pt-4 border-t">
                                        <h4 className="font-semibold text-neutral-700">Schedule Interview</h4>
                                        <input type="datetime-local" name="scheduledAt" className="w-full p-2 border rounded-md" required />
                                        <input type="text" name="location" placeholder="Location or meeting link" className="w-full p-2 border rounded-md" required />
                                        <div className="flex gap-2">
                                            <Button type="submit" size="sm" disabled={scheduleInterviewMutation.isPending}>
                                                {scheduleInterviewMutation.isPending ? 'Saving...' : 'Confirm'}
                                            </Button>
                                            <Button type="button" variant="ghost" size="sm" onClick={() => setShowInterviewFormId(null)}>Cancel</Button>
                                        </div>
                                     </form>
                                )}
                            </CardContent>
                            <div className="p-4 border-t flex justify-between items-center bg-neutral-50">
                                 <div className="flex items-center gap-2">
                                    <label htmlFor="status-select" className="text-sm font-medium">Status: </label>
                                     <select 
                                        id="status-select"
                                        value={selectedApplication.status} 
                                        onChange={(e) => handleStatusChange(selectedApplication.id, e.target.value as ApplicationStatus)}
                                        className="p-1.5 border rounded-md text-sm"
                                        disabled={statusUpdateMutation.isPending}
                                    >
                                        {Object.values(ApplicationStatus).filter(s => s !== ApplicationStatus.WITHDRAWN).map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" onClick={() => setShowInterviewFormId(selectedApplication.id)}>
                                        <Calendar size={16} className="mr-1"/> Interview
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-neutral-500 flex-col">
                            <Briefcase size={48}/>
                            <p className="mt-2">Select an applicant to view details</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ApplicationReviewPage;