import React from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Bienvenida'>;

const LOGO_ASPECT = 3000 / 1666;
const LOGO_WIDTH = 88;
const LOGO_HEIGHT = LOGO_WIDTH / LOGO_ASPECT;

const TRUST_ITEMS = [
  { icon: '🔒', label: 'Seguro\ny confiable' },
  { icon: '⚡', label: 'Fácil y rápido\na tu alcance' },
  { icon: '📅', label: 'Paga a tu ritmo\nsin complicaciones' },
];

export function BienvenidaScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../../assets/images/fondo-bienvenida.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay tenue: casi transparente arriba, oscurece solo en la mitad inferior */}
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(28,12,64,0.50)', 'rgba(28,12,64,0.94)']}
        locations={[0, 0.38, 0.62, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.container, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 16 }]}>

        {/* Logo epik + "crédito" — centrado */}
        <View style={styles.logoRow}>
          <Image
            source={require('../../assets/images/logo-epik-blanco.png')}
            style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
            resizeMode="contain"
          />
          <Text style={styles.logoCredito}> crédito</Text>
        </View>

        {/* Titular centrado verticalmente en el espacio disponible */}
        <View style={styles.heroMiddle}>
          <Text style={styles.headline}>
            {'CUANDO TE DAS\n'}
            <Text style={styles.headlineBold}>{'EL PERMISO\nDE DISFRUTAR'}</Text>
          </Text>
          <Text style={styles.subhead}>Epik te acompaña en cómodas cuotas.</Text>
        </View>

        {/* Botones */}
        <View style={styles.buttons}>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={({ pressed }) => [styles.btnWrapper, pressed && { opacity: 0.88 }]}
          >
            <LinearGradient
              colors={[colors.violeta, '#C040E8', colors.amarillo]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.btnGradiente}
            >
              <Text style={styles.btnIcon}>👤</Text>
              <Text style={styles.btnGradienteLabel}>Iniciar sesión</Text>
              <Text style={styles.btnGradienteArrow}>→</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.btnOutline, pressed && { opacity: 0.75 }]}
            onPress={() => navigation.navigate('IngresoIdentificacion')}
          >
            <Text style={styles.btnIcon}>✨</Text>
            <Text style={styles.btnOutlineLabel}>¿Eres nuevo? Crea tu cuenta</Text>
            <Text style={styles.btnOutlineArrow}>→</Text>
          </Pressable>
        </View>

        {/* Indicadores de confianza */}
        <View style={styles.trustRow}>
          {TRUST_ITEMS.map((item) => (
            <View key={item.label} style={styles.trustItem}>
              <Text style={styles.trustIcon}>{item.icon}</Text>
              <Text style={styles.trustLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCredito: {
    ...typography.body,
    color: colors.blanco,
    fontSize: 15,
    letterSpacing: 0.5,
  },
  heroMiddle: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 16,
  },
  headline: {
    fontSize: 30,
    color: colors.blanco,
    fontWeight: '400',
    lineHeight: 38,
    marginBottom: 12,
    textAlign: 'center',
  },
  headlineBold: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.blanco,
    lineHeight: 42,
  },
  subhead: {
    ...typography.body,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 0,
    textAlign: 'center',
  },
  buttons: {
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  btnWrapper: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  btnGradiente: {
    height: 54,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btnIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  btnGradienteLabel: {
    flex: 1,
    ...typography.body,
    color: colors.blanco,
    fontWeight: '700',
    fontSize: 16,
  },
  btnGradienteArrow: {
    ...typography.body,
    color: colors.blanco,
    fontWeight: '700',
    fontSize: 18,
  },
  btnOutline: {
    height: 54,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btnOutlineLabel: {
    flex: 1,
    ...typography.body,
    color: colors.blanco,
    fontWeight: '600',
    fontSize: 15,
  },
  btnOutlineArrow: {
    ...typography.body,
    color: colors.blanco,
    fontSize: 18,
  },
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trustItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  trustIcon: {
    fontSize: 22,
  },
  trustLabel: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 14,
  },
});
