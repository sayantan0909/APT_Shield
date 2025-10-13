'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [email, setEmail] = useState('analyst@aptshield.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Sign-in Successful',
        description: 'Redirecting to your dashboard...',
      });
      // The onAuthStateChanged listener in the layout will handle the redirect.
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // If user does not exist, create a new account
        toast({
          title: 'First-time user?',
          description: 'Creating a new account for you...',
        });
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          toast({
            title: 'Account Created & Signed In',
            description: 'Your new account has been created successfully. Welcome!',
          });
          // After creation, onAuthStateChanged should trigger and redirect.
        } catch (creationError: any) {
          toast({
            variant: 'destructive',
            title: 'Account Creation Failed',
            description: creationError.message || 'Could not create a new account.',
          });
          setLoading(false);
        }
      } else {
        // Handle other sign-in errors like invalid credentials
        toast({
          variant: 'destructive',
          title: 'Authentication Failed',
          description: error.message || 'Please check your credentials and try again.',
        });
        setLoading(false);
      }
    }
    // No need to set loading to false on success, as the component will unmount.
  };

  // If user data is loading, or user is already logged in, show a loading state.
  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <LoaderCircle className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    );
  }

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
              Enter your credentials to access the dashboard. A new account will be created if one does not exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
