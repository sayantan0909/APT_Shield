'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ClipboardList,
  FileSearch,
  GanttChartSquare,
  LayoutDashboard,
  Rss,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Zap,
  TestTube,
  Lock,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMain,
  SidebarNav,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarNavLink,
  SidebarFooter,
} from '@/components/shared/sidebar-layout';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => pathname.startsWith(path);

  const handleLogout = () => {
    // In a real app, this would clear session/local storage
    router.push('/');
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold text-primary">
            APT Shield
          </h1>
        </div>
      </SidebarHeader>
      <SidebarMain className="flex-grow">
        <SidebarNav>
          <SidebarNavHeader>
            <SidebarNavHeaderTitle>Analysis</SidebarNavHeaderTitle>
          </SidebarNavHeader>
          <SidebarNavLink href="/dashboard" active={pathname === '/dashboard'}>
            <LayoutDashboard />
            Dashboard
          </SidebarNavLink>
          <SidebarNavLink
            href="/dashboard/detection"
            active={isActive('/dashboard/detection')}
          >
            <ShieldAlert />
            Threat Detection
          </SidebarNavLink>
          <SidebarNavLink
            href="/dashboard/logs"
            active={isActive('/dashboard/logs')}
          >
            <FileSearch />
            Log Analysis
          </SidebarNavLink>
          <SidebarNavLink
            href="/dashboard/threat-hunting"
            active={isActive('/dashboard/threat-hunting')}
          >
            <TestTube />
            Threat Hunting
          </SidebarNavLink>
        </SidebarNav>

        <SidebarNav>
          <SidebarNavHeader>
            <SidebarNavHeaderTitle>Management</SidebarNavHeaderTitle>
          </SidebarNavHeader>
          <SidebarNavLink
            href="/dashboard/incidents"
            active={isActive('/dashboard/incidents')}
          >
            <ClipboardList />
            Incidents
          </SidebarNavLink>
          <SidebarNavLink
            href="/dashboard/rules"
            active={isActive('/dashboard/rules')}
          >
            <GanttChartSquare />
            Detection Rules
          </SidebarNavLink>
           <SidebarNavLink
            href="/dashboard/response"
            active={isActive('/dashboard/response')}
          >
            <Zap />
            Automated Response
          </SidebarNavLink>
          <SidebarNavLink
            href="/dashboard/threat-intel"
            active={isActive('/dashboard/threat-intel')}
          >
            <Rss />
            Threat Intel
          </SidebarNavLink>
           <SidebarNavLink
            href="/dashboard/security"
            active={isActive('/dashboard/security')}
          >
            <Lock />
            Security
          </SidebarNavLink>
        </SidebarNav>
      </SidebarMain>
      <SidebarFooter>
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
          <Shield className="h-4 w-4" />
          <span>Log Out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
