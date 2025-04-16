import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Por favor, completa todos los campos.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Auth state se maneja globalmente
      })
      .catch((error) => Alert.alert("Error", error.message));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer}>
        {/* Logo */}
        <Image
          source={require("../assets/udec-logo.png")} // Cambia esto por el logo de tu app
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesion</Text>
        </TouchableOpacity>

        {/* Signup link */}
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>¿No tienes cuenta? Crear una</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Centrado vertical
    alignItems: "center", // Centrado horizontal
    paddingHorizontal: 32, // Espaciado interno en los lados
    backgroundColor: "#FFFFFF",
  },
  innerContainer: {
    width: "100%",
    justifyContent: "center", // Centrado vertical
    alignItems: "center", // Centrado horizontal
    paddingVertical: 48, // Espaciado vertical
  },
  logo: {
    width: 145,
    height: 138,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#00482B", // Verde similar a tu ejemplo
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#888888",
    fontSize: 14,
    marginTop: 24,
    textAlign: "center",
  },
});
