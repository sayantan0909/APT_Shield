import {
  AlertTriangle,
  ShieldAlert,
  GanttChartSquare,
  ClipboardList,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardStats } from '@/lib/data';

const stats = [
  {
    title: 'Total Alerts',
    value: dashboardStats.totalAlerts,
    icon: ShieldAlert,
    color: 'text-primary',
  },
  {
    title: 'Critical Alerts',
    value: dashboardStats.criticalAlerts,
    icon: AlertTriangle,
    color: 'text-destructive',
  },
  {
    title: 'Open Incidents',
    value: dashboardStats.openIncidents,
    icon: ClipboardList,
    color: 'text-warning',
  },
  {
    title: 'Active Rules',
    value: dashboardStats.rulesActive,
    icon: GanttChartSquare,
    color: 'text-accent',
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              in the last 24 hours
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
