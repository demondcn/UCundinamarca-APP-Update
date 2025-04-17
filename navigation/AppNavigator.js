import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import TabNavigator from "./TabNavigator"; // Asegúrate de que TabNavigator esté correctamente configurado
import ConfigProfileScreen from "../screens/ConfigProfileScreen";
import { auth } from "../firebase/config";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("Error en la autenticación:", error);
        setLoading(false);
      }
    );

    return unsubscribe; // Limpiar el listener cuando el componente se desmonte
  }, []);

  if (loading) {
    // Mostrar una pantalla de carga mientras se verifica el estado de autenticación
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <ActivityIndicator size="large" color="#00482B" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Si el usuario está autenticado
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen
              name="ConfigProfileScreen"
              component={ConfigProfileScreen}
              options={{ headerShown: true, title: "Configurar Perfil" }} // Opcional: Mostrar encabezado
            />
          </>
        ) : (
          // Si el usuario no está autenticado
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{ headerShown: true, title: "Recuperar Contraseña" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
