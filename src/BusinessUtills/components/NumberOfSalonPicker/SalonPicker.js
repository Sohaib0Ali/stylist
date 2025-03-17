import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from './style';
import colors from '../../assets/colors/colors';
import {useTranslation} from 'react-i18next';

const data = [
  {
    id: 1,
    qty: '1',
  },
  {
    id: 2,
    qty: '2',
  },
  {
    id: 3,
    qty: '3',
  },
  {
    id: 4,
    qty: '4',
  },
  {
    id: 5,
    qty: '5',
  },
  {
    id: 6,
    qty: '6',
  },
  {
    id: 7,
    qty: '7',
  },
  {
    id: 8,
    qty: '8',
  },
  {
    id: 9,
    qty: '9',
  },
];
const ListItem = ({qty, onPress, textColor, setBackgroundColor}) => (
  <TouchableOpacity
    style={[
      styles.optionBg,
      {backgroundColor: setBackgroundColor ? setBackgroundColor : '#FFFF'},
    ]}
    onPress={onPress}>
    <View style={{...styles.divider, marginTop: 0}} />
    <Text style={[styles.option, textColor]}>{qty}</Text>
  </TouchableOpacity>
);

const SalonPicker = ({onPressRight, onPressLeft, getCountValue, type}) => {
  const {t} = useTranslation();
  const [selectedValue, setSelectedValue] = useState('1');
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.btnBg}
          activeOpacity={0.6}
          onPress={onPressLeft}>
          <Text style={styles.btnText}>{t('cancel')}</Text>
        </TouchableOpacity>
        <Text style={{...styles.btnText, color: colors.subHeading}}>
          {t('numbSalons')}
        </Text>
        <TouchableOpacity
          style={styles.btnBg}
          activeOpacity={0.6}
          onPress={() => {
            onPressRight();
            getCountValue(selectedValue);
          }}>
          <Text style={styles.btnText}>{t('done')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      <FlatList
        contentContainerStyle={{
          backgroundColor: colors.white,
          marginTop: hp(6),
        }}
        data={type ? TypeData : data}
        renderItem={({item, index}) => {
          const color =
            item.id === selectedValue ? colors.black : colors.subHeading;
          const backgroundColor =
            item.id === selectedValue ? '#eee' : colors.white;
          return (
            <ListItem
              item={item}
              qty={item.qty}
              onPress={() => setSelectedValue(item.id)}
              textColor={{color}}
              setBackgroundColor={{backgroundColor}}
            />
          );
        }}
        keyExtractor={item => item.id}
        extraData={selectedValue}
      />
    </View>
  );
};
export default SalonPicker;
