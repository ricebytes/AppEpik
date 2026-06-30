import { create } from 'zustand';
import { Cliente } from '../domain/cliente/Cliente';
import { iniciarSesionUseCase } from '../composition/autenticacionModule';

type EstadoSesion = 'idle' | 'cargando' | 'error' | 'autenticado';

interface SesionState {
  cliente: Cliente | null;
  estado: EstadoSesion;
  error: string;
  login: (numeroIdentificacion: string, tipoIdentificacion: number, clave: string) => Promise<void>;
  logout: () => void;
  limpiarError: () => void;
}

export const useSesionStore = create<SesionState>((set) => ({
  cliente: null,
  estado: 'idle',
  error: '',
  login: async (numeroIdentificacion, tipoIdentificacion, clave) => {
    set({ estado: 'cargando', error: '' });

    try {
      const cliente = await iniciarSesionUseCase.execute(numeroIdentificacion, tipoIdentificacion, clave);
      set({ cliente, estado: 'autenticado' });
    } catch {
      set({ estado: 'error', error: 'Identificación, tipo o clave incorrectos.' });
    }
  },
  logout: () => set({ cliente: null, estado: 'idle', error: '' }),
  limpiarError: () => set({ error: '', estado: 'idle' }),
}));
