import React from "react";
import { View, Text, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

// Components
import SettingMenu from "../../utils/settings/SettingMenu";
import { ScrollView } from "react-native-gesture-handler";

// Icons 
import arrowIcon from "../../../../assets/icons/icons8-arrow-50.png"

// Images
import proPic from '../../../../assets/images/propic.jpg'

export default function Settings() {
  const navigation = useNavigation();
  
  const handleNavigateToHome = () => {
    navigation.navigate('HomeScreen'); // Use 'navigate' to go to the 'Home' screen
  };


  return (
    <View className=" flex w-[100%]  mt-[30px]">
      <ScrollView className=''>
      <View className='p-[20px]'>
        <View className='flex flex-row'>
          <TouchableOpacity onPress={handleNavigateToHome}>
            <Image className='h-[30px] w-[30px] mr-[10px]' source={arrowIcon} />
          </TouchableOpacity>
        <Text className='text-xl font-semibold'>Setting</Text>
        </View>
        <View className='flex flex-row items-center justify-around mt-[10px] w-[100%] h-[80px]'>
          <View className='h-[70px] w-[70px] rounded-full border-2 border-black' >
            <Image className='w-full h-full rounded-full' source={proPic}/>
          </View>
          <View className='flex flex-col' >
            <Text className='font-semibold'>John Davis</Text>
            <Text>071 234 5678</Text>
            <Text>user.name@gmail.com</Text>
          </View>
        </View>
      </View>
      <View className='p-2'>
        <Text className='text-xl font-semibold'>App Setting</Text>
        <View className='flex flex-col items-centre justify-center p-2 mt-[10px] w-[100%] '>
          <SettingMenu name={"Add Home"} description={"Add Your Home Address"}/>
          <SettingMenu name={"Add Work"} description={"Add Your Work Address"}/>
          <SettingMenu name={"Appearance"} description={"Light Mode"}/>
        </View>
      </View>
      <View className='p-2'>
        <Text className='text-xl font-semibold'>Safety</Text>
        <View className='flex flex-col items-centre justify-center p-2 mt-[10px] w-[100%] '>
          <SettingMenu name={"Manage Trusted Contacts"} description={"Share your trip status with close friends"}/>
          <SettingMenu name={"Safety Tools"} description={"Mange You rSafety Tools"}/>
        </View>
      </View>
      <View>
        <Text className='text-lg mx-auto text-red-600 font-semibold '>Sign Out</Text>
        <Text className='mx-auto text-slate-400'>Siyakhomba V0.0.0 Prototype</Text>
      </View>
      </ScrollView>
    </View>
  );
}
