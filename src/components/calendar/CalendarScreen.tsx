import { useState } from 'react';
import { CalendarView } from '@/types';
import { Button } from '@/components/ui/button';
import { Calendar, List, Clock } from 'lucide-react';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';

export function CalendarScreen() {
  const [view, setView] = useState<CalendarView>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calendario</h1>
        <div className="flex gap-2">
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('month')}
          >
            <Calendar size={16} className="mr-2" />
            Mes
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
          >
            <List size={16} className="mr-2" />
            Semana
          </Button>
          <Button
            variant={view === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('day')}
          >
            <Clock size={16} className="mr-2" />
            Día
          </Button>
        </div>
      </div>

      {view === 'month' && (
        <MonthView 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      )}
      
      {view === 'week' && (
        <WeekView 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      )}
      
      {view === 'day' && (
        <DayView 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      )}
    </div>
  );
}