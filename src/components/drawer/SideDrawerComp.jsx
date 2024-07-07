import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

// Icons
import settingsIcon from "../../../assets/icons/icons8-settings-100.png"
import infoIcon from "../../../assets/icons/icons8-info-100.png"
import myTrips from "../../../assets/icons/icons8-save-close-100.png"
import supportIcon from "../../../assets/icons/icons8-support-100.png"

const SideDrawerComp = () => {
  const navigation = useNavigation();

  function handleNavigateToSettings() {navigation.navigate("Settings");}
  function handleNavigateToMyTrips() {navigation.navigate("MyTrips");}
  function handleNavigateToMySupport() {navigation.navigate("Support");}
  function handleNavigateToAbout() {navigation.navigate("About");}

  return (
    <View className="bg-slate-300 flex items-center justify-center w-full h-full">
      <View className="w-[90%] h-[90%]">
        <View className="flex flex-col items-center bg-white w-full h-[100px] p-2 rounded-2xl">
          <View className="flex flex-row mx-[20px] items-center w-full">
            <View className="w-[70px] h-[70px] bg-slate-200 rounded-full"></View>
            <View className="ml-2">
              <Text>User Name</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Text className="text-blue-500">View Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View className="flex flex-col bg-white w-full  p-2 rounded-2xl my-[20px]">
          <TouchableOpacity className="flex flex-row items-center m-2 " onPress={handleNavigateToMyTrips}>
            <Image source={myTrips} className="w-[30px] h-[30px]"/>
            <Text className="ml-3 font-semibold text-lg">My Trips</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center m-2" onPress={handleNavigateToMySupport}>
            <Image source={supportIcon} className="w-[30px] h-[30px]"  />
            <Text className="ml-3 font-semibold text-lg">Support</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center m-2" onPress={handleNavigateToSettings}>
            <Image source={settingsIcon} className="w-[30px] h-[30px]"/>
            <Text className="ml-3 font-semibold text-lg">Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center m-2" onPress={handleNavigateToAbout}>
            <Image source={infoIcon} className="w-[30px] h-[30px]" />
            <Text className="ml-3 font-semibold text-lg">About</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SideDrawerComp;
