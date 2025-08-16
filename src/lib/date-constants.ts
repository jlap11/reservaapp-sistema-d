// Constantes reutilizables de localización (es-ES).
export const MONTH_NAMES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

export const MONTH_NAMES_SHORT = [
  'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'
];

export const WEEKDAY_NAMES = [
  'Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'
];

export const WEEKDAY_NAMES_SHORT = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

export function formatFullDate(date: Date) {
  const dayName = WEEKDAY_NAMES[date.getDay()];
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName}, ${day} de ${month} ${year}`;
}
