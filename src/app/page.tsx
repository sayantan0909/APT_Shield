import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <ShieldCheck className="h-16 w-16 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-bold text-primary">
            APT Shield
          </h1>
          <p className="text-muted-foreground">
            Advanced Persistent Threat Detection & Monitoring
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="analyst@aptshield.com"
                defaultValue="analyst@aptshield.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="••••••••" />
            </div>
            <Button asChild className="w-full">
              <Link href="/dashboard">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
