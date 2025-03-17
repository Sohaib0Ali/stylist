//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  ActivityIndicator,
  Image,
  Modal,
} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../../assets/colors/colors';
import SalonDetailComponent from '../../../../components/Client Components/SalonDetailComponent/SalonDetailComponent';
import {useNavigation} from '@react-navigation/native';
import SemiTitle from '../../../../components/SemiTitle';
import {useIsFocused} from '@react-navigation/native';
import Config from '../../../../config/config';
import {showWarning} from '../../../../../Utils/FlashMessage';
import axios from 'axios';
import CustomeLoader from '../../../../components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {scale} from 'react-native-size-matters';
import fonts from '../../../../assets/fonts/fonts';
import Button from '../../../../components/Button/Button';
import SmallText from '../../../../components/SmallText/SmallText';
import images from '../../../../assets/images/images';
import {useDispatch, useSelector} from 'react-redux';
import {
  ADD_SELECTED_ITEM,
  REMOVE_SELECTED_ITEM,
  REMOVE_SERVICES,
} from '../../../../../redux/store/actions/ApiData';
import {CONFIRM_BOOK, REGISTER_SCREEN} from '../../../../constants/navigators';
import {ScrollView} from 'react-native-gesture-handler';
import Strings from '../../../../constants/Strings';
import {OPEN_SHEET} from '../../../../../redux/store/actions/sheetManagerActions';
import AuthenticationModel from '../../../../components/AuthenticationModel/AuthenticationModel';
let count = 0;
const ServiceScreen = ({sID, itemData}) => {
  const mergedString = `${itemData?.salon?.address}, ${itemData?.salon?.city}, ${itemData?.salon?.postCode}`;

  const selectedItems = useSelector(state => state?.ApiData?.selectedItem);
  const selcted_services = useSelector(
    state => state?.ApiData?.selectedService,
  );
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [width, setWidth] = useState(0);
  let maxWidth = 0;

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [servData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serviceExpand, setServiceExpand] = useState(false);
  const [crewData, setCrewData] = useState([]);
  const [crewId, setCrewId] = useState(crewData[0]?.stylist?._id);
  const [filterdata, setfilterdata] = useState([]);
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [Expandservice, setExpandservice] = useState([]);
  const [expandID, setExpandID] = useState();
  const [ServiceType, setServiceType] = useState();
  const [crewinfo, SetCrewinfo] = useState({});
  const [AuthModal, setAuthModal] = useState(false);
  const [Registration, setRegistration] = useState(false);
  const [later, setLater] = useState(false);
  let filterconstID = [];

  useEffect(() => {
    if (!Config?.token) {
      setAuthModal(true);
    }
  }, []);

  let backgroundColor = colors.white200;
  useEffect(() => {
    if (isFocused) {
      getServicesData();
      backgroundColor = colors.white;
    }
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      if (count == 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, 500);
  }, [servData, count]);

  const getServicesData = async () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };

    axios
      .get(`${Config.baseUrl}getserviceBySalon/${sID}`, {headers})
      .then(response => {
        setLoading(false);
        if (response.status === Config.statusCode) {
          count = count + 1;
          setServicesData(response.data.data);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  useEffect(() => {
    getCrewData();
  }, []);

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
          SetCrewinfo(response?.data?.data[0]?.stylist);
          setCrewId(response?.data?.data[0]?.stylist?._id);
          setCrewData(response?.data?.data);
        } else {
          showWarning(Strings.TryAgain);
        }
      })
      .catch(e => {
        showWarning(Strings.TryAgain);
        setLoading(false);
      });
  };

  useEffect(() => {
    const demo = crewData?.filter(item => {
      return item?.stylist?._id === crewId;
    });

    const demo2 = demo.map(item => {
      return item?.services;
    });
    setfilterdata(demo2[0]);
  }, [crewId, crewData]);

  const expandservice = (crewId, id, servicetype) => {
    setExpandID(id);
    setServiceType(servicetype);
    const data = {
      crewid: crewId,
      mainservices_id: id,
    };
    if (
      Expandservice.some(
        item =>
          item.crewid === data?.crewid &&
          item.mainservices_id === data.mainservices_id,
      )
    ) {
      setExpandservice(
        Expandservice.filter(
          item =>
            !(
              item.crewid === data.crewid &&
              item.mainservices_id === data.mainservices_id
            ),
        ),
      );
    } else {
      setExpandservice([...Expandservice, data]);
    }
  };

  const setSelectedOpetions = (
    crewid,
    id,
    price,
    crewinfo,
    servname,
    expandID,
    salonname,
    salonAddress,
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
      salonAddress: salonAddress,
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

  const crewselect = item => {
    SetCrewinfo(item?.stylist);
    setCrewId(item?.stylist?._id);
  };

  const renderSectionHeader = ({section}) => {
    const isExpanded = Expandservice.some(
      items =>
        items?.crewid === crewId && items?.mainservices_id === section?._id,
    )
      ? true
      : false;
    return (
      <TouchableOpacity
        onPress={() => expandservice(crewId, section?._id, section?.title)}
        style={[
          styles.service,
          {
            backgroundColor: isExpanded ? colors.selected_yellow : colors.white,
          },
        ]}>
        <View
          style={{
            alignSelf: 'center',
            marginLeft: scale(20),
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <SemiTitle
            title={section?.title}
            alignSelf="flex-start"
            marginLeft={scale(5)}
            fontSize={scale(16)}
          />
        </View>
        <View style={styles.noofservice}>
          <Text
            style={{
              fontSize: scale(12),
              fontWeight: '500',
              fontFamily: fonts.Exo2Bold,
              color: colors.white,
              borderRadius: 50,
            }}>
            {section?.data?.length}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={{marginBottom: scale(40)}}
          nestedScrollEnabled={true}>
          {crewData?.length > 0 ? (
            <>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#000000"
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled={true}>
                    {crewData?.map((item, index) => {
                      item?.services?.forEach(serviceId =>
                        selcted_services.forEach(selectedService => {
                          if (selectedService?.serviceId == serviceId?._id) {
                            if (!filterconstID.includes(item?.stylist?._id)) {
                              filterconstID.push(item?.stylist?._id);
                            }
                          }
                        }),
                      );
                      return (
                        <TouchableOpacity
                          style={{
                            marginHorizontal: scale(12),
                            alignItems: 'center',
                          }}
                          activeOpacity={0.5}
                          onPress={() => crewselect(item)}>
                          <View>
                            <Image
                              style={[
                                styles.crews,
                                {
                                  borderColor:
                                    item?.stylist?._id == crewId
                                      ? colors.yellow
                                      : colors.white,
                                },
                              ]}
                              source={{uri: item?.stylist?.profilePic}}
                              resizeMode="contain"
                            />
                            <View
                              style={{
                                height: scale(10),
                                width: scale(10),
                                backgroundColor: 'green',
                                borderRadius: scale(99),
                                position: 'absolute',
                                bottom: scale(5),
                                right: 5,
                              }}
                            />
                          </View>

                          <Text
                            style={{alignSelf: 'center', fontSize: scale(10)}}>
                            {item?.stylist?.position}
                          </Text>
                          <Text
                            style={{
                              alignSelf: 'center',
                              fontSize: scale(13),
                              fontFamily: fonts.Exo2Bold,
                              color: colors.headingBlack,
                            }}
                            numberOfLines={2}>
                            {item?.stylist?.fullName}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>

                  <ScrollView
                    style={{flexDirection: 'row', marginTop: scale(18)}}
                    horizontal
                    nestedScrollEnabled={true}>
                    {selcted_services != undefined &&
                    selcted_services.length > 0 ? (
                      <>
                        {selcted_services.map(item => {
                          return (
                            <View
                              style={{
                                backgroundColor: '#E6E1E1',
                                flexDirection: 'row',
                                padding: scale(5),
                                borderRadius: scale(20),
                                marginLeft: scale(10),
                              }}>
                              <Text
                                style={{
                                  fontSize: scale(12),
                                  fontWeight: '500',
                                  fontfamily: fonts.Exo2Bold,
                                  paddingHorizontal: 8,
                                }}>
                                {item?.title}
                              </Text>
                              <TouchableOpacity
                                activeOpacity={0.4}
                                onPress={() =>
                                  dispatch({
                                    type: REMOVE_SERVICES,
                                    payload: item,
                                  })
                                }>
                                <Image
                                  source={images.close}
                                  style={{
                                    height: scale(15),
                                    width: scale(15),
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </>
                    ) : null}
                  </ScrollView>

                  {filterdata != undefined && filterdata.length > 0 ? (
                    <>
                      <SectionList
                        contentContainerStyle={{
                          marginTop: scale(8),
                        }}
                        showsVerticalScrollIndicator={false}
                        scrollIndicatorStyle={{backgroundColor: 'red'}}
                        sections={filterdata}
                        keyExtractor={(item, index) => item + index}
                        extraData={expandedSections}
                        renderSectionHeader={renderSectionHeader}
                        renderItem={({section: {title, _id}, item}) => {
                          const isExpanded = Expandservice.some(
                            items =>
                              items?.crewid === crewId &&
                              items?.mainservices_id === _id,
                          )
                            ? true
                            : false;

                          setServiceExpand(isExpanded);

                          if (!isExpanded) return null;
                          return (
                            <SalonDetailComponent
                              selected={
                                selectedItems.some(
                                  items =>
                                    items?.crewid === crewId &&
                                    items?.Service_id === item._id,
                                )
                                  ? true
                                  : false
                              }
                              time={item?.duration}
                              name={item?.name}
                              price={item?.price}
                              img={item?.icon}
                              backgroundColor={{backgroundColor}}
                              type={item?.currency}
                              onPress={() => {
                                setSelectedOpetions(
                                  crewId,
                                  item?._id,
                                  item?.price,
                                  crewinfo,
                                  item?.name,
                                  expandID,
                                  itemData?.salon?.businessName,
                                  mergedString,
                                  itemData?.salon?._id,
                                  ServiceType,
                                );
                              }}
                              service
                            />
                          );
                        }}
                      />
                    </>
                  ) : (
                    <SmallText
                      text={'No Services found'}
                      marginTop={scale(20)}
                    />
                  )}
                </>
              )}

              <CustomeLoader visible={loading} />
            </>
          ) : (
            <SmallText text={'No Services found'} />
          )}
        </ScrollView>
        <Modal
          visible={AuthModal}
          transparent={true}
          onRequestClose={() => setAuthModal(false)}>
          <View
            style={{
              backgroundColor: 'rgba(0 , 0 , 0 , 0.5)',
              flex: 1,
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AuthenticationModel
              onPress={() => {
                setAuthModal(false);
              }}
              registration={() => {
                setAuthModal(false),
                  setRegistration(true),
                  navigation.navigate(REGISTER_SCREEN);
              }}
              issignup={Registration}
              maybelater={() => {
                setAuthModal(false), setAuthModal(false), setLater(true);
              }}
              later={later}
            />
          </View>
        </Modal>
        <Button
          buttonText={t('Book')}
          alignSelf={'center'}
          marginBottom={scale(17)}
          onPress={() => {
            if (selectedItems != undefined && selectedItems.length > 0) {
              dispatch({type: OPEN_SHEET, payload: false});
              navigation.navigate(CONFIRM_BOOK, {item: itemData});
            } else if (!Config?.token) {
              setAuthModal(!AuthModal);
            } else {
              alert('Please select services');
            }
          }}
        />
      </View>
    </>
  );
};

export default ServiceScreen;
