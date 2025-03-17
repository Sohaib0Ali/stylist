import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import SemiTitle from '../../../components/SemiTitle';
import {ScrollView} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import Button from '../../../components/Button/Button';

export default function Payment_screen({OnPressBack, OnPressNext}) {
  const {t} = useTranslation();
  return (
    <View style={{flex: 1, paddingBottom: scale(20)}}>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <View style={styles.body}>
          <SemiTitle
            title={t('Payment method')}
            weight={'600'}
            color={colors.headingBlack}
            fontSize={24}
            fontFamily={fonts.Exo2Bold}
          />
          <TouchableOpacity
            onPress={() => {
              OnPressBack('Schedule_time');
            }}
            style={{
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={images.close}
              style={{height: scale(18), width: scale(18)}}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.Method, {opacity: 0.5}]}
          activeOpacity={0.5}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={images.card}
              style={{height: scale(18), width: scale(18)}}
            />
            <SemiTitle
              paddingHorizontal={wp('4')}
              title={t('**** 8797')}
              marginTop={wp(1)}
              weight={'400'}
              color={colors.headingBlack}
              fontSize={18}
              fontFamily={fonts.Exo2Bold}
            />
          </View>
          <Image
            source={images.unSelected_pay}
            style={{height: scale(18), width: scale(18)}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.Method, {opacity: 0.5}]}
          activeOpacity={0.5}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={images.Apple}
              style={{height: scale(18), width: scale(18)}}
            />
            <SemiTitle
              paddingHorizontal={wp('4')}
              title={t('Apple pay')}
              weight={'400'}
              color={colors.headingBlack}
              fontSize={18}
              fontFamily={fonts.Exo2Bold}
              alignSelf={'center'}
            />
          </View>
          <Image
            source={images.unSelected_pay}
            style={{height: scale(18), width: scale(18)}}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.Method}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={images.walet}
              style={{height: scale(18), width: scale(18)}}
            />
            <SemiTitle
              paddingHorizontal={wp('4')}
              title={t('Cash')}
              weight={'400'}
              color={colors.headingBlack}
              fontSize={18}
              fontFamily={fonts.Exo2Bold}
            />
          </View>
          <Image
            source={images.Selected_pay}
            style={{height: scale(18), width: scale(18)}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.Method, {opacity: 0.5}]}
          activeOpacity={0.5}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={images.Addcard}
              style={{height: scale(18), width: scale(18)}}
            />
            <SemiTitle
              paddingHorizontal={wp('4')}
              title={t('Add card')}
              weight={'400'}
              color={colors.headingBlack}
              fontSize={18}
              fontFamily={fonts.Exo2Bold}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Button
        buttonText={t('next')}
        marginTop={hp(3)}
        alignSelf={'center'}
        marginBottom={scale(20)}
        onPress={() => {
          OnPressNext('Book_details');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(25),
    marginTop: scale(15),
  },
  Method: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(26),
    marginTop: scale(30),
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});
