import { Cliente } from '../domain/cliente/Cliente';

export function buildNombreCompleto(cliente: Cliente): string {
  return [
    cliente.primerNombre,
    cliente.segundoNombre,
    cliente.primerApellido,
    cliente.segundoApellido,
  ]
    .filter((parte) => parte.trim().length > 0)
    .join(' ');
}

export function buildIniciales(cliente: Cliente): string {
  const inicialNombre = cliente.primerNombre.charAt(0);
  const inicialApellido = cliente.primerApellido.charAt(0);
  return `${inicialNombre}${inicialApellido}`.toUpperCase();
}
