import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function AttendanceScreen() {
  const [formData, setFormData] = useState({});
  const [activeSections, setActiveSections] = useState(Array(12).fill(false));

  const sections = [
    {
      title: "Conferencia: Ciberseguridad y protección digital",
      key: "Modulo1",
    },
    { title: "Conferencia: Analítica de Datos para Negocios", key: "Modulo2" },
    { title: "Conferencia: Inteligencia Artificial Aplicada", key: "Modulo3" },
    { title: "Conferencia: Transformación Digital", key: "Modulo4" },
    { title: "Conferencia: Innovación en Tecnología", key: "Modulo5" },
    { title: "Actividad: Taller de Python", key: "Modulo6" },
    { title: "Actividad: Laboratorio de Redes", key: "Modulo7" },
    { title: "Actividad: Simulación de Ataques Éticos", key: "Modulo8" },
    { title: "Actividad: Visualización de Datos", key: "Modulo9" },
    { title: "Actividad: Desarrollo de Apps Móviles", key: "Modulo10" },
    { title: "Evaluación Final", key: "Modulo11" },
    { title: "Clausura y Entrega de Reconocimientos", key: "Modulo12" },
  ];
  // Cambia el estado de la sección activa
  const toggleSection = (index) => {
    const updatedSections = [...activeSections];
    updatedSections[index] = !updatedSections[index];
    setActiveSections(updatedSections);
  };
  // Cambia el estado del formulario
  const handleInputChange = (module, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [field]: value,
      },
    }));
  };
  // Button click, para los fomularios
  const handleSave = async (moduleKey, moduleTitle) => {
    const data = formData[moduleKey];
    if (
      !data ||
      !data.nombre ||
      !data.correo ||
      !data.opinion ||
      !data.valoracion
    ) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "asistencia"), {
        titulo: moduleTitle,
        nombre: data.nombre,
        correo: data.correo,
        opinion: data.opinion,
        valoracion: data.valoracion,
        fecha: new Date(),
      });
      Alert.alert(
        "Éxito",
        `Asistencia registradad correctamente \n\nRegistro en ${moduleTitle}`
      );
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar los datos.");
      console.error(error);
    }
  };

  const renderModule = (section, index) => {
    const data = formData[section.key] || {};
    // Renderizar cada módulo con su respectivo formulario
    return (
      <View key={section.key} style={styles.accordionContainer}>
        <TouchableOpacity
          onPress={() => toggleSection(index)}
          style={styles.header}
        >
          <Text style={styles.headerText}>{section.title}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={!activeSections[index]}>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              value={data.nombre || ""}
              onChangeText={(value) =>
                handleInputChange(section.key, "nombre", value)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={data.correo || ""}
              onChangeText={(value) =>
                handleInputChange(section.key, "correo", value)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Opinión sobre la actividad"
              value={data.opinion || ""}
              onChangeText={(value) =>
                handleInputChange(section.key, "opinion", value)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Valoración (1-5)"
              keyboardType="numeric"
              value={data.valoracion || ""}
              onChangeText={(value) =>
                handleInputChange(section.key, "valoracion", value)
              }
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleSave(section.key, section.title)}
            >
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
      </View>
    );
  };
  // Render main componente
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registro de Asistencia</Text>
      {sections.map((section, index) => renderModule(section, index))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#00482B",
  },
  accordionContainer: {
    marginBottom: 10,
  },
  header: {
    backgroundColor: "#79c000",
    padding: 15,
    borderRadius: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#00482B",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
