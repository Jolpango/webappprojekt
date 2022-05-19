import { GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Color } from '../../style';

interface props {
  children: any,
  onPress: (event: GestureResponderEvent) => void
}

export default function SquareButton(props: props) {
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
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5
  }
});