//================================ React Native Imported Files ======================================//

import React, {useState, useRef} from 'react';
import {View, Text, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

//================================ Local Imported Files ======================================//
import Input from '../../../../BusinessUtills/components/Input/Input';
import Title from '../../../../BusinessUtills/components/Title/Title';
import styles from './style';
import Button from '../../../../BusinessUtills/components/Button/Button';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import BConfig from '../../../../BusinessUtills/config/config';
import Header from '../../../../BusinessUtills/components/Header/Header';
import {
  showDanger,
  showSuccess,
  showWarning,
} from '../../../../../../utils/FlashMessage';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';

const AddNewServiceType = ({navigation, route}) => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const checkAssign = route?.params?.checkAssign;
  const scrollViewRef = useRef(null);
  const [name, setName] = useState('');
  const [price, setprice] = useState('');
  const [duration, setDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {t} = useTranslation();
  let SalonID = MainBranch?.salon?._id;
  let serviceId = route?.params?.serviceID;

  const valid = () => {
    if (
      nameValidError === 'Done' &&
      priceValidError === 'Done' &&
      durationValidError === 'Done'
    ) {
      callApi();
    } else {
      showWarning(t('enterValidData'));
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
      setDurationValidError(t('pleaseEnterDuration'));
    } else {
      setDurationValidError('Done');
    }
  };

  const callApi = async () => {
    setIsLoading(true);
    var data = JSON.stringify({
      salonId: SalonID,
      serviceId: serviceId,
      name: name,
      price: price,
      duration: duration + ' minutes',
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
          if (checkAssign === true) {
            navigation.goBack();
          } else {
            navigation.navigate('ServiceScreen');
          }
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        showDanger(error?.response?.data?.msg);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Header
        direction={'RTL'}
        headerColor={'white'}
        headerBack={true}
        onBackPress={() => navigation.goBack()}
        small
      />
      <ScrollView
        ref={scrollViewRef}
        onScrollBeginDrag={() => {
          Keyboard.dismiss();
        }}
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        <Title
          title={t('addnewtype')}
          alignSelf={'baseline'}
          marginBottom={hp(2)}
        />

        <Input
          title={t('name')}
          value={name}
          onChangeText={name => {
            setName(name), handleValidName(name);
          }}
          placeholder={t('name')}
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

        <Input
          title={t('price')}
          value={price}
          keyboardType={'numeric'}
          onChangeText={price => {
            setprice(price), handleValidprice(price);
          }}
          placeholder={t('price')}
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

        <Input
          title={t('duration')}
          value={duration}
          keyboardType={'numeric'}
          onChangeText={duration => {
            setDuration(duration), handleValidduration(duration);
          }}
          placeholder={t('durationPlaceHolder')}
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

        <Button
          buttonText={t('addTypeService')}
          marginTop={wp(7)}
          onPress={() => valid()}
        />
      </ScrollView>
      <CustomeLoader visible={isLoading} />
    </View>
  );
};

export default AddNewServiceType;
