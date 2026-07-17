// Formatea una cédula CC: solo letras mayúsculas, dígitos y guiones. Máx 20 chars.
export function formatearCedula(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 20);
}

// Pasaporte: alfanumérico libre, puede empezar con letra o número. Máx 20 chars.
export function formatearPasaporte(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
}

export function formatearIdentificacion(raw: string, tipo: string | null): string {
  if (tipo === 'PASAPORTE') return formatearPasaporte(raw);
  return formatearCedula(raw);
}

export function validarFormatoIdentificacion(numero: string, tipo: string | null): boolean {
  const valor = numero.trim();
  if (!valor || !tipo) return false;
  if (tipo === 'PASAPORTE') return valor.length >= 5 && /^[A-Z0-9]+$/.test(valor);
  // CC y otros: mínimo 3 caracteres alfanuméricos con guiones
  return valor.length >= 3 && /^[A-Z0-9][A-Z0-9-]*$/.test(valor);
}

export function placeholderIdentificacion(tipo: string | null): string {
  if (tipo === 'PASAPORTE') return 'Ej: A12345678 o 123456789';
  return 'Ej: 8-456-7890 o PE-12-3456';
}

export function maxLengthIdentificacion(tipo: string | null): number {
  if (tipo === 'PASAPORTE') return 20;
  return 20;
}
