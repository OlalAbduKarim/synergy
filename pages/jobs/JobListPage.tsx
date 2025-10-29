
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Search } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Card, { CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { Job, WorkType, EmploymentType } from '../../types';
import SynergyScore from '../../components/jobs/SynergyScore';

const JobListPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    // Mock query for jobs
    const { data: jobs, isLoading } = useQuery({
        queryKey: ['jobs'],
        queryFn: async (): Promise<Job[]> => {
            await new Promise(res => setTimeout(res, 500));
            return [
                { id: 'j1', title: 'Senior Frontend Engineer', company: { id: 'c1', name: 'Innovate Inc.' }, location: 'Remote', synergyScore: 95, workType: WorkType.REMOTE, employmentType: EmploymentType.FULL_TIME, description: '', responsibilities: [], requirements: [], skills: [] },
                { id: 'j2', title: 'Product Manager', company: { id: 'c2', name: 'Solutions Co.' }, location: 'New York, NY', synergyScore: 88, workType: WorkType.ON_SITE, employmentType: EmploymentType.FULL_TIME, description: '', responsibilities: [], requirements: [], skills: [] },
                { id: 'j3', title: 'Data Scientist', company: { id: 'c3', name: 'DataCorp' }, location: 'Chicago, IL', synergyScore: 72, workType: WorkType.HYBRID, employmentType: EmploymentType.CONTRACT, description: '', responsibilities: [], requirements: [], skills: [] },
                { id: 'j4', title: 'UX/UI Designer', company: { id: 'c4', name: 'Creative Minds' }, location: 'San Francisco, CA', synergyScore: 65, workType: WorkType.REMOTE, employmentType: EmploymentType.PART_TIME, description: '', responsibilities: [], requirements: [], skills: [] },
            ];
        },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Find Your Next Opportunity</h1>
                <p className="text-neutral-500">Search through thousands of open roles.</p>
            </div>

            <Card>
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <Input placeholder="Job title, keywords, or company" className="pl-10" />
                    </div>
                    <div className="relative flex-grow">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <Input placeholder="Location" className="pl-10" />
                    </div>
                    <Button>Search Jobs</Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6">
                {isLoading ? (
                    <div className="flex justify-center p-8"><Spinner size="lg" /></div>
                ) : (
                    jobs?.map(job => (
                        <Card key={job.id} className="hover:shadow-md transition-shadow">
                            <Link to={`/jobs/${job.id}`}>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-primary-700">{job.title}</h3>
                                            <p className="text-neutral-600">{job.company.name}</p>
                                            <div className="flex items-center text-sm text-neutral-500 mt-2 gap-4">
                                                <span className="flex items-center"><MapPin size={14} className="mr-1.5" /> {job.location}</span>
                                                <span className="flex items-center"><Briefcase size={14} className="mr-1.5" /> {job.employmentType}</span>
                                            </div>
                                        </div>
                                        {isAuthenticated && job.synergyScore && <SynergyScore score={job.synergyScore} />}
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default JobListPage;
