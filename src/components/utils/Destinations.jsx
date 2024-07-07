import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Destinations = ({ name, price, location, onPress }) => {

  const handleDestinationPress = () => {
    console.log(location)
    onPress(location)
  };

  return (
    <TouchableOpacity
      onPress={handleDestinationPress}
      className="bg-slate-200 h-[45px] flex flex-row justify-around items-center m-1 rounded-lg">
      <Text className=' w-[60%]'>{name}</Text>
      <Text>R{price}</Text>
    </TouchableOpacity>
  );
};

export default Destinations;
