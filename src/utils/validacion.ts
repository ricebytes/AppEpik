// Formatea una cédula CC: solo letras mayúsculas, dígitos y guiones. Máx 20 chars.
export function formatearCedula(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 20);
}

// Formatea un pasaporte: primeros 2 chars deben ser letras, siguientes 6 dígitos → XX######.
export function formatearPasaporte(raw: string): string {
  const upper = raw.toUpperCase();
  let result = '';
  for (const char of upper) {
    if (result.length < 2 && /[A-Z]/.test(char)) {
      result += char;
    } else if (result.length >= 2 && result.length < 8 && /[0-9]/.test(char)) {
      result += char;
    }
    if (result.length === 8) break;
  }
  return result;
}

export function formatearIdentificacion(raw: string, tipo: string | null): string {
  if (tipo === 'PASAPORTE') return formatearPasaporte(raw);
  return formatearCedula(raw);
}

export function validarFormatoIdentificacion(numero: string, tipo: string | null): boolean {
  const valor = numero.trim();
  if (!valor || !tipo) return false;
  if (tipo === 'PASAPORTE') return /^[A-Z]{2}\d{6}$/.test(valor);
  // CC y otros: mínimo 3 caracteres alfanuméricos con guiones
  return valor.length >= 3 && /^[A-Z0-9][A-Z0-9-]*$/.test(valor);
}

export function placeholderIdentificacion(tipo: string | null): string {
  if (tipo === 'PASAPORTE') return 'AB123456';
  return 'Ej: 8-456-7890 o PE-12-3456';
}

export function maxLengthIdentificacion(tipo: string | null): number {
  if (tipo === 'PASAPORTE') return 8;
  return 20;
}
