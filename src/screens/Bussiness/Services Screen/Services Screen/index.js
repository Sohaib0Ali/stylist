import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import Header from '../../../../BusinessUtills/components/Header/Header';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import BottomSheet from 'reanimated-bottom-sheet';
import SalonDetailFilter from '../../../../BusinessUtills/components/Business Components/SalonDetailComponent/SalonDetailComponent';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../../../BusinessUtills/components/Button/Button';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import Title from '../../../../BusinessUtills/components/Title/Title';
import ServiceDetailComponent from '../../../../BusinessUtills/components/Business Components/Service Component/ServiceDetailComponent/ServiceDetailComponent';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  MAIN_BRANCH,
  SALON_SERVICES,
  SALON_STYLIST,
} from '../../../../../redux/store/actions/salons_Actions';

const ServicesScreen = props => {
  const dispatch = useDispatch;
  const SalonData = useSelector(state => state?.SalonDetails?.SalonDetails);
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const Salon_Services = useSelector(
    state => state?.SalonDetails?.SalonServices,
  );
  const [displayViewMore, setDisplayViewMore] = useState(true);
  const isFocused = useIsFocused();
  const sheetRef = React.useRef(0);
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();
  const [serviceData, setServiceData] = useState([]);
  const [mainData, setmainData] = useState(MainBranch);
  const [salonData, setSalonData] = useState(SalonData);
  const [stylist, setStylist] = useState(StyList);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState(Salon_Services);
  const {t} = useTranslation();
  const mySalons = t('mySalons');
  const profile = t('profile');
  const addLocation = t('addLocation');

  useEffect(() => {
    if (!isFocused) {
      sheetRef.current.snapTo(0);
      props.bottomTabDisplay(false);
    } else {
      getServiceType(MainBranch?.salon?._id);
      setmainData(MainBranch);
      setServices(Salon_Services);
      setStylist(StyList);
      setSalonData(SalonData);
    }
  }, [isFocused]);

  const getServiceType = salonId => {
    setIsLoading(true);

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
        setIsLoading(false);
        if (res.success) {
          setServiceData(res.data);
          getServiceData(MainBranch?.salon?._id);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
      });
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
          dispatch({type: SALON_SERVICES, payload: res?.data});
        }
      })
      .catch(function (error) {});
  };

  const getSelectedSalon = item => {
    setmainData(item);
    dispatch({type: MAIN_BRANCH, payload: item});

    const salodId = item?.salon?._id;

    sheetRef.current.snapTo(0);
    props.bottomTabDisplay(false);
    setIsLoading(true);
    getStylistByID(salodId);
    getServicesByID(salodId);
    getServiceType(salodId);
  };

  const renderContent = () => {
    return (
      <View
        style={{
          backgroundColor: '#57429D',
          height: hp(100),
          zIndex: 1,
        }}>
        <SalonDetailFilter
          getSelectedSalon={getSelectedSalon}
          paddingVertical={hp(1.6)}
          elevation={'dashHead'}
          mySalons={mySalons}
          profile={profile}
          addLocation={addLocation}
          salonData={salonData}
          mainID={mainData?.salon?._id}
          onPress={() =>
            props.navigation.navigate('PROFILE_SCREEN', {
              services: services,
              stylist: stylist,
              data: mainData,
            })
          }
        />
      </View>
    );
  };

  const getStylistByID = id => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getStylistBySalonId/${id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        const res = response.data;
        {
          setStylist(res?.data?.stylist);
          dispatch({type: SALON_STYLIST, payload: res?.data?.stylist});
        }
      })
      .catch(function (error) {});
  };

  const getServicesByID = id => {
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
          setServices('Config ', res.data);
          dispatch({type: SALON_SERVICES, payload: res?.data});
        }
      })
      .catch(function (error) {});
  };

  return (
    <View style={styles.container}>
      <Header
        leftText={!mainData ? t('Loading') : mainData?.salon?.businessName}
        leftText2={
          !mainData
            ? t('Loading')
            : mainData?.salon?.address + ' ' + mainData?.salon?.city
        }
        randomIcon={mainData?.salon?.profileLogo}
        onPress={() => {
          sheetRef.current.snapTo(2);
          props.bottomTabDisplay(true);
          setDisplayViewMore(true);
        }}
      />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={'#57429D'} />
        </View>
      ) : serviceData.length === 0 ? (
        <View style={{flex: 1}}>
          <View style={styles.subContainer}>
            <Image
              source={icons?.emptyservices}
              style={{height: hp(25), width: wp(50)}}
            />
            <Button
              buttonText={t('addService')}
              marginTop={hp(4)}
              onPress={() =>
                props.navigation.navigate('ADD_SERVICES', {checkAssign: false})
              }
            />
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.subContainerData}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(2.1),
              }}>
              <Title
                paddingHorizontal={wp('4')}
                title={t('service')}
                alignSelf={'baseline'}
              />
              <TouchableOpacity
                style={{width: wp(15), alignItems: 'center'}}
                onPress={() =>
                  navigation.navigate('ADD_SERVICES', {checkAssign: false})
                }>
                <Image source={icons?.plus} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={[styles.container, {marginBottom: hp(12)}]}
              showsVerticalScrollIndicator={false}>
              {serviceData?.map(item => {
                const backgroundColor =
                  item.id === selectedId ? colors.yellow : colors.white;
                return (
                  <ServiceDetailComponent
                    key={item?._id}
                    textColor={'black'}
                    cat={item?.name}
                    time={item?.duration}
                    price={item?.price}
                    img={item?.serviceId?.icon}
                    service={true}
                    currency={item.currency}
                    backgroundColor={{backgroundColor}}
                    onPress={() => setSelectedId(item._id)}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}

      <CustomeLoader visible={isLoading} />
      <BottomSheet
        ref={sheetRef}
        style={{
          wrapper: {
            backgroundColor: 'transparent',
          },
        }}
        snapPoints={['0%', '45%', '65%', '100%']}
        enabledGestureInteraction={true}
        borderRadius={10}
        renderContent={renderContent}
        enabledInnerScrolling={true}
        onCloseEnd={() => props.bottomTabDisplay(false)}
      />
    </View>
  );
};

export default ServicesScreen;
