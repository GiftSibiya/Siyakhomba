import { Image, ScrollView, Text, TextInput, View } from "react-native";
import React from "react";

// Components
import Destinations from "../utils/Destinations";

import searchIcon from "../../../assets/icons/icons8-search-100.png";

const BtmDrawer = ({ selected }) => {
  console.log(selected);
  return (
    <View className="flex flex-column w-screen items-center">
      <View className="flex flex-row items-center w-[80%] rounded-3xl p-2 border-[2px] border-black">
        <Image source={searchIcon} className="h-[30px] w-[30px]" />
        <TextInput
          placeholder="Where To?"
          className="px-[10px] text-lg font-bold ring-2 ring-slate-800"
        />
      </View>
    </View>
  );
};

export default BtmDrawer;
