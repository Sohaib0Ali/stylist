import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from './style';
import colors from '../../assets/colors/colors';
import {useTranslation} from 'react-i18next';

const data = [
  {
    id: '1',
    Position: 'Top Master',
  },
  {
    id: '2',
    Position: 'Manager',
  },
  {
    id: '3',
    Position: 'Master',
  },
  {
    id: '4',
    Position: 'Traniee',
  },
];
const TypeData = [
  {
    id: '1',
    duration: 'This week',
  },
  {
    id: '2',
    duration: 'This month',
  },
];
const ListItem = ({Position, onPress, textColor}) => (
  <TouchableOpacity style={styles.optionBg} onPress={onPress}>
    <View style={{...styles.divider, marginTop: 0}} />
    <Text style={[styles.option, textColor]}>{Position}</Text>
  </TouchableOpacity>
);

const PositionPickerComponent = ({
  onPressRight,
  onPressLeft,
  getCountValue,
  type,
}) => {
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
        {!type && (
          <Text style={{...styles.btnText, color: colors.subHeading}}>
            {t('position')}
          </Text>
        )}

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

          return (
            <ListItem
              item={item}
              Position={type ? item.duration : item.Position}
              onPress={() => setSelectedValue(item.id)}
              textColor={{color}}
            />
          );
        }}
        keyExtractor={item => item.id}
        extraData={selectedValue}
      />
    </View>
  );
};
export default PositionPickerComponent;
