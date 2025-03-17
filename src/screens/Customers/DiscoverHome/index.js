import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Dimensions,
  BackHandler,
  Animated,
  Image,
  Platform,
  Modal,
} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MenuComponent from '../../../components/MenuComponent/MenuComponent';
import BarberComponent from '../../../components/Barber/BarberComponent/BarberComponent';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import NearbyComponent from '../../../components/Barber/NearbyComponent';
import SemiTitle from '../../../components/SemiTitle';
import { useEffect } from 'react';
import { showWarning } from '../../../../Utils/FlashMessage';
import axios from 'axios';
import Config from '../../../config/config';
import Geolocation from 'react-native-geolocation-service';
import { useIsFocused } from '@react-navigation/native';
import CustomeLoader from '../../../components/Loader/CustomeLoader';
import { useTranslation } from 'react-i18next';
import MSearchbar from '../../../components/MSearchbar';
import {
  HOTORNOT,
  MENHAIRSTYLE,
  POPULARSTYLIST,
  PROFILE_SCREEN,
  REGISTER_SCREEN,
  STYLECOLLECTION,
} from '../../../constants/navigators';
import MapViewCmp from '../../../components/MapView';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { scale } from 'react-native-size-matters';
import OfferComponent from '../../../components/Client Components/WhatsNew/OffereComponent';
import PopularStylist from '../../../components/Client Components/PopularStylist';
import Hairstyles from '../../../components/Hairstyles/index';
import HotorNot from '../../../components/Hotornot';
import {
  SELECTED_SERVICES,
  REMOVE_SERVICES,
  ALLHAIRSTYLE,
} from '../../../../redux/store/actions/ApiData';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import SalonDetails from './SalonDetails';
import { OPEN_SHEET } from '../../../../redux/store/actions/sheetManagerActions';
import AuthenticationModel from '../../../components/AuthenticationModel/AuthenticationModel';

