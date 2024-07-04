import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Image, TouchableOpacity, TextInput, Text, Keyboard, FlatList } from "react-native";
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
import DirectionOverlay from "../../components/utils/DirectionOverlay";
import SearchedDestinations from "../../components/utils/SearchedDestinations";

const HomeScreen = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  const textInputRef = useRef(null); // Added ref for TextInput
  const snapPoints = useMemo(() => ["13%", "25%", "55%"], []);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [route, setRoute] = useState(false);
  const [directing, setDirecting] = useState(false);
  const [searchOverlay, setSearchOverlay] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Search Stuff
  const [inputValue, setInputValue] = useState(''); // State to hold input value
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const searchTextInputRef = useRef(null); // Reference for TextInput

  const handleInputChange = (text) => {
    setInputValue(text); // Update input value state
    handleSearch(text);  // Trigger search with new input value
  };

  const handleSearch = (text) => {
    const searchTerm = text.toLowerCase();
  
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }
    const results = rankData.filter(rank => {
      if (rank.name?.toLowerCase().includes(searchTerm)) {
        return true;
      }
  
      const destinations = rank.destinations || [];
      return destinations.some(destination => destination.name?.toLowerCase().includes(searchTerm));
    });
  
    setSearchResults(results); // Update search results state
  };
  
  const renderResult = ({ item }) => {
    const filteredDestinations = item.destinations?.filter(destination =>
      destination.name?.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredDestinations && filteredDestinations.length > 0 ? (
      <TouchableOpacity onPress={() => handleMarkerPress(item)}>
        <SearchedDestinations name={item.name} destination={filteredDestinations[0].name}/>
      </TouchableOpacity>
    ) : null;
  };
  
  // Get User Location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log("Location access not granted");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        setLocation(location.coords);
      } else {
        console.log("Unable to get location");
      }
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
    } else {
      console.log("Unable to center map on user");
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
    if (!RankData?.coordinates?._lat || !RankData?.coordinates?._long) {
      console.log("Invalid coordinates for marker");
      return;
    }
    setSelectedRank(RankData);
    centerMapOnMarker(RankData.coordinates._lat, RankData.coordinates._long);
    setOverlay(true);
    setSearchOverlay(false); // Hide search results on marker press
    textInputRef.current?.blur(); // Hide keyboard on marker press
  };

  // Clears The Map When Map Is Clicked
  const handleMapClick = () => {
    setOverlay(false);
    setSelectedRank(null);
    setRoute(false);
    setDirecting(false);
    setSearchOverlay(false);
  };

  const handleInputTouch = () => {
    setSearchOverlay(true);
    if (!keyboardVisible) textInputRef.current?.focus();
  };

  const handleRouting = async () => {
    if (!location || !selectedRank?.coordinates) return;
    setRoute(true);
    setDirecting(true);
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
        {route && location && selectedRank?.coordinates && (
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
          RankData.coordinates?._lat && RankData.coordinates?._long ? (
            <Marker key={RankData.rank_id}
              coordinate={{ latitude: RankData.coordinates._lat, longitude: RankData.coordinates._long }}
              title={RankData.name}
              description={`Active Time: ${RankData.activeTime}`}
              onPress={() => handleMarkerPress(RankData)}>
              <Image source={rankIcon} style={{ height: 30, width: 30 }} />
            </Marker>
          ) : null
        ))}
      </MapView>

      {/* Side Menu Component */}
      <View style={{ position: 'absolute', top: 50, width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '95%' }}>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ width: 50, height: 50, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={menuImg} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', borderRadius: 30, padding: 10, borderWidth: 2, marginLeft: 10, borderColor: 'black', backgroundColor: 'white' }}>
            <Image source={searchIcon} style={{ height: 30, width: 30 }} />
            <TextInput
              ref={textInputRef} // Assign ref to TextInput
              placeholder="Where To?"
              style={{ flex: 1, paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }} // Add styles to the TextInput
              onChangeText={handleInputChange} // Capture input change
              onFocus={handleInputTouch} // Handle touch focus
            />
          </View>
        </View>
      </View>

      {/* Search Results Overlay */}
      {searchOverlay && (
        <View style={{ position: 'absolute', top: 130, width: '100%', maxHeight: 200 }}>
          <FlatList
            data={searchResults}
            renderItem={renderResult}
            keyExtractor={(item) => item.rank_id.toString()}
            style={{ backgroundColor: 'white', width: '90%', alignSelf: 'center', borderRadius: 10 }}
          />
        </View>
      )}

      {/* User Location Icon */}
      <View style={{ position: 'absolute', bottom: 120, right: 20 }}>
        <TouchableOpacity onPress={centerMapOnUser} style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={locateIcon} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      {directing && selectedRank &&
        <DirectionOverlay selectedRank={selectedRank} onClose={handleMapClick} />
      }

      {/* Bottom Sheet Navigator */}
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
          <BtmDrawer selectedRank={selectedRank}
          onNavigate={handleRouting} />
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
