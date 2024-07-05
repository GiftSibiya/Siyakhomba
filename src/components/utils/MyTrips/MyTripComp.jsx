import { View, Text, Image } from 'react-native'
import React from 'react'

//Icons 
import menuIcon from "../../../../assets/icons/icons8-menu-48.png"
import { TouchableOpacity } from 'react-native-gesture-handler'

const MyTripComp = ({date, from, to, price}) => {
  return (
      <View className='mt-[30px]'>
        <Text className='my- px-3 text-lg font-semibold'>{date}</Text>
        <View className='flex flex-row items-center justify-around bg-slate-200 rounded-3xl h-[80px] '>
          <View className=' p-3 rounded-2xl flex items-center'>
            <Text className='font-bold text-lg'>From</Text>
            <Text>{from}</Text>
          </View>
          <View className='p-3 rounded-2xl flex items-center'>
            <Text className='font-semibold text-lg'>To</Text>
            <Text>{to}</Text>
          </View>
          <View>
            <Text className='font-semibold text-lg'>{price}</Text>
          </View>
          <TouchableOpacity>
            <Image className='w-[25px] h-[25px]' source={menuIcon}/>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default MyTripComp