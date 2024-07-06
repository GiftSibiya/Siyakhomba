import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'

//Icons 
import menuIcon from "../../../../assets/icons/icons8-menu-48.png"
import { TouchableOpacity } from 'react-native-gesture-handler'

const MyTripComp = ({date, from, to, price}) => {

  const [conMenu, setContMenu] = useState(false)

  const handleMenuPress = () => {
    setContMenu((prevConMenu) => !prevConMenu);
  };

  const handleMenuCancel = () => {
    setContMenu(false)
  }

  return (
      <View className='mt-[30px]'>
        <Text className='my- px-3 text-lg font-semibold'>{date}</Text>
        <TouchableOpacity className='flex flex-row items-center justify-around bg-slate-200 rounded-3xl h-[80px]' onPress={handleMenuCancel}>
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
          <TouchableOpacity onPress={handleMenuPress}>
            <Image className='w-[25px] h-[25px]' source={menuIcon}/>
          </TouchableOpacity>

        {/* Menu Modal */}
        </TouchableOpacity>
        {conMenu &&
        <View className='absolute top-[90px] right-[0px] flex flex-col items-center justify-around bg-white opacity-80 w-[100px] rounded-xl h-[70px] '>
          <TouchableOpacity>
            <Text className=' font-semibold'>View</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className='text-red-500 font-semibold'>Delete</Text>
          </TouchableOpacity>
        </View>

        }
      </View>
  )
}

export default MyTripComp