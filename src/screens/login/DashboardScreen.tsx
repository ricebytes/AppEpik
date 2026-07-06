import React from 'react';
import {
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
import { useSesionStore } from '../../state/sesionStore';
import { formatMonto } from '../../utils/moneda';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const HEADER_HEIGHT = 280;

function primerNombre(nombreCompleto: string): string {
  return nombreCompleto.trim().split(/\s+/)[0] ?? nombreCompleto;
}

const TABS = [
  { icon: '🏠', label: 'Inicio', active: true, disabled: false, action: 'dashboard' },
  { icon: '💳', label: 'Pagos', active: false, disabled: true, action: null },
  { icon: '📄', label: 'Documentos', active: false, disabled: true, action: null },
  { icon: '💵', label: 'Desembolsos', active: false, disabled: true, action: null },
  { icon: '···', label: 'Más', active: false, disabled: false, action: 'mas' },
];

export function DashboardScreen({ navigation }: Props) {
  const cliente = useSesionStore((state) => state.cliente);
  const logout = useSesionStore((state) => state.logout);
  const insets = useSafeAreaInsets();

  if (!cliente) {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    return null;
  }

  const enMora = cliente.estadoCredito.toLowerCase().includes('mora');

  function handleLogout() {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Bienvenida' }] });
  }

  const filas = [
    { icon: '💳', label: 'Saldo total por pagar', valor: `${formatMonto(cliente.pagoTotalCredito)} USD` },
    { icon: '📋', label: 'Pago mínimo', valor: `${formatMonto(cliente.pagoMinimo)} USD` },
    { icon: '📅', label: 'Valor cuota', valor: `${formatMonto(cliente.cuotaCredito)} USD` },
  ];

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO HEADER ── */}
        <ImageBackground
          source={require('../../assets/images/fondo-bienvenida.jpg')}
          style={[styles.hero, { height: HEADER_HEIGHT + insets.top }]}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(28,12,64,0.55)', 'rgba(28,12,64,0.90)']}
            locations={[0, 1]}
            style={StyleSheet.absoluteFill}
          />

          {/* Top bar */}
          <View style={[styles.topBar, { paddingTop: insets.top + 10 }]}>
            <View style={styles.logoRow}>
              <Text style={styles.logoEpik}>epik</Text>
              <Text style={styles.logoCredito}> crédito</Text>
            </View>
            <View style={styles.topIcons}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>🔔</Text>
              </View>
              <Pressable style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutIcon}>⎋</Text>
                <Text style={styles.logoutLabel}>Salir</Text>
              </Pressable>
            </View>
          </View>

          {/* Greeting */}
          <View style={styles.heroContent}>
            <Text style={styles.heroGreeting}>
              Hola {primerNombre(cliente.nombreCompleto)} 👋
            </Text>
            <Text style={styles.heroSub}>Disfruta la vida en cómodas cuotas</Text>
            {enMora && (
              <View style={styles.moraChip}>
                <Text style={styles.moraText}>
                  EN MORA · {formatMonto(cliente.cuotaEnMora)}
                </Text>
              </View>
            )}

            {/* Mi crédito button */}
            <Pressable style={styles.creditoBtnWrapper} onPress={() => {}}>
              <LinearGradient
                colors={[colors.violeta, colors.amarillo]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.creditoBtn}
              >
                <Text style={styles.creditoBtnIcon}>💳</Text>
                <Text style={styles.creditoBtnLabel}>Mi crédito</Text>
                <Text style={styles.creditoBtnArrow}>›</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </ImageBackground>

        {/* ── CONTENT ── */}
        <View style={styles.content}>

          {/* Resumen card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Resumen de tu crédito</Text>
            {filas.map((fila, i) => (
              <View key={fila.label} style={[styles.row, i > 0 && styles.rowBorder]}>
                <View style={styles.rowIcon}>
                  <Text style={styles.rowIconText}>{fila.icon}</Text>
                </View>
                <View style={styles.rowTexts}>
                  <Text style={styles.rowLabel}>{fila.label}</Text>
                  <Text style={styles.rowValor}>{fila.valor}</Text>
                </View>
                <Text style={styles.rowChevron}>›</Text>
              </View>
            ))}
          </View>

          {/* Cupo disponible card */}
          <ImageBackground
            source={require('../../assets/images/fondo-bienvenida.jpg')}
            style={styles.cupoCard}
            imageStyle={styles.cupoCardImage}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(28,12,64,0.60)', 'rgba(28,12,64,0.88)']}
              style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
            />
            <Text style={styles.cupoTitle}>Cupo disponible{'\n'}para usar</Text>
            <View style={styles.cupoMontoRow}>
              <Text style={styles.cupoMontoIcon}>💳</Text>
              <Text style={styles.cupoMonto}>{formatMonto(cliente.cupoDisponible)} USD</Text>
            </View>
            <Pressable onPress={() => {}}>
              <Text style={styles.cupoLink}>Ver más detalles  ›</Text>
            </Pressable>
          </ImageBackground>

        </View>
      </ScrollView>

      {/* ── BOTTOM TAB BAR ── */}
      <View style={[styles.tabBar, { paddingBottom: insets.bottom + 4 }]}>
        {TABS.map((tab) => (
          <Pressable
            key={tab.label}
            style={[styles.tab, tab.disabled && styles.tabDisabled]}
            disabled={tab.disabled}
            onPress={() => {
              if (tab.action === 'mas') navigation.navigate('ExplorarInvitado');
            }}
          >
            <Text style={[styles.tabIcon, tab.disabled && styles.tabIconDisabled]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, tab.active && styles.tabLabelActive, tab.disabled && styles.tabLabelDisabled]}>
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
    backgroundColor: '#F3F3F8',
  },
  scroll: {
    flex: 1,
  },

  /* Hero */
  hero: {
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoEpik: {
    ...typography.subtitle,
    color: colors.blanco,
    fontWeight: '800',
    fontSize: 22,
  },
  logoCredito: {
    ...typography.body,
    color: colors.blanco,
    fontSize: 14,
  },
  topIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 15,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  logoutIcon: {
    fontSize: 14,
    color: colors.blanco,
  },
  logoutLabel: {
    ...typography.caption,
    color: colors.blanco,
    fontWeight: '700',
    fontSize: 13,
  },
  heroContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  heroGreeting: {
    ...typography.title,
    color: colors.blanco,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  heroSub: {
    ...typography.body,
    color: 'rgba(255,255,255,0.80)',
    fontSize: 14,
    marginBottom: 16,
  },
  moraChip: {
    backgroundColor: colors.magenta,
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  moraText: {
    ...typography.caption,
    color: colors.blanco,
    fontWeight: '700',
    fontSize: 12,
  },
  creditoBtnWrapper: {
    alignSelf: 'flex-start',
    borderRadius: 24,
    overflow: 'hidden',
  },
  creditoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    gap: 8,
  },
  creditoBtnIcon: {
    fontSize: 16,
  },
  creditoBtnLabel: {
    ...typography.body,
    color: colors.blanco,
    fontWeight: '700',
    fontSize: 15,
  },
  creditoBtnArrow: {
    color: colors.blanco,
    fontSize: 20,
    fontWeight: '700',
  },

  /* Content */
  content: {
    padding: 16,
    gap: 14,
  },

  /* Resumen card */
  card: {
    backgroundColor: colors.blanco,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    ...typography.body,
    color: colors.moradoOscuro,
    fontWeight: '700',
    marginBottom: 14,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F0EFF5',
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(120,70,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIconText: {
    fontSize: 18,
  },
  rowTexts: {
    flex: 1,
  },
  rowLabel: {
    ...typography.caption,
    color: '#888',
    fontSize: 12,
    marginBottom: 2,
  },
  rowValor: {
    ...typography.body,
    color: colors.moradoOscuro,
    fontWeight: '700',
    fontSize: 16,
  },
  rowChevron: {
    color: '#CCC',
    fontSize: 22,
    fontWeight: '600',
  },

  /* Cupo card */
  cupoCard: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 20,
    minHeight: 140,
    justifyContent: 'center',
  },
  cupoCardImage: {
    borderRadius: 16,
  },
  cupoTitle: {
    ...typography.body,
    color: colors.blanco,
    fontSize: 15,
    marginBottom: 10,
    lineHeight: 20,
  },
  cupoMontoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cupoMontoIcon: {
    fontSize: 20,
  },
  cupoMonto: {
    ...typography.title,
    color: colors.blanco,
    fontSize: 24,
    fontWeight: '800',
  },
  cupoLink: {
    ...typography.body,
    color: colors.amarillo,
    fontWeight: '700',
    fontSize: 14,
  },

  /* Bottom tab bar */
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.blanco,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    ...typography.caption,
    fontSize: 10,
    color: '#AAA',
  },
  tabLabelActive: {
    color: colors.amarillo,
    fontWeight: '700',
  },
  tabDisabled: {
    opacity: 0.35,
  },
  tabIconDisabled: {
    opacity: 0.5,
  },
  tabLabelDisabled: {
    color: '#CCC',
  },
});
