import {
  Search,
  LogIn,
  Anchor,
  Key,
  Move,
  DatabaseZap,
  Repeat,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const lifecycleStages = [
  { name: 'Recon', icon: Search, completed: true },
  { name: 'Intrusion', icon: LogIn, completed: true },
  { name: 'Foothold', icon: Anchor, completed: true },
  { name: 'Escalate', icon: Key, completed: true },
  { name: 'Movement', icon: Move, active: true },
  { name: 'Exfiltration', icon: DatabaseZap, completed: false },
  { name: 'Persistence', icon: Repeat, completed: false },
];

export function AptLifecycleTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">APT Attack Lifecycle</CardTitle>
        <CardDescription>
          Tracking current threat progression (INC-002)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {lifecycleStages.map((stage, index) => (
            <React.Fragment key={stage.name}>
              <div className="flex flex-col items-center gap-2 text-center">
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border-2',
                    stage.completed && 'border-primary bg-primary/20 text-primary',
                    stage.active && 'animate-pulse border-destructive bg-destructive/20 text-destructive',
                    !stage.completed && !stage.active && 'border-dashed border-muted-foreground/50 text-muted-foreground'
                  )}
                >
                  <stage.icon className="h-6 w-6" />
                </div>
                <p className={cn(
                  "text-xs font-medium",
                  (stage.completed || stage.active) ? "text-foreground" : "text-muted-foreground"
                )}>{stage.name}</p>
              </div>
              {index < lifecycleStages.length - 1 && (
                <div className="h-1 flex-1 bg-border" />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
