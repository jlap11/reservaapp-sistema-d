import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home as House, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'dashboard', label: 'Inicio', icon: House },
    { id: 'calendar', label: 'Calendario', icon: Calendar },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <Card className="fixed bottom-0 left-0 right-0 md:hidden border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex items-center justify-around p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={cn(
                'flex flex-col items-center gap-1 p-3 h-auto',
                isActive && 'text-accent'
              )}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon size={20} />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}