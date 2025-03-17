import {View, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';
import BookingHeader from '../../../../components/Client Components/Booking/Booking Header';
import MediumTitle from '../../../../components/MediumTitle/MediumTitle';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import images from '../../../../assets/images/images';
import SmallText from '../../../../components/SmallText/SmallText';
import SemiMediumTitle from '../../../../components/Semi Medium Title';
import Button from '../../../../components/Button/Button';
import SemiTitle from '../../../../components/SemiTitle';
import DatePickerComponent from '../../../../components/DatePicker/DatePickerComponent';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {showWarning} from '../../../../../Utils/FlashMessage';
import {useTranslation} from 'react-i18next';

let selectedTypeServicesId = [];

export default function SelectDateScreen({img, navigation, route}) {
  const {t} = useTranslation();
  const [textMessage, setTextMessage] = useState(t('selectDate'));
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const servicesData = route.params.servicesTypeData;
  const itemData = route.params.itemData;
  const isFocused = useIsFocused();
  const [data, setData] = useState(servicesData);
  const [selectedDate, setSelectedDate] = useState();
  const prevdata = route.params.prevdata;
  const stylistId = route?.params?.serviceTypeID;
  const salonId = route?.params?.salonId;
  const serviceId = route?.params?.serviceID;
  const title = route.params.title;

  useEffect(() => {
    if (isFocused) {
      getSelectedServicesTypeIDs();
    } else {
      selectedTypeServicesId = [];
    }
  }, [isFocused]);

  const getSelectedServicesTypeIDs = () => {
    let totalPriceValue = 0;
    let totalTime = 0;
    servicesData.forEach(element => {
      if (element.isSelected == 'true') {
        selectedTypeServicesId.push(element._id);
        totalPriceValue = totalPriceValue + element.price;
        let timeVal = element.duration.split(' ');
        let timeIntVal = parseInt(timeVal[0]);
        totalTime = totalTime + timeIntVal;
      }
    });
    setTotalPrice(totalPriceValue);
    setTotalTime(totalTime);
  };

  const getDateValue = date => {
    setSelectedDate(moment(date).format('MM/DD/YYYY'));
  };

  return (
    <View style={styles.container}>
      <BookingHeader
        name="TONY&mp;GUY"
        bg={itemData?.salon?.profileImage}
        height={hp(35)}
        star="3.9"
        reviews="33"
        textShow={textMessage}
        withoutContent
      />
      <View style={styles.minContainer}>
        <View style={styles.body} showsVerticalScrollIndicator={false}>
          <View style={styles.toggle} />
          <SemiTitle title={title} marginBottom={hp(1.5)} marginTop={hp(4)} />
          <View>
            <FlatList
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
              showsHorizontalScrollIndicator={false}
              data={data}
              numColumns={2}
              renderItem={({item, index}) =>
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
              <SmallText text="price" marginRight={wp(1.5)} />
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
          <DatePickerComponent
            prevdata={prevdata}
            getDateValue={getDateValue}
          />
        </View>
      </View>
      <View style={styles.FAB}>
        <Button
          marginTop={hp(5)}
          marginBottom={hp(11)}
          buttonText={t('next')}
          onPress={() => {
            selectedDate
              ? navigation.navigate('SELECT_TIME_SCREEN', {
                  selectedTypeServicesId: selectedTypeServicesId,
                  prevdata: prevdata,
                  totalPrice: totalPrice,
                  selectedDate: selectedDate,
                  stylistId: stylistId,
                  salonId: salonId,
                  serviceId: serviceId,
                  itemData: itemData,
                  servicesData: servicesData,
                  totalTime: totalTime,
                  title: title,
                })
              : showWarning(t('selectdate'));
          }}
        />
      </View>
    </View>
  );
}
