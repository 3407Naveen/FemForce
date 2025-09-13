'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bell, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function AlertsPanel() {
  const [alerts] = useState([
    {
      id: '1',
      type: 'Health',
      severity: 'high',
      title: 'Elevated Heart Rate Detected',
      message: 'Your heart rate has been above normal range for the past 15 minutes.',
      timestamp: '2 minutes ago',
      status: 'active',
      actions: ['Rest', 'Hydrate', 'Contact Medical']
    },
    {
      id: '2',
      type: 'Hydration',
      severity: 'medium',
      title: 'Hydration Level Low',
      message: 'Your hydration level has dropped below recommended threshold.',
      timestamp: '15 minutes ago',
      status: 'acknowledged',
      actions: ['Drink Water', 'Monitor']
    },
    {
      id: '3',
      type: 'Device',
      severity: 'low',
      title: 'Sensor Calibration Due',
      message: 'Your wearable device sensors need recalibration.',
      timestamp: '1 hour ago',
      status: 'resolved',
      actions: ['Calibrate Device']
    },
    {
      id: '4',
      type: 'Training',
      severity: 'medium',
      title: 'Recovery Time Needed',
      message: 'AI suggests 2-hour rest period before next training session.',
      timestamp: '3 hours ago',
      status: 'active',
      actions: ['Schedule Rest', 'Adjust Training']
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-950/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
      case 'low': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return <Badge variant="destructive">High</Badge>;
      case 'medium': return <Badge variant="default">Medium</Badge>;
      case 'low': return <Badge variant="secondary">Low</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'acknowledged': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alert Management</h1>
          <p className="text-muted-foreground">Monitor and manage health and system alerts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>{alerts.filter(a => a.status === 'active').length} Active Alerts</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {alerts.filter(a => a.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Acknowledged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {alerts.filter(a => a.status === 'acknowledged').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {alerts.filter(a => a.status === 'resolved').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-blue-500" />
            All Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 border-l-4 rounded-lg ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(alert.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium">{alert.title}</h3>
                        {getSeverityBadge(alert.severity)}
                        <Badge variant="outline" size="sm">
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.timestamp}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {alert.status === 'active' && (
                      <>
                        <Button size="sm" variant="outline">
                          Acknowledge
                        </Button>
                        <Button size="sm">
                          Resolve
                        </Button>
                      </>
                    )}
                    {alert.status === 'acknowledged' && (
                      <Button size="sm">
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
                
                {alert.actions.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs font-medium mb-2">Recommended Actions:</p>
                    <div className="flex flex-wrap gap-2">
                      {alert.actions.map((action, index) => (
                        <Button key={index} size="sm" variant="ghost" className="h-7 px-2">
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}