import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React, { useState } from "react";

// Icons
import fullStar from "../../../assets/icons/icons8-star-filled-48.png"
import openStar from "../../../assets/icons/icons8-star-open-48.png"
import carIcon from "../../../assets/icons/icons8-car-32.png"
import navigateIcon from "../../../assets/icons/icons8-navigate-30.png"

// Components
import Destinations from "../utils/Destinations";
import { TouchableOpacity } from "react-native-gesture-handler";

const BtmDrawer = ({ selectedRank, onNavigate,  onDestinationSelect }) => {

  const [selectedDestination, setSelectedDestination] = useState(null)

  const handleDestinationPress = (location) => {
    setSelectedDestination(location);
    if (onDestinationSelect) {
      onDestinationSelect(location);
    }
  };


  return (
    <View className='flex flex-column w-screen items-center'>
      <View className='flex items-center w-[100%]' >
        {selectedRank?.destinations && selectedRank.destinations.length > 0 ? (
          <>
          <View className='flex flex-row items-center justify-center w-[100%]'>
            <View className='flex flex-col pb-2 w-[50%]' > 
              <View>
                <Text className='font-semibold text-lg'>{selectedRank.name}</Text>
              </View>
              <View className='flex flex-row justify-between w-[50%]'>
                <Text>3.9</Text>
                <View className='flex flex-row'>
                  <Image className='h-[20px] w-[20px]' source={fullStar} />
                  <Image className='h-[20px] w-[20px]' source={fullStar} />
                  <Image className='h-[20px] w-[20px]' source={fullStar} />
                  <Image className='h-[20px] w-[20px]' source={openStar} />
                  <Image className='h-[20px] w-[20px]' source={openStar} />
                </View>
                <Text>(52)</Text>
              </View>
              <View className='flex flex-row'>
                <Image className='h-[20px] w-[20px]' source={carIcon} />
                <Text> 4 min</Text>
              </View>
            </View>
            <View className='flex flex-row'>
              <TouchableOpacity className= "flex flex-row bg-green-500 m-1 w-[150px] h-[40px] rounded-3xl items-center justify-center" 
                onPress={onNavigate}>
                <Image  className='h-[20px] w-[20px]' source={navigateIcon}/>
                <Text className="text-white p-2 ">Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
            <View className='bg-slate-300 p-2 rounded-xl w-[90%] h-[78%]'>
              <Text className='font-extrabold p-1 text-white'>Destinatons</Text>

              {/* Rank Destinations */}
              <ScrollView>
                {selectedRank.destinations.map((destination, index) => (
                  <View key={index} style={{ flexDirection: 'column', marginBottom: 8 }}>
                    <Destinations 
                    name={destination.name} 
                    price={destination.price}  
                    location={destination.location} 
                    onPress={handleDestinationPress}/>
                  </View>
                ))}
              </ScrollView>

            </View>
          </>
        ) : (
          <Text style={{ textAlign: 'center', color: '#6B7280', marginVertical: 16 }}>
            Select a rank on the map
          </Text>
        )}
      </View>
    </View>
  );
};

export default BtmDrawer;
