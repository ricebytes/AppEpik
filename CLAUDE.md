# Epik App Mobile — Contexto del Repositorio

> Este repositorio contiene la **app móvil de Epik Crédito**, construida en **React Native**.
> El contexto de marca, identidad visual, principios de diseño y artefactos de arquitectura
> (diagramas de flujo, diagrama de componentes, mockups) viven en el directorio padre:
> [`../CLAUDE.md`](../CLAUDE.md) y [`../docs/diagramas/`](../docs/diagramas/).
>
> **Antes de implementar cualquier pantalla o flujo, consulta ese contexto.**

---

## Stack

- **Framework:** React Native (TypeScript)
- **Estado global:** por definir (Zustand recomendado por simplicidad — confirmar con el equipo)
- **Navegación:** React Navigation
- **HTTP Client:** por definir (Axios / fetch + capa `ApiClient` propia)
- **Almacenamiento seguro:** `react-native-keychain` (sesión y token — nunca la clave del usuario)
- **Testing:** Jest + React Native Testing Library

## Arquitectura de capas (ver `componentes-app-backend.svg`)

```
UI (screens)
  → ViewModel / hooks de presentación
    → Casos de Uso (Domain)
      → interfaz ClienteRepository (Dependency Inversion)
        → ApiClient (implementación HTTP concreta)
```

- La UI no conoce HTTP ni JSON.
- El dominio no conoce React Native ni la capa de red — depende de la interfaz `ClienteRepository`.
- La clave del usuario se captura en memoria y se envía por HTTPS; **nunca se persiste ni se cifra en el dispositivo**.

## Convenciones

- Componentes de dominio de negocio en español (`SolicitudCreditoForm`, `ResumenCuota`); componentes genéricos de UI en inglés (`Button`, `Card`, `Modal`).
- Colores de marca centralizados en `src/theme/colors.ts` — nunca hardcodear hex en componentes.
- Textos de pantalla en tono de marca: cercano, segunda persona singular, ver `../CLAUDE.md` sección "Tono de Voz".
- Animaciones de transición cortas (<300ms), nunca bloqueantes.

## Estado del proyecto

- [ ] Inicializar proyecto RN (`npx react-native init` o Expo — por decidir)
- [ ] Configurar tokens de tema (colores, tipografía Varela Round)
- [ ] Implementar flujo de enrolamiento (ver `flujo-enrolamiento.svg`)
- [ ] Conectar con backend (`epik-backend`)
