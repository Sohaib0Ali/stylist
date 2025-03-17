import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Share,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import Button from '../../Button/Button';
import SmallText from '../../SmallText/SmallText';
import SmallTitle from '../../SmallTitle/SmallTitle';
import SemiMediumTitle from '../../Semi Medium Title';
import images from '../../../assets/images/images';
import Config from '../../../config/config';
import {showSuccess} from '../../../../Utils/FlashMessage';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {scale} from 'react-native-size-matters';

const BarberComponent = ({
  id,
  time,
  name,
  address,
  img,
  onPress,
  fav,
  favoriteData,
  key,
}) => {
  const [loading, setLoading] = useState(false);
  const {t, i18n} = useTranslation();

  const addFav = async () => {
    setLoading(true);
    try {
      const endpoint = fav
        ? `removeSalontoFavrite/${id}`
        : `addSalontoFavrite/${id}`;

      const config = {
        method: 'patch',
        url: `${Config.baseUrl}${endpoint}`,
        headers: {
          Authorization: `Bearer ${Config.token}`,
        },
      };

      const response = await axios(config);
      const res = response.data;

      favoriteData(id, !fav); // Toggle the favorite status in your local data

      if (res.success) {
        showSuccess(res.msg);
      }
    } catch (error) {
      alert(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Windsor',
        message: 'Windsor.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
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
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} key={key}>
      <ImageBackground
        style={styles.container}
        imageStyle={{borderRadius: wp(4)}}
        source={{uri: img}}>
        <View style={styles.rowContainer}>
          <View style={styles.leftBg}>
            <Image style={styles.clock} source={images.clock} />
            <Text style={styles.smallText}>{time}</Text>
          </View>
          <View style={styles.rightBg}>
            <TouchableOpacity
              onPress={onShare}
              style={{...styles.iconBg, marginRight: wp(2)}}
              activeOpacity={0.6}>
              <Image style={styles.like} source={images.share} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBg}
              activeOpacity={0.6}
              onPress={() => addFav()}>
              {fav ? (
                <Image style={styles.like} source={images.favrate} />
              ) : (
                <Image style={styles.like} source={images.dislike} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.BottomRowContainer}>
          <View style={styles.textBg}>
            <View style={styles.smallTextBg}>
              <SmallTitle title="TG" />
            </View>
            <View
              style={{
                width: scale(110),
                alignItems: 'flex-start',
                marginLeft: scale(5),
              }}>
              <SemiMediumTitle title={name} />
              <SmallText text={address} alignSelf={'flex-start'} />
            </View>
          </View>
          <Button
            onPress={onPress}
            buttonText={t('book')}
            width="30%"
            height={hp(6)}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(260),
    height: scale(295),
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
    top: wp(0.5),
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
  clock: {
    height: scale(15),
    width: scale(15),
    marginHorizontal: scale(2),
  },
  like: {
    height: scale(30),
    width: scale(30),
    borderRadius: 100,
    alignSelf: 'center',
  },
});

export default BarberComponent;
