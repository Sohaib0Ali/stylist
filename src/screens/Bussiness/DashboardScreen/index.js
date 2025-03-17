//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  BackHandler,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

//=========== bottom Tab ======================//
import BottomSheet from 'reanimated-bottom-sheet';
import {useIsFocused, useNavigation} from '@react-navigation/native';

//================================ Local Imported Files ======================================//
import styles from './style';
import Header from '../../../BusinessUtills/components/Header/Header';
import MenuComponent from '../../../BusinessUtills/components/MenuComponent/MenuComponent';
import icons from '../../../BusinessUtills/assets/icons/icons';
import SalonDetailFilter from '../../../BusinessUtills/components/Business Components/SalonDetailFilter/SalonDetailFilter';
import colors from '../../../BusinessUtills/assets/colors/colors';
import SeatMenuComponent from '../../../BusinessUtills/components/SeatMenuComponent/SeatMenuComponent';
import StylistMenu from '../../../BusinessUtills/components/StylistMenu/StylistMenu';
import SpecialOfferComponent from '../../../BusinessUtills/components/SpecialOfferComponent/SpecialOfferComponent';
import GraphComponent from '../../../BusinessUtills/components/GraphComponent/GraphComponent';
import BConfig from '../../../BusinessUtills/config/config';
import SimpleText from '../../../BusinessUtills/components/SimpleText/SimpleText';
import {
  CLOSE_TAB,
  OPEN_SHEET,
  SET_SNAP_INDEX,
} from '../../../../redux/store/actions/sheetManagerActions';
import {showDanger} from '../../../../Utils/FlashMessage';
import {useDispatch, useSelector} from 'react-redux';
import {
  SALON_DETAIL,
  MAIN_BRANCH,
  SEAT_DATA,
  SALON_STYLIST,
  SALON_SERVICES,
  SALON_OFFER,
} from '../../../../redux/store/actions/salons_Actions';
import {scale, verticalScale} from 'react-native-size-matters';
import fonts from '../../../assets/fonts/fonts';

