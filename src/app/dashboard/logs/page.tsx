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
import { logs } from '@/lib/data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FileDown, Search } from 'lucide-react';
import { LogSummary } from './components/log-summary';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LogsPage() {
  return (
    <div className="flex flex-col gap-8">
      <LogSummary />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Log Explorer</CardTitle>
          <CardDescription>
            Search and filter raw logs from all integrated sources.
          </CardDescription>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs by message, host, or source..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="sysmon">Sysmon</SelectItem>
                <SelectItem value="windows">Windows Event Log</SelectItem>
                <SelectItem value="network">Network Log</SelectItem>
                <SelectItem value="firewall">Firewall</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[40vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Host</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(log.timestamp).toISOString()}
                    </TableCell>
                    <TableCell>{log.source}</TableCell>
                    <TableCell>{log.host}</TableCell>
                    <TableCell className="font-code text-xs">
                      {log.message}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
