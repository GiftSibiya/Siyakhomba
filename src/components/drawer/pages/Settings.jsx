import { View, Text, Image } from "react-native";
import React from "react";

import historyIcon from "../../../../assets/icons/icons8-history-100.png";

export default function Settings() {
  return (
    <View className="bg-slate-300 flex items-center justify-center w-[72%] h-full ">
      <View className=" w-[90%] h-[90%]">
        <View className="flex flex-col items-center bg-white w-full h-[100px] p-2 rounded-2xl">
          <View className="flex flex-row mx-[20px] items-center w-full  ">
            <View className="w-[70px] h-[70px] bg-slate-200 rounded-full"></View>
            <View className="ml-2">
              <Text>User Name</Text>
              <Text className="text-blue-500">View Account</Text>
            </View>
          </View>
          <View className="">
            <Text>Rating</Text>
          </View>
        </View>
        <View className="flex flex-col bg-white w-full h-[280px] p-2 rounded-2xl my-[20px]">
          <View className="flex flex-row items-center m-2 ">
            <Image source={historyIcon} className="w-[35px] h-[35px]" />
            <Text className="ml-3 font-bold text-lg ">Menu 1</Text>
          </View>
          <View className="flex flex-row items-center m-2">
            <Image source={historyIcon} className="w-[35px] h-[35px]" />
            <Text className="ml-3 font-bold text-lg ">Menu 1</Text>
          </View>
          <View className="flex flex-row items-center m-2">
            <Image source={historyIcon} className="w-[35px] h-[35px]" />
            <Text className="ml-3 font-bold text-lg ">Menu 1</Text>
          </View>
          <View className="flex flex-row items-center m-2">
            <Image source={historyIcon} className="w-[35px] h-[35px]" />
            <Text className="ml-3 font-bold text-lg ">Menu 1</Text>
          </View>
          <View className="flex flex-row items-center m-2">
            <Image source={historyIcon} className="w-[35px] h-[35px]" />
            <Text className="ml-3 font-bold text-lg ">Menu 1</Text>
          </View>
        </View>
        <View className="flex flex-col bg-white w-full h-[120px] p-2 rounded-2xl my-[20px]">
          <View className="flex flex-row items-center m-2">
            <Image source={historyIcon} className="w-[35px] h-[35px]" />
            <Text className="ml-3 font-bold text-lg ">Menu 1</Text>
          </View>
          <View className="flex flex-row items-center m-2">
            <Image source={historyIcon} className="w-[35px] h-[35px]" />
            <Text className="ml-3 font-bold text-lg ">Menu 1</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
