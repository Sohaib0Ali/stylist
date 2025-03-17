import React, {useEffect, useState} from 'react';
import {View, Image, SectionList} from 'react-native';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import Divider from '../../../../BusinessUtills/components/Divider/divider';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import SmallText from '../../../../BusinessUtills/components/SmallText/SmallText';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';
import forwardIcon from '../../../../BusinessUtills/assets/icons/nextArrow.png';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {ActivityIndicator} from 'react-native';
import {useTranslation} from 'react-i18next';

const HistoryScreen = ({data}) => {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const {t} = useTranslation();

  useEffect(() => {
    if (isFocused) {
      getHistory();
    }
  }, []);

  const getHistory = () => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/findStylistBookingsMonthWise/${data?._id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        const res = response.data;
        if (res.success === true) {
          setRecord(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const renderSectionHeader = ({section}) => (
    <SemiMediumTitle
      title={moment(section?.dateTime).format('MMM, YYYY')}
      fontSize={wp(4.1)}
      marginBottom={hp(1.5)}
      marginTop={hp(2.1)}
    />
  );

  const renderItem = ({item}) => (
    <View>
      <View
        style={{
          flexDirection: 'row',
          height: hp(7.6),
          justifyContent: 'space-between',
        }}>
        <View>
          <SmallText
            text={item?.salon?.name}
            fontSize={wp(4.1)}
            color={'black'}
            alignSelf={'baseline'}
          />
          <SmallText
            text={item?.service?.name}
            fontSize={wp(3.5)}
            color={'#5E5E5F'}
            alignSelf={'baseline'}
          />
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row'}}>
            <SmallText
              text={item?.currency}
              color={'black'}
              fontSize={wp(4.1)}
            />
            <SmallText
              text={item?.amount}
              color={'black'}
              fontFamily={fonts.bold}
              fontSize={wp(4.1)}
            />
          </View>

          <SmallText
            text={
              moment(item?.bookingDateTime).format('DD MMM') +
              ' at ' +
              moment(item?.bookingDateTime).format('hh:mm A')
            }
            fontSize={wp(3.5)}
            color={'#5E5E5F'}
          />
        </View>
      </View>
      <Divider marginBottom={hp(2.5)} />
    </View>
  );

  return (
    <View style={{paddingHorizontal: wp('4%')}}>
      <View>
        <View style={styles.body}>
          <SimpleText
            text={t('payrollReport')}
            alignSelf="flex-start"
            color={'#000000'}
            fontSize={wp(4.1)}
          />
          <View style={{width: wp(6), height: wp(4)}}>
            <Image
              source={forwardIcon}
              resizeMode="contain"
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </View>
      </View>
      <Divider />
      <View style={{height: hp(50)}}>
        {record === null ? (
          loading ? (
            <ActivityIndicator
              size={'large'}
              color={'#57429D'}
              style={{marginTop: hp(4.1)}}
            />
          ) : (
            <SimpleText text={t('notFound')} marginTop={hp(4.1)} />
          )
        ) : (
          <SectionList
            showsVerticalScrollIndicator={false}
            style={{marginTop: hp(2.1), marginBottom: 20}}
            sections={record}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
          />
        )}
      </View>
    </View>
  );
};

export default HistoryScreen;
