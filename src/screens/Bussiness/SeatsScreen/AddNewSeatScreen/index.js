//================================ React Native Imported Files ======================================//

import React, {useState, useRef} from 'react';
import {View, SafeAreaView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import Input from '../../../../BusinessUtills/components/Input/Input';
import BackIcon from '../../../../BusinessUtills/components/BackIcon/BackIcon';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import Button from '../../../../BusinessUtills/components/Button/Button';
import StylistPickerComponent from '../../../../BusinessUtills/components/Business Components/StylistPicker/StylistPickerComponent';
import PickerComponent from '../../../../BusinessUtills/components/PickerComponent/PickerComponent';
import RBSheet from 'react-native-raw-bottom-sheet';
import BConfig from '../../../../BusinessUtills/config/config';
import {showDanger, showWarning} from '../../../../../Utils/FlashMessage';

const AddNewSeatScreen = ({}) => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const navigation = useNavigation();
  const [seatNum, setSeatNum] = useState('');
  const [stylistName, setStylistName] = useState(
    StyList[0]?.firstName
      ? StyList[0]?.firstName + ' ' + StyList[0]?.lastName
      : '',
  );
  const refRBSheet = useRef();
  const {t} = useTranslation();
  const [stylistId, setStyistId] = useState(
    StyList[0]?._id ? StyList[0]?._id : '',
  );

  const [seatNoValidError, setSeatNoValidError] = useState('');
  const handleValidseatNo = val => {
    let reg = /^[-+]?[0-9]+$/;
    if (val.length === 0) {
      setSeatNoValidError(t('pleaseEnterSeat'));
    } else if (reg.test(val) === false) {
      setSeatNoValidError(t('seatNumberOnlyNumbers'));
    } else if (reg.test(val) === true) {
      setSeatNoValidError(t('done'));
    }
  };

  const addSeat = () => {
    if (seatNoValidError === 'Done') {
      var data = JSON.stringify({
        seatNo: seatNum,
        stylistId: stylistId,
        salonId: MainBranch?.salon?._id,
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BConfig.baseUrl}/business/addseat`,
        headers: {
          Authorization: `Bearer ${BConfig.token}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          let res = response.data;
          if (res.success) {
            navigation.goBack();
          }
        })
        .catch(function (error) {
          showDanger(error?.response?.data?.msg);
        });
    } else {
      showWarning(t('pleaseEnterSeat'));
    }
  };

  return (
    <SafeAreaView>
      <BackIcon />
      <View style={{backgroundColor: colors.white, height: hp(100)}}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: wp(0),
            marginBottom: hp(1),
          }}>
          <View>
            <SemiMediumTitle
              title={t('addSeats')}
              fontSize={wp(7.1)}
              marginLeft={wp(5)}
            />
          </View>
        </View>

        <View
          style={{paddingHorizontal: wp(5.5), backgroundColor: colors.white}}>
          <View>
            <Input
              value={seatNum}
              keyboardType="numeric"
              onChangeText={val => {
                setSeatNum(val), handleValidseatNo(val);
              }}
              title={t('seatNum')}
              placeholder={t('seatPlaceHolder')}
            />
          </View>
          {seatNoValidError !== 'Done' && seatNoValidError !== '' ? (
            <SmallTitle
              title={seatNoValidError}
              alignSelf="flex-start"
              color={colors.green}
              marginBottom={wp(4)}
              marginLeft={wp(5)}
              width={wp(80)}
            />
          ) : null}
          <PickerComponent
            paddingHorizontal={wp(3.1)}
            value={stylistName}
            title={t('stylist')}
            direction="LTR"
            onPress={() => refRBSheet.current.open()}
          />

          <RBSheet
            height={hp(38)}
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              container: {
                borderTopLeftRadius: wp(4),
                borderTopRightRadius: wp(4),
              },
              draggableIcon: {
                backgroundColor: colors.borderColor,
              },
            }}>
            <StylistPickerComponent
              getCountValue={selectedStylist => {
                setStyistId(StyList[selectedStylist]?._id);
                setStylistName(
                  StyList[selectedStylist].firstName +
                    ' ' +
                    StyList[selectedStylist].lastName,
                );
              }}
              onPressLeft={() => refRBSheet.current.close()}
              onPressRight={() => refRBSheet.current.close()}
            />
          </RBSheet>

          <Button
            buttonText={t('add')}
            width="100%"
            marginTop={hp(4.1)}
            onPress={() => {
              addSeat();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AddNewSeatScreen;
