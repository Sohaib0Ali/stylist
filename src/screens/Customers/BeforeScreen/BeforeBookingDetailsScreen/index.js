import {View, Image, ScrollView, Text} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';
import images from '../../../../assets/images/images';
import SmallText from '../../../../components/SmallText/SmallText';
import SemiMediumTitle from '../../../../components/Semi Medium Title';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import Button from '../../../../components/Button/Button';
import Divider from '../../../../components/Divider/divider';
import colors from '../../../../assets/colors/colors';
import SemiTitle from '../../../../components/SemiTitle';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import fonts from '../../../../assets/fonts/fonts';
import ImagePicker from 'react-native-image-crop-picker';

const BeforeBookingDetailsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    getBookingInfo();
  }, []);

  const getBookingInfo = async () => {
    let Data = await AsyncStorage.getItem('BookingInfo');
    setBookingData(JSON.parse(Data));
  };

  const takeBeforePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      navigation.navigate('BEFORE_MEMORIES', {
        bookindId: bookingData,
        path: image?.path,
        type: image?.mime,
      });
    });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.toggle} />
          <View style={styles.row}>
            <SemiMediumTitle title={t('bookDetails')} />
            <Text
              style={{
                fontSize: 12,
                fontFamily: fonts.Exo2Bold,
                fontWeight: '400',
              }}>
              {'0203-555-4330'}
            </Text>
          </View>
          <SemiTitle
            fontSize={wp(5.8)}
            title={'Toney & Guy'}
            marginTop={hp(2.5)}
          />
          <Text>{'16th Street Mall, London WC2 5JW'}</Text>
          <View style={{...styles.row, marginBottom: hp(3)}}>
            <SimpleText
              text={moment(bookingData?.bookingData?.bookingDateTime).format(
                'dddd, MMM DD, YYYY',
              )}
              color={colors.headingBlack}
            />
            <View style={styles.itemBg}>
              <SmallTitle
                title={moment(bookingData?.bookingData?.bookingDateTime).format(
                  'hh:mm a',
                )}
                marginTop={wp(0.9)}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.imgTextContainer}>
              <View style={styles.imgBg}>
                {bookingData ? (
                  <Image
                    style={styles.img}
                    source={{
                      uri: bookingData
                        ? bookingData?.stylist?.profilePic
                        : prevdata?.profilePic,
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    style={styles.manIcon}
                    source={images.manIcon}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={styles.catNameBg}>
                <View>
                  <SmallText
                    text={
                      bookingData ? bookingData?.stylist?.position : 'position'
                    }
                    alignSelf="flex-start"
                  />
                  <SemiMediumTitle title={'Cody Fisher'} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <SimpleText
              text={t('client')}
              marginTop={hp(1.8)}
              marginBottom={hp(1.4)}
              textAlign="left"
            />
            <SimpleText text={'You'} alignSelf="center" color={colors.black} />
          </View>
          <Divider />

          <View style={styles.itemContainer}>
            <SimpleText
              text={t('service')}
              marginTop={hp(1.8)}
              marginBottom={hp(1.4)}
              textAlign="left"
            />
            <SimpleText
              text={bookingData ? bookingData?.service?.servname : 'Haircut'}
              alignSelf="center"
              color={colors.black}
            />
          </View>
          <Divider />
          <View style={styles.itemContainer}>
            <SimpleText
              text={t('type')}
              marginTop={hp(1.8)}
              marginBottom={hp(1.4)}
              textAlign="left"
            />
            <SimpleText
              text={
                bookingData?.serviceType
                  ? bookingData?.serviceType[0]?.name
                  : 'Model haircut'
              }
              alignSelf="center"
              color={colors.black}
            />
          </View>
          <Divider />
          <View style={styles.itemContainer}>
            <SimpleText
              text={t('duration')}
              marginTop={hp(1.8)}
              marginBottom={hp(1.4)}
              textAlign="left"
            />
            <SimpleText
              text={
                bookingData ? bookingData?.bookingData?.duration : '30 mins'
              }
              alignSelf="center"
              color={colors.black}
            />
          </View>
          <Divider />
          <View style={styles.itemContainer}>
            <SimpleText
              text={t('price')}
              marginTop={hp(1.8)}
              marginBottom={hp(1.4)}
              textAlign="left"
            />
            <View style={{flexDirection: 'row'}}>
              <SmallTitle
                title={bookingData ? bookingData?.bookingData?.currency : '$'}
                marginLeft={wp(2)}
                marginRight={wp(1)}
                alignSelf="center"
              />
              <SimpleText
                text={bookingData ? bookingData?.bookingData?.amount : '50'}
                alignSelf="center"
                color={colors.black}
              />
            </View>
          </View>
          <Divider />
        </View>
        <View style={styles.FAB}>
          <Button
            buttonText={t('takePhoto')}
            onPress={() => {
              takeBeforePhoto();
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
            }}>
            {t('takePhotoBefore')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BeforeBookingDetailsScreen;
