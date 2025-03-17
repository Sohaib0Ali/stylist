//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SemiTitle from '../../../../BusinessUtills/components/SemiTitle';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import DropdownMenu from '../../BottomScreen/Component/DropdownMenu';
import {useDispatch} from 'react-redux';
import {SET_WORK_STATUS} from '../../../../../redux/store/actions/ApiData';

const WorkStatusData = [
  {
    _id: 1,
    name: 'Available',
  },
  {
    _id: 2,
    name: 'Day off',
  },
  {
    _id: 3,
    name: 'Before 12 PM',
  },
  {
    _id: 4,
    name: 'After 12 PM',
  },
];

const InfoScreen = ({data, stylistDATA}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [workStatus, setworkStatus] = useState(stylistDATA?.status);

  const chnageMasterStatus = () => {
    if (workStatus !== undefined) {
      dispatch({type: SET_WORK_STATUS, payload: workStatus});
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.historyBox}>
            <View style={styles.historyItem}>
              <Text style={{color: '#5E5E5F'}}>{t('experience')}</Text>
              <Text style={{color: 'black'}}>
                {data?.experience ? data?.experience : t('trainee')}
              </Text>
            </View>
            <View style={styles.historyItem}>
              <Text style={{color: '#5E5E5F'}}>{t('employedSince')}</Text>
              <Text style={{color: 'black'}}>
                {data?.employedSince
                  ? moment(data?.employedSince).format('DD MMM, YYYY')
                  : t('noRecord')}{' '}
              </Text>
            </View>
          </View>
          <SemiTitle title={t('numJobs')} marginBottom={hp(1.5)} />
          <View style={{flexDirection: 'row'}}>
            <View style={styles.jobBox}>
              <Text style={styles.jobBoxQ}>{data?.todayBooking}</Text>
              <Text style={styles.jobBoxP}>{t('today')}</Text>
            </View>
            <View style={styles.jobBox}>
              <Text style={styles.jobBoxQ}>{data?.weeklyBooking}</Text>
              <Text style={styles.jobBoxP}>{t('weekly')}</Text>
            </View>
            <View style={styles.jobBox}>
              <Text style={styles.jobBoxQ}>{data?.monthlyBooking}</Text>
              <Text style={styles.jobBoxP}>{t('monthly')}</Text>
            </View>
          </View>
          <DropdownMenu
            title={t('Current work status')}
            placeholder={workStatus === undefined ? 'Available' : workStatus}
            slectedserviceName={setworkStatus}
            available={setworkStatus}
            value={workStatus}
            Data={WorkStatusData}
            singleselect={true}
            isindex={'NO NEED'}
            textConinerstyle={{marginTop: hp(0)}}
          />

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  workStatus === 'Day off' ? '#F2F0FA' : '#57429D',
              },
            ]}
            onPress={() => chnageMasterStatus()}>
            <Text
              style={[
                styles.buttonText,
                {color: workStatus === 'Day off' ? '#AEA2D6' : '#FFFFFF'},
              ]}>
              {t('weeklyStylist')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default InfoScreen;
