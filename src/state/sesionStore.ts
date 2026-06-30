import { create } from 'zustand';
import { Cliente } from '../domain/cliente/Cliente';
import { ApiError } from '../data/network/ApiClient';
import { iniciarSesionUseCase } from '../composition/autenticacionModule';

type EstadoSesion = 'idle' | 'cargando' | 'error' | 'autenticado' | 'bloqueado';

const MAX_INTENTOS = 5;
const BLOQUEO_MS = 60_000;

interface SesionState {
  cliente: Cliente | null;
  estado: EstadoSesion;
  error: string;
  intentosFallidos: number;
  bloqueadoHasta: number | null;
  login: (tipoIdentificacion: string, identificacion: string, clave: string) => Promise<void>;
  logout: () => void;
  limpiarError: () => void;
}

export const useSesionStore = create<SesionState>((set, get) => ({
  cliente: null,
  estado: 'idle',
  error: '',
  intentosFallidos: 0,
  bloqueadoHasta: null,
  login: async (tipoIdentificacion, identificacion, clave) => {
    const { bloqueadoHasta } = get();
    if (bloqueadoHasta !== null && Date.now() < bloqueadoHasta) {
      const segundosRestantes = Math.ceil((bloqueadoHasta - Date.now()) / 1000);
      set({ estado: 'bloqueado', error: `Demasiados intentos. Intenta de nuevo en ${segundosRestantes}s.` });
      return;
    }

    set({ estado: 'cargando', error: '' });

    try {
      const cliente = await iniciarSesionUseCase.execute(tipoIdentificacion, identificacion, clave);
      set({ cliente, estado: 'autenticado', intentosFallidos: 0, bloqueadoHasta: null });
    } catch (err) {
      if (err instanceof ApiError && err.status === 423) {
        set({
          estado: 'bloqueado',
          error: 'Cuenta bloqueada temporalmente por el servidor. Intenta de nuevo en 15 minutos.',
          intentosFallidos: 0,
          bloqueadoHasta: null,
        });
        return;
      }

      const intentosFallidos = get().intentosFallidos + 1;

      if (intentosFallidos >= MAX_INTENTOS) {
        set({
          estado: 'bloqueado',
          error: 'Demasiados intentos fallidos. Tu acceso quedó bloqueado temporalmente.',
          intentosFallidos: 0,
          bloqueadoHasta: Date.now() + BLOQUEO_MS,
        });
        return;
      }

      set({ estado: 'error', error: 'Identificación o clave incorrectas.', intentosFallidos });
    }
  },
  logout: () => set({ cliente: null, estado: 'idle', error: '', intentosFallidos: 0, bloqueadoHasta: null }),
  limpiarError: () => set({ error: '', estado: 'idle' }),
}));
