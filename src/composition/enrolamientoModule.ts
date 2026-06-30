import { API_BASE_URL, USE_FAKE_ENROLAMIENTO_REPOSITORY } from '../config/api';
import { ApiClient } from '../data/network/ApiClient';
import { EnrolamientoRepositoryImpl } from '../data/enrolamiento/EnrolamientoRepositoryImpl';
import { EnrolamientoRepositoryFake } from '../data/enrolamiento/EnrolamientoRepositoryFake';
import { ConsultarParaEnrolamientoUseCase } from '../domain/enrolamiento/ConsultarParaEnrolamientoUseCase';
import { ConfirmarEnrolamientoUseCase } from '../domain/enrolamiento/ConfirmarEnrolamientoUseCase';

const enrolamientoRepository = USE_FAKE_ENROLAMIENTO_REPOSITORY
  ? new EnrolamientoRepositoryFake()
  : new EnrolamientoRepositoryImpl(new ApiClient(API_BASE_URL));

export const consultarParaEnrolamientoUseCase = new ConsultarParaEnrolamientoUseCase(enrolamientoRepository);
export const confirmarEnrolamientoUseCase = new ConfirmarEnrolamientoUseCase(enrolamientoRepository);
