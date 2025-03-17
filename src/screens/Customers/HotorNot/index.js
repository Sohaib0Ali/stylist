import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';
import {useTranslation} from 'react-i18next';
import images from '../../../assets/images/images';
import OverlayLabel from './components/OverlayLabel/OverlayLabel';
import {Card} from './components';
import colors from '../../../assets/colors/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import fonts from '../../../assets/fonts/fonts';
import SmallText from '../../../components/SmallText/SmallText';
import {UPLOAD_HOT_PIC} from '../../../constants/navigators';

const HotorNot = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {i18n} = useTranslation();

  const swiperRef = useRef(null);
  const swipeAnimation = useRef(new Animated.Value(0)).current;
  const [swipeEnabled, setSwipeEnabled] = useState(true);

  const handleSwipeLeft = () => {
    if (swipeEnabled) {
      setSwipeEnabled(false);
      Animated.timing(swipeAnimation, {
        toValue: -500,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        swiperRef.current.swipeLeft();
        resetAnimation();
      });
    }
  };

  const handleSwipeRight = () => {
    if (swipeEnabled) {
      setSwipeEnabled(false);
      Animated.timing(swipeAnimation, {
        toValue: 500,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        swiperRef.current.swipeRight();
        resetAnimation();
      });
    }
  };

  const resetAnimation = () => {
    Animated.timing(swipeAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSwipeEnabled(true);
    });
  };

  const renderCard = (card, index) => {
    return (
      <Animated.View
        key={index}
        style={[
          styles.card,
          {
            transform: [
              {translateX: swipeAnimation},
              {
                rotate: swipeAnimation.interpolate({
                  inputRange: [-500, 0, 500],
                  outputRange: ['-10deg', '0deg', '10deg'],
                }),
              },
            ],
          },
        ]}>
        <Card cards={card} />
      </Animated.View>
    );
  };

  const cards = [
    {
      name: 'Austin Wade',
      age: 22,
      photo: images.woman13,
    },
    {
      name: 'Aleksander Borzenets',
      age: 28,
      photo: images.man2,
    },
    {
      name: 'Don Delfin Espino',
      age: 29,
      photo: images.man3,
    },
    {
      name: 'Eduardo Dutra',
      age: 30,
      photo: images.man4,
    },
    {
      name: 'Wesley Tingey',
      age: 21,
      photo: images.man5,
    },
    {
      name: 'Gift Habeshaw',
      age: 26,
      photo: images.man6,
    },
    {
      name: 'Henri Pham',
      age: 30,
      photo: images.man7,
    },
    {
      name: 'Nico Marks',
      age: 24,
      photo: images.man8,
    },
    {
      name: 'Sirio',
      age: 28,
      photo: images.man9,
      key: "Ty4f_NOFO60'",
    },
    {
      name: 'Teymi Townsend',
      age: 30,
      photo: images.woman,
    },
    {
      name: 'Caique Silva',
      age: 20,
      photo: images.woman1,
      key: "3ujVzg9i2EI'",
    },
    {
      name: 'David Yanutenama',
      age: 21,
      photo: images.woman2,
    },
    {
      name: 'Pawel Karniej',
      age: 28,
      photo: images.woman3,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <TouchableOpacity
          style={{
            paddingHorizontal: wp(2.3),
          }}
          onPress={() => [navigation.goBack()]}>
          <Image
            source={images.backbtn}
            style={{tintColor: 'black', height: scale(20), width: scale(12)}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          marginTop: scale(15),
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: scale(20),
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(UPLOAD_HOT_PIC);
          }}>
          <Image source={images.scan} style={styles.scanImoji} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: scale(20),
            paddingHorizontal: scale(10),
            backgroundColor: '#F9FAFA',
            shadowColor: 'gray',
            shadowOffset: {
              width: 1,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 10,
          }}
          activeOpacity={0.8}>
          <Image source={images.HartLike} style={styles.hart} />
          <SmallText
            text={t('checkyourlikes')}
            fontSize={scale(18)}
            lineHeight={scale(20)}
            fontWeight={'600'}
            fontfamily={fonts.Exo2Bold}
            color={colors.headingBlack}
            marginLeft={scale(7)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardview}>
        <Swiper
          ref={swiperRef}
          cards={cards}
          renderCard={renderCard}
          backgroundColor="transparent"
          stackSize={3}
          stackSeparation={15}
          useViewOverflow={Platform.OS === 'ios'}
          cardVerticalMargin={18}
          disableTopSwipe={true}
          disableBottomSwipe={true}
          overlayLabels={{
            left: {
              title: 'NOPE',
              element: <OverlayLabel label="NOPE" color="#E5566D" />,
              style: {
                wrapper: styles.overlayWrapper,
              },
            },
            right: {
              title: 'LIKE',
              element: <OverlayLabel label="LIKE" color="#4CCC93" />,
              style: {
                wrapper: {
                  ...styles.overlayWrapper,
                  alignItems: 'flex-start',
                  // marginLeft: 30/,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSwipeLeft}
          disabled={!swipeEnabled}>
          <Image
            style={[styles.LikePost, {alignSelf: 'flex-end'}]}
            source={images.Dislike}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSwipeRight}
          disabled={!swipeEnabled}>
          <Image
            style={[styles.LikePost, {alignSelf: 'flex-start'}]}
            source={images.LikePost}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cardview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanImoji: {
    height: scale(45),
    width: scale(53),
  },
  hart: {
    height: scale(17),
    width: scale(20),
  },
  card: {
    height: scale(500),
    width: scale(300),
    elevation: 5,
    alignSelf: 'center',
  },
  cardText: {
    fontSize: 24,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scale(35),
  },
  button: {
    marginHorizontal: scale(35),
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  icon: {
    alignSelf: 'flex-start',
    marginTop: scale(35),
    marginLeft: scale(10),
  },
  LikePost: {
    height: scale(55),
    width: scale(55),
    resizeMode: 'contain',
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default HotorNot;
