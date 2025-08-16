import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Phone, Mail, Edit, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export function ProfileScreen() {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const updates = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
    };

    updateProfile(updates);
    setIsEditing(false);
    setIsLoading(false);
    toast.success('Perfil actualizado exitosamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        <Button variant="outline" onClick={logout} className="gap-2">
          <LogOut size={16} />
          Cerrar Sesión
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={user.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    disabled
                    className="opacity-50"
                  />
                  <p className="text-xs text-muted-foreground">
                    El email no se puede modificar
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={user.phone || ''}
                    placeholder="+1234567890"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Guardando...' : 'Guardar'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nombre completo</Label>
                  <div className="text-sm p-3 bg-muted rounded-md">{user.name}</div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="text-sm p-3 bg-muted rounded-md flex items-center gap-2">
                    <Mail size={16} />
                    {user.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <div className="text-sm p-3 bg-muted rounded-md flex items-center gap-2">
                    <Phone size={16} />
                    {user.phone || 'No especificado'}
                  </div>
                </div>
                <Button onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit size={16} />
                  Editar Perfil
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuración de Notificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Las notificaciones te ayudan a no olvidar tus citas programadas.
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Recordatorios de citas</div>
                  <div className="text-sm text-muted-foreground">
                    Recibe notificaciones 24h y 1h antes
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Activar
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Confirmaciones</div>
                  <div className="text-sm text-muted-foreground">
                    Notificaciones cuando se confirma una cita
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Activar
                </Button>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Las notificaciones se enviarán a través del navegador. 
                Asegúrate de permitir notificaciones en la configuración de tu dispositivo.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}