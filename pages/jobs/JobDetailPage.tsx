
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, MapPin, Briefcase, Clock, Check } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { submitApplication } from '../../services/applicationService';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import SynergyScore from '../../components/jobs/SynergyScore';
import { Job, WorkType, EmploymentType, Skill, SkillCategory, UserRole } from '../../types';

// Mock data for a single job
const mockJob: Job = {
    id: 'j1',
    title: 'Senior Frontend Engineer',
    company: { id: 'c1', name: 'Innovate Inc.' },
    location: 'Remote',
    workType: WorkType.REMOTE,
    employmentType: EmploymentType.FULL_TIME,
    synergyScore: 95,
    description: 'We are seeking a passionate Senior Frontend Engineer to join our dynamic team. You will be responsible for building and maintaining our user-facing applications, collaborating with designers and backend engineers to create a seamless user experience.',
    responsibilities: [
        'Develop new user-facing features using React.js',
        'Build reusable components and front-end libraries for future use',
        'Translate designs and wireframes into high-quality code',
        'Optimize components for maximum performance across a vast array of web-capable devices and browsers',
    ],
    requirements: [
        'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model',
        'Thorough understanding of React.js and its core principles',
        'Experience with popular React.js workflows (such as Flux or Redux)',
        'Familiarity with newer specifications of EcmaScript',
        'Experience with data structure libraries (e.g., Immutable.js)',
        'Familiarity with RESTful APIs',
    ],
    skills: [
        { id: 's1', name: 'React', category: SkillCategory.FRAMEWORK, proficiency: 5 },
        { id: 's2', name: 'TypeScript', category: SkillCategory.LANGUAGE, proficiency: 4 },
        { id: 's3', name: 'Redux', category: SkillCategory.TOOL, proficiency: 4 },
        { id: 's4', name: 'GraphQL', category: SkillCategory.TOOL, proficiency: 3 },
    ],
};


const JobDetailPage: React.FC = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const { user, isAuthenticated } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Mock query for a single job
    const { data: job, isLoading } = useQuery({
        queryKey: ['job', jobId],
        queryFn: async (): Promise<Job> => {
            await new Promise(res => setTimeout(res, 500));
            return { ...mockJob, id: jobId || 'j1' };
        },
        enabled: !!jobId,
    });
    
    const applyMutation = useMutation({
        mutationFn: () => submitApplication(jobId!),
        onSuccess: () => {
            alert('Application submitted successfully!');
            queryClient.invalidateQueries({ queryKey: ['my-applications'] });
        },
        onError: (error: any) => {
             alert(`Error: ${error.response?.data?.error || 'Could not submit application.'}`);
        }
    });

    if (isLoading) return <div className="flex justify-center items-center h-64"><Spinner size="lg" /></div>;
    if (!job) return <div className="text-center">Job not found.</div>;
    
    const renderActionButtons = () => {
        if (!isAuthenticated) {
            return (
                <Button className="w-full mt-4" onClick={() => navigate('/signin')}>
                    Sign In to Apply
                </Button>
            );
        }
        if (user?.role === UserRole.CANDIDATE) {
             return (
                <Button 
                    className="w-full mt-4" 
                    onClick={() => applyMutation.mutate()} 
                    disabled={applyMutation.isPending}
                >
                    {applyMutation.isPending ? <><Spinner size="sm" className="mr-2"/> Submitting...</> : 'Apply Now'}
                </Button>
            );
        }
        if (user?.role === UserRole.EMPLOYER) {
             return (
                <Link to={`/employer/jobs/${job.id}/applications`} className="w-full">
                    <Button className="w-full mt-4">View Applications</Button>
                </Link>
            );
        }
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Link to="/jobs" className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-primary-600 mb-4">
                <ArrowLeft size={16} className="mr-2" /> Back to Jobs
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <h1 className="text-3xl font-bold">{job.title}</h1>
                            <p className="text-xl text-neutral-600">{job.company.name}</p>
                            <div className="flex items-center text-sm text-neutral-500 mt-2 gap-4">
                                <span className="flex items-center"><MapPin size={14} className="mr-1.5" /> {job.location}</span>
                                <span className="flex items-center"><Briefcase size={14} className="mr-1.5" /> {job.employmentType}</span>
                                <span className="flex items-center"><Clock size={14} className="mr-1.5" /> {job.workType}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold border-b pb-2 mb-2">Job Description</h3>
                            <p className="text-neutral-600">{job.description}</p>
                            
                            <h3 className="text-lg font-semibold border-b pb-2 mt-6 mb-2">Responsibilities</h3>
                            <ul className="list-none space-y-2">
                                {job.responsibilities.map((item, i) => <li key={i} className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" /> {item}</li>)}
                            </ul>

                            <h3 className="text-lg font-semibold border-b pb-2 mt-6 mb-2">Requirements</h3>
                            <ul className="list-none space-y-2">
                                {job.requirements.map((item, i) => <li key={i} className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" /> {item}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="text-center">
                            <h3 className="text-lg font-semibold">{isAuthenticated ? 'Synergy Score' : 'Ready to Apply?'}</h3>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                             {isAuthenticated && job.synergyScore ? (
                                <>
                                    <SynergyScore score={job.synergyScore} size="lg" />
                                    <p className="text-center text-sm text-neutral-500 mt-2">Your profile is a strong match for this role.</p>
                                </>
                            ) : (
                                <p className="text-center text-sm text-neutral-500 mt-2">
                                    {isAuthenticated ? 'Synergy Score not available.' : 'Sign in or create an account to see your Synergy Score and apply for this job.'}
                                </p>
                            )}
                            {renderActionButtons()}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><h3 className="text-lg font-semibold">Required Skills</h3></CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {job.skills.map(skill => <Badge key={skill.id} variant="primary">{skill.name}</Badge>)}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;
