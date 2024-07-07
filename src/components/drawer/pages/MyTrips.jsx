import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";

//Components
import MyTripComp from '../../utils/MyTrips/MyTripComp'

// Icons 
import arrowIcon from "../../../../assets/icons/icons8-arrow-50.png"

const MyTrips = () => {

  const navigation = useNavigation()

  const handleNavigateToHome = () => {
    navigation.navigate('HomeScreen'); // Use 'navigate' to go to the 'Home' screen
  };

  return (
    <View className='mt-[10%] p-4'>
      <View className='flex flex-row'>
        <TouchableOpacity onPress={handleNavigateToHome}>
          <Image className='h-[30px] w-[30px] mr-[10px]' source={arrowIcon} />
        </TouchableOpacity>
        <Text className='font-semibold text-2xl'>MyTrips</Text>
      </View>

      <ScrollView className='h-[90%]'>
        <MyTripComp date='18 June 2024' from='Ivory Park' to='Pretoria' price='R20'/>
        <MyTripComp date='20 June 2024' from='Ivory Park' to='Pretoria' price='R20'/>
        <MyTripComp date='23 July 2024' from='Ivory Park' to='Pretoria' price='R20'/>
        <MyTripComp date='25 July 2024' from='Ivory Park' to='Pretoria' price='R20'/>
        <MyTripComp date='27 June 2024' from='Ivory Park' to='Pretoria' price='R20'/>
        <MyTripComp date='01 July 2024' from='Ivory Park' to='MTN Noord' price='R20'/>
        <MyTripComp date='02 July 2024' from='Ivory Park' to='Pretoria' price='R20'/>
      </ScrollView>
      <Text className='mx-auto text-slate-400'>Siyakhomba V0.0.0 Prototype</Text>
    </View>
  )
}

export default MyTrips