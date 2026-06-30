import { Cliente } from './Cliente';
import { ClienteRepository } from './ClienteRepository';

export class ConsultarClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  execute(numeroIdentificacion: string): Promise<Cliente> {
    return this.clienteRepository.consultarPorIdentificacion(numeroIdentificacion);
  }
}
