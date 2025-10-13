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
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const playbooks = [
  {
    id: 'PB-001',
    name: 'Isolate Endpoint on Critical Alert',
    trigger: 'Severity: Critical, Type: Malware',
    actions: ['Isolate Endpoint', 'Create Incident'],
    enabled: true,
  },
  {
    id: 'PB-002',
    name: 'Block C2 Domain on Threat Intel Match',
    trigger: 'Threat Intel: New C2 Domain',
    actions: ['Block Domain (Firewall)'],
    enabled: true,
  },
  {
    id: 'PB-003',
    name: 'Disable User on Brute Force Success',
    trigger: 'Type: Brute Force Success',
    actions: ['Disable User (AD)', 'End All Sessions'],
    enabled: false,
  },
];

export default function ResponsePage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Automated Response Playbooks</CardTitle>
            <CardDescription>
              Define and manage automated actions to respond to threats in real-time.
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Playbook
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Playbook Name</TableHead>
              <TableHead>Trigger Condition</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playbooks.map((playbook) => (
              <TableRow key={playbook.id}>
                <TableCell>
                  <Switch
                    checked={playbook.enabled}
                    aria-label="Toggle playbook status"
                  />
                </TableCell>
                <TableCell className="font-medium">{playbook.name}</TableCell>
                <TableCell>{playbook.trigger}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {playbook.actions.map((action) => (
                      <Badge key={action} variant="secondary">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
