import { Image, View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import SquareButton from '../../Buttons/SquareButton'
import AppUseState from '../../../interface/state'
import { Typography } from '../../../style'
import authModel from '../../../model/authModel'
import { showMessage } from 'react-native-flash-message'

interface props {
  navigation: any,
  route: any,
  states: AppUseState
}

export default function Register({navigation, route, states}: props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = async () => {
    const res = await authModel.register(email, password);
    if (res.type === "success") {
      navigation.navigate("Login");
    }
    const type = res.type === "success" ? "success" : "danger"
    showMessage({
      message: res.title,
      description: res.message,
      type: type
    })
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.banner} source={require("../../../assets/banner2.jpg")}/>
      <Text style={{...Typography.heading}}>Register new user</Text>
      <View style={styles.inputContainer}>
        <Text>Username/Email</Text>
        <TextInput
          onChangeText={(text) => {
            setEmail(text)
          }}
          style={styles.textInput}
          keyboardType={"email-address"}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={styles.textInput}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={styles.textInput}
          secureTextEntry={true}
        />
      </View>
      <SquareButton
        onPress={submit}
      >
        <Text>Register</Text>
      </SquareButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  banner: {
    width: "100%",
    height: 300,
    marginBottom: 20
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
    width: "70%"
  }
});
