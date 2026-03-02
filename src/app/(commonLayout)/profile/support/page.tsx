"use client";

import { useGetUserQuery, useGetAdminsQuery } from "@/redux/api/userApi";
import ChatWindow from "@/components/modules/chat/ChatWindow";
import { FiMessageSquare, FiHeadphones } from "react-icons/fi";

export default function StudentSupportPage() {
  const { data: userData } = useGetUserQuery(undefined);
  const { data: adminsData, isLoading: adminsLoading } = useGetAdminsQuery(undefined);

  const currentUser = userData?.data;
  const admin = adminsData?.data?.[0]; // Default to first admin

  if (!currentUser) return null;

  return (
    <div className="container mx-auto px-4 h-screen flex flex-col pt-24 pb-4 max-w-5xl">
      <div className="mb-4 shrink-0">
        <h1 className="text-3xl font-bold text-dark-800 flex items-center gap-3">
          <FiHeadphones className="text-primary" />
          Support Center
        </h1>
        <p className="text-dark-500 mt-2">
          Have questions or need help? Our support team is here for you.
        </p>
      </div>

      <div className="rounded-2xl  border-dark-200 overflow-hidden flex-1 gap-2 flex min-h-0">
        {/* Left Side: Info */}
        <div className="w-1/3 border border-dark-200 rounded-2xl p-8 hidden md:flex flex-col">
          <div className="mb-8">
            <h3 className="font-bold text-lg text-dark-800 mb-4">How we can help?</h3>
            <ul className="space-y-4 text-sm text-dark-600">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Course enrollment issues
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Payment and billing queries
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Technical support
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Account management
              </li>
            </ul>
          </div>

          <div className="mt-auto p-4 bg-primary-50 rounded-xl border border-primary-100">
            <p className="text-xs text-primary-700 font-medium">
              Average response time: <strong>Under 5 minutes</strong>
            </p>
          </div>
        </div>

        {/* Right Side: Chat */}
        <div className="flex-1 border-dark-200 bg-dark-50">
          {admin ? (
            <ChatWindow
              receiverId={admin._id}
              receiverName={admin.name}
              receiverImage={admin.image}
              currentUser={currentUser}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <FiMessageSquare size={32} className="text-primary-300" />
              </div>
              <h3 className="text-lg font-medium text-dark-800 mb-1">
                {adminsLoading ? "Loading support agents..." : "Support Offline"}
              </h3>
              <p className="text-sm text-dark-500 max-w-xs">
                {adminsLoading 
                  ? "Please wait a moment." 
                  : "No support agents are currently available. Please try again during business hours."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
