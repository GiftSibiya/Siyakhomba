import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const DirectionOverlay = ({selectedRank}) => {

    const handleNavigatePress = () => {
        alert("Navigation Feature Coming Soon")
    }

  return (
    <View className="absolute flex flex-col justify-center items-center  w-[100%] h-[200px] top-[150px]">
        <View className='bg-slate-300 border-[1px] border-black rounded-xl flex items-center justify-center w-[90%] h-[70%]'>
            <View className='flex flex-row bg-slate-50 rounded-xl w-[90%] h-[40%] justify-around'>
                <View className='flex flex-col items-center mt-1' >
                    <Text>From </Text>
                    <Text className='font-semibold '>Your Location </Text>
                </View>
                <View className='flex flex-col items-center  mt-1' >
                    <Text>To </Text>
                    <Text className='font-semibold '>{selectedRank.name} </Text>
                </View>
            </View>
        <View className='flex flex-row w-[90%] mt-[5px] h-[50px] justify-around '>
            <View className='flex flex-col items-center'>
                <Text className='font-semibold'>Distance</Text>
                <Text>10Km</Text>
            </View>
            <View className='flex flex-col items-center'>
                <Text className='font-semibold'>Travel Time</Text>
                <Text>13 Mins</Text>
            </View>
            <View>
            <TouchableOpacity className='bg-blue-500 p-2 rounded-lg mt-1' onPress={handleNavigatePress}>
                <Text className='text-white font-semibold'>Navigate</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
    </View>
  )
}

export default DirectionOverlay