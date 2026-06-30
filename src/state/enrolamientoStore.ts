import { create } from 'zustand';
import { Cliente } from '../domain/cliente/Cliente';

interface EnrolamientoState {
  numeroIdentificacion: string;
  tipoIdentificacion: number | null;
  cliente: Cliente | null;
  setTipoIdentificacion: (tipoIdentificacion: number) => void;
  setCliente: (numeroIdentificacion: string, cliente: Cliente) => void;
  reset: () => void;
}

export const useEnrolamientoStore = create<EnrolamientoState>((set) => ({
  numeroIdentificacion: '',
  tipoIdentificacion: null,
  cliente: null,
  setTipoIdentificacion: (tipoIdentificacion) => set({ tipoIdentificacion }),
  setCliente: (numeroIdentificacion, cliente) => set({ numeroIdentificacion, cliente }),
  reset: () => set({ numeroIdentificacion: '', tipoIdentificacion: null, cliente: null }),
}));
