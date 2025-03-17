import {View, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import SemiMediumTitle from '../../../components/Semi Medium Title';
import SmallText from '../../../components/SmallText/SmallText';
import SemiTitle from '../../../components/SemiTitle';
import SimpleText from '../../../components/SimpleText/SimpleText';
import colors from '../../../assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from '../../../assets/fonts/fonts';
import {useTranslation} from 'react-i18next';
import SmallTitle from '../../../components/SmallTitle/SmallTitle';
import Divider from '../../../components/Divider/divider';
import Button from '../../../components/Button/Button';
import {scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Config from '../../../config/config';
import axios from 'axios';
import {showDanger, showSuccess} from '../../../../Utils/FlashMessage';

export default function Book_details() {
  const Booked_services = useSelector(state => state?.ApiData?.BookingService);
  let userData = Config.userDetail;
  const [salonName, setSalonName] = useState();
  const [salonAddres, setSalonAddress] = useState();

  const TotalPrice = Booked_services.reduce(
    (sum, item) => sum + item?.Booked_crew?.price,
    0,
  );

  useEffect(() => {
    const salonNames = Booked_services.map(
      booking => booking?.Booked_crew?.salonname,
    );
    const salonAddresses = Booked_services.map(
      booking => booking?.Booked_crew?.salonAddress,
    );
    setSalonAddress(salonAddresses);
    setSalonName(salonNames.join(', '));
  }, [Booked_services]);
  const formatDate = dateString => {
    const formattedDate = moment(dateString, 'MM/DD/YYYY').format(
      'dddd, MMMM D, YYYY',
    );
    return formattedDate;
  };
  const {t} = useTranslation();

  const ConfirmBookingCallAPI = async () => {
    if (Booked_services.length === 0) {
    } else {
      const firstBooking = Booked_services[0]?.Booked_crew;
      const stylistIds = Booked_services.map(
        booking => booking?.Booked_crew?.crewid,
      );
      const serviceIds = Booked_services.map(
        booking => booking?.Booked_crew?.Main_ServiceID,
      );
      const serviceTypeIds = Booked_services.map(
        booking => booking?.Booked_crew?.Service_id,
      );
      const payload = {
        userId: userData?._id,
        salonId: firstBooking?.salon_Id,
        stylistId: stylistIds,
        serviceId: serviceIds,
        serviceTypeId: serviceTypeIds,
        bookingNumber: '9',
        amount: TotalPrice,
        duration: '130',
        bookingType: 'For me',
        tip: 0,
        name: userData?.name,
        phoneNo: '',
        ageStatus: userData?.gender,
        originalPrice: 0,
        status: 'Pending confirmation',
        currency: 'MAD',
        paymentMethod: 'MAD',
        bookingDateTime: '2023-06-21 4:54',
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Config.token}`,
      };
      try {
        const response = await axios.post(
          `${Config.baseUrl}createBooking`,
          JSON.stringify(payload),
          {headers},
        );
        if (response?.data?.success === true) {
          showSuccess(t('Booking Confirm'));
        } else {
          showDanger(t('Some thing went Wrorng'));
        }
      } catch (error) {
        showDanger(t('Some thing went Wrorng'));
        console.error('Error:', error);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.row}>
            <SemiMediumTitle title={t('bookDetails')} />
            <SmallText text={'0203-555-4330'} />
          </View>
          <SemiTitle
            fontSize={scale(24)}
            title={salonName}
            marginTop={scale(24)}
            fontFamily={fonts.Exo2Bold}
            weight={'600'}
          />
          <SmallText
            text={salonAddres}
            alignSelf="flex-start"
            marginTop={scale(6)}
            fontSize={scale(14)}
            fontFamily={fonts.Exo2Bold}
            weight={'400'}
          />
          {Booked_services?.map((item, index) => {
            return (
              <>
                <View style={styles.imgTextContainer}>
                  <View style={styles.imgBg}>
                    <Image
                      style={styles.img}
                      source={{uri: item?.Booked_crew?.crewinfo?.profilePic}}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <SmallText
                      text={item?.Booked_crew?.crewinfo?.position}
                      alignSelf="flex-start"
                      fontSize={scale(14)}
                      fontWeight={'400'}
                      fontfamily={fonts.Exo2Bold}
                    />
                    <SemiMediumTitle
                      title={item?.Booked_crew?.crewinfo?.fullName}
                    />
                  </View>
                </View>

                <View style={{...styles.row, marginBottom: hp(3)}}>
                  <SimpleText
                    text={formatDate(item?.Booked_date)}
                    color={colors.headingBlack}
                    size={scale(18)}
                    fontFamily={fonts.Exo2Bold}
                    fontWeight={'400'}
                  />
                  <View style={styles.itemBg}>
                    <SmallTitle
                      title={item?.Booked_time}
                      fontSize={scale(15)}
                      Weight={'600'}
                      fontFamily={fonts.Exo2Bold}
                      alignSelf={'center'}
                    />
                  </View>
                </View>
                <View style={[styles.itemContainer, {marginBottom: scale(4)}]}>
                  <View style={{marginTop: scale(-13)}}>
                    <SimpleText
                      text={t('service')}
                      marginTop={hp(1.8)}
                      marginBottom={hp(1.4)}
                      textAlign="left"
                      size={scale(16)}
                    />
                  </View>
                  <View style={{}}>
                    <SimpleText
                      text={item?.Booked_crew?.Service_name}
                      alignSelf="center"
                      color={colors.black}
                      size={scale(18)}
                      fontWeight={'600'}
                    />
                  </View>
                </View>
                <Divider />
                <View style={styles.itemContainer}>
                  <SimpleText
                    text={t('type')}
                    marginTop={hp(1.8)}
                    marginBottom={hp(1.4)}
                    textAlign="left"
                    size={scale(16)}
                  />
                  <SimpleText
                    text={item?.Booked_crew?.service_type}
                    alignSelf="center"
                    color={colors.black}
                    size={scale(18)}
                    fontWeight={'600'}
                  />
                </View>
                <Divider />
                <View style={styles.itemContainer}>
                  <SimpleText
                    text={t('price')}
                    marginTop={hp(1.8)}
                    marginBottom={hp(1.4)}
                    textAlign="left"
                    size={scale(16)}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <SimpleText
                      text={
                        `${item?.Booked_crew?.crewinfo?.currency}` +
                        ' ' +
                        `${item?.Booked_crew?.price}`
                      }
                      alignSelf="center"
                      color={colors.black}
                      size={scale(18)}
                      fontWeight={'600'}
                    />
                  </View>
                </View>
                <Divider />
              </>
            );
          })}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: scale(30),
              marginVertical: scale(20),
            }}>
            <SimpleText
              text={'Total Price'}
              alignSelf="center"
              color={colors.subHeading}
              size={scale(22)}
              fontWeight={'700'}
            />
            <SimpleText
              text={'MAD ' + `${TotalPrice}`}
              alignSelf="center"
              color={colors.black}
              size={scale(22)}
              fontWeight={'600'}
            />
          </View>
          <Divider />
        </View>
      </ScrollView>
      <View style={styles.FAB}>
        {/* {loading ? (
                <ActivityIndicator />
              ) : ( */}
        <Button
          buttonText={t('confirmBooking')}
          onPress={() => {
            ConfirmBookingCallAPI();
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
  },
  body: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    backgroundColor: colors.secondary,
    paddingBottom: Platform.OS === 'ios' ? hp(17) : hp(10),
  },
  toggle: {
    backgroundColor: colors.borderColor,
    width: wp(8.5),
    height: hp(0.5),
    alignSelf: 'center',
    marginTop: hp(1.2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(2),
    marginRight: scale(5),
  },
  imgBg: {
    width: wp(12.9),
    height: wp(12.6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
    marginRight: wp(2),
    padding: wp(1),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },
  manIcon: {
    width: '45%',
    height: '45%',
  },
  catNameBg: {},
  priceBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(3),
    marginBottom: hp(2),
  },
  checkTextBg: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: wp(5),
  },
  checkBox: {
    borderWidth: wp(0.5),
    borderColor: colors.headingBlack,
    borderRadius: wp(33),
    width: wp(5),
    height: wp(5),
    marginRight: wp(3),
  },

  checkBoxSelected: {
    borderWidth: wp(1.4),
    borderColor: colors.headingBlack,
    borderRadius: wp(33),
    width: wp(5),
    height: wp(5),
    marginRight: wp(3),
  },
  phoneBg: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: wp(2),
  },
  title: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: wp(3.2),
    marginTop: hp(1),
    marginLeft: wp(3),
  },
  phoneContainer: {
    bottom: wp(1),
    width: '100%',
    backgroundColor: colors.secondary,
  },
  textInput: {
    paddingVertical: 0,
    backgroundColor: colors.secondary,
  },
  itemBg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.5),
    marginRight: wp(3),
    marginTop: wp(1),
    backgroundColor: '#FFCC00',
    borderRadius: scale(16),
  },
  FAB: {
    position: 'absolute',
    bottom: '2%',
    alignSelf: 'center',
  },
});
