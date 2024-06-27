import { registerRootComponent } from 'expo';
import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Main Screen
import HomeScreen from "./src/screens/main/HomeScreen";

// Login
import Login from "./src/screens/auth/Login";
import Register from "./src/screens/auth/Register";

const Stack = createStackNavigator();

// Authentication Stack
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Main Stack
const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Side Drawer

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
