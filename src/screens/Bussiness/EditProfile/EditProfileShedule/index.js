//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Button from '../../../../BusinessUtills/components/Button/Button';

//================================ Local Imported Files ======================================//

import styles from './style';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {xorBy} from 'lodash';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import {useTranslation} from 'react-i18next';

const ScheduleScreen = ({data}) => {
  const navigation = useNavigation();
  const [selectedDays, setSelectedDays] = useState(null);
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.body}
        onPress={() =>
          navigation.navigate('EDIT_TIME_AND_DATE', {
            data: data,
          })
        }>
        <View style={styles.lableSlot}>
          <SimpleText
            text={t('OpenDays')}
            alignSelf="flex-start"
            color={'#000000'}
            fontSize={wp(4.1)}
          />
        </View>
        <View style={styles.dayTimeBg}>
          <View>
            <SimpleText
              color={'#5E5E5F'}
              fontSize={wp(3.7)}
              text={data?.schedule?.day.join(', ')}
              alignSelf={'flex-end'}
              multiline
              width={wp(45)}
            />
            <SimpleText
              color={'#5E5E5F'}
              fontSize={wp(3.7)}
              text={data?.schedule?.from + ' - ' + data?.schedule?.to}
              alignSelf={'flex-end'}
              width={wp(45)}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Image
              style={{width: wp(2), height: hp(1.6), tintColor: colors.black}}
              source={icons.next}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.body}>
        <View style={styles.lableSlot}>
          <SimpleText
            text={t('dayOff')}
            alignSelf="flex-start"
            color={'#000000'}
            fontSize={wp(4.1)}
          />
        </View>
        <View style={styles.dayTimeBg}>
          <View>
            <SimpleText
              color={'#5E5E5F'}
              fontSize={wp(3.7)}
              text={data?.schedule?.dayOff.join(', ')}
              alignSelf={'flex-end'}
              multiline
              width={wp(45)}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Image
              style={{width: wp(2), height: hp(1.6), tintColor: colors.black}}
              source={icons.next}
            />
          </View>
        </View>
      </View>

      {!data ? (
        <View style={{alignItems: 'center'}}>
          <Button
            marginTop={hp(5)}
            marginBottom={hp(11)}
            buttonText={t('addMoreDays')}
            onPress={() => navigation.navigate('EDIT_TIME_AND_DATE')}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ScheduleScreen;
