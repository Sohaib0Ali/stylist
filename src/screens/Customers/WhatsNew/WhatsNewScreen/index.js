//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../../components/Header/Header';
import images from '../../../../assets/images/images';
import Title from '../../../../components/Title/Title';
import OfferComponent from '../../../../components/Client Components/WhatsNew/OffereComponent';
import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';
import {showWarning} from '../../../../../Utils/FlashMessage';
import axios from 'axios';
import Config from '../../../../config/config';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('window');
let aspectRatio = width / height;
let ltDelta = 0.0412;
let lgDelta = ltDelta * aspectRatio;

const whatsNewData = [
  {
    id: '1',
    tag: 'TG',
    name: 'Tonu & Guy',
    address: '137 Market St Singapore',
    img: images.man8,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas aliquet vel.',
  },
  {
    id: '2',
    tag: 'RO',
    name: 'Room',
    address: '13 Mill Avenue',
    img: images.woman10,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas aliquet vel.',
  },
];
const WhatsNewScreen = ({navigation}) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [offersData, setOffersData] = useState([]);
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    latitude: 0,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getMyCurrentLocation();
    }
  }, [isFocused]);

  useEffect(() => {
    if (userPosition.latitude != 0) {
      getWhatsNewData();
    }
  }, [userPosition]);
  const getWhatsNewData = () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    axios
      .get(
        `${Config.baseUrl}whatsNew?lat=${userPosition.latitude}&lng=${userPosition.longitude}`,
        {headers},
      )
      .then(response => {
        setLoading(false);
        let res = response.data;
        if (res.success) {
          setOffersData(res.offers);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(e.response?.data?.msg);
        setLoading(false);
      });
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

  const favoriteData = (index, value) => {
    const updatedOfferData = offersData.map(obj => {
      return obj.id == index ? {...obj, favorite: value} : obj;
    });
    setOffersData(updatedOfferData);
  };

  return (
    <View style={styles.container}>
      <Header small />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Title
          paddingHorizontal={wp('4%')}
          title={t('whatsNew')}
          alignSelf="flex-start"
          marginBottom={hp(1.3)}
        />

        <FlatList
          contentContainerStyle={{
            paddingBottom: hp(4),
            paddingHorizontal: wp('4%'),
          }}
          ItemSeparatorComponent={() => <View style={{marginRight: wp(4.5)}} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={offersData}
          renderItem={({item, index}) => (
            <OfferComponent
              id={item._id}
              fav={item.favorite}
              favoriteData={favoriteData}
              img={item.profileImage}
              offerName={item.treatment}
              offers={item.offerDescription}
            />
          )}
          keyExtractor={item => item.backgroundColor}
        />
      </ScrollView>
    </View>
  );
};

export default WhatsNewScreen;
