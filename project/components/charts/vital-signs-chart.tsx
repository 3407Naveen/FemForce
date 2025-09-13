'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

interface VitalSignsChartProps {
  vitals: {
    heartRate: number;
    oxygenSaturation: number;
    stress: number;
    temperature: number;
  };
}

export default function VitalSignsChart({ vitals }: VitalSignsChartProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const now = new Date();
    const newData = [...data.slice(-19), {
      time: now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }),
      heartRate: Math.round(vitals.heartRate),
      oxygenSaturation: Math.round(vitals.oxygenSaturation),
      stress: Math.round(vitals.stress),
      temperature: vitals.temperature
    }];
    
    setData(newData);
  }, [vitals]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-500" />
          Real-Time Vital Signs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
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
              <Legend />
              <Line 
                type="monotone" 
                dataKey="heartRate" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Heart Rate (BPM)"
              />
              <Line 
                type="monotone" 
                dataKey="oxygenSaturation" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 3 }}
                name="SpO₂ (%)"
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Stress Level (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}