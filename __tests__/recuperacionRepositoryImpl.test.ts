import { ApiClient, ApiError } from '../src/data/network/ApiClient';
import {
  RecuperacionRepositoryImpl,
  CuentaNoEncontradaError,
  RecuperacionSinCorreoError,
  CodigoRecuperacionIncorrectoError,
  CodigoRecuperacionAgotadoError,
  CodigoRecuperacionExpiradoError,
} from '../src/data/recuperacion/RecuperacionRepositoryImpl';

function makeApiClient(overrides: Partial<Pick<ApiClient, 'post' | 'postVoid'>> = {}) {
  return {
    post: jest.fn(),
    postVoid: jest.fn(),
    ...overrides,
  } as unknown as ApiClient;
}

describe('RecuperacionRepositoryImpl.enviarCodigo', () => {
  it('retorna correoEnmascarado cuando el backend responde OK', async () => {
    const api = makeApiClient({
      post: jest.fn().mockResolvedValue({ correoEnmascarado: 'u***@e**.co' }),
    });
    const repo = new RecuperacionRepositoryImpl(api);

    const result = await repo.enviarCodigo('CC', '12345678');

    expect(result.correoEnmascarado).toBe('u***@e**.co');
  });

  it('lanza CuentaNoEncontradaError para respuesta 404', async () => {
    const api = makeApiClient({
      post: jest.fn().mockRejectedValue(new ApiError(404, 'not found')),
    });
    const repo = new RecuperacionRepositoryImpl(api);

    await expect(repo.enviarCodigo('CC', '12345678')).rejects.toBeInstanceOf(CuentaNoEncontradaError);
  });

  it('lanza RecuperacionSinCorreoError para respuesta 422', async () => {
    const api = makeApiClient({
      post: jest.fn().mockRejectedValue(new ApiError(422, 'unprocessable')),
    });
    const repo = new RecuperacionRepositoryImpl(api);

    await expect(repo.enviarCodigo('CC', '12345678')).rejects.toBeInstanceOf(RecuperacionSinCorreoError);
  });

  it('propaga ApiError sin transformar para errores no mapeados (500)', async () => {
    const api = makeApiClient({
      post: jest.fn().mockRejectedValue(new ApiError(500, 'server error')),
    });
    const repo = new RecuperacionRepositoryImpl(api);

    await expect(repo.enviarCodigo('CC', '12345678')).rejects.toBeInstanceOf(ApiError);
  });
});

describe('RecuperacionRepositoryImpl.verificarCodigo', () => {
  it('retorna tokenVerificacion cuando el backend responde OK', async () => {
    const api = makeApiClient({
      post: jest.fn().mockResolvedValue({ tokenVerificacion: 'tok-abc123' }),
    });
    const repo = new RecuperacionRepositoryImpl(api);

    const result = await repo.verificarCodigo('CC', '12345678', '654321');

    expect(result.tokenVerificacion).toBe('tok-abc123');
  });

  it('lanza CodigoRecuperacionIncorrectoError para respuesta 401', async () => {
    const api = makeApiClient({
      post: jest.fn().mockRejectedValue(new ApiError(401, 'unauthorized')),
    });
    const repo = new RecuperacionRepositoryImpl(api);

    await expect(repo.verificarCodigo('CC', '12345678', '000000')).rejects.toBeInstanceOf(CodigoRecuperacionIncorrectoError);
  });

  it('lanza CodigoRecuperacionAgotadoError para respuesta 403', async () => {
    const api = makeApiClient({
      post: jest.fn().mockRejectedValue(new ApiError(403, 'forbidden')),
    });
    const repo = new RecuperacionRepositoryImpl(api);

    await expect(repo.verificarCodigo('CC', '12345678', '000000')).rejects.toBeInstanceOf(CodigoRecuperacionAgotadoError);
  });

  it('lanza CodigoRecuperacionExpiradoError para respuesta 404', async () => {
    const api = makeApiClient({
      post: jest.fn().mockRejectedValue(new ApiError(404, 'not found')),
    });
    const repo = new RecuperacionRepositoryImpl(api);

    await expect(repo.verificarCodigo('CC', '12345678', '000000')).rejects.toBeInstanceOf(CodigoRecuperacionExpiradoError);
  });

  it('propaga ApiError sin transformar para errores no mapeados (500)', async () => {
    const api = makeApiClient({
      post: jest.fn().mockRejectedValue(new ApiError(500, 'server error')),
    });
    const repo = new RecuperacionRepositoryImpl(api);

    await expect(repo.verificarCodigo('CC', '12345678', '000000')).rejects.toBeInstanceOf(ApiError);
  });
});

describe('RecuperacionRepositoryImpl.actualizarClave', () => {
  it('resuelve sin valor cuando el backend responde OK', async () => {
    const api = makeApiClient({
      postVoid: jest.fn().mockResolvedValue(undefined),
    });
    const repo = new RecuperacionRepositoryImpl(api);

    await expect(
      repo.actualizarClave('CC', '12345678', '5678', 'tok-abc123'),
    ).resolves.toBeUndefined();
  });

  it('propaga el error si el backend falla', async () => {
    const api = makeApiClient({
      postVoid: jest.fn().mockRejectedValue(new ApiError(400, 'bad request')),
    });
    const repo = new RecuperacionRepositoryImpl(api);

    await expect(
      repo.actualizarClave('CC', '12345678', '5678', 'tok-abc123'),
    ).rejects.toBeInstanceOf(ApiError);
  });
});
