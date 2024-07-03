import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Image, TouchableOpacity, TextInput, Text, Keyboard } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import BtmDrawer from "../../components/homescreen/BtmDrawer";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from '@env';

// Temporary JSON Storage
import rankData from "../../../assets/json/RankData.json";

// Icons
import menuImg from "../../../assets/icons/icons8-hamburger-menu-50.png";
import locateIcon from "../../../assets/icons/icons8-location-100.png";
import mapMarker from "../../../assets/icons/icons8-full-stop-100.png";
import rankIcon from "../../../assets/icons/map/rankIcon.png";
import searchIcon from "../../../assets/icons/icons8-search-100.png";

// Components
import SideDrawerComp from "../../components/drawer/SideDrawerComp";
import Settings from "../../components/drawer/pages/Settings";
import MyTrips from "../../components/drawer/pages/MyTrips";
import Support from "../../components/drawer/pages/Support";
import About from "../../components/drawer/pages/About";
import RankOverlay from "../../components/utils/RankOverlay"; 
import DirectionOverlay from "../../components/utils/DirectionOverlay";

const HomeScreen = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  const textInputRef = useRef(null); // Added ref for TextInput
  const snapPoints = useMemo(() => ["13%", "25%", "50%"], []);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [route, setRoute] = useState(false);
  const [directing, setDirecting] = useState(false);
  const [searchOverlay, setSearchOverlay] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Get User Location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log("Direction Stuff was granted")
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  // Handle Keyboard Events
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      textInputRef.current?.blur(); // Blur TextInput when keyboard is hidden
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
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
      }, 1000); // animation time
    }
  };

  const centerMapOnMarker = (latitude, longitude) => {
    if (!mapRef.current) return;

    const offset = -0.020; // Adjust this value as needed
    mapRef.current.animateToRegion({
      latitude: latitude - offset,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000);
  };

  const handleMarkerPress = (RankData) => {
    setSelectedRank(RankData);
    // console.log(selectedRank.name)
    centerMapOnMarker(RankData.coordinates._lat, RankData.coordinates._long);
    setOverlay(true);
  };

  // Clears The Map When Map Is Clicked
  const handleMapClick = () => {
    setOverlay(false);
    setSelectedRank(null);
    setRoute(false);
    setDirecting(false)
    setSearchOverlay(false)
  };

  const handleInputTouch = () =>{
    setSearchOverlay(true)
    if (!keyboardVisible) textInputRef.current?.focus();
    console.log("rank Was TOuched")
  }

  const handleRouting = async () => {
    if (!location || !selectedRank) return;
    setRoute(true);
    setDirecting(true)
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsCompass={true}
        followsUserLocation={true}
        onPress={handleMapClick}
        initialRegion={location ? {
          latitude: location.latitude, longitude: location.longitude,
          latitudeDelta: 0.0922, longitudeDelta: 0.0421
        } : {
          latitude: -25.98953, longitude: 28.12843,
          latitudeDelta: 0.0922, longitudeDelta: 0.0421
        }}>

        {/* Map Routing */}
        {route && (
          <MapViewDirections
            origin={{ latitude: location.latitude, longitude: location.longitude }}
            destination={{ latitude: selectedRank.coordinates._lat, longitude: selectedRank.coordinates._long }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}

        {location && (
          <Marker image={mapMarker} coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        )}

        {rankData.map((RankData) => (
          <Marker key={RankData.rank_id}
            coordinate={{ latitude: RankData.coordinates._lat, longitude: RankData.coordinates._long }}
            title={RankData.name}
            description={`Active Time: ${RankData.activeTime}`}
            onPress={() => handleMarkerPress(RankData)}>
            <Image source={rankIcon} style={{ height: 30, width: 30 }} />
          </Marker>
        ))}
      </MapView>

      {/* Side Menu Component */}
      <View className='absolute top-[50px] w-[100%] h-[100px] flex flex-row items-center justify-center '>
      <View className='flex flex-row items-center w-[95%]'>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          className='w-[50px] h-[50px] bg-white 2 border-[2px] border-black rounded-full justify-center items-center'>
          <Image source={menuImg} className='w-[25px] h-[25px]' />
        </TouchableOpacity>
        <View className="flex flex-row items-center w-[80%] rounded-3xl p-2 border-[2px] mx-2 border-black bg-white">
          <Image source={searchIcon} className="h-[30px] w-[30px]" />
          <TextInput
              ref={textInputRef} // Assign ref to TextInput
              placeholder="Where To?"
              style={{ paddingHorizontal: 10, fontSize: 18, fontWeight: 'bold', borderWidth: 0 }} // Remove border style to prevent double border
              onTouchStart={handleInputTouch} // Handle touch event to gain focus
              onFocus={() => keyboardVisible && textInputRef.current?.blur()} // Blur if keyboard is visible
            />
        </View>
      </View>
        {/* Search  Components*/}
      {searchOverlay && 
      <View className='absolute flex items-center h-[50%] top-[90px] w-[100%]'>
        <View className='bg-white w-[90%] h-[230px] rounded-xl'>
          <Text>This is showing Up </Text>
        </View>
      </View>}
      </View>

      {/* User Location Icon */}
      <View style={{ position: 'absolute', bottom: 120, right: 20 }}>
        <TouchableOpacity onPress={centerMapOnUser} style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={locateIcon} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      {/* Rank Details Overlay */}
      {overlay && !directing &&
        <RankOverlay
          selectedRank={selectedRank}
          onClose={handleMapClick} onNavigate={handleRouting}
        />
      }

      { directing && 
        <DirectionOverlay selectedRank={selectedRank} onClose={handleMapClick} /> 
      }

      {/* Bottom Sheet Navigator */}
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
          <BtmDrawer selected={selectedRank} />
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
