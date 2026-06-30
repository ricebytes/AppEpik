import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { SplashScreen } from '../screens/enrolamiento/SplashScreen';
import { IngresoIdentificacionScreen } from '../screens/enrolamiento/IngresoIdentificacionScreen';
import { ConfirmacionDatosScreen } from '../screens/enrolamiento/ConfirmacionDatosScreen';
import { CrearClaveScreen } from '../screens/enrolamiento/CrearClaveScreen';
import { ExitoScreen } from '../screens/enrolamiento/ExitoScreen';
import { LoginScreen } from '../screens/login/LoginScreen';
import { ValidandoLoginScreen } from '../screens/login/ValidandoLoginScreen';
import { DashboardScreen } from '../screens/login/DashboardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ValidandoLogin" component={ValidandoLoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="IngresoIdentificacion" component={IngresoIdentificacionScreen} />
      <Stack.Screen name="ConfirmacionDatos" component={ConfirmacionDatosScreen} />
      <Stack.Screen name="CrearClave" component={CrearClaveScreen} />
      <Stack.Screen name="Exito" component={ExitoScreen} />
    </Stack.Navigator>
  );
}
