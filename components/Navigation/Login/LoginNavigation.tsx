import AppUseState from '../../../interface/state';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from "./Register"
import { Typography } from '../../../style';

interface props {
  states: AppUseState
};

const Stack = createNativeStackNavigator();

export default function LoginNavigation({states}: props) {
  return (
    <Stack.Navigator
      screenOptions={{headerTransparent: true, headerTitleStyle:{...Typography.subHeading}}}
    >
      <Stack.Screen name="Login">
        {(screenProps) => <Login navigation={screenProps.navigation} route={screenProps.route} states={states}/> }
      </Stack.Screen>
      <Stack.Screen name="Register">
        {(screenProps) => <Register navigation={screenProps.navigation} route={screenProps.route} states={states}/> }
      </Stack.Screen>
    </Stack.Navigator>
  )
}