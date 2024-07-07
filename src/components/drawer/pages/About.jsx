import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Icons 
import arrowIcon from "../../../../assets/icons/icons8-arrow-50.png"

// Components
import SettingMenu from "../../utils/settings/SettingMenu";

export default function About() {

  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate('HomeScreen'); // Use 'navigate' to go to the 'Home' screen
  };

  return (
    <View className=" flex w-[100%] h-full mt-[15%] ">
      <View className='p-[10px]'>
        <View className='flex flex-row'>
          <TouchableOpacity onPress={handleNavigateToHome}>
            <Image className='h-[30px] w-[30px] mr-[10px]' source={arrowIcon} />
          </TouchableOpacity>
          <Text className='font-semibold text-2xl'>About</Text>
        </View>
      </View>
      <View className='p-2'>
        <Text className='text-xl font-light text-slate-500 mx-[20px]'>Version: 0.0.0</Text>
        <View className='flex flex-col items-centre justify-center p-2 mt-[10px] w-[100%] '>
          <SettingMenu name={"Rate The App"} description={""}/>
          <SettingMenu name={"Follow Us On TikTok"} description={""}/>
          <SettingMenu name={"Legal"} description={""}/>
          <SettingMenu name={"Acknowledgements"} description={""}/>
          <SettingMenu name={"Privacy"} description={""}/>
        </View>
      </View>
      <Text className='mx-auto text-slate-400'>Prototype Developed By @b0b0 Gift Sibiya</Text>
      <Text className='mx-auto text-slate-400'>Siyakhomba V0.0.0 Prototype</Text>
    </View>
  );
}
