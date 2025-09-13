'use client';

import { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import { useAuth } from '@/components/providers/auth-provider';
import PersonnelDashboard from '@/components/dashboards/personnel-dashboard';
import MedicalDashboard from '@/components/dashboards/medical-dashboard';
import CommanderDashboard from '@/components/dashboards/commander-dashboard';
import ProfileSettings from '@/components/settings/profile-settings';

export default function MainLayout() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();

  const renderContent = () => {
    if (activeView === 'profile') {
      return <ProfileSettings />;
    }

    switch (user?.role) {
      case 'personnel':
        return <PersonnelDashboard activeView={activeView} />;
      case 'medical':
        return <MedicalDashboard activeView={activeView} />;
      case 'commander':
        return <CommanderDashboard activeView={activeView} />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}