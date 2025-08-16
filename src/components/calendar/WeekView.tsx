import { useState } from 'react';
import { useAppointments } from '@/hooks/use-appointments';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppointmentCard } from './AppointmentCard';
import { AppointmentDialog } from './AppointmentDialog';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { WEEKDAY_NAMES, MONTH_NAMES_SHORT } from '@/lib/date-constants';

interface WeekViewProps {
  readonly selectedDate: Date;
  readonly onDateSelect: (date: Date) => void;
}

export function WeekView({ selectedDate, onDateSelect }: Readonly<WeekViewProps>) {
  const { getAppointmentsByWeek } = useAppointments();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDialogDate, setSelectedDialogDate] = useState<Date | null>(null);

  // Get start of week (Sunday)
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
  
  const appointments = getAppointmentsByWeek(startOfWeek);
  
  const dayNames = WEEKDAY_NAMES;
  
  const goToPrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    onDateSelect(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    onDateSelect(newDate);
  };

  const handleDayClick = (dayOffset: number) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + dayOffset);
    setSelectedDialogDate(date);
    setShowDialog(true);
  };

  const getDayAppointments = (dayOffset: number) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + dayOffset);
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const getWeekRange = () => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
  const monthNames = MONTH_NAMES_SHORT;
    
    return `${startOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]} - ${endOfWeek.getDate()} ${monthNames[endOfWeek.getMonth()]} ${endOfWeek.getFullYear()}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={goToPrevWeek}>
            <ChevronLeft size={16} />
          </Button>
          <h2 className="text-xl font-semibold">
            {getWeekRange()}
          </h2>
          <Button variant="outline" size="sm" onClick={goToNextWeek}>
            <ChevronRight size={16} />
          </Button>
        </div>
        <Button 
          onClick={() => {
            setSelectedDialogDate(new Date());
            setShowDialog(true);
          }}
          className="gap-2"
        >
          <Plus size={16} />
          Nueva Cita
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {Array.from({ length: 7 }, (_, i) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + i);
          const dayAppointments = getDayAppointments(i);
          const isToday = new Date().toDateString() === date.toDateString();
          
          return (
            <Card 
              key={i}
              className={`p-4 min-h-32 cursor-pointer hover:bg-accent/10 transition-colors ${
                isToday ? 'border-accent' : ''
              }`}
              onClick={() => handleDayClick(i)}
            >
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">{dayNames[i]}</div>
                  <div className={`text-lg font-semibold ${isToday ? 'text-accent' : ''}`}>
                    {date.getDate()}
                  </div>
                </div>
                <div className="space-y-2">
                  {dayAppointments.map(apt => (
                    <AppointmentCard key={apt.id} appointment={apt} compact />
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <AppointmentDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        selectedDate={selectedDialogDate}
      />
    </div>
  );
}