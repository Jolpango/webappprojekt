import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import Bird from '../../../interface/bird';
import AppUseState from '../../../interface/state';
import CheckListItem from './CheckListItem';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../../style';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckList from './CheckList';
import CheckListNew from './CheckListNew';

interface props {
  states: AppUseState
}

const Stack = createNativeStackNavigator();

export default function CheckListNavigation({states}: props) {
  return (
    <Stack.Navigator screenOptions={{headerTransparent: true}}>
      <Stack.Screen name="Checklist">
        {(screenProps) => <CheckList navigation={screenProps.navigation} route={screenProps.route} states={states}/>}
      </Stack.Screen>
      <Stack.Screen name="New">
        {(screenProps) => <CheckListNew navigation={screenProps.navigation} route={screenProps.route} states={states}/>}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
