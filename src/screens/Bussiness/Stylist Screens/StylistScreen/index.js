//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SalonMenuComponent from '../../../../BusinessUtills/components/Client Components/SalonMenuComponent/SalonMenuComponent';
import ServiceScreen from '../Service Screen';
import ReviewScreen from '../Review Screen';
import PortfolioScreen from '../Portfolio Screen';
import ScheduleScreen from '../Schedule Screen';
import HistoryScreen from '../History Screen';
import StylistHeader from '../../../../BusinessUtills/components/Business Components/Stylist Component/Stylist Header';
import InfoScreen from '../Info Screen';
import AppointmentScreen from '../Appointment Screen';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {showDanger} from '../../../../../Utils/FlashMessage';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

const StylistScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const MenuData = [
    {
      id: '1',
      title: t('info'),
    },
    {
      id: '2',
      title: t('services'),
    },
    {
      id: '3',
      title: t('portfolio'),
    },
    {
      id: '4',
      title: t('schedule'),
    },
    {
      id: '5',
      title: t('appointments'),
    },
    {
      id: '6',
      title: t('workHistory'),
    },
    {
      id: '7',
      title: t('reviews'),
    },
  ];
  const salonData = route.params.salonData;
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const [mainData, setmainData] = useState(MainBranch);
  const sheetRef = React.useRef(0);
  const snapPoints = ['90%', '50%'];
  const [selectedId, setSelectedId] = useState(MenuData[0]?.id);
  const [stylistData, setStylistData] = useState({});
  const [infoData, setInfoData] = useState(null);
  const sID = route?.params?.stylistData?._id;
  const [stylistIndex, setStylistIndex] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getMatchedSalon();
    }
  }, [isFocused]);

  const getMatchedSalon = () => {
    StyList?.map((item, index) => {
      if (item?._id === sID) {
        setStylistData(item);
        setStylistIndex(index);
        getInfoData(item?._id);
      }
    });
  };
  const getInfoData = id => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}/business/getStylistInfo/${id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        const res = response.data;
        if (res.success === true) {
          setIsLoading(false);
          setInfoData(res.data);
        } else {
          setIsLoading(false);
          showDanger(t('somethingWentWrong'));
        }
      })
      .catch(function (error) {
        setIsLoading(false);
      });
  };
  const renderContent = () => {
    return (
      <View
        style={[styles.mainContainer, {marginTop: verticalScale(20)}]}
        showsVerticalScrollIndicator={false}>
        <StylistHeader
          name={stylistData?.fullName}
          star={infoData?.stylistRating?.rating}
          reviews={infoData?.stylistRating?.numberOfRating}
          position={stylistData?.position}
          image={stylistData?.profilePic}
        />
        <View style={styles.body}>
          <View style={{marginTop: scale(20)}}>
            <FlatList
              contentContainerStyle={{
                marginBottom: scale(20),
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
            <InfoScreen data={infoData} stylistDATA={stylistData} />
          ) : selectedId === '2' ? (
            <ServiceScreen data={stylistData} salonData={salonData} />
          ) : selectedId === '3' ? (
            <PortfolioScreen data={stylistData} selectedIndex={stylistIndex} />
          ) : selectedId === '4' ? (
            <ScheduleScreen data={stylistData} selectedIndex={stylistIndex} />
          ) : selectedId === '5' ? (
            <AppointmentScreen data={stylistData} salonData={salonData} />
          ) : selectedId === '6' ? (
            <HistoryScreen data={stylistData} />
          ) : selectedId === '7' ? (
            <ReviewScreen data={stylistData} salonData={salonData} />
          ) : (
            <InfoScreen data={infoData} />
          )}
        </View>
        <CustomeLoader visible={isLoading} />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 1,
          marginTop: hp(5),
          marginLeft: wp(5),
        }}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={25} />
      </TouchableOpacity>
      <Image
        source={{uri: mainData?.salon?.profileImage}}
        style={{height: hp(60), width: wp(100)}}
        resizeMode="cover"
      />
      <View
        style={{
          position: 'absolute',
          marginTop: hp(15),
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.salunText}>{mainData?.salon?.businessName}</Text>
        <Text style={[styles.subtext, {marginTop: hp(0.5)}]}>
          Book and experience our stylist
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp(0.5),
          }}>
          <Icon name="star" color={'#F9A659'} size={16} />
          <Text style={[styles.subtext, {fontSize: 15}]}>
            {mainData?.salonRating?.numberOfRating}
          </Text>
          <Text style={styles.subtext}>
            ({mainData?.salonRating?.rating} reviews)
          </Text>
        </View>
      </View>
      {/* <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={0}
        enableContentPanningGesture={false}>
        {renderContent()}
      </BottomSheet> */}
      <View
        style={{
          height: '100%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: verticalScale(-250),
          backgroundColor: 'white',
        }}>
        {renderContent()}
      </View>
    </View>
  );
};

export default StylistScreen;
