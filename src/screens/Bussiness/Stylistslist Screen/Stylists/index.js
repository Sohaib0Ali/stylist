import {View, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import Header from '../../../../BusinessUtills/components/Header/Header';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import BottomSheet from 'reanimated-bottom-sheet';
import SalonDetailFilter from '../../../../BusinessUtills/components/Business Components/SalonDetailFilter/SalonDetailFilter';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../../../BusinessUtills/components/Button/Button';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import StylistDetailComponent from '../../../../BusinessUtills/components/Business Components/Stylist Component/StylistDetailComponent';
import Title from '../../../../BusinessUtills/components/Title/Title';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {
  MAIN_BRANCH,
  SALON_SERVICES,
  SALON_STYLIST,
} from '../../../../../redux/store/actions/salons_Actions';

const Stylists = props => {
  const SalonData = useSelector(state => state?.SalonDetails?.SalonDetails);
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const Salon_Services = useSelector(
    state => state?.SalonDetails?.SalonServices,
  );
  const dispatch = useDispatch();
  const [displayViewMore, setDisplayViewMore] = useState(true);
  const sheetRef = React.useRef(0);
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();
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
      setIsLoading(true);
      setmainData(MainBranch);
      setServices(Salon_Services);
      setStylist(StyList);
      setSalonData(SalonData);
      getStylistInfo();
    }
  }, [isFocused]);

  const getStylistInfo = () => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getStylistBySalonId/${MainBranch?.salon?._id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setIsLoading(false);
        const res = response.data;
        {
          setStylist(res.data.stylist);
          dispatch({type: SALON_STYLIST, payload: res?.data?.stylist});
        }
      })
      .catch(function (error) {
        setIsLoading(false);
      });
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
        if (res.success === true) {
          setStylist(res.data.stylist);
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
        setIsLoading(false);
        if (res.succes) {
          setServices(res.data);
          dispatch({type: SALON_SERVICES, payload: res?.data});
        }
      })
      .catch(function (error) {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {stylist.length === 0 ? (
        <View style={{flex: 1}}>
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
          <View style={styles.subContainer}>
            <Image
              source={icons.stylistsicon}
              style={{height: hp(25), width: wp(50)}}
            />
            <Button
              buttonText="Add Stylist"
              marginTop={hp(4)}
              onPress={() => props.navigation.navigate('ADD_NEW_STYLIST')}
            />
          </View>
        </View>
      ) : (
        <View style={{height: hp(100), width: wp(100)}}>
          <Header
            direction={'RTL'}
            headerColor={'white'}
            icon={icons.plus}
            onPress={() => props.navigation.navigate('ADD_NEW_STYLIST')}
          />
          <View style={styles.subContainerData}>
            <Title
              paddingHorizontal={wp('4')}
              title={t('crew')}
              alignSelf={'baseline'}
              marginBottom={hp(2.1)}
            />
            <ScrollView
              style={[styles.container, {marginBottom: hp(12)}]}
              showsVerticalScrollIndicator={false}>
              {stylist?.map(item => {
                const backgroundColor =
                  item?._id === selectedId ? colors.yellow : colors.white;
                return (
                  <StylistDetailComponent
                    key={item?._id}
                    name={item?.firstName + ' ' + item?.lastName}
                    textColor={'black'}
                    cat={item?.position}
                    status={item?.status}
                    img={item?.profilePic}
                    service={true}
                    backgroundColor={{backgroundColor}}
                    onPress={() => {
                      setSelectedId(item?._id),
                        props.navigation.navigate('STYLIST_SCREEN', {
                          stylistData: item,
                          salonData: MainBranch,
                        });
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}

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
      <CustomeLoader visible={isLoading} />
    </View>
  );
};

export default Stylists;
