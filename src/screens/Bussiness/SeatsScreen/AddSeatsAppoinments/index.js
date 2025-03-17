//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import Input from '../../../../BusinessUtills/components/Input/Input';
import BackIcon from '../../../../BusinessUtills/components/BackIcon/BackIcon';
import Title from '../../../../BusinessUtills/components/Title/Title';
import Button from '../../../../BusinessUtills/components/Button/Button';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import ForwardIcon from '../../../../BusinessUtills/assets/icons/forwardIcon.svg';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import {useTranslation} from 'react-i18next';

const AddSeatsAppoinments = ({}) => {
  const [stylist, setStylist] = useState('');
  const [type, setType] = useState('');
  const [service, setService] = useState('');
  const [client, setClient] = useState('');
  const navigation = useNavigation();
  const [nameValidError, setNameValidError] = useState('');
  const [serivceValidError, setServiceValidError] = useState('');
  const [typeValidError, setTypeValidError] = useState('');
  const [clientValidError, setclientValidError] = useState('');
  const {t} = useTranslation();

  const handleValidStylistName = val => {
    if (val.length === 0) {
      setNameValidError(t('required'));
    } else if (val.length !== 0) {
      setNameValidError(t('done'));
    }
  };
  const handleValidSerivceName = val => {
    if (val.length === 0) {
      setServiceValidError(t('required'));
    } else if (val.length !== 0) {
      setServiceValidError(t('done'));
    }
  };
  const handleValidType = val => {
    if (val.length === 0) {
      setTypeValidError(t('required'));
    } else if (val.length !== 0) {
      setTypeValidError(t('done'));
    }
  };
  const handleValidClient = val => {
    if (val.length === 0) {
      setTypeValidError(t('required'));
    } else if (val.length !== 0) {
      setTypeValidError(t('done'));
    }
  };
  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <BackIcon paddingHorizontal={wp(4)} />
      <Title
        title={t('addAppoinments')}
        marginBottom={hp(1)}
        alignSelf={'baseline'}
        marginLeft={wp(5)}
      />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Input
          title={t('stylist')}
          value={stylist}
          onChangeText={stylist => {
            setStylist(stylist), handleValidStylistName(stylist);
          }}
          placeholder={t('stylistPlaceHolder')}
          marginBottom={hp(0.7)}
        />
        {nameValidError !== 'Done' && nameValidError !== '' ? (
          <SmallTitle
            title={nameValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
        <Input
          value={service}
          title={t('service')}
          onChangeText={service => {
            setService(service), handleValidSerivceName(service);
          }}
          placeholder={t('servicePlaceHolder')}
          marginBottom={hp(0.7)}
        />
        {serivceValidError !== 'Done' && serivceValidError !== '' ? (
          <SmallTitle
            title={serivceValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
        <Input
          value={type}
          title={t('type')}
          onChangeText={type => {
            setType(type), handleValidType(type);
          }}
          placeholder={t('typePlaceHolder')}
          marginBottom={hp(0.7)}
        />
        {typeValidError !== 'Done' && typeValidError !== '' ? (
          <SmallTitle
            title={typeValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}

        <Input
          value={client}
          title={t('client')}
          onChangeText={client => {
            setClient(client), handleValidClient(client);
          }}
          placeholder={t('clientPlaceHolder')}
          marginBottom={hp(0.7)}
        />
        {clientValidError !== 'Done' && clientValidError !== '' ? (
          <SmallTitle
            title={clientValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.openDays}>
              <View style={{flex: 0.35, justifyContent: 'center'}}>
                <SimpleText
                  text={item.openDays}
                  alignSelf="flex-start"
                  marginLeft={hp(1.5)}
                />
              </View>
              <View style={{flex: 0.5}}>
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: 'flex-end',
                    alignSelf: 'flex-end',
                  }}>
                  <SimpleText fontSize={wp(3.55)} text={item.days} />
                </View>
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: 'flex-start',
                    alignSelf: 'flex-end',
                  }}>
                  <SimpleText
                    fontSize={wp(3.55)}
                    text={item.time}
                    alignSelf="center"
                  />
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ForwardIcon />
              </TouchableOpacity>
            </View>
          );
        })}
        <Button
          buttonText={t('addAppoinments')}
          width="100%"
          marginTop={hp(4)}
          onPress={() => navigation.navigate('SEATS_NEXT_APPOINMENTS')}
        />
      </ScrollView>
    </View>
  );
};
export default AddSeatsAppoinments;
