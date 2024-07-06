import { Button, Text, TextInput, TextInputComponent, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const Login = ({ navigation }) => {
  return (
    <View className=' flex items-center w-[100%] h-[100%] bg-slate-200' >
      <View className='flex flex-col items-center justify-center  w-[90%] h-[90%] z-20'>
        <View className=' h-[14%] w-[90%] flex items-center justify-center'>
          <Text className='font-extrabold text-[30px] text-white'>SIYAKHOMBA</Text>
        </View>
        <View className='my-5'>
          <Text className='text-white'>Welcome back to your transportation guide </Text>
        </View>

        {/* Login Container */}
        <View className='bg-slate-100 flex flex-col items-center h-[300px] w-[90%] my-2 rounded-3xl'>
          <Text className='text-xl font-semibold my-4'> Login </Text>
          <TextInput placeholder="Email" className='bg-white w-[90%] rounded-lg p-2 my-2'/>
          <TextInput placeholder="Password" className='bg-white w-[90%] rounded-lg p-2 my-2'/>
          <TouchableOpacity>
            <Text className='text-blue-600'>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-blue-400 w-[200px] flex flex-row items-center justify-center p-2 h-[40px] rounded-2xl my-5' onPress={() => navigation.navigate("MainStack")}>
            <Text className='font-semibold text-white'>Login</Text>
          </TouchableOpacity>
        </View>

        {/* No Account */}
        <View className='flex flex-col items-center'>
          <Text className='font-light text-lg'>Don't have an account?</Text>
          <TouchableOpacity  onPress={() => navigation.navigate("Register")}>
            <Text className='text-blue-600 text-lg font-semibold'>REGISTER</Text>
          </TouchableOpacity>
        </View>


        </View>
        <View className='bg-blue-500 absolute w-full h-[500px] z-10 rounded-b-[100px]'>
      </View>
    </View>
  );
};

export default Login;