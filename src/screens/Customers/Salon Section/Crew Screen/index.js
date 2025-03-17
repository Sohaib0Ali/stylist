//================================ React Native Imported Files ======================================//
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import SalonDetailComponent from '../../../../components/Client Components/SalonDetailComponent/SalonDetailComponent';
import CrewDetails from '../../../../components/Client Components/Crew Details';
import RBSheet from 'react-native-raw-bottom-sheet';
import Config from '../../../../config/config';
import {showWarning} from '../../../../../Utils/FlashMessage';
import axios from 'axios';
import CustomeLoader from '../../../../components/Loader/CustomeLoader';
import {scale} from 'react-native-size-matters';
import Button from '../../../../components/Button/Button';
import {useTranslation} from 'react-i18next';
import Crewdetailscomponent from '../../../../components/Client Components/Crewdetailscomponent';
import SmallText from '../../../../components/SmallText/SmallText';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import {useNavigation} from '@react-navigation/native';
import {CONFIRM_BOOK} from '../../../../constants/navigators';
import SemiTitle from '../../../../components/SemiTitle';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {
  ADD_SELECTED_ITEM,
  REMOVE_SELECTED_ITEM,
} from '../../../../../redux/store/actions/ApiData';

let count = 0;

const CrewScreen = ({sID, itemData}) => {
  const selectedItems = useSelector(state => state?.ApiData?.selectedItem);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [crewData, setCrewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stylerData, setStylerData] = useState();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedstylistId, setsSelectedstylistId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getCrewData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (count == 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, 500);
  }, [crewData]);

  const getCrewData = async () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    axios
      .get(`${Config.baseUrl}getStylistBySalonId/${sID}`, {headers})
      .then(response => {
        setLoading(false);
        if (response.status === Config.statusCode) {
          count = count + 1;
          setCrewData(response.data.data);
        } else {
          showWarning(Strings.TryAgain);
        }
      })
      .catch(e => {
        showWarning(Strings.TryAgain);
        setLoading(false);
      });
  };

  const checkCallback = () => {
    refRBSheet.current.close();
  };
  const book_appoiment = () => {
    if (selectedItems != undefined && selectedItems.length > 0) {
      navigation.navigate(CONFIRM_BOOK, {item: itemData});
    } else {
      alert('Please select services');
    }
  };

  const toggleExpand = item => {
    setsSelectedstylistId(item);
    if (expandedItems.includes(item?.stylist?._id)) {
      setExpandedItems(expandedItems.filter(id => id !== item?.stylist?._id));
    } else {
      setExpandedItems([...expandedItems, item?.stylist?._id]);
    }
  };

  const setSelectedOpetions = (id, selectedstylistId) => {
    const data = {
      Service_id: id,
      crew_Id: selectedstylistId,
    };
    if (
      selectedItem.some(
        item =>
          item.crew_Id === data.crew_Id && item.Service_id === data.Service_id,
      )
    ) {
      setSelectedItem(
        selectedItem.filter(
          item =>
            !(
              item.crew_Id === data.crew_Id &&
              item.Service_id === data.Service_id
            ),
        ),
      );
    } else {
      setSelectedItem([...selectedItem, data]);
    }
  };

  const setSelectedOptions = (
    crewid,
    id,
    price,
    crewinfo,
    servname,
    expandID,
    salonname,
    salonID,
    ServiceType,
  ) => {
    const data = {
      crewid: crewid,
      Service_id: id,
      price: price,
      crewinfo: crewinfo,
      Service_name: servname,
      Main_ServiceID: expandID,
      salon_Id: salonID,
      salonname: salonname,
      service_type: ServiceType,
    };
    if (
      selectedItems.some(
        item =>
          item.crewid === data.crewid && item.Service_id === data.Service_id,
      )
    ) {
      // If the item is already selected, remove it from the array
      dispatch({type: REMOVE_SELECTED_ITEM, payload: data});
    } else {
      // If the item is not already selected, add it to the array
      dispatch({type: ADD_SELECTED_ITEM, payload: data});
    }
  };

  return (
    <View style={[styles.container]}>
      {crewData.length > 0 ? (
        <>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#000000"
              style={{alignSelf: 'center'}}
            />
          ) : (
            <>
              <SmallTitle
                title={'Book appointment with top top stylists'}
                fontSize={scale(16)}
                Weight={'400'}
                color={colors.subHeading}
              />
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{paddingVertical: scale(20), height: scale(480)}}>
                {crewData != undefined && crewData?.length > 0 ? (
                  <>
                    {crewData?.map((item, index) => {
                      const backgroundColor = expandedItems.includes(
                        item?.stylist?._id,
                      )
                        ? colors.yellow
                        : colors.white;
                      const expandedid = expandedItems.includes(
                        item?.stylist?._id,
                      )
                        ? item?.stylist?._id
                        : null;
                      const expandItem = expandedItems.includes(
                        item?.stylist?._id,
                      )
                        ? item?.stylist
                        : null;
                      const isExpands = expandedItems.includes(
                        item?.stylist?._id,
                      )
                        ? true
                        : false;
                      return (
                        <>
                          <Crewdetailscomponent
                            cat={item?.stylist?.position}
                            name={item?.stylist?.fullName}
                            price={item?.stylist?.price}
                            img={item?.stylist?.profilePic}
                            type={item?.stylist?.currency}
                            backgroundColor={{backgroundColor}}
                            services={item?.services}
                            onPress={() => toggleExpand(item)}
                          />
                          {isExpands && (
                            <>
                              {item?.services?.map((items, index) => {
                                return (
                                  <>
                                    <SemiTitle
                                      paddingHorizontal={wp('4')}
                                      title={items?.title}
                                      alignSelf="flex-start"
                                      marginBottom={hp(2)}
                                      marginLeft={scale(10)}
                                    />
                                    {items?.data?.map((item, index) => {
                                      return (
                                        <SalonDetailComponent
                                          selected={
                                            selectedItems.some(
                                              items =>
                                                items?.crewid === expandedid &&
                                                items?.Service_id === item._id,
                                            )
                                              ? true
                                              : false
                                          }
                                          time={item?.approxtime}
                                          name={item?.name}
                                          price={item?.price}
                                          img={item.icon}
                                          type={item.currency}
                                          onPress={() => {
                                            setSelectedOptions(
                                              expandedid,
                                              item._id,
                                              item?.price,
                                              expandItem,
                                              item?.name,
                                              items?._id,
                                              itemData?.salon?.businessName,
                                              itemData?.salon?._id,
                                              items?.title,
                                            );
                                          }}
                                          service
                                        />
                                      );
                                    })}
                                  </>
                                );
                              })}
                            </>
                          )}
                        </>
                      );
                    })}
                  </>
                ) : (
                  <Text>no services found</Text>
                )}
              </ScrollView>

              <Button
                buttonText={t('Book')}
                marginTop={hp(3)}
                alignSelf={'center'}
                marginBottom={scale(10)}
                onPress={() => book_appoiment()}
              />
            </>
          )}
        </>
      ) : (
        <>
          <SmallText text={'No Crew Found '} />
        </>
      )}

      <RBSheet
        height={hp(100)}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(4),
            borderTopRightRadius: wp(4),
          },
          draggableIcon: {
            backgroundColor: colors.borderColor,
          },
        }}>
        <CrewDetails
          checkCallback={checkCallback}
          itemData={itemData}
          salonId={sID}
          crewData={stylerData}
        />
      </RBSheet>
      <CustomeLoader visible={loading} />
    </View>
  );
};

export default CrewScreen;
