import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useActiveConversation } from '@/src/hooks/chat/useActiveConversation';
import { ChatThread } from '@/src/api/chat/useGetChatList';

interface ActiveConversationProps {
    chatId: string;
    chats: ChatThread[];
    currentUser: TCommonResponseData;
    onBack?: () => void;
}

const ActiveConversation = ({ chatId, chats, currentUser, onBack }: ActiveConversationProps) => {
    const {
        messages,
        messagesLoading,
        inputText,
        setInputText,
        handleSend,
        recipient,
        messagesEndRef,
        sending
    } = useActiveConversation(chatId, chats, currentUser);

    return (
        <div className="flex flex-col h-full bg-[#24283b] w-full relative overflow-hidden">
            <ChatHeader recipient={recipient} onBack={onBack} />

            <MessageList
                messages={messages}
                messagesLoading={messagesLoading}
                currentUser={currentUser}
                recipientName={recipient.name}
                messagesEndRef={messagesEndRef as unknown as React.RefObject<HTMLDivElement>}
            />

            <MessageInput
                inputText={inputText}
                setInputText={setInputText}
                handleSend={handleSend}
                sending={sending}
            />
        </div>
    );
};

export default ActiveConversation;
