import { AutenticacionRepositoryFake } from '../src/data/autenticacion/AutenticacionRepositoryFake';

describe('AutenticacionRepositoryFake', () => {
  it('resuelve con el cliente de prueba cuando la clave es correcta', async () => {
    const repo = new AutenticacionRepositoryFake();
    const cliente = await repo.autenticar('CC', '9-745-1852', '1234');

    expect(cliente.numeroIdentificacion).toBe('9-745-1852');
    expect(cliente.tipoIdentificacion).toBe('CC');
    expect(typeof cliente.nombreCompleto).toBe('string');
    expect(cliente.nombreCompleto.length).toBeGreaterThan(0);
  });

  it('rechaza cuando la clave es incorrecta', async () => {
    const repo = new AutenticacionRepositoryFake();

    await expect(repo.autenticar('CC', '9-745-1852', '0000')).rejects.toThrow();
  });
});
