import { RecuperacionRepository } from './RecuperacionRepository';

export class ActualizarClaveUseCase {
  constructor(private readonly repo: RecuperacionRepository) {}

  execute(tipoIdentificacion: string, identificacion: string, clave: string, tokenVerificacion: string) {
    return this.repo.actualizarClave(tipoIdentificacion, identificacion, clave, tokenVerificacion);
  }
}
