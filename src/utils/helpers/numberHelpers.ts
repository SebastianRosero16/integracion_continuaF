/**
 * Utilidades para formateo de números
 * Funciones helper para presentar números de forma legible
 */

/**
 * Formatea un número con separadores de miles
 * @param num - Número a formatear
 * @param locale - Configuración regional (default: 'es-CO')
 * @returns Número formateado con separadores de miles
 * 
 * @example
 * formatNumber(1234567) // "1.234.567"
 * formatNumber(1234567, 'en-US') // "1,234,567"
 */
export function formatNumber(num: number, locale: string = 'es-CO'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Formatea un número como moneda colombiana (COP)
 * @param amount - Cantidad a formatear
 * @param showDecimals - Mostrar decimales (default: false)
 * @returns Cantidad formateada como moneda
 * 
 * @example
 * formatCurrency(45000) // "$45.000"
 * formatCurrency(45000.50, true) // "$45.000,50"
 */
export function formatCurrency(amount: number, showDecimals: boolean = false): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

/**
 * Formatea un número como porcentaje
 * @param value - Valor decimal (0.75 = 75%)
 * @param decimals - Decimales a mostrar (default: 0)
 * @returns Número formateado como porcentaje
 * 
 * @example
 * formatPercentage(0.75) // "75%"
 * formatPercentage(0.7543, 2) // "75,43%"
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Redondea un número a cierta cantidad de decimales
 * @param num - Número a redondear
 * @param decimals - Cantidad de decimales (default: 2)
 * @returns Número redondeado
 * 
 * @example
 * roundNumber(3.14159, 2) // 3.14
 * roundNumber(10.555, 1) // 10.6
 */
export function roundNumber(num: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * Formatea un número abreviado con sufijos (K, M, B)
 * @param num - Número a formatear
 * @param decimals - Decimales a mostrar (default: 1)
 * @returns Número abreviado
 * 
 * @example
 * formatCompactNumber(1500) // "1,5K"
 * formatCompactNumber(2500000) // "2,5M"
 * formatCompactNumber(1000000000) // "1B"
 */
export function formatCompactNumber(num: number, decimals: number = 1): string {
  if (num < 1000) return num.toString();
  
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3);
  
  if (tier === 0) return num.toString();
  
  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;
  
  return roundNumber(scaled, decimals) + suffix;
}

/**
 * Valida si un valor es un número válido
 * @param value - Valor a validar
 * @returns true si es un número válido
 * 
 * @example
 * isValidNumber(42) // true
 * isValidNumber("42") // false
 * isValidNumber(NaN) // false
 * isValidNumber(Infinity) // false
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Convierte un string a número de forma segura
 * @param value - String a convertir
 * @param defaultValue - Valor por defecto si la conversión falla
 * @returns Número parseado o valor por defecto
 * 
 * @example
 * parseNumberSafe("42") // 42
 * parseNumberSafe("abc", 0) // 0
 * parseNumberSafe("3.14") // 3.14
 */
export function parseNumberSafe(value: string, defaultValue: number = 0): number {
  const parsed = parseFloat(value);
  return isValidNumber(parsed) ? parsed : defaultValue;
}

/**
 * Formatea bytes a formato legible (KB, MB, GB)
 * @param bytes - Cantidad de bytes
 * @param decimals - Decimales a mostrar (default: 2)
 * @returns String formateado
 * 
 * @example
 * formatBytes(1024) // "1 KB"
 * formatBytes(1536, 1) // "1.5 KB"
 * formatBytes(1048576) // "1 MB"
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return roundNumber(bytes / Math.pow(k, i), decimals) + ' ' + sizes[i];
}
