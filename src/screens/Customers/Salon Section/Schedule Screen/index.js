//================================ React Native Imported Files ======================================//

import React from 'react';
import {View} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import MediumTitle from '../../../../components/MediumTitle/MediumTitle';
import Divider from '../../../../components/Divider/divider';
import SemiTitle from '../../../../components/SemiTitle';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';
import fonts from '../../../../assets/fonts/fonts';
import {scale} from 'react-native-size-matters';

const ScheduleScreen = ({scheduleData}) => {
  const {t} = useTranslation();
  const days = scheduleData.salon.schedule.day.join(', ');
  const OffDays = scheduleData.salon.schedule.dayOff.join(', ');

  return (
    <View style={styles.container}>
      <SemiTitle
        title={t('workingHours')}
        fontFamily={fonts.Exo2light}
        weight={'600'}
        fontSize={scale(22)}
        marginLeft={scale(20)}
      />
      <View style={styles.body}>
        <View style={styles.dayTimeBg}>
          <SimpleText text={days} alignSelf="flex-start" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <MediumTitle
              title={scheduleData.salon.schedule.from}
              alignSelf="flex-start"
            />
            <MediumTitle title=" - " alignSelf="flex-start" />
            <MediumTitle
              title={scheduleData.salon.schedule.to}
              alignSelf="flex-start"
            />
          </View>
        </View>
        <Divider height={wp(0.5)} marginBottom={wp(2)} />

        <View style={styles.dayTimeBg}>
          <SimpleText text={OffDays} alignSelf="flex-start" />
          <MediumTitle title={t('dayOff')} alignSelf="flex-start" />
        </View>
      </View>
    </View>
  );
};

export default ScheduleScreen;
