import {ScrollView, StyleSheet, Text} from 'react-native';
import React, {useCallback, useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import LInput from '../Component/LInput';
import {t} from 'i18next';
import SelectGender from '../Component/SelectGender';
import Button from '../../../../BusinessUtills/components/Button/Button';

const AddNewServices = ({onCancle}) => {
  const [isservicesCat, setIsServicesCat] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const onSelectGender = useCallback(
    gender => {
      setSelectedGender(gender);
    },
    [setSelectedGender],
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{}}>
      <Text
        style={[
          styles.subTextHeading,
          {marginTop: scale(30), fontWeight: '600'},
        ]}>
        Add new service type{' '}
      </Text>
      <LInput
        title={t('New Service Category')}
        onChangeText={setIsServicesCat}
        placeholder={'Seat Service '}
        value={isservicesCat}
        textConinerstyle={{marginTop: hp(2)}}
        language={'English'}
      />
      <LInput
        title={t('New Service Category')}
        onChangeText={setIsServicesCat}
        placeholder={'Seat Service '}
        value={isservicesCat}
        textConinerstyle={{marginTop: hp(0)}}
        language={'*Arabic'}
        direction={'RTL'}
      />
      <Text style={[styles.subTextHeading, {marginTop: hp(1)}]}>
        Service category
      </Text>
      <SelectGender
        genderVieStyle={{marginTop: hp(1)}}
        onSelectValue={onSelectGender}
      />
      <Button
        buttonText={'Cancle'}
        width="90%"
        bgColor={'#FFFFFF'}
        textColor={'#57429D'}
        marginTop={hp(8)}
        onPress={() => onCancle(true)}
      />
      <Button
        buttonText={'Add Service'}
        width="90%"
        marginTop={hp(2)}
        marginBottom={hp(50)}
      />
    </ScrollView>
  );
};

export default AddNewServices;

const styles = StyleSheet.create({
  subTextHeading: {
    color: '#5E5E5F',
    fontSize: 16,
    fontWeight: '400',
  },
});
