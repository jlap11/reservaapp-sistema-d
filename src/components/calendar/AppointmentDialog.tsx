import { useState } from 'react';
import { useAppointments } from '@/hooks/use-appointments';
import { useAuth } from '@/hooks/use-auth';
import { Appointment } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | null;
  appointment?: Appointment;
}

export function AppointmentDialog({ open, onOpenChange, selectedDate, appointment }: AppointmentDialogProps) {
  const { addAppointment, updateAppointment } = useAppointments();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!appointment;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !selectedDate) return;

    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const appointmentData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: selectedDate.toISOString().split('T')[0],
      time: formData.get('time') as string,
      duration: parseInt(formData.get('duration') as string),
      clientName: formData.get('clientName') as string,
      clientEmail: formData.get('clientEmail') as string,
      clientPhone: formData.get('clientPhone') as string,
      status: (formData.get('status') as Appointment['status']) || 'pending',
      userId: user.id,
    };

    if (isEditing) {
      updateAppointment(appointment.id, appointmentData);
    } else {
      addAppointment(appointmentData);
    }

    setIsLoading(false);
    onOpenChange(false);
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Cita' : 'Nueva Cita'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título de la cita</Label>
              <Input
                id="title"
                name="title"
                placeholder="Ej: Corte de cabello"
                defaultValue={appointment?.title}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select name="status" defaultValue={appointment?.status || 'pending'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="confirmed">Confirmada</SelectItem>
                  <SelectItem value="completed">Completada</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Detalles adicionales sobre la cita"
              defaultValue={appointment?.description}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input
                id="time"
                name="time"
                type="time"
                defaultValue={appointment?.time}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duración (minutos)</Label>
              <Select name="duration" defaultValue={appointment?.duration?.toString() || '60'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                  <SelectItem value="90">1.5 horas</SelectItem>
                  <SelectItem value="120">2 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName">Nombre del cliente</Label>
            <Input
              id="clientName"
              name="clientName"
              placeholder="Nombre completo"
              defaultValue={appointment?.clientName}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Email (opcional)</Label>
              <Input
                id="clientEmail"
                name="clientEmail"
                type="email"
                placeholder="cliente@email.com"
                defaultValue={appointment?.clientEmail}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Teléfono (opcional)</Label>
              <Input
                id="clientPhone"
                name="clientPhone"
                type="tel"
                placeholder="+1234567890"
                defaultValue={appointment?.clientPhone}
              />
            </div>
          </div>

          {selectedDate && (
            <div className="text-sm text-muted-foreground">
              Fecha: {selectedDate.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Cita'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}