import { StyleSheet, Image, View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppUseState from '../../../interface/state'
import Sighting from '../../../interface/sighting'
import flickrModel from '../../../model/flickrModel'
import MapView, { Marker } from 'react-native-maps'

interface props {
  route: any,
  navigation: any,
  states: AppUseState
};

export default function SightingDetails({route, navigation, states}: props) {
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
  }, [])
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
    // setTimeout(() => {
    //   mapRef.current.fitToSuppliedMarkers(["me", "bird"], options);
    // }, 500)
    mapRef.current.fitToSuppliedMarkers(["me", "bird"], options);
  }, [userMarker, birdMarker, imageURL])
  return (
    <ScrollView>
      <Text>{sighting.comName}</Text>
      {imageURL ?
        <Image style={{width: "100%", height:300}}source={{uri: imageURL}}></Image> :
        <View style={{width: "100%", height:300, flex: 1, justifyContent:"center", alignItems:"center"}}>
          <Image style={{width: 50, height:50}}source={require("../../../assets/831.gif")}></Image> 
        </View>
      }
      <Text>Amount spotted: {sighting.howMany}</Text>
      <Text>{sighting.locName}</Text>
      <Text>{sighting.sciName}</Text>
      <View style={{width: "100%", height: 300}}>
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
  )
}

const styles = StyleSheet.create({
  map: {
      ...StyleSheet.absoluteFillObject,
  },
});
