import { Image, View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import SquareButton from '../../Buttons/SquareButton'
import AppUseState from '../../../interface/state'
import { Color } from '../../../style'
import authModel from '../../../model/authModel'
import { showMessage } from "react-native-flash-message";

interface props {
  navigation: any,
  route: any,
  states: AppUseState
}

export default function Login({navigation, route, states}: props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = async () => {
    const res = await authModel.login(email, password);
    if (res.type === "success") {
      states.setIsLoggedIn(true);
    }
    const type = res.type === "success" ? "success" : "danger"
    showMessage({
      message: res.title,
      description: res.message,
      type: type
    })
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.banner}source={require("../../../assets/banner.jpg")}/>
      <View style={styles.inputContainer}>
        <Text>Username</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          keyboardType={"email-address"}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <SquareButton onPress={submit} ><Text>Login</Text></SquareButton>
      <Text>Don't have an account?</Text>
      <SquareButton onPress={() => {navigation.navigate("Register"), {reload: true}}} ><Text>Register</Text></SquareButton>
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
