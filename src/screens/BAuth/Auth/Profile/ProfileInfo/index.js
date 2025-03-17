// //================================ React Native Imported Files ======================================//

import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, Image} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import Input from '../../../../../BusinessUtills/components/Input/Input';
import RBSheet from 'react-native-raw-bottom-sheet';
import PickerComponent from '../../../../../BusinessUtills/components/PickerComponent/PickerComponent';
import SmallTitle from '../../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import SemiMediumTitle from '../../../../../BusinessUtills/components/Semi Medium Title';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icons from '../../../../../BusinessUtills/assets/icons/icons';
import SalonPicker from '../../../../../BusinessUtills/components/NumberOfSalonPicker/SalonPicker';
import {useTranslation} from 'react-i18next';
import {scale} from 'react-native-size-matters';
import SimpleText from '../../../../../BusinessUtills/components/SimpleText/SimpleText';
import SelectGender from '../../../../Bussiness/BottomScreen/Component/SelectGender';
import {Switch} from 'react-native-switch';

const ProfileInfoScreen = ({callBackData, CheckFields}) => {
  const {t} = useTranslation();
  const [businessName, setBusinessName] = useState('');
  const [numbSalon, setNumbSalons] = useState(1);
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postCode, setPostCode] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    latitude: 0,
  });
  useEffect(() => {
    checkAllFields();
  }, [CheckFields]);

  const checkAllFields = () => {
    if (CheckFields === 'CheckNow') {
      if (businessNameValidError !== 'Done') {
        setBusinessNameValidError(t('required'));
      }
      if (address1ValidError !== 'Done') {
        setAddress1ValidError(t('required'));
      }
      if (cityValidError !== 'Done') {
        setCityValidError(t('required'));
      }
      if (stateValidError !== 'Done') {
        setStateValidError(t('required'));
      }
      if (postCodeValidError !== 'Done') {
        setPostCodeValidError(t('required'));
      }
      if (markerValidError !== 'Done') {
        setMarkerCodeValidError(t('required'));
      }
    }
  };

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

  const valid = () => {
    if (
      businessNameValidError === 'Done' &&
      numbSalonValidError === 'Done' &&
      address1ValidError === 'Done' &&
      cityValidError === 'Done' &&
      stateValidError === 'Done' &&
      postCodeValidError === 'Done' &&
      markerValidError === 'Done'
    ) {
      // callApi();
    }
  };

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
      // setPostCodeValidError("post code should be greater than 3 characters");
      setPostCodeValidError(t('minimumChar'));
    } else if (val.length > 20) {
      // setPostCodeValidError("post code should be less than 20 digits");
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
  const callApi = async () => {
    var data = JSON.stringify({
      account: companyName,
      email: email,
      password: password,
      gender: gender,
      phoneNo: phoneNumber,
    });

    var conf = {
      method: 'post',
      url: `${BConfig.baseUrl}business/signUp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(conf)
      .then(response => {
        navigation.navigate('OTP_SCREEN', {email: email});
      })
      .catch(error => {
        if (error.response) {
          alert(error?.response?.data?.msg);
        }
      });
  };

  useEffect(() => {
    callBackData([
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

  const onSelectGender = useCallback(
    gender => {
      setSelectedGender(gender);
    },
    [setSelectedGender],
  );

  const retrieveMarkerPosition = async () => {
    try {
      const value = await AsyncStorage.getItem('markerPosition');
      setMarkerPosition(
        value ? JSON.parse(value) : {latitude: 0, longitude: 0},
      );
    } catch (error) {
      // Error retrieving data
    }
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
            textAlign={'left'}
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
        <PickerComponent
          title={t('numbSalons')}
          direction="LTR"
          value={numbSalon}
          paddingHorizontal={wp(3.1)}
          onPress={() => refRBSheet.current.open()}
          marginBottom={10}
        />
        <SimpleText
          text={`Salon gender choice`}
          alignSelf="flex-start"
          marginTop={hp(2)}
        />
        <SelectGender
          genderVieStyle={{marginTop: hp(1)}}
          onSelectValue={onSelectGender}
        />
        <View style={{marginTop: scale(10)}}>
          <Input
            value={address1}
            title={t('address1')}
            onChangeText={address1 => {
              setAddress1(address1), handleValidAddress1(address1);
            }}
            placeholder={t('addressPlaceholder')}
            marginBottom={hp(0.7)}
            marginTop={scale(15)}
          />
        </View>
        {address1ValidError !== 'Done' && address1ValidError !== '' ? (
          <SmallTitle
            title={address1ValidError}
            alignSelf="flex-start"
            textAlign={'left'}
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}

        {markerValidError != 'Done' && markerPosition.latitude !== 0 ? (
          <View>
            <SmallTitle
              title={markerValidError}
              alignSelf="flex-start"
              textAlign={'left'}
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
            textAlign={'left'}
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
            textAlign={'left'}
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
        />
        {postCodeValidError !== 'Done' && postCodeValidError !== '' ? (
          <SmallTitle
            title={postCodeValidError}
            alignSelf="flex-start"
            textAlign={'left'}
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
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.textIconBg}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('BADDRESS_MAP_SCREEN')}>
            <View style={{width: '10%'}}>
              <Image
                style={styles.img}
                source={icons.PinCodePin}
                resizeMode="contain"
              />
            </View>
            <View style={{width: '60%', justifyContent: 'center'}}>
              <SemiMediumTitle title={t('pincode')} color={colors.btnColor} />
            </View>
            {markerPosition.latitude != 0 ? (
              <View>
                <Switch
                  value={true}
                  disabled={false}
                  circleSize={wp(8)}
                  barHeight={wp(8.9)}
                  circleBorderWidth={0}
                  backgroundActive={colors.lightGreen}
                  backgroundInactive={colors.grey}
                  circleActiveColor={colors.white}
                  circleInActiveColor={colors.white}
                  changeValueImmediately={true}
                  innerCircleStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  outerCircleStyle={{}} // style for outer animated circle
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchLeftPx={2}
                  switchRightPx={2}
                  switchWidthMultiplier={2}
                  switchBorderRadius={wp(66)}
                />
              </View>
            ) : (
              <View>
                <Switch
                  value={false}
                  disabled={false}
                  circleSize={wp(8)}
                  barHeight={wp(8.9)}
                  circleBorderWidth={0}
                  backgroundActive={colors.lightGreen}
                  backgroundInactive={colors.grey}
                  circleActiveColor={colors.white}
                  circleInActiveColor={colors.white}
                  changeValueImmediately={true}
                  innerCircleStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  outerCircleStyle={{}} // style for outer animated circle
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchLeftPx={2}
                  switchRightPx={2}
                  switchWidthMultiplier={2}
                  switchBorderRadius={wp(66)}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

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

export default ProfileInfoScreen;
