import { useState } from 'react';
import { useAppointments } from '@/hooks/use-appointments';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppointmentCard } from './AppointmentCard';
import { AppointmentDialog } from './AppointmentDialog';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatFullDate } from '@/lib/date-constants';

interface DayViewProps {
  readonly selectedDate: Date;
  readonly onDateSelect: (date: Date) => void;
}

export function DayView({ selectedDate, onDateSelect }: Readonly<DayViewProps>) {
  const { getAppointmentsByDate } = useAppointments();
  const [showDialog, setShowDialog] = useState(false);

  const dateStr = selectedDate.toISOString().split('T')[0];
  const appointments = getAppointmentsByDate(dateStr);
  
  const goToPrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    onDateSelect(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    onDateSelect(newDate);
  };

  const formatDate = formatFullDate;

  const sortedAppointments = [...appointments].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={goToPrevDay}>
            <ChevronLeft size={16} />
          </Button>
          <h2 className="text-xl font-semibold">
            {formatDate(selectedDate)}
          </h2>
          <Button variant="outline" size="sm" onClick={goToNextDay}>
            <ChevronRight size={16} />
          </Button>
        </div>
        <Button 
          onClick={() => setShowDialog(true)}
          className="gap-2"
        >
          <Plus size={16} />
          Nueva Cita
        </Button>
      </div>

      <Card className="p-6">
        {sortedAppointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-4">
              No hay citas programadas para este día
            </div>
            <Button onClick={() => setShowDialog(true)} variant="outline">
              <Plus size={16} className="mr-2" />
              Agregar primera cita
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">
              Citas del día ({sortedAppointments.length})
            </h3>
            <div className="space-y-3">
              {sortedAppointments.map(apt => (
                <AppointmentCard key={apt.id} appointment={apt} />
              ))}
            </div>
          </div>
        )}
      </Card>

      <AppointmentDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        selectedDate={selectedDate}
      />
    </div>
  );
}