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
import Heart from '../../../../assets/icons/heart.svg';
import FilledHeart from '../../../../assets/icons/filledHeart.svg';
import SmallText from '../../../SmallText/SmallText';
import colors from '../../../../assets/colors/colors';
import MediumTitle from '../../../MediumTitle/MediumTitle';

const OfferComponent = ({
  id,
  offerName,
  offers,
  img,
  onPress,
  fav,
  favoriteData,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <ImageBackground
        style={styles.container}
        imageStyle={{borderRadius: wp(4)}}
        source={img}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.iconBg}
            activeOpacity={0.7}
            onPress={() => favoriteData(id, !fav)}>
            {fav ? (
              <FilledHeart width={wp(5)} height={hp(2.6)} />
            ) : (
              <Heart width={wp(5)} height={hp(2.6)} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.BottomRowContainer}>
          <View>
            <MediumTitle title={offerName} alignSelf="flex-start" />
            <SmallText text={offers} alignSelf="flex-start" />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  iconBg: {
    backgroundColor: colors.white,
    borderRadius: wp(18),
    padding: wp(2),
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
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 1,
    shadowRadius: 1.0,
    elevation: 10,
  },
});

export default OfferComponent;
