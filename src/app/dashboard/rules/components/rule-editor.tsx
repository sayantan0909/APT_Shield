'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import type { Rule } from '@/lib/types';

type RuleEditorProps = {
  rule?: Rule;
  children: React.ReactNode;
};

export function RuleEditor({ rule, children }: RuleEditorProps) {
  const isEditing = !!rule;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className='font-headline'>
            {isEditing ? 'Edit Detection Rule' : 'Create New Detection Rule'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Modify the details of the existing rule.' : 'Define a new rule to detect suspicious activity.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Rule Name
            </Label>
            <Input id="name" defaultValue={rule?.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              defaultValue={rule?.description}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select defaultValue={rule?.category}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PowerShell">PowerShell</SelectItem>
                <SelectItem value="Credential Dumping">Credential Dumping</SelectItem>
                <SelectItem value="Lateral Movement">Lateral Movement</SelectItem>
                <SelectItem value="Data Exfiltration">Data Exfiltration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="query" className="text-right">
              Query Logic
            </Label>
            <Textarea
              id="query"
              defaultValue={rule?.query}
              className="col-span-3 font-code"
              placeholder='process.name:psexec.exe OR process.name:psexesvc.exe'
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mitre" className="text-right">
              MITRE ATT&CK ID
            </Label>
            <Input
              id="mitre"
              defaultValue={rule?.mitreAttackId}
              className="col-span-3"
              placeholder='e.g., T1003.001'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{isEditing ? 'Save Changes' : 'Create Rule'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
