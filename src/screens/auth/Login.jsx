import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerComp from "../../components/drawer/SideDrawerComp";

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text className="text-3xl">Login</Text>
      <Button title="Login" onPress={() => navigation.navigate("MainStack")} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    display: "flex",
    width: "100%",
    height: "100%",
  },
});
