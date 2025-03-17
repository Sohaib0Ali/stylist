//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import SemiTitle from '../../../../BusinessUtills/components/SemiTitle';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import StylistMenu from '../../../../BusinessUtills/components/StylistMenu/StylistMenu';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import MenuComponent from '../../../../BusinessUtills/components/MenuComponent/MenuComponent';
import ScheduleComponent from '../../../../BusinessUtills/components/ScheduleComponent/ScheduleComponent';
import {useTranslation} from 'react-i18next';

const ServiceScreen = ({data, stylist, services}) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(null);
  const {t} = useTranslation();
  let backgroundColor = colors.white;
  useEffect(() => {
    if (isFocused) {
      backgroundColor = colors.white;
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View
            style={{
              paddingTop: hp(2),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: hp(1.5),
            }}>
            <SemiTitle paddingHorizontal={wp('4')} title={t('ourCrew')} />
            <TouchableOpacity onPress={() => navigation.navigate('Stylists')}>
              <SemiMediumTitle
                paddingHorizontal={wp('6')}
                title={t('change')}
                color="#57429D"
              />
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{paddingLeft: '2%'}}
            showsHorizontalScrollIndicator={false}
            data={stylist}
            renderItem={({item}) => {
              return (
                <StylistMenu
                  source={item.profilePic}
                  title={item.firstName}
                  position={item.postion}
                  marginBottom={hp(4.1)}
                />
              );
            }}
            keyExtractor={item => item._id}
            horizontal
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: hp(1.5),
            }}>
            <SemiTitle paddingHorizontal={wp('4')} title={t('ourServices')} />
            <TouchableOpacity
              onPress={() => navigation.navigate('ServiceScreen')}>
              <SemiMediumTitle
                paddingHorizontal={wp('6')}
                title={t('change')}
                color="#57429D"
              />
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{paddingLeft: '4%'}}
            showsHorizontalScrollIndicator={false}
            data={services}
            renderItem={({item, index}) => {
              const backgroundColor =
                item._id === selectedValue ? colors.yellow : colors.white;
              return (
                <MenuComponent
                  icon={item.icon}
                  title={item.servname}
                  onPress={() => setSelectedValue(item._id)}
                  backgroundColor={{backgroundColor}}
                  marginBottom={hp(5)}
                />
              );
            }}
            keyExtractor={item => item._id}
            extraData={selectedValue}
            horizontal
          />
          <SemiTitle paddingHorizontal={wp('4')} title={t('workingHours')} />
          <View>
            <ScheduleComponent schedule={data.salon.schedule} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ServiceScreen;
