import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export default function ConfigProfileScreen({ navigation }) {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [universidad, setUniversidad] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      Alert.alert(
        "Error",
        "Usuario no autenticado. Redirigiendo a la pantalla de inicio de sesión."
      );
      navigation.navigate("LoginScreen");
      return;
    }

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "usuarios", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setNombres(userData.nombres || "");
          setApellidos(userData.apellidos || "");
          setUniversidad(userData.universidad || "");
        } else {
          Alert.alert("Error", "No se encontraron datos del usuario.");
        }
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los datos del usuario.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigation]);

  const handleUpdateProfile = async () => {
    if (!nombres.trim() || !apellidos.trim() || !universidad.trim()) {
      Alert.alert("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, "usuarios", user.uid);
      await updateDoc(userRef, {
        nombres,
        apellidos,
        universidad,
      });

      Alert.alert("✅ Perfil actualizado correctamente");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error al actualizar perfil", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    // Muestra un indicador de carga mientras se cargan los datos
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00482B" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Configurar Perfil</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombres"
          value={nombres}
          onChangeText={setNombres}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={apellidos}
          onChangeText={setApellidos}
        />

        <TextInput
          style={styles.input}
          placeholder="Universidad"
          value={universidad}
          onChangeText={setUniversidad}
        />

        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: "#A9A9A9" }]}
          onPress={handleUpdateProfile}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#FFFFFF",
  },
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#00482B",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#00482B",
  },
});
