import { AptLifecycleTracker } from './components/apt-lifecycle-tracker';
import { DashboardStats } from './components/dashboard-stats';
import { RecentAlerts } from './components/recent-alerts';
import { ThreatTrendsChart } from './components/threat-trends-chart';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardStats />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ThreatTrendsChart />
        <AptLifecycleTracker />
      </div>
      <RecentAlerts />
    </div>
  );
}
