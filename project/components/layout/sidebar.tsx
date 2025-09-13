'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/auth-provider';
import {
  Shield,
  Activity,
  Heart,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Bell,
  UserCircle,
  Stethoscope,
  Command
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ activeView, setActiveView, collapsed, setCollapsed }: SidebarProps) {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Activity },
      { id: 'profile', label: 'Profile', icon: UserCircle },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    switch (user?.role) {
      case 'personnel':
        return [
          { id: 'dashboard', label: 'My Health', icon: Heart },
          { id: 'alerts', label: 'Alerts', icon: Bell },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'profile', label: 'Profile', icon: UserCircle },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'medical':
        return [
          { id: 'dashboard', label: 'Medical Hub', icon: Stethoscope },
          { id: 'patients', label: 'Personnel', icon: Users },
          { id: 'alerts', label: 'Medical Alerts', icon: Bell },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'profile', label: 'Profile', icon: UserCircle },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'commander':
        return [
          { id: 'dashboard', label: 'Command Center', icon: Command },
          { id: 'personnel', label: 'All Personnel', icon: Users },
          { id: 'analytics', label: 'Unit Analytics', icon: BarChart3 },
          { id: 'alerts', label: 'System Alerts', icon: Bell },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'profile', label: 'Profile', icon: UserCircle },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-lg font-bold">FemForce</h1>
                <p className="text-xs text-muted-foreground">Defense Health</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!collapsed && user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.rank}</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start ${collapsed ? 'px-2' : 'px-3'} h-10`}
                onClick={() => setActiveView(item.id)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Status Indicator */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center justify-between mb-2">
              <span>System Status</span>
              <span className="text-green-500">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Sync</span>
              <span>Just now</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}