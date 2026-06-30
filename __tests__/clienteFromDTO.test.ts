import { clienteFromDTO } from '../src/data/cliente/ClienteRepositoryImpl';
import { ClienteApiResponseDTO } from '../src/data/cliente/ClienteApiResponseDTO';

const dto: ClienteApiResponseDTO = {
  PrimerNombre: 'Harry',
  SegundoNombre: 'James',
  PrimerApellido: 'Potter',
  SegundoApellido: 'Evans',
  NumeroIdentificacion: '9-745-1852',
  Telefono: '573058774458',
  TipoCliente: 'A',
  PagoInicial: false,
  MensajeCuotaInicial: '',
  EstadoCredito: 'Activo',
  CodEstadoCredito: 1,
  CupoDisponible: 1000,
  CupoAprobado: 1000,
  CupoDisponibleEfectivo: 1000,
  CupoAprobadoEfectivo: 1000,
  PagoMinimo: 0,
  PagoTotalCredito: 2762.34,
  CuotaCredito: 118.72,
  CuotaEnMora: 0,
  NumeroCuotaActual: 1,
  Plazo: 6,
  IdError: 0,
  Mensaje: '',
  MensajeCliente: '',
  FechaControl: '',
  FechaMaximaProxPago: '',
  FechaAperturaCredito: '',
  FotoCliente: '',
  TipoIdentificacion: 1,
  Correo: 'jramos@gattaca.co',
  Megabase: false,
};

describe('clienteFromDTO', () => {
  it('mapea los campos de identidad y crédito desde el DTO al dominio', () => {
    const cliente = clienteFromDTO(dto);

    expect(cliente).toEqual({
      primerNombre: 'Harry',
      segundoNombre: 'James',
      primerApellido: 'Potter',
      segundoApellido: 'Evans',
      numeroIdentificacion: '9-745-1852',
      telefono: '573058774458',
      correo: 'jramos@gattaca.co',
      tipoIdentificacion: 1,
      cupoDisponible: 1000,
      cupoAprobado: 1000,
      cupoDisponibleEfectivo: 1000,
      pagoMinimo: 0,
      pagoTotalCredito: 2762.34,
      cuotaCredito: 118.72,
      cuotaEnMora: 0,
      plazo: 6,
    });
  });
});
