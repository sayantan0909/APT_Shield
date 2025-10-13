'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('analyst@aptshield.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Bypass authentication and redirect to dashboard
    toast({
      title: 'Sign-in Successful',
      description: 'Redirecting to your dashboard...',
    });
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <ShieldCheck className="h-16 w-16 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-bold text-primary">
            APT Shield
          </h1>
          <p className="text-muted-foreground">
            Advanced Persistent Threat Detection &amp; Monitoring
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter any credentials to access the demo dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorMsg && (
                <Alert variant="destructive">
                    <AlertDescription>
                        {errorMsg}
                    </AlertDescription>
                </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="analyst@aptshield.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button onClick={handleSignIn} disabled={loading} className="w-full">
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                'Sign In'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
