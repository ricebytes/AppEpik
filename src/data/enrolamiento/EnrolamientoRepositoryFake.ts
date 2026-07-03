import { EnrolamientoRepository } from '../../domain/enrolamiento/EnrolamientoRepository';
import { DatosEnrolamiento } from '../../domain/enrolamiento/DatosEnrolamiento';
import { CodigoIncorrectoError } from './EnrolamientoRepositoryImpl';

const RESPUESTA_SIMULADA_MS = 600;

const DATOS_PRUEBA: DatosEnrolamiento = {
  nombreCompleto: 'Harry Potter',
  telefono: '3001234567',
  correo: 'h***@hogwarts.com',
};

export class EnrolamientoRepositoryFake implements EnrolamientoRepository {
  async consultar(_tipoIdentificacion: string, _identificacion: string): Promise<DatosEnrolamiento> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), RESPUESTA_SIMULADA_MS));
    return { ...DATOS_PRUEBA };
  }

  async enviarCodigo(_tipoIdentificacion: string, _identificacion: string): Promise<{ correoEnmascarado: string }> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), RESPUESTA_SIMULADA_MS));
    return { correoEnmascarado: 'h***@hogwarts.com' };
  }

  async verificarCodigo(
    _tipoIdentificacion: string,
    _identificacion: string,
    codigo: string,
  ): Promise<{ tokenVerificacion: string }> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), RESPUESTA_SIMULADA_MS));
    if (codigo !== '123456') {
      throw new CodigoIncorrectoError();
    }
    return { tokenVerificacion: 'fake-token-verificacion-12345' };
  }

  async confirmar(
    _tipoIdentificacion: string,
    _identificacion: string,
    _clave: string,
    _tokenVerificacion: string,
  ): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), RESPUESTA_SIMULADA_MS));
  }
}
