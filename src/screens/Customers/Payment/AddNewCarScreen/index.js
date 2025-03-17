import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from './style';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import colors from '../../../../assets/colors/colors';
import Title from '../../../../components/Title/Title';
import {useTranslation} from 'react-i18next';

export default function AddNewCardScreen({img, navigation}) {
  const {t} = useTranslation();
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: colors.secondary}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.toggle} />
          <Title
            title={t('bookDetails')}
            alignSelf="flex-start"
            marginBottom={hp(3)}
            marginTop={hp(5)}
          />
          <Input
            value={name}
            onChangeText={name => setName(name)}
            title={t('cardHoldersName')}
            placeholder={t('cardHolderPlaceholder')}
          />
          <Input
            value={cardNumber}
            onChangeText={cardNumber => setCardNumber(cardNumber)}
            title={t('cardNumber')}
            placeholder={t('cardNumberPlaceholder')}
            keyboardType="number-pad"
          />
          <View style={styles.inputBg}>
            <View style={{width: '47%'}}>
              <Input
                value={expDate}
                onChangeText={expDate => setExpDate(expDate)}
                title={t('expiryDate')}
                placeholder={t('expiryDatePlaceholder')}
                keyboardType="number-pad"
              />
            </View>
            <View style={{width: '47%'}}>
              <Input
                value={cvv}
                onChangeText={cvv => setCvv(cvv)}
                title={t('cvv')}
                placeholder={t('cvvPlaceholder')}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <Button
            buttonText={t('addCard')}
            marginTop={hp(4)}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
