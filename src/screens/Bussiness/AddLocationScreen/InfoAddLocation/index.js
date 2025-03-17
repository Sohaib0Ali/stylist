//================================ React Native Imported Files ======================================//

import React, {useState, useRef} from 'react';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import Input from '../../../../BusinessUtills/components/Input/Input';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import MapIcon from '../../../../BusinessUtills/assets/icons/map.svg';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import RBSheet from 'react-native-raw-bottom-sheet';
import SalonPicker from '../../../../BusinessUtills/components/NumberOfSalonPicker/SalonPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const InfoAddLocation = ({checkCallBack}) => {
  const [businessName, setBusinessName] = useState('');
  const [numbSalon, setNumbSalons] = useState(1);
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postCode, setPostCode] = useState('');
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const {t} = useTranslation();
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    latitude: 0,
  });

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      retrieveMarkerPosition();
    }
  }, [isFocused]);

  useEffect(() => {
    if (markerPosition.latitude != 0) {
      markerValidPosition(markerPosition);
    }
  }, [markerPosition]);

  const [businessNameValidError, setBusinessNameValidError] = useState('');

  const handleValidBusinessName = val => {
    if (val.length === 0) {
      setBusinessNameValidError(t('required'));
    } else if (val.length < 3) {
      setBusinessNameValidError(t('minimumChar'));
    } else if (val.length !== 0) {
      setBusinessNameValidError(t('done'));
    }
  };

  const [address1ValidError, setAddress1ValidError] = useState('');
  const handleValidAddress1 = val => {
    if (val.length === 0) {
      setAddress1ValidError(t('required'));
    } else if (val.length !== 0) {
      setAddress1ValidError(t('done'));
    }
  };
  const [cityValidError, setCityValidError] = useState('');
  const handleValidCity = val => {
    if (val.length === 0) {
      setCityValidError(t('required'));
    } else if (val.length !== 0) {
      setCityValidError(t('done'));
    }
  };

  const [stateValidError, setStateValidError] = useState('');
  const handleValidState = val => {
    if (val.length === 0) {
      setStateValidError(t('required'));
    } else {
      setStateValidError(t('done'));
    }
  };

  const [postCodeValidError, setPostCodeValidError] = useState('');
  const handleValidPostCode = val => {
    if (val.length === 0) {
      setPostCodeValidError(t('required'));
    } else if (val.length < 3) {
      setPostCodeValidError(t('minimumChar'));
    } else if (val.length > 20) {
      setPostCodeValidError(t('max20Char'));
    } else if (val.length !== 0) {
      setPostCodeValidError(t('done'));
    }
  };

  const [markerValidError, setMarkerCodeValidError] = useState('');
  const markerValidPosition = val => {
    if (val.latitude === 0) {
      setMarkerCodeValidError(t('pleaseSelectLocation'));
    } else if (val.latitude !== 0 && val.longitude !== 0) {
      setMarkerCodeValidError(t('done'));
    }
  };

  useEffect(() => {
    checkCallBack([
      {
        businessName: businessName,
        address1: address1,
        location: markerPosition,
        city: city,
        state: state,
        postCode: postCode,
        numberOfSalon: numbSalon,
      },
      {
        businessNameValidError: businessNameValidError,
        address1ValidError: address1ValidError,
        markerValidError: markerValidError,
        cityValidError: cityValidError,
        stateValidError: stateValidError,
        postCodeValidError: postCodeValidError,
      },
    ]);
  }, [
    businessName,
    numbSalon,
    address1,
    markerValidError,
    markerPosition,
    city,
    state,
    postCode,
  ]);

  const retrieveMarkerPosition = async () => {
    try {
      const value = await AsyncStorage.getItem('lcoationMarkerPosition');
      setMarkerPosition(
        value ? JSON.parse(value) : {latitude: 0, longitude: 0},
      );
    } catch (error) {}
  };

  return (
    <View style={styles.body}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Input
          value={businessName}
          title={t('regBusinessName')}
          onChangeText={businessName => {
            setBusinessName(businessName),
              handleValidBusinessName(businessName);
          }}
          placeholder={t('businessNamePlaceholder')}
          marginBottom={hp(0.7)}
        />
        {businessNameValidError !== 'Done' && businessNameValidError !== '' ? (
          <SmallTitle
            title={businessNameValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}

        <Input
          value={address1}
          title={t('address1')}
          onChangeText={address1 => {
            setAddress1(address1), handleValidAddress1(address1);
          }}
          placeholder={t('addressPlaceholder')}
          marginBottom={hp(0.7)}
          marginTop={hp(0.7)}
        />
        {address1ValidError !== 'Done' && address1ValidError !== '' ? (
          <SmallTitle
            title={address1ValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}

        <View
          style={{
            borderColor: colors.subHeading,
            borderWidth: wp(0.4),
            marginBottom: hp(2),
            borderColor: colors.grey,
            borderRadius: wp(2),
            paddingHorizontal: wp(3),
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={styles.textIconBg}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('ADDRESS_MAP_SCREEN', {
                checkAddLocation: true,
              })
            }>
            <MapIcon
              width={wp(6.9)}
              height={wp(8)}
              // style={{ marginRight: wp(3.7)}}
            />
            <View>
              <SemiMediumTitle
                title={t('selectYourLocation')}
                color={colors.btnColor}
              />
            </View>
            {markerPosition.latitude != 0 ? (
              <View>
                <Image
                  style={styles.img}
                  source={icons.tick}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View style={styles.img}></View>
            )}
          </TouchableOpacity>
        </View>
        {markerValidError != 'Done' && markerPosition.latitude !== 0 ? (
          <View>
            <SmallTitle
              title={markerValidError}
              alignSelf="flex-start"
              color={colors.green}
              marginBottom={wp(4)}
              marginLeft={wp(5)}
              width={wp(80)}
            />
          </View>
        ) : null}
        <Input
          value={city}
          title={t('city')}
          onChangeText={city => {
            setCity(city), handleValidCity(city);
          }}
          placeholder={t('cityPlaceHolder')}
          marginBottom={hp(0.7)}
        />
        {cityValidError !== 'Done' && cityValidError !== '' ? (
          <SmallTitle
            title={cityValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
        <Input
          value={state}
          title={t('state')}
          onChangeText={state => {
            setState(state), handleValidState(state);
          }}
          placeholder={t('statePlaceHolder')}
          marginBottom={hp(0.7)}
        />
        {stateValidError !== 'Done' && stateValidError !== '' ? (
          <SmallTitle
            title={stateValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
        <Input
          value={postCode}
          title={t('postCode')}
          onChangeText={postCode => {
            setPostCode(postCode), handleValidPostCode(postCode);
          }}
          placeholder={t('postCodePlaceHolder')}
          keyboardType="numeric"
          // marginBottom={hp(0.7)}
        />
        {postCodeValidError !== 'Done' && postCodeValidError !== '' ? (
          <SmallTitle
            title={postCodeValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
        <RBSheet
          height={hp(38)}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              borderTopLeftRadius: wp(4),
              borderTopRightRadius: wp(4),
            },
            draggableIcon: {
              backgroundColor: colors.borderColor,
            },
          }}>
          <SalonPicker
            getCountValue={selectedSalon => {
              setNumbSalons(
                selectedSalon == 1
                  ? 1
                  : selectedSalon == 2
                  ? 2
                  : selectedSalon == 3
                  ? 3
                  : selectedSalon == 4
                  ? 4
                  : selectedSalon == 5
                  ? 5
                  : selectedSalon == 6
                  ? 6
                  : selectedSalon == 7
                  ? 7
                  : selectedSalon == 8
                  ? 8
                  : selectedSalon == 9
                  ? 9
                  : 1,
              );
            }}
            onPressLeft={() => refRBSheet.current.close()}
            onPressRight={() => refRBSheet.current.close()}
          />
        </RBSheet>
      </ScrollView>
    </View>
  );
};
export default InfoAddLocation;
