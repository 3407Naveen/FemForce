'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { day: 'Mon', fatigue: 15, stress: 20, readiness: 95 },
  { day: 'Tue', fatigue: 25, stress: 30, readiness: 85 },
  { day: 'Wed', fatigue: 20, stress: 25, readiness: 90 },
  { day: 'Thu', fatigue: 30, stress: 35, readiness: 80 },
  { day: 'Fri', fatigue: 18, stress: 22, readiness: 92 },
  { day: 'Sat', fatigue: 10, stress: 15, readiness: 98 },
  { day: 'Sun', fatigue: 12, stress: 18, readiness: 96 },
];

export default function TrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
          Weekly Performance Trends
        </CardTitle>
        <CardDescription>
          Fatigue, stress, and readiness patterns over the past 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorFatigue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorReadiness" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }}
                stroke="currentColor"
                opacity={0.5}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="currentColor"
                opacity={0.5}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="fatigue" 
                stackId="1" 
                stroke="#f97316" 
                fill="url(#colorFatigue)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="stress" 
                stackId="2" 
                stroke="#ef4444" 
                fill="url(#colorStress)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="readiness" 
                stackId="3" 
                stroke="#22c55e" 
                fill="url(#colorReadiness)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}