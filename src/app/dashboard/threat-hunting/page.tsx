'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlayCircle, HardDriveDownload, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { threatHuntingQueries } from '@/lib/data';

export default function ThreatHuntingPage() {
  const [query, setQuery] = useState('');

  const handleTemplateChange = (templateId: string) => {
    const selectedTemplate = threatHuntingQueries.find(q => q.id === templateId);
    if (selectedTemplate) {
      setQuery(selectedTemplate.query);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Threat Hunting Query Builder</CardTitle>
          <CardDescription>
            Construct and run custom queries against your log data, or use a pre-built template to start.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Select onValueChange={handleTemplateChange}>
              <SelectTrigger className="md:w-[250px]">
                <SelectValue placeholder="Load a template..." />
              </SelectTrigger>
              <SelectContent>
                {threatHuntingQueries.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="outline">
              <HardDriveDownload className="mr-2 h-4 w-4" />
              Save Query
            </Button>
            <Button>
              <PlayCircle className="mr-2 h-4 w-4" />
              Run Query
            </Button>
          </div>
          <Textarea
            placeholder="e.g., process.name:powershell.exe AND network.direction:outbound"
            className="min-h-[250px] font-code text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="font-headline text-2xl font-bold">Query Templates</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {threatHuntingQueries.map(template => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {template.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" size="sm" onClick={() => handleTemplateChange(template.id)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Load Template
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
