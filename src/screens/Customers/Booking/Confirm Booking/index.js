import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
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
import PickerComponent from '../../../../components/PickerComponent/PickerComponent';
import Input from '../../../../components/Input/Input';
import PhoneInput from 'react-native-phone-number-input';
import colors from '../../../../assets/colors/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import GenderPickerComponent from '../../../../components/GenderPicker/GenderPickerComponent';
import SemiTitle from '../../../../components/SemiTitle';
import moment from 'moment';
import {showWarning} from '../../../../../Utils/FlashMessage';
import Config from '../../../../config/config';
import axios from 'axios';
import CustomeLoader from '../../../../components/Loader/CustomeLoader';
import Header from '../../../../components/Header/Header';
import {useTranslation} from 'react-i18next';

export default function ConfirmBookingScreen({navigation, route}) {
  const {t} = useTranslation();
  const [checked, setChecked] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('Child');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  const [show, setShow] = useState(false);
  const refRBSheet = useRef();
  const [serviceTypeName, setServiceTypeName] = useState([]);
  const [bookingId, setBookingId] = useState();
  const [phoneValidError, setPhoneValidError] = useState('');
  const [nameValidError, setNameValidError] = useState('');

  const serviceTypeId = route?.params?.serviceTypeId;
  const prevdata = route?.params?.prevdata;
  const totalPrice = route?.params?.totalPrice;
  const selectedDate = route?.params?.selectedDate;
  const displayDate = moment(selectedDate).format('dddd, MMM DD, YYYY');
  const stylistId = route?.params?.stylistId;
  const salonId = route?.params?.salonId;
  const serviceId = route?.params?.serviceId;
  const itemData = route?.params?.itemData;
  const servicesData = route?.params?.servicesData;
  const totalTime = route?.params?.totalTime;
  const selectedTime = route?.params?.selectedTime;
  const title = route?.params?.title;
  const toDate = new Date(`${selectedDate} ${selectedTime}`).getTime();
  useEffect(() => {
    generateBookingId();
    getServiceName();
  }, []);

  const generateBookingId = () => {
    const date = new Date();
    const addDashes = str => str.replace(/^(.{4})(.{5})/, '$1-$2-');
    let bookingId = addDashes(date.getTime().toString());
    setBookingId(bookingId);
  };

  const getServiceName = () => {
    let DumyArray = [];
    servicesData.map(item => {
      if (item?.isSelected) {
        DumyArray.push(item.name);
      }
    });
    setServiceTypeName(DumyArray);
  };

  const handleValidPhone = val => {
    if (val.length === 0) {
      setPhoneValidError('phone field must not be empty');
    } else if (val.length < 10) {
      setPhoneValidError('Minimum 10 digits required');
    } else if (val.length > 13) {
      setPhoneValidError('Maximum 13 digits required');
    } else {
      setPhoneValidError('Done');
    }
  };

  const handleValidName = val => {
    if (val.length === 0) {
      setNameValidError('Please enter your Account name');
    } else if (val.length < 3) {
      setNameValidError('Account name should be greater than 3 characters');
    } else if (val.length > 20) {
      setNameValidError('Account name should be less than 20 digits');
    } else {
      setNameValidError('Done');
    }
  };

  const validate = () => {
    if (nameValidError === 'Done' && phoneValidError === 'Done') {
      callApi();
    } else {
      showWarning(t('validationFailed'));
    }
  };

  useEffect(() => {
    Config.bookingData = JSON.stringify({
      salonId: salonId,
      stylistId: stylistId,
      serviceId: serviceId,
      serviceTypeId: serviceTypeId,
      amount: totalPrice,
      duration: totalTime,
      bookingDateTime: new Date(toDate),
      bookingType: show ? 'For Someone else' : 'For me',
      name: name,
      phoneNo: phoneNumber,
      ageStatus: type,
      currency: prevdata?.currency,
      bookingNumber: bookingId,
    });
  }, [phoneNumber, name]);

  const callApi = async () => {
    setLoading(false);
    if (Config.token) {
      setLoading(true);
      var data = Config.bookingData;
      var config = {
        method: 'post',
        url: `${Config.baseUrl}createBooking`,
        headers: {
          Authorization: `Bearer ${Config.token}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios
        .request(config)
        .then(function (response) {
          setLoading(false);
          if (response?.data?.success) {
            navigation.navigate('BOOKED_SCREEN');
          }
        })
        .catch(function (error) {
          setLoading(false);
        });
    } else {
      Alert.alert('Not Login', 'You need to login first', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate('LOGIN_SCREEN')},
      ]);
    }
  };

  return (
    <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? hp(6) : 0}}>
      <Header />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.row}>
            <SemiMediumTitle title={t('bookDetails')} />
            <SmallText text={bookingId ? bookingId : 'ID Null'} />
          </View>
          <SemiTitle
            fontSize={wp(5.8)}
            title={itemData.salon.businessName}
            marginTop={hp(2.5)}
          />
          <SmallText
            text={itemData.salon.address + ', ' + itemData.salon.city}
            alignSelf="flex-start"
          />
          <View style={{...styles.row, marginBottom: hp(3)}}>
            <SimpleText text={displayDate} color={colors.headingBlack} />
            <View style={styles.itemBg}>
              <SmallTitle title={selectedTime} marginTop={wp(0.9)} />
            </View>
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
          </View>
          <View style={styles.itemContainer}>
            <SimpleText
              text={t('service')}
              marginTop={hp(1.8)}
              marginBottom={hp(1.4)}
              textAlign="left"
            />
            <SimpleText text={title} alignSelf="center" color={colors.black} />
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
              text={serviceTypeName ? serviceTypeName[0] : 'Service Type'}
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
              text={totalTime + ' mins'}
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
                title={prevdata.currency}
                marginLeft={wp(2)}
                marginRight={wp(1)}
                alignSelf="center"
              />
              <SimpleText
                text={totalPrice}
                alignSelf="center"
                color={colors.black}
              />
            </View>
          </View>
          <Divider />

          <View style={styles.checkBoxContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setChecked(1), setShow(false);
              }}
              style={styles.checkTextBg}>
              <View
                style={
                  checked === 1 ? styles.checkBoxSelected : styles.checkBox
                }
              />
              <SmallText text={t('forMe')} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setChecked(2), setShow(true);
              }}
              style={styles.checkTextBg}>
              <View
                style={
                  checked === 2 ? styles.checkBoxSelected : styles.checkBox
                }
              />
              <SmallText text={t('forSomeOneElse')} />
            </TouchableOpacity>
          </View>
          {show ? (
            <View style={{marginBottom: hp(4)}}>
              <PickerComponent
                value={type}
                direction="LTR"
                onPress={() => refRBSheet.current.open()}
              />
              <Input
                value={name}
                placeholder={t('namePlaceHolder')}
                title={t('name')}
                onChangeText={account => {
                  setName(account);
                  handleValidName(account);
                }}
              />
              {nameValidError !== 'Done' && nameValidError !== '' ? (
                <SmallTitle
                  title={nameValidError}
                  alignSelf="flex-start"
                  color={colors.green}
                  marginBottom={wp(4)}
                  marginLeft={wp(5)}
                />
              ) : null}
              <View style={styles.phoneBg}>
                <Text style={styles.title}>{t('phoneNumber')}</Text>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="PK"
                  layout="first"
                  containerStyle={styles.phoneContainer}
                  countryPickerButtonStyle={{backgroundColor: colors.secondary}}
                  textContainerStyle={styles.textInput}
                  onChangeFormattedText={text => {
                    setphoneNumber(text);
                    handleValidPhone(text);
                  }}
                />
              </View>
              {phoneValidError !== 'Done' && phoneValidError !== '' ? (
                <SmallTitle
                  title={phoneValidError}
                  alignSelf="flex-start"
                  color={colors.green}
                  marginBottom={wp(4)}
                  marginTop={hp(1.5)}
                  marginLeft={wp(5)}
                />
              ) : null}
            </View>
          ) : (
            <View
              style={{backgroundColor: colors.secondary, paddingBottom: '30%'}}
            />
          )}

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
            <GenderPickerComponent
              type
              getCountValue={selectedType => {
                setType(
                  selectedType == 1
                    ? 'Child'
                    : selectedType == 2
                    ? 'Adult'
                    : 'Child',
                );
              }}
              onPressLeft={() => refRBSheet.current.close()}
              onPressRight={() => refRBSheet.current.close()}
            />
          </RBSheet>
        </View>
      </ScrollView>
      <View style={styles.FAB}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            buttonText={t('confirmBooking')}
            onPress={() => {
              show ? validate() : callApi();
            }}
          />
        )}
      </View>
      <CustomeLoader visible={loading} />
    </View>
  );
}
