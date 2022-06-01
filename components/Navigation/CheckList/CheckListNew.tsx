import { StyleSheet, Image, Text, ScrollView, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import AppUseState from '../../../interface/state'
import { Typography } from '../../../style'
import SquareButton from '../../Buttons/SquareButton'
import authModel from '../../../model/authModel'
import { showMessage } from 'react-native-flash-message'

interface props {
  states: AppUseState,
  navigation: any,
  route: any
}

export default function CheckListNew({states, navigation, route}: props) {
  const [common, setCommon] = useState("");
  const [scientific, setScientific] = useState("");
  const submit = async () => {
    await authModel.addChecklistItem(common, scientific);
    await states.setChecklist(await authModel.getChecklist());
    showMessage({
      message: "Item added",
      description: common + " was added.",
      type: "success"
    })
    navigation.navigate("Checklist", {reload: true})
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../../assets/banner2.jpg")} style={styles.banner}/>
      <Text style={styles.header}>Add bird</Text>
      <View style={styles.inputContainer}>
        <Text>Common name</Text>
        <TextInput
          value={common}
          onChangeText={(text) => setCommon(text)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Scientific name</Text>
        <TextInput
          value={scientific}
          onChangeText={(text) => setScientific(text)}
          style={styles.textInput}
        />
      </View>
      <SquareButton onPress={submit}><Text>Add bird</Text></SquareButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    alignItems: "center"
  },
  header: {
    ...Typography.heading,
    marginBottom: 10,
    textAlign: "center"
  },
  banner: {
    width: "100%",
    height: 300
  },
  textInput: {
    fontSize: 20,
    marginBottom: 28,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 3,
  },
  inputContainer: {
    width: "70%",
    alignSelf: "center"
  }
})
