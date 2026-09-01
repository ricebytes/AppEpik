import React from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'SolicitarCreditoTienda'>;

const TIENDAS = [
  'Panafoto',
  'Panafoto Zona Libre',
  'Carbone',
  'La Onda y El Fuerte',
  'Premier',
  'Arrocha',
  'Digital Phones',
  'Tecnobytes',
  'Photura',
  'E-Visión',
  'Foto Sonido',
];

export function SolicitarCreditoTiendaScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Quiero un crédito con Epik</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero intro */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>💜</Text>
          <Text style={styles.heroTitle}>Obtener su crédito con Epik es muy fácil</Text>
          <Text style={styles.heroDesc}>
            Solo debe acercarse a cualquiera de nuestras tiendas aliadas con su cédula.
            Uno de nuestros asesores realizará el estudio de su solicitud y, en pocos minutos,
            le informará si su crédito fue aprobado.
          </Text>
        </View>

        {/* Tiendas */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeaderIcon}>📍</Text>
            <Text style={styles.cardHeaderTitle}>¿Dónde puede solicitarlo?</Text>
          </View>
          <Text style={styles.cardSubtitle}>
            Puede visitar cualquiera de nuestras tiendas aliadas:
          </Text>
          <View style={styles.tiendasGrid}>
            {TIENDAS.map((tienda) => (
              <View key={tienda} style={styles.tiendaChip}>
                <Text style={styles.tiendaChipIcon}>🏪</Text>
                <Text style={styles.tiendaChipLabel}>{tienda}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Requisitos */}
        <View style={styles.infoRow}>
          <View style={[styles.infoCard, { flex: 1 }]}>
            <Text style={styles.infoIcon}>📋</Text>
            <Text style={styles.infoTitle}>¿Qué necesita?</Text>
            <Text style={styles.infoDesc}>Cédula original</Text>
          </View>
          <View style={[styles.infoCard, { flex: 1 }]}>
            <Text style={styles.infoIcon}>⏱️</Text>
            <Text style={styles.infoTitle}>¿Cuánto tarda?</Text>
            <Text style={styles.infoDesc}>En 5 minutos</Text>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaBox}>
          <Text style={styles.ctaText}>
            ¡Lo esperamos para que disfrute la vida en cómodas cuotas!
          </Text>
          <Pressable
            style={({ pressed }) => [styles.ctaBtn, pressed && { opacity: 0.85 }]}
            onPress={() => Linking.openURL(
              'https://wa.me/5078404688?text=Soy%20nuevo%20deseo%20solicitar%20un%20credito%20epik',
            )}
          >
            <Text style={styles.ctaBtnLabel}>Solicitar crédito online →</Text>
          </Pressable>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.grisClaro,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.moradoOscuro,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  backBtn: {
    width: 36,
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 32,
    color: colors.blanco,
    lineHeight: 36,
    fontWeight: '300',
  },
  headerTitle: {
    flex: 1,
    ...typography.body,
    color: colors.blanco,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 14,
  },
  hero: {
    backgroundColor: colors.moradoOscuro,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  heroIcon: {
    fontSize: 40,
  },
  heroTitle: {
    ...typography.subtitle,
    color: colors.amarillo,
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
  },
  heroDesc: {
    ...typography.body,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  card: {
    backgroundColor: colors.blanco,
    borderRadius: 16,
    padding: 18,
    shadowColor: colors.negro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardHeaderIcon: {
    fontSize: 22,
  },
  cardHeaderTitle: {
    ...typography.body,
    color: colors.moradoOscuro,
    fontWeight: '800',
    fontSize: 16,
  },
  cardSubtitle: {
    ...typography.caption,
    color: '#666',
    fontSize: 13,
  },
  tiendasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tiendaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: `${colors.violeta}12`,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tiendaChipIcon: {
    fontSize: 13,
  },
  tiendaChipLabel: {
    ...typography.caption,
    color: colors.violeta,
    fontWeight: '700',
    fontSize: 13,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoCard: {
    backgroundColor: colors.blanco,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    shadowColor: colors.negro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  infoIcon: {
    fontSize: 28,
  },
  infoTitle: {
    ...typography.caption,
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  infoDesc: {
    ...typography.body,
    color: colors.moradoOscuro,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  ctaBox: {
    backgroundColor: colors.amarillo,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 14,
  },
  ctaText: {
    ...typography.body,
    color: colors.moradoOscuro,
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 21,
  },
  ctaBtn: {
    backgroundColor: colors.moradoOscuro,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  ctaBtnLabel: {
    ...typography.body,
    color: colors.blanco,
    fontWeight: '700',
    fontSize: 15,
  },
});
