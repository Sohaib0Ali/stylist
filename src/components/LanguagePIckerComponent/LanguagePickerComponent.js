import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from './style';
import colors from '../../assets/colors/colors';
import {useTranslation} from 'react-i18next';

const ListItem = ({Gender, onPress, textColor}) => (
  <TouchableOpacity style={styles.optionBg} onPress={onPress}>
    <View style={{...styles.divider, marginTop: 0}} />
    <Text style={[styles.option, textColor]}>{Gender}</Text>
  </TouchableOpacity>
);

const LanguagePickerComponent = ({
  onPressRight,
  onPressLeft,
  getCountValue,
  type,
}) => {
  const {t} = useTranslation();
  const [selectedValue, setSelectedValue] = useState('1');
  const data = [
    {
      id: '1',
      Gender: t('english'),
    },
    {
      id: '2',
      Gender: t('arabic'),
    },
  ];

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
          {t('languages')}
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

          return (
            <ListItem
              item={item}
              Gender={item.Gender}
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
export default LanguagePickerComponent;
