import { useState } from 'react';
import { useAppointments } from '@/hooks/use-appointments';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppointmentDialog } from './AppointmentDialog';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTH_NAMES, WEEKDAY_NAMES_SHORT } from '@/lib/date-constants';

interface MonthViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function MonthView({ selectedDate, onDateSelect }: Readonly<MonthViewProps>) {
  const { getAppointmentsByMonth } = useAppointments();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDialogDate, setSelectedDialogDate] = useState<Date | null>(null);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  
  const appointments = getAppointmentsByMonth(year, month);
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = MONTH_NAMES;
  const dayNames = WEEKDAY_NAMES_SHORT;

  const goToPrevMonth = () => {
    const newDate = new Date(year, month - 1);
    onDateSelect(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(year, month + 1);
    onDateSelect(newDate);
  };

  const handleDayClick = (day: number) => {
    const date = new Date(year, month, day);
    setSelectedDialogDate(date);
    setShowDialog(true);
  };

  const getDayAppointments = (day: number) => {
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const renderCalendarDays = () => {
  const days: React.ReactElement[] = [];
    
    // Empty cells for days before first day of month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayAppointments = getDayAppointments(day);
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      
      days.push(
        <Card 
          key={day}
          className={`h-24 p-2 cursor-pointer hover:bg-accent/10 transition-colors ${
            isToday ? 'border-accent' : ''
          }`}
          onClick={() => handleDayClick(day)}
        >
          <div className="flex flex-col h-full">
            <div className={`text-sm font-medium ${isToday ? 'text-accent' : ''}`}>
              {day}
            </div>
            <div className="flex-1 mt-1 space-y-1">
              {dayAppointments.slice(0, 2).map(apt => (
                <div
                  key={apt.id}
                  className="text-xs p-1 bg-accent/20 text-accent-foreground rounded truncate"
                >
                  {apt.time} - {apt.title}
                </div>
              ))}
              {dayAppointments.length > 2 && (
                <div className="text-xs text-muted-foreground">
                  +{dayAppointments.length - 2} más
                </div>
              )}
            </div>
          </div>
        </Card>
      );
    }
    
    return days;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={goToPrevMonth}>
            <ChevronLeft size={16} />
          </Button>
          <h2 className="text-xl font-semibold">
            {monthNames[month]} {year}
          </h2>
          <Button variant="outline" size="sm" onClick={goToNextMonth}>
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

      <div className="grid grid-cols-7 gap-2">
        {dayNames.map(day => (
          <div key={day} className="p-2 text-sm font-medium text-center text-muted-foreground">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>

      <AppointmentDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        selectedDate={selectedDialogDate}
      />
    </div>
  );
}