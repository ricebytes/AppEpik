import { ApiClient } from '../network/ApiClient';
import { ClienteRepository } from '../../domain/cliente/ClienteRepository';
import { Cliente } from '../../domain/cliente/Cliente';

// Este repositorio apuntaba a GET /cliente/{id} que ya no existe en el backend actual.
// Se mantiene el módulo por compatibilidad pero no se usa en ningún flujo activo.
export class ClienteRepositoryImpl implements ClienteRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async consultarPorIdentificacion(_numeroIdentificacion: string): Promise<Cliente> {
    throw new Error('Endpoint GET /cliente/{id} no disponible en backend actual');
  }
}
