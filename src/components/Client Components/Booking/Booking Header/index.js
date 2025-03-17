import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import icons from '../../../../assets/icons/icons';
import Title from '../../../Title/Title';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';
import Config from '../../../../config/config';
import axios from 'axios';
import {showSuccess} from '../../../../../Utils/FlashMessage';
import {scale} from 'react-native-size-matters';

export default function BookingHeader({
  bg,
  id,
  name,
  height,
  fav,
  star,
  reviews,
  withoutContent,
  textShow,
  paymentMethodCheck,
  description,
}) {
  const [selected, setSelected] = useState(fav);
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [fullText, setFullText] = useState(textShow);
  const [index, setIndex] = useState(0);
  let userDetail = Config.userDetail;

  const addFav = async () => {
    if (selected === true) {
      var config = {
        method: 'patch',
        url: `${Config.baseUrl}removeSalontoFavrite/${id}`,
        headers: {
          Authorization: `Bearer ${Config.token}`,
        },
      };

      axios(config)
        .then(function (response) {
          setSelected(!selected);
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
          setSelected(!selected);
          let res = response.data;
          if (res.success) {
            showSuccess(res.msg);
          }
        })
        .catch(function (error) {});
    }
  };

  useEffect(() => {
    if (index < fullText?.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 20);
    }
  }, [index]);
  return (
    <ImageBackground
      style={{height: height ? height : hp(35)}}
      source={{uri: bg}}>
      <View style={styles.overlay} />
      <View style={styles.header}>
        <TouchableOpacity
          style={{paddingVertical: hp('3%'), paddingHorizontal: wp(6)}}
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.backIcon}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {withoutContent ? (
          <View />
        ) : (
          <TouchableOpacity style={styles.iconBg} onPress={() => addFav()}>
            <Image
              style={styles.icon}
              source={selected ? icons.filledHeart : icons.heart}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {paymentMethodCheck ? (
        <View></View>
      ) : withoutContent ? (
        <View style={styles.otherContainer}>
          <View style={styles.talkBubble}>
            <View
              style={styles.iconImageBg}
              onPress={() => setIsVisible(!isVisible)}>
              <Image
                style={styles.img}
                source={
                  userDetail.styleBot == 'Dexter' ? icons.snap : icons.thoraIcon
                }
                resizeMode="contain"
              />
            </View>
            <View style={{top: wp(1)}}>
              <View style={styles.talkBubbleTriangle} />
              <View style={styles.talkBubbleSquare}>
                <Text style={styles.talkBubbleMessage}>{text}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={{alignSelf: 'center'}}>
          <Title
            title={name}
            color={colors.white}
            marginTop={hp(0.1)}
            marginBottom={hp(0.1)}
            fontSize={scale(27)}
            alignSelf={'center'}
          />
          <Text style={styles.description}>{description}</Text>

          {reviews !== null && star !== null && (
            <View style={styles.reviewStarBg}>
              <Image
                source={icons.star}
                style={styles.star}
                resizeMode="contain"
              />
              <Text style={styles.tgText}>{star}</Text>
              <Text style={styles.review}>{reviews} reviews</Text>
            </View>
          )}
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: scale(13),
    color: colors.white,
    fontWeight: '500',
    fontFamily: fonts.Exo2Bold,
    alignSelf: 'center',
    textAlign: 'center',
  },
  imgBg: {},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // set the background color with an alpha channel value of 0.5 for 50% opacity
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: hp('4%'),
  },
  backIcon: {
    width: wp(3),
    height: hp(3),
    tintColor: colors.white,
  },
  iconBg: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(2.1),
    paddingVertical: wp(2),
    borderRadius: wp(33),
  },
  icon: {width: wp(4), height: wp(4)},
  reviewStarBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  review: {
    fontSize: wp(3.9),
    color: colors.white,
    fontFamily: fonts.regular,
  },
  star: {
    width: wp(6),
    height: hp(3),
    alignSelf: 'baseline',
    marginRight: wp(1.3),
  },

  tgText: {
    color: colors.white,
    fontSize: wp(3.9),
    fontFamily: fonts.semiBold,
    marginRight: scale(6),
  },

  otherContainer: {
    flex: 1,
  },

  iconImageBg: {
    width: wp(14.9),
    height: wp(14.9),
    left: wp(8),
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },

  talkBubble: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 2, // <- zIndex here
    bottom: wp(10),
  },
  talkBubbleSquare: {
    width: wp(90),
    left: wp(5),
    backgroundColor: '#fff',
    bottom: 0,
    borderRadius: 10,
  },
  talkBubbleTriangle: {
    left: wp(12),
    top: wp(1.5),
    width: 0,
    height: 0,
    borderLeftWidth: wp(4),
    borderRightWidth: wp(4),
    borderBottomWidth: wp(4),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    borderTopColor: '#2C325D',
  },
  talkBubbleMessage: {
    color: '#000',
    padding: wp(4),
  },
});
