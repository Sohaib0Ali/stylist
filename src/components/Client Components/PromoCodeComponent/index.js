import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import SemiMediumTitle from '../../Semi Medium Title';
import SimpleText from '../../SimpleText/SimpleText';
import SmallText from '../../SmallText/SmallText';

const PromoCodeComponent = ({offerName, offers, img, discount}) => {
  return (
    <TouchableOpacity style={styles.mainContainer} activeOpacity={0.6}>
      <ImageBackground
        style={styles.container}
        imageStyle={{borderRadius: wp(4)}}
        source={img ? {uri: img} : null}>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.discountBg} activeOpacity={0.7}>
            <SimpleText text={'-' + discount} color={colors.headingBlack} />
          </TouchableOpacity>
        </View>

        <View style={styles.BottomRowContainer}>
          <View>
            <SemiMediumTitle title={offerName} alignSelf="flex-start" />
            <SmallText text={offers} alignSelf="flex-start" />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: wp(1),
    borderRadius: wp(4),
    backgroundColor: colors.secondary,
    left: wp('4%'),
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 1,
    shadowRadius: 1.0,
    elevation: 10,
  },
  container: {
    width: wp('74%'),
    height: wp('76%'),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: wp(4),
  },
  discountBg: {
    backgroundColor: colors.yellow,
    borderRadius: wp(4),
    paddingVertical: wp(0.3),
    paddingHorizontal: wp(2.5),
  },
  BottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: colors.white,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderBottomLeftRadius: wp(4),
    borderBottomRightRadius: wp(4),
  },
});

export default PromoCodeComponent;
