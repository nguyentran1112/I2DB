/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppContextProvider from './src/contexts/AppContext';

AppRegistry.registerComponent(appName, () => () => (
  <AppContextProvider>
    <App />
  </AppContextProvider>
));
