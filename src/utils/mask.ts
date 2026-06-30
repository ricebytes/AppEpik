function maskFromIndex(value: string, visibleChars: number): string {
  const visible = value.slice(0, visibleChars);
  const hiddenLength = Math.max(value.length - visibleChars, 0);
  return visible + '*'.repeat(hiddenLength);
}

export function maskEmail(correo: string): string {
  return maskFromIndex(correo, 3);
}

export function maskPhone(telefono: string): string {
  return maskFromIndex(telefono, 6);
}

// Usar en logs, analítica o cualquier pantalla que no requiera que el cliente
// verifique su propio número completo (p.ej. ConfirmacionDatosScreen sí debe
// mostrarlo completo para que el usuario confirme que es su identidad).
export function maskIdentificacion(numeroIdentificacion: string): string {
  const visibles = Math.min(4, numeroIdentificacion.length);
  const oculto = '*'.repeat(Math.max(numeroIdentificacion.length - visibles, 0));
  return oculto + numeroIdentificacion.slice(-visibles);
}
