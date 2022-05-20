import { StyleSheet, Image, View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppUseState from '../../../interface/state'
import Sighting from '../../../interface/sighting'
import flickrModel from '../../../model/flickrModel'
import MapView, { Marker } from 'react-native-maps'
import { Color, Typography } from '../../../style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';

interface props {
  route: any,
  navigation: any,
  states: AppUseState
};

export default function SightingDetails({route, navigation, states}: props) {
  const nextSighting = () => {
    const current = states.nearbySightings.indexOf(sighting);
    const next = states.nearbySightings[(current + 1) % states.nearbySightings.length];
    return next;
  }
  const previousSighting = () => {
    const current = states.nearbySightings.indexOf(sighting);
    let previous = current - 1;
    if (previous < 0) {
      previous = states.nearbySightings.length - 1;
    }
    return states.nearbySightings[previous];
  }
  const { sighting }: {sighting: Sighting} = route.params;
  const [userMarker, setUserMarker] = useState<any>();
  const [birdMarker, setBirdMarker] = useState<any>();
  const [imageURL, setImageURL] = useState<string>();
  const mapRef = useRef<any>();
  useEffect(() => {
    (async () => {
      const result = await flickrModel.searchGetFirstResult(sighting.comName + "," + sighting.sciName);
      setImageURL(flickrModel.getImageUrl500(result));
    })();
    setUserMarker(<Marker
      coordinate={{ latitude: states.location?.coords.latitude, longitude: states.location?.coords.longitude } as any}
      identifier={"me"}
      title={"Me"}
    />);
    setBirdMarker(<Marker
      coordinate={{ latitude: sighting.lat, longitude: sighting.lng } as any}
      identifier={"bird"}
      pinColor="blue"
      title={sighting.comName}
    />);
  }, [sighting])
  useEffect(() => {
    const options = {
      edgePadding: {
        top: 200,
        right: 200,
        left: 200,
        bottom: 200
      },
      animated: true,
    }
    mapRef.current.fitToSuppliedMarkers(["me", "bird"], options);
  }, [userMarker, birdMarker, imageURL, sighting])
  return (
    <View style={styles.screenContainer}>
      <Ionicons
        name="caret-forward"
        style={styles.rightButton}
        color={Color.blue}
        size={50}
        onPress={() => {navigation.navigate("Details", {reload: true, sighting: nextSighting()})}}
      />
      <Ionicons
        name="caret-back"
        style={styles.leftButton}
        color={Color.blue}
        size={50}
        onPress={() => {navigation.navigate("Details", {reload: true, sighting: previousSighting()})}}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {imageURL ?
          <Image style={{width: "100%", height:300}}source={{uri: imageURL}}></Image> :
          <View style={{width: "100%", height:300, flex: 1, justifyContent:"center", alignItems:"center"}}>
            <Image style={{width: 50, height:50}}source={require("../../../assets/831.gif")}></Image> 
          </View>
        }
        <View style={styles.informationContainer}>
          <Text style={{...Typography.small}}>Spotted at {sighting.obsDt} in {sighting.locName}</Text>
          <Text style={{...Typography.heading}}>{sighting.comName}</Text>
          <Text style={{...Typography.paragraph}}>Amount spotted: {sighting.howMany}</Text>
          <Text style={{...Typography.paragraph}}>Scientific name: {sighting.sciName}</Text>
        </View>
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
            {userMarker}
            {birdMarker}
          </MapView>
        </View>
      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  screenContainer: {
    width: "100%",
    height: "100%"
  },
  leftButton: {
    position: "absolute",
    left: 10,
    zIndex: 100,
    top: "50%",
    opacity: 0.8,
  },
  rightButton: {
    position: "absolute",
    right: 10,
    zIndex: 100,
    top: "50%",
    opacity: 0.8
  },
  container: {
    display: "flex",
    minHeight: "100%",
    backgroundColor: Color.white
  },
  map: {
      ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    borderRadius: 500,
    borderColor: "#ccc",
    borderWidth: 1,
    overflow: 'hidden',
    width: "90%",
    padding: 10,
    height: 300,
    alignSelf: "center"
  },
  informationContainer: {
    padding: 10,
    marginBottom: 100
  }
});
