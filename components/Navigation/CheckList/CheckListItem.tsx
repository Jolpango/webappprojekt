import { StyleSheet, View, Text, Image, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import flickrModel from '../../../model/flickrModel'
import { Color, Typography } from '../../../style'
import ChecklistItemInterface from '../../../interface/checklistiteminterface'
import { Ionicons } from '@expo/vector-icons';
import authModel from '../../../model/authModel'
import AppUseState from '../../../interface/state'
import { showMessage } from 'react-native-flash-message'

interface props {
  item: ChecklistItemInterface,
  states: AppUseState,
  onPress: (() => void)
}

export default function CheckListItem({item, onPress, states}: props) {
  const [thumbnail, setThumbnail] = useState<string>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const removeItem = async () => {
    await authModel.removeChecklistItem(item.id);
    states.setChecklist(await authModel.getChecklist());
    showMessage({
      message: "Removed successfuly",
      description: item.comName + " was removed.",
      type: "warning"
    })
  }
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
      setThumbnail(flickrModel.getThumbnail(await flickrModel.searchGetFirstResult(item.comName + "," + item.sciName)));
    })();
    onLoad();
  }, [item]);
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
          <Image style={styles.thumbnail} source={require("../../../assets/831.gif")}/>
        }
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.comName}</Text>
          <Text>{item.sciName}</Text>
        </View>
        <Ionicons onPress={removeItem} style={styles.removeIcon} name="trash-outline" size={30} color="#aaa"/>
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
    marginBottom: 5
  },
  removeIcon: {
    alignSelf: "center"
  },
  location: {
    ...Typography.small,
    marginBottom: 5
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
