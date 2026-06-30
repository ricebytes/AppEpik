import { ApiClient } from '../network/ApiClient';
import { ClienteRepository } from '../../domain/cliente/ClienteRepository';
import { Cliente } from '../../domain/cliente/Cliente';
import { ClienteApiResponseDTO } from './ClienteApiResponseDTO';

export function clienteFromDTO(dto: ClienteApiResponseDTO): Cliente {
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

export class ClienteRepositoryImpl implements ClienteRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async consultarPorIdentificacion(numeroIdentificacion: string): Promise<Cliente> {
    const dto = await this.apiClient.get<ClienteApiResponseDTO>(
      `/cliente/${numeroIdentificacion}`,
    );

    if (dto.IdError !== 0) {
      throw new Error(dto.Mensaje || 'No fue posible consultar el cliente');
    }

    return clienteFromDTO(dto);
  }
}
