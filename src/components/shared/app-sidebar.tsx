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

export function AppSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);

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
        </SidebarNav>
      </SidebarMain>
      <SidebarFooter>
        <Button variant="ghost" className="w-full justify-start gap-2" asChild>
          <Link href="/">
            <Shield className="h-4 w-4" />
            <span>Switch to Login</span>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
