//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Image} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import Button from '../../../../BusinessUtills/components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const ScheduleScreen = ({data, selectedIndex}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const schedule = data?.schedule;

  return (
    <View style={styles.container}>
      {schedule ? (
        <>
          <View style={styles.body}>
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
                  text={schedule?.day.join(', ')}
                  color={'#5E5E5F'}
                  textAlign={'right'}
                  fontSize={wp(3.7)}
                  alignSelf={'flex-end'}
                  multiline
                  width={wp(45)}
                />
                <SimpleText
                  color={'#5E5E5F'}
                  fontSize={wp(3.7)}
                  text={schedule?.from + ' - ' + schedule?.to}
                  alignSelf={'flex-end'}
                  width={wp(45)}
                  textAlign={'right'}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Image
                  style={{
                    width: wp(2),
                    height: hp(1.6),
                    tintColor: colors.black,
                  }}
                  source={icons.next}
                />
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.lableSlot}>
              <SimpleText
                text={t('dayOff')}
                alignSelf={'flex-start'}
                color={'#000000'}
                fontSize={wp(4.1)}
                textAlign={'right'}
              />
            </View>
            <View style={styles.dayTimeBg}>
              <View>
                <SimpleText
                  text={schedule?.dayOff.join(', ')}
                  color={'#5E5E5F'}
                  textAlign={'right'}
                  fontSize={wp(3.7)}
                  alignSelf={'flex-end'}
                  multiline
                  width={wp(45)}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Image
                  style={{
                    width: wp(2),
                    height: hp(1.6),
                    tintColor: colors.black,
                  }}
                  source={icons.next}
                />
              </View>
            </View>
          </View>
        </>
      ) : (
        <SimpleText text={t('notFound')} />
      )}
      <Button
        buttonText={t('addMoreDays')}
        bgColor={colors.white}
        TextStyle={{color: '#57429D'}}
        marginTop={hp(2.1)}
        borderColor={colors.white}
        isImageStyle={{marginHorizontal: wp(4.1)}}
        proProtfolio
        width={wp('60%')}
        onPress={() =>
          navigation.navigate('EDIT_TIME_AND_DATE', {
            data: data,
            stylistId: data?._id,
            selectedIndex: selectedIndex,
          })
        }
      />
    </View>
  );
};

export default ScheduleScreen;
