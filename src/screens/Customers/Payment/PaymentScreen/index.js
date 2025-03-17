//================================ React Native Imported Files ======================================//
import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../../components/Header/Header';
import Title from '../../../../components/Title/Title';
import ForwardIcon from '../../../../assets/icons/forwardIcon.svg';
import Divider from '../../../../components/Divider/divider';
import SemiMediumTitle from '../../../../components/Semi Medium Title';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import colors from '../../../../assets/colors/colors';
import CreditCardIcon from '../../../../assets/icons/creditCard.svg';
import AppleIcon from '../../../../assets/icons/appleIcon.svg';
import CashIcon from '../../../../assets/icons/cashIcon.svg';
import PlusIcon from '../../../../assets/icons/plusIcon.svg';
import SmallText from '../../../../components/SmallText/SmallText';
import {useTranslation} from 'react-i18next';

const PaymentScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [checked, setChecked] = useState(1);

  return (
    <View style={styles.container}>
      <Header paddingHorizontal={0.01} />
      <Title title={t('payment')} alignSelf="flex-start" marginTop={hp(1)} />
      <TouchableOpacity
        style={{...styles.itemBg, marginTop: hp(2)}}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('TRANSACTION_HISTORY_SCREEN')}>
        <SimpleText text={t('transactionHistory')} color={colors.black} />
        <ForwardIcon width={wp(4)} height={wp(4)} />
      </TouchableOpacity>
      <Divider marginTop={hp(1)} />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <SemiMediumTitle
          title={t('PaymentMethods')}
          marginTop={hp(1)}
          marginBottom={hp(1)}
        />
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

        <TouchableOpacity
          style={styles.paymentBg}
          onPress={() => {
            setChecked(3), navigation.navigate('ADD_NEW_CARD_SCREEN');
          }}>
          <View style={styles.iconTextBg}>
            <PlusIcon width={wp(6)} height={hp(4)} />
            <SmallText text={t('AddDebitCredit')} marginLeft={wp(4)} />
          </View>
          <ForwardIcon width={wp(4)} height={hp(4)} />
        </TouchableOpacity>
        <Divider />
      </ScrollView>
    </View>
  );
};

export default PaymentScreen;
