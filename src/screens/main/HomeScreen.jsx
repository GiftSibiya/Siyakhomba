import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps"; // Correct import
import * as Location from 'expo-location'; // Correct import
import BtmDrawer from "../../components/homescreen/BtmDrawer";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { createDrawerNavigator } from "@react-navigation/drawer";
import menuImg from "../../../assets/icons/icons8-hamburger-menu-50.png";
import locateIcon from "../../../assets/icons/icons8-location-100.png"; // Add your own icon here
import SideDrawerComp from "../../components/drawer/SideDrawerComp";
import Settings from "../../components/drawer/pages/Settings";

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
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsCompass={true}
        followsUserLocation={true}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : {
                latitude: -25.98953,
                longitude: 28.12843,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
        }
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>

      {/* Side Drawer Button */}
      <View style={styles.drawerButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.drawerButton}
        >
          <Image source={menuImg} style={styles.drawerButtonIcon} />
        </TouchableOpacity>
      </View>

      {/* Custom Location Button */}
      <View style={styles.locationButtonContainer}>
        <TouchableOpacity
          onPress={centerMapOnUser}
          style={styles.locationButton}
        >
          <Image source={locateIcon} style={styles.locationButtonIcon} />
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
    </Drawer.Navigator>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  drawerButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
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
  locationButtonContainer: {
    position: 'absolute',
    bottom: 120,
    right: 20,
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
  },
  locationButtonIcon: {
    width: 30,
    height: 30,
  },
});
