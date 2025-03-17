//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import icons from '../../../../assets/icons/icons';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import Title from '../../../../components/Title/Title';
import BookedComponent from '../../../../components/Client Components/Booking/BookedComponent';
import Config from '../../../../config/config';
import {showWarning} from '../../../../../Utils/FlashMessage';
import axios from 'axios';
import moment from 'moment';
import CustomeLoader from '../../../../components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {scale} from 'react-native-size-matters';
import images from '../../../../assets/images/images';

const BookedScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBookedData();
  }, []);

  const getBookedData = async () => {
    setLoading(true);
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    axios
      .get(`${Config.baseUrl}findUserBookingsThisMonth`, {headers})

      .then(response => {
        setLoading(false);
        if (response.status === Config.statusCode) {
          setData(response?.data?.data);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(e?.response?.data?.msg);
        setLoading(false);
      });
  };

  const deleteBokingItem = id => {
    setLoading(true);

    var config = {
      method: 'delete',
      url: `${Config.baseUrl}deleteBooking/${id}`,
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.status === Config.statusCode) {
          getBookedData();
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(function (error) {});
  };

  const getDateAndTime = dateTime => {
    return (
      moment(dateTime).format('MMM DD') +
      ' at ' +
      moment(dateTime).format('hh:mm A')
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.6}
        style={{marginHorizontal: scale(20), marginVertical: scale(10)}}>
        <Image
          style={styles.backIcon}
          source={icons.backArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.rowContainer}>
          <Title title={t('bookings')} alignSelf="flex-start" />
          <TouchableOpacity
            style={styles.filterBg}
            onPress={() => navigation.navigate('BOOKED_SECTION_SCREEN')}>
            <SmallTitle title={t('thisMonth')} alignSelf="flex-end" />
            <Image
              style={styles.downArrow}
              source={images.backbtn}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#000000"
            style={{alignSelf: 'center'}}
          />
        ) : data.length > 0 ? (
          <FlatList
            contentContainerStyle={{
              paddingBottom: Platform.OS === 'ios' ? hp(15) : hp(18),
            }}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => (
              <BookedComponent
                onPress={() =>
                  navigation.navigate('BOOKING_DETAIL_SCREEN', {itemData: item})
                }
                icon={item?.service?.icon}
                name={item?.salon?.name}
                cat={item?.serviceType[0]?.name}
                price={item.amount}
                deleteBokingItem={deleteBokingItem}
                date={getDateAndTime(item?.bookingDateTime)}
                type={item?.currency}
                id={item?._id}
              />
            )}
            keyExtractor={item => item?._id}
            extraData={selected}
          />
        ) : (
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'black'}}>{t('NoBookingFound')}</Text>
          </View>
        )}
        <CustomeLoader visible={loading} />
      </View>
    </View>
  );
};
export default BookedScreen;
