import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import SeatMenuComponent from '../../../../BusinessUtills/components/SeatMenuComponent/SeatMenuComponent';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../../../BusinessUtills/components/Button/Button';
import {useTranslation} from 'react-i18next';
import {scale} from 'react-native-size-matters';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import IconIconic from 'react-native-vector-icons/Ionicons';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import AddSeatDetails from './AddSeatDetails';
import {useSelector} from 'react-redux';
import SeatDetails from '../Component/SeatDetails';
import AddWalk from '../Component/AddWalk';

const SeatShowScreen = () => {
  const SeatData = useSelector(state => state?.SalonDetails?.SeatData);
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const Salon_Services = useSelector(
    state => state?.SalonDetails?.SalonServices,
  );
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const {t, i18n} = useTranslation();
  i18n.changeLanguage('');

  const [seatsData, setSeatData] = useState(SeatData);
  const [isShowView, setIsShowView] = useState('All SeatDetails');
  //Seat Detail
  const [seatActive, setIsSeatActive] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  //Show Client details
  const [selectedSeatData, setSelectedSeatData] = useState('');
  console.log('selectedSeatData==>', selectedSeatData);

  // const onSelectGender = useCallback(
  //   gender => {
  //     setSelectedGender(gender);
  //   },
  //   [setSelectedGender],
  // );

  // const onSelect = useCallback(
  //   value => {
  //     setIsSeatActive(value);
  //   },
  //   [setIsSeatActive],
  // );

  const ManageComponent = () => {
    switch (isShowView) {
      case 'All SeatDetails':
        return <AllCreatedSeat />;
      case 'Add NewSeat':
        return <AddSeatDetails />;
      case 'Seat Details':
        return <SeatDetails seatData={selectedSeatData} />;
      case 'Add finance':
        return <Text>Case 2 selected</Text>;
      default:
        return null;
    }
  };

  const AllCreatedSeat = () => {
    return (
      <View>
        <Text
          style={[
            styles.subTextHeading,
            {
              marginHorizontal: scale(25),
              marginVertical: scale(10),
              fontWeight: '600',
            },
          ]}>
          {t('addSeats')}
        </Text>
        {seatsData.length === 0 ? (
          <View
            style={{
              height: hp(13.5),
              marginBottom: hp(1),
            }}>
            <TouchableOpacity
              onPress={() => setIsShowView('Add NewSeat')}
              activeOpacity={0.7}
              style={[styles.containerSeat]}>
              <View style={styles.iconBg}>
                <Image
                  resizeMode="cover"
                  style={styles.icon}
                  source={icons.chairIcon}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <SmallTitle
                  title={'Add seat'}
                  marginTop={wp(0.7)}
                  marginBottom={wp(1)}
                  width={wp(20)}
                />
                <IconIconic
                  name="add-circle-outline"
                  size={22}
                  style={{marginLeft: wp(-1)}}
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={seatsData}
            renderItem={({item}) => {
              return (
                <SeatMenuComponent
                  key={item._id}
                  icon={icons.chairIcon}
                  bookingCount={item?.seat?.bookingCount}
                  title={'Seat ' + item?.seat?.seatNo}
                  marginBottom={hp(4.1)}
                  onPress={() => {
                    setIsShowView('Seat Details');
                    setSelectedSeatData(item);
                  }}
                  onPressAddseat={() => {}}
                />
              );
            }}
            keyExtractor={item => item?.seat?._id}
            horizontal
          />
        )}
        {StyList === undefined || StyList.length === 0 ? (
          <View style={styles.popUpView}>
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: 10,
                lineHeight: 30,
              }}>
              You must create the{' '}
              <Text style={{color: '#56429D', textDecorationLine: 'underline'}}>
                services
              </Text>{' '}
              &{' '}
              <Text style={{color: '#56429D', textDecorationLine: 'underline'}}>
                stylists
              </Text>{' '}
              section before assigning them to the seat. You can always come
              back for changes
            </Text>
          </View>
        ) : null}

        <Button
          buttonText={'Add Seat'}
          width="90%"
          marginTop={hp(10)}
          onPress={() => setIsShowView('Add NewSeat')}
        />
      </View>
    );
  };

  return <View>{ManageComponent()}</View>;
};

export default SeatShowScreen;

const styles = StyleSheet.create({
  popUpView: {
    marginTop: hp(10),
    height: hp(15),
    backgroundColor: 'rgba(255, 204, 0, 0.2)',
    width: wp(80),
    alignSelf: 'center',
    justifyContent: 'center',
    borderLeftWidth: 9,
    borderLeftColor: '#56429D',
  },
  subTextHeading: {
    color: '#5E5E5F',
    fontSize: 16,
    fontWeight: '400',
  },
  addButton: {
    height: 45,
    width: 90,
    marginLeft: wp(65),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#56429D',
    borderRadius: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: scale(115),
    marginTop: hp(1),
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
  },
  radioNotselect: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#848286',
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#27232C',
  },
  seatDetailsContainer: {
    height: '100%',
    width: '100%',
    height: 200,
    backgroundColor: 'white',
  },
  containerSeat: {
    alignItems: 'center',
    paddingTop: 10,
    height: hp(20),
    width: wp(32),
    borderRadius: wp(5),
    shadowColor: '#00000d',
  },
  iconBg2: {
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 133,
    backgroundColor: '#FFDE82',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 6,
    zIndex: 1,
  },
  iconBg: {
    backgroundColor: '#F6F5F3',
    borderWidth: wp(0.5),
    borderColor: colors.borderColor,
    borderRadius: wp(5),
    padding: wp(1),
    width: wp(20), //wp(42),
    height: hp(10), //wp(55),
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
