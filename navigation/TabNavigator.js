import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Image,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import HomeScreen from "../screens/HomeScreen";
import LiveScreen from "../screens/LiveScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ConfigProfileScreen from "../screens/ConfigProfileScreen";
import AttendanceScreen from "../screens/AttendanceScreen"; 
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen
        name="ConfigProfileScreen"
        component={ConfigProfileScreen}
        options={{ headerShown: true, title: "Configurar Perfil" }}
      />
    </ProfileStack.Navigator>
  );
}

export default function TabNavigator() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    // Limpieza de los listeners al desmontar el componente
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "white",
            tabBarStyle: {
              backgroundColor: "#0B3D0B",
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
              height: 60,
              display: isKeyboardVisible ? "none" : "flex", 
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case "Inicio":
                  iconName = focused ? "home" : "home-outline";
                  break;
                case "En Vivo":
                  iconName = focused ? "videocam" : "videocam-outline";
                  break;
                case "Perfil":
                  iconName = focused ? "person" : "person-outline";
                  break;
                case "Asistencia":
                  iconName = focused ? "clipboard" : "clipboard-outline";
                  break;
                default:
                  iconName = "help";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Inicio"
            component={HomeScreen}
            options={{
              headerTitle: () => (
                <Image
                  source={require("../assets/ucundinamarca.png")}
                  style={{ width: 150, height: 50 }}
                  resizeMode="contain"
                />
              ),
              headerStyle: {
                backgroundColor: "white",
              },
              headerRight: () => (
                <Text
                  style={{ marginRight: 20, fontSize: 18, fontWeight: "bold" }}
                >
                  Inicio
                </Text>
              ),
            }}
          />
          <Tab.Screen
            name="En Vivo"
            component={LiveScreen}
            options={{
              headerTitle: () => (
                <Image
                  source={require("../assets/ucundinamarca.png")}
                  style={{ width: 150, height: 50 }}
                  resizeMode="contain"
                />
              ),
              headerStyle: {
                backgroundColor: "white",
              },
              headerRight: () => (
                <Text
                  style={{ marginRight: 20, fontSize: 18, fontWeight: "bold" }}
                >
                  En Vivo
                </Text>
              ),
            }}
          />
          <Tab.Screen
            name="Asistencia"
            component={AttendanceScreen}
            options={{
              headerTitle: () => (
                <Image
                  source={require("../assets/ucundinamarca.png")}
                  style={{ width: 150, height: 50 }}
                  resizeMode="contain"
                />
              ),
              headerStyle: {
                backgroundColor: "white",
              },
              headerRight: () => (
                <Text
                  style={{ marginRight: 20, fontSize: 18, fontWeight: "bold" }}
                >
                  Asistencia
                </Text>
              ),
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={ProfileStackNavigator}
            options={{
              headerTitle: () => (
                <Image
                  source={require("../assets/ucundinamarca.png")}
                  style={{ width: 150, height: 50 }}
                  resizeMode="contain"
                />
              ),
              headerStyle: {
                backgroundColor: "white",
              },
              headerRight: () => (
                <Text
                  style={{ marginRight: 20, fontSize: 18, fontWeight: "bold" }}
                >
                  Perfil
                </Text>
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </TouchableWithoutFeedback>
  );
}
