import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Share,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import Clock from '../../../assets/icons/clock.svg';
import ShareIcon from '../../../assets/icons/share.svg';
import Heart from '../../../assets/icons/heart.svg';
import FilledHeart from '../../../assets/icons/filledHeart.svg';
import Button from '../../Button/Button';
import SmallText from '../../SmallText/SmallText';
import SmallTitle from '../../SmallTitle/SmallTitle';
import SemiMediumTitle from '../../Semi Medium Title';

const BarberComponent = ({
  id,
  time,
  name,
  address,
  img,
  onPress,
  fav,
  favoriteData,
}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Windsor',
        message: 'Windsor.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <ImageBackground
        style={styles.container}
        imageStyle={{borderRadius: wp(4)}}
        source={img}>
        <View style={styles.rowContainer}>
          <View style={styles.leftBg}>
            <Clock width={wp(5)} height={hp(4)} style={{marginRight: wp(2)}} />
            <Text style={styles.smallText}>{time}</Text>
          </View>
          <View style={styles.rightBg}>
            <TouchableOpacity
              onPress={onShare}
              style={{...styles.iconBg, marginRight: wp(2)}}
              activeOpacity={0.6}>
              <ShareIcon width={wp(4)} height={wp(4.5)} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBg}
              activeOpacity={0.6}
              onPress={() => favoriteData(id, !fav)}>
              {fav ? (
                <FilledHeart width={wp(4)} height={wp(4.5)} />
              ) : (
                <Heart width={wp(4)} height={wp(4.5)} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.BottomRowContainer}>
          <View style={styles.textBg}>
            <View style={styles.smallTextBg}>
              <SmallTitle title="TG" />
            </View>
            <View>
              <SemiMediumTitle title={name} />
              <SmallText text={address} />
            </View>
          </View>
          <Button buttonText="Book" width="30%" height={hp(6)} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('75%'),
    height: hp(50),
    padding: wp(4),
    marginRight: wp(3),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: wp(8),
    paddingVertical: wp(0.7),
    paddingHorizontal: wp(3),
  },
  smallText: {
    color: colors.green,
    fontSize: wp(3.8),
    fontFamily: fonts.semiBold,
  },
  rightBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBg: {
    backgroundColor: colors.white,
    borderRadius: wp(18),
    paddingVertical: wp(1.7),
    paddingHorizontal: wp(2),
  },
  BottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp(2),
    left: wp(4),
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: wp(4),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
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
    paddingVertical: wp(1.6),
    paddingHorizontal: wp(2),
  },
});

export default BarberComponent;
