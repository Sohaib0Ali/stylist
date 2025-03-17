import {View, Image, FlatList, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import Header from '../../../../BusinessUtills/components/Header/Header';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../../../BusinessUtills/components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import SalonDetailFilter from '../../../../BusinessUtills/components/Business Components/SalonDetailFilter/SalonDetailFilter';
import SemiTitle from '../../../../BusinessUtills/components/SemiTitle';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SeatMenuComponent from '../../../../BusinessUtills/components/SeatMenuComponent/SeatMenuComponent';
import axios from 'axios';
import BConfig from '../../../../BusinessUtills/config/config';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  MAIN_BRANCH,
  SALON_SERVICES,
  SALON_STYLIST,
  SEAT_DATA,
} from '../../../../../redux/store/actions/salons_Actions';

const AddSeatsHomeScreen = props => {
  const SalonData = useSelector(state => state?.SalonDetails?.SalonDetails);
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const SeatData = useSelector(state => state?.SalonDetails?.SeatData);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const Salon_Services = useSelector(
    state => state?.SalonDetails?.SalonServices,
  );
  const dispatch = useDispatch();
  const sheetRef = React.useRef(0);
  const isFocused = useIsFocused();
  const [displayViewMore, setDisplayViewMore] = useState(true);
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(null);
  const [mainData, setmainData] = useState(MainBranch);
  const [salonData, setSalonData] = useState(SalonData);
  const [stylist, setStylist] = useState(StyList);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState(Salon_Services);
  const [seatData, setSeatData] = useState(SeatData);
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
      setSeatData(SeatData);
      getSeatsInfo();
    }
  }, [isFocused]);

  const getSelectedSalon = item => {
    setmainData(item);
    dispatch({type: MAIN_BRANCH, payload: item});
    const salodId = item?.salon?._id;

    sheetRef.current.snapTo(0);
    props.bottomTabDisplay(false);
    getStylistByID(salodId);
    getServicesByID(salodId);
    getSeatsInfo(salodId);
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
          dispatch({type: SALON_STYLIST, payload: res.data.stylist});
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
          setServices(res.data);
          dispatch({type: SALON_SERVICES, payload: res?.data});
        }
      })
      .catch(function (error) {});
  };

  const getSeatsInfo = () => {
    var data = '';
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getSalonSeats/?salonId=${MainBranch?.salon?._id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setIsLoading(false);
        let res = response.data;
        if (res.success) {
          setSeatData(res?.data);
          dispatch({type: SEAT_DATA, payload: res?.data});
        }
      })
      .catch(function (error) {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {seatData.length < 1 ? (
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
          <View style={[styles.subContainer, {alignItems: 'center'}]}>
            <Image
              source={icons.chairIcon}
              style={{
                height: hp(25),
                borderRadius: wp(33),
                width: wp(50),
              }}
            />
            <Button
              buttonText="Add seats"
              marginTop={hp(4)}
              onPress={() => navigation.navigate('ADD_NEW_SEAT_SCREEN')}
            />
          </View>
        </View>
      ) : (
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
            <ScrollView style={{flex: 1}}>
              <View style={styles.body}>
                <View>
                  <SemiTitle
                    paddingHorizontal={wp('4')}
                    title={t('seatManagement')}
                    marginTop={wp(5)}
                    marginBottom={hp(1.5)}
                  />
                  {seatData?.length > 0 ? (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      numColumns={3}
                      data={seatData}
                      renderItem={({item, index}) => {
                        const backgroundColor =
                          item.id === selectedValue ? '#F6F5F3' : colors.white;
                        return (
                          <SeatMenuComponent
                            icon={icons.chair}
                            bookingCount={item?.seat?.bookingCount}
                            title={t('seat') + item?.seat?.seatNo}
                            marginBottom={hp(4.1)}
                            onPress={() =>
                              props.navigation.navigate(
                                'SEATS_NEXT_APPOINMENTS',
                                {stylistId: item?.seat?.stylistId},
                              )
                            }
                            // backgroundColor={{ backgroundColor }}
                            //marginBottom={hp(4)}
                          />
                        );
                      }}
                      keyExtractor={item => item._id}
                      extraData={selectedValue}
                      //
                    />
                  ) : null}
                </View>
              </View>
              <Button
                buttonText={t('addSeats')}
                marginTop={hp(2)}
                marginBottom={10}
                onPress={() => navigation.navigate('ADD_NEW_SEAT_SCREEN')}
              />
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
export default AddSeatsHomeScreen;
