import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ShareData {
  static myInstance = null;
  userData = null;
  token = '';
  static isLogin = false;
  initialRoteName = '';
  static styleBot = '';

  static getInstance() {
    if (this.myInstance === null) {
      //load data in app js file
      this.myInstance = new ShareData();
    }
    return this.myInstance;
  }

  loadShareData = async () => {
    await AsyncStorage.getItem('userData').then(value => {
      if (value && value != null) {
        var data = JSON.parse(value);
        this.userData = data;
        this.token = data.access_token;
        this.isLogin = true;
        this.styleBot = data.styleBot;
      } else {
        this.userData = null;
        this.token = null;
        this.isLogin = false;
      }
    });
  };

  setShareData = async userData => {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    this.userData = userData.user;
    this.token = userData.token;
    this.isLogin = true;
    this.styleBot = userData.styleBot;
  };

  resetShareData = async () => {
    this.userData = null;
    this.token = '';
    this.isLogin = false;
    this.initialRoteName = 'userData';
    this.styleBot = '';
    await AsyncStorage.removeItem('userData');
  };
}
