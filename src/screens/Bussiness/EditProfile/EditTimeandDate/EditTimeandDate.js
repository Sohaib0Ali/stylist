import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackIcon from '../../../../BusinessUtills/assets/icons/backIcon.svg';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import SemiTitle from '../../../../BusinessUtills/components/SemiTitle';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Divider from '../../../../BusinessUtills/components/Divider/divider';
import {useNavigation} from '@react-navigation/native';
import SelectMultiple from 'react-native-select-multiple';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const Days = [
  {label: 'Sunday', value: 'Sun'},
  {label: 'Monday', value: 'Mon'},
  {label: 'Tuesday', value: 'Tue'},
  {label: 'Wednesday', value: 'Wed'},
  {label: 'Thursday', value: 'Thu'},
  {label: 'Friday', value: 'Fri'},
  {label: 'Saturday', value: 'Sat'},
];

const EditTimeandDate = ({route}) => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const data = route?.params?.data;
  const stylistId = route?.params?.stylistId;
  let selectedIndex = route?.params?.selectedIndex;
  const navigation = useNavigation();
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [openFrom, setOpenFrom] = useState(false);
  const [opento, setOpenTo] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [unSelectDays, setUnSelectDays] = useState(Days);
  const [compeleteStylet, setcompeleteStylet] = useState(
    StyList[selectedIndex],
  );
  const {t} = useTranslation();

  const onSelectionsChange = selectedDays => {
    setSelectedDays(selectedDays);
    const unselectedValues = Days.filter(
      day => !selectedDays.some(selected => selected.value === day.value),
    );
    setUnSelectDays(unselectedValues);
  };
  useEffect(() => {
    const getTimeFrom = moment(data?.schedule?.from, 'hh:mm A');
    const getTimeTO = moment(data?.schedule?.to, 'hh:mm A');
    const currentDate = new Date();
    const setTimeFrom = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      getTimeFrom.hours(),
      getTimeFrom.minutes(),
    );
    const setTimeTo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      getTimeTO.hours(),
      getTimeTO.minutes(),
    );

    if (data) {
      setFrom(setTimeFrom);
      setTo(setTimeTo);
    } else {
      setFrom(new Date()), setTo(new Date());
    }
    if (data?.schedule?.day.length > 0) {
      const sDays = Days.filter(day => data?.schedule?.day.includes(day.value));
      setSelectedDays(sDays);
      const unselectedValues = Days.filter(
        day => !sDays.some(selected => selected.value === day.value),
      );
      setUnSelectDays(unselectedValues);
    }
  }, [data?.schedule?.day]);

  const renderLabel = (label, style) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginLeft: 10}}>
          <Text style={style}>{label}</Text>
        </View>
      </View>
    );
  };

  const getSelectedArray = () => {
    if (selectedDays.length > 0) {
      let selectedArr = [];
      selectedArr = selectedDays.map(item => {
        return item.value;
      });
      return selectedArr;
    } else {
      return [];
    }
  };

  const getUnselectedArray = () => {
    if (unSelectDays.length > 0) {
      let unSelectedArr = [];
      unSelectedArr = unSelectDays.map(item => {
        return item.value;
      });
      return unSelectedArr;
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (stylistId) {
      StyList[selectedIndex] = compeleteStylet;
    }
  }, [compeleteStylet]);

  const apiCall = () => {
    if (stylistId) {
      let schedule = {
        day: getSelectedArray(),
        dayOff: getUnselectedArray(),
        to: moment(to).format('hh:mm A'),
        from: moment(from).format('hh:mm A'),
      };
      var data = JSON.stringify({
        stylistId: stylistId,
        schedule: {
          day: getSelectedArray(),
          dayOff: getUnselectedArray(),
          to: moment(to).format('hh:mm A'),
          from: moment(from).format('hh:mm A'),
        },
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BConfig.baseUrl}business/addstylistSchedule`,
        headers: {
          Authorization: `Bearer ${BConfig.token}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };
      setcompeleteStylet(prev => {
        return {
          ...prev,
          schedule: schedule,
        };
      });

      axios(config)
        .then(function (response) {
          let res = response.data;
          if (res.success) {
            navigation.goBack();
          }
        })
        .catch(function (error) {
        });
    } else {
      var data = JSON.stringify({
        schedule: {
          day: getSelectedArray(),
          dayOff: getUnselectedArray(),
          to: moment(to).format('hh:mm A'),
          from: moment(from).format('hh:mm A'),
        },
      });

      var config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `${BConfig.baseUrl}business/updateSalonSchedule/${MainBranch?.salon?._id}`,
        headers: {
          Authorization: `Bearer ${BConfig.token}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          let res = response.data;
          if (res.success) {
            MainBranch?.salon?.schedule = res?.data?.schedule
            navigation.goBack();
          }
        })
        .catch(function (error) {
        });
    }
  };

  return (
    <View style={styles.centeredView}>
      <View
        style={{
          height: hp(9),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.15, left: wp(2)}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon marginHorizontal={wp(4)} marginTop={wp(8)} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.05}}></View>
        <View
          style={{
            flex: 0.6,
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <SemiTitle title={t('title')} fontSize={wp(4.3)} />
        </View>
        <TouchableOpacity
          style={{flex: 0.2, flexDirection: 'row', justifyContent: 'flex-end'}}
          onPress={() => apiCall()}>
          <SimpleText
            fontSize={wp(4.3)}
            text={t('save')}
            paddingHorizontal={wp(4)}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          height: hp(54),
          borderRadius: wp(2.5),
          marginHorizontal: wp(4),
          backgroundColor: '#FFFFFF',
        }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            borderRadius: wp(2.5),
          }}>
          <TouchableOpacity
            onPress={() => setOpenFrom(true)}
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              height: hp(8),
            }}>
            <SimpleText
              fontSize={wp(4.1)}
              text="Start"
              paddingHorizontal={wp(4)}
            />
            <View
              style={{
                borderRadius: wp(2.5),

                marginHorizontal: wp(4),
                backgroundColor: '#F6F5F3',
              }}>
              <SimpleText
                fontSize={wp(4.1)}
                text={moment(from).format('hh:mm A')}
                paddingHorizontal={wp(4)}
              />
            </View>
          </TouchableOpacity>
          <>
            <DatePicker
              modal
              open={openFrom}
              mode="time"
              date={from}
              title={t('startFrom')}
              onConfirm={StartTime => {
                setOpenFrom(false);
                setFrom(StartTime);
              }}
              onCancel={() => {
                setOpenFrom(false);
              }}
            />
          </>
          <Divider />
          <TouchableOpacity
            onPress={() => setOpenTo(true)}
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              height: hp(8),
            }}>
            <SimpleText
              fontSize={wp(4.1)}
              text="End"
              paddingHorizontal={wp(4)}
            />
            <View
              style={{
                borderRadius: wp(2.5),
                marginHorizontal: wp(4),
                backgroundColor: '#F6F5F3',
              }}>
              <SimpleText
                fontSize={wp(4.1)}
                text={moment(to).format('hh:mm A')}
                paddingHorizontal={wp(4)}
              />
            </View>
          </TouchableOpacity>
          <>
            <DatePicker
              modal
              open={opento}
              mode="time"
              date={to}
              title={t('endTo')}
              onConfirm={EndTime => {
                setOpenTo(false);
                setTo(EndTime);
              }}
              onCancel={() => {
                setOpenTo(false);
              }}
            />
          </>
          <Divider />
          <SimpleText
            text={'On Days'}
            alignSelf={'baseline'}
            marginTop={hp(2.1)}
            paddingHorizontal={wp(3.1)}
          />
          <SelectMultiple
            items={Days}
            renderLabel={renderLabel}
            selectedItems={selectedDays}
            onSelectionsChange={onSelectionsChange}
            labelStyle={{color: colors.black}}
            displayKey="label"
            uniqueKey="value"
          />
        </View>
      </View>
    </View>
  );
};

export default EditTimeandDate;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
});
