import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// Icons 
import arrowIcon from "../../../../assets/icons/icons8-arrow-50.png"

//Components
import SettingMenu from '../../utils/settings/SettingMenu';

const Support = () => {

  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate('Home'); // Use 'navigate' to go to the 'Home' screen
  };

  return (
    <View className='flex flex-col items-center mt-[10%] p-4'>

       <View className='flex flex-row p-[20px]'>
        <TouchableOpacity onPress={handleNavigateToHome}>
          <Image className='h-[30px] w-[30px] mr-[10px]' source={arrowIcon} />
        </TouchableOpacity>
        <Text className='font-semibold text-2xl w-[100%]'>Support</Text>
      </View>

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
