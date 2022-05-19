import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import RoundButton from '../Buttons/RoundButton'

interface props {
  states: any
}

export default function LoginScreen({states}: props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RoundButton onPress={() => {states.setIsLoggedIn(true)}} ><Text>Login</Text></RoundButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});