import { Image, Text, TextInput, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import React, { useState } from "react";

// Icons
import fullStar from "../../../assets/icons/icons8-star-filled-48.png"
import openStar from "../../../assets/icons/icons8-star-open-48.png"
import carIcon from "../../../assets/icons/icons8-car-32.png"
import navigateIcon from "../../../assets/icons/icons8-navigate-30.png"

// Components
import Destinations from "../utils/Destinations";

const BtmDrawer = ({ selectedRank, onNavigate, onDestinationSelect }) => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [newDestination, setNewDestination] = useState({
    name: '',
    price: '',
    location: { _lat: '', _long: '' },
  });

  const handleDestinationPress = (location) => {
    setSelectedDestination(location);
    if (onDestinationSelect) {
      onDestinationSelect(location);
    }
  };

  const handleDestinationAdd = () => {
    setAddModal(true);
  };

  const handleDestinationSubmit = () => {
    if (!newDestination.name || !newDestination.price || !newDestination.location._lat || !newDestination.location._long) {
      alert('Please fill in all fields');
      return;
    }

    const updatedDestinations = [
      ...selectedRank.destinations,
      {
        ...newDestination,
        price: parseFloat(newDestination.price),
        location: {
          _lat: parseFloat(newDestination.location._lat),
          _long: parseFloat(newDestination.location._long),
        },
      }
    ];

    setSelectedDestination(null);  // Clear the selected destination
    setAddModal(false);            // Close the modal

    // Update the selectedRank with new destination (assuming selectedRank is a state)
    selectedRank.destinations = updatedDestinations;

    // Reset the input fields
    setNewDestination({
      name: '',
      price: '',
      location: { _lat: '', _long: '' },
    });

    console.log("Destination Added", updatedDestinations);
  };

  const handleModalCancel = () => {
    setAddModal(false);
  };

  const handleInputChange = (field, value) => {
    setNewDestination((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (field, value) => {
    setNewDestination((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  return (
    <View className='flex flex-column w-screen items-center bg-slate-50'>
      {addModal && 
      
      <View className='bg-black absolute w-[100%] h-[100%] opacity-50' ></View>
      }
      <View className='flex items-center w-[100%]'>
        {selectedRank?.destinations ? (
          <>
            <View className='flex flex-row items-center justify-center w-[100%]'>
              <View className='flex flex-col pb-2 w-[50%]'>
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
                <TouchableOpacity className="flex flex-row bg-green-500 m-1 w-[150px] h-[40px] rounded-3xl items-center justify-center" onPress={onNavigate}>
                  <Image className='h-[20px] w-[20px]' source={navigateIcon} />
                  <Text className="text-white p-2 ">Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className='bg-slate-300 p-2 rounded-xl w-[90%] h-[78%]'>
              <Text className='font-extrabold p-1 text-white'>Destinations</Text>

              {/* Rank Destinations */}
              <ScrollView>
                {selectedRank.destinations.map((destination, index) => (
                  <View key={index} style={{ flexDirection: 'column', marginBottom: 8 }}>
                    <Destinations
                      name={destination.name}
                      price={destination.price}
                      location={destination.location}
                      onPress={handleDestinationPress} />
                  </View>
                ))}
                <View className='flex items-center'>
                  <TouchableOpacity className='bg-green-400 p-2 rounded-md' onPress={handleDestinationAdd}>
                    <Text className='text-center text-white'>Add a missing destination</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            {/* Modal */}
            {addModal &&
              <View className='absolute flex items-center top-[10] w-[100%]'>
                <View className='bg-white flex items-center w-[90%] h-[300px]  rounded-xl'>
                  <View>
                    <Text className='text-lg font-semibold my-2'> {selectedRank.name} </Text>
                  </View>

                  {/* Add Destination */}
                  <View className='flex items-center w-full'>

                    <TextInput className ='border-[1px] p-2 rounded-xl w-[70%] my-1 bg-white'
                    placeholder="Destination Name" value={newDestination.name} onChangeText={(value) => handleInputChange('name', value)} /> 

                    <TextInput  className ='border-[1px] p-2 rounded-xl w-[70%] my-1 bg-white'
                     placeholder="Price" value={newDestination.price} onChangeText={(value) => handleInputChange('price', value)} />
                     <View className='flex flex-row my-1 w-[60%] justify-between'>
                      <TextInput  className ='border-[1px] p-2 rounded-xl w-[45%] bg-white'
                      placeholder="Latitude" value={newDestination.location._lat} onChangeText={(value) => handleLocationChange('_lat', value)} />

                      <TextInput  className ='border-[1px] p-2 rounded-xl w-[45%] bg-white'
                      placeholder="Longitude" value={newDestination.location._long} onChangeText={(value) => handleLocationChange('_long', value)} />

                     </View>

                  </View>

                  <View className='flex flex-row items-center w-[60%] m-2 justify-between'>
                    <TouchableOpacity className='bg-red-500 py-2 px-5 rounded-xl w-[100%]' onPress={handleModalCancel}>
                      <Text className='text-white text-center'>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-green-500 py-2 px-5 rounded-xl w-[90px]' onPress={handleDestinationSubmit}>
                      <Text className='text-white text-center'>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            }
          </>
        ) : (
          <View>
            <Text className='text-center text-slate-500 my-10'>
              Select a taxi rank on the map
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default BtmDrawer;
