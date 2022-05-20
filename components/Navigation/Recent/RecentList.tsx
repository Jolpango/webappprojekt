import { StyleSheet, Text, ScrollView, View, RefreshControl } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Sighting from '../../../interface/sighting';
import AppUseState from '../../../interface/state';
import SquareButton from '../../Buttons/SquareButton';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import RoundButton from '../../Buttons/RoundButton';
import eBirdModel from '../../../model/eBirdModel';
import { Color } from '../../../style';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import SightingListItem from './SightingListItem';
import uuid from 'react-native-uuid';

interface props {
  route: RouteProp<ParamListBase, "List">,
  navigation: any,
  states: AppUseState
};

function sightingId(sighting: Sighting): string {
  return `${sighting.comName}`
}

export default function RecentList({route, navigation, states}: props) {
  const [refreshing, setRefreshing] = useState(false);
  const [marker, setMarker] = useState<any>();
  const mapRef = useRef<any>();
  useEffect(() => {
    setMarker(<Marker
      coordinate={{ latitude: states.location?.coords.latitude ?? 0, longitude: states.location?.coords.longitude ?? 0} as any}
      identifier={"me"}
      title={"Me"}
    />);
    const region = {
      latitude: states.location?.coords.latitude ?? 0,
      longitude: states.location?.coords.longitude ?? 0,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }
    mapRef.current.animateToRegion(region);
  }, [states.location])
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      states.setLocation(currentLocation);
    states.setNearbySightings(await eBirdModel.getNearbySightings(states.location?.coords.latitude ?? 0, states.location?.coords.longitude ?? 0));
    setRefreshing(false);
  }, []);
  useEffect(() => {
    const idList = states.nearbySightings.map((sighting) => sightingId(sighting));
    mapRef.current.fitToSuppliedMarkers([...idList, "me"])
  } ,[states.nearbySightings])
  const birdTexts = states.nearbySightings.map((sighting: Sighting, index: number) => {
    return (
      <SightingListItem
        sighting={sighting}
        key={index}
        onPress={() => navigation.navigate("Details", {sighting: sighting})}
      />
    )
  })
  const birdMarkers = states.nearbySightings.map((sighting: Sighting) => {
    return (
      <Marker
        title={sighting.comName}
        identifier={sightingId(sighting)}
        pinColor="blue"
        coordinate={{latitude: sighting.lat, longitude: sighting.lng}}
        key={uuid.v4() as any}
      />
    )
  });
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: states.location?.coords.latitude ?? 0,
            longitude: states.location?.coords.longitude ?? 0,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }}
        >
          {marker}
          {birdMarkers}
        </MapView>
      </View>
      {birdTexts}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    minHeight: "100%",
    backgroundColor: Color.white
  },
  map: {
      ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    width: "100%",
    height: 300,
  },
});
