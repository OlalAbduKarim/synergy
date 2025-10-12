import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Send, Paperclip, User, MessageSquare } from 'lucide-react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { getConversations, getMessages, sendMessage, markMessagesAsRead } from '../../services/messageService';
import { Conversation, Message } from '../../types';
import useAuth from '../../hooks/useAuth';
import { format, isToday, isYesterday } from 'date-fns';

const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return format(date, 'p');
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM d');
};

const MessagesPage: React.FC = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [messageContent, setMessageContent] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { data: conversations, isLoading: isLoadingConversations } = useQuery<Conversation[]>({
        queryKey: ['conversations'],
        queryFn: getConversations,
        refetchInterval: 15000, // Poll every 15 seconds
    });

    const { data: messages, isLoading: isLoadingMessages } = useQuery<Message[]>({
        queryKey: ['messages', selectedUserId],
        queryFn: () => getMessages(selectedUserId!),
        enabled: !!selectedUserId,
        refetchInterval: 15000,
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    const markAsReadMutation = useMutation({
        mutationFn: markMessagesAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        }
    });
    
    useEffect(() => {
        if (messages && user) {
            const unreadMessageIds = messages
                .filter(msg => !msg.isRead && msg.receiverId === user.id)
                .map(msg => msg.id);
            
            if (unreadMessageIds.length > 0) {
                markAsReadMutation.mutate(unreadMessageIds);
            }
        }
    }, [messages, user, markAsReadMutation]);


    const sendMessageMutation = useMutation({
        mutationFn: () => sendMessage(selectedUserId!, messageContent),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['messages', selectedUserId] });
            const previousMessages = queryClient.getQueryData<Message[]>(['messages', selectedUserId]);
            
            const optimisticMessage: Message = {
                id: `temp-${Date.now()}`,
                senderId: user!.id,
                receiverId: selectedUserId!,
                content: messageContent,
                createdAt: new Date().toISOString(),
                isRead: false,
            };

            queryClient.setQueryData<Message[]>(
                ['messages', selectedUserId],
                (old) => [...(old || []), optimisticMessage]
            );

            setMessageContent('');
            return { previousMessages };
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(['messages', selectedUserId], context?.previousMessages);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', selectedUserId] });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        },
    });

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageContent.trim() && selectedUserId) {
            sendMessageMutation.mutate();
        }
    };

    const activeConversation = conversations?.find(c => c.user.id === selectedUserId);

    return (
        <Card className="flex h-[calc(100vh-10rem)]">
            {/* Conversation List */}
            <div className="w-1/3 border-r border-neutral-200 flex flex-col">
                <div className="p-4 border-b border-neutral-200">
                    <h2 className="text-xl font-semibold">Messages</h2>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {isLoadingConversations ? <div className="flex justify-center p-8"><Spinner /></div> : (
                        conversations?.map(convo => (
                            <div key={convo.user.id} onClick={() => setSelectedUserId(convo.user.id)} className={`p-4 flex items-center border-b border-neutral-200 cursor-pointer ${selectedUserId === convo.user.id ? 'bg-primary-50' : 'hover:bg-neutral-50'}`}>
                                <div className="relative h-12 w-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">
                                    {convo.user.fullName.charAt(0)}
                                </div>
                                <div className="ml-4 flex-grow overflow-hidden">
                                    <div className="flex justify-between">
                                        <p className="font-semibold truncate">{convo.user.fullName}</p>
                                        <p className="text-xs text-neutral-500 flex-shrink-0">{formatTimestamp(convo.lastMessage.createdAt)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-neutral-600 truncate">{convo.lastMessage.content}</p>
                                        {convo.unreadCount > 0 && <span className="ml-2 flex-shrink-0 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{convo.unreadCount}</span>}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Active Chat Window */}
            <div className="w-2/3 flex flex-col">
                {!selectedUserId ? (
                    <div className="flex flex-col items-center justify-center h-full text-neutral-500">
                        <MessageSquare size={48} />
                        <p className="mt-4 text-lg">Select a conversation to start chatting</p>
                    </div>
                ) : (
                    <>
                        <div className="p-4 border-b border-neutral-200 flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">{activeConversation?.user.fullName.charAt(0)}</div>
                            <div className="ml-4">
                                <p className="font-semibold">{activeConversation?.user.fullName}</p>
                                <p className="text-sm text-neutral-500">{activeConversation?.user.companyName || activeConversation?.user.role}</p>
                            </div>
                        </div>

                        <div className="flex-grow p-6 overflow-y-auto bg-neutral-50 space-y-4">
                            {isLoadingMessages ? <div className="flex justify-center"><Spinner /></div> : (
                                messages?.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-3 rounded-lg max-w-lg ${msg.senderId === user?.id ? 'bg-primary-600 text-white' : 'bg-white'}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        
                        <div className="p-4 bg-white border-t border-neutral-200">
                            <form onSubmit={handleSendMessage} className="relative flex items-center">
                                <Input placeholder="Type a message..." value={messageContent} onChange={(e) => setMessageContent(e.target.value)} className="pr-12" />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <Button type="submit" size="sm" disabled={sendMessageMutation.isPending || !messageContent.trim()}>
                                        <Send size={16} />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};

export default MessagesPage;
