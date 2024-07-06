import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

// Icons
import arrowIcon from "../../../../assets/icons/icons8-arrow-30.png"
const SettingMenu = ({name ,description}) => {
  return (
    <TouchableOpacity className='bg-slate-100 p-2 rounded-lg flex flex-row w-[95%] justify-between m-2 h-[60px]'>
        <View className=''>
            <Text className='font-semibold'>{name}</Text>
            <Text className='font-light text-xs text-slate-600'>{description}</Text>
        </View>
        <View>
            <Image source={arrowIcon} className='' />
        </View>
    </TouchableOpacity>
  )
}

export default SettingMenu