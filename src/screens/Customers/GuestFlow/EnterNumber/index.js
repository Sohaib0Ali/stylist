//================================ React Native Imported Files ======================================//

import React, {useState, useRef, useEffect} from 'react';
import {View, Text, AppState, Dimensions, Image} from 'react-native';

//================================ Local Imported Files ======================================//
import MapView from 'react-native-maps';
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DarkHeader from '../../../../components/Barber/DarkHeader/DarkHeader';
import Button from '../../../../components/Button/Button';
import PhoneInput from 'react-native-phone-number-input';
import Modal from 'react-native-modal';
import icons from '../../../../assets/icons/icons';
import {useIsFocused} from '@react-navigation/native';
import {showWarning} from '../../../../../Utils/FlashMessage';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('window');
let aspectRatio = width / height;
let ltDelta = 0.0412;
let lgDelta = ltDelta * aspectRatio;

const EnterNumberScreen = ({navigation}) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const phoneInput = useRef(null);
  const [phoneNumber, setphoneNumber] = useState('');
  const [phoneErr, setPhoneErr] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [phoneText, setPhoneText] = useState('');
  const [secondFullText, setSecondFullText] = useState(
    'Enter the phone number for registration in the salon.',
  );

  const [indexForSecondModel, setIndexForSecondModel] = useState(0);
  const [mapType, setMapType] = useState('standard');
  const [region, setRegion] = useState({
    latitude: 3.094476666666667,
    longitude: 101.67371166666665,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });
  const [text, setText] = useState('');
  const [fullText, setFullText] = useState(
    'Enter the phone number for registration in the salon.',
  );
  const [index, setIndex] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    }
  }, [isFocused]);
  useEffect(() => {
    if (indexForSecondModel < secondFullText?.length && isModalVisible) {
      setTimeout(() => {
        setPhoneText(phoneText + secondFullText[indexForSecondModel]);
        setIndexForSecondModel(indexForSecondModel + 1);
      }, 10);
    }
  }, [indexForSecondModel, isModalVisible]);

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [isFocused]);

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

  useEffect(() => {
    if (index < fullText?.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 10);
    }
  }, [index]);

  const valid = () => {
    if (!phoneErr && phoneNumber != '') {
      navigation.navigate('GUEST_SIGNUP_SCREEN');
    } else {
      showWarning(t('enterPhoneNumber'));
    }
  };

  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <DarkHeader />
      <MapView
        provider={MapView.PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={region}
        mapType={mapType}
        ref={ref => {
          mapRef = ref;
        }}></MapView>

      <Modal isVisible={isModalVisible}>
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
export default EnterNumberScreen;
