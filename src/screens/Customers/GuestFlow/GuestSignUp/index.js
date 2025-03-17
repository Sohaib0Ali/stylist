//================================ React Native Imported Files ======================================//

import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Image} from 'react-native';

//================================ Local Imported Files ======================================//
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DarkHeader from '../../../../components/Barber/DarkHeader/DarkHeader';
import colors from '../../../../assets/colors/colors';
import Button from '../../../../components/Button/Button';
import icons from '../../../../assets/icons/icons';
import {useTranslation} from 'react-i18next';
const GuestSignUpScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const refRBSheet = useRef();
  const [guestInfo, setGuestInfo] = useState(route.params);
  const [text, setText] = useState('');
  const [fullText, setFullText] = useState('Do you want to sign up?');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText?.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 10);
    }
  }, [index]);

  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <DarkHeader onPress={() => refRBSheet.current.open()} />
      <View style={styles.mapBg}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.55)',
          width: wp(100),
          bottom: 0,
          height: hp(110),
        }}>
        <View style={styles.bottomContainer}>
          <View style={styles.toolTipBg}>
            <View style={styles.otherContainer}>
              <View style={styles.talkBubble}>
                <View
                  style={styles.iconImageBg}
                  onPress={() => setIsVisible(!isVisible)}>
                  <Image
                    style={styles.img}
                    source={icons.snap}
                    resizeMode="contain"
                  />
                </View>
                <View style={{top: wp(1.5)}}>
                  <View style={styles.talkBubbleTriangle} />
                  <View style={styles.talkBubbleSquare}>
                    <Text style={styles.talkBubbleMessage}>{text}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(100),
              paddingHorizontal: wp('4%'),
            }}>
            <Button
              buttonText={t('signUp')}
              width="47%"
              onPress={() =>
                navigation.navigate('REGISTER_SCREEN', {guestInfo: guestInfo})
              }
            />
            <Button
              buttonText={t('notNow')}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{name: 'DISCOUNT_HOME'}],
                })
              }
              width="47%"
              bgColor={colors.white}
              textColor={colors.btnColor}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default GuestSignUpScreen;
