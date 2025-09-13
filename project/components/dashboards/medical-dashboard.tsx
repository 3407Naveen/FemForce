'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Stethoscope,
  Users,
  AlertTriangle,
  TrendingUp,
  Heart,
  Activity,
  UserCheck,
  Clock
} from 'lucide-react';
import { useState } from 'react';

interface MedicalDashboardProps {
  activeView: string;
}

export default function MedicalDashboard({ activeView }: MedicalDashboardProps) {
  const [personnelData] = useState([
    {
      id: '1',
      name: 'Sarah Martinez',
      rank: 'Sergeant',
      status: 'normal',
      lastCheck: '2 hours ago',
      alerts: 0,
      vitals: { hr: 72, spo2: 98, stress: 25 }
    },
    {
      id: '2',
      name: 'Jessica Kim',
      rank: 'Corporal',
      status: 'warning',
      lastCheck: '30 minutes ago',
      alerts: 2,
      vitals: { hr: 95, spo2: 94, stress: 65 }
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      rank: 'Lieutenant',
      status: 'critical',
      lastCheck: '5 minutes ago',
      alerts: 3,
      vitals: { hr: 110, spo2: 92, stress: 80 }
    }
  ]);

  const [medicalAlerts] = useState([
    {
      id: '1',
      personnelId: '3',
      name: 'Maria Rodriguez',
      type: 'Critical',
      message: 'Elevated heart rate and stress levels detected',
      timestamp: '2 minutes ago',
      status: 'active'
    },
    {
      id: '2',
      personnelId: '2',
      name: 'Jessica Kim',
      type: 'Warning',
      message: 'Low SpO₂ levels during training exercise',
      timestamp: '15 minutes ago',
      status: 'reviewing'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-500 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      case 'normal': return 'text-green-500 bg-green-50 border-green-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Medical Command Center</h1>
          <p className="text-muted-foreground">Monitor and manage personnel health data</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-2">
            <UserCheck className="h-4 w-4" />
            <span>{personnelData.length} Personnel Online</span>
          </Badge>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Personnel</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{personnelData.length}</div>
            <p className="text-xs text-muted-foreground">Active monitoring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicalAlerts.filter(a => a.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready Personnel</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{personnelData.filter(p => p.status === 'normal').length}</div>
            <p className="text-xs text-muted-foreground">Mission ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Readiness</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">Unit average</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Medical Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            Active Medical Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicalAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    alert.type === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{alert.name}</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={alert.type === 'Critical' ? 'destructive' : 'default'}>
                    {alert.type}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personnel Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Stethoscope className="h-5 w-5 mr-2 text-blue-500" />
            Personnel Health Status
          </CardTitle>
          <CardDescription>
            Real-time monitoring of all personnel under medical supervision
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {personnelData.map((person) => (
              <div key={person.id} className={`p-4 border rounded-lg ${getStatusColor(person.status)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-sm">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.rank}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs">HR: {person.vitals.hr}</span>
                        <span className="text-xs">SpO₂: {person.vitals.spo2}%</span>
                        <span className="text-xs">Stress: {person.vitals.stress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      {person.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {person.lastCheck}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}