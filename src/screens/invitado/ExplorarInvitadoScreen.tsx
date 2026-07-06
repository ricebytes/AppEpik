import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'ExplorarInvitado'>;

const LOGO_ASPECT = 3000 / 1666;
const LOGO_WIDTH = 72;
const LOGO_HEIGHT = LOGO_WIDTH / LOGO_ASPECT;

const OPCIONES = [
  {
    icono: '💳',
    titulo: '¿Cómo pago\nmi crédito?',
    descripcion: 'Conoce los medios de pago disponibles para ti.',
    ruta: 'ComoPageMiCredito' as const,
  },
  {
    icono: '🙋',
    titulo: 'Quiero un crédito\ncon Epik',
    descripcion: 'Conoce los requisitos y empieza tu solicitud.',
    ruta: 'SolicitarCreditoTienda' as const,
  },
];

const TABS = [
  { icono: '🏠', label: 'Inicio', activo: true },
  { icono: '💳', label: 'Pagos', activo: false },
  { icono: '📄', label: 'Documentos', activo: false },
  { icono: '💸', label: 'Desembolsos', activo: false },
  { icono: '···', label: 'Más', activo: false },
];

export function ExplorarInvitadoScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <Image
            source={require('../../assets/images/logo-epik.png')}
            style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
            resizeMode="contain"
          />
          <Text style={styles.headerCredito}> crédito</Text>
        </View>
        <View style={styles.headerIcons}>
          <View style={styles.iconBtn}>
            <Text style={styles.iconEmoji}>🔔</Text>
            <View style={styles.badge} />
          </View>
          <Pressable
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.iconEmoji}>🏠</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <ImageBackground
          source={require('../../assets/images/fondo-bienvenida.jpg')}
          style={styles.hero}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.08)', 'rgba(28,12,64,0.72)']}
            style={[StyleSheet.absoluteFill, styles.heroGradient]}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Disfruta la vida <Text style={styles.heroRayo}>⚡</Text>
            </Text>
            <Text style={styles.heroSubtitle}>en cómodas cuotas</Text>
            <Text style={styles.heroDesc}>
              Explora nuestras opciones{'\n'}y encuentra lo que necesitas.
            </Text>
          </View>
        </ImageBackground>

        {/* Opciones */}
        <View style={styles.opciones}>
          {OPCIONES.map((op) => (
            <Pressable
              key={op.titulo}
              style={({ pressed }) => [styles.card, pressed && { opacity: 0.82 }]}
              onPress={() => navigation.navigate(op.ruta)}
            >
              <View style={styles.cardIconCircle}>
                <Text style={styles.cardIconEmoji}>{op.icono}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitulo}>{op.titulo}</Text>
                <Text style={styles.cardDesc}>{op.descripcion}</Text>
              </View>
              <Text style={styles.cardArrow}>›</Text>
            </Pressable>
          ))}
        </View>

      </ScrollView>

      {/* Tab bar */}
      <View style={[styles.tabBar, { paddingBottom: insets.bottom || 8 }]}>
        {TABS.map((tab) => (
          <Pressable
            key={tab.label}
            style={styles.tab}
            onPress={() => { if (tab.icono === '🏠') navigation.goBack(); }}
          >
            <Text style={[styles.tabIcon, tab.activo && styles.tabIconActivo]}>
              {tab.icono}
            </Text>
            <Text style={[styles.tabLabel, tab.activo && styles.tabLabelActivo]}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.blanco,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.blanco,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grisClaro,
  },
  headerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerCredito: {
    ...typography.body,
    color: colors.moradoOscuro,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.grisClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 17,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.amarillo,
    borderWidth: 1.5,
    borderColor: colors.blanco,
  },
  // Hero
  scroll: {
    flex: 1,
  },
  hero: {
    height: 220,
    justifyContent: 'flex-end',
  },
  heroGradient: {
    borderRadius: 0,
  },
  heroContent: {
    padding: 20,
    paddingBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.blanco,
    lineHeight: 34,
  },
  heroRayo: {
    color: colors.amarillo,
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.blanco,
    marginBottom: 6,
  },
  heroDesc: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.82)',
    lineHeight: 18,
  },
  // Cards
  opciones: {
    backgroundColor: colors.grisClaro,
    padding: 16,
    gap: 12,
    flex: 1,
    minHeight: 200,
  },
  card: {
    backgroundColor: colors.blanco,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
    shadowColor: colors.negro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: `${colors.violeta}18`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconEmoji: {
    fontSize: 22,
  },
  cardBody: {
    flex: 1,
  },
  cardTitulo: {
    ...typography.body,
    color: colors.moradoOscuro,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 4,
  },
  cardDesc: {
    ...typography.caption,
    color: '#666',
    lineHeight: 17,
  },
  cardArrow: {
    fontSize: 26,
    color: colors.violeta,
    fontWeight: '300',
  },
  // Tab bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.blanco,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.grisClaro,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.4,
  },
  tabIconActivo: {
    opacity: 1,
  },
  tabLabel: {
    ...typography.caption,
    fontSize: 10,
    color: '#999',
  },
  tabLabelActivo: {
    color: colors.amarillo,
    fontWeight: '700',
  },
});
