import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const mockJobs = {
    active: [
        { id: '1', title: 'Senior Frontend Engineer', applications: 25 },
        { id: '2', title: 'Product Manager', applications: 12 },
    ],
    draft: [
        { id: '3', title: 'UX/UI Designer', applications: 0 },
    ],
    closed: [
        { id: '4', title: 'Data Scientist', applications: 48 },
    ],
};

type JobStatus = 'active' | 'draft' | 'closed';

const JobCard: React.FC<{ job: { id: string, title: string, applications: number } }> = ({ job }) => (
    <Card>
        <CardContent className="p-4 flex justify-between items-center">
            <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-neutral-500 flex items-center mt-1"><Users size={14} className="mr-1" /> {job.applications} Applications</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm"><Edit size={16} /></Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600"><Trash2 size={16} /></Button>
            </div>
        </CardContent>
    </Card>
);

const JobManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<JobStatus>('active');

    const jobsToDisplay = mockJobs[activeTab];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Jobs</h1>
                <Button><Plus className="mr-2 h-4 w-4" /> Post New Job</Button>
            </div>
            
            <div className="border-b border-neutral-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('active')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'active' ? 'border-primary-500 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}>
                        Active
                    </button>
                     <button onClick={() => setActiveTab('draft')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'draft' ? 'border-primary-500 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}>
                        Draft
                    </button>
                    <button onClick={() => setActiveTab('closed')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'closed' ? 'border-primary-500 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}>
                        Closed
                    </button>
                </nav>
            </div>
            
            <div className="space-y-4">
                {jobsToDisplay.length > 0 ? (
                    jobsToDisplay.map(job => <JobCard key={job.id} job={job} />)
                ) : (
                    <p className="text-center text-neutral-500 py-8">No jobs in this category.</p>
                )}
            </div>
        </div>
    );
};

export default JobManagementPage;