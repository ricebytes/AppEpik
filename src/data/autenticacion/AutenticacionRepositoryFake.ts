import { AutenticacionRepository } from '../../domain/autenticacion/AutenticacionRepository';
import { Cliente } from '../../domain/cliente/Cliente';
import { CLIENTE_PRUEBA } from '../cliente/ClienteRepositoryFake';

const RESPUESTA_SIMULADA_MS = 600;
const CLAVE_VALIDA = '1234';

export class AutenticacionRepositoryFake implements AutenticacionRepository {
  async autenticar(
    numeroIdentificacion: string,
    _tipoIdentificacion: number,
    clave: string,
  ): Promise<Cliente> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), RESPUESTA_SIMULADA_MS));

    if (clave !== CLAVE_VALIDA) {
      throw new Error('Identificación, tipo o clave incorrectos.');
    }

    return { ...CLIENTE_PRUEBA, numeroIdentificacion };
  }
}
