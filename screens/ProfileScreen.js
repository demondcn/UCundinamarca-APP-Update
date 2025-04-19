import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();
  const user = auth.currentUser;

  // Verifica si el usuario está autenticado
  const fetchUserData = async () => {
    if (!user) return;
    try {
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setImageUri(docSnap.data().imageUrl || null); // Carga la imagen inicial
      } else {
        console.log("No se encontró el documento.");
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error.message);
      Alert.alert("Error", "No se pudieron cargar los datos del usuario.");
    }
  };

  // Carga los datos del usuario al abrir la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  // Carga los datos del usuario al cambiar de pantalla
  useEffect(() => {
    fetchUserData();
  }, [user]);

  // Configura la imagen del perfil
  const handleImageConfig = async () => {
    if (!user) {
      Alert.alert("Error", "Usuario no autenticado.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri); // Actualiza la imagen inmediatamente
      setLoading(true);

      try {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);

        const userRef = doc(db, "usuarios", user.uid);
        await updateDoc(userRef, {
          imageUrl: downloadURL,
        });

        setUserData((prev) => ({ ...prev, imageUrl: downloadURL }));
        Alert.alert("✅ Imagen configurada correctamente");
      } catch (error) {
        Alert.alert("Error al configurar imagen", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Cierra sesión del usuario
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      Alert.alert("Error al cerrar sesión", error.message);
    }
  };

  // Verifica si el usuario está autenticado
  if (!userData) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}></Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {userData.nombres} {userData.apellidos}
      </Text>
      <TouchableOpacity
        onPress={loading ? null : handleImageConfig}
        style={styles.imageButton}
        disabled={loading}
      >
        <Image
          source={
            imageUri
              ? { uri: imageUri } // Usa la imagen seleccionada o cargada
              : require("../assets/user_udec.png") // Imagen predeterminada
          }
          style={styles.avatar}
        />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{userData.email}</Text>
        <Text style={styles.label}>{userData.universidad}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ConfigProfileScreen")}
        style={styles.configButton}
      >
        <Text style={styles.configButtonText}>Configurar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    color: "#00482B",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    color: "#555",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  imageButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 30,
  },
  logoutButtonText: {
    color: "#00482B",
    fontSize: 16,
    fontWeight: "bold",
  },
  configButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#00482B",
    borderRadius: 5,
    paddingEnd: 80,
    paddingStart: 80,
  },
  configButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});