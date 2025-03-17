//================================ React Native Imported Files ======================================//

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Image,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

//================================ Local Imported Files ======================================//
import MapView, {Marker} from 'react-native-maps';
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DarkHeader from '../../../../components/Barber/DarkHeader/DarkHeader';
import images from '../../../../assets/images/images';
import CurrentPositionIcon from '../../../../assets/icons/currentPointIcon.svg';
import Geolocation from 'react-native-geolocation-service';
import colors from '../../../../assets/colors/colors';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import SalonDetailFilter from '../../../../components/Client Components/SalonDetailFilter/SalonDetailFilter';
import BottomSheet from 'reanimated-bottom-sheet';
import {useIsFocused} from '@react-navigation/native';
import ArrowUp from '../../../../assets/icons/ArrowUp.svg';
import Config from '../../../../config/config';
import axios from 'axios';
import {showWarning, showInfo} from '../../../../../Utils/FlashMessage';
import RBSheet from 'react-native-raw-bottom-sheet';
import CrewDetails from '../../../../components/Client Components/Crew Details';
import Strings from '../../../../constants/Strings';
import icons from '../../../../assets/icons/icons';
import {useTranslation} from 'react-i18next';

let mapRef = null;

const {width, height} = Dimensions.get('window');
let aspectRatio = width / height;
let ltDelta = 0.0412;
let lgDelta = ltDelta * aspectRatio;

