import { EnrolamientoRepository } from './EnrolamientoRepository';

export class EnviarCodigoUseCase {
  constructor(private readonly repo: EnrolamientoRepository) {}

  execute(tipoIdentificacion: string, identificacion: string) {
    return this.repo.enviarCodigo(tipoIdentificacion, identificacion);
  }
}
