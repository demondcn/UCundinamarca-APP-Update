import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Swiper from "react-native-swiper";
import headerImage1 from "../assets/banner2x-100.jpg";
import headerImage2 from "../assets/BANNER_ENCUESTA_22x-100.jpg";
import headerImage3 from "../assets/banner cuento y poesia@2x-100.jpg";
import moduleImage1 from "../assets/IA.png";
import moduleImage2 from "../assets/cyber.jpg";
import moduleImage3 from "../assets/SOFTWARE.png";
import moduleImage4 from "../assets/EMPDIGITALES.png";

export default function HomeScreen() {
  const [activeSection, setActiveSection] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [aboutEventContent, setAboutEventContent] = useState("");

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const openModuleModal = (module) => {
    setSelectedModule(module);
    setModalVisible(true);
  };

  const closeModuleModal = () => {
    setSelectedModule(null);
    setAboutEventContent("");
    setModalVisible(false);
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

  const modules = [
    {
      title: "Módulo 1",
      description: "Explora las últimas tendencias en IA",
      image: moduleImage1,
      content: "Este módulo trata sobre las últimas tendencias en inteligencia artificial.",
    },
    {
      title: "Módulo 2",
      description: "Descubre el mundo de la ciberseguridad",
      image: moduleImage2,
      content: "Aprende sobre ciberseguridad y cómo proteger tus datos en línea.",
    },
    {
      title: "Módulo 3",
      description: "Innovación en desarrollo de software",
      image: moduleImage3,
      content: "Explora las herramientas más innovadoras para el desarrollo de software.",
    },
    {
      title: "Módulo 4",
      description: "Transformación digital en empresas",
      image: moduleImage4,
      content: "Conoce cómo las empresas están adoptando la transformación digital.",
    },
  ];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 0 }}>
      {/* Slider de imágenes */}
      <Swiper
        style={styles.slider}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={3}
        activeDotColor="#79c000"
      >
        <Image source={headerImage1} style={styles.headerImage} resizeMode="cover" />
        <Image source={headerImage2} style={styles.headerImage} resizeMode="cover" />
        <Image source={headerImage3} style={styles.headerImage} resizeMode="cover" />
      </Swiper>
      <View style={{ padding: 15 }}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.button}
          onPress={() => {
            setAboutEventContent(
              "FACULTAD DE INGENIERÍA PROGRAMACIÓN IX WORKSHOP “DIALOGANDO CON EL MUNDO DEL SOFTWARE LA IA Y LA SEGURIDAD INFORMÁTICA EN LA TRANSFORMACIÓN DIGITAL” ABRIL 3 DE 2025 EXTENSIÓN CHÍA\n\nEl link de inscripción lo encontraran en cada una de las secciones de los eventos\n\nTu participación en este evento será una valiosa oportunidad para ampliar tu visión sobre el futuro de la ingeniería y cómo puedes contribuir con tus conocimientos y habilidades a la construcción de un mundo más sostenible y tecnológico."
            );
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Acerca del evento da click aquí</Text>
        </TouchableOpacity>

        {/* Slider lateral de módulos */}
        <ScrollView horizontal style={styles.moduleSlider} showsHorizontalScrollIndicator={false}>
          {modules.map((module) => (
            <TouchableOpacity
              activeOpacity={1}
              key={module.title}
              style={styles.moduleContainer}
              onPress={() => openModuleModal(module)}
            >
              <Image source={module.image} style={styles.moduleImage} />
              <View style={styles.moduleOverlay}>
                <Text style={styles.moduleText}>{module.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View>
          <TouchableOpacity activeOpacity={1}>
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
          </TouchableOpacity>
        </View>

        {/* Acordeón */}
        <TouchableOpacity activeOpacity={1}>
          {sections.map((section, index) => (
            <View key={section.title} style={styles.accordionContainer}>
              <TouchableOpacity onPress={() => toggleSection(index)} style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
              </TouchableOpacity>
              <Collapsible collapsed={activeSection !== index}>
                <View style={styles.content}>
                  <Text>{section.content}</Text>
                </View>
              </Collapsible>
            </View>
          ))}
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModuleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedModule ? (
                <>
                  <Image source={selectedModule.image} style={styles.modalImage} />
                  <Text style={styles.modalTitle}>{selectedModule.title}</Text>
                  <Text style={styles.modalText}>{selectedModule.content}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.modalTitle}>Acerca del Evento</Text>
                  <Text style={styles.modalText}>{aboutEventContent}</Text>
                </>
              )}
              <TouchableOpacity style={styles.closeButton} onPress={closeModuleModal}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  slider: {
    height: 220,
    marginBottom: 5,
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#79c000",
  },
  buttonText: {
    color: "#79c000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  moduleSlider: {
    marginTop: 5,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  moduleContainer: {
    marginRight: 10,
    width: 150,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  moduleImage: {
    width: "100%",
    height: "100%",
  },
  moduleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  moduleText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
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
    borderEndStartRadius: 5,
    marginTop: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    height: "auto",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 190,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#00482B",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#79c000",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});