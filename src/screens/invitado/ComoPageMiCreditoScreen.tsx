import React from 'react';
import {
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

type Props = NativeStackScreenProps<RootStackParamList, 'ComoPageMiCredito'>;

const MEDIOS = [
  {
    icono: '📲',
    numero: '1️⃣',
    titulo: 'Yappy',
    lineas: [
      'Búscanos como @epikcredito o @epikenarrocha.',
      'Puedes pagar desde tu banco o directamente desde la app de Yappy.',
    ],
    nota: 'Al realizar el pago, agregue el número de cédula del titular del crédito en la opción "Comentarios".',
  },
  {
    icono: '🏪',
    numero: '2️⃣',
    titulo: 'Punto Pago (Kioskos)',
    lineas: [
      'Realiza tu pago en cualquiera de los kioscos Punto Pago.',
      'Tu pago se aplicará de forma inmediata.',
    ],
    nota: null,
  },
  {
    icono: '📱',
    numero: '3️⃣',
    titulo: 'App Punto Pago',
    lineas: [
      'También puedes pagar desde la app Punto Pago y desde allí podrás consultar la ubicación de los kioscos y sus horarios de atención.'
    ],
    nota: null,
  },
];

export function ComoPageMiCreditoScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>¿Cómo pago mi crédito?</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.introIcon}>💳</Text>
          <Text style={styles.introTitle}>Elige el medio de pago que prefieras</Text>
          <Text style={styles.introDesc}>
           Paga tu crédito de forma rápida y segura a través de cualquiera de estas opciones:
          </Text>
        </View>

        {/* Métodos de pago */}
        {MEDIOS.map((medio) => (
          <View key={medio.titulo} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconEmoji}>{medio.icono}</Text>
              </View>
              <View style={styles.cardHeaderTexts}>
                <Text style={styles.cardNumero}>{medio.numero}</Text>
                <Text style={styles.cardTitulo}>{medio.titulo}</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              {medio.lineas.map((linea) => (
                <View key={linea} style={styles.lineaRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.lineaText}>{linea}</Text>
                </View>
              ))}
              {medio.nota && (
                <View style={styles.notaBox}>
                  <Text style={styles.notaIcon}>✅</Text>
                  <Text style={styles.notaText}>{medio.nota}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
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
  intro: {
    backgroundColor: colors.moradoOscuro,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  introIcon: {
    fontSize: 36,
  },
  introTitle: {
    ...typography.subtitle,
    color: colors.amarillo,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  introDesc: {
    ...typography.body,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.blanco,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.negro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.violeta}12`,
    padding: 16,
    gap: 12,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.violeta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 22,
  },
  cardHeaderTexts: {
    flex: 1,
  },
  cardNumero: {
    fontSize: 12,
    color: colors.violeta,
    fontWeight: '700',
    marginBottom: 2,
  },
  cardTitulo: {
    ...typography.body,
    color: colors.moradoOscuro,
    fontWeight: '800',
    fontSize: 17,
  },
  cardBody: {
    padding: 16,
    gap: 8,
  },
  lineaRow: {
    flexDirection: 'row',
    gap: 8,
  },
  bullet: {
    color: colors.violeta,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  lineaText: {
    flex: 1,
    ...typography.body,
    color: '#444',
    fontSize: 14,
    lineHeight: 22,
  },
  notaBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E7',
    borderRadius: 10,
    padding: 12,
    gap: 8,
    marginTop: 4,
    borderLeftWidth: 3,
    borderLeftColor: colors.amarillo,
  },
  notaIcon: {
    fontSize: 16,
  },
  notaText: {
    flex: 1,
    ...typography.caption,
    color: '#555',
    fontSize: 13,
    lineHeight: 19,
  },
});
