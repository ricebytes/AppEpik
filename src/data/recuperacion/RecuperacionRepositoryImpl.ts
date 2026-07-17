import { ApiClient, ApiError } from '../network/ApiClient';
import { RecuperacionRepository } from '../../domain/recuperacion/RecuperacionRepository';

interface EnviarCodigoResponseDTO { correoEnmascarado: string; }
interface VerificarCodigoResponseDTO { tokenVerificacion: string; }

export class RecuperacionRepositoryImpl implements RecuperacionRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async enviarCodigo(tipoIdentificacion: string, identificacion: string): Promise<{ correoEnmascarado: string }> {
    try {
      const dto = await this.apiClient.post<EnviarCodigoResponseDTO>('/api/recuperacion/enviar-codigo', {
        tipoIdentificacion,
        identificacion,
      });
      return { correoEnmascarado: dto.correoEnmascarado };
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 404) throw new CuentaNoEncontradaError();
        if (err.status === 422) throw new RecuperacionSinCorreoError();
      }
      throw err;
    }
  }

  async verificarCodigo(tipoIdentificacion: string, identificacion: string, codigo: string): Promise<{ tokenVerificacion: string }> {
    try {
      const dto = await this.apiClient.post<VerificarCodigoResponseDTO>('/api/recuperacion/verificar-codigo', {
        tipoIdentificacion,
        identificacion,
        codigo,
      });
      return { tokenVerificacion: dto.tokenVerificacion };
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) throw new CodigoRecuperacionIncorrectoError();
        if (err.status === 403) throw new CodigoRecuperacionAgotadoError();
        if (err.status === 404) throw new CodigoRecuperacionExpiradoError();
      }
      throw err;
    }
  }

  async actualizarClave(tipoIdentificacion: string, identificacion: string, clave: string, tokenVerificacion: string): Promise<void> {
    await this.apiClient.postVoid('/api/recuperacion/actualizar-clave', {
      tipoIdentificacion,
      identificacion,
      clave,
      tokenVerificacion,
    });
  }
}

export class CuentaNoEncontradaError extends Error {
  constructor() {
    super('No encontramos una cuenta con esa identificación. Verifica los datos.');
    this.name = 'CuentaNoEncontradaError';
  }
}

export class RecuperacionSinCorreoError extends Error {
  constructor() {
    super('No tenemos un correo registrado para tu cuenta. Contacta a Epik para continuar.');
    this.name = 'RecuperacionSinCorreoError';
  }
}

export class CodigoRecuperacionIncorrectoError extends Error {
  constructor() {
    super('El código es incorrecto. Verifica e intenta de nuevo.');
    this.name = 'CodigoRecuperacionIncorrectoError';
  }
}

export class CodigoRecuperacionAgotadoError extends Error {
  constructor() {
    super('Agotaste los intentos. Solicita un nuevo código.');
    this.name = 'CodigoRecuperacionAgotadoError';
  }
}

export class CodigoRecuperacionExpiradoError extends Error {
  constructor() {
    super('El código expiró. Solicita uno nuevo.');
    this.name = 'CodigoRecuperacionExpiradoError';
  }
}
