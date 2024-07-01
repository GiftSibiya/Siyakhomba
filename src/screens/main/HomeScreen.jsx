import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps"; 
import * as Location from 'expo-location'; 
import BtmDrawer from "../../components/homescreen/BtmDrawer";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { createDrawerNavigator } from "@react-navigation/drawer";

// JSON
import rankData from "../../../assets/json/RankData.json"

// Icons 
import menuImg from "../../../assets/icons/icons8-hamburger-menu-50.png";
import locateIcon from "../../../assets/icons/icons8-location-100.png"; 
import mapMarker from "../../../assets/icons/icons8-full-stop-100.png"
import rankIcon from "../../../assets/icons/map/rankIcon.png"

// Side Drawer
import SideDrawerComp from "../../components/drawer/SideDrawerComp";

// Side Components
import Settings from "../../components/drawer/pages/Settings";
import MyTrips from "../../components/drawer/pages/MyTrips"
import Support from "../../components/drawer/pages/Support"
import About from "../../components/drawer/pages/About"

const HomeScreen = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  const snapPoints = useMemo(() => ["13%", "25%", "50%", "80%"], []);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const [overlay, setOverlay] = useState(false); // Add this state

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []); 

  const centerMapOnUser = async () => {
    if (!mapRef.current) return;

    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  };

  const centerMapOnMarker = (latitude, longitude) => {
    if (!mapRef.current) return;

    const offset = -0.020; // Adjust this value as needed
    mapRef.current.animateToRegion({
      latitude: latitude - offset, // Offset latitude to center below
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000);
  };

  const handleMarkerPress = (RankData) => {
    setSelectedRank(RankData);
    centerMapOnMarker(RankData.coordinates._lat, RankData.coordinates._long);
    setOverlay(true); // Show the overlay when a marker is pressed
  };

  const handleMapClick = () => {
    setOverlay(false); // Correctly reset the state
    setSelectedRank(null);
  }

  return (
    <View className="flex-1">
      <MapView 
        ref={mapRef} 
        className="flex-1" 
        showsCompass={true} 
        followsUserLocation={true}
        onPress={handleMapClick} // Use the corrected function here
        region={location ? 
          { latitude: location.latitude, 
            longitude: location.longitude, 
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421}
          : {latitude: -25.98953, 
          longitude: 28.12843, 
          latitudeDelta: 0.0922, 
          longitudeDelta: 0.0421}}
        >
        {location && (
          <Marker image={mapMarker} coordinate={{latitude: location.latitude, longitude: location.longitude}}/>
        )}

        {rankData.map((RankData) => (
          <Marker
            key={RankData.rank_id}
            coordinate={{
              latitude: RankData.coordinates._lat,
              longitude: RankData.coordinates._long,
            }}
            title={RankData.name} 
            description={`Active Time: ${RankData.activeTime}`}
            onPress={() => handleMarkerPress(RankData)}>
            <Image source={rankIcon} style={{ height: 30, width: 30 }} />
          </Marker>
        ))}
      </MapView>

      <View className="absolute top-[40px] left-[20px]">
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          className="w-[50px] h-[50px] bg-white rounded-[25px] justify-center items-center">
          <Image source={menuImg} className="w-[25px] h-[25px]" />
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-[120px] right-[20px]">
        <TouchableOpacity onPress={centerMapOnUser} className="w-[50px] h-[50px] bg-white rounded-[25px] items-center justify-center">
          <Image source={locateIcon} className="w-[30px] h-[30px]" />
        </TouchableOpacity>
      </View>

      {/* Selected Rank Overlay here */}
      {overlay && (
        <View className="absolute items-center justify-center bg-white w-[100%] h-[40%] top-[100px] right-0">
          <View>
            <Text>Selected Rank Information</Text>
            <ScrollView className="border-2 border-black w-[90%] h-[180px] mt-[10px] rounded-md overflow-auto">
              {selectedRank?.Destinations && selectedRank.Destinations.length > 0 ? (
                selectedRank.Destinations.map((destination, index) => (
                  <Text key={index}>{destination.name} - {destination.price}</Text>
                ))
              ) : (
                <Text className="text-center text-gray-500">Select a rank on the map</Text>
              )}
            </ScrollView>
          </View>
        </View>
      )}

      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <BottomSheetView className="flex-1 items-center">
          <BtmDrawer selected={selectedRank}/>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <SideDrawerComp {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Drawer.Screen name="MyTrips" component={MyTrips} options={{ headerShown: false }} />
      <Drawer.Screen name="Support" component={Support} options={{ headerShown: false }} />
      <Drawer.Screen name="About" component={About} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
