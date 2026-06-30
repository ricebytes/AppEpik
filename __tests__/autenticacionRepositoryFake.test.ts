import { AutenticacionRepositoryFake } from '../src/data/autenticacion/AutenticacionRepositoryFake';

describe('AutenticacionRepositoryFake', () => {
  it('resuelve con el cliente de prueba cuando la clave es correcta', async () => {
    const repo = new AutenticacionRepositoryFake();
    const cliente = await repo.autenticar('9-745-1852', 1, '1234');

    expect(cliente.numeroIdentificacion).toBe('9-745-1852');
    expect(cliente.primerNombre).toBe('Mariana');
  });

  it('rechaza cuando la clave es incorrecta', async () => {
    const repo = new AutenticacionRepositoryFake();

    await expect(repo.autenticar('9-745-1852', 1, '0000')).rejects.toThrow();
  });
});
