/**
 * @format
 */

import { AppRegistry, AppState } from 'react-native'; // Import AppState explicitly
import App from './App';
import { name as appName } from './app.json';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/constants/languages/i18n';
import 'react-native-gesture-handler';

// Polyfill WebSocket using react-native-websocket
import { WebSocket } from 'react-native-websocket';
global.WebSocket = WebSocket;

// Firebase Initialization (uncomment if needed)
// import firebase, { initializeApp, getApps, getApp } from '@react-native-firebase/app';
// import { firebaseConfig } from './src/config/firebaseConfig';

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// if (!getApps().length) {
//   initializeApp(firebaseConfig);
// }
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Wrap the App component with I18nextProvider
const WrappedApp = () => (
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);

// Register the app component
AppRegistry.registerComponent(appName, () => WrappedApp);

// Debugging: Check if AppState module is available
console.log('AppState module:', AppState);