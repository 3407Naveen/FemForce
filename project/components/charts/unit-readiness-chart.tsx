'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield } from 'lucide-react';

const readinessData = [
  { unit: 'Alpha', ready: 10, total: 12, percentage: 83 },
  { unit: 'Bravo', ready: 13, total: 15, percentage: 87 },
  { unit: 'Charlie', ready: 15, total: 18, percentage: 83 },
  { unit: 'Delta', ready: 8, total: 10, percentage: 80 },
];

const statusData = [
  { name: 'Ready', value: 38, color: '#22c55e' },
  { name: 'Warning', value: 5, color: '#f59e0b' },
  { name: 'Critical', value: 2, color: '#ef4444' },
];

export default function UnitReadinessChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-green-500" />
          Unit Readiness Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={readinessData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="unit" 
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
                <Bar 
                  dataKey="percentage" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}