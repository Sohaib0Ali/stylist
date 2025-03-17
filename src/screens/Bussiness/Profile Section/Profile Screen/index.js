//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SalonMenuComponent from '../../../../BusinessUtills/components/Client Components/SalonMenuComponent/SalonMenuComponent';
import ServiceScreen from '../Info Screen';
import ReviewScreen from '../Review Screen';
import PortfolioScreen from '../Portfolio Screen';
import BookingHeader from '../../../../BusinessUtills/components/Client Components/Booking/Booking Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const ProfileScreen = ({navigation, route}) => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const Salon_Services = useSelector(
    state => state?.SalonDetails?.SalonServices,
  );
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const MenuData = [
    {
      id: '1',
      title: t('info'),
    },
    {
      id: '2',
      title: t('portfolio'),
    },
    {
      id: '3',
      title: t('reviews'),
    },
  ];
  const [selectedId, setSelectedId] = useState('1');
  let data = MainBranch;
  let services = Salon_Services;
  let stylist = StyList;
  useEffect(() => {
    if (isFocused) {
      data = MainBranch;
      services = Salon_Services;
      stylist = StyList;
    }
  }, [isFocused]);

  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <BookingHeader
        name={data?.salon?.businessName}
        img={data?.salon?.profileImage}
        star={data?.salonRating?.rating}
        selectedId={selectedId}
        reviews={data.salonRating.numberOfRating}
        editPress={() =>
          navigation.navigate('EDIT_PROFILE_HOME', {
            salonData: data.salon,
          })
        }
        btnPress={() => navigation.navigate('PROFILE_PORTFOLIO')}
      />
      {data ? (
        <View style={styles.body}>
          <View>
            <FlatList
              contentContainerStyle={{
                paddingVertical: hp(2.8),
              }}
              showsHorizontalScrollIndicator={false}
              data={MenuData}
              horizontal
              renderItem={({item, index}) => {
                const backgroundColor =
                  item.id === selectedId
                    ? colors.headingBlack
                    : index == 0 && selectedId == null
                    ? colors.headingBlack
                    : colors.white;
                const color =
                  item.id === selectedId
                    ? colors.white
                    : index == 0 && selectedId == null
                    ? colors.white
                    : colors.subHeading;
                return (
                  <SalonMenuComponent
                    title={item.title}
                    onPress={() => setSelectedId(item.id)}
                    backgroundColor={{backgroundColor}}
                    color={{color}}
                  />
                );
              }}
              keyExtractor={item => item.id}
              extraData={selectedId}
            />
          </View>

          {selectedId === '1' ? (
            <ServiceScreen stylist={stylist} services={services} data={data} />
          ) : selectedId === '2' ? (
            <PortfolioScreen data={data} />
          ) : selectedId === '3' ? (
            <ReviewScreen data={data} />
          ) : (
            <ServiceScreen stylist={stylist} services={services} data={data} />
          )}
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={'#57429D'} />
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
