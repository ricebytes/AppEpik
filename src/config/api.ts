// URLs por entorno. __DEV__ solo distingue debug/release del bundler;
// staging vs. producción en builds release debe resolverse vía variante de build
// (.env por flavor / scheme), nunca con un solo valor hardcodeado compartido.
const API_BASE_URL_DEV = 'https://api-dev.epik.com';
const API_BASE_URL_PROD = 'https://api.epik.com';

// Pendiente: reemplazar cuando epik-backend expone la URL real del servicio.
export const API_BASE_URL = __DEV__ ? API_BASE_URL_DEV : API_BASE_URL_PROD;

// Mientras epik-backend no esté disponible, usa datos de prueba para poder navegar el flujo completo.
// CRÍTICO: estos flags deben quedar en `false` antes de cualquier build release/QA con datos reales.
export const USE_FAKE_CLIENTE_REPOSITORY = true;

// Pendiente: reemplazar cuando epik-backend expone el endpoint real de autenticación.
export const USE_FAKE_AUTENTICACION_REPOSITORY = true;
