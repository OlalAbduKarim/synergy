import React from 'react';
import { ArrowRight } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import SynergyScore from '../../components/jobs/SynergyScore';
import { Job, ApplicationStatus, WorkType, EmploymentType } from '../../types';

// Mock Data
// Fix: Added missing 'description' property to mock job objects to satisfy the Job interface.
const mockJobs: Job[] = [
    { id: '1', title: 'Senior Frontend Engineer', company: { id: 'c1', name: 'Innovate Inc.' }, location: 'Remote', synergyScore: 95, workType: WorkType.REMOTE, employmentType: EmploymentType.FULL_TIME, description: 'Join our team as a Senior Frontend Engineer.', responsibilities: [], requirements: [], skills: [] },
    { id: '2', title: 'Product Manager', company: { id: 'c2', name: 'Solutions Co.' }, location: 'New York, NY', synergyScore: 88, workType: WorkType.HYBRID, employmentType: EmploymentType.FULL_TIME, description: 'Lead our product team to new heights.', responsibilities: [], requirements: [], skills: [] },
    { id: '3', title: 'UX/UI Designer', company: { id: 'c3', name: 'Creative Minds' }, location: 'San Francisco, CA', synergyScore: 82, workType: WorkType.ONSITE, employmentType: EmploymentType.CONTRACT, description: 'Design beautiful and intuitive user experiences.', responsibilities: [], requirements: [], skills: [] },
];

const mockApplications = [
    { id: 'a1', jobTitle: 'Senior Frontend Engineer', companyName: 'Innovate Inc.', status: ApplicationStatus.INTERVIEWING },
    { id: 'a2', jobTitle: 'Data Scientist', companyName: 'DataCorp', status: ApplicationStatus.REVIEWING },
];

const CandidateDashboardPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Welcome back, {user?.fullName}!</h1>
                <p className="text-neutral-500">Let's find your next opportunity.</p>
            </div>

            <Card className="bg-primary-600 text-white">
                <CardContent className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">Your profile is 75% complete!</h3>
                        <p className="text-primary-200">Complete your profile to get better matches.</p>
                    </div>
                    <Button variant='outline' className="bg-white/20 border-white text-white hover:bg-white/30">Complete Profile <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent>
                        <p className="text-sm text-neutral-500">Applications Submitted</p>
                        <p className="text-3xl font-bold">12</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent>
                        <p className="text-sm text-neutral-500">Interviews Scheduled</p>
                        <p className="text-3xl font-bold">2</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent>
                        <p className="text-sm text-neutral-500">Unread Messages</p>
                        <p className="text-3xl font-bold">5</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <h3 className="text-xl font-semibold">Top Matched Jobs</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mockJobs.map(job => (
                            <div key={job.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50">
                                <div className="flex items-center">
                                    <SynergyScore score={job.synergyScore!} size="md" />
                                    <div className="ml-4">
                                        <p className="font-semibold">{job.title}</p>
                                        <p className="text-sm text-neutral-500">{job.company.name} &middot; {job.location}</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline">View</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h3 className="text-xl font-semibold">Recent Applications</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mockApplications.map(app => (
                            <div key={app.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50">
                                <div>
                                    <p className="font-semibold">{app.jobTitle}</p>
                                    <p className="text-sm text-neutral-500">{app.companyName}</p>
                                </div>
                                <Badge status={app.status}>{app.status}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CandidateDashboardPage;