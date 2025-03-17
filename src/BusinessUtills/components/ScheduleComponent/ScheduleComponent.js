//================================ React Native Imported Files ======================================//

import React from 'react';
import {View} from 'react-native';

import styles from './style';
import MediumTitle from '../MediumTitle/MediumTitle';
import Divider from '../Divider/divider';
import SimpleText from '../SimpleText/SimpleText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';

const ScheduleComponent = ({schedule}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.dayTimeBg}>
          <SimpleText text={schedule.day.join(', ')} alignSelf="flex-start" />
          <MediumTitle
            title={schedule.from + ' - ' + schedule.to}
            alignSelf="flex-start"
          />
        </View>
        <Divider height={wp(0.5)} marginBottom={wp(2)} />

        <View style={styles.dayTimeBg}>
          <SimpleText
            text={schedule.dayOff.join(', ')}
            alignSelf="flex-start"
          />
          <MediumTitle title={t('dayOff')} alignSelf="flex-start" />
        </View>
      </View>
    </View>
  );
};

export default ScheduleComponent;
