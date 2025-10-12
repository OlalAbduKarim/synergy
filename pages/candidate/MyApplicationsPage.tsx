import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Briefcase, Calendar, Clock } from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { Application, ApplicationStatus } from '../../types';
import { formatDate } from '../../lib/utils';
import { getMyApplications, withdrawApplication } from '../../services/applicationService';

const ApplicationCard: React.FC<{ application: Application, onWithdraw: (id: string) => void, isWithdrawing: boolean }> = ({ application, onWithdraw, isWithdrawing }) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-primary-700">{application.job.title}</h3>
                    <p className="text-neutral-600">{application.job.company.name} &middot; {application.job.location}</p>
                </div>
                <Badge status={application.status}>{application.status}</Badge>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between items-center text-sm text-neutral-500">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                    <span className="flex items-center">
                        <Calendar size={14} className="mr-1.5" />
                        Applied on {formatDate(application.appliedDate, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center mt-1 sm:mt-0">
                        <Clock size={14} className="mr-1.5" />
                        Last updated on {formatDate(application.lastUpdated, { month: 'long', day: 'numeric' })}
                    </span>
                </div>
                {[ApplicationStatus.SUBMITTED, ApplicationStatus.REVIEWING, ApplicationStatus.INTERVIEWING].includes(application.status) && (
                     <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => onWithdraw(application.id)}
                        disabled={isWithdrawing}
                     >
                        {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
                     </Button>
                )}
            </div>
        </CardContent>
    </Card>
);

const MyApplicationsPage: React.FC = () => {
    const queryClient = useQueryClient();

    const { data: applications, isLoading, error } = useQuery<Application[]>({
        queryKey: ['my-applications'],
        queryFn: getMyApplications,
    });

    const withdrawMutation = useMutation({
        mutationFn: withdrawApplication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-applications'] });
        },
        onError: (err: any) => {
            alert(`Error: ${err.response?.data?.error || 'Could not withdraw application.'}`);
        }
    });

    const handleWithdraw = (applicationId: string) => {
        if (window.confirm('Are you sure you want to withdraw this application? This action cannot be undone.')) {
            withdrawMutation.mutate(applicationId);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">My Applications</h1>
                <p className="text-neutral-500 mt-1">Track the status of all your job applications.</p>
            </div>
            {isLoading ? (
                 <div className="flex justify-center py-12"><Spinner size="lg" /></div>
            ) : error ? (
                 <p className="text-red-500">Failed to load applications.</p>
            ) : applications && applications.length > 0 ? (
                <div className="space-y-6">
                    {applications.map(app => (
                        <ApplicationCard 
                            key={app.id} 
                            application={app} 
                            onWithdraw={handleWithdraw}
                            isWithdrawing={withdrawMutation.isPending && withdrawMutation.variables === app.id}
                        />
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="text-center py-12">
                        <Briefcase className="mx-auto h-12 w-12 text-neutral-400" />
                        <h3 className="mt-2 text-xl font-semibold">No Applications Yet</h3>
                        <p className="mt-1 text-neutral-500">You haven't applied for any jobs yet. Start searching!</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default MyApplicationsPage;