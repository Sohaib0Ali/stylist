import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import Map from '../../../assets/icons/map.svg';
import Heart from '../../../assets/icons/heart.svg';
import FilledHeart from '../../../assets/icons/filledHeart.svg';
import SmallText from '../../SmallText/SmallText';
import SmallTitle from '../../SmallTitle/SmallTitle';
import icons from '../../../assets/icons/icons';
import SemiMediumTitle from '../../Semi Medium Title';

const TrendingComponent = ({
  time,
  company,
  name,
  address,
  img,
  star,
  review,
  onPress,
  id,
  fav,
  favoriteData1,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <ImageBackground
        style={styles.container}
        imageStyle={{borderRadius: wp(4)}}
        source={img}>
        <View style={styles.rowContainer}>
          <View style={styles.leftBg}>
            <Map width={wp(5)} height={hp(2.6)} style={{marginRight: wp(2)}} />
            <Text style={styles.smallText}>{time}</Text>
          </View>
          <TouchableOpacity
            style={styles.iconBg}
            activeOpacity={0.7}
            onPress={() => favoriteData1(id, !fav)}>
            {fav ? (
              <FilledHeart width={wp(4)} height={wp(4)} />
            ) : (
              <Heart width={wp(4)} height={wp(4)} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.BottomRowContainer}>
          <View style={styles.textBg}>
            <View style={styles.smallTextBg}>
              <SmallTitle title={company} />
            </View>
            <View>
              <SemiMediumTitle title={name} />
              <SmallText text={address} />
            </View>
          </View>
          <View style={styles.reviewStarBg}>
            <Image
              source={icons.star}
              style={styles.star}
              resizeMode="contain"
            />
            <Text style={styles.tgText}>{star}</Text>
            <Text style={styles.review}>({review} reviews)</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('92%'),
    height: hp(42),
    marginBottom: hp(2.5),
    left: wp('4'),
  },
  tgText: {
    color: colors.black,
    fontSize: wp(4.5),
    fontFamily: fonts.regular,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
  },
  leftBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: wp(8),
    paddingVertical: wp(1),
    paddingHorizontal: wp(3),
  },
  smallText: {
    color: colors.red,
    fontSize: wp(3.6),
    fontFamily: fonts.semiBold,
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
  textBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(34),
  },
  smallTextBg: {
    backgroundColor: colors.borderColor,
    borderRadius: wp(18),
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: wp(0.5),
  },
  reviewStarBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('35%'),
    alignContent: 'center',
  },
  review: {
    fontSize: wp(3.5),
    color: colors.subHeading,
    fontFamily: fonts.regular,
  },
  star: {
    width: wp(5),
    height: hp(3),
    alignSelf: 'baseline',
  },
});

export default TrendingComponent;
