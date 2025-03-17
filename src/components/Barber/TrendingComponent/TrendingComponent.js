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
import SmallText from '../../SmallText/SmallText';
import icons from '../../../assets/icons/icons';
import SemiMediumTitle from '../../Semi Medium Title';
import Config from '../../../config/config';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {showSuccess} from '../../../../Utils/FlashMessage';
import {verticalScale} from 'react-native-size-matters';

const TrendingComponent = ({
  time,
  name,
  address,
  img,
  star,
  review,
  onPress,
  id,
  fav,
  favoriteData1,
  keyVAlue,
  logo,
}) => {
  const addFav = async () => {
    if (fav === true) {
      var config = {
        method: 'patch',
        url: `${Config.baseUrl}removeSalontoFavrite/${id}`,
        headers: {
          Authorization: `Bearer ${Config.token}`,
        },
      };

      axios(config)
        .then(function (response) {
          favoriteData1(id, !fav);
          let res = response.data;
          if (res.success) {
            showSuccess(res.msg);
          }
        })
        .catch(function (error) {});
    } else {
      var config = {
        method: 'patch',
        url: `${Config.baseUrl}addSalontoFavrite/${id}`,
        headers: {
          Authorization: `Bearer ${Config.token}`,
        },
      };

      axios(config)
        .then(function (response) {
          favoriteData1(id, !fav);
          let res = response.data;
          if (res.success) {
            showSuccess(res.msg);
          }
        })
        .catch(function (error) {});
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} key={keyVAlue}>
      <ImageBackground
        style={styles.container}
        imageStyle={{borderRadius: wp(4)}}
        source={{uri: img}}>
        <View style={styles.rowContainer}>
          <View style={styles.leftBg}>
            <FontAwesome
              name="map-marker"
              size={verticalScale(25)}
              color={colors.red}
              style={{marginRight: wp(2)}}
            />
            <Text style={styles.smallText}>{time}</Text>
          </View>
          <TouchableOpacity
            style={styles.iconBg}
            activeOpacity={0.7}
            onPress={() => addFav()}>
            {fav ? (
              <AntDesign
                name="heart"
                size={verticalScale(20)}
                color={colors.red}
              />
            ) : (
              <AntDesign
                name="hearto"
                size={verticalScale(20)}
                color={colors.red}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.BottomRowContainer}>
          <View style={styles.textBg}>
            <View style={styles.smallTextBg}>
              {/* <SmallTitle title={company}/> */}
              <Image
                source={{uri: logo}}
                style={{width: wp(7.8), height: wp(7.8), borderRadius: wp(3.9)}}
              />
            </View>
            <View style={{marginLeft: wp(2)}}>
              <SemiMediumTitle title={name} />
              <SmallText alignSelf={'flex-start'} text={address} />
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
    top: wp(0.5),
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
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  textBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(34),
  },
  smallTextBg: {
    backgroundColor: colors.borderColor,
    borderRadius: wp(3.9),
    height: wp(7.8),
    width: wp(7.8),
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
    // backgroundColor:'red',
  },
  review: {
    fontSize: wp(3.5),
    // marginTop:wp(1),
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
