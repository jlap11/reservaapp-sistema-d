import { Appointment } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, Phone, Edit, Trash2 } from 'lucide-react';
import { useAppointments } from '@/hooks/use-appointments';

interface AppointmentCardProps {
  appointment: Appointment;
  compact?: boolean;
}

export function AppointmentCard({ appointment, compact = false }: AppointmentCardProps) {
  const { updateAppointment, deleteAppointment } = useAppointments();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-300';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300';
      case 'completed': return 'bg-blue-500/20 text-blue-300';
      case 'cancelled': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const handleStatusChange = (newStatus: Appointment['status']) => {
    updateAppointment(appointment.id, { status: newStatus });
  };

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      deleteAppointment(appointment.id);
    }
  };

  if (compact) {
    return (
      <div className="text-xs p-2 bg-accent/20 text-accent-foreground rounded space-y-1">
        <div className="font-medium">{appointment.time} - {appointment.title}</div>
        <div className="text-muted-foreground">{appointment.clientName}</div>
      </div>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-lg">{appointment.title}</h3>
            <Badge className={getStatusColor(appointment.status)}>
              {getStatusLabel(appointment.status)}
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{appointment.time} ({appointment.duration} min)</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{appointment.clientName}</span>
            </div>
            {appointment.clientPhone && (
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{appointment.clientPhone}</span>
              </div>
            )}
          </div>
          
          {appointment.description && (
            <p className="text-sm text-muted-foreground">{appointment.description}</p>
          )}
        </div>
        
        <div className="flex gap-2 ml-4">
          <Button variant="outline" size="sm">
            <Edit size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      {appointment.status === 'pending' && (
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleStatusChange('confirmed')}
          >
            Confirmar
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleStatusChange('cancelled')}
          >
            Cancelar
          </Button>
        </div>
      )}
      
      {appointment.status === 'confirmed' && (
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleStatusChange('completed')}
          >
            Marcar como completada
          </Button>
        </div>
      )}
    </Card>
  );
}