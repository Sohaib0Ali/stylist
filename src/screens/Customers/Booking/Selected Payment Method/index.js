import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MediumTitle from '../../../../components/MediumTitle/MediumTitle';
import styles from './style';
import SmallText from '../../../../components/SmallText/SmallText';
import BookingHeader from '../../../../components/Client Components/Booking/Booking Header';
import AppleIcon from '../../../../assets/icons/appleIcon.svg';
import BackIcon from '../../../../assets/icons/backIcon.svg';
import Divider from '../../../../components/Divider/divider';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import colors from '../../../../assets/colors/colors';

export default function SelectedPaymentMethodScreen({navigation}) {
  return (
    <View style={styles.container}>
      <BookingHeader
        name="TON&GUY"
        star="3.9"
        reviews="33"
        withoutContent
        paymentMethodCheck
      />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('RATE_COMPANY_SCREEN')}>
            <AppleIcon
              width={wp(5)}
              height={hp(3)}
              style={{marginRight: wp(1)}}
            />
            <MediumTitle title="Pay" />
          </TouchableOpacity>
          <SmallText text="Cancel" color={colors.blue} />
        </View>
        <Divider marginTop={hp(1)} />

        <View style={styles.itemBg}>
          <View style={styles.iconTextBg}>
            <AppleIcon
              width={wp(5)}
              height={hp(3)}
              style={{marginRight: wp(15)}}
            />
            <View>
              <SmallTitle title="Master Card PLatinum" alignSelf="flex-start" />
              <SmallTitle title="****2505" alignSelf="flex-start" />
            </View>
          </View>
          <BackIcon
            width={wp(3.5)}
            height={hp(2.5)}
            style={{transform: [{rotateY: '180deg'}]}}
          />
        </View>
        <Divider />
        <View style={styles.itemBg}>
          <View style={styles.iconTextBg}>
            <SmallText
              text="Address"
              alignSelf="flex-start"
              marginRight={wp(3)}
            />
            <View style={{flex: 0.95}}>
              <SmallTitle
                title="AVENIDA CAXANGÁ RECIFE PE 44886-232 BRASIL"
                alignSelf="flex-start"
              />
            </View>
          </View>
          <BackIcon
            width={wp(3.5)}
            height={hp(2.5)}
            style={{transform: [{rotateY: '180deg'}]}}
          />
        </View>
        <Divider />
        <View style={styles.itemBg}>
          <View style={styles.iconTextBg}>
            <SmallText
              text="Contact"
              alignSelf="flex-start"
              marginRight={wp(3)}
            />
            <View style={{flex: 0.95}}>
              <SmallTitle
                title="printwishes@cloud.com"
                alignSelf="flex-start"
              />
              <SmallTitle title="(81) 3434-4424423" alignSelf="flex-start" />
            </View>
          </View>

          <BackIcon
            width={wp(3.5)}
            height={hp(2.5)}
            style={{transform: [{rotateY: '180deg'}]}}
          />
        </View>
        <Divider />
        <View style={styles.itemBg}>
          <View />
          <View style={styles.iconTextBg}>
            <View style={{alignSelf: 'center'}}>
              <SmallText text="SUBTOTAL" alignSelf="flex-start" />
              <SmallText text="SHPPING" alignSelf="flex-start" />
              <SmallText text="PAY MOTOGUI" alignSelf="flex-start" />
            </View>
          </View>
          <View style={{}}>
            <SmallTitle title="USD 293.000" alignSelf="flex-start" />
            <SmallTitle title="USD 29.000" alignSelf="flex-start" />
            <SmallTitle title="USD 329.000" alignSelf="flex-start" />
          </View>
        </View>
        <Divider />
      </View>
    </View>
  );
}
