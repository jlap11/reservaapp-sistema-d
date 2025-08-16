# Reservas y Citas - Sistema de Gestión de Citas

Una aplicación web móvil moderna para gestionar reservas y citas, diseñada para negocios como salones de belleza, consultorios médicos y entrenadores personales.

**Experience Qualities**:
1. **Profesional**: Interfaz limpia y confiable que transmite seriedad empresarial
2. **Eficiente**: Navegación rápida e intuitiva para gestionar citas sin fricción  
3. **Accesible**: Diseño oscuro por defecto con excelente contraste y usabilidad móvil

**Complexity Level**: Light Application (multiple features with basic state)
- Maneja múltiples vistas (calendario, perfil, autenticación) con estado persistente para citas y preferencias del usuario

## Essential Features

### Autenticación de Usuario
- **Functionality**: Login/registro seguro con JWT
- **Purpose**: Acceso protegido y gestión personalizada de citas
- **Trigger**: Pantalla de bienvenida al abrir la app
- **Progression**: Splash screen → Login form → Dashboard principal
- **Success criteria**: Token JWT válido almacenado, redirección exitosa

### Calendario de Citas
- **Functionality**: Vista mensual/semanal/diaria con CRUD de citas
- **Purpose**: Visualización clara y gestión completa del horario
- **Trigger**: Navegación desde dashboard o tap en fecha
- **Progression**: Seleccionar vista → Ver citas existentes → Crear/editar → Confirmar
- **Success criteria**: Citas persisten correctamente, sincronización con backend

### Notificaciones de Recordatorio
- **Functionality**: Alertas automáticas antes de citas programadas
- **Purpose**: Reducir ausencias y mejorar experiencia del cliente
- **Trigger**: 24h y 1h antes de cada cita
- **Progression**: Cita creada → Notificación programada → Alerta mostrada
- **Success criteria**: Notificaciones llegan puntualmente, pueden ser deshabilitadas

### Gestión de Perfil
- **Functionality**: Información personal, foto de perfil, preferencias
- **Purpose**: Personalización y datos de contacto actualizados
- **Trigger**: Acceso desde menú principal
- **Progression**: Ver perfil → Editar campos → Guardar cambios → Confirmación
- **Success criteria**: Datos se actualizan en backend, foto se sube correctamente

## Edge Case Handling

- **Sin conexión**: Modo offline con sincronización automática al reconectar
- **Errores de API**: Mensajes informativos con opciones de reintento
- **Citas conflictivas**: Validación de horarios solapados con sugerencias alternativas
- **Sesión expirada**: Renovación automática de tokens o redirect a login
- **Datos incompletos**: Validación en tiempo real con mensajes guía

## Design Direction

La interfaz debe sentirse moderna y profesional, similar a aplicaciones empresariales premium. Modo oscuro exclusivo que proyecte sofisticación y reduzca fatiga visual durante uso prolongado.

## Color Selection

Complementary (opposite colors) - Azul profundo como primario para transmitir confianza profesional, con acentos naranjas cálidos para llamadas a la acción importantes.

- **Primary Color**: Azul Profundo `oklch(0.3 0.15 250)` - Transmite confianza y profesionalismo
- **Secondary Colors**: Gris Carbón `oklch(0.25 0.02 250)` para elementos de soporte y fondos
- **Accent Color**: Naranja Coral `oklch(0.7 0.15 40)` - Para CTAs y elementos interactivos importantes
- **Foreground/Background Pairings**: 
  - Background (Azul Profundo): Texto Blanco `oklch(0.95 0.02 250)` - Ratio 11.2:1 ✓
  - Card (Gris Carbón): Texto Blanco `oklch(0.95 0.02 250)` - Ratio 8.9:1 ✓  
  - Primary (Azul Profundo): Texto Blanco `oklch(0.95 0.02 250)` - Ratio 11.2:1 ✓
  - Accent (Naranja Coral): Texto Negro `oklch(0.15 0.02 40)` - Ratio 12.1:1 ✓

## Font Selection

Tipografía sans-serif moderna que combine legibilidad profesional con personalidad amigable, usando Inter para máxima claridad en pantallas móviles.

- **Typographic Hierarchy**: 
  - H1 (Títulos principales): Inter Bold/32px/tight spacing
  - H2 (Secciones): Inter SemiBold/24px/normal spacing  
  - H3 (Subsecciones): Inter Medium/20px/normal spacing
  - Body (Texto general): Inter Regular/16px/relaxed spacing
  - Caption (Metadatos): Inter Regular/14px/normal spacing

## Animations

Transiciones sutiles que refuercen la navegación y proporcionen feedback inmediato, manteniendo un equilibrio entre funcionalidad y momentos de deleite discretos.

- **Purposeful Meaning**: Animaciones de deslizamiento para cambios de vista, micro-interacciones en botones para confirmar acciones
- **Hierarchy of Movement**: Prioridad en feedback de CTAs principales, transiciones suaves entre pantallas de calendario

## Component Selection

- **Components**: 
  - Calendar component personalizado para vistas múltiples
  - Cards para citas individuales con estados visuales claros
  - Forms con validación en tiempo real usando react-hook-form
  - Tabs para navegación entre vistas de calendario
  - Avatar component para fotos de perfil
  - Toast notifications para feedback de acciones

- **Customizations**: 
  - Componente Calendar custom que integre vistas mensual/semanal/diaria
  - AppointmentCard con estados (confirmada, pendiente, completada)
  - Theme provider para mantener consistencia del modo oscuro

- **States**: 
  - Buttons: hover con elevación sutil, pressed con scale down, loading con spinner
  - Inputs: focus con border accent, error con border destructive, success con checkmark
  - Calendar cells: today highlighted, selected con background accent, booked con indicator

- **Icon Selection**: 
  - Calendar, Clock, User para navegación principal
  - Plus para crear citas, Edit para modificar, Trash para eliminar
  - Bell para notificaciones, Settings para configuración

- **Spacing**: 
  - Container padding: 4 (16px)
  - Card padding: 6 (24px)  
  - Button padding: 3 vertical, 6 horizontal
  - Section gaps: 8 (32px)

- **Mobile**: 
  - Stack navigation en móvil, sidebar en desktop
  - Cards de citas ocupan ancho completo en móvil
  - Calendario adapta de grid completo a vista compacta
  - Bottom navigation bar fija en móvil