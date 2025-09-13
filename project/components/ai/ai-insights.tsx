'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react';

interface AIInsightsProps {
  vitals: any;
  recommendations: any[];
}

export default function AIInsights({ vitals, recommendations }: AIInsightsProps) {
  const getInsights = () => {
    const insights = [];

    if (vitals.heartRate > 85) {
      insights.push({
        type: 'warning',
        message: 'Elevated heart rate detected. Consider rest or hydration.',
        confidence: 92
      });
    }

    if (vitals.stress > 50) {
      insights.push({
        type: 'alert',
        message: 'High stress levels may impact performance.',
        confidence: 87
      });
    }

    if (vitals.hydration < 70) {
      insights.push({
        type: 'critical',
        message: 'Dehydration risk detected. Immediate hydration recommended.',
        confidence: 95
      });
    }

    insights.push({
      type: 'info',
      message: 'Overall health patterns show good recovery trends.',
      confidence: 89
    });

    return insights;
  };

  const insights = getInsights();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'critical':
      case 'warning':
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-purple-500" />
          AI Health Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
            {getInsightIcon(insight.type)}
            <div className="flex-1">
              <p className="text-sm font-medium">{insight.message}</p>
              <div className="flex items-center mt-1">
                <Badge variant="outline" size="sm">
                  {insight.confidence}% confidence
                </Badge>
              </div>
            </div>
          </div>
        ))}

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Predictive Analysis
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Fatigue Risk (Next 4 hours)</span>
              <Badge variant="outline" className="text-yellow-600">Medium</Badge>
            </div>
            <div className="flex justify-between">
              <span>Performance Decline Risk</span>
              <Badge variant="outline" className="text-green-600">Low</Badge>
            </div>
            <div className="flex justify-between">
              <span>Recovery Time Needed</span>
              <span className="font-medium">6-8 hours</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}