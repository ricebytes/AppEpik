import { Platform } from 'react-native';

// 'VarelaRound-Regular' requiere agregar el archivo .ttf en assets/fonts y
// hacer el linking nativo (Android/iOS). Hasta entonces se usa el fallback
// redondeado del sistema para no romper el render.
export const fontFamily = Platform.select({
  ios: 'VarelaRound-Regular',
  android: 'VarelaRound-Regular',
  default: undefined,
});

export const fontFamilyFallback = Platform.select({
  ios: 'SF Pro Rounded',
  android: 'sans-serif',
  default: undefined,
});

export const typography = {
  title: {
    fontFamily,
    fontSize: 32,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontFamily,
    fontSize: 24,
    fontWeight: '700' as const,
  },
  body: {
    fontFamily,
    fontSize: 18,
  },
  caption: {
    fontFamily,
    fontSize: 14,
  },
  button: {
    fontFamily,
    fontSize: 18,
    fontWeight: '700' as const,
  },
};
