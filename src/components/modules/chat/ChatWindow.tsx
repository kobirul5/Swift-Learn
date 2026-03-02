import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket';
import Image from 'next/image';
import { FiSend, FiX, FiPaperclip, FiMoreVertical } from 'react-icons/fi';

interface ChatWindowProps {
    receiverId: string;
    receiverName: string;
    receiverImage?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentUser: any;
    onClose?: () => void;
    onReceiverNameClick?: () => void;
}

export default function ChatWindow({
    receiverId,
    receiverName,
    receiverImage,
    currentUser,
    onClose,
    onReceiverNameClick
}: ChatWindowProps) {
    const { isConnected, messages, sendMessage, fetchChats } = useSocket();
    const [inputValue, setInputValue] = useState("");
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isConnected && receiverId) {
            fetchChats(receiverId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, receiverId]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const handleSend = () => {
        if (inputValue.trim()) {
            sendMessage(receiverId, inputValue);
            setInputValue("");
        }
    };

    return (
        <div className="flex flex-col h-full bg-white shadow-xl rounded-lg overflow-hidden border border-dark-200">
            {/* Header */}
            <div className="p-4 bg-primary text-white flex justify-between items-center shrink-0">
                <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/20 border border-white/20">
                        <Image
                            src={receiverImage || "/logo/logo.png"}
                            alt={receiverName}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={onReceiverNameClick}
                            className={`font-semibold text-sm text-left ${onReceiverNameClick ? "hover:underline cursor-pointer" : "cursor-default"}`}
                        >
                            {receiverName}
                        </button>
                        <p className="text-[10px] text-white/80">
                            {isConnected ? "Online" : "Connecting..."}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <FiMoreVertical size={18} />
                    </button>
                    {onClose && (
                        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                            <FiX size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-50/30 min-h-0"
            >
                {messages.map((msg, idx) => {
                    // Normalize IDs for comparison
                    const currentUserId = currentUser?.id || currentUser?._id;
                    const isMe = msg.senderId === currentUserId;
                    
                    console.log(`Msg ${idx}:`, { 
                        senderId: msg.senderId, 
                        currentUserId, 
                        isMe,
                        msg
                    });

                    return (
                        <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                                isMe 
                                ? 'bg-primary text-white rounded-br-none' 
                                : 'bg-white text-dark-800 border border-dark-100 rounded-bl-none'
                            }`}>
                                <p>{msg.message}</p>
                                <span className={`text-[9px] mt-1 block ${isMe ? 'text-white/70' : 'text-dark-400'}`}>
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-dark-100 shrink-0">
                <div className="flex items-center space-x-2 bg-dark-50 rounded-full px-4 py-2 focus-within:ring-2 ring-primary/20 transition-all">
                    <button className="text-dark-400 hover:text-primary transition-colors">
                        <FiPaperclip size={18} />
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm text-dark-800"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className={`p-1.5 rounded-full transition-all ${
                            inputValue.trim() 
                            ? 'bg-primary text-white scale-110' 
                            : 'text-dark-300'
                        }`}
                    >
                        <FiSend size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
