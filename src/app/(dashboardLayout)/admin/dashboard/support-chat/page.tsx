"use client";

import { useGetUserQuery } from "@/redux/api/userApi";
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import ChatWindow from "@/components/modules/chat/ChatWindow";
import Image from "next/image";
import { FiMessageSquare, FiSearch } from "react-icons/fi";

export default function AdminChatPage() {
  const { data: currentUserData } = useGetUserQuery(undefined);
  const { messageList, fetchMessageList, isConnected, lastEvent } = useSocket();
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  useEffect(() => {
    if (isConnected) {
      fetchMessageList();
    }
  }, [isConnected]);

  // Listen for new messages to update the list
  useEffect(() => {
    if (lastEvent?.event === 'message') {
      fetchMessageList();
    }
  }, [lastEvent, fetchMessageList]);

  // Find users with role admin to show as possible recipients for students, 
  // but for admin we should see a list of recent chats (rooms).
  
  const currentUser = currentUserData?.data;

  return (
    <div className="flex bg-white rounded-xl shadow-sm border border-dark-200 overflow-hidden h-[calc(100vh-160px)]">
      {/* Sidebar List */}
      <div className="w-80 border-r border-dark-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-dark-200">
          <h2 className="text-lg font-bold text-dark-800 mb-4">Messages</h2>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 bg-dark-50 border-none rounded-lg text-sm focus:ring-2 ring-primary/20 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {messageList.length > 0 ? (
            messageList.map((room) => {
              const otherUser = room.participants.find((p: any) => p._id !== currentUser?._id);
              const isActive = selectedRoom?._id === room._id;

              return (
                <button
                  key={room._id}
                  onClick={() => setSelectedRoom(room)}
                  className={`w-full p-4 flex items-center space-x-3 transition-colors text-left ${
                    isActive ? "bg-primary-50" : "hover:bg-dark-50"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-dark-100 border border-dark-200">
                      <Image
                        src={otherUser?.image || "/logo/logo.png"}
                        alt={otherUser?.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className={`text-sm font-semibold truncate ${isActive ? "text-primary" : "text-dark-800"}`}>
                        {otherUser?.name}
                      </h4>
                      <span className="text-[10px] text-dark-400">
                        {room.lastMessage 
                          ? new Date(room.lastMessage.createdAt).toLocaleDateString()
                          : ""
                        }
                      </span>
                    </div>
                    <p className="text-xs text-dark-500 truncate mt-0.5">
                      {room.lastMessage?.message || "No messages yet"}
                    </p>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-dark-400 p-8 text-center">
              <FiMessageSquare size={48} className="mb-4 opacity-20" />
              <p className="text-sm">No conversations yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-dark-50 flex flex-col">
        {selectedRoom ? (
          <ChatWindow
            receiverId={selectedRoom.participants.find((p: any) => p._id !== currentUser?._id)?._id}
            receiverName={selectedRoom.participants.find((p: any) => p._id !== currentUser?._id)?.name}
            receiverImage={selectedRoom.participants.find((p: any) => p._id !== currentUser?._id)?.image}
            currentUser={currentUser}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-dark-400 text-center p-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <FiMessageSquare size={32} className="text-primary-300" />
            </div>
            <h3 className="text-lg font-medium text-dark-800 mb-1">Select a Conversation</h3>
            <p className="text-sm max-w-xs">
              Choose a student from the list to start a real-time conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
