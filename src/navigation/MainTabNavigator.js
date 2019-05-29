import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {MaterialIcons} from '@expo/vector-icons'
import Colors from '../constants/Colors';
const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, {
    headerMode: 'none'
  });

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
}, {
    headerMode: 'none'
  });

SettingsStack.navigationOptions = {
  tabBarLabel: 'History',
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      focused={focused}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}

      name="format-list-bulleted"
      size={26}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SettingsStack,
});
