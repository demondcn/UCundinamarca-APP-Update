import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/config"; // Importa la configuración de Firebase

export default function AuthLoading() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Si el usuario está autenticado, redirigir a MainTabs
        navigation.replace("MainTabs");
      } else {
        // Si no está autenticado, redirigir a Login
        navigation.replace("LoginScreen");
      }
    });

    return unsubscribe; // Limpiar el listener cuando el componente se desmonte
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#2196F3" />
      <Text>Verificando autenticación...</Text>
    </View>
  );
}
