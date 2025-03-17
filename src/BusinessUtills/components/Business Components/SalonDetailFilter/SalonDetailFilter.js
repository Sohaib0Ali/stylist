import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../../../assets/icons/icons';
import styles from './style';
import colors from '../../../assets/colors/colors';
import SalonDetailComponent from '../SalonDetailComponent/SalonDetailComponent';
import SemiTitle from '../../SemiTitle';
import Divider from '../../../components/Divider/divider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {
  MAIN_BRANCH,
  SALON_DETAIL,
  SALON_STYLIST,
} from '../../../../../redux/store/actions/salons_Actions';
import {useDispatch} from 'react-redux';

const SalonDetailFilter = ({
  salonData,
  onPressMore,
  getSelectedSalon,
  onPress,
  elevation,
  paddingVertical,
  mySalons,
  logout,
  profile,
  addLocation,
}) => {
  {
    if (salonData !== null) {
      const navigation = useNavigation();
      const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
      const [selectedId, setSelectedId] = useState(MainBranch?._id);
      const dispatch = useDispatch();
      useEffect(() => {
        if (salonData && salonData.length > 0) {
          setSelectedId(salonData[0]?.salon?._id);
          getSelectedSalon(salonData[0]);
        }
      }, [salonData]);
      const handleLogout = async () => {
        dispatch({type: SALON_DETAIL, payload: ''});
        dispatch({type: MAIN_BRANCH, payload: ''});
        dispatch({
          type: SALON_STYLIST,
          payload: '',
        });
        AsyncStorage.clear();
        AsyncStorage.removeItem('fcmToken'),
          navigation.reset({
            index: 0,
            routes: [{name: 'BLOGIN_SCREEN'}],
          });
      };

      return (
        <View style={styles.container}>
          <View style={styles.moreSecBg}>
            {
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={onPressMore}>
                <Image source={icons.line} />
              </TouchableOpacity>
            }
          </View>
          <View style={{height: hp(90)}}>
            <View style={styles.topContainer}>
              <View style={styles.rowContainer}></View>
              <SemiTitle
                title={mySalons}
                color={colors.white}
                fontSize={wp(6.7)}
                marginTop={hp(0.8)}
              />
            </View>
            <View>
              <FlatList
                data={salonData}
                renderItem={({item, index}) => {
                  const backgroundColor =
                    item?.salon?._id === MainBranch?.salon?._id
                      ? colors.yellow
                      : null;
                  const Color =
                    item?.salon?._id === MainBranch?.salon?._id
                      ? '#5E5E5F'
                      : null;
                  const iconmenu =
                    item?.salon?._id === MainBranch?.salon?._id
                      ? icons.threeDots
                      : null;

                  return (
                    <SalonDetailComponent
                      key={item?.salon?._id}
                      address={item?.salon?.address}
                      name={item?.salon?.businessName}
                      price={item?.salon?.price}
                      img={item?.salon?.profileLogo}
                      //  id={item?.salon?._id}
                      // iconImg={iconmenu}
                      paddingVertical={
                        paddingVertical ? paddingVertical : hp(3.1)
                      }
                      elevation={elevation ? elevation : null}
                      type={item?.salon?.type}
                      textColor={Color}
                      backgroundColor={{backgroundColor}}
                      onPress={() => {
                        setSelectedId(item?.salon?._id);
                        getSelectedSalon(item);
                      }}
                    />
                  );
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item?.salon?._id}
              />
            </View>
            <View>
              <Divider marginTop={hp(2.1)} marginBottom={hp(4.1)} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: wp(2.1),
                }}>
                <View style={styles.imgTextContainer}>
                  <View style={styles.imgBg1}>
                    <Image source={icons.plus} tintColor="#FFFFFF" />
                  </View>
                </View>
                <TouchableOpacity
                // onPress={() => navigation.navigate('ADD_LOCATION_HOME')}
                >
                  <Text style={styles.simpleText}>{addLocation}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={onPress}>
                <Text
                  style={[
                    styles.simpleText,
                    {marginTop: hp(3.1), textAlign: 'left'},
                  ]}>
                  {profile}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Text
                  style={[
                    styles.simpleText,
                    {marginTop: hp(3.1), textAlign: 'left'},
                  ]}>
                  {logout}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else null;
  }
};

export default SalonDetailFilter;
