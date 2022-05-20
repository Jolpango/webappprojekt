import { StyleSheet, View, Text, Image, GestureResponderEvent, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Sighting from '../../../interface/sighting'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import flickrModel from '../../../model/flickrModel'
import { Color, Typography } from '../../../style'

interface props {
  sighting: Sighting,
  onPress: (() => void)
}

export default function SightingListItem({sighting, onPress}: props) {
  const [thumbnail, setThumbnail] = useState<string>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const onLoad = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  const onTouchStart = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true
    }).start();
  };
  const onTouchEnd = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };
  useEffect(() => {
    (async () => {
      setThumbnail(flickrModel.getThumbnail(await flickrModel.searchGetFirstResult(sighting.comName + "," + sighting.sciName)));
    })();
    onLoad();
  }, []);
  return (
    <Animated.View style={{opacity: fadeAnim}}>
      <View
        onTouchStart={onTouchStart}
        onTouchCancel={onTouchEnd}
        onTouchEnd={() => {
          onTouchEnd();
          onPress();
        }}
        style={{...styles.outer}}
      >
        {thumbnail ?
          <Image style={styles.thumbnail} source={{uri: thumbnail}}/> :
          <Image style={styles.thumbnail}source={require("../../../assets/831.gif")}/>
        }
        <View style={styles.textContainer}>
          <Text style={styles.title}>{sighting.comName}</Text>
          <Text>{sighting.locName}</Text>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 5
  },
  title: {
    ...Typography.subHeading,
    marginBottom: 10
  },
  outer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    padding: 10
  },
  touchable: {
    width: "100%",
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 5,
  }
});
