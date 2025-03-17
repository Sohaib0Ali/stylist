//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import Header from '../../../../components/Header/Header';
import ToggleButton from '../../../../components/ToggleButton/ToggleButton';
import Title from '../../../../components/Title/Title';
import WalletScreen from '../WalletScreen';
import DealOfDayScreen from '../DealOfDayScreen';
import ClaimScreen from '../ClaimScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';

const RewardCreditScreen = () => {
  const {t} = useTranslation();
  const [values, setValues] = useState(1);

  const getCountValue = async value => {
    await setValues(value);
  };
  return (
    <View style={styles.container}>
      <Header />
      <Title
        paddingHorizontal={wp('4%')}
        title={t('rewardCredits')}
        alignSelf="flex-start"
      />
      <ToggleButton
        getCountValue={getCountValue}
        leftText="Wallet"
        rightText="Deal of the day"
        rightText2="Claim"
        threeOptions
      />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {values === 1 ? (
          <WalletScreen />
        ) : values === 2 ? (
          <DealOfDayScreen />
        ) : values === 3 ? (
          <ClaimScreen />
        ) : (
          <View />
        )}
      </ScrollView>
    </View>
  );
};

export default RewardCreditScreen;
