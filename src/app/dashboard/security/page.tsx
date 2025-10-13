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
  PlusCircle,
  Trash2,
} from 'lucide-react';
import { whitelistedIps } from '@/lib/data';
import { logs } from '@/lib/data';


function IpWhitelistManager() {
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
          <Input placeholder="IP Address or CIDR (e.g., 192.168.1.0/24)" />
          <Input placeholder="Description" />
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address / Range</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {whitelistedIps?.map((ip) => (
              <TableRow key={ip.id}>
                <TableCell className="font-code">{ip.ipAddress}</TableCell>
                <TableCell>{ip.description}</TableCell>
                <TableCell>{ip.expirationDate ? new Date(ip.expirationDate).toLocaleDateString() : 'Never'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
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
    return (
        <Card>
            <CardHeader>
                <CardTitle className='font-headline text-xl'>Audit Log</CardTitle>
                <CardDescription>Review of all actions taken by users in the system.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       <TableRow>
                            <TableCell>{new Date().toLocaleString()}</TableCell>
                            <TableCell className='font-medium'>analyst@aptshield.com</TableCell>
                            <TableCell>Rule Modified</TableCell>
                            <TableCell className='font-code text-xs'>Changed severity of "Detect Mimikatz" to Critical</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{new Date(Date.now() - 5*60000).toLocaleString()}</TableCell>
                            <TableCell className='font-medium'>admin@aptshield.com</TableCell>
                            <TableCell>User Login</TableCell>
                            <TableCell className='font-code text-xs'>Successful login from IP: 203.0.113.1</TableCell>
                        </TableRow>
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
            Backup &amp; Disaster Recovery
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
