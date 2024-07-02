import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const DirectionOverlay = () => {
  return (
    <View className="absolute bg-white flex flex-col justify-center items-center  w-[100%] h-[25%] top-[100px]">
        <View className='bg-slate-500 flex items-center justify-center w-[90%] h-[40%]'>
            <View className='flex flex-row bg-slate-50 w-[90%] h-[80%] justify-around'>
                <View className='flex flex-col items-center justify-around' >
                    <Text>From </Text>
                    <Text className='font-semibold '>Your Location </Text>
                </View>
                <View className='flex flex-col items-center justify-around' >
                    <Text>To </Text>
                    <Text className='font-semibold '>This Place </Text>
                </View>
            </View>
        </View>
        <View className='flex flex-row border-[1px] w-[90%] h-[50px] justify-around border-slate-800'>
            <View className='flex flex-col'>
                <Text>Distance</Text>
                <Text>10Km</Text>
            </View>
            <View className='flex flex-col'>
                <Text>Travel Time</Text>
                <Text>13 Mins</Text>
            </View>
        </View>
        <View className='flex flex-row w-[60%] justify-between'>
            <TouchableOpacity className='bg-blue-500 p-2 rounded-lg mt-1'>
                <Text className='text-white font-semibold'>Navigate</Text>
            </TouchableOpacity>
            <TouchableOpacity className='bg-red-400 p-2 rounded-lg mt-1'>
                <Text className='text-white font-semibold'>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default DirectionOverlay