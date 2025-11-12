/**
 * Utilidades para formateo de fechas
 * Funciones helper para trabajar con fechas de forma consistente
 */

/**
 * Formatea una fecha en formato legible en español
 * @param date - Fecha a formatear
 * @param includeTime - Incluir hora (default: false)
 * @returns Fecha formateada
 * 
 * @example
 * formatDate(new Date('2024-11-28')) // "28 de noviembre de 2024"
 * formatDate(new Date(), true) // "28 de noviembre de 2024, 10:30 AM"
 */
export function formatDate(date: Date, includeTime: boolean = false): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(includeTime && {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
  };
  
  return new Intl.DateTimeFormat('es-CO', options).format(date);
}

/**
 * Formatea una fecha en formato corto (DD/MM/YYYY)
 * @param date - Fecha a formatear
 * @returns Fecha en formato corto
 * 
 * @example
 * formatDateShort(new Date('2024-11-28')) // "28/11/2024"
 */
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Formatea solo la hora de una fecha
 * @param date - Fecha con hora
 * @param use24Hours - Usar formato 24h (default: false)
 * @returns Hora formateada
 * 
 * @example
 * formatTime(new Date('2024-11-28T14:30:00')) // "2:30 PM"
 * formatTime(new Date('2024-11-28T14:30:00'), true) // "14:30"
 */
export function formatTime(date: Date, use24Hours: boolean = false): string {
  return new Intl.DateTimeFormat('es-CO', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !use24Hours,
  }).format(date);
}

/**
 * Obtiene el tiempo transcurrido desde una fecha (formato relativo)
 * @param date - Fecha pasada
 * @returns String con tiempo relativo
 * 
 * @example
 * getRelativeTime(new Date(Date.now() - 5000)) // "hace 5 segundos"
 * getRelativeTime(new Date(Date.now() - 3600000)) // "hace 1 hora"
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `hace ${diffInSeconds} segundo${diffInSeconds !== 1 ? 's' : ''}`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `hace ${diffInMonths} mes${diffInMonths !== 1 ? 'es' : ''}`;
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `hace ${diffInYears} año${diffInYears !== 1 ? 's' : ''}`;
}

/**
 * Verifica si una fecha es hoy
 * @param date - Fecha a verificar
 * @returns true si la fecha es hoy
 * 
 * @example
 * isToday(new Date()) // true
 * isToday(new Date('2024-01-01')) // false
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Verifica si una fecha es ayer
 * @param date - Fecha a verificar
 * @returns true si la fecha es ayer
 */
export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Obtiene el nombre del día de la semana
 * @param date - Fecha
 * @param short - Formato corto (default: false)
 * @returns Nombre del día
 * 
 * @example
 * getDayName(new Date('2024-11-28')) // "jueves"
 * getDayName(new Date('2024-11-28'), true) // "jue"
 */
export function getDayName(date: Date, short: boolean = false): string {
  return new Intl.DateTimeFormat('es-CO', {
    weekday: short ? 'short' : 'long',
  }).format(date);
}

/**
 * Obtiene el nombre del mes
 * @param date - Fecha
 * @param short - Formato corto (default: false)
 * @returns Nombre del mes
 * 
 * @example
 * getMonthName(new Date('2024-11-28')) // "noviembre"
 * getMonthName(new Date('2024-11-28'), true) // "nov"
 */
export function getMonthName(date: Date, short: boolean = false): string {
  return new Intl.DateTimeFormat('es-CO', {
    month: short ? 'short' : 'long',
  }).format(date);
}

/**
 * Valida si un string es una fecha válida
 * @param dateString - String a validar
 * @returns true si es una fecha válida
 * 
 * @example
 * isValidDate("2024-11-28") // true
 * isValidDate("invalid") // false
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Convierte un string a Date de forma segura
 * @param dateString - String a convertir
 * @param defaultDate - Fecha por defecto si falla
 * @returns Date parseada o fecha por defecto
 * 
 * @example
 * parseDateSafe("2024-11-28") // Date object
 * parseDateSafe("invalid", new Date()) // Current date
 */
export function parseDateSafe(dateString: string, defaultDate: Date = new Date()): Date {
  if (!isValidDate(dateString)) return defaultDate;
  return new Date(dateString);
}
