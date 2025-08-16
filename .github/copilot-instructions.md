+- Persistencia client-side mediante hook local `useKV` (localStorage) para auth y citas (`use-auth.ts`, `use-appointments.ts`). Sin backend real aún (se eliminó dependencia de Spark).
# AI Assistant Project Instructions

Conciso, accionable y específico a este repositorio. Usa esto como brújula antes de proponer cambios.

## 1. Visión General / Arquitectura
- App SPA React 19 + TypeScript montada con Vite (`src/main.tsx` -> `App.tsx`).
- Estado y persistencia ligera via hooks personalizados apoyados en `@github/spark` (KV storage) para auth y citas (`use-auth.ts`, `use-appointments.ts`). No hay backend real todavía: simula JWT y datos en local storage.
- Navegación interna gestionada manualmente con estado `activeTab` (no React Router). Tabs principales: dashboard, calendar, profile (ver `App.tsx`).
- UI basada en Tailwind CSS + componentes shadcn/radix en `src/components/ui/*`. Theming oscuro personalizado en `index.css` y `styles/theme.css`.
- Dominio principal: gestión de citas (Appointment) y autenticación básica (User). Tipos centrales en `src/types/index.ts`.

## 2. Patrones Clave
- Persistencia: `useKV<KeyType>(key, initial)` devuelve [value, setValue]; siempre usar claves cortas y estables (`'auth-state'`, `'appointments'`). Evitar mutaciones directas de arrays/objetos: crear nuevos arrays al actualizar.
- Feedback UX inmediato: cada operación CRUD de citas dispara `toast.success` (lib Sonner). Mantener consistencia agregando feedback para nuevas operaciones.
- IDs generados localmente con `Date.now().toString()`. Si introduces entidades nuevas, usa el mismo esquema simple hasta que exista backend.
- Estados de cita restringidos al union type `'confirmed' | 'pending' | 'completed' | 'cancelled'`. Validar antes de guardar.
- Screens: componentes de nivel superior `*Screen.tsx` sin lógica de persistencia directa; delegan en hooks.
- Responsive: `Sidebar` visible desktop, `BottomNavigation` móvil; no dupliques lógica de navegación—añade nueva pestaña ajustando ambos componentes y el switch de `renderScreen()`.

## 3. Flujo de Datos
Auth / Citas fluyen así:
1. Usuario se autentica vía `useAuth.login` -> mock user + token al KV.
2. `AppContent` lee `isAuthenticated` para decidir entre `AuthScreen` y resto.
3. Operaciones sobre citas usan `useAppointments` (array en KV) y filtran por fecha/semana/mes en memoria.
4. UI calendar/dash consume selectores derivados (no hay memoization avanzada, OK dado el tamaño).

## 4. Workflows de Desarrollo
- Arranque dev: `npm run dev` (vite).
- Build prod: `npm run build` (ejecuta `tsc -b --noCheck` + bundling). Evita introducir tipos rotos graves aunque `--noCheck` acelere build; valida con `npx tsc --noEmit` manual si cambias tipos base.
- Lint: `npm run lint` (ESLint 9). Sigue reglas de hooks (no llames hooks condicionalmente). Corre antes de abrir PR.
- Preview prod: `npm run preview` tras build.

## 5. Contribuciones de Código (Convenciones)
- Imports absolutos con alias `@/` (asegura mantener consistencia al mover archivos).
- Añade nuevos tipos de dominio en `src/types/index.ts`; exporta interfaces y usa union types para estados.
- Nuevos hooks: colocar en `src/hooks/` prefijo `use-*.ts`; exponer operaciones CRUD + selectores derivados; usar `useKV` si requieren persistencia client-side.
- Reutiliza componentes UI de `components/ui` (no dupliques variantes ya definidas; usa `class-variance-authority` donde aplique).
- Para nuevos estados globales pequeños, preferir otro `useKV` en vez de introducir library de estado completa.

## 6. Extender Funcionalidad Ejemplos
- Agregar filtrado por estado a citas: crear selector `getAppointmentsByStatus(status)` en `use-appointments.ts`, retornar `appointments.filter(a => a.status === status)` y exponerlo.
- Nueva pestaña (ej: "reports"): actualizar `App.tsx` switch + `Sidebar` + `BottomNavigation`; crear `ReportsScreen.tsx` en raíz de `components/`.
- Integrar backend real: sustituir lógica mock en `use-auth.ts` y CRUD en `use-appointments.ts` con llamadas fetch/React Query (lib ya presente: `@tanstack/react-query`, aunque aún no usada). Mantener misma forma de retorno para minimizar refactors.

## 7. Errores / Edge Cases
- Fechas: se guardan como string `YYYY-MM-DD`; conversión a `Date` al filtrar (ver `getAppointmentsByWeek/Month`). Validar formato al introducir nuevas fuentes de datos.
- Concurrencia local: múltiples escrituras rápidas podrían sobre-escribir; si añades operaciones batch, usar función `setState(current => ...)` (ya usado) para atomicidad.
- Estados inválidos o campos faltantes: validar antes de `addAppointment`; hoy no hay validación centralizada—si añades, hazlo en hook para reutilización.

## 8. No Hacer / Evitar
- No introducir routing complejo (React Router) sin necesidad; mantén consistencia con estado `activeTab`.
- No almacenar objetos grandes binarios en KV (solo JSON serializable liviano).
- No mezclar lógica de persistencia directa dentro de componentes de presentación.

## 9. Preparar Transición a Backend
Cuando se integre API:
- Conservar firma externa de hooks; internamente sustituir KV -> cache React Query.
- Sincronizar IDs del backend; mapear registros existentes por `id` si se hace migración.
- Incorporar manejo de loading/error y reflejarlo en UI (spinners / toasts consistentes).

## 10. Archivos Referencia Clave
- `src/App.tsx`: composición y navegación.
- `src/hooks/use-auth.ts`: mock auth + persistencia.
- `src/hooks/use-appointments.ts`: CRUD citas + selectores temporales.
- `src/types/index.ts`: contrato de dominio.
- `src/components/ui/*`: librería local de UI reutilizable.
- `README.md`: endpoints esperados backend futuro.

## 11. Checklist rápida antes de PR
- [ ] Tipos principales no rotos (`npx tsc --noEmit`).
- [ ] Linter sin errores.
- [ ] Hooks nuevos documentados con comentario breve JSDoc.
- [ ] Feedback usuario (toast) para acciones mutantes.
- [ ] Navegación actualizada en Sidebar + BottomNavigation si aplica.

Ajusta y extiende estas reglas solo tras observar patrones reales adicionales. Mantén las instrucciones concisas.
