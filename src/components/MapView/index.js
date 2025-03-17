//================================ React Native Imported Files ======================================//

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';

//================================ Local Imported Files ======================================//
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import styles from './style';
import icons from '../../assets/icons/icons';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import images from '../../assets/images/images';
import Translator from 'react-native-translator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale} from 'react-native-size-matters';
import colors from '../../assets/colors/colors';

const {width, height} = Dimensions.get('window');
let aspectRatio = width / height;
let ltDelta = 0.0412;
let lgDelta = ltDelta * aspectRatio;

const MapViewCmp = ({nearByData, onMarkerPress, currentLocation}) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const [name, setName] = useState('');
  const [isModalVisible, setModalVisible] = useState('false');
  const [isPhoneModalVisible, setPhoneModalVisible] = useState('false');
  const [markers, setMarkers] = useState([]);
  const [text, setText] = useState('');
  const [phoneText, setPhoneText] = useState('');
  const [fullText, setFullText] = useState(t('ChooseSpecialist'));
  const [fullTextResult, setFullTextResult] = useState();
  const [secondFullText, setSecondFullText] = useState(
    'Enter the phone number for registration in the salon.',
  );
  const [index, setIndex] = useState(0);
  const [indexForSecondModel, setIndexForSecondModel] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const mapViewRef = React.createRef();

  useEffect(() => {
    const coordinates = nearByData?.map(
      item => item?.salon?.location?.coordinates,
    );
    setMarkers(coordinates);
  }, [nearByData]);

  useEffect(() => {
    <Translator
      from="en"
      to={selectedLanguage}
      value={text}
      onTranslated={trans => setFullTextResult(trans)}
    />;
  }, []);
  useEffect(() => {
    getLanguage();
  }, []);
  const getLanguage = async () => {
    await AsyncStorage.getItem('selectedLang').then(value => {
      if (value) {
        setSelectedLanguage(value);
      }
    });
  };
  useEffect(() => {
    if (isFocused) {
    } else {
      setModalVisible('false');
      setPhoneModalVisible('false');
      setIndex(fullTextResult?.length);
    }
  }, [isFocused]);

  useEffect(() => {
    if (index < fullText?.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 100);
    }
  }, [index]);

  useEffect(() => {
    if (indexForSecondModel < secondFullText?.length && isPhoneModalVisible) {
      setTimeout(() => {
        setPhoneText(phoneText + secondFullText[indexForSecondModel]);
        setIndexForSecondModel(indexForSecondModel + 1);
      }, 10);
    }
  }, [indexForSecondModel, isPhoneModalVisible]);

  const handleShowCurrentLocation = () => {
    if (currentLocation) {
      mapViewRef.current.animateToRegion({
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };
  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      {(currentLocation?.latitude !== null ||
        currentLocation?.longitude !== null) && (
        <MapView
          provider={
            Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          style={styles.map}
          onMapReady={() => {
            Platform.OS === 'android'
              ? PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                )
              : '';
          }}
          initialRegion={{
            latitude: currentLocation?.latitude ? currentLocation?.latitude : 0,
            longitude: currentLocation?.longitude
              ? currentLocation?.longitude
              : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          toolbarEnabled={true}
          zoomEnabled={true}
          rotateEnabled={true}
          ref={mapViewRef}
          onMapLoaded={() => {
            setModalVisible('true');
          }}>
          <Marker
            coordinate={{
              latitude: currentLocation?.latitude
                ? currentLocation?.latitude
                : 0,
              longitude: currentLocation?.longitude
                ? currentLocation?.longitude
                : 0,
            }}
            title="Current Location"
          />
          {markers?.length > 0 && (
            <>
              {markers?.map((coordinate, index) => {
                return (
                  <>
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: coordinate[0],
                        longitude: coordinate[1],
                      }}
                      onPress={() => onMarkerPress(nearByData[index])}>
                      <TouchableOpacity>
                        <View style={styles.LocationLable}>
                          <Text style={styles.LocationTime}>
                            {nearByData[index]?.time}
                          </Text>
                        </View>
                        <Image
                          source={images.LocationIndicator}
                          style={styles.Locationmarker}
                        />
                      </TouchableOpacity>
                    </Marker>
                  </>
                );
              })}
            </>
          )}
        </MapView>
      )}

      {Platform.OS == 'ios' && (
        <TouchableOpacity
          style={{
            backgroundColor: colors.white,
            width: scale(44),
            height: scale(44),
            borderRadius: 15,
            position: 'absolute',
            top: scale(250),
            justifyContent: 'center',
            right: scale(12),
          }}
          onPress={() => {
            handleShowCurrentLocation();
          }}>
          <Image
            style={{
              alignSelf: 'center',
              width: scale(26.16),
              height: scale(26.16),
            }}
            source={images.currentLoc}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <View style={styles.bottomContainer}>
        <View style={styles.toolTipBg}>
          <View style={styles.otherContainer}>
            <View style={styles.talkBubble}>
              <View style={styles.talkBubbleSquare}>
                <Text style={styles.talkBubbleMessage}>{text}</Text>
              </View>
              <Image
                style={styles.thought}
                source={images.thought}
                resizeMode="contain"
              />
              <View
                style={styles.iconImageBg}
                onPress={() => setIsVisible(!isVisible)}>
                <Image
                  style={styles.img}
                  source={icons.snap}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default MapViewCmp;
