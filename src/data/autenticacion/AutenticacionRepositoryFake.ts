import { AutenticacionRepository } from '../../domain/autenticacion/AutenticacionRepository';
import { Cliente } from '../../domain/cliente/Cliente';

const RESPUESTA_SIMULADA_MS = 600;
const CLAVE_VALIDA = '1234';

const CLIENTE_PRUEBA: Cliente = {
  nombreCompleto: 'Mariana Lucía Restrepo Gómez',
  numeroIdentificacion: '',
  tipoIdentificacion: 'CC',
  estadoCredito: 'En mora',
  cupoDisponible: 800,
  cupoAprobado: 1000,
  cupoDisponibleEfectivo: 650,
  pagoMinimo: 1671.98,
  pagoTotalCredito: 5766.44,
  cuotaCredito: 835.99,
  cuotaEnMora: 1671.98,
  plazo: 6,
};

export class AutenticacionRepositoryFake implements AutenticacionRepository {
  async autenticar(tipoIdentificacion: string, identificacion: string, clave: string): Promise<Cliente> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), RESPUESTA_SIMULADA_MS));

    if (clave !== CLAVE_VALIDA) {
      throw new Error('Identificación, tipo o clave incorrectos.');
    }

    return { ...CLIENTE_PRUEBA, tipoIdentificacion, numeroIdentificacion: identificacion };
  }
}
