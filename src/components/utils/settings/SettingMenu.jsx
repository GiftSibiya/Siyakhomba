import { View, Text, Image } from 'react-native'
import React from 'react'

// Icons
import arrowIcon from "../../../../assets/icons/icons8-arrow-30.png"
const SettingMenu = ({name ,description}) => {
  return (
    <View className='bg-slate-200 p-2 rounded-lg flex flex-row w-[100%] justify-between m-2'>
        <View className=''>
            <Text className='font-semibold'>{name}</Text>
            <Text className='font-light text-xs text-slate-600'>{description}</Text>
        </View>
        <View>
            <Image source={arrowIcon} className='' />
        </View>
    </View>
  )
}

export default SettingMenu