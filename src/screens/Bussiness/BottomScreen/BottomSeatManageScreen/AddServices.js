import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import { scale } from 'react-native-size-matters';
import Button from '../../../../BusinessUtills/components/Button/Button';
import AddNewServices from './AddNewServices';
import ServiceType from './ServiceType';
import { useIsFocused } from '@react-navigation/native';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import ShowServices from './ShowServices';
import { useDispatch, useSelector } from 'react-redux';
import { SALON_SERVICES } from '../../../../../redux/store/actions/salons_Actions';
import { showWarning } from '../../../../../Utils/FlashMessage';
import { t } from 'i18next';

const AddServices = () => {
  const dispatch = useDispatch();
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const [isChooseServices, setIsChooseServices] = useState(null);
  const [isDesable, setIsDesable] = useState(false);
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [serviceType, setServiceType] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [addNewTreatment, setaddNewTreatment] = useState('');
  let Dummydata = [];

  useEffect(() => {
    if (isFocused) {
      getAllServices();
      getServiceType(MainBranch?.salon?._id);
    }
  }, [isFocused]);
  const getServiceType = salonId => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getServiceType/${salonId}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          setServiceData(res.data);
        }
      })
      .catch(function (error) { });
  };
  const getServiceData = id => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getServiceBySalon/${id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        const res = response.data;
        if (res.succes) {
          dispatch({ type: SALON_SERVICES, payload: res?.data });
        }
      })
      .catch(function (error) { });
  };
  if (Array.isArray(data)) {
    Dummydata = [
      {
        _id: 'AddDATA',
        approxtime: '30 min',
        category: '637776b978275e0ccd9104fc',
        createdAt: '2023-04-24T11:34:11.354Z',
        currency: 'MAD',
        description: 'hy we do cutting',
        icon: 'https://komb.s3.us-east-2.amazonaws.com/haircut.png',
        price: 30,
        servname: 'Cut',
        status: true,
        updatedAt: '2023-04-20T12:18:26.128Z',
      },
      ...data,
    ];
  }

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
          setData(data?.data);
          if (data.data.length > 0) {
            getTypeOfServices(data.data[0]._id);
          } else {
            showWarning(t('noServiceFound'));
          }
        }
      })
      .catch(error => { });
  };

  const getTypeOfServices = id => {
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
      .catch(function (error) { });
  };

  const renderItemServices = item => {
    const backgroundColor =
      item._id === isChooseServices ? '#57429D' : colors.borderColor;
    if (item?._id === 'AddDATA') {
      return (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginLeft: scale(10),
          }}
          onPress={() => {
            setSelectedValue(item._id), setIsChooseServices(item._id);
            getTypeOfServices(item._id);
          }}>
          <View
            style={[
              styles.iconBG,
              {
                backgroundColor: '#57429D',
                borderColor: backgroundColor,
              },
            ]}>
            <Image style={styles.imgIcon} source={icons.addServicesBtn} />
          </View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: '#27232C',
              marginTop: scale(7),
            }}>
            New
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginLeft: scale(10),
          }}
          onPress={() => {
            setSelectedValue(item._id), setIsChooseServices(item._id);
            getTypeOfServices(item._id);
          }}>
          {item._id === isChooseServices ? (
            <View
              style={{
                position: 'absolute',
                zIndex: 1,
                top: scale(0),
                right: scale(3),
                backgroundColor: '#FF3B3B',
                width: scale(15),
                height: scale(15),
                borderRadius: 100,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 12,
                  lineHeight: scale(15),
                }}>
                {serviceType.length}
              </Text>
            </View>
          ) : null}
          <View
            style={[
              styles.iconBG,
              {
                borderColor: backgroundColor,
              },
            ]}>
            <Image style={styles.imgIcon} source={{ uri: item?.icon }} />
          </View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: '#27232C',
              marginTop: scale(7),
            }}>
            {item?.servname}
          </Text>
        </TouchableOpacity>
      );
    }
  };
  const onPressCancle = useCallback(event => {
    if (event === true) {
      setSelectedValue('');
      setIsDesable(false);
    }
  }, []);

  const onaddnewTreatment = useCallback(serviceid => {
    setSelectedValue(''), setIsDesable(false), setaddNewTreatment(serviceid);
  }, []);

  const ChooseServices = () => {
    switch (selectedValue) {
      case 'AddDATA':
        return <AddNewServices onCancle={onPressCancle} />;
      case '636b45d3a0dbeac1f95cab81':
        return (
          <ShowServices
            Data={serviceType}
            ServiceType={'Cut'}
            onAddNewTreatment={() => onaddnewTreatment(selectedValue)}
          />
        );
      case '636b514ea0dbeac1f95cab8c':
        return (
          <ShowServices
            Data={serviceType}
            ServiceType={'Cut'}
            onAddNewTreatment={() => onaddnewTreatment(selectedValue)}
          />
        );
      case '636b4d36a0dbeac1f95cab88':
        return (
          <ShowServices
            Data={serviceType}
            ServiceType={'Cut'}
            onAddNewTreatment={() => onaddnewTreatment(selectedValue)}
          />
        );
      case '636b5110a0dbeac1f95cab8b':
        return (
          <ShowServices
            Data={serviceType}
            ServiceType={'Cut'}
            onAddNewTreatment={() => onaddnewTreatment(selectedValue)}
          />
        );
      case '6377733b08b446c4868aac95':
        return (
          <ShowServices
            Data={serviceType}
            ServiceType={'Cut'}
            onAddNewTreatment={() => onaddnewTreatment(selectedValue)}
          />
        );
      case '637780b23e786e8f5dc3ecb6':
        return (
          <ShowServices
            Data={serviceType}
            ServiceType={'Cut'}
            onAddNewTreatment={() => onaddnewTreatment(selectedValue)}
          />
        );
      default:
        return null;
    }
  };
  const AddNewServicesData = () => {
    switch (addNewTreatment) {
      case 'AddDATA':
        return <AddNewServices onCancle={onPressCancle} />;
      case '636b45d3a0dbeac1f95cab81':
        return <ServiceType SType={addNewTreatment} Oncancle={onPressCancle} />;
      case '636b514ea0dbeac1f95cab8c':
        return <ServiceType SType={addNewTreatment} Oncancle={onPressCancle} />;
      case '636b4d36a0dbeac1f95cab88':
        return <ServiceType SType={addNewTreatment} Oncancle={onPressCancle} />;
      case '636b5110a0dbeac1f95cab8b':
        return <ServiceType SType={addNewTreatment} Oncancle={onPressCancle} />;
      case '6377733b08b446c4868aac95':
        return <ServiceType SType={addNewTreatment} Oncancle={onPressCancle} />;
      case '637780b23e786e8f5dc3ecb6':
        return <ServiceType SType={addNewTreatment} Oncancle={onPressCancle} />;
      default:
        return null;
    }
  };
  return (
    <View style={{ marginTop: hp(0), backgroundColor: 'white' }}>
      <View style={{ marginHorizontal: wp(6) }}>
        <Text style={[styles.subTextHeading, { marginTop: hp(1) }]}>
          Select service type
        </Text>
        <View>
          <FlatList
            data={Dummydata}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => renderItemServices(item, index)}
            style={{ marginTop: hp(2) }}
          />
        </View>
        {ChooseServices()}
        {AddNewServicesData()}
        {!isDesable ? (
          <Button
            buttonText={'Add Service'}
            width="90%"
            disabled={!isDesable}
            bgColor={!isDesable ? '#F2F0FA' : '#57429D'}
            textColor={!isDesable ? '#AEA2D6' : 'white'}
            marginTop={hp(29)}
          />
        ) : null}
      </View>
    </View>
  );
};

export default AddServices;

const styles = StyleSheet.create({
  subTextHeading: {
    color: '#5E5E5F',
    fontSize: 16,
    fontWeight: '400',
  },
  imgIcon: {
    height: hp(15),
    width: wp(15),
    resizeMode: 'contain',
  },
  iconBG: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp(0.5),
    borderRadius: 100,
    width: 60, //wp(42),
    height: 60, //wp(55),
  },
});
