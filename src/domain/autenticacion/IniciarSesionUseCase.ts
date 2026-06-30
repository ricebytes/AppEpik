import { Cliente } from '../cliente/Cliente';
import { AutenticacionRepository } from './AutenticacionRepository';

export class IniciarSesionUseCase {
  constructor(private readonly autenticacionRepository: AutenticacionRepository) {}

  execute(numeroIdentificacion: string, tipoIdentificacion: number, clave: string): Promise<Cliente> {
    return this.autenticacionRepository.autenticar(numeroIdentificacion, tipoIdentificacion, clave);
  }
}
