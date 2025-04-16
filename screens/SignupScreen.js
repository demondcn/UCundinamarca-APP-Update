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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para la confirmación de contraseña
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [universidad, setUniversidad] = useState("");

  const handleSignup = async () => {
    if (
      !email ||
      !password ||
      !nombres ||
      !apellidos ||
      !universidad ||
      !confirmPassword
    ) {
      Alert.alert("Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        email,
        nombres,
        apellidos,
        universidad,
        imageUrl: "https://cdn-icons-png.flaticon.com/128/8861/8861125.png",
      });

      Alert.alert("Cuenta creada exitosamente");
      navigation.navigate("Login"); // Redirige al login después de crear la cuenta
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "Este correo electrónico ya está registrado.");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer}>
        {/* Logo */}
        <Image
          source={require("../assets/udec-logo.png")} // Cambié la forma de cargar la imagen
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Nombres input */}
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombres}
          onChangeText={setNombres}
        />

        {/* Apellidos input */}
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={apellidos}
          onChangeText={setApellidos}
        />

        {/* Universidad input */}
        <TextInput
          style={styles.input}
          placeholder="Universidad"
          value={universidad}
          onChangeText={setUniversidad}
        />

        {/* Correo electrónico input */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Contraseña input */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Confirmar contraseña input */}
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          value={confirmPassword} // Vinculé el estado de confirmar contraseña
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* Register button */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* Link to login screen */}
        <View style={styles.linkContainer}>
          <Text style={styles.link}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#00482B", // Color del título
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
  linkContainer: {
    flexDirection: "row", // Alineación horizontal
    justifyContent: "center", // Centrado horizontal
    marginTop: 24,
  },
  link: {
    color: "#888888",
    fontSize: 14,
    marginRight: 5, // Espacio entre el texto "¿Ya tienes cuenta?" y el enlace "Iniciar sesión"
  },
});
