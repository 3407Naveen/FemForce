'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import VitalSignsChart from '@/components/charts/vital-signs-chart';
import TrendChart from '@/components/charts/trend-chart';
import AIInsights from '@/components/ai/ai-insights';
import AlertsPanel from '@/components/alerts/alerts-panel';
import {
  Heart,
  Activity,
  Droplets,
  Battery,
  Brain,
  Shield,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface PersonnelDashboardProps {
  activeView: string;
}

export default function PersonnelDashboard({ activeView }: PersonnelDashboardProps) {
  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: { systolic: 120, diastolic: 80 },
    oxygenSaturation: 98,
    hydration: 85,
    fatigue: 25,
    stress: 35,
    temperature: 98.6
  });

  const [recommendations, setRecommendations] = useState([
    {
      id: '1',
      type: 'hydration',
      message: 'Increase water intake by 16oz based on current activity level',
      priority: 'medium',
      icon: Droplets
    },
    {
      id: '2',
      type: 'rest',
      message: '7.5 hours of sleep recommended tonight for optimal recovery',
      priority: 'high',
      icon: Battery
    },
    {
      id: '3',
      type: 'stress',
      message: 'Consider 10-minute breathing exercise to reduce stress levels',
      priority: 'low',
      icon: Brain
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        ...prev,
        heartRate: prev.heartRate + (Math.random() - 0.5) * 4,
        oxygenSaturation: Math.max(95, Math.min(100, prev.oxygenSaturation + (Math.random() - 0.5) * 0.5)),
        hydration: Math.max(0, Math.min(100, prev.hydration + (Math.random() - 0.5) * 2)),
        stress: Math.max(0, Math.min(100, prev.stress + (Math.random() - 0.5) * 3))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getVitalStatus = (vital: string, value: number) => {
    switch (vital) {
      case 'heartRate':
        if (value < 60 || value > 100) return 'warning';
        return 'normal';
      case 'oxygenSaturation':
        if (value < 95) return 'critical';
        if (value < 97) return 'warning';
        return 'normal';
      case 'hydration':
        if (value < 60) return 'critical';
        if (value < 80) return 'warning';
        return 'normal';
      case 'stress':
        if (value > 70) return 'critical';
        if (value > 50) return 'warning';
        return 'normal';
      default:
        return 'normal';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'normal': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (activeView === 'alerts') {
    return <AlertsPanel />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Personal Health Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and AI-powered insights</p>
        </div>
        <Badge variant="outline" className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Monitoring</span>
        </Badge>
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(vitals.heartRate)}</div>
            <p className="text-xs text-muted-foreground">BPM</p>
            <div className="flex items-center mt-2">
              <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(getVitalStatus('heartRate', vitals.heartRate))}`}></div>
              <span className="text-xs capitalize">{getVitalStatus('heartRate', vitals.heartRate)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SpO₂</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vitals.oxygenSaturation.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Oxygen Saturation</p>
            <div className="flex items-center mt-2">
              <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(getVitalStatus('oxygenSaturation', vitals.oxygenSaturation))}`}></div>
              <span className="text-xs capitalize">{getVitalStatus('oxygenSaturation', vitals.oxygenSaturation)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hydration</CardTitle>
            <Droplets className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(vitals.hydration)}%</div>
            <p className="text-xs text-muted-foreground">Hydration Level</p>
            <Progress value={vitals.hydration} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
            <Brain className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(vitals.stress)}%</div>
            <p className="text-xs text-muted-foreground">Stress Index</p>
            <div className="flex items-center mt-2">
              <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(getVitalStatus('stress', vitals.stress))}`}></div>
              <span className="text-xs capitalize">{getVitalStatus('stress', vitals.stress)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <VitalSignsChart vitals={vitals} />
          <TrendChart />
        </div>
        
        <div className="space-y-6">
          <AIInsights vitals={vitals} recommendations={recommendations} />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                Readiness Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">87%</div>
                <p className="text-sm text-muted-foreground mb-4">Mission Ready</p>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between text-sm">
                    <span>Physical</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Mental</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Recovery</span>
                    <span className="font-medium">84%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            AI Recommendations
          </CardTitle>
          <CardDescription>
            Personalized suggestions based on your current health data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => {
              const IconComponent = rec.icon;
              return (
                <div key={rec.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className={`p-2 rounded-full ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-600' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{rec.message}</p>
                    <Badge variant="outline" size="sm" className="mt-1">
                      {rec.priority} priority
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}