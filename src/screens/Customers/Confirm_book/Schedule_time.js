//================================ React Native Imported Files ======================================//
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale } from 'react-native-size-matters';
import SemiTitle from '../../../components/SemiTitle';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import SmallText from '../../../components/SmallText/SmallText';
import DatePickerComponent from '../../../components/DatePicker/DatePickerComponent';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import MediumTitle from '../../../components/MediumTitle/MediumTitle';
import Button from '../../../components/Button/Button';
import Config from '../../../config/config';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { showWarning } from '../../../../Utils/FlashMessage';
import axios from 'axios';
import SmallTitle from '../../../components/SmallTitle/SmallTitle';
import {
  BOOK_SERVICES,
  UPDATE_SERVICES,
} from '../../../../redux/store/actions/ApiData';

const Schedule_time = ({ data, OnPressNext }) => {
  const selected_services = useSelector(state => state?.ApiData?.selectedItem);
  const Booked_services = useSelector(state => state?.ApiData?.BookingService);
  const { t } = useTranslation();
  const [selectedCrew, setselectedCrew] = useState(selected_services[0]);
  const [selectedId, setSelectedId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const bottomSheetModalRef = useRef(null);
  const [dateArray, setdateArray] = useState([]);
  const [selectedfilter, setSelectedFilter] = useState();
  const [selectedTime, setSelectedTime] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    let foundMatchingItem = false;

    Booked_services.forEach(item => {
      if (
        item.Booked_crew.crewid === selectedCrew.crewid &&
        item.Booked_crew.Main_ServiceID === selectedCrew.Main_ServiceID &&
        item.Booked_crew.Service_id === selectedCrew.Service_id
      ) {
        setSelectedDate(item.Booked_date);
        setSelectedId(item.Booked_timeId);
        foundMatchingItem = true;
      }
    });

    if (!foundMatchingItem) {
      setSelectedDate(null);
      setSelectedId(null);
    }
  }, [selectedCrew]);
  let count = 0;

  useEffect(() => {
    bottomSheetModalRef.current?.present();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      setSelectedId(null);
    } else {
      toTimestamp();
    }
  }, [isFocused, selectedDate, selectedfilter]);

  const toTimestamp = () => {
    let DumyArray = [];
    if (selectedfilter?.length > 0) {
      const fromDate = moment(
        `${selectedDate} ${selectedfilter[0]?.schedule?.from}`,
        'MM/DD/YYYY hh:mm A',
      )
        .toDate()
        .getTime();
      const toDate = moment(
        `${selectedDate} ${selectedfilter[0]?.schedule?.to}`,
        'MM/DD/YYYY hh:mm A',
      )
        .toDate()
        .getTime();
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
    }

    setdateArray(DumyArray);
  };

  const getDateValue = date => {
    setSelectedDate(date);
  };

  const Item = ({ item, onPress, backgroundColor }) => (
    <TouchableOpacity
      style={[styles.itemBg1, backgroundColor]}
      onPress={() => onPress()}>
      <SmallTitle title={item.date} alignSelf={'center'} />
    </TouchableOpacity>
  );

  const Dispatch_Booking = item => {
    setSelectedId(item.id), setSelectedTime(item.date);
    const Data = {
      Booked_crew: selectedCrew,
      Booked_date: selectedDate,
      Booked_time: item?.date,
      Booked_timeId: item?.id,
    };
    if (
      Booked_services.some(
        item =>
          item?.Booked_crew?.crewid === Data?.Booked_crew?.crewid &&
          item?.Booked_crew?.Service_id === Data?.Booked_crew?.Service_id &&
          item?.Booked_crew?.Main_ServiceID ===
          Data?.Booked_crew?.Main_ServiceID,
      )
    ) {
      dispatch({ type: UPDATE_SERVICES, payload: Data });
    } else {
      dispatch({ type: BOOK_SERVICES, payload: Data });
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId ? colors.selected_yellow : colors.white;
    return (
      <Item
        item={item}
        onPress={() => {
          Dispatch_Booking(item);
        }}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  useEffect(() => {
    getMasterData(selectedCrew?.Main_ServiceID, selectedCrew?.salon_Id);
  }, []);

  const [Data, setData] = useState([]);

  const getMasterData = async (serviceID, salonId) => {
    var config = {
      method: 'get',
      url: `${Config.baseUrl}getStylistByServiceId/${serviceID}?salonId=${salonId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Config.token}`,
      },
    };

    axios(config)
      .then(async response => {
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

  useEffect(() => {
    const filteredData = Data?.filter(
      item => item?._id === selectedCrew?.crewid,
    );
    setSelectedFilter(filteredData);
  }, [Data, selectedCrew]);

  const schedule_time = item => {
    setselectedCrew(item);
    getMasterData(item?.Main_ServiceID, item?.salon_Id);
  };
  return (
    <View style={{ flex: 1, paddingBottom: scale(20) }}>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.body}>
          <SemiTitle
            paddingHorizontal={wp('4')}
            marginLeft={scale(10)}
            title={t('Schedule time')}
            marginTop={wp(1)}
            weight={'600'}
            color={colors.headingBlack}
            fontSize={24}
            fontFamily={fonts.Exo2Bold}
          />
          <ScrollView
            horizontal
            style={{ flexDirection: 'row' }}
            showsHorizontalScrollIndicator={false}>
            {selected_services?.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    opacity:
                      item?.Service_id === selectedCrew?.Service_id
                        ? null
                        : 0.5,
                  }}
                  onPress={() => {
                    schedule_time(item);
                  }}>
                  <View style={styles.selectedcrew}>
                    <Image
                      style={styles.crewimage}
                      source={{ uri: item?.crewinfo?.profilePic }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        alignItems: 'flex-start',
                        marginLeft: scale(8),
                      }}>
                      <SmallText
                        text={item?.crewinfo?.position}
                        alignSelf={'flex-start'}
                        fontSize={scale(14)}
                        lineHeight={scale(18)}
                        fontWeight={'400'}
                        fontfamily={fonts.Exo2Bold}
                        color={colors.headingBlack}
                      />
                      <SmallText
                        text={item?.crewinfo?.fullName}
                        alignSelf={'flex-start'}
                        fontSize={scale(18)}
                        lineHeight={scale(22)}
                        fontWeight={'600'}
                        fontfamily={fonts.Exo2Bold}
                        color={colors.headingBlack}
                      />
                    </View>
                  </View>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: scale(14),
                      lineHeight: scale(22),
                      fontWeight: '600',
                      fontfamily: fonts.Exo2Bold,
                      backgroundColor: colors.borderColor,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      overflow: 'hidden',
                      marginTop: scale(15),
                      marginLeft: scale(20),
                    }}>
                    {item?.Service_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View
            style={{
              paddingHorizontal: scale(10),
              paddingVertical: scale(10),
            }}>
            {selectedfilter?.length > 0 && (
              <DatePickerComponent
                getDateValue={getDateValue}
                prevdata={selectedfilter[0]}
                storeDate={selectedDate}
              />
            )}
          </View>
          <View style={{ paddingVertical: scale(10) }}>
            <MediumTitle
              title={'Availiable time'}
              marginBottom={hp(1)}
              marginTop={hp(1)}
              color={colors.Secondary_txt}
              fontSize={scale(16)}
              Weight={'600'}
              fontFamily={fonts.Exo2Bold}
              marginLeft={scale(20)}
            />
            <View style={{ flexWrap: 'wrap', width: '100%' }}>
              {dateArray?.length > 0 ? (
                <FlatList
                  contentContainerStyle={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={dateArray}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                  style={{ marginTop: verticalScale(15) }}
                />
              ) : (
                <View>
                  <Text>{t('noFOundData')}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <Button
        buttonText={t('next')}
        marginTop={hp(3)}
        alignSelf={'center'}
        marginBottom={scale(20)}
        onPress={() => {
          OnPressNext('Payment_screen');
        }}
      />
    </View>
  );
};

export default Schedule_time;
