//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {useEffect} from 'react';
import Input from '../../../../BusinessUtills/components/Input/Input';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import BConfig from '../../../../BusinessUtills/config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const InfoEditProfile = ({data, callBackData}) => {
  const [companyName, setCompanyName] = useState(BConfig.company);
  const [businessName, setBusinessName] = useState(data?.businessName);
  const [address, setAddress] = useState(data?.address);
  const [city, setCity] = useState(data?.city);
  const [state, setState] = useState(data?.state);
  const [postCode, setPostCode] = useState(data?.postCode);
  const [nameValidError, setNameValidError] = useState('');
  const [businessNameValidError, setBusinessNameValidError] = useState('');
  const [cityValidError, setCityValidError] = useState('');
  const [stateValidError, setStateValidError] = useState('');
  const [postCodeValidError, setPostCodeValidError] = useState('');
  const [addressValidError, setAddressValidError] = useState('');
  const {t} = useTranslation();
  useEffect(() => {
    getNamed();
  }, []);

  async function getNamed() {
    const value = await AsyncStorage.getItem('company');
    setCompanyName(JSON.parse(value));
  }
  const handleValidName = val => {
    if (val.length === 0) {
      setNameValidError(t('companynamenotempty'));
    } else if (val.length < 3) {
      setNameValidError(t('minimumChar'));
    } else if (val.length > 20) {
      setNameValidError(t('max20Char'));
    } else if (val.length !== 0) {
      setNameValidError(t('done'));
    }
  };
  const handleValidBusinessName = val => {
    if (val.length === 0) {
      setBusinessNameValidError(t('required'));
    } else if (val.length < 3) {
      setBusinessNameValidError(t('minimumChar'));
    } else if (val.length !== 0) {
      setBusinessNameValidError(t('done'));
    }
  };

  const handleValidAddress = val => {
    if (val.length === 0) {
      setAddressValidError(t('required'));
    } else {
      setAddressValidError(t('done'));
    }
  };
  const handleValidCity = val => {
    if (val.length === 0) {
      setCityValidError(t('required'));
    } else if (val.length !== 0) {
      setCityValidError(t('done'));
    }
  };
  const handleValidState = val => {
    if (val.length === 0) {
      setStateValidError(t('required'));
    } else {
      setStateValidError(t('done'));
    }
  };
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
  useEffect(() => {
    callBackData([
      {
        companyName: companyName,
        businessName: businessName,
        address: address,
        city: city,
        state: state,
        postCode: postCode,
      },
      {
        addressValidError: addressValidError,
        nameValidError: nameValidError,
        businessNameValidError: businessNameValidError,
        cityValidError: cityValidError,
        stateValidError: stateValidError,
        postCodeValidError: postCodeValidError,
      },
    ]);
  }, [companyName, businessName, city, state, postCode, address]);

  return (
    <View>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* <Input
          title={t('companyName')}
          value={companyName}
          onChangeText={companyName => {
            setCompanyName(companyName), handleValidName(companyName);
          }}
          placeholder={t('companyPlaceHolder')}
        /> */}
        {nameValidError !== 'Done' && nameValidError !== '' ? (
          <SmallTitle
            width={wp(80)}
            title={nameValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
          />
        ) : null}
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
          value={address}
          title={t('Address')}
          onChangeText={address => {
            setAddress(address), handleValidAddress(address);
          }}
          placeholder={t('Enter your business address')}
          marginBottom={hp(0.7)}
        />
        {addressValidError !== 'Done' && addressValidError !== '' ? (
          <SmallTitle
            title={addressValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
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
      </ScrollView>
    </View>
  );
};
export default InfoEditProfile;