const DashboardScreen = props => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);
  const route = {props};

  const SalonData = useSelector(state => state?.SalonDetails?.SalonDetails);
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const SeatData = useSelector(state => state?.SalonDetails?.SeatData);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const Salon_Services = useSelector(
    state => state?.SalonDetails?.SalonServices,
  );
  const Salon_Offers = useSelector(state => state?.SalonDetails?.SalonOffer);
  const openSheet = useSelector(state => state?.sheetManger?.openSheet);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const [mainData, setmainData] = useState(MainBranch);
  const [salonData, setSalonData] = useState(SalonData);
  const [stylist, setStylist] = useState(StyList);
  const [offers, setOffers] = useState(Salon_Offers);
  const [services, setServices] = useState([Salon_Services]);
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sheetRef = React.useRef(null);
  const isFocused = useIsFocused();
  const [seatsData, setSeatData] = useState(SeatData);
  const [finance, setFinance] = useState([]);
  const [totalFinance, setTotalFinance] = useState([]);
  const navigation = useNavigation();
  const snapIndex = useSelector(state => state?.sheetManger?.snapIndex);
  const [islanPopUp, setIslanPopUp] = useState(false);

  let newSeatData = [];
  let stylisDataUpdated = [];

  let offerUpdatedArray = [];

  if (Array.isArray(seatsData)) {
    newSeatData = [
      {
        seat: {
          _id: 'NewSeatData',
          bookingCount: '',
          salonId: '000',
          seatNo: '',
          stylistId: '',
        },
      },
      ...seatsData,
    ];
  }

  if (Array.isArray(stylist)) {
    stylisDataUpdated = [
      {
        __v: 0,
        _id: 'NEW ADD STYLIST',
        createdAt: '2023-04-25T10:52:58.865Z',
        currency: 'MAD',
        email: 'bodararahul@gmail.com',
        experience: '6',
        firstName: 'Yoll',
        lastName: 'Fggh',
        phoneNo: '+212235698056',
      },
      ...stylist,
    ];
  }
  if (Array.isArray(offers)) {
    offerUpdatedArray = [
      {
        __v: 0,
        _id: 'ADD NEW OFFER',
      },
      ...offers,
    ];
  }

  const {t} = useTranslation();
  const mySalons = t('mySalons');
  const profile = t('profile');
  const addLocation = t('addLocation');
  const logout = t('logout');

  useEffect(() => {
    setServices(Salon_Services);
    setStylist(StyList);
    setSalonData(SalonData);
    setSeatData(SeatData);
    setOffers(Salon_Offers);
  }, [Salon_Services, StyList, SalonData, SeatData, Salon_Offers, mainData]);

  useEffect(() => {
    if (route?.props?.screenType) {
      getAllSalonData();
    }
  }, [route?.props]);

  useEffect(() => {
    if (
      (mainData && Object.keys(mainData).length > 0) == false &&
      BConfig.token != ''
    ) {
      getAllSalonData();
    } else {
      if (!isFocused) {
        dispatch({type: SET_SNAP_INDEX, payload: 0});
      } else {
        if (mainData != null) {
          if (salonData && salonData.length > 0) {
            getSelectedSalon(salonData[0]);
          }
          setServices(Salon_Services);
          setStylist(StyList);
          setSalonData(SalonData);
          setSeatData(SeatData);
          setOffers(Salon_Offers);
        }
      }
    }
  }, [isFocused, MainBranch]);

  useEffect(() => {
    if (MainBranch?.salon?._id) {
      getFinanceInfo(MainBranch?.salon?._id);
    }
  }, [MainBranch]);

  const getFinanceInfo = sId => {
    setFinance([]);

    var data = '';

    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getFinancialGraphBySalonId/${sId}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let res = response?.data;
        if (res.success) {
          setFinance(res.data);
          setTotalFinance(res);
        }
      })
      .catch(function (error) {});
  };

  const getAllSalonData = () => {
    setIsLoading(true);
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}buisness/getSalon`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        const res = response.data;
        if (res?.success && res?.data?.ismainBranch) {
          setSalonData(res?.data?.salon);
          setmainData(res?.data?.ismainBranch);
          setStylist(res?.data?.ismainBranch?.stylist);
          setOffers(res?.data?.ismainBranch?.offers);
          setServices(res?.data?.ismainBranch?.services);
          setSeatData(res?.data?.ismainBranch?.seatData);
          dispatch({
            type: SEAT_DATA,
            payload: res?.data?.ismainBranch?.seatData,
          });
          dispatch({type: SALON_DETAIL, payload: res?.data?.salon});
          dispatch({type: MAIN_BRANCH, payload: res?.data?.ismainBranch});
          dispatch({
            type: SALON_STYLIST,
            payload: res?.data?.ismainBranch?.stylist,
          });
          dispatch({
            type: SALON_SERVICES,
            payload: res?.data?.ismainBranch?.services,
          });
          dispatch({
            type: SALON_OFFER,
            payload: res?.data?.ismainBranch?.offers,
          });
          setIsLoading(false);
        }
      })
      .catch(function () {
        setIsLoading(false);
      });
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
          setStylist(res.data.stylist);
          dispatch({type: SALON_STYLIST, payload: res?.data?.stylist});
        }
      })
      .catch(function () {});
  };
  const getOffersByID = id => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}Buisness/getOfferBySalonId/${id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        const res = response.data;
        if (res.success === true) {
          setOffers(res.data);
          dispatch({type: SALON_OFFER, payload: res?.data});
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
      });
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
  const getReviewData = async sID => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${BConfig.token}`,
    };
    axios
      .get(`${BConfig.baseUrl}getReviewBySalonId/${sID}`, {headers})
      .then(response => {
        if (response.data.success === true) {
          setReview(response.data.data);
        } else {
          showDanger(t('somethingWentWrong'));
        }
      })
      .catch(e => {
        showDanger(t('somethingWentWrong'));
      });
  };

  const getSeatsInfo = Salonid => {
    var data = '';
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getSalonSeats?salonId=${Salonid}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          setSeatData(res.data);
          dispatch({type: SEAT_DATA, payload: res.data});
        }
      })
      .catch(function (error) {});
  };

  const [values, setValues] = useState(1);

  const getSelectedSalon = item => {
    setmainData(item);
    dispatch({type: MAIN_BRANCH, payload: item});
    const salodId = item?.salon?._id;
    dispatch({type: SET_SNAP_INDEX, payload: 0});
    setIsLoading(true);
    getSeatsInfo(salodId);
    getFinanceInfo(salodId);
    getStylistByID(salodId);
    getServicesByID(salodId);
    getOffersByID(salodId);
    getReviewData(salodId);
  };

  const renderContent = () => {
    return (
      <View
        style={{
          backgroundColor: colors.primary,
          height: '100%',
        }}>
        <SalonDetailFilter
          getSelectedSalon={getSelectedSalon}
          paddingVertical={hp(1.6)}
          elevation={'dashHead'}
          mySalons={mySalons}
          profile={profile}
          addLocation={addLocation}
          logout={logout}
          salonData={salonData}
          mainID={mainData?.salon?._id}
          onPress={() =>
            props.navigation.navigate('EDIT_PROFILE_HOME', {
              services: services,
              stylist: stylist,
              data: mainData,
            })
          }
        />
      </View>
    );
  };

  const handleHeader = () => {
    dispatch({type: OPEN_SHEET, payload: true});
    dispatch({type: SET_SNAP_INDEX, payload: 1});
    dispatch({type: CLOSE_TAB, payload: true});
  };

  return mainData === null ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  ) : (
    <SafeAreaView style={{backgroundColor: colors.primary}}>
      <View style={[styles.mainContainer]}>
        <View
          style={{
            height: StatusBar.currentHeight,
            backgroundColor: colors.primary,
          }}
        />
        <StatusBar backgroundColor={colors.primary} translucent={true} />
        <Header
          leftText={!mainData ? t('Loading') : mainData?.salon?.businessName}
          leftText2={
            !mainData
              ? t('Loading')
              : mainData?.salon?.address + ' ' + mainData?.salon?.city
          }
          randomIcon={mainData?.salon?.profileLogo}
          onPress={handleHeader}
          Headerstyles={{marginTop: hp(-2)}}
        />

        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.body}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: verticalScale(10),
                    marginTop: verticalScale(15),
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.Exo2Bold,
                      paddingHorizontal: scale(12),
                      color: colors.headingBlack,
                      fontWeight: '600',
                      fontSize: verticalScale(14),
                    }}>
                    {t('seatManagement')}
                  </Text>
                  {!islanPopUp ? (
                    <Text
                      style={{
                        fontFamily: fonts.Exo2Bold,
                        paddingHorizontal: scale(12),
                        color: colors.primary,
                        fontWeight: '500',
                        fontSize: verticalScale(14),
                      }}>
                      {t('seeAll')}
                    </Text>
                  ) : null}
                </View>

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={newSeatData}
                  renderItem={({item}) => {
                    return (
                      <SeatMenuComponent
                        key={item._id}
                        idName={item?.seat?._id}
                        icon={icons.chairIcon}
                        bookingCount={item?.seat?.bookingCount}
                        title={'Seat ' + item?.seat?.seatNo}
                        marginBottom={hp(4.1)}
                        onPress={() =>
                          navigation.navigate('SEATS_NEXT_APPOINMENTS', {
                            stylistId: item?.seat?.stylistId,
                          })
                        }
                        onPressAddseat={() => {
                          navigation.navigate('NEW_BOTTOM_MANAGE_SCREEN', {
                            selectedIndex: 0,
                          });
                        }}
                      />
                    );
                  }}
                  keyExtractor={item => item?.seat?._id}
                  horizontal
                />
              </View>

              {values === 2 ? (
                <View></View>
              ) : (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: verticalScale(15),
                      marginBottom: verticalScale(10),
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.Exo2Bold,
                        paddingHorizontal: scale(12),
                        color: colors.headingBlack,
                        fontWeight: '600',
                        fontSize: verticalScale(14),
                      }}>
                      {t('availableStylists')}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.Exo2Bold,
                        paddingHorizontal: scale(12),
                        color: colors.primary,
                        fontWeight: '500',
                        fontSize: verticalScale(14),
                      }}>
                      {t('seeAll')}
                    </Text>
                  </View>
                  <FlatList
                    contentContainerStyle={{paddingLeft: wp('2.1')}}
                    showsHorizontalScrollIndicator={false}
                    data={stylisDataUpdated}
                    renderItem={({item}) => {
                      return (
                        <StylistMenu
                          key={item?._id}
                          IdName={item?._id}
                          marginBottom={hp(4)}
                          id={item?._id}
                          source={item?.profilePic}
                          title={item?.fullName}
                          position={item?.position}
                          onPress={() =>
                            props.navigation.navigate('BSTYLIST_SCREEN', {
                              stylistData: item,
                              salonData: mainData,
                            })
                          }
                          onPressAddStylist={() => {
                            props.navigation.navigate(
                              'NEW_BOTTOM_MANAGE_SCREEN',
                              {
                                selectedIndex: 2,
                              },
                            );
                          }}
                        />
                      );
                    }}
                    keyExtractor={item => item?._id}
                    horizontal
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: verticalScale(10),
                      marginBottom: verticalScale(10),
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.Exo2Bold,
                        paddingHorizontal: scale(12),
                        color: colors.headingBlack,
                        fontWeight: '600',
                        fontSize: verticalScale(14),
                      }}>
                      {t('specialOffer')}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('OFFERS_SCREEN', {
                          offersData: offers,
                        })
                      }>
                      <Text
                        style={{
                          fontFamily: fonts.Exo2Bold,
                          paddingHorizontal: scale(12),
                          color: colors.primary,
                          fontWeight: '500',
                          fontSize: verticalScale(14),
                        }}>
                        {t('seeAll')}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    contentContainerStyle={{paddingLeft: '4%'}}
                    showsHorizontalScrollIndicator={false}
                    data={offerUpdatedArray}
                    renderItem={({item}) => {
                      const backgroundColor =
                        item._id === selectedValue
                          ? colors.yellow
                          : colors.white;
                      return (
                        <SpecialOfferComponent
                          key={item?._id}
                          IDName={item?._id}
                          source={item?.profileImage}
                          title={item?.offerDescription}
                          onPress={() => setSelectedValue(item?._id)}
                          backgroundColor={{backgroundColor}}
                          marginBottom={hp(3)}
                          onPressAddOffer={() => {
                            props.navigation.navigate(
                              'NEW_BOTTOM_MANAGE_SCREEN',
                              {
                                selectedIndex: 4,
                              },
                            );
                          }}
                        />
                      );
                    }}
                    keyExtractor={item => item._id}
                    extraData={selectedValue}
                    horizontal
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: hp(1.5),
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.Exo2Bold,
                        paddingHorizontal: scale(12),
                        color: colors.headingBlack,
                        fontWeight: '600',
                        fontSize: verticalScale(14),
                      }}>
                      {t('finance')}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('FINANCE_DETAIL', {
                          finance: finance,
                          totalFinance: totalFinance,
                        })
                      }>
                      <Text
                        style={{
                          fontFamily: fonts.Exo2Bold,
                          paddingHorizontal: scale(12),
                          color: colors.primary,
                          fontWeight: '500',
                          fontSize: verticalScale(14),
                        }}>
                        {t('Monthly view')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {finance.length > 0 ? (
                    <GraphComponent data={finance} />
                  ) : null}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: hp(4.5),
                      marginBottom: verticalScale(15),
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.Exo2Bold,
                        paddingHorizontal: scale(12),
                        color: colors.headingBlack,
                        fontWeight: '600',
                        fontSize: verticalScale(14),
                      }}>
                      {t('popularServices')}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('ServiceScreen')
                      }>
                      <Text
                        style={{
                          fontFamily: fonts.Exo2Bold,
                          paddingHorizontal: scale(12),
                          color: colors.primary,
                          fontWeight: '500',
                          fontSize: verticalScale(14),
                        }}>
                        {t('seeAll')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {Array.isArray(Salon_Services) &&
                  Salon_Services?.length === 0 ? (
                    <SimpleText
                      text={t('notFound')}
                      alignSelf={'baseline'}
                      marginLeft={wp(4.1)}
                      marginBottom={hp(15)}
                    />
                  ) : (
                    <View style={{marginBottom: verticalScale(100)}}>
                      <FlatList
                        contentContainerStyle={{paddingLeft: '4%'}}
                        showsHorizontalScrollIndicator={false}
                        data={Salon_Services}
                        renderItem={({item}) => {
                          const backgroundColor =
                            item._id === selectedValue
                              ? colors.yellow
                              : colors.white;
                          colors.primary;
                          return (
                            <MenuComponent
                              icon={item?.icon}
                              title={item?.servname}
                              onPress={() => setSelectedValue(item?._id)}
                              backgroundColor={{backgroundColor}}
                              marginBottom={hp(2.1)}
                            />
                          );
                        }}
                        keyExtractor={item => item?._id}
                        extraData={selectedValue}
                        horizontal
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        )}
        {openSheet === true && (
          <BottomSheet
            ref={sheetRef}
            isBackDrop={true}
            backDropColor="#eee"
            initialSnap={snapIndex}
            snapPoints={['0%', '45%', '60%', '100%']}
            enabledGestureInteraction={true}
            borderRadius={10}
            renderContent={renderContent}
            enabledInnerScrolling={true}
            onCloseEnd={() => {
              dispatch({type: OPEN_SHEET, payload: false});
              dispatch({type: SET_SNAP_INDEX, payload: 0});
              dispatch({type: CLOSE_TAB, payload: false});
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
