//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {
  View,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../../../../assets/icons/icons';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import Title from '../../../../components/Title/Title';
import BookedComponent from '../../../../components/Client Components/Booking/BookedComponent';
import SmallText from '../../../../components/SmallText/SmallText';
import axios from 'axios';
import Config from '../../../../config/config';
import {showWarning} from '../../../../../Utils/FlashMessage';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import Backnav from '../../../../components/BackNav/backnav';
import {scale} from 'react-native-size-matters';

const BookedSectionScreen = ({navigation}) => {
  let userData = Config.userDetail;
  const {t} = useTranslation();
  const [selected, setSelected] = useState(null);
  const [Data, setData] = useState([]);
  const [secTitle, setSecTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBookedSection();
  }, []);

  const getBookedSection = async () => {
    setLoading(true);
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    axios
      .get(
        `${Config.baseUrl}findUserBookingsMonthWise?userId=${userData?._id}`,
        {headers},
      )
      .then(response => {
        setLoading(false);
        if (response?.status === Config?.statusCode) {
          setData(response?.data?.data);
          setSecTitle(response?.data?.data[0]?.dateTime);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
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
          getBookedSection();
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(function (error) {
        alert(error?.response?.data);
      });
  };

  const getDateAndTime = dateTime => {
    return (
      moment(dateTime).format('MMM DD') +
      ' at ' +
      moment(dateTime).format('hh:mm A')
    );
  };

  const getDateAndTimeTitle = dateTime => {
    return moment(dateTime).format('MMM YYYY');
  };

  return (
    <View style={styles.container}>
      <Backnav marginLeft={scale(15)} marginVertical={scale(8)} />
      <View style={styles.body}>
        <View style={styles.rowContainer}>
          <Title title={t('bookings')} alignSelf="flex-start" />
          <TouchableOpacity
            style={styles.filterBg}
            onPress={() => navigation.navigate('BOOKED_SCREEN')}>
            <SmallTitle title={t('allTime')} alignSelf="flex-end" />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#000000"
            style={{alignSelf: 'center'}}
          />
        ) : Data.length > 0 ? (
          <SectionList
            contentContainerStyle={{
              paddingBottom: Platform.OS === 'ios' ? hp(15) : hp(25),
            }}
            showsVerticalScrollIndicator={false}
            title={Data.dateTime}
            sections={Data}
            renderItem={({item}) => (
              <BookedComponent
                icon={item?.service?.icon}
                name={item?.salon?.name}
                cat={item?.serviceType[0]?.name}
                price={item?.amount}
                date={getDateAndTime(item?.bookingDateTime)}
                deleteBokingItem={() => deleteBokingItem(item?._id)}
                id={item?._id}
                type={item?.currency}
                onPress={() =>
                  navigation.navigate('BOOKING_DETAIL_SCREEN', {itemData: item})
                }
              />
            )}
            renderSectionHeader={({section: {dateTime}}) => (
              <SmallText
                paddingHorizontal={wp('4%')}
                text={getDateAndTimeTitle(dateTime)}
                alignSelf="flex-start"
                marginBottom={hp(2)}
              />
            )}
            keyExtractor={(item, index) => item + index}
            extraData={selected}
          />
        ) : (
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'black'}}>{t('NoBookingFound')}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default BookedSectionScreen;
