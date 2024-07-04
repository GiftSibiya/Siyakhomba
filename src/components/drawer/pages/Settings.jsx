import { View, Text, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import SettingMenu from "../../utils/settings/SettingMenu";



export default function Settings() {
  return (
    <View className=" flex w-[100%] h-full mt-[30px]">
      <View className='p-[10px]'>
        <Text className='text-xl font-semibold'>Setting</Text>
        <View className='flex flex-row items-center justify-around mt-[10px] w-[100%] h-[80px]'>
          <View className='h-[50px] w-[50px] rounded-full border-2 border-black' ></View>
          <View className='flex flex-col' >
            <Text className='font-semibold'>User Name</Text>
            <Text>071 234 5678</Text>
            <Text>user.name@gmail.com</Text>
          </View>
        </View>
      </View>
      <View className='p-2'>
        <Text className='text-xl font-semibold'>App Setting</Text>
        <View className='flex flex-col items-centre justify-center p-2 mt-[10px] w-[100%] '>
          <SettingMenu name={"Add Home"} description={"Add Your Home Address"}/>
          <SettingMenu name={"Add Work"} description={"Add Your Work Address"}/>
          <SettingMenu name={"Appearance"} description={"Light Mode"}/>
        </View>
      </View>
      <View className='p-2'>
        <Text className='text-xl font-semibold'>Safety</Text>
        <View className='flex flex-col items-centre justify-center p-2 mt-[10px] w-[100%] '>
          <SettingMenu name={"Manage Trusted Contacts"} description={"Share your trip status with close friends"}/>
          <SettingMenu name={"Safety Tools"} description={"Mange You rSafety Tools"}/>
        </View>
      </View>
        <Text className='text-lg mx-auto text-red-600 font-semibold '>Sign Out</Text>
    </View>
  );
}
