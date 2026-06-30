import { ApiClient } from '../network/ApiClient';
import { AutenticacionRepository } from '../../domain/autenticacion/AutenticacionRepository';
import { Cliente } from '../../domain/cliente/Cliente';
import { AutenticacionApiResponseDTO } from './AutenticacionApiResponseDTO';

export function clienteFromAutenticacionDTO(dto: AutenticacionApiResponseDTO): Cliente {
  return {
    primerNombre: dto.PrimerNombre,
    segundoNombre: dto.SegundoNombre,
    primerApellido: dto.PrimerApellido,
    segundoApellido: dto.SegundoApellido,
    numeroIdentificacion: dto.NumeroIdentificacion,
    telefono: dto.Telefono,
    correo: dto.Correo,
    tipoIdentificacion: dto.TipoIdentificacion,
    cupoDisponible: dto.CupoDisponible,
    cupoAprobado: dto.CupoAprobado,
    cupoDisponibleEfectivo: dto.CupoDisponibleEfectivo,
    pagoMinimo: dto.PagoMinimo,
    pagoTotalCredito: dto.PagoTotalCredito,
    cuotaCredito: dto.CuotaCredito,
    cuotaEnMora: dto.CuotaEnMora,
    plazo: dto.Plazo,
  };
}

export class AutenticacionRepositoryImpl implements AutenticacionRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async autenticar(
    numeroIdentificacion: string,
    tipoIdentificacion: number,
    clave: string,
  ): Promise<Cliente> {
    const dto = await this.apiClient.post<AutenticacionApiResponseDTO>('/autenticacion', {
      numeroIdentificacion,
      tipoIdentificacion,
      clave,
    });

    if (dto.IdError !== 0) {
      throw new Error(dto.Mensaje || 'No fue posible iniciar sesión');
    }

    return clienteFromAutenticacionDTO(dto);
  }
}
