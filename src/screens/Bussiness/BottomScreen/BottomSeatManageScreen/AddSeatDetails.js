import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SelectGender from '../Component/SelectGender';
import {TouchableOpacity} from 'react-native';
import Button from '../../../../BusinessUtills/components/Button/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale, verticalScale} from 'react-native-size-matters';
import ServiceList from '../Component/ServiceList';
import axios from 'axios';
import BConfig from '../../../../BusinessUtills/config/config';
import DropdownMenu from '../Component/DropdownMenu';
import {t} from 'i18next';
import {ScrollView} from 'react-native-gesture-handler';
import PickerComponent from '../../../../BusinessUtills/components/PickerComponent/PickerComponent';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import StylistPickerComponent from '../../../../BusinessUtills/components/Business Components/StylistPicker/StylistPickerComponent';
import {useSelector} from 'react-redux';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {showSuccess} from '../../../../../Utils/FlashMessage';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddSeatDetails = () => {
  const navigation = useNavigation();
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const SeatData = useSelector(state => state?.SalonDetails?.SeatData);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const [selectedGender, setSelectedGender] = useState('Unisex');
  const [seatActive, setIsSeatActive] = useState('');
  const [stylist, setStylist] = useState('');
  const [massage, setMassage] = useState('');
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [servName, setServeName] = useState();
  const [serviceType, setServiceType] = useState([]);
  const [serviceID, setServiceID] = useState();
  let [selectedId, setSelectedId] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const refRBSheet = useRef();
  const [stylistId, setStyistId] = useState(
    StyList[0]?._id ? StyList[0]?._id : '',
  );

  // useEffect(() => {
  //   const setSubId = async () => {
  //     console.log('JSON.stringify(selectedId)', JSON.stringify(selectedId));
  //     await AsyncStorage.setItem('SebCatID', JSON.stringify(selectedId));
  //   };
  //   setSubId();
  // }, [selectedId]);

  useEffect(() => {
    getAllServices();
  }, []);

  const onSelectGender = gender => {
    setSelectedGender(gender);
  };
  const onSelect = value => {
    setIsSeatActive(value);
  };

  const getAllServices = () => {
    axios
      .get(`${BConfig.baseUrl}getAllService`, {
        headers: {
          Authorization: `Bearer ${BConfig.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const data = response.data;
        if (data.success) {
          setData(data.data);
          if (data.data.length > 0) {
            setSelectedValue(data.data[0]._id);
            setServeName(data.data[0].servname);
            getTypeOfServices(data.data[0]._id);
          } else {
            showWarning(t('noServiceFound'));
          }
        }
      })
      .catch(error => {});
  };

  const getTypeOfServices = id => {
    setServiceID(id);
    var data = JSON.stringify({
      serviceId: id,
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
          setServiceType(response.data.data);
        }
      })
      .catch(function (error) {});
  };
  const handleData = data => {
    setSelectedId(data);
  };
  const addSeat = () => {
    let Seatdata = SeatData;
    setShowLoader(true);
    const data = JSON.stringify({
      seatNo: SeatData?.length + 1,
      stylistId: stylistId,
      gender: selectedGender,
      activateSeat: seatActive,
      salonId: MainBranch?.salon?._id,
      serviceTypeData: selectedId,
    });
    const config = {
      method: 'post',
      url: `${BConfig.baseUrl}business/addseat`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(async function (response) {
        let res = response.data;
        if (res.success) {
          showSuccess('Add seat successFully');
          await AsyncStorage.setItem('SebCatID', JSON.stringify(selectedId));
          navigation.navigate('DashboardScreen', {
            screenType: 'Screen_A',
          });
          setShowLoader(false);
        } else {
          setShowLoader(false);
        }
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        marginTop: hp(2),
        marginHorizontal: hp(0),
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: wp(5)}}>
          <Text style={styles.subTextHeading}>Seat oprator</Text>

          <PickerComponent
            paddingHorizontal={wp(3.1)}
            value={stylist}
            title={t('stylist')}
            direction="LTR"
            onPress={() => {
              StyList != ''
                ? refRBSheet.current.open()
                : refRBSheet.current.close();
            }}
          />

          {StyList == '' ? (
            <View style={styles.alertView}>
              <View style={styles.alertBG}>
                <Text style={{color: 'white'}}>!</Text>
              </View>
              <Text style={{color: '#DE4C5B', marginLeft: scale(16)}}>
                No stylist list created
              </Text>
            </View>
          ) : null}
          <Text style={styles.subTextHeading}>Seat treatment offering</Text>
          <SelectGender
            genderVieStyle={{marginTop: hp(1)}}
            onSelectValue={onSelectGender}
          />
          <View style={{marginTop: hp(2)}}>
            <Text style={[styles.subTextHeading, {}]}>Seat service types</Text>
            <ServiceList
              Data={data}
              selectedSrvName={setMassage}
              getTypeOfServices={getTypeOfServices}
              servicetype={serviceType}
            />
          </View>
          <DropdownMenu
            title={t('Available treatments')}
            placeholder={
              serviceType != '' ? 'Please select' : 'Please add treatment'
            }
            serviceId={serviceID}
            Data={serviceType}
            textConinerstyle={{marginTop: hp(3)}}
            onPassData={handleData}
          />

          <Text style={[styles.subTextHeading]}>Activate seat</Text>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => onSelect('Yes')}>
              {seatActive === 'Yes' ? (
                <View style={styles.radioSelected} />
              ) : (
                <View style={styles.radioNotselect} />
              )}
              <Text style={styles.radioText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => onSelect('No')}>
              {seatActive === 'No' ? (
                <View style={styles.radioSelected} />
              ) : (
                <View style={styles.radioNotselect} />
              )}
              <Text style={styles.radioText}>No</Text>
            </TouchableOpacity>
          </View>
          <Button
            buttonText={'Add Seat'}
            width="90%"
            marginTop={hp(4)}
            marginBottom={verticalScale(350)}
            onPress={() => {
              addSeat();
            }}
          />
        </View>
      </ScrollView>

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
            setStyistId(StyList[selectedStylist]._id);
            setStylist(StyList[selectedStylist].fullName);
          }}
          onPressLeft={() => refRBSheet.current.close()}
          onPressRight={() => refRBSheet.current.close()}
        />
      </RBSheet>
      <CustomeLoader visible={showLoader} />
    </View>
  );
};

export default AddSeatDetails;

const styles = StyleSheet.create({
  subTextHeading: {
    color: '#5E5E5F',
    fontSize: 16,
    fontWeight: '400',
    marginTop: scale(8),
  },
  addButton: {
    height: scale(45),
    width: scale(90),
    marginLeft: wp(65),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#56429D',
    borderRadius: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: scale(115),
    marginTop: hp(1),
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
  },
  radioNotselect: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#848286',
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#27232C',
  },
  alertView: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: scale(33),
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 0,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
  },
  alertBG: {
    height: scale(15),
    marginLeft: scale(12),
    width: 15,
    borderRadius: 100,
    backgroundColor: '#FF6C6C',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A10606',
  },
});
