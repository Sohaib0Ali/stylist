import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MediumTitle from '../../../../components/MediumTitle/MediumTitle';
import styles from './style';
import SmallText from '../../../../components/SmallText/SmallText';
import BookingHeader from '../../../../components/Client Components/Booking/Booking Header';
import CreditCardIcon from '../../../../assets/icons/creditCard.svg';
import AppleIcon from '../../../../assets/icons/appleIcon.svg';
import CashIcon from '../../../../assets/icons/cashIcon.svg';
import PlusIcon from '../../../../assets/icons/plusIcon.svg';
import CrossIcon from '../../../../assets/icons/cross.svg';
import Divider from '../../../../components/Divider/divider';

export default function PaymentMethodScreen({navigation}) {
  const [textMessage, setTextMessage] = useState('How do you want to pay?');
  const [checked, setChecked] = useState(1);

  return (
    <View style={styles.container}>
      <BookingHeader
        height={hp(50)}
        name="TON&GUY"
        star="3.9"
        reviews="33"
        textShow={textMessage}
        withoutContent
      />
      <View style={styles.body}>
        <View style={styles.toggle} />
        <View style={styles.titleRow}>
          <MediumTitle title="Payment method" />
          <TouchableOpacity activeOpacity={0.6}>
            <CrossIcon width={wp(4.5)} height={hp(4)} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.paymentBg}
          onPress={() => {
            setChecked(1),
              navigation.navigate('SELECTED_PAYMENT_METHOD_SCREEN');
          }}>
          <View style={styles.iconTextBg}>
            <CreditCardIcon width={wp(6)} height={hp(4)} />
            <SmallText text="****8987" marginLeft={wp(4)} />
          </View>

          <View
            style={checked === 1 ? styles.checkBoxSelected : styles.checkBox}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.paymentBg}
          onPress={() => {
            setChecked(2),
              navigation.navigate('SELECTED_PAYMENT_METHOD_SCREEN');
          }}>
          <View style={styles.iconTextBg}>
            <AppleIcon width={wp(6)} height={hp(4)} />
            <SmallText text="Apple pay" marginLeft={wp(4)} />
          </View>

          <View
            style={checked === 2 ? styles.checkBoxSelected : styles.checkBox}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.paymentBg}
          onPress={() => {
            setChecked(3),
              navigation.navigate('SELECTED_PAYMENT_METHOD_SCREEN');
          }}>
          <View style={styles.iconTextBg}>
            <CashIcon width={wp(6)} height={hp(4)} />
            <SmallText text="Cash" marginLeft={wp(4)} />
          </View>

          <View
            style={checked === 3 ? styles.checkBoxSelected : styles.checkBox}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.paymentBg}>
          <View style={styles.iconTextBg}>
            <PlusIcon width={wp(6)} height={hp(4)} />
            <SmallText text="Add card" marginLeft={wp(4)} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
