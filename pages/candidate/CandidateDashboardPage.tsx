import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import SynergyScore from '../../components/jobs/SynergyScore';
import { Job } from '../../types';
import { Briefcase, FileText, CheckSquare } from 'lucide-react';

const CandidateDashboardPage: React.FC = () => {
    const { user } = useAuth();

    // Mock query for recommended jobs
    const { data: recommendedJobs, isLoading: isLoadingJobs } = useQuery({
        queryKey: ['recommended-jobs'],
        queryFn: async () => {
            await new Promise(res => setTimeout(res, 500)); // Simulate network delay
            return [
                { id: 'j1', title: 'Senior Frontend Engineer', company: { id: 'c1', name: 'Innovate Inc.' }, location: 'Remote', synergyScore: 95, workType: 'Remote', employmentType: 'Full-time' },
                { id: 'j2', title: 'UX/UI Designer', company: { id: 'c2', name: 'Creative Minds' }, location: 'San Francisco, CA', synergyScore: 88, workType: 'Hybrid', employmentType: 'Full-time' },
                { id: 'j3', title: 'Data Scientist', company: { id: 'c3', name: 'DataCorp' }, location: 'Chicago, IL', synergyScore: 72, workType: 'On-site', employmentType: 'Contract' },
            ] as any[]; // Using 'as any' to bypass missing properties in mock Job
        }
    });

    const stats = {
        applications: 4,
        interviews: 1,
        offers: 0,
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Welcome, {user?.fullName}!</h1>
                <p className="text-neutral-500">Here's your job search snapshot.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="flex items-center p-6">
                        <FileText className="h-8 w-8 text-primary-500" />
                        <div className="ml-4">
                            <p className="text-3xl font-bold">{stats.applications}</p>
                            <p className="text-sm text-neutral-500">Applications Submitted</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6">
                        <CheckSquare className="h-8 w-8 text-yellow-500" />
                        <div className="ml-4">
                            <p className="text-3xl font-bold">{stats.interviews}</p>
                            <p className="text-sm text-neutral-500">Interviews Scheduled</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6">
                        <Briefcase className="h-8 w-8 text-green-500" />
                        <div className="ml-4">
                            <p className="text-3xl font-bold">{stats.offers}</p>
                            <p className="text-sm text-neutral-500">Job Offers</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <h3 className="text-xl font-semibold">Top Job Matches for You</h3>
                </CardHeader>
                <CardContent>
                    {isLoadingJobs ? (
                        <div className="flex justify-center p-8"><Spinner /></div>
                    ) : (
                        <div className="space-y-4">
                            {recommendedJobs?.map((job: Job) => (
                                <Link to={`/jobs/${job.id}`} key={job.id} className="block p-4 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-primary-700">{job.title}</p>
                                            <p className="text-sm text-neutral-600">{job.company.name} &middot; {job.location}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {job.synergyScore && <SynergyScore score={job.synergyScore} size="md" />}
                                            <Button size="sm" variant="outline" tabIndex={-1}>View Job</Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
    );
};

export default CandidateDashboardPage;
