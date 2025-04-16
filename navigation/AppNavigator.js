import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import TabNavigator from "./TabNavigator"; // Asegúrate de que TabNavigator esté correctamente importado
import ConfigProfileScreen from "../screens/ConfigProfileScreen";
import { auth } from "../firebase/config";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Cambiar el estado si el usuario está autenticado
    });

    return unsubscribe; // Limpiar el listener cuando el componente se desmonte
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Si el usuario está autenticado, redirigir a MainTabs */}
        {user ? (
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen
              name="ConfigProfile"
              component={ConfigProfileScreen}
              options={{ title: "Configurar Perfil" }}
            />
          </>
        ) : (
          // Si el usuario no está autenticado, mostrar Login y Signup
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
