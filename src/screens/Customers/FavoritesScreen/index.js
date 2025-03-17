//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../components/Header/Header';
import images from '../../../assets/images/images';
import TrendingComponent from '../../../components/Barber/TrendingComponent/TrendingComponent';
import Title from '../../../components/Title/Title';
import axios from 'axios';
import Config from '../../../config/config';
import {showWarning} from '../../../../Utils/FlashMessage';
import CustomeLoader from '../../../components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';

const FavoritesScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [favData, setFavData] = useState([]);

  const favoriteData1 = salonID => {
    deleteFav(salonID);
  };

  useEffect(() => {
    getFavData();
  }, []);

  const getFavData = async () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${Config.token}`,
    };
    axios
      .get(`${Config.baseUrl}getFavoriteSalon`, {headers})

      .then(response => {
        setLoading(false);
        if (response.status === Config.statusCode) {
          setFavData(response.data.data);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  const deleteFav = async salonId => {
    setLoading(true);
    var config = {
      method: 'patch',
      url: `${Config.baseUrl}/removeSalontoFavrite/${salonId}`,
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          getFavData();
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(function (error) {});
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body} showsVerticalScrollIndicator={false}>
        <Title
          paddingHorizontal={wp('4%')}
          title="Favorites"
          marginBottom={hp(2)}
          alignSelf="flex-start"
        />

        {favData?.length == 0 ? (
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'black'}}>{t('Nofavoritesalonfound')}</Text>
          </View>
        ) : (
          <View style={{marginBottom: hp(22)}}>
            <FlatList
              contentContainerStyle={{}}
              showsVerticalScrollIndicator={false}
              data={favData}
              renderItem={({item, index}) => (
                <TrendingComponent
                  logo={item.salon.profileLogo}
                  id={item.salon._id}
                  fav={true}
                  favoriteData1={favoriteData1}
                  img={item.salon.profileImage}
                  time={item.distanceInMiles}
                  name={item.salon.businessName}
                  address={item.salon.address}
                  company="TG"
                  star={item.salonRating.rating}
                  review={item.salonRating.numberOfRating}
                  onPress={() =>
                    navigation.navigate('SALON_SCREEN', {itemData: item})
                  }
                />
              )}
              keyExtractor={item => item?.salon?._id}
            />
          </View>
        )}
        <CustomeLoader visible={loading} />
      </View>
    </View>
  );
};

export default FavoritesScreen;
