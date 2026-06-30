import { Cliente } from '../src/domain/cliente/Cliente';
import { buildNombreCompleto, buildIniciales } from '../src/utils/nombre';

const clienteBase: Cliente = {
  primerNombre: 'Harry',
  segundoNombre: '',
  primerApellido: 'Potter',
  segundoApellido: '',
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
};

describe('buildNombreCompleto', () => {
  it('omite los nombres/apellidos vacíos', () => {
    expect(buildNombreCompleto(clienteBase)).toBe('Harry Potter');
  });

  it('incluye segundo nombre y segundo apellido cuando existen', () => {
    const cliente: Cliente = {
      ...clienteBase,
      segundoNombre: 'James',
      segundoApellido: 'Evans',
    };
    expect(buildNombreCompleto(cliente)).toBe('Harry James Potter Evans');
  });
});

describe('buildIniciales', () => {
  it('toma la primera letra del primer nombre y del primer apellido', () => {
    expect(buildIniciales(clienteBase)).toBe('HP');
  });
});
