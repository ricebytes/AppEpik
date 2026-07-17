import { RecuperacionRepository } from './RecuperacionRepository';

export class EnviarCodigoRecuperacionUseCase {
  constructor(private readonly repo: RecuperacionRepository) {}

  execute(tipoIdentificacion: string, identificacion: string) {
    return this.repo.enviarCodigo(tipoIdentificacion, identificacion);
  }
}
