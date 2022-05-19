import { Text, ScrollView, View, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import Sighting from '../../../interface/sighting';
import AppUseState from '../../../interface/state';
import SquareButton from '../../Buttons/SquareButton';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import RoundButton from '../../Buttons/RoundButton';
import eBirdModel from '../../../model/eBirdModel';

interface props {
  route: RouteProp<ParamListBase, "List">,
  navigation: any,
  states: AppUseState
};

export default function RecentList({route, navigation, states}: props) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    states.setNearbySightings(await eBirdModel.getNearbySightings(states.location?.coords.latitude ?? 0, states.location?.coords.longitude ?? 0))
    setRefreshing(false);
  }, []);
  const birdTexts = states.nearbySightings.map((sighting: Sighting, index: number) => {
    return (
    <View
      key={index}
      style={{flex: 1, justifyContent:"space-between", flexDirection: "row"}}
    >
      <Text>{sighting.comName}</Text>
      <RoundButton onPress={() => {
        navigation.navigate("Details", {sighting: sighting})
      }}><Ionicons name={"search"} size={30} color={"#fff"} /></RoundButton>
    </View>
    )
  })
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Text style={{fontSize: 28}}>Sightings nearby</Text>
      {birdTexts}
    </ScrollView>
  )
}