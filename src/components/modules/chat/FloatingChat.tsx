"use client";

import { useState, useEffect } from "react";
import { FiMessageSquare, FiX, FiMinus } from "react-icons/fi";
import { useGetAdminsQuery, useGetUserQuery } from "@/redux/api/userApi";
import ChatWindow from "./ChatWindow";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { data: userData } = useGetUserQuery(undefined);
  const { data: adminsData } = useGetAdminsQuery(undefined, {
    skip: !isOpen,
  });

  const currentUser = userData?.data;
  const admin = adminsData?.data?.[0]; // Default to first admin for simplicity

  if (!currentUser || currentUser.role === "admin") return null;

  return (
    <div className="fixed bottom-6 right-6 z-9999">
      {isOpen ? (
        <div 
          className={`flex flex-col bg-white rounded-2xl shadow-2xl border border-dark-200 transition-all duration-300 origin-bottom-right ${
            isMinimized ? "h-14 w-64" : "h-[500px] w-[380px]"
          }`}
        >
          {/* Custom Header for Floating Chat */}
          <div className="p-4 bg-primary text-white rounded-t-2xl flex justify-between items-center shrink-0 cursor-pointer"
               onClick={() => isMinimized && setIsMinimized(false)}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <h3 className="font-semibold text-sm">Support Chat</h3>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }} 
                className="p-1 hover:bg-white/10 rounded transition-colors"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                <FiMinus size={18} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setIsMinimized(false);
                }} 
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && admin && (
            <div className="flex-1 overflow-hidden rounded-b-2xl">
              <ChatWindow
                receiverId={admin._id}
                receiverName={admin.name}
                receiverImage={admin.image}
                currentUser={currentUser}
              />
            </div>
          )}
          
          {!isMinimized && !admin && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-dark-500">
               <p className="text-sm">No support agents available right now. Please try again later.</p>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group relative"
        >
          <FiMessageSquare size={24} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-dark-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with Support
          </span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />
        </button>
      )}
    </div>
  );
}