const MapViewScreen = props => {
  const {t} = useTranslation();
  const [region, setRegion] = useState({
    latitude: 3.094476666666667,
    longitude: 101.67371166666665,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    latitude: 0,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });
  const [mapType, setMapType] = useState('standard');
  const [displayViewMore, setDisplayViewMore] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const refRBSheet = useRef();
  const sheetRef = React.useRef(0);

  const isFocused = useIsFocused();
  const [locationGranted, setLocationGranted] = useState(false);
  const [nearByData, setNearByData] = useState([]);
  const [crewData, setCrewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState({});
  const [stylerData, setStylerData] = useState();
  const [locationCheck, setLocationCheck] = useState(true);

  const markers = [
    {
      id: 1,
      title: '28 mins',
      coordinates: {latitude: 31.453185, longitude: -285.732828},
      iconImage: images.man6,
    },
    {
      id: 2,
      title: '12 mins',
      coordinates: {latitude: 31.464185, longitude: -285.735928},
      iconImage: images.man7,
    },
    {
      id: 3,
      title: '20 mins',
      coordinates: {latitude: 31.458185, longitude: -285.736928},
      iconImage: images.man4,
    },
    {
      id: 4,
      title: '15 mins',
      coordinates: {latitude: 31.464585, longitude: -285.729928},
      iconImage: images.man9,
    },
    {
      id: 5,
      title: '8 mins',
      coordinates: {latitude: 31.460085, longitude: -285.729928},
      iconImage: images.man8,
    },
  ];

  useEffect(() => {
    if (!isFocused) {
      sheetRef.current.snapTo(0);
      props.bottomTabDisplay(false);
      refRBSheet.current.close();
    }
    if (isFocused) {
      if (userPosition.latitude != 0) {
        getNearbyData();
      }
    }
  }, [isFocused, userPosition]);

  const getNearbyData = async () => {
    setLoading(true);

    var data = JSON.stringify({
      serviceId: t('serviceID'),
      min: t('min'),
      max: t('max'),
      lat: 31.4544247,
      lng: 74.2766182,
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
        setLoading(false);
        if (response.status === Config.statusCode) {
          Strings.serviceID = [];
          Strings.min = null;
          Strings.max = null;
          setNearByData(response.data.data);
          if (response.data.data.length == 0) {
            showInfo(t('salonNotFound'));
          }
        }
      })
      .catch(function (error) {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  const getCrewData = async sID => {
    setLoading(true);
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    axios
      .get(`${Config.baseUrl}getStylistBySalonId/${sID}`, {headers})
      .then(response => {
        setLoading(false);
        if (response.status === Config.statusCode) {
          setCrewData(response.data.data);
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  useEffect(() => {
    if (locationGranted && locationCheck) {
      mapRef.animateToRegion(
        {
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        },
        250,
      );
    }
  }, [locationGranted, locationCheck]);

  const onMapReady = () => {
    getMyCurrentLocation();
  };

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

  //Get the current location of the user
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

  const bookingCallbacks = data => {
    setStylerData(data);
    sheetRef.current.snapTo(0);
    props.bottomTabDisplay(false);
    refRBSheet.current.open();
  };

  const renderContent = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          height: '100%',
        }}>
        <View style={{height: wp(15)}}>
          {displayViewMore ? (
            <View>
              <View style={{height: wp(2.5), alignSelf: 'center'}}>
                <ArrowUp width={wp(7)} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setDisplayViewMore(false), sheetRef.current.snapTo(2);
                }}
                style={{marginTop: wp(2), alignSelf: 'center'}}>
                <Text style={{color: 'black', fontSize: wp(2.9)}}>
                  View More
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                height: wp(1.2),
                backgroundColor: colors.borderColor,
                top: wp(1),
                width: '10%',
                alignSelf: 'center',
              }}></View>
          )}
        </View>
        {!loading ? (
          <SalonDetailFilter
            salonData={selectedSalon}
            crewData={crewData}
            bookingCallbacks={bookingCallbacks}
          />
        ) : (
          <ActivityIndicator
            size="small"
            color="#000000"
            style={{alignSelf: 'center'}}
          />
        )}
      </View>
    );
  };

  const checkCallback = () => {
    refRBSheet.current.close();
  };

  return (
    <View style={styles.mainContainer}>
      <DarkHeader
        nearByData={nearByData}
        onPress={() => props.navigation.navigate('FILTER_SCREEN')}
      />

      <View style={styles.mapBg}>
        <View
          style={{
            alignContent: 'center',
            position: 'absolute',
            right: wp(8),
            bottom: hp(32),
            zIndex: 1,
          }}>
          <View style={styles.dpBg}>
            <View style={styles.imgBg}>
              <TouchableOpacity
                onPress={() => setLocationCheck(!locationCheck)}
                style={styles.iconTextBg}>
                <Image
                  source={
                    locationCheck
                      ? icons.selectedIconLocation
                      : icons.IconLocation
                  }
                  resizeMode="contain"
                  tintColor="DE4C5B"
                  style={styles.locationIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          initialRegion={region}
          mapType={mapType}
          ref={ref => {
            mapRef = ref;
          }}
          onRegionChangeComplete={newRegion => {
            newRegion?.latitude?.toFixed(5) ===
            userPosition?.latitude?.toFixed(5)
              ? setLocationCheck(true)
              : setLocationCheck(false);
          }}
          onMapReady={() => {
            setTimeout(() => setMapReady(true), 120), onMapReady();
          }}>
          <Marker
            key={1}
            tracksViewChanges={false}
            coordinate={{
              latitude: userPosition?.latitude ? userPosition?.latitude : 0,
              longitude: userPosition?.longitude ? userPosition?.longitude : 0,
            }}>
            <CurrentPositionIcon height={35} width={35} />
          </Marker>

          {nearByData
            ? nearByData.map((marker, index) => {
                return (
                  <Marker
                    key={index}
                    tracksViewChanges={!mapReady}
                    tracksInfoWindowChanges={false}
                    onPress={() => {
                      sheetRef.current.snapTo(1);
                      props.bottomTabDisplay(true);
                      setDisplayViewMore(true);
                      setSelectedSalon(marker);
                      getCrewData(marker.salon._id);
                    }}
                    coordinate={{
                      latitude: marker.salon.location.coordinates[0],
                      longitude: marker.salon.location.coordinates[1],
                    }}>
                    <View style={{width: 220, alignContent: 'center'}}>
                      <View style={styles.dpBg}>
                        <View style={styles.imgBg}>
                          <Image
                            style={styles.img}
                            source={{uri: marker?.salon?.profileLogo}}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.textContainer}>
                          <SmallTitle
                            title={marker?.time}
                            color={colors.green}
                          />
                        </View>
                      </View>
                    </View>
                  </Marker>
                );
              })
            : null}
        </MapView>
      </View>

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

      <RBSheet
        height={hp(100)}
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
        <CrewDetails
          checkCallback={checkCallback}
          itemData={selectedSalon}
          salonId={selectedSalon?.salon?._id}
          crewData={stylerData}
        />
      </RBSheet>
    </View>
  );
};
export default MapViewScreen;
