import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MessageSquare, CheckCircle, XCircle, BellOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { getNotifications, markAsRead, markAllAsRead } from '../../services/notificationService';
import { Notification, NotificationType, ApplicationStatus } from '../../types';

const NotificationIcon: React.FC<{ type: NotificationType, status?: ApplicationStatus }> = ({ type, status }) => {
    const iconClass = "h-6 w-6 mr-4 flex-shrink-0";
    switch (type) {
        case NotificationType.APPLICATION_UPDATE:
            return status === ApplicationStatus.REJECTED 
                ? <XCircle className={`${iconClass} text-red-500`} /> 
                : <CheckCircle className={`${iconClass} text-green-500`} />;
        case NotificationType.NEW_MESSAGE:
            return <MessageSquare className={`${iconClass} text-blue-500`} />;
        case NotificationType.NEW_MATCH:
            return <Briefcase className={`${iconClass} text-purple-500`} />;
        default:
            return null;
    }
};

const NotificationText: React.FC<{ notification: Notification }> = ({ notification }) => {
    const { type, payload } = notification;
    switch (type) {
        case NotificationType.APPLICATION_UPDATE:
            return <p>Your application for <strong>{payload.jobTitle}</strong> has been updated to <strong>{payload.status}</strong>.</p>;
        case NotificationType.NEW_MESSAGE:
            return <p>You have a new message from <strong>{payload.fromUser}</strong>.</p>;
        case NotificationType.NEW_MATCH:
            return <p>You have a new high-synergy job match: <strong>{payload.jobTitle}</strong>.</p>;
        default:
            return <p>You have a new notification.</p>;
    }
};

const NotificationsPage: React.FC = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: notifications, isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: getNotifications,
    });

    const markAsReadMutation = useMutation({
        mutationFn: markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unread-notifications-count'] });
        },
    });

    const markAllAsReadMutation = useMutation({
        mutationFn: markAllAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unread-notifications-count'] });
        },
    });

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.isRead) {
            markAsReadMutation.mutate(notification.id);
        }
        // Basic navigation logic
        if (notification.type === NotificationType.NEW_MESSAGE && notification.payload.relatedId) {
            navigate(`/messages?userId=${notification.payload.relatedId}`);
        } else if (notification.payload.relatedId) {
            navigate(`/jobs/${notification.payload.relatedId}`);
        }
    };
    
    const hasUnread = notifications?.some(n => !n.isRead);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Notifications</h1>
                <Button 
                    variant="ghost" 
                    onClick={() => markAllAsReadMutation.mutate()}
                    disabled={markAllAsReadMutation.isPending || !hasUnread}
                >
                    Mark all as read
                </Button>
            </div>
            
            <Card>
                <CardContent className="divide-y divide-neutral-200 p-0">
                    {isLoading ? (
                        <div className="flex justify-center p-8"><Spinner /></div>
                    ) : notifications && notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <div 
                                key={notif.id} 
                                className={`p-4 flex items-center transition-colors cursor-pointer ${!notif.isRead ? 'bg-primary-50' : 'hover:bg-neutral-50'}`}
                                onClick={() => handleNotificationClick(notif)}
                            >
                                <NotificationIcon type={notif.type} status={notif.payload.status} />
                                <div className="flex-grow">
                                    <NotificationText notification={notif} />
                                    <p className="text-xs text-neutral-500 mt-1">
                                        {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                    </p>
                                </div>
                                {!notif.isRead && <div className="h-2.5 w-2.5 rounded-full bg-primary-500 ml-4 flex-shrink-0"></div>}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-neutral-500">
                             <BellOff className="mx-auto h-12 w-12" />
                             <h3 className="mt-2 text-xl font-semibold">No Notifications</h3>
                             <p>You're all caught up!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default NotificationsPage;
