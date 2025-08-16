import { useAppointments } from '@/hooks/use-appointments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';
import { AppointmentCard } from './calendar/AppointmentCard';

export function DashboardScreen() {
  const { appointments } = useAppointments();

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const todayAppointments = appointments.filter(apt => apt.date === todayStr);
  const upcomingAppointments = appointments
    .filter(apt => apt.date > todayStr)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 3);

  const stats = {
    total: appointments.length,
    today: todayAppointments.length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen de tus citas y actividad reciente
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Citas</CardTitle>
            <Calendar size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Citas registradas en total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoy</CardTitle>
            <Clock size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.today}</div>
            <p className="text-xs text-muted-foreground">
              Citas programadas para hoy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Users size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Esperando confirmación
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
            <TrendingUp size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmed}</div>
            <p className="text-xs text-muted-foreground">
              Listas para realizarse
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Citas de Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            {todayAppointments.length === 0 ? (
              <div className="text-center py-6">
                <Clock size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No hay citas para hoy</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map(apt => (
                    <AppointmentCard key={apt.id} appointment={apt} compact />
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Citas</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-6">
                <Calendar size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No hay citas próximas</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingAppointments.map(apt => (
                  <div key={apt.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{apt.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {apt.clientName}
                        </div>
                      </div>
                      <div className="text-sm text-right">
                        <div>{new Date(apt.date).toLocaleDateString('es-ES')}</div>
                        <div className="text-muted-foreground">{apt.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}