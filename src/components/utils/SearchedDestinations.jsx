import { View, Text, Image } from 'react-native'
import React from 'react'

// Icons
import rankIcon from "../../../assets/icons/map/rankIcon.png";

const SearchedDestinations = ({name, destination}) => {
  return (
    <View className='flex flex-row justify-around items-center bg-slate-200 m-1 h-[50px]'>
      <View>
        <Image source={rankIcon} className='h-[30px] w-[30px]'/>
      </View>
      <View className='flex flex-col items-center'>
        <Text className='font-semibold text-md'>{name}</Text>
        <Text>{destination}</Text>
      </View>
      <View className='flex items-center justify-center'>
        <Text className='font-semibold'>R30</Text>
      </View>
    </View>
  )
}

export default SearchedDestinations