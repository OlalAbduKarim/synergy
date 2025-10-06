
import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SynergyScore from '../../components/jobs/SynergyScore';
import { Job, WorkType, EmploymentType, UserRole } from '../../types';
import useAuth from '../../hooks/useAuth';

// Mock Data
const mockJob: Job = { id: '1', title: 'Senior Frontend Engineer', company: { id: 'c1', name: 'Innovate Inc.' }, location: 'Remote', workType: WorkType.REMOTE, employmentType: EmploymentType.FULL_TIME, salaryMin: 120000, salaryMax: 150000, skills: [{id:'s1', name: 'React', proficiency: 5}, {id:'s2', name: 'TypeScript', proficiency: 5}, {id:'s3', name: 'Node.js', proficiency: 4}, {id:'s12', name: 'GraphQL', proficiency: 3}], synergyScore: 95, 
description: "We are seeking a passionate Senior Frontend Engineer to join our dynamic team. You will be responsible for building and maintaining our next-generation user interfaces, ensuring they are performant, accessible, and delightful to use.",
responsibilities: ["Develop new user-facing features using React.js", "Build reusable components and front-end libraries for future use", "Translate designs and wireframes into high-quality code", "Optimize components for maximum performance across a vast array of web-capable devices and browsers"], 
requirements: ["Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model", "Thorough understanding of React.js and its core principles", "Experience with popular React.js workflows (such as Flux or Redux)", "Familiarity with newer specifications of EcmaScript"] };

const SynergyBreakdown: React.FC = () => (
    <Card>
        <CardHeader><h3 className="text-xl font-semibold">Your Synergy Breakdown</h3></CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <p>Skills Match</p>
                <div className="flex items-center">
                    <p className="font-semibold mr-2">98%</p>
                    <div className="w-32 h-2 bg-neutral-200 rounded-full"><div className="h-2 bg-green-500 rounded-full" style={{width: '98%'}}></div></div>
                </div>
            </div>
             <div className="pl-4 text-sm space-y-1">
                <p className="flex items-center text-green-600"><CheckCircle size={14} className="mr-2" /> React, TypeScript</p>
                <p className="flex items-center text-red-600"><XCircle size={14} className="mr-2" /> GraphQL (Missing)</p>
            </div>
             <div className="flex items-center justify-between">
                <p>Experience Match</p>
                <div className="flex items-center">
                    <p className="font-semibold mr-2">90%</p>
                    <div className="w-32 h-2 bg-neutral-200 rounded-full"><div className="h-2 bg-green-500 rounded-full" style={{width: '90%'}}></div></div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p>Salary Alignment</p>
                <div className="flex items-center">
                    <p className="font-semibold mr-2">Perfect</p>
                     <div className="w-32 h-2 bg-neutral-200 rounded-full"><div className="h-2 bg-green-500 rounded-full" style={{width: '100%'}}></div></div>
                </div>
            </div>
        </CardContent>
    </Card>
);


const JobDetailPage: React.FC = () => {
    const { jobId } = useParams();
    const { user } = useAuth();
    const job = mockJob; // In real app: useQuery to fetch job by ID

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
                <Card>
                    <CardContent>
                        <p className="text-neutral-500">{job.company.name}</p>
                        <h1 className="text-4xl font-bold mt-1">{job.title}</h1>
                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-neutral-600">
                           <span className="flex items-center"><MapPin size={16} className="mr-2" /> {job.location}</span>
                           <span className="flex items-center"><Briefcase size={16} className="mr-2" /> {job.employmentType}</span>
                           {job.salaryMin && <span className="flex items-center"><DollarSign size={16} className="mr-2" /> ${job.salaryMin/1000}k - ${job.salaryMax/1000}k</span>}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                        <p className="text-neutral-600 leading-relaxed">{job.description}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                            {job.responsibilities.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                           {job.requirements.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent>
                        <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                         <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => <Badge key={skill.id} variant="primary">{skill.name}</Badge>)}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:w-1/3 space-y-6">
                 <Card className="text-center sticky top-24">
                     <CardContent>
                        <h3 className="text-lg font-semibold">Your Synergy Score</h3>
                        <SynergyScore score={job.synergyScore!} size="lg" className="my-4" />
                        <p className="text-sm text-neutral-500 mb-4">This score reflects how well your profile aligns with the job requirements.</p>
                        {user?.role === UserRole.CANDIDATE && (
                            <Button className="w-full">Apply Now</Button>
                        )}
                        {user?.role === UserRole.EMPLOYER && (
                             <div className="flex gap-2">
                                <Button className="w-full" variant="outline">Edit Job</Button>
                                <Button className="w-full">View Applications (25)</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
                {user?.role === UserRole.CANDIDATE && <SynergyBreakdown />}
                <Card>
                     <CardHeader><h3 className="text-xl font-semibold">About {job.company.name}</h3></CardHeader>
                     <CardContent>
                        <p className="text-sm text-neutral-600">Innovate Inc. is a leading technology company revolutionizing the way people interact with software. We foster a culture of collaboration, innovation, and continuous learning.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default JobDetailPage;
