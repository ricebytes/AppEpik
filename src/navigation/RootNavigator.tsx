import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { SplashScreen } from '../screens/enrolamiento/SplashScreen';
import { IngresoIdentificacionScreen } from '../screens/enrolamiento/IngresoIdentificacionScreen';
import { ConfirmacionDatosScreen } from '../screens/enrolamiento/ConfirmacionDatosScreen';
import { VerificacionCorreoScreen } from '../screens/enrolamiento/VerificacionCorreoScreen';
import { IngresarOtpScreen } from '../screens/enrolamiento/IngresarOtpScreen';
import { CrearClaveScreen } from '../screens/enrolamiento/CrearClaveScreen';
import { ExitoScreen } from '../screens/enrolamiento/ExitoScreen';
import { LoginScreen } from '../screens/login/LoginScreen';
import { ValidandoLoginScreen } from '../screens/login/ValidandoLoginScreen';
import { DashboardScreen } from '../screens/login/DashboardScreen';
import { BienvenidaScreen } from '../screens/bienvenida/BienvenidaScreen';
import { ExplorarInvitadoScreen } from '../screens/invitado/ExplorarInvitadoScreen';
import { ComoPageMiCreditoScreen } from '../screens/invitado/ComoPageMiCreditoScreen';
import { SolicitarCreditoTiendaScreen } from '../screens/invitado/SolicitarCreditoTiendaScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
      <Stack.Screen name="ExplorarInvitado" component={ExplorarInvitadoScreen} />
      <Stack.Screen name="ComoPageMiCredito" component={ComoPageMiCreditoScreen} />
      <Stack.Screen name="SolicitarCreditoTienda" component={SolicitarCreditoTiendaScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ValidandoLogin" component={ValidandoLoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="IngresoIdentificacion" component={IngresoIdentificacionScreen} />
      <Stack.Screen name="ConfirmacionDatos" component={ConfirmacionDatosScreen} />
      <Stack.Screen name="VerificacionCorreo" component={VerificacionCorreoScreen} />
      <Stack.Screen name="IngresarOtp" component={IngresarOtpScreen} />
      <Stack.Screen name="CrearClave" component={CrearClaveScreen} />
      <Stack.Screen name="Exito" component={ExitoScreen} />
    </Stack.Navigator>
  );
}
