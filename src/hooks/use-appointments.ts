import { useKV } from './use-kv';
import { Appointment } from '@/types';
import { toast } from 'sonner';

export function useAppointments() {
  const [appointments, setAppointments] = useKV<Appointment[]>('appointments', []);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };

  setAppointments(current => [ ...(current ?? []), newAppointment]);
    toast.success('Cita creada exitosamente');
    return newAppointment;
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
  setAppointments(current => (current ?? []).map(apt => apt.id === id ? { ...apt, ...updates } : apt));
    toast.success('Cita actualizada');
  };

  const deleteAppointment = (id: string) => {
  setAppointments(current => (current ?? []).filter(apt => apt.id !== id));
    toast.success('Cita eliminada');
  };

  const getAppointmentsByDate = (date: string) => {
  return (appointments ?? []).filter(apt => apt.date === date);
  };

  const getAppointmentsByWeek = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
  return (appointments ?? []).filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= startDate && aptDate <= endDate;
    });
  };

  const getAppointmentsByMonth = (year: number, month: number) => {
  return (appointments ?? []).filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.getFullYear() === year && aptDate.getMonth() === month;
    });
  };

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate,
    getAppointmentsByWeek,
    getAppointmentsByMonth,
  };
}