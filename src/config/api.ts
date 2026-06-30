// En desarrollo local el backend corre en localhost:8090.
// Para builds de release apuntar a la URL de producción cuando esté desplegada.
export const API_BASE_URL = __DEV__ ? 'http://localhost:8090' : 'https://api.epik.com';

// Usar implementaciones reales — el backend ya está disponible en localhost:8090.
// Cambiar a true para pruebas offline sin backend.
export const USE_FAKE_ENROLAMIENTO_REPOSITORY = false;
export const USE_FAKE_AUTENTICACION_REPOSITORY = false;

// Legacy: el endpoint GET /cliente/{id} ya no existe en el backend actual.
export const USE_FAKE_CLIENTE_REPOSITORY = true;
