import { DatosEnrolamiento } from './DatosEnrolamiento';
import { EnrolamientoRepository } from './EnrolamientoRepository';

export class ConsultarParaEnrolamientoUseCase {
  constructor(private readonly enrolamientoRepository: EnrolamientoRepository) {}

  execute(tipoIdentificacion: string, identificacion: string): Promise<DatosEnrolamiento> {
    return this.enrolamientoRepository.consultar(tipoIdentificacion, identificacion);
  }
}
