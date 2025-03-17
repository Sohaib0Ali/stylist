import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './style';
import MediumTitle from '../MediumTitle/MediumTitle';
import SmallText from '../SmallText/SmallText';
import SemiMediumTitle from '../Semi Medium Title';
import {useState, useEffect} from 'react';
import colors from '../../assets/colors/colors';
import icons from '../../assets/icons/icons';

const DatePickerComponent = () => {
  const [check, setCheck] = useState(false);
  const [week, setWeek] = useState([
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
  ]);
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
    storeNextFourMonthDates();
  }, []);

  const storeNextFourMonthDates = () => {
    for (let i = 0; i < 360; i++) {
      var day = new Date();
      day.setDate(day.getDate() + i);
      let date = day.getDate();
      let daysName = day.getDay();
      let month = day.getMonth();
      let year = day.getFullYear();

      data.push({
        dateStr: day,
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

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => {}}>
          <MediumTitle
            title={
              data
                ? months[data[page]?.monthName] + ', ' + data[page]?.year + ' >'
                : ''
            }
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
          if (index >= page && index < page + 7) {
            return (
              <View>
                <SmallText text={week[obj.daysName]} />
                <TouchableOpacity
                  style={{
                    width: 45,
                    height: 45,
                    padding: 10,
                    borderRadius: 45,
                    backgroundColor:
                      data[index]?.isSelected == 'true'
                        ? colors.headingBlack
                        : colors.white,
                  }}
                  onPress={() => {
                    setChangeColors(changeColor);
                    updateDataArray(index);
                  }}>
                  <SemiMediumTitle
                    title={obj.dateNumber}
                    color={
                      data[index]?.isSelected == 'true'
                        ? colors.white
                        : colors.black
                    }
                    alignSelf="center"
                  />
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
