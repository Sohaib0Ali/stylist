import {View, FlatList, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import Button from '../../../../components/Button/Button';
import SalonDetailComponent from '../../../../components/Client Components/SalonDetailComponent/SalonDetailComponent';
import styles from './style';
import BookingHeader from '../../../../components/Client Components/Booking/Booking Header';
import SemiTitle from '../../../../components/SemiTitle';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import Config from '../../../../config/config';
import axios from 'axios';
import {showWarning} from '../../../../../Utils/FlashMessage';
import CustomeLoader from '../../../../components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
let count = 0;

export default function ChooseMasterScreen({navigation, route}) {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const [textMessage, setTextMessage] = useState(t('chooseMaster'));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [master, setMaster] = useState();

  const [selectedId, setSelectedId] = useState(null);
  const title = route.params.title;
  const serviceID = route.params.serviceID;
  const salonId = route.params.salonId;
  const type = route.params.type;
  const name = route.params.name;
  const itemData = route.params.itemData;

  useEffect(() => {
    if (!isFocused) {
      setSelectedId(null);
    }
  }, [isFocused]);

  useEffect(() => {
    getMasterData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (count == 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, 500);
  }, [data, count]);

  const getMasterData = async () => {
    var config = {
      method: 'get',
      url: `${Config.baseUrl}getStylistByServiceId/${serviceID}`,
      params: {salonId: salonId},
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Config.token}`,
      },
    };
    axios(config)
      .then(response => {
        setLoading(false);
        if (response.status === Config.statusCode) {
          count = count + 1;
          setData(response.data.data);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <BookingHeader
        bg={itemData.salon.profileImage}
        name={name}
        star="3.9"
        reviews="33"
        textShow={textMessage}
        withoutContent
      />
      <View style={styles.body}>
        <View style={styles.toggle} />
        <SemiTitle
          paddingHorizontal={wp('4%')}
          title={title}
          marginBottom={hp(1)}
          marginTop={hp(4)}
        />
        <SimpleText
          paddingHorizontal={wp('4%')}
          text={t('ChooseMaster')}
          alignSelf="flex-start"
        />
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#000000"
            style={{alignSelf: 'center'}}
          />
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingBottom: Platform.OS === 'ios' ? hp(53) : hp(59),
              paddingTop: wp(1),
            }}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => {
              const backgroundColor =
                item._id === selectedId ? colors.yellow : colors.white;
              return (
                <SalonDetailComponent
                  cat={item.position}
                  name={item.firstName + ' ' + item.lastName}
                  price={item.price}
                  img={item.profilePic}
                  type={item.currency}
                  backgroundColor={{backgroundColor}}
                  onPress={() => {
                    setSelectedId(item._id), setMaster(item);
                  }}
                />
              );
            }}
            keyExtractor={item => item._id}
          />
        )}
      </View>
      <View style={styles.FAB}>
        <Button
          buttonText={t('next')}
          onPress={() => {
            selectedId
              ? navigation.navigate('CHOOSE_TYPE_SCREEN', {
                  id: selectedId,
                  salonId,
                  serviceID,
                  type,
                  prevdata: master,
                  itemData,
                  title,
                })
              : showWarning(t('ChooseMaster'));
          }}
        />
      </View>
      <CustomeLoader visible={loading} />
    </View>
  );
}
