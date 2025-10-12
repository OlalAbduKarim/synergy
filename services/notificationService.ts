import api from './api';
import { Notification, NotificationType, ApplicationStatus } from '../types';

// Mapper from API (snake_case) to Frontend (camelCase)
const mapNotificationFromApi = (apiNotif: any): Notification => ({
    id: apiNotif.id,
    type: apiNotif.type as NotificationType,
    isRead: apiNotif.is_read,
    createdAt: apiNotif.created_at,
    payload: {
        jobTitle: apiNotif.payload.job_title,
        fromUser: apiNotif.payload.from_user,
        status: apiNotif.payload.status as ApplicationStatus,
        relatedId: apiNotif.payload.related_id,
    },
});

export const getNotifications = async (): Promise<Notification[]> => {
    const { data } = await api.get('/notifications');
    // The backend should return them sorted, but we can sort client-side as a fallback.
    return (data.map(mapNotificationFromApi)).sort((a: Notification, b: Notification) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

export const getUnreadCount = async (): Promise<{ count: number }> => {
    const { data } = await api.get('/notifications/unread/count');
    return data;
};

export const markAsRead = async (notificationId: string): Promise<void> => {
    await api.put(`/notifications/${notificationId}/read`);
};

export const markAllAsRead = async (): Promise<void> => {
    await api.put('/notifications/read-all');
};
