import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import colors from '../../../assets/colors/colors';
import {scale} from 'react-native-size-matters';
import fonts from '../../../assets/fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';

const HairstyleList = ({profileimg, stylename, onPress}) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <ImageBackground
          style={styles.profileimg}
          source={{uri: profileimg}}
          borderRadius={scale(9)}>
          <LinearGradient
            colors={['rgba(34, 34, 34, 0)', '#222222']}
            style={styles.gradient}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: scale(5),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: scale(18),
                textAlign: 'center',
                color: colors.white,
                fontWeight: '600',
                alignSelf: 'flex-start',
                fontFamily: fonts.Exo2light,
              }}>
              {stylename}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(129),
    height: scale(177),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: scale(15),
    marginVertical: scale(10),
    borderRadius: scale(9),
  },
  profileimg: {
    width: scale(129),
    height: scale(177),
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // set the background color with an alpha channel value of 0.5 for 50% opacity
  },
});

export default HairstyleList;
