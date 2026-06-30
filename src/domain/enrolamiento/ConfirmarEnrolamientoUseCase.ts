import { EnrolamientoRepository } from './EnrolamientoRepository';

export class ConfirmarEnrolamientoUseCase {
  constructor(private readonly enrolamientoRepository: EnrolamientoRepository) {}

  execute(tipoIdentificacion: string, identificacion: string, clave: string): Promise<void> {
    return this.enrolamientoRepository.confirmar(tipoIdentificacion, identificacion, clave);
  }
}