const DiscoverHome = ({ navigation }) => {
  const selcted_services = useSelector(
    state => state?.ApiData?.selectedService,
  );
  const { width, height } = Dimensions.get('window');
  let aspectRatio = width / height;
  let ltDelta = 0.0412;
  let lgDelta = ltDelta * aspectRatio;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const [colorID, setColorID] = useState(null);
  const [selectedValue, setSelectedValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState('');
  const [nearByData, setNearByData] = useState(null);
  const [loactionGranted, setLocationGranted] = useState(false);
  const [filteredNearBySalon, setFilteredNearBySalon] = useState([]);
  const [popularData, setPopularData] = useState(null);
  const [filteredpopularData, setFilteredPopularData] = useState([]);
  const [checkFilter, setcheckFilter] = useState(false);
  const [IsModalVisibles, setIsModalVisible] = useState(false);

  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    latitude: 0,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });

  let Colors = ['#5e94cc', '#fdecba', '#d19b64', '#d6605a'];

  const [values, setValues] = useState(1);
  const [search, setSearch] = useState('');
  const [Allstylelist, setallstyleList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      const backAction = () => {
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [isFocused]);

  useEffect(() => {
    getAllstylistCut();
    getoffers();
  }, []);

  const getAllstylistCut = async () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    axios
      .get(`${Config.baseUrl}getAllCut`, { headers })
      .then(response => {
        if (response.status === Config.statusCode) {
          const data = response?.data?.data;
          setallstyleList(data);
          dispatch({ type: ALLHAIRSTYLE, payload: data });
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
      });
  };
  const [offers, setAlloffer] = useState([]);

  const getoffers = async () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    axios
      .get(`${Config.baseUrl}getOfferWithSalon`, { headers })
      .then(response => {
        setAlloffer(response?.data?.data);
        if (response.status === Config.statusCode) {
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
      });
  };

  const offersArray = [];
  offers.forEach(item => {
    const offers = item.offers;
    offers.forEach(offer => {
      offersArray.push(offer);
    });
  });

  const favoriteData = (index, value) => {
    const updatedBarberData = popularData.map(obj => {
      return obj.salon._id == index ? { ...obj, favorite: value } : obj;
    });

    setNearByData(updatedBarberData);
    setPopularData(updatedBarberData);
  };

  useEffect(() => {
    if (isFocused) {
      const timer = setTimeout(() => {
        getMyCurrentLocation();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (userPosition.latitude != 0) {
        getNearbyData();
        getPopularData();
        getServiceData();
      }
    }
  }, [userPosition, isFocused]);

  const getMyCurrentLocation = () => {
    getLocation()
      .then(location => {
        let myLocation = {};
        myLocation.latitude = location.coords.latitude;
        myLocation.longitude = location.coords.longitude;
        myLocation.latitudeDelta = ltDelta;
        myLocation.longitudeDelta = lgDelta;
        setUserPosition(myLocation);
        setLocationGranted(true);
      })
      .catch(error => {
        setLocationGranted(false);
      });
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse')
          .then(response => {
            if (response === 'granted') {
              Geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
              );
            } else {
              reject('location permission denied');
              alert('Location must be granted for this operation');
            }
          })
          .catch(error => reject(error));
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
          .then(response => {
            if (response === PermissionsAndroid.RESULTS.GRANTED) {
              Geolocation.getCurrentPosition(
                position => {
                  resolve(position);
                },
                error => {
                  reject(error);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
              );
            } else {
              reject('location permission denied');
            }
          })
          .catch(error => reject(error));
      }
    });
  };
  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    submitHandler();
  }, [selcted_services, nearByData, popularData]);

  const submitHandler = () => {
    if (nearByData != null) {
      const NearfilterData = nearByData.filter(service => {
        return service.serviceId.some(serviceId =>
          selcted_services
            .map(selectedService => selectedService?.serviceId)
            .flat()
            .includes(serviceId),
        );
      });
      setFilteredNearBySalon(NearfilterData);
    }

    if (popularData != null) {
      const filteredData = popularData.filter(service => {
        return service.serviceId.some(serviceId =>
          selcted_services
            .map(selectedService => selectedService?.serviceId)
            .flat()
            .includes(serviceId),
        );
      });
      setFilteredPopularData(filteredData);
    }
  };

  const getServiceData = async () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };

    axios
      .get(`${Config.baseUrl}getAllService`, { headers })
      .then(response => {
        if (response.status === Config.statusCode) {
          setServiceData(response.data.data);
          setSelectedValue(response.data.data[0]._id);
          setcheckFilter(true);
          setLoading(false);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  const getNearbyData = async () => {
    var data = JSON.stringify({
      lat: 31.452023255655746,
      lng: 74.27079191732685,
    });

    var config = {
      method: 'post',
      url: `${Config.baseUrl}getNearBySalon`,
      headers: {
        Authorization: `Bearer ${Config.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.status === Config.statusCode) {
          setNearByData(response?.data?.data);
          setLoading(false);
        }
      })
      .catch(function (error) {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  const getPopularData = async () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    axios
      .get(
        `${Config.baseUrl}getPopularSalon?lat=${userPosition.latitude}&lng=${userPosition.longitude}`,
        { headers },
      )
      .then(response => {
        setLoading(false);
        if (response.status === Config.statusCode) {
          setPopularData(response.data.data);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  const [expanded, setExpanded] = useState(false);
  const [onOpenserch, setOpenserch] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    const initialValue = expanded ? animation._value : 0;
    const finalValue = expanded ? 0 : 1;

    setExpanded(!expanded);

    animation.setValue(initialValue);
    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const dummyvalue = [
    {
      _id: 'filterarrat123',
      approxtime: '30 min',
      category: '637776b978275e0ccd9104fc',
      createdAt: '2023-04-18T04:35:28.206Z',
      currency: 'MAD',
      description: 'hy we do cutting',
      icon: 'https://komb.s3.us-east-2.amazonaws.com/haircut.png',
      price: 30,
      servname: 'Cut',
      status: true,
      updatedAt: '2022-12-09T11:31:15.525Z',
    },
    ...serviceData,
  ];

  const bottomSheetRef = useRef(null);
  const bottomSheetModalRef = useRef(null);

  const renderContent = () => {
    const populerstylist = [
      {
        id: '1',
        img: images.man3,
        name: 'Adam Smith',
      },
      {
        id: '2',
        img: images.man4,
        name: 'John Alex',
      },
    ];
    const Hairstyless = [
      {
        id: '1',
        Hairstylesimg:
          'https://ath2.unileverservices.com/wp-content/uploads/sites/4/2019/10/2019-11-04-Full-Pompadour_0513-532x798.jpg',
        stylename: 'Slick Pompadour',
      },
      {
        id: '2',
        Hairstylesimg:
          'https://ath2.unileverservices.com/wp-content/uploads/sites/4/2016/04/two-asian-mens-hair-dsquared2_723_fw16-2-768x889.jpg',
        stylename: 'The French Crop',
      },
    ];

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.white3 }}
        nestedScrollEnabled={true}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <SemiTitle
              paddingHorizontal={wp('4')}
              title={t('hotnearyou')}
              marginTop={wp(1)}
              fontWeight={'600'}
              color={colors.headingBlack}
              fontSize={16}
            />
            <TouchableOpacity>
              <SemiTitle
                paddingHorizontal={wp('4')}
                title={t('seeAll')}
                marginTop={wp(1)}
                fontWeight={'400'}
                color={colors.btnColor}
                fontSize={16}
              />
            </TouchableOpacity>
          </View>

          {/* What’s hot near you */}

          {filteredNearBySalon?.length == '' && nearByData?.length == '' ? (
            <View style={{ width: wp(100), alignItems: 'center' }}>
              <Text style={{ fontSize: wp(4), marginTop: hp(5) }}>
                {t('NoDatafound')}
              </Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{ paddingLeft: '4%' }}
              showsHorizontalScrollIndicator={false}
              data={
                filteredNearBySalon?.length > 0
                  ? filteredNearBySalon
                  : nearByData
              }
              nestedScrollEnabled={true}
              // data={nearByData}
              renderItem={({ item, index }) => {
                const backgroundColor = Colors[index % Colors.length];
                const borderColor = Colors[index % Colors.length];
                return (
                  <NearbyComponent
                    key={index}
                    backgroundColor={{ backgroundColor }}
                    borderColor={{ borderColor }}
                    id={item?.salon?._id}
                    logo={item?.salon?.profileLogo}
                    title={item?.salon?.businessName}
                    address={item?.salon?.address}
                    profileImage={item?.salon?.profileLogo}
                    rating={item?.salonRating?.rating}
                    discription={item?.salon?.description}
                    distance={item?.distanceInMiles}
                    review={item?.salonRating?.numberOfRating}
                    favorite={item?.favorite}
                    favoriteData={favoriteData}
                    onPress={() => {
                      setColorID(item.index),
                        navigation.navigate('SALON_SCREEN', { itemData: item });
                    }}
                  />
                );
              }}
              keyExtractor={item => item?.salon_id}
              horizontal
            />
          )}

          {/* Most popular components*/}

          <SemiTitle
            paddingHorizontal={wp('4')}
            title={t('mostpopular')}
            marginTop={hp(4)}
            fontWeight={'600'}
            color={colors.headingBlack}
            fontSize={16}
          />
          {(filteredpopularData.length < 1 && popularData === null) ||
            searchResults === null ? (
            <View style={{ width: wp(100), alignItems: 'center' }}>
              <Text style={{ fontSize: wp(4) }}>{t('NoDatafound')}</Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{
                paddingLeft: '4%',
                marginTop: scale(19),
              }}
              showsHorizontalScrollIndicator={false}
              data={
                searchResults.length > 0
                  ? searchResults
                  : filteredpopularData.length > 0
                    ? filteredpopularData
                    : popularData
              }
              renderItem={({ item, index }) => {
                return (
                  <BarberComponent
                    id={item.salon._id}
                    fav={item.favorite}
                    img={item.salon.profileImage}
                    time={item.time}
                    name={item.salon.businessName}
                    address={item.salon.address}
                    company={item.salon.company}
                    favoriteData={favoriteData}
                    onPress={() =>
                      navigation.navigate('SALON_SCREEN', { itemData: item })
                    }
                  />
                );
              }}
              keyExtractor={item => item.salon._id}
              horizontal
            />
          )}

          {/* Special Offers  component*/}

          <SemiTitle
            paddingHorizontal={wp('4')}
            title={t('specialOffer')}
            marginTop={hp(5)}
            fontWeight={'600'}
            color={colors.headingBlack}
            fontSize={16}
          />

          <FlatList
            contentContainerStyle={{
              paddingBottom: hp(4),
              paddingHorizontal: wp('4%'),
              paddingTop: hp(4),
            }}
            ItemSeparatorComponent={() => (
              <View style={{ marginRight: wp(4.5) }} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={offersArray}
            renderItem={({ item, index }) => {
              return (
                <OfferComponent
                  id={item?._id}
                  img={images.barber}
                  offers={item?.offerDescription}
                />
              );
            }}
            keyExtractor={item => item.backgroundColor}
          />
          <View
            style={{
              width: '100%',
              height: scale(165),
              backgroundColor: colors.purple2,
              marginBottom: scale(10),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: scale(10),
                marginTop: hp(1),
              }}>
              <SemiTitle
                paddingHorizontal={wp('4')}
                title={t('popularstylists')}
                marginTop={wp(1)}
                fontWeight={'600'}
                color={colors.headingBlack}
                fontSize={16}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate(POPULARSTYLIST)}>
                <SemiTitle
                  paddingHorizontal={wp('4')}
                  title={t('seeAll')}
                  marginTop={wp(1)}
                  fontWeight={'400'}
                  color={colors.Darkblack}
                  fontSize={16}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              contentContainerStyle={{
                paddingBottom: hp(4),
                paddingHorizontal: wp('4%'),
              }}
              ItemSeparatorComponent={() => (
                <View style={{ marginRight: wp(4.5) }} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={populerstylist}
              renderItem={({ item, index }) => (
                <PopularStylist
                  id={item.id}
                  profileimg={item.img}
                  stylistname={item.name}
                />
              )}
              keyExtractor={item => item.backgroundColor}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: scale(10),
              marginTop: hp(1),
            }}>
            <SemiTitle
              paddingHorizontal={wp('4')}
              title={t('menhairstyles')}
              marginTop={wp(1)}
              fontWeight={'600'}
              color={colors.headingBlack}
              fontSize={16}
            />
            <TouchableOpacity onPress={() => navigation.navigate(MENHAIRSTYLE)}>
              <SemiTitle
                paddingHorizontal={wp('4')}
                title={t('seeAll')}
                marginTop={wp(1)}
                fontWeight={'400'}
                color={colors.btnColor}
                fontSize={16}
              />
            </TouchableOpacity>
          </View>

          {/* hairstyle */}
          <FlatList
            contentContainerStyle={{
              paddingBottom: hp(4),
              paddingHorizontal: wp('4%'),
            }}
            ItemSeparatorComponent={() => (
              <View style={{ marginRight: wp(4.5) }} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Allstylelist}
            renderItem={({ item, index }) => (
              <Hairstyles
                id={item._id}
                Hairstylesimg={item?.profiloImage}
                stylename={item?.cutName}
                onPress={() =>
                  navigation.navigate(STYLECOLLECTION, {
                    StyleName: item?.cutName,
                    Collection: item?.collectionImage,
                  })
                }
              />
            )}
            keyExtractor={item => item.backgroundColor}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: scale(12),
              marginTop: hp(1),
            }}>
            <SemiTitle
              paddingHorizontal={wp('4')}
              title={t('hotornot')}
              marginTop={wp(1)}
              fontWeight={'600'}
              color={colors.headingBlack}
              fontSize={16}
            />
            <TouchableOpacity onPress={() => navigation.navigate(HOTORNOT)}>
              <SemiTitle
                paddingHorizontal={wp('4')}
                title={t('seeAll')}
                marginTop={wp(1)}
                fontWeight={'400'}
                color={colors.btnColor}
                fontSize={16}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{
              paddingBottom: hp(4),
              paddingHorizontal: wp('4%'),
              paddingTop: hp(2),
            }}
            ItemSeparatorComponent={() => (
              <View style={{ marginRight: wp(4.5) }} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Hairstyless}
            renderItem={({ item, index }) => (
              <HotorNot
                id={item.id}
                Hairstylesimg={item.Hairstylesimg}
                stylename={item.stylename}
              />
            )}
            keyExtractor={item => item.backgroundColor}
          />
        </View>
      </ScrollView>
    );
  };

  const handleSheetChanges = index => { };

  const bottomSheetVisible = useSelector(
    state => state?.sheetManger?.openSheet,
  );
  const [AuthModal, setAuthModal] = useState(false);
  const [Registration, setRegistration] = useState(false);
  const [later, setLater] = useState(false);

  useEffect(() => {
    if (!Config?.token) {
      setAuthModal(true);
    }
  }, []);
  const [SelectedSalon, setSelectedSalon] = useState();

  const handleMarkerPress = item => {
    setSelectedSalon(item);
    dispatch({ type: OPEN_SHEET, payload: true });
    bottomSheetRef.current?.present();
  };

  const services_section = (id, title) => {
    const data = {
      serviceId: id,
      title: title,
    };
    if (selcted_services.some(item => item?.serviceId == data?.serviceId)) {
      dispatch({ type: REMOVE_SERVICES, payload: data });
    } else {
      dispatch({ type: SELECTED_SERVICES, payload: data });
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = query => {
    setSearchQuery(query);
    const results = popularData.filter(
      item =>
        item.salon &&
        item.salon.businessName &&
        item.salon.businessName.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchResults(results);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <View
          style={[
            styles.headerContainer,
            {
              borderBottomLeftRadius: expanded ? wp(5) : wp(0),
              borderBottomRightRadius: expanded ? wp(5) : wp(0),
            },
          ]}>
          <View style={styles.Container}>
            {onOpenserch ? (
              <>
                <MSearchbar
                  placeholder="Locate the closest salon."
                  onChangeText={text => handleSearch(text)}
                  value={searchQuery}
                  onclose={() => {
                    setOpenserch(false);
                  }}
                />
              </>
            ) : (
              <View style={styles.searchcontainer}>
                <Text style={styles.Discover}>{t('Discover')}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setOpenserch(true);
                  }}>
                  <Image style={styles.search} source={images.search} />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(PROFILE_SCREEN);
              }}>
              <Image style={styles.Drawer} source={images.Drawer} />
            </TouchableOpacity>
          </View>

          {expanded && (
            <Animated.View style={{ opacity: animation, flexDirection: 'row' }}>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                  style={{ alignSelf: 'center' }}
                />
              ) : (
                <FlatList
                  contentContainerStyle={{ paddingLeft: '4%' }}
                  showsHorizontalScrollIndicator={false}
                  data={dummyvalue}
                  renderItem={({ item, index }) => {
                    const backgroundcolor = selcted_services.some(
                      items => items?.serviceId === item?._id,
                    )
                      ? colors.yellow
                      : colors.white;

                    return (
                      <MenuComponent
                        id={item?._id}
                        keyValue={JSON.parse(new Date().getTime())}
                        icon={item?.icon}
                        title={item?.servname}
                        onPress={() => {
                          setcheckFilter(true),
                            services_section(item?._id, item?.servname);
                        }}
                        backgroundcolor={backgroundcolor}
                        index={index}
                      />
                    );
                  }}
                  keyExtractor={item => item?._id}
                  extraData={selectedValue}
                  horizontal
                />
              )}
            </Animated.View>
          )}
          <TouchableOpacity onPress={toggleExpand}>
            <View
              style={[
                styles.Line,
                { backgroundColor: expanded ? '#FFFFFF' : '#E2E2E2' },
              ]}
            />
          </TouchableOpacity>
        </View>
        <MapViewCmp
          nearByData={
            filteredNearBySalon?.length > 0 ? filteredNearBySalon : nearByData
          }
          onMarkerPress={handleMarkerPress}
          onUserLocationChange={getMyCurrentLocation}
          currentLocation={userPosition}
        />

        <CustomeLoader visible={loading} />
      </ScrollView>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={[
            expanded
              ? Platform.OS == 'android'
                ? '35%'
                : '30%'
              : Platform.OS == 'android'
                ? '45%'
                : '40%',
            expanded ? '70%' : '85%',
          ]}
          initialIndex={1}
          onChange={handleSheetChanges}
          enablePanDownToClose={false}>
          {renderContent()}
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <Modal
        visible={bottomSheetVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        {bottomSheetVisible && (
          <>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0 , 0 , 0 , 0.5)',
                position: 'absolute',
                flex: 1,
                width: '100%',
                height: '100%',
                bottom: 0,
              }}
              onPress={() => dispatch({ type: OPEN_SHEET, payload: false })}
            />
            <View
              style={{
                backgroundColor: 'rgba(0 , 0 , 0 , 0.0)',
                height: '70%',
                width: '95%',
                alignSelf: 'center',
                position: 'absolute',
                bottom: 0,
                borderRadius: scale(15),
              }}>
              <SalonDetails data={SelectedSalon} />
            </View>
          </>
        )}
      </Modal>

      <Modal
        visible={AuthModal}
        transparent={true}
        onRequestClose={() => setAuthModal(false)}>
        <View
          style={{
            backgroundColor: 'rgba(0 , 0 , 0 , 0.5)',
            flex: 1,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AuthenticationModel
            onPress={() => {
              setAuthModal(false);
            }}
            registration={() => {
              setAuthModal(false),
                setRegistration(true),
                navigation.navigate(REGISTER_SCREEN);
            }}
            issignup={Registration}
            maybelater={() => {
              setAuthModal(false), setAuthModal(false), setLater(true);
            }}
            later={later}
          />
        </View>
      </Modal>
    </View>
  );
};

export default DiscoverHome;
