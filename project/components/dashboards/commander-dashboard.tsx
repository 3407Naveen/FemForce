'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Command,
  Users,
  Shield,
  TrendingUp,
  AlertTriangle,
  Activity,
  BarChart3,
  Download
} from 'lucide-react';
import UnitReadinessChart from '@/components/charts/unit-readiness-chart';
import { useState } from 'react';

interface CommanderDashboardProps {
  activeView: string;
}

export default function CommanderDashboard({ activeView }: CommanderDashboardProps) {
  const [unitStats] = useState({
    totalPersonnel: 45,
    readyPersonnel: 38,
    avgReadiness: 84,
    activeAlerts: 5,
    criticalAlerts: 2,
    missionsActive: 3
  });

  const [unitBreakdown] = useState([
    { unit: 'Alpha Squad', personnel: 12, ready: 10, readiness: 87 },
    { unit: 'Bravo Squad', personnel: 15, ready: 13, readiness: 82 },
    { unit: 'Charlie Squad', personnel: 18, ready: 15, readiness: 86 }
  ]);

  const [recentIncidents] = useState([
    {
      id: '1',
      type: 'Health Alert',
      description: 'Elevated stress levels detected in Charlie Squad during training',
      severity: 'medium',
      timestamp: '2 hours ago',
      resolved: false
    },
    {
      id: '2',
      type: 'Equipment',
      description: 'Wearable device connectivity issues in Alpha Squad',
      severity: 'low',
      timestamp: '4 hours ago',
      resolved: true
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Command Center</h1>
          <p className="text-muted-foreground">Unit readiness and operational oversight</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Badge variant="outline" className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>All Systems Operational</span>
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Personnel</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unitStats.totalPersonnel}</div>
            <p className="text-xs text-muted-foreground">Under command</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unit Readiness</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unitStats.avgReadiness}%</div>
            <p className="text-xs text-muted-foreground">Average across all units</p>
            <Progress value={unitStats.avgReadiness} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unitStats.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {unitStats.criticalAlerts} critical
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missions Active</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unitStats.missionsActive}</div>
            <p className="text-xs text-muted-foreground">Ongoing operations</p>
          </CardContent>
        </Card>
      </div>

      {/* Unit Readiness Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UnitReadinessChart />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              Unit Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {unitBreakdown.map((unit, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{unit.unit}</span>
                  <Badge variant="outline">{unit.readiness}%</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {unit.ready}/{unit.personnel} personnel ready
                </div>
                <Progress value={unit.readiness} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
            Recent Incidents
          </CardTitle>
          <CardDescription>
            Latest health and operational incidents requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getSeverityColor(incident.severity)}`}></div>
                  <div>
                    <p className="font-medium">{incident.type}</p>
                    <p className="text-sm text-muted-foreground">{incident.description}</p>
                    <p className="text-xs text-muted-foreground">{incident.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={incident.resolved ? "secondary" : "outline"}>
                    {incident.resolved ? 'Resolved' : 'Active'}
                  </Badge>
                  {!incident.resolved && (
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Command className="h-5 w-5 mr-2 text-purple-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Personnel Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Unit Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Shield className="h-6 w-6" />
              <span>Mission Planning</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}