// Pendiente: confirmar contrato real del endpoint de autenticación en epik-backend.
// Se asume estructuralmente igual a ClienteApiResponseDTO hasta tener el contrato definitivo.
export interface AutenticacionApiResponseDTO {
  PrimerNombre: string;
  SegundoNombre: string;
  PrimerApellido: string;
  SegundoApellido: string;
  NumeroIdentificacion: string;
  Telefono: string;
  Correo: string;
  TipoIdentificacion: number;
  CupoDisponible: number;
  CupoAprobado: number;
  CupoDisponibleEfectivo: number;
  PagoMinimo: number;
  PagoTotalCredito: number;
  CuotaCredito: number;
  CuotaEnMora: number;
  Plazo: number;
  IdError: number;
  Mensaje: string;
}
