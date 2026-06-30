import { ApiClient } from '../network/ApiClient';
import { AutenticacionRepository } from '../../domain/autenticacion/AutenticacionRepository';
import { Cliente } from '../../domain/cliente/Cliente';
import { LoginApiResponseDTO } from './LoginApiResponseDTO';
import { EstadoCreditoApiResponseDTO } from './EstadoCreditoApiResponseDTO';

function clienteFromEstadoDTO(dto: EstadoCreditoApiResponseDTO, tipoIdentificacion: string): Cliente {
  return {
    nombreCompleto: dto.nombreCompleto,
    numeroIdentificacion: dto.numeroIdentificacion,
    tipoIdentificacion,
    estadoCredito: dto.estadoCredito,
    cupoDisponible: dto.cupoDisponible,
    cupoAprobado: dto.cupoAprobado,
    cupoDisponibleEfectivo: dto.cupoDisponibleEfectivo,
    pagoMinimo: dto.pagoMinimo,
    pagoTotalCredito: dto.pagoTotalCredito,
    cuotaCredito: dto.cuotaCredito,
    cuotaEnMora: dto.cuotaEnMora,
    plazo: dto.plazo,
  };
}

export class AutenticacionRepositoryImpl implements AutenticacionRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async autenticar(tipoIdentificacion: string, identificacion: string, clave: string): Promise<Cliente> {
    const loginDto = await this.apiClient.post<LoginApiResponseDTO>('/api/login', {
      tipoIdentificacion,
      identificacion,
      clave,
    });

    const estadoDto = await this.apiClient.getWithAuth<EstadoCreditoApiResponseDTO>(
      '/api/credito/estado',
      loginDto.accessToken,
    );

    return clienteFromEstadoDTO(estadoDto, tipoIdentificacion);
  }
}
