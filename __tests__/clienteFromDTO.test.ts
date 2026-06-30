import { EnrolamientoRepositoryFake } from '../src/data/enrolamiento/EnrolamientoRepositoryFake';

describe('EnrolamientoRepositoryFake', () => {
  it('consultar resuelve con DatosEnrolamiento válidos', async () => {
    const repo = new EnrolamientoRepositoryFake();
    const datos = await repo.consultar('CC', '9-745-1852');

    expect(typeof datos.nombreCompleto).toBe('string');
    expect(datos.nombreCompleto.length).toBeGreaterThan(0);
    expect(typeof datos.telefono).toBe('string');
    expect(typeof datos.correo).toBe('string');
  });

  it('confirmar resuelve sin errores', async () => {
    const repo = new EnrolamientoRepositoryFake();

    await expect(repo.confirmar('CC', '9-745-1852', '1234')).resolves.toBeUndefined();
  });
});
