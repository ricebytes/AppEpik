// Contrato real de GET /cliente/{identificacion}.
export interface ClienteApiResponseDTO {
  PrimerNombre: string;
  SegundoNombre: string;
  PrimerApellido: string;
  SegundoApellido: string;
  NumeroIdentificacion: string;
  Telefono: string;
  TipoCliente: string;
  PagoInicial: boolean;
  MensajeCuotaInicial: string;
  EstadoCredito: string;
  CodEstadoCredito: number;
  CupoDisponible: number;
  CupoAprobado: number;
  CupoDisponibleEfectivo: number;
  CupoAprobadoEfectivo: number;
  PagoMinimo: number;
  PagoTotalCredito: number;
  CuotaCredito: number;
  CuotaEnMora: number;
  NumeroCuotaActual: number;
  Plazo: number;
  IdError: number;
  Mensaje: string;
  MensajeCliente: string;
  FechaControl: string;
  FechaMaximaProxPago: string;
  FechaAperturaCredito: string;
  FotoCliente: string;
  TipoIdentificacion: number;
  Correo: string;
  Megabase: boolean;
}
