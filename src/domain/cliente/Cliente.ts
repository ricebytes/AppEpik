export interface Cliente {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  numeroIdentificacion: string;
  telefono: string;
  correo: string;
  tipoIdentificacion: number;
  cupoDisponible: number;
  cupoAprobado: number;
  cupoDisponibleEfectivo: number;
  pagoMinimo: number;
  pagoTotalCredito: number;
  cuotaCredito: number;
  cuotaEnMora: number;
  plazo: number;
}
