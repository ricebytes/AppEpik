import { API_BASE_URL, USE_FAKE_AUTENTICACION_REPOSITORY } from '../config/api';
import { ApiClient } from '../data/network/ApiClient';
import { AutenticacionRepositoryImpl } from '../data/autenticacion/AutenticacionRepositoryImpl';
import { AutenticacionRepositoryFake } from '../data/autenticacion/AutenticacionRepositoryFake';
import { IniciarSesionUseCase } from '../domain/autenticacion/IniciarSesionUseCase';

const autenticacionRepository = USE_FAKE_AUTENTICACION_REPOSITORY
  ? new AutenticacionRepositoryFake()
  : new AutenticacionRepositoryImpl(new ApiClient(API_BASE_URL));

export const iniciarSesionUseCase = new IniciarSesionUseCase(autenticacionRepository);
