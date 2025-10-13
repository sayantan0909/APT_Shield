'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LoaderCircle, Mail } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [email, setEmail] = useState('analyst@aptshield.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showResetLink, setShowResetLink] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetDialogOpen, setResetDialogOpen] = useState(false);


  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);
  
  useEffect(() => {
    if(email) {
      setResetEmail(email);
    }
  }, [email])

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    setShowResetLink(false);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Sign-in Successful',
        description: 'Redirecting to your dashboard...',
      });
      // The onAuthStateChanged listener in the layout will handle the redirect.
    } catch (error: any) {
        setLoading(false);
        switch (error.code) {
          case 'auth/user-not-found':
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
              setErrorMsg(creationError.message || 'Could not create a new account.');
            }
            break;
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            setErrorMsg('Invalid email or password. Please try again.');
            setShowResetLink(true);
            break;
          default:
            setErrorMsg(error.message || 'An unexpected error occurred.');
            break;
        }
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
        toast({
            variant: "destructive",
            title: "Email required",
            description: "Please enter your email address to reset your password.",
        })
        return;
    }
    setLoading(true);
    try {
        await sendPasswordResetEmail(auth, resetEmail);
        toast({
            title: "Password Reset Email Sent",
            description: `An email has been sent to ${resetEmail} with instructions to reset your password.`,
        });
        setResetDialogOpen(false);
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error",
            description: error.message || "Failed to send password reset email.",
        })
    } finally {
        setLoading(false);
    }
  }


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
            {errorMsg && (
                <Alert variant="destructive">
                    <AlertDescription>
                        {errorMsg}
                        {showResetLink && (
                           <Dialog open={isResetDialogOpen} onOpenChange={setResetDialogOpen}>
                             <DialogTrigger asChild>
                                <Button variant="link" className="p-0 pl-1 h-auto text-destructive-foreground underline">Forgot Password?</Button>
                             </DialogTrigger>
                             <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Reset Your Password</DialogTitle>
                                    <DialogDescription>
                                        Enter your email address below and we'll send you a link to reset your password.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-2">
                                    <Label htmlFor="reset-email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                            id="reset-email" 
                                            type="email"
                                            placeholder='you@example.com'
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button onClick={handlePasswordReset} disabled={loading}>
                                        {loading ? <LoaderCircle className="animate-spin"/> : "Send Reset Email"}
                                    </Button>
                                </DialogFooter>
                             </DialogContent>
                           </Dialog>
                        )}
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
