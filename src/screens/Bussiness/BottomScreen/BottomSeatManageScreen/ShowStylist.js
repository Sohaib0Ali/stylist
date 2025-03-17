import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {scale, verticalScale} from 'react-native-size-matters';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import StylistDetailComponent from '../../../../BusinessUtills/components/Business Components/Stylist Component/StylistDetailComponent';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const ShowStylist = ({AddNewStylist}) => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);

  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [stylist, setStylist] = useState(StyList);
  const [selectedId, setSelectedId] = useState(null);
  const [hasFetchedStylistInfo, setHasFetchedStylistInfo] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (!hasFetchedStylistInfo) {
      getStylistInfo();
      setHasFetchedStylistInfo(true);
    }
  }, [hasFetchedStylistInfo]);

  const getStylistInfo = async () => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getStylistBySalonId/${MainBranch?.salon?._id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        setIsLoading(false);
        const res = response.data;
        {
          res?.success === true && setStylist(res.data.stylist);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
      });
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          AddNewStylist('Add New Stylist');
        }}>
        <Text
          style={[
            styles.subTextHeading,
            {
              marginTop: hp(2),
              marginHorizontal: scale(25),
              marginBottom: scale(5),
            },
          ]}>
          {' '}
          + Add Stylist
        </Text>
      </TouchableOpacity>
      <View style={styles.alertView}>
        <View style={styles.alertBG}>
          <Text style={{color: 'white'}}>!</Text>
        </View>
        <Text style={{color: '#DE4C5B', marginLeft: scale(16)}}>
          {t('stylistAnnouncement')}
        </Text>
      </View>
      <ScrollView
        style={{marginBottom: verticalScale(220)}}
        showsVerticalScrollIndicator={false}>
        {stylist?.map(item => {
          const backgroundColor =
            item?._id === selectedId ? colors.yellow : colors.white;
          return (
            <StylistDetailComponent
              key={item?._id}
              name={item?.fullName}
              textColor={'black'}
              cat={item?.position}
              status={item?.status}
              img={item?.profilePic}
              service={true}
              backgroundColor={{backgroundColor}}
              onPress={() => {
                setSelectedId(item?._id);
                navigation.navigate('BSTYLIST_SCREEN', {
                  stylistData: item,
                  salonData: MainBranch,
                });
              }}
            />
          );
        })}
      </ScrollView>
      <CustomeLoader visible={isLoading} />
    </View>
  );
};

export default ShowStylist;

const styles = StyleSheet.create({
  subTextHeading: {
    color: '#57429D',
    fontSize: 16,
    fontWeight: '400',
  },
  alertView: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: scale(33),
    borderWidth: scale(0.5),
    borderColor: 'grey',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 0,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginBottom: scale(10),
  },
  alertBG: {
    height: scale(15),
    marginLeft: scale(12),
    width: 15,
    borderRadius: 100,
    backgroundColor: '#FF6C6C',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A10606',
  },
});
