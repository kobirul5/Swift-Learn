'use client';

import { useState, ReactNode } from 'react';
import DashboardSidebar from './admin/dashboard/DashboardSidebar';
import DashboardHeader from './admin/dashboard/DashboardHeader';

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-dark-50">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <DashboardHeader onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
