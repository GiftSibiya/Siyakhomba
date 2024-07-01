import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from 'expo-location';
import BtmDrawer from "../../components/homescreen/BtmDrawer";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { createDrawerNavigator } from "@react-navigation/drawer";

import rankData from "../../../assets/json/RankData.json";

import menuImg from "../../../assets/icons/icons8-hamburger-menu-50.png";
import locateIcon from "../../../assets/icons/icons8-location-100.png";
import mapMarker from "../../../assets/icons/icons8-full-stop-100.png";
import rankIcon from "../../../assets/icons/map/rankIcon.png";

import SideDrawerComp from "../../components/drawer/SideDrawerComp";
import Settings from "../../components/drawer/pages/Settings";
import MyTrips from "../../components/drawer/pages/MyTrips";
import Support from "../../components/drawer/pages/Support";
import About from "../../components/drawer/pages/About";
import RankOverlay from "../../components/utils/RankOverlay"; // Import the new component

const HomeScreen = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  const snapPoints = useMemo(() => ["13%", "25%", "50%", "80%"], []);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

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
    centerMapOnMarker(RankData.coordinates._lat, RankData.coordinates._long);
    setOverlay(true);
  };

  const handleMapClick = () => {
    setOverlay(false);
    setSelectedRank(null);
    setRouteCoordinates([]);
  };

  const handleRouting = async () => {
    if (!userLocation || !selectedRank) return;

    const startCoords = `${userLocation.latitude},${userLocation.longitude}`;
    const endCoords = `${selectedRank.coordinates._lat},${selectedRank.coordinates._long}`;

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords}&destination=${endCoords}&key=${process.env.MAPS_API}`);
      const data = await response.json();

      if (data.routes.length > 0 && data.routes[0].overview_polyline.points) {
        const points = data.routes[0].overview_polyline.points;
        const decodedPoints = decodePolyline(points);
        setRouteCoordinates(decodedPoints);
      } else {
        console.error("No route found");
        setRouteCoordinates([]);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
      setRouteCoordinates([]);
    }
  };

  // Function to decode Google Maps Polyline encoding
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
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
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        } : {
          latitude: -25.98953,
          longitude: 28.12843,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {location && (
          <Marker image={mapMarker} coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
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

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={2}
            strokeColor="blue"
          />
        )}
      </MapView>

      <View style={{ position: 'absolute', top: 40, left: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={menuImg} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>

      <View style={{ position: 'absolute', bottom: 120, right: 20 }}>
        <TouchableOpacity onPress={centerMapOnUser} style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={locateIcon} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      <RankOverlay
        overlay={overlay}
        selectedRank={selectedRank}
        onClose={handleMapClick}
        onNavigate={handleRouting}
      />

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
