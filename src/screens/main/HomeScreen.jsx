import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps"; // Correct import
import * as Location from 'expo-location'; // Correct import
import BtmDrawer from "../../components/homescreen/BtmDrawer";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { createDrawerNavigator } from "@react-navigation/drawer";
import menuImg from "../../../assets/icons/icons8-hamburger-menu-50.png";
import locateIcon from "../../../assets/icons/icons8-location-100.png"; // Add your own icon here
import mapMarker from "../../../assets/icons/icons8-full-stop-100.png"
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
      }, 1000); // Animation duration
    }
  };

  return (
    <View className={"flex-1"} >

      <MapView ref={mapRef} className={"flex-1"} showsCompass={true} followsUserLocation={true}
        region={ location ? { latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421, }
        : {latitude: -25.98953, longitude: 28.12843, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}>
        {location && (
          <Marker image={mapMarker} coordinate={{latitude: location.latitude,longitude: location.longitude,}}/>)}
      </MapView>

      {/* Side Drawer Button */}
      <View className={"absolute top-[40px] left-[20px]"}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.drawerButton}>
          <Image source={menuImg} style={styles.drawerButtonIcon} />
        </TouchableOpacity>
      </View>

      {/* Custom Location Button */}
      <View className={"absolute bottom-[120px] right-[20px]"}>
        <TouchableOpacity
          onPress={centerMapOnUser}
          style={styles.locationButton}>
          <Image source={locateIcon} className={"w-[30px] h-[30px]"} />
        </TouchableOpacity>
      </View>
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
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

const styles = StyleSheet.create({
  drawerButton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  drawerButtonIcon: {
    width: 25,
    height: 25,
  },
  locationButton: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  }
});
