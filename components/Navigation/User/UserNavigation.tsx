import { View, Text } from 'react-native'
import React from 'react'
import SquareButton from '../../Buttons/SquareButton'
import authModel from '../../../model/authModel'
import AppUseState from '../../../interface/state'

interface props {
  states: AppUseState
}

export default function UserNavigation({states}: props) {
  return (
    <View style={{padding: 100}}>
      <SquareButton onPress={() => {
        authModel.logout();
        states.setIsLoggedIn(false);
      }}><Text>Logga ut</Text></SquareButton>
    </View>
  )
}
