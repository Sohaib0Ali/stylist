import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import images from '../../../../assets/images/images';
import icons from '../../../../assets/icons/icons';
import SmallText from '../../../SmallText/SmallText';
import Title from '../../../Title/Title';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';
import {useTranslation} from 'react-i18next';
import {scale} from 'react-native-size-matters';

export default function StylistHeader({
  name,
  star,
  reviews,
  withoutContent,
  image,
  textShow,
  position,
  paymentMethodCheck,
}) {
  const {t} = useTranslation();
  const [selected, setSelected] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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
    <View>
      <View style={styles.header}>
        {withoutContent ? (
          <View />
        ) : (
          <TouchableOpacity
            onPress={() => setSelected(!selected)}></TouchableOpacity>
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
          <Image
            source={image ? {uri: image} : images.manIcon}
            style={styles.imageStyle}
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
          <Title
            fontSize={28}
            title={name}
            color={colors.black}
            marginTop={scale(3)}
            marginBottom={scale(2)}
          />
          <SmallText text={position} color={colors.black} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imgBg: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  backIcon: {
    width: wp(2),
    height: hp(2),
    tintColor: colors.black,
  },
  iconBg: {
    backgroundColor: colors.black,
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
  imageStyle: {
    height: wp(15),
    width: wp(15),
    borderRadius: wp(7.5),
    alignSelf: 'center',
    marginBottom: wp(4.1),
  },
  review: {
    fontSize: wp(3.5),
    color: colors.black,
    fontFamily: fonts.regular,
  },
  star: {
    width: wp(5),
    height: hp(2),
    alignSelf: 'baseline',
    marginRight: wp(1.3),
  },

  tgText: {
    color: colors.black,
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
