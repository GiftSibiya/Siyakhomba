import React from 'react';
import { View, Text } from 'react-native';

//Components
import SettingMenu from '../../utils/settings/SettingMenu';

const Support = () => {
  return (
    <View className='flex flex-col items-center mt-[10%] p-4'>
      <Text className='font-semibold text-2xl w-[100%]'>Support</Text>
      <View className='mt-[20px]'>
        <SettingMenu name={"FAQs"} description={"Frequently Asked Questions"}/>
        <SettingMenu name={"Contact"} description={"Get in touch with us"}/>
        <SettingMenu name={"Bug Report"} description={"Found a problem? Let us know"}/>
        <SettingMenu name={"Feedback And Suggestions"} description={"Let us know how we can improve"}/>
      </View>
      <Text className='text-slate-400'>Siyakhomba V0.0.0 Prototype</Text>
  </View>
  );
};



export default Support;
