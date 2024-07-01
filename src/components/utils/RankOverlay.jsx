// RankOverlay.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Destinations from "../../components/utils/Destinations";

const RankOverlay = ({ overlay, selectedRank, onClose, onNavigate }) => {
  if (!overlay) return null;

  return (
    <View className="absolute flex items-center bg-white w-[100%] h-[40%] top-[100px]">
      <View className="w-[90%] h-[50%] mt-[20px]">
        <ScrollView className="bg-slate-100 py-2">
          {selectedRank?.Destinations && selectedRank.Destinations.length > 0 ? (
            selectedRank.Destinations.map((destination, index) => (
              <Destinations key={index} name={destination.name} price={destination.price}/>
            ))
          ) : (
            <Text className="text-center text-gray-500">Select a rank on the map</Text>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity className="bg-red-500 m-2 w-[100px]" onPress={onClose}>
        <Text className="text-white p-2">Close</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-green-500 m-2 w-[100px]" onPress={onNavigate}>
        <Text className="text-white p-2">Navigate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RankOverlay;
