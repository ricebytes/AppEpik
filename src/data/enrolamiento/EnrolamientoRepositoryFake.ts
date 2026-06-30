import { EnrolamientoRepository } from '../../domain/enrolamiento/EnrolamientoRepository';
import { DatosEnrolamiento } from '../../domain/enrolamiento/DatosEnrolamiento';

const RESPUESTA_SIMULADA_MS = 600;

const DATOS_PRUEBA: DatosEnrolamiento = {
  nombreCompleto: 'Harry Potter',
  telefono: '3001234567',
  correo: 'harry.potter@hogwarts.com',
};

export class EnrolamientoRepositoryFake implements EnrolamientoRepository {
  async consultar(_tipoIdentificacion: string, _identificacion: string): Promise<DatosEnrolamiento> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), RESPUESTA_SIMULADA_MS));

    return { ...DATOS_PRUEBA };
  }

  async confirmar(_tipoIdentificacion: string, _identificacion: string, _clave: string): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), RESPUESTA_SIMULADA_MS));
  }
}
