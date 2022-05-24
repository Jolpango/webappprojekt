import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color } from './style';
import { NavigationContainer } from '@react-navigation/native';
import CheckListNavigation from './components/Navigation/CheckList/CheckListNavigation';
import { Ionicons } from '@expo/vector-icons';
import RecentNavigation from './components/Navigation/Recent/RecentNavigation';
import Bird from './interface/bird';
import eBirdModel from './model/eBirdModel';
import Sighting from './interface/sighting';
import AppUseState from './interface/state';
import * as Location from 'expo-location';
import LoginNavigation from './components/Navigation/Login/LoginNavigation';
import FlashMessage from 'react-native-flash-message';
import authModel from './model/authModel';
import UserNavigation from './components/Navigation/User/UserNavigation';

const Tab = createBottomTabNavigator();

const navigationIcons: any = {
  "Checklist": "list",
  "Recent": "time"
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject>();
  const [birds, setBirds] = useState<Bird[]>([]);
  const [nearbySightings, setNearbySightings] = useState<Sighting[]>([]);
  // Put all states in here, why the fuck not
  const states: AppUseState = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    birds: birds,
    setBirds: setBirds,
    nearbySightings: nearbySightings,
    setNearbySightings: setNearbySightings,
    location: location,
    setLocation: setLocation
  }
  useEffect(() => {
    (async () => {
      setIsLoggedIn(await authModel.isLoggedIn());
    })();
    (async () => {
      setBirds(await eBirdModel.getSwedishBirds());
    })();
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setNearbySightings(await eBirdModel.getNearbySightings(currentLocation.coords.latitude, currentLocation.coords.longitude));
  })();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        {isLoggedIn ?
          <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              const iconName = navigationIcons[route.name] || "alert";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: Color.orange,
            tabBarInactiveTintColor: "#ccc",
            tabBarStyle: styles.tabBar,
            headerStyle: styles.header,
            headerTitleStyle: {color:Color.white},
            headerShown: false
          })}
          >
            <Tab.Screen name="Checklist" children={() => <CheckListNavigation states={states}/>} />
            <Tab.Screen name="Recent" children={() => <RecentNavigation states={states}/>} />
            <Tab.Screen name="User" children={() => <UserNavigation states={states}/>} />
          </Tab.Navigator> :
          <LoginNavigation states={states} />
        }
      </NavigationContainer>
      <StatusBar style="auto"/>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  statusbar: {
    backgroundColor: Color.tangerine,
    opacity:0.5
  },
  tabBar: {
    paddingBottom: 10,
    paddingTop: 10,
    height: 60,
    color: Color.white
  },
  header: {
    backgroundColor: Color.tangerine,
    height: 100,
  }
});
