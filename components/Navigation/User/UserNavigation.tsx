import { Image, Text, StyleSheet } from 'react-native'
import React from 'react'
import SquareButton from '../../Buttons/SquareButton'
import authModel from '../../../model/authModel'
import AppUseState from '../../../interface/state'
import { ScrollView } from 'react-native-gesture-handler'
import { Typography } from '../../../style'

interface props {
  states: AppUseState
}

export default function UserNavigation({states}: props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.banner}source={require("../../../assets/banner3.jpg")}/>
      <Text style={Typography.subHeading}>{states.email}</Text>
      <SquareButton onPress={() => {
        authModel.logout();
        states.setIsLoggedIn(false);
      }}><Text>Log out</Text></SquareButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  banner: {
    width: "100%",
    height: 300
  }
})
