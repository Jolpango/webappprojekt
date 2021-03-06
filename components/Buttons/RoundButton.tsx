import { GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Color } from '../../style';

interface props {
  children: any,
  onPress: (event: GestureResponderEvent) => void
}

export default function RoundButton(props: props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.onPress}
      activeOpacity={0.6}
    >
      {props.children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.tangerine,
    color: Color.orange,
    padding: 10,
    borderRadius: 100
  }
});