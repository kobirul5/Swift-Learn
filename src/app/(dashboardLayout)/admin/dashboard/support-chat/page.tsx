/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetSingleStudentsQuery, useGetUserQuery } from "@/redux/api/userApi";
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useMemo, useState } from "react";
import ChatWindow from "@/components/modules/chat/ChatWindow";
import Image from "next/image";
import { FiCalendar, FiMail, FiMapPin, FiMessageSquare, FiPhone, FiSearch, FiUser, FiX } from "react-icons/fi";

export default function AdminChatPage() {
  const { data: currentUserData } = useGetUserQuery(undefined);
  const { messageList, fetchMessageList, isConnected, lastEvent } = useSocket();
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [detailsUserId, setDetailsUserId] = useState<string | null>(null);

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
  const selectedChatUser = useMemo(() => {
    if (!selectedRoom) return null;
    return selectedRoom.participants.find((p: any) => p._id !== currentUser?._id) || null;
  }, [selectedRoom, currentUser?._id]);

  const profileUserId = detailsUserId || selectedChatUser?._id || "";
  const { data: studentProfileData, isFetching: isFetchingStudentProfile } = useGetSingleStudentsQuery(
    { _id: profileUserId },
    { skip: !profileUserId }
  );

  const studentProfile = studentProfileData?.data || null;
  const profileToShow = studentProfile || selectedChatUser;
  const hasProfilePanelOpen = Boolean(detailsUserId);

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
                <div
                  key={room._id}
                  onClick={() => setSelectedRoom(room)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedRoom(room);
                    }
                  }}
                  role="button"
                  tabIndex={0}
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
                      <button
                        type="button"
                        className={`text-sm font-semibold truncate hover:underline ${
                          isActive ? "text-primary" : "text-dark-800"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailsUserId(otherUser?._id || null);
                          setSelectedRoom(room);
                        }}
                        title="View user details"
                      >
                        {otherUser?.name}
                      </button>
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
                </div>
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
        {selectedRoom && selectedChatUser ? (
          <ChatWindow
            receiverId={selectedChatUser?._id}
            receiverName={selectedChatUser?.name}
            receiverImage={selectedChatUser?.image}
            currentUser={currentUser}
            onReceiverNameClick={() => setDetailsUserId(selectedChatUser?._id || null)}
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

      {hasProfilePanelOpen && (
        <div className="w-80 border-l border-dark-200 bg-white flex flex-col shrink-0">
          <div className="p-4 border-b border-dark-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-dark-800">User Details</h3>
            <button
              type="button"
              onClick={() => setDetailsUserId(null)}
              className="p-1 rounded-md hover:bg-dark-100 text-dark-500"
              aria-label="Close user details"
            >
              <FiX size={16} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-dark-100 border border-dark-200 mb-3">
                <Image
                  src={profileToShow?.image || "/logo/logo.png"}
                  alt={profileToShow?.name || "User"}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-base font-semibold text-dark-800">{profileToShow?.name || "Unknown User"}</h4>
              <p className="text-xs text-dark-500 capitalize">{profileToShow?.role || "student"}</p>
            </div>

            {isFetchingStudentProfile && (
              <p className="text-xs text-dark-500 mb-4">Loading latest user details...</p>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <FiMail className="text-dark-400 mt-1 shrink-0" />
                <div>
                  <p className="text-dark-500 text-xs">Email</p>
                  <p className="text-dark-800 break-all">{profileToShow?.email || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FiPhone className="text-dark-400 mt-1 shrink-0" />
                <div>
                  <p className="text-dark-500 text-xs">Phone</p>
                  <p className="text-dark-800">{profileToShow?.phone || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FiMapPin className="text-dark-400 mt-1 shrink-0" />
                <div>
                  <p className="text-dark-500 text-xs">Address</p>
                  <p className="text-dark-800">{profileToShow?.address || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FiUser className="text-dark-400 mt-1 shrink-0" />
                <div>
                  <p className="text-dark-500 text-xs">Education</p>
                  <p className="text-dark-800">{profileToShow?.education || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FiCalendar className="text-dark-400 mt-1 shrink-0" />
                <div>
                  <p className="text-dark-500 text-xs">Joined</p>
                  <p className="text-dark-800">
                    {profileToShow?.createdAt ? new Date(profileToShow.createdAt).toLocaleDateString() : "Not available"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-dark-500 text-xs mb-1">Bio</p>
              <p className="text-sm text-dark-700 leading-6">
                {profileToShow?.bio || "No bio added yet."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
