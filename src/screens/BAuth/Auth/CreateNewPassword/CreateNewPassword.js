//================================ React Native Imported Files ======================================//
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import Header from '../../../components/Header/Header';

//================================ Local Imported Files ======================================//

import styles from './style';
import Button from '../../../components/Button/Button';
import SimpleText from '../../../components/SimpleText/SimpleText';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Title from '../../../components/Title/Title';
import Input from '../../../components/Input/Input';
import {useTranslation} from 'react-i18next';

const CreateNewPasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const {t} = useTranslation();

  return (
    <>
      <Header
        headerBack={true}
        headerColor={'white'}
        direction={'RTL'}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        <Title
          title={t('createNewPassword')}
          marginTop={hp(3)}
          marginBottom={hp(1)}
        />
        <SimpleText
          marginTop={0}
          marginBottom={hp(3)}
          textAlign="center"
          text={t('createNewPasswordText')}
        />
        <Input
          value={password}
          onChangeText={setPassword}
          title={t('password')}
          placeholder={t('passwordPlaceHolder')}
          show
        />
        <Input
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          title={t('repeatPassword')}
          placeholder={t('repeatePasswodPlaceHolder')}
          show
        />

        <Button
          buttonText={t('save')}
          marginTop={hp(7)}
          onPress={() => navigation.navigate('LOGIN_SCREEN')}
        />
      </ScrollView>
    </>
  );
};
export default CreateNewPasswordScreen;
