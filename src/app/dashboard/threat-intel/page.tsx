import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { threatIntels } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ThreatIntelPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-headline text-3xl font-bold">
          Threat Intelligence Feed
        </h1>
        <p className="text-muted-foreground">
          Latest updates on APT groups, IOCs, and campaigns.
        </p>
      </div>
      <ScrollArea className="h-[75vh]">
        <div className="space-y-4 pr-4">
          {threatIntels.map((intel) => (
            <Card key={intel.id}>
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  {intel.title}
                </CardTitle>
                <CardDescription>
                  Published: {intel.publishedDate} | Source: {intel.source}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{intel.content}</p>
                <Separator className="my-4" />
                <div>
                    <h4 className="font-semibold mb-2">Indicators of Compromise (IOCs)</h4>
                    <div className="flex flex-wrap gap-2">
                        {intel.iocs.map((ioc, index) => (
                            <Badge key={index} variant="destructive" className='font-code'>{ioc.type}: {ioc.value}</Badge>
                        ))}
                    </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {intel.aptGroups.map((group, index) => (
                    <Badge key={index} variant="secondary">
                      {group}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
