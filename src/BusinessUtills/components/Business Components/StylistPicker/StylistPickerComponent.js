import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import styles from './style';
import colors from '../../../assets/colors/colors';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {verticalScale} from 'react-native-size-matters';

const ListItem = ({name, onPress, textColor}) => (
  <TouchableOpacity style={styles.optionBg} onPress={onPress}>
    <View style={{...styles.divider, marginTop: 0}} />
    <Text style={[styles.option, textColor]}>{name}</Text>
  </TouchableOpacity>
);

const StylistPickerComponent = ({
  onPressRight,
  onPressLeft,
  getCountValue,
  type,
}) => {
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);

  const {t} = useTranslation();
  let data = StyList;
  const [index, setIdnex] = useState(0);

  const [selectedValue, setSelectedValue] = useState(StyList[0]?._id);

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
            {t('stylist')}
          </Text>
        )}

        <TouchableOpacity
          style={styles.btnBg}
          activeOpacity={0.6}
          onPress={() => {
            onPressRight();
            getCountValue(index);
          }}>
          <Text style={styles.btnText}>{t('done')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={{marginBottom: verticalScale(100)}}>
        <FlatList
          contentContainerStyle={{
            backgroundColor: colors.white,
          }}
          data={data}
          renderItem={({item, index}) => {
            const color =
              item?._id === selectedValue ? colors.black : colors.subHeading;

            return (
              <ListItem
                item={item}
                name={item?.fullName}
                onPress={() => {
                  setSelectedValue(item?._id), setIdnex(index);
                }}
                textColor={{color}}
              />
            );
          }}
          keyExtractor={item => item?._id}
          extraData={selectedValue}
        />
      </View>
    </View>
  );
};
export default StylistPickerComponent;
