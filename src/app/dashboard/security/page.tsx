'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Shield,
  Bell,
  Clock,
  PlusCircle,
  MoreHorizontal,
  Trash2,
  Calendar as CalendarIcon,
} from 'lucide-react';
import {
    useCollection,
    useFirestore,
    useMemoFirebase,
    useUser,
    addDocumentNonBlocking,
    deleteDocumentNonBlocking,
} from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import type { AuditLog, WhitelistedIp } from '@/lib/types';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';


function IpWhitelistManager() {
  const firestore = useFirestore();
  const { data: ipList, isLoading } = useCollection<WhitelistedIp>(useMemoFirebase(() => collection(firestore, 'ip_whitelist'), [firestore]));
  const [newIp, setNewIp] = useState('');
  const [newIpDesc, setNewIpDesc] = useState('');
  const [newIpExpiry, setNewIpExpiry] = useState<Date | undefined>();

  const handleAddIp = () => {
    if (!newIp || !newIpDesc) return;
    const ipCollection = collection(firestore, 'ip_whitelist');
    addDocumentNonBlocking(ipCollection, {
        ipAddress: newIp,
        description: newIpDesc,
        expirationDate: newIpExpiry || null,
    });
    setNewIp('');
    setNewIpDesc('');
    setNewIpExpiry(undefined);
  };
  
  const handleDeleteIp = (id: string) => {
    const ipDoc = doc(firestore, 'ip_whitelist', id);
    deleteDocumentNonBlocking(ipDoc);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">
          IP Whitelist Management
        </CardTitle>
        <CardDescription>
          Control which IP addresses can access the SOC.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <Input placeholder="IP Address (e.g., 192.168.1.1)" value={newIp} onChange={(e) => setNewIp(e.target.value)} />
          <Input placeholder="Description" value={newIpDesc} onChange={(e) => setNewIpDesc(e.target.value)} />
          <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' className='w-full justify-start text-left font-normal'>
                    <CalendarIcon className='mr-2 h-4 w-4'/>
                    {newIpExpiry ? format(newIpExpiry, 'PPP') : <span>Set Expiry</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={newIpExpiry} onSelect={setNewIpExpiry} initialFocus/>
            </PopoverContent>
          </Popover>

          <Button onClick={handleAddIp} className='md:w-auto w-full'>
            <PlusCircle className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>}
            {ipList?.map((ip) => (
              <TableRow key={ip.id}>
                <TableCell className="font-code">{ip.ipAddress}</TableCell>
                <TableCell>{ip.description}</TableCell>
                <TableCell>{ip.expirationDate ? format(ip.expirationDate.toDate(), 'PPP') : 'Never'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteIp(ip.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function AuditLogViewer() {
    const firestore = useFirestore();
    const { user } = useUser();
    const auditLogQuery = useMemoFirebase(() => user ? collection(firestore, `users/${user.uid}/action_logs`) : null, [firestore, user]);
    const { data: logs, isLoading } = useCollection<AuditLog>(auditLogQuery);

    return (
        <Card>
            <CardHeader>
                <CardTitle className='font-headline text-xl'>Audit Log</CardTitle>
                <CardDescription>Review of all actions taken by the current user.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && <TableRow><TableCell colSpan={3}>Loading logs...</TableCell></TableRow>}
                        {logs?.map(log => (
                            <TableRow key={log.id}>
                                <TableCell>{log.timestamp ? format(log.timestamp.toDate(), 'Pp') : 'N/A'}</TableCell>
                                <TableCell className='font-medium'>{log.actionType}</TableCell>
                                <TableCell className='font-code text-xs'>{log.details}</TableCell>
                            </TableRow>
                        ))}
                         {!isLoading && logs?.length === 0 && <TableRow><TableCell colSpan={3}>No audit logs found for this user.</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default function SecurityPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">
          Security Settings
        </h1>
        <p className="text-muted-foreground">
          Manage system-wide security configurations and policies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">
              Authentication
            </CardTitle>
            <CardDescription>
              Strengthen account access security.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="2fa-switch" className="font-semibold">
                  Two-Factor Authentication (2FA)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Require a second verification step to sign in.
                </p>
              </div>
              <Switch id="2fa-switch" />
            </div>
            <Button>Manage Authentication Methods</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">
              Session Management
            </CardTitle>
            <CardDescription>
              Configure session timeout and other related policies.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">
                Session Timeout (minutes)
              </Label>
              <Input
                id="session-timeout"
                type="number"
                defaultValue="30"
                placeholder="e.g., 30"
              />
            </div>
            <Button>Apply Session Policy</Button>
          </CardContent>
        </Card>
      </div>

      <IpWhitelistManager />
      
      <AuditLogViewer />

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            Backup & Disaster Recovery
          </CardTitle>
          <CardDescription>
            Status of data backups and recovery points.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-semibold">Last Backup Status</p>
            <p className="text-sm text-green-500">Successful</p>
          </div>
          <div>
            <p className="font-semibold">Last Backup Time</p>
            <p className="text-sm text-muted-foreground">{new Date().toLocaleString()}</p>
          </div>
          <Button>Initiate Manual Backup</Button>
        </CardContent>
      </Card>
    </div>
  );
}
