//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../../components/Header/Header';
import Title from '../../../../components/Title/Title';
import ToggleButton from '../../../../components/ToggleButton/ToggleButton';
import PrivacyPolicyScreen from '../PrivacyPolicyScreen';
import TermsOfUserScreen from '../TermsOfUsers';
import Config from '../../../../config/config';
import {showWarning} from '../../../../../Utils/FlashMessage';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

const TermsPolicyScreen = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(1);
  const [privacyPolicyData, setPrivacyPolicyData] = useState();
  const getCountValue = async value => {
    await setValues(value);
  };

  useEffect(() => {
    getTermsPolicy();
  }, []);

  const getTermsPolicy = async () => {
    setLoading(true);
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    await axios
      .get(`${Config.baseUrl}getPolicy`, {headers})
      .then(response => {
        setLoading(false);
        if (response.data.success === true) {
          setPrivacyPolicyData(response.data.data);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Title
          paddingHorizontal={wp('4%')}
          title={t('TermsAndPolicy')}
          alignSelf="flex-start"
          marginTop={hp(1)}
        />
        <ToggleButton
          leftText={t('TermOfUsers')}
          rightText={t('PrivacyPolicy')}
          getCountValue={getCountValue}
        />
        {values === 1 && privacyPolicyData ? (
          <TermsOfUserScreen
            description={
              privacyPolicyData ? privacyPolicyData[0]?.description : ''
            }
          />
        ) : (
          <PrivacyPolicyScreen
            description={
              privacyPolicyData ? privacyPolicyData[1]?.description : ''
            }
          />
        )}
      </ScrollView>
    </View>
  );
};

export default TermsPolicyScreen;
