import { Cliente } from '../cliente/Cliente';
import { AutenticacionRepository } from './AutenticacionRepository';

export class IniciarSesionUseCase {
  constructor(private readonly autenticacionRepository: AutenticacionRepository) {}

  execute(tipoIdentificacion: string, identificacion: string, clave: string): Promise<Cliente> {
    return this.autenticacionRepository.autenticar(tipoIdentificacion, identificacion, clave);
  }
}
