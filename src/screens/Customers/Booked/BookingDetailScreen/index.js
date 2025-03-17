//================================ React Native Imported Files ======================================//
import React from 'react';
import {View, ScrollView} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import SmallText from '../../../../components/SmallText/SmallText';
import SemiTitle from '../../../../components/SemiTitle';
import SemiMediumTitle from '../../../../components/Semi Medium Title';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

const BookingDetailScreen = ({route}) => {
  const {t} = useTranslation();
  let name = route?.params?.itemData?.salon?.name;
  let bookingNumber = route?.params?.itemData?.bookingNumber;
  let address = route?.params?.itemData?.salon?.address;
  let date = moment(route?.params?.itemData?.bookingDateTime).format(
    'dddd, MMM DD, YYYY',
  );
  let time = moment(route?.params?.itemData?.bookingDateTime).format('hh:mm a');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <SemiMediumTitle title={t('bookDetails')} />
          <SmallText
            text={bookingNumber ? bookingNumber : 'Null'}
            alignSelf="flex-end"
          />
        </View>
        <SemiTitle title={name ? name : 'null'} />
        <SmallText text={address ? address : 'Null'} alignSelf="flex-start" />
        <View style={{...styles.row, marginTop: hp(3), marginBottom: hp(3)}}>
          <SemiMediumTitle title={date ? date : 'Null'} />
          <View style={styles.itemBg}>
            <SmallTitle title={time ? time : 'Null'} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default BookingDetailScreen;
