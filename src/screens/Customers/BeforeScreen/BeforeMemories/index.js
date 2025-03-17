import {View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../components/Header/Header';
import Title from '../../../../components/Title/Title';
import Button from '../../../../components/Button/Button';
import SmallText from '../../../../components/SmallText/SmallText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MemoryComponent from '../../../../components/Client Components/MemoryBeforeAfterComponet';
import styles from './style';
import axios from 'axios';
import Config from '../../../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const BeforeMemories = ({navigation, route}) => {
  const {params} = route;
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  let id = route?.params?.bookindId?.bookingData?._id;
  let SalonName = route?.params?.bookindId?.salon?.businessName;
  let Address =
    route?.params?.bookindId?.salon?.address +
    ', ' +
    route?.params?.bookindId?.salon?.city;
  const [filePath, setFilePath] = useState();

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('tokenValue');
      Config.token = JSON.parse(value);
    } catch (error) {}
  };

  const valid = () => {
    if (filePath) {
      setLoading(true);
      var FormData = require('form-data');
      var data = new FormData();
      {
        filePath
          ? data.append('before-img', {
              uri: filePath.assets[0].uri,
              type: filePath.assets[0].type,
              name: filePath.assets[0].fileName,
            })
          : null;
      }

      var config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `${Config.baseUrl}beforeMoment/${id}`,
        headers: {
          Authorization: `Bearer ${Config.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          let res = response.data;
          if (res.success) {
            setLoading(false);
            navigation.replace('DISCOVER_SCREEN');
          }
        })
        .catch(function (error) {
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Header small />
      <Title
        paddingHorizontal={wp('4%')}
        title={t('memories')}
        alignSelf="flex-start"
        marginTop={hp(1)}
        marginBottom={hp(5)}
      />
      <View style={styles.body} showsVerticalScrollIndicator={false}>
        <MemoryComponent
          title={SalonName}
          text={Address}
          img={params?.path}
          img1={params?.path}
        />
        <View style={styles.FAB}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              buttonText={t('save')}
              onPress={() => {
                valid();
                navigation.navigate('DISCOVER_SCREEN');
              }}
            />
          )}
          <SmallText
            text={t('takePhotoText')}
            alignSelf="center"
            marginTop={wp(2)}
          />
        </View>
      </View>
    </View>
  );
};

export default BeforeMemories;
