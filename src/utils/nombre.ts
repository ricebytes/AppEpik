export function buildNombreCompleto(obj: { nombreCompleto: string }): string {
  return obj.nombreCompleto;
}

export function buildIniciales(obj: { nombreCompleto: string }): string {
  const partes = obj.nombreCompleto.trim().split(/\s+/).filter(Boolean);
  const inicialNombre = partes[0]?.charAt(0) ?? '';
  const inicialApellido = partes[partes.length > 1 ? partes.length - 1 : 0]?.charAt(0) ?? '';
  return `${inicialNombre}${inicialApellido}`.toUpperCase();
}
