import { Cliente } from './Cliente';

export interface ClienteRepository {
  consultarPorIdentificacion(numeroIdentificacion: string): Promise<Cliente>;
}
