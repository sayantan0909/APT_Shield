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
import { Badge } from '@/components/ui/badge';
import { alerts } from '@/lib/data';
import type { Severity } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FileDown, Search, Lock } from 'lucide-react';
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

const getScoreColor = (score: number) => {
  if (score > 90) return 'text-destructive';
  if (score > 70) return 'text-warning-default';
  if (score > 50) return 'text-yellow-500';
  return 'text-green-500';
}

export default function DetectionPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Threat Detection Feed</CardTitle>
        <CardDescription>
          Detailed view of all security alerts. Filter and search for specific
          threats.
        </CardDescription>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by description, IOC, or source..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="All Severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[60vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severity</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Threat / MITRE ID</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Affected Systems</TableHead>
                <TableHead>Encrypted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <Badge variant={getSeverityVariant(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${getScoreColor(alert.anomalyScore)}`}>{alert.anomalyScore}</span>
                  </TableCell>
                  <TableCell>
                    {new Date(alert.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{alert.threatType}</div>
                    <div className="text-sm text-muted-foreground font-code">
                      {alert.mitreAttackId}
                    </div>
                  </TableCell>
                  <TableCell>{alert.source}</TableCell>
                  <TableCell>{alert.affectedSystems.join(', ')}</TableCell>
                  <TableCell>
                    {alert.isEncrypted && <Lock className="h-4 w-4 text-accent" />}
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
