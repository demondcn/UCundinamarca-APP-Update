import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No se encontró el documento.");
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleImageConfig = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
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

  // Dentro de tu ProfileScreen

  const handleLogout = async () => {
    try {
      await auth.signOut(); // ¡Listo! No necesitas navegar manualmente
    } catch (error) {
      Alert.alert("Error al cerrar sesión", error.message);
    }
  };

  if (!userData) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Perfil de Usuario</Text>
      <Text style={styles.label}>Email: {userData.email}</Text>
      <Text style={styles.label}>Nombres: {userData.nombres}</Text>
      <Text style={styles.label}>Apellidos: {userData.apellidos}</Text>
      <Text style={styles.label}>Universidad: {userData.universidad}</Text>

      <TouchableOpacity onPress={handleImageConfig} style={styles.imageButton}>
        <Image
          source={{
            uri:
              imageUri ||
              userData.imageUrl ||
              "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.imageButtonText}>Toca para cambiar la imagen</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 30 }}>
        <Button title="Cerrar sesión" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginVertical: 10,
  },
  imageButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageButtonText: {
    textAlign: "center",
    color: "#2196F3",
    marginTop: 8,
  },
});
