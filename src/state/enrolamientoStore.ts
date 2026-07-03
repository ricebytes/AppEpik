import { create } from 'zustand';
import { DatosEnrolamiento } from '../domain/enrolamiento/DatosEnrolamiento';

interface EnrolamientoState {
  tipoIdentificacion: string | null;
  numeroIdentificacion: string;
  datosEnrolamiento: DatosEnrolamiento | null;
  correoEnmascarado: string | null;
  tokenVerificacion: string | null;
  setConsulta: (tipoIdentificacion: string, numeroIdentificacion: string, datos: DatosEnrolamiento) => void;
  setCorreoEnmascarado: (correo: string) => void;
  setTokenVerificacion: (token: string) => void;
  reset: () => void;
}

export const useEnrolamientoStore = create<EnrolamientoState>((set) => ({
  tipoIdentificacion: null,
  numeroIdentificacion: '',
  datosEnrolamiento: null,
  correoEnmascarado: null,
  tokenVerificacion: null,
  setConsulta: (tipoIdentificacion, numeroIdentificacion, datos) =>
    set({ tipoIdentificacion, numeroIdentificacion, datosEnrolamiento: datos }),
  setCorreoEnmascarado: (correo) => set({ correoEnmascarado: correo }),
  setTokenVerificacion: (token) => set({ tokenVerificacion: token }),
  reset: () =>
    set({
      tipoIdentificacion: null,
      numeroIdentificacion: '',
      datosEnrolamiento: null,
      correoEnmascarado: null,
      tokenVerificacion: null,
    }),
}));
