import React, { useState } from 'react';
import { MapPin, Briefcase, Search, DollarSign } from 'lucide-react';
import Input from '../../components/ui/Input';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SynergyScore from '../../components/jobs/SynergyScore';
import { Job, WorkType, EmploymentType } from '../../types';

// Mock Data
// Fix: Added missing 'description' property to mock job objects to satisfy the Job interface.
const mockJobs: Job[] = [
    { id: '1', title: 'Senior Frontend Engineer', company: { id: 'c1', name: 'Innovate Inc.' }, location: 'Remote', workType: WorkType.REMOTE, employmentType: EmploymentType.FULL_TIME, salaryMin: 120000, salaryMax: 150000, skills: [{id:'s1', name: 'React'}, {id:'s2', name: 'TypeScript'}, {id:'s3', name: 'Node.js'}], synergyScore: 95, description: 'We are looking for an experienced frontend engineer.', responsibilities: [], requirements: [] },
    { id: '2', title: 'Product Manager', company: { id: 'c2', name: 'Solutions Co.' }, location: 'New York, NY', workType: WorkType.HYBRID, employmentType: EmploymentType.FULL_TIME, salaryMin: 110000, salaryMax: 140000, skills: [{id:'s4', name: 'Agile'}, {id:'s5', name: 'Roadmapping'}, {id:'s6', name: 'JIRA'}], synergyScore: 88, description: 'Drive product strategy and execution.', responsibilities: [], requirements: [] },
    { id: '3', title: 'UX/UI Designer', company: { id: 'c3', name: 'Creative Minds' }, location: 'San Francisco, CA', workType: WorkType.ONSITE, employmentType: EmploymentType.CONTRACT, skills: [{id:'s7', name: 'Figma'}, {id:'s8', name: 'User Research'}], synergyScore: 82, description: 'Create stunning and user-friendly designs.', responsibilities: [], requirements: [] },
    { id: '4', title: 'Backend Developer', company: { id: 'c1', name: 'Innovate Inc.' }, location: 'Remote', workType: WorkType.REMOTE, employmentType: EmploymentType.FULL_TIME, salaryMin: 130000, salaryMax: 160000, skills: [{id:'s9', name: 'Go'}, {id:'s10', name: 'PostgreSQL'}, {id:'s11', name: 'Docker'}], synergyScore: 75, description: 'Build and maintain our server-side logic.', responsibilities: [], requirements: [] },
];

const JobCard: React.FC<{ job: Job }> = ({ job }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-neutral-500">{job.company.name}</p>
                    <h3 className="text-lg font-semibold text-primary-700">{job.title}</h3>
                </div>
                {job.synergyScore && <SynergyScore score={job.synergyScore} size="md" />}
            </div>
            <div className="mt-2 flex items-center space-x-4 text-sm text-neutral-600">
                <span className="flex items-center"><MapPin size={14} className="mr-1" /> {job.location}</span>
                <span className="flex items-center"><Briefcase size={14} className="mr-1" /> {job.employmentType}</span>
            </div>
             {job.salaryMin && job.salaryMax && (
                <div className="mt-2 flex items-center text-sm text-neutral-600">
                    <DollarSign size={14} className="mr-1" /> ${job.salaryMin/1000}k - ${job.salaryMax/1000}k
                </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.slice(0, 3).map(skill => <Badge key={skill.id}>{skill.name}</Badge>)}
            </div>
            <div className="mt-6 text-right">
                <Button>View Details</Button>
            </div>
        </CardContent>
    </Card>
);


const JobListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredJobs = mockJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-1/4">
                <Card>
                    <CardContent className="p-4 space-y-6">
                        <h3 className="text-lg font-semibold">Filters</h3>
                        <div>
                             <label className="text-sm font-medium">Work Type</label>
                             <div className="mt-2 space-y-2">
                                {Object.values(WorkType).map(type => (
                                    <div key={type} className="flex items-center">
                                        <input id={`work-${type}`} name="workType" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"/>
                                        <label htmlFor={`work-${type}`} className="ml-3 text-sm text-neutral-600">{type}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div>
                             <label className="text-sm font-medium">Employment Type</label>
                             <div className="mt-2 space-y-2">
                                {Object.values(EmploymentType).map(type => (
                                    <div key={type} className="flex items-center">
                                        <input id={`emp-${type}`} name="employmentType" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"/>
                                        <label htmlFor={`emp-${type}`} className="ml-3 text-sm text-neutral-600">{type}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div>
                            <label htmlFor="salary" className="text-sm font-medium">Salary Range</label>
                            <input id="salary" type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2" />
                        </div>
                    </CardContent>
                </Card>
            </aside>
            
            {/* Job Listings */}
            <main className="lg:w-3/4">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <Input 
                        placeholder="Search by title, company, or keyword..." 
                        className="pl-10 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => <JobCard key={job.id} job={job} />)
                    ) : (
                        <p className="md:col-span-2 text-center text-neutral-500">No jobs found matching your criteria.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default JobListPage;