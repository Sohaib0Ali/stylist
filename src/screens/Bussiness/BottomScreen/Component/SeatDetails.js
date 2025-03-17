import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RectangleView from './RectangleView';
import LInput from '../Component/LInput';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import Button from '../../../../BusinessUtills/components/Button/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native';
import {t} from 'i18next';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import Translator from 'react-native-translator';
import {useSelector} from 'react-redux';
import {scale, verticalScale} from 'react-native-size-matters';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import AddWalk from './AddWalk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SeatDetails = seatData => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  let seatStylistId = seatData?.seatData?.seat?.stylistId;
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const foundItem = StyList.find(item => item?._id == seatStylistId);
  const [seatServiceValidError, setSeatServiceValidError] = useState('');
  const [service, setService] = useState(foundItem?.fullName);
  const [arabicLaguage, setArabicLaguage] = useState('');
  const [franchLaguage, setFranchLaguage] = useState('');
  const [selectedFinance, setSelectedFinance] = useState(false);
  const [selectedAppoiments, setSelectedAppoiments] = useState(false);
  const [today, setToday] = useState([]);
  const [isShowView, setIsShowView] = useState(false);
  const [mainId, setMainId] = useState();
  const [data, SetData] = useState([]);
  const [oldSubId, SetOldSubId] = useState('');

  const getTypeOfServices = () => {
    var data = JSON.stringify({
      serviceId: mainId,
      salonId: MainBranch?.salon?._id,
    });
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getServiceTypeByService`,
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
          SetData(response.data.data);
          console.log('response.data.data', response.data.data);
        }
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    setService(foundItem?.fullName);
    getAllAppoinments();
    const id = foundItem.serviceIDArray.map(item => item.serviceId);
    setMainId(id);
  }, []);

  useEffect(() => {
    getTypeOfServices();
    const checkID = async () => {
      const subCatId = await AsyncStorage.getItem('SebCatID');
      const NewToken = JSON.parse(subCatId);
      const itemSubCategories = NewToken.flatMap(item => item.subCategory); // Flatten the array of subCategories
      SetOldSubId(itemSubCategories);

      const matchingNames = [];

      itemSubCategories.forEach(subCat => {
        const matchingItem = data.find(item => item._id === subCat);
        if (matchingItem) {
          matchingNames.push(matchingItem.name);
        }
      });
    };

    checkID();
  }, [mainId]);

  const financeBackgroundColor =
    selectedFinance === true ? colors.selected_yellow : colors.white;
  const appoimentBackgroundColor =
    selectedAppoiments === true ? colors.selected_yellow : colors.white;

  const handleValidsetSeatService = val => {
    if (val.length === 0) {
      setSeatServiceValidError(t('required'));
    } else if (val.length < 3) {
      setSeatServiceValidError(t('minimumChar'));
    } else if (val.length > 20) {
      setSeatServiceValidError(t('maxChar'));
    } else {
      setSeatServiceValidError('Done');
    }
  };

  const getAllAppoinments = () => {
    var data = '';
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getBookingsByStylistId/${seatStylistId}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          setToday(res?.data?.today);
        }
      })
      .catch(function (error) {});
  };

  return (
    <ScrollView
      bounces={true}
      style={{height: '100%'}}
      showsVerticalScrollIndicator={false}>
      {isShowView === false ? (
        <View style={styles.seatDetailsContainer}>
          <View style={{marginHorizontal: wp(5)}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.subTextHeading, {marginBottom: hp(2)}]}>
                Seat 1
              </Text>
              <TouchableOpacity
              // onPress={() => setIsShowView('All SeatDetails')}
              >
                <Text
                  style={[
                    styles.subTextHeading,
                    {
                      fontWeight: '500',
                      color: '#57429D',
                      marginRight: wp(2),
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  {'< Back'}
                </Text>
              </TouchableOpacity>
            </View>
            <Translator
              type="google"
              from="en"
              to="ar"
              value={foundItem?.fullName}
              onTranslated={test => {
                test == 'Enter a URL'
                  ? setArabicLaguage(' ')
                  : setArabicLaguage(test);
              }}
            />
            <Translator
              type="google"
              from="en"
              to="fr"
              value={foundItem?.fullName}
              onTranslated={test => {
                test == 'Enter a URL'
                  ? setFranchLaguage(' ')
                  : setFranchLaguage(test);
              }}
            />
            <LInput
              title={'Stylist'}
              //   onChange={(name)=>{

              //   }}
              onChangeText={name => {
                setService(name);
                handleValidsetSeatService(name);
                setArabicLaguage(name);
                setFranchLaguage(name);
              }}
              placeholder={'Seat Service '}
              value={service}
              textConinerstyle={{marginTop: hp(0)}}
              language={'English'}
            />
            {seatServiceValidError !== 'Done' &&
            seatServiceValidError !== '' ? (
              <SmallTitle
                title={seatServiceValidError}
                alignSelf="flex-start"
                color={colors.green}
                marginBottom={wp(4)}
                marginLeft={wp(5)}
                width={wp(80)}
              />
            ) : null}

            <LInput
              title={'Stylist'}
              onChangeText={text => setFranchLaguage(text)}
              placeholder={'Seat Service '}
              value={franchLaguage}
              textConinerstyle={{marginTop: hp(0)}}
              language={'*French'}
            />
            <LInput
              title={'Stylist'}
              onChangeText={text => setArabicLaguage(text)}
              placeholder={'Seat Service '}
              value={arabicLaguage}
              textConinerstyle={{marginTop: hp(0)}}
              language={'*Arabic'}
              direction={'RTL'}
            />
            <Text
              style={[
                styles.subTextHeading,
                {fontWeight: '500', marginLeft: wp(52), color: '#57429D'},
              ]}>
              + Add new service
            </Text>
            <LInput
              title={'Stylist'}
              onChangeText={text => setFranchLaguage(text)}
              placeholder={'Seat Service '}
              value={franchLaguage}
              textConinerstyle={{marginTop: hp(2)}}
              language={'*French'}
            />
            <View style={styles.addButton}>
              <Icon name="layers" size={16} color="#57429D" />
              <Text style={{fontWeight: '500', fontSize: 16, color: '#57429D'}}>
                Add
              </Text>
            </View>
            <Text style={[styles.subTextHeading, {marginTop: hp(1)}]}>
              Appointments & Finance
            </Text>
            <TouchableOpacity
              onPress={() => setSelectedAppoiments(!selectedAppoiments)}>
              <RectangleView
                heading={'Appointments'}
                subHeading={'See all todays appointments '}
                number={'9'}
                backgroundColor={appoimentBackgroundColor}
              />
            </TouchableOpacity>
            {selectedAppoiments === true ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    height: hp(8),
                    shadowColor: '#000000',
                    shadowOffset: {width: -2, height: 5},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    marginTop: hp(1),
                  }}>
                  <View style={{alignSelf: 'center', width: '70%'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        textAlign: 'left',
                        color: '#27232C',
                        marginStart: scale(25),
                      }}>
                      Bidal MakeUp
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        extAlign: 'left',
                        color: '#5E5E5F',
                        marginTop: 5,
                        marginStart: scale(25),
                      }}>
                      9:30am
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        color: colors.black,
                        marginEnd: scale(20),
                      }}>
                      DH 40
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
            <TouchableOpacity
              onPress={() => setSelectedFinance(!selectedFinance)}>
              <RectangleView
                heading={'Finance'}
                subHeading={'Aprox 30 minutes'}
                number={'10'}
                backgroundColor={financeBackgroundColor}
              />
            </TouchableOpacity>
            {selectedFinance === true ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    height: hp(8),
                    shadowColor: '#000000',
                    shadowOffset: {width: -2, height: 5},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    marginTop: hp(1),
                  }}>
                  <View style={{alignSelf: 'center', width: '70%'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        textAlign: 'left',
                        color: '#27232C',
                        marginStart: scale(25),
                      }}>
                      Bidal MakeUp
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        extAlign: 'left',
                        color: '#5E5E5F',
                        marginTop: 5,
                        marginStart: scale(25),
                      }}>
                      9:30am
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        color: colors.black,
                        marginEnd: scale(20),
                      }}>
                      DH 40
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
            <Button
              buttonText={'Add Walk-In Appointment'}
              width="90%"
              marginTop={hp(2)}
              marginBottom={verticalScale(350)}
              onPress={() => setIsShowView(true)}
            />
          </View>
        </View>
      ) : (
        <AddWalk />
      )}
    </ScrollView>
  );
};

export default SeatDetails;

const styles = StyleSheet.create({
  seatDetailsContainer: {
    height: '100%',
    // marginTop: hp(-9),
    width: '100%',
    backgroundColor: 'white',
    // height: 200,
  },
  subTextHeading: {
    color: '#5E5E5F',
    fontSize: 16,
    fontWeight: '400',
  },
  addButton: {
    height: 45,
    width: 90,
    marginLeft: wp(65),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#56429D',
    borderRadius: 15,
  },
});
