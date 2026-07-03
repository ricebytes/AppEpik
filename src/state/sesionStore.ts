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
      if (__DEV__) {
        if (err instanceof ApiError) {
          console.error(`[Login] ApiError status=${err.status}`);
        } else {
          console.error('[Login] Error:', err instanceof Error ? err.name : 'unknown');
        }
      }

      if (err instanceof ApiError && err.status === 423) {
        set({
          estado: 'bloqueado',
          error: 'Cuenta bloqueada por el servidor. Intenta de nuevo en 15 minutos.',
          intentosFallidos: 0,
          bloqueadoHasta: null,
        });
        return;
      }

      const intentosFallidos = get().intentosFallidos + 1;

      if (intentosFallidos >= MAX_INTENTOS) {
        set({
          estado: 'bloqueado',
          error: 'Demasiados intentos fallidos. Espera 60 segundos.',
          intentosFallidos: 0,
          bloqueadoHasta: Date.now() + BLOQUEO_MS,
        });
        return;
      }

      let mensajeError = 'Identificación o clave incorrectas.';
      if (err instanceof ApiError) {
        if (err.status >= 500) {
          mensajeError = 'Error del servidor. Intenta de nuevo.';
        } else if (err.status === 404) {
          mensajeError = 'Usuario no encontrado.';
        }
        // 401/400 → credenciales incorrectas (mensaje por defecto)
      } else if (err instanceof Error && (err.name === 'AbortError' || err.message.includes('Network'))) {
        mensajeError = 'Sin conexión con el servidor. Verifica tu red.';
      }

      set({ estado: 'error', error: mensajeError, intentosFallidos });
    }
  },
  logout: () => set({ cliente: null, estado: 'idle', error: '', intentosFallidos: 0, bloqueadoHasta: null }),
  limpiarError: () => set({ error: '', estado: 'idle' }),
}));
