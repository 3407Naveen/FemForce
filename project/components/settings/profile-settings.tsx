'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/providers/auth-provider';
import { useTheme } from 'next-themes';
import {
  User,
  Shield,
  Bell,
  Moon,
  Sun,
  Smartphone,
  Globe,
  Lock,
  Download
} from 'lucide-react';
import { useState } from 'react';

export default function ProfileSettings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    health: true,
    alerts: true,
    reports: false,
    updates: true
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-2xl">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={user?.name || ''} readOnly />
            </div>
            
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ''} readOnly />
            </div>
            
            <div className="space-y-2">
              <Label>Rank</Label>
              <Input value={user?.rank || ''} readOnly />
            </div>
            
            <div className="space-y-2">
              <Label>Unit</Label>
              <Input value={user?.unit || ''} readOnly />
            </div>

            <div className="pt-4">
              <Badge variant="outline" className="flex items-center space-x-2 w-fit">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Active Status</span>
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-500" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Change Password</Label>
              <Button variant="outline" className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                Update Password
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add extra security</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Data Encryption</Label>
                  <p className="text-sm text-muted-foreground">Encrypt stored data</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Anonymous Analytics</Label>
                  <p className="text-sm text-muted-foreground">Help improve the app</p>
                </div>
                <Switch />
              </div>
            </div>

            <Separator />

            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export My Data
            </Button>
          </CardContent>
        </Card>

        {/* Application Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-purple-500" />
              App Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle theme</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Notification Preferences</Label>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Health Alerts</span>
                  <Switch 
                    checked={notifications.health}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, health: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Critical Alerts</span>
                  <Switch 
                    checked={notifications.alerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, alerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Weekly Reports</span>
                  <Switch 
                    checked={notifications.reports}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, reports: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">App Updates</span>
                  <Switch 
                    checked={notifications.updates}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, updates: checked }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Offline Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable PWA features</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-sync</Label>
                  <p className="text-sm text-muted-foreground">Sync when online</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 mr-2 text-orange-500" />
            Connected Devices
          </CardTitle>
          <CardDescription>
            Manage your wearable devices and IoT sensors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Fitness Tracker</h3>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Connected</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Heart rate, steps, sleep</p>
              <div className="mt-2">
                <div className="text-xs text-muted-foreground">Battery: 78%</div>
                <div className="text-xs text-muted-foreground">Last sync: 2 min ago</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Smart Watch</h3>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Connected</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Vitals, GPS, notifications</p>
              <div className="mt-2">
                <div className="text-xs text-muted-foreground">Battery: 45%</div>
                <div className="text-xs text-muted-foreground">Last sync: 1 min ago</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg border-dashed">
              <div className="text-center">
                <Button variant="outline" className="w-full">
                  Add Device
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Connect new wearable
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}