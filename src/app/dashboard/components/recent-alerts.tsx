import { ArrowUpRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { alerts } from '@/lib/data';
import type { Severity } from '@/lib/types';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

const getSeverityVariant = (severity: Severity) => {
  switch (severity) {
    case 'Critical':
      return 'critical';
    case 'High':
      return 'high';
    case 'Medium':
      return 'medium';
    case 'Low':
      return 'low';
    default:
      return 'secondary';
  }
};

export function RecentAlerts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="font-headline">Recent Alerts</CardTitle>
          <CardDescription>
            Live feed of the latest detected threats.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/dashboard/detection">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="hidden md:table-cell">Source</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.slice(0, 6).map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <Badge variant={getSeverityVariant(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{alert.threatType}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {alert.description}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {alert.source}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
