import { RecuperacionRepository } from './RecuperacionRepository';

export class VerificarCodigoRecuperacionUseCase {
  constructor(private readonly repo: RecuperacionRepository) {}

  execute(tipoIdentificacion: string, identificacion: string, codigo: string) {
    return this.repo.verificarCodigo(tipoIdentificacion, identificacion, codigo);
  }
}
