import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import Bird from '../../../interface/bird';
import AppUseState from '../../../interface/state';
import CheckListItem from './CheckListItem';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../../style';
import ChecklistItemInterface from '../../../interface/checklistiteminterface';

interface props {
  states: AppUseState,
  navigation: any,
  route: any
}

export default function CheckList({navigation, route, states}: props) {
  const checkListItems = states.checklist.map((item: ChecklistItemInterface, index: number) => {
    return (<CheckListItem states={states} onPress={() => {}} item={item} key={index}/>)
  })
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.banner} source={require("../../../assets/banner.jpg")}/>
        {checkListItems}
      </ScrollView>
      <Ionicons
        name="add-circle"
        size={80}
        color={Color.tangerine}
        style={styles.add}
        onPress={() => {
          navigation.navigate("New", {reload: true});
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  banner: {
    width: "100%",
    height: 300
  },
  add: {
    position: "absolute",
    right: 10,
    bottom: 10
  }
})
