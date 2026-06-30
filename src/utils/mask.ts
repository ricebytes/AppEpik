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
