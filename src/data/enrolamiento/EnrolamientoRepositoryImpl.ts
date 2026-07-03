import { ApiClient, ApiError } from '../network/ApiClient';
import { EnrolamientoRepository } from '../../domain/enrolamiento/EnrolamientoRepository';
import { DatosEnrolamiento } from '../../domain/enrolamiento/DatosEnrolamiento';

interface ConsultaResponseDTO {
  nombreCompleto: string;
  telefono: string;
  correo: string;
}

interface EnviarCodigoResponseDTO {
  correoEnmascarado: string;
}

interface VerificarCodigoResponseDTO {
  tokenVerificacion: string;
}

export class EnrolamientoRepositoryImpl implements EnrolamientoRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async consultar(tipoIdentificacion: string, identificacion: string): Promise<DatosEnrolamiento> {
    try {
      const dto = await this.apiClient.post<ConsultaResponseDTO>('/api/enrolamiento/consulta', {
        tipoIdentificacion,
        identificacion,
      });
      return { nombreCompleto: dto.nombreCompleto, telefono: dto.telefono, correo: dto.correo };
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 404) {
          throw new Error('No encontramos tu número de identificación. Verifica que sea correcto.');
        }
        if (err.status === 409) {
          throw new EnrolamientoDuplicadoError();
        }
      }
      throw err;
    }
  }

  async enviarCodigo(tipoIdentificacion: string, identificacion: string): Promise<{ correoEnmascarado: string }> {
    try {
      const dto = await this.apiClient.post<EnviarCodigoResponseDTO>('/api/enrolamiento/enviar-codigo', {
        tipoIdentificacion,
        identificacion,
      });
      return { correoEnmascarado: dto.correoEnmascarado };
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) throw new EnrolamientoDuplicadoError();
        if (err.status === 422) throw new EnrolamientoSinCorreoError();
        if (err.status === 404) throw new Error('No encontramos tu número de identificación.');
      }
      throw err;
    }
  }

  async verificarCodigo(
    tipoIdentificacion: string,
    identificacion: string,
    codigo: string,
  ): Promise<{ tokenVerificacion: string }> {
    try {
      const dto = await this.apiClient.post<VerificarCodigoResponseDTO>('/api/enrolamiento/verificar-codigo', {
        tipoIdentificacion,
        identificacion,
        codigo,
      });
      return { tokenVerificacion: dto.tokenVerificacion };
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) throw new CodigoIncorrectoError();
        if (err.status === 403) throw new CodigoAgotadoError();
        if (err.status === 404) throw new CodigoExpiradoError();
      }
      throw err;
    }
  }

  async confirmar(
    tipoIdentificacion: string,
    identificacion: string,
    clave: string,
    tokenVerificacion: string,
  ): Promise<void> {
    await this.apiClient.postVoid('/api/enrolamiento/confirmar', {
      tipoIdentificacion,
      identificacion,
      clave,
      tokenVerificacion,
    });
  }
}

export class EnrolamientoDuplicadoError extends Error {
  constructor() {
    super('Ya tienes una cuenta. Inicia sesión.');
    this.name = 'EnrolamientoDuplicadoError';
  }
}

export class EnrolamientoSinCorreoError extends Error {
  constructor() {
    super('No tenemos un correo registrado para tu cuenta. Contacta a Epik para continuar.');
    this.name = 'EnrolamientoSinCorreoError';
  }
}

export class CodigoIncorrectoError extends Error {
  constructor() {
    super('El código es incorrecto. Verifica e intenta de nuevo.');
    this.name = 'CodigoIncorrectoError';
  }
}

export class CodigoAgotadoError extends Error {
  constructor() {
    super('Agotaste los intentos. Solicita un nuevo código.');
    this.name = 'CodigoAgotadoError';
  }
}

export class CodigoExpiradoError extends Error {
  constructor() {
    super('El código expiró. Solicita uno nuevo.');
    this.name = 'CodigoExpiradoError';
  }
}
