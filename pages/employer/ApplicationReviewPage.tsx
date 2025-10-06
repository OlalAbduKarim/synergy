import React from 'react';
import { useParams } from 'react-router-dom';
import { Filter, ChevronDown, User, MessageSquare } from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SynergyScore from '../../components/jobs/SynergyScore';
import Badge from '../../components/ui/Badge';
import { ApplicationStatus } from '../../types';

const mockApplicants = [
    { id: '1', name: 'Alice Johnson', score: 95, skills: ['React', 'TypeScript', 'Node.js'], experience: '5 years', status: ApplicationStatus.INTERVIEWING },
    { id: '2', name: 'Bob Williams', score: 92, skills: ['React', 'Redux', 'Jest'], experience: '6 years', status: ApplicationStatus.REVIEWING },
    { id: '3', name: 'Charlie Brown', score: 88, skills: ['React', 'TypeScript', 'GraphQL'], experience: '4 years', status: ApplicationStatus.REVIEWING },
    { id: '4', name: 'Diana Prince', score: 78, skills: ['Vue.js', 'CSS', 'Figma'], experience: '3 years', status: ApplicationStatus.SUBMITTED },
];

const ApplicantCard: React.FC<{ applicant: typeof mockApplicants[0] }> = ({ applicant }) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
            <div className="flex items-start gap-4">
                <SynergyScore score={applicant.score} size="md" />
                <div className="flex-grow">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{applicant.name}</h3>
                         <Badge status={applicant.status}>{applicant.status}</Badge>
                    </div>
                    <p className="text-sm text-neutral-500">{applicant.experience} of experience</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                        {applicant.skills.map(skill => <Badge key={skill} size="sm">{skill}</Badge>)}
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
                 <Button variant="outline" size="sm"><MessageSquare size={14} className="mr-1" /> Message</Button>
                 <Button size="sm"><User size={14} className="mr-1" /> View Profile</Button>
            </div>
        </CardContent>
    </Card>
);


const ApplicationReviewPage: React.FC = () => {
    const { jobId } = useParams();

    return (
        <div>
            <h1 className="text-3xl font-bold">Applications for Senior Frontend Engineer</h1>
            <p className="text-neutral-500 mb-6">{mockApplicants.length} total applications</p>

            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <Button variant="outline"><Filter size={16} className="mr-2" /> Filter</Button>
                    <Button variant="outline">Sort by: Synergy Score <ChevronDown size={16} className="ml-2" /></Button>
                </div>
                 <div>
                    <input type="checkbox" id="bulk-select" className="mr-2" />
                    <label htmlFor="bulk-select">Select All</label>
                 </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockApplicants.map(app => <ApplicantCard key={app.id} applicant={app} />)}
            </div>
        </div>
    );
};

export default ApplicationReviewPage;