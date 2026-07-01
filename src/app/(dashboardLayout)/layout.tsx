import { ReactNode } from 'react';
import StoreProvider from '@/redux/SroteProvider';
import DashboardShell from './DashboardShell';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <StoreProvider>
      <DashboardShell>
        {children}
      </DashboardShell>
    </StoreProvider>
  );
}