import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {t} from 'i18next';
import LInput from '../Component/LInput';
import SelectGender from '../Component/SelectGender';
import Button from '../../../../BusinessUtills/components/Button/Button';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import {
  showDanger,
  showSuccess,
  showWarning,
} from '../../../../../Utils/FlashMessage';
import {useSelector} from 'react-redux';
import Translator from 'react-native-translator';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceType = ({SType, Oncancle}) => {
  const navigation = useNavigation();
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const [selectedGender, setSelectedGender] = useState('');
  const [isServiceType, setIsServiceType] = useState('');
  const [isPrise, setIsPrise] = useState('');
  const [isTime, setIsisTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [franchLaguage, setFranchLaguage] = useState('');
  const [arabicLaguage, setArabicLaguage] = useState('');
  const [addedServices, setAddedServices] = useState(null);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('AddserviceData');
      return data != null ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting uData from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUData = async () => {
      const storedUData = await getData();
      if (storedUData) {
        setAddedServices(storedUData);
      }
    };
    fetchUData();
  }, [SType]);

  useEffect(() => {
    if (addedServices != null && addedServices.length > 0) {
      const hasDuplicate = addedServices.some(
        item => item.name.trim() === isServiceType.trim(),
      );
      if (hasDuplicate) {
        setNameValidError('Please enter a different treatment name');
      }
    }
  }, [addedServices, isServiceType]);

  let SalonID = MainBranch?.salon?._id;
  const onSelectGender = useCallback(
    gender => {
      setSelectedGender(gender);
    },
    [selectedGender],
  );

  const valid = () => {
    if (
      nameValidError === 'Done' &&
      priceValidError === 'Done' &&
      durationValidError === 'Done'
    ) {
      callApi();
    } else {
      showWarning(t('enterValidData'));
      if (nameValidError != 'Done') {
        setNameValidError(t('required'));
      }
      if (nameValidError === 'Please enter a different treatment name') {
        setNameValidError(t('Please enter a different treatment name'));
      }
      if (priceValidError != 'Done') {
        setpriceValidError(t('required'));
      }
      if (durationValidError != 'Done') {
        setDurationValidError(t('required'));
      }
    }
  };

  const [nameValidError, setNameValidError] = useState('');

  const handleValidName = val => {
    if (val.length === 0) {
      setNameValidError(t('required'));
    } else if (val.length < 3) {
      setNameValidError(t('minimumChar'));
    } else if (val.length > 20) {
      setNameValidError(t('maxChar'));
    } else {
      setNameValidError('Done');
    }
  };

  const [priceValidError, setpriceValidError] = useState('');

  const handleValidprice = val => {
    if (val.length === 0) {
      setpriceValidError(t('required'));
    } else if (val.length > 4) {
      setpriceValidError(t('minimumChar'));
    } else {
      setpriceValidError('Done');
    }
  };
  const [durationValidError, setDurationValidError] = useState('');

  const handleValidduration = val => {
    if (val.length === 0) {
      setDurationValidError(t('required'));
    } else {
      setDurationValidError('Done');
    }
  };

  const callApi = async () => {
    setIsLoading(true);
    var data = JSON.stringify({
      salonId: SalonID,
      serviceId: SType,
      name: isServiceType,
      price: isPrise,
      duration: isTime + ' minutes',
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}/addServiceType`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          setIsLoading(false);
          showSuccess(t('successFully'));
          navigation.navigate('DashboardScreen', {
            screenType: 'Screen_A',
          });
          setIsServiceType('');
          setIsPrise('');
          setIsisTime('');
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        alert('Error Add services');
        showDanger(error?.response?.data?.msg);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: scale(25),
        }}>
        <Text style={[styles.subTextHeading, {fontWeight: '600'}]}>
          Add treatment details
        </Text>
        <TouchableOpacity onPress={() => Oncancle(true)}>
          <Text
            style={[
              styles.subTextHeading,
              {color: '#57429D', fontWeight: '500'},
            ]}>
            Cancle
          </Text>
        </TouchableOpacity>
      </View>
      <LInput
        title={t('treatmentType')}
        onChangeText={name => {
          setIsServiceType(name), handleValidName(name), setArabicLaguage(name);
          setFranchLaguage(name);
        }}
        placeholder={t('treatmentType')}
        value={isServiceType}
        textConinerstyle={{marginTop: hp(2)}}
        language={'English'}
      />
      {nameValidError !== 'Done' && nameValidError !== '' ? (
        <SmallTitle
          title={nameValidError}
          alignSelf="flex-start"
          color={colors.green}
          marginBottom={wp(4)}
          marginLeft={wp(5)}
          width={wp(80)}
        />
      ) : null}
      <Translator
        type="google"
        from="en"
        to="ar"
        value={isServiceType}
        onTranslated={test => {
          test == 'Enter a URL'
            ? setArabicLaguage(' ')
            : setArabicLaguage(test);
        }}
      />
      <Translator
        type="google"
        from="en"
        to="fr"
        value={isServiceType}
        onTranslated={test => {
          test == 'Enter a URL'
            ? setFranchLaguage(' ')
            : setFranchLaguage(test);
        }}
      />

      <LInput
        title={t('treatmentType')}
        onChangeText={text => {
          setArabicLaguage(text);
        }}
        placeholder={t('treatmentType')}
        value={arabicLaguage}
        textConinerstyle={{marginTop: hp(0)}}
        language={'*Arabic'}
        direction={'RTL'}
      />
      <LInput
        title={'treatmentType'}
        onChangeText={text => setFranchLaguage(text)}
        placeholder={'treatmentType'}
        value={franchLaguage}
        textConinerstyle={{marginTop: hp(0)}}
        language={'*French'}
      />
      <LInput
        title={t('treatmentPrice')}
        onChangeText={price => {
          setIsPrise(price), handleValidprice(price);
        }}
        placeholder={t('treatmentPrice')}
        value={isPrise}
        textConinerstyle={{marginTop: hp(0)}}
      />
      {priceValidError !== 'Done' && priceValidError !== '' ? (
        <SmallTitle
          title={priceValidError}
          alignSelf="flex-start"
          color={colors.green}
          marginBottom={wp(4)}
          marginLeft={wp(5)}
          width={wp(80)}
        />
      ) : null}
      <LInput
        title={t('treatmentestimatedtime')}
        onChangeText={duration => {
          setIsisTime(duration), handleValidduration(duration);
        }}
        placeholder={'time'}
        value={isTime}
        textConinerstyle={{marginTop: hp(0)}}
      />
      {durationValidError !== 'Done' && durationValidError !== '' ? (
        <SmallTitle
          title={durationValidError}
          alignSelf="flex-start"
          color={colors.green}
          marginBottom={wp(4)}
          marginLeft={wp(5)}
          width={wp(80)}
        />
      ) : null}
      <Text style={[styles.subTextHeading, {marginTop: hp(1)}]}>
        Service category
      </Text>
      <SelectGender
        genderVieStyle={{marginTop: hp(1)}}
        onSelectValue={onSelectGender}
      />
      <Text
        style={[
          styles.subTextHeading,
          {fontWeight: '500', marginLeft: wp(60), color: '#57429D'},
        ]}>
        + Add stylist
      </Text>
      {StyList === undefined || StyList === 0 ? (
        <>
          <View style={styles.alertView}>
            <View style={styles.alertBG}>
              <Text style={{color: 'white'}}>!</Text>
            </View>
            <Text style={{color: '#DE4C5B', marginLeft: scale(16)}}>
              No stylist list created
            </Text>
          </View>
          <View style={styles.popUpView}>
            <Text
              style={{
                textAlign: 'left',
                paddingHorizontal: 10,
                lineHeight: 30,
              }}>
              You must create the
              <Text style={{color: '#56429D', textDecorationLine: 'underline'}}>
                {' '}
                stylists
              </Text>{' '}
              section before assigning stylist. You can always return to this
              section or select this treatment from the stylist list
            </Text>
          </View>
        </>
      ) : null}

      <Button
        buttonText={'Add Treatment'}
        width="90%"
        marginTop={hp(2)}
        marginBottom={verticalScale(900)}
        onPress={() => valid()}
      />
    </ScrollView>
  );
};

export default ServiceType;

const styles = StyleSheet.create({
  subTextHeading: {
    color: '#5E5E5F',
    fontSize: 16,
    fontWeight: '400',
  },
  popUpView: {
    marginTop: hp(2),
    height: hp(15),
    backgroundColor: 'rgba(255, 204, 0, 0.2)',
    width: wp(80),
    alignSelf: 'center',
    justifyContent: 'center',
    borderLeftWidth: 9,
    borderLeftColor: '#56429D',
  },
  alertView: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: scale(33),
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 0,
    backgroundColor: '#FFFFFF',
  },
  alertBG: {
    height: scale(15),
    marginLeft: scale(12),
    width: 15,
    borderRadius: 100,
    backgroundColor: '#FF6C6C',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A10606',
  },
});
