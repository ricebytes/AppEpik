import { ApiClient, ApiError } from '../network/ApiClient';
import { EnrolamientoRepository } from '../../domain/enrolamiento/EnrolamientoRepository';
import { DatosEnrolamiento } from '../../domain/enrolamiento/DatosEnrolamiento';

interface ConsultaResponseDTO {
  nombreCompleto: string;
  telefono: string;
  correo: string;
}

export class EnrolamientoRepositoryImpl implements EnrolamientoRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async consultar(tipoIdentificacion: string, identificacion: string): Promise<DatosEnrolamiento> {
    try {
      const dto = await this.apiClient.post<ConsultaResponseDTO>('/api/enrolamiento/consulta', {
        tipoIdentificacion,
        identificacion,
      });

      return {
        nombreCompleto: dto.nombreCompleto,
        telefono: dto.telefono,
        correo: dto.correo,
      };
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

  async confirmar(tipoIdentificacion: string, identificacion: string, clave: string): Promise<void> {
    await this.apiClient.post<unknown>('/api/enrolamiento/confirmar', {
      tipoIdentificacion,
      identificacion,
      clave,
    });
  }
}

export class EnrolamientoDuplicadoError extends Error {
  constructor() {
    super('Ya tienes una cuenta. Inicia sesión.');
    this.name = 'EnrolamientoDuplicadoError';
  }
}
