import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import BConfig from '../../../../BusinessUtills/config/config';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import Button from '../../../../BusinessUtills/components/Button/Button';
import SeatShowScreen from './SeatShowScreen';
import AddServices from './AddServices';
import BottomSheet, {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AddStylist from './AddStylist';
import AddOffer from './AddOffer';
import {scale, verticalScale} from 'react-native-size-matters';
import DisplayOffer from './DisplayOffer';
import ShowStylist from './ShowStylist';
import {useDispatch, useSelector} from 'react-redux';
import {SET_SNAP_INDEX} from '../../../../../redux/store/actions/sheetManagerActions';
const sheetManager = [
  {
    name: 'Seat',
    btnName: 'Add seat',
    iconImg: icons.newAddServices,
  },
  {
    name: 'Services',
    btnName: 'Add services',
    iconImg: icons.addServices,
  },
  {
    name: 'Stylist',
    btnName: 'Add stylist',
    iconImg: icons.newAddStylist,
  },
  {
    name: 'Finance',
    btnName: 'Add finance',
    iconImg: icons.chairIcon,
  },
  {
    name: 'Offer',
    btnName: 'Create Offer',
    iconImg: icons.newAddStylist,
  },
];

const BottomManageScreen = props => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const Salon_Offers = useSelector(state => state?.SalonDetails?.SalonOffer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [mainData, setmainData] = useState(MainBranch);
  const [offerData, setOfferData] = useState(Salon_Offers);
  const sheetRef = React.useRef(0);
  const [isIndex, setIsINdex] = useState('');
  const [nav, setNav] = useState(null);
  const snapPoints = useSelector(state => state?.sheetManger?.snapPoints);
  const snapIndex = useSelector(state => state?.sheetManger?.snapIndex);

  useEffect(() => {
    if (props?.selectedIndex !== undefined) {
      setIsINdex(props?.selectedIndex);
    } else {
      setIsINdex(props?.route?.params?.selectedIndex);
    }
  }, [props]);

  useEffect(() => {
    setOfferData(Salon_Offers);
  }, []);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const offsetY = event.nativeEvent.contentOffset.y;
  };

  const renderContent = sheetRef => {
    return (
      <>
        <View style={{height: scale(60)}}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={sheetManager}
            onScroll={handleScroll}
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: scale(10),
            }}
            renderItem={({item, index}) =>
              renderItemScroll(item, index, sheetRef)
            }
          />
        </View>
        <InstoServicesComponent />
      </>
    );
  };

  const renderItemScroll = (item, index, sheetRef) => {
    return (
      <View
        style={[
          styles.itemView,
          {backgroundColor: isIndex === index ? 'black' : null},
        ]}>
        <TouchableOpacity
          onPress={() => {
            setIsINdex(index);
            setNav(null);
            snapManage(index);
          }}>
          <Text
            style={[
              styles.itemText,
              {color: isIndex === index ? 'white' : null},
            ]}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const snapManage = index => {
    if (index === isIndex) {
      dispatch({type: SET_SNAP_INDEX, payload: 0});
    }
  };

  useEffect(() => {
    snapManage(isIndex);
  }, [isIndex]);

  const InstoServicesComponent = () => {
    let dataObject = sheetManager[isIndex];
    return (
      <>
        {nav === null ? (
          <View style={{marginTop: hp(2)}}>
            <Text
              style={{
                color: '#5E5E5F',
                fontSize: 16,
                fontWeight: '400',
                marginLeft: hp(4),
              }}>
              {dataObject?.btnName}
            </Text>
            <View style={styles.iconBG}>
              <Image
                source={dataObject?.iconImg}
                style={{height: hp(25), width: wp(25), resizeMode: 'contain'}}
              />
            </View>
            <Button
              buttonText={dataObject?.btnName}
              width="90%"
              marginTop={hp(5)}
              onPress={() => {
                setNav(dataObject?.btnName);
                dispatch({type: SET_SNAP_INDEX, payload: 1});
              }}
            />
          </View>
        ) : (
          SheetNavigation(dataObject, sheetRef)
        )}
      </>
    );
  };
  const onAddOffer = event => {
    if (event === 'AddNEWOFFER') {
      setNav('AddNEWOFFER');
    }
    if (event === 'Create Offer') {
      setNav('Create Offer');
    }
    if (event === 'Add New Stylist') {
      setNav('Add New Stylist');
    }
    if (event === 'Add stylist') {
      setNav('Add stylist');
    }
  };

  const SheetNavigation = dataObject => {
    switch (nav) {
      case 'Add seat':
        return <SeatShowScreen />;
      case 'Add services':
        return <AddServices />;
      case 'Add stylist':
        return StyList?.length > 0 ? (
          <ShowStylist AddNewStylist={onAddOffer} />
        ) : (
          <AddStylist onPressAdd={onAddOffer} />
        );
      case 'Add New Stylist':
        return <AddStylist onPressAdd={onAddOffer} />;
      case 'Add finance':
        return <Text>Case 2 selected</Text>;
      case 'Create Offer':
        return offerData?.length > 0 ? (
          <DisplayOffer OnAddOffer={onAddOffer} />
        ) : (
          <AddOffer OnAddClick={onAddOffer} />
        );
      case 'AddNEWOFFER':
        return <AddOffer OnAddClick={onAddOffer} />;
      default:
        return null;
    }
  };
  return (
    <BottomSheetModalProvider>
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 1,
            marginTop: hp(5),
            marginLeft: wp(5),
          }}
          onPress={() =>
            navigation.navigate('DashboardScreen', {
              screenType: 'Screen_A',
            })
          }>
          <Icon name="arrow-back-ios" size={25} color={colors.white} />
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
              {' '}
              {mainData?.salonRating?.numberOfRating}
            </Text>
            <Text style={styles.subtext}>
              {' '}
              ({mainData?.salonRating?.rating} reviews)
            </Text>
          </View>
        </View>
        {/* <BottomSheetModalProvider>
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            index={snapIndex}
            enableContentPanningGesture={false}> */}
        <View
          style={{
            height: '100%',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: nav ? verticalScale(-230) : verticalScale(-110),
            backgroundColor: 'white',
          }}>
          {renderContent(sheetRef)}
        </View>
        {/* </BottomSheet>
        </BottomSheetModalProvider> */}
      </View>
    </BottomSheetModalProvider>
  );
};

export default BottomManageScreen;

const styles = StyleSheet.create({
  moreSecBg: {
    marginTop: hp(3),
  },
  salunText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 28,
  },
  subtext: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 13,
  },
  itemView: {
    marginLeft: wp(5),
    alignSelf: 'center',
    paddingHorizontal: wp(6),
    paddingVertical: hp(1),
    borderRadius: 40,
    borderColor: 'grey',
    borderWidth: 0.8,
  },
  itemText: {
    fontWeight: '500',
    fontSize: 14,
  },
  iconBG: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F5F3',
    justifyContent: 'center',
    borderWidth: wp(0.5),
    borderColor: colors.borderColor,
    borderRadius: 100,
    width: 200, //wp(42),
    height: 200, //wp(55),
    marginTop: hp(3),
  },
  containerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(8),
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: {width: -2, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#FFFFFF',
    marginTop: hp(1),
  },
});
