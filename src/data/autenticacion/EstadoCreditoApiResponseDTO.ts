export interface EstadoCreditoApiResponseDTO {
  nombreCompleto: string;
  numeroIdentificacion: string;
  estadoCredito: string;
  cupoDisponible: number;
  cupoAprobado: number;
  cupoDisponibleEfectivo: number;
  cupoAprobadoEfectivo: number;
  pagoMinimo: number;
  pagoTotalCredito: number;
  cuotaCredito: number;
  cuotaEnMora: number;
  numeroCuotaActual: number;
  plazo: number;
  fechaMaximaProximoPago: string;
  fechaAperturaCredito: string;
}
