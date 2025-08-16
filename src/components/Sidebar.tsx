import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home as House, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: House },
    { id: 'calendar', label: 'Calendario', icon: Calendar },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <Card className="hidden md:flex flex-col w-64 h-screen border-r bg-card">
      <div className="p-6">
        <h2 className="text-xl font-bold">Reservas y Citas</h2>
        <p className="text-sm text-muted-foreground">Sistema de gestión</p>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3',
                  !isActive && 'hover:bg-accent/10'
                )}
                onClick={() => onTabChange(tab.id)}
              >
                <Icon size={20} />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </nav>
    </Card>
  );
}