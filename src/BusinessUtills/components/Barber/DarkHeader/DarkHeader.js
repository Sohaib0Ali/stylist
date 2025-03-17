import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import icons from '../../../assets/icons/icons';
import Search from '../../../assets/icons/Search.svg';
import SimpleText from '../../SimpleText/SimpleText';
import {useNavigation} from '@react-navigation/native';

const DarkHeader = () => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.headingBlack,
      width: wp('100%'),
      padding: wp(5),
      borderBottomRightRadius: wp(4),
      borderBottomLeftRadius: wp(4),
    },
    searchBg: {
      backgroundColor: colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '80%',
      paddingHorizontal: wp(4),
      borderRadius: wp(4),
      height: wp(13.5),
    },
    iconBg: {
      backgroundColor: colors.btnColor,
      paddingHorizontal: wp(4.3),
      paddingVertical: wp(3.8),
      borderRadius: wp(15),
    },
    filterIcon: {
      width: wp(5),
      height: hp(3),
      tintColor: colors.white,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchBg}
        activeOpaci={0.7}
        onPress={() => navigation.navigate('SEARCH_SCREEN')}>
        <Search width={wp(5)} height={hp(5)} />
        <SimpleText text="Search" marginLeft={wp(3)} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconBg}
        activeOpaci={0.7}
        onPress={() => {
          navigation.navigate('FILTER_SCREEN');
        }}>
        <Image
          source={icons.Filter}
          style={styles.filterIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default DarkHeader;
