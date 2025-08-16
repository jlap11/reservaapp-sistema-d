import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/sonner';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { DashboardScreen } from '@/components/DashboardScreen';
import { CalendarScreen } from '@/components/calendar/CalendarScreen';
import { ProfileScreen } from '@/components/profile/ProfileScreen';
import { Sidebar } from '@/components/Sidebar';
import { BottomNavigation } from '@/components/BottomNavigation';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  return <AppContent activeTab={activeTab} setActiveTab={setActiveTab} />;
}

function AppContent({ activeTab, setActiveTab }: { readonly activeTab: string; readonly setActiveTab: (tab: string) => void }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6 pb-20 md:pb-6">
          {renderScreen()}
        </div>
      </main>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <Toaster />
    </div>
  );
}

export default App;