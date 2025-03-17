//================================ React Native Imported Files ======================================//

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Image,
  Dimensions,
} from 'react-native';

//================================ Local Imported Files ======================================//
import MapView, {Marker} from 'react-native-maps';
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DarkHeader from '../../../../components/Barber/DarkHeader/DarkHeader';
import colors from '../../../../assets/colors/colors';
import Button from '../../../../components/Button/Button';
import icons from '../../../../assets/icons/icons';
import images from '../../../../assets/images/images';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import Geolocation from 'react-native-geolocation-service';
import CurrentPositionIcon from '../../../../assets/icons/currentPointIcon.svg';

let mapRef = null;

const {width, height} = Dimensions.get('window');
let aspectRatio = width / height;
let ltDelta = 0.0412;
let lgDelta = ltDelta * aspectRatio;

const FeedBackScreen = ({navigation}) => {
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
  const [locationGranted, setLocationGranted] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const refRBSheet = useRef();
  const [text, setText] = useState('');
  const [fullText, setFullText] = useState(t('ThankYouJake'));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText?.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 10);
    }
  }, [index]);

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

  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <DarkHeader onPress={() => refRBSheet.current.open()} />
      <View style={styles.mapBg}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          initialRegion={region}
          mapType={mapType}
          ref={ref => {
            mapRef = ref;
          }}
          onMapReady={() => {
            setTimeout(() => setMapReady(true), 120), onMapReady();
          }}
          region={coordinates}>
          <Marker
            key={1}
            tracksViewChanges={false}
            coordinate={{
              latitude: userPosition?.latitude ? userPosition?.latitude : 0,
              longitude: userPosition?.longitude ? userPosition?.longitude : 0,
            }}>
            <CurrentPositionIcon height={35} width={35} />
          </Marker>
          <Marker coordinate={{latitude: 31.460085, longitude: -285.729928}}>
            <View style={{width: 120, alignContent: 'center'}}>
              <View style={styles.dpBg}>
                <View style={styles.imgBg}>
                  <Image style={styles.img} source={images.man4} />
                </View>
                <View style={styles.textContainer}>
                  <SmallTitle title="20 mins" color={colors.green} />
                </View>
              </View>
            </View>
          </Marker>
        </MapView>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.otherContainer}>
          <View style={styles.talkBubble}>
            <View
              style={styles.iconImageBg}
              onPress={() => setIsVisible(!isVisible)}>
              <Image
                style={styles.img}
                source={icons.snap}
                resizeMode="contain"
              />
            </View>
            <View style={{top: wp(1.5)}}>
              <View style={styles.talkBubbleTriangle} />
              <View style={styles.talkBubbleSquare}>
                <Text style={styles.talkBubbleMessage}>{text}</Text>
              </View>
            </View>
          </View>
        </View>

        <Button
          buttonText="Back to booking"
          onPress={() => navigation.navigate('DISCOVER_SCREEN')}
        />
      </View>
    </View>
  );
};
export default FeedBackScreen;
