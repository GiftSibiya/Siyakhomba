import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
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
  const snapPoints = useMemo(() => ["13%", "25%", "50%", "80%"], []);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [route, setRoute] = useState(false);
  const [directing, setDirecting] = useState(false);

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
  };

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
      <View style={{ position: 'absolute', top: 40, left: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={menuImg} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
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
