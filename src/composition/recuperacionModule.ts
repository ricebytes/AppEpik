import { API_BASE_URL } from '../config/api';
import { ApiClient } from '../data/network/ApiClient';
import { RecuperacionRepositoryImpl } from '../data/recuperacion/RecuperacionRepositoryImpl';
import { EnviarCodigoRecuperacionUseCase } from '../domain/recuperacion/EnviarCodigoRecuperacionUseCase';
import { VerificarCodigoRecuperacionUseCase } from '../domain/recuperacion/VerificarCodigoRecuperacionUseCase';
import { ActualizarClaveUseCase } from '../domain/recuperacion/ActualizarClaveUseCase';

const recuperacionRepository = new RecuperacionRepositoryImpl(new ApiClient(API_BASE_URL));

export const enviarCodigoRecuperacionUseCase = new EnviarCodigoRecuperacionUseCase(recuperacionRepository);
export const verificarCodigoRecuperacionUseCase = new VerificarCodigoRecuperacionUseCase(recuperacionRepository);
export const actualizarClaveUseCase = new ActualizarClaveUseCase(recuperacionRepository);
