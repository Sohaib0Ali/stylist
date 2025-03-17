import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import {scale} from 'react-native-size-matters';
import fonts from '../../../../assets/fonts/fonts';
import Button from '../../../Button/Button';
import {useTranslation} from 'react-i18next';

const OfferComponent = ({offers, img, onPress}) => {
  const {t, i18n} = useTranslation();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <ImageBackground
        style={styles.container}
        imageStyle={{borderRadius: wp(4)}}
        source={img}>
        <Text
          style={{
            color: 'white',
            fontSize: scale(20.34),
            lineHeight: scale(27.12),
            textAlign: 'center',
            fontFamily: fonts.Exo2Bold,
          }}>
          {offers}
        </Text>
        <Button
          onPress={onPress}
          buttonText={t('Discover More')}
          width={'60%'}
          height={scale(35)}
          borderRadius={9}
          marginTop={scale(11)}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(290),
    height: scale(160),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: wp(4),
  },
  iconBg: {
    backgroundColor: colors.white,
    borderRadius: wp(18),
    padding: wp(2),
  },
  BottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: colors.white,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderBottomLeftRadius: wp(4),
    borderBottomRightRadius: wp(4),
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 1,
    shadowRadius: 1.0,
    elevation: 10,
  },
});

export default OfferComponent;
