import { Image, Text, TextInput, View } from "react-native";
import React from "react";

import searchIcon from "../../../assets/icons/icons8-search-100.png";

const BtmDrawer = () => {
  return (
    <View className="flex flex-column w-screen items-center">
      <View className="flex flex-row bg-slate-200 w-[80%] rounded-3xl p-2">
        <Image source={searchIcon} className="h-[40px] w-[40px] " />
        <TextInput placeholder="Where To?" className="p-2 text-lg font-bold" />
      </View>
    </View>
  );
};

export default BtmDrawer;
