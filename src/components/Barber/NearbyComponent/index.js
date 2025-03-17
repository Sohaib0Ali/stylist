import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../../assets/colors/colors';
import images from '../../../assets/images/images';
import Config from '../../../config/config';
import SemiTitle from '../../SemiTitle';
import {showSuccess} from '../../../../Utils/FlashMessage';

const NearbyComponent = props => {
  const {
    id,
    title,
    onPress,
    profileImage,
    key,
    rating,
    discription,
    logo,
    distance,
    review,
    favorite,
    favoriteData,
  } = props;
  const {t} = useTranslation();

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
          favoriteData(id, !fav);
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
          favoriteData(id, !fav);
          let res = response.data;
          if (res.success) {
            showSuccess(res.msg);
          }
        })
        .catch(function (error) {
          alert(error?.response?.data?.msg);
        });
    }
  };
  return (
    <TouchableOpacity
      key={key}
      style={[styles.cardContainer]}
      activeOpacity={0.8}
      onPress={onPress}>
      <ImageBackground
        source={{uri: profileImage}}
        resizeMode="cover"
        imageStyle={styles.profile}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.distance}>
            <Image style={styles.loaction} source={images.locationicon} />
            <SemiTitle
              paddingHorizontal={wp('0.8')}
              title={distance}
              marginTop={hp(1)}
              fontWeight={'600'}
              color={colors.red}
              fontSize={verticalScale(10)}
            />
          </View>

          <TouchableOpacity
            style={{
              width: verticalScale(40),
              height: verticalScale(40),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => addFav()}>
            {favorite ? (
              <Image style={styles.like} source={images.favrate} />
            ) : (
              <Image style={styles.like} source={images.dislike} />
            )}
          </TouchableOpacity>
        </View>
        <SemiTitle
          title={title}
          fontWeight={'700'}
          color={colors.white}
          fontSize={23}
          alignSelf={'center'}
          marginTop={hp(2)}
        />
        <SemiTitle
          title={discription}
          fontWeight={'600'}
          color={colors.white}
          fontSize={12}
          alignSelf={'center'}
        />
      </ImageBackground>
      <View style={styles.profileview}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image style={styles.logo} source={{uri: logo}} />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: scale(10),
            }}>
            <SemiTitle
              title={title}
              fontWeight={'600'}
              color={colors.black}
              fontSize={12}
            />
            <SemiTitle
              title={`${rating} miles`}
              fontWeight={'400'}
              color={colors.subHeading}
              fontSize={11}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '50%',
            alignItems: 'center',
            paddingHorizontal: scale(22),
          }}>
          <Image style={styles.rating} source={images.rate} />
          <SemiTitle
            title={rating}
            fontWeight={'700'}
            color={colors.subHeading}
            fontSize={13}
            alignSelf={'center'}
          />
          <SemiTitle
            title={`(${review} reviews)`}
            fontWeight={'400'}
            color={colors.subHeading}
            fontSize={11}
            alignSelf={'center'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: scale(290),
    height: scale(220),
    marginTop: scale(15),
    borderRadius: scale(13),
    marginHorizontal: scale(10),
  },
  profile: {
    width: scale(290),
    height: scale(166),
    borderTopRightRadius: scale(13),
    borderTopLeftRadius: scale(13),
  },
  distance: {
    height: hp(4),
    width: wp(28),
    backgroundColor: colors.lightRed,
    marginHorizontal: scale(10),
    marginVertical: scale(10),
    borderRadius: scale(13),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  loaction: {
    height: scale(18),
    width: scale(20),
    borderRadius: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  logo: {
    height: scale(30),
    width: scale(30),
    borderRadius: 100,
    alignSelf: 'center',
  },
  rating: {
    height: scale(15),
    width: scale(15),
    alignSelf: 'center',
  },
  profileview: {
    width: '100%',
    height: scale(54),
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
    backgroundColor: colors.white,
    borderWidth: 0.1,
    paddingLeft: scale(10),
  },
  like: {
    height: scale(30),
    width: scale(30),
    borderRadius: 100,
    alignSelf: 'center',
  },
});

export default NearbyComponent;
