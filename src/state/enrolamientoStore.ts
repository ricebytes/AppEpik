import { create } from 'zustand';
import { DatosEnrolamiento } from '../domain/enrolamiento/DatosEnrolamiento';

interface EnrolamientoState {
  tipoIdentificacion: string | null;
  numeroIdentificacion: string;
  datosEnrolamiento: DatosEnrolamiento | null;
  setConsulta: (
    tipoIdentificacion: string,
    numeroIdentificacion: string,
    datos: DatosEnrolamiento,
  ) => void;
  reset: () => void;
}

export const useEnrolamientoStore = create<EnrolamientoState>((set) => ({
  tipoIdentificacion: null,
  numeroIdentificacion: '',
  datosEnrolamiento: null,
  setConsulta: (tipoIdentificacion, numeroIdentificacion, datos) =>
    set({ tipoIdentificacion, numeroIdentificacion, datosEnrolamiento: datos }),
  reset: () => set({ tipoIdentificacion: null, numeroIdentificacion: '', datosEnrolamiento: null }),
}));
