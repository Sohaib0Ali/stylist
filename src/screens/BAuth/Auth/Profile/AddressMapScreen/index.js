import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Dimensions,
  Image,
} from 'react-native';

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Geolocation from 'react-native-geolocation-service';
import Button from '../../../../../BusinessUtills/components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import images from '../../../../../assets/images/images';
import {scale} from 'react-native-size-matters';

let mapRef = null;
const {width, height} = Dimensions.get('window');
let aspectRatio = width / height;
let ltDelta = 0.0412;
let lgDelta = ltDelta * aspectRatio;

const AdressMapScreen = ({navigation, route}) => {
  let checkAddLocation = route?.params?.checkAddLocation;
  const {t} = useTranslation();
  const [region, setRegion] = useState({
    latitude: 3.094476666666667,
    longitude: 101.67371166666665,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });
  const [mapType, setMapType] = useState('standard');
  const [locationGranted, setLocationGranted] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    latitude: 0,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    latitude: 0,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });

  useEffect(() => {
    if (locationGranted) {
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
  }, [locationGranted]);

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

  const storeLatLong = async markerPosition => {
    if (checkAddLocation) {
      try {
        await AsyncStorage.setItem(
          'lcoationMarkerPosition',
          JSON.stringify(markerPosition),
        );
        navigation.goBack();
      } catch (error) {}
    } else {
      try {
        await AsyncStorage.setItem(
          'markerPosition',
          JSON.stringify(markerPosition),
        );
        navigation.goBack();
      } catch (error) {}
    }
  };

  return (
    <View style={styles.mapBg}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        mapType={mapType}
        annotations={Marker}
        onPress={event => {
          const {nativeEvent} = event;
          setMarkerPosition({
            latitude: nativeEvent.coordinate.latitude,
            longitude: nativeEvent.coordinate.longitude,
          });
        }}
        ref={ref => {
          mapRef = ref;
        }}
        onMapReady={() => {
          setTimeout(() => setMapReady(true), 120), onMapReady();
        }}>
        {markerPosition.latitude != 0 ? (
          <Marker
            coordinate={markerPosition}
            title={t('marker')}
            description={t('thisIsMarker')}
          />
        ) : (
          <Marker
            coordinate={{
              latitude: userPosition?.latitude ? userPosition?.latitude : 0,
              longitude: userPosition?.longitude ? userPosition?.longitude : 0,
            }}>
            <Image
              source={images.selectedIconLocation}
              style={{height: scale(35), width: scale(35), resizeMode: 'cover'}}
            />
          </Marker>
        )}
      </MapView>
      {markerPosition.latitude != 0 ? (
        <View
          style={{
            position: 'absolute',
            bottom: hp(5),
            width: wp(90),
            alignSelf: 'center',
          }}>
          <Button
            buttonText={t('done')}
            onPress={() => {
              storeLatLong(markerPosition);
            }}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default AdressMapScreen;
