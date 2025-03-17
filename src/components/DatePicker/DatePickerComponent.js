import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './style';
import MediumTitle from '../MediumTitle/MediumTitle';
import SemiMediumTitle from '../Semi Medium Title';
import {useState, useEffect} from 'react';
import colors from '../../assets/colors/colors';
import icons from '../../assets/icons/icons';
import {scale} from 'react-native-size-matters';
import moment from 'moment';

const DatePickerComponent = ({getDateValue, prevdata, storeDate}) => {
  const [dayOffs, setDayOffs] = useState(prevdata?.schedule);
  const [check, setCheck] = useState(false);
  const [selected, setSelected] = useState(storeDate);
  const [week, setWeek] = useState([
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
  ]);
  const [weekOffValues, setWeekOffValues] = useState([]);
  const [months, setMonths] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);
  const [page, setCurrentPage] = useState(0);
  const [changeColor, setChangeColors] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setDayOffs(prevdata?.schedule);
    setSelected(storeDate);
    setDayOffValues();
  }, [prevdata, storeDate]);

  useEffect(() => {
    storeNextFourMonthDates();
  }, []);

  const setDayOffValues = () => {
    let DumyArray = [];
    dayOffs?.dayOff?.map(item => {
      if (item === 'Sun') {
        DumyArray.push(0);
      }
      if (item === 'Mon') {
        DumyArray.push(1);
      }
      if (item === 'Tue') {
        DumyArray.push(2);
      }
      if (item === 'Wed') {
        DumyArray.push(3);
      }
      if (item === 'Thu') {
        DumyArray.push(4);
      }
      if (item === 'Fri') {
        DumyArray.push(5);
      }
      if (item === 'Sat') {
        DumyArray.push(6);
      }
    });
    setWeekOffValues(DumyArray);
  };

  const storeNextFourMonthDates = () => {
    for (let i = 0; i < 360; i++) {
      var day = new Date();
      day.setDate(day.getDate() + i);
      let date = day.getDate();
      let daysName = day.getDay();
      let month = day.getMonth();
      let year = day.getFullYear();
      data.push({
        dateStr: moment(day).format('MM/DD/YYYY'),
        dateNumber: date,
        daysName: daysName,
        monthName: month,
        year: year,
        isSelected: 'false',
      });
    }

    setCheck(true);
  };

  const updateDataArray = position => {
    let newArr = data.map((item, index) => {
      if (index == position) {
        return {
          ...item,
          isSelected: item.isSelected == 'true' ? 'false' : 'true',
        };
      }
      return item;
    });
    setData(newArr);
  };
  const getDateVisibility = dayName => {
    let checkValue = true;
    weekOffValues.map(item => {
      if (item === dayName) {
        checkValue = false;
      }
    });
    return checkValue;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: scale(20),
        }}>
        <TouchableOpacity onPress={() => {}}>
          <MediumTitle
            title={
              data
                ? months[data[page]?.monthName] +
                  ', ' +
                  data[page]?.year +
                  '  >'
                : ''
            }
            fontSize={scale(16)}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              page > 7 ? setCurrentPage(page - 7) : setCurrentPage(0);
            }}
            style={{paddingHorizontal: 10}}>
            <Image source={icons.backArrow} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentPage(page + 7);
            }}
            style={{paddingHorizontal: 10}}>
            <Image
              source={icons.backArrow}
              style={{transform: [{rotate: '180deg'}]}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {data.map((obj, index) => {
          const backgroundColor =
            obj.dateStr === selected ? colors.selected_yellow : colors.white;

          if (index >= page && index < page + 7) {
            return (
              <View key={index}>
                {getDateVisibility(obj.daysName) ? (
                  <Text
                    style={{
                      fontSize: scale(13),
                      fontWeight: '600',
                      alignSelf: 'center',
                      color: '#5E5E5F',
                    }}>
                    {week[obj.daysName]}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: scale(13),
                      fontWeight: '600',
                      alignSelf: 'center',
                      color: 'gray',
                    }}>
                    {week[obj.daysName]}
                  </Text>
                )}
                <TouchableOpacity
                  disabled={getDateVisibility(obj.daysName) ? false : true}
                  style={{
                    width: 45,
                    height: 45,
                    padding: 10,
                    borderRadius: 45,
                    backgroundColor: backgroundColor,
                  }}
                  onPress={() => {
                    setChangeColors(changeColor),
                      updateDataArray(index),
                      setSelected(obj?.dateStr),
                      getDateValue(obj?.dateStr);
                  }}>
                  {getDateVisibility(obj.daysName) ? (
                    <SemiMediumTitle
                      title={obj.dateNumber}
                      color={colors.black}
                      alignSelf="center"
                    />
                  ) : (
                    <SemiMediumTitle
                      title={obj.dateNumber}
                      color={colors.grey}
                      alignSelf="center"
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

export default DatePickerComponent;
