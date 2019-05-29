import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginView from '../screens/Login';
import RegistrationView from '../screens/Registration';

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginView,
  Register: RegistrationView,
  Main: MainTabNavigator,
}, {
    headerMode: 'none'
  })
);