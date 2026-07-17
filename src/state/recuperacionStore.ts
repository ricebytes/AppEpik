import { create } from 'zustand';

interface RecuperacionState {
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  correoEnmascarado: string | null;
  tokenVerificacion: string | null;
  setIdentificacion: (tipo: string, numero: string) => void;
  setCorreoEnmascarado: (correo: string) => void;
  setTokenVerificacion: (token: string) => void;
  reset: () => void;
}

const INITIAL: Pick<RecuperacionState, 'tipoIdentificacion' | 'numeroIdentificacion' | 'correoEnmascarado' | 'tokenVerificacion'> = {
  tipoIdentificacion: '',
  numeroIdentificacion: '',
  correoEnmascarado: null,
  tokenVerificacion: null,
};

export const useRecuperacionStore = create<RecuperacionState>((set) => ({
  ...INITIAL,
  setIdentificacion: (tipo, numero) => set({ tipoIdentificacion: tipo, numeroIdentificacion: numero }),
  setCorreoEnmascarado: (correo) => set({ correoEnmascarado: correo }),
  setTokenVerificacion: (token) => set({ tokenVerificacion: token }),
  reset: () => set(INITIAL),
}));
