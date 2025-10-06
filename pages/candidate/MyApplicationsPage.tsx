import React, { useState } from 'react';
import { Briefcase, Calendar, Filter } from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SynergyScore from '../../components/jobs/SynergyScore';
import { Application, ApplicationStatus, Job, UserRole, WorkType, EmploymentType, User } from '../../types';

const mockUser: User = { id: '1', email: 'test@test.com', fullName: 'John Doe', role: UserRole.CANDIDATE };

const mockApplications: Application[] = [
    { id: '1', job: { id: 'j1', title: 'Senior Frontend Engineer', company: { id: 'c1', name: 'Innovate Inc.'}, location: 'Remote', workType: WorkType.REMOTE, employmentType: EmploymentType.FULL_TIME, description: '', responsibilities: [], requirements: [], skills: [] }, candidate: mockUser, status: ApplicationStatus.INTERVIEWING, appliedDate: '2023-10-15', synergyScore: 95 },
    { id: '2', job: { id: 'j2', title: 'Product Manager', company: { id: 'c2', name: 'Solutions Co.'}, location: 'New York, NY', workType: WorkType.HYBRID, employmentType: EmploymentType.FULL_TIME, description: '', responsibilities: [], requirements: [], skills: [] }, candidate: mockUser, status: ApplicationStatus.REVIEWING, appliedDate: '2023-10-12', synergyScore: 88 },
    { id: '3', job: { id: 'j3', title: 'Data Scientist', company: { id: 'c3', name: 'DataCorp'}, location: 'San Francisco, CA', workType: WorkType.ONSITE, employmentType: EmploymentType.FULL_TIME, description: '', responsibilities: [], requirements: [], skills: [] }, candidate: mockUser, status: ApplicationStatus.SUBMITTED, appliedDate: '2023-10-10', synergyScore: 82 },
    { id: '4', job: { id: 'j4', title: 'UX Designer', company: { id: 'c4', name: 'Creative Minds'}, location: 'Remote', workType: WorkType.REMOTE, employmentType: EmploymentType.CONTRACT, description: '', responsibilities: [], requirements: [], skills: [] }, candidate: mockUser, status: ApplicationStatus.REJECTED, appliedDate: '2023-09-28', synergyScore: 75 },
];

const ApplicationCard: React.FC<{ application: Application }> = ({ application }) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">{application.job.title}</h3>
                    <p className="text-sm text-neutral-500">{application.job.company.name}</p>
                </div>
                <Badge status={application.status}>{application.status}</Badge>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <span className="flex items-center"><Calendar size={14} className="mr-1" /> Applied on {application.appliedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                    <SynergyScore score={application.synergyScore} size="sm" />
                    <span className="text-sm font-semibold">{application.synergyScore}</span>
                </div>
            </div>
             <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" size="sm">Message Employer</Button>
                <Button size="sm">View Details</Button>
            </div>
        </CardContent>
    </Card>
);

const MyApplicationsPage: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');

    const filteredApplications = statusFilter === 'All' 
        ? mockApplications 
        : mockApplications.filter(app => app.status === statusFilter);
    
    const statuses: ('All' | ApplicationStatus)[] = ['All', ...Object.values(ApplicationStatus)];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Applications</h1>
            
            <div className="mb-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {statuses.map(status => (
                        <Button
                            key={status}
                            variant={statusFilter === status ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setStatusFilter(status)}
                        >
                            {status}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {filteredApplications.length > 0 ? (
                    filteredApplications.map(app => <ApplicationCard key={app.id} application={app} />)
                ) : (
                    <Card>
                        <CardContent className="text-center text-neutral-500 py-12">
                            <Briefcase size={48} className="mx-auto text-neutral-300 mb-4" />
                            <p>No applications found for this filter.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default MyApplicationsPage;