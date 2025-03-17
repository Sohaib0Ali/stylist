import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import {Switch} from 'react-native-switch';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import ForwardIcon from '../../../../BusinessUtills/assets/icons/forwardIcon.svg';
import Button from '../../../../BusinessUtills/components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const AddLocationPaymentMethod = () => {
  const [applePay, setApplePay] = useState(false);
  const [debitCredit, setDebitCredit] = useState(false);
  const [cash, setCash] = useState(false);
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{...styles.itemContainer, marginTop: hp(3)}}
        activeOpacity={0.6}>
        <View style={styles.iconTextBg}>
          <View style={styles.snapBg}>
            <Image
              source={icons.appleIcon}
              style={styles.snapIcon}
              resizeMode="contain"
            />
          </View>
          <SimpleText
            text={t('applePay')}
            color={applePay ? colors.headingBlack : colors.subHeading}
          />
        </View>

        <Switch
          value={applePay}
          onValueChange={applePay => setApplePay(applePay)}
          disabled={false}
          circleSize={wp(8)}
          barHeight={wp(8.9)}
          circleBorderWidth={0}
          backgroundActive={colors.lightGreen}
          backgroundInactive={colors.grey}
          circleActiveColor={colors.white}
          circleInActiveColor={colors.white}
          changeValueImmediately={true}
          innerCircleStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          outerCircleStyle={{}} // style for outer animated circle
          renderActiveText={false}
          renderInActiveText={false}
          switchLeftPx={2}
          switchRightPx={2}
          switchWidthMultiplier={2}
          switchBorderRadius={wp(66)}
        />
      </TouchableOpacity>
      <View style={styles.separator}></View>
      <TouchableOpacity
        style={{...styles.itemContainer, marginTop: hp(3)}}
        activeOpacity={0.6}>
        <View style={styles.iconTextBg}>
          <View style={styles.snapBg}>
            <Image
              source={icons.creditCard}
              style={styles.snapIcon}
              resizeMode="contain"
            />
          </View>
          <SimpleText
            text={t('debitCreditCard')}
            color={debitCredit ? colors.headingBlack : colors.subHeading}
          />
        </View>

        <Switch
          value={debitCredit}
          onValueChange={debitCredit => setDebitCredit(debitCredit)}
          disabled={false}
          circleSize={wp(8)}
          barHeight={wp(8.9)}
          circleBorderWidth={0}
          backgroundActive={colors.lightGreen}
          backgroundInactive={colors.grey}
          circleActiveColor={colors.white}
          circleInActiveColor={colors.white}
          changeValueImmediately={true}
          innerCircleStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          outerCircleStyle={{}} // style for outer animated circle
          renderActiveText={false}
          renderInActiveText={false}
          switchLeftPx={2}
          switchRightPx={2}
          switchWidthMultiplier={2}
          switchBorderRadius={wp(66)}
        />
      </TouchableOpacity>
      <View style={styles.separator}></View>
      <TouchableOpacity
        style={{...styles.itemContainer, marginTop: hp(3)}}
        activeOpacity={0.6}>
        <View style={styles.iconTextBg}>
          <View style={styles.snapBg}>
            <Image
              source={icons.cashIcon}
              style={styles.snapIcon}
              resizeMode="contain"
            />
          </View>
          <SimpleText
            text={t('cash')}
            color={cash ? colors.headingBlack : colors.subHeading}
          />
        </View>

        <Switch
          value={cash}
          onValueChange={cash => setCash(cash)}
          disabled={false}
          circleSize={wp(8)}
          barHeight={wp(8.9)}
          circleBorderWidth={0}
          backgroundActive={colors.lightGreen}
          backgroundInactive={colors.grey}
          circleActiveColor={colors.white}
          circleInActiveColor={colors.white}
          changeValueImmediately={true}
          innerCircleStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          outerCircleStyle={{}} // style for outer animated circle
          renderActiveText={false}
          renderInActiveText={false}
          switchLeftPx={2}
          switchRightPx={2}
          switchWidthMultiplier={2}
          switchBorderRadius={wp(66)}
        />
      </TouchableOpacity>
      <View style={styles.separator}></View>
      <TouchableOpacity
        style={{...styles.itemContainer, marginTop: hp(3)}}
        activeOpacity={0.6}>
        <View style={styles.iconTextBg}>
          <View style={styles.snapBg}>
            <Image
              source={icons.plusCircle}
              style={styles.snapIcon}
              resizeMode="contain"
            />
          </View>
          <SimpleText
            text={t('addPaymentMethods')}
            color={applePay ? colors.headingBlack : colors.subHeading}
          />
          <TouchableOpacity style={styles.forwardIcon}>
            <ForwardIcon style />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Button
        buttonText={t('addLocation')}
        width="100%"
        marginTop={hp(3)}
        onPress={() => navigation.navigate('DASHBOARD_SCREEN')}
      />
    </View>
  );
};

export default AddLocationPaymentMethod;
