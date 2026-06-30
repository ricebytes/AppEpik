import { API_BASE_URL, USE_FAKE_CLIENTE_REPOSITORY } from '../config/api';
import { ApiClient } from '../data/network/ApiClient';
import { ClienteRepositoryImpl } from '../data/cliente/ClienteRepositoryImpl';
import { ClienteRepositoryFake } from '../data/cliente/ClienteRepositoryFake';
import { ConsultarClienteUseCase } from '../domain/cliente/ConsultarClienteUseCase';

const clienteRepository = USE_FAKE_CLIENTE_REPOSITORY
  ? new ClienteRepositoryFake()
  : new ClienteRepositoryImpl(new ApiClient(API_BASE_URL));

export const consultarClienteUseCase = new ConsultarClienteUseCase(clienteRepository);
