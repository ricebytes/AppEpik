import { ClienteRepository } from '../../domain/cliente/ClienteRepository';
import { Cliente } from '../../domain/cliente/Cliente';

const RESPUESTA_SIMULADA_MS = 600;

export const CLIENTE_PRUEBA: Cliente = {
  nombreCompleto: 'Mariana Lucía Restrepo Gómez',
  numeroIdentificacion: '',
  tipoIdentificacion: 'CC',
  estadoCredito: 'Al día',
  cupoDisponible: 1000,
  cupoAprobado: 1000,
  cupoDisponibleEfectivo: 1000,
  pagoMinimo: 0,
  pagoTotalCredito: 2762.34,
  cuotaCredito: 118.72,
  cuotaEnMora: 0,
  plazo: 6,
};

export class ClienteRepositoryFake implements ClienteRepository {
  async consultarPorIdentificacion(numeroIdentificacion: string): Promise<Cliente> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), RESPUESTA_SIMULADA_MS));

    return { ...CLIENTE_PRUEBA, numeroIdentificacion };
  }
}
