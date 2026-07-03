import { EnrolamientoRepository } from './EnrolamientoRepository';

export class VerificarCodigoUseCase {
  constructor(private readonly repo: EnrolamientoRepository) {}

  execute(tipoIdentificacion: string, identificacion: string, codigo: string) {
    return this.repo.verificarCodigo(tipoIdentificacion, identificacion, codigo);
  }
}
