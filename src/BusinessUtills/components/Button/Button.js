import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fonts from '../../assets/fonts/fonts';
import colors from '../../assets/colors/colors';

const Button = props => {
  const {
    containerStyle,
    buttonText,
    BackgroundImage,
    TextStyle,
    isImagePath,
    onPress,
    rightText,
    marginBottom,
    marginTop,
    bgColor,
    borderRadius,
    height,
    width,
    textColor,
    decorationLine,
    fontSize,
    fontWeight,
    marginStart,
    borderWidth,
    borderColor,
    textAlign,
    isText,
    isImageStyle,
    disabled,
    proProtfolio,
    alignSelf,
    marginHorizontal,
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        containerStyle !== undefined
          ? containerStyle
          : [
              styles.container,
              {
                alignSelf: alignSelf ? alignSelf : 'center',
                height: height || hp(7.5),
                width: width || wp(90),
                marginTop: marginTop,
                marginBottom: marginBottom,
                marginStart: marginStart,
                borderWidth: borderWidth || 1,
                borderColor:
                  borderColor !== undefined ? borderColor : colors.btnColor,
                borderRadius: borderRadius || wp(4),
                backgroundColor:
                  bgColor !== undefined ? bgColor : colors.btnColor,
                marginHorizontal: marginHorizontal ? marginHorizontal : null,
              },
            ],
      ]}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode={'stretch'}
        style={styles.imgBackground}>
        <View style={styles.mainView}>
          {isImagePath !== undefined ? (
            <View
              style={[
                styles.viewImage,
                proProtfolio ? {flex: 0.3, alignItems: 'flex-end'} : null,
              ]}>
              <Image
                source={isImagePath}
                style={[
                  isImageStyle !== undefined
                    ? isImageStyle
                    : styles.isImageStyle,
                ]}
                resizeMode={'contain'}
              />
            </View>
          ) : (
            <View style={styles.viewImage} />
          )}
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: fontSize || wp(4.2),
                width: '100%',
                fontWeight: fontWeight || '500',
                color: textColor !== undefined ? textColor : colors.white,
                textDecorationLine: decorationLine,
                fontFamily: fonts.semiBold,
                textAlign: textAlign ? textAlign : 'center',
              },
              TextStyle,
              proProtfolio ? {flex: 0.7} : null,
            ]}>
            {[isText !== undefined ? 'Button' : buttonText]}
          </Text>
          <Text style={styles.rightText}>{rightText}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {},
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewImage: {
    flex: 0.13,
  },
  isImageStyle: {
    width: 30,
    height: 30,
  },
  textStyle: {
    textAlign: 'center',
  },
  rightText: {
    flex: 0.13,
    textAlign: 'center',
  },
});
