import api from './api';
import { Conversation, Message } from '../types';

// Mappers from API (snake_case) to Frontend (camelCase)
const mapMessageFromApi = (apiMessage: any): Message => ({
  id: apiMessage.id,
  senderId: apiMessage.sender_id,
  receiverId: apiMessage.receiver_id,
  content: apiMessage.content,
  createdAt: apiMessage.created_at,
  isRead: apiMessage.is_read,
  applicationId: apiMessage.application_id,
});

const mapConversationFromApi = (apiConversation: any): Conversation => ({
  user: {
    id: apiConversation.user.id,
    fullName: apiConversation.user.full_name,
    role: apiConversation.user.user_type,
    companyName: apiConversation.user.company_name,
  },
  lastMessage: mapMessageFromApi(apiConversation.last_message),
  unreadCount: apiConversation.unread_count,
});

// API Functions
export const getConversations = async (): Promise<Conversation[]> => {
  const { data } = await api.get('/messages');
  return data.map(mapConversationFromApi);
};

export const getMessages = async (userId: string): Promise<Message[]> => {
  const { data } = await api.get(`/messages/${userId}`);
  return data.map(mapMessageFromApi);
};

export const sendMessage = async (receiverId: string, content: string): Promise<Message> => {
  const { data } = await api.post('/messages', {
    receiver_id: receiverId,
    content,
  });
  return mapMessageFromApi(data);
};

export const markMessagesAsRead = async (messageIds: string[]): Promise<void> => {
  await api.put('/messages/read', { message_ids: messageIds });
};
