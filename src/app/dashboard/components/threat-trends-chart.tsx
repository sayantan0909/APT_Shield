'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { time: '12 AM', critical: 1, high: 2, medium: 5, low: 10 },
  { time: '4 AM', critical: 2, high: 3, medium: 6, low: 12 },
  { time: '8 AM', critical: 5, high: 8, medium: 15, low: 20 },
  { time: '12 PM', critical: 3, high: 5, medium: 10, low: 18 },
  { time: '4 PM', critical: 8, high: 10, medium: 20, low: 25 },
  { time: '8 PM', critical: 12, high: 15, medium: 25, low: 30 },
];

const chartConfig = {
  critical: {
    label: 'Critical',
    color: 'hsl(var(--destructive))',
  },
  high: {
    label: 'High',
    color: 'hsl(var(--warning))',
  },
  medium: {
    label: 'Medium',
    color: 'hsl(var(--chart-4))',
  },
  low: {
    label: 'Low',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function ThreatTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Threat Trends</CardTitle>
        <CardDescription>Alerts over the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              width={30}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="critical" fill="var(--color-critical)" radius={4} />
            <Bar dataKey="high" fill="var(--color-high)" radius={4} />
            <Bar dataKey="medium" fill="var(--color-medium)" radius={4} />
            <Bar dataKey="low" fill="var(--color-low)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
