//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Dimensions,
  BackHandler,
} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../components/Header/Header';
import ToggleButton from '../../../components/ToggleButton/ToggleButton';
import MenuComponent from '../../../components/MenuComponent/MenuComponent';
import BarberComponent from '../../../components/Barber/BarberComponent/BarberComponent';
import images from '../../../assets/images/images';
import TrendingComponent from '../../../components/Barber/TrendingComponent/TrendingComponent';
import colors from '../../../assets/colors/colors';
import SemiTitle from '../../../components/SemiTitle';
import {useEffect} from 'react';
import {showWarning, showSuccess} from '../../../../Utils/FlashMessage';
import axios from 'axios';
import Config from '../../../config/config';
import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';
import CustomeLoader from '../../../components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';

const DiscoverScreen = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  let aspectRatio = width / height;
  let ltDelta = 0.0412;
  let lgDelta = ltDelta * aspectRatio;

  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState('');
  const [trending_Data, setTrending_Data] = useState(null);
  const [filteredtrending_Data, setFilteredTrending_Data] = useState([]);
  const [nearByData, setNearByData] = useState(null);
  const [filteredNearBySalon, setFilteredNearBySalon] = useState([]);
  const [popularData, setPopularData] = useState(null);
  const [filteredpopularData, setFilteredPopularData] = useState([]);
  const [checkFilter, setcheckFilter] = useState(false);
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    latitude: 0,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });
  let Colors = ['#5e94cc', '#fdecba', '#d19b64', '#d6605a'];

  const [values, setValues] = useState(1);

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

  const favoriteData = (index, value) => {
    const updatedBarberData = popularData.map(obj => {
      return obj.salon._id == index ? {...obj, favorite: value} : obj;
    });
    setNearByData(updatedBarberData);
    setPopularData(updatedBarberData);
  };

  const favoriteData1 = (index, value) => {
    const updatedTrendingData = trending_Data.map(obj => {
      return obj.salon._id == index ? {...obj, favorite: value} : obj;
    });
    setTrending_Data(updatedTrendingData);
  };

  const getCountValue = async value => {
    await setValues(value);
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getMyCurrentLocation();
    }
  }, [isFocused]);

  useEffect(() => {
    if (userPosition.latitude != 0) {
      getNearbyData();
      getPopularData();
      getTrendingData();
      getServiceData();
    }
  }, [userPosition]);

  const getMyCurrentLocation = () => {
    getLocation()
      .then(location => {
        let myLocation = {};
        myLocation.latitude = location.coords.latitude;
        myLocation.longitude = location.coords.longitude;
        myLocation.latitudeDelta = ltDelta;
        myLocation.longitudeDelta = lgDelta;
        setUserPosition(myLocation);
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
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
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
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
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
    if (selectedValue != null) {
      let dummyArr = [];
      let dummyArr2 = [];
      let dummyArr3 = [];
      if (nearByData != null) {
        nearByData.map(item => {
          item.serviceId.map(id => {
            if (id === selectedValue) {
              dummyArr.push(item);
            }
          });
        });
        setFilteredNearBySalon(dummyArr);
      }

      if (popularData != null) {
        popularData.map(item => {
          item.serviceId.map(id => {
            if (id === selectedValue) {
              dummyArr2.push(item);
            }
          });
        });
        setFilteredPopularData(dummyArr2);
      }

      if (trending_Data != null) {
        trending_Data.map(item => {
          item.serviceId.map(id => {
            if (id === selectedValue) {
              dummyArr3.push(item);
            }
          });
        });
        setFilteredTrending_Data(dummyArr3);
      }
    }
  }, [selectedValue, trending_Data, popularData, nearByData]);

  const getServiceData = async () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };

    axios
      .get(`${Config.baseUrl}getAllService`, {headers})
      .then(response => {
        if (response.status === Config.statusCode) {
          setServiceData(response.data.data);
          setSelectedValue(response.data.data[0]._id);
          setcheckFilter(true);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  const getTrendingData = async () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    axios
      .get(
        `${Config.baseUrl}getTrendingSalon?lat=${userPosition.latitude}&lng=${userPosition.longitude}`,
        {headers},
      )
      .then(response => {
        setLoading(false);
        if (response.status === Config.statusCode) {
          setTrending_Data(response.data.data);
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
    // setLoading(true)
    var data = JSON.stringify({
      serviceId: [],
      min: null,
      max: null,
      lat: userPosition.latitude,
      lng: userPosition.longitude,
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
          setNearByData(response.data.data);
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
        {headers},
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

  return (
    <View style={styles.mainContainer}>
      <View style={{paddingHorizontal: wp('4%')}}>
        <Header leftText={t('discover')} small />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <ToggleButton
            leftText={t('forYou')}
            rightText={t('whatsTrending')}
            getCountValue={getCountValue}
          />
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#000000"
              style={{alignSelf: 'center'}}
            />
          ) : (
            <FlatList
              contentContainerStyle={{paddingLeft: '4%'}}
              showsHorizontalScrollIndicator={false}
              data={serviceData}
              renderItem={({item, index}) => {
                const backgroundColor =
                  item._id === selectedValue ? colors.yellow : colors.white;
                return (
                  <MenuComponent
                    keyValue={JSON.parse(new Date().getTime())}
                    icon={item.icon}
                    title={item.servname}
                    onPress={() => {
                      setcheckFilter(true), setSelectedValue(item._id);
                    }}
                    backgroundColor={{backgroundColor}}
                    marginBottom={hp(4)}
                  />
                );
              }}
              keyExtractor={item => item._id}
              extraData={selectedValue}
              horizontal
            />
          )}
          {values === 2 ? (
            checkFilter && filteredtrending_Data.length < 1 ? (
              <View style={{width: wp(100), alignItems: 'center'}}>
                <Text style={{fontSize: wp(4)}}>{t('NoDatafound')}</Text>
              </View>
            ) : filteredtrending_Data.length > 0 ? (
              filteredtrending_Data.map((item, index) => {
                return (
                  <TrendingComponent
                    key={item.salon._id}
                    id={item.salon._id}
                    img={item.salon.profileImage}
                    logo={item.salon.profileLogo}
                    fav={item.favorite}
                    time={item.distanceInMiles}
                    name={item.salon.businessName}
                    address={item.salon.address}
                    company={item.salon.company}
                    star={item.salonRating?.rating}
                    review={item.salonRating?.numberOfRating}
                    favoriteData1={favoriteData1}
                    onPress={val =>
                      navigation.navigate('SALON_SCREEN', {itemData: item})
                    }
                  />
                );
              })
            ) : (
              trending_Data.map((item, index) => {
                return (
                  <TrendingComponent
                    key={item.salon._id}
                    id={item.salon._id}
                    img={item.salon.profileImage}
                    logo={item.salon.profileLogo}
                    fav={item.favorite}
                    time={item.distanceInMiles}
                    name={item.salon.businessName}
                    address={item.salon.address}
                    company={item.salon.company}
                    star={item.salonRating?.rating}
                    review={item.salonRating?.numberOfRating}
                    favoriteData1={favoriteData1}
                    onPress={val =>
                      navigation.navigate('SALON_SCREEN', {itemData: item})
                    }
                  />
                );
              })
            )
          ) : (
            <View>
              <SemiTitle
                paddingHorizontal={wp('4')}
                title={t('Nearby')}
                marginTop={wp(0.1)}
              />

              {checkFilter && filteredNearBySalon.length < 1 ? (
                <View
                  style={{
                    width: wp(100),
                    alignItems: 'center',
                    backgroundColor: 'red',
                  }}>
                  <Text style={{fontSize: wp(4)}}>{t('NoDatafound')}</Text>
                </View>
              ) : (
                <FlatList
                  contentContainerStyle={{paddingLeft: '4%'}}
                  showsHorizontalScrollIndicator={false}
                  data={
                    filteredNearBySalon.length > 0
                      ? filteredNearBySalon
                      : nearByData
                  }
                  renderItem={({item, index}) => {
                    const backgroundColor = Colors[index % Colors.length];
                    const borderColor = Colors[index % Colors.length];
                    return (
                      <BarberComponent
                        id={item?.salon?._id}
                        fav={item?.favorite}
                        img={item?.salon?.profileImage}
                        time={item?.time}
                        name={item?.salon?.businessName}
                        address={item?.salon?.address}
                        company={item?.salon?.company}
                        favoriteData={favoriteData}
                        onPress={() =>
                          navigation.navigate('SALON_SCREEN', {itemData: item})
                        }
                      />
                    );
                  }}
                  keyExtractor={item => item.salon._id}
                  horizontal
                />
              )}
              <SemiTitle
                paddingHorizontal={wp('4')}
                title={t('Popular')}
                marginTop={hp(5)}
                marginBottom={hp(2)}
              />
              {checkFilter && filteredpopularData.length < 1 ? (
                <View style={{width: wp(100), alignItems: 'center'}}>
                  <Text style={{fontSize: wp(4)}}>{t('NoDatafound')}</Text>
                </View>
              ) : (
                <FlatList
                  contentContainerStyle={{
                    paddingBottom: hp(17),
                    paddingLeft: '4%',
                  }}
                  showsHorizontalScrollIndicator={false}
                  data={
                    filteredpopularData.length > 0
                      ? filteredpopularData
                      : popularData
                  }
                  renderItem={({item, index}) => (
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
                        navigation.navigate('SALON_SCREEN', {itemData: item})
                      }
                    />
                  )}
                  keyExtractor={item => item.salon._id}
                  horizontal
                />
              )}
            </View>
          )}
        </View>
        <CustomeLoader visible={loading} />
      </ScrollView>
    </View>
  );
};

export default DiscoverScreen;
