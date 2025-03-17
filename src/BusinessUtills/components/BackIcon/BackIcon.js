import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from './style';
import images from '../../assets/images/images';
import {verticalScale} from 'react-native-size-matters';

const Header = ({currentPage, text, paddingHorizontal, pressSave, icon}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        {paddingHorizontal: paddingHorizontal && paddingHorizontal},
      ]}>
      <View style={styles.icon}>
        <TouchableOpacity
          style={{
            paddingHorizontal: wp(4.1),
            width: wp(4),
          }}
          onPress={() => [navigation.goBack()]}>
          <Image
            source={images.BackIcon}
            style={{
              tintColor: 'black',
              height: verticalScale(15),
              width: verticalScale(15),
            }}
          />
        </TouchableOpacity>
      </View>
      {currentPage > 1 ? (
        <View style={styles.skip}>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'DASHBOARD_SCREEN'}],
              });
            }}>
            <Text style={styles.skipText}>{t('skip')}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {icon ? (
        <View style={styles.save}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '100%',
              paddingHorizontal: hp(2),
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('STYLIST_ADD_APPOINTMENT')}>
            <Image source={icon} />
          </TouchableOpacity>
        </View>
      ) : text ? (
        <View style={styles.save}>
          <TouchableOpacity
            onPress={() => {
              pressSave();
            }}>
            <Text style={styles.saveText}>{text}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Header;
