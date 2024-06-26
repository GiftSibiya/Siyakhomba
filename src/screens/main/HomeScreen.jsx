import React, { useMemo, useRef } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import BtmDrawer from "../../components/homescreen/BtmDrawer";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { createDrawerNavigator } from "@react-navigation/drawer";
import menuImg from "../../../assets/icons/icons8-hamburger-menu-50.png";
import SideDrawerComp from "../../components/drawer/SideDrawerComp";
import Settings from "../../components/drawer/pages/Settings";

const HomeScreen = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["13%", "25%", "50%", "80%"], []);

  return (
    <View className="flex-1">
      <MapView className="flex-1"
        initialRegion={{
          latitude: -25.98953,
          longitude: 28.12843,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,}}/>
      {/* Side Drawer Button */}
      <View className="absolute top-[40px] left-[20px]">
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          className="w-[50px] h-[50px] bg-white rounded-full items-center justify-center">
          <Image source={menuImg} className="w-[25px] h-[25px]" />
        </TouchableOpacity>
      </View>

      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <BottomSheetView className="flex-1 items-center">
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
