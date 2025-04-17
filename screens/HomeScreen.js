import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Collapsible from "react-native-collapsible";
import headerImage from "../assets/banner2x-100.jpg";

export default function HomeScreen() {
  const [activeSections, setActiveSections] = useState(Array(6).fill(false));

  const toggleSection = (index) => {
    const updatedSections = Array(sections.length).fill(false);
    updatedSections[index] = !activeSections[index];
    setActiveSections(updatedSections);
  };

  const sections = [
    {
      title: "Protocolos de ingreso y apertura del evento",
      content:
        "7:30a.m. - 8:00 a.m. | Proceso de ingreso y formulario de asistencia\nLink de Inscripción: https://forms.office.com/r/PRh4RJkQrs | Habilitado hasta el 1.o de abril\n\n8:00a.m. - 8:10 a.m. | Himnos (Colombia- Cundinamarca- Universidad).\n\n8:10 a.m. - 8:30 a.m.- | Palabras de apertura del evento\nA cargo del doctor Adriano Muñoz Barrera, rector o de la doctora Vilma Moreno, vicerrectora Académica. Saludo Ingeniero Javier Hernando Gracia Gil - Decano Facultad de Ingeniería.",
    },
    {
      title: "Conferencias",
      content:
        "8:30 a.m. - 9:20 a.m. | Conferencia 'Ideas para la solución de problemas de la maratón nacional de programación'.\nLugar: Auditorio principal\nConferencista: Ing. Rafael García - Colombian Collegiate Programming League (CCPL)\n\n9:20 a.m. - 10:00 a.m. | Conferencia '20 años sin usar antivirus. Mi experiencia'.\nLugar: Auditorio principal\nConferencista: Ing. David López Salgado - Investigación y programación SAS y Géminis Software de alta calidad SAS\n\n10:00 a.m. - 10:10 a.m. | Pausa activa\n\n10:10 a.m. - 10:50 a.m. | Conferencia 'Concienciación y formación: la mejor defensa contra el phishing'.\nLugar. Auditorio principal\nConferencista: Ing. Ingrid Mahecha - DELOITTE Colombia\n\n10:50 a.m. - 11:30 a.m. | Conferencia 'Ciberseguridad sin filtros: lo que las empresas no te dicen sobre los ataques de ransomware'.\nConferencista: MSc Eduardo Chavarro Ovalle - Director para América del Equipo Global de Respuesta a Emergencias de Kaspersky\nLugar: Auditorio principal\nTransmisión conferencias: Facebook Facultad de Ingeniería: https://www.facebook.com/share/1QrmDBCq3v/",
    },
    { title: "Módulo 3", content: "Contenido del módulo 3" },
    { title: "Módulo 4", content: "Contenido del módulo 4" },
    { title: "Módulo 5", content: "Contenido del módulo 5" },
    { title: "Módulo 6", content: "Contenido del módulo 6" },
  ];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 0 }}>
      {/* Imagen al principio del HomeScreen */}
      <Image
        source={headerImage}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            color: "#00482B",
          }}
        >
          Programacion de Actividades y Conferencias
        </Text>
        {sections.map((section, index) => (
          <View key={index} style={styles.accordionContainer}>
            <TouchableOpacity
              onPress={() => toggleSection(index)}
              style={styles.header}
            >
              <Text style={styles.headerText}>{section.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1}>
              <Collapsible collapsed={!activeSections[index]}>
                <View style={styles.content}>
                  {/* Mantener el scroll dentro del acordeón solo si el contenido es largo */}
                  <ScrollView style={styles.scrollView}>
                    <Text>{section.content}</Text>
                  </ScrollView>
                </View>
              </Collapsible>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: 200,
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
    borderEndStartRadius: 5,
    marginTop: 0,
  },
  accordionContainer: {
    marginBottom: 10,
  },
  scrollView: {
    marginBottom: 10, // Agregar un margen inferior
  },
});
