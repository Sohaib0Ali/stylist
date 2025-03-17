//================================ React Native Imported Files ======================================//

import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Image, Dimensions, PermissionsAndroid} from 'react-native';

//================================ Local Imported Files ======================================//
import MapView from 'react-native-maps';
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DarkHeader from '../../../../components/Barber/DarkHeader/DarkHeader';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import Modal from 'react-native-modal';
import icons from '../../../../assets/icons/icons';
import {useIsFocused} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {showWarning} from '../../../../../Utils/FlashMessage';
import PhoneInput from 'react-native-phone-number-input';
import {useTranslation} from 'react-i18next';
import Config from '../../../../config/config';

const {width, height} = Dimensions.get('window');
let aspectRatio = width / height;
let ltDelta = 0.0412;
let lgDelta = ltDelta * aspectRatio;

const EnterNameScreen = ({navigation}) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const refRBSheet = useRef();
  const [name, setName] = useState('');
  const [isModalVisible, setModalVisible] = useState('false');
  const [region, setRegion] = useState({
    latitude: 3.094476666666667,
    longitude: 101.67371166666665,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });
  const [mapType, setMapType] = useState('standard');
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    latitude: 0,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });
  const phoneInput = useRef(null);
  const [phoneNumber, setphoneNumber] = useState('');
  const [phoneErr, setPhoneErr] = useState(false);
  const [isPhoneModalVisible, setPhoneModalVisible] = useState('false');

  const [text, setText] = useState('');
  const [phoneText, setPhoneText] = useState('');
  const [fullText, setFullText] = useState(
    'Hello, I would like to call you with your name.',
  );
  const [secondFullText, setSecondFullText] = useState(
    'Enter the phone number for registration in the salon.',
  );

  const [index, setIndex] = useState(0);

  const [indexForSecondModel, setIndexForSecondModel] = useState(0);

  useEffect(() => {
    if (isFocused) {
      getMyCurrentLocation();
    } else {
      setModalVisible('false');
      setPhoneModalVisible('false');
      setIndex(fullText?.length);
    }
  }, [isFocused]);

  useEffect(() => {
    if (userPosition.latitude != 0) {
      setModalVisible('true');
    }
  }, [userPosition]);

  useEffect(() => {
    if (index < fullText?.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 10);
    }
  }, [index]);

  useEffect(() => {
    if (indexForSecondModel < secondFullText?.length && isPhoneModalVisible) {
      setTimeout(() => {
        setPhoneText(phoneText + secondFullText[indexForSecondModel]);
        setIndexForSecondModel(indexForSecondModel + 1);
      }, 10);
    }
  }, [indexForSecondModel, isPhoneModalVisible]);

  const getMyCurrentLocation = () => {
    getLocation()
      .then(location => {
        let myLocation = {};
        myLocation.latitude = location.coords.latitude;
        myLocation.longitude = location.coords.longitude;
        myLocation.latitudeDelta = ltDelta;
        myLocation.longitudeDelta = lgDelta;
        setUserPosition(myLocation);
      })
      .catch(error => {
        setLocationGranted(false);
      });
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse')
          .then(response => {
            if (response === 'granted') {
              Geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
              );
            } else {
              reject('location permission denied');
              alert('Location must be granted for this operation');
            }
          })
          .catch(error => reject(error));
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
          .then(response => {
            if (response === PermissionsAndroid.RESULTS.GRANTED) {
              Geolocation.getCurrentPosition(
                position => {
                  resolve(position);
                },
                error => {
                  reject(error);
                },
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
              );
            } else {
              reject('location permission denied');
            }
          })
          .catch(error => reject(error));
      }
    });
  };
  const valid = () => {
    if (!phoneErr && phoneNumber != '') {
      Config.guestName = name;
      navigation.navigate('GUEST_SIGNUP_SCREEN', {
        name: name,
        phoneNumber: phoneNumber,
      });
    } else {
      showWarning(t('enterPhoneNumber'));
    }
  };
  const validateNum = val => {
    let reg = /^[-+]?[0-9]+$/;

    if (val.length === 0) {
      setPhoneErr(true);
      showWarning(t('enterphone'));
    } else if (val.length < 10) {
      setPhoneErr(true);
      showWarning(t('minimumDigits'));
    } else if (val.length > 13) {
      setPhoneErr(true);
      showWarning(t('MaximumDigits'));
    } else if (reg.test(val) === false) {
      setPhoneErr(true);
      showWarning('Phone must have only numbers');
    } else if (reg.test(val) === true) {
      setPhoneErr(false);
    }
  };

  const closeFirstModelAndOpenSecondModel = () => {
    setModalVisible('false'), setIndex(0), setText('');
    setFullText('');
    setTimeout(() => {
      setPhoneModalVisible('true');
    }, 1000);
  };

  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <DarkHeader onPress={() => refRBSheet.current.open()} />

      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={region}
        mapType={mapType}
        ref={ref => {
          mapRef = ref;
        }}
        style={styles.map}
        onMapLoaded={() => {
          setModalVisible('true');
        }}></MapView>

      {/* Model For Name/ */}
      <Modal isVisible={isModalVisible === 'true'}>
        <View style={styles.bottomContainer}>
          <View style={styles.toolTipBg}>
            <View style={styles.otherContainer}>
              <View style={styles.talkBubble}>
                <View
                  style={styles.iconImageBg}
                  onPress={() => setIsVisible(!isVisible)}>
                  <Image
                    style={styles.img}
                    source={icons.snap}
                    resizeMode="contain"
                  />
                </View>
                <View style={{top: wp(1.5)}}>
                  <View style={styles.talkBubbleTriangle} />
                  <View style={styles.talkBubbleSquare}>
                    <Text style={styles.talkBubbleMessage}>{text}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.modalContainer}>
            <Input
              value={name}
              onChangeText={setName}
              placeholder={t('namePlaceHolder')}
              title={t('name')}
            />
            <Button
              buttonText={t('next')}
              width="100%"
              marginTop={hp(1.5)}
              onPress={() => {
                name === ''
                  ? showWarning(t('enterName'))
                  : closeFirstModelAndOpenSecondModel();
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Number Model */}
      <Modal isVisible={isPhoneModalVisible === 'true'}>
        <View style={styles.bottomContainer}>
          <View style={styles.toolTipBg}>
            <View style={styles.otherContainer}>
              <View style={styles.talkBubble}>
                <View
                  style={styles.iconImageBg}
                  onPress={() => setIsVisible(!isVisible)}>
                  <Image
                    style={styles.img}
                    source={icons.snap}
                    resizeMode="contain"
                  />
                </View>
                <View style={{top: wp(1.5)}}>
                  <View style={styles.talkBubbleTriangle} />
                  <View style={styles.talkBubbleSquare}>
                    <Text style={styles.talkBubbleMessage}>{phoneText}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.modalContainer}>
            <View style={styles.phoneBg}>
              <Text style={styles.title}>{t('phoneNumber')}</Text>
              <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode="MA"
                layout="first"
                containerStyle={styles.phoneContainer}
                countryPickerButtonStyle={{backgroundColor: 'transparent'}}
                textContainerStyle={styles.textInput}
                onChangeFormattedText={text => {
                  setphoneNumber(text);
                  validateNum(text);
                }}
              />
            </View>
            <Button
              buttonText={t('next')}
              width="100%"
              marginTop={hp(4)}
              onPress={() => {
                valid();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default EnterNameScreen;
