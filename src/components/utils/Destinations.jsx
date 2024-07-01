import { View, Text } from 'react-native'
import React from 'react'

const Destinations = ({name, price}) => {
  return (
    <View className="bg-slate-200 h-[35px] flex flex-row justify-around items-center m-1 rounded-lg">
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  )
}

export default Destinations