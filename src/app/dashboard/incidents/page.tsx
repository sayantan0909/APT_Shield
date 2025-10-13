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
import { incidents } from '@/lib/data';
import type { IncidentStatus, Severity } from '@/lib/types';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const getSeverityVariant = (severity: Severity) => {
  switch (severity) {
    case 'Critical': return 'critical';
    case 'High': return 'high';
    case 'Medium': return 'medium';
    case 'Low': return 'low';
    default: return 'secondary';
  }
};

const getStatusColor = (status: IncidentStatus) => {
    switch(status) {
        case 'New': return 'bg-blue-500';
        case 'In Progress': return 'bg-yellow-500';
        case 'Resolved': return 'bg-green-500';
        case 'Closed': return 'bg-gray-500';
        default: return 'bg-gray-500';
    }
}

export default function IncidentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Incident Management</CardTitle>
        <CardDescription>
          Track and manage security incidents from detection to resolution.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(incident.status)}`}></span>
                    <span>{incident.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getSeverityVariant(incident.severity)}>
                    {incident.severity}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {incident.description}
                </TableCell>
                <TableCell>{incident.assignedTo}</TableCell>
                <TableCell>
                  {new Date(incident.createdAt).toLocaleDateString()}
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
                      <DropdownMenuItem>Assign</DropdownMenuItem>
                      <DropdownMenuItem>Change Status</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
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
