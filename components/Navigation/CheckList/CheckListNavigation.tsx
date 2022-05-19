import { Text, ScrollView } from 'react-native';
import React from 'react';
import Bird from '../../../interface/bird';
import AppUseState from '../../../interface/state';

interface props {
  states: AppUseState;
}

export default function CheckListNavigation({states}: props) {
  const birdTexts = states.birds.map((bird: Bird, index: number) => {
    return (<Text key={index}>{bird.comName}</Text>)
  })
  return (
    <ScrollView>
      <Text>CheckListNavigation</Text>
      {birdTexts}
    </ScrollView>
  )
}
