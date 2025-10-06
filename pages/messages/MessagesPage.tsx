
import React from 'react';
import { Search, Send, Paperclip } from 'lucide-react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const MessagesPage: React.FC = () => {
    return (
        <Card className="flex h-[calc(100vh-10rem)]">
            {/* Conversation List */}
            <div className="w-1/3 border-r border-neutral-200 flex flex-col">
                <div className="p-4 border-b border-neutral-200">
                    <h2 className="text-xl font-semibold">Messages</h2>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <Input placeholder="Search messages..." className="pl-10"/>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {/* Active Conversation */}
                    <div className="p-4 flex items-center border-b border-neutral-200 bg-primary-50 cursor-pointer">
                        <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">A</div>
                        <div className="ml-4 flex-grow">
                            <div className="flex justify-between">
                                <p className="font-semibold">Alice Johnson</p>
                                <p className="text-xs text-neutral-500">10:30 AM</p>
                            </div>
                            <p className="text-sm text-neutral-600 truncate">Thanks for reaching out! I'm very interested.</p>
                        </div>
                    </div>
                    {/* Other Conversations */}
                     <div className="p-4 flex items-center border-b border-neutral-200 hover:bg-neutral-50 cursor-pointer">
                        <div className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">B</div>
                        <div className="ml-4 flex-grow">
                            <div className="flex justify-between">
                                <p className="font-semibold">Bob Williams</p>
                                <p className="text-xs text-neutral-500">Yesterday</p>
                            </div>
                            <p className="text-sm text-neutral-600 truncate">I've reviewed your profile, looks great.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Chat Window */}
            <div className="w-2/3 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-neutral-200 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">A</div>
                    <div className="ml-4">
                        <p className="font-semibold">Alice Johnson</p>
                        <p className="text-sm text-neutral-500">RE: Senior Frontend Engineer</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-grow p-6 overflow-y-auto bg-neutral-50 space-y-4">
                     <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-lg max-w-lg">
                            Hi there! We were very impressed with your application for the Senior Frontend Engineer role.
                        </div>
                    </div>
                     <div className="flex justify-end">
                        <div className="bg-primary-600 text-white p-3 rounded-lg max-w-lg">
                            Thanks for reaching out! I'm very interested.
                        </div>
                    </div>
                </div>
                
                {/* Input */}
                <div className="p-4 bg-white border-t border-neutral-200">
                    <div className="relative flex items-center">
                        <Input placeholder="Type a message..." className="pr-24" />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                             <button className="text-neutral-500 hover:text-primary-600"><Paperclip size={20} /></button>
                             <button className="bg-primary-600 text-white p-2 rounded-md hover:bg-primary-700"><Send size={18} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default MessagesPage;
