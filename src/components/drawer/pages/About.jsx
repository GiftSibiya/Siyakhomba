import { View, Text, Image } from "react-native";
import React from "react";

// Components
import SettingMenu from "../../utils/settings/SettingMenu";



export default function About() {
  return (
    <View className=" flex w-[100%] h-full mt-[30px]">
      <View className='p-[10px]'>
        <Text className='text-xl font-semibold'>About</Text>
      </View>
      <View className='p-2'>
        <Text className='text-xl font-light text-slate-500'>Version: 0.0.0</Text>
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
