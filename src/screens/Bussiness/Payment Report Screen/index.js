import React, {useState, useEffect, useRef} from 'react';
import {View, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Divider from '../../../../BusinessUtills/components/Divider/divider';
import Title from '../../../../BusinessUtills/components/Title/Title';
import SmallText from '../../../BusinessUtills/components/SmallText/SmallText';
import fonts from '../../../BusinessUtills/assets/fonts/fonts';
import RBSheet from 'react-native-raw-bottom-sheet';
import PositionPickerComponent from '../../../BusinessUtills/components/PositionPicker/PositionPickerComponent';
import Header from '../../../BusinessUtills/components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../BusinessUtills/assets/colors/colors';
import BConfig from '../../../BusinessUtills/config/config';
import axios from 'axios';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const PaymentReportScreen = () => {
  const navigation = useNavigation();
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const [duration, setDuration] = useState('This week');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const {t} = useTranslation();
  const refRBSheet = useRef();

  useEffect(() => {
    getFinanceReport();
  }, []);

  const getFinanceReport = () => {
    var data = '';
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}/business/getBookingPaymentHistory/${MainBranch?.salon?._id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          setPaymentHistory(res.data);
        }
      })
      .catch(function (error) {});
  };

  return (
    <View style={{flex: 1}}>
      <Header
        value={duration}
        direction={'RTL'}
        onBackPress={() => navigation.goBack()}
        headerColor={'white'}
        headerBack={true}
      />
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: wp(4.1),
          paddingVertical: hp(0.8),
          backgroundColor: '#FFFFFF',
        }}>
        <Title
          title={t('paymentHistory')}
          alignSelf={'baseline'}
          marginBottom={hp(2)}
        />
        {paymentHistory.length > 0
          ? paymentHistory?.map(item => {
              return (
                <View key={item._id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <SmallText
                        text={item?.serviceId?.servname}
                        fontSize={wp(3.5)}
                        color={'#5E5E5F'}
                        alignSelf={'baseline'}
                      />
                      <SmallText
                        text={item?.userId?.account}
                        fontSize={wp(4.1)}
                        color={'black'}
                        alignSelf={'baseline'}
                      />
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                      <View style={{flexDirection: 'row'}}>
                        <SmallText
                          text={item?.currency + ' '}
                          color={'black'}
                          fontFamily={fonts.bold}
                          fontSize={wp(4.1)}
                        />
                        <SmallText
                          text={item?.amount}
                          color={'black'}
                          fontFamily={fonts.bold}
                          fontSize={wp(4.1)}
                        />
                      </View>
                      <SmallText
                        text={
                          item?.stylistId?.firstName +
                          ' ' +
                          item?.stylistId?.lastName
                        }
                        fontSize={wp(3.5)}
                        color={'#5E5E5F'}
                        alignSelf={'flex-end'}
                      />
                      <SmallText
                        text={
                          moment(item?.bookingDateTime).format('DD ddd') +
                          ' at ' +
                          moment(item?.bookingDateTime).format('hh:mm A')
                        }
                        fontSize={wp(3.5)}
                        marginBottom={hp(2.1)}
                        color={'#5E5E5F'}
                      />
                    </View>
                  </View>
                  <Divider marginBottom={hp(2.5)} />
                </View>
              );
            })
          : null}
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
          <PositionPickerComponent
            getCountValue={selectedPosition => {
              setDuration(
                selectedPosition == 1
                  ? 'This week'
                  : selectedPosition == 2
                  ? 'This month'
                  : 'This week',
              );
            }}
            onPressLeft={() => refRBSheet.current.close()}
            onPressRight={() => refRBSheet.current.close()}
            type={true}
          />
        </RBSheet>
      </ScrollView>
    </View>
  );
};

export default PaymentReportScreen;
