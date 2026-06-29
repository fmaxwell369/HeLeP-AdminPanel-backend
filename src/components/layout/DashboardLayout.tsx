// src/components/layout/DashboardLayout.tsx
import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto scrollbar-helep">
        <TopBar />
        <div className="px-8 pb-8">
          {children}
        </div>
      </main>
    </div>
  );
};