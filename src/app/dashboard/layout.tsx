'use client';

import { AppSidebar } from '@/components/shared/app-sidebar';
import { Header } from '@/components/shared/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
      <AppSidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 bg-background p-4 md:p-6 lg:p-8 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
