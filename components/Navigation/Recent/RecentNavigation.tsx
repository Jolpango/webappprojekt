import AppUseState from '../../../interface/state';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecentList from './RecentList';
import SightingDetails from './SightingDetails';

interface props {
  states: AppUseState
};

const Stack = createNativeStackNavigator();

export default function RecentNavigation({states}: props) {
  return (
    <Stack.Navigator
      screenOptions={{headerTransparent: true, headerTitle: ""}}
    >
      <Stack.Screen name="List">
        {(screenProps) => <RecentList route={screenProps.route} navigation={screenProps.navigation} states={states} ></RecentList> }
      </Stack.Screen>
      <Stack.Screen name="Details">
        {(screenProps) => <SightingDetails route={screenProps.route} navigation={screenProps.navigation} states={states} ></SightingDetails> }
      </Stack.Screen>
    </Stack.Navigator>
  )
}