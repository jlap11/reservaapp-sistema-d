# Sistema de Reservas y Citas

Aplicación SPA (React + TypeScript) para gestión de citas con persistencia local (sin backend aún). Enfocada en rapidez de interacción, experiencia móvil y base sólida para futura API.

## 🚀 Características (estado actual)

- ✅ Autenticación mock (usuario simulado + token ficticio en localStorage)
- ✅ Calendario interactivo (vistas mensual / semanal / diaria)
- ✅ CRUD de citas con estados: `pending | confirmed | completed | cancelled`
- ✅ Dashboard con métricas derivadas (en memoria)
- ✅ Perfil de usuario editable (persistido localmente)
- ✅ Tema oscuro único + Tailwind + componentes shadcn/radix
- ✅ Navegación por pestañas (estado interno, sin router)
- ✅ Toasts (Sonner) para feedback inmediato
- ✅ Persistencia ligera mediante hook `useKV` (localStorage) con sincronización multi–tab
- ✅ Código preparado para transición futura a backend REST / React Query
- 🔄 Internacionalización simple (nombres de días/mes centralizados)
- 🧱 Arquitectura limpia por hooks de dominio (`use-auth`, `use-appointments`)

> No hay backend real todavía: todos los datos viven en el navegador. Ideal para prototipo / validación temprana.

## 🛠️ Stack Tecnológico

- React 19 + TypeScript
- Vite
- Tailwind CSS 4 + shadcn/ui (Radix Primitives)
- Iconos: `lucide-react` (migrado desde Phosphor)
- Persistencia: hook custom `useKV` (localStorage JSON)
- Formularios: `react-hook-form`
- Feedback: `sonner`
- Theming: CSS vars + `next-themes` (para futura extensión de tema)
- Sin Redux / Zustand / Query aún (preparado para integrar `@tanstack/react-query` si se añade API)

## 📱 Funcionalidades Principales

### Autenticación (Mock)
- Login simulado (email + password no se validan contra servidor)
- Se genera un token ficticio y se guarda en localStorage
- No hay recuperación de contraseña ni verificación de email todavía

### Calendario de Citas
- **Vista Mensual**: Visualización completa del mes con citas resumidas
- **Vista Semanal**: Detalles semanales con navegación por días
- **Vista Diaria**: Agenda detallada del día seleccionado
- Navegación fluida entre vistas y períodos

### Gestión de Citas
- Crear / editar / cancelar / eliminar citas
- Estados soportados: `pending`, `confirmed`, `completed`, `cancelled`
- Filtrado por día, semana y mes (cálculo en memoria)
- IDs locales (`Date.now().toString()`) – se mapearán a IDs de backend en migración

### Dashboard
- Estadísticas rápidas (total, hoy, pendientes, confirmadas)
- Citas del día actual
- Próximas citas programadas
- Indicadores visuales de estado

### Perfil de Usuario
- Información personal editable
- Avatar personalizado
- Configuración de notificaciones
- Gestión de sesión

## ⚙️ Instalación y Uso (Local)

### Prerrequisitos
- Node.js 18+ 
- npm o pnpm

### Instalación Local

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd reservas-citas
```

2. **Instalar dependencias**
```bash
npm install
```

3. (Opcional futuro) Variables de entorno – hoy no se requieren.

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Acceder a la aplicación**
Abrir [http://localhost:5173](http://localhost:5173)

## 🔧 Futuro Backend (Diseño previsto)

Cuando se integre un backend (ej. .NET / Node / Functions) se esperan endpoints similares:

#### Autenticación
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "password123"
}
```

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "password123",
  "name": "Nombre Usuario"
}
```

#### Citas (CRUD)
```http
GET /api/appointments
Authorization: Bearer {token}

POST /api/appointments
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Consulta médica",
  "description": "Revisión anual",
  "date": "2024-12-18",
  "time": "14:30",
  "duration": 60,
  "clientName": "Carlos Rodríguez",
  "clientEmail": "carlos@email.com",
  "clientPhone": "+1234567891",
  "status": "pending"
}

PUT /api/appointments/{id}
DELETE /api/appointments/{id}
```

#### Perfil de Usuario
```http
GET /api/user/profile
PUT /api/user/profile
Authorization: Bearer {token}
```

> Autenticación corporativa (Azure B2C / OAuth) es opcional y no está implementada todavía.

## � Build Producción

### Web Production Build
```bash
npm run build
```

### PWA
No se ha configurado aún manifest/service worker. Añadir en futuro: `manifest.webmanifest` + registro SW.

## 🎨 Theming

Tema principal definido en `src/index.css` y tokens extendidos en `styles/theme.css`.

```css
:root {
  /* Colores principales */
  --background: oklch(0.3 0.15 250);    /* Azul profundo */
  --foreground: oklch(0.95 0.02 250);   /* Blanco suave */
  --accent: oklch(0.7 0.15 40);         /* Naranja coral */
  
  /* Personalizar otros colores... */
}
```

## 🔔 Notificaciones
Hoy: solo toasts internos (Sonner). Push/browser notifications aún no configuradas.

## 📊 Métricas (Plan Futuro)
- Citas creadas / día
- Distribución por estado
- Tasa de conversión (pending→confirmed→completed)

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Subir carpeta dist/ a Netlify
```

### Azure Static Web Apps
```yaml
# .github/workflows/azure-static-web-apps.yml
name: Azure Static Web Apps CI/CD
on:
  push:
    branches: [ main ]

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
    - uses: actions/checkout@v2
    - name: Build And Deploy
      uses: Azure/static-web-apps-deploy@v1
      with:
        azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
        repo_token: ${{ secrets.GITHUB_TOKEN }}
        action: "upload"
        app_location: "/"
        output_location: "dist"
```

## 🔒 Seguridad (Estado / Roadmap)
Actual:
- Validaciones básicas de formulario (cliente)
- Datos locales (no viajan por red)

Pendiente tras añadir backend:
- Rate limiting / CORS
- Sanitización y validación servidor
- Almacenamiento seguro de tokens (HttpOnly cookies)
- Auditoría de dependencias automatizada

## 🤝 Contribución

1. Crea branch: `feat/<descripcion>`
2. Ejecuta lint y type-check: `npm run lint` / `npx tsc --noEmit`
3. Abre PR incluyendo resumen de cambios y checklist de instrucciones internas (`.github/copilot-instructions.md`)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Abrir issue en el repositorio para bugs / propuestas.

---

Construido para iterar rápido: empieza local, luego enchufa tu API.