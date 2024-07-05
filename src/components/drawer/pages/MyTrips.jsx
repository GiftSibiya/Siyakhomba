import { View, Text, ScrollView } from 'react-native'
import React from 'react'

//Components
import MyTripComp from '../../utils/MyTrips/MyTripComp'

const MyTrips = () => {
  return (
    <View className='mt-[10%] p-4'>
      <Text className='font-semibold text-2xl'>MyTrips</Text>
      <ScrollView className=''>
        <MyTripComp date='18 June 2024' from='Ivory Park' to='Pretoria' price='R20'/>
        <MyTripComp date='20 June 2024' from='Ivory Park' to='Pretoria' price='R20'/>
        <MyTripComp date='23 July 2024' from='Ivory Park' to='Pretoria' price='R20'/>
        <MyTripComp date='25 July 2024' from='Ivory Park' to='Pretoria' price='R20'/>
        <MyTripComp date='27 June 2024' from='Ivory Park' to='Pretoria' price='R20'/>
        <MyTripComp date='01 July 2024' from='Ivory Park' to='MTN Noord' price='R20'/>
        <MyTripComp date='02 July 2024' from='Ivory Park' to='Pretoria' price='R20'/>
      </ScrollView>
    </View>
  )
}

export default MyTrips