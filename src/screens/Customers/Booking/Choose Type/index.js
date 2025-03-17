import {View, FlatList, Image, Platform, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';
import BookingHeader from '../../../../components/Client Components/Booking/Booking Header';
import images from '../../../../assets/images/images';
import SmallText from '../../../../components/SmallText/SmallText';
import SemiMediumTitle from '../../../../components/Semi Medium Title';
import Button from '../../../../components/Button/Button';
import colors from '../../../../assets/colors/colors';
import SemiTitle from '../../../../components/SemiTitle';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import {useIsFocused} from '@react-navigation/native';
import Config from '../../../../config/config';
import {showWarning} from '../../../../../Utils/FlashMessage';
import axios from 'axios';
import CustomeLoader from '../../../../components/Loader/CustomeLoader';
import ChooseTypeComponent from '../../../../components/Client Components/ChooseTypeComponent';
import {useTranslation} from 'react-i18next';

let selectedServiceTypeID = [];
let count = 0;

export default function ChooseTypeScreen({img, navigation, route}) {
  const {t} = useTranslation();
  const [selectedId, setSelectedId] = useState(false);
  const [textMessage, setTextMessage] = useState(t('chooseType'));
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const serviceTypeID = route?.params?.id;
  const salonId = route?.params?.salonId;
  const serviceID = route?.params?.serviceID;
  const type = route?.params?.type;
  const prevdata = route?.params?.prevdata;
  const itemData = route?.params?.itemData;
  const title = route?.params?.title;

  const updateDataArray = position => {
    let newArr = data.map((item, index) => {
      if (index == position) {
        item.isSelected == 'true' ? setSelectedId(true) : null;
        return {
          ...item,
          isSelected: item.isSelected == 'true' ? 'false' : 'true',
        };
      }
      return item;
    });
    setData(newArr);
  };

  useEffect(() => {
    if (isFocused) {
      getChooseTypeData();
    } else {
      selectedServiceTypeID = [];
    }
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      if (count == 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, 500);
  }, [data]);

  const getChooseTypeData = async () => {
    var config = {
      method: 'get',
      url: `${Config.baseUrl}getServiceTypeByStylistId/${serviceTypeID}`,
      params: {salonId: salonId, serviceId: serviceID},

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Config.token}`,
      },
    };
    axios(config)
      .then(response => {
        setLoading(false);
        if (response.status === Config.statusCode) {
          count = count + 1;
          setData(response.data.data);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  const setSelectedIdsIntoArr = () => {
    data.map((item, index) => {
      item.isSelected == 'true' ? selectedServiceTypeID.push(item._id) : null;
    });
  };

  const checkValidation = () => {
    if (selectedServiceTypeID.length == 0) {
      showWarning(t('selecteService'));
    } else {
      navigation.navigate('SELECT_DATE_SCREEN', {
        servicesTypeData: data,
        prevdata: prevdata,
        title: title,
        salonId: salonId,
        serviceTypeID: serviceTypeID,
        itemData: itemData,
        serviceID: serviceID,
      });
    }
  };

  return (
    <View style={styles.container}>
      <BookingHeader
        bg={itemData?.salon?.profileImage}
        height={wp(60)}
        name="TON&mp;GUY"
        star="3.9"
        reviews="33"
        textShow={textMessage}
        withoutContent
      />
      <View style={styles.body}>
        <View style={styles.toggle} />
        <SemiTitle
          paddingHorizontal={wp('4%')}
          title={title}
          marginBottom={hp(1)}
          marginTop={hp(4)}
        />
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
        <SimpleText
          paddingHorizontal={wp('4%')}
          text={t('chooseTypeText')}
          alignSelf="flex-start"
          marginBottom={hp(1.5)}
        />
        <View style={{}}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#000000"
              style={{alignSelf: 'center'}}
            />
          ) : (
            <FlatList
              contentContainerStyle={{
                paddingBottom: Platform.OS === 'ios' ? hp(85) : hp(94),
                paddingTop: wp(1),
              }}
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({item, index}) => {
                const backgroundColor =
                  item.isSelected === 'true' ? colors.yellow : colors.white;
                return (
                  <ChooseTypeComponent
                    name={item.name}
                    time={item.duration}
                    price={item.price}
                    type={item.currency}
                    backgroundColor={{backgroundColor}}
                    onPress={() => {
                      updateDataArray(index);
                    }}
                  />
                );
              }}
              keyExtractor={item => item._id}
            />
          )}
        </View>
      </View>
      <View style={styles.FAB}>
        <Button
          buttonText={t('next')}
          onPress={() => {
            setSelectedIdsIntoArr();
            checkValidation();
          }}
        />
      </View>
      <CustomeLoader visible={loading} />
    </View>
  );
}
