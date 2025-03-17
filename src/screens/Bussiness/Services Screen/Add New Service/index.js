//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SemiTitle from '../../../../BusinessUtills/components/SemiTitle';
import ServiceComponent from '../../../../BusinessUtills/components/ServiceComponent/ServiceComponent';
import Button from '../../../../BusinessUtills/components/Button/Button';
import Header from '../../../../BusinessUtills/components/Header/Header';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';
import ServiceDetailComponent from '../../../../BusinessUtills/components/Business Components/Service Component/ServiceDetailComponent/ServiceDetailComponent';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import {showWarning} from '../../../../../Utils/FlashMessage';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const AddService = ({navigation, route}) => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  let checkAssign = route?.params?.checkAssign;
  let salonId = route?.params?.salonId;
  let stylistID = route?.params?.stylistId;
  const isFocused = useIsFocused();
  const [click, setClick] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [serviceType, setServiceType] = useState([]);
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const {t} = useTranslation();

  useEffect(() => {
    if (isFocused) {
      getAllServices();
    }
  }, [isFocused]);

  const getAllServices = () => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}getAllService`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          setData(response.data.data);
          if (response.data.data.length > 0) {
            setSelectedValue(response.data.data[0]._id);
            getTypeOfServices(response.data.data[0]._id);
          } else {
            showWarning(t('noServiceFound'));
          }
        }
      })
      .catch(function (error) {});
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
      .catch(function (error) {});
  };

  const updateDataArray = position => {
    let newArr = data.map((item, index) => {
      if (index == position) {
        return {
          ...item,
          isSelected: item.isSelected == 'true' ? 'false' : 'true',
        };
      }
      return item;
    });
    setData(newArr);
  };
  const [priceValidError, setPriceValidError] = useState('');
  const handleValidName = val => {
    const reg = new RegExp('^[0-9]+$');
    if (val.length === 0) {
      setPriceValidError(t('pleaseEnterPrice'));
    } else if (reg.test(val) === false) {
      setPriceValidError(t('onlyDigit'));
    } else if (reg.test(val) === true) {
      setPriceValidError(t('done'));
    }
  };

  const [durationValidError, setDurationValidError] = useState('');
  const handleValidDuration = val => {
    const reg = new RegExp('^[0-9]+$');
    if (val.length === 0) {
      setDurationValidError(t('pleaseEnterDuration'));
    } else if (reg.test(val) === false) {
      setDurationValidError(t('onlyDigit'));
    } else if (reg.test(val) === true) {
      setDurationValidError(t('done'));
    }
  };
  const valid = () => {
    if (priceValidError === 'Done' && durationValidError === 'Done') {
      callApi();
    } else {
      alert(t('pleaseEnterData'));
    }
  };

  const callApi = () => {
    if (selectedId == null) {
      alert(t('selectServiceType'));
    } else {
      var data = JSON.stringify({
        salonId: salonId,
        stylistId: stylistID,
        serviceId: selectedValue,
        serviceTypeId: selectedId,
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BConfig.baseUrl}business/addSalonServiceStylistType`,
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
        .catch(function (error) {});
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.secondary}}>
      <Header
        direction={'RTL'}
        headerColor={'white'}
        headerBack={true}
        onBackPress={() => navigation.goBack()}
        small
      />
      <ScrollView style={{height: hp(100)}}>
        <View style={styles.body}>
          <SemiTitle
            paddingHorizontal={wp(4.1)}
            title={t('chooseService')}
            marginBottom={hp(1.5)}
          />

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: wp(5),
              justifyContent: 'space-between',
            }}>
            {data.map((item, index) => {
              const backgroundColor =
                item._id === selectedValue ? colors.yellow : colors.white;
              return (
                <ServiceComponent
                  key={item._id}
                  marginRight={wp(1)}
                  marginBottom={hp(1.6)}
                  title={item.servname}
                  onPress={() => {
                    setClick(index),
                      setSelectedValue(item._id),
                      getTypeOfServices(item._id);
                  }}
                  backgroundColor={{backgroundColor}}
                  icon={item.icon}
                />
              );
            })}
          </View>

          <SemiTitle
            title={t('typeofService')}
            paddingHorizontal={wp(4.1)}
            fontSize={22}
            fontFamily={fonts.semiBold}
          />
          <View>
            {serviceType.length > 0 ? (
              serviceType.map(item => {
                const backgroundColor =
                  item._id === selectedId ? colors.yellow : colors.white;
                return (
                  <ServiceDetailComponent
                    key={item?._id}
                    textColor={'black'}
                    cat={item.name}
                    time={item.duration}
                    img={item.icon}
                    service={true}
                    backgroundColor={{backgroundColor}}
                    onPress={() => setSelectedId(item._id)}
                  />
                );
              })
            ) : (
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'black'}}>{t('noServiceFound')}</Text>
              </View>
            )}
          </View>

          <Button
            buttonText={t('addNewType1')}
            bgColor={'white'}
            textColor={'#57429D'}
            borderColor={'white'}
            textAlign={'left'}
            onPress={() =>
              navigation.navigate('ADD_NEW_SERVICE_TYPE', {
                serviceID: selectedValue,
                checkAssign: checkAssign,
              })
            }
          />

          {checkAssign === false ? null : (
            <Button buttonText={t('assignService')} onPress={() => callApi()} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddService;
