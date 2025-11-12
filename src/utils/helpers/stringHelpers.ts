/**
 * Utilidades para formateo y manipulación de strings
 * Funciones helper para trabajar con texto de forma consistente
 */

/**
 * Capitaliza la primera letra de un string
 * @param str - String a capitalizar
 * @returns String con primera letra mayúscula
 * 
 * @example
 * capitalize("hola mundo") // "Hola mundo"
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitaliza cada palabra en un string (Title Case)
 * @param str - String a capitalizar
 * @returns String con cada palabra capitalizada
 * 
 * @example
 * capitalizeWords("hola mundo") // "Hola Mundo"
 */
export function capitalizeWords(str: string): string {
  if (!str) return str;
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Trunca un string a cierta longitud agregando "..."
 * @param str - String a truncar
 * @param maxLength - Longitud máxima
 * @param ellipsis - String a agregar al final (default: "...")
 * @returns String truncado
 * 
 * @example
 * truncate("Este es un texto muy largo", 10) // "Este es..."
 */
export function truncate(str: string, maxLength: number, ellipsis: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Genera un slug a partir de un string
 * @param str - String a convertir
 * @returns Slug (lowercase, sin espacios, sin acentos)
 * 
 * @example
 * slugify("Ciencias Sociales") // "ciencias-sociales"
 * slugify("Matemáticas Avanzadas") // "matematicas-avanzadas"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplazar no-alfanuméricos con -
    .replace(/^-+|-+$/g, ''); // Remover - al inicio/fin
}

/**
 * Remueve espacios en blanco extra (múltiples espacios, tabs, newlines)
 * @param str - String a limpiar
 * @returns String sin espacios extras
 * 
 * @example
 * removeExtraSpaces("Hola   mundo") // "Hola mundo"
 */
export function removeExtraSpaces(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Verifica si un string contiene solo números
 * @param str - String a verificar
 * @returns true si solo contiene números
 * 
 * @example
 * isNumericString("123") // true
 * isNumericString("12a") // false
 */
export function isNumericString(str: string): boolean {
  return /^\d+$/.test(str);
}

/**
 * Verifica si un string es un email válido
 * @param email - String a validar
 * @returns true si es un email válido
 * 
 * @example
 * isValidEmail("test@example.com") // true
 * isValidEmail("invalid-email") // false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Genera un string aleatorio de cierta longitud
 * @param length - Longitud del string
 * @param charset - Caracteres a usar (default: alfanumérico)
 * @returns String aleatorio
 * 
 * @example
 * randomString(8) // "aB3xK9pQ"
 */
export function randomString(
  length: number,
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Cuenta las palabras en un string
 * @param str - String a analizar
 * @returns Cantidad de palabras
 * 
 * @example
 * countWords("Hola mundo") // 2
 * countWords("Una   palabra") // 2
 */
export function countWords(str: string): number {
  return removeExtraSpaces(str).split(' ').filter(word => word.length > 0).length;
}

/**
 * Escapa caracteres especiales HTML
 * @param str - String a escapar
 * @returns String con caracteres HTML escapados
 * 
 * @example
 * escapeHtml("<script>alert('xss')</script>") 
 * // "&lt;script&gt;alert('xss')&lt;/script&gt;"
 */
export function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, char => htmlEscapes[char]);
}

/**
 * Extrae iniciales de un nombre
 * @param name - Nombre completo
 * @param maxInitials - Máximo de iniciales (default: 2)
 * @returns Iniciales en mayúsculas
 * 
 * @example
 * getInitials("Juan Pérez") // "JP"
 * getInitials("María José García López", 3) // "MJG"
 */
export function getInitials(name: string, maxInitials: number = 2): string {
  return name
    .split(' ')
    .filter(word => word.length > 0)
    .slice(0, maxInitials)
    .map(word => word[0].toUpperCase())
    .join('');
}

/**
 * Formatea un número de teléfono colombiano
 * @param phone - Número de teléfono (10 dígitos)
 * @returns Teléfono formateado
 * 
 * @example
 * formatPhoneNumber("3001234567") // "300 123 4567"
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) return phone;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
}

/**
 * Compara dos strings ignorando mayúsculas y acentos
 * @param str1 - Primer string
 * @param str2 - Segundo string
 * @returns true si son iguales (ignorando mayúsculas/acentos)
 * 
 * @example
 * compareStringsLoose("Bogotá", "bogota") // true
 * compareStringsLoose("Cali", "Medellín") // false
 */
export function compareStringsLoose(str1: string, str2: string): boolean {
  const normalize = (str: string) =>
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return normalize(str1) === normalize(str2);
}
