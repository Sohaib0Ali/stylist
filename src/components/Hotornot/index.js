import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import {scale} from 'react-native-size-matters';
import fonts from '../../assets/fonts/fonts';
import images from '../../assets/images/images';

const HotorNot = ({Hairstylesimg, stylename, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}>
      <ImageBackground
        style={styles.profileimg}
        source={{uri: Hairstylesimg}}
        imageStyle={{borderRadius: wp(3)}}
        resizeMode="cover">
        <Image style={styles.unlike} source={images.unlike} />
        <Text
          style={{
            fontSize: scale(18),
            textAlign: 'center',
            color: colors.white,
            fontWeight: '600',
            alignSelf: 'center',
            fontFamily: fonts.Exo2Bold,
            position: 'absolute',
            bottom: scale(20),
            left: scale(30),
          }}>
          {stylename}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('92%'),
    height: scale(231),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: colors.red,
    borderRadius: scale(10),
    alignSelf: 'center',
    marginTop: scale(10),
  },
  profileimg: {
    width: wp('92%'),
    height: scale(231),
    borderRadius: scale(10),
  },
  unlike: {
    height: scale(30),
    width: scale(30),
    position: 'absolute',
    top: 15,
    right: 16,
  },
});

export default HotorNot;
