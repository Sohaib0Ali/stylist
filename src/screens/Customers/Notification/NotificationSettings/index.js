//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SemiTitle from '../../../../components/SemiTitle';
import colors from '../../../../assets/colors/colors';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import Header from '../../../../components/Header/Header';
import {Switch} from 'react-native-switch';
import Config from '../../../../config/config';
import axios from 'axios';
import {showSuccess} from '../../../../../Utils/FlashMessage';
import {useTranslation} from 'react-i18next';

const NotificatonSettingScreen = ({navigation, img}) => {
  const {t} = useTranslation();
  const [notifications, setNotifications] = useState(false);
  const [sound, setSound] = useState(Config.notificationSound);
  const [reminder, setReminder] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotificationInfo();
  }, []);

  const getNotificationInfo = async () => {
    setLoading(true);
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.baseUrl}getNotificationSetting`,
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          setNotifications(res.notification);
          setReminder(res.remainder);
        }
      })
      .catch(function (error) {});
  };

  const updateNotification = () => {
    var config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${Config.baseUrl}updateNotificationSetting`,
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          showSuccess(t('notificationSettingUpdated'));
        }
      })
      .catch(function (error) {});
  };

  const updateReminder = () => {
    var config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${Config.baseUrl}updateRemainderSetting`,
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          showSuccess(t('notificationRemindersUpdated'));
        }
      })
      .catch(function (error) {});
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <SemiTitle title="Notification settings" />
        <TouchableOpacity
          style={{...styles.itemContainer, marginTop: hp(3)}}
          activeOpacity={0.6}>
          <SimpleText
            text={t('notificationSettings')}
            alignSelf="flex-start"
            color={colors.black}
          />
          <Switch
            value={notifications}
            onValueChange={notifications => {
              setNotifications(notifications), updateNotification();
            }}
            disabled={false}
            circleSize={wp(8)}
            barHeight={wp(8.9)}
            circleBorderWidth={0}
            backgroundActive={colors.lightGreen}
            backgroundInactive={colors.checkBoxColor}
            circleActiveColor={colors.white}
            circleInActiveColor={colors.white}
            changeValueImmediately={true}
            innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}}
            outerCircleStyle={{}} // style for outer animated circle
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2}
            switchRightPx={2}
            switchWidthMultiplier={2}
            switchBorderRadius={wp(66)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.itemContainer, marginTop: hp(3)}}
          activeOpacity={0.6}>
          <SimpleText
            text={t('notificationSound')}
            alignSelf="flex-start"
            color={colors.black}
          />
          <Switch
            value={sound}
            onValueChange={sound => {
              setSound(sound), (Config.notificationSound = sound);
            }}
            disabled={false}
            circleSize={wp(8)}
            barHeight={wp(8.9)}
            circleBorderWidth={0}
            backgroundActive={colors.lightGreen}
            backgroundInactive={colors.checkBoxColor}
            circleActiveColor={colors.white}
            circleInActiveColor={colors.white}
            changeValueImmediately={true}
            innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}}
            outerCircleStyle={{}} // style for outer animated circle
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2}
            switchRightPx={2}
            switchWidthMultiplier={2}
            switchBorderRadius={wp(66)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.itemContainer, marginTop: hp(3)}}
          activeOpacity={0.6}>
          <SimpleText
            text={t('reminders')}
            alignSelf="flex-start"
            color={colors.black}
          />
          <Switch
            value={reminder}
            onValueChange={reminder => {
              setReminder(reminder), updateReminder();
            }}
            disabled={false}
            circleSize={wp(8)}
            barHeight={wp(8.9)}
            circleBorderWidth={0}
            backgroundActive={colors.lightGreen}
            backgroundInactive={colors.checkBoxColor}
            circleActiveColor={colors.white}
            circleInActiveColor={colors.white}
            changeValueImmediately={true}
            innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}}
            outerCircleStyle={{}} // style for outer animated circle
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2}
            switchRightPx={2}
            switchWidthMultiplier={2}
            switchBorderRadius={wp(66)}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NotificatonSettingScreen;
