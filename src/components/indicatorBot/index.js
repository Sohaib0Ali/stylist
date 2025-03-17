import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../assets/images/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import icons from '../../assets/icons/icons';
import {scale} from 'react-native-size-matters';

const IndicatorBot = ({Boattext}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText('');
    const textToShow = Boattext;
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex === textToShow.length) {
        clearInterval(intervalId);
        return;
      }
      setText(prevText => prevText + textToShow.charAt(currentIndex));
      currentIndex++;
    }, 80);

    return () => clearInterval(intervalId);
  }, [Boattext]);

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.toolTipBg}>
        <View style={styles.otherContainer}>
          <View style={styles.talkBubble}>
            <View style={styles.talkBubbleSquare}>
              <Text style={styles.talkBubbleMessage}>{text}</Text>
            </View>
            <Image
              style={styles.thought}
              source={images.thought}
              resizeMode="contain"
            />
            <View
              style={styles.iconImageBg}
              onPress={() => setIsVisible(!isVisible)}>
              <Image
                style={styles.img}
                source={icons.snap}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default IndicatorBot;

const styles = StyleSheet.create({
  modalContainer: {
    borderTopRightRadius: wp(4),
    borderTopLeftRadius: wp(4),
    backgroundColor: colors.secondary,
    paddingVertical: wp(8.5),
    paddingHorizontal: wp(6),
    top: wp(5),
    bottom: 0,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
  },

  toolTipBg: {
    bottom: wp(2),
  },
  otherContainer: {
    paddingHorizontal: wp(2),
  },
  iconImageBg: {
    width: scale(44),
    height: scale(44),
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },
  talkBubbleSquare: {
    width: wp(70),
    backgroundColor: '#fff',
    bottom: 0,
    borderRadius: 10,
    marginLeft: wp(13),
  },
  talkBubbleTriangle: {
    left: wp(8),
    top: wp(1),
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
    fontSize: wp(4),
    padding: wp(4),
    flexWrap: 'wrap',
  },
  thought: {
    height: hp(4),
    width: wp(7),
    marginLeft: wp(9),
  },
});
