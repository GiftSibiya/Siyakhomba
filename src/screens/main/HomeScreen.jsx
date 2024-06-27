import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Image, TouchableOpacity} from "react-native";
import MapView, { Marker } from "react-native-maps"; // Correct import
import * as Location from 'expo-location'; // Correct import
import BtmDrawer from "../../components/homescreen/BtmDrawer";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Icons 
import menuImg from "../../../assets/icons/icons8-hamburger-menu-50.png";
import locateIcon from "../../../assets/icons/icons8-location-100.png"; // Add your own icon here
import mapMarker from "../../../assets/icons/icons8-full-stop-100.png"

// SIde Drawer
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
      }, 1000); // Animation duration Push the code bruh
    }
  };

  return (
    <View className={"flex-1"} >
      <MapView ref={mapRef} className={"flex-1"} showsCompass={true} followsUserLocation={true}
        region={ location ? 
          { latitude: location.latitude, 
            longitude: location.longitude, 
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421}
          : {latitude: -25.98953, 
          longitude: 28.12843, 
          latitudeDelta: 0.0922, 
          longitudeDelta: 0.0421}}>
          {location && (
          <Marker image={mapMarker} coordinate={{latitude: location.latitude, longitude: location.longitude}}/>)}
      </MapView>

      {/* Side Drawer Button */}
      <View className={"absolute top-[40px] left-[20px]"}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          className={"w-[50px] h-[50px] bg-white rounded-[25px] justify-center items-center"}>
          <Image source={menuImg} className={"w-[25px] h-[25px]"}/>
        </TouchableOpacity>
      </View>

      {/* Custom Location Button */}
      <View className={"absolute bottom-[120px] right-[20px]"}>
        <TouchableOpacity onPress={centerMapOnUser} className={"w-[50px] h-[50px] bg-white rounded-[25px] items-center justify-center"}>
          <Image source={locateIcon} className={"w-[30px] h-[30px]"} />
        </TouchableOpacity>
      </View>
      
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <BottomSheetView className={"flex-1 items-center"} >
          <BtmDrawer />
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