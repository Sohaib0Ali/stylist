import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import images from '../../../../assets/images/images';
import {useNavigation} from '@react-navigation/native';
import icons from '../../../../assets/icons/icons';
import SmallText from '../../../SmallText/SmallText';
import Title from '../../../Title/Title';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';
import Button from '../../../Button/Button';
import {useTranslation} from 'react-i18next';

export default function BookingHeader({
  name,
  height,
  editPress,
  star,
  reviews,
  img,
  withoutContent,
  textShow,
  btnPress,
  selectedId,
  paymentMethodCheck,
}) {
  const {t} = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();

  const [text, setText] = useState('');
  const [fullText, setFullText] = useState(textShow);
  const [index, setIndex] = useState(0);

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
      source={img ? {uri: img} : images.salonBg}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backIcon}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {withoutContent ? (
          <View />
        ) : (
          <TouchableOpacity onPress={editPress}>
            <Text style={{color: '#FFFFFF'}}>{t('edit')}</Text>
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
                source={icons.snap}
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
        <View>
          <SmallText
            text={t('bookAndExperienceOurStylist')}
            color={colors.white}
          />
          <Title
            title={name}
            color={colors.white}
            marginTop={hp(0.1)}
            marginBottom={hp(0.1)}
          />
          <View style={styles.reviewStarBg}>
            <Image
              source={icons.star}
              style={styles.star}
              resizeMode="contain"
            />
            <Text style={styles.tgText}>{star} </Text>
            <Text style={styles.review}>
              ({reviews} {t('reviews')})
            </Text>
          </View>
        </View>
      )}
      {selectedId === '2' ? (
        <Button
          buttonText={'Add new albom'}
          isImagePath={icons.plus}
          isImageStyle={{marginHorizontal: wp(4.1), tintColor: 'white'}}
          proProtfolio
          onPress={btnPress}
          width={wp('60%')}
        />
      ) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp('4%'),
    paddingVertical: hp('3%'),
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
    fontSize: wp(3.5),
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
    fontSize: wp(3.6),
    fontFamily: fonts.semiBold,
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
