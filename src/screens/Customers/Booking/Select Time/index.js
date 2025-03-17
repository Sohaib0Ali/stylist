import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import colors from '../../../../assets/colors/colors';
import MediumTitle from '../../../../components/MediumTitle/MediumTitle';
import SemiMediumTitle from '../../../../components/Semi Medium Title';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import Button from '../../../../components/Button/Button';
import styles from './style';
import images from '../../../../assets/images/images';
import SmallText from '../../../../components/SmallText/SmallText';
import BookingHeader from '../../../../components/Client Components/Booking/Booking Header';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { showWarning } from '../../../../../Utils/FlashMessage';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

export default function SelectTimeScreen({ navigation, route }) {
  const { t } = useTranslation();
  const [textMessage, setTextMessage] = useState(t('selectTime'));
  const [selectedId, setSelectedId] = useState(null);
  const isFocused = useIsFocused();
  const [selectedTime, setSelectedTime] = useState('');
  const [dateArray, setdateArray] = useState([]);
  const serviceTypeId = route.params.selectedTypeServicesId;
  const prevdata = route.params.prevdata;
  const totalPrice = route.params.totalPrice;
  const selectedDate = route.params.selectedDate;
  const stylistId = route.params.stylistId;
  const salonId = route.params.salonId;
  const serviceId = route.params.serviceId;
  const itemData = route.params.itemData;
  const servicesData = route.params.servicesData;
  const totalTime = route.params.totalTime;
  const data = servicesData;
  const title = route.params.title;
  useEffect(() => {
    if (!isFocused) {
      setSelectedId(null);
    } else {
      toTimestamp();
    }
  }, [isFocused]);
  const toTimestamp = () => {
    let DumyArray = [];
    const fromDate = new Date(
      `${selectedDate} ${prevdata?.schedule?.from}`,
    ).getTime();
    const toDate = new Date(
      `${selectedDate} ${prevdata?.schedule?.to}`,
    ).getTime();
    const fromTimestamp = fromDate / 1000;
    const toTimestamp = toDate / 1000;
    let difference = (toTimestamp - fromTimestamp) / 3600;
    let totalTimePieces = difference * 2;
    let todayTimeStemp = new Date().getTime();

    for (let i = 0; i <= totalTimePieces; i++) {
      let addAdition = i * 1800 * 1000;
      let finalTimeStemp = fromDate + addAdition;
      let findTime = moment(finalTimeStemp).format('hh:mm A');
      if (todayTimeStemp < finalTimeStemp) {
        DumyArray.push({ date: findTime, id: i });
      }
    }
    setdateArray(DumyArray);
  };

  const Item = ({ item, onPress, backgroundColor }) => (
    <TouchableOpacity
      style={[styles.itemBg1, backgroundColor]}
      onPress={() => onPress()}>
      <SmallTitle top={hp(0.3)} title={item.date} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BookingHeader
        bg={itemData?.salon?.profileImage}
        height={hp(35)}
        name="TON&GUY"
        star="3.9"
        reviews="33"
        textShow={textMessage}
        withoutContent
      />
      <View style={styles.body}>
        <View style={styles.toggle} />
        <MediumTitle title={title} marginBottom={hp(1)} marginTop={hp(4)} />
        <View>
          <FlatList
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
            showsHorizontalScrollIndicator={false}
            data={data}
            numColumns={2}
            renderItem={({ item, index }) =>
              item.isSelected === 'true' ? (
                <View style={styles.itemBg}>
                  <SmallTitle title={item.name} />
                </View>
              ) : null
            }
            keyExtractor={item => item._id}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.imgTextContainer}>
            <View style={styles.imgBg}>
              {prevdata ? (
                <Image
                  style={styles.img}
                  source={{
                    uri: prevdata?.stylist
                      ? prevdata?.stylist?.profilePic
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
                    prevdata?.stylist
                      ? prevdata?.stylist?.position
                      : prevdata?.position
                  }
                  alignSelf="flex-start"
                />
                {prevdata?.stylist ? (
                  <SemiMediumTitle
                    title={
                      prevdata?.stylist?.firstName +
                      ' ' +
                      prevdata?.stylist?.lastName
                    }
                  />
                ) : (
                  <SemiMediumTitle
                    title={prevdata?.firstName + ' ' + prevdata?.lastName}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={styles.priceBg}>
            <SmallText text={t('price')} marginRight={wp(1.5)} />
            <SmallTitle
              title={prevdata.currency}
              marginTop={wp(0.5)}
              marginLeft={wp(2)}
              marginRight={wp(1)}
              alignSelf="center"
            />
            <MediumTitle title={totalPrice} />
          </View>
        </View>

        <SimpleText
          text={t('availableTime')}
          marginTop={hp(1.8)}
          marginBottom={hp(1.4)}
          textAlign="left"
          alignSelf="flex-start"
        />

        <View style={styles.FAB}>
          <Button
            buttonText={t('next')}
            onPress={() => {
              selectedId != null
                ? navigation.navigate('CONFIRM_BOOKING_SCREEN', {
                  serviceTypeId: serviceTypeId,
                  prevdata: prevdata,
                  totalPrice: totalPrice,
                  selectedDate: selectedDate,
                  stylistId: stylistId,
                  salonId: salonId,
                  serviceId: serviceId,
                  itemData: itemData,
                  servicesData: servicesData,
                  selectedTime: selectedTime,
                  totalTime: totalTime,
                  title: title,
                })
                : showWarning(t('selectTime'));
            }}
          />
        </View>
      </View>
    </View>
  );
}
