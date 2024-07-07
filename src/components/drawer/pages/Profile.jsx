import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";

// Icons 
import arrowIcon from "../../../../assets/icons/icons8-arrow-50.png";
import SettingMenu from '../../utils/settings/SettingMenu';

// Images 
import proPic from '../../../../assets/images/propic.jpg'

const Profile = () => {
    const navigation = useNavigation();

    const handleNavigateToHome = () => {
        navigation.navigate('HomeScreen');
        };

    return (
        <View className='h-[100%]' > 
            <View className='bg-blue-400 w-[100%] h-[30%]'>
                <View className='flex flex-row h-[80px] mt-[12%] ml-[10px] '>
                    <TouchableOpacity onPress={handleNavigateToHome}>
                    <Image className='h-[30px] w-[30px] mr-[10px]' source={arrowIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Card */}
            <View className='w-[100%] top-[-20%] flex flex-row justify-center z-20'>
                <View className='absolute bg-slate-100 flex flex-col items-center rounded-2xl h-[200px] w-[90%]'>
                    <View className='top-[-60px] border-2 border-black w-[100px] h-[100px] rounded-2xl '>
                        <Image className='object-contain w-[100%] h-[100%] overflow-hidden rounded-lg' source={proPic}/>
                    </View>
                    <View className=' top-[-40px]'>
                        <Text className='text-lg'>User Name</Text>
                    </View>

                    <View className='flex flex-row justify-around items-center h-[40%] w-[95%] border-t-[1px] p-2 top-[-20px] border-slate-400'>
                        <View className='flex flex-col items-center justify-center bg-white p-2 rounded-lg'>
                            <Text className='text-lg font-light'>Travel Count</Text>
                            <Text>23</Text>
                        </View>
                        <View className='flex flex-col items-center justify-center bg-white p-2 rounded-lg'>
                            <Text className='text-lg font-light'>Resident Location</Text>
                            <Text>Tembisa, Gauteng</Text>
                        </View>
                    </View>

                </View>
            </View>
            
            {/* Page Options */}
            <View className='bg-slate-200 h-[100%] z-10 p-2'>
                <View className='mt-[40%]'>
                <Text className='font-semibold text-lg'>Account</Text>
                <View>
                    <SettingMenu name={"Change Password"} />
                    <SettingMenu name={"Contact Details"} />
                </View>
                </View>
            </View>
        </View>
    )
}

export default Profile