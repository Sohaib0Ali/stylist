//================================ React Native Imported Files ======================================//

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../BusinessUtills/components/Header/Header';
import SemiTitle from '../../../BusinessUtills/components/SemiTitle';
import GraphComponent from '../../../BusinessUtills/components/GraphComponent/GraphComponent';
import SimpleText from '../../../BusinessUtills/components/SimpleText/SimpleText';
import forwardIcon from '../../../BusinessUtills/assets/icons/nextArrow.png';
import Divider from '../../../BusinessUtills/components/Divider/divider';
import fonts from '../../../BusinessUtills/assets/fonts/fonts';
import PickerComponent from '../../../BusinessUtills/components/PickerComponent/PickerComponent';
import RBSheet from 'react-native-raw-bottom-sheet';
import PositionPickerComponent from '../../../BusinessUtills/components/PositionPicker/PositionPickerComponent';
import colors from '../../../BusinessUtills/assets/colors/colors';
import {useTranslation} from 'react-i18next';

const FinanceDetail = props => {
  let finance = props?.route?.params?.finance;
  let totalFinance = props?.route?.params?.totalFinance;
  const scrollViewRef = useRef(null);
  const [duration, setDuration] = useState('This week');
  const refRBSheet = useRef();
  const {t} = useTranslation();

  return (
    <View style={styles.mainContainer}>
      {Platform.OS === 'ios' && (
        <View
          style={{height: StatusBar.height, backgroundColor: '#57429D'}}></View>
      )}
      <StatusBar backgroundColor={'#57429D'} />
      <Header
        direction={'RTL'}
        headerColor={'white'}
        headerBack={true}
        onBackPress={() => props.navigation.goBack()}
      />
      <ScrollView
        ref={scrollViewRef}
        onScrollBeginDrag={() => {
          Keyboard.dismiss();
        }}
        showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              paddingHorizontal: wp(4),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: hp(1.5),
            }}>
            <SemiTitle title="Finance" />

            <PickerComponent
              value={duration}
              direction="LTR"
              onPress={() => refRBSheet.current.open()}
            />
          </View>
          <GraphComponent
            data={finance}
            onPress={(item, index) => {
              alert(item.value);
            }}
          />
        </View>
        <View style={{marginHorizontal: wp(4.1), marginVertical: hp(2.1)}}>
          <TouchableOpacity
            style={styles.body}
            onPress={() => props.navigation.navigate('PAYMENT_REPORT_SCREEN')}>
            <SimpleText
              text={t('payrollReport')}
              alignSelf="flex-start"
              color={'#000000'}
              fontSize={wp(4.1)}
            />
            <View style={{width: wp(5), height: wp(4)}}>
              <Image
                source={forwardIcon}
                style={{height: '100%', width: '100%'}}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <Divider marginTop={hp(-0.5)} />
        </View>
        <SemiTitle
          paddingHorizontal={wp('4')}
          title="Clients"
          marginTop={hp(3.1)}
        />
        <View style={styles.clients}>
          <View style={styles.clientsBox}>
            <SimpleText
              text={totalFinance?.totalwalkClients}
              color={'#44AC99'}
              fontFamily={fonts.bold}
              fontSize={22}
            />
            <SimpleText text={t('wakedIn')} fontSize={13} />
          </View>
          <View style={styles.clientsBox}>
            <SimpleText
              text={totalFinance?.totalClients}
              color={'#44AC99'}
              fontFamily={fonts.bold}
              fontSize={22}
            />
            <SimpleText text={t('throughApp')} fontSize={13} />
          </View>
        </View>
        <SemiTitle
          paddingHorizontal={wp('4')}
          title="Profit"
          marginTop={hp(3.1)}
        />
        <View style={styles.clients}>
          <View style={styles.ProfitBox}>
            <SimpleText
              text={totalFinance?.totalwalkAmount}
              color={'#57429D'}
              fontFamily={fonts.bold}
              fontSize={22}
            />
            <SimpleText text={t('wakedIn')} fontSize={13} />
          </View>
          <View style={styles.ProfitBox}>
            <SimpleText
              text={totalFinance?.totalAmount}
              color={'#57429D'}
              fontFamily={fonts.bold}
              fontSize={22}
            />
            <SimpleText text={t('throughApp')} fontSize={13} />
          </View>
        </View>
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

export default FinanceDetail;
