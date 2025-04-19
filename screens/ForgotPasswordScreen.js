import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const db = getFirestore();

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Por favor, ingresa tu correo electrónico.");
      return;
    }

    try {
      // Verificar si el correo existe en Firebase Auth
      await sendPasswordResetEmail(auth, email);

      // Verificar si el correo existe en la colección "usuarios" en Firestore
      const usersRef = collection(db, "usuarios"); 
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert(
          "Error",
          "El correo no está registrado en la base de datos."
        );
        return;
      }

      Alert.alert(
        "Correo enviado",
        "Revisa tu bandeja de entrada para restablecer tu contraseña."
      );
      navigation.goBack();
    } catch (error) {
      // Manejar errores específicos de Firebase Auth
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "El correo no está registrado en Firebase Auth.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "El correo electrónico no es válido.");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Enviar correo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
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
    backgroundColor: "#00482B",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
