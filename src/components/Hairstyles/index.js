import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import {scale} from 'react-native-size-matters';
import fonts from '../../assets/fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';

const Hairstyles = ({Hairstylesimg, stylename, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}>
      <ImageBackground
        style={styles.profileimg}
        source={{uri: Hairstylesimg}}
        imageStyle={{borderRadius: wp(3)}}>
        <LinearGradient
          colors={['rgba(34, 34, 34, 0)', '#222222']}
          style={styles.gradient}
        />
        <Text
          style={{
            fontSize: scale(18),
            textAlign: 'center',
            color: colors.white,
            fontWeight: '600',
            alignSelf: 'center',
            fontFamily: fonts.Exo2Bold,
            position: 'absolute',
            bottom: scale(10),
          }}>
          {stylename}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(117),
    height: scale(161),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: scale(10),
    alignSelf: 'center',
    marginTop: scale(10),
  },
  profileimg: {
    width: scale(117),
    height: scale(161),
    borderRadius: scale(10),
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 15,
  },
});

export default Hairstyles;
