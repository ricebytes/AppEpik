const FORMATO_IDENTIFICACION = /^[A-Za-z0-9-]+$/;

export function validarFormatoIdentificacion(numero: string): boolean {
  const valor = numero.trim();
  return valor.length > 0 && FORMATO_IDENTIFICACION.test(valor);
}
