import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

// Icons
import historyIcon from "../../../assets/icons/icons8-history-100.png";

const SideDrawerComp = () => {
  const navigation = useNavigation();

  function handleNavigateToSettings() {
    navigation.navigate("Settings");
  }

  return (
    <View className="bg-slate-300 flex items-center justify-center w-full h-full">
      <View className="w-[90%] h-[90%]">
        <View className="flex flex-col items-center bg-white w-full h-[100px] p-2 rounded-2xl">
          <View className="flex flex-row mx-[20px] items-center w-full">
            <View className="w-[70px] h-[70px] bg-slate-200 rounded-full"></View>
            <View className="ml-2">
              <Text>User Name</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Text className="text-blue-500">View Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex flex-col bg-white w-full h-[220px] p-2 rounded-2xl my-[20px]">
          <View className="flex flex-row items-center m-2">
            <Image source={historyIcon} className="w-[35px] h-[35px]"/>
            <Text className="ml-3 font-bold text-lg">Connections</Text>
          </View>
          <View className="flex flex-row items-center m-2">
            <Image source={historyIcon} className="w-[35px] h-[35px]"/>
            <Text className="ml-3 font-bold text-lg">Contact</Text>
          </View>
          <TouchableOpacity className="flex flex-row items-center m-2" onPress={handleNavigateToSettings}>
            <Image source={historyIcon} className="w-[35px] h-[35px]"/>
            <Text className="ml-3 font-bold text-lg">Settings</Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center m-2">
            <Image source={historyIcon} className="w-[35px] h-[35px]"/>
            <Text className="ml-3 font-bold text-lg">Info</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SideDrawerComp;
