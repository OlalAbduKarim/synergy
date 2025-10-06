
import React from 'react';
import { Briefcase, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const notifications = [
    { type: 'application_update', status: 'Interviewing', job: 'Senior Frontend Engineer', read: false },
    { type: 'new_message', from: 'John Smith @ Innovate Inc.', read: false },
    { type: 'new_match', job: 'Lead Product Designer', read: true },
    { type: 'application_update', status: 'Rejected', job: 'Data Scientist', read: true },
];

const NotificationIcon = ({ type, status }: { type: string, status?: string }) => {
    const iconClass = "h-6 w-6 mr-4";
    switch (type) {
        case 'application_update':
            return status === 'Rejected' 
                ? <XCircle className={`${iconClass} text-red-500`} /> 
                : <CheckCircle className={`${iconClass} text-green-500`} />;
        case 'new_message':
            return <MessageSquare className={`${iconClass} text-blue-500`} />;
        case 'new_match':
            return <Briefcase className={`${iconClass} text-purple-500`} />;
        default:
            return null;
    }
};

const NotificationText = ({ type, status, job, from }: any) => {
    switch (type) {
        case 'application_update':
            return <p>Your application for <strong>{job}</strong> has been updated to <strong>{status}</strong>.</p>;
        case 'new_message':
            return <p>You have a new message from <strong>{from}</strong>.</p>;
        case 'new_match':
            return <p>You have a new high-synergy job match: <strong>{job}</strong>.</p>;
        default:
            return null;
    }
};


const NotificationsPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Notifications</h1>
                <Button variant="ghost">Mark all as read</Button>
            </div>
            
            <Card>
                <CardContent className="divide-y divide-neutral-200 p-0">
                    {notifications.map((notif, index) => (
                        <div key={index} className={`p-4 flex items-center transition-colors ${!notif.read ? 'bg-primary-50' : 'hover:bg-neutral-50'}`}>
                            <NotificationIcon type={notif.type} status={notif.status} />
                            <div className="flex-grow">
                                <NotificationText {...notif} />
                                <p className="text-xs text-neutral-500 mt-1">2 hours ago</p>
                            </div>
                             {!notif.read && <div className="h-2 w-2 rounded-full bg-primary-500 ml-4"></div>}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default NotificationsPage;
