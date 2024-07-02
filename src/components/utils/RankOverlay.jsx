// RankOverlay.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Destinations from "../../components/utils/Destinations";

const RankOverlay = ({selectedRank, onClose, onNavigate }) => {

  return (
    <View className="absolute flex flex-col justify-between items-center  w-[100%] h-[30%] top-[100px]">
      <View className="flex flex-col justify-between items-center bg-white w-[92%] h-[100%] rounded-md">
        <View className="flex items-center w-[90%] h-[65%] mt-[20px]">
          <Text className="mb-1 font-semibold">Available Destinations</Text>
          <ScrollView className="bg-slate-100 py-2 w-[100%]">
            {selectedRank?.Destinations && selectedRank.Destinations.length > 0 ? (
              selectedRank.Destinations.map((destination, index) => (
                <Destinations key={index} name={destination.name} price={destination.price}/>
              ))
            ) : (
              <Text className="text-center text-gray-500">Select a rank on the map</Text>
            )}
          </ScrollView>
        </View>
        <View className="flex flex-row my-[10px]">
          <TouchableOpacity className="bg-green-500 m-1 w-[80px] h-[35px] rounded-lg flex items-center" onPress={onNavigate}>
            <Text className="text-white p-2 font-semibold">Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-500 m-1 w-[80px] h-[35px] rounded-lg flex items-center" onPress={onClose}>
            <Text className="text-white p-2 font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RankOverlay;
