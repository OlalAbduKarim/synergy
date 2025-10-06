
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlusCircle, ArrowRight } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import SynergyScore from '../../components/jobs/SynergyScore';
import api from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const mockActiveJobs = [
    { id: 'j1', title: 'Senior Frontend Engineer', applications: 25 },
    { id: 'j2', title: 'Product Manager', applications: 12 },
    { id: 'j3', title: 'Data Scientist', applications: 48 },
];
const mockRecentApplicants = [
    { id: 'u1', name: 'Alice Johnson', jobTitle: 'Senior Frontend Engineer', score: 95 },
    { id: 'u2', name: 'Bob Williams', jobTitle: 'Data Scientist', score: 92 },
    { id: 'u3', name: 'Charlie Brown', jobTitle: 'Senior Frontend Engineer', score: 88 },
];
const analyticsData = [
  { name: 'Jan', applications: 65 },
  { name: 'Feb', applications: 59 },
  { name: 'Mar', applications: 80 },
  { name: 'Apr', applications: 81 },
  { name: 'May', applications: 56 },
  { name: 'Jun', applications: 55 },
];

const EmployerDashboardPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Welcome, {user?.companyName}!</h1>
                <p className="text-neutral-500">Manage your hiring pipeline efficiently.</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent>
                        <p className="text-sm text-neutral-500">Active Jobs</p>
                        <p className="text-3xl font-bold">4</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent>
                        <p className="text-sm text-neutral-500">Total Applications</p>
                        <p className="text-3xl font-bold">245</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent>
                        <p className="text-sm text-neutral-500">Interviews Today</p>
                        <p className="text-3xl font-bold">3</p>
                    </CardContent>
                </Card>
                 <Card className="bg-primary-600 text-white flex items-center justify-center">
                    <Button variant='ghost' className="text-lg w-full h-full hover:bg-primary-700 text-white">
                        <PlusCircle className="mr-2 h-6 w-6" /> Post New Job
                    </Button>
                </Card>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader><h3 className="text-xl font-semibold">Active Jobs</h3></CardHeader>
                    <CardContent className="space-y-4">
                        {mockActiveJobs.map(job => (
                             <div key={job.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50">
                                <div>
                                    <p className="font-semibold">{job.title}</p>
                                    <p className="text-sm text-neutral-500">{job.applications} applications</p>
                                </div>
                               <ArrowRight className="h-5 w-5 text-neutral-400" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-3">
                    <CardHeader><h3 className="text-xl font-semibold">Recent Top Applicants</h3></CardHeader>
                    <CardContent className="space-y-4">
                        {mockRecentApplicants.map(applicant => (
                            <div key={applicant.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50">
                                <div className="flex items-center">
                                    <SynergyScore score={applicant.score} size="md" />
                                    <div className="ml-4">
                                        <p className="font-semibold">{applicant.name}</p>
                                        <p className="text-sm text-neutral-500">Applied for {applicant.jobTitle}</p>
                                    </div>
                                </div>
                               <Button size="sm" variant="outline">View Profile</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader><h3 className="text-xl font-semibold">Application Analytics (Last 6 Months)</h3></CardHeader>
                <CardContent>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={analyticsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="applications" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmployerDashboardPage;
